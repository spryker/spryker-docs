---
title: URL persistence strategy
description: This document provides details about the Url Persistence Strategy service in the Components Library.
template: concept-topic-template
last_updated: Aug 2, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/persistence/url-persistence-strategy.html
  - /docs/scos/dev/front-end-development/202307.0/marketplace/ui-components-library/persistence/url-persistence-strategy.html

related:
  - title: Persistence
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/persistence.html
  - title: In Memory Persistence Strategy
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/in-memory-persistence-strategy.html
  - title: Local Storage Persistence Strategy
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/local-storage-persistence-strategy.html
---

This document explains the Url Persistence Strategy service in the Components Library.

## Overview

Url Persistence Strategy is an Angular Service that uses browser URL to store the data.

Check out an example usage of the Url Persistence Strategy.

Service configuration:

- `storage`—persistence strategy type.  

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
