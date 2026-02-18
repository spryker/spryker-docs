---
title: Integrate Algolia
description: Learn how to integrate Algolia Search into your Spryker-based projects.
template: howto-guide-template
last_updated: Feb 20, 2026
redirect_from:
  - /docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/configure-algolia.html
  - /docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/disconnect-algolia.html
---

This document explains how to integrate [Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia.html) with your Spryker shop.


## Prerequisites

Install the required module and update the dependencies:

```bash
composer require -W spryker-eco/algolia
```

## Integrate and configure Algolia module

To integrate and configure Algolia, follow the steps described in the module [README.md](https://github.com/spryker-eco/algolia/blob/master/README.md).

## Integrate frontend

To enable CMS page search on the frontend, update `spryker-shop/cms-search-page` to version 1.5 or higher.

If your project is based on an older version than `202507.0-p2`, adjust your Search CMS page templates to the latest changes from Spryker's demo shops:

- [B2C changes](https://github.com/spryker-shop/b2c-demo-shop/pull/793/files)
- [B2C Marketplace changes](https://github.com/spryker-shop/b2c-demo-marketplace/pull/668/files)
- [B2B changes](https://github.com/spryker-shop/b2b-demo-shop/pull/832/files)
- [B2B Marketplace changes](https://github.com/spryker-shop/b2b-demo-marketplace/pull/732/files)

## Verify the integration

{% info_block warningBox "" %}

Verify the following:
- Product and CMS page data are synchronized from your Spryker site to Algolia.
- The frontend displays results from Algolia:
  - On Yves: `/search/suggestion?q=ca` (search box suggestions widget), `/search?q=` (catalog page), `/search/cms?q=` (CMS pages list)
  - Via Glue API: `/catalog-search?q=`, `/catalog-search-suggestions?q=sams`, `/cms-pages?q=`
- In Algolia Dashboard, select the index for product or CMS page for the relevant store and locale. Check the number and order of records for the same search term on your Spryker site.
- In Algolia API logs for the selected index, make sure there is a user-agent header similar to `"Algolia for PHP (3.4.1); PHP (8.3.13); Guzzle (7); Spryker Eco Algolia module"`.

{% endinfo_block %}