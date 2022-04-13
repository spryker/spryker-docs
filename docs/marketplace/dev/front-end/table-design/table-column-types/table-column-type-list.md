---
title: Table Column Type List
description: This document provides details about the Table Column Type List in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type List in the Components library.

## Overview

Table Column List is an Angular Component that provides a list of Table Column components with defined types via the `table-column-renderer` component and displays two columns by default, with the rest appearing in the `@spryker/popover` component.

Check out an example usage of the Table Column List in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'sku',
                title: 'sku',
                type: 'list',
                typeOptions: {
                    limit: 2,
                    type: 'text',
                    typeOptions: {
                        text: '${displayValue}',
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
        list: TableColumnListConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            list: TableColumnListComponent,
        }),
        TableColumnListModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Column List:

```ts
interface TableColumnListConfigInner {
    type?: string;
    typeOptions?: Object;
    typeChildren?: TableColumnListConfigInner[];
}

interface TableColumnListConfig extends TableColumnListConfigInner {
    limit: number; // 2 - by default
}
```
