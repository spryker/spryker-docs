

## Upgrading from version 1.0.* to version 2.0.0

In this new version of the `ShipmentCheckoutConnector` module, we have added support of split delivery. You can find more details about the changes on the `ShipmentCheckoutConnector` module release page.

{% info_block errorBox %}

This release is a part of the Split delivery concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/split-delivery-migration-concept.html).

{% endinfo_block %}

*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the `ShipmentCheckoutConnector` module to the new version:

```bash
composer require spryker/shipment-checkout-connector: "^2.0.0" --update-with-dependencies
```

2. Generate the transfer objects:

```bash
console transfer:generate
```
