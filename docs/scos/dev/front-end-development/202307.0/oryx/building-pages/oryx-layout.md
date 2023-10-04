---
title: "Oryx layout system"
description: The Oryx layout system is designed to apply layouts to pages and compositions, allowing for highly reusable components.
last_updated: September 25, 2023
template: concept-topic-template
---

The Oryx layout system is designed to apply layouts to [pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html) or [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html). The layout are decoupled from the components. This makes components highly reusable in different visual designs and screen sizes.

The layout is configurable in the [experience data](/docs/scos/dev/front-end-development/202212.0/oryx/building-applications/oryx-feature-sets.html#static-experience-data). Compositions can provide a layout type that provides the layout of choice, in combination with layout and styling options. The layout configuration is configured in the application configuration, but can also be loaded from a backend API. This opens the doors for more personal layouts or layouts that based on split testing rules (A/B).

The layout implementation is driven by standard CSS and based on themes and [design tokens](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/styling/oryx-design-tokens.html). The layouts integrate with the various screen sizes to ensure a responsive design, optimized for various screen sizes.

Layouts can be nested. You can for example nest a carousel layout inside a grid layout.

## Layout Types

The Oryx Layout System is designed around a column based grid. This provides the foundation for various layout types such as column, grid, carousel, split, etc. Each of these layout types offers unique characteristics and capabilities, allowing for a wide range of design possibilities.

The number of columns that is used in the layout system can be controlled by the `--oryx-column-base` design token, which defaults to the following values:

| Screen | Default |
| ------ | ------- |
| large  | `12`    |
| medium | `8`     |
| small  | `4`     |

All layouts provide the ability for components to span rows and columns. This may sounds pretty standard for a grid layout, but for a carousel this allows for exciting usage. You could, for example, dynamically configure a product in a carousel to span two columns, in case it requires more space (think of a product bundle).

### Column Layout

The Column layout use a single column for each component. Each component uses a single element of the grid system configured per screen.

### Grid Layout

The Grid layout uses a number of columns from the layout system to render each component. The number of columns used per element is configurable by the design token `--oryx-column-grid`, which defaults to the following values.

| Screen | Default |
| ------ | ------- |
| large  | `4`     |
| medium | `3`     |
| small  | `2`     |

In the Grid layout, components will flow to the next row, allowing for a fluid and responsive design.

### Carousel Layout

The Carousel layout is similar to the Grid layout but with a key difference: it does not flow to the next row. Instead, it uses a scrollable element, creating a horizontally scrolling carousel of components.

While the Carousel layout primarily operates on a single row, multi-row carousels are also possible, offering even more design flexibility.

### Split Layout

The Split layout divides the available space into two columns. There are three subtypes for the split layout, each dividing the space differently:

1. equal – divides the space into 2 equal columns
2. aside – the first column takes a small amount of space
3. main – the first column takes a large amount of the space

The number of columns that is used for the first column is configurable by design tokens, which default to the following values for medium or large screens.

| Screen | Equal                       | Main                       | Aside                       |
| ------ | --------------------------- | -------------------------- | --------------------------- |
| large  | `6`                         | `8`                        | `3`                         |
| medium | `4`                         | `5`                        | `2.66`                      |
|        | `--oryx-column-split-equal` | `--oryx-column-split-main` | `--oryx-column-split-aside` |

On small screens, the Split layout adapts by using only one column, with the "second" column changing to the next row. This responsive behavior ensures that the layout remains functional and visually appealing across a wide range of devices and screen sizes.

## Layout Container

The layout container is a basic layout utility that keeps the content of a layout at a maximum width. This is used to avoid the content to take too much space on very large screens.

The layout container can be configured using the `--oryx-layout-container-width` design token. This token sets the maximum width of the container, which defaults to maximum `1340px`. Smaller screen will render maximum 100% of the viewport as the maximum size.

The minimum bleed that is rendered outside the container, can be configured using the `--oryx-layout-container-bleed` design token and defaults to the following values:

| screen | bleed  |
| ------ | ------ |
| Large  | `50px` |
| Medium | `30px` |
| Small  | `16px` |

## Layout Options

The layout system supports a number layout options that can be used in combination with the layout types.

- **sticky** –  Specifies whether the component should have a sticky position. This property accepts a boolean value. Sticky layout stick to the top of the page, but can the top position can be controlled with the `inset-block-start` property.
- **bleed** – Specifies whether the component should fill the bleed of the layout container. This property accepts a boolean value.
- **overlap** – Specifies whether the component should overlap with other components. This property accepts a boolean value.
- **divider** – Specifies whether the component should have a divider. This property accepts a boolean value. The divider is added in the center of the layout gap. The divider is either added horizontally or vertically, depending on the layout direction.
- **vertical** –  Specifies whether the component should have a vertical layout. This property accepts a boolean value.

The options can be added to the option rules, the following code shows how the sticky property is applied.

```ts
export const page = {
  type: "Page",
  components: [
    {
      type: "oryx-composition",
      options: {
        rules: [{ layout: "list", sticky: true }],
      },
    },
  ],
};
```

The layout options can be applied regardless of the layout type.

## Styling Properties for Compositions

When working with compositions in Oryx, you have the ability to apply various styling properties to customize the appearance of your components. These styling properties can be set using the rules option in the component's configuration.

Here are the available styling properties that can be set for compositions:

- z-index: Specifies the stacking order of the component.
- grid-column: Specifies the placement of the component within the grid columns.
- grid-row: Specifies the placement of the component within the grid rows.
- max-height: Specifies the maximum height of the component.
- align: Specifies the horizontal alignment of the component.
- justify: Specifies the vertical alignment of the component.
- inset-block-start: Specifies the top position of the component.
- height: Specifies the height of the component.
- width: Specifies the width of the component.
- margin: Specifies the margin of the component.
- border: Specifies the border of the component.
- border-radius: Specifies the border radius of the component.
- background: Specifies the background color of the component.
- aspect-ratio: Specifies the aspect ratio of the component.
- overflow: Specifies the overflow behavior of the component.
- transform: Specifies the transformation applied to the component.
- font-size: Specifies the font size of the component.
- font-weight: Specifies the font weight of the component.
- line-height: Specifies the line height of the component.

## Apply layouts

There are different ways to leverage the Oryx layout system.

- Configure layout in a page or composition
- Configure layout in (some) components
- Integrate the `<oryx-layout>` component in your code
- Integrate the `LayoutMixin` in your code

### Use layout in compositions

The most common approach is to apply a layout to [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html). Compositions are integrated with the layout system, so that you can apply layout types and properties to the list of components that they host.

[Pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html) use compositions under the hood, which is why you can apply layout to the page options as well.

The following example shows how a layout type, a layout option and layout styles are applied to a composition.

```ts
export const page = {
  type: "Page",
  components: [
    {
      type: "oryx-composition",
      options: {
        rules: [{ layout: "list", sticky: true }],
      },
    },
  ],
};
```

### Use layout component in your code

You can use the layout component in your code and provide the layout and layout options:

```html
<oryx-layout layout="carousel" layout-sticky> ... </oryx-layout>
```

If you like to leverage component options, including layout options in the hardcode component, you can either provide an associated experience data `uid` or the `options` attribute.

<!-- TODO: link to component options when this doc is available -->

Another option would be to integrate with the `CompositionComponent` as the layout and options are automatically assigned based on the composition `uid`.

```html
<oryx-composition uid="component-uid"></oryx-composition>
```

This approach is used in some Oryx components, such as the `CartTotalsComponent`.

### Use layout mixin in your code

Another option to use layout in your components is by using the `LayoutMixin`. The `LayoutMixin` provides the layout component properties and integration the layout logic automatically, without adding the `oryx-layout` element.

An example of using this approach can be found in the `ProductListComponent`. The product list component uses the layout mixin so that the layout can be applied to the component directly. The following code shows the integration of the `LayoutMixin`.

```ts
@hydrate()
export class ProductListComponent extends LayoutMixin(LitElement) {
  protected override render(): TemplateResult {
    // apply the layout html inside the returned TemplateResult
    return html`${unsafeHTML(`<style>${this.layoutStyles()}</style>`)}`;
  }
}
```

The mixin provides the `layoutStyles()` method to integrate the styles into the component html. The resolved layout and associated CSS styles are loaded inside a `<style>` element.
