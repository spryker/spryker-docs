---
title: Datasource Inline Table
description: This document provides details about the Datasource Inline Table service in the Components Library.
template: concept-topic-template
last_updated: Jan 12, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/datasources/datasource-inline-table.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/datasources/datasource-inline-table.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/datasources/datasource-inline-table.html

related:
  - title: Datasources
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasources.html
  - title: Datasource Http
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html
  - title: Datasource Inline
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-inline.html
---

Datasource Inline Table is an Angular service in the components library that allows for passing the data transformed for the table format along with the configuration of the Datasource.

## Usage

Service configuration:

| ATTRIBUTE | DESCRIPTION |
| - | - |
| `type` | A datasource type.   |
| `data` | Datasource table data, which usually comes from the backend.   |
| `filter` | An array of filters that passes the data transformed for the table format. |

Usage example:

```html
<spy-table
    [config]="{
        dataSource: {
            type: 'inline.table',
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
    }"
>
</spy-table>
```

## Service registration

Register the service:

```ts
declare module '@spryker/datasource' {
    interface DatasourceRegistry {
        'inline.table': TableDatasourceInlineService;
    }
}

@NgModule({
    imports: [
        DatasourceModule.withDatasources({
            'inline.table': TableDatasourceInlineService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Datasource Inline Table interfaces:

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
```
