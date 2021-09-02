---
title: Actions Refresh Drawer
description: This article provides details about the Actions Refresh Drawer service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Refresh Drawer service in the Components Library.

## Overview

Actions Refresh Drawer is an Angular Service that refreshes/rerenders opened Drawer in current context.
See an example below, how to use the Actions Refresh Drawer service.

`type` - an action type.

```html
<spy-button-action
  [action]="{
    type: 'refresh-drawer',
  }"
>
  ...
</spy-button-action>
```

## Interfaces

Below you can find interfaces for Actions Refresh Drawer.

```ts
export interface RefreshDrawerActionConfig extends ActionConfig {}

// Component registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      'refresh-drawer': RefreshDrawerActionHandlerService,
    }),
  ],
})
export class RootModule {}
```
