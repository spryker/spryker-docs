---
title: Actions Refresh Table
description: This article provides details about the Actions Refresh Table service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Refresh Table service in the Components Library.

## Overview

Actions Refresh Table is an Angular Service that refreshes data of the Table in current context.
See an example below, how to use the Actions Refresh Table service.

`type` - an action type.  
`tableId` - an `id` of the table that will be refreshed via `Table Locator Service`.  

```html
<spy-button-action
  [action]="{
    type: 'refresh-table',
    tableId: 'table-id',
  }"
>
  ...
</spy-button-action>
```

## Interfaces

Below you can find interfaces for Actions Refresh Table.

```ts
export interface RefreshTableActionConfig extends ActionConfig {
  tableId?: string;
}

// Service registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      'refresh-table': RefreshTableActionHandlerService,
    }),
  ],
})
export class RootModule {}
```
