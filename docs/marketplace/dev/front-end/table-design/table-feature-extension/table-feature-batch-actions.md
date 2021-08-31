---
title: Table Feature Batch Actions
description: This article provides details about the Table Feature Batch Actions component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Batch Actions component in the Components Library.

## Overview

Table Feature Batch Actions is a feature of the Table Component that allows triggering batch/multiple actions from rows.
As Table Feature Batch Actions based on the [Table Feature Selectable](/docs/marketplace/dev/front-end/table-design/table-feature-extension/table-feature-selectable.html), 
make sure to register and to enable this feature via table config.
Batch actions are functions that may be performed on multiple items within a table. 
Once the user selects at least one row from the table, the batch action bar appears at the top of the table, 
presenting the user with actions they can take. 
To exit or escape `batch action mode`, the user can deselect the items.
See an example below, how to use the Batch Actions feature.

`enabled` - will enable feature via config.  
`noActionsMessage` - error message text.  
`actions` - an array with actions that will be used as batch actions (see more about [Actions](/docs/marketplace/dev/front-end/ui-components-library/actions.html)).   
`rowIdPath` - gets row `id` via column `id` (in the example below `Sku` column).  
`availableActionsPath` - an array with available batch actions in the top bar (by action `id`).  

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
      {
        id: 'edit'
        type: 'drawer',
        ...
      },
      {
        id: 'update'
        type: 'drawer',
        ...
      },
    ],
    noActionsMessage: 'No available actions for selected rows',
    rowIdPath: 'sku',
    availableActionsPath: ['edit'],
  },                                                                                           
}">
</spy-table>
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

// Component registration
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      batchActions: () =>
        import('./table-batch-actions-feature.module').then(
          (m) => m.TableBatchActionsFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```
