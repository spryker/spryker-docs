---
title: Actions Refresh Drawer
description: This article provides details about the Actions Refresh Drawer service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Refresh Drawer service in the Components Library.

## Overview

Actions Refresh Drawer is an Angular Service that refreshes/re-renders the currently opened drawer.
Check out this example below to see how to use Actions Refresh Drawer service.

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

Below you can find interfaces for the Actions Refresh Drawer.

```ts
export interface RefreshDrawerActionConfig extends ActionConfig {}

// Service registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      'refresh-drawer': RefreshDrawerActionHandlerService,
    }),
  ],
})
export class RootModule {}
```
