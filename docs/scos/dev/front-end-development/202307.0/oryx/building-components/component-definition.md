---
title: "Oryx components definition"
description: Components are registered in an Oryx application by a definition file
last_updated: Sept 19, 2023
template: concept-topic-template
---

Oryx components can be used in different ways. They can be configured in [pages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-pages.html) and [compositions](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-pages/oryx-compositions.html), used in components, or integrated in CMS content.

When a component is rendered for the first time, Oryx resolves the component definition from the registry and loads the associated implementation. With this, components are lazily loaded.

## Creating a component definition

To register a [component implementation](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-components/component-implementation.html), you need to provide a component definition. The component definition requires a name and an implementation. The name is used as the web component element name and consists of two or more words separated by a dash. We recommend prefixing component names with a project, brand, or company name. For example, Oryx components are prefixed with `oryx-`.

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

The [dynamic `import()` expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) is used to ensure the component is lazily loaded. The dynamic imports are used by build systems such as [Vite](https://vitejs.dev/) to create a separate JavaScript chunk during the build. This allows to load the JavaScript chunk upon demand.

Lazy loading components is a recommended technique as it will avoid loading all the application components at the start of the application. Components are only loaded when they are used which will therefor increase the performance of the application.

{% info_block warningBox "Warning" %}

Make sure that you do not _statically_ import the component file anywhere in your application, as it will break the lazy loading principals.

{% endinfo_block %}
