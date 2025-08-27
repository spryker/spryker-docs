---
title: "Tutorial: Content and search - personalized catalog pages"
description: Use the tutorial to create a new CMS page with the personalized product catalog based on the user's session ID.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-content-search-personalized-catalog-page
originalArticleId: 1a07bff6-3655-4d94-97d9-58d0b8df106d
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-content-and-search-personalized-catalog-pages-spryker-commerce-os.html
  - /docs/pbc/all/content-management-system/202311.0/tutorials-and-howtos/tutorial-content-and-search-personalized-catalog-pages-spryker-commerce-os.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/tutorials-and-howtos/tutorial-content-and-search-personalized-catalog-pages.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/tutorials-and-howtos/tutorial-content-and-search-personalized-catalog-pages.html
related:
  - title: CMS Pages overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-pages-overview.html
---

{% info_block infoBox %}

This tutorial is also available on the Spryker Training website. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp) website.

{% endinfo_block %}

This tutorial shows how to build the first block of personalization, a new CMS page, and fill it with personalized products using the user's session ID.

The session ID is used just to show that products change when a new customer visits the page. In a real case scenario, the session ID can be replaced and a score calculated from the customer's preferences and order history.

## 1. Create the CMS page

1. Create the CMS page template:
   1. In `src/Pyz/Shared/Cms/Theme/default/templates`, create a `my-offers` folder.
   2. In this folder, create`my-offers.twig`.

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

2. In the Back Office, [Create a CMS page](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/pages/create-cms-pages.html). Select the template you've just created. For page URL, enter `/my-offers`.
3. Publish the page.

Now, you need to test the CMS page:
In your shop `https://mysprykershop.com/my-offers.`, go to the **My Offers** page.

Now you can get the personalized products and add them to the page.

## 2. Get the personalized products

To get the products, use Elasticsearch. You need to work with the `SearchClient` because it connects with Elasticsearch.
You will work with Yves to get the request from the shop and the client to pass the request to Elasticsearch and get the response back.

1. In `src/Pyz/Yves`, create the `PersonalizedProduct` Yves module.
2. In `src/Pyz/Yves/PersonalizedProduct/Plugin/Router`, create `PersonalizedProductRouteProviderPlugin`  the route to the personalized products.

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

- The `value()` method gives a default value if the limit value is not passed from the URL.
- The `assert()` method checks if the limit value is a positive integer.

{% endinfo_block %}

3. Register the `PersonalizedProductRouteProviderPlugin` to the `\Pyz\Yves\Router\RouterDependencyProvider::getRouteProvider()` method.
4. In `src/Pyz/Yves/PersonalizedProduct/Controller`, for the `PersonalizedProduct` module, create  `IndexController` and add `indexAction()`.
5. In `src/Pyz/Yves/PersonalizedProduct/Theme/default/views/index`, for the controller and the action, add the `index.twig` twig template.

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

```twig
{% raw %}{%{% endraw %} extends template('page-blank') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
	{% raw %}{{{% endraw %} 'My Personalized Products' {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

{% info_block infoBox %}

You can now go to `https://mysprykershop.com/personalized-product/12` and get the personalized products page.

Go to `http://mysprykershop.com/personalized-product/not-positive-integer`. This should result in an `404` error as the rout is not defined.

The next steps are for the work on the client. These steps show how to connect your module to Elasticsearch.

To connect Yves to Elasticsearch, you need a client.

{% endinfo_block %}



1. In `src/Pyz/Client`, create the `PersonalizedProduct` client directory.
2. Add the client class and interface.

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

8. To get the products from Elasticsearch, use `SearchClient`.


In `SearchClient`, the `search()` method queries the search engine and takes a search query and an array of formatters as parameters. Hence, you need to create the query and get the formatters and `SearchClient`. Then, you can hook things together. First, create the query. The query is a plugin implementing `QueryInterface`.

9. In the client's directory, create `Plugin/Elasticsearch/Query/PersonalizedProductQueryPlugin`:

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

The limit passed in the constructor of the query plugin. Also, the seed value is `session_id()` of the customer and it's used with the random score from Elasticsearch. You can change these values according to your needs.

{% endinfo_block %}

10. The formatters and `SearchClient` are an external dependency to `PersonalizedProductClient`. To get and inject them into the client, in `src/Pyz/Client`, create `PersonalizedProductDependencyProvider`. The formatter to use is `RawCatalogSearchResultFormatterPlugin`.

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

11. To use the dependencies from the `PersonalizedProductDependencyProvider`, in `src/Pyz/Client`,  create `PersonalizedProductFactory`. Then get the dependencies and create  `PersonalizedProductQueryPlugin` in order for them to be used from the client.

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

The client now can get all the objects it needs to send the search query and to get the response back from Elasticsearch.

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

13. Update the controller and its twig template so it calls the client and renders the results.

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

That's it for getting the personalized products.

To see how personalized products are displayed for different customers, do the following:
1. Go to `https://mysprykershop.com/personalized-product/12` and check the products.
2. Refresh the page. You should see the same products as you still have the same session ID.
3. To change your session ID, remove the Spryker cookie.
4. Refresh the page. You should see different products.

## 3. Put the personalized products in the CMS page

This section describes how to add personalized products to the CMS page you've created before, so they get the same look and feel of the whole shop with extra content around them.

The `render()` method takes a path for the route name as a parameter. It creates a sub-request internally and calls the route with the provided name. Then, it renders the results inside another twig template. In `my-offers.twig`, add `{% raw %}{{{% endraw %} render(path('personalized-product-index', {'limit': 12})) {% raw %}}}{% endraw %}` as follows.

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

To check the results, go to `https://mysprykershop.com/my-offers`.

Remove the Spryker cookie and refresh again to see different personalized products.
