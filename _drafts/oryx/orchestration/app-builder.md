---
title: Application builder
description: Builder of the Oryx Application
template: concept-topic-template
---

# Application builder

Application builder allows you to compose and customise different pieces of functionality
in your Oryx application.

It is a chainable and pluggable builder which supports the following built-ins:

- [Features](./app-feature.md) (`withFeature`)
- [Components](/docs/drafts/components/index.md) (`withComponents`)
- [Providers](TODO: Link to providers) (`withProviders`)
- [Themes](/docs/drafts/theme/configuration.md) (`withTheme`)
- [Options](#options) (`withAppOptions`)
- [FeatureOptions](./app-feature.md) (`withOptions`)
- [Environment](./app-environment.md) (`withEnvironment`)
- [Resources](./resources.md) (`withResources`)
- [Plugins](./app-plugins.md) (`with`)

All of the above are built-in plugins but you can also
add your custom plugins by using `with` API:

```ts
import { appBuilder, AppPlugin, App } from '@spryker-oryx/core';

class MyPlugin implements AppPlugin {
  apply(app: App) {
    // Your plugin logic goes here
  }
}

appBuilder().with(new MyPlugin());
```

After all of the pieces have been registered you can create an app
by using `create` API which will return you a promise of the app:

```ts
import { appBuilder } from '@spryker-oryx/core';

const app = appBuilder().create();
```

See [`App`](/docs/drafts/app-orchestrator/app.md) to learn more about it's usage.

# Options

When you are configuring your Oryx application you may need to customise
some of it's options which have a reasonable defaults but may not suit your needs.

For this you can use `AppBuilder.withAppOptions()` API which allows you to customise:

- Injector, it's parent and context
- Global component options such as root mounting selector

Here is one example how you can use it:

```ts
import { appBuilder } from '@spryker-oryx/core';

appBuilder().withAppOptions({ components: { root: 'my-root-app' } });
```
