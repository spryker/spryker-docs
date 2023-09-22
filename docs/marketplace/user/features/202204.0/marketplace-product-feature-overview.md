---
title: Marketplace Product feature overview
description: This document contains concept information for the Marketplace Products feature.
template: concept-topic-template
related:
  - title: Creating marketplace abstract product
    link: docs/marketplace/user/merchant-portal-user-guides/page.version/products/abstract-products/creating-marketplace-abstract-product.html
  - title: Managing marketplace abstract product
    link: docs/marketplace/user/merchant-portal-user-guides/page.version/products/abstract-products/managing-marketplace-abstract-product.html
  - title: Creating marketplace concrete product
    link: docs/marketplace/user/merchant-portal-user-guides/page.version/products/concrete-products/creating-marketplace-concrete-product.html
  - title: Managing marketplace concrete product
    link: docs/marketplace/user/merchant-portal-user-guides/page.version/products/concrete-products/managing-marketplace-concrete-product.html
---

In the Marketplace, products that a merchant owns are referred to as *marketplace products*. Besides creating offers for products of other merchants or the ones that the Marketplace administrator suggests, a merchant can also create their own unique products. These products possess the same characteristics the usual abstract and concrete products have, but in addition, every such product has merchant-related information such as merchant reference. Merchants can [create their products in the Merchant Portal](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/creating-marketplace-abstract-product.html) or [import the marketplace products data](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product.csv.html), or merchants manage stock and set prices for their products in the Merchant Portal. For details, see [Managing marketplace abstract products](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product.html).

Merchants can let other merchants create offers for their unique products. This possibility is defined with the help of the `is_shared` parameter of the [marketplace product data importer](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product.csv.html).

## Marketplace products on the Storefront

The marketplace products are displayed on the Storefront when the following conditions are met:

1. The product status is *Active*.
2. The merchant who owns the product is [*Active*](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/merchants/managing-merchants.html#activating-and-deactivating-merchants).
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

On the **Quick Order** page, customers can add products to cart by entering their names or SKUs. Also, in the **Merchants** drop-down, they can specify merchants who they want to buy from. If customers select specific merchants in the **Merchants** drop-down, only products of those merchants are available for selection when they enter **SKU or Name** of the product. Buyers who select the **All Merchants** option can add products from all merchants. If customers change the merchant of the already selected item, some values of its fields may change. For example, the prices of different merchants may vary, so when you change a merchant, the **Price** value may change as well. For information about the Quick Add to Cart feature, see [Quick Add to Cart feature overview](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/quick-add-to-cart-feature-overview.html)

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

Before new marketplace products become visible on the Storefront, they must be [activated either by the merchant](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product.html#activating-and-deactivating-a-concrete-product) in the Merchant Portal or [by the Marketplace administrator in the Back Office](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/products/managing-products/managing-products.html).

A Marketplace administrator can filter the products belonging to certain merchants in the Back Office.

![merchants-switcher-on-products](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product/filter-merchant-productsby-merchant-back-office.gif)

Also, Marketplace administrators can edit products, if needed, and create products when acting as the [main merchant](/docs/marketplace/user/features/{{page.version}}/marketplace-merchant-feature-overview/main-merchant-concept.html).


## Marketplace products in the Merchant Portal

Merchants [create](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/creating-marketplace-concrete-product.html) and [manage their products](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product.html) in the Merchant Portal. They can [define prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product-prices.html), stock, and [attributes](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-attributes.html) for their products.

## Related Business User documents

| MERCHANT PORTAL USER GUIDES  | BACK OFFICE USER GUIDES |
| -------------------- | ----------------------- |
| [Creating marketplace abstract products](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product.html) |  |
| [Creating marketplace concrete products](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/creating-marketplace-concrete-product.html) |  |
| [Managing marketplace abstract products](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product.html) | [Editing abstract products](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/products/abstract-products/editing-abstract-products.html) |
| [Managing marketplace concrete products](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product.html)| [Editing a product variant](/docs/marketplace/user/back-office-user-guides/{{page.version}}/catalog/products/abstract-products/editing-abstract-products.html) |
| [Managing marketplace abstract product prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-prices.html) |  |
| [Managing marketplace concrete product prices](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product-prices.html) |  |
| [Managing marketplace abstract product image sets](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-image-sets.html) |  |
| [Managing marketplace concrete product image sets](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-products-image-sets.html) |  |
| [Managing marketplace abstract product attributes](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-attributes.html) |  |
| [Managing marketplace concrete product attributes](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/concrete-products/managing-marketplace-concrete-product-attributes.html) |  |
| [Managing marketplace abstract product meta information](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/products/abstract-products/managing-marketplace-abstract-product-meta-information.html) |  |


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Products feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-feature-walkthrough.html) for developers.

{% endinfo_block %}
