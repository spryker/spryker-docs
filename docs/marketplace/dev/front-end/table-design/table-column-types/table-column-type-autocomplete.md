---
title: Table Column Type Autocomplete
description: This document provides details about the Table Column Type Autocomplete in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Autocomplete in the Components library.

## Overview

Table Column Autocomplete is an Angular Component that renders an autocomplete field using the `@spryker/input` and `@spryker/autocomplete` components.

Check out an example usage of the Table Column Autocomplete in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'autocomplete',
                typeOptions: {
                    options: [
                        {
                            value: 'Option Value',
                            title: 'Option Title',
                        },
                        {
                            value: 'Second Option Value',
                            title: 'Second Downing Street',
                            isDisabled: true,
                        },
                    ],
                    placeholder: 'Field Placeholder',
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
        autocomplete: TableColumnAutocompleteConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            autocomplete: TableColumnAutocompleteComponent,
        }),
        TableColumnAutocompleteModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Column Autocomplete:

```ts
interface AutocompleteValue {
    value: unknown;
    title: string;
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

interface TableColumnAutocompleteConfig {
    /** Bound to the @spryker/autocomplete inputs */
    options: AutocompleteValue[];
    datasource?: DatasourceConfig;
    /** Bound to the @spryker/input inputs */
    value?: any;
    type: string; // 'text' - by default
    placeholder?: string;
    prefix?: string;
    suffix?: string;
    outerPrefix?: string;
    outerSuffix?: string;
    attrs?: Record<string, string>;
    /** Bound to the @spryker/form-item input */
    editableError?: string | boolean;
}
```
