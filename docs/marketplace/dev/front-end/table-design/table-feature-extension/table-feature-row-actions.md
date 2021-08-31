---
title: Table Feature Row Actions
description: This article provides details about the Table Feature Row Actions component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Row Actions component in the Components Library.

## Overview

Table Feature Row Actions is a feature of the Table Component that renders dropdown 
menu that contains actions related specifically to the table row. 
Also this feature allows triggering actions via row click.
See an example below, how to use the Row Actions feature.

`enabled` - will enable feature via config.  
`actions` - an array with actions that will be displayed in the dropdown menu.  
`click` - indicates by `id` which action will be used for the table row clicking.  
`rowIdPath` - uses for the `rowId` action context.  
`availableActionsPath` - an array with available actions in the dropdown menu (by `id`).  

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  rowActions: {
    enabled: true,
    actions: [
      { id: 'edit', title: 'Edit' },
      { id: 'delete', title: 'Delete' },
    ],
    click: 'edit',
    rowIdPath: 'sku',
    availableActionsPath: ['edit'],
  },                                                                                        
}">
</spy-table>
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

// Component registration
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      rowActions: () =>
        import('./table-row-actions-feature.module').then(
          (m) => m.TableRowActionsFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```
