---
title: Persistence
last_updated: Jun 07, 2021
description: This document provides details about the Persistence service in the Components Library.
template: concept-topic-template
---


This document provides details about the Persistence service in the Components Library.

## Interfaces

Below you can find interfaces for the Persistence service configuration.



```
interface PersistenceStrategyService {
  select(type: PersistenceStrategyType): PersistenceStrategy;
  getAll(): PersistenceStrategy[];
}

interface PersistenceStrategy {
  save(key: string, value: unknown): Observable<void>;
  retrieve<T>(key: string): Observable<T | undefined>;
  remove(key: string): Observable<void>;
}
```

## Overview

The Persistence Service saves arbitrary data based on configuration.
This allows backend systems to use different persistence mechanisms without requiring them to change the frontend (ex. http datasources, etc.).

Anyone may save any data using the Persistence Service. Anyone may use Persistence Strategy Service to select a specific `PersistenceStrategy` based on their configuration.

Persistence is used in other components like Cache, Table State Sync Feature etc.

```
<spy-select
  [datasource]="{
    type: 'http',
    ...,
    cache: {
      ....,
      storage: PersistenceStrategyType,
    },
  }"
></spy-select>
```

## Main service

Persistence Strategy is an Angular Service that implements a specific interface (`PersistenceStrategy`) and is registered to the Persistence Module via `PersistenceModule.withStrategies()`.

The main service injects all registered types from the `PersistenceStrategyTypesToken`.

Select method finds a specific service from the `PersistenceStrategyTypesToken` by type(from the argument) and returns a specific strategy instance (`PersistenceStrategy`).

`GetAll` method returns an array of instances (`PersistenceStrategy[]`) of all registered strategies from `PersistenceStrategyTypesToken`.

## Persistence strategy

Persistence Strategy encapsulates the algorithm of how the data is persisted.

Persistence Strategy must implement a specific interface (`PersistenceStrategy`) and then be registered to the Root Module via `PersistenceModule.withStrategies()`.

e.g.,

```
///// Module augmentation
import { PersistenceStrategy } from '@spryker/persistence';

declare module '@spryker/persistence' {
  interface PersistenceStrategyRegistry {
    'custom': CustomPersistenceService;
  }
}

//// Services implementation
@Injectable({
  providedIn: 'root',
})
export class CustomPersistenceService implements PersistenceStrategy {
  save(key: string, value: unknown): Observable<void> {
    ...,
  };
  retrieve<T>(key: string): Observable<T | undefined> {
    ...,
  };
  remove(key: string): Observable<void> {
    ...,
  };
}

@NgModule({
  imports: [
    PersistenceModule.withStrategies({
      custom: CustomPersistenceService,
    }),
  ],
})
export class RootModule
```

## Persistence strategy types

There are a few common Persistence Strategies that are available in the UI library:

- `InMemoryPersistenceStrategy` - Stores data in memory and will be lost when the browser page is reloaded.
- `LocalStoragePersistenceStrategy` - Uses browser Local Storage to store the data.
- `UrlPersistenceStrategy` - Uses browser URL to store the data.
