---
title: URL Redirects
originalLink: https://documentation.spryker.com/v2/docs/url-redirects
redirect_from:
  - /v2/docs/url-redirects
  - /v2/docs/en/url-redirects
---

With URL Redirects, you can create content redirects and increase your store's search engine visibility. Redirects can be store-internal or to an external site and can reflect various HTTP status codes. The status code plays a major role for search engine ranking.

* Redirect to internal or external URLs
* Multiple HTTP status codes can be selected
* Redirects for changed product URLs are auto-generated

A URL redirect is a special entity that consists of a source URL (which is provided by the spy_url database table), a target URL and an HTTP status code (stored in spy_url_redirect database table). Redirects are exported to the key-value storage with collectors and are matched with StorageRouter exactly the same way as described in the [URL](/docs/scos/dev/features/201903.0/order-management/url) article. The `\Pyz\Yves\Redirect\Controller\RedirectController` in the Demoshop, sends a redirect response to the target URL with the given status code.

## Manual Redirects
In Zed on the Redirects (link to http://zed.de.demoshop.local/cms/redirect) page it is possible to create custom URL redirects from not yet existing URLs to other internal or external URLs with different status codes.

## Automatic Redirects
When using URL module's public API (`UrlFacade`) to manage URLs, whenever a URL is modified a new URL redirect is automatically created in the background from the old URL to the new one. This helps search engines and other external URLs pointing to the old URL find the content that was displayed there before. Thus, when products, CMS pages, categories and even URL redirects URLs change, their old URL will still live and point to a valid page they used to display.

Since URL redirects are special URLs, whenever a non-redirect entity wants to take control over a URL that was redirected, it will be possible, e.g. redirected URLs can be overtaken by other entities that need those URLs.
