

## Upgrading from version 2.* to version 3.0.0

Version 3 of the **CheckoutRestApi** module adds the **Payment Method per Store** functionality.

**To upgrade to the new version of the module, do the following**:

1. Upgrade the `CheckoutRestApi` module to the new version:

```bash
composer require spryker/checkout-rest-api:"^2.0.0" --update-with-dependencies
```

2. Prepare a database entity schema for **each store** in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
```

3. Run the database migration:

```bash
console propel:install
console transfer:generate
```

*Estimated migration time: 5 min*
***

## Upgrading from version 1.* to version 2.0.0

In this new version of the **CheckoutRestApi** module, we have added support of split delivery. You can find more details about the changes on the [CheckoutRestApi module](https://github.com/spryker/checkout-rest-api/releases) release page.

{% info_block errorBox %}

This release is a part of the **Split delivery** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/split-delivery-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **CheckoutRestApi** module to the new version:

```bash
composer require spryker/checkout-rest-api: "^2.0.0" --update-with-dependencies
```

2. Generate the transfer objects:

```bash
console transfer:generate
```

*Estimated migration time: 5 min*
