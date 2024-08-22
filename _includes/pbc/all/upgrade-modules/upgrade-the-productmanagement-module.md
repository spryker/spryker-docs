

## Upgrading from version 0.18.* to version 0.19.0

In this new version of the `ProductManagement` module, we added support of decimal stock. You can find more details about the changes on the [`ProductManagement` module](https://github.com/spryker/product-management/releases) release page.

{% info_block errorBox %}

This release is a part of the *Decimal Stock* concept migration. When you upgrade this module version, you must also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/decimal-stock-migration-concept.html).

{% endinfo_block %}

*Estimated migration time: 5 min*

To upgrade to the new version of the module, follow these steps:

1. Upgrade the `ProductManagement` module to the new version:

```bash
composer require spryker/product-management: "^0.19.0" --update-with-dependencies
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

## Upgrading from version 0.19.* to version 0.20.*

With version 0.20, we have added numbers formatting.

Check the following:
- `\Spryker\Zed\ProductManagement\Communication\Form\Product\Price\ProductMoneyCollectionType`
- `\Spryker\Zed\ProductManagement\Communication\Form\Product\Price\ProductMoneyType`
- `\Spryker\Zed\ProductManagement\Communication\Form\Product\ImageCollectionForm`
- `\Spryker\Zed\ProductManagement\Communication\Form\Product\ImageSetForm`
- `\Spryker\Zed\ProductManagement\Communication\Form\ProductFormAdd`

They use a new form option `locale`. If you have overwritten or changed those classes, you must modify them accordingly.

There is also a new dependency in `PriceFormTypePlugin`:

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**
```php
namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\MoneyGui\Communication\Plugin\Form\MoneyFormTypePlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function createMoneyFormTypePlugin(Container $container): FormTypeInterface
    {
        return new MoneyFormTypePlugin();
    }
}
```

## Upgrading from version 0.* to version 0.18.0

{% info_block infoBox %}

To dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. The public API of source and target major versions are equal. No migration efforts are required. [Contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from version 0.9.* to version 0.10.*

The new version provides support to manage the `abstract product-store` relations per store.

1. Update `/ install spryker/product` to at least 6.0.0 version. For more details, see [Upgrade the Product module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-product-module.html)
2. Update `/ install spryker/productmanagement` to 0.10.0 version or later.
3. Generate the transfer object changes:

```bash
vendor/bin/console transfer:generate
```

4. The Product Information Management (PIM) Back Office expects the `abstract product-store` relation handling a partial form to be defined in the dependency provider using the `Spryker\Zed\Kernel\Communication\Form\FormTypeInterface`. You can use a single-store and multi-store compatible default implementation. `Spryker\Zed\Store\Communication\Form\Type\StoreRelationToggleType` wrapped in `Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin`.

{% info_block warningBox "Note" %}

`Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin` is introduced in `spryker/store` version 1.2.0.

{% endinfo_block %}

**Example of injection:**

```php
<?php
namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function createStoreRelationFormTypePlugin()
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}
```

In the Product Information Management (PIM) Back Office, you can see the `abstract product-store` relations. However, you can't manage or change anything yet. To enable the entire multi-store product behavior, see [Multi-Store Products feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-multi-store-products-feature.html).

## Upgrading from version 0.8.* to version 0.9.*

With version 0.9, we added multi-currency support. Make sure to migrate the `Price` module. The way the price form is rendered has been changed: now it displays the price matrix with a currency, a store, and a price type as input fields.

Check `\Spryker\Zed\ProductManagement\Communication\Form\ProductFormAdd::addPriceForm`. It uses a new form from the `Money` module.

Check `\Spryker\Zed\ProductManagement\Communication\Form\ProductConcreteFormEdit::addPriceForm`. If you have overwritten or changed those classes, you must modify them accordingly. The new `ProductManagement/Presentation/_partials/product_price_collection.twig` form is rendered now as well.

 There is also a new dependency in `PriceFormTypePlugin`. The following snippet shows how to include it:

```php
namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\Money\Communication\Plugin\Form\MoneyFormTypePlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
    * @param \Spryker\Zed\Kernel\Container $container
    *
    * @return \Spryker\Zed\Money\Communication\Plugin\Form\MoneyFormTypePlugin
    */
   protected function createMoneyFormTypePlugin(Container $container)
   {
       return new MoneyFormTypePlugin();
   }
}
```

After that, you can use the currency-aware form.

## Upgrading from version 0.7.* to version 0.8.*

To migrate the `ProductManagement` module from version 0.7.x to version 0.8.x, follow the steps described below.

The `ProductManagement` module persistence layer was moved into the new `ProductAttribute` module.

### ORM entities changed

The classes under `Orm\Zed\ProductManagement\` were moved to the `Orm\Zed\ProductAttribute\` namespace.

| OLD | NEW |
| --- | --- |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductAttribute` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductAttribute` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductAttributeQuery` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductAttributeQuery` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductAttributeValue` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductAttributeValue` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductAttributeValueQuery` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductAttributeValueQuery` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductManagementAttributeValueTranslation` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductManagementAttributeValueTranslation` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductManagementAttributeValueTranslationQuery` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductManagementAttributeValueTranslationQuery` |

### Importer updates

Project's importer was updated to take advantage of the new `ProductAttribute` module:
* `src/Pyz/Zed/Importer/Business/Factory/AbstractFactory.php`: the `getProductManagementFacade()` method was removed and replaced with `getProductAttributeFacade()`.
* `src/Pyz/Zed/Importer/Business/Factory/ImporterFactory.php`: the `getProductManagementFacade()` method was removed and replaced with `getProductAttributeFacade()`.
* `src/Pyz/Zed/Importer/Business/Importer/ProductManagement/ProductManagementAttributeImporter.php`: the `$productManagementFacade` property was removed and replaced with `$productAttributeFacade`.
* `src/Pyz/Zed/Importer/ImporterDependencyProvider.php`: the `FACADE_PRODUCT_MANAGEMENT` constant was removed and replaced with the `FACADE_PRODUCT_ATTRIBUTE`; the  `addProductManagementFacade()` method was removed and replaced with `addProductAttributeFacade()`.

{% info_block errorBox %}

There were no changes to the database schema.

{% endinfo_block %}
