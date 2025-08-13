---
title: "Data Transformer: Collate"
description: This document provides details about the Data Transformer Collate service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/data-transformers/collate/
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/data-transformers/collate/index.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/data-transformers/data-transformer-collate/data-transformer-collate.html

related:
  - title: Data Transformer Data Configurators
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-data-configurators/collate-data-transformer-data-configurators.html
  - title: Data Transformer Filters
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-filters/collate-data-transformer-filters.html
---

This document explains the Data Transformer Collate service in the Components Library.

## Overview

Data Transformer Collate is an Angular Service that implements sorting, filtering, and pagination of data based on configuration.
In general, the meaning of the word `collate` is to collect, arrange and assemble in a specific order of sequence.

```html
<spy-table
    [config]="{
        datasource: {
            type: 'inline',
            data: {
                col1: '2020-09-24T15:20:08+02:00',
                col2: 'col 2',
            },                                                     
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

## Collate Filters

Collate Filters are Angular Services that extend filtering in the Data Transformer.
These services are registered via `CollateDataTransformer.withFilters()`.

There are a few common Data Transformer Collate Filters that are available as separate packages in the UI library:

- [Equals](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-filters/data-transformer-collate-filter-equals.html)—filters values that are strictly equal.
- [Range](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-filters/data-transformer-collate-filter-range.html)—filters values that are within a number range.
- [Text](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-filters/data-transformer-collate-filter-text.html)—filters values that match a string.

## Collate Data Configurators

Data Configurators are Angular Services that enable re-population of data (sorting, pagination, filtering).
These services are registered via `CollateDataTransformer.withConfigurators()`.

There are a few common Data Transformers Collate Data Configurators that are available:

- [Table](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-data-configurators/collate-data-transformer-table-configurator.html)—integrates Table into Collate to re-populate data when the table updates.

## Service registration

Register the service:

```ts
@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            collate: CollateDataTransformerService,
        }),

        // Filters
        CollateDataTransformer.withFilters({
            equals: EqualsDataTransformerFilterService,
            range: RangeDataTransformerFilterService,
            text: TextDataTransformerFilterService,
        }),

        // Configurators
        CollateDataTransformer.withConfigurators({
            table: TableDataTransformerConfiguratorService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Collate:

### DataTransformerConfiguratorConfig

- `configurator`—the object with the Data Transformer configurator type and additional properties.  
- `filter`—the object based on a specific data property (`filterId`) that defines the properties on which the initial data object is filtered via `DataTransformerFilterConfig`.
- `search`—defines the properties on which the initial data object is filtered via `DataTransformerFilterConfig`.  
- `transformerByPropName`—the object with data properties list that needs to be transformed.  

### DataTransformerConfiguratorConfig

`type`—the declared name of the module whose data needs to be transformed.  

### DataTransformerFilterConfig

- `type`—the name of a filter, for example, `range`.  
- `propNames`—the array with the property names to which the filter is applied.

```ts
declare module '@spryker/data-transformer' {
    interface DataTransformerRegistry {
        collate: CollateDataTransformerConfig;
    }
}

export interface CollateDataTransformerConfig extends DataTransformerConfig {
    configurator: DataTransformerConfiguratorConfig;
    filter?: {
        [filterId: string]: DataTransformerFilterConfig;
    };
    search?: DataTransformerFilterConfig;
    transformerByPropName?: DataFilterTransformerByPropName;
}

export interface DataTransformerConfiguratorConfig {
    type: DataTransformerConfiguratorType;

    // Extra configuration for specific types
    [prop: string]: unknown;
}

export interface DataTransformerFilterConfig {
    type: string;
    propNames: string | string[];
}

export type DataFilterTransformerByPropName = Record<string, string>;
```
