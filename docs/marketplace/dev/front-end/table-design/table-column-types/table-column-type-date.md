---
title: Table Column Type Date
description: This document provides details about the Table Column Type Date in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Date in the Components library.

## Overview

Table Column Date is an Angular Component that renders formatted date using Angular built-in Date Pipe.

Check out an example usage of the Table Column Date in the `@spryker/table` config:

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

Below you can find an interface for the Table Column Date type:

```ts
interface TableColumnDateConfig {
    date?: Date;
    format?: string; // 'shortDate' - by default
}
```

To learn more about the pre-defined `format` options, see <a href="https://angular.io/api/common/DatePipe#pre-defined-format-options" target="_blank">official Angular documentation</a>.
