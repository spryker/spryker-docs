

This document describes how to integrate the [Order Management](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/order-management-feature-overview.html) + [Shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) features into a Spryker project.

{% info_block errorBox %}

The following features integration guide expects the basic feature to be in place.

The feature integration guide adds the following functionality:

* [Order Management](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/order-management-feature-overview.html)
* [Shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html)

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Order Management + Shipment feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME             | VERSION          | INTEGRATION GUIDE                                                                                                                                                                   |
|------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Order Management | {{page.version}} | [Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/order-management-feature-integration.html)                                        |
| Shipment         | {{page.version}} | [Shipment feature integration](/docs/pbc/all/carrier-management/{{page.version}}/unified-commerce/enhanced-click-and-collect/install-and-upgrade/install-the-shipment-feature.html) |


## 1) Install the required modules using Composer

```bash
composer require spryker/sales-shipment-type:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE             | EXPECTED DIRECTORY                 |
|--------------------|------------------------------------|
| SalesShipmentType  | vendor/spryker/sales-shipment-type |

{% endinfo_block %}

### 2) Set up the database schema and transfer objects

Apply the database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                     | TYPE   | EVENT   |
|-------------------------------------|--------|---------|
| spy_sales_shipment_type             | table  | created |
| spy_sales_shipment.fk_shipment_type | column | created |

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER          | TYPE  | EVENT   | PATH                                                    |
|-------------------|-------|---------|---------------------------------------------------------|
| SalesShipmentType | class | created | src/Generated/Shared/Transfer/SalesShipmentTypeTransfer |

{% endinfo_block %}

### 3) Set up behavior

Enable the following plugins:

| PLUGIN                                | SPECIFICATION                                                                                                            | PREREQUISITES                                                       | NAMESPACE                                                   |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|-------------------------------------------------------------|
| ShipmentTypeCheckoutDoSaveOrderPlugin | Persists shipment type data to `spy_sales_shipment_type` table and updates `spy_sales_shipment` with `fk_shipment_type`. | Should be executed after the `SalesOrderShipmentSavePlugin` plugin. | Spryker\Zed\SalesShipmentType\Communication\Plugin\Checkout |


**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\SalesShipmentType\Communication\Plugin\Checkout\ShipmentTypeCheckoutDoSaveOrderPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface>|list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface>
     */
    protected function getCheckoutOrderSavers(Container $container): array
    {
        return [
            new ShipmentTypeCheckoutDoSaveOrderPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that when you place an order, the selected shipment type is persisted to `spy_sales_shipment_type` and `spy_sales_shipment.fk_sales_shipment_type` is updated.

{% endinfo_block %}
