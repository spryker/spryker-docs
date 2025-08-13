---
title: "Best practices: Promote products with search preferences"
description: Learn how to edit search preferences in the Spryker Back Office using this best practices guide for your Spryker projects.
template: back-office-user-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/merchandising/search-preferences/best-practices-promote-products-with-search-preferences.html
  - /docs/pbc/all/search/202311.0/manage-in-the-back-office/best-practices-promote-products-with-search-preferences.html
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/search-preferences/best-practices-promote-products-with-search-preferences.html
related:
  - title: Search feature overview
    link: docs/pbc/all/search/latest/base-shop/search-feature-overview/search-feature-overview.html
---

By default, customers can search by product names and SKUs. Search preferences enable searching by product attribute values. However, enabling search preferences for a big number of attributes results in a huge list of search results. This document describes how to effectively use search preferences to promote products.

For example, there is a new camera *Supracam focus* which is popular on the market for its video recording properties: geotagging and autofocus. To add the product and search preferences, do the following:

1. Create a *video_recording* product attribute with *Geotagging* and *Autofocus* values. For instructions, see [Create product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).

2. Create the *Supracam focus* abstract product and its variants. See [Creating abstract products and product bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html).

3. Assign the *video_recording* product attribute to the *Supracam focus* product variant. For instructions, see [Assign product attributes to product variants](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/assign-product-attributes-to-product-variants.html) or [Assign product attributes to abstract products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/assign-product-attributes-to-abstract-products-and-product-bundles.html).

You know that customers are very interested in a device with such properties and they might search for products by them.

4. To enable customers to search products by such *Geotagging* and *Autofocus*, define search preferences for the *video_recording* product attribute. Enable all search preferences for the product to appear on top of search results. For instructions, see [Define search preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/define-search-preferences.html).

Now customers can search by *Geotagging* and *Autofocus* and are likely to find the *Supracam focus*. Let's assume that there is an existing product attribute *smartphone_camera* with the same values: *Geotagging* and *Autofocus*. The same search preferences are enabled for this attribute. When customers search by *Geotagging* and *Autofocus*, the *Supracam focus* is not always first in the search results.

To make *Supracam focus* appear first in the search results, you need to disable search preferences for the other product attributes with the same values.

5. Disable the **FULL TEXT BOOSTED** search preference for the *smartphone_camera* product attribute. For instructions, see [Edit search preferences](/docs/pbc/all/search/{{page.version}}/base-shop/manage-in-the-back-office/edit-search-preferences.html).

Now *Supracam focus* is the only product with the *video_recording* attribute you've enabled search preferences for. When customers search for *Geotagging*  or *Autofocus*, the product appears on top of the search results.
