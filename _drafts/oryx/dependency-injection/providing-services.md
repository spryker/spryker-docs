---
title: Providing services
description: Recommended conventions for defining services
template: concept-topic-template
last_updated: Apr 13, 2023
---

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

## Injecting the INJECTOR token

In some cases, dependencies may be optional or resolved at runtime, making it difficult to inject them directly into a service. In such cases, you can inject the current DI container using the `INJECTOR` token. Example:

```ts
constructor(protected injector = inject(INJECTOR)) {}
```

With the `INJECTOR` token injected, you can use the `INJECTOR`'s `inject` method to dynamically resolve dependencies at runtime. Example:

```ts
someServiceMethod(field) {
	const template = this.injector.inject(`${FormFieldRenderer}-${field.type}`);
}

```

In this example, the `inject` method is used to resolve a dependency based on a dynamic token that includes the `field` type. Since the `field` type is only known at runtime, it's impossible to inject the dependency directly. Instead, the `INJECTOR` token is injected, allowing the `inject` method to resolve the dependency dynamically.

## Multi-providers

Most dependencies in an application correspond to only one value, like a class. In some cases, it is useful to have dependencies with multiple values, like HTTP interceptors or normalizers. However, it's not very practical to configure these dependencies separately, because the application needs to access them all together at once. Therefore, you can use a special type of dependency that accepts multiple values and is linked to the same dependency injection token. These are called multi-providers.

There are different types of multi-providers based on location an number of asterisks(`*`) in  the name of their tokens. They are described in the following sections.

### Providers with an asterisk in the end of token name

These providers define multi-providers with an array of elements. The name of their token looks like `[token-base-name]*`.

```ts
[
  { provider: 'multi*', useValue: 'a' },
  { provider: 'multi*', useValue: 'b' },
  { provider: 'multi*', useValue: 'c' },
];
///
inject('multi*'); // [a,b,c];
```

### Providers with an asterisk in the middle of token name

Based on token name, these providers define the following:

- `[token-base-name]*[token-specifier-name]`: a single provider.
- `[token-base-name]*`: Multi-providers with an array of elements.

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

### Providers with two and more asterisks in token name

Based on token name, these providers define the following:

- `[token-base-name]*[sub-token-name]*[token-specifier-name]`: a single provider.
- `[token-base-name]*`: multi-providers with an array of elements.
- `[token-base-name]*[sub-token-name]*`: multi-providers with an array of elements.

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

It is also possible to combine multiple providers. You can define a provider with the `[token-base-name]*[token-specifier-name]` token and add another one with the `[token-base-name]*` token.

```ts
[
  { provider: 'multi*a', useValue: 'a' },
  { provider: 'multi*', useValue: 'b' },
];
///
inject('multi*a'); // a;
inject('multi*'); // [a,b];
```

In summary, providers with different asterisk patterns in their token names offer various ways to define single and multi-providers. These patterns allow for more flexibility and organization when managing dependencies in an application.
