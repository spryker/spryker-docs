---
title: Data Transformer Collate Filter Equals
description: This document provides details about the Data Transformer Collate Filter Equals service in the Components Library.
template: concept-topic-template
---

This document explains the Data Transformer Collate Filter Equals service in the Components Library.

## Overview

Data Transformer Collate Filter Equals is an Angular Service that implements filtering to equalize data based on configuration.

Check out an example usage of the Data Transformer Collate Filter Equals in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        datasource: {
            ...,                                               
            transform: {
                ...,
                filter: {
                    select1: {
                        type: 'equals',
                        propNames: 'col1',
                    },
                    select2: {
                        type: 'equals',
                        propNames: ['col2', 'col1'],
                    },
                },
            },
        },
    }"
>
</spy-table>
```

## Service registration

Register the service:

```ts
declare module '@spryker/data-transformer.collate' {
    interface DataTransformerFilterRegistry {
        equals: EqualsDataTransformerFilterService;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            collate: CollateDataTransformerService,
        }),
        CollateDataTransformer.withFilters({
            equals: EqualsDataTransformerFilterService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Collate Filter Equals:

```ts
interface DataTransformerFilterConfig {
    type: string;
    propNames: string | string[];
}
```
