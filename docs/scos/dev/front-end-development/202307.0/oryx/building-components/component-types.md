## docs/scos/dev/front-end-development/202212.0/oryx/building-components/component-types.md

title: "Oryx Component Types"
description: Oryx components compared to Atomic Design
last_updated: Sept 10, 2023
template: concept-topic-template

---

A well-known methodology to structure different types of components is the [Atomic Design methodology](https://bradfrost.com/blog/post/atomic-web-design/). This methodology helps to better understand the different levels of components found in a frontend application. Spryker has embraced this methodology in Yves, calling it the [Atomic Frontend](/docs/scos/dev/front-end-development/202307.0/yves/atomic-frontend/atomic-front-end-general-overview.html#basic-concepts).

Oryx has not implemented Atomic Design. But aligning Oryx component types with the component levels in Atomic Design might help you to better understand how components are created and used. Oryx component types, however, do not map 1:1 to the Atomic Design levels, but its a fairly good comparison.

| Atomic Design | Oryx Component           | Examples                       |
| ------------- | ------------------------ | ------------------------------ |
| Atoms         | Design System Components | Button, Form element           |
| Molecules     | Domain Components        | Product Images, Cart entry     |
| Organisms     | Compositions             | Product carousel, Product list |
| Templates     | Composition references   | Header, Footer                 |
| Pages         | Compositions             | Product page, Cart page        |

## Design System Components (Atoms)

Atomic design describes the foundational building blocks as _Atoms_, referencing the atoms known from chemistry as the basic building blocks of HTML.

> Atoms include basic HTML elements like form labels, inputs, buttons, and others that can't be broken down any further without ceasing to be functional.  
> (Source: https://atomicdesign.bradfrost.com/chapter-2/)

A lot of design system components can be compared to atoms, but there are components that better fit the molecule description. The typeahead component for example contains a lot of functionality and is much more than a basic molecule.

The design system components are used to ensure a consistent and cohesive visual language across the application. Design components do not interact directly with application logic. They're considered fairly "dumb" as they don't know anything about their surroundings. They are used by domain components, which will provide them with properties and listen to their events.

Like any component in Oryx, you can customize design system components or replace them with your own. This allows you to influence the visual language across the application with a fairly simple change. Any reference to a design system component (e.g. `<oryx-button>`), no matter how deep in the component tree it is used, will be resolved by the customized version.

Design system components are available in the `ui` package (`@spryker-oryx/ui`). They do not depend on any application logic, except for the integration of localized messages.

## Domain Components (Molecules)

Molecules are the next level in the atomic design methodology. Here's what the author writes about this level of components:

> In interfaces, molecules are relatively simple groups of UI elements functioning together as a unit. For example, a form label, search input, and button can join together to create a search form molecule.  
> (Source: https://atomicdesign.bradfrost.com/chapter-2/)

Oryx functionality is organized in domains. Domains only contain functional components, also know as "Domain Components". For example, all product-related components are provided by the product package (`@spryker-oryx/product`) and are prefixed with the Domain (e.g. `<oryx-product-images>`)

Domain components map fairly well to molecules, although some of them better map to organisms.

Domain components use the design system components to ensure a consistent user interface and experience. The design system components receive inputs from the domain components, and the domain components listen to their events.

Domain components integrate with domain services to obtain and update the application state. The services take care of the integration with backend APIs and application state management. In a single page application (SPA) experience, domain components need to reflect the application state and rerender the UI whenever the state is changed asynchronously. This pattern is called[reactivity](/docs/scos/dev/front-end-development/202307.0/oryx/reactivity/reactivity.html). Oryx uses [signals](/docs/scos/dev/front-end-development/202307.0/oryx/reactivity/signals.html) to offer a clean and efficient reactivity API for Oryx components. Using signals, components are automatically updated in an efficient way when the application state is updated.

## Pages and compositions (Organisms, pages)

When it comes to alignment with the atomic design system on organisms, templates or pages, Oryx has very different approach. There are no components provided for these levels. There is only one component (`<oryx-composition>`) that is used to render the UI that is required for those levels.

Compositions are simple containers for components and output the components in a flat list. Additionally, compositions can contain layout rules. The combination of a list of components and an abstraction for the layout makes compositions a powerful tool that can be used to create pages and their inner compositions in a generic way.

To better understand the concepts of pages and compositions, see [pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html) and [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html).

If you use Oryx and want to customize the application with your own pages, there's no need to follow the concept of compositions necessarily. It is an optional abstraction that is used by Oryx to ensure a more dynamic experience (page variants, personalization, A/B testing, etc.).

## Page references (templates)

Components and compositions can be referenced by their ID. A good example of a reusable composition is the header or the footer.
