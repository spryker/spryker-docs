---
title: CatalogSearchRestApi Migration Guide
originalLink: https://documentation.spryker.com/v2/docs/catalogsearchrestapi-migration-guide
redirect_from:
  - /v2/docs/catalogsearchrestapi-migration-guide
  - /v2/docs/en/catalogsearchrestapi-migration-guide
---

## Upgrading from Version 1.* to Version 2.*

CatalogSearchRestApi version 2 has been improved to work properly with the currency and price mode. Now other modules are responsible to handle these parameters in the request. Also, we have fixed a response structure to meet requirements, namely we have added a price with the currency information and fixed a catalog search suggestions structure.

Make sure that API consumers expect a correct response:

**search**
```yaml
RestCatalogSearchAbstractProducts:
		properties:
			images:
				items:
					$ref: '#/components/schemas/RestCatalogSearchProductImage'
			price:
				type: integer
			abstractName:
				type: string
			prices:
				type: array
			abstractSku:
				type: string
	RestCatalogSearchAttributes:
		properties:
			sort:
				$ref: '#/components/schemas/RestCatalogSearchSort'
			pagination:
				$ref: '#/components/schemas/RestCatalogSearchPagination'
			abstractProducts:
				items:
					$ref: '#/components/schemas/RestCatalogSearchAbstractProducts'
			valueFacets:
				items:
					$ref: '#/components/schemas/RestFacetSearchResult'
			rangeFacets:
				items:
					$ref: '#/components/schemas/RestRangeSearchResult'
			spellingSuggestion:
				type: string
	RestCatalogSearchSuggestionAbstractProducts:
		properties:
			images:
				items:
					$ref: '#/components/schemas/RestCatalogSearchSuggestionProductImage'
			price:
				type: integer
			abstractName:
				type: string
			abstractSku:
				type: string
	RestCatalogSearchSuggestionProductImage:
		properties:
			externalUrlSmall:
				type: string
			externalUrlLarge:
				type: string
	RestCatalogSearchSuggestionsAttributes:
		properties:
			completion:
				type: string
			abstractProducts:
				items:
					$ref: '#/components/schemas/RestCatalogSearchSuggestionAbstractProducts'
			categories:
				type: array
			cmsPages:
				type: array
```

_Estimated migration time: 30 minutes_

<!-- Last review date: Dec 10, 2018-- by Oleh Hladchenko, Yuliia Boiko -->
