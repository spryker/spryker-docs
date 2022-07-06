---
title: Migration guide - ConfigurableBundle
description: This guide contains module migration steps for the ConfigurableBundle module to the newer major version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-configurablebundle
originalArticleId: 1f6b6d4b-cc99-46eb-9078-2589782c2476
redirect_from:
  - /2021080/docs/migration-guide-configurablebundle
  - /2021080/docs/en/migration-guide-configurablebundle
  - /docs/migration-guide-configurablebundle
  - /docs/en/migration-guide-configurablebundle
  - /v4/docs/migration-guide-configurablebundle
  - /v4/docs/en/migration-guide-configurablebundle
  - /v5/docs/migration-guide-configurablebundle
  - /v5/docs/en/migration-guide-configurablebundle
  - /v6/docs/migration-guide-configurablebundle
  - /v6/docs/en/migration-guide-configurablebundle
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-configurablebundle.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-configurablebundle.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-configurablebundle.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-configurablebundle.html
---

## Upgrading from Version 1.* to Version 2.0.0

`ConfigurableBundle` v2.0.0 provides extended database schema and additional plugins for interaction with other modules.

The following details have been changed:

* Added `spryker/product-image` module to dependencies.
* Added `spryker/event` module dependency for forward-compatibility reasons.
* Added `spy_configurable_bundle_template.is_active` table field.
* Added `spy_configurable_bundle_template_slot.name` table field.
* Added `spy_product_image_set.fk_resource_configurable_bundle_template` table field.
* Defined index on `spy_configurable_bundle_template.name` field.
* Defined index on `spy_configurable_bundle_template_slot.name` field.
* Added Zed translations for CRUD related error messages.
* Defined events for template delete and slot delete.
* Introduced `ConfigurableBundleTemplateSlotProductListDeletePreCheckPlugin`.
* Introduced `CartConfigurableBundlePreReloadPlugin`.


**To upgrade to the new version of the module, do the following:**

1. Run the following command to update the `ConfigurableBundle` module and its dependencies version:
```bash
composer require spryker/configurable-bundle:"^2.0.0" --update-with-dependencies
```
2. Start executing the following SQL to migrate the database:
```sql
ALTER TABLE spy_configurable_bundle_template ADD COLUMN name VARCHAR(255) NULL;
```
Now, ensure that all of the entries from `spy_configurable_bundle_template` contain string values. Take into account, that the name column actually contains a glossary key for configurable bundle template translation.
3. When done, execute the following SQL:
```sql
ALTER TABLE spy_configurable_bundle_template ALTER COLUMN name SET NOT NULL;
```
4. Execute the following command to finish the database migration:
```bash
console propel:install
```
5. Update transfer objects by running the command:
```bash
console transfer:generate
```
6. Generate translator cache by running the following command to get the latest Zed translations:
```bash
console translator:generate-cache
```
7. To disallow deletion of a `product list` which is already used by `configurable bundles template slot`, add a corresponding plugin to `ProductListDependencyProvider`:
```php
<?php

namespace Pyz\Zed\ProductList;

use Spryker\Zed\ConfigurableBundle\Communication\Plugin\ProductList\ConfigurableBundleTemplateSlotProductListDeletePreCheckPlugin;
use Spryker\Zed\ProductList\ProductListDependencyProvider as SprykerProductListDependencyProvider;

class ProductListDependencyProvider extends SprykerProductListDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductListExtension\Dependency\Plugin\ProductListDeletePreCheckPluginInterface[]
     */
    protected function getProductListDeletePreCheckPlugins(): array
    {
        return [
            //...
            new ConfigurableBundleTemplateSlotProductListDeletePreCheckPlugin(),
        ];
    }
}
```
8. Add a preload plugin to `CartConfigurableBundlePreReloadPlugin` to update the Cart module behavior:
```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\ConfigurableBundleCart\Communication\Plugin\Cart\ConfiguredBundleQuantityPostSavePlugin;
use Spryker\Zed\Kernel\Container;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationPostSavePluginInterface[]
     */
    protected function getPostSavePlugins(Container $container)
    {
        return [
            //...
            new ConfiguredBundleQuantityPostSavePlugin(),
        ];
    }
}
```
9. Run the following command to apply JS changes:
```bash
console frontend:zed:build
```

*Estimated migration time: 2-3 hours*
