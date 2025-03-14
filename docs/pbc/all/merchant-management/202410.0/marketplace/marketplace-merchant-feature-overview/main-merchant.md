---
title: Main merchant
description: This document contains concept information for the main merchant in the Spryker Commerce OS.
template: concept-topic-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/user/features/202311.0/marketplace-merchant-feature-overview/main-merchant-concept.html
related:
  - title: Managing main merchant orders
    link: docs/pbc/all/order-management-system/page.version/marketplace/manage-in-the-back-office/manage-main-merchant-orders.html
  - title: Managing main merchant returns
    link: docs/pbc/all/return-management/page.version/marketplace/manage-in-the-back-office/manage-main-merchant-returns.html
---

The Spryker Marketplace platform offers sales opportunities to everyone. To help support the [Enterprise Marketplace](/docs/about/all/spryker-marketplace/marketplace-concept.html) model, not only the third-party merchants but also the company owner of the Marketplace store can sell their products and offers online. We call this company the *main merchant*.

Thus, the main merchant acts as a common [marketplace merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html) having all its characteristics.

## Main merchant orders and returns

Being both a [marketplace operator](/docs/about/all/spryker-marketplace/marketplace-personas.html) and a seller and already performing tasks in the Back Office, the main merchant manages their [merchant orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html) also in the Back Office. For details, see [Managing main merchant orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-merchant-orders.html).

## Main merchant state machine

To manage merchant orders of the main merchant, the *main merchant state machine* exists. Out of the box, the main merchant state machine provides the following states:

- Created
- New
- Canceled
- Left the merchant location
- Arrived at the distribution center
- Shipped
- Delivered
- Closed

The workflow of the main merchant state machine is schematically displayed in the following diagram:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Merchant/Main+merchant+concept/main-merchant-state-machine-new.png)

## Main merchant returns

If the [Marketplace Return Management](/docs/pbc/all/return-management/{{page.version}}/marketplace/marketplace-return-management-feature-overview.html) feature is integrated into the project, the main merchant state machine obtains an additional return subprocess, and the flow looks like this:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Merchant/Main+merchant+concept/marketplace-main-merchant-return-process.png)
