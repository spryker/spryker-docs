---
title: Table Feature Batch Actions
description: This article provides details about the Table Feature Batch Actions component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Batch Actions component in the Components Library.

## Overview

Table Feature Batch Actions is a feature of the Table Component that allows triggering batch/multiple actions from rows.
As Table Feature Batch Actions based on the [Table Feature Selectable](/docs/marketplace/dev/front-end/table-design/table-features/table-feature-selectable.html), 
this feature must be registered and enabled via table config.
Batch actions are functions that can be performed on multiple items within a table. 
As soon as at least one row is selected in the table, the batch action bar with allowed actions will appear at the top of the table.
To escape the `batch action mode`, it is necessary to unselect the table rows.

See an example below, how to use the Batch Actions feature.

Feature Configuration:

`enabled` - will enable feature via config.  
`noActionsMessage` - error message text.  
`actions` - an array with actions that will be displayed in the top bar and their type of 
registered Action (see more about [Actions](/docs/marketplace/dev/front-end/ui-components-library/actions/)).   
`rowIdPath` - gets row `id` via column `id` (in the example below `Sku` column).  
`availableActionsPath` - path to an array with available action IDs in the top bar (supports nested 
objects using dot notation for ex. `prop.nestedProp`).   

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
    availableActionsPath: ['path.to.actions'],
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

Below you can find interfaces for Table Feature Batch Actions.

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
