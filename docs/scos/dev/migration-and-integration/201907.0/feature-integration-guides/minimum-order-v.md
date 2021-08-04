---
title: Minimum Order Value Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/minimum-order-value-feature-integration-201903
redirect_from:
  - /v3/docs/minimum-order-value-feature-integration-201903
  - /v3/docs/en/minimum-order-value-feature-integration-201903
---

## Install Feature Core
### Prerequisites
To start feature integration, review and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | 201903.0 |
| Checkout |  201903.0|
| Order Management |201903.0  |
| Prices |201903.0  |
| Spryker Core | 201903.0 |
| Tax | 201903.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/order-threshold:"^201903.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`SalesOrderThreshold`</td><td>`vendor/spryker/sales-order-threshold`</td></tr><tr><td>`SalesOrderThresholdExtension`</td><td>`vendor/spryker/sales-order-threshold-extension`</td></tr><tr><td>`SalesOrderThresholdDataImport`</td><td>`vendor/spryker/sales-threshold-data-import`</td></tr><tr><td>`SalesOrderThresholdGui`</td><td>`vendor/spryker/sales-order-threshold-gui`</td></tr><tr><td>`SalesOrderThresholdGuiExtension`</td><td>`vendor/spryker/sales-order-threshold-gui-extension`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><th>Database Entity</th><th>Type</th></tr></thead><tbody><tr><td>`spy_sales_order_threshold`</td><td>table</td></tr><tr><td>`spy_sales_order_threshold_tax_set`</td><td>table</td></tr><tr><td>`spy_sales_order_threshold_type`</td><td>table</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects have been applied:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`SalesOrderThresholdType`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SalesOrderThresholdTypeTransfer`</td></tr><tr><td>`SalesOrderThresholdValue`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SalesOrderThresholdValueTransfer`</td></tr><tr><td>`SalesOrderThreshold`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SalesOrderThresholdTransfer`</td></tr><tr><td>`SalesOrderThresholdLocalizedMessage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/SalesOrderThresholdLocalizedMessageTransfer`</td></tr><tr><td>`SpySalesOrderThresholdEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/SpySalesOrderThresholdEntityTransfer`</td></tr><tr><td>`SpySalesOrderThresholdTypeEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/SpySalesOrderThresholdTypeEntityTransfer`</td></tr><tr><td>`SpySalesOrderThresholdTaxSetEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/SpySalesOrderThresholdTaxSetEntityTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Add Translations
{% info_block infoBox "Info" %}
All threshold messages need to have glossary entities for the configured locales.
{% endinfo_block %}
The following are glossary keys for the infrastructural changes:
<details open>
<summary>src/data/import/glossary.csv</summary>
    
```yaml
sales-order-threshold.strategy.soft-minimum-threshold-fixed-fee,Zuschlag,de_DE
sales-order-threshold.strategy.soft-minimum-threshold-fixed-fee,Surcharge,en_US
sales-order-threshold.strategy.soft-minimum-threshold-flexible-fee,Zuschlag,de_DE
sales-order-threshold.strategy.soft-minimum-threshold-flexible-fee,Surcharge,en_US   
``` 
<br>
</details>
    
Demo data glossary keys are as follows:

<details open>
<summary>src/data/import/glossary.csv</summary>
    
```yaml
sales-order-threshold.hard-minimum-threshold.de.eur.message,"You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout",en_US
sales-order-threshold.hard-minimum-threshold.de.eur.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können nicht mit der Bestellung fortfahren",de_DE
sales-order-threshold.hard-minimum-threshold.de.chf.message,"You should add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold. You can't proceed with checkout",en_US
sales-order-threshold.hard-minimum-threshold.de.chf.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können nicht mit der Bestellung fortfahren",de_DE
sales-order-threshold.soft-minimum-threshold.de.eur.message,"You need to add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold, but if you want can proceed to checkout.",en_US
sales-order-threshold.soft-minimum-threshold.de.eur.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können trotzdem weiter zur Kasse.",de_DE
sales-order-threshold.soft-minimum-threshold.de.chf.message,"You need to add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold, but if you want can proceed to checkout.",en_US
sales-order-threshold.soft-minimum-threshold.de.chf.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können trotzdem weiter zur Kasse.",de_DE
```    
<br>
</details>

Run the following console command to import glossary data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that the configured data has been added to the `spy_glossary` table in the database.
{% endinfo_block %}

### 4) Import Data
#### Add Infrastructural Data

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SalesOrderThresholdTypeInstallerPlugin` |Installs sales order threshold types. | None | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Installer` |

<details open><summary>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>
    
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
<br>
</details>

Run the following console command to execute registered installer plugins and install infrastructural data:
		
```bash
console setup:init-d
```

{% info_block warningBox "Verification" %}
Make sure that  sales order threshold types has been added to the `spy_sales_order_threshold_type` table in the database.
{% endinfo_block %}

#### Importing Sales Order Thresholds
{% info_block infoBox "Info" %}
The following imported entities will be used as sales order thresholds in Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/sales-order-threshold-data-import/data/import/sales_order_threshold.csv</summary>

```yaml
store,currency,threshold_type_key,threshold,fee,message_glossary_key
DE,EUR,hard-minimum-threshold,40000,,
DE,EUR,soft-minimum-threshold,100000,,
DE,CHF,hard-minimum-threshold,120000,,
DE,CHF,soft-minimum-threshold,200000,,
```
<br>
</details>


| Column | Is Mandatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
|  `store`| mandatory |string  | DE |Store for which the sales order threshold will be applied.  |
|`currency`  | mandatory | string | EUR | Currency for which the sales order threshold will be applied. |
|`threshold_type_key`  | mandatory | string | soft-minimum-threshold | Threshold type that would be imported; it has to be one of the keys of configured/installed plugins from the above step. |
|  `threshold`| mandatory | int, in cents |1000  | Amount (in cents) that will need to be met by an order to pass the threshold check. |
| `fee` |optional  | integer, in cents |50  | Amount in cents (or the percentage of order subtotal that will be calculated) of the fee that will be added automatically if the order threshold is not met. |
| `message_glossary_key` | optional | string |sales-order-threshold.hard-minimum-threshold.de.eur.message  | Glossary key that will be used to show a notification message to customers if they did not meet the order threshold. |

Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites |  Namespace |
| --- | --- | --- | --- |
| `SalesOrderThresholdDataImportPlugin` | Imports sales order threshold data into the database. | None |Spryker\Zed\SalesOrderThresholdDataImport\Communication\Plugin\DataImport  |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

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
<br>
</details>

Run the following console command to import data:

```bash
console data:import sales-order-threshold
```

{% info_block warningBox "Verification" %}
Make sure that the configured data is added to the `spy_sales_order_threshold` table in the database.
{% endinfo_block %}

#### Importing Sales Order Threshold Taxes
To have Sales Order Threshold expenses tax sets, add the following data to  imported tax sets:

<details open>
<summary>data/import/tax.csv</summary>

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
<br>
</details>

Run the following console command to import data:

```bash
console data:import:tax
```

{% info_block warningBox "Verification" %}
Make sure that the configured data is added to the `spy_tax_set` and `spy_tax_rate` tables in the database.
{% endinfo_block %}

### 5) Set up Behavior
Enable the behavior by registering the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `RemoveSalesOrderThresholdExpenseCalculatorPlugin` | If the sales order threshold was exceeded by quote subtotal during prices recalculation, this plugin removes the sales order threshold expenses. | None | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Calculation` |
| `AddSalesOrderThresholdExpenseCalculatorPlugin` | If the sales order threshold was not met by quote subtotal during prices recalculation, this plugin adds sales order threshold expenses. |Expects Items to be in `QuoteTransfer` as well as calculated `QuoteTransfer::SubTotal`. Also, expects `QuoteTransfer` to contain a Store and a Currency.  | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Calculation` |
| `AddThresholdMessagesCartPreReloadItemsPlugin` | To notify the customer, this plugin adds messages attached to thresholds that were not met by an order. | Expects Items to be in `QuoteTransfer` as well as calculated `QuoteTransfer::SubTotal`. Also, expects `QuoteTransfer` to contain a Store and a Currency. | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Cart` |
| `SalesOrderThresholdCheckoutPreConditionPlugin` |If the hard threshold is set and is not met by order subtotal, this plugin blocks the process of placing an order.  |Expects Items to be in `QuoteTransfer` as well as calculated `QuoteTransfer::SubTotal`. Also, expects `QuoteTransfer` to contain a Store and a Currency.  | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout` |
| `SalesOrderThresholdExpenseSavePlugin` | Saves sales order threshold expense fees attached to the order into the database. | None | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout` |
|`GlobalSalesOrderThresholdDataSourceStrategyPlugin`  |Provides the ability to fetch and apply thresholds globally across all customers.  | Expects Items to be in `QuoteTransfer` as well as calculated `QuoteTransfer::SubTotal`. Also, expects `QuoteTransfer` to contain a Store and a Currency. | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\SalesOrderThresholdExtension` |
| `HardMinimumThresholdStrategyPlugin` | A strategy that provides a hard threshold type which fails if the order value is less than the threshold. | None | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy` |
|`SoftMinimumThresholdWithFixedFeeStrategyPlugin` |A strategy that provides a soft threshold type which fails if the order value is less than the threshold. It also sets a fee that will be saved in the database as a fee.  | None |`Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy` |
|`SoftMinimumThresholdWithFlexibleFeeStrategyPlugin` | A strategy that provides a soft threshold type which fails if the order value is less than the threshold. It also calculates a fee to be a percentage of the order subtotal. |None  | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy` |
| `SoftMinimumThresholdWithMessageStrategyPlugin` | A strategy that provides a soft threshold type which fails if the order value is less than the threshold. | None | `Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Strategy` |
| `GlobalHardThresholdFormExpanderPlugin` | Expands global threshold form with hard threshold support which disables placing an order if the threshold is not met. | None | `Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander` |
|`GlobalSoftThresholdWithMessageFormExpanderPlugin`  | Expands global threshold form with soft threshold support with the message that is shown when the threshold is not met. | None | `Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander` |
| `GlobalSoftThresholdFixedFeeFormExpanderPlugin`|Expands global threshold form with soft threshold support that has a fixed fee and is applied when the threshold is not met.  | None | `Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander` |
| `GlobalSoftThresholdFlexibleFeeFormExpanderPlugin` | Expands global threshold form with soft threshold support that has a flexible fee, calculated as a percentage of the order subtotal, and is applied when the threshold is not met. | None | `Spryker\Zed\SalesOrderThresholdGui\Communication\Plugin\FormExpander` |

<details open>
<summary>src/Pyz/Zed/Calculation/CalculationDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary>src/Pyz/Zed/SalesOrderThreshold/SalesOrderThresholdDependencyProvider.php</summary>

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
		];
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/SalesOrderThresholdGui/SalesOrderThresholdGuiDependencyProvider.php</summary>

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
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that:<ul><li>After the _&lt;add to cart&gt;_ action, when the global threshold is set and NOT met by quote subtotal, QuoteTransfer.expenses[] has an item with threshold expense type.</li><li>After the_ &lt;add to cart&gt;_ action, when the global threshold is set and met by quote subtotal, QuoteTransfer.expenses[] does not have an item with threshold expense type.</li><li>After the _&lt;add to cart&gt;_ action, when the global threshold is set and the amount of threshold is not met, a message related to the threshold is shown on the **Cart** page.</li><li>When the hard threshold is set globally, you cannot place an order if its subtotal does NOT meet the threshold.</li><li>When the soft threshold is set globally and order subtotal does not meet the threshold, the order can be placed and the threshold expenses will be saved to the `spy_sales_expense` database table.</li><li>When the soft threshold with fixed or flexible fee is set globally and order subtotal does not meet the threshold, the threshold fee will be added to an order.</li><li>**Edit global threshold** page in back office has support for hard threshold, soft threshold with a message, soft threshold with a fixed fee, and soft threshold with a flexible fee.</li></ul>
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
Please review and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | 201903.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
		
```bash
composer require spryker-feature/order-threshold:"^201903.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following module has been installed:<table><thead><tr class="TableStyle-PatternedRows2-Head-Header1"><th class="TableStyle-PatternedRows2-HeadE-Regular-Header1">Module</th><th class="TableStyle-PatternedRows2-HeadD-Regular-Header1">Expected Directory</th></tr></thead><tbody><tr class="TableStyle-PatternedRows2-Body-LightRows"><td class="TableStyle-PatternedRows2-BodyB-Regular-LightRows">`SalesOrderThresholdWidget`</td><td class="TableStyle-PatternedRows2-BodyA-Regular-LightRows">`vendor/spryker-shop/sales-order-threshold-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations
Append glossary according to your configuration:
		
<details open>
<summary>src/data/import/glossary.csv</summary>

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
sales-order-threshold.soft-minimum-threshold.de.eur.message,"You need to add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold, but if you want can proceed to checkout.",en_US
sales-order-threshold.soft-minimum-threshold.de.eur.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können trotzdem weiter zur Kasse.",de_DE
sales-order-threshold.soft-minimum-threshold.de.chf.message,"You need to add items for {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} to pass a recommended threshold, but if you want can proceed to checkout.",en_US
sales-order-threshold.soft-minimum-threshold.de.chf.message,"Sie sollten Waren im Wert von {% raw %}{{{% endraw %}threshold{% raw %}}}{% endraw %} dem Warenkorb hinzufügen um die empfohlene Schwelle zu erreichen. Sie können trotzdem weiter zur Kasse.",de_DE
```
<br>
</details>

Run the following console command to import the glossary data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that the configured data has been added to the `spy_glossary` table in the database.
{% endinfo_block %}

### 3) Set up Widgets
Enable the global widgets:
		

| Widget | Description | Namespace |
| --- | --- | --- |
|`SalesOrderThresholdWidget`  |Shows the expenses added to the quote transfer related to the sales order threshold.  |`SprykerShop\Yves\SalesOrderThresholdWidget\Widget`  |

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

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
<br>
</details>

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}
Make sure that the following widget has been registered:<table><thead><tr><th>Module</th><th>Test</th></tr></thead><tbody><tr><td>`SalesOrderThresholdWidget`</td><td>Create a cart with a subtotal that does not meet the defined sales order threshold and you will see the expense automatically added to the cart.</td></tr></tbody></table>
{% endinfo_block %}
