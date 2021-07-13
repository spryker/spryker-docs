---
title: Marketplace Order Management
last_updated: Apr 23, 2021
description: The Marketplace Order Management feature allows Marketplace customers to place orders
template: concept-topic-template
---

With the Marketplace Order Management feature, default orders that contain additional information about the merchants are called Marketplace orders. In turn, every merchant can view and manage only the orders that are related to their items. Such orders are called merchant orders.

To learn more about the feature and to find out how end users use it, see [Marketplace Order Management](/docs/marketplace/user/features/{{ page.version }}/marketplace-order-management/marketplace-order-management.html) feature summary for business users.

## Module relations

* Relations between modules in the Marketplace Order entity:

![Marketplace order module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/Feature+walkthroughs/Marketplace+Order+Management/Marketplace+order+module+relations.png)

* Relations between modules in the Merchant Order entity:

![Merchant order module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Merchant+order+feature+overview/merchant-order-module-relations.png)

*Merchant Order total* is the sum of the totals making up the merchant order. The *Merchant Order total* is in one to one relation to the *Merchant Order*. The *Merchant Order total* is in many to one relation to the *Marketplace/Sales Order total*. The sum of all the merchant order totals and Marketplace-assigned expenses equals the *Marketplace order total*.


## Marketplace and merchant state machine connections

The following schema illustrates the connections between the Marketplace and merchant state machine.

![Marketplace and merchant state machine module schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+and+Merchant+State+Machines+feature+overview/marketplace-and-merchant-state-machine-module-schema.png)


## Related Developer articles


|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | 
|---------|---------|---------|
| [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-order-management-feature-integration.html)    | [Retrieving Marketplace orders](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/retrieving-marketplace-orders.html)        | [File details: merchant_oms_process.csv](/docs/marketplace/dev/data-import/{{ page.version }}/file-details-merchant-oms-process-csv.html)        |
| [Marketplace Order Management + Order Threshold feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-order-management-order-threshold-feature-integration.html)    |         | [File details: merchant-order-status.csv](/docs/marketplace/dev/data-import/{{ page.version }}/file-details-merchant-order-status-csv.html)        |
| [Marketplace Order Management + Customer Account Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-order-management-customer-account-management-feature-integration.html)    |         |         |
|[Marketplace Order Management + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-order-management-cart-feature-integration.html)     |         |         |
