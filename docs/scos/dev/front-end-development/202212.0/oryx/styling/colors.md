---
title: "Oryx: Color system"
description: Color design tokens are used for a consistent design system through the components in Oryx applications
last_updated: July 9, 2023
template: concept-topic-template
---

An important part of the application user interface are the colors. Colors are used everywhere throughout components and are important for a good user experience. To ensure that you can adjust the colors to your needs throughout the application, a configurable color system is provided.

The color system allows to setup the color values globally as well as override them per component. Components do not define _values_ for colors directly in their CSS, but use _design tokens_. Design tokens are (CSS) variables that are provided by themes, which you can customize in your project.

The color system comes with semantic color types and a consistent number of color steps. This results in a consistent naming system throughout all the components. The actual colors for those groups are not relevant for the color system and are part of the theme configuration. This allows you to configure the colors in a global theme.

## The color palette

The color palette provides a number of colors that you can use to quickly setup an Oryx application with the color of your choice. This is particular useful to demonstrate and experience how consistent the color system is applied cross all components. All colors in the color palette are fully accessible by default, both in light and dark mode.

The color palette contains all the colors provided by the [Radix color system](https://www.radix-ui.com/docs/colors/overview/installation), an open source colors system. Additionally, a "Spryker green" and "Spryker gray" is added.

### Color contrast

Color contrast is an important accessibility feature. When colors do not have enough contrast, users with limited sight might not be able to use the experience to its full extend.

Color contrast is provided by 2 colors. The color system provides 13 color shades which can be used to create enough contrast. The Oryx design system as well as the application components are fully equipped to provide enough contrast, even if you configure an alternative color from the palette. However, if you provide a custom color, you should test the colors to be accessible.

### Color mode

Colors can be provided for both light and dark mode. Dark mode is another important feature for accessibility and is supported by all colors in the color palette. Oryx applications can automatically adapt to the device mode as well, but there's also a `ColorModeSelectorComponent` that can be used to let the user manage the color mode manually.

## Semantic color types

There are 8 semantic color types used in Oryx components.

| Type      | Description                                                                                                                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary   | Typically represents the brand color of a site. This color is used as the call-to-action color in many components.                                                                                                                              |
| Secondary | Additional accent color that can be used for more color full experiences. Oryx components rarely use the secondary color.                                                                                                                       |
| Neutral   | Also known as "grays". The neutrals are used for the layout, for example as a divider color or background color. The Radix color system provides different neutrals that pair nicely with the color of choice, also known as "natural pairing". |
| Highlight | The highlight color is used to highlight a sale.                                                                                                                                                                                                |
| Success   | The success color is one of the `AlertType` color that is used in components that are driven by `AlertType` (e.g. Notification).                                                                                                                |
| Info      | Similar to Success.                                                                                                                                                                                                                             |
| Warning   | Similar to Success.                                                                                                                                                                                                                             |
| Error     | Similar to Success.                                                                                                                                                                                                                             |

## Color steps

Each color type comes in 13 values, also known as steps. Components might not use all the steps of a color, but there are enough to provide enough nuance and create accessible experiences.

The steps count from 0 - 12. In light mode, the steps goes from light to dark; the higher the number, the darker the color. In dark mode, this is reversed.

The Radix color system provide 15 color scales that are designed with a white foreground text and 5 bright scales for black foreground text. The foreground color is provided by step 0. For the bright colors, this color is black, while for the other colors this is white. In dark mode, this is obviously reversed.

The color values can be of any supported color in the web platform, such as named colors ('red', 'blue', etc), hex color, hcl, rba, etc. Oryx does not interfere with the provided colors, but use them as-is.

## Custom the colors

### Configure a color from the color palette

To change the colors in an Oryx application, you can configure the colors using the color palette. This is convenient and the recommended approach to quickly try out the color system.

```ts
import { appBuilder } from "@spryker-oryx/application";
import { colorPalette } from "@spryker-oryx/experience";

appBuilder().withTheme({
  designTokens: [
    {
      color: {
        primary: colorPalette.colors.sky,
        secondary: colorPalette.grays.slate,
      },
    },
  ],
});
```

### Configure custom colors

The palette provides a range of colors and can be conveniently applied. But there's a good change that your exact color of choice is not provided by the pallette. You can configure exact colors using an extended configuration.

```ts
import { appBuilder } from "@spryker-oryx/application";

appBuilder().withTheme({
  designTokens: [
    {
      color: {
        primary: {
          light: {
            0: "lightblue",
            1: "blue",
            // etc, up to 12
          },
          dark: {
            0: "blue",
            1: "lightblue",
            // etc, up to 12
          },
        },
      },
    },
  ],
});
```

Providing both the light and dark mode is optional (but recommended), and will only be used if you do support both light and dark mode.

## Color design tokens

Each color type and its values is provided as a design token. Design tokens are provided as CSS variables to the root of the application. The color design tokens follow a consistent naming pattern, so that it's easy to integrate in your components:

`--oryx-color-[type]-[step]`

For example, when you like to create a solid button with an accessible foreground text color, you could do the following:

```css
button {
  color: var(--oryx-color-primary-0);
  background: var(--oryx-color-primary-9);
}

button:hover {
  background-color: var(--oryx-color-primary-10);
}
```

This would work consistently with all colors. The buttons will have a white foreground color on a colorful background, unless the background color is bright; in that case, the foreground color will become black.

The following example shows the usage of design tokens in CSS. The primary color is defined for the default state of the the button background color. When the user hovers over the button, the 400 color shade is used.
