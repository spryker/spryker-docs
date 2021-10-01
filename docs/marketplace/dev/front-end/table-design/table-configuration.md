---
title: Table Configuration
description: This articles provides details about the table configuration.
template: concept-topic-template
---

This articles provides details about the table configuration.

## Configuration

Table Configuration is basically a data structure that allows to customize behavior of the table for specific use-case.

Table config has 2 required sections:

- [Columns](#columns-configuration) definition that describes what columns user will see and what data to expect
- [Datasource](/docs/marketplace/dev/front-end/ui-components-library/datasources/l) type that describes how the data should be provided to the table.

The rest of the sections are reserved for features (for example Pagination Feature defines pagination section and it’s own properties to configure it).

```html
<spy-table
  config="{
    columns?: '### Section Columns Configuration ###',
    columnsUrl?: '### Section Columns Configuration ###',
    dataSource: '### See DataSource Doc ###',,
    rowActions: '### See Table Row Actions Feature Doc ###',
    pagination: '### See Table Pagination Feature Doc ###',
    search: '### See Table Search Feature Doc ###',
    title:: '### See Table Title Feature Doc ###',
    columnConfigurator: '### See Table Settings Feature Doc ###',
    filters: '### See Table Filters Feature Doc ###',
    itemSelection: '### See Table Selectable Feature Doc ###',
    syncStateUrl: '### See Table Sync State Feature Doc ###',
    editable: '### See Table Editable Feature Doc ###',
  }"
>
</spy-table>
```

### Columns Configuration

Columns might be configured with two props. There is possible to use `url` to get columns list dynamically, in this case, the `columnsUrl` property should be assigned in the `table` config.
Also exists another way to define columns data - static array of columns objects which should be assigned to the `columns` property.

#### Column Config Example

```ts
[
  // chip
  {
    "id":"stock",
    "title":"Stock",
    "type":"chip",
    "typeOptions": {
      "color": "green"
    },
    "typeOptionsMappings: {
      "color": {"0": "red"}
    },
  },
  // chips
  {
    id: 'status',
    type: 'chips',
    typeOptions: {
      text: '${value}',
      color: 'red',
    },
    typeOptionsMappings: {
      text: {'true': 'Active', 'false': 'Inactive'},
      color: {'true': 'green'}
    },
  },
  // select
  {
    id:"store",
    type:"select",
    typeOptions: {
        multiselect: bool,
        values: [
            {value: 1, title:"DE"},
            {value: 2, title:"AT"}
        ]
    }
  },
  // input
  {
    id:"gross_price",
    type:"input",
    typeOptions: {
        type: '|text|number|tel',
        placeholder: '0.00',
        readOnly: bool,
    }
  },
]
```

## Type Options Interpolation and Mapping

Table Column config supports interpolation. The variable inside curly brackets (e.g `${value}, ${row.title}...`) in the `typeOptions` object will be replaced to the appropriate value from the table context.

The full table context is shown below:

```ts
interface TableColumnTplContext extends TableColumnContext {
  $implicit: TableColumnContext['value'];
}

interface TableColumnContext {
  value: TableDataValue;
  row: TableDataRow;
  config: TableColumn;
  i: number;
  j: number;
}

interface TableColumn extends Partial<TableColumnTypeDef> {
  id: string;
  title: string;
  width?: string;
  multiRenderMode?: boolean;
  multiRenderModeLimit?: number;
  emptyValue?: string;
  sortable?: boolean;
  searchable?: boolean;
}

type TableDataRow = Record<TableColumn['id'], TableDataValue>;

type TableDataValue = unknown | unknown[];
```

Also, Table Column supports overriding defined `typeOptions` properties depending on the table column value. To allow this opportunity the `typeOptionsMappings` object should be added where the `typeOption` key and all available variants are defined.

Example

```ts
  typeOptionsMappings: {
    TYPE_OPTION_KEY: { TABLE_COLUMN_VALUE: DESIRED_VALUE_1, TABLE_COLUMN_VALUE: DESIRED_VALUE_2 },
  },
```

```ts
...
  typeOptions: {
    text: '${value}',
    color: 'red',
  },
  typeOptionsMappings: {
    text: { col3: 'Active', false: 'Inactive' },
    color: { col3: 'green'}
  },
...

// Possible showed table `text` and `color` variants:
// text - 'Active' and color - 'green' - if table column value is `col3`
// text - 'Inactive' and default color('red') - if table column value is `false`
// default text(table column value) and default color('red') - in other cases
```

To get more info about table columns see [Column Types](/docs/marketplace/dev/front-end/table-design/table-column-types/).

## Interfaces

Below you can find interfaces for the Table:

```ts
export interface TableConfig {
  dataSource: DatasourceConfig;
  columnsUrl?: string;
  columns?: TableColumns;
  // Features may expect it's config under it's namespace
  [featureName: string]: TableFeatureConfig | unknown;
}
```
