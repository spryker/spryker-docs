---
title: Customize Algolia
description: Learn how to customize Algolia in your Spryker shop.
last_updated: Sep 1, 2025
template: howto-guide-template
---

The default Algolia app configuration is similar to Spryker's default search configuration. You may want to customize this configuration to better suit your needs.

## Searchable product attributes

![algolia-searchable-attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-searchable-attributes.png)

The **Searchable attributes** configuration defines which attributes are used to find results when searching with a query.

The default searchable attributes are:
- `sku`
- `product_abstract_sku`
- `name`
- `abstract_name`
- `category`
- `description`
- `keywords`
- `attributes.brand`

### Add or remove searchable attributes

1. In the Algolia Dashboard, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
2. Open the list of Algolia indices and locate all primary indices.
3. On the **Configuration** tab, select **Searchable attributes**.
4. In the **Searchable attributes** list, add or remove the attributes you need.
5. Click **Review and save settings**. This opens the **Review and save settings** window.
6. Enable **Copy these settings to other indices and/or replicas** and click **Save settings**.

### Add extra product attributes

You can add extra data to exported products using the pre-configured `searchMetadata` field on `ProductConcrete` and `ProductAbstract` transfers.

There are several ways to add search metadata. This section shows how to implement a `ProductConcreteExpanderPlugin` as an example.

Create a new plugin that implements `ProductConcreteExpanderPluginInterface` to add searchMetadata to `ProductConcreteTransfer`, include your logic inside the plugin's `expand` method:

```php
use Spryker\Zed\Kernel\Communication\AbstractPlugin;  
use Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface;

class SearchMetadataExampleProductConcreteExpanderPlugin extends AbstractPlugin implements ProductConcreteExpanderPluginInterface
{
    /**
     * @param array<\Generated\Shared\Transfer\ProductConcreteTransfer> $productConcreteTransfers
     * @return array<\Generated\Shared\Transfer\ProductConcreteTransfer>
     */
    public function expand(array $productConcreteTransfers): array
    {
        foreach ($productConcreteTransfers as $productConcreteTransfer) {
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

The `searchMetadata` field must be an associative array. Allowed values are scalars and arrays.

{% endinfo_block %}

#### Using the `searchMetadata` field in Algolia

The `searchMetadata` field in Algolia product objects is a simple object that can be used in any index configuration, just like any other field.

## Facets (Filters)

![algolia-facets](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-facets.png)

The **Facets** configuration defines which attributes are used for search faceting.

The default product attributes for faceting are:
- `attributes.brand`
- `attributes.color`
- `category`
- `label`
- `prices`
- `rating`
- For marketplaces only: `merchant_name`

The `prices` attribute is an object with nested fields. Algolia creates facets for each nested field and for all currencies and pricing modes available in product entities.

### Facet configuration

Algolia uses facets to categorize and group data.

#### Facet display

All configured index facets are displayed in the filter list on Yves or via the Glue API `/catalog-search`.
The Algolia app supports the `renderingContent` feature, which can be found in an index's "Configuration > Facet display" section.
Here, you can configure the order of facets and add only those relevant to end users.

In the **Merchandising** > **Filter Preferences** section of the Back Office, you can define the filter types to be displayed on the Catalog and Search pages: single-select, multi-select, or range.
By default, the multi-select type is set for all facets provided by Algolia.

#### Searchable

Attributes defined as searchable can be used with Algolia's `searchForFacetValues` method, which is useful for Storefront integration.
This method is necessary to display catalog page facets when there are many possible values for each facet—by default, only 100 values are shown. To access other values, you must search for them using the `searchForFacetValues` method.
Select this option if you expect a large number of different values for a facet and use the Spryker Storefront.

#### Filter only

Attributes defined as filter only are not used for aggregation and can only be used to narrow down search result lists.
This approach is suitable for attributes where aggregated counts are not important.

{% info_block warningBox "Glue API search response" %}

Setting an attribute as `filter only` prevents it from appearing in the facets list in the Glue API search response.

{% endinfo_block %}

#### Not searchable

This is the default option. This facet configuration enables aggregation of search results by facet values.
The `searchForFacetValues` method cannot be used with facets configured this way. Use this option with third-party frontends
or if you have a limited number of facet values.

#### After distinct

By default, facet aggregation is calculated after search results for a given query are processed by deduplication or grouping.
Disabling this option changes how facet aggregation is calculated for the field. We do not recommend disabling it.

### Filter preferences with the Algolia app

When using the Algolia app, Algolia's facet configuration is used instead of Spryker's.

In Algolia, you can configure the list of filters in **Configuration** > **Facet display**.

Setting any Algolia facet to **filter only** mode removes it from the list of visible filters.

## Add new attributes for faceting

1. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
2. Locate all primary indices.
3. On the **Configuration** tab, select **Facets**.
4. To adjust the **Attributes for faceting** list, add or remove attributes.
5. Click **Review and save settings**. This opens the **Review and save settings** window.
6. Enable **Copy these settings to other indices and/or replicas** and click **Save Settings**.

## Custom ranking and sorting

![algolia-ranking](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-ranking.png)

Algolia's **Ranking and sorting** configuration determines which products are shown first when customers search your catalog.
Learn more about custom ranking and sorting in the [Algolia documentation](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/).

## Retain Algolia configuration after a destructive deployment

{% info_block errorBox "" %}
[Destructive deployment](/docs/dg/dev/acp/retaining-acp-apps-when-running-destructive-deployments.html) permanently deletes the configuration of Algolia.

To run a destructive deployment, follow these steps:
1. Disconnect Algolia.
2. Run a destructive deployment.
3. Reconnect Algolia.

{% endinfo_block %}
