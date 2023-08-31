---
title: "Oryx layout system"
description: Component layout is not hardcoded in components, but applied as part of a composition
last_updated: Augustus 31, 2023
template: concept-topic-template
---

# Oryx Layout

## Introduction

In Oryx, components are rendered within [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-compositions/oryx-compositions.html). The layout of the components is not hardcoded in the composition or components, but rather provided by a configurable layout type in the composition options. The actual layout style rules are provided based on the given layout type.

This flexibility allows for a high degree of reusability and adaptability in the design and structure of your application. This approach allows for easy changes to layouts on the fly, providing a dynamic and flexible user interface.

Furthermore, layouts can be A/B tested or personalized based on the individual user or context. This allows for a more tailored user experience and can lead to improved user engagement and conversion rates.

## Layout Types

In Oryx, the layout system is built around a column based grid. This grid system provides the foundation for various layout types such as column, grid, carousel, split, etc. Each of these layout types offers unique characteristics and capabilities, allowing for a wide range of design possibilities.

The number of columns that is used in the grid system can be controlled the `--oryx-column-base` design token, which defaults to the following values:

| Screen | Default |
| ------ | ------- |
| large  | `12`    |
| medium | `8`     |
| small  | `4`     |

All layouts provide the ability for components to span rows and columns. This may sounds pretty standard for a grid layout, but for a carousel this allows for exciting usage. You can for example dynamically configure a product in a carousel to span to columns, in case it requires more space (think of a product bundle).

### Column Layout

The Column layout use a single column for each component. Each component uses a single element of the grid system configured per screen.

### Grid Layout

The Grid layout uses a number of columns from the column system to render each component. The number of columns used per element is configurable by the design token `--oryx-column-grid`, which defaults to the following values.

| Screen | Default |
| ------ | ------- |
| small  | `4`     |
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

| Screen | Equal | Main | Aside  |
| ------ | ----- | ---- | ------ |
| large  | `6`   | `8`  | `3`    |
| medium | `4`   | `5`  | `2.66` |

On small screens, the Split layout adapts by using only one column, with the "second" column moving below the first. This responsive behavior ensures that the layout remains functional and visually appealing across a wide range of devices and screen sizes.

## Layout Container

In Oryx, the layout container is a crucial element that wraps the content of a page and provides a consistent structure across different layouts. It is responsible for setting the maximum width of the content and centering it on the screen. This ensures a consistent visual experience across different screen sizes and resolutions.

The layout container can be configured using the `--oryx-layout-container-width` design token. This token sets the maximum width of the container, which defaults to maximum `1340px`. Smaller screen will render 100% of the viewport as the maximum size.

The minimum bleed that is rendered outside the container, can be configured using the `--oryx-layout-container-bleed` design token and defaults to the following values:

| screen | bleed  |
| ------ | ------ |
| Large  | `50px` |
| Medium | `30px` |
| Small  | `16px` |

## Nested layouts

Layouts can be nested. You can for example nest a carousel inside a grid. The underlying grid system guarantees that each element has the same size, regardless on whether it's in the global layout or in a nested layout.

## Layout Options

Oryx provides the ability to add layout options that are agnostic of the specific layout type. These styling properties can be set using the rules option in the component's configuration.

Here are the available layout options that can be set for compositions:

- sticky: Specifies whether the component should have a sticky position. This property accepts a boolean value.
- bleed: Specifies whether the component should exceed the bleed of the layout container. This property accepts a boolean value.
- overlap: Specifies whether the component should overlap with other components. This property accepts a boolean value.
- divider: Specifies whether the component should have a divider. This property accepts a boolean value.
- vertical: Specifies whether the component should have a vertical layout. This property accepts a boolean value.

These styling properties can be used to create unique and visually appealing compositions in your application.

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

These properties can be used to create unique and visually appealing compositions in your application.
