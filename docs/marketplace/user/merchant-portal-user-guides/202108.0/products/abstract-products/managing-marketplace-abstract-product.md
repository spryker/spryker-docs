---
title: Managing marketplace abstract products
last_updated: Aug 11, 2021
description: This document describes how to modify marketplace abstract products in the Merchant Portal.
template: back-office-user-guide-template
---

This document describes how to manage marketplace abstract products in the Merchant Portal.

## Prerequisites

To start working with marketplace abstract products, go to the **Merchant Portal** > **Products**.

This article contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.


## Filtering and sorting marketplace abstract products

The following drop-down menus can be used to filter the marketplace abstract products on the *Products* page:

- Categories where the abstract product belongs
- Visibility (defines whether the product is online or offline)
- Stores where the abstract product is available.

The page refreshes and displays the available options as soon as the filter parameters are selected.

To sort the existing abstract products, select one or more sorting parameters from the drop-down menu on the *Products* page. Choose among the following sort criteria:

- SKU
- Name
- Number of variants
- Visibility status

By default, the table is sorted descendingly by SKU.

## Editing abstract product details

To edit the existing marketplace abstract product:

1. Next to the abstract product, you want to edit, hover over the three dots and click **Manage Product** or just click the line. This takes you to the *[Product name]*, *Abstract Product Details* tab.
2. In the *Name & Description* pane, edit *Name* and *Description* for every locale.
3. In the *Stores* pane, in the drop-down menu select the stores where the product is available.
4. In the *Tax Set* pane, in the drop-down menu, select the necessary tax set.
5. In the *Categories* pane, in the drop-down menu, select the categories where your product belongs.


### Reference information: [Product name] drawer, Abstract Product Details tab

| ATTRIBUTE   | DESCRIPTION  | REQUIRED? |
| ----------- | -------------- | --------- |
| Name        | Name of your product displayed on the Storefront. It is set per locale. | &check;         |
| Description | Description of the product displayed on the Storefront. It is set per locale. |           |
| Stores      | Defines the [stores](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html) the product is available in.<br/>You can select multiple values. |           |
| Price       | In this pane, you can manage prices for your abstract product. See [Managing abstract product prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-prices.html) for more details. |           |
| Tax Set     | The conditions under which a product is going to be taxed.<br/>The values available for selection derive from Taxes > Tax Sets<br/>Only one value can be selected. | &check;         |
| Images      | In this pane, you can manage image sets for your abstract product. See [Managing abstract product image sets](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-image-sets.html) for more details. |           |
| Attributes  | In this pane, you can manage attributes for your product. See [Managing abstract product attributes](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-attributes.html) for more details. |           |
| Categories  | Defines the [categories](/docs/scos/user/features/{{page.version}}/category-management-feature-overview.html) the product is displayed in. |           |
| SEO         | In this pane, you can manage meta information for your product. See [Managing abstract product meta information](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-meta-information.html) for more details. |           |

## Next steps

- [Manage abstract product prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-prices.html)
- [Manage abstract product attributes](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-attributes.html)
- [Manage abstract product image sets](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-image-sets.html)
- [Manage abstract product meta information](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-meta-information.html)
