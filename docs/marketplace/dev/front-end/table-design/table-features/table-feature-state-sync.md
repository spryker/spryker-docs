---
title: Table Feature Sync State
description: This article provides details about the Table Feature Sync State component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Sync State component in the Components Library.

## Overview

Table Feature Sync State is a feature of the Table Component that syncs table state 
with a configuration of browser address bar (sorting, filters, etc.).
See an example below, how to use the Sync State feature.

`enabled` - will enable feature via config.   
`tableId` - `id` of the table that will syncs with the browser address bar.

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

## Interfaces

Below you can find interfaces for Table Feature Sync State.

```ts
export interface TableSyncStateConfig extends TableFeatureConfig {
  tableId?: string;
}

// Component registration
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      syncStateUrl: () =>
        import('./table-sync-state-feature.module').then(
          (m) => m.TableSyncStateFeatureModule,
        ),
    }),
  ],
})
export class RootModule {}
```
