---
title: Sitemap feature overview
description: Generate SEO-optimized sitemaps for your Spryker apps with customizable entity support, multistore compatibility, and configurable caching intervals.
last_updated: Apr 10, 2025
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/miscellaneous/202505.0/sitemap-feature-overview.html
---


The Sitemap feature generates sitemaps for your Spryker applications to improve SEO by helping search engines index your pages efficiently. The feature is configurable to tailor the sitemap generation to your project's needs.


## Supported entities

The following entities can be included in a sitemap by default:
- Products
- Categories
- Product sets
- CMS pages
- Merchant pages

You can configure more entities to be included on the project level.

## Dynamic Multistore

Sitemaps can be generated for shops with [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/latest/dynamic-multistore.html) enabled.

## Caching interval

To optimize performance, sitemaps are cached, and the cached version is used by search engines. The cached version is updated every 24 hours, and you can configure this time interval.

For instructions on configuring the interval, see [Install the Sitemap feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-sitemap-feature.html).

## Domain verification

The domain name of your website must be verified on the project level to use this feature. For instructions, see [Verify your site ownership](https://support.google.com/webmasters/answer/9008080?hl=en).


## Current constraints

Performance is limited when the number of entities exceeds 100,000 for a single store and locale. As the number of stores and locales increases, performance decreases proportionally.


## Related Developer documents

| INSTALLATION GUIDES |
|---------|
| [Install the Sitemap feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-sitemap-feature.html) |


































