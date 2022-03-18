---
title: Data Transformer Filters
description: This document provides details about the Data Transformer Filters service in the Components Library.
template: concept-topic-template
---

This document explains the Data Transformer Filters service in the Components Library.

## Overview

Data Transformer Filters is an Angular Service that filters data based on configuration.
In this way, backend systems can control where the filter data is applied.

Data Transformer Filters are used in the Datasource service.

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
                filter: {
                    date: {
                        type: 'range',
                        propNames: 'col1',
                    },
                },
                search: {
                    type: 'text',
                    propNames: ['col2'],
                },
                transformerByPropName: {
                    col1: 'date',
                },  
            },
        },
    }"
>
</spy-table>
```

## Main service

In the main module, you can register any filters by key by using the static method `withFilters()`. It assigns the object of filters to the `DataTransformerFiltersTypesToken`.

The main service injects all registered types from the `DataTransformerFiltersTypesToken` and `DataTransformerFilter`.

`resolve()` method finds specific services from the `DataTransformerFiltersTypesToken` by `type` (from the argument) and returns an observable with data by `DataTransformerFilter.filter()`.

## Data Transformer Filter

Data Transformer Filter is basically an Angular Service that encapsulates the filtering logic.

Data Transformer Filter must implement a specific interface (`DataTransformerFilter`) and then be registered to the Root Module via `CollateDataTransformerModule.withFilters()`.

```ts
// Module augmentation
declare module '@spryker/data-transformer' {
    interface DataTransformerRegistry {
        collate: CollateDataTransformerConfig;
    }
}

declare module '@spryker/data-transformer.collate' {
    interface DataTransformerFilterRegistry {
        custom: CustomDataTransformerFilterService;
    }
}

// Service implementation
@Injectable({ providedIn: 'root' })
export class CustomDataTransformerFilterService implements DataTransformerFilter {
    filter(
        type: DataTransformerFilterRegistryType | string,
        data: DataTransformerFilterData,
        options: DataTransformerFilterConfig,
        byValue: DataTransformerFilterByValue,
        transformerByPropName: DataFilterTransformerByPropName,
    ): Observable<DataTransformerFilterData> { 
        ... 
    }
}

@NgModule({
    imports: [
        CollateDataTransformerModule.withFilters({
            custom: CustomDataTransformerFilterService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the `DataTransformerFilter` configuration and `DataTransformerFilter` type:

```ts
type DataTransformerFilterData = Record<string, unknown>[];
type DataTransformerFilterByValue = unknown[];
type DataFilterTransformerByPropName = Record<string, string>;

interface DataTransformerFilterConfig {
    type: string;
    propNames: string | string[];
}

interface DataTransformerFilter {
    filter(
        type: DataTransformerFilterRegistryType | string,
        data: DataTransformerFilterData,
        options: DataTransformerFilterConfig,
        byValue: DataTransformerFilterByValue,
        transformerByPropName?: DataFilterTransformerByPropName,
    ): Observable<DataTransformerFilterData>;
}
```

## Data Transformer Filter types

There are a few common Data Transformer Filters that are available in UI library as separate packages:

- [Equals](/docs/marketplace/dev/front-end/ui-components-library/data-transformers/collate/filters/equals.html) - filters values that are strictly equal.
- [Range](/docs/marketplace/dev/front-end/ui-components-library/data-transformers/collate/filters/range.html) - filters values that are within a number range.
- [Text](/docs/marketplace/dev/front-end/ui-components-library/data-transformers/collate/filters/text.html) - filters values that match a string.
