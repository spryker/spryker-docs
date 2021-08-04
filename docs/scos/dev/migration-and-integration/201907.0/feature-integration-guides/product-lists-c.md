---
title: Product Lists- Catalog Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/product-lists-catalog-feature-integration
redirect_from:
  - /v3/docs/product-lists-catalog-feature-integration
  - /v3/docs/en/product-lists-catalog-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version  |
| --- | --- |
| Product Lists | 201903.0 |
| Catalog | 201903.0 |
| Customer | 201903.0 |
### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```
composer require spryker/customer-catalog:"^1.0.0" --update-with-dependencies
```
<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
    
Make sure that the following modules were installed:
    
| Module | Expected Directory |
| --- | --- |
| `CustomerCatalog` | `vendor/spryker/customer-catalog` |

</div></section>

### 2) Configure Export to Redis and Elasticsearch
#### Prepare the Search Queries
Once the Product List data is exported to Elasticsearch, make sure to extend your search queries to filter out Restricted Products by adding the following query expander plugin to all your search queries where necessary.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductListQueryExpanderPlugin` | <ul><li>Expands an Elasticsearch query for Abstract and Concrete Products with Blacklist and Whitelist filters based on the Customer session.</li><li>The result of the query will contain only Products that were on the given Whitelists, but not on the given Blacklists | The Customer session must contain Product List information. Suggestion: See Merchant Product Restrictions Feature Integration for an example implementation. </li><ul>| `Spryker\Client\CustomerCatalog\Plugin\Search` |

{% info_block infoBox "Info" %}
The order of the query expander plugins matters for the search result. Make sure that your query expanders are in the appropriate order. I.e., the `FacetQueryExpanderPlugin` needs to be placed after all the other plugins that filter down the result, otherwise, it can't generate the proper query fragment for itself.
{% endinfo_block %}

<details open>
<summary>src/Pyz/Client/Catalog/CatalogDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Client\Catalog;
 
use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\CustomerCatalog\Plugin\Search\ProductListQueryExpanderPlugin;
 
class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
	/**
	 * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]
	 */
	protected function createCatalogSearchQueryExpanderPlugins()
	{
		return [
			new ProductListQueryExpanderPlugin(),
		];
	}
 
	/**
	 * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]
	 */
	protected function createSuggestionQueryExpanderPlugins()
	{
		return [
			new ProductListQueryExpanderPlugin(),
		];
	}
 
	/**
	 * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]
	 */
	protected function getProductConcreteCatalogSearchQueryExpanderPlugins(): array
	{
		return [
			new ProductListQueryExpanderPlugin(),
		];
	}
}
```
<br>
</details>
    
{% info_block warningBox "Verification" %}
Make sure you haven't missed the expansion of any product search queries in your project where you need to consider Product Lists.
{% endinfo_block %}
    
{% info_block warningBox "Verification" %}
Once you are done with this step, you should only be able to see those Products in your search results, which are on the Product Lists of your Customer's session.
{% endinfo_block %}
