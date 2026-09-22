---
title: "Oryx: Server-side rendering"
description: Get a general idea of server-side rendering
template: concept-topic-template
last_updated: Aug 6, 2026
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/oryx/oryx-server-side-rendering.html
  - /docs/scos/dev/front-end-development/202404.0/oryx/architecture/oryx-server-side-rendering.html

---



Server-side rendering (SSR), including Static Site Generation (SSG) as a variant, has grown in popularity because of its ability to boost web application performance, facilitate effective Search Engine Optimization (SEO), social sharing, and improve Core Web Vitals (CWV). By delivering pre-rendered HTML from the server or even a  content delivery network (CDN) to the client, SSR and SSG lead to quicker initial page load times, improve user experience (UX), and can significantly improve CWV scores. SSG, in particular, pre-renders HTML at build time, resulting in static HTML, CSS, and JavaScript files that can be served directly from a CDN. It is a useful strategy for sites with content that does not change frequently, and can improve performance, scalability, and security.

## Differences between server-side and client-side rendering

- Speed and performance: With server-side rendering (SSR), the browser receives pre-rendered HTML, reducing the time taken to display meaningful content.

- SEO: SSR is typically more favorable for SEO because search engine crawlers find it easier to index pre-rendered HTML content.

- Social media integration: SSR significantly improves integration with social providers like Facebook and Twitter and bots like Slack. It enables the generation of link previews, rich snippets, and thumbnails, enhancing the visibility and appeal of shared content on these platforms.

- User experience (UX): By delivering pre-rendered content faster, SSR minimizes user waiting time, providing a superior user experience compared to client-side rendering (CSR).

- Resource allocation: While SSR enhances performance and user experience, it requires more server resources and processing power. CSR lightens the server load by offloading rendering to the client but at the cost of potentially increased load times and less effective SEO.


## Advantages and disadvantages of SSR

| ADVANTAGES OF SSR                        | DISADVANTAGES of SSR    |
|-------------------------------------------------------------------|---------------------|
| Quicker initial page load time.                                  | Higher server resource usage. |
| Enhanced SEO.                                                     | Higher development and deployment complexity. |
| Improved UX.                                                      | Infrastructure concerns. |
| Better social media integration.                                  | Potential for stale content. |

## Applicability of SSR

While SSR offers numerous benefits, it's not the best fit for every type of application, like the following:

- B2B shops with restricted access: public-facing SEO and quicker initial page load times offered by SSR may not significantly benefit these types of applications.
- Business apps: applications heavily focused on functionality, like a fulfillment app, might not require the SEO or user experience enhancements provided by SSR.
- Instore apps: used in a controlled environment and designed for specific functions, these types of applications might not necessitate the benefits of SSR.


## SSR implementation approaches

The following sections describe the approaches to implementing SSR.

### Traditional server-based SSR

Traditional SSR implementation involves rendering the initial HTML content on a server, typically powered by Node.js.

### Serverless SSR using Lambda

Serverless SSR employs on-demand serverless platforms such as AWS Lambda for HTML rendering, eliminating the need for a dedicated server.

### SSG

SSG is a variant of SSR where the server generates static HTML pages at build time. These pages can be directly served from a CDN, reducing server load and accelerating delivery. This approach is particularly effective for sites where content does not change often. SSG improves load times, scalability, and security.

### Caching and CDNs

Caching and CDNs are additional layers that can significantly improve the performance of SSR applications by reducing server load and accelerating content delivery.

Caching acts as a layer on top of rendering. Once the HTML content is rendered, it's cached to serve repeated requests without the need for rerendering. There are various caching solutions, like Varnish and Redis, or even service-specific solutions, like Cloudflare's caching services.

CDNs distribute cached content across a network of servers located worldwide. This ensures that users receive content from the nearest server, which significantly improves delivery speed and reduces latency.

In the context of serverless platforms like Netlify, you can leverage Netlify's on-demand builder. It works as a simple wrapper to Oryx SSR Lambda handler and automatically feeds Netlify Edge CDN by building and caching a page when it's requested, thereby reducing the load on the serverless function and improving performance.

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-06-12T07:15:22.483Z\&quot; agent=\&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36\&quot; etag=\&quot;5PL9MhWvlsXzqQjL_vJt\&quot; version=\&quot;21.3.6\&quot; type=\&quot;device\&quot;&gt;\n  &lt;diagram name=\&quot;Page-1\&quot; id=\&quot;VroxlxL9XQUKW5ERPp-6\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;954\&quot; dy=\&quot;591\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;827\&quot; pageHeight=\&quot;1169\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-1\&quot; value=\&quot;User\&quot; style=\&quot;shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={&amp;quot;edgeStyle&amp;quot;:&amp;quot;elbowEdgeStyle&amp;quot;,&amp;quot;elbow&amp;quot;:&amp;quot;vertical&amp;quot;,&amp;quot;curved&amp;quot;:0,&amp;quot;rounded&amp;quot;:0};size=65;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;58\&quot; y=\&quot;20\&quot; width=\&quot;150\&quot; height=\&quot;594\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-2\&quot; value=\&quot;CDN\&quot; style=\&quot;shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={&amp;quot;edgeStyle&amp;quot;:&amp;quot;elbowEdgeStyle&amp;quot;,&amp;quot;elbow&amp;quot;:&amp;quot;vertical&amp;quot;,&amp;quot;curved&amp;quot;:0,&amp;quot;rounded&amp;quot;:0};size=65;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;329\&quot; y=\&quot;20\&quot; width=\&quot;150\&quot; height=\&quot;594\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-3\&quot; value=\&quot;SSR Service\&quot; style=\&quot;shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={&amp;quot;edgeStyle&amp;quot;:&amp;quot;elbowEdgeStyle&amp;quot;,&amp;quot;elbow&amp;quot;:&amp;quot;vertical&amp;quot;,&amp;quot;curved&amp;quot;:0,&amp;quot;rounded&amp;quot;:0};size=65;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;533\&quot; y=\&quot;20\&quot; width=\&quot;150\&quot; height=\&quot;594\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-4\&quot; value=\&quot;Backend\&quot; style=\&quot;shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={&amp;quot;edgeStyle&amp;quot;:&amp;quot;elbowEdgeStyle&amp;quot;,&amp;quot;elbow&amp;quot;:&amp;quot;vertical&amp;quot;,&amp;quot;curved&amp;quot;:0,&amp;quot;rounded&amp;quot;:0};size=65;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;733\&quot; y=\&quot;20\&quot; width=\&quot;150\&quot; height=\&quot;594\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-5\&quot; value=\&quot;Request page\&quot; style=\&quot;verticalAlign=bottom;endArrow=block;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;AX3Fh-1gYM9hhE4GoZNF-1\&quot; target=\&quot;AX3Fh-1gYM9hhE4GoZNF-2\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;279\&quot; y=\&quot;123\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-6\&quot; value=\&quot;Request SSR page\&quot; style=\&quot;verticalAlign=bottom;endArrow=block;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;AX3Fh-1gYM9hhE4GoZNF-2\&quot; target=\&quot;AX3Fh-1gYM9hhE4GoZNF-3\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;516\&quot; y=\&quot;171\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-7\&quot; value=\&quot;Cache SSR page\&quot; style=\&quot;verticalAlign=bottom;endArrow=block;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;dashed=1;dashPattern=2 3;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;AX3Fh-1gYM9hhE4GoZNF-3\&quot; target=\&quot;AX3Fh-1gYM9hhE4GoZNF-2\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;516\&quot; y=\&quot;268\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-8\&quot; value=\&quot;Deliver SSR page\&quot; style=\&quot;verticalAlign=bottom;endArrow=block;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;dashed=1;dashPattern=2 3;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;AX3Fh-1gYM9hhE4GoZNF-2\&quot; target=\&quot;AX3Fh-1gYM9hhE4GoZNF-1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;279\&quot; y=\&quot;316\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-9\&quot; value=\&quot;Request static assets (CSR)\&quot; style=\&quot;verticalAlign=bottom;endArrow=block;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;AX3Fh-1gYM9hhE4GoZNF-1\&quot; target=\&quot;AX3Fh-1gYM9hhE4GoZNF-2\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;279\&quot; y=\&quot;364\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-10\&quot; value=\&quot;Deliver static JS assets\&quot; style=\&quot;verticalAlign=bottom;endArrow=block;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;dashed=1;dashPattern=2 3;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;AX3Fh-1gYM9hhE4GoZNF-2\&quot; target=\&quot;AX3Fh-1gYM9hhE4GoZNF-1\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;279\&quot; y=\&quot;412\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-11\&quot; value=\&quot;CSR Interacts with backend app\&quot; style=\&quot;verticalAlign=bottom;endArrow=block;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;AX3Fh-1gYM9hhE4GoZNF-1\&quot; target=\&quot;AX3Fh-1gYM9hhE4GoZNF-4\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;Array as=\&quot;points\&quot;&gt;\n              &lt;mxPoint x=\&quot;481\&quot; y=\&quot;509\&quot; /&gt;\n            &lt;/Array&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-12\&quot; value=\&quot;Slow processing, need for caching\&quot; style=\&quot;fillColor=#ffff88;strokeColor=#9E916F;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;474\&quot; y=\&quot;191\&quot; width=\&quot;269\&quot; height=\&quot;49\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;AX3Fh-1gYM9hhE4GoZNF-13\&quot; value=\&quot;Hydration occurs, SPA mode\&quot; style=\&quot;fillColor=#ffff88;strokeColor=#9E916F;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;20\&quot; y=\&quot;432\&quot; width=\&quot;227\&quot; height=\&quot;49\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>


## Hydration

In the context of SSR, hydration refers to the process where the client-side JavaScript runtime takes over the static HTML sent by the server and turns it into a dynamic Document Object Model (DOM).

In most applications, hydration happens all at once. But Oryx follows a more strategic approach known as the *islands architecture*. It enables selective hydration of components or *islands* on a need basis, thereby reducing the amount of JavaScript parsed and executed during initial page interaction.

Moreover, Oryx employs a *late hydration* strategy, delaying the hydration process until the user interacts with a component. This ensures that client-side resources are only utilized when absolutely necessary, fostering an efficient and highly responsive UX.


## Developing with SSR

The following sections describe the development of applications with SSR support in the Oryx framework.

### SSR consideration

When developing with SSR, it's important to understand how the SSR process works. SSR involves rendering the initial HTML on the server, which is then sent to the client. This provides faster initial page load times and better SEO. However, because this process can differ from traditional client-side rendering, there are specific considerations and potential pitfalls to keep in mind, such as avoiding direct manipulation of the DOM and being mindful of lifecycle hooks.

### SSR configuration

Oryx integrates seamlessly with server environments, offering support for traditional Node.js SSR and serverless architectures, similar to AWS Lambda or Netlify functions.

For Node.js SSR, Oryx leverages ExpressJS, a minimalist web framework for Node.js. By utilizing the `createServer` method, Oryx spins up an ExpressJS server configured for SSR out of the box.

To enable serverless architectures, the `storefrontHandler` method enables SSR in AWS Lambda-like environments.

While both approaches offer sensible configuration tailored to most deployment scenarios, it also exposes a lower-level API, allowing advanced customization to fulfill unique project requirements.

### Building with SSR support

Designed with SSR at its core, Oryx ensures that all components correctly render server-side. This enables quick initial page load times and boosted SEO out of the box.

Also, Oryx features mechanisms that further improve performance by managing the hydration process intelligently.


### SSR-aware components

Oryx components are built with SSR in mind. They're designed to render correctly on the server and work with late and partial hydration. However, when building custom components, be aware of the components' limited lifecycles coverage, which can lead to unexpected behavior during the SSR process.

### Decorators

Oryx provides special decorators to address some SSR-related challenges:

- The `@hydratable` decorator marks a component for late hydration. This allows the component to render on the server but delays its hydration until it's interacted with on the client. Hydration can be triggered programmatically, or automatically with events.

- The `@ssrShim` decorator shims certain parts of the component API to make it work on the server. Specifically, it adjusts how the `toggleAttribute()` function and style property work.

### Utilities

Oryx also provides utilities to assist with SSR:

- `ssrAwaiter`: This utility manages asynchronous operations during SSR. It's particularly useful when a component depends on asynchronous data. By using `ssrAwaiter`, you can ensure that the server waits for the data before rendering the component.

- `@subscribe`: This decorator is used to manage subscriptions during SSR. It solves the problem of missing lifecycle hooks in SSR and ensures that subscriptions are cleaned up properly.
