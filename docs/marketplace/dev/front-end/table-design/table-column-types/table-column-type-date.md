---
title: Table Column Type Date
description: This document provides details about the Table Column Type Date in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Date in the Components library.

## Overview

Table Column Date is an Angular Component that provides formatted date.

Example usage the Table Column Date in the `@spryker/table` config:

```html
<spy-table [config]="{
    ...,
    columns: [
      ...
      {
        id: 'columnId',
        title: 'Column Title',
        type: 'date',
        typeOptions: {
          date: '${value}',
          format: 'mediumDate',
        },
      },
      ...
    ]
  }"
>
</spy-table>
```

## Interfaces

The Table Column Date interface:

```ts
interface TableColumnDateConfig {
    date?: Date;
    format?: string; // 'shortDate' - by default
}
```
