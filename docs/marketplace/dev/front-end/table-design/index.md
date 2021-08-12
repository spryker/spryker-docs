---
title: Table design
description: This article describes the Table Design in the Components Library.
template: concept-topic-template
---

This article describes the Table Design in the Components Library.

## Overview
A Table Component is an arrangement of data in rows and columns, or possibly in a more complex structure 
(with sorting, filtering, pagination, row selections, infinite scrolling, etc.). 
It is an essential building block of a user interface.
A basic able Component is `<spy-table [config]="config"></spy-table>` where `config` is:

```ts
const config: TableConfig = {
  dataSource: {
    // transforms input data via Data Transformer service
    type: DatasourceType,
    transform?: DataTransformerConfig,
  },
  columns: [
    { id: 'col1', title: 'Column #1' },
    { id: 'col2', title: 'Column #2' },
    { id: 'col3', title: 'Column #3' },
  ],
};
```

## Architecture

![Table Architecture](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/Front-end/table-architecture.svg)
