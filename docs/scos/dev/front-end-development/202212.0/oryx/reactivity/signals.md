# Oryx Framework - Signals

## Overview

Signals are crucial tools within the Oryx framework, offering a clean and efficient reactivity API for component design. They allow for the declarative formulation of component logic while seamlessly integrating with observables from domain services.

## Implementation of Signals in Oryx

The Oryx implementation of signals has a core mechanism and a simplified API. The core is well-suited for advanced usage, while the simplified API is sufficiently robust for most components. This documentation will focus on the simplified API.

### Creating Signals

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

#### Signal Options

Signal options are settings that you can use to customize your signals.

- `equal` function: This option allows you to compare two values and decide if they are equal. It's a function that takes two inputs and should return true if they are equal and false if they're not.

- `initialValue` option: This is used when creating a signal from an observable. It sets the first value of the signal, so you don't have to wait for the observable to give a value.

Here's an example of using options:

```ts
const values = signal(observable$, { initialValue: 1, equal: (a, b) => a === b });
```

### Computed Signals

A computed signal derives its value from other signals. It automatically reevaluates its value when any of the signals it depends on changes.

Here's an example of a computed signal:

```ts
const counter = computed(() => 3 * counter(1));
```

Computed signals can also convert observables to signals transparently:

```ts
const counter = computed(() => productService.get({ sku: productSku() }));
```

In the example above, `productSku` is a signal, and `productService.get` returns an observable.

Computed signals can use the same set of options as regular signals.

### Effects

Effects are functions that run whenever a signal's value changes.

Here's an example:

```ts
const counter = effect(() => {
    console.log('counter changed', counter());
});
```

#### Effect Options

Effect options let you adjust how your effects function.

- `defer`: If this is set to true, your effect won't run until you explicitly call the `start()` method.
- `async`: Set this to true if you want your effect to run asynchronously.

Example:

```ts
const counter = effect(() => {
    console.log('counter changed', counter());
}, { defer: true, async: true });
```

### Using Signals in Components

The `@signalAware` decorator provides additional functionality when using signals in components.

```ts
@signalAware()
class MyComponent extends LitElement {}
```

This decorator is required to make your component work with signals as expected.
When used, the component will automatically detect signals and render changes whenever a signal alters. It does this intelligently, considering only the signals relevant to the last render.

Some Oryx domain components are not using this decorator directly, as it is already applied to some common domain mixins (eg. `ContentMixin`, `ProductMixin`, etc.).

