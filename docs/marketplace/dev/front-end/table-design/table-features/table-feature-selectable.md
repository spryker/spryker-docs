---
title: Table Feature Selectable
description: This article provides details about the Table Feature Selectable component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Selectable component in the Components Library.

## Overview

Table Feature Selectable is a feature of the Table Component that allows selecting multiple rows.
Row selection toggles whether a row is selected. 
Typically, an empty box indicates a row is not selected and a checkmark indicates a row is selected. 
The table commonly has an indication at the header to show whether all rows are selected. 
If they are, the header displays a checkmark. If all rows are unselected, the header displays an empty checkbox. 
If some rows are selected, the header displays a dash for an indeterminate state.
When rows selection changes feature emits an event with all selected rows and other features can use that to do something with them 
(for ex. [Batch Actions Feature](/docs/marketplace/dev/front-end/table-design/table-features/table-feature-batch-actions.html) will display applicable actions for selected rows).
See an example below, how to use the Selectable feature.

Feature Configuration:

`enabled` - will enable feature via config.

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

## Feature Registration

```ts
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      itemSelection: () =>
        import('table.feature.selectable').then(
          (m) => m.TableSelectableFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for Table Feature Selectable.

```ts
export interface TableSelectableConfig extends TableFeatureConfig {}

export interface TableSelectionRow {
  data: TableDataRow;
  index: number;
}

export type TableSelectionChangeEvent = TableSelectionRow[];
```
