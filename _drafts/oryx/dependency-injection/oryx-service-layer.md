---
title: Oryx service layer
description: Oryx service layer uses dependency injection to abstract system functionality
template: concept-topic-template
last_updated: Apr 13, 2023
---

The service layer in Oryx serves as the foundation for the business logic, with Dependency injection(DI) playing a crucial role.

The main objective of the service layer in Oryx is to abstract all the system functionality, including querying backend services, data caching and reloading, state management, and reactivity.

Furthermore, DI is utilized by many higher-level elements and concepts in Oryx, ranging from adapters and normalizers to HTTP interceptors, authentication, product loading, cart management, and checkout process.

## Dependency injection npm package

The `@spryker-oryx/di` package provides DI not only to Oryx applications but also to other packages and can even be used outside the Oryx framework. It includes a variety of useful utilities to streamline working with DI, such as the following:

- TypeScript model definitions. For example, Providers.
- `Injector`: the implementation of a DI container in TypeScript.
- Functions used to set up and manage injectors. For example, `createInjector()` or `getInjector()`.
- Utilities that can be used to resolve dependencies: `inject` and `resolve`.

In a typical Oryx application, the application orchestrator automatically handles much of the work related to setting up the DI container. Nevertheless, the `@spryker-oryx/di` library provides a set of tools that can be used to further customize and fine-tune DI.

## Next steps

[Using services](./using-services.md)
