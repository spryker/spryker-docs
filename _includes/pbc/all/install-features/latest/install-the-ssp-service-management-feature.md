{% info_block warningBox %}

SSP Service Management feature is not compatible with the [Order Amendment feature](/docs/pbc/all/order-management-system/latest/base-shop/order-amendment-feature-overview.html). Orders that include services booked through the SSP can't be amended.

{% endinfo_block %}

This document describes how to install the Self-Service Portal (SSP) SSP Service Management feature.

{% info_block warningBox "Install all SSP features" %}

For the Self-Service Portal to work correctly, you must install all SSP features. Each feature depends on the others for proper functionality.

{% endinfo_block %}

## Features SSP Service Management depends on

- [Install the SSP Asset Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-management-feature.html)
- [Install the SSP Dashboard Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-dashboard-management-feature.html)
- [Install the SSP File Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-file-management-feature.html)
- [Install the SSP Inquiry Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-inquiry-management-feature.html)
- [Install the SSP Model Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-model-management-feature.html)
- [Install the Asset-Based Catalog feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-based-catalog-feature.html)

## Prerequisites

| FEATURE                                    | VERSION  | INSTALLATION GUIDE                                                                                                                                                                                                        |
|--------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                               | 202512.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                                         |
| Shipment                                   | 202512.0 | [Install the Shipment feature](/docs/pbc/all/carrier-management/latest/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                                                                  |
| Shipment Service Points                    | 202512.0 | [Install the Shipment Service Points feature](/docs/pbc/all/carrier-management/latest/unified-commerce/install-features/install-the-shipment-service-points-feature.html)                                                |
| Click and Collect                          | 202512.0 | [Enable Click and Collect](/docs/pbc/all/service-point-management/latest/unified-commerce/enable-click-collect.html)                                                                                                      |
| Service Points                             | 202512.0 | [Install the Service Points feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html)                                                             |
| Service Points Product Offer               | 202512.0 | [Install the Service Points Product Offer feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-product-offer-feature.html)                                 |
| Product Offer Service Points               | 202512.0 | [Install the Product Offer Service Points feature](/docs/pbc/all/offer-management/latest/unified-commerce/install-features/install-the-product-offer-service-points-feature.html)                                         |
| Product Offer Shipment                     | 202512.0 | [Install the Product Offer Shipment feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-product-offer-shipment-feature.html)                                       |
| Product Offer Service Points Availability  | 202512.0 | [Install the Product Offer Service Points Availability feature](/docs/pbc/all/offer-management/latest/unified-commerce/install-features/install-the-product-offer-service-points-availability-feature.html)               |
| Marketplace Product Offer Cart            | 202512.0 | [Install the Marketplace Product Offer Cart feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-cart-feature.html) |
| Self-Service Portal                        | 202512.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)                                                                                                               |

## Install the required modules

Install the required packages using Composer:

```bash
composer require spryker-feature/self-service-portal:"^202512.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following package is listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                                                                 | SPECIFICATION                                                                                                                                                | NAMESPACE                                          |
|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| SelfServicePortalConstants::GOOGLE_MAPS_API_KEY                               | Defines a Google Maps API key required for rendering maps and location-based features in the service point selector.                                         | SprykerFeature\Shared\SelfServicePortal            |
| SelfServicePortalConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING               | Maps payment methods to their corresponding state machine processes, ensuring that service orders follow the correct payment workflow.                       | SprykerFeature\Shared\SelfServicePortal            |
| ClickAndCollectPageExampleConfig::CLICK_AND_COLLECT_SHIPMENT_TYPES            | Defines the shipment types that are supported by Click & Collect, enabling customers to choose between different delivery or pickup options.                 | SprykerShop\Yves\ClickAndCollectPageExample        |
| ClickAndCollectPageExampleConfig::DEFAULT_PICKABLE_SERVICE_TYPES              | Specifies default service types that are considered "pickable," meaning they can be selected for in-person service or pickup.                                | SprykerShop\Yves\ClickAndCollectPageExample        |
| SelfServicePortalConfig::getDefaultMerchantReference()                        | Provides a default merchant reference used when creating product offers from the Back Office, ensuring that offers are associated with the correct merchant. | SprykerFeature\Zed\SelfServicePortal               |
| DataImportConfig::getFullImportTypes()                                        | Specifies the list of data import entities to be processed during a full data import, including service-related data.                                        | Pyz\Zed\DataImport                                 |
| ServicePointWidgetConfig::getDeliveryShipmentTypeKeys()                       | Defines a list of shipment type keys that are treated as delivery types within the service point widget.                                                     | SprykerShop\Yves\ServicePointWidget                |
| ShipmentTypeWidgetConfig::getDeliveryShipmentTypes()                          | Defines a list of shipment type keys that are treated as delivery types within the shipment type widget.                                                     | SprykerShop\Yves\ShipmentTypeWidget                |
| SelfServicePortalConfig::getProductOfferServiceAvailabilityShipmentTypeKeys() | Returns a list of shipment type keys that are applicable for product offer service availability.                                                             | SprykerFeature\Client\SelfServicePortal            |
| SelfServicePortalConfig::getDefaultSelectedShipmentTypeKey()                  | This shipment type will be pre-selected in the shipment type options for the services.                                                                       | Pyz\Yves\SelfServicePortal\SelfServicePortalConfig |
| SelfServicePortalConfig::getDeliveryLikeShipmentTypes()                       | Override this method in project-level configuration to define delivery-like shipment types.                                                                  | Pyz\Yves\SelfServicePortal\SelfServicePortalConfig |
| KernelConstants::CORE_NAMESPACES                                              | Defines the core namespaces.                                                                                                                                 | Spryker\Shared\Kerne                    |


**config/Shared/config_default.php**

```php
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConstants;

$config[SelfServicePortalConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = $config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING];
$config[SelfServicePortalConstants::GOOGLE_MAPS_API_KEY] = getenv('SPRYKER_GOOGLE_MAPS_API_KEY') ?: '';

$config[KernelConstants::CORE_NAMESPACES] = [
    ...
    'SprykerFeature',
];
```

**src/Pyz/Yves/ClickAndCollectPageExample/ClickAndCollectPageExampleConfig.php**

```php
<?php

namespace Pyz\Yves\ClickAndCollectPageExample;

use SprykerShop\Yves\ClickAndCollectPageExample\ClickAndCollectPageExampleConfig as SprykerClickAndCollectPageExampleConfig;

class ClickAndCollectPageExampleConfig extends SprykerClickAndCollectPageExampleConfig
{
    protected const SHIPMENT_TYPE_IN_CENTER_SERVICE = 'in-center-service';

    /**
     * @var array<string>
     */
    protected const array CLICK_AND_COLLECT_SHIPMENT_TYPES = [
        self::SHIPMENT_TYPE_IN_CENTER_SERVICE,
        self::SHIPMENT_TYPE_DELIVERY,
    ];

    /**
     * @var array<string>
     */
    protected const array DEFAULT_PICKABLE_SERVICE_TYPES = [
        self::SHIPMENT_TYPE_IN_CENTER_SERVICE,
    ];
}
```

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalConfig.php**

```php
<?php

namespace Pyz\Zed\SelfServicePortal;

use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{   
    protected const string MODULE_NAME = 'SelfServicePortal';
    
    public function getDefaultMerchantReference(): string
    {
        return 'MER000001';
    }
}
```

**src/Pyz/Zed/DataImport/DataImportConfig.php**

```php
<?php

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
            SelfServicePortalConfig::IMPORT_TYPE_PRODUCT_SHIPMENT_TYPE,
        ];
    }
}
```

**src/Pyz/Yves/ServicePointWidget/ServicePointWidgetConfig.php**

```php
<?php

namespace Pyz\Yves\ServicePointWidget;

use SprykerShop\Yves\ServicePointWidget\ServicePointWidgetConfig as SprykerServicePointWidgetConfig;

class ServicePointWidgetConfig extends SprykerServicePointWidgetConfig
{
    protected const string SHIPMENT_TYPE_ON_SITE_SERVICE = 'on-site-service';

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

namespace Pyz\Yves\ShipmentTypeWidget;

use SprykerShop\Yves\ShipmentTypeWidget\ShipmentTypeWidgetConfig as SprykerShipmentTypeWidgetConfig;

class ShipmentTypeWidgetConfig extends SprykerShipmentTypeWidgetConfig
{
    protected const string SHIPMENT_TYPE_ON_SITE_SERVICE = 'on-site-service';

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

namespace Pyz\Client\SelfServicePortal;

use SprykerFeature\Client\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    protected const string SHIPMENT_TYPE_IN_CENTER_SERVICE = 'in-center-service';

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

**src/Pyz/Yves/SelfServicePortal/SelfServicePortalConfig.php**

```php
<?php

namespace Pyz\Yves\SelfServicePortal;

use SprykerFeature\Yves\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    /**
     * @return array<string>
     */
    public function getShipmentTypeSortOrder(): array
    {
        return [
            static::SHIPMENT_TYPE_DELIVERY,
            static::SHIPMENT_TYPE_IN_CENTER_SERVICE,
        ];
    }

    /**
     * @return array<string>
     */
    public function getDeliveryLikeShipmentTypes(): array
    {
        return [
            static::SHIPMENT_TYPE_DELIVERY,
            static::SHIPMENT_TYPE_ON_SITE_SERVICE,
        ];
    }
}
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

Generate routers and navigation cache:

```bash
console router:cache:warm-up:backoffice
console navigation:build-cache 
```

{% info_block warningBox "Verification" %}

Make sure the following menu items are available in the Back Office navigation:

- **Customer Portal** > **Booked Services**

{% endinfo_block %}

### Add translations

[Here you can find how to import translations for Self-Service Portal feature](/docs/pbc/all/self-service-portal/latest/install/ssp-glossary-data-import.html)

Import translations:

```bash
console data:import glossary
```

## Set up behavior

1. Add the following plugins:

| PLUGIN                                                                       | SPECIFICATION                                                                                                                              | PREREQUISITES | NAMESPACE                                                                                           |
|------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------|
| ProductClassFacetConfigTransferBuilderPlugin                                 | Configures a facet filter for product classes as an enumeration type with multi-value support.                                             |               | SprykerFeature\Client\SelfServicePortal\Plugin\Catalog                                              |
| ShipmentTypeProductViewExpanderPlugin                                        | Adds shipment type information to product view based on provided shipment type identifiers.                                                |               | SprykerFeature\Client\SelfServicePortal\Plugin\ProductStorage                                       |
| ProductOfferPreAddToCartPlugin                                               | Adds the product offer reference to an item during the add-to-cart process.                                                                |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                                               |
| ServicePointPreAddToCartPlugin                                               | Associates a service point with a cart item using a provided product offer reference and service point UUID.                               |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                                               |
| ShipmentTypePreAddToCartPlugin                                               | Associates a shipment type with a cart item during the add-to-cart process.                                                                |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                                               |
| ServiceDateTimePreAddToCartPlugin                                            | Sets the service date and time in item metadata when the "scheduled at" parameter is provided during the add-to-cart process.              |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CartPage                                               |
| SelfServicePortalPageRouteProviderPlugin                                     | Defines and adds routes for managing service points, searching, listing customer services, updating service times, and canceling services. |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                                                 |
| ShipmentTypeProductConcretePostCreatePlugin                                  | Adds shipment type information after creating a product concrete.                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product                                   |
| ShipmentTypeProductConcretePostUpdatePlugin                                  | Updates shipment type information after updating a product concrete.                                                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product                                   |
| ShipmentTypeProductConcreteExpanderPlugin                                    | Expands product concrete data with shipment type information.                                                                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product                                   |
| ShipmentTypeProductConcreteStorageCollectionExpanderPlugin                   | Expands product concrete storage collection with shipment type information.                                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage                            |
| SspShipmentTypeQuoteExpanderPlugin                                           | Expands quote data with SSP shipment type information.                                                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote                                     |
| ServicePointQuoteExpanderPlugin                                              | Expands quote data with service point information.                                                                                         |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Quote                                     |
| ScheduleTimeOrderItemExpanderPreSavePlugin                                   | Expands order item data with scheduled time information before saving.                                                                     |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                                     |
| SspServiceShipmentTypePreReloadItemsPlugin                                   | Checks and removes service items without a shipment type from cart.                                                                        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart                                      |
| EditOfferProductOfferTableActionPlugin                                       | Expands the product offer table with an edit button.                                                                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductOfferGui                           |
| SspServiceCancellableOrderItemExpanderPlugin                                 | Expands order items with an `isCancellable` property.                                                                                      |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                                     |
| ServiceSspAssetManagementExpanderPlugin                                      | Expands assets with a services collection.                                                                                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement                        |
| ProductServiceClassNameTwigPlugin                                            | Adds the `serviceProductClassName` Twig global variable with the value from config.                                                        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Twig                                      |
| SingleAddressPerShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin | Expands the checkout multi-shipping address form with single address per shipment type checkbox.                                           |               | SprykerFeature\Yves\SelfServicePortal\Plugin\CustomerPage                                           |
| ProductClassItemExpanderPlugin                                               | Expands cart items with the related product classes.                                                                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart                                      |
| ServicePointItemExpanderPlugin                                               | Expands cart items with a selected service point.                                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart                                      |
| SspShipmentTypeItemExpanderPlugin                                            | Expands cart items with shipment type information.                                                                                         |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Cart                                      |
| ProductClassDataImportPlugin                                                 | Imports product classes.                                                                                                                   |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport                                |
| ProductToProductClassDataImportPlugin                                        | Imports product to product class relations.                                                                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport                                |
| ProductShipmentTypeDataImportPlugin                                          | Imports a product shipment type relation.                                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport                                |
| ProductClassesProductConcreteExpanderPlugin                                  | Expands `ProductConcreteTransfer` with product classes.                                                                                    |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product                                   |
| ProductClassProductConcreteAfterUpdatePlugin                                 | Updates product classes for an existing product concrete.                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product                                   |
| ProductClassProductConcretePostCreatePlugin                                  | Saves product classes for a newly created product concrete.                                                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Product                                   |
| ShipmentTypeProductConcreteFormEditDataProviderExpanderPlugin                | Maps shipment types from product concrete to product form data.                                                                            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement                         |
| ProductClassFormExpanderPlugin                                               | Expands product concrete form with a product class field.                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement                         |
| ProductClassProductConcreteFormEditDataProviderExpanderPlugin                | Expands product concrete form data with product classes.                                                                                   |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement                         |
| ProductClassProductConcreteTransferMapperPlugin                              | Maps product class data from form to `ProductConcreteTransfer`.                                                                            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement                         |
| ShipmentTypeProductConcreteFormExpanderPlugin                                | Expands the `ProductConcreteForm` with a choice field for shipment types.                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement                         |
| ShipmentTypeProductFormTransferMapperExpanderPlugin                          | Maps shipment type form data to `ProductConcreteTransfer`.                                                                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductManagement                         |
| ProductClassProductAbstractMapExpanderPlugin                                 | Adds product class names to product abstract search data.                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch                         |
| ProductClassProductPageDataExpanderPlugin                                    | Expands the provided ProductPageSearchTransfer transfer object's data with product classes.                                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch                         |
| ProductClassProductPageDataLoaderPlugin                                      | Expands `ProductPageLoadTransfer` object with product class data.                                                                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductPageSearch                         |
| ProductClassProductConcreteStorageCollectionExpanderPlugin                   | Expands `ProductConcreteStorage` transfers with product classes.                                                                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductStorage                            |
| ProductClassOrderExpanderPlugin                                              | Expands order items with product classes.                                                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                                     |
| ProductClassOrderItemsPostSavePlugin                                         | Persists product classes information from `ItemTransfer.productClasses`.                                                                   |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                                     |
| SspProductClassSalesOrderItemCollectionPreDeletePlugin                       | Deletes related product class entries for given sales order items.                                                                         |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                                     |
| CoordinatesServicePointSearchDataExpanderPlugin                              | Adds latitude and longitude coordinates to the service point search data.                                                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ServicePointSearch                        |
| ProductServiceAvailabilityStorageStrategyPlugin                              | Checks the availability of service products by verifying they have a service shipment type and at least one available product offer.       |               | SprykerFeature\Client\SelfServicePortal\Plugin\AvailabilityStorage                                  |
| ShipmentTypeServicePointProductOfferStorageFilterPlugin                      | Filters product offers by shipment type and service point UUIDs from criteria to return matching offers.                                   |               | SprykerFeature\Client\SelfServicePortal\Plugin\ProductOfferStorage                                  |
| SspServiceReschedulableOrderExpanderPlugin                                   | Expands the order items with "reschedulable" flag, that is used to show/hide reschedule button in storefront and back-office.              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                                     |
| SspServiceReschedulableOrderExpanderPlugin                                   | Expands the order items with "reschedulable" flag, that is used to show/hide reschedule button in storefront and back-office.              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales                                     |
| ViewCompanySspServicePermissionPlugin                                   | Allows customer to view services within the same company.                                                                                  |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Permission                                     |
| ViewBusinessUnitSspServicePermissionPlugin                                   | Allows customer to view services within the same company business unit.                                                                  |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Permission                                     |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php
<?php

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
        $dataExpanderPlugins[SelfServicePortalConfig::PLUGIN_PRODUCT_ABSTRACT_CLASS_DATA] = new ProductClassProductPageDataExpanderPlugin();

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
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Sales\SspServiceReschedulableOrderExpanderPlugin;

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
            new SspServiceReschedulableOrderExpanderPlugin(),
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

use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;
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

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

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

**src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferStorage;

use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;
use SprykerFeature\Client\SelfServicePortal\Plugin\ProductOfferStorage\ShipmentTypeServicePointProductOfferStorageFilterPlugin;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{

    /**
     * @return list<\Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageFilterPluginInterface>
     */
    protected function getProductOfferStorageFilterPlugins(): array
    {
        return [
            new ShipmentTypeServicePointProductOfferStorageFilterPlugin(),
        ];
    }
}
```

2. Enable the project override to enable the checkout form to handle single addresses per shipment type:


<details>
  <summary>src/Pyz/Yves/CustomerPage/Form/CheckoutAddressCollectionForm.php</summary>

```php
<?php

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

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Permission\ViewCompanySspServicePermissionPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Permission\ViewBusinessUnitSspServicePermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewCompanySspServicePermissionPlugin(),
            new ViewBusinessUnitSspServicePermissionPlugin(),
        ];
    }
}
```

Enable new permission plugins

```bash
console setup:init-db
```

## Demo data for EU region / DE store

### Add service demo data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/shipment.csv**

```csv
shipment_method_key,name,carrier,taxSetName
in-center-service,Service Center Appointment,Service,Tax Exempt
```

**data/import/common/common/shipment_type.csv**

```csv
key,name,is_active
in-center-service,In-Center Service,1
```

**data/import/common/common/service.csv**

```csv
key,service_point_key,service_type_key,is_active
s3,sp1,in-center-service,1
```

**data/import/common/common/service_type.csv**

```csv
name,key
Service Visit,in-center-service
```

**data/import/common/common/shipment_method_shipment_type.csv**

```csv
shipment_method_key,shipment_type_key
in-center-service,in-center-service
```

**data/import/common/common/shipment_type_service_type.csv**

```csv
shipment_type_key,service_type_key
in-center-service,in-center-service
```

**data/import/common/DE/shipment_method_store.csv**

```csv
shipment_method_key,store
in-center-service,DE
```

**data/import/common/common/product_to_product_class.csv**

```csv
sku,product_class_key
service-001-1,service
service-001-1,scheduled
```

**data/import/common/common/product_class.csv**

```csv
key,name
service,Service
scheduled,Scheduled
spare-parts,Spare parts
```

**data/import/common/DE/shipment_type_store.csv**

```csv
shipment_type_key,store_name
in-center-service,DE
delivery,DE
```

**data/import/common/DE/shipment_price.csv**

```csv
shipment_method_key,store,currency,value_net,value_gross
in-center-service,DE,EUR,,0
in-center-service,DE,CHF,,0
```

**data/import/common/common/product_shipment_type.csv**

```csv
concrete_sku,shipment_type_key
service-001-1,in-center-service
```

### Import product labels for the service products

Prepare your data according to your requirements using our demo data:

**data/import/common/DE/product_label_store.csv**

```csv
name,store_name
Service,DE
Scheduled,DE
Spare parts,DE
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


#### Extend the data import configuration

**/data/import/local/full_EU.yml**

```yaml
# ...

# SelfServicePortal
- data_entity: shipment-type
  source: data/import/common/common/shipment_type.csv
- data_entity: service-type
  source: data/import/common/common/service_type.csv
- data_entity: service
  source: data/import/common/common/service.csv
- data_entity: shipment-method-shipment-type
  source: data/import/common/common/shipment_method_shipment_type.csv
- data_entity: shipment-type-service-type
  source: data/import/common/common/shipment_type_service_type.csv
- data_entity: shipment-method-store
  source: data/import/common/DE/shipment_method_store.csv
- data_entity: product-class
  source: data/import/common/common/product_class.csv
- data_entity: product-to-product-class
  source: data/import/common/common/product_to_product_class.csv
- data_entity: shipment-type-store
  source: data/import/common/DE/shipment_type_store.csv
- data_entity: shipment-price
  source: data/import/common/DE/shipment_price.csv
- data_entity: product-shipment-type
  source: data/import/common/common/product_shipment_type.csv
```

### Register the following data import plugins

| PLUGIN                              | SPECIFICATION                                       | PREREQUISITES | NAMESPACE                                                            |
|-------------------------------------|-----------------------------------------------------|---------------|----------------------------------------------------------------------|
| ProductShipmentTypeDataImportPlugin | Imports product shipment type relations into persistence. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |
| ProductClassDataImportPlugin        | Imports product classes.                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |
| ProductToProductClassDataImportPlugin | Imports product to product class relations.        |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |

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
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
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
use Spryker\Zed\ShipmentTypeDataImport\ShipmentTypeDataImportConfig;
use Spryker\Zed\ShipmentTypeServicePointDataImport\ShipmentTypeServicePointDataImportConfig;
use Spryker\Zed\ServicePointDataImport\ServicePointDataImportConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected const string COMMAND_SEPARATOR = ':';

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

### Import the data

{% info_block infoBox "Prerequisites" %}

Before importing the data, make sure you have imported demo data for product concrete with sku **service-001-1**:
- [Import product data](/docs/dg/dev/data-import/latest/importing-product-data-with-a-single-file.html#single-csv-file-for-combined-product-data-import)

Before importing the data, make sure you have imported demo data for service point with key **sp1**:
- [Import Service Points data](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html#import-service-points)

{% endinfo_block %}

```bash
console data:import product-class
console data:import shipment
console data:import product-shipment-type
console data:import shipment-price
console data:import shipment-type
console data:import shipment-type-store
console data:import shipment-method-store
console data:import service
console data:import shipment-type-service-type
console data:import shipment-method-shipment-type
console data:import service-type
console data:import:product-label
console data:import product-to-product-class
```

{% info_block warningBox "Verification" %}

- Make sure the glossary keys have been added to `spy_glossary_key` and `spy_glossary_translation` tables.
- Make sure the following tables contain the imported data:
  - `spy_product_shipment_type`
  - `spy_sales_product_abstract_type`
  - `spy_sales_order_item_product_abstract_type`
  - `spy_product_abstract_type`
  - `spy_product_abstract_to_product_abstract_type`
  - `spy_product_label`
  - `spy_product_label_store`

{% endinfo_block %}

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Catalog** > **Products**.
2. Create an abstract product with a concrete product.
- Add **In-Center Service** and **Delivery** shipment types for the concrete product.
- Add **Service** and **Scheduled** product classes for the concrete product.

5. Go to **Marketplace** > **Offers**.
6. Generate one or more product offers for the service product you've created. Make sure the following applies on the
   offer create page:
- The offer creation form is automatically prepopulated with information from the product
- You can assign a sign point to the product offer
- The in-center service shipment type is available

{% endinfo_block %}

## Set up widgets

Set up widgets as follows:

1. Register the following plugins to enable widgets and plugins:

| PLUGIN                                                                 | SPECIFICATION                                                               | PREREQUISITES | NAMESPACE                                                    |
|------------------------------------------------------------------------|-----------------------------------------------------------------------------|---------------|--------------------------------------------------------------|
| SspServiceMenuItemWidget                                               | Adds a menu item for accessing SSP services in the navigation.              |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServiceChangeScheduledTimeLinkWidget                                | Provides a link to change the scheduled time for a specific service.        |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServiceChangeScheduledTimeLinkWidget                                | Provides a link to change the scheduled time for a specific service.        |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServiceChangeScheduledTimeLinkWidget                                | Provides a link to change the scheduled time for a specific service.        |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| ListCartItemsByShipmentTypeWidget                                      | Lists items in the cart grouped by their shipment type.                     |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| ServiceListWidget                                                      | Display the list of the given service products.                             |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspAddressFormItemsByShipmentTypeWidget                                | Lists address from items grouped by their shipment type.                    |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspProductOfferPriceWidget                                             | Displays the product offer price for the products with a service type.      |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServiceCancelWidget                                                 | Renders a cancel button for the sales order item on the order details page. |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServiceDetectorWidget                                               | Provide a method to determine if the product is a service.                  |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServicePointGeoCodeWidget                                           | Displays the coordinates of the service point.                              |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServicePointNameForItemWidget                                       | Displays the service point name for the cart items.                         |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspServicePointSearchWidget                                            | Displays the service point search modal window.                             |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SspShipmentTypeServicePointSelectorWidget                              | Displays the shipment type and service point selector.                      |               | SprykerFeature\Yves\SelfServicePortal\Widget                 |
| SingleAddressPerShipmentTypeWidgetCacheKeyGeneratorStrategyPlugin      | Generates a cache key for the related widget.                               |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication |
| AddressFormItemsByShipmentTypeWidgetCacheKeyGeneratorStrategyPlugin    | Generates a cache key for the related widget.                               |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication |
| SspServiceCancelWidgetCacheKeyGeneratorStrategyPlugin                  | Generates cache key for `SspServiceCancelWidget`.                           |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication |
| SspServiceChangeScheduledTimeLinkWidgetCacheKeyGeneratorStrategyPlugin | Generates cache key for `SspServiceChangeScheduledTimeLinkWidget`.          |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication |
| SspListMenuItemWidget                             | Provides a menu item widget for SSP lists in the customer account navigation.                                                             |               | SprykerFeature\Yves\SelfServicePortal\Widget |

<details>
  <summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
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
use SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication\SspServiceCancelWidgetCacheKeyGeneratorStrategyPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication\SspServiceChangeScheduledTimeLinkWidgetCacheKeyGeneratorStrategyPlugin;
use SprykerFeature\Yves\SelfServicePortal\Widget\ListCartItemsByShipmentTypeWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\ServiceListWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspListMenuItemWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SspServiceMenuItemWidget::class,
            SspServiceChangeScheduledTimeLinkWidget::class,
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
            ServiceListWidget::class,
            SspListMenuItemWidget::class,
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
            new SspServiceCancelWidgetCacheKeyGeneratorStrategyPlugin(),
            new SspServiceChangeScheduledTimeLinkWidgetCacheKeyGeneratorStrategyPlugin(),
        ];
    }
}
```

</details>

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```
console frontend:zed:install-dependencies
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Set customer permissions for inquiry management:

1. In the Back Office, go to **Customers** > **Company Roles**.
2. Click **Add Company User Role**.
3. Select a company.
4. Enter a name for the role.
5. In **Unassigned Permissions**, enable the following permissions:
    - **View company services**
    - **View business unit services**
6. Click **Submit**.
7. Go to **Customers** > **Company Users**.
8. Click **Edit** next to a user.
9. Assign the role you've created to the user.


1. On the Storefront, use the search to find the service product you've created.
   Make sure the product is available in the catalog.

2. Click the product to open its details page. Make sure the following applies on the product details page:

   - Delivery and In-Center-Service shipment types are available
   - Select In-Center-Service shipment type
   - A service point selector is displayed
   - A service date and time selector is displayed

3. Select a service point.
4. Select a service date and time.
5. Add the product to cart.
6. Add several other service and regular products to cart.
7. Go to the cart page and make sure the following applies:

- The cart items display the selected service points.
- Items are grouped by shipment type.
- Selected service date and time is displayed.

9. Place the order.
   Make sure the order is places successfully and the order summary includes service-specific details.

10. Go to **Customer Account** > **Services**. Make sure the following applies:

- The service associated with the order you've placed is displayed in the list with all the relevant service details

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

## Enable Storefront API endpoints

| PLUGIN                         | SPECIFICATION                                                       | PREREQUISITES | NAMESPACE                                                    |
|--------------------------------|---------------------------------------------------------------------|---------------|--------------------------------------------------------------|
| SspServicesResourceRoutePlugin | Provides the GET endpoint for the service products (booked-services). |               | SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication\SspServicesResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;

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

2. Get the access token by sending a `POST` request to the token endpoint with the company user credentials.
   `POST https://glue.mysprykershop.com/access-tokens`

```json
{
  "data": {
    "type": "access-tokens",
    "attributes": {
      "username": {username},
      "password": {password}
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

## Set up frontend templates

For information about setting up frontend templates, see [Set up SSP frontend templates](/docs/pbc/all/self-service-portal/latest/install/ssp-frontend-templates.html).