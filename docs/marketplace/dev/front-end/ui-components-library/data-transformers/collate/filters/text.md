---
title: Data Transformer Collate Filter Text
description: This document provides details about the Data Transformer Collate Filter Text service in the Components Library.
template: concept-topic-template
---

This document provides details about the Data Transformer Collate Filter Text service in the Components Library.

## Overview

Data Transformer Collate Filter Text is an Angular Service that implements filtering to the text value of data based on configuration.

The following is an example of how to use the Data Transformer Collate Filter Text in the `@spryker/table` configuration:

```html
<spy-table
  [config]="{
    datasource: {
      ...                                               
      transform: {
        ...
        search: {
          type: 'text',
          propNames: ['col1', 'col2'],
        },
      },
    },
  }"
></spy-table>
```

## Interfaces

Below you can find interfaces for the Data Transformer Collate Filter Text type:

```ts
interface DataTransformerFilterConfig {
    type: string;
    propNames: string | string[];
}
```
