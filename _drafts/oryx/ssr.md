
## Introduction to SSR

### Why SSR?

Server-Side Rendering (SSR) has grown in popularity due to its ability to boost web application performance and facilitate effective Search Engine Optimization (SEO). SSR operates by delivering pre-rendered HTML from the server (or even CDN) to the client, leading to quicker initial page load times and an enhanced user experience. As a result, it bypasses the need for the client's browser to download, parse, and execute JavaScript before displaying the webpage — a fundamental limitation of Client-Side Rendering (CSR).

### SSR vs. CSR: Understanding the Differences

**Speed & Performance**: With SSR, the browser receives pre-rendered HTML, reducing the time taken to display meaningful content.

**SEO**: SSR is typically more favorable for SEO since search engine crawlers find it easier to index pre-rendered HTML content.

**User Experience**: By delivering pre-rendered content faster, SSR minimizes user waiting time, providing a superior user experience compared to CSR.

**Resource Allocation**: While SSR enhances performance and user experience, it requires more server resources and processing power. CSR lightens server load by offloading rendering to the client, but at the cost of potentially increased load times and less effective SEO.

### Weighing SSR: Pros and Cons

| Benefits of SSR                                                   | Drawbacks of SSR    |
|-------------------------------------------------------------------|---------------------|
| Quicker initial page load times.                                  | Higher server resource usage and processing power. |
| Improved SEO due to pre-rendered HTML.                            | Potential performance challenges with highly interactive web applications. |
| Better user experience due to faster content delivery.            | More complex development and deployment processes. |


## SSR Implementation

### Traditional server-based SSR

Traditional SSR implementation involves rendering the initial HTML content on a server, typically powered by Node.js. Oryx supports this scenario for both development and production builds with `createServer` utility in `@spryker-oryx/application/server` package:

```ts
  import { createServer } from '@spryker-oryx/application/server';

  createServer(config).run();
```

`createServer` utility is using ExpressJS server under the hood and provides a convenient way to configure and run the server and also exposes the ExpressJS server instance for further customization.

### Serverless SSR using Lambda

Serverless SSR, on the other hand, employs on-demand serverless platforms such as AWS Lambda for HTML rendering, eliminating the need for a dedicated server. 

Oryx supports this scenario for both development and production builds with `storefrontHandler` utility in `@spryker-oryx/application/lambda'` package:

```ts
import { storefrontHandler } from '@spryker-oryx/application/lambda';

return (event, context) => storefrontHandler(event, {
    ...context,
    root: 'file:///apps/storefront/functions/ssr/index.js',
    index: '../../client/index.html',
    entry: '../../server/render.js',
    component: '<root-app></root-app>',
});
```

### Caching, CDN

Caching and CDNs are additional layers that can significantly enhance the performance of SSR applications by reducing server load and accelerating content delivery.

**Caching**: Caching acts as a layer on top of rendering. Once the HTML content is rendered, it's cached to swiftly serve repeated requests without the need for re-rendering. Various caching solutions could be used, such as Varnish, Redis, or even service-specific solutions such as Cloudflare's caching services.

**Content Delivery Networks (CDNs)**: CDNs distribute cached content across a network of servers located worldwide. This ensures that users receive content from the nearest server, which significantly improves delivery speed and reduces latency.

In the context of serverless platforms like Netlify, you can leverage Netlify's on-demand builder.
It works as a simple wrapper to Oryx SSR Lambda handler and automatically feed Netlify Edge CDN by building and caching a page when it's requested, thereby reducing the load on the serverless function and improving performance.

```mermaid
sequenceDiagram
  participant User
  participant CDN
  participant SSR Service
  participant Backend
  
  User->>CDN: Request page
    CDN->>SSR Service: Request SSR page
    SSR Service-->>CDN: Cache SSR page
  CDN-->>User: Deliver SSR page
  User->>CDN: Request static assets (CSR)
  CDN-->>User: Deliver static JS assets
  Note over User: Hydration occurs, SPA mode
  User->>Backend: CSR Interacts with backend app
```

## SSR in Oryx

### Configuration

Oryx integrates seamlessly with server environments, offering support for both traditional Node.js server-side rendering (SSR) and serverless architectures, akin to AWS Lambda or Netlify functions.

For Node.js SSR, Oryx leverages ExpressJS, a minimalist web framework for Node.js. By utilizing the `createServer` method, Oryx is capable of spinning up an ExpressJS server configured for SSR out of the box.

Simultaneously, Oryx caters to the increasing demand for serverless architectures. The `storefrontHandler` method enables SSR in AWS Lambda-like environments, providing a flexible solution for serverless deployments.

While both approaches offer sensible configuration tailored to most deployment scenarios, it also exposes a lower-level API, allowing advanced customization to cater to unique project requirements.

### Building with SSR Support

Designed with SSR at its core, Oryx ensures that all components correctly render server-side. This design choice brings about inherent advantages such as rapid initial page load times and boosted SEO, right out of the box.

Additionally, Oryx features mechanisms that further enhance performance by managing the hydration process intelligently.

### Hydration

In the context of SSR, hydration refers to the process where the client-side JavaScript runtime takes over the static HTML sent by the server and turns it into a dynamic Document Object Model (DOM).

In most applications, hydration happens all at once. But Oryx follows a more strategic approach known as "islands architecture". It enables selective hydration of components or "islands" on a need basis, thereby reducing the amount of JavaScript parsed and executed during initial page interaction.

Moreover, Oryx employs a "late hydration" strategy, delaying the hydration process until the user interacts with a component. This ensures that client-side resources are only utilized when absolutely necessary, fostering an efficient and highly responsive user experience.

## Developing with SSR

### SSR Consideration

When developing with SSR, it's important to understand how the SSR process works. SSR involves rendering the initial HTML on the server, which is then sent to the client. This provides faster initial page load times and better SEO. However, because this process can differ from traditional client-side rendering, there are specific considerations and potential pitfalls to keep in mind, such as avoiding direct manipulation of the DOM and being mindful of lifecycle hooks.

### SSR-aware Components

Oryx components are built with SSR in mind. They're designed to render correctly on the server and work with late and partial hydration. However, when building custom components, be aware of the SSR lifecycle and the potential issues that may arise, such as the `unsafeStatic` issue, which can lead to unexpected behavior during the SSR process.

### Decorators

Oryx provides special decorators to address some SSR related challenges:

- The `@hydratable` decorator marks a component for late hydration. This allows the component to render on the server but delays its hydration until it's interacted with on the client. Hydration can be triggered programmatically, or automatically with events.   

- The `@ssrShim` decorator shims some component API in order to make it work on the Server: `toggleAttribute()` and `style` property. 

### Utilities

Oryx also provides utilities to assist with SSR:

- `ssrAwaiter`: This utility manages asynchronous operations during SSR. It's particularly useful when a component depends on asynchronous data. By using `ssrAwaiter`, you can ensure that the server waits for the data before rendering the component. 

- `@subscribe`: This decorator can be used to manage subscriptions during SSR. It solves the problem of missing lifecycle hooks in SSR and ensures that subscriptions are cleaned up properly. However, note that it currently can't be used with the `observe` controller.
