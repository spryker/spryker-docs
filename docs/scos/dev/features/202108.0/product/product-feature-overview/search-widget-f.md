---
title: Search widget for concrete products overview
originalLink: https://documentation.spryker.com/2021080/docs/search-widget-for-concrete-products-overview
redirect_from:
  - /2021080/docs/search-widget-for-concrete-products-overview
  - /2021080/docs/en/search-widget-for-concrete-products-overview
---

With the search widget, the customer doesn't need to go to the product details page to add items. Search widget adds a search box to a Shopping cart, Shopping List, and Quick Order Page allowing the users to easily search and add concrete products directly from shopping cart/list pages. The widget includes the search field for concrete products and the quantity field. A shopper can search for products by SKU or concrete Product name. What the customers only have to do is to start typing the Name or the product SKU and the appropriate suggestions will appear in the drop-down. The suggested options enable shoppers to complete the search quickly.

You can add search widget on the Quick order, Shopping List and Shopping Cart pages. Using the widget, the customer only needs to paste the necessary items either by entering the concrete products SKUs or typing their name. The matching product variants are suggested in the drop-down.

Using the search widget, online shoppers are able to find products assigned specifically to the stores the users are in. Also, only products corresponding to user's [currency](https://documentation.spryker.com/docs/multiple-currencies-per-store) and [price mode](https://documentation.spryker.com/docs/net-gross-price) settings are searched for.

Here's an example of what the search widget looks like on:

## Shopping Cart Page
![Shopping cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/shopping-cart-page.png){height="" width=""}

When the customer selects the product they can set the necessary item quantity in the **Quantity** field. If the customer adds a product that has quantity restrictions, these restrictions are automatically adjusted and the item obtains the closest valid quantity.

All the products that are being added to cart are added as separate items to support the **Splittable Order Items** feature. For example, a customer has already 005 SKU product in the quantity of 3 in the cart. When adding another product of the same SKU to cart, the product is not merged but added as a separate item. This way a splittable product can be added to the order as a non-splittable one.

A picture with 2 products of the same SKU added
![Guest shopping cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/guest-shopping-cart.png){height="" width=""}

With the search widget, a customer can always find the items that are available specifically to them as [Product Restriction](https://documentation.spryker.com/docs/product-restrictions-from-merchant-to-buyer-201903) are considered while searching. This means, that if a blacklist rule exists for a customer, the products that are added to that rule will not be displayed in the search results.

{% info_block infoBox %}
You can find more examples of product restriction use cases on the [Restricted Products Behavior](https://documentation.spryker.com/docs/restricted-products-behavior
{% endinfo_block %} page.)

## Shopping List Page

The search widget is available on the shopping list edit page:
![Shopping list page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/shopping-list-page.png){height="" width=""}

{% info_block infoBox %}
In the empty shopping list, the customer can still add products with the help of the search widget.
{% endinfo_block %}
![Search widget demo](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/search-widget-demo.png){height="" width=""}

In comparison with Shopping Cart, for Shopping lists, the quantity that is being added via a search widget is not verified. That means that the customer can add products to a shopping list with any quantity, irrespective of the [quantity restrictions](https://documentation.spryker.com/docs/product-quantity-restrictions) the products may have.

The same works for the [product restriction](https://documentation.spryker.com/docs/product-restrictions-from-merchant-to-buyer-201903) rules: it is impossible to add blacklisted products to a shopping list, the shopper will get "No search results" message in the widget field, and only whitelisted products will be suggested in the search results in case of a whitelist.

## Quick Order Page
The widget allows searching the products on the quick order page too:
![Quick order page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/quick-order-page.png){height="" width=""}

The module relations can be schematically represented in the following way:
![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Search+and+Filter/Search+Widget+for+Concrete+Products+Overview/module-relations.png){height="" width=""}

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/product-feature-integration" class="mr-link">Enable the search widget for concrete products by integrating the Product feature into your project</a></li>
            </ul>
        </div>
    </div>
</div>
