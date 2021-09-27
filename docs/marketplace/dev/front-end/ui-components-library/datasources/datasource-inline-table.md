---
title: Datasource Inline Table
description: This article provides details about the Datasource Inline Table service in the Components Library.
template: concept-topic-template
---

This article provides details about the Datasource Inline Table service in the Components Library.

Datasource Inline Table is an Angular Service that allows passing transformed for the table format data along with the configuration of the Datasource.
See an example below, how to use the Datasource Inline Table service.

`type` - a datasource type.  
`data` - a datasource table data (usually coming from back-end).  
`filter` - an array of filters that passes transformed for the table format data.

```html
<spy-table [config]="{
  dataSource: {
    type: 'table.inline',
    data: [
      {
        col1: 1,
        col2: 'col 2',
      },
      {
        col1: 2,
        col2: 'col 1',
      },
    ],
    filter: {
      select1: {
        type: 'equals',
        propNames: 'col1',
      },
    },
  },
  columns: [ ... ],
  filters: {
    enabled: true,
    items: [
      {
        id: 'select1',
        title: 'Column 1',
        type: 'select',
        typeOptions: {
          multiselect: false,
          values: [
            { value: 1, title: 1 },
            { value: 2, title: 2 },
          ],
        },
      },
    ],
  },
}">
</spy-table>
```

## Interfaces

Below you can find interfaces for Datasource Inline Table.

```ts
export interface TableDatasourceInlineConfig extends DatasourceConfig {
  data: unknown;
  filter?: {
    [filterId: string]: DataTransformerFilterConfig;
  };
  search?: DataTransformerFilterConfig;
  transformerByPropName?: Record<string, string>;
}

export interface DataTransformerFilterConfig {
  type: string;
  propNames: string | string[];
}

// Component registration
@NgModule({
  imports: [
    DatasourceModule.withDatasources({
      'table.inline': TableDatasourceInlineService,
    }),
  ],
})
export class RootModule {}
```
