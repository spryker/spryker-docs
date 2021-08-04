---
title: Migration Guide - ProductManagement
originalLink: https://documentation.spryker.com/v2/docs/mg-product-management
redirect_from:
  - /v2/docs/mg-product-management
  - /v2/docs/en/mg-product-management
---

## Upgrading from Version 0.* to Version 0.18.0
{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 0.9.* to Version 0.10.*

The new version provides support to manage "abstract product-store" relations per store.

1. Update / install `spryker/product` to at least 6.0.0 version. See [Migration Guide - Product](/docs/scos/dev/migration-and-integration/201903.0/module-migration-guides/mg-product) for more details.
2. Update `/ install spryker/productmanagement` to at least 0.10.0 version.
3. Run `vendor/bin/console transfer:generate` to generate the transfer object changes.
4. The Product Information Management (PIM) Back Office expects the "abstract product-store" relation handling partial form to be defined in the dependency provider using the `Spryker\Zed\Kernel\Communication\Form\FormTypeInterface`. You can use the single store and multi-store compatible default implementation `Spryker\Zed\Store\Communication\Form\Type\StoreRelationToggleType` wrapped in `Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin`.

**Note:** `Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin` is introduced in `spryker/store` version 1.2.0.

<details open>
<summary>Example of injection:</summary>
    
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

</br>
</details>

You should be able now to see the "abstract product-store" relations in the Product Information Management (PIM) Back Office, however you will not able to manage / change anything yet. If you would like to enable the entire multi-store product behavior, see [Multi-Store Products Feature Integration](/docs/scos/dev/migration-and-integration/201903.0/feature-integration-guides/product-store-r). 

## Upgrading from Version 0.8.* to Version 0.9.*

With version 0.9 we have added multi-currency support. First of all make sure you migrated the Price module. The way the price form is rendered has been changed: now it displays price matrix with currency, store and price type as input fields. Check `\Spryker\Zed\ProductManagement\Communication\Form\ProductFormAdd::addPriceForm` - it uses a new form from the Money module. Also check `\Spryker\Zed\ProductManagement\Communication\Form\ProductConcreteFormEdit::addPriceForm` - if you have overwritten or changed those classes, you will have to modify them accordingly. A new `ProductManagement/Presentation/_partials/product_price_collection.twig` form is rendered now as well. There is also new dependency in `PriceFormTypePlugin`. Here is snippet on how to include it:

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

These being done, you are able to use the currency-aware form type.

## Upgrading from Version 0.7.* to Version 0.8.*

If you’re migrating the `ProductManagement` module from version 0.7.x to version 0.8.x, you need to follow the steps described below.
`ProductManagement` module persistence layer was moved into the new `ProductAttribute` module.

## ORM Entities Changed
The classes under `Orm\Zed\ProductManagement\` were moved to `Orm\Zed\ProductAttribute\` namespace.

| **Old** | **New** |
| --- | --- |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductAttribute` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductAttribute` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductAttributeQuery` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductAttributeQuery` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductAttributeValue` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductAttributeValue` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductAttributeValueQuery` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductAttributeValueQuery` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductManagementAttributeValueTranslation` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductManagementAttributeValueTranslation` |
| `Spryker\Zed\ProductManagement\Persistence\Propel\AbstractSpyProductManagementAttributeValueTranslationQuery` | `Spryker\Zed\ProductAttribute\Persistence\Propel\AbstractSpyProductManagementAttributeValueTranslationQuery` |

## Importer Updates
Project's importer was also updated, to take advantage of the new `ProductAttribute` module.

* `src/Pyz/Zed/Importer/Business/Factory/AbstractFactory.php`
Removed `getProductManagementFacade()` and replaced it with `getProductAttributeFacade()` method.
    
* `src/Pyz/Zed/Importer/Business/Factory/ImporterFactory.php`
Removed `getProductManagementFacade()` and replaced it with `getProductAttributeFacade()` method.
    
* `src/Pyz/Zed/Importer/Business/Importer/ProductManagement/ProductManagementAttributeImporter.php`
Removed `$productManagementFacade` and replaced it with `$productAttributeFacade` property.
    
* `src/Pyz/Zed/Importer/ImporterDependencyProvider.php` 
Removed `FACADE_PRODUCT_MANAGEMENT` and replaced it with `FACADE_PRODUCT_ATTRIBUTE` constant.
        Removed `addProductManagementFacade()` and replaced it with `addProductAttributeFacade()` method.

{% info_block errorBox %}
There were no changes to the database schema.
{% endinfo_block %}

<!-- Last review date: Jan 23, 2018 by Karoy Gerner -->
