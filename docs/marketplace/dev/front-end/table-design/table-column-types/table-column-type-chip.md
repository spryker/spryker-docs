---
title: Table Column Type Chip
description: This document provides details about the Table Column Type Chip in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Chip in the Components library.

## Overview

Table Column Chip is an Angular Component that provides a chip by rendering the `@spryker/chips` component.

Example usage the Table Column Chip in the `@spryker/table` config:

```html
<spy-table [config]="{
    ...,
    columns: [
      ...
      {
        id: 'columnId',
        title: 'Column Title',
        type: 'chip',
        typeOptions: {
          text: '${value}',
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
      ...
    ]
  }"
>
</spy-table>
```

## Interfaces

The Table Column Chip interface:

```ts
interface TableColumnChipConfig {
    /** Bound to the @spryker/chips inputs */
    text?: string;
    color?: string;
}
```
