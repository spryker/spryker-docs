---
title: Frontend performance guidelines
description: Optimize your Spryker Frontend.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/front-end-performance-guidelines
originalArticleId: 1fbe7f78-9c86-4d16-8537-8de11f742f1c
redirect_from:
  - /docs/scos/dev/guidelines/performance-guidelines/front-end-performance-guidelines.html
  - /docs/scos/dev/guidelines/front-end-performance-guidelines.html
  - /docs/scos/dev/tuning-up-performance/202204.0/performance-guidelines.html#frontend-performance
related:
  - title: General performance guidelines
    link: docs/scos/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: Architecture performance guidelines
    link: docs/scos/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
---

This document describes general and Spryker-specific frontend performance guidelines.

## General performance guidelines for frontend

Server configuration:

* HTTP/2
* Cookie-free domain for assets: CSS, JS, Fonts, Images.
* Brotli encoding for textual assets: CSS, JS, SVG. Use gzip as a fallback.
* Expires and ETag response headers.
* Production build mode.  To build production, run `npm run yves:production` and `npm run zed:production`.

Assets optimization:

* Optimize images to reduce their size for network transfer. To optimize project images, run `npm run yves:images-optimization`.
* Optimize fonts, use WOFF 2.0; if possible, with a fallback to WOFF 1.0.
* Remove unused characters from fonts.
* Use lazy loading for images.

HTML optimization:

* If users are very likely to follow a link, apply a pretender: `<link rel="prerender" href="">`.

## Spryker-specific performance guidelines for frontend

General rules:

* Use the `lazy` Webpack directive to register unnecessary components.
* Decrease the number of components on each page to as small as possible.
* Avoid using `querySelectorAll` or at least do not use it in `Document` contexts.
* Detect and resolve `404` errors.

Twig rules:

* Instead of aggregated objects like data, pass separate values into components.
* Move the aggregation logic to the PHP side.
* Avoid global data.
* If you access a property more than once, create a Twig variable using `set`.
