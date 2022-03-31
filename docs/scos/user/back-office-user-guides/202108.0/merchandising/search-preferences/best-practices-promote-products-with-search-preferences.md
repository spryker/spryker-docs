---
title: "Best practices: Promote products with search preferences"
description: Learn how to edit search preferences in the Back Office
template: back-office-user-guide-template
---

By default, customers can search by product names and SKUs. Search preferences enable searching by product attribute values. However, enabling search preferences for a big number of attributes results in a huge list of search results. This document describes how to effectively use search preferences to promote products.

For example, there is a new camera *Supracam focus* which is popular on the market for its video recording properties: geotagging and autofocus. To add the product and search preferences, do the following:

1. Create a *video_recording* product attribute with *Geotagging* and *Autofocus* values. For instructions, see [Creating product attributes](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html).

2. Create the *Supracam focus* abstract product and its variants. See [Creating abstract products and product bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html).

3. Assign the *video_recording* product attribute to the *Supracam focus* product variant. For instructions, see [Assign product attributes to product variants](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/assign-product-attributes-to-product-variants.html) or [Assign product attributes to abstract products](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/assign-product-attributes-to-abstract-products.html).

You know that customers are very interested in a device with such properties and they might search for products by them.

4. To enable customers to search products by such *Geotagging* and *Autofocus*, define search preferences for the *video_recording* product attribute. Enable all search preferences for the product to appear on top of search results. For instructions, see [Define search preferences](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/search-preferences/define-search-preferences.html).

Now customers can search by *Geotagging* and *Autofocus* and are likely to find the *Supracam focus*. Let's assume that there is an existing product attribute *smartphone_camera* with the same values: *Geotagging* and *Autofocus*. The same search preferences are enabled for this attribute. When customers search by *Geotagging* and *Autofocus*, the *Supracam focus* is not always first in the search results.

To make *Supracam focus* appear first in the search results, you need to disable search preferences for the other product attributes with the same values.


5. Disable the **FULL TEXT BOOSTED** search preference for the *smartphone_camera* product attribute. For instructions, see [Edit search preferences](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/search-preferences/edit-search-preferences.html).

Now *Supracam focus* is the only product with the *video_recording* attribute you've enabled search preferences for. When customers search for *Geotagging*  or *Autofocus*, the product appears on top of the search results.
