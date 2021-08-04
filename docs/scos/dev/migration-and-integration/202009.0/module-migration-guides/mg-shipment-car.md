---
title: Migration Guide - ShipmentCartConnector
originalLink: https://documentation.spryker.com/v6/docs/mg-shipment-cart-connector
redirect_from:
  - /v6/docs/mg-shipment-cart-connector
  - /v6/docs/en/mg-shipment-cart-connector
---

## Upgrading from Version 1.0.* to Version 2.0.0

In this new version of the **ShipmentCartConnector** module, we have added support of split delivery. You can find more details about the changes on the [ShipmentCartConnector](https://github.com/spryker/shipment-cart-connector/releases) module release page.

{% info_block errorBox %}
This release is a part of the **Split delivery** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/split-delivery-
{% endinfo_block %}.)

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **ShipmentCartConnector** module to the new version:

```bash
composer require spryker/shipment-cart-connector: "^2.0.0" --update-with-dependencies
```
2. Generate the transfer objects:

```bash
console transfer:generate
```
*Estimated migration time: 5 min*
