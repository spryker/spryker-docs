---
title: Cart
last_updated: Jun 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/cart
originalArticleId: bb555f78-4e02-4db8-9c81-af2e6e9425a4
redirect_from:
  - /v6/docs/cart
  - /v6/docs/en/cart
  - /v6/docs/shopping-carts
  - /v6/docs/en/shopping-carts
  - /v6/docs/shop-guide-shopping-carts-reference-information
  - /v6/docs/en/shop-guide-shopping-carts-reference-information
---

The *Cart* feature allows your customers to add products to their cart by selecting the desired quantity of a product. Inside the cart, customers can change the quantity of items, switch between different variants of the product, add notes, apply vouchers and remove items. Any changes the customer makes within the cart trigger an automatic sum-recalculation that is immediately applied to the total in the sum. Pre-defined taxes are applied and shown automatically. Additionally, logged-in customers can see and edit their cart from any device.

Any changes the customer makes within the cart trigger an automatic sum-recalculation that is immediately applied to the total in the sum. Pre-defined taxes are applied and shown automatically.

The persistent cart functionality lets logged-in customers store their cart throughout multiple sessions. The Cart feature also ensures that your business rules, such as discounts, taxes or shipping, are applied, based on the customer's final choice of items.

Your customers can place orders faster by adding simple products to cart from the *Category* page. They can add products with one [variant](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html) to cart in just one click, which increases the conversion rate for the simple products and saves your customers' time.

The feature also supports [product groups](/docs/scos/user/features/{{page.version}}/product-groups-feature-overview.html). If simple products are grouped, you can browse these products on the *Category* page and add them to cart at once, without having to go to the *Product Details* page.

In a Spryker shop, the shopping list widget is displayed in the header. With the shopping cart widget, customers can easily create new shopping carts as well as view details about the existing ones by hovering over the cart icon.

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/cart-module-reference-information.html#cart-operations" class="mr-link">Learn about the Cart module</a></li>
                <li><a href="/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/calculation-3-0.html" class="mr-link">Learn about the Calculation module</a></li>
                <li><a href="/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/calculation-data-structure.html" class="mr-link">Learn about calculation data structure</a></li>
                <li><a href="/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/calculator-plugins.html" class="mr-link">Learn about calculation plugins</a></li>
                <li><a href="/docs/scos/user/features/{{page.version}}/cart-feature-overview/cart-notes-overview.html" class="mr-link">Get a general idea of cart notes</a></li>
               <li><a href="/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html" class="mr-link">Manage guest carts via Glue API</a></li>
                <li><a href="/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html" class="mr-link">Manage carts of registered users via Glue API</a></li>
                <li><a href="/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html" class="mr-link">Integrate the Cart geature into your project</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="/docs/scos/user/features/{{page.version}}/cart-feature-overview/cart-notes-overview.html" class="mr-link">Get a general idea of cart notes</a></li>
            </ul>
        </div>
    </div>
</div>
