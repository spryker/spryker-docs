---
title: Url Persistence Strategy
description: This document provides details about the Url Persistence Strategy service in the Components Library.
template: concept-topic-template
---

This document explains the Url Persistence Strategy service in the Components Library.

## Overview

Url Persistence Strategy is an Angular Service that uses browser URL to store the data.

Check out an example usage of the Url Persistence Strategy.

Service configuration:

- `storage` - persistence strategy type.  

```html
<spy-select
    [datasource]="{
        type: 'http',
        ...,
        cache: {
            ...,
            storage: 'url',
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
        'url': UrlPersistenceStrategy;
    }
}

@NgModule({
    imports: [
        PersistenceModule.withStrategies({
            'url': UrlPersistenceStrategy,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Url Persistence Strategy:

```ts
interface UrlPersistenceStrategy extends PersistenceStrategy {
    save(key: string, value: unknown): Observable<void>;
    retrieve<T>(key: string): Observable<T | undefined>;
    remove(key: string): Observable<void>;
}
```
