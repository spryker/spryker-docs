---
title: Data Transformer Lens
description: This document provides details about the Data Transformer Lens service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Lens service in the Components Library.

## Overview

Data Transformer Lens is an Angular Service that updates the nested object by path using another Data Transformer set up with a configuration object.
In the example below `datasource` will return transformed `date`.

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
      type: 'lens',
      path: 'date',
      transformer: {
        type: 'array-map',
        mapItems: {
          type: 'object-map',
          mapProps: {
            date: {
              type: 'date-parse',
            },
          },
        },
      },
    },
  }"
></spy-select>
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
