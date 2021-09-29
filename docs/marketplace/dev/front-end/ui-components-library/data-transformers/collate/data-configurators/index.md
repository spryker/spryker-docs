---
title: Data Transformer Data Configurators
description: This document provides details about the Data Transformer Data Configurators service in the Components Library.
template: concept-topic-template
---

This document provides details about the Data Transformer Data Configurators service in the Components Library.

## Overview

Data Transformer Data Configurators is an Angular Service that implements re-population of data based on configuration.
This allows backend systems to control where the re-population data.

Data Transformer Data Configurators are used in the Datasource service.

```html
<spy-table
  [config]="{
    datasource: {
      ...                                                   
      transform: {
        type: 'collate',
        configurator: {
          type: 'table',
        },
        ...  
      },
    },
  }"
></spy-table>
```

## Main Service

The main module provides an opportunity to register a configurator by key via static method `withConfigurators`. It assigns the object of configurators to the `DataTransformerConfiguratorTypesToken` under the hood.

The main service injects all registered types from the `DataTransformerConfiguratorTypesToken` and `DataTransformerConfigurator`.

Resolve method finds specific service from the `DataTransformerConfiguratorTypesToken` by `type` (from the argument) and returns observable with data by `DataTransformerConfigurator.resolve`.

## Data Transformer Data Configurator

Data Transformer Data Configurator is basically an Angular Service that encapsulates the algorithm of how the data is configured.

Data Transformer Data Configurator must implement a specific interface (DataTransformerConfigurator) and then be registered to the Root Module via `CollateDataTransformerModule.withConfigurators()`.

```ts
///// Module augmentation
declare module '@spryker/data-transformer.collate' {
    interface DataTransformerConfiguratorRegistry {
        custom: CustomDataTransformerConfiguratorService;
    }
}

//// Services implementation
import { DataTransformerConfiguratorConfigT } from '@spryker/data-transformer.collate';

@Injectable({ providedIn: 'root' })
export class CustomDataTransformerConfiguratorService implements DataTransformerConfigurator {
    resolve(
        config: DataTransformerConfiguratorConfig,
        injector: Injector,
    ): Observable<DataTransformerConfiguratorConfigT> {
        ... 
    }
}

@NgModule({
    imports: [
        CollateDataTransformerModule.withConfigurators({
            custom: CustomDataTransformerConfiguratorService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the DataTransformerConfigurator configuration and DataTransformerConfigurator type:

```ts
interface DataTransformerConfiguratorConfigT {
    filter?: unknown;
    search?: unknown;
    sorting?: {
        sortBy?: string;
        sortDirection?: string;
    };
    page?: number;
    pageSize?: number;
}

interface DataTransformerConfigurator {
    resolve(injector: Injector): Observable<DataTransformerConfiguratorConfigT>;
}
```

## Data Transformer Data Configurator types

There are a few common Data Transformer Data Configurators that are available in UI library as separate packages

- [`table`](/docs/marketplace/dev/front-end/ui-components-library/data-transformers/collate/data-configurators/table.html) - integrates Table into Collate to re-populate data when the table updates.
