---
title: Actions Close Drawer
description: This document provides details about the Actions Close Drawer service in the Components Library.
template: concept-topic-template
---

This document explains the Actions Close Drawer service in the Components Library.

## Overview

Actions Close Drawer is an Angular Service that closes the first Drawer in the current context.

Check out an example usage of the Actions Close Drawer.

Service configuration:

- `type` - an action type.

```html
<spy-button-action
    [action]="{
        type: 'close-drawer',
    }"
>
</spy-button-action>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        'close-drawer': CloseDrawerActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            'close-drawer': CloseDrawerActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Actions Close Drawer:

```ts
export interface CloseDrawerActionConfig extends ActionConfig {}
```
