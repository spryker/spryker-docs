---
title: Data Transformer Array-map
description: This document provides details about the Data Transformer Array-map service in the Components Library.
template: concept-topic-template
---

This document provides details about the Data Transformer Array-map service in the Components Library.

## Overview

Data Transformer Array-map is an Angular Service that executes another Data Transformer based on the config for every element in the array.
In the example below, the `datasource` will return an array with the transformed `date` in every object.

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
        date: '2020-09-24T15:20:08+02:00',
      },
    ],
    transform: {
      type: 'array-map',
      mapItems: {
        type: 'lens',
        path: 'date',
        transformer: {
          type: 'date-parse',
        },
      },
    },
  }"
></spy-select>
```

## Interfaces

`mapItems`—Data Transformer set up with a configuration object.

```ts
export interface ArrayMapDataTransformerConfig extends DataTransformerConfig {
  mapItems: DataTransformerConfig;
}

// Service registration
@NgModule({
  imports: [
    DataTransformerModule.withTransformers({
      'array-map': ArrayMapDataTransformerService,
    }),
  ],
})
export class RootModule {}
```
