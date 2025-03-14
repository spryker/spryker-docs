---
title: "Tutorial: Boost cart-based search"
description: The tutorial provides a step-by-step solution on how you can arrange your products in the cart by a color attribute.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/boosting-cart-based-search
originalArticleId: 7f335803-4f1b-4711-97b7-d32c7bcd57bb
redirect_from:
  - /2021080/docs/boosting-cart-based-search
  - /2021080/docs/en/boosting-cart-based-search
  - /docs/boosting-cart-based-search
  - /docs/en/boosting-cart-based-search
  - /v6/docs/boosting-cart-based-search
  - /v6/docs/en/boosting-cart-based-search
  - /v5/docs/boosting-cart-based-search
  - /v5/docs/en/boosting-cart-based-search
  - /v4/docs/boosting-cart-based-search
  - /v4/docs/en/boosting-cart-based-search
  - /v2/docs/boosting-cart-based-search
  - /v2/docs/en/boosting-cart-based-search
  - /v1/docs/boosting-cart-based-search
  - /v1/docs/en/boosting-cart-based-search
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-content-and-search-attribute-cart-based-catalog-personalization-spryker-commerce-os/tutorial-boosting-cart-based-search.html
  - /docs/pbc/all/search/202311.0/tutorials-and-howtos/tutorial-content-and-search-attribute-cart-based-catalog-personalization/tutorial-boost-cart-based-search.html
related:
  - title: Search feature overview
    link: docs/pbc/all/search/page.version/base-shop/search-feature-overview/search-feature-overview.html
---

This tutorial describes how you can improve the cart-based search in your project.

Based on the colors of the products in the user's cart, the catalog must first display products that have the same color. For example, if there's a red product in the cart, the top results in the catalog must also contain red products.

To solve the challenge, use instructions from the following sections.

## Preparation

Full-text search engines like Elasticsearch provide a possibility to influence the sorting of products by tweaking the scoring function. The scoring function assigns weights to each result based on a formula, which in its turn is usually based on text similarity or synonyms, but we can change it to boost specific products higher than others. In this challenge, you will try to affect the scoring function based on the products that are already in the cart.

The second idea leverages the fact that Spryker's implementation of [search](/docs/pbc/all/search/{{site.version}}/base-shop/search-feature-overview/search-feature-overview.html) is very flexible and allows configuring additional plugins that are used to build search queries.

To solve this task, you will work in the client layer of the `Catalog` module located in `src/Pyz/Client/Catalog/`.

## Step-by-step solution

1. If you trace the execution flow of the search starting from `Pyz\Yves\Catalog\Controller\CatalogController`, you can find a `CatalogClient`. The client uses a stack of plugins which implements `\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface`. It is needed to create a new plugin, which modifies your search queries accordingly.
2. Implement `Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface` and replace `SortedCategoryQueryExpanderPlugin` with your new plugin in `Pyz\Client\Catalog\CatalogDependencyProvider::createCatalogSearchQueryExpanderPlugins()`.
3. Name the new plugin `Pyz\Client\Catalog\Plugin\Elasticsearch\QueryExpander\CartBoostQueryExpanderPlugin`. The final version of the plugin can be found [here](#plugin).
4. Use the [`function_score` query modifier function](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html), which lets you modify the scoring of the filtered results. Because Elasticsearch lets you combine multiple queries using [different strategies](https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html) and filtering is needed in the catalog, the [bool query strategy](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html) is used by the `Search` module to build the base query (see `Pyz\Client\Catalog\Plugin\Elasticsearch\Query\CatalogSearchQueryPlugin`). It means that you need to extend the boolean query with your custom scoring function.
5. Check the plugin for a type of incoming query. After this, you can safely extend it when the instance of `BoolQuery` is passed.
6. To get the content of the cart, you can use `Spryker\Client\Cart\CartClientInterface::getQuote()`. The client must be added as a dependency to `CatalogDependencyProvider` and provided to `CartBoostQueryExpanderPlugin` through the client factory, like this:

```php
<?php
namespace Pyz\Client\Catalog;

use Pyz\Client\Catalog\Plugin\Elasticsearch\Query\FeaturedProductsQueryPlugin;
use Spryker\Client\Catalog\CatalogFactory as SprykerCatalogFactory;

class CatalogFactory extends SprykerCatalogFactory
{
    ...
    public function getCartClient()
    {
        return $this->getProvidedDependency(CatalogDependencyProvider::CART_CLIENT);
    }
    ...
}
```

7. To get the color of a product from the cart, you need to read the product data from the key-value storage (Redis) using `\Spryker\Client\Product\ProductClientInterface::getProductConcreteByIdForCurrentLocale()`. The product client must be added to  `CatalogDependencyProvider` and provided to the plugin in the same way as in the previous step. See the full source code of [`CartBoostQueryExpanderPlugin`](#plugin).
8. Cleanup: the example code of `CartBoostQueryExpanderPlugin` is good for educational purposes, but needs a minor adjustment to match Spryker architecture: `FunctionScore` and `MultiMatch` objects must be instantiated in `CatalogFactory` of the catalog client. Now, move the instantiation of these objects to the factory and use the factory inside the plugin.

<a name="plugin"></a>

{% info_block infoBox "Snippet for implementing cart boost query expander" %}

Check out the example code of the `CartBoostQueryExpanderPlugin` plugin:

<details>
<summary>src/Pyz/Client/Catalog/Plugin/Elasticsearch/QueryExpander/CartBoostQueryExpanderPlugin.php</summary>

```php
<?php

namespace Pyz\Client\Catalog\Plugin\Elasticsearch\QueryExpander;

use Elastica\Query;
use Elastica\Query\BoolQuery;
use Elastica\Query\FunctionScore;
use Elastica\Query\MultiMatch;
use Generated\Shared\Search\PageIndexMap;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use InvalidArgumentException;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface;

/**
 * @method \Pyz\Client\Catalog\CatalogFactory getFactory()
 */
class CartBoostQueryExpanderPlugin extends AbstractPlugin implements QueryExpanderPluginInterface
{

    /**
     * @param \Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface $searchQuery
     * @param array $requestParameters
     *
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface
     */
    public function expandQuery(QueryInterface $searchQuery, array $requestParameters = [])
    {
        $quoteTransfer = $this->getFactory()
            ->getCartClient()
            ->getQuote();

        // Don't need to change query when cart is empty.
        if (!$quoteTransfer->getItems()->count()) {
            return $searchQuery;
        }

        // Make sure that the query we are extending is compatible with our expectations.
        $boolQuery = $this->getBoolQuery($searchQuery->getSearchQuery());

        // Boost query based on cart.
        $this->boostByCartItemColors($boolQuery, $quoteTransfer);

        return $searchQuery;
    }

    /**
     * @param \Elastica\Query $query
     *
     * @throws \InvalidArgumentException
     *
     * @return \Elastica\Query\BoolQuery
     */
    protected function getBoolQuery(Query $query)
    {
        $boolQuery = $query->getQuery();
        if (!$boolQuery instanceof BoolQuery) {
            throw new InvalidArgumentException(sprintf(
                'Cart boost query expander available only with %s, got: %s',
                BoolQuery::class,
                get_class($boolQuery)
            ));
        }

        return $boolQuery;
    }

    /**
     * @param \Elastica\Query\BoolQuery $boolQuery
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    protected function boostByCartItemColors(BoolQuery $boolQuery, QuoteTransfer $quoteTransfer)
    {
        $functionScoreQuery = new FunctionScore();
        // Define how the computed scores are combined for the used functions.
        $functionScoreQuery->setScoreMode(FunctionScore::SCORE_MODE_MULTIPLY);
        // Define how the newly computed score is combined with the score of the query.
        $functionScoreQuery->setBoostMode(FunctionScore::BOOST_MODE_MULTIPLY);

        foreach ($quoteTransfer->getItems() as $itemTransfer) {
            $color = $this->getProductColor($itemTransfer);

            if ($color) {
                // Create filter for all products that contains the same color.
                $filter = $this->createFulltextSearchQuery($color);

                // Boost the results with a custom number.
                $functionScoreQuery->addFunction('weight', 20, $filter);
            }
        }

        // Extend the original search query with function_score that will change the score of the results.
        $boolQuery->addMust($functionScoreQuery);
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return string|null
     */
    protected function getProductColor(ItemTransfer $itemTransfer)
    {
        // We get the concrete product from the key-value storage (Redis).
        $productData = $this->getFactory()
            ->getProductClient()
            ->getProductConcreteByIdForCurrentLocale($itemTransfer->getId());

        return isset($productData['attributes']['color']) ? $productData['attributes']['color'] : null;
    }

    /**
     * @param string $searchString
     *
     * @return \Elastica\Query\MultiMatch
     */
    protected function createFulltextSearchQuery($searchString)
    {
        // We search for color in the "full-text" and "full-text-boosted" fields.
        $matchQuery = (new MultiMatch())
            ->setFields([
                PageIndexMap::FULL_TEXT,
                PageIndexMap::FULL_TEXT_BOOSTED . '^3', // Boost results with custom number.
            ])
            ->setQuery($searchString)
            ->setType(MultiMatch::TYPE_CROSS_FIELDS);

        return $matchQuery;
    }

}
```
</details>

{% endinfo_block %}

### Testing

To test the results, follow these steps:
1. Go to a category having products of different colors—for example, *Cameras & Camcoders*.
2. Add any red product to your cart and return to the catalog page.
The order of products must be changed accordingly, and you must see red products first.
