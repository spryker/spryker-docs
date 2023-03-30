---
title: Application Feature
description: Feature of the Oryx Application
template: concept-topic-template
---

# Application feature

`AppFeature` is a higher level collection of lower level primitives such as:

- [Components](TODO: Link to components)
- [Providers](TODO: Link to providers)
- [Plugins](./app-plugins.md)
- [Resources](./resources.md)
- [Feature options](#feature-options)
- [Builder options](./app-builder.md#options)

Features are useful to structure and organise code and functionality into
logical groups and to make them easier to reuse in different scenarios.

Every Oryx package exposes such features for your application to be easily integrated.

To register `AppFeature` with Oryx application use `AppBuilder.withFeature()` API:

```ts
import { appBuilder, AppFeature } from '@spryker-oryx/core';

const myFeature: AppFeature = {...};

const app = appBuilder().withFeature(myFeature);
```

`AppFeature` is represented as an interface and you may create them
as simple object literals or as classes/functions when you want them
to be configurable and more flexible:

```ts
import { AppFeature } from '@spryker-oryx/core';

const mySimpleFeature: AppFeature = {
  components: [...],
  providers: [...],
}

// or

class MyConfigurableFeature implements AppFeature {
  components;
  providers;

  constructor(config: MyConfigurableFeatureConfig) {
    // Use `config` to customize your feature here
    this.components = [...];
    this.providers = [...];
  }
}
```

You may also extend existing features but it will depend how the feature is defined.

For features defined as object literals you may use spread operators
to customize some parts of it:

```ts
const myExtendedFeature = {
  ...mySimpleFeature,
  components: [
    ...mySimpleFeature.components,
    ...[
      /* Custom components here */
    ],
  ],
};
```

For features defined as classes/function you would have to also use class or function
to be able to accept configuration and pass it to the original feature:

```ts
class MyExtendedFeature extends MyConfigurableFeature {
  constructor(config: MyConfigurableFeatureConfig) {
    super(config);
    this.components = [
      ...this.components,
      ...[
        /* Custom components here */
      ],
    ];
  }
}
```

## Feature options

If your feature requires some options from the consumer you may define it's type
on the special global interface `FeatureOptions` with the key that you will later use to get the options:

```ts
declare global {
  interface FeatureOptions {
    'your-feature-key'?: YourFeatureOptions;
  }
}

interface YourFeatureOptions {}
```

Once you have defined the type of your options you now can use them in your code
by using `FeatureOptionsService.getFeatureOptions()` API:

```ts
import { FeatureOptionsService } from '@spryker-oryx/core';

class MyService {
  constructor(private featureOptionsService = inject(FeatureOptionsService)) {
    const options = FeatureOptionsService.getFeatureOptions('your-feature-key');
    // Use your options here
  }
}
```

This will allow consumers of your feature to pass the options via `AppBuilder.withOptions()`
and it's going to be fully typed and typesafe:

```ts
import { appBuilder } from '@spryker-oryx/core';

appBuilder().withOptions({'your-feature-key': {...}});
```

### Default options

It is sometimes usefull to provide default values for your feature options
to not force your users to always pass the same kind of values.
For that you may define `AppFeature.defaultOptions` on your feature which
will be used by default if the user did not provide any options for your feature:

```ts
import { AppFeature } from '@spryker-oryx/core';

const yourFeature: AppFeature = {
  defaultOptions: {...} // <-- Put your default options here
}
```
