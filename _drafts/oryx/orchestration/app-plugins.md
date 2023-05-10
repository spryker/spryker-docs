---
title: Application plugins
description: Plugins of the Oryx Application
template: concept-topic-template
---

When you create an Oryx Application with the `appBuilder()` function, it creates an instance of `App`. `App` is a a shell that can be enhanced with custom plugins: `AppPlugin`. Plugins let you extend Oryx core behavior without modifying the core code of the framework.

The following built-in plugins are provided by the Oryx framework:

- [`ComponentsPlugin`](#components-plugin)
- [`InjectionPlugin`](#injection-plugin)
- [`ResourcePlugin`](#resource-plugin)
- [`ThemePlugin`](#theme-plugin)

For ordinary application development, there's no need to develop custom plugins.

## Built-in plugins

### Components plugin

`ComponentsPlugin` orchestrates the (lazy) loading of components. The plugin registers all the component definitions and loads the implementation whenever required in the DOM.

The plugin exposes the `registerComponents()` API, which registers components. For example, to register more component:

```ts
import { ComponentsPlugin } from '@spryker-oryx/core';

app.requirePlugin(ComponentsPlugin).registerComponents([
  ... // <-- Component definitions go here
])
```

### Injection plugin

The `InjectionPlugin` plugin manages the dependency injection system (DI). DI lets you customize the application logic nested deep inside the application logic.

The plugin exposes the following APIs:

- `getInjector()`: returns the injector it has created.
- `createInjector()`: recreates the injector with the configured providers.

For example, get the injector and inject something from it:

```ts
import { InjectionPlugin } from '@spryker-oryx/core';

app.requirePlugin(InjectionPlugin).inject(...)
```

The plugin exposes the `App` instance as an `AppRef` token to make the main application reference available throughout the application:

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

`ResourcePlugin` adds support for application resources, like images. The plugin lazy loads resources into the application whenever they're needed.

When resources are added to the Oryx application this plugin is automatically configured and used.

The plugin exposes the following APIs:

- `getResources()`: gets all registered resources.
- `getGraphicValue()`: loads graphical resources.

For example, get all resources:

```ts
import { ResourcePlugin } from "@spryker-oryx/core";

app.requirePlugin(ResourcePlugin).getResources();
```

### Theme plugin

`ThemePlugin` adds the support for application themes. When a theme is added to the Oryx application, this plugin is automatically configured and used.

The plugin exposes the following APIs:

- `getIcons`: get all configured icons.
- `getIcon`: get a specific icon.
- `getBreakpoints`: get configured breakpoints.
- `resolve`: resolve component theme.
- `normalizeStyles`: normalize styles.
- `generateMedia`: interpolate media queries.

For example, get all icons:

```ts
import { ThemePlugin } from "@spryker-oryx/core";

app.requirePlugin(ThemePlugin).getIcons();
```

## Plugin development

You can create custom plugins to change the behavior of an Oryx application. The `AppPlugin` is a simple interface that defines the following:

- `getName()`: Its name string.
- `apply()`: main life-cycle method.
- `destroy()`: Optional cleanup method.

When a plugin is registered on the Oryx application builder, it _applied_ by invoking the `AppPlugin.apply()` method with `App` instance as an argument. Then it's up to the plugin to decide what it should do and how.

The following additional plugin life-cycle methods are invoked around the main lifecycle of _all_ the plugins:

- `AppPluginBeforeApply` is invoked before the main life-cycle
- `AppPluginAfterApply` is invoked after the main life-cycle

{% info_block warningBox "Note" %}

Instead of relying on the order of registration of the plugins to the Oryx application builder, always use extra plugin life-cycle methods to establish the order if necessary.

{% endinfo_block %}

> **Note** You should never rely on the order of the registration of the plugins to the Oryx application builder and instead use extra plugin lify-cycle methods to establish the order if necessary.

For more information on how to access registered plugins, see [interacting with plugins](./app.md#interacting-with-plugins).

## Plugin use cases

Plugins are useful in the following cases:

- To execute code when Oryx application starts up
- To interact with existing Oryx plugins
- To extend functionality of an Oryx application by building a custom plugin or extending existing Oryx plugins
