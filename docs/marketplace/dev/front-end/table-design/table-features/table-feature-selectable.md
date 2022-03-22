---
title: Table Feature Selectable
description: This document provides details about the Table Feature Selectable component in the Components Library.
template: concept-topic-template
---

This document explains the Table Feature Selectable component in the Components Library.

## Overview

Table Feature Selectable is a feature of the Table Component that allows selecting multiple rows.
The row selection toggles whether a row is selected. A checkmark indicates that a row is selected, while an empty box indicates that a row is not selected.
Commonly, the table header indicates whether all rows are selected. If they are, the header displays a checkmark. If all rows are unselected, the header displays an empty checkbox. For rows with indeterminate states, a dash appears in the header.
When the rows selection feature changes, it emits an event with all selected rows, which can be used by other features (for example, the [Table Feature Batch Actions](/docs/marketplace/dev/front-end/table-design/table-features/table-feature-batch-actions.html) will display the applicable actions for selected rows).

Check out an example usage of the Table Feature Selectable in the `@spryker/table` config.

Component configuration:

- `enabled` - enables the feature via config.

```html
<spy-table 
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        itemSelection: {
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
        itemSelection?: TableSelectableConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            itemSelection: () =>
                import('@spryker/table.feature.selectable').then(
                    (m) => m.TableSelectableFeatureModule,
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
        TableSelectableFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Selectable:

```ts
export interface TableSelectableConfig extends TableFeatureConfig {}

export interface TableSelectionRow {
    data: TableDataRow;
    index: number;
}

export type TableSelectionChangeEvent = TableSelectionRow[];
```
