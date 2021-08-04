---
title: Minimum Order Value Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/minimum-order-value-feature-integration
redirect_from:
  - /v5/docs/minimum-order-value-feature-integration
  - /v5/docs/en/minimum-order-value-feature-integration
---

## Install Feature Core

Follow the steps below to install the Minimum Order Value feature core.

### Prerequisites
To start feature integration, review and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | dev-master |
| Checkout |  dev-master|
| Order Management |dev-master  |
| Prices |dev-master  |
| Spryker Core | dev-master |
| Tax | dev-master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/order-threshold:"^dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
| SalesOrderThreshold | vendor/spryker/sales-order-threshold |
| SalesOrderThresholdExtension | vendor/spryker/sales-order-threshold-extension |
| SalesOrderThresholdDataImport | vendor/spryker/sales-threshold-data-import |
| SalesOrderThresholdGui | vendor/spryker/sales-order-threshold-gui |
| SalesOrderThresholdGuiExtension | vendor/spryker/sales-order-threshold-gui-extension |
	
	

{% endinfo_block %}




### 2) Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that you've triggered the following changes by checking the database:


| Database entity | Type |
| --- | --- |
| spy_sales_order_threshold | table |
| spy_sales_order_threshold_tax_set | table |
| spy_sales_order_threshold_type | table |
	

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that you've triggered the following changes in transfer objects:


| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| SalesOrderThresholdType | class | created | src/Generated/Shared/Transfer/SalesOrderThresholdTypeTransfer |
| SalesOrderThresholdValue | class | created | src/Generated/Shared/Transfer/SalesOrderThresholdValueTransfer |
| SalesOrderThreshold | class | created | src/Generated/Shared/Transfer/SalesOrderThresholdTransfer |
| SalesOrderThresholdLocalizedMessage | class | created | src/Generated/Shared/Transfer/SalesOrderThresholdLocalizedMessageTransfer |
| SpySalesOrderThresholdEntity | class | created | src/Generated/Shared/SpySalesOrderThresholdEntityTransfer  |
| SpySalesOrderThresholdTypeEntity | class | created | src/Generated/Shared/SpySalesOrderThresholdTypeEntityTransfer |
| SpySalesOrderThresholdTaxSetEntity | class | created | src/Generated/Shared/SpySalesOrderThresholdTaxSetEntityTransfer  |

{% endinfo_block %}

### 3) Add Translations
Using the demo data below, for each threshold message, configure the glossary keys per each configured locale and currency.

1. Add infrastructural record's glossary keys:

**src/data/import/glossary.csv**
    
```yaml
sales-order-threshold.strategy.soft-minimum-threshold-fixed-fee,Zuschlag,de_DE
sales-order-threshold.strategy.soft-minimum-threshold-fixed-fee,Surcharge,en_US
sales-order-threshold.strategy.soft-minimum-threshold-flexible-fee,Zuschlag,de_DE
sales-order-threshold.strategy.soft-minimum-threshold-flexible-fee,Surcharge,en_US
``` 


2. Add demo data glossary keys:

**src/data/import/glossary.csv**
```yaml
sales-order-threshold.hard-minimum-threshold.de.eur.message,"You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout",en_US
sales-order-threshold.hard-minimum-threshold.de.eur.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können nicht mit der Bestellung fortfahren",de_DE
sales-order-threshold.hard-minimum-threshold.de.chf.message,"You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout",en_US
sales-order-threshold.hard-minimum-threshold.de.chf.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können nicht mit der Bestellung fortfahren",de_DE
sales-order-threshold.hard-maximum-threshold.de.eur.message,The cart value cannot be higher than {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %}. Please remove some items to proceed with the order,en_US
sales-order-threshold.hard-maximum-threshold.de.eur.message,"Der Warenkorbwert darf nicht höher als {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} sein. Bitte entfernen Sie einige Artikel, um mit der Bestellung fortzufahren",de_DE
sales-order-threshold.hard-maximum-threshold.de.chf.message,The cart value cannot be higher than {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %}. Please remove some items to proceed with the order,en_US
sales-order-threshold.hard-maximum-threshold.de.chf.message,"Der Warenkorbwert darf nicht höher als {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} sein. Bitte entfernen Sie einige Artikel, um mit der Bestellung fortzufahren",de_DE
sales-order-threshold.soft-minimum-threshold.de.eur.message,"You need to add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold, but if you want can proceed to checkout.",en_US
sales-order-threshold.soft-minimum-threshold.de.eur.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können trotzdem weiter zur Kasse.",de_DE
sales-order-threshold.soft-minimum-threshold.de.chf.message,"You need to add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold, but if you want can proceed to checkout.",en_US
sales-order-threshold.soft-minimum-threshold.de.chf.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können trotzdem weiter zur Kasse.",de_DE
```    

3. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Ensure that, in the database, the configured data has been added to the `spy_glossary` table.
{% endinfo_block %}

### 4) Import Data

Import the following data.

#### Import Infrastructural Data

Import infrastructural data as follows:


1. Install the plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SalesOrderThresholdTypeInstallerPlugin` |Installs sales order threshold types. | None | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Installer` |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**
    
```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Installer\SalesOrderThresholdTypeInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            new SalesOrderThresholdTypeInstallerPlugin(),
        ];
    }
}
```

2. Execute the registered installer plugins and install infrastructural data:
		
```bash
console setup:init-d
```

{% info_block warningBox "Verification" %}

Ensure that, in the database, the sales order threshold types have been added to the `spy_sales_order_threshold_type` table.

{% endinfo_block %}


#### Import Sales Order Thresholds
{% info_block infoBox "Info" %}
The following imported entities will be used as sales order thresholds in Spryker OS.
{% endinfo_block %}


Import sales order thresholds as follows:

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/sales-order-threshold-data-import/data/import/sales_order_threshold.csv**

```yaml
store,currency,threshold_type_key,threshold,fee,message_glossary_key
DE,EUR,hard-minimum-threshold,40000,,
DE,EUR,hard-maximum-threshold,300000,,
DE,EUR,soft-minimum-threshold,100000,,
DE,CHF,hard-minimum-threshold,120000,,
DE,CHF,soft-minimum-threshold,200000,,
DE,CHF,hard-maximum-threshold,320000,,
```

| Column | Is Mandatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
|  `store`| mandatory |string  | DE | The store where the sales order threshold is applicable.  |
|`currency`  | mandatory | string | EUR | The currency for which the sales order threshold is applicable. |
|`threshold_type_key`  | mandatory | string | soft-minimum-threshold | The type of threshold to import. It should be the key to a configured plugin from the previous step. |
|  `threshold`| mandatory | int, in cents |1000  | The amount in cents to be reached or not reached(depending on the threshold type) by an order to pass a threshold check. |
| `fee` |optional  | integer, in cents |50  | The amount in cents or the percentage of order subtotal that is added to the order automatically if the order subtotal is below the threshold. |
| `message_glossary_key` | optional | string |sales-order-threshold.hard-minimum-threshold.de.eur.message  | The glossary key identifying the threshold message to show when the threshold is reached or not reached, depending on the threshold type. |

2. Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites |  Namespace |
| --- | --- | --- | --- |
| `SalesOrderThresholdDataImportPlugin` | Imports sales order threshold data into the database. | None |Spryker\Zed\SalesOrderThresholdDataImport\Communication\Plugin\DataImport  |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\SalesOrderThresholdDataImport\Communication\Plugin\DataImport\SalesOrderThresholdDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new SalesOrderThresholdDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import sales-order-threshold
```


{% info_block warningBox "Verification" %}

Ensure that, in the database, the configured data has been added to the `spy_sales_order_threshold` table.

{% endinfo_block %}



#### Import Sales Order Threshold Taxes
To import sales order threshold taxes:

1. Add the following data to the already imported tax sets to have the *Sales Order Threshold* expenses tax sets.

**data/import/tax.csv**

```yaml
MOV Taxes,Austria,Austria Standard,20
MOV Taxes,Belgium,Belgium Standard,21
MOV Taxes,Bulgaria,Bulgaria Standard,20
MOV Taxes,Czech Republic,Czech Republic Standard,21
MOV Taxes,Denmark,Denmark Standard,25
MOV Taxes,France,France Standard,20
MOV Taxes,Germany,Germany Standard,19
MOV Taxes,Hungary,Hungary Standard,27
MOV Taxes,Italy,Italy Standard,22
MOV Taxes,Luxembourg,Luxembourg Standard,17
MOV Taxes,Netherlands,Netherlands Standard,21
MOV Taxes,Poland,Poland Standard,23
MOV Taxes,Romania,Romania Standard,20
MOV Taxes,Slovakia,Slovakia Standard,20
MOV Taxes,Slovenia,Slovenia Standard,22
```

2. Import data:

```bash
console data:import:tax
```


{% info_block warningBox "Verification" %}

Ensure that, in the database, the configured data has been added to the `spy_tax_set` and `spy_tax_rate` tables.

{% endinfo_block %}


### 5) Set up Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| RemoveSalesOrderThresholdExpenseCalculatorPlugin | Removes sales order threshold expenses if the sales order threshold is exceeded by quote subtotal during price recalculation. | None | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Calculation |
| AddSalesOrderThresholdExpenseCalculatorPlugin |Adds sales order threshold expenses if the sales order threshold was not reached by quote subtotal during price recalculation. |Expects Items to be in `QuoteTransfer` as well as calculated `QuoteTransfer::SubTotal`. Also, expects `QuoteTransfer` to contain a Store and a Currency.  | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Calculation |
| AddThresholdMessagesCartPreReloadItemsPlugin |Adds the threshold message to the Cart page when the order subtotal is below the configured soft threshold. | Expects Items to be in `QuoteTransfer` as well as calculated `QuoteTransfer::SubTotal`. Also, expects `QuoteTransfer` to contain a Store and a Currency. | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Cart |
| SalesOrderThresholdCheckoutPreConditionPlugin |Disallows placing an order if its subtotal is below the defined hard threshold.  |Expects Items to be in `QuoteTransfer` as well as calculated `QuoteTransfer::SubTotal`. Also, expects `QuoteTransfer` to contain a Store and a Currency.  | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout |
| SalesOrderThresholdExpenseSavePlugin | Saves the sales order threshold expense fees that are attached to orders into the database. | None | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout |
| GlobalSalesOrderThresholdDataSourceStrategyPlugin  | Provides the ability to fetch and apply sales order thresholds globally across all customers. | Expects Items to be in `QuoteTransfer` as well as calculated `QuoteTransfer::SubTotal`. Also, expects `QuoteTransfer` to contain a Store and a Currency. | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\SalesOrderThresholdExtension |
| HardMinimumThresholdStrategyPlugin | A strategy that provides a hard threshold type that fails if the value of the order is below the threshold. | None | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy |
| HardMaximumThresholdStrategyPlugin | A strategy that provides a hard threshold type that fails if the value of the order is above the threshold. | None | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy |
|SoftMinimumThresholdWithFixedFeeStrategyPlugin | A strategy that provides a soft threshold type that fails if the value of the order is below the threshold. Also, it adds the defined threshold fee to the order subtotal.  | None | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy |
|SoftMinimumThresholdWithFlexibleFeeStrategyPlugin | A strategy that provides a soft threshold type that fails if the value of the order is below the threshold. It also calculates the fee, which is a percentage of the order subtotal. |None  | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy |
| SoftMinimumThresholdWithMessageStrategyPlugin | A strategy the provides a soft threshold type the fails if the value of the order is below the threshold. | None | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy |
| GlobalHardThresholdFormExpanderPlugin | Expands the global threshold form with the support of a hard minimum threshold. The threshold disallows placing the orders the value of which does not reach the threshold's value. | None | Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander |
| GlobalHardMaximumThresholdFormExpanderPlugin | Expands the global threshold form with the support of a hard maximum threshold. The threshold disallows placing the orders reaching the threshold's value. | None | Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander |
|GlobalSoftThresholdWithMessageFormExpanderPlugin  | Expands global threshold form with the support of a soft threshold with a message. The message is displayed when the threshold is not reached. | None | Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander |
| GlobalSoftThresholdFixedFeeFormExpanderPlugin| Expands global threshold form with the support of a soft threshold with a fixed fee. The fee is applied when the threshold is not reached.  | None | Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander |
| GlobalSoftThresholdFlexibleFeeFormExpanderPlugin | Expands global threshold form with the support of a soft threshold with a flexible fee. The fee is calculated as a percentage of the order subtotal and applied when the threshold is not reached. | None | Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander |

**src/Pyz/Zed/Calculation/CalculationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Calculation;

use Spryker\Zed\Calculation\CalculationDependencyProvider as SprykerCalculationDependencyProvider;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Calculation\AddSalesOrderThresholdExpenseCalculatorPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Calculation\RemoveSalesOrderThresholdExpenseCalculatorPlugin;

class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface[]
     */
    protected function getQuoteCalculatorPluginStack(Container $container)
    {
        /** @var \Spryker\Zed\Calculation\Dependency\Plugin\CalculationPluginInterface[] $pluginStack */
        $pluginStack = [
            new RemoveSalesOrderThresholdExpenseCalculatorPlugin(), #SalesOrderThresholdFeature
            new AddSalesOrderThresholdExpenseCalculatorPlugin(), #SalesOrderThresholdFeature
        ];

        return $pluginStack;
    }
}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Cart\AddThresholdMessagesCartPreReloadItemsPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface[]
     */
    protected function getPreReloadPlugins(Container $container)
    {
        return [
            new AddThresholdMessagesCartPreReloadItemsPlugin(), #SalesOrderThresholdFeature
        ];
    }
}
```

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout\SalesOrderThresholdCheckoutPreConditionPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout\SalesOrderThresholdExpenseSavePlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container ’
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPreConditionInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new SalesOrderThresholdCheckoutPreConditionPlugin(), #SalesOrderThresholdFeature
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]
     */
    protected function getCheckoutOrderSavers(Container $container)
    {
        /** @var \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[] $plugins */
        $plugins = [
            new SalesOrderThresholdExpenseSavePlugin(),
        ];

        return $plugins;
    }
}
```

**src/Pyz/Zed/SalesOrderThreshold/SalesOrderThresholdDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesOrderThreshold;

use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\SalesOrderThresholdExtension\GlobalSalesOrderThresholdDataSourceStrategyPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy\HardMinimumThresholdStrategyPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy\SoftMinimumThresholdWithFixedFeeStrategyPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy\SoftMinimumThresholdWithFlexibleFeeStrategyPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy\SoftMinimumThresholdWithMessageStrategyPlugin;
use Spryker\Zed\SalesOrderThreshold\SalesOrderThresholdDependencyProvider as SprykerSalesOrderThresholdDependencyProvider;

class SalesOrderThresholdDependencyProvider extends SprykerSalesOrderThresholdDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesOrderThresholdExtension\Dependency\Plugin\SalesOrderThresholdDataSourceStrategyPluginInterface[]
     */
    protected function getSalesOrderThresholdDataSourceStrategies(): array
    {
        return [
            new GlobalSalesOrderThresholdDataSourceStrategyPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesOrderThresholdExtension\Dependency\Plugin\SalesOrderThresholdStrategyPluginInterface[]
     */
    protected function getSalesOrderThresholdStrategyPlugins(): array
    {
        return [
            new HardMinimumThresholdStrategyPlugin(),
            new SoftMinimumThresholdWithMessageStrategyPlugin(),
            new SoftMinimumThresholdWithFixedFeeStrategyPlugin(),
            new SoftMinimumThresholdWithFlexibleFeeStrategyPlugin(),
			new HardMaximumThresholdStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SalesOrderThresholdGui/SalesOrderThresholdGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesOrderThresholdGui;

use Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander\GlobalHardThresholdFormExpanderPlugin;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander\GlobalSoftThresholdFixedFeeFormExpanderPlugin;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander\GlobalSoftThresholdFlexibleFeeFormExpanderPlugin;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander\GlobalSoftThresholdWithMessageFormExpanderPlugin;
use Spryker\Zed\SalesOrderThresholdGui\SalesOrderThresholdGuiDependencyProvider as SprykerSalesOrderThresholdGuiDependencyProvider;

class SalesOrderThresholdGuiDependencyProvider extends SprykerSalesOrderThresholdGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesOrderThresholdGuiExtension\Dependency\Plugin\SalesOrderThresholdFormExpanderPluginInterface[]
     */
    protected function getSalesOrderThresholdFormExpanderPlugins(): array
    {
        return [
            new GlobalHardThresholdFormExpanderPlugin(),
            new GlobalSoftThresholdWithMessageFormExpanderPlugin(),
            new GlobalSoftThresholdFixedFeeFormExpanderPlugin(),
            new GlobalSoftThresholdFlexibleFeeFormExpanderPlugin(),
			new GlobalHardMaximumThresholdFormExpanderPlugin(),
        ];
    }
}
```



{% info_block warningBox "Verification" %}

Ensure that:

*     After adding an item to the cart, if the quote subtotal is below the defined global threshold, `QuoteTransfer.expenses[]` has an item with a threshold expense type.
*     After adding an item to the cart, if the quote subtotal is below the defined global threshold, `QuoteTransfer.expenses[]` doesn't have an item with a threshold expense type.
*     After adding an item to the cart, if the order subtotal is below the defined global threshold, the defined threshold message is displayed on the *Cart* page.
*     If the order subtotal is below the defined hard global threshold, you cannot place it.
*     If the order subtotal is above the defined maximum hard global threshold, you cannot place it.
*     If the order subtotal is below the defined soft global threshold, you cannot place it, and the threshold expenses are saved to the `spy_sales_expense` table.
*     If the order subtotal is below the defined soft global threshold with a fixed or flexible fee, the threshold fee is added to the order.
*     *Edit Global threshold* page in Back Office contains settings for:
    *         Hard threshold
    *         Hard maximum threshold
    *         Soft threshold with a message
    *         Soft threshold with a fixed fee
    *         Soft threshold with a flexible fee


{% endinfo_block %}

## Install Feature Front End

Folllow the steps below to install the Minimum Order Value feature front end.

### Prerequisites
Overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | dev-master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
		
```bash
composer require spryker-feature/order-threshold:"^dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

| Module | Expected directory |
| --- | --- |
| SalesOrderThresholdWidget | vendor/spryker-shop/sales-order-threshold-widget |


{% endinfo_block %}

### 2) Add Translations

Add translations as follows:

1. Append glossary according to your configuration:
		
**src/data/import/glossary.csv**

```yaml
sales-order-threshold.expense.name,Zuschlag,de_DE
sales-order-threshold.expense.name,Surcharge,en_US
sales-order-threshold.strategy.soft-minimum-threshold-fixed-fee,Zuschlag,de_DE
sales-order-threshold.strategy.soft-minimum-threshold-fixed-fee,Surcharge,en_US
sales-order-threshold.strategy.soft-minimum-threshold-flexible-fee,Zuschlag,de_DE
sales-order-threshold.strategy.soft-minimum-threshold-flexible-fee,Surcharge,en_US
sales-order-threshold.hard-minimum-threshold.de.eur.message,"You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout",en_US
sales-order-threshold.hard-minimum-threshold.de.eur.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können nicht mit der Bestellung fortfahren",de_DE
sales-order-threshold.hard-minimum-threshold.de.chf.message,"You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout",en_US
sales-order-threshold.hard-minimum-threshold.de.chf.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können nicht mit der Bestellung fortfahren",de_DE
sales-order-threshold.hard-maximum-threshold.de.eur.message,The cart value cannot be higher than {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %}. Please remove some items to proceed with the order,en_US
sales-order-threshold.hard-maximum-threshold.de.eur.message,"Der Warenkorbwert darf nicht höher als {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} sein. Bitte entfernen Sie einige Artikel, um mit der Bestellung fortzufahren",de_DE
sales-order-threshold.hard-maximum-threshold.de.chf.message,The cart value cannot be higher than {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %}. Please remove some items to proceed with the order,en_US
sales-order-threshold.hard-maximum-threshold.de.chf.message,"Der Warenkorbwert darf nicht höher als {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} sein. Bitte entfernen Sie einige Artikel, um mit der Bestellung fortzufahren",de_DE
sales-order-threshold.soft-minimum-threshold.de.eur.message,"You need to add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold, but if you want can proceed to checkout.",en_US
sales-order-threshold.soft-minimum-threshold.de.eur.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können trotzdem weiter zur Kasse.",de_DE
sales-order-threshold.soft-minimum-threshold.de.chf.message,"You need to add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold, but if you want can proceed to checkout.",en_US
sales-order-threshold.soft-minimum-threshold.de.chf.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können trotzdem weiter zur Kasse.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Ensure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up Widgets
Set up widgets as follows:
		
1. Enable global widgets:

| Widget | Description | Namespace |
| --- | --- | --- |
|`SalesOrderThresholdWidget`  | Shows the expenses added to the quote transfer which are related to a sales order threshold. |`SprykerShop\Yves\SalesOrderThresholdWidget\Widget`  |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\SalesOrderThresholdWidget\Widget\SalesOrderThresholdWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SalesOrderThresholdWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Ensure that the `SalesOrderThresholdWidget` widget has been registered:

1.     Define a minimum soft global threshold.
2.     Create a cart with a subtotal that is below the threshold.
3.     The threshold fee should be added to the cart automatically.


{% endinfo_block %}
