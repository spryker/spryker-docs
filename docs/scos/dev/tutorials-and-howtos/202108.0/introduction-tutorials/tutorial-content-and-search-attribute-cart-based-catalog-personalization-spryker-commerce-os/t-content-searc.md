---
title: Tutorial - Content and Search - Attribute-Cart-Based Catalog Personalization - Spryker Commerce OS
originalLink: https://documentation.spryker.com/2021080/docs/t-content-search-attribute-cart-based-catalog-personalization
redirect_from:
  - /2021080/docs/t-content-search-attribute-cart-based-catalog-personalization
  - /2021080/docs/en/t-content-search-attribute-cart-based-catalog-personalization
---

In this tutorial, we will boost and personalize the catalog using the color attribute of a product when it is added to cart. 
{% info_block infoBox %}
This tutorial is also available on the Spryker Training web-site. For more information and hands-on exercises, visit [Spryker Training](https://training.spryker.com/
{% endinfo_block %}.)

## Challenge Description
When you add a red camera to cart, all red cameras are going to be boosted in the catalog and pushed to the top of the products.

In this task, you will also learn how to work with plugins and extend the search plugin stack.

## Challenge Solving Highlights
In this task, we are using the cart only for the sake of training. In a real-life scenario, you can use the customer's order history to analyze what colors this customer likes and boost the catalog accordingly, or even use another attribute. 

Fulltext search engines like Elasticsearch provide a possibility to influence sorting of products by tweaking the scoring function. The scoring function assigns weights to each result based on a formula, which in its turn is usually based on text similarity or synonyms, but we can change it to boost specific products higher than others. 

In this challenge, we will try to affect the scoring function based on products that are already in the cart.

To solve the challenge, follow the instructions below.

### 1. Prepare the search query plugin
    
As we are working with search and Elasticsearch, we need to work with the client level. We need the catalog, so our main place to work is **CatalogClient** in `src/Pyz/Client/Catalog`.

The client uses a stack of plugins that implement `\Spryker/Client/SearchExtension/Dependency/Plugin/QueryExpanderPluginInterface`. In this task, we will extend this plugin stack by creating a new plugin for boosting and injecting it into the plugin stack. By creating a new plugin for boosting and injecting it in the plugin stack, we can alter the search query accordingly
    
To create the plugin:
1. Inside the catalog client directory, create the following directories: `Plugin/Elasticsearch/QueryExpander`. 

2. Inside the _QueryExpander_ directory, create a new query plugin and call it `AttributeCartBasedBoostingQueryExpanderPlugin`. This plugin implements  `QueryExpanderPluginInterface`.
 <details open>

<summary>Pyz\Client\Catalog\Plugin\Elasticsearch\QueryExpander</summary>
    
```php
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
use Spryker\Shared\Kernel\Store;

class AttributeCartBasedBoostingQueryExpanderPlugin extends AbstractPlugin implements QueryExpanderPluginInterface
{
    /**
     * @param QueryInterface $searchQuery
     * @param array $requestParameters
     *
     * @return QueryInterface
     */
    public function expandQuery(QueryInterface $searchQuery, array $requestParameters = []): QueryInterface
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
     * @return \Elastica\Query\BoolQuery
     * @throws \InvalidArgumentException
     *
     */
    protected function getBoolQuery(Query $query): BoolQuery
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
     * @param BoolQuery $boolQuery
     * @param QuoteTransfer $quoteTransfer
     *
     * @return void
     */
    protected function boostByCartItemColors(BoolQuery $boolQuery, QuoteTransfer $quoteTransfer): void
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
     * @param ItemTransfer $itemTransfer
     *
     * @return string|null
     */
    protected function getProductColor(ItemTransfer $itemTransfer): ?string
    {
        // We get the concrete product from the key-value storage (Redis).
        $productData = $this->getFactory()
            ->getProductStorageClient()
            ->getProductAbstractStorageData(
                $itemTransfer->getIdProductAbstract(),
                Store::getInstance()->getCurrentLocale()
            );

        return $productData['attributes']['color'] ?? null;
    }

    /**
     * @param string $searchString
     *
     * @return \Elastica\Query\MultiMatch
     */
    protected function createFulltextSearchQuery($searchString): MultiMatch
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
    
3. As you may notice, *CartClient* does not exist as a dependency for the *CatalogClient*. Let's add this dependency, so our query plugin works. For this, open `CatalogDependencyProvider` in `src/Pyz/Client/Catalog` and add *CartClient* as a dependency:

<details open>
<summary>Pyz\Client\Catalog</summary>
    
```php
namespace Pyz\Client\Catalog;
 

use Spryker\Client\Cart\CartClientInterface;
use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
...
use Spryker\Client\Kernel\Container;
...
 
class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    public const CLIENT_CART = 'CLIENT_CART';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container): Container
    {
        $container = parent::provideServiceLayerDependencies($container);

        $container = $this->addCartClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addCartClient(Container $container): Container
    {
        $container->set(static::CLIENT_CART, function (Container $container): CartClientInterface {
            return $container->getLocator()->cart()->client();
        });

        return $container;
    }
... 
} 
```
</details>
    
3. Next, get the *CartClient* dependency using the *CatalogFactory*. Extend the *CatalogFactory* of the catalog client in `src/Pyz/Client/Catalog` and get the *CartClient*.

```php
namespace Pyz\Client\Catalog;

use Spryker\Client\Cart\CartClientInterface;
use Spryker\Client\Catalog\CatalogFactory as SprykerCatalogFactory;

class CatalogFactory extends SprykerCatalogFactory
{
    /**
     * @return \Spryker\Client\Cart\CartClientInterface
     */
    public function getCartClient(): CartClientInterface
    {
        return $this->getProvidedDependency(CatalogDependencyProvider::CLIENT_CART);
    }
} 
```
    
4. To get the color of a product from the cart, we need to read the product data from the _key-value storage; Redis_.  For that, `ProductStorageClient` should be used with the method `getProductAbstractStorageData()`.
 
Like the *CartClient*, the *ProductStorageClient* needs to be added to the `CatalogDependencyProvider`. Then the `CatalogFactory` can get it from the dependency provider:

<details open>
<summary>Pyz\Client\Catalog</summary>

 ```php
namespace Pyz\Client\Catalog;
 
class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
	...
        public const CLIENT_PRODUCT_STORAGE = 'CLIENT_PRODUCT_STORAGE'; 

	/**
	 * @param \Spryker\Client\Kernel\Container $container
	 *
	 * @return \Spryker\Client\Kernel\Container
	 */
	public function provideServiceLayerDependencies(Container $container): Container
	{
		$container = parent::provideServiceLayerDependencies($container);
 
		$container = $this->addCartClient($container);
		$container = $this->addProductStorageClient($container);
 
		return $container;
	}
 
	...
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addProductStorageClient(Container $container): Container
    {
        $container->set(static::CLIENT_PRODUCT_STORAGE, function (Container $container): ProductStorageClientInterface {
            return $container->getLocator()->productStorage()->client();
        });

        return $container;
    }
... }
```
</details>
 
 <details open>
<summary>Pyz\Client\Catalog</summary>

```php
namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogFactory as SprykerCatalogFactory;
use Spryker\Client\ProductStorage\ProductStorageClientInterface; 

class CatalogFactory extends SprykerCatalogFactory {
 ...
    /**
     * @return \Spryker\Client\ProductStorage\ProductStorageClientInterface
     */
    public function getProductStorageClient(): ProductStorageClientInterface
    {
        return $this->getProvidedDependency(CatalogDependencyProvider::CLIENT_PRODUCT_STORAGE);
    } 
}
```
</details>
    
### 2. Extend the catalog's search queries stack
    
The final step is very simple.

In  `CatalogDependencyProvider`, there is a stack of plugins for expanding the search query.

Boosting the catalog is basically an expansion of the base search query for changing the weight of products in the catalog page so that the order of products in that page changes as well.

So, to use our new plugin, we need to inject it in the `CatalogDependencyProvider` in the `createCatalogSearchQueryExpanderPlugins()` method. For that, do the following:

1. Replace the `SortedCategoryQueryExpanderPlugin()` with your `AttributeCartBasedBoostingQueryExpanderPlugin()`.

2. Make sure that you keep the same exact position of the plugin, as the order of these plugins matters for the search results.

```php
/**
 * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
 */
protected function createCatalogSearchQueryExpanderPlugins(): array
{
	return [
		new StoreQueryExpanderPlugin(),
		new LocalizedQueryExpanderPlugin(),
		new ProductPriceQueryExpanderPlugin(),
		new FacetQueryExpanderPlugin(),
		new SortedQueryExpanderPlugin(),
		new AttributeCartBasedBoostingQueryExpanderPlugin(),
		new PaginatedQueryExpanderPlugin(),
		new SpellingSuggestionQueryExpanderPlugin(),
		new IsActiveQueryExpanderPlugin(),
		new IsActiveInDateRangeQueryExpanderPlugin(),
	];
}
```
    
Done! Now go to the *Cameras* catalog page in your shop [http://www.de.suite.local/en/cameras-&amp;-camcorders/digital-cameras](http://www.de.suite.local/en/cameras-&amp;-camcorders/digital-cameras) and do the following:
1. Add a red camera to cart.
2. Go back to the same catalog page. 

All red cameras are on the top now.

To see how simple it is to update this boosting, go to the `CatalogDependencyProvider`, comment out and then uncomment the `AttributeCartBasedBoostingQueryExpanderPlugin()`, and check how this affects the catalog page.
