---
title: Tutorial - Boosting Cart Based Search
originalLink: https://documentation.spryker.com/v6/docs/boosting-cart-based-search
redirect_from:
  - /v6/docs/boosting-cart-based-search
  - /v6/docs/en/boosting-cart-based-search
---

This tutorial describes how you can boost the cart-based search in your project.

## Challenge Description
Based on the colors of the products in the user's cart, the catalog should first display products that have the same color. Let’s say, for example, that there’s a red product in the cart, then the top results in the catalog should also contain red products.

## Challenge Solving Highlights
To solve the challenge, follow the instructions below.

### Preparation
Fulltext search engines like Elasticsearch provide a possibility to influence the sorting of products by tweaking the scoring function. The scoring function assigns weights to each result based on a formula, which in its turn is usually based on text similarity or synonyms, but we can change it to boost specific products higher than others. In this challenge, we will try to affect the scoring function based on the products that are already in the cart.

The second idea leverages the fact that Spryker implementation of [search](https://documentation.spryker.com/docs/en/search-filter) is very flexible and allows configuring additional plugins that are used to build search queries.

To solve this task, we will be working in the client layer of the Catalog module located at `src/Pyz/Client/Catalog/`.

### Step-by-Step Solution

1. If we trace the execution flow of search starting from `Pyz\Yves\Catalog\Controller\CatalogController`, we will find a `CatalogClient`. The client uses a stack of plugins which implements `\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface`. It is needed to create a new plugin, which will modify our search queries accordingly.
2. Implement `Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface` and replace `SortedCategoryQueryExpanderPlugin` with your new plugin in `Pyz\Client\Catalog\CatalogDependencyProvider::createCatalogSearchQueryExpanderPlugins()`. Name the new plugin `Pyz\Client\Catalog\Plugin\Elasticsearch\QueryExpander\CartBoostQueryExpanderPlugin`. The final version of the plugin can be found [here](#plugin).
3. We will use the [function_score query modifier function](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html), which allows us to modify the scoring of the filtered results. Since Elasticsearch allows combining multiple queries using [different strategies](https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html), and filtering is needed in the catalog, therefore the [bool query strategy](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html) is used by the Search module to build the base query (see `Pyz\Client\Catalog\Plugin\Elasticsearch\Query\CatalogSearchQueryPlugin`). This means that we need to extend the boolean query with our custom scoring function. What still needs to be done in the plugin is checking for a type of the incoming query. Then it would be then safe to extend it when the instance of `BoolQuery` is passed.
4. To get the content of the cart we can use  `Spryker\Client\Cart\CartClientInterface::getQuote()`. The client has to be added as a dependency to `CatalogDependencyProvider` and provided to  `CartBoostQueryExpanderPlugin` through the client factory, like this:

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

5. To get the color of a product from the cart, we need to read the product data from the key-value storage (Redis) using `\Spryker\Client\Product\ProductClientInterface::getProductConcreteByIdForCurrentLocale()`. The product client should be added to  `CatalogDependencyProvider` and provided to the plugin in the very same way we did in the previous step. See the full source code of the [CartBoostQueryExpanderPlugin plugin](#plugin).
6. Cleanup: the example code of the CartBoostQueryExpanderPlugin plugin is good for educational purposes, but needs a minor adjustment to match Spryker architecture: `FunctionScore` and `MultiMatch` objects should be instantiated in `CatalogFactory` of the catalog client. Now, move the instantiation of these objects to the factory and use the factory inside the plugin.

<a name="plugin"></a>

{% info_block infoBox "Snippet for Implementing Cart Boost Query Expander" %}

Check out the example code of the `CartBoostQueryExpanderPlugin` plugin:
<details open>
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
Now, to test the results, go to a category having products of different colors, for example, *Cameras & Camcoders*. Then, add any red product to your cart and return to the catalog page. The order of products should be changed accordingly, and you should see red products first.


