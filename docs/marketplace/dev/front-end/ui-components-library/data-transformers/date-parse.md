---
title: Data Transformer Date-parse
description: This document provides details about the Data Transformer Date-parse service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Date-parse service in the Components Library.

## Overview

Data Transformer Date-parse is an Angular Service that parses the string value as a Date ISO into the JS Date Object.
In the example below, the `datasource` will return an object with the parsed `date` into `1600953608000`.

```ts
<spy-select
  [datasource]="{
    type: 'inline',
    data: {
      type: 'date',
      date: '2020-09-24T15:20:08+02:00',
    },
    transform: {
      type: 'object-map',
      mapProps: {
        date: {
          type: 'date-parse',
        },
      },
    },
  }"
></spy-select>
```

## Interfaces

```ts
export interface DateParseDataTransformerConfig extends DataTransformerConfig {}

// Service registration
@NgModule({
  imports: [
    DataTransformerModule.withTransformers({
      'date-parse': DateParseDataTransformerService,
    }),
  ],
})
export class RootModule {}
```
