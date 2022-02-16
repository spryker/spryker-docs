---
title: Marketplace Shipment feature overview
description: This document contains concept information for the Marketplace Shipment feature.
template: concept-topic-template
---

The *Marketplace Shipment* feature allows splitting the [marketplace order](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html) into different shipments based on merchants who will process them.

A *shipment* is a set of two or more products combined by the same delivery address.

With the Marketplace Shipment feature, every merchant can define delivery price and expected delivery time, tax sets, and availability of the delivery method per store. Thus, a [marketplace order](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-order-overview.html) has multiple delivery methods from different merchants.

## Marketplace Shipment on the Storefront
In the *Address* checkout step, buyers can define a common delivery address where all the shipments are to be delivered.
Then, in the *Shipment* checkout step, buyers can see that by default the products are grouped by a merchant into different shipments. For each shipment, they can select a shipping method and a delivery date (optional).

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipment-to-single-address.png)

Alternatively, buyers can use the **Deliver to multiple addresses** drop-down option that lets them assign a delivery address per cart item. By doing that, even items from the same merchant will have separate shipments.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/deliver-shipment.png)


## Marketplace Shipment in the Back Office
In the Back Office, the shipments are displayed in the *Order Items* section on the *View Order: [Order ID]* page. Marketplace Administrator can view them

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipments-back-office.png)

## Marketplace Shipment in the Merchant Portal
Every merchant can view only the shipment of their product offers and products on the *Order [Order ID]* drawer.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipment-merchant-portal.png)

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Shipment](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-shipment-feature-walkthrough.html) feature walkthrough for developers.

{% endinfo_block %}
