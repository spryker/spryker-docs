---
title: Table Feature Editable
description: This document provides details about the Table Feature Editable component in the Components Library.
template: concept-topic-template
last_updated: Dec 27, 2022
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-features/table-feature-editable.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-feature-extension/table-feature-editable.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/table-design/table-feature-extension/table-feature-editable.html

related:
  - title: Table Feature extension
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-extension.html
  - title: Table Feature Batch Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-batch-actions.html
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

This document describes the *Table Feature Editable* component in the Components Library.

## Overview

Table Feature Editable is a feature of the Table Component that lets you edit and add rows to the table.

Check out an example usage of the Table Feature Editable in the `@spryker/table` config.

Component configuration:

- `columns`—an array with the config for every editable column.  
- `create`—an object with the config for the added rows.  
- `update`—an object with the config for the existing rows.  
- `disableRowKey`—disables the row that contains the mentioned column `id` (see the following example).   

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        editable: {
            columns: [ ... ],
            create: { ... },
            update: { ... },
            disableRowKey: 'col',
        },                                                                                           
    }"
>
</spy-table>
```

Take a closer look at all the options available.

- `columns`—only required properties are listed; the entire interface can be found in [Table Design](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-design.html#interfaces) document:  
    - `id`—a cell `id`.  
    - `type`—a cell `type`.  
    - `typeOptions`–to learn more about the column types available, see [Column Type](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-extension.html):  
        - `value`—sets the default value to the newly added row's cell.  

- `create`:  
    - `addButon`—this object holds the `Add button` configuration such as `title`, `icon`, and `size`.
    - `cancelButon`—an object with the `Cancel button` configuration like `title` and `icon`.
    - `disableForCols`—an array with the cell `ids` to be disabled.  
    - `formInputName`—creates an `input[type=hidden]` element with the specific name.  
    - `initialData`—initials data for cells and objects with errors for rows and cells.  

- `update`:
    - `url`—a request url.  
    - `saveButon`—an object with the `Save button` configuration such as `title` and `icon` (displayed in the `update` popup).  
    - `cancelButon`—an object with the `Cancel button` configuration such as `title` and `icon` (displayed in the `update` popup).  
    - `disableForCols`—an array with the cell `ids` to be disabled.  

```html
<spy-table
    [config]="{
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
    }"
>
</spy-table>
```

## Component registration

Register the component:

```ts
declare module '@spryker/table' {
    interface TableConfig {
        editable?: TableEditableConfig;
    }
}

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

```html
// Via HTML
@NgModule({
    imports: [
        TableModule.forRoot(),
        TableEditableFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-editable-feature spy-table-feature></spy-table-editable-feature>
</spy-table>
```

## Interfaces

The following is interfaces for the Table Feature Editable:

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

export type TableEditableConfigDataErrors = TableEditableConfigDataErrorsFields[];

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
    size?: ButtonSize;
    shape?: ButtonShape;
    variant?: ButtonVariant;
    type?: ButtonType;
}

export type TableEditableConfigButton =
    | TableEditableConfigButtonText
    | TableEditableConfigButtonIcon;

export interface TableEditableEventData<T = unknown> {
    colId: string;
    value?: T;
}

export class TableEditableEvent<T = unknown> extends CustomEvent<TableEditableEventData<T>> {
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
