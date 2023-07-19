# Oryx technologies

Oryx is a frontend framework that is designed to help developers build web applications using modern technologies.

Oryx follows technology and tool standards whenever appropriate. It emphasizes utilizing the inherent capabilities of the web and minimizing the reliance on build tools. For instance, it leverages Web Components to the extent possible. During development, Oryx primarily employs JavaScript but aims to reduce the need for executing JavaScript in the browser. It prioritizes HTML and CSS for delivering a fast-loading experience across various screen sizes.

In terms of styling and layout rendering, Oryx adopts a CSS-first approach, considering CSS as the primary method. It recognizes the inherent capabilities of CSS in handling styling and layout tasks without requiring additional JavaScript logic. Oryx endeavors to avoid loading JavaScript on the client side unless necessary, opting instead to load snippets of JavaScript gradually rather than a full JavaScript framework. This approach minimizes the overall JavaScript payload in the Oryx framework.

Below are the technologies employed in the development of Oryx:

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

## RxJS
RxJS is a reactive programming library for JavaScript. In Oryx, RxJS is used to handle asynchronous operations. It provides a declarative way to handle events and data streams, making it easier to manage complex data flows and state transitions.
RxJS is predominantly used in the service layer to provide a reactive system that emit new values while you navigate through the (SPA) experience.
RxJS is not a main citizen in the component logic, as we try to hide the reactivity altogether to avoid complexity

## Vite
Vite is a build tool and development server for modern web projects. In Oryx, Vite is used to provide fast and efficient development and build times. It provides an optimized build process and a hot-reloading development server, making it easy to develop and test the application in real-time. However, you can easily use another build tool if you want. 

## Storybook
Storybook is an open-source tool for developing UI components in isolation. In Oryx, Storybook is used to create a component library and showcase the different UI components in the application. It provides a simple and intuitive way to develop and test UI components in isolation, making it easier to iterate on them and ensure consistency across the application.

## Web hosting
Hosting an Oryx application offers several advantageous capabilities that contribute to an optimized deployment and superior user experience. Here are the key features to consider:

- Build process integration: Choose hosting providers with seamless build process integration to streamline updates and deployments.
- HTTP header configuration: Opt for hosting providers that allow flexible configuration of HTTP headers for improved security, caching, and optimizations.
- CDN integration: Look for hosting providers with native CDN integration to boost performance and availability by distributing static assets across a network.
- Rewrites and redirects: Prioritize hosting providers that enable easy configuration of URL rewrites and redirects for managing URL structure and routing.
- Lambda function integration: Select hosting providers that seamlessly integrate with serverless technologies like AWS Lambda to execute custom logic or server-side operations.
- Consider hosting providers that offer support for [Server-Side Rendering on Oryx](./oryx-server-side-rendering.md). SSR enables dynamic content generation on the server, delivering pre-rendered pages to clients for improved performance, SEO-friendliness, and enhanced user experience.

By considering these capabilities, you can optimize the deployment, performance, and customization options for your Oryx application.
