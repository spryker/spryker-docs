---
title: Application Instance
description: App of the Oryx Application
template: concept-topic-template
---

# Application instance

`App` represents a running Oryx application instance.

It allows you to:

- Interact with registered plugins (`findPlugin`/`requirePlugin`)
- Wait for application ready state when all plugins have been initialized (`whenReady`)
- Destroy and cleanup application (`destroy`)

`App` instance is also available in the DI under the `AppRef` token which you can inject:

```ts
import { AppRef } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';

class MyService {
  constructor(private app = inject(AppRef)) {
    // Do something with `app` here
  }
}
```

Also `App` instance is available inside of the plugins to be able to easily interact with the application instance:

```ts
class MyPlugin implements AppPlugin {
  apply(app: App) {
    // Do something with `app` here
  }
}
```

## Interacting with plugins

If you need to access some of the registered plugins you can use `findPlugin` or `requirePlugin` APIs depending on your requirement towards the plugins. If your code needs a plugin to work and you cannot provide feasible fallback without it - use `requirePlugin` API as it will throw an error if the plugin was not registered with the Oryx application. Otherwise you can use `findPlugin` which may return `undefined` in case the plugin is not available in which case you must design your code to handle the fallback logic.

Both methods expect a plugin class reference or plugin name string to resolve the plugin.

Example for getting plugins:

```ts
app.findPlugin(MyPlugin);
app.requirePlugin('my-plugin-name');
```
