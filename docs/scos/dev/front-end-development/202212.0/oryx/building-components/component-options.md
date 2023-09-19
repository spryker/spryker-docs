---
title: "Oryx Components Options"
description: Components Options provide reusable components cross business models
last_updated: Sept 19, 2023
template: concept-topic-template
---

## Component options

Oryx components can be provided with options. Component options are javascript objects that can be configured as part of the application configuration, to make the components better reusable in different business contexts.

We use the display of a tax message ("incl. vat") in the `ProductPriceComponent` as an example for this documentation. Rendering the tax message might be subject to the business context (think b2b vs b2c) or driven by the legal context. In order to reuse the component in different context, the tax message condition can be given by an option. Such option can be specified on the application.

## Define component options

It is recommended to define component options in TypeScript. This ensures a good developer experience for both the component implementation as well as the application configuration.

Oryx provides a mixin `ContentMixin` to work with component options. You can use the mixin to hand in the option interface. The code below shows the usage of the mixin for the definition of the options.

```ts
export interface ProductPriceOptions {
  /**
   * Indicates whether to show tax message for the price.
   */
  enableTaxMessage?: boolean;
}

export class ProductPriceComponent extends ContentMixin<ProductPriceOptions>(
  LitElement
) {
  // ...
}
```

## Default values

Components can set up default values for the component options. The default values are used as fallback in case there are no specific values provided.

Oryx provides a class decorator (`@defaultOptions`) that can be used to add the default values.

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

### Load component options

Component options can be provided statically to the application and will be used by all instances of the component.

```ts
export const app = appBuilder()
  .withOptions({
    "oryx-product-price": {
      enableTaxMessage: false,
    },
  })
  .create();
```

You can read more about setting up the application in the [application-orchestration documentation](https://docs.spryker.com/docs/scos/dev/front-end-development/202307.0/oryx/oryx-application-orchestration/oryx-application-orchestration.html).

Another approach to provide static options, is providing them in the experience data. When you configure the values through experience data, you can configure values for a particular instance of the component.

In the following configuration example you see a part of the experience data that sets the `enableSalesLabel` option to false. This override the `enableSalesLabel` for this particular usage. When the component is used in other instances (say inside a product card), this configuration will not have any effect.

```ts
...
{
    type: 'oryx-composition',
    components: [
        ...
        {
            type: 'oryx-product-price',
            options: { enableSalesLabel: false },
        },
        ...
    ]
}
```

You can read more about creatign and customizing experience data in the
[page documentation](/docs/scos/dev/front-end-development/202307.0/oryx/building-pages/oryx-pages.html).

Component options values can also be loaded dynamically from a backend API. Loading options from APIs will allow you to factor in additional context to create component options. For example, you could create personalization or A/B testing scenario's in the component option values.

### Use component options

To use component options in an asynchronous fashion, it is important to observe the options and react to updates in the component UI. Oryx provides a reactive framework with observable data streams that can update the UI using signals. To simplify the integration in component logic, the `ContentMixin` provides an `$options` signal, that be called in the render logic or other signals.

The following code shows how to use the `$options` signal. Due to the component option interface the usage of the signal is type safe.

```ts

```

In order to load options statically

This option
a signal, that ensures that the content is

see [Signals](/docs/scos/dev/front-end-development/{{page.version}}/oryx/reactivity/signals.html).

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
