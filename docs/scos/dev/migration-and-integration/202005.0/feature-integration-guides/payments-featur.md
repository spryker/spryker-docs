---
title: Payments Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/payments-feature-integration
redirect_from:
  - /v5/docs/payments-feature-integration
  - /v5/docs/en/payments-feature-integration
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place.</br>The current Feature Integration guide only adds the following functionalities:<ul><li>Payment Back Office UI;</li><li>Payment method per store;</li><li>Payment data import.</li></ul>
{% endinfo_block %}

## Install Feature Core
### Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require "spryker-feature/payments:^master" "spryker/checkout-rest-api:^3.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`PaymentDataImport`</td><td>`vendor/spryker/payment-data-import`</td></tr><tr><td>`PaymentGui`</td><td>`vendor/spryker/payment-gui`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><td>Database Entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_payment_method`</td><td>table</td><td>created</td></tr><tr><td>`spy_payment_provider`</td><td>table</td><td>created</td></tr><tr><td>`spy_payment_method_store`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`PaymentMethodTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PaymentMethodTransfer`</td></tr><tr><td>`PaymentProviderTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PaymentProviderTransfer`</td></tr><tr><td>`PaymentMethodResponseTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/PaymentMethodResponseTransfer`</td></tr><tr><td>`StoreTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoreTransfer`</td></tr><tr><td>`DataImporterConfigurationTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/DataImporterConfigurationTransfer`</td></tr><tr><td>`DataImporterReaderConfigurationTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer`</td></tr><tr><td>`DataImporterReportTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/DataImporterReportTransfer`</td></tr><tr><td>`DataImporterReportMessageTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/DataImporterReportMessageTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Import Data
Import Payment Methods

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

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `payment_method_key` | mandatory | string | dummyPaymentInvoice | Key of a payment method. |
| `payment_method_name` | mandatory | string | Invoice | Name of a payment method. |
| `payment_provider_key` | mandatory | string | dummyPayment | Key of a payment provider. |
| `payment_provider_name` | mandatory | string | Dummy Payment | Name of a payment provider. |
| `is_active` | optional | boolean | 1 | Indicates if this payment method is available. |

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

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `payment_method_key` | mandatory | string | dummyPaymentInvoice | Key of the existing payment method. |
| `store` | mandatory | string | DE |Name of the existing store. |

Register the following plugin data import plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PaymentMethodDataImportPlugin` | Imports payment method data into the database. | None | `\Spryker\Zed\PaymentDataImport\Communication\Plugin` |
| `PaymentMethodStoreDataImportPlugin` | Imports payment method store data into the database. | None | `\Spryker\Zed\PaymentDataImport\Communication\Plugin` |

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

Run the following console command to import data:

```bash
console data:import:payment-method
console data:import:payment-method-store
```

{% info_block warningBox "Verification" %}
Make sure that the configured data has been added to the `spy_payment_method`, `spy_payment_provider`, and `spy_payment_method_store` tables in the database.
{% endinfo_block %}

### 4) Set up Behavior
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

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `StoreRelationToggleFormTypePlugin` | Represents a store relation toggle form based on stores registered in the system. | None | `Spryker\Zed\Store\Communication\Plugin\Form` |

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
Make sure that:<ul><li>You can see the list of payment methods in the **Back Office > Administration >  Payment Management > Payment Methods** section.</li><li>You can see information about the payment method in the **Back Office > Administration >  Payment Management > Payment Methods > View** section.</li><li>You can edit the payment method in the **Back Office > Administration >  Payment Management > Payment Methods > Edit** section.</li></ul>
{% endinfo_block %}

### 5) Additional Cleanups:

The `SalesPaymentMethodTypeInstallerPlugin` plugin was removed, please use the `PaymentDataImport module` instead.
The `PaymentConfig::getSalesPaymentMethodTypes()` config method was removed, please use the `PaymentDataImport` module instead.
