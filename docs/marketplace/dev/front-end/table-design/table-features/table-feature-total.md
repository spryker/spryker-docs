---
title: Table Feature Total
description: This document provides details about the Table Feature Total component in the Components Library.
template: concept-topic-template
---

This document explains the Table Feature Total component in the Components Library.

## Overview

Table Feature Total is a feature of the Table Component that renders the total number of the data 
set via Chips component.
In case table rows are selectable, Table Feature Total also renders a number of selected rows.

Check out an example usage of the Table Feature Total in the `@spryker/table` config.

Component configuration:

- `enabled` - enables the feature via config.  

```html
<spy-table 
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        total: {
            enabled: true,
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
        total?: TableTotalConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            total: () =>
                import('@spryker/table.feature.total').then(
                    (m) => m.TableTotalFeatureModule,
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
        TableTotalFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-total-feature spy-table-feature></spy-table-total-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Total:

```ts
export interface TableTotalConfig extends TableFeatureConfig {}
```
