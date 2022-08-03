---
title: Carrier Management
description: With the capability, you can create and manage carrier companies and their delivery methods per specific store.
last_updated: July 07, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/shipment-feature-overview
originalArticleId: 9090caf1-5dfb-4b5a-ac10-13f268edab9f
redirect_from:
  - /2021080/docs/shipment-feature-overview
  - /2021080/docs/en/shipment-feature-overview
  - /docs/shipment-feature-overview
  - /docs/en/shipment-feature-overview
  - /2021080/docs/shipment-summary
  - /2021080/docs/en/shipment-summary
  - /docs/shipment-summary
  - /docs/en/shipment-summary
  - /docs/scos/user/features/202200.0/shipment-feature-overview.html
  - /docs/scos/user/features/202204.0/shipment-feature-overview.html  
  - /docs/scos/dev/feature-walkthroughs/202204.0/shipment-feature-walkthrough/shipment-feature-walkthrough.html
---

The *Carrier Management* capability lets you create and manage carrier companies and assign multiple delivery methods associated with specific stores, which your customers can select during the checkout. You can define delivery price and expected delivery time, tax sets, and availability of the delivery method per store.

The main concepts regarding shipping are as follows:
* *Carrier company*: A company that provides shipping services such as DHL, FedEx, and Hermes.
* *Delivery method*: Shipping services provided by a carrier company such as DHL Express, DHL Standard, Hermes Next Day, and Hermes Standard.

A sales order can have multiple delivery methods from different carrier companies.

In the Back Office, you can create a carrier company and configure multiple delivery methods. For each delivery method, you can set a price and an associated tax set, define a store in which the delivery method can be available, as well as activate or deactivate the delivery method. For more information about how to add delivery methods in the Back Office, see [Add delivery methods](/docs/pbc/all/carrier-management/manage-in-the-back-office/add-delivery-methods.html).

{% info_block warningBox %}

If a Back Office user creates or edits a shipment of an order created by a customer, the grand total paid by the customer is not affected:

* If a new shipment method is added, its price is 0.
* If the shipment method is changed, the price of the previous shipment method is displayed.

{% endinfo_block %}

Additional behaviors can be attached to a delivery method from the Back Office by selecting specific plugins. For more information about method plugins types, see [Reference information: Shipment method plugins](/docs/scos/dev/feature-walkthroughs/{{page.version}}/shipment-feature-walkthrough/shipment-method-plugins-reference-information.html).

Each shipment method has a dedicated price and tax set in the various currencies you define. The price displayed to the customer is calculated based on the store they visit or their preferred currency selection.

You can give shipment discounts based on the carrier, shipment method, or cart value. Intricate calculations let you freely define a set of rules to be applied to the various discount options.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Add carrier companies](/docs/pbc/all/carrier-management/manage-in-the-back-office/add-carrier-companies.html)  |
| [Add delivery methods](/docs/pbc/all/carrier-management/manage-in-the-back-office/add-delivery-methods.html)  |
| [Edit delivery methods](/docs/pbc/all/carrier-management/manage-in-the-back-office/edit-delivery-methods.html)  |

## Related Developer articles

| INTEGRATION GUIDES  | MIGRATION GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|
| [Shipment feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/shipment-feature-integration.html) | [Shipment migration guide](/docs/scos/dev/module-migration-guides/migration-guide-shipment.html) | [HowTo: Create discounts based on shipment](/docs/pbc/all/discount-management/tutorials-and-howtos/howto-create-discounts-based-on-shipment.html#activate-a-discount-rule-based-on-a-shipment-carrier) | [Shipment method plugins: reference information](/docs/scos/dev/feature-walkthroughs/{{page.version}}/shipment-feature-walkthrough/shipment-method-plugins-reference-information.html) |
| [Glue API: Shipment feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-shipment-feature-integration.html) | [ShipmentGui migration guide](/docs/scos/dev/module-migration-guides/migration-guide-shipmentgui.html) | [HowTo: Add a new shipment method 2.0](/docs/scos/dev/tutorials-and-howtos/howtos/howto-add-a-new-shipment-method-2.0.html) |  |
|  | [ManualOrderEntryGui migration guide](/docs/scos/dev/module-migration-guides/migration-guide-manualorderentrygui.html) | [HowTo: Import delivery methods linked to store](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/data-imports/howto-import-delivery-methods-linked-to-store.html) |  |
