---
title: Table Column Type List
description: This document provides details about the Table Column Type List in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type List in the Components library.

## Overview

Table Column List is an Angular Component that provides list of Table Column components with defined type via the `table-column-renderer` component and limits their displaying by `@spryker/popover` component.

Example usage the Table Column List in the `@spryker/table` config:

```html
<spy-table [config]="{
    ...,
    columns: [
      ...
      {
        id: 'sku',
        title: 'sku',
        type: 'list',
        typeOptions: {
          limit: 2,
          type: 'test',
          typeOptions: {
            text: '${value}',
          },
        },
      },
      ...
    ]
  }"
>
</spy-table>
```

## Interfaces

The Table Column List interfaces:

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
