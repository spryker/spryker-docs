---
title: "Directionality in Oryx: Supporting RTL and LTR for applications"
description: Learn how Oryx supports both right-to-left (RTL) and left-to-right (LTR) directionality. Discover how this feature automatically adjusts layouts, styling, and icons based on the selected direction, enabling developers to create culturally appropriate and accessible user interfaces for global applications.
last_updated: November 6, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/dev/front-end-development/202404.0/oryx/internationalization/oryx-directionality.html

---

Directionality refers to the writing direction of a language, which can be either left-to-right (LTR) or right-to-left (RTL). LTR languages, such as English, are written from left to right, while RTL languages, such as Arabic, are written from right to left. Directionality affects the layout, styling, and alignment of text and other elements in a user interface.

The web platform supports directionality natively by using the following techniques:

- HTML elements supports the `dir="rtl"` property, which can be applied on the root and inherits down on the page.
- CSS supports layout systems (flex and grid) that are designed to support both RTL and LTR. The alignment of these layouts are driven by using `start` and `end` rather than `left` and `right`.
- CSS supports logical properties that are agnostic to the direction of a page. By using logical properties, such as `padding-inline-start: 10px` (instead of `padding-left: 10px`), components consistently work in both directions.
- CSS supports a [pseudo selector](https://caniuse.com/css-dir-pseudo) that can be used to change style rules based on the direction of an element.

Oryx supports both LTR and RTL directionality. The directionality feature applies to the following areas:

1. HTML Root: The direction is added to the root of the document, ensuring that the entire page is rendered according to the selected direction.

2. Current language: The direction is automatically detected based on the current language. The [reactive system](/docs/dg/dev/frontend-development/latest/oryx/architecture/reactivity/reactivity.html) enables the language to instantly change with all the elements on a page reflecting the changed language state, including direction.

3. Layout: All layouts in Oryx are automatically flipped based on direction. This ensures that the layout of components is adjusted accordingly, providing a consistent and visually appealing design.

4. Styling: Oryx uses logical properties for CSS, which means that all margin, padding, and other styling properties are applied correctly based on the selected direction. This ensures that the design system and domain components are properly aligned and styled.

5. Icons: Icons that require flipping, such as arrows or directional indicators, are automatically flipped based on the selected direction. Icons are flipped in CSS based on the `:dir(rtl)` [pseudo selector](https://caniuse.com/css-dir-pseudo). Because not all browsers support this selector, this feature is a [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement).

To enable directionality in Oryx, simply change the language to a locale like Arabic or Hebrew, and the direction will be automatically detected and applied. This feature provides flexibility and convenience for creating applications that support different languages and reading directions.

{% info_block infoBox "Test RTL with the labs package" %}

To test RTL direction, the [labs package](https://www.npmjs.com/package/@spryker-oryx/labs) contains a hardcoded Arabic locale.

{% endinfo_block %}
