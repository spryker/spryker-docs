

## Install feature API
### Prerequisites
Install the required features:

| Name | Version | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | 201903.0 |Feature API |
| Product | 201903.0 |Feature API |
| Tax | 201903.0 | |

### 1) Install the required modules
Install the required modules using Composer:

```bash
composer require spryker/product-tax-sets-rest-api:"^1.0.6" spryker/products-product-tax-sets-resource-relationship:"^1.0.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
Make sure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
| `ProductTaxSetsRestApi` | `vendor/spryker/product-tax-sets-rest-api` |
|`ProductsProductTaxSetsResourceRelationship`  | `vendor/spryker/products-product-tax-sets-resource-relationship` |
</div></section>

### 2) Set up database schema and transfer objects
Run the following command to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">
Make sure that the following changes have been applied by checking your database.

| Database entity | Type | Event |
| --- | --- | --- |
| `spy_tax_set.uuid` | column |added  |
</div></section>

<section contenteditable="false" class="warningBox"><div class="content">
Make sure the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
|`RestProductTaxRateTransfer`  | class | created | `src/Generated/Shared/Transfer/RestProductTaxRateTransfer` |
| `RestProductTaxSetsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductTaxSetsAttributesTransfer` |
|`TaxSetTransfer.uuid`  |property| added | `src/Generated/Shared/Transfer/TaxSetTransfer` |
</div></section>

### 3) Set up Behavior
#### Generate UUIDs for existing records
Run the following command:

```bash
console tax-sets:uuid:update
```

{% info_block warningBox “Verification” %}

Make sure that the uuid field is filled out for all records in the `spy_tax_set` table. You can run the following SQL-query for it and make sure that the result is 0 records.<br>`SELECT COUNT(*
{% endinfo_block %} FROM spy_tax_set WHERE uuid IS NULL;`)

#### Enable resource and relationship
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductTaxSetsResourceRoutePlugin` | Registers product tax resource. | None | `Spryker\Glue\ProductTaxSetsRestApi\Plugin` |
| `ProductsProductTaxSetsResourceRelationshipPlugin` | Adds product tax sets resource as a relationship to abstract product resource. | None | `Spryker\Glue\ProductsProductTaxSetsResourceRelationship\Plugin` |

<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductTaxSetsRestApi\Plugin\ProductTaxSetsResourceRoutePlugin;
use Spryker\Glue\ProductsProductTaxSetsResourceRelationship\Plugin\ProductsProductTaxSetsResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new ProductTaxSetsResourceRoutePlugin(),
		];
	}

	/**
	* @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
	*
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
	*/
	protected function getResourceRelationshipPlugins(
		ResourceRelationshipCollectionInterface $resourceRelationshipCollection
	): ResourceRelationshipCollectionInterface {
		$resourceRelationshipCollection->addRelationship(
			ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
			new ProductsProductTaxSetsResourceRelationshipPlugin()
		);

		return $resourceRelationshipCollection;
	}
}
```

<br>
</details>

{% info_block warningBox "Verification" %}
Make sure that the following endpoint is available:<ul><li>`http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/product-tax-sets`</li></ul><br>
Send a request to `http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=product-tax-sets`. Make sure that the response includes relationships to the `product-tax-sets` resources.
{% endinfo_block %}

<!-- Last review date: Mar 21, 2019 -->

[//]: # (by Tihran Voitov, Yuliia Boiko)
