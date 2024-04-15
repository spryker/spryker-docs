---
title: Cart feature overview
last_updated: Jul 20, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/cart
originalArticleId: eb211809-3be4-4b8a-bf28-a2c79140b11c
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202005.0/cart-feature-walkthrough/cart-functionality.html
  - /docs/scos/user/features/202009.0/cart-feature-overview/cart-feature-overview.html
  - /docs/scos/user/features/202311.0/cart-feature-overview/cart-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/cart-feature-walkthrough/cart-feature-walkthrough.html
  - /docs/pbc/all/cart-and-checkout/202311.0/cart-feature-overview/cart-feature-overview.html    
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/cart-feature-overview/cart-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/feature-overviews/cart-feature-overview/cart-feature-overview.html
---

The *Cart* feature lets your customers add products to their cart by selecting the preferred quantity of a product. Inside the cart, customers can change the number of items, switch between different variants of the product, add notes, apply vouchers, and remove items.

Any changes the customer makes within the cart trigger an automatic sum-recalculation that is immediately applied to the total in the sum. Predefined taxes are applied and shown automatically. Additionally, logged-in customers can see and edit their cart from any device.  

The persistent cart functionality lets authenticated customers store their cart throughout multiple sessions. The Cart feature also ensures that your business rules, such as discounts, taxes, or shipping, are applied based on the customers' final choice of items.

Your customers can place orders faster by adding simple products to their cart from the **Category** page. They can add products with one [product variant](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) to the cart with one click.

The feature supports [product groups](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/product-groups-feature-overview.html). If simple products are grouped, you can browse and add these products to your cart from the **Category** page.

In a Spryker shop, the shopping cart widget is displayed in the header. With the widget, customers can easily create new shopping carts and view the existing ones by pointing to the cart icon.

## Related Business User documents

|OVERVIEWS|
|---|
| [Cart Notes](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/cart-feature-overview/cart-notes-overview.html)  |
| [Cart Widget](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/cart-feature-overview/cart-widget-overview.html)  |
| [Quick Order from the Catalog Page](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/cart-feature-overview/quick-order-from-the-catalog-page-overview.html)   |

## Related Developer documents

|INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---------| - | ---------|---------|---------|
| [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) | [Upgrade the Cart module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cart-module.html) | [Manage guest carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html) | [HowTo: Define if a cart should be deleted after placing an order](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/tutorials-and-howtos/define-if-carts-are-deleted-after-placing-an-order.html)  | [Calculation 3.0](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/extend-and-customize/calculation-3-0.html) |
| [Install the Cart + Shipment feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-shipment-feature.html) | [Upgrade the CartExtension module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cartextension-module.html) |[Manage carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html) |   | [Calculation data structure](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/extend-and-customize/calculation-data-structure.html) |
| [Install the Cart + Product Bundles feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-product-bundles-feature.html) | [Upgrade the CartPage module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cartpage-module.html) | [Retrieve customer carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-customer-carts.html)  |   |  [Calculator plugins](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/extend-and-customize/calculator-plugins.html) |
| [Install the Persistent Cart + Comments feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-persistent-cart-comments-feature.html) | [Upgrade the CartsRestApi module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cartsrestapi-module.html) | [Manage items in carts of registered users](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html)  |   | [Cart module: Reference information](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/extend-and-customize/cart-module-reference-information.html)  |
| [Install the Cart + Agent Assist feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-agent-assist-feature.html) | [Upgrade the CartVariant module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cartvariant-module.html) |[Manage guest cart items](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-cart-items.html)|  | |
| [Install the Cart + Non-splittable products feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-non-splittable-products-feature.html) | | | |
| [Install the Cart + Product feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-product-feature.html) |  | | |
| [Install the Cart + Product Group feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-product-group-feature.html) | | | |
|  | | | |
| [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html) | | | |
|
