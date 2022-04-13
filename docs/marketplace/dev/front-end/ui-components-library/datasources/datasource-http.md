---
title: Datasource Http
description: This document provides details about the Datasource Http service in the Components Library.
template: concept-topic-template
---

This document explains the Datasource Http service in the Components Library.

## Overview

Datasource Http is an Angular Service that fetches data from URLs via HTTP as configured in the Datasource configuration.
Datasource Http supports caching strategy (see [Cache](/docs/marketplace/dev/front-end/ui-components-library/cache/)) that can be configured via config and used before the request is made, when applicable.

Check out an example usage of the Datasource Http.

Service configuration:

- `type` - a datasource type.  
- `url` - a datasource request URL.  
- `method` - a datasource request method (`GET` by default).  

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

Below you can find interfaces for the Datasource Http:

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
