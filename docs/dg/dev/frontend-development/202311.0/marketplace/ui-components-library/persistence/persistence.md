---
title: Persistence
last_updated: Jun 07, 2021
description: This document provides details about the Persistence service in the Components Library.
template: concept-topic-template
related:
  - title: In Memory Persistence Strategy
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/in-memory-persistence-strategy.html
  - title: Local Storage Persistence Strategy
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/local-storage-persistence-strategy.html
  - title: Url Persistence Strategy
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/url-persistence-strategy.html
redirect_from:
- /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/persistence/persistence.html
- /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/persistence/persistence.html

---

This document explains the Persistence service in the Components Library.

## Overview

The Persistence Service saves arbitrary data based on the configuration. This lets backend systems use different persistence mechanisms without requiring them to change the frontend (ex. http datasources).

Anyone may save any data using the Persistence Service. Anyone may use Persistence Strategy Service to select a specific `PersistenceStrategy` based on their configuration.

Persistence is used in other components like Cache, Table State Sync Feature etc.

```html
<spy-select
    [datasource]="{
        type: 'http',
        ...,
        cache: {
            ....,
            storage: PersistenceStrategyType,
        },
    }"
>
</spy-select>
```

## Main service

Persistence Strategy is an Angular Service that implements a specific interface (`PersistenceStrategy`) and is registered to the Persistence Module via `PersistenceModule.withStrategies()`.

The main service injects all registered types from the `PersistenceStrategyTypesToken`.

`select()` method finds a specific service from the `PersistenceStrategyTypesToken` by type(from the argument) and returns a specific strategy instance (`PersistenceStrategy`).

`getAll()` method returns an array of instances (`PersistenceStrategy[]`) of all registered strategies from `PersistenceStrategyTypesToken`.

## Persistence strategy

Persistence Strategy encapsulates the algorithm of how the data is persisted.

Persistence Strategy must implement a specific interface (`PersistenceStrategy`) and then be registered to the Root Module via `PersistenceModule.withStrategies()`.

```ts
// Module augmentation
import { PersistenceStrategy } from '@spryker/persistence';

declare module '@spryker/persistence' {
    interface PersistenceStrategyRegistry {
        'custom': CustomPersistenceService;
    }
}

// Service implementation
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
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Persistence service:

```ts
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

## Persistence strategy types

There are a few common Persistence Strategies that are available in the UI library:

- [In-memory](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/persistence/in-memory-persistence-strategy.html)—
 stores data in memory and will be lost when the browser page is reloaded.
- [Local-storage](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/persistence/local-storage-persistence-strategy.html)—uses browser Local Storage to store the data.
- [Url](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/persistence/url-persistence-strategy.html)—uses browser URL to store the data.
