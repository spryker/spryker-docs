---
title: Local Storage Persistence Strategy
description: This document provides details about the Local Storage Persistence Strategy service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/persistence/local-storage-persistence-strategy.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/persistence/local-storage-persistence-strategy.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/persistence/local-storage-persistence-strategy.html

related:
  - title: Persistence
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/persistence/persistence.html
  - title: In Memory Persistence Strategy
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/persistence/in-memory-persistence-strategy.html
  - title: Url Persistence Strategy
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/persistence/url-persistence-strategy.html
---

This document explains the Local Storage Persistence Strategy service in the Components Library.

## Overview

Local Storage Persistence Strategy is an Angular Service that uses browser Local Storage to store the data.

Check out an example usage of the Local Storage Persistence Strategy.

Service configuration:

- `storage`—persistence strategy type.  

```html
<spy-select
    [datasource]="{
        type: 'http',
        ...,
        cache: {
            ...,
            storage: 'local-storage',
        },
    }"
>
</spy-select>
```

## Service registration

Register the service:

```ts
declare module '@spryker/persistence' {
    interface PersistenceStrategyRegistry {
        'local-storage': LocalStoragePersistenceStrategy;
    }
}

@NgModule({
    imports: [
        PersistenceModule.withStrategies({
            'local-storage': LocalStoragePersistenceStrategy,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Local Storage Persistence Strategy:

```ts
interface LocalStoragePersistenceStrategy extends PersistenceStrategy {
    save(key: string, value: unknown): Observable<void>;
    retrieve<T>(key: string): Observable<T | undefined>;
    remove(key: string): Observable<void>;
}
```
