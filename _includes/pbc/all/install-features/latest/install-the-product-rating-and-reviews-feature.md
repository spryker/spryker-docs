

This document describes how to install the [Product Rating and Reviews](/docs/pbc/all/ratings-reviews/latest/ratings-and-reviews.html) feature.

## Install feature core

Follow the steps below to install the Product Rating and Reviews feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                                            |
|--------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | 202507.0 | [Install Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                  |
| Product      | 202507.0 | [Install Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/product-rating-reviews:"202507.0" spryker-shop/product-review-widget:"^1.17.0" --update-with-dependencies 
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                             | EXPECTED DIRECTORY                        |
|------------------------------------|-------------------------------------------|
| ProductReviewWidget  | vendor/spryker-shop/product-review-widget |
| ProductReview        | vendor/spryker/product-review             |
| ProductReviewGui     | vendor/spryker/product-review-gui         |
| ProductReviewSearch  | vendor/spryker/product-review-search      |
| ProductReviewStorage | vendor/spryker/product-review-storage     |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events:

| AFFECTED ENTITY               | TRIGGERED EVENTS                                                                                                              |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| spy_product_review             | Entity.spy_product_review.create<br>Entity.spy_product_review.update<br>Entity.spy_product_review.delete                         |

**src/Pyz/Zed/ProductReview/Persistence/Propel/Schema/spy_product_review.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductReview\Persistence" package="src.Orm.Zed.ProductReview.Persistence">

   <table name="spy_product_review">
      <behavior name="event">
          <parameter name="spy_product_review_all" column="*"/>
      </behavior>
   </table>

</database>
```

2. Apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY                     | TYPE   | EVENT   |
|-------------------------------------|--------|---------|
| spy_product_review                  | table  | created |
| spy_product_abstract_review_storage | table  | created |
| spy_product_review_search           | table  | created |

Make sure that propel entities have been generated successfully by checking their existence. Also, make generated entity classes extending respective Spryker core classes:

| CLASS NAMESPACE                                                                | EXTENDS                                                                                           |
|--------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| \Orm\Zed\ProductReview\Persistence\SpyProductReview                            | \Spryker\Zed\ProductReview\Persistence\Propel\AbstractSpyProductReview                            |
| \Orm\Zed\ProductReview\Persistence\SpyProductReviewQuery                       | \Spryker\Zed\ProductReview\Persistence\Propel\AbstractSpyProductReviewQuery                       |
| \Orm\Zed\ProductReviewStorage\Persistence\SpyProductAbstractReviewStorage      | \Spryker\Zed\ProductReviewStorage\Persistence\Propel\AbstractSpyProductAbstractReviewStorage      |
| \Orm\Zed\ProductReviewStorage\Persistence\SpyProductAbstractReviewStorageQuery | \Spryker\Zed\ProductReviewStorage\Persistence\Propel\AbstractSpyProductAbstractReviewStorageQuery |
| \Orm\Zed\ProductReviewSearch\Persistence\SpyProductReviewSearch                | \Spryker\Zed\ProductReviewSearch\Persistence\Propel\AbstractSpyProductReviewSearch                |
| \Orm\Zed\ProductReviewSearch\Persistence\SpyProductReviewSearchQuery           | \Spryker\Zed\ProductReviewSearch\Persistence\Propel\AbstractSpyProductReviewSearchQuery           |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                       | TYPE  | EVENT   | PATH                                                                 |
|--------------------------------|-------|---------|----------------------------------------------------------------------|
| ProductReview                  | class | created | src/Generated/Shared/Transfer/ProductReviewTransfer                  |
| ProductReviewRequest           | class | created | src/Generated/Shared/Transfer/ProductReviewRequestTransfer           |
| ProductReviewError             | class | created | src/Generated/Shared/Transfer/ProductReviewErrorTransfer             |
| ProductReviewResponse          | class | created | src/Generated/Shared/Transfer/ProductReviewResponseTransfer          |
| ProductReviewSearchConfig      | class | created | src/Generated/Shared/Transfer/ProductReviewSearchConfigTransfer      |
| ProductReviewSearchRequest     | class | created | src/Generated/Shared/Transfer/ProductReviewSearchRequestTransfer     |
| BulkProductReviewSearchRequest | class | created | src/Generated/Shared/Transfer/BulkProductReviewSearchRequestTransfer |
| Filter                         | class | created | src/Generated/Shared/Transfer/FilterTransfer                         |
| ProductAbstractReview          | class | created | src/Generated/Shared/Transfer/ProductAbstractReviewTransfer          |
| PaginationSearchResult         | class | created | src/Generated/Shared/Transfer/PaginationSearchResultTransfer         |
| FacetConfig                    | class | created | src/Generated/Shared/Transfer/FacetConfigTransfer                    |
| SortConfig                     | class | created | src/Generated/Shared/Transfer/SortConfigTransfer                     |
| PaginationConfig               | class | created | src/Generated/Shared/Transfer/PaginationConfigTransfer               |
| Locale                         | class | created | src/Generated/Shared/Transfer/LocaleTransfer                         |
| Store                          | class | created | src/Generated/Shared/Transfer/StoreTransfer                         |
| SearchContext                  | class | created | src/Generated/Shared/Transfer/SearchContextTransfer                  |
| ProductView                    | class | created | src/Generated/Shared/Transfer/ProductViewTransfer                    |
| ProductReviewSummary           | class | created | src/Generated/Shared/Transfer/ProductReviewSummaryTransfer           |
| RatingAggregation              | class | created | src/Generated/Shared/Transfer/RatingAggregationTransfer              |
| EventEntity                    | class | created | src/Generated/Shared/Transfer/EventEntityTransfer                    |
| ProductConcrete                | class | created | src/Generated/Shared/Transfer/ProductConcreteTransfer                |
| AddReviews                     | class | created | src/Generated/Shared/Transfer/AddReviewsTransfer                     |
| Review                         | class | created | src/Generated/Shared/Transfer/ReviewTransfer                         |
| MessageAttributes              | class | created | src/Generated/Shared/Transfer/MessageAttributesTransfer              |
| ProductReviewSearch            | class | created | src/Generated/Shared/Transfer/ProductReviewSearchTransfer              |
| ProductPageSearch              | class | created | src/Generated/Shared/Transfer/ProductPageSearchTransfer              |
| ProductPayload                 | class | created | src/Generated/Shared/Transfer/ProductPayloadTransfer              |
| ProductPageLoad                | class | created | src/Generated/Shared/Transfer/ProductPageLoadTransfer              |
| PageMap                        | class | created | src/Generated/Shared/Transfer/PageMapTransfer              |
| ConcreteProductsRestAttributes | class | created | src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer              |
| AbstractProductsRestAttributes | class | created | src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer              |
| RestProductReviewsAttributes   | class | created | src/Generated/Shared/Transfer/RestProductReviewsAttributesTransfer              |
| ProductReviewSearchRequest     | class | created | src/Generated/Shared/Transfer/ProductReviewSearchRequestTransfer              |
| BulkProductReviewSearchRequest | class | created | src/Generated/Shared/Transfer/BulkProductReviewSearchRequestTransfer              |
| ProductReviewResponse          | class | created | src/Generated/Shared/Transfer/ProductReviewResponseTransfer              |
| RestUser                       | class | created | src/Generated/Shared/Transfer/RestUserTransfer              |
| RestUser                       | class | created | src/Generated/Shared/Transfer/RestUserTransfer              |
| ProductReviewStorage           | class | created | src/Generated/Shared/Transfer/ProductReviewStorageTransfer              |
| RestErrorMessage               | class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer              |
| ProductReviewError             | class | created | src/Generated/Shared/Transfer/ProductReviewErrorTransfer              |
| SynchronizationData            | class | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer              |

{% endinfo_block %}

### 3) Import product reviews

For details about this step, see [Ratings and Reviews data import](/docs/pbc/all/ratings-reviews/latest/import-and-export-data/ratings-and-reviews-data-import.html).

### 4) Add translations

1. Append the glossary according to your configuration:

```csv
product_review.product_ratings,Product Ratings,en_US
product_review.product_ratings,Product Bewertungen,de_DE
product_review.product_reviews,Product Reviews,en_US
product_review.product_reviews,Product Bewertungen,de_DE
product_review.on,on,en_US
product_review.on,am,de_DE
product_review.summary.star,star,en_US
product_review.summary.star,Stern,de_DE
product_review.summary.stars,stars,en_US
product_review.summary.stars,Sterne,de_DE
product_review.summary.out_of,out of,en_US
product_review.summary.out_of,von,de_DE
product_review.summary.review,review,en_US
product_review.summary.review,Bewertung,de_DE
product_review.summary.reviews,reviews,en_US
product_review.summary.reviews,Bewertungen,de_DE
product_review.no_reviews,No review for this product yet,en_US
product_review.no_reviews,Dieses Produkt hat noch keine Bewertung,de_DE
product_review.submit.add_a_review,Add a Review,en_US
product_review.submit.add_a_review,Bewertung Abgeben,de_DE
product_review.submit.rating,Rating,en_US
product_review.submit.rating,Bewertung,de_DE
product_review.submit.rating.none,No rating was selected,en_US
product_review.submit.rating.none,Es wurde keine Bewertung ausgewählt,de_DE
product_review.submit.summary,Summary,en_US
product_review.submit.summary,Überschrift,de_DE
product_review.submit.description,Description,en_US
product_review.submit.description,Rezension,de_DE
product_review.submit.nickname,Name,en_US
product_review.submit.nickname,Name,de_DE
product_review.submit.success,Product review was successfully submitted.,en_US
product_review.submit.success,Produktrezension wurde erfolgreich versendet.,de_DE
product_review.error.no_customer,Please login to access this feature.,en_US
product_review.error.no_customer,"Bitte melden Sie sich an, um Zugiff auf dieses Feature zu erhalten.",de_DE
product_review.error.invalid_rating,Product rating should be selected.,en_US
product_review.error.invalid_rating,Produktbewertung soll ausgewählt werden.,de_DE
 ```

2. Import data:

```bash
console data:import glossary
```

### 5) Configure export to Elasticsearch

1. In `SearchElasticsearchConfig`, adjust the Elasicsearch config:

**src/Pyz/Shared/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
<?php

namespace Pyz\Shared\SearchElasticsearch;

use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'product-review',
    ];
}
```

2. Set up a new source for Product Reviews:

```bash
console search:setup:source-map
```

3. In `\Pyz\Zed\StoreStorage\StoreStorageConfig`, adjust the `StoreStorage` module's configuration:

**src/Pyz/Zed/StoreStorage/StoreStorageConfig.php**

```php
<?php

namespace Pyz\Zed\StoreStorage;

use Spryker\Shared\ProductReviewSearch\ProductReviewSearchConfig;
use Spryker\Zed\StoreStorage\StoreStorageConfig as SprykerStoreStorageConfig;

class StoreStorageConfig extends SprykerStoreStorageConfig
{
    /**
     * @return array<string>
     */
    public function getStoreCreationResourcesToReSync(): array
    {
        return [
            ProductReviewSearchConfig::PRODUCT_REVIEW_RESOURCE_NAME,
        ];
    }
}
```

4. Configure the synchronization pool and event queue name:

**src/Pyz/Zed/ProductReviewSearch/ProductReviewSearchConfig.php**

```php
<?php

namespace Pyz\Zed\ProductReviewSearch;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\ProductReviewSearch\ProductReviewSearchConfig as SprykerProductReviewSearchConfig;

class ProductReviewSearchConfig extends SprykerProductReviewSearchConfig
{
    /**
     * @return string|null
     */
    public function getProductReviewSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

5. Add synchronization plugins:

| PLUGIN                                   | SPECIFICATION                                                                    | PREREQUISITES | NAMESPACE                                                            |
|------------------------------------------|----------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|
| ProductReviewSynchronizationDataPlugin   | Allows synchronizing the product review search table content into Elasticsearch. | None          | Spryker\Zed\ProductReviewSearch\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductReviewSearch\Communication\Plugin\Synchronization\ProductReviewSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductReviewSynchronizationDataPlugin(),
        ];
    }
}
```

6. Enable event trigger plugins to be able to re-trigger publish events:

| PLUGIN                                            | SPECIFICATION                                                                    | PREREQUISITES | NAMESPACE                                                  |
|---------------------------------------------------|----------------------------------------------------------------------------------|---------------|------------------------------------------------------------|
| ProductReviewEventResourceQueryContainerPlugin    | Allows synchronizing the product review search table content with Elasticsearch. | None          | Spryker\Zed\ProductReviewSearch\Communication\Plugin\Event |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\ProductReviewSearch\Communication\Plugin\Event\ProductReviewEventResourceQueryContainerPlugin;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface>
     */
    protected function getEventTriggerResourcePlugins(): array
    {
        return [
            new ProductReviewEventResourceQueryContainerPlugin(),
        ];
    }
}
```

7. Register the event subscriber:

| PLUGIN                              | SPECIFICATION                                  | PREREQUISITES | NAMESPACE                                                                         |
|-------------------------------------|------------------------------------------------|---------------|-----------------------------------------------------------------------------------|
| ProductReviewSearchEventSubscriber  | Registers listeners for product review entity. | None          | Spryker\Zed\ProductReviewSearch\Communication\Plugin\Event\Subscriber        |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductReviewSearch\Communication\Plugin\Event\Subscriber\ProductReviewSearchEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection(): EventSubscriberCollectionInterface
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();

        $eventSubscriberCollection->add(new ProductReviewSearchEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

8. Register product page data expander, data loader, and map expander plugins:

| PLUGIN                                   | SPECIFICATION                                                     | PREREQUISITES | NAMESPACE                                                                            |
|------------------------------------------|-------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------|
| ProductReviewDataLoaderExpanderPlugin    | Expands the provided object with review details.                  | None          | Spryker\Zed\ProductReviewSearch\Communication\Plugin\PageDataExpander                |
| ProductReviewPageDataLoaderPlugin        | Expands the provided object with review details.                  | None          | Spryker\Zed\ProductReviewSearch\Communication\Plugin\PageDataLoader                  |
| ProductReviewMapExpanderPlugin           | Adds product review data related to product abstract search data. | None          | Spryker\Zed\ProductReviewSearch\Communication\Plugin\ProductPageSearch\Elasticsearch |

<details><summary>src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Shared\ProductReviewSearch\ProductReviewSearchConfig;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;
use Spryker\Zed\ProductReviewSearch\Communication\Plugin\PageDataExpander\ProductReviewDataLoaderExpanderPlugin;
use Spryker\Zed\ProductReviewSearch\Communication\Plugin\PageDataLoader\ProductReviewPageDataLoaderPlugin;
use Spryker\Zed\ProductReviewSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductReviewMapExpanderPlugin;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{

    /**
     * @return array<\Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface>|array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataExpanderPluginInterface>
     */
    protected function getDataExpanderPlugins(): array
    {
        $dataExpanderPlugins = [];

        $dataExpanderPlugins[ProductReviewSearchConfig::PLUGIN_PRODUCT_PAGE_RATING_DATA] = new ProductReviewDataLoaderExpanderPlugin();

        return $dataExpanderPlugins;
    }

    /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface>
     */
    protected function getDataLoaderPlugins(): array
    {
        return [
            new ProductReviewPageDataLoaderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface>
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new ProductReviewMapExpanderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

1. Fill the `spy_product_review` table with some data and run `console event:trigger -r product_review`.
2. Make sure that the `spy_product_review_search` table is filled with respective data.
3. Make sure that the `spy_product_abstract_page_search` table entry from the product review has changed.
4. In the `spy_product_review_search` table, change some records and run `console sync:data product_review`.
5. Make sure that your changes have been synced to the respective Elasticsearch document.

{% endinfo_block %}

### 5) Configure export to the key-value store (Redis or Valkey)

Configure tables to be published and synchronized to the Storage on create, edit, and delete changes:

1. Configure synchronization pool and event queue name:

**src/Pyz/Zed/ProductReviewStorage/ProductReviewStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ProductReviewStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\ProductReviewStorage\ProductReviewStorageConfig as SprykerProductReviewStorageConfig;

class ProductReviewStorageConfig extends SprykerProductReviewStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductAbstractReviewSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

2. Add synchronization plugins:

| PLUGIN                                   | SPECIFICATION                                                            | PREREQUISITES | NAMESPACE                                                             |
|------------------------------------------|--------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| ProductReviewSynchronizationDataPlugin   | Allows synchronizing the product review search table content into the key-value store (Redis or Valkey). | None          | Spryker\Zed\ProductReviewStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductReviewStorage\Communication\Plugin\Synchronization\ProductReviewSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductReviewSynchronizationDataPlugin(),
        ];
    }
}
```

3. Enable event trigger plugins to be able to re-trigger publish events:

| PLUGIN                                            | SPECIFICATION                                                                      | PREREQUISITES | NAMESPACE                                                   |
|---------------------------------------------------|------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------|
| ProductReviewEventResourceQueryContainerPlugin    | Allows synchronizing the product abstract review storage table content with the key-value store (Redis or Valkey). | None          | Spryker\Zed\ProductReviewStorage\Communication\Plugin\Event |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\ProductReviewStorage\Communication\Plugin\Event\ProductReviewEventResourceQueryContainerPlugin;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface>
     */
    protected function getEventTriggerResourcePlugins(): array
    {
        return [
            new ProductReviewEventResourceQueryContainerPlugin(),
        ];
    }
}
```

4. Register the event subscriber:

| PLUGIN                              | SPECIFICATION                                  | PREREQUISITES | NAMESPACE                                                              |
|-------------------------------------|------------------------------------------------|---------------|------------------------------------------------------------------------|
| ProductReviewStorageEventSubscriber  | Registers listeners for product review entity. | None          | Spryker\Zed\ProductReviewStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductReviewStorage\Communication\Plugin\Event\Subscriber\ProductReviewStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection(): EventSubscriberCollectionInterface
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();

        $eventSubscriberCollection->add(new ProductReviewStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

{% info_block warningBox "Verification" %}

1. Fill the `spy_product_review` table with some data and run `console event:trigger -r product_abstract_review`.
2. Make sure that the `spy_product_abstract_review_storage` table is filled with respective data.
3. In the `spy_product_abstract_review_storage` table, change some records and run `console sync:data product_abstract_review`.
4. Make sure that your changes have been synced to the key-value store (Redis or Valkey).

{% endinfo_block %}

### 6) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN                             | SPECIFICATION                                       | PREREQUISITES | NAMESPACE                                   |
|------------------------------------|-----------------------------------------------------|---------------|---------------------------------------------|
| DisplayProductAbstractReviewWidget | Displays the product abstract review.               | None          | SprykerShop\Yves\ProductReviewWidget\Widget |
| ProductDetailPageReviewWidget      | Displays the product review on a product details page. | None          | SprykerShop\Yves\ProductReviewWidget\Widget |
| ProductRatingFilterWidget          | Displays the product rating filter.                 | None          | SprykerShop\Yves\ProductReviewWidget\Widget |
| ProductReviewDisplayWidget         | Displays the product review rating.                 | None          | SprykerShop\Yves\ProductReviewWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductReviewWidget\Widget\DisplayProductAbstractReviewWidget;
use SprykerShop\Yves\ProductReviewWidget\Widget\ProductDetailPageReviewWidget;
use SprykerShop\Yves\ProductReviewWidget\Widget\ProductRatingFilterWidget;
use SprykerShop\Yves\ProductReviewWidget\Widget\ProductReviewDisplayWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            DisplayProductAbstractReviewWidget::class,
            ProductDetailPageReviewWidget::class,
            ProductRatingFilterWidget::class,
            ProductReviewDisplayWidget::class,
        ];
    }
}
```

2. Register the widget routes:

| PLUGIN                                  | SPECIFICATION                                       | PREREQUISITES | NAMESPACE                                   |
|-----------------------------------------|-----------------------------------------------------|---------------|---------------------------------------------|
| ProductReviewWidgetRouteProviderPlugin  | Registers routes.                                   | None          | SprykerShop\Yves\ProductReviewWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\ProductReviewWidget\Plugin\Router\ProductReviewWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
           new ProductReviewWidgetRouteProviderPlugin(),
        ];

        return $routeProviders;
    }
}
```

3. Register expander plugins if you use product group widget:

| PLUGIN                                            | SPECIFICATION                                                                                             | PREREQUISITES | NAMESPACE                                                      |
|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------|
| ProductReviewStorageProductViewExpanderPlugin | Expands `ProductViewTransfer` objects with product review rating data.                                    | None          | SprykerShop\Yves\ProductReviewWidget\Plugin\ProductGroupWidget |

**src/Pyz/Yves/ProductGroupWidget/ProductGroupWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ProductGroupWidget;

use SprykerShop\Yves\ProductGroupWidget\ProductGroupWidgetDependencyProvider as SprykerShopProductGroupWidgetDependencyProvider;
use SprykerShop\Yves\ProductReviewWidget\Plugin\ProductGroupWidget\ProductReviewStorageProductViewExpanderPlugin;

class ProductGroupWidgetDependencyProvider extends SprykerShopProductGroupWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ProductGroupWidgetExtension\Dependency\Plugin\ProductViewBulkExpanderPluginInterface>
     */
    protected function getProductViewBulkExpanderPlugins(): array
    {
        return [
            new ProductReviewStorageProductViewExpanderPlugin(),
        ];
    }
}
```

### 7) Set up behavior

1. To enable the Glue API, register the plugins:

| PLUGIN                                            | SPECIFICATION                                     | PREREQUISITES | NAMESPACE                                                   |
|---------------------------------------------------|---------------------------------------------------|---------------|-------------------------------------------------------------|
| AbstractProductsProductReviewsResourceRoutePlugin | Registers the `product-reviews` resource.         |               | \Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication  |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication\AbstractProductsProductReviewsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductsProductReviewsResourceRoutePlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that the following endpoints are available:

`https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/product-reviews`

<details>
<summary>Example</summary>

```json
{
    "data": [
        {
            "type": "product-reviews",
            "id": "21",
            "attributes": {
                "rating": 4,
                "nickname": "Spencor",
                "summary": "Donec vestibulum lectus ligula",
                "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/21"
            }
        },
        {
            "type": "product-reviews",
            "id": "22",
            "attributes": {
                "rating": 4,
                "nickname": "Maria",
                "summary": "Curabitur varius, dui ac vulputate ullamcorper",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mauris consequat, dictum metus id, facilisis quam. Vestibulum imperdiet aliquam interdum. Pellentesque tempus at neque sed laoreet. Nam elementum vitae nunc fermentum suscipit. Suspendisse finibus risus at sem pretium ullamcorper. Donec rutrum nulla nec massa tristique, porttitor gravida risus feugiat. Ut aliquam turpis nisi."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/22"
            }
        },
        {
            "type": "product-reviews",
            "id": "23",
            "attributes": {
                "rating": 4,
                "nickname": "Maggie",
                "summary": "Aliquam erat volutpat",
                "description": "Morbi vitae ultricies libero. Aenean id lectus a elit sollicitudin commodo. Donec mattis libero sem, eu convallis nulla rhoncus ac. Nam tincidunt volutpat sem, eu congue augue cursus at. Mauris augue lorem, lobortis eget varius at, iaculis ac velit. Sed vulputate rutrum lorem, ut rhoncus dolor commodo ac. Aenean sed varius massa. Quisque tristique orci nec blandit fermentum. Sed non vestibulum ante, vitae tincidunt odio. Integer quis elit eros. Phasellus tempor dolor lectus, et egestas magna convallis quis. Ut sed odio nulla. Suspendisse quis laoreet nulla. Integer quis justo at velit euismod imperdiet. Ut orci dui, placerat ut ex ac, lobortis ullamcorper dui. Etiam euismod risus hendrerit laoreet auctor."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/23"
            }
        },
        {
            "type": "product-reviews",
            "id": "25",
            "attributes": {
                "rating": 3,
                "nickname": "Spencor",
                "summary": "Curabitur ultricies, sapien quis placerat lacinia",
                "description": "Etiam venenatis sit amet lorem eget tristique. Donec rutrum massa nec commodo cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse scelerisque scelerisque augue eget condimentum. Quisque quis arcu consequat, lacinia nulla tempor, venenatis ante. In ullamcorper, orci sit amet tempus tincidunt, massa augue molestie enim, in finibus metus odio at purus. Mauris ut semper sem, a ornare sapien. Fusce eget facilisis felis. Integer imperdiet massa a tortor varius, tincidunt laoreet ipsum viverra."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/25"
            }
        },
        {
            "type": "product-reviews",
            "id": "26",
            "attributes": {
                "rating": 5,
                "nickname": "Spencor",
                "summary": "Cras porttitor",
                "description": "Cras porttitor, odio vel ultricies commodo, erat turpis pulvinar turpis, id faucibus dolor odio a tellus. Mauris et nibh tempus, convallis ipsum luctus, mollis risus. Donec molestie orci ante, id tristique diam interdum eget. Praesent erat neque, sollicitudin sit amet pellentesque eget, gravida in lectus. Donec ultrices, nisl in laoreet ultrices, nunc enim lacinia felis, ac convallis tortor ligula non eros. Morbi semper ipsum non elit mollis, non commodo arcu porta. Mauris tincidunt purus rutrum erat ornare, varius egestas eros eleifend."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/26"
            }
        }
    ],
    "links": {
        "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews?page[offset]=0&page[limit]=5",
        "last": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews?page[offset]=0&page[limit]=5",
        "first": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews?page[offset]=0&page[limit]=5"
    }
}
```

</details>

`https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/product-reviews/{% raw %}{{{% endraw %}review_id{% raw %}}}{% endraw %}`

<details>
<summary>Example</summary>

```json
{
  "data": {
    "type": "product-reviews",
    "id": "21",
    "attributes": {
      "rating": 4,
      "nickname": "Spencor",
      "summary": "Donec vestibulum lectus ligula",
      "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
    },
    "links": {
      "self": "http://glue.de.suite-nonsplit.local/abstract-products/139/product-reviews/21"
    }
  }
}
```

</details>

{% endinfo_block %}

1. To enable the Glue API relationships, register the plugins:

| PLUGIN                                                | SPECIFICATION                                                                       | PREREQUISITES | NAMESPACE                                                                                            |
|-------------------------------------------------------|-------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------|
| ProductReviewsRelationshipByProductAbstractSkuPlugin  | Adds the `product-reviews` relationship to the `abstract-products` resource.        |               | \Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication |
| ProductReviewsRelationshipByProductConcreteSkuPlugin  | Adds the `product-reviews` relationship to the `concrete-products` resource.        |               | \Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication\AbstractProductsProductReviewsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new ProductReviewsRelationshipByProductAbstractSkuPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ProductReviewsRelationshipByProductConcreteSkuPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

3. Register expander plugins:

| PLUGIN                                                | SPECIFICATION                                           | PREREQUISITES | NAMESPACE                                                  |
|-------------------------------------------------------|---------------------------------------------------------|---------------|------------------------------------------------------------|
| ProductReviewsAbstractProductsResourceExpanderPlugin  | Expands `abstract-products` resource with reviews data. |               | \Spryker\Glue\ProductReviewsRestApi\Plugin\ProductsRestApi |
| ProductReviewsConcreteProductsResourceExpanderPlugin  | Expands `concrete-products` resource with reviews data. |               | \Spryker\Glue\ProductReviewsRestApi\Plugin\ProductsRestApi |

**src/Pyz/Glue/ProductsRestApi/ProductsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductsRestApi;

use Spryker\Glue\ProductReviewsRestApi\Plugin\ProductsRestApi\ProductReviewsAbstractProductsResourceExpanderPlugin;
use Spryker\Glue\ProductReviewsRestApi\Plugin\ProductsRestApi\ProductReviewsConcreteProductsResourceExpanderPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiDependencyProvider as SprykerProductsRestApiDependencyProvider;

class ProductsRestApiDependencyProvider extends SprykerProductsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\ConcreteProductsResourceExpanderPluginInterface>
     */
    protected function getConcreteProductsResourceExpanderPlugins(): array
    {
        return [
            new ProductReviewsConcreteProductsResourceExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\AbstractProductsResourceExpanderPluginInterface>
     */
    protected function getAbstractProductsResourceExpanderPlugins(): array
    {
        return [
            new ProductReviewsAbstractProductsResourceExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make a request to `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=product-reviews`.

Make sure that the response contains product-reviews as a relationship and product-reviews data included.

Make sure that `averageRating` and `reviewCount` attributes are present in `concrete-products` and `abstract-products` resources attributes section.

<details><summary>Example</summary>

```json
{
  "data": {
    "type": "abstract-products",
    "id": "139",
    "attributes": {
      "sku": "139",
      "averageRating": 4,
      "reviewCount": 5,
      "name": "Asus Transformer Book T200TA",
      "description": "As light as you like Transformer Book T200 is sleek, slim and oh so light — just 26mm tall and 1.5kg docked. And when need to travel even lighter, detach the 11.6-inch tablet for 11.95mm slenderness and a mere 750g weight! With up to 10.4 hours of battery life that lasts all day long, you're free to work or play from dawn to dusk. And ASUS Instant On technology ensures that Transformer Book T200 is always responsive and ready for action! Experience outstanding performance from the latest Intel® quad-core processor. You'll multitask seamlessly and get more done in less time. Transformer Book T200 also delivers exceptional graphics performance — with Intel HD graphics that are up to 30% faster than ever before! Transformer Book T200 is equipped with USB 3.0 connectivity for data transfers that never leave you waiting. Just attach your USB 3.0 devices to enjoy speeds that are up to 10X faster than USB 2.0!",
      "attributes": {
        "product_type": "Hybrid (2-in-1)",
        "form_factor": "clamshell",
        "processor_cache_type": "2",
        "processor_frequency": "1.59 GHz",
        "brand": "Asus",
        "color": "Black"
      },
      "superAttributesDefinition": [
        "form_factor",
        "processor_frequency",
        "color"
      ],
      "superAttributes": [],
      "attributeMap": {
        "product_concrete_ids": [
          "139_24699831"
        ],
        "super_attributes": [],
        "attribute_variants": []
      },
      "metaTitle": "Asus Transformer Book T200TA",
      "metaKeywords": "Asus,Entertainment Electronics",
      "metaDescription": "As light as you like Transformer Book T200 is sleek, slim and oh so light — just 26mm tall and 1.5kg docked. And when need to travel even lighter, detach t",
      "attributeNames": {
        "product_type": "Product type",
        "form_factor": "Form factor",
        "processor_cache_type": "Processor cache",
        "processor_frequency": "Processor frequency",
        "brand": "Brand",
        "color": "Color"
      },
      "url": "/en/asus-transformer-book-t200ta-139"
    },
    "links": {
      "self": "http://glue.de.suite-nonsplit.local/abstract-products/139?include=product-reviews"
    },
    "relationships": {
      "product-reviews": {
        "data": [
          {
            "type": "product-reviews",
            "id": "21"
          },
          {
            "type": "product-reviews",
            "id": "22"
          },
          {
            "type": "product-reviews",
            "id": "23"
          },
          {
            "type": "product-reviews",
            "id": "25"
          },
          {
            "type": "product-reviews",
            "id": "26"
          }
        ]
      }
    }
  },
  "included": [
    {
      "type": "product-reviews",
      "id": "21",
      "attributes": {
        "rating": 4,
        "nickname": "Spencor",
        "summary": "Donec vestibulum lectus ligula",
        "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
      },
      "links": {
        "self": "http://glue.de.suite-nonsplit.local/product-reviews/21"
      }
    },
    {
      "type": "product-reviews",
      "id": "22",
      "attributes": {
        "rating": 4,
        "nickname": "Maria",
        "summary": "Curabitur varius, dui ac vulputate ullamcorper",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mauris consequat, dictum metus id, facilisis quam. Vestibulum imperdiet aliquam interdum. Pellentesque tempus at neque sed laoreet. Nam elementum vitae nunc fermentum suscipit. Suspendisse finibus risus at sem pretium ullamcorper. Donec rutrum nulla nec massa tristique, porttitor gravida risus feugiat. Ut aliquam turpis nisi."
      },
      "links": {
        "self": "http://glue.de.suite-nonsplit.local/product-reviews/22"
      }
    },
    {
      "type": "product-reviews",
      "id": "23",
      "attributes": {
        "rating": 4,
        "nickname": "Maggie",
        "summary": "Aliquam erat volutpat",
        "description": "Morbi vitae ultricies libero. Aenean id lectus a elit sollicitudin commodo. Donec mattis libero sem, eu convallis nulla rhoncus ac. Nam tincidunt volutpat sem, eu congue augue cursus at. Mauris augue lorem, lobortis eget varius at, iaculis ac velit. Sed vulputate rutrum lorem, ut rhoncus dolor commodo ac. Aenean sed varius massa. Quisque tristique orci nec blandit fermentum. Sed non vestibulum ante, vitae tincidunt odio. Integer quis elit eros. Phasellus tempor dolor lectus, et egestas magna convallis quis. Ut sed odio nulla. Suspendisse quis laoreet nulla. Integer quis justo at velit euismod imperdiet. Ut orci dui, placerat ut ex ac, lobortis ullamcorper dui. Etiam euismod risus hendrerit laoreet auctor."
      },
      "links": {
        "self": "http://glue.de.suite-nonsplit.local/product-reviews/23"
      }
    },
    {
      "type": "product-reviews",
      "id": "25",
      "attributes": {
        "rating": 3,
        "nickname": "Spencor",
        "summary": "Curabitur ultricies, sapien quis placerat lacinia",
        "description": "Etiam venenatis sit amet lorem eget tristique. Donec rutrum massa nec commodo cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse scelerisque scelerisque augue eget condimentum. Quisque quis arcu consequat, lacinia nulla tempor, venenatis ante. In ullamcorper, orci sit amet tempus tincidunt, massa augue molestie enim, in finibus metus odio at purus. Mauris ut semper sem, a ornare sapien. Fusce eget facilisis felis. Integer imperdiet massa a tortor varius, tincidunt laoreet ipsum viverra."
      },
      "links": {
        "self": "http://glue.de.suite-nonsplit.local/product-reviews/25"
      }
    },
    {
      "type": "product-reviews",
      "id": "26",
      "attributes": {
        "rating": 5,
        "nickname": "Spencor",
        "summary": "Cras porttitor",
        "description": "Cras porttitor, odio vel ultricies commodo, erat turpis pulvinar turpis, id faucibus dolor odio a tellus. Mauris et nibh tempus, convallis ipsum luctus, mollis risus. Donec molestie orci ante, id tristique diam interdum eget. Praesent erat neque, sollicitudin sit amet pellentesque eget, gravida in lectus. Donec ultrices, nisl in laoreet ultrices, nunc enim lacinia felis, ac convallis tortor ligula non eros. Morbi semper ipsum non elit mollis, non commodo arcu porta. Mauris tincidunt purus rutrum erat ornare, varius egestas eros eleifend."
      },
      "links": {
        "self": "http://glue.de.suite-nonsplit.local/product-reviews/26"
      }
    }
  ]
}
```

</details>

Make a request to `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=product-reviews`.

Make sure that the response contains product-reviews as a relationship and product-reviews data included.

<details>
<summary>Example</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "139_24699831",
        "attributes": {
            "sku": "139_24699831",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": 4,
            "reviewCount": 5,
            "name": "Asus Transformer Book T200TA",
            "description": "As light as you like Transformer Book T200 is sleek, slim and oh so light — just 26mm tall and 1.5kg docked. And when need to travel even lighter, detach the 11.6-inch tablet for 11.95mm slenderness and a mere 750g weight! With up to 10.4 hours of battery life that lasts all day long, you're free to work or play from dawn to dusk. And ASUS Instant On technology ensures that Transformer Book T200 is always responsive and ready for action! Experience outstanding performance from the latest Intel® quad-core processor. You'll multitask seamlessly and get more done in less time. Transformer Book T200 also delivers exceptional graphics performance — with Intel HD graphics that are up to 30% faster than ever before! Transformer Book T200 is equipped with USB 3.0 connectivity for data transfers that never leave you waiting. Just attach your USB 3.0 devices to enjoy speeds that are up to 10X faster than USB 2.0!",
            "attributes": {
                "product_type": "Hybrid (2-in-1)",
                "form_factor": "clamshell",
                "processor_cache_type": "2",
                "processor_frequency": "1.59 GHz",
                "brand": "Asus",
                "color": "Black"
            },
            "superAttributesDefinition": [
                "form_factor",
                "processor_frequency",
                "color"
            ],
            "metaTitle": "Asus Transformer Book T200TA",
            "metaKeywords": "Asus,Entertainment Electronics",
            "metaDescription": "As light as you like Transformer Book T200 is sleek, slim and oh so light — just 26mm tall and 1.5kg docked. And when need to travel even lighter, detach t",
            "attributeNames": {
                "product_type": "Product type",
                "form_factor": "Form factor",
                "processor_cache_type": "Processor cache",
                "processor_frequency": "Processor frequency",
                "brand": "Brand",
                "color": "Color"
            }
        },
        "links": {
            "self": "http://glue.de.suite-nonsplit.local/concrete-products/139_24699831?include=product-reviews"
        },
        "relationships": {
            "product-reviews": {
                "data": [
                    {
                        "type": "product-reviews",
                        "id": "21"
                    },
                    {
                        "type": "product-reviews",
                        "id": "22"
                    },
                    {
                        "type": "product-reviews",
                        "id": "23"
                    },
                    {
                        "type": "product-reviews",
                        "id": "25"
                    },
                    {
                        "type": "product-reviews",
                        "id": "26"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-reviews",
            "id": "21",
            "attributes": {
                "rating": 4,
                "nickname": "Spencor",
                "summary": "Donec vestibulum lectus ligula",
                "description": "Donec vestibulum lectus ligula, non aliquet neque vulputate vel. Integer neque massa, ornare sit amet felis vitae, pretium feugiat magna. Suspendisse mollis rutrum ante, vitae gravida ipsum commodo quis. Donec eleifend orci sit amet nisi suscipit pulvinar. Nullam ullamcorper dui lorem, nec vehicula justo accumsan id. Sed venenatis magna at posuere maximus. Sed in mauris mauris. Curabitur quam ex, vulputate ac dignissim ac, auctor eget lorem. Cras vestibulum ex quis interdum tristique."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/21"
            }
        },
        {
            "type": "product-reviews",
            "id": "22",
            "attributes": {
                "rating": 4,
                "nickname": "Maria",
                "summary": "Curabitur varius, dui ac vulputate ullamcorper",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mauris consequat, dictum metus id, facilisis quam. Vestibulum imperdiet aliquam interdum. Pellentesque tempus at neque sed laoreet. Nam elementum vitae nunc fermentum suscipit. Suspendisse finibus risus at sem pretium ullamcorper. Donec rutrum nulla nec massa tristique, porttitor gravida risus feugiat. Ut aliquam turpis nisi."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/22"
            }
        },
        {
            "type": "product-reviews",
            "id": "23",
            "attributes": {
                "rating": 4,
                "nickname": "Maggie",
                "summary": "Aliquam erat volutpat",
                "description": "Morbi vitae ultricies libero. Aenean id lectus a elit sollicitudin commodo. Donec mattis libero sem, eu convallis nulla rhoncus ac. Nam tincidunt volutpat sem, eu congue augue cursus at. Mauris augue lorem, lobortis eget varius at, iaculis ac velit. Sed vulputate rutrum lorem, ut rhoncus dolor commodo ac. Aenean sed varius massa. Quisque tristique orci nec blandit fermentum. Sed non vestibulum ante, vitae tincidunt odio. Integer quis elit eros. Phasellus tempor dolor lectus, et egestas magna convallis quis. Ut sed odio nulla. Suspendisse quis laoreet nulla. Integer quis justo at velit euismod imperdiet. Ut orci dui, placerat ut ex ac, lobortis ullamcorper dui. Etiam euismod risus hendrerit laoreet auctor."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/23"
            }
        },
        {
            "type": "product-reviews",
            "id": "25",
            "attributes": {
                "rating": 3,
                "nickname": "Spencor",
                "summary": "Curabitur ultricies, sapien quis placerat lacinia",
                "description": "Etiam venenatis sit amet lorem eget tristique. Donec rutrum massa nec commodo cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse scelerisque scelerisque augue eget condimentum. Quisque quis arcu consequat, lacinia nulla tempor, venenatis ante. In ullamcorper, orci sit amet tempus tincidunt, massa augue molestie enim, in finibus metus odio at purus. Mauris ut semper sem, a ornare sapien. Fusce eget facilisis felis. Integer imperdiet massa a tortor varius, tincidunt laoreet ipsum viverra."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/25"
            }
        },
        {
            "type": "product-reviews",
            "id": "26",
            "attributes": {
                "rating": 5,
                "nickname": "Spencor",
                "summary": "Cras porttitor",
                "description": "Cras porttitor, odio vel ultricies commodo, erat turpis pulvinar turpis, id faucibus dolor odio a tellus. Mauris et nibh tempus, convallis ipsum luctus, mollis risus. Donec molestie orci ante, id tristique diam interdum eget. Praesent erat neque, sollicitudin sit amet pellentesque eget, gravida in lectus. Donec ultrices, nisl in laoreet ultrices, nunc enim lacinia felis, ac convallis tortor ligula non eros. Morbi semper ipsum non elit mollis, non commodo arcu porta. Mauris tincidunt purus rutrum erat ornare, varius egestas eros eleifend."
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-reviews/26"
            }
        }
    ]
}
```

</details>

{% endinfo_block %}
