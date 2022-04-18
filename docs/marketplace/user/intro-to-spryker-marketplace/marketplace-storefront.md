---
title: Marketplace Storefront
description: This document describes the peculiarities of the Marketplace Storefront application.
template: concept-topic-template
---

*Marketplace Storefront* is a web application designed for the [marketplace business model](/docs/marketplace/user/intro-to-spryker-marketplace/marketplace-concept.html). Based on the regular Storefront, it supports all [Spryker Commerce OS](/docs/scos/user/intro-to-spryker/intro-to-spryker.html) features. Marketplace functionality lets buyers browse for products and view and purchase them across different merchants.

In most sections of the Marketplace Storefront, customers can see who the seller of a product or offer is.

## Catalog and Search pages

On the **Catalog** and **Search** pages, the left-side navigation menu contains the **Merchant** filter. Customers can select one or more merchants from which to view products or offers.

![Catalog and Search pages](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/catalog-and-search-pages.png)

If searching by merchant name in the search field, products and offers of the relevant merchant are displayed in the search suggestions and search results.

## Product Details pages

On the **Product Details** page, the **Sold by** section contains the [marketplace products](/docs/marketplace/user/features/{{site.version}}/marketplace-product-feature-overview.html) and the [offers](/docs/marketplace/user/features/{{site.version}}/marketplace-product-offer-feature-overview.html) from other merchants for that product. Each entry has a price and a link to the respective [merchant's profile page](#merchant-profiles).

![Product Details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/product-details-page.png)

In the **Sold by** section, when a customer opens a Product Details page, the product is pre-selected, and they can switch to any other offer. In the list, the pre-selected [marketplace product](/docs/marketplace/user/features/{{site.version}}/marketplace-product-feature-overview.html) always appears first, followed by offers in ascending order of price. If the product is not available, but there are offers for it, the cheapest offer is pre-selected.

Sorting of the **Sold by** section is configurable on a project level.

The product price on top of the Product Details page is taken from the selected merchant's product or offer. When a customer selects a product or offer in the **Sold by** section, the page refreshes, showing the selected merchant's price.

## Quick Order page

On the **Quick Order** page, in the **Merchants** drop-down, customers can select particular merchant to buy products and offers. ALternatively, they can select the option **All merchant** If they select a specific merchant, in this case, the search by product name or SKU , a product or offer from only a selected merchant is found. If you change the merchant of the added product or offer, some fields may change—for example, Price. If you select all merchants, then the products and offers of all merchants are found.


## Cart page

On the **Cart** page, a merchant reference is displayed for each product. The merchant names are clickable and lead to the merchant profile pages.

![Cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/cart-merchant-relations.png)

A customer can find and add products and offers of a specific merchant in the **Quick Add to Cart** section. In the search field, they enter a product name or SKU and select the needed merchant product or product offer, and if there are several merchants selling this item, a drop-down with such merchants appears. Then, the customer selects a preferable merchant, enters quantity, and adds the item to cart. Note that the drop-down is not visible until the product is selected.

<!-- add a GIF file that represents this process-->


## Checkout

At the Shipment checkout step, a merchant reference is displayed for each item. The merchant names are clickable and lead to the merchant profile pages.


If a customer is ordering products from multiple merchants, the products are going to be shipped from multiple locations, so the [shipments](/docs/marketplace/user/features/{{site.version}}/marketplace-shipment-feature-overview.html) are automatically grouped by merchants.

![Shipment step](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/shipment-step.png)

At the Summary checkout step,  merchant reference is displayed for each product. The merchant names are clickable and lead to the merchant profile pages. If a customer orders products from multiple merchants, the products are automatically grouped by merchants, which also represents the order's shipments.

![Summary step](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/summary-step.png)


### Order Details pages

On the **Order Details** page, a merchant reference is displayed for each product. Merchant names are clickable and lead to merchant profile pages. If a customer orders products from multiple merchants, the products are grouped by merchants, which also represents the order's shipments.

![Order Details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/order-details-page.png)

If a customer clicks **Reorder all**, the items are added to their current cart with merchant references from the order.

### Marketplace returns

On the **Create Return** page, products are grouped by merchants. Merchant names are clickable and lead to the merchant profile pages. A customer can return products from one merchant at a time. After creating a return for the products of one merchant, they can create a return for the products of another merchant from the same order.

![Create Return page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/create-return-page.png)

The **Return Details** page follows the same behavior.


### Marketplace wishlists

When a customer adds a product to a wishlist, the product is added with the merchant relation selected in the **Sold by** section.

On the page of the wishlist, a merchant relation is displayed for each product. Merchant names are clickable and lead to the merchant profile pages.

![Wishlist page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/wishlist-page.png)

If, after a product was added to a wishlist, a merchant becomes inactive, the merchant reference is no longer displayed for the product and the customer can't add it to cart. If the merchant becomes active again, the relation is displayed, and the customer can add the product to cart.

If a product in a wishlist is out of stock, an [alternative product](/docs/scos/user/features/{{site.version}}/alternative-products-feature-overview.html) can be displayed. A merchant reference is displayed for the alternative product. Currently, merchant offers are not supported by alternative products, so only marketplace products can be displayed there.

### Merchant profiles

A merchant profile is a page where all the information about a merchant is located. From all the pages where a Merchant is mentioned, customers can access the merchant profile by selecting the merchant name.

On the **Merchant Profile** page, customers can find the following merchant-specific information:
* Logo
* Banner
* Contact details and address
* Estimated delivery time
* Regular and special opening hours
* Terms and conditions
* Cancellation policy
* Imprint
* Data privacy statement

Customers can access only the profile pages of [active](/docs/marketplace/user/features/{{site.version}}/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#active-merchants) merchants.

For an example, see the [Spryker merchant profile](https://www.de.b2c-marketplace.demo-spryker.com/en/merchant/spryker) in our Marketplace Demo Shop.

## Read next

[Merchant Portal](/docs/marketplace/user/intro-to-spryker-marketplace/marketplace-storefront.html)
