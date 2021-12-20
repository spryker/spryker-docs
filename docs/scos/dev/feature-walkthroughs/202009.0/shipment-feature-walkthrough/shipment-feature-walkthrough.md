---
title: Shipment feature walkthrough
last_updated: Aug 20, 2021
description: The Shipment feature allows you to create and manage carrier companies and assign multiple delivery methods associated with specific stores, which your customers can select during the checkout
template: concept-topic-template
---

The _Shipment_ feature allows you to create and manage carrier companies and assign multiple delivery methods associated with specific stores, which your customers can select during the checkout. With the feature in place, you can define delivery price and expected delivery time, tax sets, and availability of the delivery method per store.


To learn more about the feature and to find out how end users use it, see [Shipment feature overview](/docs/scos/user/features/{{page.version}}/shipment-feature-overview.html) for business users.


## Entity diagram

The following schema shows how the sales order and shipment method entities are modelled in the database:

<div class="width-100">

![shipment-database-schema.png)](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shipment/Shipment+Overview/shipment-database-schema.png)

</div>


## Related Developer articles

| INTEGRATION GUIDES  | MIGRATION GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|
| [Shipment feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/shipment-feature-integration.html) | Shipment migration guide | [HowTo - Create discounts based on shipment](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-create-discounts-based-on-shipment.html#activate-a-discount-rule-based-on-a-shipment-carrier) | [Reference information: Shipment method plugins](/docs/scos/dev/feature-walkthroughs/{{page.version}}/shipment-feature-walkthrough/reference-information-shipment-method-plugins.html) |
| [Glue API: Shipment feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-shipment-feature-integration.html) | ShipmentGui migration guide | [HowTo - Add a new shipment method 2.0](/docs/scos/dev/tutorials-and-howtos/howtos/howto-add-a-new-shipment-method-2.0.html) |  |
|  | ManualOrderEntryGui migration guide | [HowTo - Import delivery methods linked to store](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/data-imports/howto-import-delivery-methods-linked-to-store.html) |  |
