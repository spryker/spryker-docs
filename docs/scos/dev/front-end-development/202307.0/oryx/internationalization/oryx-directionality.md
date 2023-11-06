---
title: "Directionality in Oryx: Supporting RTL and LTR for Applications"
description: Learn how Oryx supports both right-to-left (RTL) and left-to-right (LTR) directionality. Discover how this feature automatically adjusts layouts, styling, and icons based on the selected direction, enabling developers to create culturally appropriate and accessible user interfaces for global applications.
last_updated: November 6, 2023
template: concept-topic-template
---

Directionality refers to the writing direction of a language, which can be either left-to-right (LTR) or right-to-left (RTL). LTR languages, such as English, are written from left to right, while RTL languages, such as Arabic, are written from right to left. Directionality affects the layout, styling, and alignment of text and other elements in a user interface.

The web platform supports directionality natively by using the following techniques:

- HTML elements supports the `dir="rtl"` property, that can be applied on the root and inherits down on the page.
- CSS supports layout systems (flex and grid) that are designed to support both RTL and LTR. The alignment of these layouts are driven by using `start` and `end` rather than `left` and `right`.
- CSS supports logical properties that are agnostic to the direction of the page. By using logical properties, such as `padding-inline-start: 10px` (instead of `padding-left: 10px`), components will consistently work in both directions.
- CSS have started to [support a pseudo selector](https://caniuse.com/css-dir-pseudo) that can be used to change style rules based on the direction of the element.

Oryx supports both LTR and RTL directionality. The directionality feature applies to the following areas:

1. HTML Root: The direction is added to the root of the document, ensuring that the entire page is rendered correctly according to the selected direction.

2. Current language: The direction is automatically detected based on the current language. The [reactive system](/docs/scos/dev/front-end-development/{page.version}/oryx/architecture/reactivity/reactivity.html) allows the language to change with all elements no the page instantly reflecting the changed language state, including the direction.

3. Layout: All layouts in Oryx are automatically flipped based on the direction. This ensures that the layout of components is adjusted accordingly, providing a consistent and visually appealing design.

4. Styling: Oryx uses logical properties for CSS, which means that all margin, padding, and other styling properties are applied correctly based on the selected direction. This ensures that the design system and domain components are properly aligned and styled.

5. Icons: Icons that require flipping, such as arrows or directional indicators, are automatically flipped based on the selected direction. This ensures that icons are displayed correctly and in the appropriate orientation. The flipping of icons is done in CSS and is based on the `:dir(rtl)` [pseudo selector](https://caniuse.com/css-dir-pseudo). Since not all browsers have full support for this selector, this feature is a [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement).

To enable directionality in Oryx, simply change the language to a locale like Arabic or Hebrew, and the direction will be automatically detected and applied. This feature provides flexibility and convenience for creating applications that support different languages and reading directions.

{% info_block infoBox "Test RTL with labs package" %}

To test RTL direction, the labs package have added a hardcoded "Arabic" locale.

{% endinfo_block %}

By incorporating directionality support in Oryx, developers can create user interfaces that are accessible and culturally appropriate for a global audience.
