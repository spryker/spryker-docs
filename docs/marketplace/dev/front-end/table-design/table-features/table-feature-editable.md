---
title: Table Feature Editable
description: This article provides details about the Table Feature Editable component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Editable component in the Components Library.

## Overview

Table Feature Editable is a feature of the Table Component that allows editing/adding rows of the table.
Below you can see base config of the Editable feature, that contains next options: 

Feature Configuration:

`columns` - an array with config for each editable column.  
`create` - an object with config for a new rows.  
`update` - an object with config for an existing rows.  
`disableRowKey` - will disable row that contains mentioned column `id` (see example).  

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  editable: {
    columns: [ ... ],
    create: { ... },
    update: { ... },
    disableRowKey: 'col',
  },                                                                                           
}">
</spy-table>
```

Let's take a closer look at all the possible options.

`columns`:  
  - `id` - a cell `id`.  
  - `type` - a cell `type`.  
  - `typeOptions`:  
    - `value` - will set default value to the cell of the newly added row.  

`create`:  
  - `addButon` - an object with `title` and `icon` for the `Add button`.  
  - `cancelButon` - an object with `title` and `icon` for the `Cancel button`.  
  - `disableForCols` - an array with cell `ids` to be disabled.  
  - `formInputName` - will create `input[type=hidden]` element with the specific name.  
  - `initialData` - initials data for cells and object with errors for rows and cells.  
  
`update`:
  - `url` - request url.  
  - `saveButon` - an object with `title` and `icon` for the `Save button` (displays in the `update` popup).  
  - `cancelButon` - an object with `title` and `icon` for the `Cancel button` (displays in the `update` popup).  
  - `disableForCols` - an array with cell `id's` to be disabled.  `

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  editable: {
    columns: [
      { id: 'col1', type: 'edit' },
      { id: 'col2', type: 'edit', typeOptions: { value: 'default' } },
    ],
    create: {
      addButton: {
        title: 'Add price',
        icon: 'icon',
      },
      cancelButton: {
        title: 'Cancel',
        icon: 'icon',
      },
      disableForCols: ['col2'],
      formInputName: 'form-input-name',
      initialData: {
        data: [
          { col1: 'value', col2: 'value' },
          { col1: 'value' },
        ],
        errors: {
          0: {
            rowError: 'message',
            columnErrors: {
              col3: 'errorMessage errorMessage errorMessage',
            },
          },
        },
      },
    },
    update: {
      url: '/table-update-cell',
      saveButton: {
        title: 'Save',
        icon: 'icon',
      },
      cancelButton: {
        title: 'Cancel',
        icon: 'icon',
      },
      disableForCols: ['col2'],
    },
    disableRowKey: 'col1',
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
      editable: () => 
        import('@spryker/table.feature.editable').then(
          (m) => m.TableEditableFeatureModule,
        ),   
    }),
  ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for Table Feature Editable.

```ts
export interface TableEditableColumn extends TableColumn {
  typeOptions?: TableEditableColumnTypeOptions;
}

export interface TableEditableColumnTypeOptions extends TableColumnTypeOptions {
  editableError?: string;
}

export interface TableEditableConfig extends TableFeatureConfig {
  columns: TableEditableColumn[];
  create?: TableEditableConfigCreate;
  update?: TableEditableConfigUpdate;
  disableRowKey?: string;
}

export interface TableEditableConfigCreate {
  formInputName: string;
  initialData?: TableEditableConfigCreateData;
  addButton?: TableEditableConfigButton;
  cancelButton?: TableEditableConfigButton;
  disableForCols?: string[];
}

export interface TableEditableConfigUpdate {
  url: TableEditableConfigUrl;
  saveButton?: TableEditableConfigButton;
  cancelButton?: TableEditableConfigButton;
  disableForCols?: string[];
}

export interface TableEditableConfigCreateData {
  data: TableDataRow[];
  errors?: TableEditableConfigDataErrors;
}

export interface TableEditableConfigDataErrorsFields {
  rowError?: string;
  columnErrors?: { [columnId: string]: string | undefined };
}

export interface TableEditableConfigDataErrors {
  [rowIdx: string]: TableEditableConfigDataErrorsFields;
}

export interface TableEditableConfigUrlObject {
  url: string;
  method?: string;
}

export type TableEditableConfigUrl = string | TableEditableConfigUrlObject;

export interface TableEditableConfigButtonIcon {
  icon: string;
}

export interface TableEditableConfigButtonText
  extends Partial<TableEditableConfigButtonIcon> {
  title: string;
}

export type TableEditableConfigButton =
  | TableEditableConfigButtonText
  | TableEditableConfigButtonIcon;

export interface TableEditableEventData<T = unknown> {
  colId: string;
  value?: T;
}

export class TableEditableEvent<T = unknown> extends CustomEvent<
  TableEditableEventData<T>
> {
  static readonly eventName = 'spy-table-editable';

  constructor(detail: TableEditableEventData<T>) {
    super(TableEditableEvent.eventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail,
    });
  }
}

export interface TableDatasourceDependableConfig extends DatasourceConfig {
  dependsOn: string;
  contextKey?: string;
  datasource: DatasourceConfig;
}
```
