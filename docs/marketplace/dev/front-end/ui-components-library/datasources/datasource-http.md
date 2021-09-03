---
title: Datasource Http
description: This article provides details about the Datasource Http service in the Components Library.
template: concept-topic-template
---

This article provides details about the Datasource Http service in the Components Library.

## Overview

Datasource Http is an Angular Service that allows fetching data from URL via HTTP configured in the configuration of the Datasource. 
Datasource Http supports caching strategy (see [Cache](/docs/marketplace/dev/front-end/ui-components-library/cache.html)) 
that may be configured via config and used before the request is made when applicable.
See an example below, how to use the Datasource Http service.

`type` - a datasource type.  
`url` - a datasource request URL.  
`method` - a datasource request method (`GET` by default).  

```html
<spy-select
  [datasource]="{
    type: 'http',
    url: '/html-request',
    method: 'POST',
  }"
></spy-select>
```

## Interfaces

Below you can find interfaces for Datasource Http.

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

// Component registration
@NgModule({
  imports: [
    DatasourceModule.withDatasources({
      http: DatasourceHttpService,
    }),
  ],
})
export class RootModule {}
```
