import {bgUnchecked} from './commonCss.mjs';
import {bgChecked}   from './commonCss.mjs';
import {fgChecked}   from './commonCss.mjs';
import {cssCommon}   from './commonCss.mjs';

const shadowUnchecked      = 'inset 0 -13px  5px 0 #fff';
const shadowUncheckedHover = 'inset 0 -12px  3px 0 #fff';
const shadowChecked        = 'inset 0   7px  5px 0 rgba(255, 255, 255, 0.45)';
const shadowCheckedHover   = 'inset 0  12px 10px 0 rgba(255, 255, 255, 0.4)';
const shadowFocus          = `0 0 5px 2px ${bgChecked}`;
const classicCss = /* css */`
${cssCommon}

:host::before {
	width: 0.875em;
	height: 0.875em;
	border: 1px solid ${bgUnchecked};
	border-radius: .2em;
	background: ${bgUnchecked};
	box-shadow: ${shadowUnchecked};
}
:host(:hover)::before {box-shadow: ${shadowUncheckedHover};}

:host([aria-checked="mixed"])::before,
:host([aria-checked="true"])::before {
	border-color: ${bgChecked};
	background: ${bgChecked};
	box-shadow: ${shadowChecked};
}
:host([aria-checked="mixed"]:hover)::before,
:host([aria-checked="true"]:hover)::before {
	box-shadow: ${shadowCheckedHover};
}

:host(:focus)::before {
	box-shadow: ${shadowUnchecked}, ${shadowFocus};
}
:host(:hover:focus)::before {
	box-shadow: ${shadowUncheckedHover}, ${shadowFocus};
}
:host([aria-checked="mixed"]:focus)::before,
:host([aria-checked="true"]:focus)::before {
	box-shadow: ${shadowChecked}, ${shadowFocus};
}
:host([aria-checked="mixed"]:hover:focus)::before,
:host([aria-checked="true"]:hover:focus)::before {
	box-shadow: inset 0 12px 10px 0 rgba(255, 255, 255, 0.4),\
		${shadowFocus};
}

:host([aria-checked="mixed"])::after {
	width: 0.5em;
	border-bottom: 0.125em solid ${fgChecked};
	transform: translate(-50%, -50%) rotateZ(45deg);
	transform-origin: center center;
}
:host([aria-checked="mixed"]:hover)::after,
:host([aria-checked="true"])::after {
	width: .25em;
	height: .4em;
	border: solid ${fgChecked};
	border-width: 0 .125em .125em 0;
	transform: translateY(-65%) translateX(-50%) rotate(45deg);
}
`;
export default classicCss;
