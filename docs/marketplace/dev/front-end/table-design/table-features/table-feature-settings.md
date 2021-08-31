---
title: Table Feature Settings
description: This article provides details about the Table Feature Settings component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Settings component in the Components Library.

## Overview

Table Feature Settings is a feature of the Table Component that displays a button that triggers a popup with a table toolbar settings.
See an example below, how to use the Settings feature.

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

// Component registration
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      columnConfigurator: () =>
        import('./table-settings-feature.module').then(
          (m) => m.TableSettingsFeatureModule,
        ),
    }),
  ],
})
export class RootModule {}
```
