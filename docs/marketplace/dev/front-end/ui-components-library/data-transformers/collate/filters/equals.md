---
title: Data Transformer Collate Filter Equals
description: This document provides details about the Data Transformer Collate Filter Equals service in the Components Library.
template: concept-topic-template
---

This document provides details about the Data Transformer Collate Filter Equals service in the Components Library.

## Overview

Data Transformer Collate Filter Equals is an Angular Service that implements filtering to equalize data based on configuration.

In the `@spryker/table` configuration, the Data Transformer Collate Filter Equals is used as follows:

```html
<spy-table
  [config]="{
    datasource: {
      ...                                               
      transform: {
        ...
        filter: {
          select1: {
            type: 'equals',
            propNames: 'col1',
          },
          select2: {
            type: 'equals',
            propNames: ['col2', 'col1'],
          },
        },
      },
    },
  }"
></spy-table>
```

## Interfaces

Below you can find interfaces for the Data Transformer Collate Filter Equals type:

```ts
interface DataTransformerFilterConfig {
    type: string;
    propNames: string | string[];
}
```
