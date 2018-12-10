export default /* css */`
aria-tabs {
	display:block;
	width: 20em;
	font-family: "lucida grande", sans-serif;
}

aria-tabs .scrollButtonContainer {position: relative;}

aria-tabs [role="tablist"] {
	margin: 0 0 -.1em;
	overflow: hidden;
	white-space: nowrap;
	scroll-behavior: smooth;
}

aria-tabs [role="tablist"] [role="tab"],
aria-tabs ::slotted([role="tab"]),
aria-tabs [role="navigation"] {
	position: relative;
	margin: 0;
	padding: .3em .5em .4em;
	border: 1px solid hsl(219, 1%, 72%);
	border-radius: .2em .2em 0 0;
	box-shadow: 0 0 .2em hsl(219, 1%, 72%);
	overflow: visible;
	font-family: inherit;
	font-size: inherit;
	background: hsl(220, 20%, 94%);
}

aria-tabs [role="navigation"]:hover::before,
aria-tabs [role="tablist"] [role="tab"]:hover::before,
aria-tabs [role="tablist"] [role="tab"]:focus::before,
aria-tabs [role="tablist"] [role="tab"][aria-selected="true"]::before,
aria-tabs ::slotted([role="tab"]:hover)::before,
aria-tabs ::slotted([role="tab"]:focus)::before,
aria-tabs ::slotted([role="tab"][aria-selected="true"])::before {
	position: absolute;
	bottom: 100%;
	right: -1px;
	left: -1px;
	border-radius: 0.2em 0.2em 0 0;
	border-top: 3px solid hsl(20, 96%, 48%);
	content: '';
}

aria-tabs [role="tablist"] [role="tab"][aria-selected="true"],
aria-tabs ::slotted([role="tab"][aria-selected="true"]) {
	border-radius: 0;
	background: hsl(220, 43%, 99%);
	outline: 0;
}

aria-tabs [role="tablist"] \
[role="tab"][aria-selected="true"]:not(:focus):not(:hover)::before,
aria-tabs ::slotted(\
[role="tab"][aria-selected="true"]:not(:focus):not(:hover)\
)::before {
	border-top: 5px solid hsl(218, 96%, 48%);
}

aria-tabs [role="tablist"] [role="tab"][aria-selected="true"]::after,
aria-tabs ::slotted([role="tab"][aria-selected="true"])::after {
	position: absolute;
	z-index: 3;
	bottom: -1px;
	right: 0;
	left: 0;
	height: .3em;
	background: hsl(220, 43%, 99%);
	box-shadow: none;
	content: '';
}

aria-tabs [role="tablist"] [role="tab"]:hover,
aria-tabs [role="tablist"] [role="tab"]:focus,
aria-tabs [role="tablist"] [role="tab"]:active,
aria-tabs ::slotted([role="tab"]:hover),
aria-tabs ::slotted([role="tab"]:focus),
aria-tabs ::slotted([role="tab"]:active) {
	outline: 0;
	border-radius: 0;
	color: inherit;
}

aria-tabs [role="tablist"] [role="tab"]:hover::before,
aria-tabs [role="tablist"] [role="tab"]:focus::before,
aria-tabs ::slotted([role="tab"]:hover::before),
aria-tabs ::slotted([role="tab"]:focus::before) {
	border-color: hsl(20, 96%, 48%);
}

aria-tabs [role="tab"] [aria-label="delete"] {
	border: 0 none transparent;
	background: transparent;
	margin: 0 0 0 0.3em;
	border-radius: 50%;
	padding: 0;
	width: 1em;
	height: 1em;
	font-size: 1.2em;
	opacity: 0;
	transition: 0.3s;
}
aria-tabs [role="tab"]:active [aria-label="delete"],
aria-tabs [role="tab"]:focus [aria-label="delete"],
aria-tabs [role="tab"]:hover [aria-label="delete"] {
	opacity: 1;
}

aria-tabs [role="navigation"] {
	display: none;
	position: absolute;
	left: 0;
	top: 0;
	box-shadow:  5px 1px 10px #777;
}

aria-tabs [role="navigation"] ~ [role="navigation"] {
	right: 0;
	left: unset;
	box-shadow: -5px 1px 10px #777;
}

aria-tabs [role="tablist"].scrolling {
	padding: 0 1.6em;
}
aria-tabs [role="tablist"].scrolling ~ [role="navigation"] {
	display: block;
}

aria-tabs [role="tabpanel"] {
	position: relative;
	z-index: 2;
	padding: .5em .5em .7em;
	border: 1px solid hsl(219, 1%, 72%);
	border-radius: 0 .2em .2em .2em;
	box-shadow: 0 0 .2em hsl(219, 1%, 72%);
	background: hsl(220, 43%, 99%);
}

aria-tabs [role="tabpanel"][aria-hidden] {
	display: none;
}

aria-tabs [role="tabpanel"]:focus {
	border-color: hsl(20, 96%, 48%);
	box-shadow: 0 0 .2em hsl(20, 96%, 48%);
	outline: 0;
}

aria-tabs [role="tabpanel"]:focus::after {
	position: absolute;
	bottom: 0;
	right: -1px;
	left: -1px;
	border-bottom: 3px solid hsl(20, 96%, 48%);
	border-radius: 0 0 0.2em 0.2em;
	content: '';
}
`;
