---
title: Shipment feature overview
description: With the Carrier Management capability, you can create and manage carrier companies and their shipment methods for every individual store.
last_updated: July 07, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/shipment-feature-overview
originalArticleId: 9090caf1-5dfb-4b5a-ac10-13f268edab9f
redirect_from:
  - /docs/scos/user/features/202311.0/shipment-feature-overview.html  
  - /docs/scos/dev/feature-walkthroughs/202311.0/shipment-feature-walkthrough/shipment-feature-walkthrough.html
  - /docs/pbc/all/carrier-management/base-shop/shipment-feature-overview.html
  - /docs/scos/user/features/202307.0/shipment-feature-overview.html  
  - /docs/scos/dev/feature-walkthroughs/202307.0/shipment-feature-walkthrough/shipment-feature-walkthrough.html
---

The *Shipment* feature lets you create and manage carrier companies, shipment types, and shipment methods. You can define shipment prices, expected shipment time, tax sets, and the availability of specific shipment methods per store.

## Carrier company

A *carrier company* is a business that provides shipping services, like DHL, FedEx, or Hermes.

For instructions on adding carrier companies in the Back Office, see [Add carrier companies](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html).

## Shipment type

A *shipment type* is a way in which a customer receives an order after placing it. Shipment type examples:
* Home delivery: products are delivered to the customer's residence.
* In-store pickup: customer places an order online and picks it up at a selected physical store.
* Curbside pickup: customer places an order online and drives the the selected physical store. They park at a designated area, and the store's associate brings out the order directly to the car.
* Locker pickup: customer places an order online and picks it up from a selected secure locker using a key or code provided by the store.

Shipment types are used by service points. For more information about service points, see [Service Points feature overview](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/service-points-feature-overview.html).

To add service types using Glue API, see [Backend API Marketplace B2C Demo Shop reference](/docs/dg/dev/glue-api/{{page.version}}/backend-glue-infrastructure/backend-api-marketplace-b2c-demo-shop-reference.html).

To import shipment types, see [Import file details: shipment_type.csv](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-shipment-type.csv.html).


## Shipment method

A *shipment method* is a way in which a carrier company delivers an order to a customer. Delivery method examples:

* Ground shipping
* Expedited shipping
* Overnight shipping
* Air freight

There are also branded shipment methods like like DHL Express, DHL Standard, or Hermes Next Day. They are essentially variations of the regular shipment methods that refer to a particular carrier.

A sales order can have multiple shipment methods from different carrier companies.

For instructions on adding shipment methods in the Back Office, see [Add delivery methods](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-in-the-back-office/add-delivery-methods.html).


{% info_block warningBox %}

If a Back Office user creates or edits a shipment of an order created by a customer, the grand total paid by the customer is not affected:

* If a new shipment method is added, its price is 0.
* If a shipment method is changed, the price of the shipment method stays the same for that order.

{% endinfo_block %}

### Shipment method plugins

Additional behaviors can be attached to a shipment method from the Back Office by selecting specific plugins. For more information about shipment method plugins, see [Reference information: Shipment method plugins](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html).

### Shipment method prices and discounts

Each shipment method has a dedicated price and tax set in the various currencies you define. The price displayed to the customer is calculated based on the store they visit and their preferred currency selection.

You can give shipment discounts based on the carrier, shipment method, or cart value. Intricate calculations let you freely define a set of rules to be applied to the various discount options.

## Current constraints

* Product catalog can't be filtered by a shipment type.
* Customers can't add products with preselected shipment types to cart. They can select shipment types only during checkout.
* If a product is added to cart without a product offer attached to it, this product can be purchased only with the *Delivery* shipment type.


## Related Business User documents

|BACK OFFICE USER GUIDES| THIRD-PARTY INTEGRATIONS |
| - | - |
| [Add carrier companies](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-carrier-companies.html)  | [Seven Senders](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/seven-senders/seven-senders.html) |
| [Add delivery methods](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/add-delivery-methods.html)  | [Paazl](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/paazl.html) |
| [Edit delivery methods](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/manage-in-the-back-office/edit-delivery-methods.html)  | [Paqato](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/third-party-integrations/paqato.html) | |

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES | TUTORIALS AND HOWTOS | DATA IMPORT | GLUE API GUIDES | REFERENCES |
|---|---|---|---|---|---|
| [Install the Shipment feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html) | [Upgrade the Shipment module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipment-module.html) | [HowTo: Create discounts based on shipment](/docs/pbc/all/discount-management/{{page.version}}/base-shop/create-discounts-based-on-shipment.html) |  [Import file details: shipment_type.csv](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-shipment-type.csv.html)  | [Retrieve shipments and shipment methods when submitting checkout data](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-shipments-and-shipment-methods-when-submitting-checkout-data.html) | [Shipment method plugins: reference information](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/extend-and-customize/shipment-method-plugins-reference-information.html) |
| [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html) | [Upgrade the ShipmentGui module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentgui-module.html) | [HowTo: Add a new shipment method 2.0](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/tutorials-and-howtos/howto-add-a-new-shipment-method-2.0.html) | [Import file details: shipment_type_store.csv](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment-type-store.csv.html) |  [Retrieve shipments in orders](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-shipments-in-orders.html)   |[Shipment method entities in the database: reference information](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/domain-model-and-relationships/shipment-method-entities-in-the-database-reference-information.html) |
| [Integrate the Shipment + Approval Process feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-approval-process-feature.html) | [Upgrade the ShipmentCartConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentcartconnector-module.html) |  | [Import file details: shipment_method_shipment_type.csv](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment-method-shipment-type.csv.html) | [Retrieve shipments when checking out purchases](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-shipments-when-checking-out-purchases.html)  | |
| [Integrate the Shipment + Cart feature](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-cart-feature.html) | [Upgrade the ShipmentCheckoutConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentcheckoutconnector-module.html) | | | [Add shipment types](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-using-glue-api/manage-shipment-types/glue-api-add-shipment-types.html) | |
|  | [Upgrade the ShipmentDiscountConnector module](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentdiscountconnector-module.html) | | | [Retrieve shipment types](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-using-glue-api/manage-shipment-types/glue-api-retrieve-shipment-types.html) | |
| | | | | [Update shipment types](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-using-glue-api/manage-shipment-types/glue-api-update-shipment-types.html) | |
