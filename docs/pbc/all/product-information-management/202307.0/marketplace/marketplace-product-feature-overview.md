---
title: Marketplace Product feature overview
description: This document contains concept information for the Marketplace Products feature.
template: concept-topic-template
last_updated: Nov 15, 2023
redirect_from:
  - /docs/marketplace/user/features/202307.0/marketplace-product-feature-overview.html
related:
  - title: Creating marketplace abstract product
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-merchant-portal/abstract-products/create-marketplace-abstract-products.html
  - title: Managing marketplace abstract product
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-products.html
  - title: Creating marketplace concrete product
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-merchant-portal/concrete-products/create-marketplace-concrete-products.html
  - title: Managing marketplace concrete product
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products.html
---

In the Marketplace, products that a merchant owns are referred to as *marketplace products*. Besides creating offers for products of other merchants or the ones that the Marketplace administrator suggests, a merchant can also create their own unique products. These products possess the same characteristics the usual abstract and concrete products have, but in addition, every such product has merchant-related information such as merchant reference. Merchants can [create their products in the Merchant Portal](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/create-marketplace-abstract-products.html) or [import the marketplace products data](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-product.csv.html), or merchants manage stock and set prices for their products in the Merchant Portal. For details, see [Managing marketplace abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-products.html).

Merchants can let other merchants create offers for their unique products. This possibility is defined with the help of the `is_shared` parameter of the [marketplace product data importer](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-product.csv.html).

## Marketplace products on the Storefront

The marketplace products are displayed on the Storefront when the following conditions are met:

1. The product status is *Active*.
2. The merchant who owns the product is [*Active*](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html#activating-and-deactivating-merchants).
3. The product visibility state is *Online*.
4. The product is defined for the current store.
5. The product has stock or is always in stock.
6. The current day is within the range of the product validity dates.

### Marketplace product on the product details page

Marketplace product appears on top of the **Sold by** list together with the product offers from other merchants. For a buyer, it doesn't matter whether they are buying a product offer or a marketplace product; however, in the system, different entities are defined.

Product price on top of the product details page is taken from the marketplace product or the product offer. It depends on the option selected in the **Sold by** field.

![marketplace product on PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product/merchant-product-on-pdp.png)

The marketplace product is also displayed with the **Sold By** field defining the merchant on the following pages:

- Cart page
- Wishlist
- Shipment page of the Checkout
- Summary page of the Checkout
- Order Details of the customer account

### Marketplace product on the Quick Order page

On the **Quick Order** page, customers can add products to cart by entering their names or SKUs. Also, in the **Merchants** drop-down, they can specify merchants who they want to buy from. If customers select specific merchants in the **Merchants** drop-down, only products of those merchants are available for selection when they enter **SKU or Name** of the product. Buyers who select the **All Merchants** option can add products from all merchants. If customers change the merchant of the already selected item, some values of its fields may change. For example, the prices of different merchants may vary, so when you change a merchant, the **Price** value may change as well. For information about the Quick Add to Cart feature, see [Quick Add to Cart feature overview](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/quick-add-to-cart-feature-overview.html)

![quick-order-from-quick-order-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Product+Offer/quick-order-from-quick-order-page.gif)

### Marketplace product on the cart page

On the **Cart** page, a customer can add marketplace products from the **Quick Add to Cart** widget. In the search field of the widget, they enter a product name or SKU and select one of the available options. If there are several merchants selling the selected product, a drop-down with such merchants appears. Then, the customer selects a preferable merchant, enters the quantity, and adds the item to cart.

{% info_block warningBox "" %}

Note that the drop-down with merchants is not visible until the product is selected.

{% endinfo_block %}

![quick-add-to-cart-from-cart-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Product+Offer/quick-add-to-cart-from-cart-page.gif)

### Marketplace product on the shopping list page

On the **Shopping list** page, a customer can add marketplace products to the existing or new shopping list by entering a product's name or SKU in the **Quick Add** section and selecting the desired option. If there are several merchants selling the selected item, a drop-down with available merchants appears. Then, the customer selects a preferable merchant, enters the quantity, and adds the product or offer to the shopping list.

{% info_block warningBox "" %}

Note that the drop-down with merchants is not visible until the product is selected.

{% endinfo_block %}

![quick-add-to-cart-from-shopping-list-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Product+Offer/quick-add-to-cart-from-shopping-list-page.gif)


### Searching and filtering marketplace products

When the merchant name is entered in the catalog search, not only the offers but also the products belonging to this merchant are displayed. By selecting a merchant name in the filter, products from this merchant are also displayed.

![Search for marketplace products](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product/search-for-products-by-name-and-sku.gif)


## Marketplace products in the Back Office

Before new marketplace products become visible on the Storefront, they must be [activated either by the merchant](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products.html#activating-and-deactivating-a-concrete-product) in the Merchant Portal or [by the Marketplace administrator in the Back Office](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/products/manage-products.html).

A Marketplace administrator can filter the products belonging to certain merchants in the Back Office.

![merchants-switcher-on-products](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product/filter-merchant-productsby-merchant-back-office.gif)

Also, Marketplace administrators can edit products, if needed, and create products when acting as the [main merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/main-merchant.html).


## Marketplace products in the Merchant Portal

Merchants [create](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/create-marketplace-concrete-products.html) and [manage their products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products.html) in the Merchant Portal. They can [define prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-prices.html), stock, and [attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-attributes.html) for their products.

## Related Business User documents

| MERCHANT PORTAL USER GUIDES  | BACK OFFICE USER GUIDES |
| -------------------- | ----------------------- |
| [Creating marketplace abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-products.html) |  |
| [Creating marketplace concrete products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/create-marketplace-concrete-products.html) |  |
| [Managing marketplace abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-products.html) | [Editing abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/products/abstract-products/edit-abstract-products.html) |
| [Managing marketplace concrete products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products.html)| [Editing a product variant](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-back-office/products/abstract-products/edit-abstract-products.html) |
| [Managing marketplace abstract product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-prices.html) |  |
| [Managing marketplace concrete product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-prices.html) |  |
| [Managing marketplace abstract product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-image-sets.html) |  |
| [Managing marketplace concrete product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products-image-sets.html) |  |
| [Managing marketplace abstract product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-attributes.html) |  |
| [Managing marketplace concrete product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-attributes.html) |  |
| [Managing marketplace abstract product meta information](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/manage-marketplace-abstract-product-meta-information.html) |  |


## Related Developer documents

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Install the Marketplace Product feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html) | [Retrieve abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-abstract-products.html) | [File details: merchant-product.csv](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-product.csv.html) ||
| [Install the Cart feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-glue-api.html) | [Retrieve concrete products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html) | [File details: product_price.csv](/docs/pbc/all/price-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-product-price.csv.html) ||
| [Install the Marketplace Product + Cart feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-cart-feature.html) | [Retrieve abstract product lists](/docs/pbc/all/content-management-system/{{page.version}}/marketplace/glue-api-retrieve-abstract-products-in-abstract-product-lists.html) |                                                              ||
| [Install the Marketplace Product + Marketplace Product Offer feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-marketplace-product-offer-feature.html) |                                                              |                                                              ||
| [Install the Marketplace Product + Inventory Management feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-inventory-management-feature.html) |                                                              |                                                              ||
| [Install the Marketplace Product + Quick Add to Cart feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-quick-add-to-cart-feature.html) ||||
| [Install the Merchant Portal - Marketplace Product feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-product-feature.html) |                                                              |                                                              ||
| [Install the Merchant Portal - Marketplace Product + Tax feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-product-tax-feature.html) |
