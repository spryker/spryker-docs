---
title: Enabling gift cards
originalLink: https://documentation.spryker.com/v6/docs/enabling-gift-cards
redirect_from:
  - /v6/docs/enabling-gift-cards
  - /v6/docs/en/enabling-gift-cards
---

The Gift Cards feature is shipped with the following modules:

* **GiftCard**: implements the basic functionality of the Gift Cards feature as  well as the Replacement value-checking strategy<!-- add link (https://documentation.spryker.com/capabilities/gift_cards/gift_card_purchase_and_management/gift-cards-purchase-redeeming.htm)-->.

* **GiftCardBalance**: implements gift card Balance value-checking strategy<!--(https://documentation.spryker.com/capabilities/gift_cards/gift_card_purchase_and_management/gift-cards-purchase-redeeming.htm)-->.

* **GiftCardMailConnector**: responsible for sending e-mails on gift cards usage (balance change) as well as gift cards codes delivery.

* **Nopayment**: implements payment methods if the price to pay is fully covered by a gift card.

To enable the gift cards in your project, do the following:

1. Make sure you have the correct versions of the required modules. To automatically update to the latest non-BC breaking versions, run `composer update "spryker/*"`
2. Require the modules in your `composer.json` by running:

```bash
composer require spryker/gift-card:"^1.0.0" spryker/gift-card-balance:"^1.0.0"
spryker/gift-card-mail-connector:"^1.0.0" spryker/nopayment:"^4.0.0"
spryker/product-management:"^0.12.0"
```

3. Enable necessary plugins. See the table below for information on available plugins, where to install them and value checking strategies they are used for.


| Plugin | Description | Where to Install | Strategy |
| --- | --- | --- | --- |
| `GiftCardCalculatorPlugin`  | Splits applicable and non-applicable Gift Cards. Creates payment methods for applicable Gift Cards. |`CalculationDependencyProvider::getQuoteCalculatorPluginStack`  |  - |
| `GiftCardCurrencyMatchDecisionRulePlugin` |Doesn’t allow using a Gift Card with a different currency rather than the one the customer has used while performing the payment.  | `GiftCardDependencyProvider::getDecisionRulePlugins` | - |
| `GiftCardIsActiveDecisionRulePlugin` | Doesn’t allow using inactive Gift Cards. |`GiftCardDependencyProvider::getDecisionRulePlugins`  | - |
| `GiftCardDiscountableItemFilterPlugin` |Restricts using a Gift Card for another Gift Cards in a cart. The plugin filters out Gift Cards from discountable items.  |`DiscountDependencyProvider::getDiscountableItemFilterPlugins`  | -  |
| `GiftCardIsUsedDecisionRulePlugin` | As a part of the replacement strategy, this plugin does not allow using a Gift Card twice. |`GiftCardDependencyProvider::getDecisionRulePlugins`  | Replacement |
| `GiftCardMetadataExpanderPlugin` | Populates Gift Card information when it is in the cart. | `CartDependencyProvider::getExpanderPlugins` | - |
| `GiftCardOrderItemSaverPlugin` | Saves a Gift Card with populated data when an order is placed. | `CheckoutDependencyProvider::getCheckoutOrderSavers` | - |
| `GiftCardOrderSaverPlugin` | Keeps Gift Card as an order payment method. |  `PaymentDependencyProvider::extendPaymentPlugin` with a key `PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS`| - |
| `GiftCardPaymentMethodFilterPlugin` | Now, every payment method is compatible with a Gift Card in the cart. The plugin filters out all incompatible payment methods from available ones during checkout payment methods step. | `PaymentDependencyProvider::getPaymentMethodFilterPlugins` | - |
| `GiftCardPreCheckPlugin` | Confirms that a Gift Card is not used at the moment and that payment method amount assigned to the Gift Card is no more than the Gift Card amount itself. | `PaymentDependencyProvider::extendPaymentPlugin` with a key `PaymentDependencyProvider::CHECKOUT_PRE_CHECK_PLUGINS` | - |
| `GiftCardRecreateValueProviderPlugin` |For replacement: defines a Gift Card leftover. It’s simply a Gift Card amount for this strategy.  | `GiftCardDependencyProvider::getValueProviderPlugin` | Replacement |
| `CreateGiftCardCommandPlugin` |  It is an order management system command to create a Gift Card based on a paid order item (a Gift Card item). |  `OmsDependencyProvider::extendCommandPlugins` | - |
| `ReplaceGiftCardsCommandPlugin` | For placement strategy: creates a new Gift Card based on leftover from the previous one. | `OmsDependencyProvider::extendCommandPlugins` | Replacement |
| `IsGiftCardConditionPlugin` | This plugin is used to define an order management system state machine process routing. | `OmsDependencyProvider::extendConditionPlugins` | - |
| `OnlyGiftCardShipmentMethodFilterPlugin` | Filters out shipment methods that are incompatible with Gift Cards. | `ShipmentDependencyProvider::getMethodFilterPlugins` | - |
| `BalanceCheckerApplicabilityPlugin` | For balance strategy: checks positive balance on a Gift Card. | `GiftCardDependencyProvider::getDecisionRulePlugins` | Balance |
| `BalanceTransactionLogPaymentSaverPlugin` | For balance strategy: persists a Gift Card during a payment processing. | `GiftCardDependencyProvider::getPaymentSaverPlugins` | Balance |
| `GiftCardBalanceValueProviderPlugin` | For balance strategy: provides available Gift Card amount. Gift Card amount equals to logged transactions. | `GiftCardDependencyProvider::getValueProviderPlugin`  | Balance |
| `GiftCardDeliveryMailTypePlugin` | Sends an e-mail about a successfully issued Gift Card to a buyer. | `MailDependencyProvider::MAIL_TYPE_COLLECTION` | - |
| `GiftCardUsageMailTypePlugin` | Sends an e-mail on Gift Card usage to its user. | `MailDependencyProvider::MAIL_TYPE_COLLECTION` | - |
| `ShipGiftCardByEmailCommandPlugin` | An order management system command which triggers Gift Card electronic shipment. |`OmsDependencyProvider::extendCommandPlugins`  | - |
| `NopaymentHandlerPlugin` | A payment method placeholder that is used when an order is paid by only a Gift Card without a real payment method. | `CheckoutDependencyProvider::extendPaymentMethodHandler` | - |
| `NopaymentPreCheckPlugin` | Doesn’t allow placing an order with a price to pay more than 0 with a NoPayment payment method. | `PaymentDependencyProvider::extendPaymentPlugins` with a key `PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS` | - |
| `PriceToPayPaymentMethodFilterPlugin` | Filters payment methods based on cart totals. | `PaymentDependencyProvider::getPaymentMethodFilterPlugins` | - |
| `PaymentFormFilterPlugin` | Each payment method provides its subforms. The plugin filters them out based on an available payment method list. | `CheckoutDependencyProvider::getPaymentFormFilterPlugins` | - |
| `PaymentCalculatorPlugin` | Distributes total prices to payment methods. Calculates price to pay to quote totals. | `CalculationDependencyProvider::getQuoteCalculatorPluginStack` | - |

<!--**See also:**

* [Get a general idea of what the gift cards are and why you need them](https://documentation.spryker.com/capabilities/gift_cards/gift_card_purchase_and_management/gift-card-purchase-management.htm)
* [Learn about the Gift Cards Purchase and Redeeming Process and value checking strategies](https://documentation.spryker.com/capabilities/gift_cards/gift_card_purchase_and_management/gift-cards-purchase-redeeming.htm)
-->
 
<!-- Last review date: Mar 27, 2018 -->

[//]: # (by Denis Turkov)
