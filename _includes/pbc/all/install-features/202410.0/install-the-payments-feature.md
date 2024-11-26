

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place.<br>The current feature integration guide only adds the following functionalities:
* Payment Back Office UI;
* Payment method per store;
* Payment data import.
w* Payment App express checkout flow. 

{% endinfo_block %}

## Install feature core

### Prerequisites

To start the feature integration, overview and install the necessary features:

|  NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require "spryker-feature/payments:{{page.version}}" "spryker/checkout-rest-api:^3.0.0" "spryker/payment-cart-connector"  --update-with-dependencies
```


{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY                               |
|---------------------------|--------------------------------------------------|
| PaymentDataImport         | vendor/spryker/payment-data-import               |
| PaymentGui                | vendor/spryker/payment-gui                       |
| PaymentApp                | vendor/spryker/payment-app                       |
| PaymentAppExtension       | vendor/spryker/payment-app-extension             |
| PaymentAppShipment        | vendor/spryker/payment-app-shipment              |
| PaymentAppWidget          | vendor/spryker-shop/payment-app-widget           |
| PaymentAppWidgetExtension | vendor/spryker-shop/payment-app-widget-extension |
| PaymentCartConnector      | vendor/spryker/payment-cart-connector            |

{% endinfo_block %}

### 2) Set up configuration

1. Add the following configuration to your project:

2. Configure the checkout payment step to hide the express checkout payment methods.
Depending on your project needs, you can exclude the payment methods that you do not want to show on the checkout payment step.
In case you are using the `Payone` app, you can exclude the `payone-paypal-express` payment method.

**src/Pyz/Yves/CheckoutPage/CheckoutPageConfig.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage;
use SprykerShop\Yves\CheckoutPage\CheckoutPageConfig as SprykerCheckoutPageConfig;
class CheckoutPageConfig extends SprykerCheckoutPageConfig
{

    /**
     * @return list<string>
     */
    public function getExcludedPaymentMethodKeys(): array
    {
        return [
            'payone-paypal-express',
        ];
    }
}
```

Cart reload, remove item, and update quantity are the default cart operations.
Define the payment methods that you want to exclude from the cart operations.
In the example below, the `PayPal Express` payment method name that is excluded from the cart operations.

**src/Pyz/Zed/PaymentCartConnector/PaymentCartConnectorConfig.php**

```php
<?php

namespace Pyz\Zed\PaymentCartConnector;

use Spryker\Zed\PaymentCartConnector\PaymentCartConnectorConfig as SprykerPaymentCartConnectorConfig;

class PaymentCartConnectorConfig extends SprykerPaymentCartConnectorConfig
{
    /**
     * @var list<string>
     */
    protected const EXCLUDED_PAYMENT_METHODS = [
        'PayPal Express',
    ];
}
```

{% info_block warningBox "Verification" %}

Make sure that:
* The payment methods you have excluded are not shown on the checkout payment step page:
  * Add several products to the cart and proceed to the checkout.
  * Check that the excluded payment methods are not shown on the checkout payment step page.

{% endinfo_block %}

3. Configure the checkout steps to hide during the express checkout flow.
The express checkout flow is a simplified checkout flow that skips some of the checkout steps.
Depending on your project needs, you can configure the checkout steps to be skipped during the express checkout flow.

**src/Pyz/Yves/PaymentAppWidget/PaymentAppWidgetConfig.php**

```php
<?php

namespace Pyz\Yves\PaymentAppWidget;

use Generated\Shared\Transfer\QuoteTransfer;
use SprykerShop\Yves\PaymentAppWidget\PaymentAppWidgetConfig as SprykerPaymentAppWidgetConfig;

class PaymentAppWidgetConfig extends SprykerPaymentAppWidgetConfig
{
    /**
     * @var list<string>
     */
    protected const CHECKOUT_STEPS_TO_SKIP_IN_EXPRESS_CHECKOUT_WORKFLOW = [
        'address',
        'shipment',
        'payment',
    ];
}
```
{% info_block warningBox "Verification" %}

Make sure that:
* The express checkout flow skips the checkout steps you have configured:
  * Add several products to the cart and proceed to the express checkout flow.
  * Use the express checkout widget to place an order shown on the cart page.
  * After the confirmation, you will be redirected to the order confirmation page.
  * Check that the express checkout flow skips the checkout steps you have configured.

{% endinfo_block %}

4. Configure the quote fields to be cleaned during the express checkout flow.
When customers return to the cart page during the express checkout flow, certain quote fields are cleared to allow them to restart the checkout process from the beginning.

**src/Pyz/Yves/PaymentAppWidget/PaymentAppWidgetConfig.php**

```php
<?php

namespace Pyz\Yves\PaymentAppWidget;

use Generated\Shared\Transfer\QuoteTransfer;
use SprykerShop\Yves\PaymentAppWidget\PaymentAppWidgetConfig as SprykerPaymentAppWidgetConfig;

class PaymentAppWidgetConfig extends SprykerPaymentAppWidgetConfig
{

    /**
     * @var list<string>
     */
    protected const QUOTE_FIELDS_TO_CLEAN_IN_EXPRESS_CHECKOUT_WORKFLOW = [
        QuoteTransfer::PAYMENT,
        QuoteTransfer::PAYMENTS,
        QuoteTransfer::SHIPMENT,
        QuoteTransfer::BILLING_ADDRESS,
        QuoteTransfer::SHIPPING_ADDRESS,
        QuoteTransfer::PRE_ORDER_PAYMENT_DATA,
    ];
}
```

{% info_block warningBox "Verification" %}

Make sure that:
* The quote fields you have configured are cleared when customers return to the cart page during the express checkout flow:
  * Add several products to the cart and proceed to the express checkout flow.
  * Use the express checkout widget to place an order shown on the cart page.
  * After the confirmation, you will be redirected to the order confirmation page.
  * Return to the cart page and check that the quote fields you have configured are cleared.

{% endinfo_block %}

5. Configure the shipment method for the express checkout payment request.
In the example below, the `spryker_dummy_shipment-standard` shipment method is configured for the `payone-paypal-express` payment method.
The key is the payment method key, and the value is the shipment method key.

**src/Pyz/Zed/PaymentAppShipment/PaymentAppShipmentConfig.php**

```php
<?php

namespace Pyz\Zed\PaymentAppShipment;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\PaymentAppShipment\PaymentAppShipmentConfig as SprykerPaymentAppShipmentConfig;

class PaymentAppShipmentConfig extends SprykerPaymentAppShipmentConfig
{
    /**
     * @var array<string, string>
     */
    protected const EXPRESS_CHECKOUT_SHIPMENT_METHODS_INDEXED_BY_PAYMENT_METHOD = [
        'payone-paypal-express' => 'spryker_dummy_shipment-standard',
    ];
}
```

{% info_block warningBox "Verification" %}

Make sure that:
* The shipment method you have configured is used for the express checkout payment request:
  * Add several products to the cart and proceed to the express checkout flow.
  * Use the express checkout widget to place an order shown on the cart page.
  * After the confirmation, you will be redirected to the order confirmation page.
  * Check that the shipment method you have configured is used for the express checkout payment request.

{% endinfo_block %}

6. Enable the express checkout shipment for the product bundles.

**src/Pyz/Zed/PaymentAppShipment/PaymentAppShipmentConfig.php**

```php
<?php

namespace Pyz\Zed\PaymentAppShipment;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\PaymentAppShipment\PaymentAppShipmentConfig as SprykerPaymentAppShipmentConfig;

class PaymentAppShipmentConfig extends SprykerPaymentAppShipmentConfig
{
    /**
     * @var list<string>
     */
    protected const SHIPMENT_ITEM_COLLECTION_FIELD_NAMES = [
        QuoteTransfer::BUNDLE_ITEMS,
    ];
}
```

{% info_block warningBox "Verification" %}

Make sure that:
* The express checkout shipment is enabled for the product bundle:
  * Add a product bundle to the cart and proceed to the express checkout flow.
  * Place an order using the express checkout flow.
  * The order is placed successfully.

{% endinfo_block %}


### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_payment_method | table | created |
| spy_payment_provider | table | created |
| spy_payment_method_store | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| PaymentMethodTransfer | class | created | src/Generated/Shared/Transfer/PaymentMethodTransfer |
| PaymentProviderTransfer | class | created | src/Generated/Shared/Transfer/PaymentProviderTransfer |
| PaymentMethodResponseTransfer | class | created | src/Generated/Shared/Transfer/PaymentMethodResponseTransfer |
| StoreTransfer | class | created | src/Generated/Shared/Transfer/StoreTransfer |
| DataImporterConfigurationTransfer | class | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer |
| DataImporterReaderConfigurationTransfer | class | created | src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer |
| DataImporterReportTransfer | class | created | src/Generated/Shared/Transfer/DataImporterReportTransfer |
| DataImporterReportMessageTransfer | class | created | src/Generated/Shared/Transfer/DataImporterReportMessageTransfer |

{% endinfo_block %}

### 3) Import data

#### Import Payment Methods

{% info_block infoBox "Info" %}

The following imported entities will be used as payment methods in Spryker OS.

{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

**data/import/payment_method.csv**

```yaml
payment_method_key,payment_method_name,payment_provider_key,payment_provider_name,is_active
dummyPaymentInvoice,Invoice,dummyPayment,Dummy Payment,1
dummyPaymentCreditCard,Credit Card,dummyPayment,Dummy Payment,1
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| payment_method_key | ✓ | string | dummyPaymentInvoice | Key of a payment method. |
| payment_method_name | ✓ | string | Invoice | Name of a payment method. |
| payment_provider_key | ✓ | string | dummyPayment | Key of a payment provider. |
| payment_provider_name | ✓ | string | Dummy Payment | Name of a payment provider. |
| is_active | optional | boolean | 1 | Indicates if this payment method is available. |

**data/import/payment_method_store.csv**

```yaml
payment_method_key,store
dummyPaymentInvoice,DE
dummyPaymentInvoice,AT
dummyPaymentInvoice,US
dummyPaymentCreditCard,DE
dummyPaymentCreditCard,AT
dummyPaymentCreditCard,US
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| payment_method_key | ✓ | string | dummyPaymentInvoice | Key of the existing payment method. |
| store | ✓ | string | DE |Name of the existing store. |

Register the following plugin data import plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| PaymentMethodDataImportPlugin | Imports payment method data into the database. | None | \Spryker\Zed\PaymentDataImport\Communication\Plugin |
| PaymentMethodStoreDataImportPlugin | Imports payment method store data into the database. | None | \Spryker\Zed\PaymentDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\PaymentDataImport\Communication\Plugin\PaymentMethodDataImportPlugin;
use Spryker\Zed\PaymentDataImport\Communication\Plugin\PaymentMethodStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new PaymentMethodDataImportPlugin(),
            new PaymentMethodStoreDataImportPlugin(),
        ];
    }
}
```

Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\PaymentDataImport\PaymentDataImportConfig;

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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . PaymentDataImportConfig::IMPORT_TYPE_PAYMENT_METHOD),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . PaymentDataImportConfig::IMPORT_TYPE_PAYMENT_METHOD_STORE),
        ];

        return $commands;
    }
}
```

Import data:

```bash
console data:import:payment-method
console data:import:payment-method-store
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_payment_method`, `spy_payment_provider`, and `spy_payment_method_store` tables in the database.

{% endinfo_block %}


### 4) Add translations

1. Append glossary according to your configuration:

```csv
payment_app_widget.validation.quote_is_empty, Quote is empty.,en_US
payment_app_widget.validation.quote_is_empty, Angebot ist leer.,de_DE
payment_app_widget.error.payment_failed,Payment failed,en_US
payment_app_widget.error.payment_failed,Zahlung fehlgeschlagen,de_DE
payment_app_widget.error.incorrect_quote,"Quote not found, session may have expired",en_US
payment_app_widget.error.incorrect_quote,"Angebot nicht gefunden, Sitzung ist möglicherweise abgelaufen",de_DE
```

2. Import data:

```bash
console data:import glossary
```

### 5) Set up behavior
Configure the data import to use your data on the project level.

**src/Pyz/Zed/PaymentDataImport/PaymentDataImportConfig**

```php
<?php

namespace Pyz\Zed\PaymentDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\PaymentDataImport\PaymentDataImportConfig as SprykerPaymentDataImportConfig;

class PaymentDataImportConfig extends SprykerPaymentDataImportConfig
{
    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getPaymentMethodDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('payment_method.csv', static::IMPORT_TYPE_PAYMENT_METHOD);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getPaymentMethodAtoreDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('payment_method_store.csv', static::IMPORT_TYPE_PAYMENT_METHOD_STORE);
    }
}
```

Configure the Payment GUI module with money and store plugins.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreRelationToggleFormTypePlugin | Represents a store relation toggle form based on stores registered in the system. | None | Spryker\Zed\Store\Communication\Plugin\Form |

**src/Pyz/Zed/PaymentGui/PaymentGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PaymentGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\PaymentGui\PaymentGuiDependencyProvider as SprykerPaymentGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class PaymentGuiDependencyProvider extends SprykerPaymentGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin(): FormTypeInterface
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that:
* You can see the list of payment methods in the **Back Office > Administration >  Payment Management > Payment Methods** section.
* You can see information about the payment method in the **Back Office > Administration >  Payment Management > Payment Methods > View** section.
* You can edit the payment method in the **Back Office > Administration >  Payment Management > Payment Methods > Edit** section.

{% endinfo_block %}

Enable the payment app express checkout flow in the Yves step engine.

| PLUGIN                                                              | SPECIFICATION                                                                                                    | PREREQUISITES | NAMESPACE                                             |
|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------|
| PaymentAppExpressCheckoutWorkflowCheckoutStepResolverStrategyPlugin | Returns checkout steps suitable to express checkout workflow and cleans quote fields based on the configuration. | None          | SprykerShop\Yves\PaymentAppWidget\Plugin\CheckoutPage |

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\PaymentAppWidget\Plugin\CheckoutPage\PaymentAppExpressCheckoutWorkflowCheckoutStepResolverStrategyPlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutStepResolverStrategyPluginInterface>
     */
    protected function getCheckoutStepResolverStrategyPlugins(): array
    {
        return [
            new PaymentAppExpressCheckoutWorkflowCheckoutStepResolverStrategyPlugin(),
        ];
    }

}
```

Enable the default shipment method for the payment app express checkout flow.

| PLUGIN                                               | SPECIFICATION                                                         | PREREQUISITES | NAMESPACE                                                      |
|------------------------------------------------------|-----------------------------------------------------------------------|---------------|----------------------------------------------------------------|
| ShipmentExpressCheckoutPaymentRequestProcessorPlugin | Provides the shipment method for the express checkout payment request.| None          | Spryker\Zed\PaymentAppShipment\Communication\Plugin\PaymentApp |

**src/Pyz/Zed/PaymentApp/PaymentAppDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PaymentApp;

use Spryker\Zed\PaymentApp\PaymentAppDependencyProvider as SprykerPaymentAppDependencyProvider;
use Spryker\Zed\PaymentAppShipment\Communication\Plugin\PaymentApp\ShipmentExpressCheckoutPaymentRequestProcessorPlugin;

class PaymentAppDependencyProvider extends SprykerPaymentAppDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\PaymentAppExtension\Dependency\Plugin\ExpressCheckoutPaymentRequestProcessorPluginInterface>
     */
    protected function getExpressCheckoutPaymentRequestProcessorPlugins(): array
    {
        return [
            new ShipmentExpressCheckoutPaymentRequestProcessorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that:
* Enabled the express checkout payment method for the payment app.
  * Depends on the payment app enabled in the project.
  * Not all payment methods support the express checkout flow.
* You can see the express checkout button on the cart page.
* Proceed to the express checkout flow by clicking the express checkout button.
* Place an order using the express checkout flow.

{% endinfo_block %}

Register the following route provider plugins:

| PLUGIN                              | SPECIFICATION                                        | PREREQUISITES | NAMESPACE                                       |
|-------------------------------------|------------------------------------------------------|---------------|-------------------------------------------------|
| PaymentAppWidgetRouteProviderPlugin | Adds the payment app routes to the Yves application. |               | SprykerShop\Yves\PaymentAppWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\PaymentAppWidget\Plugin\Router\PaymentAppWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new PaymentAppWidgetRouteProviderPlugin(),
        ];
    }
}
```

Enable the payment method clean up for the cart operations.

| PLUGIN                                   | SPECIFICATION                                                              | PREREQUISITES | NAMESPACE                                                  |
|------------------------------------------|----------------------------------------------------------------------------|---------------|------------------------------------------------------------|
| RemoveQuotePaymentCartItemExpanderPlugin | Removes the payment information from the quote when cart changes are made. | None          | Spryker\Zed\PaymentCartConnector\Communication\Plugin\Cart |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\PaymentCartConnector\Communication\Plugin\Cart\RemoveQuotePaymentCartItemExpanderPlugin;

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
            new RemoveQuotePaymentCartItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}  

Make sure that:
* The payment method is removed from the quote when cart changes are made:
  * Add a product to the cart and proceed to the checkout with express checkout.
  * Navigate back to the cart page to adjust product quantities, add new products, or remove existing ones.
  * Check that the payment method is removed from the cart.

{% endinfo_block %}

### 6) Additional cleanups:

The `SalesPaymentMethodTypeInstallerPlugin` plugin was removed, please use the `PaymentDataImport module` instead.
The `PaymentConfig::getSalesPaymentMethodTypes()` config method was removed, please use the `PaymentDataImport` module instead.

### 7) Set up widgets

Set up widgets as follows:

1. Register the following plugins to enable widgets:

| PLUGIN                       | SPECIFICATION                                                     | PREREQUISITES | NAMESPACE                                |
|------------------------------|-------------------------------------------------------------------|---------------|------------------------------------------|
| ExpressCheckoutPaymentWidget | Displays the express checkout payment methods available for cart. |               | SprykerShop\Yves\PaymentAppWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\PaymentAppWidget\Widget\ExpressCheckoutPaymentWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ExpressCheckoutPaymentWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```
{% info_block warningBox "Verification" %}

Verify that the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET                       | VERIFICATION                                                                        |
|------------------------------|-------------------------------------------------------------------------------------|
| ExpressCheckoutPaymentWidget | Make sure that the express checkout payment methods are displayed on the cart page. |

{% endinfo_block %}
