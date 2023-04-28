---
title: Oryx application orchestration
description: Orchestration of the Oryx Application
template: concept-topic-template
---

Any Oryx application starts with the application orchestration.
It allows you to bootstrap and configure your application from reusable bits and pieces such as:

- [Features](./app-feature.md)
<!-- TODO: Link to components -->
- Components
<!-- TODO: Link to providers -->
- Providers
<!-- TODO: Link to themes -->
- Themes
- [Resources](./resources.md)
- [Environment](./app-environment.md)

Application orchestration is used to configure and customize an Oryx application to your particular needs.
As Oryx is a framework, it provides many different pieces of functionality for different use cases, like B2B, B2C, Back Office, or Fulfillment. And to be able to select specific features from Oryx, you can use orchestration.

Application orchestration is defining the functionality and how it is going to be loaded in an Oryx application. For example, when components are used on a page, they  are lazy-loaded, but services are loaded eagerly during application startup.

To start using orchestration, you need to import [`appBuilder`](./app-builder.md) from `@spryker-oryx/core`. Then, you can add functionality, like features and theme, to your application.

`appBuilder` uses a chain pattern where each customization is added using a  respective `.with*` method. This is the minimum boilerplate code required for an  application to work.

Once you start building more complex use cases in your Oryx application, instead of using a preset, we recommend extending it or creating your own feature set.

Application builder lets you compose and customize different pieces of functionality in your Oryx application.

It is a chainable and pluggable builder which supports the following built-ins:

- [Features](./app-feature.md) (`withFeature`)
<!-- TODO: Link to components -->
- Components (`withComponents`)
<!-- TODO: Link to providers -->
- Providers (`withProviders`)
<!-- TODO: Link to themes -->
- Themes (`withTheme`)
- [Options](#options) (`withAppOptions`)
- [FeatureOptions](./app-feature.md) (`withOptions`)
- [Environment](./app-environment.md) (`withEnvironment`)
- [Resources](./resources.md) (`withResources`)
- [Plugins](./app-plugins.md) (`with`)

All of the above are built-in plugins but you can also add your custom plugins by using `with` API:

## Example

This is an example of the simple B2C application setup:

```ts
import { appBuilder } from '@spryker-oryx/core';
import { b2cFeatures, b2cTheme } from '@spryker-oryx/presets';

const app = appBuilder()
  .withFeature(b2cFeatures)
  .withTheme(b2cTheme)
  .withEnvironment(import.meta.env);
```

Once you are satisfied with your application configuration it's time to create it:

```ts
app.create().catch(console.error);
```

Now you have fully up and running Oryx [`App`](./app.md) instance tailored to your needs.

## Options

When you are configuring your Oryx application, you may need to customize some of its options which have a reasonable defaults but may not suit your needs.

For this you can use `appBuilder.withAppOptions()` API which allows you to customize the following:

- Injector, it's parent and context
- Global component options, like a root mounting selector

Here is an example of using it:

```ts
import { appBuilder } from '@spryker-oryx/core';

appBuilder().withAppOptions({ components: { root: 'my-root-app' } });
```


---

To dive deeper into details of application orchestration check out:

- [Setup the environment](./app-environment.md)
- [Add features](./app-feature.md)
<!-- TODO: Link to components -->
- Add components
<!-- TODO: Link to providers -->
- Configure providers
<!-- TODO: Link to resources -->
- Add resources
<!-- TODO: Link to theme -->
- Add theme
- [Add plugins](./app-plugins.md)
- [Interact with application](./app.md)
