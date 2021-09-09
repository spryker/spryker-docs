---
title: Data Transformer Collate Filter Range
description: This document provides details about the Data Transformer Collate Filter Range service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Collate Filter Range service in the Components Library.

## Overview

Data Transformer Collate Filter Range is an Angular Service that implements filtering to range values of data based on configuration.

Example usage of the Data Transformer Collate Filter Range in the `@spryker/table` config:

```html
<spy-table
  [config]="{
    datasource: {
      ...                                               
      transform: {
        ...
        filter: {
          select1: {
            type: 'range',
            propNames: 'col1',
          },
          select2: {
            type: 'range',
            propNames: ['col2', 'col1'],
          },
        },
      },
    },
  }"
></spy-table>
```

## Interfaces

Below you can find interfaces for the Data Transformer Collate Filter Range type:

```ts
interface DataTransformerFilterConfig {
    type: string;
    propNames: string | string[];
}
```
