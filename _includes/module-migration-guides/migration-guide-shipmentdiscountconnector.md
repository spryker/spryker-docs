---
title: Migration guide - ShipmentDiscountConnector
description: Use the guide to learn how to update the ShipmentDiscountConnector module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-shipment-discount-connector
originalArticleId: 6f3f796a-c580-4935-ba29-0b9076b09027
redirect_from:
  - /2021080/docs/mg-shipment-discount-connector
  - /2021080/docs/en/mg-shipment-discount-connector
  - /docs/mg-shipment-discount-connector
  - /docs/en/mg-shipment-discount-connector
  - /v1/docs/mg-shipment-discount-connector
  - /v1/docs/en/mg-shipment-discount-connector
  - /v2/docs/mg-shipment-discount-connector
  - /v2/docs/en/mg-shipment-discount-connector
  - /v3/docs/mg-shipment-discount-connector
  - /v3/docs/en/mg-shipment-discount-connector
  - /v4/docs/mg-shipment-discount-connector
  - /v4/docs/en/mg-shipment-discount-connector
  - /v5/docs/mg-shipment-discount-connector
  - /v5/docs/en/mg-shipment-discount-connector
  - /v6/docs/mg-shipment-discount-connector
  - /v6/docs/en/mg-shipment-discount-connector
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-shipmentdiscountconnector.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-shipmentdiscountconnector.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-shipmentdiscountconnector.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-shipmentdiscountconnector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-shipmentdiscountconnector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-shipmentdiscountconnector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-shipmentdiscountconnector.html
---

## Upgrading from version 3.0.* version to 4.0.0

In this new version of the **ShipmentDiscountConnector** module, we have added support of split delivery. You can find more details about the changes on the [ShipmentDiscountConnector module release page](https://github.com/spryker/shipment-discount-connector/releases).

{% info_block errorBox %}

This release is a part of the **Split delivery** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/scos/dev/migration-concepts/split-delivery-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the `ShipmentDiscountConnector` module to the new version:

```bash
composer require spryker/shipment-discount-connector: "^4.0.0" --update-with-dependencies
```

2. Generate the transfer objects:

```bash
console transfer:generate
```

*Estimated migration time: 5 min*
***
## Upgrading from version 1.* to version 3.0.0

{% info_block infoBox %}
To dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.
{% endinfo_block %}
