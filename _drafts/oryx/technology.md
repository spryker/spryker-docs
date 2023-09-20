# Oryx technologies

Oryx is a frontend framework that is designed to help developers build web applications using modern technologies and leveraging (Spryker API)[https://docs.spryker.com/docs/scos/dev/glue-api-guides/202307.0/decoupled-glue-api.html].

Oryx leverage standard technology, frameworks and tools provided by the web platform and the community wherever possible. It emphasizes utilizing the inherent capabilities of the web and minimizing the reliance on build tools. During development, Oryx primarily employs JavaScript but aims to reduce the need for executing JavaScript in the browser. It prioritizes HTML and CSS for delivering a fast-loading experience across various screen sizes.

Furthermore, Oryx is framework-agnostic and can seamlessly integrate into various web frameworks like React and Vue.js. This versatility is achieved through a combination of Web Components for the user interface and vanilla JavaScript for handling business logic.  This approach offers the flexibility to use the entire library, including its components, or to selectively employ specific layers, such as integration logic.

In terms of styling and layout rendering, Oryx adopts a CSS-first approach, considering CSS as the primary method. It recognizes the inherent capabilities of CSS in handling styling and layout tasks without requiring additional JavaScript logic. Oryx endeavors to avoid loading JavaScript on the client side unless necessary, opting instead to load snippets of JavaScript gradually rather than a full JavaScript framework. This approach minimizes the overall JavaScript payload in the Oryx framework.

Below are the technologies employed in the development of Oryx:
- [HTML](#html)
- [CSS](#css)
- [TypeScript](#typescript)
- [Web Components](#web-components)
- [Lit](#lit)
- [RxJS](#rxjs)
- [Vite](#vite)
- [Storybook](#storybook)
- [Web hosting](#web-hosting)


## HTML
HTML is the backbone of the web. It is the markup language used to create web pages and applications. In Oryx, HTML is used to structure the content and layout of the application. It provides a semantic structure to the page, making it easier to understand and maintain. Also Oryx prioritizing accessibility principles ensuring equitable access to information and functionality for all users.

## CSS
CSS is a style sheet language used to describe the visual presentation of a document written in HTML.

Oryx uses standard CSS syntax and does not utilize CSS preprocessors since Oryx does not use a global CSS utility library; instead, we have isolated styles per component and because of that we do not want to load global css utils in each component.

Also unlike some other CSS methodologies, such as BEM (Block, Element, Modifier), Oryx does not rely on a specific naming convention to structure its CSS classes.

## TypeScript
TypeScript is a superset of JavaScript that adds optional static typing, classes, and interfaces to the language. In Oryx, TypeScript is used to provide type safety and better code organization. It allows developers to catch errors early in the development process and provides better code navigation and refactoring capabilities.

## Web Components
In Oryx, Web Components are used to create reusable UI components that can be used across the application. It allows developers to create complex components with minimal code duplication and provides better code organization and maintainability. At the same time it means Oryx component are compatible with any other frontend framework and can be integrated into almost any web-application.

## Lit
Lit is a lightweight library for creating web components using TypeScript and HTML templates. In Oryx, Lit is used to create reusable and encapsulated UI components that can be easily styled and extended. It provides a simple and intuitive API for creating custom elements and allows developers to write less boilerplate code.
You can use Lit to customise Oryx, but you can also use another framework to build web components. Using Lit will give you a few advantages:
- Reuse Component Mixins and controllers.
- Out of the box integration with optimised (reactivity)[https://docs.spryker.com/docs/scos/dev/front-end-development/202212.0/oryx/reactivity/reactivity.html] and partial hydration concepts.
- Out of the box integration with SSR.

## RxJS
RxJS is a reactive programming library for JavaScript. In Oryx, RxJS is used to handle asynchronous operations. It provides a declarative way to handle events and data streams, making it easier to manage complex data flows and state transitions.
RxJS is predominantly used in the service layer to provide a reactive system that emit new values while you navigate through the (SPA) experience.
RxJS is not a main citizen in the component logic, as we try to hide the reactivity altogether to avoid complexity

## Vite
Vite is a build tool and development server for modern web projects. In Oryx, Vite is used to provide fast and efficient development and build times. It provides an optimized build process and a hot-reloading development server, making it easy to develop and test the application in real-time. Oryx is not tightly coupled to Vite, and you can use an alternative build tool and development server if you like. 

## Storybook
Storybook is an open-source tool for developing UI components in isolation. In Oryx, Storybook is used to create a component library and showcase the different UI components in the application. It provides a simple and intuitive way to develop and test UI components in isolation, making it easier to iterate on them and ensure consistency across the application.

## Web hosting
Oryx applications are decoupled applications and can be hosted separately. It is recommended to host Oryx applications at a frontend hosting providing, to benefit from standard features, like: 

- Build process integration: Choose hosting providers with seamless build process integration to streamline updates and deployments.
- HTTP header configuration: Opt for hosting providers that allow flexible configuration of HTTP headers for improved security, caching, and optimizations.
- CDN integration: Look for hosting providers with native CDN integration to boost performance and availability by distributing static assets across a network.
- Rewrites and redirects: Prioritize hosting providers that enable easy configuration of URL rewrites and redirects for managing URL structure and routing.
- Lambda function integration: Select hosting providers that seamlessly integrate with serverless technologies like AWS Lambda to execute custom logic, server-side operations or perform a server-side rendering.

If your Oryx applications requires Consider hosting providers that offer support for [Server-Side Rendering on Oryx](./oryx-server-side-rendering.md) you need to make sure that the right infrastructure is in place at your hosting provider. You can run SSR in a Lambda function or have a long-running server that processes the SSR.

If you have a fairly static application that doesn't require SSR, you could consider a non-frontend hosting provider. 

By considering these capabilities, you can optimize the deployment, performance, and customization options for your Oryx application.
