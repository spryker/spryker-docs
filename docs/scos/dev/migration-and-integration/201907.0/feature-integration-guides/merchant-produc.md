---
title: Merchant Product Restrictions Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/merchant-product-restrictions-feature-integration
redirect_from:
  - /v3/docs/merchant-product-restrictions-feature-integration
  - /v3/docs/en/merchant-product-restrictions-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core |201903.0  |
| Product Lists | 201903.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/merchant-product-restrictions:"^201903.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr class="TableStyle-PatternedRows2-Head-Header1"><th class="TableStyle-PatternedRows2-HeadE-Regular-Header1">Module</th><th class="TableStyle-PatternedRows2-HeadD-Regular-Header1">Expected Directory</th></tr></thead><tbody><tr class="TableStyle-PatternedRows2-Body-LightRows"><td class="TableStyle-PatternedRows2-BodyE-Regular-LightRows">`MerchantRelationshipProductList`</td><td class="TableStyle-PatternedRows2-BodyD-Regular-LightRows">`vendor/spryker/merchant-relationship-product-list`</td></tr><tr class="TableStyle-PatternedRows2-Body-DarkerRows"><td class="TableStyle-PatternedRows2-BodyE-Regular-DarkerRows">`MerchantRelationshipProductListDataImport`</td><td class="TableStyle-PatternedRows2-BodyD-Regular-DarkerRows">`vendor/spryker/merchant-relationship-product-list-data-import`</td></tr><tr class="TableStyle-PatternedRows2-Body-LightRows"><td class="TableStyle-PatternedRows2-BodyB-Regular-LightRows">`MerchantRelationshipProductListGui`</td><td class="TableStyle-PatternedRows2-BodyA-Regular-LightRows">`vendor/spryker/merchant-relationship-product-list-gui`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema
Run the following commands to apply database changes, as well as generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database.<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_product_list.fk_merchant_relationship`</td><td>column</td><td>created</td></tr></tbody></table>
{% endinfo_block %}


### 3) Import Data
#### Import Merchant Relationship to Product Lists
Prepare your data according to your requirements using our demo data:

```yaml
merchant_relation_key,product_list_key
mr-008,pl-001
mr-008,pl-002
mr-008,pl-003
mr-009,pl-004
mr-010,pl-005
mr-011,pl-006
mr-011,pl-007
mr-011,pl-008
```

| Column | Is Obligatory? | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
|`merchant_relation_key`  | mandatory | string | mr-008 | Identifier of merchant relations. The merchant relations must exist already. |
| `product_list_key` |mandatory  | string | pl-001 | Identifier of product lists. The product lists must exist already. |
		
Register the following plugin to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `MerchantRelationshipProductListDataImportPlugin` | Imports basic product list data into the database. | <ul><li>Merchant relations must be imported first.</li><li>Product lists must be imported first.</li></ul> | `Spryker\Zed\MerchantRelationshipProductListDataImport\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>
    
```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantRelationshipProductListDataImport\Communication\Plugin\MerchantRelationshipProductListDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	/**
	 * @return array
	 */
	protected function getDataImporterPlugins(): array
	{
		return [
			new MerchantRelationshipProductListDataImportPlugin(),
		];
	}
}    
```
<br>
</details>

Run the following console command to import data:

```bash
console data:import merchant-relationship-product-list
```

{% info_block warningBox "Verification" %}
Make sure that the configured data are added to the `spy_product_list` table in the database.
{% endinfo_block %}

### 4) Set up Behavior
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|`ProductListCustomerTransferExpanderPlugin`  | <ul><li>Expands the customer transfer object with their assigned product lists.</li><li>The product list information is based on the customer's merchant relationship.</li></ul> | None |  `Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\Customer` |
| `MerchantRelationshipProductListOwnerTypeFormExpanderPlugin` | <ul><li>Provides the merchant relationship product list owner type.</li><li>Provides selectable merchant relationship options to assign to product lists.</li></ul> | None | `Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\ProductListGuiExtension` |
| `MerchantRelationshipTableExpanderPlugin` | Provides table header, config and data extensions for product lists with merchant relationship owner type. | None | `Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\ProductListGuiExtension` |

<details open>
<summary>src/Pyz/Zed/Customer/CustomerDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Zed\MerchantRelationshipProductList\Communication\Plugin\Customer\ProductListCustomerTransferExpanderPlugin;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
	/**
	 * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
	 */
	protected function getCustomerTransferExpanderPlugins()
	{
		return [
			new ProductListCustomerTransferExpanderPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary>src/Pyz/Zed/ProductListGui/ProductListGuiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductListGui;

use Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\ProductListGuiExtension\MerchantRelationshipProductListOwnerTypeFormExpanderPlugin;
use Spryker\Zed\MerchantRelationshipProductListGui\Communication\Plugin\ProductListGuiExtension\MerchantRelationshipTableExpanderPlugin;
use Spryker\Zed\ProductListGui\ProductListGuiDependencyProvider as SprykerProductListGuiDependencyProvider;

class ProductListGuiDependencyProvider extends SprykerProductListGuiDependencyProvider
{
	/**
	 * @return \Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListOwnerTypeFormExpanderPluginInterface[]
	 */
	protected function getProductListOwnerTypeFormExpanderPlugins(): array
	{
		return [
			new MerchantRelationshipProductListOwnerTypeFormExpanderPlugin(),
		];
	}

	/**
	 * @return \Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListTableConfigExpanderPluginInterface[]
	 */
	protected function getProductListTableConfigExpanderPlugins(): array
	{
		return [
			new MerchantRelationshipTableExpanderPlugin(),
		];
	}

	/**
	  * @return \Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListTableDataExpanderPluginInterface[]
	 */
	protected function getProductListTableDataExpanderPlugins(): array
		{
		return [
			new MerchantRelationshipTableExpanderPlugin(),
		];
		}

		/**
		 * @return \Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListTableDataExpanderPluginInterface[]
		 */
		protected function getProductListTableHeaderExpanderPlugins(): array
		{
			return [
				new MerchantRelationshipTableExpanderPlugin(),
		];
	}
}
```
<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that when creating or editing a product list in Zed, you can select the merchant relationship as an owner type and see the selected value in the list of product lists.</br></br>Also, make sure that when a customer (with an assigned merchant relationship that has assigned product lists
{% endinfo_block %} logs in, they see products only according to their product list restrictions.)
