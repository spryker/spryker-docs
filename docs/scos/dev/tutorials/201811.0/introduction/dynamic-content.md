---
title: Tutorial - Dynamic Content Page - Legacy Demoshop
originalLink: https://documentation.spryker.com/v1/docs/dynamic-content-page
redirect_from:
  - /v1/docs/dynamic-content-page
  - /v1/docs/en/dynamic-content-page
---

<!--used to be: http://spryker.github.io/challenge/dynamic-content/-->

## Challenge Description
Create a CMS page that displays some (marketing) text and a list of personalized products as offers.

## Challenge Solving Highlights

### Static page
For creating a CMS page, follow these steps:
1. Create a CMS template called `personalized_products.twig` under `src/Pyz/Shared/Cms/Theme/default/template/`. The template must contain at least one placeholder that will represent the marketing text.
2. Go to Zed UI and open the [CMS Pages](http://zed.de.demoshop.local/cms/page) backend. Add a CMS page that uses the `/my-offers` URL and the `personalized_products` template that we’ve just created.
3. Add the text you would like to show on the static page.
4. Activate the page.
5. Run the storage collectors to export the static page by running `vendor/bin/console collector:storage:export` from your command line. You can have a look into Redis from the [Storage](http://zed.de.demoshop.local/storage/maintenance/list) backend page.
6. You can see the page [here](http://www.de.demoshop.local/my-offers).

### Personalized Offers
To display some personalized product offers, follow the steps below:
1. Create a new Yves module called `SpecialOffers`.
2. Create `Pyz\Yves\SpecialOffers\Plugin\Provider\SpecialOffersControllerProvider` that defines a new route to get a list of offers. The route should accept an integer parameter for the limit of how many offers we’d like to display.
3. In order to make the `SpecialOffersControllerProvider` work, it needs to be registered under `Pyz\Yves\Application\YvesBootstrap::registerControllerProviders()`.
4. Create a controller and a template for the defined route. At this point you should be able to display template you’ve created through the URL of your new route.
5. To get products, we’ll need to query Elasticsearch. For querying, we can use the `Spryker\Client\Search\SearchClient::search()` method from the `SearchClient`. We’ll create the `Pyz\Client\SpecialOffers\SpecialOffersClient` class with `getPersonalizedProducts()` method that will call the `search()` of the search client. (Read here about how to implement a client.)
6. The `search()` method requires us to implement `Spryker\Client\Search\Dependency\Plugin\QueryInterface` that returns an `Elastica\Query` object. This is the pure representation of our Elasticsearch query. Below you’ll find a code snippet for the full implementation of a query that returns random products based on the session ID, e.g. listed products will be different for every user. (In real life this of course shouldn’t be a random list of products, but should contain some filters based on collected user information instead. For detailed info about the query, check [Random scoring](https://www.elastic.co/guide/en/elasticsearch/guide/current/random-scoring.html) documentation page from Elasticsearch.)
7. The second parameter of the `search()` method is a stack of result formatter plugins. For our case, it’s enough to provide only an instance of `Spryker\Client\Catalog\Plugin\Elasticsearch\ResultFormatter\RawCatalogSearchResultFormatterPlugin` that will return only necessary product data from Elasticsearch.
8. Returning back to our controller, now we can execute the search request and provide the result as it is for our template.
9. In the template, we should be able to access and iterate through the products variable (provided by the `RawCatalogSearchResultFormatterPlugin`) and display the products. Check template snippet below, that uses the catalog template to render products.
10. Checking the URL (defined under step 2.) should now show a list of personalized product offers.

### Putting Everything Together
Now that we have a CMS page and can have a list of personalized product offers, we can finish our task by the following steps:
1. Open our `personalized_products.twig` template and place a `{% raw %}{{{% endraw %} render() {% raw %}}}{% endraw %}` method call where you’d like to display the personalized product offer list.
2. The `render()` twig method is provided by Silex (check documentation here). All we need to provide as parameter is a path to our personalized products route and the limit of the list (i.e. `{% raw %}{{{% endraw %} render(path('personalized-products', {'limit': 12})) {% raw %}}}{% endraw %}`). This will create an internal sub-request to any of the paths that can be matched by the application router.
3. As the final result you should be able to see the CMS page with the marketing text you defined on the backend, and a limited list of personalized product offers.

#### Snippet for Implementing Elasticsearch Query with Personalized (Random) Results

`src/Pyz/Client/SpecialOffers/Plugin/Elasticsearch/Query/PersonalizedProductsQueryPlugin.php`

<details open>
<summary>Code Sample</summary>
    
```php
<?php

namespace Pyz\Client\SpecialOffers\Plugin\Elasticsearch\Query;

use Elastica\Query;
use Elastica\Query\BoolQuery;
use Elastica\Query\FunctionScore;
use Elastica\Query\Match;
use Elastica\Query\MatchAll;
use Generated\Shared\Search\PageIndexMap;
use Pyz\Shared\ProductSearch\ProductSearchConfig;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;

class PersonalizedProductsQueryPlugin implements QueryInterface
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
                ->setField(PageIndexMap::TYPE, ProductSearchConfig::PRODUCT_ABSTRACT_PAGE_SEARCH_TYPE));

        $query = (new Query())
            ->setSource([PageIndexMap::SEARCH_RESULT_DATA])
            ->setQuery($boolQuery)
            ->setSize($this->limit);

        return $query;
    }

}
```
    
</br>
</details>

#### Snippet for Product Offers Template

`src/Pyz/Yves/SpecialOffers/Theme/default/personalized-products/index.twig`

```json
<div class="row">
    {% raw %}{%{% endraw %} if products is defined {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} for product in products {% raw %}%}{% endraw %}
            <div class="small-12 medium-6 large-4 xlarge-3 columns">
                {% raw %}{%{% endraw %} include "@catalog/catalog/partials/product.twig" with {
                    detailsUrl: product.url,
                    name: product.abstract_name,
                    priceValue: product.price,
                    imageUrl: (product.images|length ? product.images.0.external_url_small : '')
                } {% raw %}%}{% endraw %}
             </div>
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
</div>
```

