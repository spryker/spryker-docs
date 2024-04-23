---
title: Shipment feature overview
description: With the Carrier Management capability, you can create and manage carrier companies and their delivery methods for every individual store.
last_updated: July 07, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/shipment-feature-overview
originalArticleId: 9090caf1-5dfb-4b5a-ac10-13f268edab9f
redirect_from:
  - /docs/scos/user/features/202009.0/shipment-feature-overview.html
  - /docs/scos/user/features/202108.0/shipment-feature-overview.html
  - /docs/scos/user/features/202200.0/shipment-feature-overview.html
  - /docs/scos/user/features/202307.0/shipment-feature-overview.html  
  - /docs/scos/dev/feature-walkthroughs/202307.0/shipment-feature-walkthrough/shipment-feature-walkthrough.html
---

The *Shipment* feature lets you create and manage carrier companies, and assign multiple delivery methods associated with specific stores, which your customers can select during the checkout. You can define delivery price and expected delivery time, tax sets, and the availability of specific delivery methods per each store.

The main concepts regarding shipping are as follows:
* *Carrier company*: A company that provides shipping services such as DHL, FedEx, or Hermes.
* *Delivery method*: Shipping services provided by a carrier company such as DHL Express, DHL Standard, Hermes Next Day, or Hermes Standard.

A sales order can have multiple delivery methods from different carrier companies.

In the Back Office, you can create a carrier company and configure multiple delivery methods. For each delivery method, you can set a price and an associated tax set, define a store for which the delivery method is to be available, as well as activate or deactivate the delivery method. For more information about how to add delivery methods in the Back Office, see [Add delivery methods](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-delivery-methods.html).

{% info_block warningBox %}

If a Back Office user creates or edits a shipment of an order created by a customer, the grand total paid by the customer is not affected:

* If a new shipment method is added, its price is 0.
* If the shipment method is changed, the price of the previous shipment method is displayed.

{% endinfo_block %}

Additional behaviors can be attached to a delivery method from the Back Office by selecting specific plugins. For more information about method plugins types, see [Reference information: Shipment method plugins](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html).

Each shipment method has a dedicated price and tax set in the various currencies you define. The price displayed to the customer is calculated based on the store they visit and their preferred currency selection.

You can give shipment discounts based on the carrier, shipment method, or cart value. Intricate calculations let you freely define a set of rules to be applied to the various discount options.

## Install Carrier Management


1. Install the required modules using Composer:

```bash
composer require spryker-feature/shipment:"{{page.version}}" --update-with-dependencies
```

2. Follow the integration guides in [Related Developer documents](#related-developer-documents).

## Related Business User documents

|BACK OFFICE USER GUIDES| THIRD-PARTY INTEGRATIONS |
|---| - |
| [Add carrier companies](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html)  | [Seven Senders](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/seven-senders/seven-senders.html) |
| [Add delivery methods](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-delivery-methods.html)  | [Paazl](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/paazl.html) |
| [Edit delivery methods](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/edit-delivery-methods.html)  | [Paqato](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/paqato.html) | |

## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|
| [Integrate the Shipment feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html) | [Upgrade the Shipment module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipment-module.html) | [HowTo: Create discounts based on shipment](/docs/pbc/all/discount-management/{{page.version}}/base-shop/create-discounts-based-on-shipment.html) | [Shipment method plugins: reference information](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html) |
| [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html) | [Upgrade the ShipmentGui module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentgui-module.html) | [HowTo: Add a new shipment method 2.0](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/tutorials-and-howtos/howto-add-a-new-shipment-method-2.0.html) | [Shipment method entities in the database: reference information](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/domain-model-and-relationships/shipment-method-entities-in-the-database-reference-information.html) |
| [Integrate the Shipment + Approval Process feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-approval-process-feature.html) | [Upgrade the ShipmentCartConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentcartconnector-module.html) |  |  |
| [Integrate the Shipment + Cart feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-cart-feature.html) | [Upgrade the ShipmentCheckoutConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentcheckoutconnector-module.html) |  |  |
|  | [Upgrade the ShipmentDiscountConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentdiscountconnector-module.html) |  |  |
