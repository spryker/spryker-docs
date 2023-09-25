---
title: "Integrate Oryx Components in any web frameworks"
description: Oryx Components are build as web components
last_updated: Sept 20, 2023
template: concept-topic-template
---

Oryx components are _framework agnostic_. This means that components can be used in other web frameworks.

Oryx components are build as [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). Web components are a suite of standard web technologies, widely embraced by browser vendors. The purpose of web components is to provide components in isolation, so that they can easily integrate with other web technologies.

## Integrate in other web frameworks

Thanks to the web component based architecture, Oryx components integrate with any web framework. You can integrate Oryx components inside component frameworks, such as [React](https://react.dev/), [Vue.js](https://vuejs.org/), [Angular](https://angular.io/).

You can also integrate Oryx components inside frontend meta frameworks, like [Next.js](https://nextjs.org/), [Nuxt.js](https://nuxt.com/), or [Astro](https://astro.build/).

{% info_block infoBox %}
While the integration of Oryx components is relative straightforward, Spryker does not provide production ready integration boilerplate code.

The integration of the [server side rendering (SSR)](/docs/scos/dev/front-end-development/oryx/oryx-server-side-rendering.html) part might be more complex than you'd expect.
{% endinfo_block %}

## Integrate in Content Management Systems

Oryx can render content from other systems such as headless Content Management Systems (CMS). This is pretty standard approach. A more exciting feature of Oryx is that Oryx components can render inside the content, provided by a CMS.

Whenever rich content, such as markdown, contains Oryx components, the components can render as-is when the content is rendered in Oryx. This allows for rich integrations deeply in the content, for example by rendering a carousel of upsell products in the middle of some storytelling content.

You can use oryx components inside rich content coming from an external CMS. The content will be rendered inside Oryx, but any Oryx components listed inside the content will be rendered transparently. This does not need any integration effort.

The following example shows a markdown file that contains standard markdown plus some Oryx components.

```markdown
## Markdown example with an integrate Oryx Product images

Lorem ipsum dolor sit amet, consectetur adipiscing elit...

<oryx-product-images sku="086_30521602"></oryx-product-images>

Duis aute irure dolor in reprehenderit in voluptate velit...
```

Another nice example show the integration of compositions with layout. In the following example we use the product list component with a configuration to render it in a carousel.

```markdown
## Markdown example with a carousel of products

Lorem ipsum dolor sit amet, consectetur adipiscing elit...

<oryx-product-list layout="carousel"></oryx-product-product-list>

Duis aute irure dolor in reprehenderit in voluptate velit...
```

## Integrate in Spryker Yves

The integration of Oryx components inside Yves is very appealing, especially for customers who want ot gradually migrate their implementation from Yves to Oryx. While the client side rendering of web components is straightforward, the server side rendering requires a node-like application that renders the components. Yves does not provide such infrastructure as a standard feature, but a POC has been conducted to ensure the technical feasibility between Yves and Oryx.
