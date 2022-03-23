---
title: Table Column Type Image
description: This document provides details about the Table Column Type Image in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Image in the Components library.

## Overview

Table Column Image is an Angular Component that renders an image.

Check out an example usage of the Table Column Image in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'image',
                typeOptions: {
                    src: 'image URL',
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
        image: TableColumnImageConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            image: TableColumnImageComponent,
        }),
        TableColumnImageModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Table Column Image:

```ts
interface TableColumnImageConfig {
    src?: string;
}
```
