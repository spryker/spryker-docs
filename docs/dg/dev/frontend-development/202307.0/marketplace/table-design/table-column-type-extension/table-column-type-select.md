---
title: Table Column Type Select
description: This document provides details about the Table Column Type Select in the Components Library.
template: concept-topic-template
last_updated: Aug 2, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-column-types/table-column-type-select.html
  - /docs/scos/dev/front-end-development/202307.0/marketplace/table-design/table-column-type-extension/table-column-type-select.html

related:
  - title: Table Column Type extension
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-extension.html
  - title: Table Column Type Autocomplete
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-autocomplete.html
  - title: Table Column Type Chip
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-chip.html
  - title: Table Column Type Date
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-date.html
  - title: Table Column Type Dynamic
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-dynamic.html
  - title: Table Column Type Image
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-image.html
  - title: Table Column Type Input
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-input.html
  - title: Table Column Type List
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-list.html
  - title: Table Column Type Text
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-text.html
---

This document explains the Table Column Type Select in the Components library.

## Overview

Table Column Select is an Angular Component that renders a drop-down list using the `@spryker/select` component.

Check out an example usage of the Table Column Select in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'select',
                typeOptions: {
                    options: [
                        {
                            title: 'Option 1',
                            value: 'Option 1',
                        },
                        {
                            title: 'Option 2',
                            value: 'Option 2',
                            isDisabled: true,
                        },
                        {
                            title: 'Option 3',
                            value: 'Option 3',
                        },
                    ],
                    placeholder: '123',
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
        select: TableColumnSelectConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            select: TableColumnSelectComponent,
        }),
        TableColumnSelectModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Column Select:

```ts
type SelectValue = string | number;
type SelectOption = SelectValue | SelectOptionItem;

interface SelectOptionItem {
    title: string;
    value: SelectValue;
    isDisabled?: boolean;
}

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

interface ColumnSelectDataTransformer implements DataTransformerConfig {
    type: string;
    [k: string]: unknown;
}

interface ColumnSelectDatasource implements DatasourceConfig {
    type: string;
    transform?: ColumnSelectDataTransformer;
    [k: string]: unknown;
}

interface TableColumnSelectConfig {
    /** Bound to the @spryker/select inputs */
    options: (SelectOption | ColumnSelectOptionItem)[];
    value?: SelectValue;
    multiple?: boolean; // false - by default
    search?: boolean; // false - by default
    disableClear?: boolean; // false - by default
    placeholder?: string;
    showSelectAll?: boolean; // false - by default
    selectAllTitle?: string;
    noOptionsText?: string;
    datasource?: ColumnSelectDatasource;
    /** Bound to the @spryker/form-item input */
    editableError?: string | boolean;
}
```
