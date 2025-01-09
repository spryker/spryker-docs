---
title: Gift Cards
description: This document describes the general concepts of gift cards, how to purchase and redeem them, as well as various use case scenarios.
last_updated: Aug 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/gift-cards-feature-overview
originalArticleId: 942e081b-6312-483d-bc93-761af98f1f44
redirect_from:
  - /docs/scos/user/features/202009.0/gift-cards-feature-overview.html
  - /docs/scos/user/features/202200.0/gift-cards-feature-overview.html
  - /docs/scos/user/features/202311.0/gift-cards-feature-overview.html  
  - /docs/scos/dev/feature-walkthroughs/202311.0/gift-cards-feature-walkthrough.html
  - /docs/pbc/all/gift-cards/202204.0/gift-cards.html
---

The _Gift Cards_ capability lets you create a special product type with a chosen value amount. The purchase of a gift card generates an individual code that can then be used as a payment method during checkout.

A gift card is a prepaid certificate which lets its owner purchase products for the gift card’s value.

When paying for orders with a gift card, the gift cards are considered as an additional payment method. You can use either their full balance, or part of the total gift card's value. In the latter case, the remaining value is stored as a leftover balance on the original code. You can also use additional gift cards to pay for products. However, gift cards can only be applied for products in the same currency they have been bought with.

{% info_block warningBox %}

Gift cards are sensitive data and can be used to pay orders. Keep in mind that they need to be protected like real money.

{% endinfo_block %}

Gift cards follow the same rules as any product, and are bought as products. They can even be bundled. However, they are purely virtual and do not require shipping. A gift card can be applied as a voucher and redeemed to pay an order. Gift cards have two traits: a product traits and a voucher (+payment method) traits. When a gift card is bought, it's treated like a product. When it's applied, it’s a *voucher* that can be used as a payment method.

Gift cards have variants just like abstract products. For example, a New Year Gift Card can have all the different values—50 Euro and 100 Euro. In this case, the New Year Gift Card would be handled like an abstract product, and 50 Euro and 100 Euro gift cards would be its variants.

When a customer adds a gift card to the cart, they can change a variant and quantity and remove it from the cart, just like any abstract product. However, no discounts are applied to gift card products since the price paid for the gift card must equal the value of the gift card. Even though technically you can have different amounts for a gift card’s price and value (say, the gift card price is 100 Euro, however, the gift card value is 150 Euro), you need to consult your local legislation to make sure it would be legal in your country.
![Gift cards](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Gift+Cards/Gift+Cards+Purchase+and+Redeeming/gift_card.png)

You can't pay a gift card by using another gift card, even if the order contains other products with the gift card. The range of payment methods that can be used to pay for gift cards can also be limited, by filtering payment methods out for the gift card. Payment methods available for gift cards can be specified in the configuration file. By default, the invoice payment method is not available for a gift card, to avoid fraud.

After a customer buys a gift card, they get a code sent to the specified email address.

Once the gift card code has been generated, it becomes a voucher that can be used as a payment method.

The following diagram shows the gift card product-voucher transition workflow:
![Gift card product-voucher transition workflow schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Gift+Cards/Gift+Cards+Purchase+and+Redeeming/GC+product-voucher+transition.png)

When buying a gift card, the shipment method selection step is skipped on Yves. In the background, there is a “noshipment” constant in the app configuration, which can be selected to configure shipment for a specific type of product. In this case, this product is a gift card.


When a customer buys a gift card, you can use the default OMS states for the GiftCardSubprocess to be displayed on the Storefront, or set custom state names so they would make more sense for the Storefront users. For details about how to set the custom state names on the Storefront for refunded orders, see [HowTo: Display custom names for order item states on the Storefront](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/display-custom-names-for-order-item-states-on-the-storefront.html).

## Buying with gift cards

With a gift card code in place, users get an alternative payment method to pay for their orders. The payment workflow with the gift card is as follows:
1. A user adds products to the cart and assumes that they have discounts for the products while also applying a voucher.
2. The *Order subtotal* is calculated: General products’ prices without discounts.
3. The *Order grand total* is calculated: Price including discounts, vouchers, and taxes.
4. The *gift card* is applied: Grand total minus the gift card's value. If the order value is lower or equals the gift card value, the checkout workflow stops here, as the gift card is used to fully pay the order.
5. If the order value is higher than the value of the applied gift, a price to pay is calculated: the remaining sum to be paid using an additional payment method.
6. The Payment method's selection and payment.

Schematically, the order placement process with a gift card is as follows:
![Order placement process schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Gift+Cards/Gift+Cards+Purchase+and+Redeeming/gc_payment_process.png)

In the Back Office, a Back Office user can see whether an order was paid with a gift card or regular payment method. The amount paid with the gift card as well as the amount paid with a regular payment method (if applicable) are shown as well.
![Gift card payment method](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Gift+Cards/Gift+Cards+Purchase+and+Redeeming/gift_card_payment_method.png)

## Gift card value checking strategies

Gift card value checking strategy is the way the gift cards are checked for the value they represent. There are two strategies that can be followed: *Replacement* and *Balance*. Out of the box, The replacement strategy is applied for any gift cards in a Spryker shop. However, which strategy to use can be defined on a project level, by installing a respective module and enabling its plugin.

### Replacement strategy

Replacement means that if after using a gift card it has any remaining balance, a new gift card with a value equal to the remaining balance is issued to the gift card owner. For example, a user has a gift card for 100 Euro but spends just 60 Euro to pay the order. In this case, a new 40 Euro gift card with a new code is sent to the user. The old gift card code is no longer valid.

For this strategy, gift cards have a pattern for code generation. For each gift card code generation, a pattern from the previous gift card is used. For example, if the code X-GC-{number} is used for gift card generation, where {number} is the pattern, the 100 Euro gift card code generated for customers is X-GC-1, and the code generated for the remaining 40 Euro is X-GC-2.

The main advantage of this strategy is that the same gift card code cannot be used twice if the gift card has any remaining balance after a purchase has been made. This can be especially useful if a customer wants another customer to use a part of the value from their gift card. In this case, the initial gift card owner would get an email with the new code for the remaining gift card value.

### Balance strategy

In the case of the Balance strategy, the gift card's purchase history and its balance information are checked. If after paying an order a gift card has any remaining balance, then in contrast to the Replacement strategy, the user does not get a new gift card code with the new gift card value, but the old gift card code is used instead. The remaining gift card value is calculated by the following formula: `Gift Card Value - Value of all orders where it's used`.

With this strategy, a Back Office user will see gift card balance information such as the date when the gift card was used, the customer who used it, the gift card's code, and its spent value.

Even though the Balance strategy is a bit more complicated than Replacement, it provides the shop owner with detailed information about the gift card as well as the purchase history. From the customer’s perspective, this strategy might be a better option if a gift card is used by one person, and it does not make sense to send emails with new codes every time a gift card was used.


## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT |
|---|---|---|---|
| [Install the Gift Cards feature](/docs/pbc/all/gift-cards/{{site.version}}/install-and-upgrade/install-the-gift-cards-feature.html) | [Upgrade the CheckoutPage module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-checkoutpage-module.html) | [Manage gift cards of guest users](/docs/pbc/all/gift-cards/{{site.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-guest-users.html) | [File details: gift_card_abstract_configuration.csv](/docs/pbc/all/gift-cards/{{site.version}}/import-and-export-data/import-file-details-gift-card-abstract-configuration.csv.html) |
| [Enable gift cards](/docs/pbc/all/gift-cards/{{site.version}}/install-and-upgrade/enable-gift-cards.html) |  | [Managing gift cards of registered users](/docs/pbc/all/gift-cards/{{site.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html) | [File details: gift_card_concrete_configuration.csv](/docs/pbc/all/gift-cards/{{site.version}}/import-and-export-data/import-file-details-gift-card-concrete-configuration.csv.html) |
| | | [Retrieve gift cards in guest carts](/docs/pbc/all/gift-cards/{{site.version}}/manage-using-glue-api/glue-api-retrieve-gift-cards-in-guest-carts.html) | |
| | | [Retrieve gift cards in carts of registered users](/docs/pbc/all/gift-cards/{{site.version}}/manage-using-glue-api/glue-api-retrieve-gift-cards-in-carts-of-registered-users.html) | |
