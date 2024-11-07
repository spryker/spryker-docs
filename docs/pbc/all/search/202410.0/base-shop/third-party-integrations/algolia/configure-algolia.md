---
title: Configure Algolia
description: Find out how you can configure Algolia in your Spryker shop
last_updated: Feb 21 2023
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/search/202311.0/third-party-integrations/configure-algolia.html  -
  - /docs/pbc/all/search/202311.0/base-shop/third-party-integrations/configure-algolia.html
---
Once you have [integrated the Algolia app](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html), you can configure it.

## Prerequisites

To start using Algolia for your shop, you need an account with Algolia. You can create the account on the [Algolia website](https://www.algolia.com).

## Configure Algolia

To configure Algolia, do the following:

1. In your store's Back Office, go to **Apps**.
2. In **App Composition Platform Catalog**, click **Algolia**. This takes you to the Algolia app details page.
3. In the top right corner of the Algolia app details page, click **Connect app**. The notification saying that the application connection is pending is displayed.
4. Log in to the [Algolia website](https://www.algolia.com).
5. On the Algolia website, go to **Settings**.
6. Under **Team and Access**, click **API keys**.

![algolia-keys](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-keys.png)

7. From the **Your API Keys** tab, copy the following keys:
    - Application ID
    - Search API Key
    - Admin API Key
8. Go back to your store's Back Office, to the Algolia app details page.
9. In the top right corner of the Algolia app details page, click **Configure**.
10. In the **Configure** pane, fill in the **APPLICATION ID**, **SEARCH API KEY**, and **ADMIN KEY** fields with the values from step 7.

![algolia-settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-settings.png)

12. "Use Algolia instead of Elasticsearch" checkbox enables Algolia search on your frontends (Yves or Glue API-based application).
You can postpone checking it until all your products are synchronized with Algolia. 
13. Click **Save**.

The Algolia app is now added to your store and starts exporting your product data automatically.

{% info_block infoBox "Info" %}

You need to wait some time until Algolia finishes the product export.
The more products you have, the longer you have to wait (from few minutes to several hours).
The average export speed is around *300 products per minute*.

{% endinfo_block %}

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-integration.mp4" type="video/mp4">
  </video>
</figure>


{% info_block warningBox "Verification" %}

Verify that your index is populated with data from your store:
1. Go to the Algolia website.
2. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
3. Make sure that the index is populated with data from your store.

![algolia-index-data](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/integrate-algolia/algolia-index-data.png)

{% endinfo_block %}

For details about the created index data, see [Indexes](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia/algolia.html#indexes).

## Optional: Adjust Algolia configuration

The default Algolia app configuration mimics the default Spryker search configuration. However, you may want to adjust some of those settings to your needs.

### Overview of searchable attributes

![algolia-searchable-attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-searchable-attributes.png)

Algolia's **Searchable attributes** configuration determines which attributes are used to find results while searching with a search query.

Default fields for searchable attributes are the following:
- `sku`
- `product_abstract_sku`
- `name`
- `abstract_name`
- `category` 
- `description`
- `keywords`
- `attributes.brand`

### Adjust the searchable attributes list in Algolia

1. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
2. Open the Algolia indices list and find all primary indices.
3. On the **Configuration** tab, select **Searchable attributes**.
4. To adjust the **Searchable attributes** list, add and remove needed searchable attributes.
5. Click **Review and save settings**. This opens the **Review and save settings** window.
6. Enable **Copy these settings to other indices and/or replicas** and click **Save settings**.

### Send additional fields to Algolia

Spryker's Algolia App integration allows adding additional data to exported products.
This is achieved using the pre-configured `searchMetadata` field on ProductConcrete and ProductAbstract transfers.

#### Filling in the `searchMetadata` field
There're multiple ways of adding search metadata. For the sake of an example, we'll implement `ProductConcreteExpanderPlugin`.

Create a new plugin implementing `ProductConcreteExpanderPluginInterface`. Then you can add any logic inside that plugin's `expand` method to add necessary metadata to ProductConcrete transfers:

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

##### Using `searchMetadata` field in Algolia

Algolia product object `searchMetadata` field is a simple object that can be used in any index configuration just like any other field.

### Overview of facets list

![algolia-facets](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/configure-algolia/algolia-facets.png)

Algolia **Facets** configuration determines which attributes are used for search faceting.

Default attributes for faceting are as follows:
- `attributes.brand`
- `attributes.color`
- `category`
- `label`
- `prices`
- `rating`

The `prices` attribute is an object with nested fields. Algolia creates facets for each nested field and creates facets for all the currencies and pricing modes available in product entities.

#### Facet configuration

##### Facet display

All configured index Facets will be displayed in the list of filter on Yves or via Glue API `/catalog-search`.
Also, Spryker's Algolia app supports `renderingContent` feature, which can be found in an index "Configuration > Facet display".
Here you can configure the order of facets and add only relevant for end-users facets.

##### Searchable

Attributes defined as searchable may be used while calling Algolia's `searchForFacetValues` method, which can be used for the Storefront integration. This method is necessary to display catalog page facets if many values are possible for each facet—in this case, only 100 of those values are displayed by default. Accessing other values requires searching for them using the `searchForFacetValues` method. Select this option if you plan on having a large number of different values for this facet, and if you use the Spryker Storefront.

##### Filter only

Attributes defined as filters only are not used for aggregation and can only be used to narrow down search result lists. This approach can be used with attributes for which aggregated counts are not important.

{% info_block warningBox "Glue API search response" %}

Setting an attribute as `filter only` prevents it from showing in the facets list in the Glue API search response.

{% endinfo_block %}

##### Not searchable

Default option. This facet configuration enables aggregation of search results by facet values.
`searchForFacetValues` method can't be used with facets configured this way.
Use this option when you have limited facet values or plan on using something other than the Spryker Storefront.

##### After distinct checkbox

This checkbox is checked by default. Clearing this checkbox changes the calculation method for facet aggregation for the given field.
By default, facet aggregation is calculated after search results for a given query are processed by deduplication or grouping process.
It is not recommended to turn this checkbox off.

#### Spryker Filter Preferences and Algolia app

When used with Algolia ACP, Spryker facets configuration is ignored and Algolia facets configuration is used instead
Use "Configuration > Facet display" to configure the list of filter.
Be wary that setting any Algolia facet to `"filter only"` mode removes it from the list of visible filters.

### Add new attributes for faceting

1. In the side pane, go to **Search&nbsp;<span aria-label="and then">></span> Index**.
2. Find all primary indices.
3. On the **Configuration** tab, select **Facets**.
4. To adjust the **Attributes for faceting** list, add and remove attributes.
5. Click **Review and save settings**. This opens the **Review and save settings** window.
6. Enable **Copy these settings to other indices and/or replicas** and click **Save Settings**.

### Custom ranking and sorting

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
