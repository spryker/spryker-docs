---
title: "Oryx: Integrate Oryx Components in any web frameworks"
description: Oryx Components are build as web components
last_updated: Sept 12, 2023
template: concept-topic-template
---

Oryx components are _framework agnostic_. This means that components can be used in other web frameworks.

Oryx components are build as [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). Web components are a suite of standard web technologies, widely embraced by browser vendors. The purpose of web components is to provide components in isolation, so that they can easily integrate with other web technologies.

Web components can be built by different frameworks or even with plain html, css and javascript. Oryx components are implemented with [Lit](https://lit.dev). Lit is a lightweight open source framework from Google that can be used to build highly efficient web components. If you do not want to use Lit, you can use your own framework of choice to create web components, see [component customization](/docs/scos/dev/front-end-development/{{page.version}}/oryx/building-components/component-customization.html).

<!--
Web components have a number of specific characteristics that have an impact on the implementation.
- First and foremost, web components use a _shadow dom_. The main purpose of the shadow dom is to avoid leaking component styles to other components. While this is a great feature to have, it might be considered challenging when you like to intentionally manage styles at a central place in the application.
- CSS custom properties (aka CSS variables) will pierce through the shadow DOM and are great to use inside design system components. Oryx uses CSS variables to manage styling through design tokens.
- Not all native events bubble up outside the shadow DOM. Events must be flagged with the _composed_ property to bubble outside the shadow DOM.
- Component styles use the `:host` selector as a root level selector for the component.  -->

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
