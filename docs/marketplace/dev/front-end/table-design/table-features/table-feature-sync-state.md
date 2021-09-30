---
title: Table Feature Sync State
description: This article provides details about the Table Feature Sync State component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Sync State component in the Components Library.

## Overview

Table Feature Sync State is a feature of the Table Component that provides 
synchronizing the table state with the browser URL (like pagination, filters, sorting, etc.).
See an example below, how to use the Sync State feature.

Feature Configuration:

`enabled` - will enable feature via config.   
`tableId` - `id` of the table that will sync the state of the table with browser URL.  

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

## Feature Registration

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

Below you can find interfaces for Table Feature Sync State.

```ts
export interface TableSyncStateConfig extends TableFeatureConfig {
  tableId?: string;
}
```
