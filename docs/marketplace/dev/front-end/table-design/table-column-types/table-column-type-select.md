---
title: Table Column Type Select
description: This document provides details about the Table Column Type Select in the Components Library.
template: concept-topic-template
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
