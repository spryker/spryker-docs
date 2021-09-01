---
title: Table Column Type Image
description: This document provides details about the Table Column Type Image in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Image in the Components library.

## Overview

Table Column Image is an Angular Component that provides an image.

Example usage the Table Column Image in the `@spryker/table` config:

```html
<spy-table [config]="{
    ...,
    columns: [
      ...
      {
        id: 'columnId',
        title: 'Column Title',
        type: 'image',
        typeOptions: {
          src: 'image URL',
        },
      },
      ...
    ]
  }"
>
</spy-table>
```

## Interfaces

The Table Column Image interface:

```ts
interface TableColumnImageConfig {
    src?: string;
}
```
