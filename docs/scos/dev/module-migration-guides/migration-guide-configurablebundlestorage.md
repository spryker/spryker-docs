---
title: Migration guide - ConfigurableBundleStorage
description: This migration guide contains instructions on upgrading ConfigurableBundleStorage to the newer major version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-configurablebundlestorage
originalArticleId: f980caac-ab97-4ab8-b6d9-37ab6b5c8e37
redirect_from:
  - /2021080/docs/migration-guide-configurablebundlestorage
  - /2021080/docs/en/migration-guide-configurablebundlestorage
  - /docs/migration-guide-configurablebundlestorage
  - /docs/en/migration-guide-configurablebundlestorage
  - /v4/docs/migration-guide-configurablebundlestorage
  - /v4/docs/en/migration-guide-configurablebundlestorage
  - /v5/docs/migration-guide-configurablebundlestorage
  - /v5/docs/en/migration-guide-configurablebundlestorage
  - /v6/docs/migration-guide-configurablebundlestorage
  - /v6/docs/en/migration-guide-configurablebundlestorage
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-configurablebundlestorage.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-configurablebundlestorage.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-configurablebundlestorage.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-configurablebundlestorage.html
related:
  - title: Migration guide - ConfigurableBundle
    link: docs/scos/dev/module-migration-guides/migration-guide-configurablebundle.html
---

## Upgrading from Version 1.* to Version 2.0.0

In the `ConfigurableBundleStorage` version 2.0.0, we have introduced these backward-incompatible changes:

* Added `spryker/locale` module to dependencies.
* Added `spryker/product-image` module to dependencies.
* Added `spryker/product-storage` module to dependencies for forward-compatibility reasons.
* Increased `spryker/configurable-bundle` module version constraint for the new major.
* Changed configurable bundle template storage structure by renaming `productListId` to `idProductList`.
* Enriched configurable bundle template storage structure with name, `idConfigurableBundleTemplateSlot` and `idConfigurableBundleTemplate` properties.
* Removed `PROPEL_QUERY_CONFIGURABLE_BUNDLE_TEMPLATE` from the dependency provider.

**To upgrade to the new version of the module, do the following:**

1. Upgrade the `ConfigurableBundleStorage` module to version 2.0.0:
```bash
composer require spryker/configurable-bundle-storage:"^2.0.0" --update-with-dependencies
```
2. Truncate the `spy_configurable_bundle_storage` database table:
```sql
TRUNCATE TABLE spy_configurable_bundle_template_storage
```
3. Remove all keys from Redis:
```bash
redis-cli --scan --pattern kv:configurable_bundle_template:'*' | xargs redis-cli unlink
```
4. Run the database migration:
```bash
console propel:install
```
5. Run the following command to re-generate transfer objects:
```bash
console transfer:generate
```
6. Run the following command to get all data about configurable bundle templates from the database and publish them to Redis:
```bash
console event:trigger -r configurable_bundle_template
```

*Estimated migration time: ~1hour*
