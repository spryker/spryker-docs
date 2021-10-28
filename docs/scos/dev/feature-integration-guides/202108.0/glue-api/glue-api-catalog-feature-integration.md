---
title: Glue API - Catalog feature integration
description: Use the guide to install the Glue Catalog feature in your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/catalog-api-feature-integration
originalArticleId: 8e4c8246-966e-4f6f-b8e8-6e76cc2af23f
redirect_from:
  - /2021080/docs/catalog-api-feature-integration
  - /2021080/docs/en/catalog-api-feature-integration
  - /docs/catalog-api-feature-integration
  - /docs/en/catalog-api-feature-integration
---

## Install Feature API

### Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Search | {{page.version}} |  |
| Catalog | {{page.version}} |  |
| Product | {{page.version}} | [Product API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html) |
| Catalog + Price | {{page.version}} |  |

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require spryker/catalog-search-rest-api:"^2.1.2" spryker/catalog-search-products-resource-relationship:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules are installed:


| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CatalogSearchRestApi | vendor/spryker/catalog-search-rest-api |
| CatalogSearchProductsResourceRelationship | vendor/spryker/catalog-search-products-resource-relationship |

{% endinfo_block %}

### 2) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox “Verification” %}
Make sure that the following changes have occurred in transfer objects:


| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestCatalogSearchAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestCatalogSearchAttributesTransfer |
| RestCatalogSearchSortTransfer | class | created | src/Generated/Shared/Transfer/RestCatalogSearchSortTransfer |
| RestCatalogSearchPaginationTransfer | class | created | src/Generated/Shared/Transfer/RestCatalogSearchPaginationTransfer |
| RestCatalogSearchAbstractProductsTransfer | class | created | src/Generated/Shared/Transfer/RestCatalogSearchAbstractProductsTransfer |
| RestCatalogSearchProductImageTransfer | class | created | src/Generated/Shared/Transfer/RestCatalogSearchProductImageTransfer |
| RestRangeSearchResultTransfer| class| created | src/Generated/Shared/Transfer/RestRangeSearchResultTransfer|
| RestFacetSearchResultTransfer| class| created | src/Generated/Shared/Transfer/RestFacetSearchResultTransfer|
| RestCatalogSearchSuggestionsAttributesTransfer| class	| created | src/Generated/Shared/Transfer/RestCatalogSearchSuggestionsAttributesTransfer |
| RestCatalogSearchSuggestionAbstractProductsTransfer| class|	created | src/Generated/Shared/Transfer/RestCatalogSearchSuggestionAbstractProductsTransfer|
| RestCatalogSearchSuggestionProductImageTransfer| class| created | src/Generated/Shared/Transfer/RestCatalogSearchSuggestionProductImageTransfer|
| RestPriceProductTransfer | class | created | src/Generated/Shared/Transfer/RestPriceProductTransfer|
| PriceModeConfigurationTransfer| class | created | src/Generated/Shared/Transfer/PriceModeConfigurationTransfer|
| RestCurrencyTransfer| class| created | src/Generated/Shared/Transfer/RestCurrencyTransfer|
| RestFacetConfigTransfer| class | created | src/Generated/Shared/Transfer/RestFacetConfigTransfer|

{% endinfo_block %}

### 3) Set up behavior

#### Enable resources and relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CatalogSearchAbstractProductsResourceRelationshipPlugin | Adds the `abstract-products` resource relationship to search results. | None | Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin |
| CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin | Adds the `abstract-products` resource relationship to search suggestions results. | None | Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin |
| CatalogSearchResourceRoutePlugin | Registers the `search` resource. | None | Spryker\Glue\CatalogSearchRestApi\Plugin |
| CatalogSearchSuggestionsResourceRoutePlugin | Registers the `search-suggestions` resource. | None | Spryker\Glue\CatalogSearchRestApi\Plugin |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin\CatalogSearchAbstractProductsResourceRelationshipPlugin;
use Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin\CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin;
use Spryker\Glue\CatalogSearchRestApi\CatalogSearchRestApiConfig;
use Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchResourceRoutePlugin;
use Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchSuggestionsResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new CatalogSearchResourceRoutePlugin(),
			new CatalogSearchSuggestionsResourceRoutePlugin(),
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
			CatalogSearchRestApiConfig::RESOURCE_CATALOG_SEARCH,
			new CatalogSearchAbstractProductsResourceRelationshipPlugin()
		);
		$resourceRelationshipCollection->addRelationship(
			CatalogSearchRestApiConfig::RESOURCE_CATALOG_SEARCH_SUGGESTIONS,
			new CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin()
		);

		return $resourceRelationshipCollection;
	}
}
```

{% info_block warningBox “Verification” %}

If `CatalogSearchResourceRoutePlugin` and `CatalogSearchSuggestionsResourceRoutePlugin` are installed correctly, the following endpoints should now be available:
`http://glue.mysprykershop.com/catalog-search?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}`
`http://glue.mysprykershop.com/catalog-search-suggestions?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}`

{% endinfo_block %}

{% info_block warningBox “Verification” %}

To make sure that `CatalogSearchAbstractProductsResourceRelationshipPlugin` and `CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin` are functioning correctly, do the following:
Send a request to `http://glue.mysprykershop.com/catalog-search?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}&include=abstract-products` and verify that the response includes relationships to `abstract-products` resources.
Send a request to `http://glue.mysprykershop.com/catalog-search-suggestions?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}&include=abstract-products` and verify that the response includes relationships to `abstract-products` resources.

{% endinfo_block %}
