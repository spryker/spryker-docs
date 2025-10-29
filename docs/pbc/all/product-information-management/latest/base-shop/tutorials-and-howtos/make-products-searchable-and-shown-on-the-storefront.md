---
title: "Make products searchable and shown on the Storefront"
description: Use the guide to learn about the conditions required to make a product searchable in the online store.
last_updated: May 14, 2024
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-make-product-shown-on-frontend-by-url
originalArticleId: c8a71f89-7fea-4bd5-9c50-3f372b8af760
redirect_from:
  - /docs/scos/dev/tutorials/202005.0/howtos/feature-howtos/howto-make-a-product-searchable-and-shown-on-the-storefront.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/tutorials-and-howtos/howto-make-a-product-searchable-and-shown-on-the-storefront.html
related:
  - title: Creating Product Variants
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html
---

The document describes the flow of making a product searchable and displayed on the Storefront.

There are a number of conditions that must be fulfilled to make your product searchable and shown on Yves by URL. Ensure your product meets the following conditions:

- Product abstract is assigned to at least one category in the current store. For information about how to assign products to categories, see the [Category](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/categories/assign-products-to-categories.html) section.
- The product abstract's status is `Active`. To learn how to manage products, including the status change, see the [Products](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-products.html#activating-products) section.
- Product abstract has been marked as searchable in the Back Office. For more details, see the [Products](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html) section.
- Product abstract has at least one product variant and the status is `Active`: an abstract product isn't displayed on Yves unless it has product variants. To learn how to create product variants, [Products](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html).
- Active product variant is available for the current store. To learn how to check products' availability, see the [Availability](/docs/pbc/all/warehouse-management-system/latest/base-shop/manage-in-the-back-office/check-availability-of-products.html) section.
- Product abstract and active variant have a price in the current locale. For more details, see the [Product Prices](/docs/pbc/all/price-management/latest/base-shop/prices-feature-overview/prices-feature-overview.html) section.
- Product abstract has localized attributes for the locales of the current store. For the current locale, see the [Edit product attributes](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/attributes/edit-product-attributes.html) section.
- Product has a URL in at least one locale of the current store. For more details, see [General section of the product abstract](/docs/pbc/all/product-information-management/latest/marketplace/manage-in-the-back-office/products/abstract-products/edit-abstract-products.html#editing-general-settings-of-an-abstract-product).
- Product is assigned to the current store. For more details, see [Product abstract edit General Section](/docs/pbc/all/product-information-management/latest/marketplace/manage-in-the-back-office/products/abstract-products/edit-abstract-products.html#reference-information-editing-general-settings-of-an-abstract-product).

{% info_block infoBox "" %}

Note that changes on the project may affect this list, shortening required steps or adding new ones.

{% endinfo_block %}
