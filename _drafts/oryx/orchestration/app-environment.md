---
title: Application Environment
description: Environment of the Oryx Application
template: concept-topic-template
---

# Application environment

`AppEnvironment` represents environment variables that are used within Oryx application. It's a typesafe global object which may be extended anywhere where environment variable may be needed for a feature to work properly.

To pass actual environment object use `AppBuilder.withEnvironment()` API and use your build specific
way of accessing environment variables:

```ts
import { appBuilder } from '@spryker-oryx/core';

appBuilder().withEnvironment(import.meta.env); // or process.env in NodeJS style apps
```

**Security Note**: When you are using all environment variables directly such as `import.meta.env` they will endup in your application bundle which may leak confidential information to public if your application is deployed to a public internet, so make sure you are filtering your environment variables in the build step (for ex. using `envPrefix` in vite build config).

To declare a new environment variable use global interface `AppEnvironment` with your custom environment variable name and type:

```ts
declare global {
  interface AppEnvironment {
    readonly MY_VAR?: string;
  }
}
```

Make sure to mark it as optional as there are no guarantees by the Oryx framework that any environment variable will be present in the runtime. Also you should in most cases use `string` as a type for your environment variable as most of the enviromnents are exposed as strings and Oryx framework will not perform any typechecks or type conversions for you.

Whenever you need to access environment variable use `injectEnv` API:

```ts
import { injectEnv } from '@spryker-oryx/core';

class MyService {
  constructor(myVar = injectEnv('MY_VAR', 'optional-fallback')) {}
}
```
