---
title: Application Resources
description: Resources of the Oryx Application
template: concept-topic-template
---

# Application resources

`Resources` represent a generic way of lazy loading graphics into Oryx application at runtime. It is usually used to load things like images, icons, fonts, etc.

Declare your resources using a variable which should resolve to a string:

```ts
import { Resources } from '@spryker-oryx/core';

const myResources: Resources = {
  graphics: {
    logo: { source: () => import('./my-logo').then((m) => m.default) },
    'other-img': {
      source: () => import('./my-other-img').then((m) => m.default),
    },
  },
};
```

Then register `Resources` with Oryx application use `withResources` API:

```ts
import { appBuilder } from '@spryker-oryx/core';

const app = appBuilder().withResources(myResources);
```

Resources can be also added to a [`AppFeature`](./app-feature.md) so it's reusable together:

```ts
import { AppFeature } from '@spryker-oryx/core';

const myFeaure: AppFeature = {
  resources: myResources,
};
```
