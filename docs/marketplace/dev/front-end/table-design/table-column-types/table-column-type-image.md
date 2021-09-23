---
title: Table Column Type Image
description: This document provides details about the Table Column Type Image in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Image in the Components library.

## Overview

Table Column Image is an Angular Component that renders an image.

Example usage of the Table Column Image in the `@spryker/table` config:

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

Below you can find interface for the Table Column Image type:

```ts
interface TableColumnImageConfig {
    src?: string;
}
```
