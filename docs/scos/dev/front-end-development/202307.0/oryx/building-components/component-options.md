---
title: "Oryx Components Options"
description: Components Options provide reusable components cross business models
last_updated: Sept 19, 2023
template: concept-topic-template
---

## Component options

Oryx components can be provided with options. Component options are javascript objects that can be configured as part of the application configuration, to make the components better reusable in different business contexts.

To illustrate the usage of component options, we use the tax message ("incl. vat") that is rendered on the `ProductPriceComponent`. The tax message might not be useful for all businesses. For example, in a b2c context, the message might not be required. You can conditionally render the message based on a configuration.

## Set up component options

Component options are provided by a TypeScript interface. This ensures a good developer experience during the component implementation and when you configure the application. The component option interface is defined in a separate `*.model.ts` file in Oryx components, but there's no strict rule to follow.

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

The component option model can be configured in various ways. Components can setup default values for the options. Feature sets can be used to configure the options for a specific business model. The feature sets configurations can be override by application configurations and last but not least, the component instance options can be specified in the experience data.

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

### Experience data

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
