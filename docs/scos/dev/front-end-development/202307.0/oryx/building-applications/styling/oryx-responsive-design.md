---
title: "Oryx's Responsive Design system"
description: Learn how to leverage Oryx's Responsive Design system to create stunning and user-friendly websites and applications that seamlessly adapt to different screen sizes and devices.
last_updated: October 3rd, 2023
template: concept-topic-template
---

In today's digital landscape, it is crucial to create websites and applications that adapt seamlessly to different screen sizes and devices. Oryx's Responsive Design system empowers developers to implement designs for a variety of screen sizes and layouts without in a convenient way.

Oryx's Responsive Design System provides various screen sizes which you can redefine when needed. The associated CSS styles, that are linked to the screen sizes will adapt automatically to the configuration that your provide for your application. This makes the Responsive Design System useful for different types of applications. For example, if you need to build a business application where users will have a large screen available, you can optimize the layout of your application to benefit from all the available space.

The responsive design system works closely with other styling techniques in Oryx, such as layouts, [design tokens](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/styling/oryx-design-tokens.html), themes and [typography](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/styling/oryx-typography.html) and play an important role in some of the design system components, such as media and images.

<!-- Add link to layout docs when they're published -->
<!-- Add link to themes docs when they're published -->
<!-- Add link to (design system) components docs when they're published -->

## Screen sizes

Oryx is designed to render applications and their components on a variety of devices, from smartphones and tablets to desktop monitors or even smartwatches. The Design System is not connected to the various devices, but the screen sizes associated to those devices. Screen sizes are not one to one related to devices. A small screen design, for example, is not only used for mobile devices, but can also be used on large screens in physical stores.

Oryx provides five t-shirt size values, that are given by a generic `size` enumeration, that can be imported from the [utilities package](https://www.npmjs.com/package/@spryker-oryx/utilities).

| Screen      | Code | Enum breakpoint | Example devices                  |
| ----------- | ---- | --------------- | -------------------------------- |
| Extra small | `xs` | `Size.Xs`       | Small phone, Smart Watch         |
| Small       | `sm` | `Size.Sm`       | Smart phone, instore application |
| Medium      | `md` | `Size.Md`       | Tablet                           |
| Large       | `lg` | `Size.Lg`       | Desktop                          |
| Extra large | `xl` | `Size.Xl`       | Wide screen                      |

While the `xs` and `xl` sizes are available in the typescript enumeration, they are not used in most Oryx components and layouts. You can however use the definitions to create an optimized user experience for these screen sizes. Moreover, you can introduce additional screen sizes in case you need.

The actual screen definition is provided by a breakpoint configuration and can be referenced by their code. If you need to use the screen definitions in your custom code, you can use the `ScreenService`, provided by the [layout package](https://www.npmjs.com/package/@spryker-oryx/layout).

{% info_block infoBox "" %}

Screen sizes might be confusing in some cases. For example, when you browser an Oryx application on a wide screen in a smaller browser window, the physical screen size is not relevant, as the browser viewport is used to indicate the screen size.

{% endinfo_block %}

## Breakpoints

Breakpoints play a crucial role in responsive design, as they define the specific screen sizes at which your website or application layout should adapt. Oryx's Responsive Design system provides default breakpoint for small, medium and large screen sizes. You can adjust the defaults or introduce custom breakpoints to tailor the design system to your specific needs.

Breakpoints are configurable in themes. If you use an Oryx theme it comes with preconfigured breakpoints, but you can override the breakpoints in an additional theme configuration.

{% info_block infoBox "" %}

You'd assume that breakpoints and their usage would be controlled by design tokens, and used as CSS variables. Unfortunately, CSS variables can not be used inside media queries definitions. This is the main reason why Oryx provides a configurable system to provide the breakpoint definitions.

{% endinfo_block %}

### Default Breakpoints

Oryx provides the following default breakpoints for three screen sizes.

| Screen size | Breakpoints                      |
| ----------- | -------------------------------- |
| Small       | Smaller than `"768px"`           |
| Medium      | Between `"768px"` and `"1023px"` |
| Large       | Larger than `"1023px"`           |

The default breakpoints are given by the `defaultBreakpoints` object, available in the [themes](https://www.npmjs.com/package/@spryker-oryx/themes) package. The breakpoint values are configured in pixels.

```ts
import { Breakpoints, Size } from "@spryker-oryx/utilities";

export const defaultBreakpoints: Breakpoints = {
  [Size.Sm]: {
    max: 767,
  },
  [Size.Md]: {
    min: 768,
    max: 1023,
  },
  [Size.Lg]: {
    min: 1024,
  },
};
```

The breakpoint definition shows that you only need to define the required breakpoint min or max values. For example, there's no `min` value provided for small size, as it will default to `0`. The same is true for the large screen, which starts with 1024 and will support all screens that are larger than the 1024 px.

### Custom Breakpoints

By utilizing custom breakpoints, you can create a responsive design that is tailored to your project's needs and provides an optimal user experience across different devices and screen sizes.

Breakpoints are part of Oryx themes. Oryx themes use the default configuration, but you can configure a(n additional) theme with custom breakpoints.

```ts
import { Size } from "@spryker-oryx/utilities";

export const app = appBuilder()
  // ...
  .withTheme([storefrontTheme])
  .withTheme({
    breakpoints: {
      [Size.Xs]: {
        max: 575,
      },
      [Size.Sm]: {
        min: 576,
        max: 767,
      },
    },
  })
  .create();
```

In this example, we have defined custom breakpoints for extra-small and small screen sizes. The small screen get's a minimum value and the extra small only requires a max value since it will start with 0 by default.

## Build Responsive Designs

There are various techniques involved to apply responsive designs in your pages and components:

- Components can implement different styles per screen size
- Layouts can implement different styles per screen size
- Images can have different sizes for optimized experiences per screen size
- Experience structures can change per screen size

### Responsive Component Styles

CSS allows to differentiate style rules per screen size, using media queries. Media queries can handle various rules to associate css rules to a screen. In the context of responsive design, we're solely concerned with the width of the viewport. The media query rules are unfortunately not configurable, for example by CSS variables. This is why Oryx provides a mechanism to configure styles per screen size, rather than provide hardcoded media query rules inside the styles.

In order to associate styles to a specific screen size, you can link the styles in the component definition. The styles can be lazily loaded, so that irrelevant styles are not loaded.

<!-- link "component definition" to the component docs once published -->

```ts
export const selectComponent = componentDef({
  name: "oryx-select",
  // ...
  stylesheets: [
    {
      rules: () => import("./styles").then((m) => m.screenStyles),
    },
  ],
});
```

The example above, loads a file (`styles.ts`), that exports `const screenStyles`. The rules are expected to be an array of `CssStylesWithMedia` type, which is exported from the [utilities package](https://www.npmjs.com/package/@spryker-oryx/utilities). The lazy loaded styles can contain either the styles for a single screen size, or various screen sizes.

```ts
const screenStyles: CssStylesWithMedia[] = [
  {
    media: {
      [DefaultMedia.Screen]: Breakpoint.Sm,
    },
    css: css`
      :host {
        // put styles for small screens here
      }
    `,
  },
];
```

{% info_block infoBox "" %}

When you do not need to align your custom styles with configurable breakpoints in your custom code, as the breakpoints are no likely to change, you can avoid the configurable styles in the component definition and use standard media queries in your stylesheets.

{% endinfo_block %}

## Responsive Layouts

The layout system has build in support for responsive layouts, which are driven by [design tokens](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/styling/oryx-design-tokens.html). Layouts, such as a grid or carousel are designed to render different number of items per row or column, depending on the screen size. The number of items is configurable as a design token.

Another important concept for responsive design is the layout container and the page bleed. The layout container has a maximum width, to avoid very wide layouts on users with a large screen. The container size and minimum bleed are configurable as design tokens.

All design tokens are configurable per screen size, which allows you to control the layout per screen, without changing component styles.

The layout system is covered in more detail in the layout documentation.

## Responsive Visibility Rules

Some experiences require an alternative page structure, which means that some components should or should not be rendered in a specific screen size. The Experience Data that you setup for creating [Pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html) and [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html) allows you to define visibility rules. The visibility rules can be configured to hide a composition or component for a specific screen size (next to other more advanced visibility rules).

The following example shows you how to create a simple visibility rule for a specific screen.

```ts
export const headerTemplate = {
  id: 'header',
  // ...
  components: [
    type: 'oryx-content-link',
    // ...
    options: {
        // ...
        rules: [{ query: { breakpoint: Size.Sm }, hide: true }],
    },
  ],
};
```

## Responsive Images

Images are shown in various places throughout the experience. For example, small icon-sized images appear in a typeahead search results and increase in size when they're shown in carousel or grid, and might blow up when you see them in a detail page. Some images require fullscreen size and others are only rendered inside a small layout.

The web platform has several ways to optimized image per viewport. Oryx components, such as the `ProductMediaComponent` and `ImageComponent` design system component are fully equipped to render optimized images for the right screen size and even device pixel density and current network connection speed.

It is however important to have the right images available. This can be done automatically which is offered by 3rd party service.

{% info_block infoBox "" %}

The labs package contains an integration with Cloudinary that could be interesting to evaluate in this context. Cloudinary has an http API that you can use to fill in the right size and quality when you request an image. The media are pulled into Cloudinary CDN, which makes it a performant solution for both the generation and serving of the media.

The Cloudinary integration is an example implementation, which is why it's in the (experimental) labs package.

{% endinfo_block %}
