---
title: Datasource Http
description: This document provides details about the Datasource Http service in the Components Library.
template: concept-topic-template
last_updated: Jan 12, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/datasources/datasource-http.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/datasources/datasource-http.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/datasources/datasource-http.html

related:
  - title: Datasources
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasources.html
  - title: Datasource Inline Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-inline-table.html
  - title: Datasource Inline
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-inline.html
---


Datasource Http is an Angular service in the components library that fetches data from URLs via HTTP as configured in the Datasource configuration.
Datasource Http supports the [caching strategy](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/cache/ui-components-library-cache-service.html) that can be configured via config and used before the request is made.

## Usage

Check out an example usage of the Datasource Http.

Service configuration:

| ATTRIBUTE | DESCRIPTION |
| - | - |
|`type` | A datasource type.  |
|`url` | A datasource request URL.  |
|`method` | A datasource request method; `GET` by default.  |

Usage example:

```html
<spy-select
    [datasource]="{
        type: 'http',
        url: '/html-request',
        method: 'POST',
    }"
>
</spy-select>
```

## Service registration

Register the service:

```ts
declare module '@spryker/datasource' {
    interface DatasourceRegistry {
        http: DatasourceHttpService;
    }
}

@NgModule({
    imports: [
        DatasourceModule.withDatasources({
            http: DatasourceHttpService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Datasource Http interfaces:

```ts
export interface DatasourceHttpConfig extends DatasourceConfig {
    url: string;
    method?: string;
    dataIn?: DatasourceHttpConfigDataIn;
    cache?: CacheStrategyConfig;
}

export enum DatasourceHttpConfigDataIn {
    Params = 'params',
    Body = 'body',
}
```
