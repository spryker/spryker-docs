---
title: Customizing HTTP headers in AJAX requests
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-customize-http-headers-in-ajax-request
originalArticleId: 5c93f57b-4df4-40be-a588-4f288d94137b
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-customize-http-headers-in-ajax-request.html
---

The `XMLHttpRequest` method `setRequestHeader()` sets the value of an HTTP request header. When using `setRequestHeader()`, call it after calling `open()`, but before `send()`. If this method is called several times with the same header, the values are merged into a single request header.

To add custom headers to `ajax-provider.ts`, add `this.headers.forEach((value: string, key: string) => this.xhr.setRequestHeader(key, value));` into the promise of the `fetch` method.

Example:

```ts
this.ajaxProvider.headers.set('Accept', 'application/json'
);.
```
