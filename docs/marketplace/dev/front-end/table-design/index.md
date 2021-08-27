---
title: Table design
description: This article describes the Table Design in the Components Library.
template: concept-topic-template
---

This article describes the Table Design in the Components Library.

## Overview
A Table Component is an arrangement of data in rows and columns, or possibly in a more complex structure 
(with sorting, filtering, pagination, row selections, infinite scrolling, etc.). 
It is an essential building block of a user interface.
A basic able Component is `<spy-table [config]="config"></spy-table>` where `config` is:

- `dataSource` - an array of rows to be displayed on the table.
- `columns` - an array of columns.
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

![Table Architecture](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/Front-end/table-architecture.svg)

### Components

Table Component does not contain all of the features normally a table will have (filtering, pagination, searching, etc.).
Core Table Component has just a view of the columns and data and also has built-in sorting.

To use Filter components, Table Module must implement a specific interface (TableConfig) and then be registered to the Root Module via TableModule.withFilterComponents():

```ts
class TableDefaultConfigData implements Partial<TableConfig> {
    total = {
        enabled: true,
    };
    columnConfigurator = {
        enabled: true,
    };
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableFiltersFeatureModule.withFilterComponents({
            select: TableFilterSelectComponent,
            'date-range': TableFilterDateRangeComponent,
            'tree-select': TableFilterTreeSelectComponent,
        } as any),

        // Table Filter Modules
        TableFilterSelectModule,
        TableFilterDateRangeModule,
        TableFilterTreeSelectModule,
    ],
    providers: [
        {
            provide: TableDefaultConfig,
            useClass: TableDefaultConfigData,
        },
    ],
})
export class DefaultTableConfigModule {}
```

### Configuration

The Table Component is configured via so called [Table Configuration](/docs/marketplace/dev/front-end/table-design/table-configuration.html) 
that sets up how table will behave and look like.

### Datasources

To render data Table must receive it via so called [Datasources](/docs/marketplace/dev/front-end/ui-components-library/datasources.html) that is registered by the user and then configured via Table Configuration.

### Features

Every other piece of functionality was extracted into so called `Table Feature`:

- Table Feature is simply an Angular Component that encapsulates specific extension of the Core Table.
- Core Table contains specific placeholders in it’s view that Table Feature may target to render it’s own piece of UI.
- Most of the common table functionality already exists as a Table Feature and may be used in project.

To use Features, Table Module must implement a specific interface (TableConfig) and then be registered to the Root Module via TableModule.withFeatures():

```ts
class TableDefaultConfigData implements Partial<TableConfig> {
    total = {
        enabled: true,
    };
    columnConfigurator = {
        enabled: true,
    };
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            filters: () => import('@spryker/table.feature.filters').then((m) => m.TableFiltersFeatureModule),
            pagination: () => import('@spryker/table.feature.pagination').then((m) => m.TablePaginationFeatureModule),
            rowActions: () => import('@spryker/table.feature.row-actions').then((m) => m.TableRowActionsFeatureModule),
            search: () => import('@spryker/table.feature.search').then((m) => m.TableSearchFeatureModule),
            syncStateUrl: () => import('@spryker/table.feature.sync-state').then((m) => m.TableSyncStateFeatureModule),
            total: () => import('@spryker/table.feature.total').then((m) => m.TableTotalFeatureModule),
            itemSelection: () =>
                import('@spryker/table.feature.selectable').then((m) => m.TableSelectableFeatureModule),
            batchActions: () =>
                import('@spryker/table.feature.batch-actions').then((m) => m.TableBatchActionsFeatureModule),
            columnConfigurator: () =>
                import('@spryker/table.feature.settings').then((m) => m.TableSettingsFeatureModule),
            title: () => import('@spryker/table.feature.title').then((m) => m.TableTitleFeatureModule),
            editable: () => import('@spryker/table.feature.editable').then((m) => m.TableEditableFeatureModule),
        }),
    ],
    providers: [
        {
            provide: TableDefaultConfig,
            useClass: TableDefaultConfigData,
        },
    ],
})
export class DefaultTableConfigModule {}
```

### Columns

Columns in a Table are defined by the `Column Type` and are rendered withing the columns (text, image, link, etc.).
New Column Type may be created and registered to the Table.

To use Column components, Table Module must implement a specific interface (TableConfig) and then be registered to the Root Module via TableModule.withColumnComponents():

```ts
class TableDefaultConfigData implements Partial<TableConfig> {
    total = {
        enabled: true,
    };
    columnConfigurator = {
        enabled: true,
    };
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            text: TableColumnTextComponent,
            image: TableColumnImageComponent,
            date: TableColumnDateComponent,
            chip: TableColumnChipComponent,
            input: TableColumnInputComponent,
            select: TableColumnSelectComponent,
            dynamic: TableColumnDynamicComponent,
            autocomplete: TableColumnAutocompleteComponent,
        } as any),

        // Table Column Type Modules
        TableColumnChipModule,
        TableColumnTextModule,
        TableColumnImageModule,
        TableColumnDateModule,
        TableColumnInputModule,
        TableColumnSelectModule,
        TableColumnDynamicModule,
        TableColumnAutocompleteModule,
    ],
    providers: [
        {
            provide: TableDefaultConfig,
            useClass: TableDefaultConfigData,
        },
    ],
})
export class DefaultTableConfigModule {}
```

### Actions 

There is a way to trigger some [Actions](/docs/marketplace/dev/front-end/ui-components-library/actions.html) by the user interaction with the Table.

## Interfaces
   
Below you can find interfaces for the Table configuration:

```ts
export interface TableColumn extends Partial<TableColumnTypeDef> {
  id: string;
  title: string;
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
  [optionName: string]: Record<string, any>; // Map of option values to new values
}

export interface TableColumnTypeRegistry {
  // Key is type string - value is type config class
  'layout-flat': LayoutFlatConfig;
}

export type TableColumnType = keyof TableColumnTypeRegistry;

export interface TableHeaderContext {
  config: TableColumn;
  i: number;
}

export interface TableColumnContext {
  value: TableDataValue;
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
  [P in keyof TableColumnTypeRegistry]?: Type<
    TableColumnComponent<
      TableColumnTypeRegistry[P] extends object
        ? TableColumnTypeRegistry[P]
        : any
    >
  >;
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
  // Key is action string - value is action options type
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

## Types

There are a few common Table types that are available in UI library as separate packages:

### Columns

- `table.column.autocomplete` - displays an `autocomplete` component.
- `table.column.chip` - displays a `chip` component.
- `table.column.date` - displays a date.
- `table.column.dynamic` - dynamically loads columns with a specific type.
- `table.column.image` - displays an image.
- `table.column.input` - displays an `input` component.
- `table.column.select` - displays a `select` component.
- `table.column.text` - displays a text.

### Features

- `table.feature.batch-actions` - displays a checkmark that triggers a specific actions.
- `table.feature.editable` - displays an editable cell that toggles popup with a specific component (input, select, etc.).
- `table.feature.filters` - displays row with filters.
- `table.feature.pagination` - displays a pagination.
- `table.feature.row-actions` - displays dropdown menu that contains actions related specifically to the table row.
- `table.feature.search` - displays search.
- `table.feature.selectable` - displays a checkmark that triggers row selection.
- `table.feature.settings` - displays a button that triggers a popup with a table settings.
- `table.feature.sync-state` - syncs table state with a configuration.
- `table.feature.title` - displays title.
- `table.feature.total` - displays amount of table rows.

### Filter components

- `table.filter.date-range` - displays filter with `date-range` component.
- `table.filter.select` - displays filter with `select` component.
- `table.filter.tree-select` - displays filter with `tree-select` component.


