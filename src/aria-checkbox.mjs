import $   from '../node_modules/shadow-query/shadowQuery.mjs';

const keyCode = Object.freeze({
	'RETURN': 13,
	'SPACE': 32,
});

export default class AriaCheckbox extends HTMLElement {
	constructor() {
		super();
		this.$ = $(this);
		this.$.attr('role', 'checkbox');
		this.tabIndex = 0;
		this._boundOnControlled = this._onControlled.bind(this);
		this._controls = $(0);
		this._iniControlled();
		this._iniFormCheckbox();
		this._iniHandlers();
		this._checked = this.$.attr('aria-checked') === 'true';
	}

	_iniHandlers() {
		this._sync('prop', 'checked');
		this._sync('attr', 'checked');
		this._sync('attr', 'aria-checked');
		this.$.on('keydown', this._onKeydown.bind(this));
		this.$.on('click',   this.toggle    .bind(this));
		this.$.on('attr:aria-controls', this._iniControlled.bind(this));
	}

	_iniControlled() {
		this._controls.off('prop:checked', this._boundOnControlled);
		this._iniControls();
		this._controls.on('prop:checked', this._boundOnControlled);
	}

	_iniControls() {
		const controls = this.$.attr('aria-controls');
		if(!/\w/.test(controls || '')) return this._controls = $(0);
		const sel = controls.split(' ').map(el => `#${el}`).join(',');
		let root = this;
		while(root.parentNode) root = root.parentNode;
		this._controls = $(root.querySelectorAll(sel));
	}

	_onControlled() {
		if(this._settingControlled) return;
		const checked = this._checkedControls('checked');
		if (checked === 0) this._checked = false;
		else {
			if (checked === this._controls.length) this._checked = true;
			else {
				this._checked = 'mixed';
				this._updateControlledStates();
			}
		}
	}

	_checkedControls(field) {
		return this._controls.reduce(
			(sum, el) => sum + (el[field] ? 1 : 0), 0
		);
	}

	_updateControlledStates() {
		for(const box of this._controls) box._ariaLastChecked = box.checked;
	}

	_iniFormCheckbox() {
		if(this._controls.length ||
			this.$.query('input[type="checkbox"]').length
		) return this._checkbox = $(0);
		this.$.append('<input type="checkbox" style="display:none;"></input>');
		this._checkbox = this.$.query('input[type="checkbox"]');
		this._syncBox('name');
		this._syncBox('value');
	}

	_syncBox(key) {
		this.$.on(
			`attr:${key}`,
			() => this._checkbox.attr(key, this.$.attr(key))
		);
		this._checkbox.attr(key, this.$.attr(key));
	}

	toggle(event) {
		if(!this._controls.length) {
			this._checked = (this.$.attr('aria-checked') === 'true') ?
				false : true;
		}
		else {
			this._settingControlled = true;
			this._setControlled();
			delete this._settingControlled;
			this._onControlled();
		}
		this.dispatchEvent(new CustomEvent('change', {detail: event}));
		this.dispatchEvent(new CustomEvent('input',  {detail: event}));
	}

	_setControlled() {
		const state = this.$.attr('aria-checked');
		if (state === 'false') {
			if (this._checkedControls('_ariaLastChecked') > 0) {
				for(const box of this._controls) box.checked = box._ariaLastChecked;
			}
			else this._controls.prop('checked', true);
		}
		else {
			if (state === 'mixed') this._controls.prop('checked', true);
			else                   this._controls.prop('checked', false);
		}
	}

	_sync(type, key) {
		this.$.on(`${type}:${key}`, 'noSelf', (function() {
			const value = this.$[type](key);
			const mixed = (value === 'mixed') ? 'mixed' : false;
			this._checked = mixed ||
				((value && (value !== 'false')) ? true : false);
		}).bind(this));
	}

	set _checked(state) {
		if(this._settingChecked) return;
		this._settingChecked = true;
		const mixed = (state === 'mixed') ? 'mixed' : false;
		if(mixed) state = false;
		const aria = mixed || (state ? 'true' : 'false');
		this._setChecked('attr', 'aria-checked', aria);
		this._setChecked('attr', 'checked', state);
		this._setChecked('prop', 'checked', state);
		this._checkbox.prop('checked', this.checked);
		delete this._settingChecked;
	}

	_setChecked(type, key, value) {
		if(this.$[type](key) !==  value) this.$[type](key, value);
	}

	_onKeydown(event) {
		if (event.keyCode !== keyCode.SPACE) return;
		this.toggle(event);
		event.stopPropagation();
		event.preventDefault();
	}
}

export function defineAriaCheckbox(css, element='aria-checkbox') {
	window.ShadyCSS && iniShadyCss(css, element);
	window.customElements.define('aria-checkbox', class extends AriaCheckbox {
		constructor() {
			super();
			window.ShadyCSS && window.ShadyCSS.styleElement(this);
			this.$.shadow(/* html */`<style>${css}</style><slot>&#8203;</slot>`);
		}
	});
}

function iniShadyCss(css, element) {
	const template = document.createElement('template');
	template.innerHTML = `<style>${css}</style><slot></slot>`;
	window.ShadyCSS && window.ShadyCSS.prepareTemplate(template, element);
}
