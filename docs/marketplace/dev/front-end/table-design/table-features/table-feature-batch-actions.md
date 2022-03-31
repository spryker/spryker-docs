---
title: Table Feature Batch Actions
description: This document provides details about the Table Feature Batch Actions component in the Components Library.
template: concept-topic-template
---

This document explains the Table Feature Batch Actions component in the Components Library.

## Overview

Table Feature Batch Actions is a feature of the Table Component that allows triggering batch/multiple actions from rows.
As Table Feature Batch Actions is based on the [Table Feature Selectable](/docs/marketplace/dev/front-end/table-design/table-features/table-feature-selectable.html), batch actions must be registered and enabled via the table config. Batch actions are functions that can be performed on multiple items within a table. As soon as at least one row is selected in the table, the batch action bar with allowed actions appears at the top of the table.
To escape the `batch action mode`, it is necessary to unselect the table rows.

Check out an example usage of the Table Feature Batch Actions in the `@spryker/table` config.

Component configuration:

- `enabled` - enables the feature via the config.  
- `noActionsMessage` - error message text.  
- `actions` - an array with actions that are displayed in the top bar, and their type of the registered [action](/docs/marketplace/dev/front-end/ui-components-library/actions/).   
- `rowIdPath` - gets a row `id` via the column `id` (in the following example, `Sku` column).  
- `availableActionsPath` - path to an array with available action IDs in the top bar (supports nested objects using dot notation for ex. `prop.nestedProp`).   

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
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
        batchActions?: TableBatchActionsConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            batchActions: () =>
                import('@spryker/table.feature.batch-actions').then(
                    (m) => m.TableBatchActionsFeatureModule,
                ),
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
        TableBatchActionsFeatureModule,
        TableSelectableFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-batch-actions-feature spy-table-feature></spy-table-batch-actions-feature>
    <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Batch Actions:

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
        TableSelectionRow {
}

export interface TableItemActions {
    actions: TableBatchAction[];
    rowIdPath: string;
    selectedRows: SelectedRows[];
}
```
