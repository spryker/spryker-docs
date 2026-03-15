---
title: Checkout feature overview
description: The checkout workflow is a multi-step process that can be fullly customized to fit your needs.
last_updated: Nov 24, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/checkout
originalArticleId: 7dcc5635-2a15-410c-9a0b-bc62a13dd3a1
redirect_from:
  - /docs/scos/user/features/202311.0/checkout-feature-overview/checkout-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/checkout-feature-walkthrough.html
  - /docs/pbc/all/cart-and-checkout/202311.0/checkout-feature-overview/checkout-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/checkout-feature-overview/checkout-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202403.0/base-shop/feature-overviews/checkout-feature-overview/checkout-feature-overview.html
---

Offer customers a smooth shopping experience by customizing the checkout workflow. Add, delete, and configure any checkout step, like customer account login, shipment and payment methods, or checkout overview.

The *Checkout* feature lets customers select single or multiple products and add wishlist items to their cart, as well as integrate different carriers and delivery methods.

Control the values of the orders that your customers place by defining order thresholds.

Fulfilling small orders is not always worthwhile for the business because operating costs, time, and effort spent on processing them often overweight the profit gained. In such cases, implementing a minimum threshold might be the solution to prevent orders that are too small from being made. The *[Order Thresholds](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/checkout-feature-overview/order-thresholds-overview.html)* feature provides you with multiple options for defining thresholds. You can define a minimum threshold and disallow placing orders with smaller values or request customers to pay a fee.

Per your business requirements, you can also set up a maximum threshold to disallow placing orders above a defined threshold.

In a B2B scenario, you can define any type of threshold for each [merchant relation](/docs/pbc/all/merchant-management/latest/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html) separately.

With order thresholds, you can do the following:

- Ensure buyers place bigger orders, which can increase your sales.
- Prevent the waste of resources on small orders.
- Ensure that the cost of items sold is not too high for each transaction, which, in the long run, can make your business more profitable.
- Support promotional campaigns, by offering free shipping for orders above a threshold and other perks.

## Related Business User documents

| OVERVIEWS                                                                                                                                                       | BACK OFFICE USER GUIDES                                                                                                                          |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| [Multi-step Checkout](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/checkout-feature-overview/multi-step-checkout-overview.html) | [Define global thresholds](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-in-the-back-office/define-global-thresholds.html)   |
| [Order Thresholds](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/checkout-feature-overview/order-thresholds-overview.html)                                          | [Manage threshold settings](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-in-the-back-office/manage-threshold-settings.html) |

## Related Developer documents

| INSTALLATION GUIDES                  | UPGRADE GUIDES                   | DATA IMPORT                                           |
|--------------------|---------------------------|--------------------------------------------------|
| [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) | [Upgrade the Checkout module](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-checkout-module.html)         | [File details: sales_order_threshold.csv](/docs/pbc/all/cart-and-checkout/latest/base-shop/import-and-export-data/import-file-details-sales-order-threshold.csv.html) |
|  [Install the Checkout Glue API](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html)          | [Upgrade the CheckoutPage module](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-checkoutpage-module.html) |                              |
| [Install the Merchant feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-feature.html)      | | |
