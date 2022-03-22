---
title: Local Storage Persistence Strategy
description: This document provides details about the Local Storage Persistence Strategy service in the Components Library.
template: concept-topic-template
---

This document explains the Local Storage Persistence Strategy service in the Components Library.

## Overview

Local Storage Persistence Strategy is an Angular Service that uses browser Local Storage to store the data.

Check out an example usage of the Local Storage Persistence Strategy.

Service configuration:

- `storage` - persistence strategy type.  

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
