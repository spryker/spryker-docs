---
title: Routing
description:
template: concept-topic-template
last_updated: Apr 4, 2023
---

Routing lets users navigate between different pages and components within an application. This document describes how to set up routing: add `RouterFeature`, render router outlets, and provide routes using Dependency Injection (DI)<!-- add a link -->.

`@spryker-oryx/router` provides the infrastructure for routing capabilities. Its main component is `RouterService` that provides access to the router, which is a generic way for navigating the application.

There are also framework-specific integrations for providing an actual routing configuration: for Lit, use the `@spryker-oryx/router/lit` package.

## Get started with routing

To start using the router, add `RouterFeature` to your Oryx application:

```ts
import { appBuilder } from '@spryker-oryx/core';
import { RouterFeature } from '@spryker-oryx/router';

appBuilder().withFeature(new RouterFeature());
```

Now you can use `RouterService` in your components and services to interact with the router.

## Lit routing

To render a router outlet, add `LitRouter` to your root app component and render its outlet:

```ts
import { LitElement } from 'lit';
import { LitRouter } from '@spryker-oryx/router/lit';

class RootComponent extends LitElement {
  router = new LitRouter(this, []); // <-- You can provide some static routes here

  protected override render() {
    return this.router.outlet(); // <-- Render router outlet here
  }
}
```

Then, you can provide routes for Lit applications using DI:

```ts
import { appBuilder } from '@spryker-oryx/core';
import { provideLitRoutes } from '@spryker-oryx/router/lit';

const routes = [
  { path: '/', render: () => html`<my-page></my-page>` },
  { path: '/example/:id', render: ({ id }) => html`<my-example-page id=${id}></my-example-page>` },
];

appBuilder().withProviders(provideLitRoutes({ routes }));
```
{% info_block infoBox %}

This is a basic example, and you may need to adjust the routing config to fit your specific use case.

{% endinfo_block %}



Lit routes using the standard [lit router library](https://github.com/lit/lit/tree/main/packages/labs/router#readme), so see its documentation for more information on how to configure routes.
