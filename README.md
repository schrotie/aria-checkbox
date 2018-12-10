# aria-checkbox
Accessible, responsive, themeable, small footprint checkbox, supports tri-state, too

`<aria-checkbox>` is a themable checkbox web-component/custom-element. Simply load the script, e.g. in your document's `<head>` and add checkboxes to your document.

Okay, it's probably not _that_ simple. `AriaCheckbox` is a class that handles the _ARIA_ (i.e. accessibility) aspect of checkboxes. `<aria-checkbox>` comes with a couple of themes:
* __classic__  
looks basically like a classical checkbox, just themed and with some gradients
* __material__  
is a material design checkbox variant
* __toggle__  
is a material design toggle button

Each comes with a simple theming interface. If you can decide to just use one kind and are happy with the look and feel just include the respective file, add you colors and enjoy:
* `aria-checkboxClassic.mjs`
* `aria-checkboxMaterial.mjs`
* `aria-checkboxToggle.mjs`

# What File to Load
You only need to load one file. Which one that is depends on your specific needs. As noted above, `<aria-checkbox>` comes with three pre-built themes. Thus first you should decide which theme to choose or if you want to build your own customized variant.

The pre-built dist (distribution) files are in the NPM package but not in the GitHub sources. If you loaded the latter you need to do `npm i; npm run build` to get them.

If you build your own, you should `import AriaCheckbox from '.../src/aria-checkbox.mjs'` and do your own build. If you build a web application with static source code (as opposed to a page that is dynamically assembled by server side rendering) you should import the source version of your chosen themed checkbox and have a custom build for your app.

If you want to use a pre-build checkbox decide which and next decide which build to load. Each theme comes with three builds. `<aria-checkbox>` uses the [ShadowQuery](https://github.com/schrotie/shadow-query) micro library to simplify web component implementation. Two builds bundle it, one doesn't. If you use more stuff that also needs ShadowQuery use the version where it's not bundled. That way you don't have to load it multiple times.
* __*.min.mjs__ minified EcmaScript Module without ShadowQuery
* __*.min.js__ minified ES6 script file with ShadowQuery bundled - use for all modern browsers except Edge
* __*.IE.min.js__ babel-transpiled ES5 for IE (and possibly Edge?) with ShadowQuery bundled

File sizes (gzipped): the minified boxes without ShadowQuery are ~2K, with ShadowQuery ~4K and transpiled with ShadowQuery ~13K.

## Deployment & Polyfills
Older versions of current browsers and IE don't fully support web components and may miss modern language features. For the former you need to load a polyfill, for the latter you need to load the transpiled `<aria-checkbox>`.

In addition I strongly recommend that you load the polyfills only where required _and don't load transpiled code for browsers that don't need it!_ Transpiled means that the code went through babel. The code is twice as big and slower than the native ES6 ... and simply won't work in at least some modern browsers.

# Theming & Customization
The `aria-checkbox` visuals have no actual DOM, it's all CSS. Thus it is fully themeable, you can do whatever you like and still rely on `aria-checkbox` to handle accessibility and more (it sync the checkox's `checked` property, `checked` attribute and `aria-checked` attribute and can control other `aria-checkbox`es). Checkout the demo!

If you want to customize the look and feel I recommend implementing you own by extending AriaCheckbox and adding your own style. `aria-checkbox.mjs` exports a function `defineAriaCheckbox(css, element)`. Call it and pass your CSS as the first argument. It will be put inside the custom-element's shadowDOM `<style></style>`. Optionally you can pass a tag-name as the second argument (defaults to `aria-checkbox`).

You may want to check out how the classic, material and toggle checkboxes do that, it's quite simple. You can either start from one of the themes that ship with `<aria-checkbox>` or start from scratch. You may still want to have a look at the shipped themes to figure out what selectors to use for your CSS. Thus you can easily create you own `<my-checkbox>` that looks exactly as you need.

Note that you have up to five DOM elements to play with in your theme:
1. the `<aria-checkbox>` element itself, selected with `:host` in your CSS
2. `:host::before` virtual CSS only element in the light DOM
3. `:host::after` as above
4. `:host slot::before` virtual CSS only element in shadow DOM
5. `:host slot::after` as above

## Note on IE
If you decide to build you own custom variant of `<aria-checkbox>` _and_ you need to support IE, be aware that you need to persuade the ShadyCSS polyfill to actually style your checkbox. It's "just" a little code and if you use `defineAriaCheckbox(css, element)` the function will handle that for you. But if you inherit from `AriaCheckbox` manually, check the implementation of `defineAriaCheckbox(css, element)` to see what you need to do.

# API

## Attributes
* __role="checkbox"__  
accessibility feature, set automatically
* __tabindex="0"__  
accessibility feature, set automatically
* __aria-checked__  
accessibility feature, can become "true", "false", or "mixed"
* __checked__  
for native checkbox compatibility
* __aria-controls__  
If you want one checkbox to control others, pass the controlled checkboxes's IDs to the controlling checkbox's `aria-controls` attribute.

## property
* __checked__  
`aria-checked` and `checked` attributes and `checked` property are always kept in sync. If you change any, the other will follow. Use `aria-checked` for styling. For `aria-checked="mixed"` `checked` attribute will be absent and property will be `false`.

## events
When the checkox's value changes due to the user's mouse or keyboard interaction, `<aria-checkbox>` will emit two event:
* __change__
* __input__

This is what native checkboxes do. The original user event will be in event.detail.

# Accessibility features
See [W3C example](https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html).
