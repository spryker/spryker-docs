---
title: "Oryx: Presets"
description: Presets are used to install predefined applications
template: concept-topic-template
last_updated: Apr 4, 2023
---

The [presets package](https://www.npmjs.com/package/@spryker-oryx/oryx-presets.html) contains standard feature sets and resources that are used to create sample applications without writing [boilerplate](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-boilerplate.html). Presets might be too opinionated to use for a production application, but they let you get started quickly.

Presets are typically used to demonstrate or try out Oryx applications. In product applications, the boilerplate is set up in more optimized way, by leaving out the features that are not used.

## Dependencies

Presets are provided in a separate [npm package](https://www.npmjs.com/package/@spryker-oryx/oryx-presets.html).

The standard boilerplate uses the presets as the single package to install Oryx applications. To simplify the installation, the preset application contains dependencies on _all_ [Oryx npm packages](https://www.npmjs.com/org/spryker-oryx). Because a production application is unlikely to use all the packages, it makes sense to leave out the unneeded ones.

## Feature sets

A feature set contains a group of features that can be added with a single reference. A good example of using a feature set is provided in the boilerplate code:

```ts
import { appBuilder } from "@spryker-oryx/core";
import { b2cFeatures } from "@spryker-oryx/oryx-presets";

export const app = appBuilder().withFeature(b2cFeatures).create();
```

The `b2cFeatures` feature set contains a list of features that exposes all the available B2C features:

```ts
export const b2cFeatures: AppFeature[] = [
  productFeature,
  cartFeature,
  checkoutFeature,
  userFeature,
  ...
```

Feature sets also contain static experience data. Experience data includes the structure and layout of the components of the application, such as pages and sections. By utilizing the static experience data provided by the presets, you do no need to set up any boilerplate code. Moreover, we avoid hardcoded page structures that would not allow for personalized experiences going forward.

For more information about feature sets, see [Feature sets](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-feature-sets.html)

## Themes

Themes in Oryx play a key role in defining the visual appearance of your application. A theme represents the global typography, colors, and other specific design elements, such as form field placeholder color, that define the overall look and feel of your application.

The theme consists of design tokens, which are configuration values that control the visual aspects of your application. Design tokens allow you to define global typography, colors, spacing, and other visual properties. By configuring these design tokens, you can customize the visual appearance of your application to align with your brand or specific design requirements.

To apply a theme to your Oryx application, you can import it from the preset package and use it during the application setup:

```ts
import { appBuilder } from "@spryker-oryx/core";
import { b2cFeatures, b2cTheme } from "@spryker-oryx/oryx-presets";

export const app = appBuilder()
  .withFeature(b2cFeatures)
  .withTheme(b2cTheme)
  .create();
```

By utilizing themes and design tokens in Oryx presets, you have the flexibility to customize the visual aspects of your application, making it unique and aligned with your branding or specific design preferences.

Themes play a crucial role in maintaining a consistent and coherent visual experience throughout your application. They provide a centralized way to manage and apply design tokens, ensuring a unified look and feel across components and screens.

Take advantage of the themes provided in Oryx presets or create your own themes to tailor the visual appearance of your application according to your specific needs.

## Resources

Most web applications use a `/public` folder to host static resources. This requires a folder in the boilerplate code or a process to generate it, which is not easy to upgrade over time.

Resources are an alternative approach, which allows for lazy loading of web resources into Oryx applications. The most common example of a resource is an image or icon.

Resources are lazily loaded, so that the runtime performance is not affected when a lot of resources are used.

You can add resources to your application with the `appBuilder()` API:

```ts
import { appBuilder } from '@spryker-oryx/core';

const app = appBuilder()
  .withFeatures(...),
  .withResources(myResources);
  .create();
```

As an application developer, you could also create your own resources.

```ts
import { Resources } from "@spryker-oryx/core";

const myResources: Resources = {
  graphics: {
    logo: {
      source: () =>
        import(
          "/docs/scos/dev/front-end-development/{{page.version}}/oryx/my-logo"
        ).then((m) => m.default),
    },
    otherImg: {
      source: () =>
        import(
          "/docs/scos/dev/front-end-development/{{page.version}}/oryx/my-other-img"
        ).then((m) => m.default),
    },
  },
};
```
