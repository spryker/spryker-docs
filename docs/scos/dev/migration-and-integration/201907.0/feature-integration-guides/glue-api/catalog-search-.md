---
title: Catalog Search API Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/catalog-search-api-feature-integration-201903
redirect_from:
  - /v3/docs/catalog-search-api-feature-integration-201903
  - /v3/docs/en/catalog-search-api-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:
|Name|Version|Required sub-feature|
|---|---|---|
|Spryker Core|201903.0|[Glue Application Feature Integration](https://documentation.spryker.com/v4/docs/glue-application-feature-integration) <!-- Replace by v201903 once available-->|
|Search|201903.0||
|Catalog2|01903.0||
|Product|201903.0|[Product API Feature Integration](https://documentation.spryker.com/v4/docs/product-api-feature-integration) <!-- Replace by v201903 once available-->|
|Catalog + Price|201903.0||

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```yaml
composer require spryker/catalog-search-rest-api:"^2.1.0" spryker/catalog-search-products-resource-relationship:"^1.1.0" --update-with-dependencies
```
{% info_block infoBox "Verification" %}
Make sure that the following modules are installed:
{% endinfo_block %}
|Module|Expected Directory|
|---|---|
|`CatalogSearchRestApi`|`vendor/spryker/catalog-search-rest-api`|
|`CatalogSearchProductsResourceRelationship`|`vendor/spryker/catalog-search-products-resource-relationship`|

### 2) Set up Transfer objects
Run the following command to generate transfer changes:
```yaml
console transfer:generate
```
{% info_block infoBox "Verification" %}
Make sure that the following changes in transfer objects have occurred:
{% endinfo_block %}
|Transfer|Type|Event|Path|
|--- |--- |--- |--- |
|`RestCatalogSearchAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestCatalogSearchAttributesTransfer`|
|`RestCatalogSearchSortTransfer`|class|created|`src/Generated/Shared/Transfer/RestCatalogSearchSortTransfer`|
|`RestCatalogSearchPaginationTransfer`|class|created|`src/Generated/Shared/Transfer/RestCatalogSearchPaginationTransfer`|
|`RestCatalogSearchAbstractProductsTransfer`|class|created|`src/Generated/Shared/Transfer/RestCatalogSearchAbstractProductsTransfer`|
|`RestCatalogSearchProductImageTransfer`|class|created|`src/Generated/Shared/Transfer/RestCatalogSearchProductImageTransfer`|
|`RestRangeSearchResultTransfer`|class|created|`src/Generated/Shared/Transfer/RestRangeSearchResultTransfer`|
|`RestFacetSearchResultTransfer`|class|created|`src/Generated/Shared/Transfer/RestFacetSearchResultTransfer`|
|`RestCatalogSearchSuggestionsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestCatalogSearchSuggestionsAttributesTransfer`|
|`RestCatalogSearchSuggestionAbstractProductsTransfer`|class|created|`src/Generated/Shared/Transfer/RestCatalogSearchSuggestionAbstractProductsTransfer`|
|`RestCatalogSearchSuggestionProductImageTransfer`|class|created|`src/Generated/Shared/Transfer/RestCatalogSearchSuggestionProductImageTransfer`|
|`RestPriceProductTransfer`|class|created|`src/Generated/Shared/Transfer/RestPriceProductTransfer`|
|`PriceModeConfigurationTransfer`|class|created|`src/Generated/Shared/Transfer/PriceModeConfigurationTransfer`|
|`RestCurrencyTransfer`|class|created|`src/Generated/Shared/Transfer/RestCurrencyTransfer`|
|`RestFacetConfigTransfer`|class|created|`src/Generated/Shared/Transfer/RestFacetConfigTransfer`|

### 3) Set Up Behavior
#### Enable resources and relationships
Activate the following plugins:
|Plugin|Specification|Prerequisites|Namespace|
|--- |--- |--- |--- |
|`CatalogSearchAbstractProductsResourceRelationshipPlugin`|Adds the `abstract-products` resource relationship to search results.|None|`Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin`|
|`CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin`|Adds the `abstract-products` resource relationship to search suggestions results.|None|`Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin`|
|`CatalogSearchResourceRoutePlugin`|Registers the `search` resource.|None|`Spryker\Glue\CatalogSearchRestApi\Plugin`|
|`CatalogSearchSuggestionsResourceRoutePlugin`|Registers the `search-suggestions` resource.|None|`Spryker\Glue\CatalogSearchRestApi\Plugin`|
<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

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
        $resourceRelationshipCollection-&gt;addRelationship(
            CatalogSearchRestApiConfig::RESOURCE_CATALOG_SEARCH,
            new CatalogSearchAbstractProductsResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection-&gt;addRelationship(
            CatalogSearchRestApiConfig::RESOURCE_CATALOG_SEARCH_SUGGESTIONS,
            new CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```
</br>
</details>

**Verification**
{% info_block infoBox %}
If CatalogSearchResourceRoutePlugin and CatalogSearchSuggestionsResourceRoutePlugin are installed correctly, the following endpoints should now be available:
{% endinfo_block %}

* http://glue.mysprykershop.com/catalog-search?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}
* http://glue.mysprykershop.com/catalog-search-suggestions?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}

{% info_block infoBox %}
To make sure that `CatalogSearchAbstractProductsResourceRelationshipPlugin` and `CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin` are functioning correctly, do the following:
{% endinfo_block %}
{% info_block infoBox %}
Make a request to http://glue.mysprykershop.com/catalog-search?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}&amp;include=abstract-products and verify that the response includes relationships to abstract-products resources.Make a request to http://glue.mysprykershop.com/catalog-search-suggestions?q={% raw %}{{{% endraw %}q_term{% raw %}}}{% endraw %}&amp;include=abstract-products and verify that the response includes relationships to abstract-products resources.
{% endinfo_block %}


<!--**See also:**

* [Catalog Search](https://documentation.spryker.com/glue_rest_api/glue_api_storefront_guides/catalog-search.htm)
* [Getting Suggestions for Auto-Completion and Search](https://documentation.spryker.com/glue_rest_api/glue_api_storefront_guides/getting-suggestions-for-autocompletion-and-search.htm)-->

*Last review date: Apr 10, 2019* <!-- by  Karoly Gerner and Volodymyr Volkov-->
