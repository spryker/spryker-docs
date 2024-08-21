---
title: Marketplace Shipment feature overview
description: This document contains concept information for the Marketplace Shipment feature.
template: concept-topic-template
last_updated: Nov 9, 2023
redirect_from:
  - /docs/marketplace/user/features/202307.0/marketplace-shipment-feature-overview.html
  - /docs/marketplace/dev/feature-walkthroughs/202307.0/marketplace-shipment-feature-walkthrough.html
---

The *Marketplace Shipment* feature allows splitting the [marketplace order](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html) into different shipments based on merchants who will process them.

A *shipment* is a set of two or more products combined by the same delivery address.

With the Marketplace Shipment feature, every merchant can define delivery price and expected delivery time, tax sets, and availability of the delivery method per store. Thus, a [marketplace order](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-order-overview.html) has multiple delivery methods from different merchants.

## Marketplace Shipment on the Storefront

In the *Address* checkout step, buyers can define a common delivery address where all the shipments are to be delivered.
Then, in the *Shipment* checkout step, buyers can see that the products are grouped by a merchant into different shipments  by default. For each shipment, they can select a shipping method and a delivery date (optional).

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipment-to-single-address.png)

Alternatively, buyers can use the **Deliver to multiple addresses** drop-down option to assign a delivery address per cart item. By doing that, even items from the same merchant have separate shipments.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/deliver-shipment.png)


## Marketplace Shipment in the Back Office

In the Back Office, the shipments are displayed in the **Order Items** section on the **View Order: _[Order ID]_** page. A Marketplace administrator can view them.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipments-back-office.png)

## Marketplace Shipment in the Merchant Portal

On the **Order _[Order ID]_** drawer, every merchant can view only the shipment of their product offers and products.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipment-merchant-portal.png)

## Related Developer documents

|INSTALLATION GUIDES  |
|---------|
| [Install the Marketplace Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-marketplace-shipment-feature.html) |  |
| [Install the Marketplace Shipment + Cart feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-the-marketplace-shipment-cart-feature.html) |  |
| [Install the Marketplace Shipment + Customer feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-marketplace-shipment-customer-feature.html) |   |
| [Install the Marketplace Shipment + Checkout feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-the-marketplace-shipment-checkout-feature.html) |  |
|    |    |    |    |
