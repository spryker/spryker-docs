---
title: Table Feature Sync State
description: This document provides details about the Table Feature Sync State component in the Components Library.
template: concept-topic-template
---

This document explains the Table Feature Sync State component in the Components Library.

## Overview

Table Feature Sync State is a feature of the Table Component that synchronizes the table state with the browser URL (like pagination, filters, sorting).

Check out an example usage of the Table Feature Sync State in the `@spryker/table` config.

Component configuration:

- `enabled` - enables the feature via config.   
- `tableId` - an `id` of the table that syncs the state of the table with the browser URL (also can be assigned to the table via HTML).  

```html
<spy-table 
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        syncStateUrl: {
            enabled: true,
            tableId: 'table-id',
        },                                                                                           
    }"
>
</spy-table>
```

## Component registration

Register the component:

```ts
declare module '@spryker/table' {
    interface TableConfig {
        syncStateUrl?: TableSyncStateConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            syncStateUrl: () =>
                import('@spryker/table.feature.sync-state').then(
                    (m) => m.TableSyncStateFeatureModule,
                ),
        }),
    ],
})
export class RootModule {}
```

```html
// Via HTML
@NgModule({
    imports: [
        TableModule.forRoot(),
        TableSyncStateFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config" [tableId]="tableId">
    <spy-table-sync-state-feature spy-table-feature></spy-table-sync-state-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Sync State:

```ts
export interface TableSyncStateConfig extends TableFeatureConfig {
    tableId?: string;
}
```
