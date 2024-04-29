---
title: Release notes 202212.0
description: Release notes for the Spryker SCOS release 202212.0
last_updated: Dec 14, 2022
template: concept-topic-template
redirect_from:
  - /docs/marketplace/user/intro-to-spryker-marketplace/release-notes-202212.0/release-notes-202212.0.html
  - /docs/marketplace/user/intro-to-spryker-marketplace/release-notes/release-notes-202212.0/release-notes-202212.0.html
  - /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202212.0/release-notes-202212.0.html

---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business-level description of new features and enhancements.

For information about installing the Spryker Commerce OS, see [Getting started guide](/docs/dg/dev/development-getting-started-guide.html).

## Spryker Commerce OS

This section describes the new features released for Spryker Commerce OS.

### Configurable Products <span class="inline-img">![feature](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/feature.png)</span>

Spryker has recently extended the range of functionalities for Configurable Products. Customers can now save configurable products in their shopping list and wishlist, where they can also finalize or change the configuration of these products.

Configurable Products are useful for items with a range of customizable options. For example, when buying a t-shirt from your online store, customers can choose the size, material, and color or even add their name or logo to the product. If you are selling services, Configurable Products let customers select a preferred time and date for the delivery of that service.

Customers can access a standalone configurator page and choose from various available product options based on their preferences. Depending on the configuration choices, the product price is adjusted accordingly.

<iframe width="960" height="720" src="https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/features/configurable-product-feature-overview/configurable-product-on-the-storefront.mp4" frameborder="0" allowfullscreen></iframe>

Configured Products can be saved, accessed, and configured again in carts or from the product details page. Customers can also easily reorder past purchases. Configurable Products can also be part of a [Request For Quote (RFQ)](/docs/pbc/all/request-for-quote/{{site.version}}/request-for-quote.html)—Spryker's powerful Quotation and Management feature can overwrite all the automatically calculated prices from the Configurable Product tool.

**Business benefit**: Configurable Products maximize customer satisfaction through product personalization and by providing a robust customer self-service experience. This also adds value to your business by reducing the lead times Sales teams would previously have to dedicate to finalizing product configurations with customers.

#### Documentation

* Technical prerequisites: [Product Configuration feature integration](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-configuration-feature.html)
* [Configurable Product feature overview](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html)

### Localization improvements <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Adapting your offerings to your customers' needs and locales is crucial for providing a superior user experience and ultimately boosting conversion rates. To facilitate this, we've improved the number formatting for any locale. Based on their locale, your customers in the Storefront and your company users in the Back Office will be shown the number format they expect to see. Look at the following example with a product price:

| LOCALE | PRODUCT PRICE |
|---|---|
| de_DE | 1.456,78 |
| en_US | 1,456.78 |

#### Number formatting in the Storefront

For an effortless shopping experience, the localized number formatting is available throughout the Storefront for any user locale. Whether it is a catalog, product details page, cart, checkout, or customer account, your customers and guests can now enjoy their known number format. This helps to avoid any confusion about pricing or quantities.

##### Documentation

[HowTo: Add support for number formatting in the Storefront](/docs/pbc/all/miscellaneous/{{site.version}}/spryker-core-feature-overview/howto-add-support-for-number-formatting-in-the-storefront.html#prerequisites)


#### Number formatting in the Back Office
Efficiency and accuracy are essential when working in the Back Office. Increasing the efficiency of your company users in any locale, locale-based number formats are available in all relevant places throughout the Back Office. Whether it's prices, quantities, or stocks: your company users can stay focused on their tasks while enjoying the number format they are familiar with.

##### Documentation

[HowTo: Add support of number formatting in the Back Office](/docs/pbc/all/back-office/{{site.version}}/install-and-upgrade/install-the-back-office-number-formatting.html)


## Spryker Glue API

We continue to add support for new Storefront APIs.

### Update cart totals based on delivery method <span class="inline-img">![improvement](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/releases/release-notes/improvement.png)</span>

Spryker Glue API updates the total order price after a delivery method is selected or changed in the checkout flow.

It lets your customers always see the accurate price they must pay for the entire order. As a benefit, you can have fewer abandoned carts and improve your conversion rate.

#### Documentation

* [Submit checkout data](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/manage-using-glue-api/check-out/glue-api-submit-checkout-data.html)

* Technical prerequisites:
  * [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)
  * [Install the Checkout Glue API](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html)
  * [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html)
