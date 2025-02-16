---
title: Datasources
last_updated: Jun 07, 2021
description: This document provides details about the Datasources service in the Components Library.
template: concept-topic-template
related:
  - title: Datasource Http
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html
  - title: Datasource Inline Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-inline-table.html
  - title: Datasource Inline
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-inline.html
redirect_from:
- /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/datasources/datasources.html
- /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/datasources/datasources.html

---

Datasources are responsible for providing data to the system based on a given configuration. This lets backend systems control where data is coming from without changing the frontend. For example, table data or select options.

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

## Main service

The main module lets you register a datasource by key using the `withDatasources()` static method. It assigns the object of datasources to`DatasourceTypesToken` under the hood.

The main service injects all registered types from `DatasourceTypesToken` and `DataTransformerService`. For more details, see [Data Transformers](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/data-transformers/data-transformers.html).

The `resolve()` method locates a specific service from `DatasourceTypesToken` based on the argument from `config.type` and returns an observable with data by `Datasource.resolve()`. If `config.transform` exists, data is also transformed by `DataTransformerService`.

## Datasource

Datasource is an Angular service that encapsulates the algorithm of how the data is loaded into a component.

Datasource must implement a specific Datasource interface and be registered to the Root Module via `DatasourceModule.withDatasources()`.

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

The context within which Datasources operate is defined by the local injector where it's being used.

## Interfaces

Interfaces for the Datasource configuration and Datasource type:

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

## Available Datasources

The following common Datasources are available in the UI components library as separate packages:

| DATASOURCE | DESCRIPTION |
| - | - |
| [HTTP](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-http.html) | Allows fetching data from a URL configured in the configuration of the Datasource via HTTP. HTTP Datasource supports the [caching strategy](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/cache/ui-components-library-cache-service.html) that can be configured via config and used before the request is made. |
| [Inline](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-inline.html)—allows passing data along with the configuration of the Datasource. |
| [Inline.table](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-inline-table.html)—allows passing transformed for the table format data along with the configuration of the Datasource. |
