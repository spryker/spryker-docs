---
title: Table Column Type Dynamic
description: This document provides details about the Table Column Type Dynamic in the Components Library.
template: concept-topic-template
last_updated: Jan 11, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-column-types/table-column-type-dynamic.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-column-type-extension/table-column-type-dynamic.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/table-design/table-column-type-extension/table-column-type-dynamic.html

related:
  - title: Table Column Type extension
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-extension.html
  - title: Table Column Type Autocomplete
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-autocomplete.html
  - title: Table Column Type Button Action
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-button-action.html
  - title: Table Column Type Chip
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-chip.html
  - title: Table Column Type Date
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-date.html
  - title: Table Column Type Image
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-image.html
  - title: Table Column Type Input
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-input.html
  - title: Table Column Type List
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-list.html
  - title: Table Column Type Select
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-select.html
  - title: Table Column Type Text
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-text.html
---

This document explains the Table Column Type Dynamic in the Components library.

## Overview

Table Column Dynamic is an Angular Component that renders a dynamic Table Column Type from a config retrieved via `@spryker/datasource`.

Check out an example usage of the Table Column Dynamic in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'dynamic',
                typeOptions: {
                    datasource: {
                        type: 'inline',
                        data: {
                            type: 'select',
                            typeOptions: {
                                options: [
                                    {
                                        title: 'Option dynamic 1',
                                        value: 'Option dynamic 1',
                                    },
                                    {
                                        title: 'Option dynamic 2',
                                        value: 'Option dynamic 2',
                                    },
                                ],
                            },
                        },
                    },
                },
            },
            ...,
        ],
    }"
>
</spy-table>
```

## Component registration

Register the component:

```ts
declare module '@spryker/table' {
    interface TableColumnTypeRegistry {
        dynamic: TableColumnDynamicConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            dynamic: TableColumnDynamicComponent,
        }),
        TableColumnDynamicModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Column Dynamic:

```ts
interface DataTransformerConfig {
    type: string;

    // Reserved for types that may have extra configuration
    [extraConfig: string]: unknown;
}

interface DatasourceConfig {
    type: string;
    transform?: DataTransformerConfig;

    // Specific Datasource types may have custom props
    [k: string]: unknown;
}

interface TableColumnDynamicDatasourceConfig implements DatasourceConfig {
    type: string;
    [k: string]: unknown;
}

interface TableColumnDynamicConfig {
    datasource: TableColumnDynamicDatasourceConfig;
}
```
