---
title: Standard filters overview
description: Learn about the Standard filters that helps customers to narrow down products they are looking for in your Spryker Cloud Commerce OS Shop.
last_updated: Jul 8, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/standard-filters-overview
originalArticleId: 0b675c4c-6163-4402-82a5-8a9198260fda
redirect_from:
  - /docs/scos/user/features/201811.0/search-feature-overview/standard-filters-overview.html
  - /docs/pbc/all/search/202311.0/search-feature-overview/search-feature-overview/standard-filters-overview.html
  - /docs/scos/dev/feature-walkthroughs/202212.0/search-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/search-feature-walkthrough.html
  - /docs/scos/user/features/202204.0/search-feature-overview/standard-filters-overview.html
---

Ecommerce solutions usually offer a huge product catalog to display products and their variations. To help buyers find the products they are looking for in the catalog, we have the *Standard Filters* feature.

With Standard Filters, you can filter the products according to the specified price range, product ratings, product labels, color, material, or brand.

![Filter Attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Standard+Filters/filter-attributes-b2c.png)

## Filter types

In Spryker Commerce OS, the following filter types exist:

- **Single-select**—lets a user select only one filter option.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/base-shop/search-feature-overview/standard-filters-overview.md/single-select-b2c.mp4" type="video/mp4">
  </video>
</figure>

- **Multi-select**—allows selecting several variants simultaneously.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/base-shop/search-feature-overview/standard-filters-overview.md/multi-select-b2c.mp4" type="video/mp4">
  </video>
</figure>

- **Range**—filters data in the dimension from the maximum and minimum value. In the current implementation of our demo shop, the range filter is applied to the abstract product prices.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/base-shop/search-feature-overview/standard-filters-overview.md/range-b2c.mp4" type="video/mp4">
  </video>
</figure>

Products appropriate for the active filters are displayed in the results.

Filter preferences can be configured in the **Back Office&nbsp;<span aria-label="and then">></span> Search and Filters&nbsp;<span aria-label="and then">></span> Filter Preferences**. Filter options depend on the attributes configured for the products.

## Current constraints

Price Range Filter is not supported with the Merchant Relations, that is why this filter is not included in the B2B demo shop. However, in [the B2C demo shop](/docs/about/all/about-spryker.html#demo-shops), you can still filter the products using the price range filter.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Define filter preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/filter-preferences/define-filter-preferences.html)  |
| [Edit filter preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/filter-preferences/edit-filter-preferences.html)  |
| [Reorder category filters](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/filter-preferences/reorder-filter-preferences.html)  |
