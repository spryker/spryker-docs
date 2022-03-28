---
title: Table Column Type Text
description: This document provides details about the Table Column Type Text in the Components Library.
template: concept-topic-template
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
