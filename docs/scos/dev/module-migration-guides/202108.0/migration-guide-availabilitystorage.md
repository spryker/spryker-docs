---
title: Migration Guide - AvailabilityStorage
description: Use the guide to migrate to a new version of the AvailabilityStorage module.
originalLink: https://documentation.spryker.com/2021080/docs/mg-availabilitystorage
originalArticleId: ed8f56c7-a35d-48f2-ba2a-edfe2151e67e
redirect_from:
  - /2021080/docs/mg-availabilitystorage
  - /2021080/docs/en/mg-availabilitystorage
  - /docs/mg-availabilitystorage
  - /docs/en/mg-availabilitystorage
---

## Upgrading from Version 1.* to Version 2.0.0
In this new version of the **AvailabilityStorage** module, we have added support of decimal stock. You can find more details about the changes on the [AvailabilityStorage module](https://github.com/spryker/availability-storage/releases) release page.

{% info_block errorBox %}
This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html).
{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**
1. Upgrade the **AvailabilityStorage** module to the new version:

```bash
composer require spryker/availability-storage: "^2.0.0" --update-with-dependencies
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
