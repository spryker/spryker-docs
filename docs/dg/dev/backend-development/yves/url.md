---
title: URL
description: The URL module handles dynamic URLs for entities that appear on the frontend (Yves)
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/url
originalArticleId: 0232750c-2ccb-4329-a2f9-62b330431c71
redirect_from:
  - /docs/scos/dev/back-end-development/yves/url.html
---

The URL module handles dynamic URLs for entities that appear on the frontend (Yves). At the moment, Spryker core provides URL handling for products, CMS pages, categories and URL redirects.

The URLs are stored in one database table and each is unique. Spryker OS avoids multiple URLs heading to a single entity, as it leads to a poor SEO support. Only one URL should be active for a single entity, other URLs should be set as URL redirects.

In the Spryker Demo Shop, URLs are exported to the key-value storage (key-value store such as Redis or Valkey) with collectors. Every stored key contains the URL that can be matched with a router and every stored value contains a reference `key` and a `type`.

The `reference_key` contains the key of the entity that was also stored in the key-value storage. The data read from the reference key is exactly the data that will be provided to the controller to handle the request at the end. The `type` is required to determine which controller handles the request (along with the data from the reference key).

The following example shows the value stored under the `kv:de.en_us.url./en/imprint` key which will match the [/en/imprint](http://zed.mysprykershop.com/en/imprint) URL in a Demo Shop.

```js
{
    "reference_key": "de.en_us.resource.page.1",
    "type": "page"
}
```

A router called `\Pyz\Yves\Collector\Plugin\Router\StorageRouter`, matches URLs for Yves requests handled by the URL module. If a requested URL is matched with the `StorageRouter` then it will try to find a `ResourceCreator` that can handle the provided resource type. `ResourceCreator` provides data for the router about the controller that will handle the request.
