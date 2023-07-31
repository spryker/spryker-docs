---
title: Oryx application
description: App of the Oryx Application
template: concept-topic-template
---

{% info_block warningBox %}

Please note that Oryx is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

`App` represents a running Oryx application instance.

It lets you do the following:

- Interact with registered plugins: `findPlugin` and `requirePlugin`.
- Wait for application ready state when all plugins have been initialized: `whenReady`.
- Destroy and cleanup the application: `destroy`.

The `App` instance is available in the [Dependency Injection](/docs/scos/dev/front-end-development/{{page.version}}/oryx/dependency-injection/dependency-injection.html) under the `AppRef` token, which you can inject:

```ts
import { AppRef } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';

class MyService {
  constructor(private app = inject(AppRef)) {
    // Do something with `app` here
  }
}
```

To allow for easy interactions, the `App` instance is available inside plugins:

```ts
class MyPlugin implements AppPlugin {
  apply(app: App) {
    // Do something with `app` here
  }
}
```

## Interact with plugins

If you need to access some of the registered plugins, depending on your requirements for the plugins, you can use the `findPlugin` or `requirePlugin` API. If your code needs a plugin to work, and you cannot provide a feasible fallback without it, use the `requirePlugin` API. If the plugin is not registered with the Oryx application, it throws an error. Otherwise, you can use `findPlugin`. If a plugin is not available, it returns `undefined`, in which case you need to design your code to handle the fallback logic.

Both methods expect a plugin class reference or a plugin name string to resolve the plugin.

Example of getting plugins:

```ts
app.findPlugin(MyPlugin);
app.requirePlugin('my-plugin-name');
```
