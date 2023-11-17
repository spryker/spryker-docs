---
title: Shipment feature overview
description: With the Carrier Management capability, you can create and manage carrier companies and their delivery methods for every individual store.
last_updated: July 07, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/shipment-feature-overview
originalArticleId: 9090caf1-5dfb-4b5a-ac10-13f268edab9f
redirect_from:
  - /docs/scos/user/features/202307.0/shipment-feature-overview.html  
  - /docs/scos/dev/feature-walkthroughs/202307.0/shipment-feature-walkthrough/shipment-feature-walkthrough.html
---

The *Shipment* feature lets you create and manage carrier companies, delivery types, and delivery methods. You can define delivery prices, expected delivery time, tax sets, and the availability of specific delivery methods per store.

## Carrier company

A *carrier company* is a business that provides shipping services, like DHL, FedEx, or Hermes.

For instructions on adding carrier companies in the Back Office, see [Add carrier companies](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html).

## Delivery type

A *delivery type* is a way in which a customer receives an order after placing it. Delivery type examples:
* Home delivery: products are delivered to the customer's residence.
* In-store pickup: customer places an order online and picks it up at a selected physical store.
* Curbside pickup: customer places an order online and drives the the selected physical store. They park at a designated area, and the store's associate brings out the order directly to the car.
* Locker pickup: customer places an order online and picks it up from a selected secure locker using a key or code provided by the store.

To import delivery types, see []

Delivery types are important in the context of service points. For more information, see [Service Points feature overview](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/service-points-feature-overview.html)

## Delivery method

A *delivery method* is a way in which a carrier company delivers an order to a customer. Delivery method examples:

* Ground shipping
* Expedited shipping
* Overnight shipping
* Air freight

There are also branded delivery methods like like DHL Express, DHL Standard, or Hermes Next Day. They are essentially variations of the regular delivery methods that refer to a particular carrier.

A sales order can have multiple delivery methods from different carrier companies.

For instructions on adding delivery methods in the Back Office, see [Add delivery methods](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-in-the-back-office/add-delivery-methods.html).


{% info_block warningBox %}

If a Back Office user creates or edits a shipment of an order created by a customer, the grand total paid by the customer is not affected:

* If a new delivery method is added, its price is 0.
* If a delivery method is changed, the price of the shipment method stays the same for that order.

{% endinfo_block %}

### Delivery method plugins

Additional behaviors can be attached to a delivery method from the Back Office by selecting specific plugins. For more information about delivery method plugins, see [Reference information: Shipment method plugins](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html).

### Delivery method prices and discounts

Each delivery method has a dedicated price and tax set in the various currencies you define. The price displayed to the customer is calculated based on the store they visit and their preferred currency selection.

You can give shipment discounts based on the carrier, shipment method, or cart value. Intricate calculations let you freely define a set of rules to be applied to the various discount options.


## Related Business User documents

|BACK OFFICE USER GUIDES| THIRD-PARTY INTEGRATIONS |
| - | - |
| [Add carrier companies](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html)  | [Seven Senders](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/seven-senders/seven-senders.html) |
| [Add delivery methods](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-delivery-methods.html)  | [Paazl](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/paazl.html) |
| [Edit delivery methods](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/edit-delivery-methods.html)  | [Paqato](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/paqato.html) | |

## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|
| [Install the Shipment feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html) | [Upgrade the Shipment module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipment-module.html) | [HowTo: Create discounts based on shipment](/docs/pbc/all/discount-management/{{page.version}}/base-shop/create-discounts-based-on-shipment.html) | [Shipment method plugins: reference information](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html) |
| [Integrate the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html) | [Upgrade the ShipmentGui module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentgui-module.html) | [HowTo: Add a new shipment method 2.0](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/tutorials-and-howtos/howto-add-a-new-shipment-method-2.0.html) | [Shipment method entities in the database: reference information](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/domain-model-and-relationships/shipment-method-entities-in-the-database-reference-information.html) |
| [Integrate the Shipment + Approval Process feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-approval-process-feature.html) | [Upgrade the ShipmentCartConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentcartconnector-module.html) |  |  |
| [Integrate the Shipment + Cart feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-cart-feature.html) | [Upgrade the ShipmentCheckoutConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentcheckoutconnector-module.html) |  |  |
|  | [Upgrade the ShipmentDiscountConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentdiscountconnector-module.html) |  |  |
