---
title: Table Feature Settings
description: This article provides details about the Table Feature Settings component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Settings component in the Components Library.

## Overview

Table Feature Settings is a feature of the Table Component that allows customizing columns of the table (show or hide and reorder).
Check out this example below to see how to use the Settings feature.

Feature configuration:

- `enabled` - enables the feature via config.  
- `tableId` - `id` of the table that syncs with the table toolbar settings.

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

## Feature registration

Register the feature:

```ts
// Dynamic
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

```html
// Via HTML
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableSettingsFeatureModule,
  ],
})
export class RootModule {}

<spy-table [config]="config" [tableId]="tableId">
  <spy-table-settings-feature spy-table-feature></spy-table-settings-feature>
</spy-table>
```

## Interfaces

Below you can find an interface for the Table Feature Settings.

```ts
declare module '@spryker/table' {
  interface TableConfig {
    columnConfigurator?: TableSettingsConfig;
  }
}

export interface TableSettingsConfig extends TableFeatureConfig {
  tableId?: string;
}
```
