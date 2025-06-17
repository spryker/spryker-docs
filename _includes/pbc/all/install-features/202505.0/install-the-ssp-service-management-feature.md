{% info_block warningBox %}

Self-Service Portal is currently running under an Early Access Release. Early Access Releases are subject to specific
legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a
General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory
features.

{% endinfo_block %}

This document describes how to install the Self-Service Portal (SSP) SSP Inquiry Management feature.

## Prerequisites

| FEATURE             | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|---------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core        | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Click and Collect   | {{site.version}} | [Enable Click and Collect](/docs/pbc/all/service-point-management/202505.0/unified-commerce/enable-click-collect.html)                                      |
| Self-Service Portal | {{site.version}} | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/202505.0/install/install-self-service-portal)                                               |

## Install the required modules

Install the required packages using Composer:

```bash
composer require spryker-feature/self-service-portal:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following package is listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                                                      | SPECIFICATION                                                                  | NAMESPACE                           |
|--------------------------------------------------------------------|--------------------------------------------------------------------------------|-------------------------------------|
| ClickAndCollectPageExampleConfig::CLICK_AND_COLLECT_SHIPMENT_TYPES | Shipment types supported by the Click&Collect feature.                         | Pyz\Yves\ClickAndCollectPageExample |
| SelfServicePortalConfig::getDefaultMerchantReference()             | Reference of a merchant used for creating product offers from the Back Office. | Pyz\Zed\SelfServicePortal           |
| DataImportConfig::getFullImportTypes()                             | List of data import entities to be imported during a full import.              | Pyz\Zed\DataImport                  |

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
        self::SHIPMENT_TYPE_PICKUP,
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
        <self-service-portal-services>
            <label>Services</label>
            <title>Services</title>
            <bundle>self-service-portal</bundle>
            <controller>list-service</controller>
            <action>index</action>
        </self-service-portal-services>
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

<details>
  <summary>Glossary</summary>

```csv
self_service_portal.service.product.no_shipment_types_available,Keine Versandarten für dieses Produkt verfügbar.,de_DE
self_service_portal.service.product.no_shipment_types_available,No shipping types available for this product.,en_US
self_service_portal.service.product.shipment_types,Versandarten,de_DE
self_service_portal.service.product.shipment_types,Shipment Types,en_US
self_service_portal.service.product.select_service_point,Wählen Sie einen Servicepunkt,de_DE
self_service_portal.service.product.select_service_point,Select a service point,en_US
self_service_portal.service.product.service_point_required,Ein Servicepunkt ist für dieses Produkt erforderlich,de_DE
self_service_portal.service.product.service_point_required,A service point is required for this product,en_US
self_service_portal.service.cart_item.service_point.name,Service point,en_US
self_service_portal.service.cart_item.service_point.name,Servicepunkt,de_DE
self_service_portal.service.product.service_date_time,Choose date and time,en_US
self_service_portal.service.product.service_date_time,Wählen Sie Datum und Uhrzeit,de_DE
self_service_portal.service.checkout.item_count,Number of Items,en_US
self_service_portal.service.checkout.item_count,Anzahl der Teile,de_DE
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
self_service_portal.service.validation.no_order_items_provided,Keine Auftragspositionen vorhanden.,de_DE
self_service_portal.service.validation.status_change_failed,The status change failed.,en_US
self_service_portal.service.validation.status_change_failed,Die Statusänderung ist fehlgeschlagen.,de_DE

self_service_portal.service.validation.no_order_items_provided,No order items provided.,en_US
self_service_portal.service.validation.no_order_items_provided,Keine Auftragspositionen angegeben.,de_DE
self_service_portal.service.validation.order_not_found,Order with ID %id% not found.,en_US
self_service_portal.service.validation.order_not_found,Bestellung mit ID %id% nicht gefunden.,de_DE
self_service_portal.service.validation.no_payment_methods_found,No payment methods found for this order.,en_US
self_service_portal.service.validation.no_payment_methods_found,Keine Zahlungsmethoden für diese Bestellung gefunden.,de_DE
self_service_portal.service.list.search_placeholder,Search,en_US
self_service_portal.service.list.search_placeholder,Search,de_DE
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
self_service_portal.service.list.business_unit_services,Geschäftsbereich Dienstleistungen,de_DE
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
self_service_portal.service.update_scheduled_time.order_item_details,Bestellpositionsdetails,de_DE
self_service_portal.service.update_scheduled_time.button.save,Save,en_US
self_service_portal.service.update_scheduled_time.button.save,Speichern,de_DE
self_service_portal.service.update_scheduled_time.button.cancel,Cancel,en_US
self_service_portal.service.update_scheduled_time.button.cancel,Abbrechen,de_DE
self_service_portal.service.update_scheduled_time.error.order_item_not_found,Order item with uuid %uuid% not found.,en_US
self_service_portal.service.update_scheduled_time.error.order_item_not_found,Bestellposition mit UUID %uuid% nicht gefunden.,de_DE
self_service_portal.service.list.field.business_unit,Business Unit,en_US
self_service_portal.service.list.field.business_unit,Geschäftsbereich,de_DE
self_service_portal.service.list.button.view,View,en_US
self_service_portal.service.list.button.view,Ansehen,de_DE
self_service_portal.service.product.no_shipment_types_available,Keine Versandarten für dieses Produkt verfügbar.,de_DE
self_service_portal.service.product.no_shipment_types_available,No shipping types available for this product.,en_US
self_service_portal.service.product.shipment_types,Versandarten,de_DE
self_service_portal.service.product.shipment_types,Shipment Types,en_US
self_service_portal.service.product.select_service_point,Wählen Sie einen Servicepunkt,de_DE
self_service_portal.service.product.select_service_point,Select a service point,en_US
self_service_portal.service.product.service_point_required,Ein Servicepunkt ist für dieses Produkt erforderlich,de_DE
self_service_portal.service.product.service_point_required,A service point is required for this product,en_US
self_service_portal.service.cart_item.service_point.name,Service point,en_US
self_service_portal.service.cart_item.service_point.name,Servicepunkt,de_DE
self_service_portal.service.product.service_date_time,Choose date and time,en_US
self_service_portal.service.product.service_date_time,Wählen Sie Datum und Uhrzeit,de_DE
self_service_portal.service.checkout.item_count,Number of Items,en_US
self_service_portal.service.checkout.item_count,Anzahl der Teile,de_DE
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
self_service_portal.service.validation.no_order_items_provided,Keine Auftragspositionen vorhanden.,de_DE
self_service_portal.service.validation.status_change_failed,The status change failed.,en_US
self_service_portal.service.validation.status_change_failed,Die Statusänderung ist fehlgeschlagen.,de_DE
customer.account.ssp_services,Services,en_US
customer.account.ssp_services,Dienstleistungen,de_DE
customer.account.no_ssp_services,There are no services at the moment,en_US
customer.account.no_ssp_services,Es gibt derzeit keine Dienstleistungen,de_DE
customer.ssp_service.order.reference,Order Reference,en_US
customer.ssp_service.order.reference,Bestellreferenz,de_DE
customer.ssp_service.customer,Customer,en_US
customer.ssp_service.customer,Kunde,de_DE
customer.ssp_service.company,Company,en_US
customer.ssp_service.company,Unternehmen,de_DE
customer.ssp_service.service,Service,en_US
customer.ssp_service.service,Service,de_DE
customer.ssp_service.created_at,Date created,en_US
customer.ssp_service.created_at,Erstellt am,de_DE
customer.ssp_service.status,Status,en_US
customer.ssp_service.status,Status,de_DE
customer.ssp_service.scheduled_at,Time and Date,en_US
customer.ssp_service.scheduled_at,Zeit und Datum,de_DE
customer.ssp_service.actions,Actions,en_US
customer.ssp_service.actions,Aktionen,de_DE
customer.ssp_service.view_ssp_service,View,en_US
customer.ssp_service.view_ssp_service,Anzeigen,de_DE
product.filter.product-abstract-types,Product Abstract Types,en_US
product.filter.product-abstract-types,Produktabstraktsarten,de_DE
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

* Make sure the glossary keys have been added to `spy_glossary_key` and `spy_glossary_translation` tables.
* Make sure the following tables contain the imported data:
    - `spy_product_shipment_type`
    - `spy_sales_product_abstract_type`
    - `spy_sales_order_item_product_abstract_type`
    - `spy_product_abstract_type`
    - `spy_product_abstract_to_product_abstract_type`

{% endinfo_block %}

## Set up behavior

| PLUGIN                                                        | SPECIFICATION                                                                                                                              | PREREQUISITES | NAMESPACE                                                                    |
|---------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------|
| ProductAbstractTypeFacetConfigTransferBuilderPlugin           | Configures a facet filter for product abstract types as an enumeration type with multi-value support.                                      |               | SprykerFeature\Client\SelfServicePortal\Plugin\Catalog                       |
| ShipmentTypeProductViewExpanderPlugin                         | Adds shipment type information to product view based on provided shipment type identifiers.                                                |               | SprykerFeature\Client\SelfServicePortal\Plugin\ProductStorage                |
| ProductOfferPreAddToCartPlugin                                | Adds the product offer reference to an item during the add-to-cart process.                                                                |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                        |
| ServicePointPreAddToCartPlugin                                | Associates a service point with a cart item using a provided product offer reference and service point UUID.                               |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                        |
| ShipmentTypePreAddToCartPlugin                                | Associates a shipment type with a cart item during the add-to-cart process.                                                                |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                        |
| ServiceDateTimePreAddToCartPlugin                             | Sets the service date and time in item metadata when the "scheduled at" parameter is provided during the add-to-cart process.              |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                        |
| SelfServicePortalPageRouteProviderPlugin                      | Defines and adds routes for managing service points, searching, listing customer services, updating service times, and canceling services. |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                          |
| ProductAbstractTypeProductAbstractPostCreatePlugin            | Adds product abstract type information after creating a product abstract.                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ProductAbstractTypeProductAbstractAfterUpdatePlugin           | Updates product abstract type information after updating a product abstract.                                                               |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ShipmentTypeProductConcretePostCreatePlugin                   | Adds shipment type information after creating a product concrete.                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ShipmentTypeProductConcretePostUpdatePlugin                   | Updates shipment type information after updating a product concrete.                                                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ShipmentTypeProductConcreteExpanderPlugin                     | Expands product concrete data with shipment type information.                                                                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ProductAbstractTypeProductAbstractExpanderPlugin              | Expands product abstract data with product abstract type information.                                                                      |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product            |
| ProductAbstractTypeProductPageDataExpanderPlugin              | Expands product page data with product abstract type information.                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch  |
| ProductAbstractTypeProductPageDataLoaderPlugin                | Loads product abstract type data for product page search.                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch  |
| ProductAbstractTypeMapExpanderPlugin                          | Expands product abstract map data with product abstract type information.                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch  |
| ShipmentTypeProductConcreteStorageCollectionExpanderPlugin    | Expands product concrete storage collection with shipment type information.                                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage     |
| SspShipmentTypeQuoteExpanderPlugin                            | Expands quote data with SSP shipment type information.                                                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote              |
| ServicePointQuoteExpanderPlugin                               | Expands quote data with service point information.                                                                                         |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote              |
| ScheduleTimeOrderItemExpanderPreSavePlugin                    | Expands order item data with scheduled time information before saving.                                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| ProductTypeOrderItemsPostSavePlugin                           | Processes product type information for order items after saving an order.                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| SspServiceShipmentTypePreReloadItemsPlugin                    | Checks and removes service items without a shipment type from the cart.                                                                    |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart               |
| EditOfferProductOfferTableActionPlugin                        | Expands the product offer table with edit button.                                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductOfferGui    |
| ProductTypeProductConcreteStorageCollectionExpanderPlugin     | Expands `ProductConcreteStorage` transfers with product type information.                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage     |
| ProductTypeOrderExpanderPlugin                                | Expands order items with product types.                                                                                                    |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| ServiceDateTimeEnabledOrderItemsPostSavePlugin                | Persists `isServiceDateTimeEnabled` information from `ItemTransfer.isServiceDateTimeEnabled`.                                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| SspProductAbstractTypeSalesOrderItemCollectionPreDeletePlugin | Deletes related product abstract type entries for the given sales order items.                                                             |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| SspServiceCancellableOrderItemExpanderPlugin                  | Expands order items with isCancellable property.                                                                                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales              |
| ServiceSspAssetManagementExpanderPlugin                       | Expands the assets with services collection.                                                                                               |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement |
| ProductServiceTypeNameTwigPlugin                              | Adds `productServiceTypeName` Twig global variable with the value from config.                                                             |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Twig               |
| FileSizeFormatterTwigPlugin                                   | Formats the file size into a human-readable format.                                                                                        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Twig               |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php

declare(strict_types = 1);

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use SprykerFeature\Client\SelfServicePortal\Plugin\Catalog\ProductAbstractTypeFacetConfigTransferBuilderPlugin;

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

use SprykerFeature\Client\SelfServicePortal\Plugin\ProductStorage\ShipmentTypeProductViewExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage\ShipmentTypeProductConcreteStorageCollectionExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage\ProductTypeProductConcreteStorageCollectionExpanderPlugin;

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
    
    /**
     * @return array<\Spryker\Zed\ProductStorageExtension\Dependency\Plugin\ProductConcreteStorageCollectionExpanderPluginInterface>
     */
    protected function getProductConcreteStorageCollectionExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductConcreteStorageCollectionExpanderPlugin(),
            new ProductTypeProductConcreteStorageCollectionExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php

declare(strict_types = 1);

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ProductOfferPreAddToCartPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ServiceDateTimePreAddToCartPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ServicePointPreAddToCartPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ShipmentTypePreAddToCartPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ServiceDateTimePreAddToCartPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage\ServiceDateTimeEnabledPreAddToCartPlugin;

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
            new ServiceDateTimePreAddToCartPlugin(),
            new ServiceDateTimeEnabledPreAddToCartPlugin(),
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
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart\ProductAbstractTypeItemExpanderPlugin;
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
            new ProductAbstractTypeItemExpanderPlugin(),
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
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\ProductAbstractToProductAbstractTypeDataImportPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\ProductAbstractTypeDataImportPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\ProductShipmentTypeDataImportPlugin;

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

<details>
  <summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig;

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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_TYPE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_TO_PRODUCT_ABSTRACT_TYPE),         
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

use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ProductAbstractTypeProductAbstractAfterUpdatePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ProductAbstractTypeProductAbstractPostCreatePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ProductAbstractTypesProductAbstractExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ShipmentTypeProductConcreteExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ShipmentTypeProductConcretePostCreatePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product\ShipmentTypeProductConcretePostUpdatePlugin;

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

<details>



<details>
  <summary>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>  

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ProductAbstractTypeFormExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ProductAbstractTypeProductAbstractFormDataProviderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ProductAbstractTypeProductAbstractTransferMapperPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ServiceDateTimeEnabledProductConcreteFormEditDataProviderExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ServiceDateTimeEnabledProductConcreteFormExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ServiceDateTimeEnabledProductFormTransferMapperExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ShipmentTypeProductConcreteFormEditDataProviderExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ShipmentTypeProductConcreteFormExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement\ShipmentTypeProductFormTransferMapperExpanderPlugin;

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

</details>


<details>
  <summary>src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php</summary>  

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch\ProductAbstractTypeMapExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch\ProductAbstractTypeProductPageDataExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch\ProductAbstractTypeProductPageDataLoaderPlugin;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface>|array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataExpanderPluginInterface>
     */
    protected function getDataExpanderPlugins(): array
    {
        $dataExpanderPlugins = [];
        $dataExpanderPlugins[SelfServicePortalConfig::PLUGIN_PRODUCT_ABSTRACT_TYPE_DATA] = new ProductAbstractTypeProductPageDataExpanderPlugin();

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

</details>

**src/Pyz/Zed/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductStorage;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage\ShipmentTypeProductConcreteStorageCollectionExpanderPlugin;
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

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote\ServicePointQuoteExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote\SspShipmentTypeQuoteExpanderPlugin;
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
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\ProductTypeOrderItemsPostSavePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\ScheduleTimeOrderItemExpanderPreSavePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\ProductTypeOrderExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\ServiceDateTimeEnabledOrderItemsPostSavePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspProductAbstractTypeSalesOrderItemCollectionPreDeletePlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspServiceCancellableOrderItemExpanderPlugin;

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
        ];
    }
    
     /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new ProductTypeOrderItemsPostSavePlugin(),
            new ServiceDateTimeEnabledOrderItemsPostSavePlugin(),
        ];
    }
    
    
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new ProductTypeOrderExpanderPlugin(),
        ];
    }
    
        /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesOrderItemCollectionPreDeletePluginInterface>
     */
    protected function getSalesOrderItemCollectionPreDeletePlugins(): array
    {
        return [
            new SspProductAbstractTypeSalesOrderItemCollectionPreDeletePlugin(),
        ];
    }
}
```

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

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\ProductServiceTypeNameTwigPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Twig\FileSizeFormatterTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new FileSizeFormatterTwigPlugin()
            new ProductServiceTypeNameTwigPlugin(),
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

4. Go to **Merchandising** > **Offers**.
5. Generate one or more product offers for the service product you've created. Make sure the following applies on the
   offer create page:
    * The offer creation form is automatically prepopulated with information from the product
    * You can assign one or more service points to the product offer
    * The on-site service shipment type is available

{% endinfo_block %}

## Set up widgets

Set up widgets as follows:

1. Register the following plugins to enable widgets:

| PLUGIN                                  | SPECIFICATION                                                                | PREREQUISITES | NAMESPACE                                    |
|-----------------------------------------|------------------------------------------------------------------------------|---------------|----------------------------------------------|
| SspServiceMenuItemWidget                | Adds a menu item for accessing SSP services in the navigation.               |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspServiceChangeScheduledTimeLinkWidget | Provides a link to change the scheduled time for a specific service.         |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| ShipmentTypeServicePointSelectorWidget  | Displays a selector for choosing a service point based on the shipment type. |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| ServicePointNameForItemWidget           | Displays the name of the service point associated with a specific cart item. |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| ListItemsByShipmentTypeWidget           | Lists items in the cart grouped by their shipment type.                      |               | SprykerFeature\Yves\SelfServicePortal\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Widget\ListItemsByShipmentTypeWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\ServicePointNameForItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\ShipmentTypeServicePointSelectorWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServiceChangeScheduledTimeLinkWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspServiceMenuItemWidget;

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

1. On the Storefront, use the search to find the service product you've created.
   Make sure the product is available in the catalog.

2. Click the product to open its details page. Make sure the following applies on the product details page:

   - A service point selector is displayed
   - A date and time selector is displayed
   - Delivery and service-on-site shipment types are available

3. Select a service point.
4. Select a service date and time.
5. Add the product to cart.
6. Add several other service and regular products to cart.
7. Go to the cart page and make sure the following applies:

   - The cart items display the selected service points
   - Items are grouped by shipment type
   - Selected service points are displayed

7. Place the order.
   Make sure the order is places successfully and the order summary includes service-specific details.

8. Go to **Customer Account** > **Services**. Make sure the following applies:

   - The service associated with the order you've placed is displayed in the list with all the relevant service details
   - You can change service date and time

9. Next to the service, click **View**. Make sure the following applies on the service details page:

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
   Make sure you can filter products by product type: physical product or service.
   {% endinfo_block %}


















































