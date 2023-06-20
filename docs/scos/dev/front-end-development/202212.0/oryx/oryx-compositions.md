---
title: "Oryx: Compositions"
description: Compositions are used to organize components and provide layout in Oryx applications
last_updated: June 8, 2023
template: concept-topic-template
---

Compositions in Oryx are a powerful tool for organizing components and defining their layout. It removes page specific layout concerns from the component implementation, which makes the components less opinionated and therefore better reusable.

## Overview

A composition contains a list of components which are rendered in the DOM in their specific order. A composition itself is a component, which means that you can easily create nested composition structures. In fact, a page itself is a composition.

Compositions in Oryx take a data-driven approach, allowing you to configure the composition using external data sources. This approach offers several potential benefits:

- **Avoid Hard-Coded Page Layout**: By using data to configure compositions, you can avoid hard-coding the page layout in your application code. Instead, you can define the structure and layout of your pages using external data, making it more flexible and easier to customize.

- **Upgradable composition**: A configurable data set is easier upgradable. Instead of upgrading to hardcoded component structure, you can select an alternative data set that will hold new components. This makes it easier to _opt-in_ to alternative compositions.

- **No-Code Customizations**: The data-driven approach enables no-code customizations of the compositions. With the use of a WYSIWYG (What You See Is What You Get) tool, non-technical users can easily modify the composition by adjusting the data configuration, without the need to modify the underlying code.

- **Split Testing of Data Sets**: The data-driven compositions allow for split testing of different data sets. This means you can create alternative data configurations and perform A/B testing to compare their impact on user experience and performance. This provides valuable insights for optimizing your application.

- **Personalization of Data Sets**: The data-driven approach allows for personalization of the data set based on various criteria such as user profiling, location, time, and more. You can tailor the composition data to provide personalized experiences to different target groups, enhancing user engagement and satisfaction.

- **Alternative Data Sets per Screen Size**: Oryx compositions support the configuration of alternative data sets based on screen sizes. This means you can define different experiences for different devices, such as mobile, tablet, and desktop. By adapting the data set based on screen size, you can optimize the user experience for each device type.

The data-driven approach in Oryx compositions empowers you to dynamically configure the structure, layout, and content of your application based on external data sources. This flexibility allows for easy customization, experimentation, and personalization, leading to enhanced user experiences and improved performance.

## Configuring Compositions with Data

To utilize the data-driven approach in Oryx compositions, you can provide the composition data using static experience data, or by loading the data from an external source (e.g. a backend API). An example of how the static experience data is provided can be found in the [feature sets documentation](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-feature-sets.html).

The data configuration for a composition typically includes information about the components, their order, layout rules, styling options, and any other properties relevant to the composition.

By separating the data configuration from the code, you can easily update and manage the composition without modifying the underlying application code. This promotes a more efficient development process and enables non-technical stakeholders to contribute to the composition customization.

## Nested compositions

Compositions can be nested. Every time you need to put in additional structure for the organization and layout of a section, you can bring in a nested composition. A good example of nested compositions is the footer of an e-commerce storefront. The footer typically comes with a lot of links. The links are organized in groups, to better group them by corporate links, self service links, legal links, social link, etc. For a good experience, the groups have a layout assigned to them, to put them on the left or right, top of bottom of the footer.

## HTML produced by composition structure

The HTML produced by the composition component, represents the composition hierarchy and defines the rendering order of components. Understanding the generated DOM structure is important for working effectively with compositions. The DOM structure is based on the experience data provided for each composition. It reflects the composition hierarchy and the components included within the composition. Let's take the login page composition as an example:

```ts
export const loginPage = {
  type: "Page",
  meta: { ... },
  options: { ... },
  components: [
    {
      type: "oryx-auth-login",
      options: {
        data: {
          rules: [{ width: "50%", margin: "auto" }],
        },
      },
    },
  ],
};
```

Based on the composition data, which only holds a single component, the following html is generated:

```html
<oryx-composition route="/login" uid="static129">
  <oryx-auth-login uid="static130"></oryx-auth-login>
  <style>
    :host([uid="static130"]),
    [uid="static130"] {
      width: 50%;
      margin: auto;
    }
  </style>
</oryx-composition>
```

When the data structure does not provide an unique id, a `uid` will be
autogenerated. The example demonstrates the need to have a `uid`, as the data
driven styles are bound to elements with those uids. Nested compositions are
added to the DOM, similar to other components. The following example shows the components
of the cart page:

```html
<oryx-composition route="/cart" uid="static75">
  <oryx-cart-entries uid="static76"></oryx-cart-entries>
  <oryx-composition uid="static77" sticky>
    <oryx-cart-totals uid="static78"></oryx-cart-totals>
    <oryx-checkout-link uid="static79"></oryx-checkout-link>
  </oryx-composition>
</oryx-composition>
```

## Conclusion

Compositions in Oryx take a data-driven approach, enabling you to configure the structure, layout, and content of your application using external data sources. This approach offers flexibility, customization options, and the ability to perform split testing and personalization.

By utilizing data-driven compositions, you can avoid hard-coded page layouts, empower non-technical users to customize compositions, and adapt the user experience based on screen size and other criteria.

The data-driven approach in Oryx compositions promotes a more efficient development process and enhances the ability to create engaging and personalized experiences for your users.

To learn more about Oryx presets and feature sets, which often work hand in hand with compositions, refer to the [Oryx presets documentation](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-presets.html) and [Oryx feature sets documentation](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-feature-sets.html).
