---
title: Table Feature Batch Actions
description: This document provides details about the Table Feature Batch Actions component in the Components Library.
template: concept-topic-template
last_updated: Aug 7, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-features/.html
  - /docs/scos/dev/front-end-development/202307.0/marketplace/table-design/table-feature-extension/table-feature-batch-actions.html

related:
  - title: Table Feature extension
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-extension.html
  - title: Table Feature Editable
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-editable.html
  - title: Table Feature Pagination
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-pagination.html
  - title: Table Feature Row Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-row-actions.html
  - title: Table Feature Search
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-search.html
  - title: Table Feature Selectable
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-selectable.html
  - title: Table Feature Settings
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-settings.html
  - title: Table Feature Sync State
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-sync-state.html
  - title: Table Feature Title
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-title.html
  - title: Table Feature Total
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-total.html
---

This document explains the Table Feature Batch Actions component in the Components Library.

## Overview

Table Feature Batch Actions is a feature of the Table Component that allows triggering batch/multiple actions from rows.
As Table Feature Batch Actions is based on the [Table Feature Selectable](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-feature-extension/table-feature-selectable.html), batch actions must be registered and enabled via the table config. Batch actions are functions that can be performed on multiple items within a table. As soon as at least one row is selected in the table, the batch action bar with allowed actions appears at the top of the table.
To escape the `batch action mode`, it is necessary to unselect the table rows.

Check out an example usage of the Table Feature Batch Actions in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the feature via the config.  
- `noActionsMessage`—error message text.  
- `actions`—an array with actions that are displayed in the top bar, and their type of the registered [action](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/ui-components-library-actions.html).   
- `rowIdPath`—gets a row `id` via the column `id` (in the following example, `Sku` column).  
- `availableActionsPath`—path to an array with available action IDs in the top bar (supports nested objects using dot notation for ex. `prop.nestedProp`).   

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
