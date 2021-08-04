---
title: Tutorial - Boosting Cart Based Search
originalLink: https://documentation.spryker.com/v1/docs/boosting-cart-based-search
redirect_from:
  - /v1/docs/boosting-cart-based-search
  - /v1/docs/en/boosting-cart-based-search
---

<!--Used to be: https://spryker.github.io/challenge/cart-based-search-boosting/-->
## Challenge Description
Based on the colors of the products that are in the cart of the user, the catalog should first display products that have the same color. Let’s say, for example, that there’s a red product in the cart, then the top results in the catalog should also contain red products.

## Challenge Solving Highlights
### Preparation
Fulltext search engines like Elasticsearch provide a possibility to influence sorting of products by tweaking the scoring function. The scoring function assigns weights to each result based on a formula, usually based on text similarity or synonyms, but we can change it to boost specific products higher than others. In this challenge, we will try to affect the scoring function based on products that are already in the cart.

The second idea leverages the fact that Spryker implementation of search is very flexible and allows configuring additional plugins which are used to build search queries. Please see *Search* <!--(https://documentation.spryker.com/module_guide/spryker/search.htm) -->for more details.

To solve this task we will be working in the client layer of the Catalog module located at `src/Pyz/Client/Catalog/`.

### Step by Step Solution

1. If we trace the execution flow of search starting from `Pyz\Yves\Catalog\Controller\CatalogController`, we will find a `CatalogClient`. The client uses a stack of plugins which implements `\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface`. It is needed to create a new plugin, which will modify our search queries accordingly.
2. Implement `Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface` and then replace `SortedCategoryQueryExpanderPlugin` with your new plugin in `Pyz\Client\Catalog\CatalogDependencyProvider::createCatalogSearchQueryExpanderPlugins()`. Name the new plugin `Pyz\Client\Catalog\Plugin\Elasticsearch\QueryExpander\CartBoostQueryExpanderPlugin`. The final version of the plugin can be found at the bottom of this page.
3. We will use [function_score query modifier function](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html) which allows us to modify the scoring of the filtered results. Elastic search allows combining multiple queries using [different strategies](https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html), filtering is needed in the catalog, therefore the [bool query strategy](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html) is used by the Search module to build the base query (see `Pyz\Client\Catalog\Plugin\Elasticsearch\Query\CatalogSearchQueryPlugin`). This means that we need to extend the boolean query with our custom scoring function. What is needed to be done in the plugin is check for a type of the incoming query and it would be then safe to extend it when the instance of `BoolQuery` is passed.
4. To get the content of the cart we can use  `Spryker\Client\Cart\CartClientInterface::getQuote()`. The client has to be added as a dependency to `CatalogDependencyProvider` and provided to  `CartBoostQueryExpanderPlugin` through the client factory like:

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

5. To get the color of a product from the cart we need to read the product data from the key-value storage (Redis) using `\Spryker\Client\Product\ProductClientInterface::getProductConcreteByIdForCurrentLocale()`. The product client needs to be added to  `CatalogDependencyProvider` and provided to the plugin in the very same way we did in the the previous step.
6. You can find the full source code of `CartBoostQueryExpanderPlugin` below.
7. Cleanup: the example code below is good for educational purposes, but needs a minor adjustment to match Spryker architecture: `FunctionScore` and `MultiMatch` objects should be instantiated in `CatalogFactory` of the catalog client. Now, move the instantiation of these objects to the factory and use the factory inside the plugin.

### Testing
Now, we can test the results, try to go to a category having products of different colors, e.g. “Cameras &amp; Camcoders”. Then, add any red product to your cart and return to the catalog page. The ordering of products should be changed accordingly and you should see red products first.

#### Snippet for Implementing Cart Boost Query Expander
`src/Pyz/Client/Catalog/Plugin/Elasticsearch/QueryExpander/CartBoostQueryExpanderPlugin.php`

<!-- code sample below not behaving = same problem as 'Logger' module
-->

<details open>
<summary>Code sample</summary>

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
use Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;

/**
 * @method \Pyz\Client\Catalog\CatalogFactory getFactory()
 */
class CartBoostQueryExpanderPlugin extends AbstractPlugin implements QueryExpanderPluginInterface
{

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryInterface $searchQuery
     * @param array $requestParameters
     *
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryInterface
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
<br>
</details>


