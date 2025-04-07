

## Upgrading from version 3.0.* to version 4.0.0

In this new version of the **OrdersRestApi** module, we have added support of split delivery. You can find more details about the changes on the [OrdersRestApi module](https://github.com/spryker/orders-rest-api/releases) release page.

{% info_block errorBox %}

This release is a part of the Split delivery concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/install-and-upgrade/split-delivery-migration-concept.html).

{% endinfo_block %}

To upgrade to the new version of the module, do the following:

1. Upgrade the **OrdersRestApi** module to the new version:

```bash
composer require spryker/orders-rest-api: "^4.0.0" --update-with-dependencies
```

2. Generate the transfer objects:

```bash
console transfer:generate
```

*Estimated migration time: 5 min*

## Upgrading from version 1.* to version 3.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. [Contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}
