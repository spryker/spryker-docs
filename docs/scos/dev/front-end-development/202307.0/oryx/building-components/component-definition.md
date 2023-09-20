---
title: "Oryx Components Definition"
description: Components are registered in an Oryx application by a definition file
last_updated: Sept 19, 2023
template: concept-topic-template
---

Oryx components can be integrated in different ways. Components can be listed in [pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html) and [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html) or can be used inside other components or content integrated from a 3rd party CMS.

When a component is rendered for the first time, Oryx resolves the component definition from the registry and loads the associated implementation. With this, components are lazily loaded.

## Create a component definition

To register a [component implementation](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-components/component-implementation.html), you need to provide a component definition. The component definition requires a name and implementation. The name is used as the (web) component element name. Web components require as least to be defined by 2 words, separated by a dash. It is a good practice to prefix your components by a vendor prefix, such as the project, brand or company name. This is why Oryx components are all prefixed with `oryx-`.

{% info_block infoBox "Update definitions" %}
You can also update an existing component definition. To match an existing definition, you'd still need to provide a name.
{% endinfo_block %}

The example below shows an example where a new component is registered, providing both the name and implementation.

```ts
import { componentDef } from "@spryker-oryx/utilities";

export const productIdComponent = componentDef({
  name: "oryx-product-id",
  impl: () => import("./id.component").then((m) => m.ProductIdComponent),
});
```

The implementation is imported using the [static import declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). This import binding is used by build systems such as [Vite](https://vitejs.dev/) to create a separate JavaScript chunk during the build. This allows to load the JavaScript chunk upon demand.

## Register a component definition

When you have created a component definition for your component, you need to configure it in the application. The [application orchestrator](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/oryx-application-orchestration/oryx-application-orchestration.html) provides a `withComponents()` api that can be used to register an array of components.

```ts
import { appBuilder } from "@spryker-oryx/application";

export const app = appBuilder().withComponents([
  {
    name: "oryx-product-id",
    impl: () => import("./components/product/id.component"),
  },
]);
```
