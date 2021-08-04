---
title: Catalog Search API Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/catalog-search-api-feature-integration
redirect_from:
  - /v1/docs/catalog-search-api-feature-integration
  - /v1/docs/en/catalog-search-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name |Version  |
| --- | --- |
| Spryker Core |2018.12.0  |
| Search | 2018.12.0 |

## 1) Install the required modules

Run the following command to install the required modules:
`composer require spryker/catalog-search-rest-api:"^2.1.0" spryker/catalog-search-products-resource-relationship:"^1.1.0" --update-with-dependencies`

{% info_block infoBox "Verification" %}
Make sure that the following modules are installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `CatalogSearchRestApi` | `vendor/spryker/catalog-search-rest-api` |
| `CatalogSearchProductsResourceRelationship` | `vendor/spryker/catalog-search-products-resource-relationship` |

## 2) Set up Transfer objects

Run the following commands to generate transfer changes:
`console transfer:generate`

{% info_block infoBox "Verification" %}
Make sure that the following changes in transfer objects have occurred:
{% endinfo_block %}

| Transfer |Type  | Event | Path |
| --- | --- | --- | --- |
| `RestCatalogSearchAttributesTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCatalogSearchAttributesTransfer	` |
| `RestCatalogSearchSortTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCatalogSearchSortTransfer	` |
| `RestCatalogSearchPaginationTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCatalogSearchPaginationTransfer	` |
| `RestCatalogSearchAbstractProductsTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCatalogSearchAbstractProductsTransfer` |
| `RestCatalogSearchProductImageTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCatalogSearchProductImageTransfer` |
| `RestRangeSearchResultTransfer` | class  | created | `src/Generated/Shared/Transfer/RestRangeSearchResultTransfer` |
| `RestFacetSearchResultTransfer` | class  | created | `src/Generated/Shared/Transfer/RestFacetSearchResultTransfer` |
| `RestCatalogSearchSuggestionsAttributesTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCatalogSearchSuggestionsAttributesTransfer` |
| `RestCatalogSearchSuggestionAbstractProductsTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCatalogSearchSuggestionAbstractProductsTransfer` |
| `RestCatalogSearchSuggestionProductImageTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCatalogSearchSuggestionProductImageTransfer` |
| `RestPriceProductTransfer` | class  | created | `src/Generated/Shared/Transfer/RestPriceProductTransfer` |
| `PriceModeConfigurationTransfer` | class  | created | `src/Generated/Shared/Transfer/PriceModeConfigurationTransfer` |
| `RestCurrencyTransfer` | class  | created | `src/Generated/Shared/Transfer/RestCurrencyTransfer` |
| `RestFacetConfigTransfer` | class  | created | `src/Generated/Shared/Transfer/RestFacetConfigTransfer	` |

## 3) Set up behavior
### Enable resources and relationships
**Implementation**
Activate the following plugins:

|  Plugin|Specification  | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CatalogSearchAbstractProductsResourceRelationshipPlugin` | Adds the abstract product resource relationship to search results. | None | `Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin` |
| `CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin` | Adds the abstract product resource relationship to search suggestions results. | None | `Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin` |
| `CatalogSearchResourceRoutePlugin` | Registers the `search` resource. | None | `Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchResourceRoutePlugin` |
| `CatalogSearchSuggestionsResourceRoutePlugin` | Registers the `search-suggestions` resource. | None | `Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchSuggestionsResourceRoutePlugin` |

**`src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`**
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin\CatalogSearchAbstractProductsResourceRelationshipPlugin;
use Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin\CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin;
use Spryker\Glue\CatalogSearchRestApi\CatalogSearchRestApiConfig;
use Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchResourceRoutePlugin;
use Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchSuggestionsResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
 
 
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

**Verification**
{% info_block infoBox %}
Make sure the following endpoints are available:
{% endinfo_block %}
* `http://glue.mysprykershop.com/catalog-search?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}`
* `http://glue.mysprykershop.com/catalog-search-suggestions?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}`
{% info_block infoBox %}
Make a request to `http://glue.mysprykershop.com/catalog-search?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}&include=abstract-products`. Make sure the response includes relationships to `abstract-products` resources.
{% endinfo_block %}

{% info_block infoBox %}
Make a request to `http://glue.mysprykershop.com/catalog-search-suggestions?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}&include=abstract-products`. Make sure the response includes relationships to `abstract-products` resources.
{% endinfo_block %}

_Last review date: Apr 10, 2019_
