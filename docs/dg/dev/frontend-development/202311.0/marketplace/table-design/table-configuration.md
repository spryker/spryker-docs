---
title: Table Configuration
description: This document provides details about the table configuration.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
- /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-configuration.html
- /docs/scos/dev/front-end-development/202311.0/marketplace/table-design/table-configuration.html
- /docs/marketplace/dev/front-end/202212.0/table-design/table-configuration.html

---

This document provides details about how to configure the table.

## Overview

Using Table Configuration you can customize the behavior of the table based on your specific use case.

Table config has two required sections:

- [Columns](#columns-configuration) definition that describes what columns user will see and what data to expect.
- [Datasource](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasources.html) type that describes how the data should be provided to a table.

The rest of the sections are reserved for features (like Pagination, which describes pagination section and its properties).

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

### Columns configuration

You can configure columns with two properties. By using `url`, you can get a dynamic list of columns. In this case, the `columnsUrl` property should be assigned to the `table` configuration.

The columns data can also be defined as a static array of columns objects assigned to the `columns` property.

#### Column config example

Check out the example of the column configuration:

```ts
[
    // chip
    {
        id: 'stock',
        title: 'Stock',
        type: 'chip',
        typeOptions: {
            color: 'green',
        },
        typeOptionsMappings: {
            color: {0: 'red'},
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
            text: {
                'true': 'Active',
                'false': 'Inactive',
            },
            color: {'true': 'green'},
        },
    },
    // select
    {
        id: 'store',
        type: 'select',
        typeOptions: {
            multiselect: bool,
            values: [
                {value: 1, title: 'DE'},
                {value: 2, title: 'AT'},
            ],
        },
    },
    // input
    {
        id: 'gross_price',
        type: 'input',
        typeOptions: {
            type: '|text|number|tel',
            placeholder: '0.00',
            readOnly: bool,
        },
    },
]
```

## Type options interpolation and mapping

Table Column config supports interpolation. Variables inside curly brackets (e.g `${value}, ${row.title}...`) in the `typeOptions` object are replaced with the appropriate table context value.

Below is the complete table context:

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

In addition, Table Column supports overriding defined *typeOptions* properties based on the value of the table column. As a result, the `typeOptionsMappings` object should be added where the `typeOption` key and all variants are defined.

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
    text: { col3: 'Active', 'false': 'Inactive' },
    color: { col3: 'green'}
},
...

// Possible showed table `text` and `color` variants:
// text—'Active' and color—'green'—if table column value is `col3`
// text—'Inactive' and default color('red')—if table column value is `false`
// default text(table column value) and default color('red')—in other cases
```

To get more details about the table columns, see [Column Types](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-extension.html).

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
