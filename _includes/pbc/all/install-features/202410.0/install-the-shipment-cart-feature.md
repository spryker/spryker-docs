

## Install feature core

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME         | VERSION          |
|--------------|------------------|
| Spryker Core | {{page.version}} |
| Shipment     | {{page.version}} |
| Cart         | {{page.version}} |
| Prices       | {{page.version}} |

### Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/shipment-cart-connector: "^2.1.0" spryker/shipment-type-cart: "^1.0.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                     |
|-----------------------|----------------------------------------|
| ShipmentCartConnector | vendor/spryker/shipment-cart-connector |
| ShipmentTypeCart      | vendor/spryker/shipment-type-cart      |

{% endinfo_block %}

### Set up transfer objects

Apply transfer changes:

```bash
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                  | TYPE  | EVENT   | PATH                                                            |
|---------------------------|-------|---------|-----------------------------------------------------------------|
| ShipmentMethods           | class | Created | src/Generated/Shared/Transfer/ShipmentMethodsTransfer           |
| ShipmentMethod            | class | Created | src/Generated/Shared/Transfer/ShipmentMethodTransfer            |
| Order                     | class | Created | src/Generated/Shared/Transfer/OrderTransfer                     |
| Quote                     | class | Created | src/Generated/Shared/Transfer/QuoteTransfer                     |
| Item                      | class | Created | src/Generated/Shared/Transfer/ItemTransfer                      |
| Expense                   | class | Created | src/Generated/Shared/Transfer/ExpenseTransfer                   |
| MoneyValue                | class | Created | src/Generated/Shared/Transfer/MoneyValueTransfer                |
| Money                     | class | Created | src/Generated/Shared/Transfer/MoneyTransfer                     |
| CartPreCheckResponse      | class | Created | src/Generated/Shared/Transfer/CartPreCheckResponseTransfer      |
| Message                   | class | Created | src/Generated/Shared/Transfer/MessageTransfer                   |
| CartChange                | class | Created | src/Generated/Shared/Transfer/CartChangeTransfer                |
| Currency                  | class | Created | src/Generated/Shared/Transfer/CurrencyTransfer                  |
| ShipmentGroup             | class | Created | src/Generated/Shared/Transfer/ShipmentGroupTransfer             |
| Shipment                  | class | Created | src/Generated/Shared/Transfer/ShipmentTransfer                  |
| ShipmentMethodsCollection | class | Created | src/Generated/Shared/Transfer/ShipmentMethodsCollectionTransfer |
| ShipmentType              | class | Created | src/Generated/Shared/Transfer/ShipmentTypeTransfer              |
| ShipmentTypeCollection    | class | Created | src/Generated/Shared/Transfer/ShipmentTypeCollectionTransfer    |
| ShipmentTypeConditions    | class | Created | src/Generated/Shared/Transfer/ShipmentTypeConditionsTransfer    |
| ShipmentTypeCriteria      | class | Created | src/Generated/Shared/Transfer/ShipmentTypeCriteriaTransfer      |
| CheckoutResponse          | class | Created | src/Generated/Shared/Transfer/CheckoutResponseTransfer          |
| CheckoutError             | class | Created | src/Generated/Shared/Transfer/CheckoutErrorTransfer             |
| Store                     | class | Created | src/Generated/Shared/Transfer/StoreTransfer                     |

{% endinfo_block %}

### Set up behavior

Register the following plugins:

| PLUGIN                                  | SPECIFICATION                                                                                               | PREREQUISITES                                | NAMESPACE                                                                                         |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------------|----------------------------------------------|---------------------------------------------------------------------------------------------------|
| CartShipmentCartOperationPostSavePlugin | Recalculates the shipment expenses.                                                                         | Replacement for `CartShipmentExpanderPlugin` | Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart                                       |
| CartShipmentPreCheckPlugin              | Validates if current shipment method is still valid in cart shipments.                                      |                                              | Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart                                       |
| SanitizeCartShipmentItemExpanderPlugin  | Clears quote shipping data if a user modified quote items.                                                  |                                              | Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart                                       |
| ShipmentTypeCheckoutPreConditionPlugin  | Validates if selected shipment type have relation to selected shipment method, current store and is active. |                                              | Spryker\Zed\ShipmentTypeCart\Communication\Plugin\Checkout\ShipmentTypeCheckoutPreConditionPlugin |

**Pyz\Zed\Cart\CartDependencyProvider**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart\CartShipmentCartOperationPostSavePlugin;
use Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart\SanitizeCartShipmentItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container)
    {
        return [
            new SanitizeCartShipmentItemExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationPostSavePluginInterface[]
     */
    protected function getPostSavePlugins(Container $container)
    {
        return [
            new CartShipmentCartOperationPostSavePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ShipmentTypeCart\Communication\Plugin\Checkout\ShipmentTypeCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditions(Container $container): array
    {
        return [
            new ShipmentTypeCheckoutPreConditionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

* Make sure that if you change items in the cart (add, remove or change quantity) then all the shipping methods are sanitized.
* Make sure that if you deactivate shipment type selected during the checkout, you will receive a validation error on checkout summary page. 

{% endinfo_block %}


## Install feature frontend

Follow the steps below to install the feature frontend.

### Prerequisites

Install the required features:

| NAME     | VERSION          | 
|----------|------------------|
| Shipment | {{page.version}} |
| Cart     | {{page.version}} |

### Add translations

Add translations as follows:

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```csv
shipment_type_cart.checkout.validation.error,Selected delivery type "%name%" is not available,en_US
shipment_type_cart.checkout.validation.error,Die ausgewählte Lieferart "%name%" ist nicht verfügbar,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table in the database.

{% endinfo_block %}
