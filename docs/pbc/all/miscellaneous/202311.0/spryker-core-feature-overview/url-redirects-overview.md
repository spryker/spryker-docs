---
title: URL redirects overview
last_updated: Aug 20, 2021
description: With URL redirects, you can create content redirects and increase your store's search engine visibility
template: concept-topic-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/202005.0/content/redirects/redirects.html
  - /docs/scos/dev/feature-walkthroughs/202108.0/spryker-core-feature-walkthrough/url-redirects-overview.html
  - /docs/scos/dev/feature-walkthroughs/202212.0/spryker-core-feature-walkthrough/url-redirects-overview.html
   /docs/scos/dev/feature-walkthroughs/202204.0/spryker-core-feature-walkthrough/url-redirects-overview.html
---

With the URL redirects, you can create content redirects and increase your store's search engine visibility. Redirects can be store-internal or external and can reflect various HTTP status codes that play a major role in search engine ranking. Besides, redirects for the changed product, CMS pages, categories URLs are auto-generated.
A URL redirect is a special entity that consists of a source URL (which is provided by the `spy_url database` table), a target URL, and an HTTP status code stored in the `spy_url_redirect` database table. Redirects are exported to the key-value storage with collectors and are matched with StorageRouter the same way as described in the [URL](/docs/dg/dev/backend-development/yves/url.html) document. `\Pyz\Yves\Redirect\Controller\RedirectController` in the Demo Shop, sends a redirect response to the target URL with the given status code.

## Manual redirects

In the Back Office, you can create custom URL redirects from not yet existing URLs to other internal or external URLs with different status codes. See [Creating CMS redirects](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/redirects/create-cms-redirects.html) for details.

## Automatic redirects

When using URL module's public API (`UrlFacade`) to manage URLs, whenever a URL is modified, a new URL redirect is automatically created in the background from the old URL. This helps search engines and other external URLs pointing to the old URL find the content that was displayed there before. Thus, when URLs of products, CMS pages, categories, and even URL redirects change, their old URL will still live and point to a valid page they used to display.

Since URL redirects are special URLs, whenever a non-redirect entity wants to take control over a URL that was redirected, it will be possible, so redirected URLs can be overtaken by other entities that need those URLs.
