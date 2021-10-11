---
title: Actions Refresh Parent Table
description: This article provides details about the Actions Refresh Parent Table service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Refresh Parent Table service in the Components Library.

## Overview

Actions Refresh Parent Table is an Angular Service that refreshes the data of the parent table of a Table in the current context.
Check out this example below to see how to use Actions Refresh Parent Table service.

{% info_block warningBox "Note" %}

Make sure that the table opened from another table, for ex. in the Drawer.

{% endinfo_block %}

- `rowActions` - the table row actions, check Table Feature Row Actions<!---LINK--> for more details.  
- `actions` - an array with actions configuration.  
- `type` - an action type.  

```html
<spy-table
  [config]="{
    dataSource: { ... },
    columns: [ ... ],
    rowActions: {
      enabled: true,
      actions: [
        {
          type: 'refresh-parent-table',
        },
      ],
    },
  }"
>
  ...
</spy-table>
```

## Interfaces

Below you can find interfaces for the Actions Refresh Parent Table.

```ts
export interface RefreshParentTableActionConfig extends ActionConfig {}

// Service registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      'refresh-parent-table': RefreshParentTableActionHandlerService,
    }),
  ],
})
export class RootModule {}
```
