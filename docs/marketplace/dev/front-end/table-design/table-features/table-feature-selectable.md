---
title: Table Feature Selectable
description: This article provides details about the Table Feature Selectable component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Selectable component in the Components Library.

## Overview

Table Feature Selectable is a feature of the Table Component that displays a checkmark that triggers row selection.
Row selection toggles whether a row is selected. 
Typically, an empty box indicates a row is not selected and a checkmark indicates a row is selected. 
The table commonly has an indication at the header to show whether all rows are selected. 
If they are, the header displays a checkmark. If all rows are unselected, the header displays an empty checkbox. 
If some rows are selected, the header displays a dash for an indeterminate state.
See an example below, how to use the Selectable feature.

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

## Interfaces

Below you can find interfaces for Table Feature Selectable.

```ts
export interface TableSelectableConfig extends TableFeatureConfig {}

export interface TableSelectionRow {
  data: TableDataRow;
  index: number;
}

// Emits event on the table row selection
export type TableSelectionChangeEvent = TableSelectionRow[];

// Component registration
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      itemSelection: () =>
        import('./table-selectable-feature.module').then(
          (m) => m.TableSelectableFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```
