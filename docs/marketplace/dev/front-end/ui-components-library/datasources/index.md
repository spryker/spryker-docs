---
title: Datasources
last_updated: Jun 07, 2021
description: This document provides details about the Datasources service in the Components Library.
template: concept-topic-template
---

This document explains the Datasources service in the Components Library.

## Overview

Datasources are responsible for providing any data to the system based on a given configuration.
This allows backend systems to control where the data is coming from without changing the front-end (ex. table data, select options).

Datasources are used in other components like Table, Select, Autocomplete.

```html
<spy-select
    [datasource]="{
        type: 'inline',
        data: ['Inline 1', 'Inline 2'],
    }"
>
</spy-select>
```

## Main Service

The main module provides an opportunity to register any datasource by key via static method `withDatasources()`. It assigns the object of datasources to the `DatasourceTypesToken` under the hood.

The main service injects all registered types from the `DatasourceTypesToken` and `DataTransformerService` (see [Data Transformers](/docs/marketplace/dev/front-end/ui-components-library/data-transformers/)).

`resolve()` method finds specific service from the `DatasourceTypesToken` by `config.type` (from the argument) and returns observable with data by `Datasource.resolve()`. Data is also transformed by `DataTransformerService` if `config.transform` exists.

## Datasource

Datasource is basically an Angular Service that encapsulates the algorithm of how the data is loaded into the Component.

Datasource must implement a specific interface (Datasource) and then be registered to the Root Module via `DatasourceModule.withDatasources()`.

```ts
// Module augmentation
import { DatasourceConfig } from '@spryker/datasource';

declare module '@spryker/datasource' {
    interface DatasourceRegistry {
        'custom': CustomDatasourceService;
    }
}

export interface CustomDatasourceConfig extends DatasourceConfig {
    data: unknown;
    ...
}

// Service implementation
@Injectable({
    providedIn: 'root',
})
export class CustomDatasourceService implements Datasource {
    resolve(
        injector: Injector,
        config: CustomDatasourceConfig,
        context?: unknown,
    ): Observable<unknown> {
        ...
    }
}

@NgModule({
    imports: [
        DatasourceModule.withDatasources({
            custom: CustomDatasourceService,
        }),
    ],
})
export class RootModule {}
```

The context within which Datasources operate is defined by the local injector where it’s being used.

## Interfaces

Below you can find interfaces for the Datasource configuration and Datasource type:

```ts
export interface DatasourceConfig {
    type: DatasourceType;
    transform?: DataTransformerConfig;

    // Specific Datasource types may have custom props
    [k: string]: unknown;
}

export interface Datasource<D = unknown, C = unknown> {
    resolve(
        injector: Injector,
        config: DatasourceConfig,
        context?: C,
    ): Observable<D>;
}
```

## Datasource types

There are a few common Datasources that are available in UI library as separate packages:

- [HTTP](/docs/marketplace/dev/front-end/ui-components-library/datasources/datasource-http.html) - allows fetching data from URL via HTTP configured in the configuration of the Datasource.
  HTTP Datasource supports caching strategy (see [Cache](/docs/marketplace/dev/front-end/ui-components-library/cache/)) that may be configured via config and used before the request is made when applicable.
- [Inline](/docs/marketplace/dev/front-end/ui-components-library/datasources/datasource-inline.html) - allows passing data along with the configuration of the Datasource.
- [Inline.table](/docs/marketplace/dev/front-end/ui-components-library/datasources/datasource-inline-table.html) - allows passing transformed for the table format data along with the configuration of the Datasource
