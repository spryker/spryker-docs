---
title: Application plugins
description: Plugins of the Oryx Application
template: concept-topic-template
---

# Application plugins

`AppPlugin` is the main building block of the [Oryx application builder](./app-builder.md).
It allows anyone to extend Oryx core without modifying the core code of the framework.

All of the buil-in functionality is built as plugins and as such may be easily extended
or even replaced with custom implementations.

The plugin is a simple interface that defines:

- It's name string (`getName`)
- Main life-cycle method (`apply`)
- Optional cleanup method (`destroy`)

When a plugin is registered on the Oryx application builder it will then be "applied"
by invoking the `AppPlugin.apply()` method with `App` instance as an argument
and then it's up to a plugin to decide what it should do and how.

There are 2 extra optional plugin life-cycle methods available:

- `AppPluginBeforeApply` which will allow a plugin to be invoked before the main life-cycle method is called of all the registered plugins
- `AppPluginAfterApply` which will allow a plugin to be invoked after the main life-cycle method is called of all the registered plugins

So in case your plugin relies on the other plugins to be invoked before/after your plugin
you should use those specific life-cycle methods.

You should never rely on the order of the registration of the plugins to the Oryx application builder.

To get access to registered plugins in Oryx application see [Interacting with plugins](./app.md#interacting-with-plugins) section.

## Built-in plugins

There are several built-in core plugins which are port of the Oryx core:

- `ComponentsPlugin`
- `InjectionPlugin`
- `ResourcePlugin`
- `ThemePlugin`

### ComponentsPlugin

This plugins adds support for the Oryx components, allows their definition, lazy-loading
and observation of the DOM to load compnents on demand.

Whenever components are added to the Oryx application either via a feature or via builder
this plugin will be automatically configured and used.

The plugin exposes the following API:

- To register components at runtime which may be used to implement
  custom strategies for discovery and lazy-loading of components (`registerComponents`)

For example, to register more component:

```ts
import { ComponentsPlugin } from '@spryker-oryx/core';

app.requirePlugin(ComponentsPlugin).registerComponents([
  ... // <-- Component definitions go here
])
```

### InjectionPlugin

This plugin adds support for the dependency injection system (DI) for the Oryx application.

Whenever DI providers are added to the Oryx application either via a feature or via builder
this plugin will be automatically configured and used.

It will also expose `App` instance to DI under `AppRef` token which may be used in the app:

```ts
import { AppRef } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';

class MyService {
  constructor(private app = inject(AppRef)) {
    // Use `app` here
  }
}
```

The plugin exposes the following API:

- To get the injector that it has created (`getInjector`)
- To re-create the injector with the configured providers (`createInjector`)

For example, to get injector and inject something from it:

```ts
import { InjectionPlugin } from '@spryker-oryx/core';

app.requirePlugin(InjectionPlugin).inject(...)
```

### ResourcePlugin

This plugin adds support for the resources lazy-loading for the Oryx application.

Whenever resources are added to the Oryx application either via a feature or via builder
this plugin will be automatically configured and used.

The plugin exposes the following API:

- Get all registered resources (`getResources`)
- Load grapgical resource (`getGraphicValue`)

For example, to get all resources:

```ts
import { ResourcePlugin } from '@spryker-oryx/core';

app.requirePlugin(ResourcePlugin).getResources();
```

### ThemePlugin

This plugin adds support for the themes for the Oryx application.

Whenever a theme is added to the Oryx application via builder
this plugin will be automatically configured and used.

The plugin exposes the following API:

- Get configured icons (`getIcons`)
- Get specific icon (`getIcon`)
- Get configured breakpoints (`getBreakpoints`)
- Resolve component theme (`resolve`)
- Normalize styles (`normalizeStyles`)
- Interpolate media queries (`generateMedia`)

For example, to get all icons:

```ts
import { ThemePlugin } from '@spryker-oryx/core';

app.requirePlugin(ThemePlugin).getIcons();
```
