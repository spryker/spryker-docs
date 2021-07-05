---
title: Data Transformer Lens
description: This document provides details about the Data Transformer Lens service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Lens service in the Components Library.

## Overview

Data Transformer Lens is an Angular Service that updates nested objects by path using another Data Transformer set up with a configuration object.
In the example below `datasource` will return an object with the transformed `date`.

```ts
<spy-select
  [datasource]="{
    type: 'inline',
    data: {
      type: 'date',
      date: '2020-09-24T15:20:08+02:00',
    },
    transform: {
      type: 'lens',
      path: 'date',
      transformer: {
        type: 'date-parse',
      },
    },
  }"
></spy-select>
```

## Interfaces

`path`—the name of the object property, from which the value needs to be transformed. The `path` may contain nested properties separated by dots, just like in a Javascript language.  
`transformer`—Data Transformer set up with a configuration object.

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
