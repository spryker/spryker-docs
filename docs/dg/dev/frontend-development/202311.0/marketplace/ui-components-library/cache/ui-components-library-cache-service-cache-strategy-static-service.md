---
title: "UI components library: Cache Strategy Static service"
description: This document provides details about the Cache Strategy Static service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/cache/static.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/cache/static.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/cache/ui-components-library-cache-service-cache-strategy-static-service.html

related:
  - title: Cache
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/cache/ui-components-library-cache-service.html
---

This document explains the Cache Strategy Static service in the Components Library.

## Overview

Cache Strategy Static is an Angular Service that adds values to the cache immediately until the expiration date and retrieves them if requested from the cache.

Check out an example usage of the Cache Strategy Static.

Service configuration:

- `type`—a cache type.  
- `expiresIn`—represents a duration as a string. Each component is separated by a space.  

```html
<spy-select
    [datasource]="{
        type: 'http',
        ...,
        cache: {
            type: 'static',
            expiresIn: '1m 10d 3h',
        },
    }"
>
</spy-select>
```

## Service registration

Register the service:

```ts
declare module '@spryker/cache' {
    interface CacheStrategyRegistry {
        static: StaticCacheStrategyConfig;
    }
}

@NgModule({
    imports: [
        CacheModule.withStrategies({
            static: StaticCacheStrategy,
        }),
        StaticCacheStrategyModule,
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Cache Strategy Static:

```ts
/**
 * Represents a duration as a string where components are separated by a space
 *
 * Components:
 *  - 1-999y—Years
 *  - 1-12m—Months
 *  - 1-365d—Days
 *  - 1-23h—Hours
 *  - 1-59min—Minutes
 *  - 1-59s—Seconds
 *  - 1-59ms—Milliseconds
 *
 * Examples:
 *  - 2h 30min
 *  - 1d 14h
 *  - 2y
 */
export interface StaticCacheStrategyConfig extends CacheStrategyConfig {
    expiresIn: TimeDurationString;
}

export interface CacheStrategyConfig {
    type: CacheStrategyType;
    namespace?: string;
    storage?: PersistenceStrategyType;

    // Reserved for types that may have extra configuration
    [extraConfig: string]: unknown;
}

export type TimeDurationString = string;
```
