This document describes how to integrate the Product offer shipment feature into a Spryker project.

## Install feature core

Follow the steps below to install the Product offer shipment feature core.

## Prerequisites

To start feature integration, integrate the following required features:

| NAME          | VERSION          | INTEGRATION GUIDE                                                                                                                                         |
|---------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Product Offer | {{page.version}} | [Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |
 | Shipment      | {{page.version}} | [Shipment feature integration](/docs/pbc/all/carrier-management/{{page.version}}/install-and-upgrade/install-the-shipment-feature.html)                   |

## Install the required modules using Composer

```bash
composer require spryker-feature/product-offer-shipment:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                   | EXPECTED DIRECTORY                         |
|--------------------------|--------------------------------------------|
| ProductOffer             | vendor/spryker/product-offer               |
| Shipment                 | vendor/spryker/shipment                    |
| ProductOfferShipmentType | vendor/spryker/product-offer-shipment-type |

{% endinfo_block %}

### Set up behavior

Enable the following plugins:

| PLUGIN                                   | SPECIFICATION                                                                                                                 | PREREQUISITES                                                                                                                                                                                                   | NAMESPACE                                                                |
|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| ShipmentTypeProductOfferPostCreatePlugin | Persists product offer shipment type to persistence.                                                                          | Requires `ProductOfferTransfer.productOfferReference` to be set. Requires `ShipmentTypeTransfer.shipmentTypeUuid` to be set for each `ShipmentTypeTransfer` in `ProductOfferTransfer.shipmentTypes` collection. | Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer  |
| ShipmentTypeProductOfferPostUpdatePlugin | Deletes redundant product offer shipment types from Persistence. Persists missed product offer shipment types to Persistence. | Requires `ProductOfferTransfer.productOfferReference` to be set. Requires `ShipmentTypeTransfer.shipmentTypeUuid` to be set for each `ShipmentTypeTransfer` in `ProductOfferTransfer.shipmentTypes` collection. | Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer  |
| ShipmentTypeProductOfferExpanderPlugin   | Expands `ProductOfferTransfer` with related shipment types.                                                                   | Requires `ProductOfferTransfer.productOfferReference` to be set                                                                                                                                                 | Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer  |

**src/Pyz/Zed/ProductOffer/ProductOfferDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOffer;

use Spryker\Zed\ProductOffer\ProductOfferDependencyProvider as SprykerProductOfferDependencyProvider;
use Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer\ShipmentTypeProductOfferExpanderPlugin;
use Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer\ShipmentTypeProductOfferPostCreatePlugin;
use Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer\ShipmentTypeProductOfferPostUpdatePlugin;

class ProductOfferDependencyProvider extends SprykerProductOfferDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostCreatePluginInterface>
     */
    protected function getProductOfferPostCreatePlugins(): array
    {
        return [
            new ShipmentTypeProductOfferPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface>
     */
    protected function getProductOfferPostUpdatePlugins(): array
    {
        return [
            new ShipmentTypeProductOfferPostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferExpanderPluginInterface>
     */
    protected function getProductOfferExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductOfferExpanderPlugin(),
        ];
    }
```

### Set up database schema and transfer objects

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                 | TYPE  | EVENT   |
|---------------------------------|-------|---------|
| spy_product_offer_shipment_type | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                       | TYPE  | EVENT   | PATH                                                                 |
|--------------------------------|-------|---------|----------------------------------------------------------------------|
| ProductOffer                   | class | created | src/Generated/Shared/Transfer/ProductOfferTransfer                   |
| ShipmentTypeCollection         | class | created | src/Generated/Shared/Transfer/ShipmentTypeCollectionTransfer         |
| ShipmentType                   | class | created | src/Generated/Shared/Transfer/ShipmentTypeTransfer                   |
| ShipmentTypeCriteria           | class | created | src/Generated/Shared/Transfer/ShipmentTypeCriteriaTransfer           |
| ShipmentTypeConditions         | class | created | src/Generated/Shared/Transfer/ShipmentTypeConditionsTransfer         |
| CartChange                     | class | created | src/Generated/Shared/Transfer/CartChangeTransfer                     |
| Item                           | class | created | src/Generated/Shared/Transfer/ItemTransfer                           |
| ProductOfferStore              | class | created | src/Generated/Shared/Transfer/ProductOfferStoreTransfer              |
| ProductOfferError              | class | created | src/Generated/Shared/Transfer/ProductOfferErrorTransfer              |
| ProductOfferCollection         | class | created | src/Generated/Shared/Transfer/ProductOfferCollectionTransfer         |
| ProductOfferCriteria           | class | created | src/Generated/Shared/Transfer/ProductOfferCriteriaTransfer           |
| ProductOfferConditions         | class | created | src/Generated/Shared/Transfer/ProductOfferConditionsTransfer         |
| Pagination                     | class | created | src/Generated/Shared/Transfer/PaginationTransfer                     |
| Quote                          | class | created | src/Generated/Shared/Transfer/QuoteTransfer                          |
| Store                          | class | created | src/Generated/Shared/Transfer/StoreTransfer                          |
| Message                        | class | created | src/Generated/Shared/Transfer/MessageTransfer                        |
| CartPreCheckResponse           | class | created | src/Generated/Shared/Transfer/CartPreCheckResponseTransfer           |
| CheckoutResponse               | class | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer               |
| CheckoutError                  | class | created | src/Generated/Shared/Transfer/CheckoutErrorTransfer                  |
| CartItemQuantity               | class | created | src/Generated/Shared/Transfer/CartItemQuantityTransfer               |
| EventEntity                    | class | created | src/Generated/Shared/Transfer/EventEntityTransfer                    |
| AclEntityMetadataConfig        | class | created | src/Generated/Shared/Transfer/AclEntityMetadataConfigTransfer        |
| AclEntityMetadata              | class | created | src/Generated/Shared/Transfer/AclEntityMetadataTransfer              |
| AclEntityParentMetadata        | class | created | src/Generated/Shared/Transfer/AclEntityParentMetadataTransfer        |
| AclEntityMetadataCollection    | class | created | src/Generated/Shared/Transfer/AclEntityMetadataCollectionTransfer    |
| AclEntityRule                  | class | created | src/Generated/Shared/Transfer/AclEntityRuleTransfer                  |
| ShipmentCarrier                | class | created | src/Generated/Shared/Transfer/ShipmentCarrierTransfer                |
| ShipmentMethodPluginCollection | class | created | src/Generated/Shared/Transfer/ShipmentMethodPluginCollectionTransfer |
| ShipmentCarrierRequest         | class | created | src/Generated/Shared/Transfer/ShipmentCarrierRequestTransfer         |
| ShipmentMethods                | class | created | src/Generated/Shared/Transfer/ShipmentMethodsTransfer                |
| ShipmentMethod                 | class | created | src/Generated/Shared/Transfer/ShipmentMethodTransfer                 |
| ShipmentCriteria               | class | created | src/Generated/Shared/Transfer/ShipmentCriteriaTransfer               |
| ShipmentConditions             | class | created | src/Generated/Shared/Transfer/ShipmentConditionsTransfer             |
| ShipmentCollection             | class | created | src/Generated/Shared/Transfer/ShipmentCollectionTransfer             |
| SalesShipmentCriteria          | class | created | src/Generated/Shared/Transfer/SalesShipmentCriteriaTransfer          |
| SalesShipmentConditions        | class | created | src/Generated/Shared/Transfer/SalesShipmentConditionsTransfer        |
| SalesShipmentCollection        | class | created | src/Generated/Shared/Transfer/SalesShipmentCollectionTransfer        |
| Order                          | class | created | src/Generated/Shared/Transfer/OrderTransfer                          |
| Address                        | class | created | src/Generated/Shared/Transfer/AddressTransfer                        |
| Shipment                       | class | created | src/Generated/Shared/Transfer/ShipmentTransfer                       |
| SaveOrder                      | class | created | src/Generated/Shared/Transfer/SaveOrderTransfer                      |
| Expense                        | class | created | src/Generated/Shared/Transfer/ExpenseTransfer                        |
| MoneyValue                     | class | created | src/Generated/Shared/Transfer/MoneyValueTransfer                     |
| Money                          | class | created | src/Generated/Shared/Transfer/MoneyTransfer                          |
| ShipmentGroup                  | class | created | src/Generated/Shared/Transfer/ShipmentGroupTransfer                  |
| ShipmentMethodsCollection      | class | created | src/Generated/Shared/Transfer/ShipmentMethodsCollectionTransfer      |
| ShipmentPrice                  | class | created | src/Generated/Shared/Transfer/ShipmentPriceTransfer                  |
| ShipmentGroupResponse          | class | created | src/Generated/Shared/Transfer/ShipmentGroupResponseTransfer          |
| CalculableObject               | class | created | src/Generated/Shared/Transfer/CalculableObjectTransfer               |
| Mail                           | class | created | src/Generated/Shared/Transfer/MailTransfer                           |
| TaxSet                         | class | created | src/Generated/Shared/Transfer/TaxSetTransfer                         |
| Currency                       | class | created | src/Generated/Shared/Transfer/CurrencyTransfer                       |
| TaxSetCollection               | class | created | src/Generated/Shared/Transfer/TaxSetCollectionTransfer               |
| Country                        | class | created | src/Generated/Shared/Transfer/CountryTransfer                        |
| StoreRelation                  | class | created | src/Generated/Shared/Transfer/StoreRelationTransfer                  |
| Totals                         | class | created | src/Generated/Shared/Transfer/TotalsTransfer                         |
| Filter                         | class | created | src/Generated/Shared/Transfer/FilterTransfer                         |
| OrderFilter                    | class | created | src/Generated/Shared/Transfer/OrderFilterTransfer                    |
| Sort                           | class | created | src/Generated/Shared/Transfer/SortTransfer                           |

{% endinfo_block %}

### Import shipment types for product offers

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ProductOfferShipmentTypeDataImport/data/import/product_offer_shipment_type.csv**
```csv
shipment_type_key,product_offer_reference
delivery,offer1
delivery,offer2
delivery,offer3
pickup,offer4
```

| COLUMN                  | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION            |
|-------------------------|-----------|-----------|--------------|-----------------------------|
| shipment_type_key       | mandatory | string    | delivery     | Key of the shipment type.   |
| product_offer_reference | mandatory | string    | offer1       | Reference of product offer. |

2. Register the following data import plugin:

| PLUGIN                                   | SPECIFICATION                                                      | PREREQUISITES | NAMESPACE                                                                       |
|------------------------------------------|--------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------|
| ProductOfferShipmentTypeDataImportPlugin | Imports product offer shipment types data from the specified file. | None          | \Spryker\Zed\ProductOfferShipmentTypeDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductOfferShipmentTypeDataImport\Communication\Plugin\DataImport\ProductOfferShipmentTypeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductOfferShipmentTypeDataImportPlugin(),
        ];
    }
}
```

3. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\ProductOfferShipmentTypeDataImport\ProductOfferShipmentTypeDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ProductOfferShipmentTypeDataImportConfig::IMPORT_TYPE_PRODUCT_OFFER_SHIPMENT_TYPE),
        ];

        return $commands;
    }
}
```

4. Import data:

```bash
console data:import product-offer-shipment-type
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_product_offer_shipment_type` table in the database.

{% endinfo_block %}