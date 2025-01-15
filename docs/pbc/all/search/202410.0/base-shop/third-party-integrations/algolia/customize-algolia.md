---
title: Customize Algolia
description: Find out how you can customize Algolia in your Spryker shop
last_updated: Nov 24, 2024
template: howto-guide-template
---


The default Algolia app configuration is similar to the default Spryker search configuration. You might want to customize that configuration.

## Searchable attributes

![algolia-searchable-attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-searchable-attributes.png)

**Searchable attributes** configuration defines the attributes used to find results while searching with a search query.

Default fields for searchable attributes are the following:
- `sku`
- `product_abstract_sku`
- `name`
- `abstract_name`
- `category`
- `description`
- `keywords`
- `attributes.brand`

## Add and remove searchable attributes

1. In Algolia Dashboard, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
2. Open the Algolia indices list and find all primary indices.
3. On the **Configuration** tab, select **Searchable attributes**.
4. In the **Searchable attributes** list, add and remove needed searchable attributes.
5. Click **Review and save settings**. This opens the **Review and save settings** window.
6. Enable **Copy these settings to other indices and/or replicas** and click **Save settings**.

## Send additional fields to Algolia

You can add additional data to exported products using the pre-configured `searchMetadata` field on `ProductConcrete` and `ProductAbstract` transfers.

### Filling in the `searchMetadata` field

There're multiple ways of adding search metadata. This section shows how to implement `ProductConcreteExpanderPlugin` as an example.

Create a new plugin implementing `ProductConcreteExpanderPluginInterface`. To add needed metadata to `ProductConcrete` transfers, you can add any logic inside that plugin's `expand` method:

```php

use Spryker\Zed\Kernel\Communication\AbstractPlugin;  
use Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface;

class SearchMetadataExampleProductConcreteExpanderPlugin extends AbstractPlugin implements ProductConcreteExpanderPluginInterface  
{  
    /**  
     * @param array<\Generated\Shared\Transfer\ProductConcreteTransfer> $productConcreteTransfers  
     *  
     * @return array<\Generated\Shared\Transfer\ProductConcreteTransfer>  
     */  
    public function expand(array $productConcreteTransfers): array  
    {  
        foreach ($productConcreteTransfers as $productConcreteTransfer)
        {
            $productConcreteTransfer->addSearchMetadata('isBestseller', true);
            // ...
            // OR
            // ...
            $searchMetadata = [
                'isBestseller' => true,
                'popularity' => 100,
            ];

            $productConcreteTransfer->setSearchMetadata($searchMetadata);
        }

        return $productConcreteTransfers;
    }  
}
```

{% info_block warningBox "Associative array" %}

The `searchMetadata` field must be an associative array. Allowed values are all scalars and arrays.

{% endinfo_block %}

#### Using `searchMetadata` field in Algolia

Algolia product object `searchMetadata` field is a simple object that can be used in any index configuration just like any other field.

## Facets

![algolia-facets](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-facets.png)

**Facets** configuration defines the attributes used for search faceting.

Default attributes for faceting are as follows:
- `attributes.brand`
- `attributes.color`
- `category`
- `label`
- `prices`
- `rating`
- Only for marketplaces: `merchant_name`

The `prices` attribute is an object with nested fields. Algolia creates facets for each nested field and creates facets for all the currencies and pricing modes available in product entities.

### Facet configuration

Algolia uses facets for categorizing and grouping data.

#### Facet display

All configured index facets are displayed in the list of filter on Yves or via Glue API `/catalog-search`.
Algolia app supports the `renderingContent` feature, which can be found in an index "Configuration > Facet display".
Here you can configure the order of facets and add only for end-users relevant facets.

In the **Merchandising** > **Filter Preferences** of the Back Office, you can configure define the filter types to be displayed on the Catalog and Search pages: single-select, multi-select, or range. By default, the multi-select type is set for all facets provided by Algolia.

#### Searchable

Attributes defined as searchable may be used while calling Algolia's `searchForFacetValues` method, which can be used for the Storefront integration. This method is necessary to display catalog page facets if many values are possible for each facet—in this case, only 100 of those values are displayed by default. Accessing other values requires searching for them using the `searchForFacetValues` method. Select this option if you plan on having a large number of different values for this facet, and if you use the Spryker Storefront.

#### Filter only

Attributes defined as filters only are not used for aggregation and can only be used to narrow down search result lists. This approach can be used with attributes for which aggregated counts are not important.

{% info_block warningBox "Glue API search response" %}

Setting an attribute as `filter only` prevents it from showing in the facets list in the Glue API search response.

{% endinfo_block %}

#### Not searchable

This is the default option. This facet configuration enables aggregation of search results by facet values. The `searchForFacetValues` method can't be used with facets configured this way. Use this option with third-party frontends or if you have limited facet values.

#### After distinct

By default, facet aggregation is calculated after search results for a given query are processed by deduplication or grouping process. Disabling this option changes the calculation method for facet aggregation for the given field. We don't recomment disabling it.

### Filter preferences with Algolia app

When used with the Algolia app, Algolia's facets configuration is used instead of that of Spryker.

In Algolia, you can configure the list of filters in **Configuration** > **Facet display**.

Setting any Algolia facet to **filter only** mode removes it from the list of visible filters.

## Add new attributes for faceting

1. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
2. Find all primary indices.
3. On the **Configuration** tab, select **Facets**.
4. To adjust the **Attributes for faceting** list, add and remove attributes.
5. Click **Review and save settings**. This opens the **Review and save settings** window.
6. Enable **Copy these settings to other indices and/or replicas** and click **Save Settings**.

## Custom ranking and sorting

![algolia-ranking](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-ranking.png)

Algolia's **Ranking and sorting** configuration determines which products can be shown before others when customers search your catalog.
Learn more about Custom Ranking and Sorting in the [Algolia documentation](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/).

## Retain Algolia configuration after a destructive deployment

{% info_block errorBox "" %}
[Destructive deployment](https://spryker.com/docs/dg/dev/acp/retaining-acp-apps-when-running-destructive-deployments.html) permanently deletes the configuration of Algolia.

To run a destructive deployment, follow the steps:
1. Disconnect Algolia.
2. Run a destructive deployment.
3. Reconnect Algolia.

{% endinfo_block %}
