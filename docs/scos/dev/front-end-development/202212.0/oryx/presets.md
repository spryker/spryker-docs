---
title: Presets
description: Presets are used to install predefined applications
template: concept-topic-template
last_updated: Apr 4, 2023
---

The [presets package](https://www.npmjs.com/package/@spryker-oryx/presets) contains standard feature sets and resources that are used to create sample applications without writing [boilerplate](/docs/scos/dev/front-end-development/{{page.version}}/oryx/boilerplate.md). Presets might be too opinionated to use for a production application, but they let you get started quickly.

Presets are typically used to demonstrate or try out Oryx applications. In product applications, the boilerplate is set up in more optimized way, by leaving out the features that are not used.

## Dependencies

Presets are provided in a separate [npm package](https://www.npmjs.com/package/@spryker-oryx/presets).

The standard boilerplate uses the presets as the single package to install Oryx applications. To simplify the installation, the preset application contains dependencies on _all_ [Oryx npm packages](https://www.npmjs.com/org/spryker-oryx). Because a production application is unlikely to use all the packages, it makes sense to leave out the unneeded ones.

## Feature sets

A feature set contains a group of features that can be added with a single reference. A good example of using a feature set is provided in the boilerplate code:

```ts
import { appBuilder } from "@spryker-oryx/core";
import { b2cFeatures } from "@spryker-oryx/presets";

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

For more information about feature sets, see [Feature sets](./feature-sets.md)

## Themes

The overarching UI of the application is driven by themes. To get started with a default theme, you can import it from the preset package and apply it to your Oryx application:

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

Most web applications use a `/public` folder to host static resources. This requires a folder in the boilerplate code or a process to generate it, which is not easy to upgrade over time.

Resources are an alternative approach, which allows for lazy loading of web resources into Oryx applications. The most common example of a resource is an image or icon.

Resources are lazily loaded, so that the runtime performance is not affected when a lot of resources are used.

You can use resources in your application by using the `appBuilder()` API:

```ts
import { appBuilder } from '@spryker-oryx/core';

const app = appBuilder()
  .withFeatures(...),
  .withResources(myResources);
  .create();
```

As an application developer, you can create your own resources:

```ts
import { Resources } from "@spryker-oryx/core";

const myResources: Resources = {
  graphics: {
    logo: { source: () => import("/docs/scos/dev/front-end-development/{{page.version}}/oryx/my-logo").then((m) => m.default) },
    otherImg: {
      source: () => import("/docs/scos/dev/front-end-development/{{page.version}}/oryx/my-other-img").then((m) => m.default),
    },
  },
};
```
