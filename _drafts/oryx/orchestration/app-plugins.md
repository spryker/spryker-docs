---
title: Application plugins
description: Plugins of the Oryx Application
template: concept-topic-template
---

# Application plugins

When you create an Oryx Application with the `appBuilder()` function, it creates an instance of `App`. The `App` is a a shell that can be enhanced with (custom) plugins (`AppPlugin`). Plugins allow you to extend Oryx core behaviour without modifying the core code of the framework.

There are several built-in plugins provided by the Oryx framework:

- [`ComponentsPlugin`](#components-plugin)
- [`InjectionPlugin`](#injection-plugin)
- [`ResourcePlugin`](#resource-plugin)
- [`ThemePlugin`](#theme-plugin)

For ordinary application development, there's no need to develop custom plugins.

## Built-in plugins

### Components plugin

The `ComponentsPlugin` is an important plugin that orchestrates the (lazy) loading of components. The plugin registers all the component definitions and loads the implementation whenever required in the DOM.

The plugin exposes the following API:

- `registerComponents()` – registers components

For example, to register more component:

```ts
import { ComponentsPlugin } from '@spryker-oryx/core';

app.requirePlugin(ComponentsPlugin).registerComponents([
  ... // <-- Component definitions go here
])
```

### Injection plugin

The `InjectionPlugin` plugin manages the dependency injection system (DI). DI is an important concept in Oryx that allows to customise application logic which it nested deep inside the application logic.

The plugin exposes the following API:

- `getInjector()` – returns the injector that it has created
- `createInjector()` – recreates the injector with the configured providers

For example, to get injector and inject something from it:

```ts
import { InjectionPlugin } from '@spryker-oryx/core';

app.requirePlugin(InjectionPlugin).inject(...)
```

The plugin will expose the `App` instance as an `AppRef` token, so that the main application reference is available throughout the application:

```ts
import { AppRef } from "@spryker-oryx/core";
import { inject } from "@spryker-oryx/di";

class MyService {
  constructor(private app = inject(AppRef)) {
    // Use `app` here
  }
}
```

### Resource plugin

This plugin adds support for the application resources, such as images. The ResourcesPlugin lazy loads resources into the application whenever they're needed.

Whenever resources are added to the Oryx application this plugin will be automatically configured and used.

The plugin exposes the following API:

- `getResources()` – gets all registered resources
- `getGraphicValue()` – Loads graphical resources

For example, to get all resources:

```ts
import { ResourcePlugin } from "@spryker-oryx/core";

app.requirePlugin(ResourcePlugin).getResources();
```

### Theme plugin

This plugin adds support for the Application themes. Whenever a theme is added to the Oryx application this plugin will be automatically configured and used.

The plugin exposes the following API:

- Get configured icons (`getIcons`)
- Get specific icon (`getIcon`)
- Get configured breakpoints (`getBreakpoints`)
- Resolve component theme (`resolve`)
- Normalize styles (`normalizeStyles`)
- Interpolate media queries (`generateMedia`)

For example, to get all icons:

```ts
import { ThemePlugin } from "@spryker-oryx/core";

app.requirePlugin(ThemePlugin).getIcons();
```

## Plugin Development

You can create custom plugins to influence the behaviour of an Oryx application. The `AppPlugin` is a simple interface that defines:

- `getName()` – It's name string
- `apply()` – Main life-cycle method
- `destroy()` – Optional cleanup method

When a plugin is registered on the Oryx application builder it will then be _applied_ by invoking the `AppPlugin.apply()` method with `App` instance as an argument and then it's up to a plugin to decide what it should do and how.

There are two additional plugin life-cycle methods available that are invoked around the main lifecycle of _all_ the plugins:

- `AppPluginBeforeApply` is invoked before the main life-cycle of all the plugins
- `AppPluginAfterApply` is invoked after the main life-cycle of all the plugins

> **Note** You should never rely on the order of the registration of the plugins to the Oryx application builder.

See [interacting with plugins](./app.md#interacting-with-plugins) section for more information on how to access registered plugins.
