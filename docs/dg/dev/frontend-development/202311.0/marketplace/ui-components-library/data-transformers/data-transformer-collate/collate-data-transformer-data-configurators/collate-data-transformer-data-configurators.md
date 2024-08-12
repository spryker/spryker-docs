---
title: "Collate data transformer: Data configurators"
description: This document provides details about the Data Transformer Data Configurators service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/data-transformers/collate/data-configurators/
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/data-transformers/collate/data-configurators/index.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-data-configurators/collate-data-transformer-data-configurators.html

related:
  - title: Data Transformer Collate Configurator Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-data-configurators/collate-data-transformer-table-configurator.html
---

This document explains the Data Transformer Data Configurators service in the Components Library.

## Overview

Data Transformer Data Configurators is an Angular Service that re-populates data based on configuration. This lets backend systems control where re-population data is placed.

Data Transformer Data Configurators are used in the Datasource service.

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

## Main service

The main module provides a way to register a configurator by key using the static method `withConfigurators()`. Under the hood, it assigns the object of configurators to the `DataTransformerConfiguratorTypesToken`.

The main service injects all registered types from the `DataTransformerConfiguratorTypesToken` and `DataTransformerConfigurator`.

`resolve()` method finds a specific service from the `DataTransformerConfiguratorTypesToken` by `type` (from the argument) and returns an observable with data by calling `DataTransformerConfigurator.resolve()`.

## Data Transformer Data Configurator

Data Transformer Data Configurator is an Angular Service that encapsulates how the data is configured.

Data Transformer Data Configurator must implement a specific interface (DataTransformerConfigurator) and then be registered to the Root Module using `CollateDataTransformerModule.withConfigurators()`.

```ts
// Module augmentation
declare module '@spryker/data-transformer' {
    interface DataTransformerRegistry {
        collate: CollateDataTransformerConfig;
    }
}

declare module '@spryker/data-transformer.collate' {
    interface DataTransformerConfiguratorRegistry {
        custom: CustomDataTransformerConfiguratorService;
    }
}

// Service implementation
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

Below you can find interfaces for the `DataTransformerConfigurator` configuration and `DataTransformerConfigurator` type:

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

There are a few common Data Transformer Data Configurators that are available in UI library as separate packages:

- [Table](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-data-configurators/collate-data-transformer-table-configurator.html)—integrates Table into Collate to re-populate data when the table updates.
