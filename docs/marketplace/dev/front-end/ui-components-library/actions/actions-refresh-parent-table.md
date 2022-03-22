---
title: Actions Refresh Parent Table
description: This document provides details about the Actions Refresh Parent Table service in the Components Library.
template: concept-topic-template
---

This document explains the Actions Refresh Parent Table service in the Components Library.

## Overview

Actions Refresh Parent Table is an Angular Service that refreshes the data of the parent table of a Table in the current context.

{% info_block warningBox "Note" %}

Make sure that the table opened from another table, for ex. in the Drawer.

{% endinfo_block %}

Check out an example usage of the Actions Refresh Parent Table.

Service configuration:

- `rowActions` - the table row actions, check [Table Feature Row Actions](/docs/marketplace/dev/front-end/table-design/table-features/table-feature-row-actions.html) for more details.  
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
</spy-table>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        'refresh-parent-table': RefreshParentTableActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            'refresh-parent-table': RefreshParentTableActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Actions Refresh Parent Table:

```ts
export interface RefreshParentTableActionConfig extends ActionConfig {}
```
