---
title: Table Feature Batch Actions
description: This article provides details about the Table Feature Batch Actions component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Batch Actions component in the Components Library.

## Overview

Table Feature Batch Actions is a feature of the Table Component that allows triggering batch/multiple actions from rows.
As Table Feature Batch Actions is based on the [Table Feature Selectable](/docs/marketplace/dev/front-end/table-design/table-features/table-feature-selectable.html), batch actions must be registered and enabled via the table config. Batch actions are functions that can be performed on multiple items within a table. As soon as at least one row is selected in the table, the batch action bar with allowed actions appears at the top of the table.
To escape the `batch action mode`, it is necessary to unselect the table rows.

Check out this example below to see how to use the Batch Actions feature.

Feature configuration:

`enabled` - enables the feature via the config.  
`noActionsMessage` - error message text.  
`actions` - an array with actions that are displayed in the top bar, and their type of the registered [action](/docs/marketplace/dev/front-end/ui-components-library/actions/).   
`rowIdPath` - gets a row `id` via the column `id` (in the example below `Sku` column).  
`availableActionsPath` - path to an array with available action IDs in the top bar (supports nested objects using dot notation for ex. `prop.nestedProp`).   

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  itemSelection: {
    enabled: true,
  },
  batchActions: {
    enabled: true,
    actions: [
      { id: 'edit', title: 'Edit', type: 'edit-action' },
      { id: 'update', title: 'Update', type: 'update-action' },
    ],
    noActionsMessage: 'No available actions for selected rows',
    rowIdPath: 'sku',
    availableActionsPath: 'path.to.actions',
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
      batchActions: () =>
        import('@spryker/table.feature.batch-actions').then(
          (m) => m.TableBatchActionsFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Feature Batch Actions.

```ts
export interface TableBatchActionsConfig extends TableFeatureConfig {
  actions: TableBatchAction[];
  rowIdPath: string;
  noActionsMessage?: string;
  availableActionsPath?: string;
}

export interface TableBatchAction extends TableActionBase {
  title: string;
}

export interface TableBatchActionContext {
  rowIds: string[];
}

export interface SelectedRows
  extends Record<string, unknown>,
    TableSelectionRow {}

export interface TableItemActions {
  actions: TableBatchAction[];
  rowIdPath: string;
  selectedRows: SelectedRows[];
}
```
