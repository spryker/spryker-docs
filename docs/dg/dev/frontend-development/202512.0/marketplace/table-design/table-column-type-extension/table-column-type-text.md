---
title: Table Column Type Text
description: This document provides details about the Table Column Type Text in the Components Library.
template: concept-topic-template
last_updated: Jan 11, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-column-types/table-column-type-text.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-column-type-extension/table-column-type-text.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/table-design/table-column-type-extension/table-column-type-text.html

related:
  - title: Table Column Type extension
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-extension.html
  - title: Table Column Type Autocomplete
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-autocomplete.html
  - title: Table Column Type Button Action
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-button-action.html
  - title: Table Column Type Chip
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-chip.html
  - title: Table Column Type Date
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-date.html
  - title: Table Column Type Dynamic
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-dynamic.html
  - title: Table Column Type Image
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-image.html
  - title: Table Column Type Input
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-input.html
  - title: Table Column Type List
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-list.html
  - title: Table Column Type Select
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-column-type-extension/table-column-type-select.html
---

This document explains the Table Column Type Text in the Components library.

## Overview

Table Column Text is an Angular Component that renders text.

Check out an example usage of the Table Column Text in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'text',
                typeOptions: {
                    text: '${displayValue}',
                },
            },
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'text',
                typeOptions: {
                    text: '${displayValue}',
                },
                typeOptionsMappings: {
                    color: { col3: 'green' },
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
        text: TableColumnTextConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            text: TableColumnTextComponent,
        }),
        TableColumnTextModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Column Text:

```ts
interface TableColumnTextConfig {
    text?: string;
}
```
