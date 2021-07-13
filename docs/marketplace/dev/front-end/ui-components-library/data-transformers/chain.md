---
title: Data Transformer Chain
description: This document provides details about the Data Transformer Chain service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Chain service in the Components Library.

## Overview

Data Transformer Chain is an Angular Service that executes other Data Transformers in sequence via configuration.

In the example below, the `datasource` returns an array with the transformed `date` in every child object using chained transformers.


```ts
<spy-select
  [datasource]="{
    type: 'inline',
    data: [
      {
        type: 'date',
        date: '2020-09-24T15:20:08+02:00',
      },
      {
        type: 'date',
        date: '2020-09-22T15:20:08+02:00',
      },
    ],
    transform: {
      type: 'chain',
      transformers: [
        {
          type: 'array-map',
          mapItems: {
            type: 'lens',
            path: 'date',
            transformer: {
              type: 'date-parse',
            },
          },
        },                                            
        {
          type: 'array-map',
          mapItems: {
            type: 'object-map',
            mapProps: {
              date: {
                type: 'date-serialize',
              },
            },
          },
        },
      ],      
    },                  
  }"
></spy-select>
```

## Interfaces

Below you can find interfaces for Data Transformer Chain.

`transformers`—an array with Data Transformer configuration objects.

```ts
export interface ChainDataTransformerConfig extends DataTransformerConfig {
  transformers: DataTransformerConfig[];
}

// Service registration
@NgModule({
  imports: [
    DataTransformerModule.withTransformers({
      chain: ChainDataTransformerService,
    }),
  ],
})
export class RootModule {}
```
