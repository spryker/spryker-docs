---
title: "Oryx Component types"
description: Oryx components compared to Atomic Design
last_updated: Sept 23, 2023
template: concept-topic-template
---

Oryx applications are 100% built out of components. Whether it's a page or a section of the page or a button, they're all components. It is important to understand the differences between the component types that Oryx supports, when you start developing with Oryx.

Oryx supports three types of components:

- Design System components  
  Highly reusable components that are used to build consistent user interfaces (UIs).
- Domain components  
  Functional components that are concerned with a specific _domain_, such as "product" or "cart". Domain Components use
- Composition components  
  Containers that are used to render pages or sections by providing a list of components and their layout

Even though Oryx does not implement [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), the component types can be roughly mapped to the Atomic Design levels:

| Atomic Design level | Oryx Component           | Examples                       |
| ------------------- | ------------------------ | ------------------------------ |
| Atoms               | Design System Components | Button, Form element           |
| Molecules           | Domain Components        | Product Images, Cart entry     |
| Organisms           | Compositions             | Product carousel, Product list |
| Templates           | Composition references   | Header, Footer                 |
| Pages               | Compositions             | Product page, Cart page        |

## Design system components

The Oryx design system offers a collection of highly reusable components that are essential for building a consistent and visually appealing UI. These components are designed to be agnostic of the application's context. They serve as the building blocks for domain components.

The design system components are used to ensure a consistent and cohesive visual language across the application. Design components do not interact directly with application logic. They're considered fairly "dumb" as they don't know anything about their surroundings. They are used by domain components, which provide them with properties and dispatch events that can be used by the outer components.

Like any component in Oryx, you can configure and customize design system components or replace them with your own. This enables you to build the required visual language throughout applications. Any reference to a design system component, like `<oryx-button>`, no matter where it is used, is resolved by your custom version.

Design system components are available in the `ui` package: `@spryker-oryx/ui`. They do not depend on any application logic, except for the integration of localized messages.

## Domain components

Oryx functionality is organized by domains. Domain packages contain functional components, also know as _domain components_. For example, all product-related components are organized in the product package.

Domain components leverage the design system components to ensure a consistent UI/UX. The design components are integrated with inputs (properties) and all of their events are handled by domain components.

Domain components integrate with domain services to obtain and update the application state. The services take care of the integration with backend APIs and application state management. In a single page application experience, domain components need to support [reactivity](/docs/scos/dev/front-end-development/{{page.version}}/oryx/reactivity/reactivity.html) to ensure the application state is reflected immediately after it is changed. The complexity of reactivity is avoided as much as possible in components by using [signals](/docs/scos/dev/front-end-development/{{page.version}}/oryx/reactivity/signals.html). To keep the components DRY, domains often provide a mixin that components can use.

Domain components are available in the associated domain package. Product components, for example, are part of the `@spryker-oryx/ui` package. The components use a consistent naming convention for the class and element name. The Product Title component, for example, is named `ProductTitleComponent` and can used with the element `<oryx-product-title>`. To avoid any clashes with other frameworks, the element is prefixed with `oryx-`.

## Composition components

Compositions are simple containers of components that are used to organize components on a page or section of a page. The list of components and their options is configurable, which makes it a powerful tool. The configurable approach allows for dynamic experiences that can be used to personalize or split test the experience.

Because of this generic approach, all pages and their compositions are rendered by a single component only: `CompositionComponent` (`<oryx-composition>`). The composition component iterates over a list of components and applies layout and options to it.

To better understand the concepts of pages and compositions, see [pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html) and [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html).

If you want to customize the application with your own pages, there's no need to follow the concept of compositions necessarily. You can create page specific components (e.g. `ProductDetailPageComponent`) and use this component instead of using experience data for the page.
