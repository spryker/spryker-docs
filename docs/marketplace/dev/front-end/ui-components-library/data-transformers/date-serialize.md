---
title: Data Transformer Date-serialize
description: This document provides details about the Data Transformer Date-serialize service in the Components Library.
template: concept-topic-template
---

This document explains the Data Transformer Date-serialize service in the Components Library.

## Overview

Data Transformer Date-serialize is an Angular Service that serializes JS Date Object into a Date ISO string.

In the following example, the `datasource` transforms `date` object into the serialized `date` string.

```html
<spy-select
    [datasource]="{
        type: 'inline',
        data: Date.now(),
        transform: {
            type: 'date-serialize'
        },
    }"
>
</spy-select>
```

## Service registration

Register the service:

```ts
declare module '@spryker/data-transformer' {
    interface DataTransformerRegistry {
        'date-serialize': DateSerializeDataTransformerConfig;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            'date-serialize': DateSerializeDataTransformerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Date-serialize:

```ts
export interface DateSerializeDataTransformerConfig extends DataTransformerConfig {}
```
