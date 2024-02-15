---
title: Table Design
description: This document describes the Table Design in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-design.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/table-design/table-design.html

---

This document describes the Table Design in the Components Library.

## Overview

A *Table Component* is an arrangement of data in rows and columns, or possibly in a more complex structure (with sorting, filtering, pagination, row selections, infinite scrolling).
It is an essential building block of a user interface.

A basic Table Component is `<spy-table [config]="config"></spy-table>` where `config` is:
- `dataSource`—the Datasource configuration from which the data is taken.
- `columns`—an array of columns configuration.

```ts
const config: TableConfig = {
    dataSource: {
        // transforms input data via Data Transformer service
        type: DatasourceType,
        transform?: DataTransformerConfig,
    },
    columns: [
        { id: 'col1', title: 'Column #1' },
        { id: 'col2', title: 'Column #2' },
        { id: 'col3', title: 'Column #3' },
    ],
};
```

## Architecture

Check out the table architecture diagram for better understanding:

![Table Architecture](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/Front-end/table-architecture.svg)

### Configuration

A Table Component is configured via [Table Configuration](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-configuration.html) that sets up how the table should behave and look like.

### Datasources

To render data, the Table must receive it via [Datasources](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasources.html)
that are registered by the user and then configured using the Table Configuration.

### Features

Every other piece of functionality is extracted into the [Table Feature](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-feature-extension/table-feature-extension.html):

- A *Table Feature* is an Angular Component that encapsulates a specific extension of the Core Table.
- Core Table contains specific placeholders in its view that Table Feature may target to render its piece of UI.
- Most of the common table functionality already exists as the Table Feature and may be used in the project.

To use a Feature component, register an Angular Module that implements the `ModuleWithFeature` interface in the Root Module
using `TableModule.withFeatures()` under the key that serves as its configuration key:

```ts
@NgModule({
    imports: [
        TableModule.withFeatures({
            pagination: () => import('@spryker/table.feature.pagination').then(
                (m) => m.TablePaginationFeatureModule,
            ),
        }),
    ],
})
export class AppModule {}
```

### Columns

Columns in a Table are defined by the [Column Type](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-extension.html) and rendered within the columns (text, image, link).
A new Column Type may be created and registered to the table.

A Column component must implement `TableColumn` interface with the defined config and then be registered to the Root Module via `TableModule.withColumnComponents()`:

```ts
@NgModule({
    imports: [
        TableModule.withColumnComponents({
            text: TableColumnTextComponent,
        }),

        // Table Column Type Modules
        TableColumnTextModule,
    ],
})
export class AppModule {}
```

### Filters

A Table Component does not contain any filters a table usually has (filtering, searching).
The Core Table Component has just a view of the columns and data and has built-in sorting.

To use [Filter components](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-filter-extension/table-filter-extension.html), the Table Module must implement a specific interface (TableConfig) and then be registered to the Root Module via `TableModule.withFilterComponents()`:

```ts
@NgModule({
    imports: [
        TableFiltersFeatureModule.withFilterComponents({
            select: TableFilterSelectComponent,
        }),

        // Table Filter Modules
        TableFilterSelectModule,
    ],
})
export class AppModule {}
```

### Actions

There is a way to trigger some [Actions](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/ui-components-library-actions.html) while user interacts with the Table.

A few common Table Features that can trigger actions are available in the UI library:

- [Row actions](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-feature-extension/table-feature-row-actions.html)—renders a dropdown menu that contains actions applicable to the table row and on click triggers an Action which must be registered.
- [Batch actions](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-feature-extension/table-feature-batch-actions.html)—allows triggering batch/multiple actions from rows.

## Interfaces

The following interfaces are intended for the Table configuration:

```ts
export interface TableColumn extends Partial<TableColumnTypeDef> {
    id: string;
    title: string;
    displayKey?: string;
    width?: string;
    multiRenderMode?: boolean;
    multiRenderModeLimit?: number;
    emptyValue?: string;
    sortable?: boolean;
    searchable?: boolean;
}

export interface TableColumnTypeDef {
    type?: TableColumnType;
    typeOptions?: TableColumnTypeOptions;
    typeChildren?: TableColumnTypeDef[];
    typeOptionsMappings?: TableColumnTypeOptionsMappings;
}

export interface TableColumnTypeOptions {
    [key: string]: any;
}

interface TableColumnTypeOptionsMappings {
    // Map of option values to new values
    [optionName: string]: Record<string, any>;
}

export interface TableColumnTypeRegistry {
    // Key is type string—value is type config class
    'layout-flat': LayoutFlatConfig;
}

export type TableColumnType = keyof TableColumnTypeRegistry;

export interface TableHeaderContext {
    config: TableColumn;
    i: number;
}

export interface TableColumnContext extends AnyContext {
    value: TableDataValue;
    displayValue?: unknown;
    row: TableDataRow;
    config: TableColumn;
    i: number;
    j: number;
}

export interface TableColumnTplContext extends TableColumnContext {
    $implicit: TableColumnContext['value'];
}

export interface TableColumnComponent<C = any> {
    config?: C;
    context?: TableColumnContext;
}

export type TableColumnComponentDeclaration = {
    [P in keyof TableColumnTypeRegistry]?: Type<TableColumnComponent<TableColumnTypeRegistry[P] extends object
        ? TableColumnTypeRegistry[P]
        : any>>;
};

export type TableColumns = TableColumn[];

export type TableDataValue = unknown | unknown[];

export type TableDataRow = Record<TableColumn['id'], TableDataValue>;

export interface TableData<T extends TableDataRow = TableDataRow> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface TableConfig {
    dataSource: DatasourceConfig;
    columnsUrl?: string;
    columns?: TableColumns;

    // Features may expect it's config under it's namespace
    [featureName: string]: TableFeatureConfig | unknown;
}

export type ColumnsTransformer = (
    cols: TableColumns,
) => Observable<TableColumns>;

export type TableDataConfig = Record<string, unknown>;

export interface SortingCriteria {
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}

export type TableEvents = Record<string, ((data: unknown) => void) | undefined>;

export interface TableComponent {
    tableId?: string;
    config?: TableConfig;
    events: TableEvents;
    config$: Observable<TableConfig>;
    columns$: Observable<TableColumns>;
    data$: Observable<TableData>;
    isLoading$: Observable<boolean>;
    tableId$: Observable<string>;
    features$: Observable<TableFeatureComponent<TableFeatureConfig>[]>;
    tableElementRef: ElementRef<HTMLElement>;
    injector: Injector;
    updateRowClasses(rowIdx: string, classes: Record<string, boolean>): void;
    setRowClasses(rowIdx: string, classes: Record<string, boolean>): void;
    on(feature: string, eventName?: string): Observable<unknown>;
    findFeatureByName(name: string): Observable<TableFeatureComponent>;
    findFeatureByType<T extends TableFeatureComponent>(
        type: Type<T>,
    ): Observable<T>;
}

export enum TableFeatureLocation {
    top = 'top',
    beforeTable = 'before-table',
    header = 'header',
    headerExt = 'header-ext',
    beforeRows = 'before-rows',
    beforeColsHeader = 'before-cols-header',
    beforeCols = 'before-cols',
    cell = 'cell',
    afterCols = 'after-cols',
    afterColsHeader = 'after-cols-header',
    afterRows = 'after-rows',
    afterTable = 'after-table',
    bottom = 'bottom',
    hidden = 'hidden',
}

export interface TableRowActionRegistry {
    // Key is action string—value is action options type
}

export type TableRowAction = keyof TableRowActionRegistry;

export interface TableRowActionHandler {
    handleAction(actionEvent: TableActionTriggeredEvent): void;
}

export interface TableRowActionsDeclaration {
    [type: string]: TableRowActionHandler;
}

export interface TableRowClickEvent {
    row: TableDataRow;
    event: Event;
}
```
