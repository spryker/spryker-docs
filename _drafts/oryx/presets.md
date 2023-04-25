---
title: Presets
description: Presets are used to install predefined applications
template: concept-topic-template
last_updated: Apr 4, 2023
---

The [presets package](https://www.npmjs.com/package/@spryker-oryx/presets) contains standard feature sets and resources that are used to create sample applications without writing [boilerplate](./boilerplate.md). Presets might be too opinionated to use for a production application, but they are a great way to get started quickly.

Presets are typically used to demonstrate or try out Oryx applications in a fast manner. Product applications will most likely setup the boilerplate in more optimized way, by leaving out features that are not used.

Because presets are coming with a full feature set, they are likely not the perfect production setup for your project. In a production setup, you might want to skip some features.

## Dependencies

Presets are provided in a separate [npm package](https://www.npmjs.com/package/@spryker-oryx/presets).

The standard boilerplate uses the presets as the single package to install Oryx applications. The preset application contains dependencies on _all_ [Oryx npm packages](https://www.npmjs.com/org/spryker-oryx). This is done intentionally to ease the (demo) installation. However, for production installation, you are unlikely to need all the packages. Instead of using presets, for a production application, it  makes more sense to go for a fine-grained setup.

## Feature sets

A feature set contains a group of features that can be added with a single reference. A good example of using a feature set is provided in the little boilerplate code:

```ts
import { appBuilder } from "@spryker-oryx/core";
import { b2cFeatures } from "@spryker-oryx/presets";

export const app = appBuilder().withFeature(b2cFeatures).create();
```

The `b2cFeatures` feature set contains a list of features that exposes all the available b2c features:

```ts
export const b2cFeatures: AppFeature[] = [
  productFeature,
  cartFeature,
  checkoutFeature,
  userFeature,
  ...
```

## Themes

The overarching UI of the application is driven by themes. To get you up and started with a default theme, you can import the theme from the preset package and apply it to your Oryx application:

```ts
import { appBuilder } from "@spryker-oryx/core";
import { b2cFeatures, b2cTheme } from "@spryker-oryx/presets";

export const app = appBuilder()
  .withFeature(b2cFeatures)
  .withTheme(b2cTheme)
  .create();
```

The theme contains mainly design tokens that are used inside the components styles.

## Resources

Most web applications use a `/public` folder to host static resources. This requires a folder in the boilerplate code (or a process to generate it) that is not easy to upgrade over time.

Resources are an alternative approach, that allow for (lazy loading) web resources into Oryx applications. The most common example of a resource is an image or icon.

Resources are lazily loaded, so that the runtime performance is not affected when a lot of resources are used.

You can use resources in your application, by using the `appBuilder()` api:

```ts
import { appBuilder } from '@spryker-oryx/core';

const app = appBuilder()
  .withFeatures(...),
  .withResources(myResources);
  .create();
```

As an application developer you can create your own resources:

```ts
import { Resources } from "@spryker-oryx/core";

const myResources: Resources = {
  graphics: {
    logo: { source: () => import("./my-logo").then((m) => m.default) },
    otherImg: {
      source: () => import("./my-other-img").then((m) => m.default),
    },
  },
};
```
