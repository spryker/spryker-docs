---
title: Migration guide - ShipmentCheckoutConnector
description: Use the guide to learn how to update the ShipmentCheckoutConnector module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-shipment-checkout-connector
originalArticleId: dfb849a9-6f08-4091-ab6d-87f097eb7811
redirect_from:
  - /2021080/docs/mg-shipment-checkout-connector
  - /2021080/docs/en/mg-shipment-checkout-connector
  - /docs/mg-shipment-checkout-connector
  - /docs/en/mg-shipment-checkout-connector
  - /v4/docs/mg-shipment-checkout-connector
  - /v4/docs/en/mg-shipment-checkout-connector
  - /v5/docs/mg-shipment-checkout-connector
  - /v5/docs/en/mg-shipment-checkout-connector
  - /v6/docs/mg-shipment-checkout-connector
  - /v6/docs/en/mg-shipment-checkout-connector
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-shipmentcheckoutconnector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-shipmentcheckoutconnector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-shipmentcheckoutconnector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-shipmentcheckoutconnector.html
---

## Upgrading from version 1.0.* to version 2.0.0

In this new version of the **ShipmentCheckoutConnector** module, we have added support of split delivery. You can find more details about the changes on the ShipmentCheckoutConnector module release page.

{% info_block errorBox %}

This release is a part of the Split delivery concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/scos/dev/migration-concepts/split-delivery-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **ShipmentCheckoutConnector** module to the new version:

```bash
composer require spryker/shipment-сheckout-сonnector: "^2.0.0" --update-with-dependencies
```
2. Generate the transfer objects:

```bash
console transfer:generate
```

*Estimated migration time: 5 min*
