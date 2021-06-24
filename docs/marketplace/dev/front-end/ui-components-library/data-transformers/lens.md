---
title: Data Transformer Lens
description: This document provides details about the Data Transformer Lens service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Lens service in the Components Library.

## Overview

Data Transformer Lens is an Angular Service that updates the nested object by path using another Data Transformer set up with a configuration object.
In the example below date in `col2` will be transformed.

```ts
<spy-table
  [config]="{
    columns: [
      { id: 'col1', title: 'Column #1' },
      { id: 'col2', title: 'Column #2' },
    ],
    dataSource: {
      type: 'table.inline',
      data: [
        {
          col1: 'col',
          col2: '2020-09-24T15:20:08+02:00',
        },
        {
          col1: 'col',
          col2: '2020-09-22T15:20:08+02:00',
        },
      ],
      transformerByPropName: {
        col2: 'date',
      },
      transform: {
        type: 'lens',
        path: 'col2',
        transformer: {
          type: 'array-map',
          mapItems: {
            type: 'object-map',
            mapProps: {
              col2: {
                type: 'date-parse',
              },
            },
          },
        },
      },
    },
  }"
></spy-table>
```

## Interfaces

`path` - the name of the object property, whose value needs to be transformed via configuration. May contain nested properties separated by dots, just like in a Javascript language.<br>
`transformer` - Data Transformer set up with a configuration object.

```ts
export interface LensDataTransformerConfig extends DataTransformerConfig {
  path: string;
  transformer: DataTransformerConfig;
}

// Service registration
@NgModule({
  imports: [
    DataTransformerModule.withTransformers({
      lens: LensDataTransformerService,
    }),
  ],
})
export class RootModule {}
```
