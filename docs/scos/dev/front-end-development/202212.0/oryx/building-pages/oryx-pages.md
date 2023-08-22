---
title: "Oryx: Creating pages"
description: Pages can be created from a data set or custom components
last_updated: Aug 1, 2023
template: concept-topic-template
---

In Oryx, pages are essential building blocks of web applications. They represent different sections or views within your application and can be created using a data-driven approach. This approach lets you define the composition and layout of pages using external data sources, making it easier to maintain, customize, and optimize your application.

Oryx provides standard pages, like home, login, or search page, in [application presets](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-presets.html). Using presets gets you up and running fast. This document shows you how to provide custom pages or apply small customization on top of standard preset pages.

## Understanding pages and compositions

Pages in Oryx are represented as [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html), which are collections of components organized in a specific order. Compositions enable you to define the structure and layout of pages without hardcoding them in your code. This separation of concerns makes your components more reusable and less tied to specific pages.

Oryx leverages a data-driven approach for creating pages, letting you configure the composition and content of pages using external data sources. For the advantages and technical details, see [Compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-compositions.html).

## Non-data-driven approach

While Oryx promotes the data-driven approach for creating pages, you are not bound to it. If you prefer, you can create a page component and assign it directly to a route.

## Creating pages by data

The `Page` component type is used to create pages. A page is defined as a composition that can hold other compositions and components. Here's a basic example of a page defined as a composition:

```ts
export const cartPage: ExperienceComponent = {
  id: "cart-page",
  type: "Page",
  meta: {
    title: "Cart Page",
    description: "Cart Page Description",
  },
  options: {
    // add component options here
  },
  components: [
    // add your components here
  ],
};
```

### Configuring content for a route

You can configure the matching URL of a page using the `meta.route` field. This allows you to define on which URL the page should be rendered.

Here's an example of how to configure the route of a page:

```ts
export const cartPage: ExperienceComponent = {
  id: "cart-page",
  type: "Page",
  meta: {
    route: "/cart",
  },
};
```

In this example, the `route` field is set to "/cart," so the page is rendered when the "/cart" URL of your application is visited.

{% info_block infoBox "Reading tip" %}

Changing the route of the page content does not mean that the related route has changed; You'd need to configure the [routing](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-routing.html) to change the route.

{% endinfo_block %}

## Customizing pages and page content

Oryx allows you to provide custom experience data or modify existing data for your pages. This gives you the flexibility to tailor the compositions to your specific needs and business requirements.

### Provide custom data

You can provide custom experience data using Oryx' [dependency injection system](/docs/scos/dev/front-end-development/{{page.version}}/oryx/dependency-injection/dependency-injection-providing-services.html):

A small utility function is available from the experience package to add custom data:

```ts
import { appBuilder } from "@spryker-oryx/application";
import { provideExperienceData } from "@spryker-oryx/experience";
import { customPage } from "./custom/page";

export const app = appBuilder()
  .withProviders(provideExperienceData(customData))
  .create();
```

### Custom data

The data that you can provide is typed in the `ExperienceComponent` type. You can create a page structure by leveraging compositions, layout and existing components in a standard way.

The following example shows how a single text component is added to the structure.

```ts
const customHomePage: ExperienceComponent = {
  type: "oryx-content-text",
  content: { data: { text: "<h1>Home page</h1>" } },
};
```

The following example shows a more complex variation, where the text component is wrapped inside a composition and is rendered in a grid layout:

```ts
const customHomePage: ExperienceComponent = {
  type: "oryx-composition",
  id: "home-hero",
  options: {
    rules: [
      {
        layout: "grid",
      },
    ],
  },
  components: [
    {
      type: "oryx-content-text",
      content: { data: { text: "<h1>Home page</h1>" } },
    },
  ],
};
```

### Merge selector

To replace existing content, provided by [presets](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-presets.html), you need to define the content that you want to merge and, optionally, the merge strategy you like to use.

The selected content is defined by the `merge.selector` field. The following example shows how the provided data replaces the home page.

```ts
import { appBuilder } from "@spryker-oryx/application";
import { provideExperienceData } from "@spryker-oryx/experience";

export const app = appBuilder()
  .withProviders(
    provideExperienceData({
      merge: {
        selector: "#home-page",
      },
      type: "oryx-content-text",
      content: { data: { text: "<h1>Home page</h1>" } },
    })
  )
  .create();
```

Selectors use the following syntax:

- select a page with the `#` prefix, e.g. `#home-page`
- select a component globally by `id`, e.g. `my-composition`
- select components by `id` or `tag`, e.g. `oryx-product-title`
- chain selects, using the dot notation, e.g. `#home-page.my-composition.oryx-product-title`
- skip parts of the component tree, e.g. `#home-page.oryx-product-title` rather than `#home-page.my-composition.oryx-product-title`

Using this syntax gives you flexibility to apply changes in any page, or to very specific pages.

### Merge strategies

When you do not provide a merge `type`, the selected component is replaced by default. Alternative types can be configured in the `merge.type` field.

The example below shows how to _merge_ content in an existing component.

```ts
import { appBuilder } from "@spryker-oryx/application";
import { provideExperienceData } from "@spryker-oryx/experience";

export const app = appBuilder()
  .withProviders(
    provideExperienceData({
      merge: {
        selector: "site-logo",
        type: "patch",
      },
      content: {
        data: {
          graphic: null,
          image:
            "https://www.coca-colacompany.com/content/dam/company/us/en/the-coca-cola-company-logo.svg",
        },
      },
    })
  )
  .create();
```

The table below gives an overview of the various merge types.

| Strategy            | details                                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `replace` (default) | Replaces the selected element with the given content                                                                                                           |
| `patch`             | Patches the selected component with the given component. This includes both the component options and content. The data is deep merged, expect for arrays.     |
| `before`            | Adds the content before the selected component.                                                                                                                |
| `after`             | Adds the content after the selected component                                                                                                                  |
| `append`            | Adds the content after the last component of the composition components. If the selected component is not a composition, the custom component is not merged.   |
| `prepend`           | Adds the content before the first component of the composition components. If the selected component is not a composition, the custom component is not merged. |
