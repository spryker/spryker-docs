---
title: "Oryx: Favicons"
description: 
last_updated: January 11, 2024
template: concept-topic-template
---

Favicons, short for "favorite icons", are small, iconic images that represent a website or web application. They are typically displayed in the browser's address bar, tabs, and bookmarks. Creating a favicon involves designing an image that effectively conveys the identity of the web application in a small, recognizable format. Most brands use their logo or a variation of the logo in the favicon. The challenging part is often the limited available size. 

## Technical format

(Fav)icons can be created in different technical formats, such as `png`, `ico`, `gif` or `svg`. It is recommended to create a favicon in SVG format. SVG based favicons tend to be lighter in file size and can be used for different sizes. SVG can also natively manage light and dark mode variations. 

The various demo applications that are provided use the Spryker logo as a reference favicon. The logo is provided in the resource package as an SVG icon and supports dark and light mode as part of the SVG:

```html
<svg xmlns="http://www.w3.org/2000/svg">
    <style>
        @media (prefers-color-scheme: light) { 
            g { 
                fill: var(--oryx-fill, currentcolor); 
            }
        }
        @media (prefers-color-scheme: dark) { 
            g { 
                fill: var(--oryx-fill, white); 
            }
        }
    </style>
    <g>
        ...
    </g>
</svg>
```

The logo is referenced from a file. While favicons can be rendered inline in the meta data, as a base64 SVG, it is only recommended for a simple vector shape. Most logos will generate a large string in base64 and increases every (SSR rendered) page significantly. In case of a dark mode variation, it will be even worse. Moreover, a base64 based favicon cannot be cached and reused. 

## Meta tags

Favicons can be added to a web page in different ways. Oryx prefers to add them in the header of the html. While dark mode is supported inline in the SVG, somehow browsers won't automatically rerender the favicon when the device color mode is changing. Therefore, the favicon is added twice in the html. This will cause a correct rerendering of the light vs dark mode favicon. 

```html
<link rel="icon" href="/public/logo.svg">
<link rel="icon" href="/public/logo.svg" media="(prefers-color-scheme: dark)">
```

Given that the same SVG is referenced, there's no overhead on downloading the file twice. 

### Provide your custom favicons

The [boilerplate](/docs/scos/dev/front-end-development/{{page.version}}/oryx/getting-started/oryx-boilerplate.html) of Oryx is very light and does not have hardcoded meta tags in the index.html. The icons are added through the `StorefrontMetaInitializer`, which you can override when needed.

Oryx provides a `StorefrontMetaInitializer` that is used to add global elements to the page header, such as a link to a font, body styles and meta tags. The meta tags include the logo icon. 

You can add custom elements to the page by overriding the meta service:

```ts
import { StorefrontMetaInitializer, ElementDefinition } from '@spryker-oryx/presets';

export class CustomStorefrontMetaInitializer extends StorefrontMetaInitializer {
  
  initialize(): void {
    super.initialize(); 
    this.metaService?.add(
        // array with custom element definitions (ElementDefinition)
    );
  }
}
```
The `PageMetaService` is used for both global meta definitions as well as individual pages such as a meta tags (e.g. robots) or links (e.g. canonical URL). 

You can of course neglect the page service implementation and add the meta tags in your custom index.html file. The main reason for Oryx to not do this, is that favicons, like anything in Oryx, can be provided dynamically. Favicons could be data driven, e.g. different per brand. 