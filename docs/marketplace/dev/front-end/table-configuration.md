---
title: Table Configuration
description: This articles provides details about the table configuration.
template: concept-topic-template
---

This articles provides details about the table configuration.

## Configuration

Table Configuration is basically a data structure that allows to customize behavior of the table for specific use-case.

```html
<spy-table
  config="{
    columns: '### Section Columns Configuration ###',
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

It might be url or

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

To get more info about table columns see [next file](/docs/marketplace/dev/front-end/table-design/table-column-type-extension.html).
```

### Page Sizes

```ts
[10, 25, 50];
```

It has 2 required sections:

- Column definition that describes what columns user will see and what data to expect
- Datasource type that describes how the data should be provided to the table.

The rest of the sections are reserved for features (for example Pagination Feature defines pagination section and it’s own properties to configure it).
