---
title: Actions Refresh Table
description: This document provides details about the Actions Refresh Table service in the Components Library.
template: concept-topic-template
---

This document explains the Actions Refresh Table service in the Components Library.

## Overview

Actions Refresh Table is an Angular Service that refreshes data of the Table in current context.

Check out an example usage of the Actions Refresh Table.

Service configuration:

- `type` - an action type.  
- `tableId` - an `id` of the table that will be refreshed.  

```html
<spy-button-action
    [action]="{
        type: 'refresh-table',
        tableId: 'table-id',
    }"
>
</spy-button-action>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        'refresh-table': RefreshTableActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            'refresh-table': RefreshTableActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for Actions Refresh Table:

```ts
export interface RefreshTableActionConfig extends ActionConfig {
    tableId?: string;
}
```
