---
title: Table Column Type Text
description: This document provides details about the Table Column Type Text in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Text in the Components library.

## Overview

Table Column Text is an Angular Component that provides a static text.

Example usage of the Table Column Text in the `@spryker/table` config:

```html
<spy-table [config]="{
    ...,
    columns: [
      ...
      {
        id: 'columnId',
        title: 'Column Title',
        type: 'text',
        typeOptions: {
          text: '${value}',
        },
      },
      {
        id: 'columnId',
        title: 'Column Title',
        type: 'text',
        typeOptions: {
          text: '${value}',
        },
        typeOptionsMappings: {
          color: { col3: 'green' },
        },
      },
      ...
    ]
  }"
>
</spy-table>
```

## Interfaces

Below you can find interface for the Table Column Text type:

```ts
interface TableColumnTextConfig {
    text?: string;
}
```
