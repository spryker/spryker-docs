# Dependency injection

Dependency injection (DI) is a design pattern that provides loosely-coupled, maintainable, and testable code. It improves modularity, maintainability, testability, and is easily customizable and extensible.

In the context of Oryx, DI enables you to customize logic deep inside the framework, which is particularly useful for projects with complex or rapidly-evolving requirements. Without DI, you would need to override large portions of the logic or create a lot of boilerplate code. By leveraging DI, you can override logic while still being able to upgrade to newer versions of Oryx going forward.

One key advantage of using Oryx's DI implementation is that it is vanilla JavaScript and can be used in other frameworks as well. Although there are popular DI packages available, using Oryx's implementation ensures seamless integration and compatibility with its features.

# Service layer in Oryx

The service layer in Oryx serves as the foundation for the business logic, with DI playing a crucial role.

The main objective of the service layer in Oryx is to abstract all the system functionality, including querying backend services, data caching and reloading, state management, and reactivity.

Furthermore, DI is utilized by many higher-level elements and concepts in Oryx, ranging from adapters and normalizers to HTTP interceptors, authentication, product loading, cart management, and checkout process.

## DI npm package

The `@spryker-oryx/di` package provides DI not only to Oryx applications but also to other packages and can even be used outside the Oryx framework. It includes a variety of useful utilities to streamline working with DI, such as the following:

- TypeScript model definitions. For example, Providers.
- `Injector`: the implementation of a DI container in TypeScript.
- Functions used to set up and manage injectors. For example, `createInjector()` or `getInjector()`.
- Utilities that can be used to resolve dependencies: `inject` and `resolve`.

In a typical Oryx application, the application orchestrator automatically handles much of the work related to setting up the DI container. Nevertheless, the `@spryker-oryx/di` library provides a set of tools that can be used to further customize and fine-tune DI.

# Using services

## inject vs resolve

There are two primary methods for injecting services and dependencies:

- `inject`: usually used inside services
- `resolve`: usually used inside components and web components

### inject()

The `inject` method is used to inject services from the current injector. This method can be used when the injection context is defined, such as in services' constructors or in provided factories that use `useFactory`.

```ts
export class MyService {
  constructor(protected otherService = inject(SomeOtherService)) {}
}
```



### resolve()

The `resolve` method works similarly to `inject`, but it tries to resolve the current injector using context, by default, `globalThis`. This method is suitable to use in components, especially in web components, where the injection context may not be defined at construction time.

```ts
export class MyComponent extends LitElement {
  protected myService = resolve(MyService);
}
```



### One container by default

A typical Oryx application usually uses one global DI container, which is set up by the app orchestrator. This is currently the recommended approach for Oryx applications that utilize web components, as it provides a streamlined solution that typically addresses all requirements of an application.

# Defining services

The following sections describe the conventions used in Oryx to define services. We recommend using them when developing with Oryx.

## String-based token

Services are resolved using string tokens. For example:

```ts
export const CartService = 'oryx.CartService';
```

We recommend using project-specific prefixes for those tokens to minimize the risk of naming collisions with other services or libraries.

## Service interface

The service interface is a plain TypeScript interface that describes the public API of a service. Example:

```ts
export interface CartService {
  load(): Observable<null>;
  getCart(data?: CartQualifier): Observable<Cart | null>;
}
```

Since TypeScript interfaces are lightweight, there's no overhead or tight coupling between the service definition (and its token) and its implementation.

## Coupling token with interface

To achieve type safety and couple the string token with a specific interface, we use a technique to augment the global `InjectionTokensContractMap`:

```ts
declare global {
  interface InjectionTokensContractMap {
    [CartService]: CartService;
  }
}
```

This lets `resolve` and `inject` infer the proper type when injecting a service using a string token, providing type safety for your code.

## Default implementation

The default implementation is usually a class that implements a service interface. Example:

```ts
export class DefaultCartService implements CartService {
  // implementation
}
```

# Providing services

To use and inject services, they must be provided in the DI container. Oryx offers several types of providers:

- `ClassProvider<T>`: Binds a token to a class constructor.
- `ValueProvider<T>`: Binds a token to a value.
- `FactoryProvider<T>`: Binds a token to a factory function.
- `ExistingProvider<T>`: Binds a token to an existing token.

You can pass a list of providers as an argument to the `Injector` constructor or to the Injector's `provide` method.

{% info_block warningBox "When to provide services" %}

Providing services is only possible before the first usage of the DI container.

{% endinfo_block %}

In Oryx applications, providers are typically grouped into const arrays and passed to the app orchestrator either directly or as part of feature definitions. By doing this, you can easily manage features with corresponding providers and their dependencies.

Here's an example describing how to use the app orchestrator to provide services as part of a feature:

```ts
export const app = appBuilder()
  // ...
  .withFeature({
    providers: [{ provide: CartService, useClass: CustomizedCartService }],
  })
  // ...
  .create();
```

In this example, the customized cart service is provided by specifying the provider's property within a feature object. This way, you can easily manage and extend the services provided by your Oryx application.

# Injecting the INJECTOR token

In some cases, dependencies may be optional or resolved at runtime, making it difficult to inject them directly into a service. In such cases, you can inject the current DI container using the `INJECTOR` token. Example:

```ts
constructor(protected injector = inject(INJECTOR)) {}
```

With the `INJECTOR` token injected, you can use the injector's `inject` method to dynamically resolve dependencies at runtime. Example:

```ts
someServiceMethod(field) {
	const template = this.injector.inject(`${FormFieldRenderer}-${field.type}`);
}

```

In this example, the `inject` method is used to resolve a dependency based on a dynamic token that includes the `field` type. Since the `field` type is only known at runtime, it is not possible to inject the dependency directly. Instead, the `INJECTOR` token is injected, allowing the `inject` method to resolve the dependency dynamically.

# Multi-providers

Most dependencies in an application correspond to only one value, like a class. In some cases, it is useful to have dependencies with multiple values, for example, HTTP interceptors or normalizers. However, it's not very practical to configure these dependencies separately, because the application needs to access them all together at once. Therefore, you can use a special type of dependency that accepts multiple values and is linked to the exact same dependency injection token. These are called multi-providers.

There are different types of multi-providers based on asterisks(`*`) in their token naming. They are described in the following sections.

### Providers with a single asterisk at the end of their token name (`[token-base-name]*`):

These define multi-providers with an array of elements.

```ts
[
  { provider: 'multi*', useValue: 'a' },
  { provider: 'multi*', useValue: 'b' },
  { provider: 'multi*', useValue: 'c' },
];
///
inject('multi*'); // [a,b,c];
```

### Providers with an asterisk within their token name (`[token-base-name]*[token-specifier-name]`):

- These define a single provider for the token `[token-base-name]*[token-specifier-name]`.
- They also define multi-providers with an array of elements for the token `[token-base-name]*`.

```ts
[
  { provider: 'multi*a', useValue: 'a' },
  { provider: 'multi*b', useValue: 'b' },
  { provider: 'multi*c', useValue: 'c' },
];
///
inject('multi*a'); // a;
inject('multi*'); // [a,b,c];
```

### Providers with two (or more) asterisks in their token name (`[token-base-name]*[sub-token-name]*[token-specifier-name]`):

- These define a single provider for the token `[token-base-name]*[sub-token-name]*[token-specifier-name]`.
- They define multi-providers with an array of elements for the token `[token-base-name]*`.
- Additionally, they define multi-providers with an array of elements for the token `[token-base-name]*[sub-token-name]*`.

```ts
[
  { provider: 'multi*a', useValue: 'a' },
  { provider: 'multi*b', useValue: 'b' },
  { provider: 'multi*new*c', useValue: 'c' },
  { provider: 'multi*new*d', useValue: 'd' },
];
///
inject('multi*a'); // a;
inject('multi*new*c'); // c;
inject('multi*'); // [a,b,c,d];
inject('multi*new*'); // [c,d];
```

It is also possible to combine multiple providers if a provider is defined with the token `[token-base-name]*[token-specifier-name]` and another one is added with the token `[token-base-name]*`.

```ts
[
  { provider: 'multi*a', useValue: 'a' },
  { provider: 'multi*', useValue: 'b' },
];
///
inject('multi*a'); // a;
inject('multi*'); // [a,b];
```

In summary, providers with different asterisk patterns in their token names offer various ways to define single and multi-providers. These patterns allow for more flexibility and organization when managing dependencies within an application.
