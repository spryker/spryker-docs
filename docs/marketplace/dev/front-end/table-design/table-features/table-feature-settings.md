---
title: Table Feature Settings
description: This article provides details about the Table Feature Settings component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Settings component in the Components Library.

## Overview

Table Feature Settings is a feature of the Table Component that allows customizing columns of the table (show/hide and reorder).
See an example below, how to use the Settings feature.

Feature Configuration:

`enabled` - will enable feature via config.  
`tableId` - `id` of the table that will syncs with the table toolbar settings.

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  columnConfigurator: {
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
      columnConfigurator: () =>
        import('@spryker/table.feature.settings').then(
          (m) => m.TableSettingsFeatureModule,
        ),
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for Table Feature Settings.

```ts
export interface TableSettingsConfig extends TableFeatureConfig {
  tableId?: string;
}

export interface TableSettingsColumn extends TableColumn {
  hidden?: boolean;
  hideable?: boolean;
}

export interface TableSettingsChangeEvent {
  tableColumns: TableSettingsColumn[];
  popoverColumns: TableSettingsColumn[];
  visibilityChanged?: string;
}

export type TableSettingsColumns = TableSettingsColumn[];
```
