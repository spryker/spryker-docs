---
title: Data Transformer Collate Configurator Table
description: This document provides details about the Data Transformer Collate Configurator Table service in the Components Library.
template: concept-topic-template
---

This document explains the Data Transformer Collate Configurator Table service in the Components Library.

## Overview

Data Transformer Collate Configurator Table is an Angular Service that re-populates of data to a format suitable for filtering (`DataTransformerConfiguratorConfigT`).

Check out an example usage of the Data Transformer Collate Configurator Table in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        datasource: {
            ...,                                                   
            transform: {
                type: 'collate',
                configurator: {
                    type: 'table',
                },
                ...,  
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
    interface DataTransformerConfiguratorRegistry {
        table: TableDataTransformerConfiguratorService;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            collate: CollateDataTransformerService,
        }),
        CollateDataTransformer.withFilters({
            table: TableDataTransformerConfiguratorService,
        }),
    ],
})
export class RootModule {}
```
