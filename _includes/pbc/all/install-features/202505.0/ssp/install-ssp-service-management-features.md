
This document describes how to install the Self-Service Portal (SSP) SSP Inquiry Management feature.

## Prerequisites

| FEATURE              | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|-------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core      | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Click and Collect | {{site.version}} | [Enable Click and Collect](/docs/pbc/all/service-point-management/{{site.version}}/unified-commerce/enable-click-collect.html)                                      |
| Self-Service Portal      | {{site.version}} | [Install Self-Service Portal](/docs/pbc/all/miscellaneous/{{site.version}}/ssp/install-ssp-features.md)                                                         |

## Install the required modules

Install the required packages using Composer:

```bash
composer require spryker-feature/ssp-service-management:"^0.1.2" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following package is listed in `composer.lock`:

| MODULE               | EXPECTED DIRECTORY                            |
|----------------------|-----------------------------------------------|
| SspServiceManagement | vendor/spryker-feature/ssp-service-management |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                                                      | SPECIFICATION                                                                        | NAMESPACE                           |
|--------------------------------------------------------------------|--------------------------------------------------------------------------------------|-------------------------------------|
| ClickAndCollectPageExampleConfig::CLICK_AND_COLLECT_SHIPMENT_TYPES | Shipment types supported by the Click&Collect feature.                       | Pyz\Yves\ClickAndCollectPageExample |
| SspServiceManagementConfig::getDefaultMerchantReference()          | Reference of a merchant used for creating product offers from the Back Office. | Pyz\Zed\SspServiceManagement        |
| DataImportConfig::getFullImportTypes()                             | List of data import entities to be imported during a full import.              | Pyz\Zed\DataImport                  |

**src/Pyz/Yves/ClickAndCollectPageExample/ClickAndCollectPageExampleConfig.php**

```php
declare(strict_types = 1);

namespace Pyz\Yves\ClickAndCollectPageExample;

use SprykerShop\Yves\ClickAndCollectPageExample\ClickAndCollectPageExampleConfig as SprykerClickAndCollectPageExampleConfig;

class ClickAndCollectPageExampleConfig extends SprykerClickAndCollectPageExampleConfig
{
    /**
     * @uses \SprykerFeature\Yves\SspServiceManagement\SspServiceManagementConfig::SHIPMENT_TYPE_ON_SITE_SERVICE
     *
     * @var string
     */
    protected const SHIPMENT_TYPE_ON_SITE_SERVICE = 'on-site-service';

    /**
     * @var list<string>
     */
    protected const CLICK_AND_COLLECT_SHIPMENT_TYPES = [
        self::SHIPMENT_TYPE_ON_SITE_SERVICE,
        self::SHIPMENT_TYPE_DELIVERY,
        self::SHIPMENT_TYPE_PICKUP,
    ];
}
```

**src/Pyz/Zed/SspServiceManagement/SspServiceManagementConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\SspServiceManagement;

use SprykerFeature\Zed\SspServiceManagement\SspServiceManagementConfig as SprykerSspServiceManagementConfig;

class SspServiceManagementConfig extends SprykerSspServiceManagementConfig
{
    /**
     * @return string
     */
    public function getDefaultMerchantReference(): string
    {
        return 'MER000001';
    }
}
```

**src/Pyz/Zed/DataImport/DataImportConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\DataImport;

use Pyz\Zed\DataImport\DataImportConfig;
use SprykerFeature\Zed\SspServiceManagement\SspServiceManagementConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    /**
     * @return array<string>
     */
    public function getFullImportTypes(): array
    {
        return [
            SspServiceManagementConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_TYPE,
            SspServiceManagementConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_TO_PRODUCT_ABSTRACT_TYPE,
            SspServiceManagementConfig::IMPORT_TYPE_PRODUCT_SHIPMENT_TYPE,
        ];
    }
}
```


## Set up database schema

Apply schema updates:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure the following changes occurred in the database:

| DATABASE ENTITY                                   | TYPE   | EVENT   |
|---------------------------------------------------|--------|---------|
| spy_product_shipment_type                         | table  | created |
| spy_sales_product_abstract_type                   | table  | created |
| spy_sales_order_item_product_abstract_type        | table  | created |
| spy_product_abstract_type                         | table  | created |
| spy_product_abstract_to_product_abstract_type     | table  | created |
| spy_product.is_service_date_time_enabled          | column | added   |
| spy_sales_order_item_metadata.scheduled_at        | column | added   |
| spy_sales_order_item.is_service_date_time_enabled | column | added   |

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfer objects have been generated:

| TRANSFER                            | TYPE     | EVENT   | PATH                                                                      |
|-------------------------------------|----------|---------|---------------------------------------------------------------------------|
| ProductConcrete                     | transfer | updated | src/Generated/Shared/Transfer/ProductConcreteTransfer                     |
| ProductAbstract                     | transfer | updated | src/Generated/Shared/Transfer/ProductAbstractTransfer                     |
| ShipmentTypeCriteria                | transfer | created | src/Generated/Shared/Transfer/ShipmentTypeCriteriaTransfer                |
| ShipmentType                        | transfer | created | src/Generated/Shared/Transfer/ShipmentTypeTransfer                        |
| ShipmentTypeCollection              | transfer | created | src/Generated/Shared/Transfer/ShipmentTypeCollectionTransfer              |
| ShipmentTypeConditions              | transfer | created | src/Generated/Shared/Transfer/ShipmentTypeConditionsTransfer              |
| ProductConcreteStorage              | transfer | created | src/Generated/Shared/Transfer/ProductConcreteStorageTransfer              |
| EventEntity                         | transfer | created | src/Generated/Shared/Transfer/EventEntityTransfer                         |
| ProductView                         | transfer | created | src/Generated/Shared/Transfer/ProductViewTransfer                         |
| ProductStorageCriteria              | transfer | created | src/Generated/Shared/Transfer/ProductStorageCriteriaTransfer              |
| ShipmentTypeStorageCollection       | transfer | created | src/Generated/Shared/Transfer/ShipmentTypeStorageCollectionTransfer       |
| ShipmentTypeStorageConditions       | transfer | created | src/Generated/Shared/Transfer/ShipmentTypeStorageConditionsTransfer       |
| ShipmentTypeStorageCriteria         | transfer | created | src/Generated/Shared/Transfer/ShipmentTypeStorageCriteriaTransfer         |
| ShipmentTypeStorage                 | transfer | created | src/Generated/Shared/Transfer/ShipmentTypeStorageTransfer                 |
| Store                               | transfer | updated | src/Generated/Shared/Transfer/StoreTransfer                               |
| ItemMetadata                        | transfer | created | src/Generated/Shared/Transfer/ItemMetadataTransfer                        |
| ProductImage                        | transfer | created | src/Generated/Shared/Transfer/ProductImageTransfer                        |
| ProductOffer                        | transfer | created | src/Generated/Shared/Transfer/ProductOfferTransfer                        |
| ServicePointCollection              | transfer | created | src/Generated/Shared/Transfer/ServicePointCollectionTransfer              |
| ServiceCollection                   | transfer | created | src/Generated/Shared/Transfer/ServiceCollectionTransfer                   |
| SspServiceCollection                | transfer | created | src/Generated/Shared/Transfer/SspServiceCollectionTransfer                |
| Item                                | transfer | updated | src/Generated/Shared/Transfer/ItemTransfer                                |
| Service                             | transfer | created | src/Generated/Shared/Transfer/ServiceTransfer                             |
| SspService                          | transfer | created | src/Generated/Shared/Transfer/SspServiceTransfer                          |
| MerchantCriteria                    | transfer | created | src/Generated/Shared/Transfer/MerchantCriteriaTransfer                    |
| MerchantCollection                  | transfer | created | src/Generated/Shared/Transfer/MerchantCollectionTransfer                  |
| MerchantStockCriteria               | transfer | created | src/Generated/Shared/Transfer/MerchantStockCriteriaTransfer               |
| StockCollection                     | transfer | created | src/Generated/Shared/Transfer/StockCollectionTransfer                     |
| ProductOfferStock                   | transfer | created | src/Generated/Shared/Transfer/ProductOfferStockTransfer                   |
| Locale                              | transfer | created | src/Generated/Shared/Transfer/LocaleTransfer                              |
| ServiceConditions                   | transfer | created | src/Generated/Shared/Transfer/ServiceConditionsTransfer                   |
| SspServiceConditions                | transfer | created | src/Generated/Shared/Transfer/SspServiceConditionsTransfer                |
| ServicesSearchConditionGroup        | transfer | created | src/Generated/Shared/Transfer/ServicesSearchConditionGroupTransfer        |
| SspServicesSearchConditionGroup     | transfer | created | src/Generated/Shared/Transfer/SspServicesSearchConditionGroupTransfer     |
| ServiceCriteria                     | transfer | created | src/Generated/Shared/Transfer/ServiceCriteriaTransfer                     |
| SspServiceCriteria                  | transfer | created | src/Generated/Shared/Transfer/SspServiceCriteriaTransfer                  |
| OrderItemFilter                     | transfer | created | src/Generated/Shared/Transfer/OrderItemFilterTransfer                     |
| Quote                               | transfer | updated | src/Generated/Shared/Transfer/QuoteTransfer                               |
| SalesOrderItemCollectionRequest     | transfer | created | src/Generated/Shared/Transfer/SalesOrderItemCollectionRequestTransfer     |
| ProductOfferValidity                | transfer | created | src/Generated/Shared/Transfer/ProductOfferValidityTransfer                |
| ServicePointConditions              | transfer | created | src/Generated/Shared/Transfer/ServicePointConditionsTransfer              |
| ServicePointCriteria                | transfer | created | src/Generated/Shared/Transfer/ServicePointCriteriaTransfer                |
| ServicePoint                        | transfer | created | src/Generated/Shared/Transfer/ServicePointTransfer                        |
| Merchant                            | transfer | created | src/Generated/Shared/Transfer/MerchantTransfer                            |
| Stock                               | transfer | created | src/Generated/Shared/Transfer/StockTransfer                               |
| Payment                             | transfer | updated | src/Generated/Shared/Transfer/PaymentTransfer                             |
| PaymentMethodCriteria               | transfer | created | src/Generated/Shared/Transfer/PaymentMethodCriteriaTransfer               |
| PaymentMethodConditions             | transfer | created | src/Generated/Shared/Transfer/PaymentMethodConditionsTransfer             |
| PaymentMethodCollection             | transfer | created | src/Generated/Shared/Transfer/PaymentMethodCollectionTransfer             |
| Order                               | transfer | updated | src/Generated/Shared/Transfer/OrderTransfer                               |
| Error                               | transfer | created | src/Generated/Shared/Transfer/ErrorTransfer                               |
| SalesOrderItemCollectionResponse    | transfer | created | src/Generated/Shared/Transfer/SalesOrderItemCollectionResponseTransfer    |
| ItemCollection                      | transfer | created | src/Generated/Shared/Transfer/ItemCollectionTransfer                      |
| ItemState                           | transfer | created | src/Generated/Shared/Transfer/ItemStateTransfer                           |
| ServiceType                         | transfer | created | src/Generated/Shared/Transfer/ServiceTypeTransfer                         |
| PaymentMethod                       | transfer | created | src/Generated/Shared/Transfer/PaymentMethodTransfer                       |
| LocalizedAttributes                 | transfer | created | src/Generated/Shared/Transfer/LocalizedAttributesTransfer                 |
| ProductAbstractType                 | transfer | created | src/Generated/Shared/Transfer/ProductAbstractTypeTransfer                 |
| ProductAbstractTypeCollection       | transfer | created | src/Generated/Shared/Transfer/ProductAbstractTypeCollectionTransfer       |
| ProductAbstractTypeCriteria         | transfer | created | src/Generated/Shared/Transfer/ProductAbstractTypeCriteriaTransfer         |
| ProductAbstractTypeConditions       | transfer | created | src/Generated/Shared/Transfer/ProductAbstractTypeConditionsTransfer       |
| ProductPayload                      | transfer | created | src/Generated/Shared/Transfer/ProductPayloadTransfer                      |
| ProductPageSearch                   | transfer | created | src/Generated/Shared/Transfer/ProductPageSearchTransfer                   |
| ProductPageLoad                     | transfer | created | src/Generated/Shared/Transfer/ProductPageLoadTransfer                     |
| DataImporterConfiguration           | transfer | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer           |
| DataImporterDataSourceConfiguration | transfer | created | src/Generated/Shared/Transfer/DataImporterDataSourceConfigurationTransfer |
| DataImporterReaderConfiguration     | transfer | created | src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer     |
| DataImporterReport                  | transfer | created | src/Generated/Shared/Transfer/DataImporterReportTransfer                  |
| Sort                                | transfer | created | src/Generated/Shared/Transfer/SortTransfer                                |
| Pagination                          | transfer | created | src/Generated/Shared/Transfer/PaginationTransfer                          |
| CartChange                          | transfer | created | src/Generated/Shared/Transfer/CartChangeTransfer                          |
| Shipment                            | transfer | updated | src/Generated/Shared/Transfer/ShipmentTransfer                            |
| FacetConfig                         | transfer | created | src/Generated/Shared/Transfer/FacetConfigTransfer                         |
| ProductOfferStorage                 | transfer | created | src/Generated/Shared/Transfer/ProductOfferStorageTransfer                 |
| ServiceStorage                      | transfer | created | src/Generated/Shared/Transfer/ServiceStorageTransfer                      |
| ServicePointStorage                 | transfer | created | src/Generated/Shared/Transfer/ServicePointStorageTransfer                 |
| Address                             | transfer | created | src/Generated/Shared/Transfer/AddressTransfer                             |
| ServicePointSearchCollection        | transfer | created | src/Generated/Shared/Transfer/ServicePointSearchCollectionTransfer        |
| ServicePointSearchRequest           | transfer | created | src/Generated/Shared/Transfer/ServicePointSearchRequestTransfer           |
| ServicePointSearch                  | transfer | created | src/Generated/Shared/Transfer/ServicePointSearchTransfer                  |
| SaveOrder                           | transfer | created | src/Generated/Shared/Transfer/SaveOrderTransfer                           |
| Customer                            | transfer | updated | src/Generated/Shared/Transfer/CustomerTransfer                            |
| CompanyBusinessUnitCollection       | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitCollectionTransfer       |
| CompanyBusinessUnitCriteriaFilter   | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitCriteriaFilterTransfer   |
| FilterField                         | transfer | created | src/Generated/Shared/Transfer/FilterFieldTransfer                         |
| CompanyUser                         | transfer | updated | src/Generated/Shared/Transfer/CompanyUserTransfer                         |
| CompanyBusinessUnit                 | transfer | updated | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer                 |
| Company                             | transfer | updated | src/Generated/Shared/Transfer/CompanyTransfer                             |
| PageMap                             | transfer | created | src/Generated/Shared/Transfer/PageMapTransfer                             |

{% endinfo_block %}

## Configure navigation

Add the `Services` and `Offers` sections to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <sales>
        <ssp-service-management>
            <label>Services</label>
            <title>Services</title>
            <bundle>ssp-service-management</bundle>
            <controller>list</controller>
            <action>index</action>
        </ssp-service-management>
    </sales>
    <product-offer-gui>
        <label>Offers</label>
        <title>Offers</title>
        <bundle>product-offer-gui</bundle>
        <controller>list</controller>
        <action>index</action>
    </product-offer-gui>
</config>
```

{% info_block warningBox "Verification" %}

Make sure the following menu items are available in the Back Office navigation:

- **Sales** > **Services**
- **Marketplace** > **Offers**

{% endinfo_block %}

## Add translations

1. Append the glossary:

```csv
ssp_service_management.validation.no_order_items_provided,No order items provided.,en_US
ssp_service_management.validation.no_order_items_provided,Keine Auftragspositionen angegeben.,de_DE
ssp_service_management.validation.order_not_found,Order with ID %id% not found.,en_US
ssp_service_management.validation.order_not_found,Bestellung mit ID %id% nicht gefunden.,de_DE
ssp_service_management.validation.no_payment_methods_found,No payment methods found for this order.,en_US
ssp_service_management.validation.no_payment_methods_found,Keine Zahlungsmethoden für diese Bestellung gefunden.,de_DE
ssp_service_management.list.search_placeholder,Search,en_US
ssp_service_management.list.search_placeholder,Search,de_DE
ssp_service_management.list.search_button,Search,en_US
ssp_service_management.list.search_button,Suchen,de_DE
ssp_service_management.list.title,Services,en_US
ssp_service_management.list.title,Dienstleistungen,de_DE
ssp_service_management.list.order_reference,Order Reference,en_US
ssp_service_management.list.order_reference,Bestellreferenz,de_DE
ssp_service_management.list.product_name,Service Name,en_US
ssp_service_management.list.product_name,Servicename,de_DE
ssp_service_management.list.service_sku,SKU,en_US
ssp_service_management.list.service_sku,SKU,de_DE
ssp_service_management.list.scheduled_at,Time and Date,en_US
ssp_service_management.list.scheduled_at,Zeit und Datum,de_DE
ssp_service_management.list.created_at,Created At,en_US
ssp_service_management.list.created_at,Erstellt am,de_DE
ssp_service_management.list.empty,You don't have any services yet.,en_US
ssp_service_management.list.empty,Sie haben noch keine Dienstleistungen.,de_DE
ssp_service_management.list.widget.title,Services,en_US
ssp_service_management.list.widget.title,Dienstleistungen,de_DE
ssp_service_management.list.state,State,en_US
ssp_service_management.list.state,Status,de_DE
ssp_service_management.list.reset_button,Reset,en_US
ssp_service_management.list.reset_button,Zurücksetzen,de_DE
ssp_service_management.list.my_services,My Services,en_US
ssp_service_management.list.my_services,Meine Dienstleistungen,de_DE
ssp_service_management.list.business_unit_services,Business Unit Services,en_US
ssp_service_management.list.business_unit_services,Geschäftsbereich Dienstleistungen,de_DE
ssp_service_management.list.company_services,Company Services,en_US
ssp_service_management.list.company_services,Unternehmensdienstleistungen,de_DE
ssp_service_management.update_scheduled_time,Change scheduled time,en_US
ssp_service_management.update_scheduled_time,Geplante Zeit ändern,de_DE
ssp_service_management.update_scheduled_time.service.sku,SKU,en_US
ssp_service_management.update_scheduled_time.service.sku,SKU,de_DE
ssp_service_management.update_scheduled_time.service.name,Name,en_US
ssp_service_management.update_scheduled_time.service.name,Name,de_DE
ssp_service_management.update_scheduled_time.service.quantity,Quantity,en_US
ssp_service_management.update_scheduled_time.service.quantity,Menge,de_DE
ssp_service_management.update_scheduled_time.service.state,State,en_US
ssp_service_management.update_scheduled_time.service.state,Status,de_DE
ssp_service_management.update_scheduled_time.title,Update Service Scheduled Time,en_US
ssp_service_management.update_scheduled_time.title,Geplante Servicezeit aktualisieren,de_DE
ssp_service_management.update_scheduled_time.success,Order item rescheduled successfully.,en_US
ssp_service_management.update_scheduled_time.success,Bestellposition erfolgreich neu geplant.,de_DE
ssp_service_management.update_scheduled_time.order_item_details,Order Item Details,en_US
ssp_service_management.update_scheduled_time.order_item_details,Bestellpositionsdetails,de_DE
ssp_service_management.update_scheduled_time.button.save,Save,en_US
ssp_service_management.update_scheduled_time.button.save,Speichern,de_DE
ssp_service_management.update_scheduled_time.button.cancel,Cancel,en_US
ssp_service_management.update_scheduled_time.button.cancel,Abbrechen,de_DE
ssp_service_management.update_scheduled_time.error.order_item_not_found,Order item with uuid %uuid% not found.,en_US
ssp_service_management.update_scheduled_time.error.order_item_not_found,Bestellposition mit UUID %uuid% nicht gefunden.,de_DE
ssp_service_management.list.field.business_unit,Business Unit,en_US
ssp_service_management.list.field.business_unit,Geschäftsbereich,de_DE
ssp_service_management.list.button.view,View,en_US
ssp_service_management.list.button.view,Ansehen,de_DE
ssp_service_management.product.no_shipment_types_available,Keine Versandarten für dieses Produkt verfügbar.,de_DE
ssp_service_management.product.no_shipment_types_available,No shipping types available for this product.,en_US
ssp_service_management.product.shipment_types,Versandarten,de_DE
ssp_service_management.product.shipment_types,Shipment Types,en_US
ssp_service_management.product.select_service_point,Wählen Sie einen Servicepunkt,de_DE
ssp_service_management.product.select_service_point,Select a service point,en_US
ssp_service_management.product.service_point_required,Ein Servicepunkt ist für dieses Produkt erforderlich,de_DE
ssp_service_management.product.service_point_required,A service point is required for this product,en_US
ssp_service_management.cart_item.service_point.name,Service point,en_US
ssp_service_management.cart_item.service_point.name,Servicepunkt,de_DE
ssp_service_management.product.service_date_time,Choose date and time,en_US
ssp_service_management.product.service_date_time,Wählen Sie Datum und Uhrzeit,de_DE
product.filter.product-abstract-types,Product Abstract Types,en_US
product.filter.product-abstract-types,Produktabstraktsarten,de_DE
```

2. Append `shipment.csv`:

```csv
on-site-service,On-Site Service,On-Site Service,Tax Exempt
```

3. Append `shipment_type.csv`:

```csv
on-site-service,On-Site Service,1
```

4. Append `service.csv`:

```csv
s3,sp1,on-site-service,1
```

5. Append `service_type.csv`:

```csv
On-Site Service,on-site-service
```

6. Append `shipment_method_shipment_type.csv`:

```csv
on-site-service,on-site-service
```

7. Append `shipment_type_service_type.csv`:

```csv
on-site-service,on-site-service
```

8. Append `shipment_method_store.csv`:

```csv
on-site-service,DE,EUR,,0
```

9. Append `product_abstract_product_abstract_type.csv`:

```csv
abstract_sku,product_abstract_type_key
001,product
666,service
```

11. Append `product_abstract_type.csv`:

```csv
key,name
product,product
service,service
```

12. Append `shipment_type_store.csv`:

```csv
on-site-service,DE
```

13. Append `shipment_price.csv`:

```csv
on-site-service,DE,EUR,,0
```

14. Append `product_shipment_type.csv`:

```csv
concrete_sku,shipment_type_key
001_25904006,delivery
```

## Change the data import recipes

1. Enable the `product-shipment-type` and `product-abstract-product-abstract-type` data imports in the following files:

- `data/import/local/full_AT.yml`
- `data/import/local/full_DE.yml`
- `data/import/local/full_EU.yml`
- `data/import/local/full_US.yml`

```yaml
- data_entity: product-shipment-type
  source: data/import/common/common/product_shipment_type.csv

- data_entity: product-abstract-product-abstract-type
  source: data/import/common/common/product_abstract_product_abstract_type.csv
```

## Import data

Import glossary and demo data:

```bash
console data:import glossary
console data:import product-abstract-product-abstract-type
console data:import product-abstract-type
console data:import product-shipment-type
console data:import shipment-price
console data:import shipment-type-store
console data:import product-abstract-product-abstract-type
console data:import shipment-method-store
console data:import shipment-type-service-type
console data:import shipment-method-shipment-type
console data:import service-type
console data:import service
console data:import shipment-type
console data:import shipment
```

{% info_block warningBox "Verification" %}

* Make sure the glossary keys have been added to `spy_glossary_key` and `spy_glossary_translation` tables.
* Make sure the following tables contain the imported data:
    - `spy_product_shipment_type`
    - `spy_sales_product_abstract_type`
    - `spy_sales_order_item_product_abstract_type`
    - `spy_product_abstract_type`
    - `spy_product_abstract_to_product_abstract_type`

{% endinfo_block %}



## Set up behavior

| PLUGIN                                                     | SPECIFICATION                                                                                                                              | PREREQUISITES | NAMESPACE                                                                      |
|------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------|
| ProductAbstractTypeFacetConfigTransferBuilderPlugin        | Configures a facet filter for product abstract types as an enumeration type with multi-value support.                                      |            | SprykerFeature\Client\SspServiceManagement\Plugin\Catalog                      |
| ShipmentTypeProductViewExpanderPlugin                      | Adds shipment type information to product view based on provided shipment type identifiers.                                    |            | SprykerFeature\Client\SspServiceManagement\Plugin\ProductStorage               |
| ProductOfferPreAddToCartPlugin                             | Adds the product offer reference to an item during the add-to-cart process.                                                               |            | SprykerFeature\Yves\SspServiceManagement\Plugin\CartPage                       |
| ServicePointPreAddToCartPlugin                             | Associates a service point with a cart item using a provided product offer reference and service point UUID.                        |            | SprykerFeature\Yves\SspServiceManagement\Plugin\CartPage                       |
| ShipmentTypePreAddToCartPlugin                             | Associates a shipment type with a cart item during the add-to-cart process.                                                              |            | SprykerFeature\Yves\SspServiceManagement\Plugin\CartPage                       |
| ServiceDateTimePreAddToCartPlugin                          | Sets the service date and time in item metadata when the "scheduled at" parameter is provided during the add-to-cart process.          |            | SprykerFeature\Yves\SspServiceManagement\Plugin\CartPage                       |
| SspServiceManagementPageRouteProviderPlugin                | Defines and adds routes for managing service points, searching, listing customer services, updating service times, and canceling services. |            | SprykerFeature\Yves\SspServiceManagement\Plugin\Router                         |
| ProductAbstractTypeProductAbstractPostCreatePlugin         | Adds product abstract type information after creating a product abstract.                                                                  |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product           |
| ProductAbstractTypeProductAbstractAfterUpdatePlugin        | Updates product abstract type information after updating a product abstract.                                                               |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product           |
| ShipmentTypeProductConcretePostCreatePlugin                | Adds shipment type information after creating a product concrete.                                                                          |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product           |
| ShipmentTypeProductConcretePostUpdatePlugin                | Updates shipment type information after updating a product concrete.                                                                       |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product           |
| ShipmentTypeProductConcreteExpanderPlugin                  | Expands product concrete data with shipment type information.                                                                              |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product           |
| ProductAbstractTypeProductAbstractExpanderPlugin           | Expands product abstract data with product abstract type information.                                                                      |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product           |
| ProductAbstractTypeProductPageDataExpanderPlugin           | Expands product page data with product abstract type information.                                                                          |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductPageSearch |
| ProductAbstractTypeProductPageDataLoaderPlugin             | Loads product abstract type data for product page search.                                                                                  |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductPageSearch |
| ProductAbstractTypeMapExpanderPlugin                       | Expands product abstract map data with product abstract type information.                                                                  |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductPageSearch |
| ShipmentTypeProductConcreteStorageCollectionExpanderPlugin | Expands product concrete storage collection with shipment type information.                                                                |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductStorage    |
| SspShipmentTypeQuoteExpanderPlugin                         | Expands quote data with SSP shipment type information.                                                                                     |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Quote             |
| ServicePointQuoteExpanderPlugin                            | Expands quote data with service point information.                                                                                         |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Quote             |
| ScheduleTimeOrderItemExpanderPreSavePlugin                 | Expands order item data with scheduled time information before saving.                                                                     |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Sales             |
| ProductTypeOrderItemsPostSavePlugin                        | Processes product type information for order items after saving an order.                                                                           |            | SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Sales             |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php

declare(strict_types = 1);

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use SprykerFeature\Client\SspServiceManagement\Plugin\Catalog\ProductAbstractTypeFacetConfigTransferBuilderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return array<\Spryker\Client\Catalog\Dependency\Plugin\FacetConfigTransferBuilderPluginInterface>
     */
    protected function getFacetConfigTransferBuilderPlugins(): array
    {
        return [
            new ProductAbstractTypeFacetConfigTransferBuilderPlugin(),
        ];
    }
    
    /**
     * @return array<string, array<\Spryker\Client\Catalog\Dependency\Plugin\FacetConfigTransferBuilderPluginInterface>>
     */
    protected function getFacetConfigTransferBuilderPluginVariants(): array
    {
        return [
            SearchHttpConfig::TYPE_SEARCH_HTTP => [
                new ProductAbstractTypeFacetConfigTransferBuilderPlugin(),
            ],
      ];
    }
}
```

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php

declare(strict_types = 1);

namespace Pyz\Client\ProductStorage;

use SprykerFeature\Client\SspServiceManagement\Plugin\ProductStorage\ShipmentTypeProductViewExpanderPlugin;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface>
     */
    protected function getProductViewExpanderPlugins(): array
    {
        /** @var array<\Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface> $plugins */
        $plugins = [
            new ShipmentTypeProductViewExpanderPlugin(),
        ];

        return $plugins;
}
```

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php

declare(strict_types = 1);

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerFeature\Yves\SspServiceManagement\Plugin\CartPage\ProductOfferPreAddToCartPlugin;
use SprykerFeature\Yves\SspServiceManagement\Plugin\CartPage\ServiceDateTimePreAddToCartPlugin;
use SprykerFeature\Yves\SspServiceManagement\Plugin\CartPage\ServicePointPreAddToCartPlugin;
use SprykerFeature\Yves\SspServiceManagement\Plugin\CartPage\ShipmentTypePreAddToCartPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CartPageExtension\Dependency\Plugin\PreAddToCartPluginInterface>
     */
    protected function getPreAddToCartPlugins(): array
    {
        return [
            new ProductOfferPreAddToCartPlugin(),
            new ServicePointPreAddToCartPlugin(),
            new ShipmentTypePreAddToCartPlugin(),
            new ServiceDateTimePreAddToCartPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerFeature\Yves\SspServiceManagement\Plugin\Router\SspServiceManagementPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SspServiceManagementPageRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Cart\ProductAbstactTypeItemExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Cart\ServicePointItemExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Cart\SspShipmentTypeItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            new SspShipmentTypeItemExpanderPlugin(),
            new ProductAbstactTypeItemExpanderPlugin(),
            new ServicePointItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\DataImport\ProductAbstractToProductAbstractTypeDataImportPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\DataImport\ProductAbstractTypeDataImportPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\DataImport\ProductShipmentTypeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
           new ProductShipmentTypeDataImportPlugin(),
           new ProductAbstractTypeDataImportPlugin(),
           new ProductAbstractToProductAbstractTypeDataImportPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use SprykerFeature\Zed\SspServiceManagement\SspServiceManagementConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @var string
     */
    protected const COMMAND_SEPARATOR = ':';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SspServiceManagementConfig::IMPORT_TYPE_PRODUCT_SHIPMENT_TYPE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SspServiceManagementConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_TYPE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SspServiceManagementConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_TO_PRODUCT_ABSTRACT_TYPE),         
        ];
    }

}
```

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product\ProductAbstractTypeProductAbstractAfterUpdatePlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product\ProductAbstractTypeProductAbstractPostCreatePlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product\ProductAbstractTypesProductAbstractExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product\ShipmentTypeProductConcreteExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product\ShipmentTypeProductConcretePostCreatePlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Product\ShipmentTypeProductConcretePostUpdatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * The order of execution is important to support Inherited scope and sub-entity functionality
     *
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPostCreatePluginInterface>
     */
    protected function getProductAbstractPostCreatePlugins(): array
    {
        return [
            new ProductAbstractTypeProductAbstractPostCreatePlugin(),
        ];
    }
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginUpdateInterface>
     */
    protected function getProductAbstractAfterUpdatePlugins(Container $container): array // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
    {
        return [
            new ProductAbstractTypeProductAbstractAfterUpdatePlugin(),
        ];
    }
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteCreatePluginInterface>
     */
    protected function getProductConcreteAfterCreatePlugins(Container $container): array // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
    {
        return [
            new ShipmentTypeProductConcretePostCreatePlugin(),
        ];
    }
    
     /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Product\Dependency\Plugin\ProductConcretePluginUpdateInterface>
     */
    protected function getProductConcreteAfterUpdatePlugins(Container $container): array // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
    {
        return [
            new ShipmentTypeProductConcretePostUpdatePlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface>
     */
    protected function getProductConcreteExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductConcreteExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ProductAbstractTypeFormExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ProductAbstractTypeProductAbstractFormDataProviderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ProductAbstractTypeProductAbstractTransferMapperPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ServiceDateTimeEnabledProductConcreteFormEditDataProviderExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ServiceDateTimeEnabledProductConcreteFormExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ServiceDateTimeEnabledProductFormTransferMapperExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ShipmentTypeProductConcreteFormEditDataProviderExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ShipmentTypeProductConcreteFormExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductManagement\ShipmentTypeProductFormTransferMapperExpanderPlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormEditDataProviderExpanderPluginInterface>
     */
    protected function getProductConcreteFormEditDataProviderExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductConcreteFormEditDataProviderExpanderPlugin(),
            new ServiceDateTimeEnabledProductConcreteFormEditDataProviderExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductFormTransferMapperExpanderPluginInterface>
     */
    protected function getProductFormTransferMapperExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductFormTransferMapperExpanderPlugin(),
            new ServiceDateTimeEnabledProductFormTransferMapperExpanderPlugin(),
        ];
    }
    
     /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractTransferMapperPluginInterface>
     */
    protected function getProductAbstractTransferMapperPlugins(): array
    {
        return [
            new ProductAbstractTypeProductAbstractTransferMapperPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormExpanderPluginInterface>
     */
    protected function getProductAbstractFormExpanderPlugins(): array
    {
        return [
            new ProductAbstractTypeFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormExpanderPluginInterface>
     */
    protected function getProductConcreteFormExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductConcreteFormExpanderPlugin(),
            new ServiceDateTimeEnabledProductConcreteFormExpanderPlugin(),
        ];
    }
    
     /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormDataProviderExpanderPluginInterface>
     */
    protected function getProductAbstractFormDataProviderExpanderPlugins(): array
    {
        return [
            new ProductAbstractTypeProductAbstractFormDataProviderPlugin(),
        ];
    }
   
}
```

**src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;
use SprykerFeature\Shared\SspServiceManagement\SspServiceManagementConfig;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductPageSearch\ProductAbstractTypeMapExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductPageSearch\ProductAbstractTypeProductPageDataExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductPageSearch\ProductAbstractTypeProductPageDataLoaderPlugin;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface>|array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataExpanderPluginInterface>
     */
    protected function getDataExpanderPlugins(): array
    {
        $dataExpanderPlugins = [];
        $dataExpanderPlugins[SspServiceManagementConfig::PLUGIN_PRODUCT_ABSTRACT_TYPE_DATA] = new ProductAbstractTypeProductPageDataExpanderPlugin();

        return $dataExpanderPlugins;
    }
    
     /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface>
     */
    protected function getDataLoaderPlugins(): array
    {
        return [

            new ProductAbstractTypeProductPageDataLoaderPlugin(),
        ];
    }
    
     /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface>
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new ProductAbstractTypeMapExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductStorage;

use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\ProductStorage\ShipmentTypeProductConcreteStorageCollectionExpanderPlugin;
use Spryker\Zed\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductStorageExtension\Dependency\Plugin\ProductConcreteStorageCollectionExpanderPluginInterface>
     */
    protected function getProductConcreteStorageCollectionExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductConcreteStorageCollectionExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Quote\ServicePointQuoteExpanderPlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Quote\SspShipmentTypeQuoteExpanderPlugin;
use Spryker\Zed\ShipmentTypeCart\Communication\Plugin\Quote\ShipmentTypeQuoteExpanderPlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{

    /**
     * @return list<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteExpanderPluginInterface>
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            new SspShipmentTypeQuoteExpanderPlugin(),
            new ServicePointQuoteExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Sales\ProductTypeOrderItemsPostSavePlugin;
use SprykerFeature\Zed\SspServiceManagement\Communication\Plugin\Sales\ScheduleTimeOrderItemExpanderPreSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface>
     */
    protected function getOrderItemExpanderPreSavePlugins(): array
    {
        return [
            new ScheduleTimeOrderItemExpanderPreSavePlugin(),
        ];
    }
    
     /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new ProductTypeOrderItemsPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Catalog** > **Products**.
2. Create an abstract product with a **service** product type.
3. For the abstract product you've created, create a concrete product with the following settings:
  * Enable **Service Date and Time**
  * Add **Delivery** and **On-Site Service** shipment types
  

### B. Set Up Product Offers for the Service Product

- **Create a Product Offer:**
  - Generate one or more product offers for the service product in the backoffice.
  - Verify that the offer creation form pre-populates with correct product information.

- **Attach the Offer to Service Points:**
  - Confirm that you can assign one or more service points (locations where the service is provided) to the product offer.
  - Check that the list of available service points is updated and reflects the intended configuration.

- **Add Shipment Type (On-Site Service) to the Offer:**
  - Ensure that the product offer includes the on-site service shipment type.
  - Validate that the offer details correctly display the assigned shipment type(s).

{% endinfo_block %}

### Set up widgets

Set up widgets as follows:

1. Register the following plugins to enable widgets:

| PLUGIN                                  | SPECIFICATION                                                                | PREREQUISITES | NAMESPACE                                       |
|-----------------------------------------|------------------------------------------------------------------------------|---------------|-------------------------------------------------|
| SspServiceMenuItemWidget                | Adds a menu item for accessing SSP services in the navigation.               |            | SprykerFeature\Yves\SspServiceManagement\Widget |
| SspServiceChangeScheduledTimeLinkWidget | Provides a link to change the scheduled time for a specific service.         |            | SprykerFeature\Yves\SspServiceManagement\Widget |
| ShipmentTypeServicePointSelectorWidget  | Displays a selector for choosing a service point based on the shipment type. |            | SprykerFeature\Yves\SspServiceManagement\Widget |
| ServicePointNameForItemWidget           | Displays the name of the service point associated with a specific cart item. |            | SprykerFeature\Yves\SspServiceManagement\Widget |
| ListItemsByShipmentTypeWidget           | Lists items in the cart grouped by their shipment type.                      |            | SprykerFeature\Yves\SspServiceManagement\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerFeature\Yves\SspServiceManagement\Widget\ListItemsByShipmentTypeWidget;
use SprykerFeature\Yves\SspServiceManagement\Widget\ServicePointNameForItemWidget;
use SprykerFeature\Yves\SspServiceManagement\Widget\ShipmentTypeServicePointSelectorWidget;
use SprykerFeature\Yves\SspServiceManagement\Widget\SspServiceChangeScheduledTimeLinkWidget;
use SprykerFeature\Yves\SspServiceManagement\Widget\SspServiceMenuItemWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SspServiceMenuItemWidget::class,
            SspServiceChangeScheduledTimeLinkWidget::class,
            ShipmentTypeServicePointSelectorWidget::class,
            ServicePointNameForItemWidget::class,
            ListItemsByShipmentTypeWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
console frontend:zed:install-dependencies
console frontend:zed:build
```

{% info_block warningBox "Verification" %}
### A. Product Discovery and Detail Verification

- **Search for the Service Product in the Catalog:**
  - In the storefront, use search or filtering (e.g., by product type) to locate the newly created service product.
  - Verify that the product appears in the catalog.

- **Access the Product Detail Page (PDP):**
  - Click on the service product to navigate to the PDP.
  - On the PDP, verify that:
    - A **service point selector** is visible so that customers can choose where they wish to receive the service.
    - A **date and time selector** for scheduling the service is available.
    - Both shipment type options are available if applicable (with **Delivery** set as the default).

### B. Add to Cart and Grouping Verification

- **Select Service Options on the PDP:**
  - Choose a service point from the dropdown (or selector).
  - Set the desired service date and time.
  - Verify that any validation (e.g., mandatory service point or date/time selection) works as expected.

- **Add the Product to the Cart:**
  - After selecting the service options, add the product to the cart.
  - In the cart, verify that:
    - The cart item displays the selected service point (usually shown at the bottom of the item details).
    - The product items are grouped by the shipment type chosen on the PDP. Confirm that if no change is made, the default (delivery) grouping is applied.
    - All selected options (service point, date, and time) are clearly visible to the customer.

- **Proceed with Checkout:**
  - Go through the checkout process.
  - Verify that the order placement completes without errors and that the order summary includes service-specific details.

## 3. Post-Checkout – Service Scheduling and Order Management

### A. Customer Profile (Storefront)

- **Access the “Services” Section in the Profile:**
  - After completing the order, navigate to the customer’s profile and open the **Services** tab.
  - Verify that:
    - The order-related service appears in the list with all associated details (scheduled date/time, product name, etc.).
    - There is an option to change the scheduled date/time.
    - Click on the view button to see the details of the order.
    - On the order details page, confirm that the service point and shipment type are displayed correctly.
    - You will see a button to change the scheduled time, and also to cancel the service.
    - When changing the scheduled time, the updated information is saved and immediately reflected in the order view page.

### B. Backoffice – Shop Owner Service Management

- **Access the Services Module in Backoffice:**
  - Log in as a shop owner or admin.
  - Navigate to the Services section in the backoffice.
  - Verify that:
    - All service orders (from multiple customers) are listed correctly.
    - Each service entry includes detailed information such as the product, customer, company, and scheduled date/time.
    - Click on the order reference link to see the details of the order.
    - There is a user interface element to modify the scheduled service date/time.
    - Any changes made in the backoffice are propagated in the customer’s storefront profile.

## 4. Catalog and Product Type Filter Verification

- **Check Catalog Updates:**  
  Confirm that the storefront catalog reflects the addition of the new service product.

- **Verify the Product Type Filter:**
  - Ensure that the filter control (usually part of the catalog sidebar or top navigation) includes options for filtering by product type.
  - Verify that the default selection includes **Physical Product** and **Service**.
  - Test filtering by each type independently to confirm that:
    - When **Physical Product** is selected, only non-service products appear.
    - When **Service** is selected, only service products are shown.
    - When both are selected, the catalog shows the full list.
{% endinfo_block %}
