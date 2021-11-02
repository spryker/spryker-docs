---
title: Migration Guide - AvailabilityCartConnector
description: Use the guide to migrate to a new version of the AvailabilityCartConnector module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-availability-cart-connector
originalArticleId: c7378d46-9fbb-446a-8e24-d0c0e13ce381
redirect_from:
  - /2021080/docs/mg-availability-cart-connector
  - /2021080/docs/en/mg-availability-cart-connector
  - /docs/mg-availability-cart-connector
  - /docs/en/mg-availability-cart-connector
---

## Upgrading from Version 6.* to Version 7.0.0

In this new version of the **AvailabilityCartConnector** module, we have added support of decimal stock. You can find more details about the changes on the [AvailabilityCartConnector module](https://github.com/spryker/availability-cart-connector/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **AvailabilityCartConnector** module to the new version:

```bash
composer require spryker/availability-cart-connector: "^7.0.0" --update-with-dependencies
```
2. Update the database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```
3. Run the database migration:

```bash
console propel:install
console transfer:generate
```

*Estimated migration time: 5 min*

## Upgrading from Version 4.* to Version 6.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

<!--*Last review date: May 30, 2019*-->
