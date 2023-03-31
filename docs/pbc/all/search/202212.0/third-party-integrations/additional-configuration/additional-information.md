## Additional information on Algolia integration

#### SearchHTTP plugins setup
Spryker SearchHTTP module is responsible for transferring Glue search request to external search providers (one of which is Algolia). 
SearchHTTP query is built using QueryExpanderPlugin classes. Their order is defined in CatalogDependencyProvider::createCatalogSearchQueryExpanderPluginVariants() method.
Order of execution of those plugins might be customized on project level.
By default, all module-specific query builder plugins will be executed before parsing GET query parameters so any GET query parameters may overwrite search query parameters set before.

#### Default facets differences

There is a difference on how default facets behave on Algolia and default Spryker installation using Elasticsearch.
Some of default Spryker facets like `brand` only accept one value as a filter so it is impossible to specify multiple brands to filter on in one search request. 
This is not the case with Algolia - in this case multiple brands can be specified in the same search requests.
This also applies to other configured facets.

