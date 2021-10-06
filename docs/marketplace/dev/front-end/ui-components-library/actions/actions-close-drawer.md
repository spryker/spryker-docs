---
title: Actions Close Drawer
description: This article provides details about the Actions Close Drawer service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Close Drawer service in the Components Library.

## Overview

Actions Close Drawer is an Angular Service that closes the first Drawer in the current context.
Check out this example below to see how to use Actions Close Drawer:

`type` - an action type.

```html
<spy-button-action
  [action]="{
    type: 'close-drawer',
  }"
>
  ...
</spy-button-action>
```

## Interfaces

Below you can find interfaces for the Actions Close Drawer.

```ts
export interface CloseDrawerActionConfig extends ActionConfig {}

// Service registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      'close-drawer': CloseDrawerActionHandlerService,
    }),
  ],
})
export class RootModule {}
```
