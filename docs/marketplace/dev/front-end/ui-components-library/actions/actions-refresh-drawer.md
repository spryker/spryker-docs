---
title: Actions Refresh Drawer
description: This document provides details about the Actions Refresh Drawer service in the Components Library.
template: concept-topic-template
---

This document explains the Actions Refresh Drawer service in the Components Library.

## Overview

Actions Refresh Drawer is an Angular Service that refreshes/re-renders the currently opened drawer.

Check out an example usage of the Actions Refresh Drawer.

Service configuration:

- `type` - an action type.

```html
<spy-button-action
    [action]="{
        type: 'refresh-drawer',
    }"
>
</spy-button-action>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        'refresh-drawer': RefreshDrawerActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            'refresh-drawer': RefreshDrawerActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Actions Refresh Drawer:

```ts
export interface RefreshDrawerActionConfig extends ActionConfig {}
```
