import {bgUnchecked}    from './commonCss.mjs';
import {bgChecked}      from './commonCss.mjs';
import {materialRipple} from './commonCss.mjs';

export default /* css */`
:host {
	font-family: sans-serif;
	position: relative;
	display: block;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
	transform: translate3d(0, 0, 0);
}
:host(:focus) {outline: none;}
:host::before {
	content: "";
	position: relative;
	top: 3px;
	left: 3px;
	width: 34px;
	height: 14px;
	display: inline-block;
	background: ${bgUnchecked};
	border-radius: 8px;
	transition: background 0.2s ease;
	margin-right: 0.5em;
}
:host(:focus)::before {
	box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
}
:host::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 20px;
	height: 20px;
	display: inline-block;
	background: white;
	border-radius: 10px;
	box-shadow: 0 3px 8px rgba(153, 153, 153, 0.5);
	transition: all 0.2s ease;
}
:host(:hover)::after {
	box-shadow: 0 3px 8px 1px rgba(153, 153, 153, 0.6);
}
:host([aria-checked="true"])::before {
	background: ${bgChecked};
}
:host([aria-checked="true"])::after {
	transform: translateX(20px);
	transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25),\
		background 0.15s ease;
	box-shadow: 0 3px 8px rgba(79, 46, 220, 0.2);
}
:host([aria-checked="mixed"])::after {
	transform: translateX(10px);
	transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25);
}
:host([aria-checked="true"]:hover)::after {
	box-shadow: 0 3px 8px 1px rgba(79, 46, 220, 0.4);
}
${materialRipple}
slot::before {
	top: 0;
	left: 1.3em;
}
:host([aria-checked="true"]) slot::before {transition: all .4s ease;}
`;
