---
title: Cache Strategy Static
description: This article provides details about the Cache Strategy Static service in the Components Library.
template: concept-topic-template
---

This article provides details about the Cache Strategy Static service in the Components Library.

## Overview

Cache Strategy Static is an Angular Service that adds values immediately to the 
cache until the expiration date and always retrieves them from cache if requested.
See an example below, how to use the Cache Strategy Static service.

`type` - a cache type.  
`expiresIn` - represents a duration as string where components are separated by a space.  

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
></spy-select>
```

## Interfaces

Below you can find interfaces for the Cache Strategy Static.

```ts
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

// Service registration
@NgModule({
  imports: [
    CacheModule.withStrategies({
      static: StaticCacheStrategy,
    }),
  ],
})
export class RootModule {}
```
