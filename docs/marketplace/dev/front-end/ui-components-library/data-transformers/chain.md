---
title: Data Transformer Chain
description: This document provides details about the Data Transformer Chain service in the Components Library.
template: concept-topic-template
---

This document explains the Data Transformer Chain service in the Components Library.

## Overview

Data Transformer Chain is an Angular Service that executes other Data Transformers in sequence via configuration.

In the following example, the `datasource` returns an array with the transformed `date` in every child object using chained transformers.

Service configuration:

- `transformers` - an array with Data Transformer configuration objects.

```html
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
>
</spy-select>
```

## Service registration

Register the service:

```ts
declare module '@spryker/data-transformer' {
    interface DataTransformerRegistry {
        chain: ChainDataTransformerConfig;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            chain: ChainDataTransformerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Chain:

```ts
export interface ChainDataTransformerConfig extends DataTransformerConfig {
    transformers: DataTransformerConfig[];
}
```
