# Oryx technologies

Oryx is a frontend framework that is designed to help developers build web applications using modern technologies.
When possible and appropriate, Oryx adheres to standards for both technologies and tools.
Oryx strives to minimize the use of build tools and instead utilize the native capabilities of the web, as much as possible.
Oryx aims to use JavaScript during development, but tries avoid the need to run JavaScript in the browser. Wherever possible, HTML and CSS are preferred to render a fast loading experience cross different screen sizes.

We will examine both the deployed technology stack and the technologies utilized for development in order to gain a more comprehensive understanding of the technologies.

## Deployed stack:

### HTML & CSS & JS
HTML, CSS, and JS are considered to be the fundamental and essential set of web technologies used for creating web pages. HTML is responsible for the structure and content of the page, CSS is used for styling and layout, and JS adds interactivity and dynamic behavior to the page. Together, these three technologies form the foundation of modern web development.

### Web Components
Web Components are a set of web platform APIs that allow developers to create custom, reusable, and encapsulated HTML elements.

### Web hosting
Oryx uses Netlify as a hosting provider, which means you can easily find basic boilerplate to deploy your site on Netlify. However, if you choose to use a different hosting provider, there may be limitations on the implementation of SSR. To make it work, you would need to adjust the SSR rendering boilerplate, which is specific to the hosting provider.

### CSR and SSR
Oryx provides both client-side rendered (CSR) and server-side rendered (SSR) versions of websites, so you can choose the option that best fits your needs.

Client-side rendering involves loading a minimal HTML document and then using JavaScript to build the full page in the browser. This approach is great for creating highly dynamic and interactive user interfaces, as it allows for fast, seamless updates without page refreshes. However, it can negatively impact initial load time and SEO, as search engines may have trouble indexing content.

Server-side rendering, on the other hand, involves generating a complete HTML document on the server and then sending it to the browser. This approach provides faster initial load times, better SEO, and improved accessibility. However, it can be more complex to implement and may not be as effective for highly dynamic pages that require frequent updates.

## Development stack:

### HTML
HTML is the backbone of the web. It is the markup language used to create web pages and applications. In Oryx, HTML is used to structure the content and layout of the application. It provides a semantic structure to the page, making it easier to understand and maintain.

### CSS
CSS is a style sheet language used to describe the visual presentation of a document written in HTML. In Oryx, CSS is used to style the components and layout of the application. It allows developers to create a consistent visual style across the application and ensure that it is responsive and accessible.

Oryx uses standard CSS syntax and does not utilize CSS preprocessors or post-processors, such as Sass or PostCSS. 

Also unlike some other CSS methodologies, such as BEM (Block, Element, Modifier), Oryx does not rely on a specific naming convention to structure its CSS classes.

### TypeScript
TypeScript is a superset of JavaScript that adds optional static typing, classes, and interfaces to the language. In Oryx, TypeScript is used to provide type safety and better code organization. It allows developers to catch errors early in the development process and provides better code navigation and refactoring capabilities.

### Web Components
In Oryx, Web Components are used to create reusable UI components that can be used across the application. It allows developers to create complex components with minimal code duplication and provides better code organization and maintainability. At the same time it means Oryx component are compatible with any other frontend framework and can be integrated into almost any web-application.

### Lit
Lit is a lightweight library for creating web components using TypeScript and HTML templates. In Oryx, Lit is used to create reusable and encapsulated UI components that can be easily styled and extended. It provides a simple and intuitive API for creating custom elements and allows developers to write less boilerplate code.

### RxJS
RxJS is a reactive programming library for JavaScript. In Oryx, RxJS is used to handle asynchronous operations. It provides a declarative way to handle events and data streams, making it easier to manage complex data flows and state transitions.
RxJS is predominantly used in the service layer to provide a reactive system that emit new values while you navigate through the (SPA) experience.
RxJS is not a main citizen in the component logic, as we try to hide the reactivity altogether to avoid complexity

### Vite
Vite is a build tool and development server for modern web projects. In Oryx, Vite is used to provide fast and efficient development and build times. It provides an optimized build process and a hot-reloading development server, making it easy to develop and test the application in real-time.

### Storybook
Storybook is an open-source tool for developing UI components in isolation. In Oryx, Storybook is used to create a component library and showcase the different UI components in the application. It provides a simple and intuitive way to develop and test UI components in isolation, making it easier to iterate on them and ensure consistency across the application.


