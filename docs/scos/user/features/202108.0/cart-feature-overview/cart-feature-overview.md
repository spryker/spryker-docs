---
title: Cart
last_updated: Jul 20, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/cart
originalArticleId: eb211809-3be4-4b8a-bf28-a2c79140b11c
redirect_from:
  - /2021080/docs/cart
  - /2021080/docs/en/cart
  - /docs/cart
  - /docs/en/cart
  - /2021080/docs/shop-guide-shopping-carts-reference-information
  - /2021080/docs/en/shop-guide-shopping-carts-reference-information
  - /docs/shop-guide-shopping-carts-reference-information
  - /docs/en/shop-guide-shopping-carts-reference-information

---

The *Cart* feature allows your customers to add products to their cart by selecting the desired quantity of a product. Inside the cart, customers can change the quantity of items, switch between different variants of the product, add notes, apply vouchers and remove items.

Any changes the customer makes within the cart trigger an automatic sum-recalculation that is immediately applied to the total in the sum. Pre-defined taxes are applied and shown automatically. Additionally, logged-in customers can see and edit their cart from any device.  

The persistent cart functionality lets authenticated customers store their cart throughout multiple sessions. The Cart feature also ensures that your business rules, such as discounts, taxes, or shipping, are applied, based on the customers' final choice of items.

Your customers can place orders faster by adding simple products to cart from the *Category* page. They can add products with one [product variant](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html) to cart with one click.

The feature supports [product groups](/docs/scos/user/features/{{page.version}}/product-groups-feature-overview.html). If simple products are grouped, you can browse and add these products to cart from the *Category* page.

In a Spryker shop, the shopping cart widget is displayed in the header. With the widget, customers can easily create new shopping carts and view the existing ones by hovering over the cart icon.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Cart Notes](/docs/scos/user/features/{{page.version}}/cart-feature-overview/cart-notes-overview.html)  |
| [Get a general idea of Cart Widget](/docs/scos/user/features/{{page.version}}/cart-feature-overview/cart-widget-overview.html)  |
| [Get e general idea of Quick Order from the Catalog Page](/docs/scos/user/features/{{page.version}}/cart-feature-overview/quick-order-from-the-catalog-page-overview.html)   |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Cart feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/cart-feature-walkthrough.html) for developers.

{% endinfo_block %}
