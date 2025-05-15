---
title: "UI components library: Cache service"
description: This document provides details about the Cache service in the Component Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/cache/
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/cache/cache.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/cache/ui-components-library-cache-service.html

related:
  - title: Cache Strategy Static
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/cache/ui-components-library-cache-service-cache-strategy-static-service.html
---

This document explains the Cache service in the Component Library.

## Overview

Cache Service is responsible for caching arbitrary operations based on the configuration.
This lets backend systems use caching without changing the front-end at all (ex. http datasource).

Cache Service uses Cache Strategy to define caching algorithm (static, cache first, freshness first).

<!-- vale on -->
```html
<spy-select
    [datasource]="{
        type: 'http',
        ...,
        cache: {
            type: 'static',
            namespace: 'namespace' // Optional
            storage: PersistenceStrategyType, // Optional
            // Additional Options...
        },
    }"
>
</spy-select>
```
<!-- vale on -->


## Cache Storage Factory Service

The factory creates the `CacheStorage` instance types for a specific configuration.

As an example, to use `PersistenceStrategy` as a Cache Storage, factory-created storage is used.
This storage is not created every time, but cached for the same configurations when called repeatedly.

The factory injects `PersistenceStrategyService`.

`create()` method gets the registered persistence strategy from `PersistenceStrategyService.select()` by `config.type` from an argument and returns an adapted `CacheStorage`.

`createAll()` method gets all the registered persistence strategies from `PersistenceStrategyService.getAll()` and returns an array of adapted `CacheStorage` instance types.

### Interfaces

Below you can find interfaces for Cache Storage Factory Service:

```ts
interface CacheStorageFactoryService {
    create(config: CacheStrategyConfig): CacheStorage {};
    createAll(): CacheStorage[] {};
}

interface CacheStorage {
    has(id: CacheId, namespace?: string): Observable<boolean>;
    get<T>(
        id: CacheId,
        namespace?: string,
    ): Observable<CacheEntry<T> | undefined>;
    set(id: CacheId, data: CacheEntry, namespace?: string): Observable<void>;
    remove(id: CacheId, namespace?: string): Observable<void>;
    clear(namespace?: string): Observable<void>;
}
```

## Main Service

The Cache Service provides general capabilities for interacting with different caching strategies.

A Cache Strategy is an Angular Service that implements a specific interface (`CacheStrategy`) and then registers with the Cache Module via `CacheModule.withStrategies()`.

The main service injects all registered types from the `CacheStrategyTypesToken` and `CacheStorageFactoryService`.

`getCached()` method finds a specific strategy from the `CacheStrategyTypesToken` by type (from the `config.type` argument) and returns that strategy as observable with arguments passed thorough method (`CacheStrategy.getCached()`).

`clearCache()` method returns an array of instances (PersistenceStrategy[]) of all the registered strategies from `PersistenceStrategyTypesToken`.

### Interfaces

Below you can find interfaces for the Cache Service:

```ts
interface CacheService {
    getCached<T>(
        id: CacheId,
        config: CacheStrategyConfig,
        operation: CacheOperation<T>,
    ): Observable<T> {};

    clearCache(namespace?: string): Observable<void> {};
}
```

## Cache Strategy

The Cache Strategy is the algorithm for caching data.

Using the `namespace` (optional) option, you can separate different cache entries in Cache Storage and selectively purge them.

The Cache Strategy implements a specific interface (`CacheStrategy`) and is registered to the Root Module via `CacheModule.withStrategies()`.

```ts
// Module augmentation
import { CacheStrategyConfig, CacheStrategy } from '@spryker/cache';

declare module '@spryker/cache' {
    interface CacheStrategyRegistry {
        custom: CustomCacheStrategyConfig;
    }
}

interface CustomCacheStrategyConfig extends CacheStrategyConfig {
    customOption: 'customOption';
}

// Service implementation
@Injectable({
    providedIn: 'root',
})
export class CustomCacheService implements CacheStrategy {
    getCached<T>(
        id: CacheId,
        config: CustomCacheStrategyConfig,
        operation: CacheOperation<T>,
    ): Observable<T> {
        ...
    }
}

@NgModule({
    imports: [
        CacheModule.withStrategies({
            custom: CustomCacheService,
        }),
    ],
})
export class RootModule {}
```

### Interfaces

Below you can find interfaces for the Cache Strategy:

```ts
interface CacheId {
    serialize(): string;
}

interface CacheStrategy {
    getCached<T>(
        id: CacheId,
        config: CacheStrategyConfig,
        operation: CacheOperation<T>,
    ): Observable<T>;
}

interface CacheStrategyConfig {
    type: CacheStrategyType;
    namespace?: string;
    storage?: PersistenceStrategyType;

    // Reserved for types that may have extra configuration
    [extraConfig: string]: unknown;
}
```

## Cache Strategy types

There are a few common Cache Strategies that are available in UI library as separate packages:

- [Static](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/cache/ui-components-library-cache-service-cache-strategy-static-service.html)—adds values immediately to the
cache until the expiration date and always retrieves them from cache if requested.

## Related articles

[Persistence](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/persistence/persistence.html)
