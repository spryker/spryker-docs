---
title: "Oryx components definition"
description: Components are registered in an Oryx application by a definition file
last_updated: Sept 19, 2023
template: concept-topic-template
---

Oryx components can be integrated in different ways. They can be listed in [pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html) and [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html) and used inside other components or content integrated from a third-party CMS.

When a component is rendered for the first time, Oryx resolves the component definition from the registry and loads the associated implementation. With this, components are lazily loaded.

## Create a component definition

To register a [component implementation](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-components/component-implementation.html), you need to provide a component definition. The component definition requires a name and an implementation. The name is used as the web component element name. Definition of a web component consists of two or more words separated by a dash. It is a good practice to prefix components with a project, brand, or company name. For example, Oryx components are prefixed with `oryx-`.

{% info_block infoBox "Update definitions" %}
You can also update an existing component definition. To match an existing definition, you still need to provide a name.
{% endinfo_block %}

The following example shows where a component is registered, providing both the name and implementation.

```ts
import { componentDef } from "@spryker-oryx/utilities";

export const productIdComponent = componentDef({
  name: "oryx-product-id",
  impl: () => import("./id.component").then((m) => m.ProductIdComponent),
});
```

The implementation is imported using the [static import declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). This import binding is used by build systems such as [Vite](https://vitejs.dev/) to create a separate JavaScript chunk during the build. This allows to load the JavaScript chunk upon demand.

## Register a component definition

After you've created a component definition, you need to configure it in the application. The [application orchestrator](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-applications/oryx-application-orchestration/oryx-application-orchestration.html) provides the `withComponents()` API that can be used to register an array of components.

```ts
import { appBuilder } from "@spryker-oryx/application";

export const app = appBuilder().withComponents([
  {
    name: "oryx-product-id",
    impl: () => import("./components/product/id.component"),
  },
]);
```
