---
title: Data Transformer Date-serialize
description: This document provides details about the Data Transformer Date-serialize service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Date-serialize service in the Components Library.

## Overview

Data Transformer Date-serialize is an Angular Service that serializes JS Date Object into a Date ISO string.
In the example below, the `datasource` will transform `date` object in the data into the serialized `date` string.

```ts
<spy-select
  [datasource]="{
    type: 'inline',
    data: Date.now(),
    transform: {
      type: 'date-serialize'
    },
  }"
></spy-select>
```

## Interfaces

```ts
export interface DateSerializeDataTransformerConfig extends DataTransformerConfig {}

// Service registration
@NgModule({
  imports: [
    DataTransformerModule.withTransformers({
      'date-serialize': DateSerializeDataTransformerService,
    }),
  ],
})
export class RootModule {}
```
