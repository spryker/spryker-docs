---
title: Product reviews feature integration
originalLink: https://documentation.spryker.com/v6/docs/product-review-feature-integration
redirect_from:
  - /v6/docs/product-review-feature-integration
  - /v6/docs/en/product-review-feature-integration
---

## Prerequisites
To prepare your project to work with Product Reviews:
1. Require the Product Review modules in your composer by running
    * `composer require spryker/product-review`
    * `composer require spryker/product-review-collector`
    * `composer require spryker/product-review-gui`
2. Install the new database tables by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
3. Run `vendor/bin/console propel:migrate` to apply the database changes.
4. Generate ORM models by running `vendor/bin/console propel:model:build`.
This command will generate some new classes in your project under `\Orm\Zed\ProductReview\Persistence` namespace. It is important to make sure that they extend the base classes from the Spryker core, e.g.:
    * `\Orm\Zed\ProductReview\Persistence\SpyProductReview` extends `\Spryker\Zed\ProductReview\Persistence\Propel\AbstractSpyProductReview`
    * `\Orm\Zed\ProductReview\Persistence\SpyProductReviewQuery` extends `\Spryker\Zed\ProductReview\Persistence\Propel\AbstractSpyProductReviewQuery`
5. Run `vendor/bin/console transfer:generate` to generate the new transfer objects.
6.  Activate the product review collectors by adding the `ProductReviewCollectorSearchPlugin` and the `ProductAbstractReviewCollectorStoragePlugin` to the Storage and Search Collector plugin stack.

<details open>
<summary>Example: collector plugin list extension</summary>
        
```php
<?php

    namespace Pyz\Zed\Collector;

    use Spryker\Zed\Collector\CollectorDependencyProvider as SprykerCollectorDependencyProvider;
    use Spryker\Zed\Kernel\Container;
    use Spryker\Zed\ProductReviewCollector\Communication\Plugin\ProductReviewCollectorSearchPlugin;
    use Spryker\Zed\ProductReviewCollector\Communication\Plugin\ProductAbstractReviewCollectorStoragePlugin;
    // ...

    class CollectorDependencyProvider extends SprykerCollectorDependencyProvider
    {
        /**
         * @param \Spryker\Zed\Kernel\Container $container
         *
         * @return \Spryker\Zed\Kernel\Container
         */
        public function provideBusinessLayerDependencies(Container $container)
        {
            // ...

            $container[static::SEARCH_PLUGINS] = function (Container $container) {
                return [
                    // ...
                    ProductReviewConfig::RESOURCE_TYPE_PRODUCT_REVIEW => new ProductReviewCollectorSearchPlugin(),
                ];
            };

            $container[static::STORAGE_PLUGINS] = function (Container $container) {
                return [
                    // ...
                    ProductReviewConfig::RESOURCE_TYPE_PRODUCT_ABSTRACT_REVIEW => new ProductAbstractReviewCollectorStoragePlugin(),
                ];
            };


            // ...
        }
    }
```
 </br>
 </details>


7. Run `vendor/bin/console setup:search` to set up Search before you run Search collectors.
8. Make sure the new Zed user interface assets are built by running `npm run zed` (or antelope build zed for older versions).
9. Update Zed’s navigation cache to show the new items for the Product Review management user interface by running `vendor/bin/console application:build-navigation-cache`.

You should now be able to use the Zed API of Product Reviews to approve, reject and delete reviews, and the collectors should also be able to push approved reviews and ratings into Storage and Search. Check out our [Demoshop implementation](https://github.com/spryker/demoshop) for frontend implementation example and idea.

## Usage in Yves
### Submitting a Product Review
To store an already validated product review, populate a `\Generated\Shared\Transfer\ProductReviewTransfer` transfer object and send it to Zed by calling the `\Spryker\Client\ProductReview\ProductReviewClientInterface::submitCustomerReview` method.
This action will create a new pending product review in your persistent storage. The saved product review will be exported to Search and Storage after it was approved on Zed UI.
Make sure that the provided rating value does not exceed the configured maximum rating <!--(https://documentation.spryker.com/feature_integration_guides/product-review-feature-configuration.htm#configure-maximum-rating)--> limit.
Example of how to store a validated customer review:
```php
<?php

    /**
     * @method \Pyz\Yves\ProductReview\ProductReviewFactory getFactory()
     */
    class SubmitController extends Pyz\Yves\Application\Controller\AbstractController
    {
        /**
         * @param \Symfony\Component\HttpFoundation\Request $request
         */
        public function submitAction(Request $request)
        {
            $customerReference = $this->getFactory()->getCustomerClient()->getCustomer()->getCustomerReference();

            $this->getFactory()->getProductReviewClient()->submitCustomerReview(
                (new ProductReviewRequestTransfer())
                        ->setCustomerReference($customerReference)
                        ->setLocaleName($this->getLocale())
                        ->setIdProductAbstract($request->attributes->get('idProductAbstract'))
                        ->setSummary($request->attributes->get('summary'))
                        ->setDescription($request->attributes->get('description'))
                        ->setRating($request->attributes->get('rating'))
                        ->setNickname($request->attributes->get('nickname'))
            );
        }
    }
```

### Displaying an Average Rating
To display the average rating stored in Storage, you will need to use `spyProductAbstractReview` and `spyProductAbstractReviewMaximumRating` twig extensions shipped by `ProductReview` module.

* `spyProductAbstractReview` twig extension takes product abstract ID as first argument and injects the corresponding `ProductAbstractReviewTransfer` transfer object into the twig template provided as the second argument.

* `spyProductAbstractReviewMaximumRating` twig extension allows you to retrieve the configured maximum rating on demand.

To register these plugins, you need to add `ProductAbstractReviewTwigServiceProvider` service provider to your` \Pyz\Yves\Application\YvesBootstrap.php`.

Example of how to register twig extensions:
```php
<?php
    namespace Pyz\Yves\Application;

    use Spryker\Yves\ProductReview\Plugin\Provider\ProductAbstractReviewTwigServiceProvider;

    class YvesBootstrap
    {
        /**
         * @return void
         */
        protected function registerServiceProviders()
        {
            // ...
            $this->application->register(new ProductAbstractReviewTwigServiceProvider());
        }

    }
```
Now you will be able to call the registered `spyProductAbstractReview` and `spyProductAbstractReviewMaximumRating` twig extensions in your twig templates.

Below is the example `spyProductAbstractReview` call.
`@ProductReview/index/index.twig`:
```yaml
<div>Product name: {% raw %}{{{% endraw %}product.name{% raw %}}}{% endraw %}</div>
{% raw %}{{{% endraw %} spyProductAbstractReview(product.idProductAbstract, '@ProductReview/partials/average-rating.twig') {% raw %}}}{% endraw %}
```
The `spyProductAbstractReview` twig extension will render the template provided as a second argument and inject the productAbstractReviewTransfer variable.

Below is the example average-rating.twig implementation.
`@ProductReview/partials/average-rating.twig:`

```yaml
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
   {% raw %}{%{% endraw %} if productAbstractReviewTransfer {% raw %}%}{% endraw %}
       Average product rating is {% raw %}{{{% endraw %} productAbstractReviewTransfer.averageRating {% raw %}}}{% endraw %} out of {% raw %}{{{% endraw %} spyProductAbstractReviewMaximumRating() {% raw %}}}{% endraw %}
   {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
### Displaying Reviews and Rating Summary
To display previously posted and already approved reviews from Search, you will need to call `\Spryker\Client\ProductReview\ProductReviewClientInterface::findProductReviewsInSearch` method.

To alter the retrieved number of product reviews per page, change the Client configuration.

Example of product review retrieval:
```php
namespace Pyz\Yves\ProductReview\Controller;

use Generated\Shared\Transfer\ProductReviewSearchRequestTransfer;
use Pyz\Yves\Application\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Spryker\Client\ProductReview\ProductReviewClientInterface getClient()
 */
class IndexController extends AbstractController
{

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
    public function indexAction(Request $request)
    {
        $productReviews = $this->getClient()->findProductReviewsInSearch(
            (new ProductReviewSearchRequestTransfer())
                ->setIdProductAbstract($request->attributes->get('idProductAbstract'));
                ->setRequestParams($request->query->all())
        );

        return [
            'productReviews' => $productReviews['productReviews'],
            'pagination' => $productReviews['pagination'],
            'ratingAggregation' => $productReviews['ratingAggregation'],
        ];
    }

}
```


<!-- Last review date: Aug 28, 2017 by  Karoly Gerner-->
