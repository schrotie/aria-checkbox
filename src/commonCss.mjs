export const bgUnchecked = 'var(--aria-checkbox-bg-unchecked, #a8a8a8)';
export const bgChecked   = 'var(--aria-checkbox-bg-checked, #4787ef)';
export const fgChecked   = 'var(--aria-checkbox-fg-checked, #fff)';

export const cssCommon = /* css */`
:host {
	display: inline-block;
	position: relative;
	padding-left: 1.4em;
	cursor: pointer;
	font-family: sans-serif;
	user-select: none;
}

:host::before,
:host::after {
	position: absolute;
	top: 50%;
	left: 7px;
	transform: translate(-50%, -50%);
	content: '';
}

:host(:focus) {outline: none;}
`;

export const materialRipple = /* css */`
slot::before {
	content: '';
	position: absolute;
	display: block;
	margin: -18px;
	width: 56px;
	height: 56px;
	background: ${bgChecked};
	border-radius: 50%;
	transform: scale(0);
	opacity: 1;
	pointer-events: none;
}
:host([aria-checked="true"]) slot::before {
	transform: scale(1);
	opacity: 0;
}
`;
