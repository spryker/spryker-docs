{% info_block warningBox %}

SSP Service Management feature is not compatible with the [Order Amendment feature](/docs/pbc/all/order-management-system/latest/base-shop/order-amendment-feature-overview.html). Orders that include services booked through the SSP can't be amended.

{% endinfo_block %}

This document describes how to install the Self-Service Portal (SSP) SSP Service Management feature.

## Prerequisites

| FEATURE             | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|---------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core        | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Click and Collect   | 202507.0 | [Enable Click and Collect](/docs/pbc/all/service-point-management/latest/unified-commerce/enable-click-collect.html)                                      |
| Self-Service Portal | 202507.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)                                                         |

## Install the required modules

Install the required packages using Composer:

```bash
composer require spryker-feature/self-service-portal:"^202507.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following package is listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                                                                 | SPECIFICATION                                                                                                                                                | NAMESPACE                                   |
|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| ClickAndCollectPageExampleConfig::CLICK_AND_COLLECT_SHIPMENT_TYPES            | Defines the shipment types that are supported by Click & Collect, enabling customers to choose between different delivery or pickup options.                 | SprykerShop\Yves\ClickAndCollectPageExample |
| ClickAndCollectPageExampleConfig::DEFAULT_PICKABLE_SERVICE_TYPES              | Specifies default service types that are considered "pickable," meaning they can be selected for in-person service or pickup.                                | SprykerShop\Yves\ClickAndCollectPageExample |
| SelfServicePortalConfig::getDefaultMerchantReference()                        | Provides a default merchant reference used when creating product offers from the Back Office, ensuring that offers are associated with the correct merchant. | SprykerFeature\Zed\SelfServicePortal        |
| DataImportConfig::getFullImportTypes()                                        | Specifies the list of data import entities to be processed during a full data import, including service-related data.                                        | Pyz\Zed\DataImport                          |
| ServicePointWidgetConfig::getDeliveryShipmentTypeKeys()                       | Defines a list of shipment type keys that are treated as delivery types within the service point widget.                                                     | SprykerShop\Yves\ServicePointWidget         |
| ShipmentTypeWidgetConfig::getDeliveryShipmentTypes()                          | Defines a list of shipment type keys that are treated as delivery types within the shipment type widget.                                                     | SprykerShop\Yves\ShipmentTypeWidget         |
| SelfServicePortalConstants::GOOGLE_MAPS_API_KEY                               | Defines a Google Maps API key required for rendering maps and location-based features in the service point selector.                                         | SprykerFeature\Shared\SelfServicePortal     |
| SelfServicePortalConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING               | Maps payment methods to their corresponding state machine processes, ensuring that service orders follow the correct payment workflow.                       | SprykerFeature\Shared\SelfServicePortal     |
| SelfServicePortalConfig::getProductOfferServiceAvailabilityShipmentTypeKeys() | Returns a list of shipment type keys that are applicable for product offer service availability.                                                             | SprykerFeature\Client\SelfServicePortal     |

**src/Pyz/Yves/ClickAndCollectPageExample/ClickAndCollectPageExampleConfig.php**

```php
declare(strict_types = 1);

namespace Pyz\Yves\ClickAndCollectPageExample;

use SprykerShop\Yves\ClickAndCollectPageExample\ClickAndCollectPageExampleConfig as SprykerClickAndCollectPageExampleConfig;

class ClickAndCollectPageExampleConfig extends SprykerClickAndCollectPageExampleConfig
{
    /**
     * @uses \SprykerFeature\Yves\SelfServicePortal\SelfServicePortalConfig::SHIPMENT_TYPE_ON_SITE_SERVICE
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
    ];
    
    /**
     * @var list<string>
     */
    protected const DEFAULT_PICKABLE_SERVICE_TYPES = [
        self::SHIPMENT_TYPE_IN_CENTER_SERVICE,
    ];
}
```

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\SelfServicePortal;

use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{   
    /**
     * @var string
     */
    protected const MODULE_NAME = 'SelfServicePortal';
    
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
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    /**
     * @return array<string>
     */
    public function getFullImportTypes(): array
    {
        return [
            SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_TYPE,
            SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_TO_PRODUCT_ABSTRACT_TYPE,
            SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_SHIPMENT_TYPE,
        ];
    }
}
```

**src/Pyz/Yves/ServicePointWidget/ServicePointWidgetConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\ServicePointWidget;

use SprykerShop\Yves\ServicePointWidget\ServicePointWidgetConfig as SprykerServicePointWidgetConfig;

class ServicePointWidgetConfig extends SprykerServicePointWidgetConfig
{
    /**
     * @var string
     */
    protected const SHIPMENT_TYPE_ON_SITE_SERVICE = 'on-site-service';

    /**
     * @return list<string>
     */
    public function getDeliveryShipmentTypeKeys(): array
    {
        return [
            static::SHIPMENT_TYPE_DELIVERY,
            static::SHIPMENT_TYPE_ON_SITE_SERVICE,
        ];
    }
}
```

**src/Pyz/Yves/ShipmentTypeWidget/ShipmentTypeWidgetConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\ShipmentTypeWidget;

use SprykerShop\Yves\ShipmentTypeWidget\ShipmentTypeWidgetConfig as SprykerShipmentTypeWidgetConfig;

class ShipmentTypeWidgetConfig extends SprykerShipmentTypeWidgetConfig
{
    /**
     * @var string
     */
    protected const SHIPMENT_TYPE_ON_SITE_SERVICE = 'on-site-service';

    /**
     * @return array<int, string>
     */
    public function getDeliveryShipmentTypes(): array
    {
        return [
            static::SHIPMENT_TYPE_DELIVERY,
            static::SHIPMENT_TYPE_ON_SITE_SERVICE,
        ];
    }
}
```


**src/Pyz/Client/SelfServicePortal/SelfServicePortalConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\SelfServicePortal;

use SprykerFeature\Client\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    /**
     * @var string
     */
    protected const SHIPMENT_TYPE_IN_CENTER_SERVICE = 'in-center-service';

    /**
     * @return list<string>
     */
    public function getProductOfferServiceAvailabilityShipmentTypeKeys(): array
    {
        return [
            self::SHIPMENT_TYPE_IN_CENTER_SERVICE,
        ];
    }
}
```

**config/Shared/config_default.php**

```php
$config[SelfServicePortalConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = $config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING];
```

**config/Shared/config_default.php**

```php
$config[SelfServicePortalConstants::GOOGLE_MAPS_API_KEY] = getenv('SPRYKER_GOOGLE_MAPS_API_KEY') ?: '';
```



### Protect Google Maps API key

Your Google Maps API production key must be protected. Unprotected keys can be stolen and abused, leading to unauthorized usage and unexpected charges.

To protect the API key, follow the steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Select your project and open **APIs & Services → Credentials**.
3. Select the API key you want to protect.
4. Set application restrictions:
- For web: choose **HTTP referrers**
- For server: choose **IP addresses**
- For mobile apps: use **Android/iOS options**
5. For API restrictions, enable only required APIs, such as Maps JavaScript API or Places API.
6. Click **Save**.



## Set up database schema

Apply schema updates:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure the following changes occurred in the database:

| DATABASE ENTITY                            | TYPE   | EVENT   |
|--------------------------------------------|--------|---------|
| spy_product_shipment_type                  | table  | created |
| spy_sales_product_class                    | table  | created |
| spy_sales_order_item_product_class         | table  | created |
| spy_product_class                          | table  | created |
| spy_product_to_product_class               | table  | created |
| spy_sales_order_item_metadata.scheduled_at | column | added   |
| spy_service_point_address.longitude        | column | added   |
| spy_service_point_address.latitude         | column | added   |

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
| ServicesSearchCondition             | transfer | created | src/Generated/Shared/Transfer/ServicesSearchConditionTransfer             |
| SspServicesSearchCondition          | transfer | created | src/Generated/Shared/Transfer/SspServicesSearchConditionTransfer          |
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
    <ssp>
        <label>Customer Portal</label>
        <title>Customer Portal</title>
        <icon>fa-id-badge</icon>
        <pages>
            <self-service-portal-services>
                <label>Booked Services</label>
                <title>Booked Services</title>
                <bundle>self-service-portal</bundle>
                <controller>list-service</controller>
                <action>index</action>
                <icon>fa-paperclip</icon>
            </self-service-portal-services>
        </pages>
    </ssp>
</config>
```

{% info_block warningBox "Verification" %}

Make sure the following menu items are available in the Back Office navigation:

- **Sales** > **Services**
- **Marketplace** > **Offers**

{% endinfo_block %}

## Add translations

1. Append the glossary:

<details>
  <summary>Glossary</summary>

```csv
self_service_portal.service.product.no_shipment_types_available,No shipping types available for this product.,en_US
self_service_portal.service.product.no_shipment_types_available,Keine Versandarten für dieses Produkt verfügbar.,de_DE
self_service_portal.service.product.shipment_types,Shipment Types,en_US
self_service_portal.service.product.shipment_types,Versandarten,de_DE
self_service_portal.service.product.select_service_point,Select a service point,en_US
self_service_portal.service.product.select_service_point,Wählen Sie einen Servicepunkt,de_DE
self_service_portal.service.product.service_point_required,A service point is required for this product,en_US
self_service_portal.service.product.service_point_required,Ein Servicepunkt ist für dieses Produkt erforderlich,de_DE
self_service_portal.service.cart_item.service_point.name,Service point,en_US
self_service_portal.service.cart_item.service_point.name,Servicepunkt,de_DE
self_service_portal.service.product.service_date_time,Choose date and time,en_US
self_service_portal.service.product.service_date_time,Wählen Sie Datum und Uhrzeit,de_DE
self_service_portal.service.checkout.item_count,Number of Items,en_US
self_service_portal.service.checkout.item_count,Anzahl der Artikel,de_DE
ssp-service-management.info.service-without-shipment-type.removed,Service item %sku% without shipment type has been removed,en_US
ssp-service-management.info.service-without-shipment-type.removed,Serviceartikel %sku% ohne Versandart wurde entfernt,de_DE
self_service_portal.service.cart_item.scheduled_at,Date and time,en_US
self_service_portal.service.cart_item.scheduled_at,Datum und Uhrzeit,de_DE
self_service_portal.service.cancellation.error.no_items,No order items provided.,en_US
self_service_portal.service.cancellation.error.no_items,Keine Auftragspositionen vorhanden.,de_DE
self_service_portal.service.cancel_service,Cancel Service,en_US
self_service_portal.service.cancel_service,Dienstleistung stornieren,de_DE
self_service_portal.service.cancellation.success,Service has been successfully cancelled.,en_US
self_service_portal.service.cancellation.success,Die Dienstleistung wurde erfolgreich storniert.,de_DE
self_service_portal.service.cancellation.error,Failed to cancel the service.,en_US
self_service_portal.service.cancellation.error,Die Stornierung der Dienstleistung ist fehlgeschlagen.,de_DE
self_service_portal.service.validation.no_order_items_provided,No order items provided.,en_US
self_service_portal.service.validation.no_order_items_provided,Keine Auftragspositionen angegeben.,de_DE
self_service_portal.service.validation.status_change_failed,The status change failed.,en_US
self_service_portal.service.validation.status_change_failed,Die Statusänderung ist fehlgeschlagen.,de_DE
self_service_portal.service.validation.order_not_found,Order with ID %id% not found.,en_US
self_service_portal.service.validation.order_not_found,Bestellung mit ID %id% nicht gefunden.,de_DE
self_service_portal.service.validation.no_payment_methods_found,No payment methods found for this order.,en_US
self_service_portal.service.validation.no_payment_methods_found,Keine Zahlungsmethoden für diese Bestellung gefunden.,de_DE
self_service_portal.service.list.search_placeholder,Search,en_US
self_service_portal.service.list.search_placeholder,Suchen,de_DE
self_service_portal.service.list.search_button,Search,en_US
self_service_portal.service.list.search_button,Suchen,de_DE
self_service_portal.service.list.title,Services,en_US
self_service_portal.service.list.title,Dienstleistungen,de_DE
self_service_portal.service.list.order_reference,Order Reference,en_US
self_service_portal.service.list.order_reference,Bestellreferenz,de_DE
self_service_portal.service.list.product_name,Service Name,en_US
self_service_portal.service.list.product_name,Servicename,de_DE
self_service_portal.service.list.service_sku,SKU,en_US
self_service_portal.service.list.service_sku,SKU,de_DE
self_service_portal.service.list.scheduled_at,Time and Date,en_US
self_service_portal.service.list.scheduled_at,Zeit und Datum,de_DE
self_service_portal.service.list.created_at,Created At,en_US
self_service_portal.service.list.created_at,Erstellt am,de_DE
self_service_portal.service.list.empty,You don't have any services yet.,en_US
self_service_portal.service.list.empty,Sie haben noch keine Dienstleistungen.,de_DE
self_service_portal.service.list.widget.title,Services,en_US
self_service_portal.service.list.widget.title,Dienstleistungen,de_DE
self_service_portal.service.list.state,State,en_US
self_service_portal.service.list.state,Status,de_DE
self_service_portal.service.list.reset_button,Reset,en_US
self_service_portal.service.list.reset_button,Zurücksetzen,de_DE
self_service_portal.service.list.my_services,My Services,en_US
self_service_portal.service.list.my_services,Meine Dienstleistungen,de_DE
self_service_portal.service.list.business_unit_services,Business Unit Services,en_US
self_service_portal.service.list.business_unit_services,Dienstleistungen der Geschäftseinheit,de_DE
self_service_portal.service.list.company_services,Company Services,en_US
self_service_portal.service.list.company_services,Unternehmensdienstleistungen,de_DE
self_service_portal.service.update_scheduled_time,Change scheduled time,en_US
self_service_portal.service.update_scheduled_time,Geplante Zeit ändern,de_DE
self_service_portal.service.update_scheduled_time.service.sku,SKU,en_US
self_service_portal.service.update_scheduled_time.service.sku,SKU,de_DE
self_service_portal.service.update_scheduled_time.service.name,Name,en_US
self_service_portal.service.update_scheduled_time.service.name,Name,de_DE
self_service_portal.service.update_scheduled_time.service.quantity,Quantity,en_US
self_service_portal.service.update_scheduled_time.service.quantity,Menge,de_DE
self_service_portal.service.update_scheduled_time.service.state,State,en_US
self_service_portal.service.update_scheduled_time.service.state,Status,de_DE
self_service_portal.service.update_scheduled_time.title,Update Service Scheduled Time,en_US
self_service_portal.service.update_scheduled_time.title,Geplante Servicezeit aktualisieren,de_DE
self_service_portal.service.update_scheduled_time.success,Order item rescheduled successfully.,en_US
self_service_portal.service.update_scheduled_time.success,Bestellposition erfolgreich neu geplant.,de_DE
self_service_portal.service.update_scheduled_time.order_item_details,Order Item Details,en_US
self_service_portal.service.update_scheduled_time.order_item_details,Details zur Bestellposition,de_DE
self_service_portal.service.update_scheduled_time.button.save,Save,en_US
self_service_portal.service.update_scheduled_time.button.save,Speichern,de_DE
self_service_portal.service.update_scheduled_time.button.cancel,Cancel,en_US
self_service_portal.service.update_scheduled_time.button.cancel,Abbrechen,de_DE
self_service_portal.service.update_scheduled_time.error.order_item_not_found,Order item with uuid %uuid% not found.,en_US
self_service_portal.service.update_scheduled_time.error.order_item_not_found,Bestellposition mit UUID %uuid% nicht gefunden.,de_DE
self_service_portal.service.list.field.business_unit,Business Unit,en_US
self_service_portal.service.list.field.business_unit,Geschäftseinheit,de_DE
self_service_portal.service.list.button.view,View,en_US
self_service_portal.service.list.button.view,Ansehen,de_DE
customer.account.ssp_services,Services,en_US
customer.account.ssp_services,Dienstleistungen,de_DE
customer.account.no_ssp_services,There are no services at the moment,en_US
customer.account.no_ssp_services,Es sind keine Dienstleistungen vorhanden,de_DE
customer.ssp_service.order.reference,Order Reference,en_US
customer.ssp_service.order.reference,Bestellreferenz,de_DE
customer.ssp_service.customer,Customer,en_US
customer.ssp_service.customer,Kunde,de_DE
customer.ssp_service.company,Company,en_US
customer.ssp_service.company,Unternehmen,de_DE
customer.ssp_service.service,Service,en_US
customer.ssp_service.service,Dienstleistung,de_DE
customer.ssp_service.created_at,Date created,en_US
customer.ssp_service.created_at,Erstellungsdatum,de_DE
customer.ssp_service.status,Status,en_US
customer.ssp_service.status,Status,de_DE
customer.ssp_service.scheduled_at,Time and Date,en_US
customer.ssp_service.scheduled_at,Zeit und Datum,de_DE
customer.ssp_service.actions,Actions,en_US
customer.ssp_service.actions,Aktionen,de_DE
customer.ssp_service.view_ssp_service,View,en_US
customer.ssp_service.view_ssp_service,Anzeigen,de_DE
product.filter.product-abstract-types,Product Abstract Types,en_US
product.filter.product-abstract-types,Produktabstrakttypen,de_DE
customer.address.single_address_per_shipment_type,Set same address for all products,en_US
customer.address.single_address_per_shipment_type,Gleiche Adresse für alle Produkte festlegen,de_DE
```

</details>

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

- Make sure the glossary keys have been added to `spy_glossary_key` and `spy_glossary_translation` tables.
- Make sure the following tables contain the imported data:
  - `spy_product_shipment_type`
  - `spy_sales_product_abstract_type`
  - `spy_sales_order_item_product_abstract_type`
  - `spy_product_abstract_type`
  - `spy_product_abstract_to_product_abstract_type`

{% endinfo_block %}

## Import product labels for the service products

1. Prepare your data according to your requirements using our demo data:

**data/import/common/AT/product_label_store.csv**

```csv
name,store_name
Service,AT
Scheduled,AT
Spare parts,AT
```

**data/import/common/DE/product_label_store.csv**

```csv
name,store_name
Service,DE
Scheduled,DE
Spare parts,DE
```

**data/import/common/US/product_label_store.csv**

```csv
name,store_name
Service,US
Scheduled,US
Spare parts,US
```

| COLUMN     | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                           |
|------------|----------|-----------|--------------|------------------------------------------------------------|
| name       | ✓        | string    | Service      | Product label name (for example, Service, Scheduled, Spare parts). |
| store_name | ✓        | string    | DE           | Store to which the label is assigned (for example, AT, DE, US).    |


**data/import/common/common/product_label.csv**

```csv
name,is_active,is_dynamic,is_exclusive,front_end_reference,valid_from,valid_to,name.en_US,name.de_DE,product_abstract_skus,priority
Service,1,0,0,service,,,Service,Service,"service-001,service-002,service-003,service-004",4
Scheduled,1,0,0,scheduled,,,Scheduled,Geplant,"service-001,service-002,service-003,service-004",5
Spare parts,1,0,0,spare-parts,,,Spare parts,Ersatzteile,"service-001,service-002,service-003,service-004",6
```

| COLUMN                | REQUIRED | DATA TYPE              | DATA EXAMPLE              | DESCRIPTION                                                                                                                                 |
|-----------------------|----------|------------------------|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| name                  | ✓        | string                 | Service                   | Base (default) label name. Must be unique across labels; used to reference the label in other import files (for example, product_label_store).      |
| is_active             | ✓        | int (0 or 1)           | 1                         | Activation flag. 1 = label is active and visible; 0 = inactive (kept for future use).                                                       |
| is_dynamic            | ✗        | int (0 or 1)           | 0                         | Marks label as dynamic (rule-driven) when 1. Keep 0 for manually assigned/static labels.                                                    |
| is_exclusive          | ✗        | int (0 or 1)           | 0                         | When 1, this label suppresses display of other non-exclusive labels on the same product.                                                    |
| front_end_reference   | ✗        | string (slug)          | service                   | Front-end identifier/slug usable for CSS hooks, theming, or routing. Should be URL/identifier friendly (lowercase, dashes).                 |
| valid_from            | ✗        | datetime (Y-m-d H:i:s) | 2025-01-01 00:00:00       | Start of validity window. Leave empty for immediate/no start restriction.                                                                   |
| valid_to              | ✗        | datetime (Y-m-d H:i:s) | 2025-12-31 23:59:59       | End of validity window. Leave empty for no expiry.                                                                                          |
| name.en_US            | ✓        | string                 | Service                   | Localized label name for en_US. Required if the locale is part of the project storefront locales.                                           |
| name.de_DE            | ✗        | string                 | Ersatzteile               | Localized label name for de_DE. Add one column per supported locale (pattern: name.{locale}).                                               |
| product_abstract_skus | ✗        | comma-separated list   | "service-001,service-002" | List of abstract product SKUs assigned to this label. Empty when using dynamic rules or assigning later.                                    |
| priority              | ✗        | int                    | 4                         | Sorting / display priority. Lower or higher precedence depends on project logic (by default lower number = higher priority in many setups). |

2. Import data:

```bash
console data:import:product-label
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the following database tables:

- `spy_product_label`
- `spy_product_label_store`

{% endinfo_block %}

## Set up behavior

1. Add the following plugins:

| PLUGIN                                                                       | SPECIFICATION                                                                                                                              | PREREQUISITES | NAMESPACE                                                                    |
|------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------|
| ProductClassFacetConfigTransferBuilderPlugin                                 | Configures a facet filter for product classes as an enumeration type with multi-value support.                                             |               | SprykerFeature\Client\SelfServicePortal\Plugin\Catalog                       |
| ShipmentTypeProductViewExpanderPlugin                                        | Adds shipment type information to product view based on provided shipment type identifiers.                                                |               | SprykerFeature\Client\SelfServicePortal\Plugin\ProductStorage                |
| ProductOfferPreAddToCartPlugin                                               | Adds the product offer reference to an item during the add-to-cart process.                                                                |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                        |
| ServicePointPreAddToCartPlugin                                               | Associates a service point with a cart item using a provided product offer reference and service point UUID.                               |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                        |
| ShipmentTypePreAddToCartPlugin                                               | Associates a shipment type with a cart item during the add-to-cart process.                                                                |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                        |
| ServiceDateTimePreAddToCartPlugin                                            | Sets the service date and time in item metadata when the "scheduled at" parameter is provided during the add-to-cart process.              |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                        |
| SelfServicePortalPageRouteProviderPlugin                                     | Defines and adds routes for managing service points, searching, listing customer services, updating service times, and canceling services. |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                          |
| ShipmentTypeProductConcretePostCreatePlugin                                  | Adds shipment type information after creating a product concrete.                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ShipmentTypeProductConcretePostUpdatePlugin                                  | Updates shipment type information after updating a product concrete.                                                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ShipmentTypeProductConcreteExpanderPlugin                                    | Expands product concrete data with shipment type information.                                                                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ShipmentTypeProductConcreteStorageCollectionExpanderPlugin                   | Expands product concrete storage collection with shipment type information.                                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage     |
| SspShipmentTypeQuoteExpanderPlugin                                           | Expands quote data with SSP shipment type information.                                                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote              |
| ServicePointQuoteExpanderPlugin                                              | Expands quote data with service point information.                                                                                         |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote              |
| ScheduleTimeOrderItemExpanderPreSavePlugin                                   | Expands order item data with scheduled time information before saving.                                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| SspServiceShipmentTypePreReloadItemsPlugin                                   | Checks and removes service items without a shipment type from cart.                                                                        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart               |
| EditOfferProductOfferTableActionPlugin                                       | Expands the product offer table with an edit button.                                                                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductOfferGui    |
| SspServiceCancellableOrderItemExpanderPlugin                                 | Expands order items with an `isCancellable` property.                                                                                      |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| ServiceSspAssetManagementExpanderPlugin                                      | Expands assets with a services collection.                                                                                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement |
| ProductServiceClassNameTwigPlugin                                            | Adds the `serviceProductClassName` Twig global variable with the value from config.                                                        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Twig               |
| FileSizeFormatterTwigPlugin                                                  | Formats the file size into a human-readable format.                                                                                        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Twig               |
| SingleAddressPerShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin | Expands the checkout multi-shipping address form with single address per shipment type checkbox.                                           |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CustomerPage                    |
| ProductClassItemExpanderPlugin                                               | Expands cart items with the related product classes.                                                                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart               |
| ServicePointItemExpanderPlugin                                               | Expands cart items with a selected service point.                                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart               |
| ProductClassDataImportPlugin                                                 | Imports product classes.                                                                                                                   |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport         |
| ProductToProductClassDataImportPlugin                                        | Imports product to product class relations.                                                                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport         |
| ProductShipmentTypeDataImportPlugin                                          | Imports a product shipment type relation.                                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport         |
| ProductClassesProductConcreteExpanderPlugin                                  | Expands `ProductConcreteTransfer` with product classes.                                                                                    |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ProductClassProductConcreteAfterUpdatePlugin                                 | Updates product classes for an existing product concrete.                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ProductClassProductConcretePostCreatePlugin                                  | Saves product classes for a newly created product concrete.                                                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ShipmentTypeProductConcreteFormEditDataProviderExpanderPlugin                | Maps shipment types from product concrete to product form data.                                                                            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement  |
| ProductClassFormExpanderPlugin                                               | Expands product concrete form with a product class field.                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement  |
| ProductClassProductConcreteFormEditDataProviderExpanderPlugin                | Expands product concrete form data with product classes.                                                                                   |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement  |
| ProductClassProductConcreteTransferMapperPlugin                              | Maps product class data from form to `ProductConcreteTransfer`.                                                                            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement  |
| ShipmentTypeProductConcreteFormExpanderPlugin                                | Expands the `ProductConcreteForm` with a choice field for shipment types.                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement  |
| ShipmentTypeProductFormTransferMapperExpanderPlugin                          | Maps shipment type form data to `ProductConcreteTransfer`.                                                                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement  |
| ProductClassProductAbstractMapExpanderPlugin                                 | Adds product class names to product abstract search data.                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch  |
| ProductClassProductPageDataExpanderPlugin                                    | Expands the provided ProductPageSearchTransfer transfer object's data with product classes.                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch  |
| ProductClassProductPageDataLoaderPlugin                                      | Expands `ProductPageLoadTransfer` object with product class data.                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch  |
| ProductClassProductConcreteStorageCollectionExpanderPlugin                   | Expands `ProductConcreteStorage` transfers with product classes.                                                                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage     |
| ProductClassOrderExpanderPlugin                                              | Expands order items with product classes.                                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| ProductClassOrderItemsPostSavePlugin                                         | Persists product classes information from `ItemTransfer.productClasses`.                                                                   |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| SspProductClassSalesOrderItemCollectionPreDeletePlugin                       | Deletes related product class entries for given sales order items.                                                                         |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| CoordinatesServicePointSearchDataExpanderPlugin                              | Adds latitude and longitude coordinates to the service point search data.                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ServicePointSearch |
| ProductServiceAvailabilityStorageStrategyPlugin                              | Checks the availability of service products by verifying they have a service shipment type and at least one available product offer.       |               | SprykerFeature\Client\SelfServicePortal\Plugin\AvailabilityStorage           |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\SearchHttp\Plugin\SearchHttp\SearchHttpConfig;
use SprykerFeature\Client\SelfServicePortal\Plugin\Catalog\ProductClassFacetConfigTransferBuilderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return array<\Spryker\Client\Catalog\Dependency\Plugin\FacetConfigTransferBuilderPluginInterface>
     */
    protected function getFacetConfigTransferBuilderPlugins(): array
    {
        return [
            new ProductClassFacetConfigTransferBuilderPlugin(),
        ];
    }

    /**
     * @return array<string, array<\Spryker\Client\Catalog\Dependency\Plugin\FacetConfigTransferBuilderPluginInterface>>
     */
    protected function getFacetConfigTransferBuilderPluginVariants(): array
    {
        return [
            SearchHttpConfig::TYPE_SEARCH_HTTP => [
                new ProductClassFacetConfigTransferBuilderPlugin(),
            ],
        ];
    }
}
```

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductStorage;

use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;
use SprykerFeature\Client\SelfServicePortal\Plugin\ProductStorage\ShipmentTypeProductViewExpanderPlugin;

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
}
```

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ProductOfferPreAddToCartPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ServicePointPreAddToCartPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ShipmentTypePreAddToCartPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ServiceDateTimePreAddToCartPlugin;

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
use SprykerFeature\Yves\SelfServicePortal\Plugin\Router\SelfServicePortalPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SelfServicePortalPageRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart\ProductClassItemExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart\ServicePointItemExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart\SspShipmentTypeItemExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart\SspServiceShipmentTypePreReloadItemsPlugin;

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
            new ProductClassItemExpanderPlugin(),
            new ServicePointItemExpanderPlugin(),
        ];
    }
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface>
     */
    protected function getPreReloadPlugins(Container $container): array
    {
        return [
            new SspServiceShipmentTypePreReloadItemsPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\ProductShipmentTypeDataImportPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\ProductClassDataImportPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\ProductToProductClassDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
           new ProductShipmentTypeDataImportPlugin(),
           new ProductClassDataImportPlugin(),
           new ProductToProductClassDataImportPlugin(),
        ];
    }
}
```

<details>
  <summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig;
use Spryker\Zed\Kernel\Container;

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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_SHIPMENT_TYPE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_CLASS),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_TO_PRODUCT_CLASS),
        ];
    }

}
```

</details>


<details>
  <summary>src/Pyz/Zed/Product/ProductDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ShipmentTypeProductConcreteExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ShipmentTypeProductConcretePostCreatePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ShipmentTypeProductConcretePostUpdatePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ProductClassesProductConcreteExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ProductClassProductConcreteAfterUpdatePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ProductClassProductConcretePostCreatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteCreatePluginInterface>
     */
    protected function getProductConcreteAfterCreatePlugins(Container $container): array // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
    {
        return [
            new ShipmentTypeProductConcretePostCreatePlugin(),
            new ProductClassProductConcretePostCreatePlugin(),
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
            new ProductClassProductConcreteAfterUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface>
     */
    protected function getProductConcreteExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductConcreteExpanderPlugin(),
            new ProductClassesProductConcreteExpanderPlugin(),
        ];
    }
}
```

</details>



<details>
  <summary>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ProductClassProductConcreteFormEditDataProviderExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ShipmentTypeProductConcreteFormEditDataProviderExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ProductClassProductConcreteTransferMapperPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ShipmentTypeProductConcreteFormExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ShipmentTypeProductFormTransferMapperExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ProductClassFormExpanderPlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormEditDataProviderExpanderPluginInterface>
     */
    protected function getProductConcreteFormEditDataProviderExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductConcreteFormEditDataProviderExpanderPlugin(),
            new ProductClassProductConcreteFormEditDataProviderExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductFormTransferMapperExpanderPluginInterface>
     */
    protected function getProductFormTransferMapperExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductFormTransferMapperExpanderPlugin(),
            new ProductClassProductConcreteTransferMapperPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormExpanderPluginInterface>
     */
    protected function getProductConcreteFormExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductConcreteFormExpanderPlugin(),
            new ProductClassFormExpanderPlugin(),
        ];
    }
}
```

</details>


<details>
  <summary>src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch\ProductClassProductAbstractMapExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch\ProductClassProductPageDataExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch\ProductClassProductPageDataLoaderPlugin;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface>|array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataExpanderPluginInterface>
     */
    protected function getDataExpanderPlugins(): array
    {
        $dataExpanderPlugins = [];
        $dataExpanderPlugins[SelfServicePortalConfig::PLUGIN_PRODUCT_ABSTRACT_TYPE_DATA] = new ProductClassProductPageDataExpanderPlugin();

        return $dataExpanderPlugins;
    }

     /**
      * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface>
      */
    protected function getDataLoaderPlugins(): array
    {
        return [
            new ProductClassProductPageDataLoaderPlugin(),
        ];
    }

     /**
      * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface>
      */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new ProductClassProductAbstractMapExpanderPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Zed/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductStorage;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage\ShipmentTypeProductConcreteStorageCollectionExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage\ProductClassProductConcreteStorageCollectionExpanderPlugin;
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
            new ProductClassProductConcreteStorageCollectionExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote\ServicePointQuoteExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote\SspShipmentTypeQuoteExpanderPlugin;

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

<details>
  <summary>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\ScheduleTimeOrderItemExpanderPreSavePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspServiceCancellableOrderItemExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\ProductClassOrderExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\ProductClassOrderItemsPostSavePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspProductClassSalesOrderItemCollectionPreDeletePlugin;

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
      * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
      */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new SspServiceCancellableOrderItemExpanderPlugin(),
            new ProductClassOrderExpanderPlugin(),
        ];
    }

     /**
      * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
      */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new ProductClassOrderItemsPostSavePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new ProductClassOrderExpanderPlugin(),
        ];
    }

        /**
         * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesOrderItemCollectionPreDeletePluginInterface>
         */
    protected function getSalesOrderItemCollectionPreDeletePlugins(): array
    {
        return [
            new SspProductClassSalesOrderItemCollectionPreDeletePlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SelfServicePortal;

use SprykerFeature\Zed\SelfServicePortal\SprykerSelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement\ServiceSspAssetManagementExpanderPlugin;

class SelfServicePortalDependencyProvider extends SprykerSelfServicePortalDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Zed\SspAssetManagement\Dependency\Plugin\SspAssetManagementExpanderPluginInterface>
     */
    protected function getSspAssetManagementExpanderPlugins(): array
    {
        return [
            new ServiceSspAssetManagementExpanderPlugin(),
        ];
    }

}
```

**src/Pyz/Zed/ProductOfferGui/ProductOfferGuiDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\ProductOfferGui;

use Spryker\Zed\ProductOfferGui\ProductOfferGuiDependencyProvider as SprykerProductOfferGuiDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductOfferGui\EditOfferProductOfferTableActionPlugin;

class ProductOfferGuiDependencyProvider extends SprykerProductOfferGuiDependencyProvider
{

    /**
     * @return array<\Spryker\Zed\ProductOfferGuiExtension\Dependency\Plugin\ProductOfferTableExpanderPluginInterface>
     */
    protected function getProductOfferTableExpanderPlugins(): array
    {
        return [
            new EditOfferProductOfferTableActionPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ServicePointSearch/ServicePointSearchDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\ServicePointSearch;

use Spryker\Zed\ServicePointSearch\ServicePointSearchDependencyProvider as SprykerServicePointSearchDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ServicePointSearch\CoordinatesServicePointSearchDataExpanderPlugin;

class ServicePointSearchDependencyProvider extends SprykerServicePointSearchDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ServicePointSearchExtension\Dependency\Plugin\ServicePointSearchDataExpanderPluginInterface>
     */
    protected function getServicePointSearchDataExpanderPlugins(): array
    {
        return [
            new CoordinatesServicePointSearchDataExpanderPlugin(),
        ];
    }
}

```

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\ProductServiceClassNameTwigPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\FileSizeFormatterTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new FileSizeFormatterTwigPlugin(),
            new ProductServiceClassNameTwigPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CustomerPage\SingleAddressPerShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutMultiShippingAddressesFormExpanderPluginInterface>
     */
    protected function getCheckoutMultiShippingAddressesFormExpanderPlugins(): array
    {
        return [
            new SingleAddressPerShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin(),
        ];
    }
}
```


**src/Pyz/Client/AvailabilityStorage/AvailabilityStorageDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\AvailabilityStorage;

use Spryker\Client\AvailabilityStorage\AvailabilityStorageDependencyProvider as SprykerAvailabilityStorageDependencyProvider;
use SprykerFeature\Client\SelfServicePortal\Plugin\AvailabilityStorage\ProductServiceAvailabilityStorageStrategyPlugin;

class AvailabilityStorageDependencyProvider extends SprykerAvailabilityStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\AvailabilityStorageExtension\Dependency\Plugin\AvailabilityStorageStrategyPluginInterface>
     */
    protected function getAvailabilityStorageStrategyPlugins(): array
    {
        return [
            new ProductServiceAvailabilityStorageStrategyPlugin(),
        ];
    }
}
```

2. Enable the project override to enable the checkout form to handle single addresses per shipment type:


<details>
  <summary>src/Pyz/Yves/CustomerPage/Form/CheckoutAddressCollectionForm.php</summary>


```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\CustomerPage\Form;

use Generated\Shared\Transfer\QuoteTransfer;
use SprykerShop\Yves\CustomerPage\Dependency\Service\CustomerPageToShipmentServiceInterface;
use SprykerShop\Yves\CustomerPage\Form\CheckoutAddressCollectionForm as SprykerCheckoutAddressCollectionForm;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormInterface;

/**
 * @method \Pyz\Yves\CustomerPage\CustomerPageConfig getConfig()
 * @method \SprykerShop\Yves\CustomerPage\CustomerPageFactory getFactory()
 */
class CheckoutAddressCollectionForm extends SprykerCheckoutAddressCollectionForm
{
    /**
     * @param \Symfony\Component\Form\FormBuilderInterface $builder
     *
     * @return $this
     */
    protected function addSameAsShippingCheckboxField(FormBuilderInterface $builder)
    {
        $builder->add(
            static::FIELD_BILLING_SAME_AS_SHIPPING,
            CheckboxType::class,
            [
                'required' => false,
                'constraints' => [],
                'validation_groups' => function (FormInterface $form) {
                    $shippingAddressForm = $form->getParent()
                        ? $form->getParent()->get(static::FIELD_SHIPPING_ADDRESS)
                        : null;

                    if (!$shippingAddressForm) {
                        return false;
                    }

                    if (!$this->isDeliverToMultipleAddressesEnabled($shippingAddressForm)) {
                        return false;
                    }

                    return [static::GROUP_BILLING_SAME_AS_SHIPPING];
                },
            ],
        );

        return $this;
    }

    /**
     * @param \Symfony\Component\Form\FormEvent $event
     * @param \SprykerShop\Yves\CustomerPage\Dependency\Service\CustomerPageToShipmentServiceInterface $shipmentService
     *
     * @return void
     */
    protected function hydrateShippingAddressSubFormDataFromItemLevelShippingAddresses(
        FormEvent $event,
        CustomerPageToShipmentServiceInterface $shipmentService,
    ): void {
        $quoteTransfer = $event->getData();

        if (!($quoteTransfer instanceof QuoteTransfer)) {
            return;
        }

        $quoteTransfer = $this->executeCheckoutAddressStepPreGroupItemsByShipmentPlugins($quoteTransfer);

        $shipmentGroupCollection = $this->mergeShipmentGroupsByShipmentHash(
            $shipmentService->groupItemsByShipment($quoteTransfer->getItems()),
            $shipmentService->groupItemsByShipment($quoteTransfer->getBundleItems()),
        );

        $shippingAddressForm = $event->getForm()->get(static::FIELD_SHIPPING_ADDRESS);

        if ($quoteTransfer->getItems()->count() || $quoteTransfer->getBundleItems()->count()) {
            $this->setDeliverToMultipleAddressesEnabled($shippingAddressForm);
        }

        if ($this->isDeliverToMultipleAddressesEnabled($shippingAddressForm) || $shipmentGroupCollection->count() < 1) {
            return;
        }

        $shipmentGroupTransfer = $shipmentGroupCollection->getIterator()->current();

        if (!$shipmentGroupTransfer->getShipment() || !$shipmentGroupTransfer->getShipment()->getShippingAddress()) {
            return;
        }

        $shippingAddressForm->setData(clone $shipmentGroupTransfer->getShipment()->getShippingAddress());
    }
}
```

</details>

**src/Pyz/Yves/CustomerPage/Form/DataProvider/CheckoutAddressFormDataProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Yves\CustomerPage\Form\DataProvider;

use Generated\Shared\Transfer\QuoteTransfer;
use SprykerShop\Yves\CustomerPage\Form\DataProvider\CheckoutAddressFormDataProvider as SprykerCheckoutAddressFormDataProvider;

class CheckoutAddressFormDataProvider extends SprykerCheckoutAddressFormDataProvider
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    protected function canDeliverToMultipleShippingAddresses(QuoteTransfer $quoteTransfer): bool
    {
        $items = $this->productBundleClient->getGroupedBundleItems(
            $quoteTransfer->getItems(),
            $quoteTransfer->getBundleItems(),
        );

        return count($items) >= 1
            && $this->shipmentClient->isMultiShipmentSelectionEnabled()
            && !$this->hasQuoteGiftCardItems($quoteTransfer);
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Catalog** > **Products**.
2. Create an abstract product with a **service** and **scheduled** product class.
3. For the abstract product you've created, create a concrete product with the following settings:

- Add **Delivery** and **In-Center Service** shipment types
- Add **Service** and **Scheduled** product classes

4. Go to **Merchandising** > **Offers**.
5. Generate one or more product offers for the service product you've created. Make sure the following applies on the
   offer create page:
- The offer creation form is automatically prepopulated with information from the product
- You can assign one or more service points to the product offer
- The on-site service shipment type is available

{% endinfo_block %}

2. Enable following Storefront API endpoints:

| PLUGIN                         | SPECIFICATION                                                       | PREREQUISITES | NAMESPACE                                                    |
|--------------------------------|---------------------------------------------------------------------|---------------|--------------------------------------------------------------|
| SspServicesResourceRoutePlugin | Provides the GET endpoint for the service products (booked-services). |               | SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\GlueApplication;

use SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication\SspServicesResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
   /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {    
        return [
            new SspServicesResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can see the `booked-services` resources for the company user in the request:

0. As a company user, place an order with a service product.

1. Get the access token by sending a `POST` request to the token endpoint with the company user credentials:

`POST https://glue.mysprykershop.com/token`

```json
{
    "data": {
        "type": "token",
        "attributes": {
            "grant_type": "password",
            "username": {% raw %}{{{% endraw %}username{% raw %}}}{% endraw %},
            "password": {% raw %}{{{% endraw %}password{% raw %}}}{% endraw %},
        }
    }
}
```

2. Use the access token to access the `booked-services` endpoint:

`GET https://glue.mysprykershop.com/booked-services`

```json
{
  "data": [
    {
      "type": "booked-services",
      "id": "120b7a51-69e4-54b9-96a6-3b5eab0dfe7a",
      "attributes": {
        "uuid": "120b7a51-69e4-54b9-96a6-3b5eab0dfe7a",
        "productName": "Emergency Repair",
        "scheduledAt": null,
        "createdAt": "2025-09-23 11:05:30",
        "stateDisplayName": "oms.state.new",
        "stateName": "grace period started"
      },
      "links": {
        "self": "http://glue.eu.spryker.local/booked-services/120b7a51-69e4-54b9-96a6-3b5eab0dfe7a?page[offset]=0&page[limit]=1"
      }
    }
  ],
  "links": {
    "self": "http://glue.eu.spryker.local/booked-services?page[offset]=0&page[limit]=1"
  }
}
```

{% endinfo_block %}

## Set up widgets

Set up widgets as follows:

1. Register the following plugins to enable widgets and plugins:

| PLUGIN                                                              | SPECIFICATION                                                                           | PREREQUISITES | NAMESPACE                                                    |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------|
| SspServiceMenuItemWidget                                            | Adds a menu item for accessing SSP services in the navigation.                          |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServiceChangeScheduledTimeLinkWidget                             | Provides a link to change the scheduled time for a specific service.                    |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| ShipmentTypeServicePointSelectorWidget                              | Displays a selector for choosing a service point based on the shipment type.            |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| ServicePointNameForItemWidget                                       | Displays the name of the service point associated with a specific cart item.            |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| ListCartItemsByShipmentTypeWidget                                   | Lists items in the cart grouped by their shipment type.                                 |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| ServiceListWidget                                                   | Display the list of the given service products.                                         |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspAddressFormItemsByShipmentTypeWidget                             | Lists address from items grouped by their shipment type.                                |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspProductOfferPriceWidget                                          | Displays the product offer price for the products with a service type.                  |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServiceCancelWidget                                              | Renders a cancel button for the sales order item on the order details page. |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServiceDetectorWidget                                            | Provide a method to determine if the product is a service.                              |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServicePointGeoCodeWidget                                        | Displays the coordinates of the service point.                                          |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServicePointNameForItemWidget                                    | Displays the service point name for the cart items.                                      |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServicePointSearchWidget                                         | Displays the service point search modal window.                                         |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspShipmentTypeServicePointSelectorWidget                           | Displays the shipment type and service point selector.                                  |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SingleAddressPerShipmentTypeWidgetCacheKeyGeneratorStrategyPlugin   | Generates a cache key for the related widget.                                           |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication |
| AddressFormItemsByShipmentTypeWidgetCacheKeyGeneratorStrategyPlugin | Generates a cache key for the related widget.                                           |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication |


<details>
  <summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Widget\ListItemsByShipmentTypeWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\ServicePointNameForItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\ShipmentTypeServicePointSelectorWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServiceChangeScheduledTimeLinkWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServiceMenuItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SingleAddressPerShipmentTypeWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAddressFormItemsByShipmentTypeWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspProductOfferPriceWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServiceCancelWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServiceDetectorWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServicePointGeoCodeWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServicePointNameForItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServicePointSearchWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspShipmentTypeServicePointSelectorWidget;
use SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication\AddressFormItemsByShipmentTypeWidgetCacheKeyGeneratorStrategyPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication\SingleAddressPerShipmentTypeWidgetCacheKeyGeneratorStrategyPlugin;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SspServiceMenuItemWidget::class,
            SspServiceChangeScheduledTimeLinkWidget::class,
            ShipmentTypeServicePointSelectorWidget::class,
            ServicePointNameForItemWidget::class,
            ListCartItemsByShipmentTypeWidget::class,
            SspAddressFormItemsByShipmentTypeWidget::class,
            SingleAddressPerShipmentTypeWidget::class,
            SspProductOfferPriceWidget::class,
            SspServiceCancelWidget::class,
            SspServiceDetectorWidget::class,
            SspServicePointGeoCodeWidget::class,
            SspServicePointNameForItemWidget::class,
            SspServicePointSearchWidget::class,
            SspShipmentTypeServicePointSelectorWidget::class,
        ];
    }

        /**
         * @return array<\SprykerShop\Yves\ShopApplicationExtension\Dependency\Plugin\WidgetCacheKeyGeneratorStrategyPluginInterface>
         */
    protected function getWidgetCacheKeyGeneratorStrategyPlugins(): array
    {
        return [
            new AddressFormItemsByShipmentTypeWidgetCacheKeyGeneratorStrategyPlugin(),
            new SingleAddressPerShipmentTypeWidgetCacheKeyGeneratorStrategyPlugin(),
        ];
    }
}
```

</details>

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
console frontend:zed:install-dependencies
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

1. On the Storefront, use the search to find the service product you've created.
   Make sure the product is available in the catalog.

2. Click the product to open its details page. Make sure the following applies on the product details page:

   - A service point selector is displayed
   - A date and time selector is displayed
   - Delivery and In-Center-Service shipment types are available

3. Select a service point.
4. Select a service date and time.
5. Add the product to cart.
6. Add several other service and regular products to cart.
7. Go to the cart page and make sure the following applies:

- The cart items display the selected service points
- Items are grouped by shipment type
- Selected service points are displayed

8. Go to the address page and make sure the following applies:

- The cart items display the selected service points
- Items are grouped by shipment type
- Selected service points are displayed

9. Place the order.
   Make sure the order is places successfully and the order summary includes service-specific details.

10. Go to **Customer Account** > **Services**. Make sure the following applies:

- The service associated with the order you've placed is displayed in the list with all the relevant service details
- You can change service date and time

17. Next to the service, click **View**. Make sure the following applies on the service details page:

- Service point and shipment type are displayed
- Buttons to reschedule and cancel the service are displayed
- When changing the scheduled time, the updated information is saved and immediately reflected in the order view page.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Services**.
   Make sure the following applies:

   - All service orders from multiple customers are listed correctly
   - Each service entry includes detailed information such as the product, customer, company, and scheduled date and time

2. Open an order's details page by clicking on its order reference.
   On the order details page, make sure you can update the scheduled service date and time.
3. Make changes to a service order.
   Make sure the changes are reflected in the customer profile on the Storefront.
4. In the Back Office, add a new service product.
   Make sure that this product is displayed on the Storefront.
5. On the Storefront, go to the catalog page.
   Make sure you can filter products by product class: scheduled or service.
{% endinfo_block %}

## Set up frontend templates

Change or create following files:

[`src/Pyz/Yves/CartPage/Theme/default/components/molecules/product-cart-items-list/product-cart-items-list.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-be7757d682368ef8b6306546d54d41d0eb650dc865fabeddc366a6914bccd74d)
[`src/Pyz/Yves/CheckoutPage/Theme/default/components/molecules/address-item-form-field-list/address-item-form-field-list.ts`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-76f4cad1ff0a953fe0174ace4f4e70e20d2b87a56a8253a224ac3db85517b3c7)
[`src/Pyz/Yves/CheckoutPage/Theme/default/components/molecules/address-item-form-field-list/address-item-form-field-list.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-be8e8fd1ddf324181d112e1480536cd0516659681bb0b907297b6edbfd733385)
[`src/Pyz/Yves/CheckoutPage/Theme/default/components/molecules/address-item-form-field-list/index.ts`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-a22a2c2c9e1b24255a3a643095d55019cbccc6d7381f0f6c47e422868423a07c)
[`src/Pyz/Yves/CheckoutPage/Theme/default/components/molecules/address-item-form/address-item-form.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-e651452fd8b180e34d66c39a6bee497a657a6b9ee82ddd5e242b6fd06be01234)
[`src/Pyz/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/index.ts`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-685de07f32e0d3a6e3a25546edb5f95e73bad8a92cc319c068844bbe33fc44aaasf)
[`src/Pyz/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-e58763a612811b122109b1a3afcccc039fb08d2057a88ec70404fa3c76e09fd3)
[`src/Pyz/Yves/CheckoutPage/Theme/default/templates/page-layout-checkout/page-layout-checkout.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-e7f2dca47c3ea2b3193d2d15870dc265f81774ba7df603fc466247a3a16b06a6)
[`src/Pyz/Yves/CheckoutPage/Theme/default/views/address/address.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-a4f02c98bc8e983f629cc3e532c61a7db7ba9806206b13ce470b24b78b752ba8)
[`src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-ec7eac5ee6a918e5d3f7eded3424177bb700eecdb1ca6eadbe73e305c638dead)
[`src/Pyz/Yves/CheckoutPage/Theme/default/views/shipment/shipment.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-3c2cef7d110113aaf077cd014832b1949179177f549c04cdee6519b59044ad1c)
[`src/Pyz/Yves/CheckoutPage/Theme/default/views/summary/summary.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-df1420128913cf96b8668a5ad8afbd663c3c2625cfe5ac75ee78437c2f331fc1)
[`src/Pyz/Yves/ClickAndCollectPageExample/Theme/default/components/molecules/service-point-selector/service-point-selector.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-a8dafd3dc7efd5d6ceb4f3ada6faad73709bd544a6de09249a3debccc68107b0)
[`src/Pyz/Yves/CustomerPage/Theme/default/components/molecules/address-form-toggler/address-form-toggler.ts`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-5b5b794ecebc1b7dd0fdae72c51e33f16377adf7ba174fc082770a925b4a3b93)
[`src/Pyz/Yves/CustomerPage/Theme/default/components/molecules/address-form-toggler/address-form-toggler.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-99ab0c750610723968334b5c15b54181b07137be68aee1ec55f740e294e17fa1)
[`src/Pyz/Yves/CustomerPage/Theme/default/components/molecules/address-form-toggler/index.ts`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-11ddabbf6c1635aca0c11e787e9c334dc4e7b6208a036957fc7dad68df6526c1)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/components/molecules/service-point-shipment-types/service-point-shipment-types.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-a121877cb09b3adf2f9468311f6828f14655d2db035b790b9b818989a46963e1)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/views/address-form-items-by-shipment-type/address-form-items-by-shipment-type.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-f37874eccdd9fc18c19ee7888df362c0965e38903474a9b507b2125da341adbe)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/views/single-address-per-shipment-type/single-address-per-shipment-type.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-d205e0d0f2fe84c935ea96f00e2409f28fd756bd0ae294fa52503c3eb907e9a9)
[`src/Pyz/Yves/ShipmentTypeWidget/Theme/default/components/molecules/shipment-type-toggler/shipment-type-toggler.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-96e8b175f1d8d39479c965bf9211ff0b6f340378dec85ab09e990d13ec897264)
[`src/Pyz/Yves/ServicePointWidget/Theme/default/components/molecules/service-point/service-point.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/668/files?file-filters%5B%5D=.js&file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-9495167856d12408a1da414d94b4987a62bdd6103a54a35f3e31d3f92eeaf01d)
