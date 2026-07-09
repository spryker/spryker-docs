---
title: Customizing HTTP headers in AJAX requests
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-customize-http-headers-in-ajax-request.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


The `XMLHttpRequest` method `setRequestHeader()` sets the value of an HTTP request header. When using `setRequestHeader()`, call it after calling `open()`, but before `send()`. If this method is called several times with the same header, the values are merged into a single request header.

To add custom headers to `ajax-provider.ts`, add `this.headers.forEach((value: string, key: string) => this.xhr.setRequestHeader(key, value));` into the promise of the `fetch` method.

Example:

```ts
this.ajaxProvider.headers.set('Accept', 'application/json'
);.
```
