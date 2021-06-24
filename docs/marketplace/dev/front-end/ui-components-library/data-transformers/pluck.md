---
title: Data Transformer Pluck
description: This document provides details about the Data Transformer Pluck service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Pluck service in the Components Library.

## Overview

Data Transformer Pluck is an Angular Service that selects and returns a nested object by path via configuration.
The `datasource` example below will return the value of the `three` key ('123') of the `data` input after receiving the response.

```ts
<spy-select
  [datasource]="{
    type: 'inline',
    data: {
      one: {
        two: {
          three: '123',  
        },
      },
    },
    transform: {
      type: 'pluck',
      path: 'one.two.three',
    },
  }"
></spy-select>
```

## Interfaces

`path` - the name of the property from which the value needs to be retrieved. The `path` may contain nested properties separated by dots, just like in a Javascript language.

```ts
export interface PluckDataTransformerConfig extends DataTransformerConfig {
  path: string;
}

// Service registration
@NgModule({
  imports: [
    DataTransformerModule.withTransformers({
      pluck: PluckDataTransformerService,
    }),
  ],
})
export class RootModule {}
```
