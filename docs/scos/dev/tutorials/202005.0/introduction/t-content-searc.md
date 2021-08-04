---
title: Tutorial - Content and Search - Personalized Catalog Pages - Spryker Commerce OS
originalLink: https://documentation.spryker.com/v5/docs/t-content-search-personalized-catalog-page
redirect_from:
  - /v5/docs/t-content-search-personalized-catalog-page
  - /v5/docs/en/t-content-search-personalized-catalog-page
---

{% info_block infoBox %}
This tutorial is also available on the Spryker Training web-site. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp
{% endinfo_block %} web-site.)

## Challenge Description
The aim of this task is to build the first block of personalization for your shop. We are going to build a new CMS page and fill it with personalized products using the user's session ID. 

We will use the session ID just to show that products change when a new customer visits the page. 

{% info_block infoBox %}
In a real case scenario, the session ID can be replaced and a score calculated from the customer's preferences and order history.
{% endinfo_block %}

### 1. Create the CMS Page
    
    
  1. First, we will create the CMS page template. 

In `src/Pyz/Shared/Cms/Theme/default/templates`, add a new directory called _my-offers_.

Inside this folder, add a twig file called _my-offers.twig_.
    
```php
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
	title: _view.pageTitle | default('global.spryker.shop' | trans),
	metaTitle: _view.pageTitle | default('global.spryker.shop' | trans),
	metaDescription: _view.pageDescription | default(''),
	metaKeywords: _view.pageKeywords | default('')
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block title {% raw %}%}{% endraw %}
	<!-- CMS_PLACEHOLDER : "title" -->
    <h3>{% raw %}{{{% endraw %} spyCms('title') | raw {% raw %}}}{% endraw %}</h3>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	<!-- CMS_PLACEHOLDER : "content" -->
	<div class="box">
		{% raw %}{{{% endraw %} spyCms('content') | raw {% raw %}}}{% endraw %}
    </div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
    
2. Create a new CMS page from CMS tab in the back office. Use the twig template you have just added, and use the `URL /my-offers`. 
					
3. Click **Next** and fill in the title and content of the page. 
Use any title and description you like to add.

4. Save the page, and publish it.
Now, we need to test the CMS page. Go to the **My Offers** page in your shop: [http://www.de.suite.local/my-offers](http://www.de.suite.local/my-offers).

That is it! It is very simple to add a CMS page and publish it.
Next, let's get the personalized products and add them to the page.

### 2. Get the Personalized Products
    
To get the products, we will use **Elasticsearch**. To do so, we need to work with the `SearchClient` as it is the place to connect with Elasticsearch. 
So, mainly we will work with Yves to get the request from the shop, and the client to pass the request to Elasticsearch and get the response back.
1. First, create a new Yves module in `src/Pyz/Yves` and call it `PersonalizedProduct`.
2. Create a `PersonalizedProductRouteProviderPlugin` inside `src/Pyz/Yves/PersonalizedProduct/Plugin/Router` and add the route to the personalized products inside of it.

```php
namespace Pyz\Yves\PersonalizedProduct\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;
 
class PersonalizedProductRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    public const ROUTE_NAME_PERSONALIZED_PRODUCT_INDEX = 'personalized-product-index';
 
    /**
     * Specification:
     * - Adds Routes to the RouteCollection.
     *
     * @api
     *
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
	$route = $this->buildRoute('/personalized-product/{limit}', 'PersonalizedProduct', 'Index', 'indexAction');
        $routeCollection->add(static::ROUTE_NAME_PERSONALIZED_PRODUCT_INDEX, $route);

        return $routeCollection;
    } 
}
```
    
{% info_block infoBox %}
The `value(
{% endinfo_block %}` method gives a default value in case the limit value is not passed from the URL.</br>The `assert()` method checks if the limit value is a positive integer.)

3. Register the `PersonalizedProductRouteProviderPlugin` to the `\Pyz\Yves\Router\RouterDependencyProvider::getRouteProvider()`method.

4. Create an `IndexController` for the `PersonalizedProduct` module in `src/Pyz/Yves/PersonalizedProduct/Controller` and add an `indexAction()`. 
Then, add the twig template for the controller and the action in `src/Pyz/Yves/PersonalizedProduct/Theme/default/views/index` and call it `index.twig`.

```php
namespace Pyz\Yves\PersonalizedProduct\Controller;
 
use Spryker\Yves\Kernel\Controller\AbstractController;
 
class IndexController extends AbstractController
{
	/**
	 * @param $limit
	 *
	 * @return array
	 */
	public function indexAction($limit)
	{
		return [];
	}
}
```

```
{% raw %}{%{% endraw %} extends template('page-blank') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
	{% raw %}{{{% endraw %} 'My Personalized Products' {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

{% info_block infoBox %}
For now, the Yves part is done. You can now go to [http://www.de.suite.local/personalized-product/12](http://www.de.suite.local/personalized-product/12
{% endinfo_block %} and get the personalized products page.</br>Now try [http://www.de.suite.local/personalized-product/not-positive-integer](http://www.de.suite.local/personalized-product/not-positive-integer), this should result in an 404 error as the rout in not defined.</br>The next set of steps is for work on the client. By performing those, you will connect your module to Elasticsearch. First, you need a client for that in order to connect Yves to Elasticsearch.)

5. Create the PersonalizedProduct's client directory in `src/Pyz/Client` and call it `PersonalizedProduct` and add the client class and interface.

```php
namespace Pyz\Client\PersonalizedProduct;
 
interface PersonalizedProductClientInterface
{
	/**
	 * @param int $limit
	 *
	 * @return array
	 */
	public function getPersonalizedProducts($limit);
}
```

```php
namespace Pyz\Client\PersonalizedProduct;
 
use Spryker\Client\Kernel\AbstractClient;
 
class PersonalizedProductClient extends AbstractClient implements PersonalizedProductClientInterface
{
	/**
	 * @param int $limit
	 *
	 * @return array
	 */
	public function getPersonalizedProducts($limit)
	{
	}
}
```

6. To get the products from Elasticsearch, we need to use the `SearchClient`. In the SearchClient, there is the `search()` method that queries the search engine and takes a search query and an array of formatters as parameters. 

So, we need three main steps here: 
* create the query
* get the formatters 
* get the SearchClient.

Then, we can hook things together. 

First, let's create the query. The query is basically a plugin implementing the QueryInterface. 
1. Add the following directory structure inside the client's directory: `Plugin/Elasticsearch/Query`.
2. Then, add the query plugin inside it and call it `PersonalizedProductQueryPlugin`:

```php
namespace Pyz\Client\PersonalizedProduct\Plugin\Elasticsearch\Query;
 
use Elastica\Query;
use Elastica\Query\BoolQuery;
use Elastica\Query\FunctionScore;
use Elastica\Query\Match;
use Elastica\Query\MatchAll;
use Generated\Shared\Search\PageIndexMap;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;
use Spryker\Shared\ProductSearch\ProductSearchConfig;
 
class PersonalizedProductQueryPlugin implements QueryInterface
{
	/**
	 * @var int
	 */
	protected $limit;
 
	/**
	 * @param int $limit
	 */
	public function __construct($limit)
	{
		$this->limit = $limit;
	}
 
	/**
	 * @return \Elastica\Query
	 */
	public function getSearchQuery()
	{
		$boolQuery = (new BoolQuery())
			->addMust((new FunctionScore())
				->setQuery(new MatchAll())
				->addFunction('random_score', ['seed' => session_id()])
				->setScoreMode('sum'))
			->addMust((new Match())
				->setField(PageIndexMap::TYPE, ProductSearchConfig::RESOURCE_TYPE_PRODUCT_ABSTRACT));
 
		$query = (new Query())
			->setSource([PageIndexMap::SEARCH_RESULT_DATA])
			->setQuery($boolQuery)
			->setSize($this->limit);
 
		return $query;
	}
}
```

{% info_block infoBox %}
As you notice, we have the limit passed in the constructor of the query plugin. Also, the seed value is the `session_id(
{% endinfo_block %}` of the customer and it is used with the random score from Elasticsearch. Again, you can change these values according to your needs.)

7. Both the formatters and the `SearchClient` are and external dependency to our `PersonalizedProductClient`, therefore we need to use the dependency provider to get them and inject them inside our client. Create the `PersonalizedProductDependencyProvider` in `src/Pyz/Client` and get both the formatters array and the SearchClient. 

The formatter that we need to use here is the `RawCatalogSearchResultFormatterPlugin`.

Your dependency provider will look like this:

```php

namespace Pyz\Client\PersonalizedProduct;
 
use Spryker\Client\Catalog\Plugin\Elasticsearch\ResultFormatter\RawCatalogSearchResultFormatterPlugin;
use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;
 
class PersonalizedProductDependencyProvider extends AbstractDependencyProvider
{
	const CLIENT_SEARCH = 'CLIENT_SEARCH';
	const CATALOG_SEARCH_RESULT_FORMATTER_PLUGINS = 'CATALOG_SEARCH_RESULT_FORMATTER_PLUGINS';
 
	/**
	 * @param \Spryker\Client\Kernel\Container $container
	 *
	 * @return \Spryker\Client\Kernel\Container
	 */
	public function provideServiceLayerDependencies(Container $container)
	{
		$container = $this->addSearchClient($container);
		$container = $this->addCatalogSearchResultFormatterPlugins($container);
 
		return $container;
	}
 
	/**
	 * @param \Spryker\Client\Kernel\Container $container
	 *
	 * @return \Spryker\Client\Kernel\Container
	 */
	protected function addSearchClient(Container $container)
	{
		$container[static::CLIENT_SEARCH] = function (Container $container) {
			return $container->getLocator()->search()->client();
		};
 
		return $container;
	}
 
	public function addCatalogSearchResultFormatterPlugins($container)
	{
		$container[static::CATALOG_SEARCH_RESULT_FORMATTER_PLUGINS] = function () {
			return [
				new RawCatalogSearchResultFormatterPlugin()
			];
		};
 
		return $container;
	}
}
```

8. To use the dependencies from the `PersonalizedProductDependencyProvider`, we need the factory. Create the `PersonalizedProductFactory` in `src/Pyz/Client`, then get the dependencies and create the `PersonalizedProductQueryPlugin` in order for them to be used from the client.

```php
namespace Pyz\Client\PersonalizedProduct;
 
use Pyz\Client\PersonalizedProduct\Plugin\Elasticsearch\Query\PersonalizedProductQueryPlugin;
use Spryker\Client\Kernel\AbstractFactory;
use Spryker\Client\Search\SearchClientInterface;
 
class PersonalizedProductFactory extends AbstractFactory
{
	/**
	 * @param $limit
	 *
	 * @return PersonalizedProductQueryPlugin
	 */
	public function createPersonalizedProductQueryPlugin($limit)
	{
		return new PersonalizedProductQueryPlugin($limit);
	}
 
	/**
	 * @throws \Spryker\Client\Kernel\Exception\Container\ContainerKeyNotFoundException
	 *
	 * @return array
	 */
	public function getSearchQueryFormatters()
	{
		return $this->getProvidedDependency(PersonalizedProductDependencyProvider::CATALOG_SEARCH_RESULT_FORMATTER_PLUGINS);
	}
 
	/**
	 * @throws \Spryker\Client\Kernel\Exception\Container\ContainerKeyNotFoundException
	 *
	 * @return \Spryker\Client\Search\SearchClientInterface
	 */
	public function getSearchClient()
	{
		return $this->getProvidedDependency(PersonalizedProductDependencyProvider::CLIENT_SEARCH);
	}
}
```

9. The client now can get all the objects it needs to send the search query and to get the response back from Elasticsearch. 

```php

/**
 * @param int $limit
 *
 * @throws \Spryker\Client\Kernel\Exception\Container\ContainerKeyNotFoundException
 *
 * @return array
 */
public function getPersonalizedProducts($limit)
{
	$searchQuery = $this
		->getFactory()
		->createPersonalizedProductsQueryPlugin($limit);
 
	$searchQueryFromatters = $this
		->getFactory()
		->getSearchQueryFormatters();
 
	$searchResult = $this->getFactory()
		->getSearchClient()
		->search(
			$searchQuery,
			$searchQueryFromatters
		);
 
	return $searchResult;
}
```

10. Finally, let's hook things together. The client is done, and now we only need to update the controller and its twig template so it calls the client and renders the results.

```php
namespace Pyz\Yves\PersonalizedProduct\Controller;
 
use Spryker\Yves\Kernel\Controller\AbstractController;
 
class IndexController extends AbstractController
{
	/**
	 * @param $limit
	 *
	 * @throws \Spryker\Client\Kernel\Exception\Container\ContainerKeyNotFoundException
	 *
	 * @return \Spryker\Yves\Kernel\View\View
	 */
	public function indexAction($limit)
	{
		$searchResults = $this->getClient()->getPersonalizedProducts($limit);
 
		return $this->view(
			$searchResults,
			[],
			'@PersonalizedProduct/views/index/index.twig'
		);
	}
}
```

```php
{% raw %}{%{% endraw %} extends template('page-blank') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
	products: _view.products
 {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
	<div>
		{% raw %}{%{% endraw %} for product in data.products {% raw %}%}{% endraw %}
			<div>
				{% raw %}{%{% endraw %} include molecule('product-card') with {
					data: {
						name: product.abstract_name,
						abstractId: product.id_product_abstract,
						url: product.url,
						imageUrl: product.images.0.external_url_small,
						price: product.price,
						originalPrice: null
					}
				} only {% raw %}%}{% endraw %}
			</div>
		{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
	</div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

{% info_block infoBox %}
That's it for getting the personalized products. </br>To demonstrate having different personalized products for different customers. Go to [http://www.de.suite.local/personalized-product/12](http://www.de.suite.local/personalized-product/12
{% endinfo_block %} and check out the products. Refresh the page, you should see the same products as you still have the same session ID.</br> Now, remove the Spryker cookie so the session ID is different and refresh the page, you should see different products. This different customers with different sessions IDs get different personalized products.)

### 3. Put the personalized products in the CMS page
    
Let's put our personalized products inside our CMS page, the one we have created in the first step, so they get the same look and feel of the whole shop with extra content around them. 

To do so, we will use the `render()` method with the twig templates. 

The method takes a path for the route name as a parameter. What it does is that it creates a sub-request internally and calls the route with the provided name, then it renders the results inside another twig template. Open `my-offers.twig` and use the render method like this `{% raw %}{{{% endraw %} render(path('personalized-product-index', {'limit': 12})) {% raw %}}}{% endraw %}`.

```php
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} define data = {
	title: _view.pageTitle | default('global.spryker.shop' | trans),
	metaTitle: _view.pageTitle | default('global.spryker.shop' | trans),
	metaDescription: _view.pageDescription | default(''),
	metaKeywords: _view.pageKeywords | default('')
} {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block title {% raw %}%}{% endraw %}
	<!-- CMS_PLACEHOLDER : "title" -->
    <h3>{% raw %}{{{% endraw %} spyCms('title') | raw {% raw %}}}{% endraw %}</h3>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	<!-- CMS_PLACEHOLDER : "content" -->
	<div class="box">
		{% raw %}{{{% endraw %} spyCms('content') | raw {% raw %}}}{% endraw %}
    </div>
	<div class="box">
		{% raw %}{{{% endraw %} render(path('personalized-product-index', {'limit': 12})) {% raw %}}}{% endraw %}
    </div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```		

Done! To check the results, go to [http://www.de.suite.local/my-offers](http://www.de.suite.local/my-offers). 

Remove the Spryker cookie and refresh again to see different personalized products.
    
[//]: # (_Last review date: Jul 03, 2018_ by Hussam Hebbo, Anastasija Datsun)

