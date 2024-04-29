---
title: In Memory Persistence Strategy
description: This document provides details about the In Memory Persistence Strategy service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/persistence/in-memory-persistence-strategy.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/persistence/in-memory-persistence-strategy.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/persistence/in-memory-persistence-strategy.html

related:
  - title: Persistence
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/persistence.html
  - title: Local Storage Persistence Strategy
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/local-storage-persistence-strategy.html
  - title: Url Persistence Strategy
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/url-persistence-strategy.html
---

This document explains the In Memory Persistence Strategy service in the Components Library.

## Overview

In Memory Persistence Strategy is an Angular Service that stores data in memory and will be lost when the browser page is reloaded.

Check out an example usage of the In Memory Persistence Strategy.

Service configuration:

- `storage`—persistence strategy type.  

```html
<spy-select
    [datasource]="{
        type: 'http',
        ...,
        cache: {
            ...,
            storage: 'in-memory',
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
        'in-memory': InMemoryPersistenceStrategy;
    }
}

@NgModule({
    imports: [
        PersistenceModule.withStrategies({
            'in-memory': InMemoryPersistenceStrategy,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the In Memory Persistence Strategy:

```ts
interface InMemoryPersistenceStrategy extends PersistenceStrategy {
    save(key: string, value: unknown): Observable<void>;
    retrieve<T>(key: string): Observable<T | undefined>;
    remove(key: string): Observable<void>;
}
```
