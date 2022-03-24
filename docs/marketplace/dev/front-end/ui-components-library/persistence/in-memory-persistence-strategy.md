---
title: In Memory Persistence Strategy
description: This document provides details about the In Memory Persistence Strategy service in the Components Library.
template: concept-topic-template
---

This document explains the In Memory Persistence Strategy service in the Components Library.

## Overview

In Memory Persistence Strategy is an Angular Service that stores data in memory and will be lost when the browser page is reloaded.

Check out an example usage of the In Memory Persistence Strategy.

Service configuration:

- `storage` - persistence strategy type.  

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
