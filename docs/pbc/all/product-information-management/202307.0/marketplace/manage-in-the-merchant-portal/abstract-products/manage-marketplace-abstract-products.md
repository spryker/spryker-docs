---
title: Manage marketplace abstract products
last_updated: May 05, 2022
description: This document describes how to modify marketplace abstract products in the Merchant Portal.
template: back-office-user-guide-template
redirect_from:
  - /docs/marketplace/user/merchant-portal-user-guides/202307.0/products/abstract-products/managing-marketplace-abstract-products.html
related:
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html
  - title: Marketplace Inventory Management feature overview
    link: docs/pbc/all/warehouse-management-system/page.version/marketplace/marketplace-inventory-management-feature-overview.html
  - title: Marketplace Product Approval Process feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-approval-process-feature-overview.html
---

This document describes how to manage marketplace abstract products in the Merchant Portal.

## Prerequisites

To start working with marketplace abstract products, go to the **Merchant Portal** > **Products**.

This document contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.


## Filtering and sorting marketplace abstract products

The following drop-down menus can be used to filter the marketplace abstract products on the *Products* page:

- Categories where the abstract product belongs.
- Visibility (defines whether the product is online or offline).
- Stores where the abstract product is available.
- Approval status (defines whether the product is approved or denied by the marketplace administrator).

The page refreshes and displays the available options as soon as the filter parameters are selected.

To sort the existing abstract products, select one or more sorting parameters from the drop-down menu on the *Products* page. Choose among the following sort criteria:

- SKU
- Name
- Number of variants
- Visibility status
- Approval status

By default, the table is sorted descendingly by SKU.

## Editing abstract product details

To edit the existing marketplace abstract product:

1. Next to the abstract product, you want to edit, hover over the three dots and click **Manage Product** or just click the line. This takes you to the *[Product name]*, *Abstract Product Details* tab.
2. In the *Name & Description* pane, edit *Name* and *Description* for every locale.
3. In the *Stores* pane, in the drop-down menu, select the stores where the product is available.
4. In the *Tax Set* pane, in the drop-down menu, select the necessary tax set.
5. In the *Categories* pane, in the drop-down menu, select the categories where your product belongs.
6. Click **Save**.  


### Reference information: [Product name] drawer, Abstract Product Details tab

| ATTRIBUTE   | DESCRIPTION  | REQUIRED |
| ----------- | -------------- | --------- |
| Name        | Name of your product displayed on the Storefront. It is set per locale. | ✓         |
| Description | Description of the product displayed on the Storefront. It is set per locale. |           |
| Stores      | Defines the [stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) the product is available in.<br/>You can select multiple values. |           |
| Price       | In this pane, you can manage prices for your abstract product. See [Managing abstract product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-prices.html) for more details. |           |
| Tax Set     | The conditions under which a product is going to be taxed.<br/>The values available for selection derive from Taxes > Tax Sets<br/>Only one value can be selected. | ✓         |
| Images      | In this pane, you can manage image sets for your abstract product. See [Managing abstract product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-image-sets.html) for more details. |           |
| Attributes  | In this pane, you can manage attributes for your product. See [Managing abstract product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-attributes.html) for more details. |           |
| Categories  | Defines the [categories](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/category-management-feature-overview.html) the product is displayed in. |           |
| SEO         | In this pane, you can manage meta information for your product. See [Managing abstract product meta information](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-meta-information.html) for more details. |           |

## Sending the product for approval

{% info_block warningBox "Warning" %}

You can approve only the [newly created marketplace product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/create-marketplace-abstract-products.html).

{% endinfo_block %}

For the new product to be available on the Storefront, it needs to be approved. To send the product for approval, do the following:

1. Next to the abstract product, you want to send approval for, hover over the three dots and click **Manage Product** or just click the line. This takes you to the *[Product name]* drawer, *Abstract Product Details* tab.
2. In the right top corner of the drawer, click **Send for Approval**.

{% info_block infoBox "Info" %}

This button is only displayed if the product status is *Draft*. To learn more about the product statuses, see, [Marketplace Product Approval feature overview](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/marketplace-product-approval-process-feature-overview.html)

{% endinfo_block %}


## Next steps

- [Manage abstract product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-prices.html)
- [Manage abstract product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-attributes.html)
- [Manage abstract product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-image-sets.html)
- [Manage abstract product meta information](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-meta-information.html)
