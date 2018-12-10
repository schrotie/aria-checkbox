import $            from '../node_modules/shadow-query/shadowQuery.mjs';
import AriaCheckbox from './aria-checkbox.mjs';
import classicCss   from './classicCss.mjs';
import materialCss  from './materialCss.mjs';
import toggleCss    from './toggleCss.mjs';

const template = /* html */`<style></style><slot>&#8203;</slot>`;

window.customElements.define('aria-checkbox', class extends AriaCheckbox {
	constructor() {
		super();
		this.$.on('attr:data-material', this._css.bind(this));
		this.$.shadow(template);
		this._css();
	}

	_css() {
		const template = {
			'toggle':   toggleCss,
			'material': materialCss,
			'custom':   ' ',
		}[this.$.attr('data-theme')] || classicCss;
		$(this, 'style').append({template});
	}
});
