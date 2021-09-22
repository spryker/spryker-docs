---
title: Actions Refresh Parent Table
description: This article provides details about the Actions Refresh Parent Table service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Refresh Parent Table service in the Components Library.

## Overview

Actions Refresh Parent Table is an Angular Service that refreshes data of the parent Table of a Table in current context.
See an example below, how to use the Actions Refresh Parent Table service.
Note: Make sure that the table opened from another table, for ex. in the Drawer.

`rowActions` - a table row actions, see more in the [Table Feature Row Actions](/docs/marketplace/dev/front-end/table-design/table-feature-extension/table-feature-row-actions.html).  
`actions`:  
 - `title` - an action title.  
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
          title: 'Refresh Parent Table',
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

Below you can find interfaces for Actions Refresh Parent Table.

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
