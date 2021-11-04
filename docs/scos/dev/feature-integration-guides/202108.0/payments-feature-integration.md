---
title: Payments feature integration
description: Use the guide to install the Payment per store feature in your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/payments-feature-integration
originalArticleId: 31957fa5-b32a-4227-b6d5-42b89c6e1855
redirect_from:
  - /2021080/docs/payments-feature-integration
  - /2021080/docs/en/payments-feature-integration
  - /docs/payments-feature-integration
  - /docs/en/payments-feature-integration
related:
  - title: Payments feature overview
    link: docs/scos/user/features/page.version/payments-feature-overview.html
---

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place.<br>The current feature integration guide only adds the following functionalities:
* Payment Back Office UI;
* Payment method per store;
* Payment data import.

{% endinfo_block %}

## Install feature core

### Prerequisites

To start the feature integration, overview and install the necessary features:

|  NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require "spryker-feature/payments:{{page.version}}" "spryker/checkout-rest-api:^3.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| PaymentDataImport | vendor/spryker/payment-data-import |
| PaymentGui | vendor/spryker/payment-gui |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
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
Make sure that the following changes have been applied in transfer objects:

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

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| payment_method_key | mandatory | string | dummyPaymentInvoice | Key of a payment method. |
| payment_method_name | mandatory | string | Invoice | Name of a payment method. |
| payment_provider_key | mandatory | string | dummyPayment | Key of a payment provider. |
| payment_provider_name | mandatory | string | Dummy Payment | Name of a payment provider. |
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

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| payment_method_key | mandatory | string | dummyPaymentInvoice | Key of the existing payment method. |
| store | mandatory | string | DE |Name of the existing store. |

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

Run the following console command to import data:

```bash
console data:import:payment-method
console data:import:payment-method-store
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_payment_method`, `spy_payment_provider`, and `spy_payment_method_store` tables in the database.

{% endinfo_block %}

### 4) Set up behavior
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

### 5) Additional cleanups:

The `SalesPaymentMethodTypeInstallerPlugin` plugin was removed, please use the `PaymentDataImport module` instead.
The `PaymentConfig::getSalesPaymentMethodTypes()` config method was removed, please use the `PaymentDataImport` module instead.
