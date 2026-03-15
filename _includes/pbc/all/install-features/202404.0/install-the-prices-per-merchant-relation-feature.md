

The Price per Merchant Relation feature is shipped with the following modules:


| MODULE | DESCRIPTION |
| --- | --- |
| [PriceProductMerchantRelationship](https://github.com/spryker/price-product-merchant-relationship) | Bears the logic for setting specific product prices per merchant relationship. |
| [PriceProductExtension](https://github.com/spryker/price-product-extension) | Provides plugin interfaces to extend the `PriceProduct` module. |
| [PriceProductMerchantRelationshipDataImport](https://github.com/spryker/price-product-merchant-relationship-data-import) | Contains demo data and importer for price products for merchant relations. |
| [PriceProductMerchantRelationshipStorage](https://github.com/spryker/price-product-merchant-relationship-storage) | Saves prices for merchant relations into Storage and contains plugins for reading them. |
| [PriceProductStorageExtension](https://github.com/spryker/price-product-storage-extension) | Provides plugin interfaces to extend the `PriceProductStorage` module. |
| [PriceProductPriceProduct](https://github.com/spryker/price-product) | Provides product price related functionality, price persistence, current price resolvers per currency/price mode. |

To install the Price per Merchant Relation feature, follow the steps below:
1. Install the required modules using Composer:

Update the existing and install the required modules:

```bash
composer update "spryker/*"
```

```bash
composer require spryker/price-product:"^2.0.0" spryker/price-product-data-import:"^0.1.0" spryker/price-product-extension:"^1.0.0"
spryker/price-product-merchant-relationship:"^1.0.0" spryker/price-product-merchant-relationship-data-import:"^0.1.0"
spryker/price-product-merchant-relationship-storage:"^1.0.0" spryker/price-product-storage:"^2.0.0" spryker/price-product-storage-extension:"^1.0.0" --update-with-dependencies
```

2. Add a plugin to Client's `PriceProductStorageDependencyProvider`:


| MODULE | PLUGIN | DESCRIPTION | METHOD IN DEPENDENCY PROVIDER |
| --- | --- | --- | --- |
| PriceProductStorage | PriceProductMerchantRelationshipStorageDimensionPlugin | Reads prices for merchant relations from Redis to show them in catalog. | getPriceDimensionPlugins |

**src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProductStorage;

use Spryker\Client\PriceProductMerchantRelationshipStorage\Plugin\PriceProductStorageExtension\PriceProductMerchantRelationshipStorageDimensionPlugin;
use Spryker\Client\PriceProductStorage\PriceProductStorageDependencyProvider as SprykerPriceProductStorageDependencyProvider;

class PriceProductStorageDependencyProvider extends SprykerPriceProductStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface[]
     */
    public function getPriceDimensionStorageReaderPlugins(): array
    {
        return [
            new PriceProductMerchantRelationshipStorageDimensionPlugin(),
        ];
    }
}

class PriceProductStorageDependencyProvider extends SprykerPriceProductStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface[]
     */
    public function getPriceDimensionStorageReaderPlugins(): array
    {
        return [
            new PriceProductMerchantRelationshipStorageDimensionPlugin(),
        ];
    }
}
```

3. Add a plugin to Client's `CustomerDependencyProvider`:


| Module | Plugin | Description | Method in Dependency Provider |
| --- | --- | --- | --- |
| Customer | `CustomerChangePriceUpdatePlugin` | When a guest user adds some products to cart, and then, while in the checkout, logs in as a customer having specific prices for his/her merchant relation, this plugin updates the default prices to respective merchant relation prices. | `getCustomerSessionSetPlugins` |

**src/Pyz/Client/Customer/CustomerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Customer;
...
use Spryker\Client\PriceProductMerchantRelationship\Plugin\CustomerChangePriceUpdatePlugin;
class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
    /**
     * @return \Spryker\Client\Customer\Dependency\Plugin\CustomerSessionGetPluginInterface[]
    ...
    protected function getCustomerSessionSetPlugins()
    {
        return [
            new GuestCartSaveCustomerSessionSetPlugin(), #MultiCartFeature
            new GuestCartUpdateCustomerSessionSetPlugin(), #PersistentCartFeature
            new CustomerChangeCartUpdatePlugin(),
            new CustomerChangePriceUpdatePlugin(), #PricesPerBusinessUnit
        ];
    }
```

4. Add a plugin to Service's `PriceProductDependencyProvider`:


| Module | Plugin | Description | Method in Dependency Provider |
| --- | --- | --- | --- |
| `PriceProduct` | `MerchantRelationshipPriceProductFilterPlugin` | Prioritizes the choice of prices available for a client so that the merchant relationship prices cen be of higher priority than default prices. | `getPriceProductDecisionPlugins` |

**src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php**

```php
<?php

namespace Pyz\Service\PriceProduct;
use Spryker\Service\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Service\PriceProductMerchantRelationship\Plugin\PriceProductExtension\MerchantRelationshipPriceProductFilterPlugin;
class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface[]
     */
    protected function getPriceProductDecisionPlugins(): array
    {
        return array_merge([
           new MerchantRelationshipPriceProductFilterPlugin(),
        ], parent::getPriceProductDecisionPlugins());
    }
}
```

5. Add a plugin to Zed `CompanyUserDependencyProvider`:


| Module | Plugin | Description | Method in Dependency Provider |
| --- | --- | --- | --- |
| `CompanyUser` | `MerchantRelationshipHydratePlugin` | Adds data about merchant relations of a logged in customer to business unit information the customer is assigned to. Based on this data, prices applicable to this customer are collected. | `getCompanyUserHydrationPlugins` |

**src/Pyz/Zed/CompanyUser/CompanyUserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyUser;
...
use Spryker\Zed\MerchantRelationship\Communication\Plugin\CompanyUser\MerchantRelationshipHydratePlugin;
class CompanyUserDependencyProvider extends SprykerCompanyUserDependencyProvider
{
    /**
     * @return \Spryker\Zed\CompanyUserExtension\Dependency\Plugin\CompanyUserHydrationPluginInterface[]
     */
    protected function getCompanyUserHydrationPlugins(): array
    {
        return [
            new CompanyBusinessUnitHydratePlugin(),
            new MerchantRelationshipHydratePlugin(),
        ];
    }
```

6. Add plugins to Zed `DataImportDependencyProvider`:


| Module | Plugin | Description | Method in Dependency Provider |
| --- | --- | --- | --- |
| `DataImport` | `PriceProductDataImportPlugin` | Imports prices and adds them to the default price dimension.	 | `getDataImporterPlugins` |
| `DataImport` | `PriceProductMerchantRelationshipDataImportPlugin` | Imports prices for merchant relations. | `getDataImporterPlugins` |

{% info_block warningBox %}
If you have not installed plugins needed for Merchant and Merchant Relations, add them here as well. See _Merchant and Merchant Relations feature integration guide_ <!-- link to IG--> for more details.)
{% endinfo_block %}
**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
namespace Pyz\Zed\DataImport;
...
use Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantDataImportPlugin;
use Spryker\Zed\MerchantRelationshipDataImport\Communication\Plugin\MerchantRelationshipDataImportPlugin;
use Spryker\Zed\PriceProductDataImport\Communication\Plugin\PriceProductDataImportPlugin;
use Spryker\Zed\PriceProductMerchantRelationshipDataImport\Communication\Plugin\PriceProductMerchantRelationshipDataImportPlugin;
...

    protected function getDataImporterPlugins(): array
    {
        return [
            [new CategoryDataImportPlugin(), DataImportConfig::IMPORT_TYPE_CATEGORY_TEMPLATE],
            new CompanyDataImportPlugin(),
            new CompanyBusinessUnitDataImportPlugin(),
            new CompanyUnitAddressDataImportPlugin(),
            new CompanyUnitAddressLabelDataImportPlugin(),
            new CompanyUnitAddressLabelRelationDataImportPlugin(),
            new ProductMeasurementUnitDataImportPlugin(),
            new ProductMeasurementBaseUnitDataImportPlugin(),
            new ProductMeasurementSalesUnitDataImportPlugin(),
            new ProductMeasurementSalesUnitStoreDataImportPlugin(),
            new ProductQuantityDataImportPlugin(),
            new ProductPackagingUnitTypeDataImportPlugin(),
            new ProductPackagingUnitDataImportPlugin(),
            new BusinessOnBehalfCompanyUserDataImportPlugin(),
            new PriceProductDataImportPlugin(),
            new MerchantDataImportPlugin(),
            new MerchantRelationshipDataImportPlugin(),
            new PriceProductMerchantRelationshipDataImportPlugin(),
        ];
    }
```

7. Add a plugin to Zed `ConsoleDependencyProvider`:


| Module | Plugin | Description | Method in Dependency Provider |
| --- | --- | --- | --- |
| `Console` | `PriceProductMerchantRelationshipDeleteConsole` | Deletes imported prices. | `getConsoleCommands` |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;
...
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Console\PriceProductMerchantRelationshipDeleteConsole;

...
            // Setup commands

            new PriceProductMerchantRelationshipDeleteConsole(),
...
```

8. Create a new schema file in the `PriceProductMerchantRelationship` module:

| Module | File Location |
| --- | --- |
| `PriceProductMerchantRelationship` | `src/Pyz/Zed/PriceProductMerchantRelationship/Persistence/Propel/Schema/spy_price_product_merchnat_relationship.schema.xml` |

**src/Pyz/Zed/PriceProductMerchantRelationship/Persistence/Propel/Schema/spy_price_product_merchnat_relationship.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\PriceProductMerchantRelationship\Persistence"
          package="src.Orm.Zed.PriceProductMerchantRelationship.Persistence">

    <table name="spy_price_product_merchant_relationship">
        <behavior name="event">
            <parameter name="spy_price_product_merchant_relationship_all" column="*"/>
        </behavior>
    </table>

</database>
```

9. Add the event subscriber to Zed `EventDependencyProvider`:


| Module | Event Subscriber Name | Method in EventDependencyProvider |
| --- | --- | --- |
| `Event` | `PriceProductMerchantRelationshipStorageEventSubscriber` | `getEventSubscriberCollection` |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;
...
use Spryker\Zed\PriceProductMerchantRelationshipStorage\Communication\Plugin\Event\Subscriber\PriceProductMerchantRelationshipStorageEventSubscriber;
use Spryker\Zed\PriceProductStorage\Communication\Plugin\Event\Subscriber\PriceProductStorageEventSubscriber;
use Spryker\Zed\ProductCategoryFilterStorage\Communication\Plugin\Event\Subscriber\ProductCategoryFilterStorageEventSubscriber;
use Spryker\Zed\ProductCategoryStorage\Communication\Plugin\Event\Subscriber\ProductCategoryStorageEventSubscriber;
...
class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    public function getEventListenerCollection()
    {
        return parent::getEventListenerCollection();
    }
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        /**
         * Storage Events
         */
...
         $eventSubscriberCollection->add(new ProductLabelStorageEventSubscriber());
         $eventSubscriberCollection->add(new ProductSetStorageEventSubscriber());
         $eventSubscriberCollection->add(new ProductSearchConfigStorageEventSubscriber());
         $eventSubscriberCollection->add(new PriceProductMerchantRelationshipStorageEventSubscriber());
...
```

10. `Change/create` class in Zed `PriceProduct` module: `PriceProductDependencyProvider`

**src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PriceProduct;

use Spryker\Zed\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceDimensionAbstractWriterPlugin;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceDimensionConcreteWriterPlugin;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceProductDimensionExpanderStrategyPlugin;
use Spryker\Zed\PriceProductMerchantRelationship\Communication\Plugin\PriceProduct\MerchantRelationshipPriceQueryCriteriaPlugin;
/**
 * Copyright © 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */
class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionQueryCriteriaPluginInterface[]
     */
    protected function getPriceDimensionQueryCriteriaPlugins(): array
    {
        return array_merge(parent::getPriceDimensionQueryCriteriaPlugins(), [
            new MerchantRelationshipPriceQueryCriteriaPlugin(),
        ]);
    }
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionAbstractSaverPluginInterface[]
     */
    protected function getPriceDimensionAbstractSaverPlugins(): array
    {
        return [
            new MerchantRelationshipPriceDimensionAbstractWriterPlugin(),
        ];
    }
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionConcreteSaverPluginInterface[]
     */
    protected function getPriceDimensionConcreteSaverPlugins(): array
    {
        return [
            new MerchantRelationshipPriceDimensionConcreteWriterPlugin(),
        ];
    }
    /**
     * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductDimensionExpanderStrategyPluginInterface[]
     */
    protected function getPriceProductDimensionExpanderStrategyPlugins(): array
    {
        return [
            new MerchantRelationshipPriceProductDimensionExpanderStrategyPlugin(),
        ];
    }
}
```

{% info_block infoBox %}

See  [Upgrade the PriceProduct module](/docs/pbc/all/price-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproduct-module.html) for information on how to migrate to a newer version of the `PriceProduct` module with price dimensions support.

{% endinfo_block %}
