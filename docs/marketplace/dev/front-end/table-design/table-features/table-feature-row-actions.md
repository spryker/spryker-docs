---
title: Table Feature Row Actions
description: This article provides details about the Table Feature Row Actions component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Row Actions component in the Components Library.

## Overview

Table Feature Row Actions is a feature of the Table Component that renders dropdown 
menu that contains actions applicable to the table row and on click triggers an Action which must be registered. 
Also this feature allows triggering actions via row click.
By default all actions will be available on every row but if needed they can be filtered using array of 
action IDs specified on each row in the data using path configured by `availableActionsPath`.
See an example below, how to use the Row Actions feature.

Feature Configuration:

`enabled` - will enable feature via config.  
`actions` - an array with actions that will be displayed in the dropdown menu and their type of 
registered Action (see more about [Actions](/docs/marketplace/dev/front-end/ui-components-library/actions/).  
`click` - indicates by `id` which action will be used for the table row clicking.  
`rowIdPath` - uses for the `rowId` action context.  
`availableActionsPath` - path to an array with available action IDs in the table data row (supports nested objects 
using dot notation for ex. `prop.nestedProp`).  

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  rowActions: {
    enabled: true,
    actions: [
      { id: 'edit', title: 'Edit', type: 'edit-action' },
      { id: 'delete', title: 'Delete', type: 'delete-action' },
    ],
    click: 'edit',
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
      rowActions: () =>
        import('table.feature.row-actions').then(
          (m) => m.TableRowActionsFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for Table Feature Pagination.

```ts
export interface TableRowActionsConfig extends TableFeatureConfig {
  actions?: TableRowActionBase[];
  click?: string;
  rowIdPath?: string;
  availableActionsPath?: string;
}

export interface TableRowActionBase extends TableActionBase {
  title: string;
  icon?: string;
}

export interface TableRowActionContext {
  row: TableDataRow;
  rowId?: string;
}
```
