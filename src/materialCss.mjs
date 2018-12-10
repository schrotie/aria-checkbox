import {bgUnchecked}    from './commonCss.mjs';
import {bgChecked}      from './commonCss.mjs';
import {fgChecked}      from './commonCss.mjs';
import {cssCommon}      from './commonCss.mjs';
import {materialRipple} from './commonCss.mjs';

const hoverShadow = 'inset 0 0 4em 1px rgba(255, 255, 255, 0.3)';
const focusShadow = `0 0 24px ${bgChecked}`;
const materialCss = /* css */`
${cssCommon}

:host::before {
	width: 1em;
	height: 1em;
	border: 2px solid ${bgUnchecked};
	border-radius: 2px;
}

:host(:hover)::before {background: ${bgUnchecked};}

:host([aria-checked="mixed"])::before,
:host([aria-checked="true"])::before {
	border: 2px solid ${bgChecked};
	background: ${bgChecked};
}

:host(:focus)::before       {box-shadow: ${focusShadow};}
:host(:hover)::before       {box-shadow: ${hoverShadow};}
:host(:focus:hover)::before {box-shadow: ${focusShadow}, ${hoverShadow};}

:host([aria-checked="mixed"])::after {
	width: .6em;
	height: .2em;
	border: solid ${fgChecked};
	border-width: 0 0 .2em 0;
	transform: translateY(-65%) translateX(-50%);
}

:host([aria-checked="true"])::after {
	width: .3em;
	height: .7em;
	border: solid ${fgChecked};
	border-width: 0 .2em .2em 0;
	transform: translateY(-65%) translateX(-50%) rotate(45deg);
}
${materialRipple}
slot::before {
	top: -.1em;
	left: -.2em;
}
:host([aria-checked="true"]) slot::before {transition: all .4s ease-out;}
`;
export default materialCss;
