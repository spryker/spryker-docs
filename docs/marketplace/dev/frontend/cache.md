---
title: { Cache }
description: { Meta description }
template: concept-topic-template
---

# Cache

This document provides details about the Cache service in the Component Library.

// TODO add link
Connected doc `Persistance`

## Overview

Cache Service is responsible to cache arbitrary operation based on given configuration.
This allows backend systems to use caching without the need to change frontend at all (ex. http datasource, etc.)

Cache Service uses Cache Strategy to define caching algorithm (static, cache first, freshness first, etc)

```ts
<spy-select
  [datasource]="{
    type: 'http',
    ...,
    cache: {
      type: 'static',
      namespace: 'namespace' // Optional
      storage: PersistenceStrategyType, // Optional
      // ... Additional Options
    },
  }"
></spy-select>
```

### Cache Storage Factory Service

### Interfaces

```ts
interface CacheStorageFactoryService {
  create(config: CacheStrategyConfig): CacheStorage {}
  createAll(): CacheStorage[] {}
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

### Overview

The factory encapsulates the creation of the `CacheStorage` instance types for a specific configurations.

To reuse `PersistenceStrategy` as a Cache Storage the storage is created via Factory for a specific configuration instance.
This storage is not created every time but cached for the same configurations when called multiple times.

The factory injects `PersistenceStrategyService`.

`create` method gets registered persistence strategy from `PersistenceStrategyService.select` by `config.type` from argument and returns adapted `CacheStorage`.

`createAll` method gets all registered persistence strategies from `PersistenceStrategyService.getAll` and returns an array of adapted `CacheStorage`'s

## Main Service

### Interface

```ts
interface CacheService {
  getCached<T>(
    id: CacheId,
    config: CacheStrategyConfig,
    operation: CacheOperation<T>,
  ): Observable<T> {}

  clearCache(namespace?: string): Observable<void> {}
}
```

### Overview

Cache Service provides general capabilities to interact with different caching strategies.

Cache Strategy is an Angular Service that must implement specific interface `(CacheStrategy) `and then registered to the Cache Module via `CacheModule.withStrategies()`

The main service injects all registered types from the `CacheStrategyTypesToken` and `CacheStorageFactoryService`

`getCached` method finds a specific strategy from the `CacheStrategyTypesToken` by type (from the `config.type` argument) and returns a specific strategy observable from the instance with arguments passed thorough method (`CacheStrategy.getCached()`).

`clearCache` method returns an array of instances (PersistenceStrategy[]) of all registered strategies from PersistenceStrategyTypesToken.

## Cache Strategy

### Interfaces

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

### Overview

Cache Strategy encapsulates the algorithm of how the data is cached.

The `namespace` (optional) option can be used to segregate between different cache entries in Cache Storage and allow for selective cache purging.

Cache Strategy must implement a specific interface (`CacheStrategy`) and then be registered to the Root Module via `CacheModule.withStrategies()`.

e.g.

```ts
///// Module augmentation
import { CacheStrategyConfig, CacheStrategy } from '@spryker/cache';

declare module '@spryker/cache' {
  interface CacheStrategyRegistry {
    custom: CustomCacheStrategyConfig;
  }
}

interface CustomCacheStrategyConfig extends CacheStrategyConfig {
  customOption: 'customOption';
}

//// Services implementation
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
export class RootModule
```

## Cache Strategy Types

There are a few common Cache Strategies that are available in UI library as separate packages

- static - adds to the cache values immediately until the expiration date and always retrieves it from cache if hit.
