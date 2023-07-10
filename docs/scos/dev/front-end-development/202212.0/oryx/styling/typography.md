---
title: "Oryx: Typography"
description: Typography design tokens are used for a consistent design system through the components in Oryx applications
last_updated: July 9, 2023
template: concept-topic-template
---

Typography is an important part of the look and feel of a web page. It contributes to the readability of text but also plays an important role in how the page structure is perceived. Big headers typically go first and are perceived more important, where as smaller text seems less important.

The typography system allows to setup font size, weight and line height globally. Components do not define _values_ for fonts directly in their CSS, but use _design tokens_ to connect to the font values. Design tokens are (CSS) variables that can be configured in your project implementation.

As all design tokens, the typography system is configurable by themes, so that a selection for a certain theme will apply a unique set of typography settings to all components.

## Global font settings

Oryx is based on web components, using the shadow DOM. The shadow DOM won't leak out any styles outside a component and components won't inherit styles from ancestor elements. There are however a few exceptions to this. Font face and size, line height and color are among the few CSS properties that actually cascade down the shadow DOM. This allows for defining those rules high up in the DOM tree.

Because of this, most design system components do not require specific typography as they will inherit those from an ancestor elements. The basis typography configuration can therefore be provided in the root of the application. Oryx applications use the `<oryx-app>` component which provide this setup:

```css
:host {
  font-family: var(--oryx-typography-body-font);
  font-weight: var(--oryx-typography-body-weight);
  line-height: var(--oryx-typography-body-line);
}
```

The values are based on design tokens, which can be configured in a theme. Themes provide a mechanism to have screen size specific tokens, which allows the components to have different typography for small, medium and large screens.

**Note**: Setting the _root font size_ is an exception in Oryx; Oryx tries to not have any opinion about the root element, and only provides styles to the `oryx-app` component. The `rem` unit however requires a setup of the root font-size in the web page. To ensure a configurable approach, Oryx uses the `ThemeMetaInitializer` to accomplish this.

<!-- TODO: we will add more information on the DefaultThemeMetaInitializer going forward in our docs -->

## Relative font size and line height

Application themes in Oryx are typically configured with relative sizes for font and line height, using `rem` or `em` units. In web development, using `rem` for font size and `em` for line height offers a flexible and proportional approach to typography. These units ensure consistent and harmonious typography throughout the components on a page.

### `rem` for font size

The `rem` unit, short for "root em" is relative to the root font size of the document. By defining the root font size all other font sizes specified using `rem` adapt proportionally.

For example, if the font size token of a `h3` is set to `1.2rem`, and the root font size is `15px`, the calculated font size for the `h3` becomes `18px` (`1.2 * 15`).

Using `rem` for font size provides several benefits:

1. Consistency: Font sizes scale consistently across elements, maintaining proportional typography.
2. Accessibility: Users can adjust the overall font size in their browser settings without affecting layout or readability.
3. Ease of Maintenance: Adjusting the root font size automatically cascades changes to all elements using `rem`, reducing manual adjustments.

### `em` for line height

The `em` unit, short for "element `em`," is relative to the font size of the current element. When specifying line heights using `em`, the value is multiplied by the font size to determine the final line height.

For example, if the line height token of a `h3` is set to `1.5em`, and the font size is `18px`, the calculated line height for the `h3` becomes `27px` (`1.5 * 18`). The font size can be driven by a `rem` unit, the browser will first calculate the rem value of the font size before calculating the line height.

Using `em` for line height offers the following advantages:

1. Proportional Line Heights: `em` adjusts line height proportionally to the font size, ensuring visually harmonious typography.
2. Vertical Rhythm: `em` helps maintain a consistent vertical rhythm, creating a visually cohesive design.
3. Flexible Adjustments: Modifying the font size of an element automatically adjusts its line height, facilitating quick and consistent changes.

## Headings

Html supports heading elements up to level 6 (`<h1>`, `<h2>`, `<h3>`, etc.). The headings play an important role in the structure of an html page. It is used by screen readers and crawlers to better understand the content and their coherence. Designers, however, have more tools than headings alone to a apply structure, using layout and alternative UI elements.

Oryx provides a number of heading and paragraph styles that are used in the design system and components:

- body
- small
- H1, H2, H3, H4, H5, H6
- subtitle
- subtitle-small
- bold
- caption

Each style of components and elements below is configurable by design tokens, using the following variables for h1 for example:

- `--oryx-typography-h1-size`
- `--oryx-typography-h1-weight`
- `--oryx-typography-h1-line`

These design tokens are pretty self-explanatory.

The headings will get a `margin: 0` to avoid any clashes in the component layout.

### Semantic HTML structure versus UI

The semantic usage of heading elements (h1, h2, etc.) is important on the web. Crawlers and screen readers use the structure to interpreted the content. This is important to navigate the content, especially for those with limited sight; screen readers will guide them and allow to skip sections which are not of interest. Consequently, if the structure is not well formatted (e.g. a h3 followed by a h5), it is considered a violation of accessibility best practices.

A valid structure, however, might conflict with the UI design. UI designers use the headings in combination with layout, which means that their options are more advanced compared to the structure only. UI designers tend to ignore the structure and favor layout options to emphasize sections of the page.

An example would be a 2 column layout, where content in both sections have the same visual weight. However, based on their position, the content on the left (in an left-to-right context) is automatically of more importance.

To allow for a solution that can cope with both the right semantic structure and the visual design, heading elements might be styles with conflicting heading style rules. The following is an example:

<h2>Cart totals</h2>
<style>
  h2 {
    font-size: var(--oryx-typography-h3-size);
    font-weight: var(--oryx-typography-h3-weight);
    line-height: var(--oryx-typography-h3-height);
  }
</style>

The "Cart totals" heading has a structure of h2, while the visual appearance uses the h3 design tokens. This might look upside down, but it is intentionally done to have both a compliant and attractive UI.
