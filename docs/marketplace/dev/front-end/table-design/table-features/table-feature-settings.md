---
title: Table Feature Settings
description: This document provides details about the Table Feature Settings component in the Components Library.
template: concept-topic-template
---

This document explains the Table Feature Settings component in the Components Library.

## Overview

Table Feature Settings is a feature of the Table Component that allows customizing columns of the table (show or hide and reorder).

Check out an example usage of the Table Feature Settings in the `@spryker/table` config.

Component configuration:

- `enabled` - enables the feature via config.  
- `tableId` - `id` of the table that syncs with the table toolbar settings (also can be assigned to the table via HTML).  

```html
<spy-table 
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        columnConfigurator: {
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
        columnConfigurator?: TableSettingsConfig;
    }
}

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

Below you can find interfaces for the Table Feature Settings:

```ts
export interface TableSettingsConfig extends TableFeatureConfig {
    tableId?: string;
}
```
