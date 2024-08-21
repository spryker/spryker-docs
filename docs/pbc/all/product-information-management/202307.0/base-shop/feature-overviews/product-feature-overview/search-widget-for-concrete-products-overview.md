---
title: Search widget for concrete products overview
description: Search widget adds lets users easily search and add concrete products directly from shopping cart/list pages.
last_updated: Jul 5, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/search-widget-for-concrete-products-overview
originalArticleId: f3839683-f449-4000-b5cc-616d01453120
redirect_from:
  - /2021080/docs/search-widget-for-concrete-products-overview
  - /2021080/docs/en/search-widget-for-concrete-products-overview
  - /docs/search-widget-for-concrete-products-overview
  - /docs/en/search-widget-for-concrete-products-overview
  - /docs/scos/user/features/201811.0/product-feature-overview/search-widget-for-concrete-products-overview.html
  - /docs/scos/user/features/202307.0/product-feature-overview/search-widget-for-concrete-products-overview.html  
---

With the search widget, the customer doesn't need to go to the product details page to add items. Search widget adds a search box to a Shopping cart, Shopping List, and Quick Order Page allowing the users to easily search and add concrete products directly from shopping cart/list pages. The widget includes the search field for concrete products and the quantity field. A shopper can search for products by SKU or concrete Product name. What the customers only have to do is to start typing the Name or the product SKU and the appropriate suggestions will appear in the drop-down. The suggested options let shoppers complete the search quickly.

You can add a search widget on the Quick Order, Shopping List, and Shopping Cart pages. Using the widget, the customer only needs to paste the necessary items either by entering the concrete products SKUs or typing their name. The matching product variants are suggested in the drop-down.

Using the search widget, online shoppers can find products assigned specifically to the stores the users are in. Also, only products corresponding to user's [currency](/docs/pbc/all/price-management/{{site.version}}/base-shop/extend-and-customize/multiple-currencies-per-store-configuration.html) and [price mode](/docs/pbc/all/price-management/{{site.version}}/base-shop/extend-and-customize/configuration-of-price-modes-and-types.html) settings are searched for.

Here's an example of what the search widget looks like on:

## Shopping Cart page

![Shopping cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/shopping-cart-page.png)

When the customer selects the product they can set the necessary item quantity in the **Quantity** field. If the customer adds a product that has quantity restrictions, these restrictions are automatically adjusted and the item obtains the closest valid quantity.

All the products that are being added to cart are added as separate items to support the **Splittable Order Items** feature. For example, a customer has already 005 SKU product in the quantity of 3 in the cart. When adding another product of the same SKU to cart, the product is not merged but added as a separate item. This way a splittable product can be added to the order as a non-splittable one.

A picture with 2 products of the same SKU added

![Guest shopping cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/guest-shopping-cart.png)

With the search widget, a customer can always find the items that are available specifically to them as [Product Restriction](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/merchant-product-restrictions-feature-overview/merchant-product-restrictions-feature-overview.html) are considered while searching. This means, that if a blacklist rule exists for a customer, the products that are added to that rule will not be displayed in the search results.

{% info_block infoBox %}

You can find more examples of product restriction use cases on the [Restricted Products Behavior](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/merchant-product-restrictions-feature-overview/restricted-products-behavior.html) page.

{% endinfo_block %}

## Shopping List page

The search widget is available on the shopping list edit page:
![Shopping list page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/shopping-list-page.png)

{% info_block infoBox %}

In the empty shopping list, the customer can still add products with the help of the search widget.

{% endinfo_block %}

![Search widget demo](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/search-widget-demo.png)

In comparison with Shopping Cart, for shopping lists, the quantity that is being added by a search widget is not verified. That means that the customer can add products to a shopping list with any quantity, irrespective of the [quantity restrictions](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/non-splittable-products-feature-overview.html) the products may have.

The same works for the [product restriction](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/merchant-product-restrictions-feature-overview/merchant-product-restrictions-feature-overview.html) rules: the shopper can't add blacklisted products to a shopping list. They get "No search results" message in the widget field, and only whitelisted products are suggested in the search results in case of a whitelist.

## Quick Order page

The widget allows searching the products on the quick order page too:

![Quick order page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/quick-order-page.png)
