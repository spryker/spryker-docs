---
title: Release notes 202212.0
description: Release notes for the Spryker SCOS release 202212.0
last_updated: Dec 14, 2022
template: concept-topic-template
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and enhancements.

For information about installing the Spryker Commerce OS, see [Getting started guide](https://documentation.spryker.com/docs/dev-getting-started).

## Configurable Products

Spryker has recently extended the range of functionalities for Configurable Products. Customers can now save configurable products in their shopping list and wishlist, where they can also finalize or change the configuration of these products.

Configurable Products are useful for items with a range of customizable options. For example, when buying a t-shirt from your online store, customers can choose the size, material, and color or even add their name or logo to the product. If you are selling services, Configurable Products let customers select a preferred time and date for the delivery of that service.

Customers can access a standalone configurator page and choose from various available product options based on their preferences. Depending on the configuration choices, the product price is adjusted accordingly.

![configurable-product-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Product/Configurable+Product+feature+overview/configurable-product-on-the-storefront.gif)

Configured Products can be saved, accessed, and configured again in Carts or from a product details page. Customers can also easily reorder past purchases. Configurable Products can also be part of a [Request For Quote (RFQ)](/docs/pbc/all/request-for-quote/request-for-quote.html)—Spryker's powerful Quotation and Management feature can overwrite all automatically calculated prices from the Configurable Product tool.

**Business Benefit**: Configurable Products maximize customer satisfaction through product personalization and by providing a robust customer self-service experience. This also adds value to your business by reducing the lead times Sales teams would have previously dedicated to finalizing product configurations with customers.

**Labels**: feature

Learn more: [Configurable Product feature overview](/docs/scos/user/features/202204.0/configurable-product-feature-overview.html)

**Technical Prerequisites**: [Product Configuration feature integration](/docs/scos/dev/feature-integration-guides/202212.0/product-configuration-feature-integration.html)

## Localization improvements

Adapting your offerings to your customers' needs and customs is crucial for providing a superior user experience and ultimately boosting conversion rates. To facilitate this, we improved the number formatting in this release for any locale. Based on the locale and browser language setting, your customers in the Storefront and your company users in the Back Office are shown the number format they expect to see. Look at the following example with a product price:

| LOCALE | PRODUCT PRICE |
|---|---|
| de_DE | 123.456,78 |
| en_US | 123,456.78 |

**Labels**: improvement

## Number formatting in Storefront

https://spryker.atlassian.net/browse/CC-13275

Allowing for an effortless shopping experience, the localized number formatting is available throughout the Storefront for any user locale. Whether it is a catalog, product details page, cart, checkout, or customer account, your customers and guests can now enjoy their known number format avoiding any confusion about pricing or quantities.

**Technical Prerequisites**: [HowTo: Add support for number formatting in the Storefront](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/data-imports/howto-add-support-for-number-formatting-in-the-storefront.html#prerequisites)


## Number formatting in Back Office

https://spryker.atlassian.net/browse/CC-13273 

Efficiency and accuracy are essential when working in the Back Office. Letting you increase the efficiency of your company users in any locale, locale-based number formats are available in all relevant places throughout the Back Office. Whether it's prices, quantities, or stocks: Your company users can stay focused on their tasks while enjoying the number format they are familiar with.

**Technical Prerequisites:** [HowTo: Add support of number formatting in the Back Office](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-add-support-of-number-formatting-in-the-back-office.html#prerequisites)

 
