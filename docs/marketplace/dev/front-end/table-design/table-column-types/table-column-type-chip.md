---
title: Table Column Type Chip
description: This document provides details about the Table Column Type Chip in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Chip in the Components library.

## Overview

Table Column Chip is an Angular Component that renders a chip using the `@spryker/chips` component.

Check out an example usage of the Table Column Chip in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'chip',
                typeOptions: {
                    text: '${displayValue}',
                    color: 'blue',
                },
            },
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'chip',
                typeOptions: {
                    color: 'gray',
                },
                typeOptionsMappings: {
                    color: { 0: 'red' },
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
        chip: TableColumnChipConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            chip: TableColumnChipComponent,
        }),
        TableColumnChipModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Column Chip:

```ts
interface TableColumnChipConfig {
    /** Bound to the @spryker/chips inputs */
    text?: string;
    color?: string;
}
```
