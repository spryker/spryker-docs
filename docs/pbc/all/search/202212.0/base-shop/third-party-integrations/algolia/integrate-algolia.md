---
title: Integrate Algolia
description: Find out how you can integrate Algolia into your Spryker shop
template: howto-guide-template
last_updated: Feb 23, 2023
redirect_from:
  - /docs/pbc/all/search/202212.0/third-party-integrations/integrate-algolia.html
  - /docs/pbc/all/search/202307.0/base-shop/third-party-integrations/integrate-algolia.html
---

This document describes how to integrate [Algolia](/docs/pbc/all/search/{{page.version}}/base-shop/third-party-integrations/algolia.html) into a Spryker shop.

## Prerequisites

Before you can integrate the Algolia app, make sure that your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

The Algolia app requires the following Spryker modules:

* `spryker/catalog: "^5.8.0"`
* `spryker/catalog-extension: "^1.0.0"`
* `spryker/catalog-price-product-connector: "^1.4.0"`
* `spryker/category: "^5.11.0"`
* `spryker/category-storage: "^2.5.0"`
* `spryker/price-product: "^4.40.0"`
* `spryker/product: "^6.32.0"`
* `spryker/product-approval: "^1.1.0"` (Optional)
* `spryker/product-category: "^4.19.0"`
* `spryker/product-extension: "^1.5.0"`
* `spryker/product-image: "^3.13.0"`
* `spryker/product-label "^3.8.0"`
* `spryker/product-label-storage "^2.6.0"`
* `spryker/product-review: "^2.9.0"`
* `spryker/search: "^8.19.3"`
* `spryker/search-http: "^0.3"`
* `spryker/store: "^1.18.0"`
* `spryker/merchant-product-offer: "^1.5.0"` (Marketplace only)
* `spryker/merchant-product-offer-data-import: "^1.1.0"` (Marketplace only)
* `spryker/merchant-product-offer-search: "^1.4.0"` (Marketplace only)
* `spryker/price-product-offer-data-import: "^0.7.1"` (Marketplace only)
* `spryker/product-offer: "^1.4.0"` (Marketplace only)


## Integrate Algolia

Follow these steps to integrate Algolia.

### 1. Configure shared configs

Add the following config to `config/Shared/config_default.php`:

```php
//...

use Generated\Shared\Transfer\InitializeProductExportTransfer;
use Generated\Shared\Transfer\ProductCreatedTransfer;
use Generated\Shared\Transfer\ProductDeletedTransfer;
use Generated\Shared\Transfer\ProductExportedTransfer;
use Generated\Shared\Transfer\ProductUpdatedTransfer;
use Generated\Shared\Transfer\SearchEndpointAvailableTransfer;
use Generated\Shared\Transfer\SearchEndpointRemovedTransfer;

//...

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    ProductExportedTransfer::class => 'product',
    ProductCreatedTransfer::class => 'product',
    ProductUpdatedTransfer::class => 'product',
    ProductDeletedTransfer::class => 'product',
    InitializeProductExportTransfer::class => 'product',
    SearchEndpointAvailableTransfer::class => 'search',
    SearchEndpointRemovedTransfer::class => 'search',
];

$config[MessageBrokerConstants::CHANNEL_TO_TRANSPORT_MAP] =
$config[MessageBrokerAwsConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'product' => MessageBrokerAwsConfig::SQS_TRANSPORT,
    'search' => MessageBrokerAwsConfig::SQS_TRANSPORT,
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...
    'product' => 'http',
];
```

### 2. Configure modules and dependencies

Configure modules and add and the necessary dependencies according to these guidelines.

#### Configure Catalog dependencies in `Client`

Add the following code to `src/Pyz/Client/Catalog/CatalogDependencyProvider.php`:

```php
//...

use Generated\Shared\Transfer\SearchContextTransfer;
use Generated\Shared\Transfer\SearchHttpSearchContextTransfer;
use Spryker\Client\CatalogPriceProductConnector\Plugin\Catalog\QueryExpander\ProductPriceSearchHttpQueryExpanderPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\Catalog\ResultFormatter\CurrencyAwareCatalogSearchHttpResultFormatterPlugin;
use Spryker\Client\CategoryStorage\Plugin\Catalog\ResultFormatter\CategoryTreeFilterSearchHttpResultFormatterPlugin;
use Spryker\Client\MerchantProductOfferSearch\Plugin\Catalog\MerchantReferenceSearchHttpQueryExpanderPlugin;
use Spryker\Client\ProductLabelStorage\Plugin\Catalog\ProductLabelSearchHttpFacetConfigTransferBuilderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\SearchHttpQueryPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\QueryExpander\BasicSearchHttpQueryExpanderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\QueryExpander\FacetSearchHttpQueryExpanderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\FacetSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\PaginationSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\ProductSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\SortSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\SpellingSuggestionSearchHttpResultFormatterPlugin;
use Spryker\Shared\SearchHttp\SearchHttpConfig;

//...

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider

//...

    /**
     * @return array<string, array<\Spryker\Client\Catalog\Dependency\Plugin\FacetConfigTransferBuilderPluginInterface>>
     */
    protected function getFacetConfigTransferBuilderPluginVariants(): array
    {
        return [
            SearchHttpConfig::TYPE_SEARCH_HTTP => [
                new CategoryFacetConfigTransferBuilderPlugin(),
                new PriceFacetConfigTransferBuilderPlugin(),
                new RatingFacetConfigTransferBuilderPlugin(),
                new ProductLabelSearchHttpFacetConfigTransferBuilderPlugin(),
            ],
        ];
    }

    /**
     * @phpstan-return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface>
     *
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryInterface>
     */
    protected function createCatalogSearchQueryPluginVariants(): array
    {
        $searchContextTransfer = (new SearchContextTransfer())
            ->setSourceIdentifier(SearchHttpConfig::SOURCE_IDENTIFIER_PRODUCT)
            ->setSearchHttpContext(new SearchHttpSearchContextTransfer());

        return [
            new SearchHttpQueryPlugin($searchContextTransfer),
        ];
    }

    /**
     * @return array<string, array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>>
     */
    protected function createCatalogSearchQueryExpanderPluginVariants(): array
    {
        return [
            SearchHttpConfig::TYPE_SEARCH_HTTP => [
                new BasicSearchHttpQueryExpanderPlugin(),
                new ProductPriceSearchHttpQueryExpanderPlugin(),
                new MerchantReferenceSearchHttpQueryExpanderPlugin(),
                new FacetSearchHttpQueryExpanderPlugin(),
            ],
        ];
    }

    /**
     * @return array<string, array<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>>
     */
    protected function createCatalogSearchResultFormatterPluginVariants(): array
    {
        return [
            SearchHttpConfig::TYPE_SEARCH_HTTP => [
                new PaginationSearchHttpResultFormatterPlugin(),
                new SortSearchHttpResultFormatterPlugin(),
                new CurrencyAwareCatalogSearchHttpResultFormatterPlugin(
                    new ProductSearchHttpResultFormatterPlugin(),
                ),
                new SpellingSuggestionSearchHttpResultFormatterPlugin(),
                new FacetSearchHttpResultFormatterPlugin(),
                new CategoryTreeFilterSearchHttpResultFormatterPlugin(),
            ],
        ];
    }

    //...
}
```

#### Adjust RabbitMq configuration in `Client`

Add the following code to `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`:

```php
//...

use Spryker\Shared\SearchHttp\SearchHttpConfig;

//...

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    //...

    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            //...
            SearchHttpConfig::SEARCH_HTTP_CONFIG_SYNC_QUEUE,
        ];
    }

    //...
}
```

#### Configure Search dependencies in `Client`

Add the following code to `src/Pyz/Client/Search/SearchDependencyProvider.php`:

```php
//...

use Spryker\Client\SearchHttp\Plugin\Search\SearchHttpSearchAdapterPlugin;
use Spryker\Client\SearchHttp\Plugin\Search\SearchHttpSearchContextExpanderPlugin;

//...

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    //...

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchAdapterPluginInterface>
     */
    protected function getClientAdapterPlugins(): array
    {
        return [
            new SearchHttpSearchAdapterPlugin(), # It is very important to put this plugin at the top of the list.
            //...
        ];
    }

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextExpanderPluginInterface>
     */
    protected function getSearchContextExpanderPlugins(): array
    {
        return [
            new SearchHttpSearchContextExpanderPlugin(), # It is very important to put this plugin at the top of the list.
            //...
        ];

    //...
}
```

#### Configure SearchHttp dependencies in `Client`

Add the following code to `src/Pyz/Client/SearchHttp/SearchHttpDependencyProvider.php`:

```php
<?php

namespace Pyz\Client\SearchHttp;

use Spryker\Client\Catalog\Plugin\ConfigTransferBuilder\CategoryFacetConfigTransferBuilderPlugin;
use Spryker\Client\Catalog\Plugin\SearchHttp\CatalogSearchHttpConfigBuilderPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\ConfigTransferBuilder\PriceFacetConfigTransferBuilderPlugin;
use Spryker\Client\MerchantProductSearch\Plugin\Search\MerchantProductMerchantNameSearchConfigExpanderPlugin;
use Spryker\Client\ProductLabelStorage\Plugin\ProductLabelFacetConfigTransferBuilderPlugin;
use Spryker\Client\ProductReview\Plugin\RatingFacetConfigTransferBuilderPlugin;
use Spryker\Client\ProductSearchConfigStorage\Plugin\Config\ProductSearchConfigExpanderPlugin;
use Spryker\Client\SearchHttp\SearchHttpDependencyProvider as SprykerSearchHttpDependencyProvider;

class SearchHttpDependencyProvider extends SprykerSearchHttpDependencyProvider
{
    /**
     * @return array<\Spryker\Client\Catalog\Dependency\Plugin\FacetConfigTransferBuilderPluginInterface>
     */
    protected function getFacetConfigTransferBuilders(): array
    {
        return [
            new CategoryFacetConfigTransferBuilderPlugin(),
            new PriceFacetConfigTransferBuilderPlugin(),
            new RatingFacetConfigTransferBuilderPlugin(),
            new ProductLabelFacetConfigTransferBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigBuilderPluginInterface>
     */
    protected function getSearchConfigBuilderPlugins(): array
    {
        return [
            new CatalogSearchHttpConfigBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface>
     */
    protected function getSearchConfigExpanderPlugins(): array
    {
        return [
            new ProductSearchConfigExpanderPlugin(),
            new MerchantProductMerchantNameSearchConfigExpanderPlugin(), # Marketplace only
        ];
    }
}
```

#### Configure MessageBroker dependencies in `Zed`

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`:

```php
//...

use Spryker\Zed\Product\Communication\Plugin\MessageBroker\InitializeProductExportMessageHandlerPlugin;
use Spryker\Zed\SearchHttp\Communication\Plugin\MessageBroker\SearchEndpointAvailableMessageHandlerPlugin;
use Spryker\Zed\SearchHttp\Communication\Plugin\MessageBroker\SearchEndpointRemovedMessageHandlerPlugin;

//...

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
  //...

  /**
    * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
    */
  public function getMessageHandlerPlugins(): array
  {
      return [
          //...
          new InitializeProductExportMessageHandlerPlugin(),
          new SearchEndpointAvailableMessageHandlerPlugin(),
          new SearchEndpointRemovedMessageHandlerPlugin(),
      ];
  }

  //...
}
```

#### Adjust MessageBroker configuration in `Zed`

Add the following to `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`:

```php
//...

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    //...

    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [/*... ,*/ 'product', 'search'];
    }

    //...
}
```

#### Adjust Product configuration in `Zed`

Add the following to `src/Pyz/Zed/Product/ProductConfig.php`:

```php
//...

use Spryker\Shared\ProductBundleStorage\ProductBundleStorageConfig;
use Spryker\Zed\PriceProduct\Dependency\PriceProductEvents;
use Spryker\Zed\Product\Dependency\ProductEvents;
use Spryker\Zed\Product\ProductConfig as SprykerProductConfig;
use Spryker\Zed\ProductCategory\Dependency\ProductCategoryEvents;
use Spryker\Zed\ProductImage\Dependency\ProductImageEvents;
use Spryker\Zed\ProductReview\Dependency\ProductReviewEvents;

//...

class ProductConfig extends SprykerProductConfig
{
    //...

    /**
     * @api
     *
     * @return array<string>
     */
    public function getProductAbstractUpdateMessageBrokerPublisherSubscribedEvents(): array
    {
        return [
            ProductEvents::PRODUCT_ABSTRACT_PUBLISH,
            ProductCategoryEvents::PRODUCT_CATEGORY_PUBLISH,
            ProductImageEvents::PRODUCT_IMAGE_PRODUCT_ABSTRACT_PUBLISH,
            PriceProductEvents::PRICE_ABSTRACT_PUBLISH,
            ProductReviewEvents::PRODUCT_ABSTRACT_REVIEW_PUBLISH,
        ];
    }

    /**
     * @api
     *
     * @return array<string>
     */
    public function getProductUpdateMessageBrokerPublisherSubscribedEvents(): array
    {
        return [
            ProductEvents::ENTITY_SPY_PRODUCT_UPDATE,
            ProductEvents::PRODUCT_CONCRETE_UPDATE,
            ProductEvents::PRODUCT_CONCRETE_PUBLISH,
            ProductBundleStorageConfig::PRODUCT_BUNDLE_PUBLISH,
            ProductImageEvents::PRODUCT_IMAGE_PRODUCT_CONCRETE_PUBLISH,
        ];
    }

    //...
}
```

#### Configure product dependencies in `Zed`

Add the following code to `src/Pyz/Zed/Product/ProductDependencyProvider.php`:

```php
//...

# MerchantProductOffer is used only for Marketplace
use Spryker\Zed\MerchantProductOffer\Communication\Plugin\Product\MerchantProductOfferProductConcreteExpanderPlugin;
//...
use Spryker\Zed\PriceProduct\Communication\Plugin\Product\PriceProductConcreteMergerPlugin;
use Spryker\Zed\ProductCategory\Communication\Plugin\Product\ProductConcreteCategoriesExpanderPlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\Product\ImageSetProductConcreteMergerPlugin;
use Spryker\Zed\ProductReview\Communication\Plugin\Product\ProductReviewProductConcreteExpanderPlugin;
use Spryker\Zed\ProductApproval\Communication\Plugin\Product\ApprovalStatusProductConcreteMergerPlugin;
use Spryker\Zed\ProductLabel\Communication\Plugin\Product\ProductLabelProductConcreteExpanderPlugin;

//...

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    //...

    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface>
     */
    protected function getProductConcreteExpanderPlugins(): array
    {
        return [
            ...
            new ProductReviewProductConcreteExpanderPlugin(),
            new MerchantProductOfferProductConcreteExpanderPlugin(), # Marketplace only
            new ProductConcreteCategoriesExpanderPlugin(),
            new ProductLabelProductConcreteExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteMergerPluginInterface>
     */
    protected function getProductConcreteMergerPlugins(): array
    {
        return [
            new ImageSetProductConcreteMergerPlugin(),
            new PriceProductConcreteMergerPlugin(),
            new ApprovalStatusProductConcreteMergerPlugin(), # Add this plugin if you are using the spryker/product-approval module
        ];
    }

    //...
}
```

#### Configure queue dependencies in `Zed`

Add the following code to `src/Pyz/Zed/Queue/QueueDependencyProvider.php`:

```php
//...

use Spryker\Shared\SearchHttp\SearchHttpConfig;

//...

class QueueDependencyProvider extends SprykerDependencyProvider
{
    //...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            //...
            SearchHttpConfig::SEARCH_HTTP_CONFIG_SYNC_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }

    //...
}
```

#### Adjust Publisher configuration in `Zed`

Add the following code to `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`:

```php
//...

use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductAbstractUpdatedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteCreatedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteDeletedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteExportedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteUpdatedMessageBrokerPublisherPlugin;

//...

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    //...

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            //...
            $this->getProductExportPlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getProductExportPlugins(): array
    {
        return [
            new ProductConcreteExportedMessageBrokerPublisherPlugin(),
            new ProductConcreteCreatedMessageBrokerPublisherPlugin(),
            new ProductConcreteUpdatedMessageBrokerPublisherPlugin(),
            new ProductConcreteDeletedMessageBrokerPublisherPlugin(),
            new ProductAbstractUpdatedMessageBrokerPublisherPlugin(),
        ];
    }

    //...
}
```

#### Add SearchHttp configuration in `Zed`

Add the code following to `src/Pyz/Zed/SearchHttp/SearchHttpConfig.php`:

```php
<?php

namespace Pyz\Zed\SearchHttp;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\SearchHttp\SearchHttpConfig as SprykerSearchHttpConfig;

class SearchHttpConfig extends SprykerSearchHttpConfig
{
    /**
     * @return string|null
     */
    public function getSearchHttpSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::PYZ_DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

#### Configure Synchronization dependencies in `Zed`

Add the following code to `src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php`:

```php
//...

use Spryker\Zed\SearchHttp\Communication\Plugin\Synchronization\SearchHttpSynchronizationDataPlugin;

//...

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    //...

    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            //...
            new SearchHttpSynchronizationDataPlugin(),
        ];
    }

    //...
}
```

### Console command for receiving messages

Receive messages from the channel:

```bash
console message-broker:consume
```

This command must be executed periodically. To achieve this, configure Jenkins in `config/Zed/cronjobs/jenkins.php`:

```php
$jobs[] = [
    'name' => 'message-broker-consume-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```

## Additional information on Algolia integration

When integrating Algolia, you should keep in mind some peculiarities of the SearchHTTP plugins setup and differences of the default facets.

### SearchHTTP plugins setup

Spryker's `SearchHTTP` module transfers Glue search requests to external search providers, one of which is Algolia. The `SearchHTTP` query is built using the `QueryExpanderPlugin` classes. Their order is defined in the `CatalogDependencyProvider::createCatalogSearchQueryExpanderPluginVariants()` method. The order of execution of those plugins might be customized on the project level. By default, all module-specific query builder plugins will be executed before parsing `GET` query parameters, so any `GET` query parameters may overwrite search query parameters set before.

### Default facets differences

There is a difference in how default facets behave on Algolia and on the default Spryker installation using Elasticsearch. Some default Spryker facets like `brand` only accept one value as a filter, so it is impossible to specify multiple brands to filter on in one search request. This is not the case with Algolia, as multiple brands can be specified in the same search requests. This also applies to other configured facets.

## Next steps

[Configure the Algolia app](/docs/pbc/all/search/{{site.version}}/base-shop/third-party-integrations/configure-algolia.html) for your store.
