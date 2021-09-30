---
title: Table Feature Selectable
description: This article provides details about the Table Feature Selectable component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Selectable component in the Components Library.

## Overview

Table Feature Selectable is a feature of the Table Component that allows selecting multiple rows.
The row selection toggles whether a row is selected. A checkmark indicates that a row is selected, while an empty box indicates that a row is not selected.
Commonly, the table header indicates whether all rows are selected. If they are, the header displays a checkmark. If all rows are unselected, the header displays an empty checkbox. For rows with indeterminate states, a dash appears in the header.
When the rows selection feature changes, it emits an event with all selected rows, which can be used by other features (for example, the Batch Actions Feature<!---(/docs/marketplace/dev/front-end/table-design/table-features/table-feature-batch-actions.html)--> will display the applicable actions for selected rows).
Check out this example below to see how to use the Selectable feature.

Feature configuration:

`enabled` - enables the feature via config.

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  itemSelection: {
    enabled: true,
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
      itemSelection: () =>
        import('@spryker/table.feature.selectable').then(
          (m) => m.TableSelectableFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Feature Selectable.

```ts
export interface TableSelectableConfig extends TableFeatureConfig {}

export interface TableSelectionRow {
  data: TableDataRow;
  index: number;
}

export type TableSelectionChangeEvent = TableSelectionRow[];
```
