---
title: Table Column Type Date
description: This document provides details about the Table Column Type Date in the Components Library.
template: concept-topic-template
last_updated: Jan 11, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-column-types/table-column-type-date.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-column-type-extension/table-column-type-date.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/table-design/table-column-type-extension/table-column-type-date.html

related:
  - title: Table Column Type extension
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-extension.html
  - title: Table Column Type Autocomplete
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-autocomplete.html
  - title: Table Column Type Button Action
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-button-action.html
  - title: Table Column Type Chip
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-chip.html
  - title: Table Column Type Dynamic
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-dynamic.html
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

This document explains the Table Column Type Date in the Components library.

## Overview

Table Column Date is an Angular Component that renders formatted date using Angular built-in Date Pipe.

Check out an example usage of the Table Column Date in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'date',
                typeOptions: {
                    date: '${displayValue}',
                    format: 'mediumDate',
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
        date: TableColumnDateConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            date: TableColumnDateComponent,
        }),
        TableColumnDateModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Column Date:

```ts
interface TableColumnDateConfig {
    date?: Date;
    format?: string; // 'shortDate' - by default
}
```

To learn more about the pre-defined `format` options, see [official Angular documentation](https://angular.io/api/common/DatePipe#pre-defined-format-options).
