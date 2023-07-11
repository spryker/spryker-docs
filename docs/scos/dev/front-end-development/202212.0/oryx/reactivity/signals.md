---
title: [Add title; the file name and title must be identic]
description: [Add description]
template: concept-topic-template
last_updated: Jul 11, 2023
---


Signals are a crucial tool within the Oryx framework, offering a clean and efficient reactivity API for components. They allow for the declarative formulation of component logic while seamlessly integrating with observables from domain services.

## Implementation of Signals in Oryx

The Oryx implementation of signals has a core mechanism and a simplified API. The core is well-suited for advanced usage, while the simplified API is sufficiently robust for most components. This document focuses on the simplified API.

### Creating signals

To create a signal, use the `signal()` function. This function can either take a raw value or accept an observable.

Here's an example of creating a simple signal:

```ts
const counter = signal(1);
```

Changing the signal value:

```ts
counter.set(2);
```

Creating a signal from an observable:

```ts
const values = signal(observable$);
```

You can initialize signals with options to adjust their behavior:

- The `equal` function: This option allows for a custom equality function between two consecutive signal values. By default, strict comparison is used. Implementing your own function gives control over when a signal updates, avoiding unnecessary updates and performance costs when new and old values are practically identical.

- The `initialValue` option: This is used when creating a signal from an observable. It sets the first value of the signal, so you don't have to wait for the observable to give a value.

Here's an example of using options:

```ts
const values = signal(observable$, { initialValue: 1, equal: (a, b) => a === b });
```

### Computed signals

A computed signal derives its value from other signals. It automatically reevaluates its value when any of the signals it depends on changes.

Here's an example of a computed signal:

```ts
const counter = computed(() => 3 * counter(1));
```

Computed signals can also convert observables to signals transparently:

```ts
const counter = computed(() => productService.get({ sku: productSku() }));
```

In the preceding example, `productSku` is a signal, and `productService.get` returns an observable.

Computed signals can use the same set of options as regular signals.

### Effects

Effects are functions that run whenever a signal's value changes.

Here's an example:

```ts
const counter = effect(() => {
    console.log('counter changed', counter());
});
```

You can configure effects using options to modify their behavior:

- `defer`: If this is set to `true`, your effect doesn't run until you explicitly call the `start()` method.
- `async`: Set this to `true` if you want your effect to run asynchronously.

Example:

```ts
const counter = effect(() => {
    console.log('counter changed', counter());
}, { defer: true, async: true });
```

## Using signals in components

### @signalAware directive

The `@signalAware` decorator provides additional functionality when using signals in components.

```ts
@signalAware()
class MyComponent extends LitElement {}
```

This decorator is required to make your component work with signals as expected.
When used, the component will automatically detect signals and render changes whenever a signal alters. It does this intelligently, considering only the signals relevant to the last render.

Some Oryx domain components are not using this decorator directly, as it is already applied to some common domain mixins (eg. `ContentMixin`, `ProductMixin`, etc.).

### `@elementEffect` directive

The `@elementEffect` directive integrates effects with component lifecycles for seamless management. It activates an effect when a component is connected to the DOM and deactivates it once the component is disconnected.

```ts
class MyComponent extends LitElement {
  /* ... */  
  @elementEffect()
  logProductCode = () => console.log('Product code ', this.$product().code);
}
```

In the above example, the `logProductCode` effect will automatically start when `MyComponent` is connected to the DOM, logging the product code everytime $product signal will update. Once the component is disconnected from the DOM, the effect will automatically stop. This directive simplifies effect management by automatically linking them to component lifecycles, making your component code cleaner and easier to manage.
