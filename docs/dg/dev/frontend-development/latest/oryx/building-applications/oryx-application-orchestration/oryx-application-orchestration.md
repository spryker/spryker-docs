---
title: Oryx application orchestration
description: Orchestration of the Oryx Application
template: concept-topic-template
last_updated: Oct 24, 2023
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/oryx/oryx-application-orchestration/oryx-application-orchestration.html
  - /docs/scos/dev/front-end-development/202404.0/oryx/building-applications/oryx-application-orchestration/oryx-application-orchestration.html

---


An Oryx application starts with the application orchestration. It lets you bootstrap and configure your application from reusable bits and pieces, such as the following:

- [Features](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-feature.html)
- Components <!-- TODO: Link to components -->
- [Providers](/docs/dg/dev/frontend-development/latest/oryx/architecture/dependency-injection/dependency-injection-providing-services.html)
- Themes <!-- TODO: Link to themes -->
- Resources <!-- TODO: Link to resources -->
- [Environment](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-environment.html)

Application orchestration is used to configure and customize Oryx applications. As Oryx is a framework, it provides different pieces of functionality for different use cases, like B2B, B2C, Back Office, or Fulfillment. And orchestration lets you select specific functionality from Oryx to match your use case.

Also, application orchestration defines how functionality is loaded in an application. For example, when components are used on a page, they are lazy-loaded, but, during application startup, services are loaded eagerly.

## Application builder

To start using orchestration, you need to import `appBuilder`from `@spryker-oryx/core`. Then, you can add functionality, like features and theme, to your application.

`appBuilder` uses a chain pattern where each customization is added using a respective `.with*` method. This is the minimum boilerplate code required for an application to work. Once you start building more complex use cases, instead of using a [preset](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-presets.html), we recommend extending a preset or creating your own feature set.

Application builder lets you compose and customize different pieces of functionality. The builder is chainable and pluggable, and it supports the following built-in plugins:

- [Features](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-feature.html): `withFeature`
- Components: `withComponents` <!-- TODO: Link to components -->
- Providers: `withProviders` <!-- TODO: Link to providers -->
- Themes: `withTheme` <!-- TODO: Link to themes -->
- [Options](#customization-of-options): `withAppOptions`
- [FeatureOptions](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-feature.html): `withOptions`
- [Environment](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-environment.html): `withEnvironment`
- Resources: `withResources`
- [Plugins](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-plugins.html): `with`

Also, you can add custom plugins by using the `with` API.

## Application setup

Here is an example of a simple B2C application setup:

```ts
import { appBuilder } from '@spryker-oryx/core';
import { b2cFeatures, b2cTheme } from '@spryker-oryx/oryx-presets';

const app = appBuilder()
  .withFeature(b2cFeatures)
  .withTheme(b2cTheme)
  .withEnvironment(import.meta.env);
```

To create the application with this configuration, run the following:

```ts
app.create().catch(console.error);
```

Now the application is up and running.

## Customization of options

When you are configuring an Oryx application, you may need to customize some of its options which have a reasonable defaults but may not suit your needs.

For this, you can use the `appBuilder.withAppOptions()` API, which lets you customize the following:

- Injector, it's parent, and context.
- Global component options, like a root mounting selector.

Here is an example of using it:

```ts
import { appBuilder } from '@spryker-oryx/core';

appBuilder().withAppOptions({ components: { root: 'my-root-app' } });
```

## Next steps

For more details about application orchestration, see the following documents:

- [Set up the environment](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-environment.html)
- [Add features](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-feature.html)
- Add components <!-- TODO: Link to components -->
- Configure providers <!-- TODO: Link to providers -->
- Add resources <!-- TODO: Link to resources -->
- Add theme <!-- TODO: Link to theme -->
- [Add plugins](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application-plugins.html)
- [Interact with application](/docs/dg/dev/frontend-development/latest/oryx/building-applications/oryx-application-orchestration/oryx-application.html)
