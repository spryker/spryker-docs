---
title: "Dependency Injection: Defining services"
description: Recommended conventions for defining services
template: concept-topic-template
last_updated: Apr 13, 2023
---

{% info_block warningBox %}

Please note that Oryx is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

This document describes the conventions we use and recommend for defining services in Oryx.

## String-based token

Services are resolved using string tokens. Example:

```ts
export const CartService = 'oryx.CartService';
```

To minimize the risk of naming collisions with other services or libraries, we recommend using project-specific prefixes for string tokens.

## Service interface

The service interface is a plain TypeScript interface that describes the public API of a service. Example:

```ts
export interface CartService {
  load(): Observable<null>;
  getCart(data?: CartQualifier): Observable<Cart | null>;
}
```

Because TypeScript interfaces are lightweight, there's no overhead or tight coupling between the service definition (and its token) and its implementation.

## Coupling token with interface

To achieve type safety and couple the string token with a specific interface, we use a technique to augment the global `InjectionTokensContractMap`:

```ts
declare global {
  interface InjectionTokensContractMap {
    [CartService]: CartService;
  }
}
```

This lets `resolve` and `inject` infer the proper type when injecting a service using a string token, providing type safety for code.

## Default implementation

The default implementation is usually a class that implements a service interface. Example:

```ts
export class DefaultCartService implements CartService {
  // implementation
}
```

## Next step

[Providing services](/docs/scos/dev/front-end-development/{{page.version}}/oryx/dependency-injection/dependency-injection-providing-services.html)
