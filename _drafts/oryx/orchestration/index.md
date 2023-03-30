---
title: Application orchestration
description: Orchestration of the Oryx Application
template: concept-topic-template
---

# Orchestrate an Oryx Application

Any Oryx application starts with the application orchestration.
It allows you to compose/configure your application from reusable bits and pieces such as:

- [Features](./app-feature.md)
- [Components](TODO: Link to components)
- [Providers](TODO: Link to providers)
- [Themes](TODO: Link to themes)
- [Resources](./resources.md)
- [Environment](./app-environment.md)

Application orchestration is used to configure and customize your
Oryx application to your particular needs.
As Oryx is a framework it provides many different pieces of functionality
for different use cases such as B2B, B2C, Backoffice, Fulfillment, etc.
And to be able to select specific pieces from Oryx you can use orchestration
to pick the features that you need and also customize them as required.

Application orchestration is managing what pieces of functionality will be available
in the Oryx application and how they are going to be loaded.
For example components will be lazy-loaded when they are used on the page
but services will be eagerly loaded during application startup.

To start using orchestration you need to import [`AppBuilder`](./app-builder.md)
from the `@spryker-oryx/core` and then you can start composing your own set of features
with it by adding features, theme, etc. to your application.

`AppBuilder` uses a chain pattern where each customization is added via respective `.with*` method.
This is the minimum boilerplate code that your application requires in order to work.

Once you start building more complex use-cases in your Oryx application it is recommended
to create your own feature set instead of using a preset or extend existing feature set.

# Example

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

Now you have fully up and running Oryx [`App`](./app.md) instance tailored to your needs!

---

To dive deeper into details of application orchestration check out:

- [Configure application](./app-builder.md)
- [Setup the environment](./app-environment.md)
- [Add features](./app-feature.md)
- [Add components](/docs/drafts/components/index.md)
- [Configure providers](TODO: Link to providers)
- [Add resources](./resources.md)
- [Add theme](/docs/drafts/theme/configuration.md)
- [Add plugins](./app-plugins.md)
- [Interact with application](./app.md)
