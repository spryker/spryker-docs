---
title: Marketplace Shipment feature overview
description: This document contains concept information for the Marketplace Shipment feature.
template: concept-topic-template
---

The *Marketplace Shipment* allows splitting the [marketplace order](/docs/marketplace/user/features/{{ page.version }}/marketplace-order-management/marketplace-order-management-overview/marketplace-order-management-overview.html) into different shipments based on merchants who will process it.

A *shipment* is a set of two or more products combined by the same delivery address.

{% info_block infoBox "Info" %}

To learn more about Shipment feature in the SCCOS, see [Shipment feature overview](https://documentation.spryker.com/docs/shipment-feature-overview).

{% endinfo_block %}


## Marketplace Shipment on the Storefront
In the *Address* checkout step, you can define a common delivery address where all the shipments will be delivered.
Then, in the *Shipment* checkout step, you can see that by default the products are grouped by merchant. For each shipment, you can select a delivery date (optional).

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipment-to-single-address.png)

Or you can use the **Deliver to multiple addresses** drop-down option that will let you assign a delivery address per cart item.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/deliver-shipment.png)


## Marketplace Shipment in the Back Office
In the Back Office, the shipments are displayed in the *Order Items* section on the *View Order: [Order ID]* page. Marketplace Administrator can view them

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipments-back-office.png)

## Marketplace Shipment in the Merchant Portal
Every merchant can view only the shipment of their product offers and products on the Order [Order ID] drawer.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Shipment/shipment-merchant-portal.png)

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Shipment](/docs/marketplace/dev/feature-walkthroughs/{{ page.version }}/marketplace-shipment-feature-walkthrough.html) feature walkthrough <!---LINK--> for developers.

{% endinfo_block %}

