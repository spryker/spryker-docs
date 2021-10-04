---
title: Table Feature Sync State
description: This article provides details about the Table Feature Sync State component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Sync State component in the Components Library.

## Overview

Table Feature Sync State is a feature of the Table Component that synchronizes the table state with the browser URL (like pagination, filters, sorting, etc.).
Check out this example below to see how to use the Sync State feature.

Feature configuration:

- `enabled` - enables the feature via config.   
- `tableId` - is an`id` of the table that syncs the state of the table with the browser URL.  

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  syncStateUrl: {
    enabled: true,
    tableId: 'table-id',
  },                                                                                           
}">
</spy-table>
```

## Feature registration

Register the feature:

```ts
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

## Interfaces

Below you can find an interface for the Table Feature Sync State.

```ts
export interface TableSyncStateConfig extends TableFeatureConfig {
  tableId?: string;
}
```
