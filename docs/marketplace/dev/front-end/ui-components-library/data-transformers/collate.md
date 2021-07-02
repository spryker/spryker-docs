---
title: Data Transformer Collate
description: This document provides details about the Data Transformer Collate service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Collate service in the Components Library.

## Overview

Data Transformer Collate is an Angular Service that implements sorting, filtering, and pagination of data based on configuration.
The meaning of the word `collate` is to collect, arrange and assemble in a specific order of sequence.

```ts
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
></spy-table>
```

## Interfaces
##### DataTransformerConfiguratorConfig
`configurator` - the object with Data Transformer configurator type and specific extra properties.  
`filter` - the object based on the specific data property (`filterId`) that defines on which properties initial data object will be filtered via `DataTransformerFilterConfig`.  
`search` - defines on which properties initial data object will be filtered via `DataTransformerFilterConfig`.  
`transformerByPropName` - the object with data properties list that needs to be transformed.  

##### DataTransformerConfiguratorConfig
`type` - the declared name of module whose data needs to be transformed.  

##### DataTransformerFilterConfig
`type` - the name of filter, e.g. `range`.  
`propNames` - the array with property names that filter will be applied to in the data.

```ts
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
  [prop: string]: unknown; // Extra configuration for specific types
}

export interface DataTransformerFilterConfig {
  type: string;
  propNames: string | string[];
}

export type DataFilterTransformerByPropName = Record<string, string>;

// Service registration
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

## Collate Filters

Collate Filters are Angular Services that extend the filtering in Data Transformer.
This services are registered via `CollateDataTransformer.withFilters()`.
There are a few common Data Transformers Collate Filters that are available in the UI library as separate packages:

  - `equals` - Filters values that are strictly equal.
  - `range` - Filters values that are within a number range.
  - `text` - Filters values that match a string.

## Collate Data Configurators

Data Configurators are Angular Services that allow configuring repopulation of data (sorting, pagination, filtering).
This services are registered via `CollateDataTransformer.withConfigurators()`.
There are a few common Data Transformers Collate Data Configurators that are available:

  - `table` - Integrates Table into Collate to re-populate the data when table updates.
