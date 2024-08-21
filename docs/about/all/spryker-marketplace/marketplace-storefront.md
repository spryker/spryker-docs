---
title: Marketplace Storefront
description: This document describes the peculiarities of the Marketplace Storefront application.
template: concept-topic-template
last_updated: Sep 25, 2023
redirect_from:
  - /docs/marketplace/user/intro-to-spryker-marketplace/marketplace-storefront.html
  - /docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-storefront.html

---

*Marketplace Storefront* is a web application designed for the [marketplace business model](/docs/about/all/spryker-marketplace/marketplace-concept.html). Based on the regular Storefront, it supports all [Spryker Commerce OS](/docs/about/all/about-spryker.html) features. Marketplace functionality lets buyers browse for products and view and purchase them across different merchants.

In most sections of the Marketplace Storefront, customers can see who the seller of a product or offer is.

## Catalog and Search pages

On the **Catalog** and **Search** pages, the left-side navigation menu contains the **Merchant** filter. Customers can select one or more merchants from which to view products or offers.

![Catalog and Search pages](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/catalog-and-search-pages.png)

If searching by merchant name in the search field, products and offers of the relevant merchant are displayed in the search suggestions and search results.

## Product Details pages

On the **Product Details** page, the **Sold by** section contains the [marketplace products](/docs/pbc/all/product-information-management/{{site.version}}/marketplace/marketplace-product-feature-overview.html) and the [offers](/docs/pbc/all/offer-management/{{site.version}}/marketplace/marketplace-product-offer-feature-overview.html) from other merchants for that product. Each entry has a price and a link to the respective [merchant's profile page](#merchant-profiles).

![Product Details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/product-details-page.png)

In the **Sold by** section, when a customer opens a Product Details page, the product is pre-selected, and they can switch to any other offer. In the list, the pre-selected [marketplace product](/docs/pbc/all/product-information-management/{{site.version}}/marketplace/marketplace-product-feature-overview.html) always appears first, followed by offers in ascending order of price. If the product is not available, but there are offers for it, the cheapest offer is pre-selected.

Sorting of the **Sold by** section is configurable on a project level.

The product price on top of the Product Details page is taken from the selected merchant's product or offer. When a customer selects a product or offer in the **Sold by** section, the page refreshes, showing the selected merchant's price.

## Cart page

On the **Cart** page, a merchant reference is displayed for each product. The merchant names are clickable and lead to the merchant profile pages.

In the **Quick Add to Cart** section, a customer can find and add marketplace products and product offers of a specific merchant by entering a product name or SKU in the search field and selecting the needed product. If there are several merchants selling the selected product, a drop-down with such merchants appears. Then, the customer selects a preferable merchant, enters quantity, and adds the item to the cart.

![Cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/cart-merchant-relations.png)

## Shopping lists page

When a customer creates, opens, or edits a shopping list, they can use the **Quick add to shopping list** section to search marketplace products and product offers and add them to the shopping list. To search for a specific product, the customer enters an SKU or product name in the search field of the section.

![products-and-offers-in-quick-add-to-shipping-list-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/marketplace-storefront.md/products-and-offers-in-quick-add-to-shipping-list.png)

## Quick Order page

On the **Quick Order** page, in the **Merchants** drop-down, customers can select a particular merchant to buy marketplace products and product offers. In this case, when they type in a product name or SKU, a product or offer from only a selected merchant is found. Alternatively, a customer can select the **All Merchants** option to buy from all merchants. If a customer changes the merchant for already selected marketplace products or product offers, some fields may change—for example, **Price**. If a customer selects all merchants, then the marketplace products and product offers of all merchants are found.

![products-and-offers-on-quick-order-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/marketplace-storefront.md/products-and-offers-on-quick-order-page.png)


## Checkout

At the Shipment checkout step, a merchant reference is displayed for each item. The merchant names are clickable and lead to the merchant profile pages.

If a customer is ordering products from multiple merchants, the products are going to be shipped from multiple locations, so the [shipments](/docs/pbc/all/carrier-management/{{site.version}}/marketplace/marketplace-shipment-feature-overview.html) are automatically grouped by merchants.

![Shipment step](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/shipment-step.png)

At the Summary checkout step,  merchant reference is displayed for each product. The merchant names are clickable and lead to the merchant profile pages. If a customer orders products from multiple merchants, the products are automatically grouped by merchants, which also represents the order's shipments.

![Summary step](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/summary-step.png)

### Order Details pages

On the **Order Details** page, a merchant reference is displayed for each product. Merchant names are clickable and lead to merchant profile pages. If a customer orders products from multiple merchants, the products are grouped by merchants, which also represents the order's shipments.

![Order Details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/order-details-page.png)

If a customer clicks **Reorder all**, the items are added to their current cart with merchant references from the order.

## Marketplace returns

On the **Create Return** page, products are grouped by merchants. Merchant names are clickable and lead to the merchant profile pages. A customer can return products from one merchant at a time. After creating a return for the products of one merchant, they can create a return for the products of another merchant from the same order.

![Create Return page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/create-return-page.png)

The **Return Details** page follows the same behavior.

## Marketplace wishlists

When a customer adds a product to a wishlist, the product is added with the merchant relation selected in the **Sold by** section.

On the page of the wishlist, a merchant relation is displayed for each product. Merchant names are clickable and lead to the merchant profile pages.

![Wishlist page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Intro+to+the+Spryker+Marketplace/Marketplace+Storefront/wishlist-page.png)

If, after a product was added to a wishlist, a merchant becomes inactive, the merchant reference is no longer displayed for the product and the customer can't add it to cart. If the merchant becomes active again, the relation is displayed, and the customer can add the product to cart.

If a product in a wishlist is out of stock, an [alternative product](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/alternative-products-feature-overview.html) can be displayed. A merchant reference is displayed for the alternative product. Currently, merchant offers are not supported by alternative products, so only marketplace products can be displayed there.

## Marketplace shopping lists

When a customer adds a product to a shopping list, the product is added with the merchant relation selected in the **Sold by** section.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/About/all/spryker-marketplace/marketplace-storefront.md/add-marketplace-product-and-offer-to-shopping-list.mp4" type="video/mp4">
  </video>
</figure>


## Merchant profiles

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

Customers can access only the profile pages of [active](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#active-merchants) merchants.

For an example, see the [Spryker merchant profile](https://www.de.b2c-marketplace.demo-spryker.com/en/merchant/spryker) in our Marketplace Demo Shop.

## Read next

[Merchant Portal](/docs/about/all/spryker-marketplace/marketplace-storefront.html)
