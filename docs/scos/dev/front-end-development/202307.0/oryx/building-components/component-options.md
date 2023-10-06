---
title: "Oryx Components options"
description: Components Options provide reusable components cross business models
last_updated: Sept 19, 2023
template: concept-topic-template
---

Oryx components support configurable options to make the components reusable in different business contexts. Component options are JavaScript objects that can be configured as part of the application configuration or added by providing an attribute. To ensure a good developer experience, each component type can provide an interface for the options.

To show the usage of component options, we use the tax message ("incl. vat") that is rendered on `ProductPriceComponent`. The tax message might not be useful for all businesses. For example, in a b2c context, the message might not be required. You can conditionally render the message based on a configuration.

## Set up component options

Component options are provided by a TypeScript interface. This ensures a good developer experience when implementing a component and configuring the application. The component option interface is defined in a separate `*.model.ts` file in Oryx components, but there's no strict rule to follow.

```ts
export interface ProductPriceOptions {
  /**
   * Indicates whether to show tax message for the price.
   */
  enableTaxMessage?: boolean;
}
```

In order to resolve component options in your new components, you can use the `ContentMixin`. The `ContentMixin` provides a type safe `$option` [signal](/docs/scos/dev/front-end-development/{{page.version}}/oryx/architecture/reactivity/signals.html) that guaranties efficient usage of the options.

Oryx provides a mixin `ContentMixin` to work with component options. You can use the mixin to hand in the option interface. The code below shows the usage of the mixin for the definition of the options.

```ts
export class ProductPriceComponent extends ContentMixin<ProductPriceOptions>(
  LitElement
) {
  // use the $options() signal in your code
}
```

## Configure Component Options

Component options can be configured in various ways. To begin with, components can setup default values for the options that are used as a fallback in case no values are provided. [Feature sets](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/oryx-feature-sets.html) can provide values for a specific business context. As an application developer, you can provide customized values, either for all component instances in the application configuration, or by providing options per instance in the experience data.

When you use components in your code, you can also override the options in the code.

The various approaches to setup the values are detailed in the following sections.

### Default component option values

Components can set up default values for the component options. The default values are used as a fallback in case there are no specific values provided.

Oryx provides the `@defaultOptions` class decorator that can be used to add the default values.

```ts
@defaultOptions({
  enableTaxMessage: true,
})
export class ProductPriceComponent extends ContentMixin<ProductPriceOptions>(
  LitElement
) {
  // ...
}
```

### Feature set component options

Default component options can be overridden in feature sets. [Feature sets](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/oryx-feature-sets.html) simplify the setup of a standard for a specific business model, such as b2b or b2c. Besides providing a set of features, a feature set can also provide component configurations. The feature set configurations override the default options values that are provided by the components.

### Application driven component options

Default component value and feature set values can be customized at an Oryx application. The configurations are applied to all instances of the component. The following code example shows how to configure an application using the appBuilder, see [application-orchestration documentation](https://docs.spryker.com/docs/scos/dev/front-end-development/202307.0/oryx/oryx-application-orchestration/oryx-application-orchestration.html) for more information.

```ts
export const app = appBuilder()
  // ...
  .withOptions({
    "oryx-product-price": {
      enableTaxMessage: false,
    },
  })
  .create();
```

### Component option values in Experience data

The default options, feature set configurations and application configurations are all applied to the Component type. The options provided in the experience data are applied to a specific instance in the experience data structure.

In the following configuration you see a part of the experience data that sets the `enableSalesLabel` option to `false`. This configuration is only applied to the instance, if the component is used elsewhere, this configuration will not have any effect.

```ts
{
  type: 'oryx-composition',
  components: [
    {
      type: 'oryx-product-price',
      options: { enableSalesLabel: false },
    },
  ]
}
```

You can read more about creating and customizing experience data in the
[page documentation](/docs/scos/dev/front-end-development/202307.0/oryx/building-pages/oryx-pages.html).

### Hardcoded component options

When you use components in your code, the options can be provided by the `options` attribute. The options attribute is resolved automatically by the `ContentMixin`, that most domain components use.

The example below shows how component options are written in the component `options` attribute. When options are added by an attribute, the web component specs require a stringified JSON. [Lit](https://lit.dev) provides a convenient property mapping that we use in the example below.

```ts
protected override render(): TemplateResult {

  const options: ProductPriceOptions = {
    enableSalesLabel: false;
  }
  return html`<oryx-product-price .options=${options}></oryx-product-price>`;
}
```

## Use component options

To use component options in an asynchronous fashion, it is important to observe the options and react to updates in the component UI. Oryx provides a [reactive](/docs/scos/dev/front-end-development/{{page.version}}/oryx/architecture/reactivity/reactivity.html) framework with observable data streams that can update the UI using [signals](/docs/scos/dev/front-end-development/{{page.version}}/oryx/reactivity/signals.html). To simplify the integration in component logic, the `ContentMixin` provides an `$options` signal, that be called in the render logic or other signals.

The following code shows how to use the `$options` signal. Due to the component option interface the usage of the signal is type safe.

```ts
@defaultOptions({
  enableTaxMessage: true,
})
export class ProductPriceComponent extends ContentMixin<ProductPriceOptions>(
  LitElement
) {
  protected override render(): TemplateResult {
    return html` ... ${this.renderTaxMessage()} ... `;
  }

  protected renderTaxMessage(): TemplateResult | void {
    if (!this.$options().enableTaxMessage) return;

    return html`...`;
  }
}
```
