---
title: Integrate Algolia
description: Learn how to integrate Algolia Search into your Spryker-based projects.
template: howto-guide-template
last_updated: Sep 1, 2025
redirect_from:
- /docs/pbc/all/search/202400.0/base-shop/third-party-integrations/integrate-algolia.html
- /docs/pbc/all/search/202311.0/base-shop/third-party-integrations/integrate-algolia.html
- /docs/pbc/all/search/202311.0/third-party-integrations/integrate-algolia.html
---

This document explains how to integrate [Algolia](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/algolia.html) with your Spryker shop.


## Prerequisites

- [Install prerequisites and enable ACP](/docs/dg/dev/acp/install-prerequisites-and-enable-acp.html)

- In the Back Office, go to **Apps** > **Algolia**. Install or update the required packages for Algolia. For example:

![list-of-algolia-modules](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/third-party-integrations/algolia/integrate-algolia/list-of-algolia-modules.png)

## Integrate Algolia

To integrate Algolia, follow these steps:

### 1. Update project config files

Add the following configuration to `config/Shared/config_default.php`:

```php
use Generated\Shared\Transfer\CmsPagePublishedTransfer;
use Generated\Shared\Transfer\CmsPageUnpublishedTransfer;
use Generated\Shared\Transfer\InitializeCmsPageExportTransfer;
use Generated\Shared\Transfer\InitializeProductExportTransfer;
use Generated\Shared\Transfer\ProductCreatedTransfer;
use Generated\Shared\Transfer\ProductDeletedTransfer;
use Generated\Shared\Transfer\ProductExportedTransfer;
use Generated\Shared\Transfer\ProductUpdatedTransfer;
use Generated\Shared\Transfer\SearchEndpointAvailableTransfer;
use Generated\Shared\Transfer\SearchEndpointRemovedTransfer;
use Spryker\Shared\KernelApp\KernelAppConstants;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\Product\ProductConstants;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;

//...

$config[KernelAppConstants::TENANT_IDENTIFIER]
    = $config[ProductConstants::TENANT_IDENTIFIER]
    = $config[MessageBrokerConstants::TENANT_IDENTIFIER]
    = $config[MessageBrokerAwsConstants::CONSUMER_ID]
    = $config[OauthClientConstants::TENANT_IDENTIFIER]
    = $config[AppCatalogGuiConstants::TENANT_IDENTIFIER]
    = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    CmsPagePublishedTransfer::class => 'cms-page-events',
    CmsPageUnpublishedTransfer::class => 'cms-page-events',
    ProductExportedTransfer::class => 'product-events',
    ProductCreatedTransfer::class => 'product-events',
    ProductUpdatedTransfer::class => 'product-events',
    ProductDeletedTransfer::class => 'product-events',
    InitializeProductExportTransfer::class => 'product-commands',
    InitializeCmsPageExportTransfer::class => 'search-commands',
    SearchEndpointAvailableTransfer::class => 'search-commands',
    SearchEndpointRemovedTransfer::class => 'search-commands',     
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'product-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'search-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...
    'product-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'cms-page-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'search-entity-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];
```

### 2. Configure modules and their behavior

Configure the modules and add the necessary dependencies as described below.

#### Configure the Catalog module

Add the following code to `src/Pyz/Client/Catalog/CatalogDependencyProvider.php`:

```php
use Generated\Shared\Transfer\SearchContextTransfer;
use Generated\Shared\Transfer\SearchHttpSearchContextTransfer;
use Spryker\Client\Catalog\Plugin\SearchHttp\ResultFormatter\ProductConcreteCatalogSearchHttpResultFormatterPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\Catalog\QueryExpander\ProductPriceSearchHttpQueryExpanderPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\Catalog\ResultFormatter\CurrencyAwareCatalogSearchHttpResultFormatterPlugin;
use Spryker\Client\CategoryStorage\Plugin\Catalog\ResultFormatter\CategorySuggestionsSearchHttpResultFormatterPlugin;
use Spryker\Client\CategoryStorage\Plugin\Catalog\ResultFormatter\CategoryTreeFilterSearchHttpResultFormatterPlugin;
use Spryker\Client\CmsPageSearch\Plugin\Search\SearchHttp\ResultFormatter\CmsPageSuggestionsSearchHttpResultFormatterPlugin;
use Spryker\Client\MerchantProductOfferSearch\Plugin\Catalog\MerchantReferenceSearchHttpQueryExpanderPlugin;
use Spryker\Client\ProductLabelStorage\Plugin\Catalog\ProductLabelSearchHttpFacetConfigTransferBuilderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\ProductConcreteSearchHttpQueryPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\SearchHttpQueryPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\SuggestionSearchHttpQueryPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\QueryExpander\BasicSearchHttpQueryExpanderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\QueryExpander\FacetSearchHttpQueryExpanderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\CompletionSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\FacetSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\PaginationSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\ProductSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\ProductSuggestionSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\SortSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\SpellingSuggestionSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Search\SearchHttpSearchResultCountPlugin;
use Spryker\Shared\SearchHttp\SearchHttpConfig;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider

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
        return [
            new SearchHttpQueryPlugin(),
        ];
    }

    /**
     * @phpstan-return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface>
     *
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryInterface>
     */
    protected function createSuggestionQueryPluginVariants(): array
    {
        return [
            new SuggestionSearchHttpQueryPlugin(),
        ];
    }

    /**
     * @return array<string, array<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>>
     */
    protected function createProductConcreteCatalogSearchResultFormatterPluginVariants(): array
    {
        return [
            SearchHttpConfig::TYPE_PRODUCT_CONCRETE_SEARCH_HTTP => [
                new ProductConcreteCatalogSearchHttpResultFormatterPlugin(),
            ],
        ];
    }

    /**
     * @return array<string, array<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>>
     */
    protected function createSuggestionResultFormatterPluginVariants(): array
    {
        return [
            SearchHttpConfig::TYPE_SUGGESTION_SEARCH_HTTP => [
                new CompletionSearchHttpResultFormatterPlugin(),
                new CurrencyAwareCatalogSearchHttpResultFormatterPlugin(
                    new ProductSuggestionSearchHttpResultFormatterPlugin(),
                ),
                new CategorySuggestionsSearchHttpResultFormatterPlugin(),
                new CmsPageSuggestionsSearchHttpResultFormatterPlugin(),
            ],
        ];
    }

    /**
     * @phpstan-return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface>
     *
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryInterface>
     */
    protected function createProductConcreteCatalogSearchQueryPluginVariants(): array
    {
        return [
            new ProductConcreteSearchHttpQueryPlugin(),
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
    
    /**
     * @return list<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchResultCountPluginInterface>
     */
    protected function getSearchResultCountPlugins(): array
    {
        return [
            new SearchHttpSearchResultCountPlugin(),
        ];
    }
    
    
    /**
     * @return array<string, array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>>
     */
    protected function createCatalogSearchCountQueryExpanderPluginVariants(): array
    {
        return [
            SearchHttpConfig::TYPE_SEARCH_HTTP => [
                new ProductPriceSearchHttpQueryExpanderPlugin(),
            ],
        ];
    }

    //...
}
```

#### Configure the Search module

Add the following code to `src/Pyz/Client/Search/SearchDependencyProvider.php`:

```php
use Spryker\Client\SearchHttp\Plugin\Search\SearchHttpSearchAdapterPlugin;
use Spryker\Client\SearchHttp\Plugin\Search\SearchHttpSearchContextExpanderPlugin;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
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
}
```

#### Configure the SearchHttp module

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
        ];
    }
}
```

Add the following code to `src/Pyz/Zed/SearchHttp/SearchHttpConfig.php`:

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
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

#### Configure the Synchronization module

Add the following code to `src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php`:

```php
use Spryker\Zed\SearchHttp\Communication\Plugin\Synchronization\SearchHttpSynchronizationDataPlugin;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
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
}
```

#### Configure the Queue module

Add the following code to `src/Pyz/Zed/Queue/QueueDependencyProvider.php`:

```php
use Spryker\Shared\SearchHttp\SearchHttpConfig;

class QueueDependencyProvider extends SprykerDependencyProvider
{
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

#### Configure the RabbitMq module

Add the following code to `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`:

```php
use Spryker\Shared\SearchHttp\SearchHttpConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
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
}
```

#### Configure the MessageBroker module

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`:

```php
use Spryker\Zed\Product\Communication\Plugin\MessageBroker\InitializeProductExportMessageHandlerPlugin;
use Spryker\Zed\SearchHttp\Communication\Plugin\MessageBroker\SearchEndpointAvailableMessageHandlerPlugin;
use Spryker\Zed\SearchHttp\Communication\Plugin\MessageBroker\SearchEndpointRemovedMessageHandlerPlugin;
use Spryker\Zed\Cms\Communication\Plugin\MessageBroker\CmsPageMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
  /**
    * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
    */
  public function getMessageHandlerPlugins(): array
  {
      return [
          //...
          new ProductExportMessageHandlerPlugin(),
          new SearchEndpointMessageHandlerPlugin(),
          new CmsPageMessageHandlerPlugin(),
      ];
  }
}
```

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`:

```php
class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            //...
            'product-commands',
            'search-commands',
        ];
    }
}
```

#### Configure the Product module

Algolia product search index synchronization is triggered by internal Spryker events. You must provide a list of events to enable product data synchronization.
You can add or remove events depending on when you want products to be updated in Algolia.
Add the following code to `src/Pyz/Zed/Product/ProductConfig.php`:

```php
use Spryker\Shared\ProductBundleStorage\ProductBundleStorageConfig;
use Spryker\Zed\PriceProduct\Dependency\PriceProductEvents;
use Spryker\Zed\Product\ProductConfig as SprykerProductConfig;
use Spryker\Zed\ProductCategory\Dependency\ProductCategoryEvents;
use Spryker\Zed\ProductImage\Dependency\ProductImageEvents;
use Spryker\Zed\ProductReview\Dependency\ProductReviewEvents;

class ProductConfig extends SprykerProductConfig
{
    /**
     * @return array<string>
     */
    public function getProductAbstractUpdateMessageBrokerPublisherSubscribedEvents(): array
    {
        return array_merge(parent::getProductAbstractUpdateMessageBrokerPublisherSubscribedEvents(), [
            ProductCategoryEvents::PRODUCT_CATEGORY_PUBLISH,
            ProductCategoryEvents::ENTITY_SPY_PRODUCT_CATEGORY_CREATE,
            ProductCategoryEvents::ENTITY_SPY_PRODUCT_CATEGORY_DELETE,

            ProductLabelEvents::ENTITY_SPY_PRODUCT_LABEL_PRODUCT_ABSTRACT_CREATE,
            ProductLabelEvents::ENTITY_SPY_PRODUCT_LABEL_PRODUCT_ABSTRACT_DELETE,

            PriceProductEvents::PRICE_ABSTRACT_PUBLISH,
            PriceProductEvents::ENTITY_SPY_PRICE_PRODUCT_CREATE,
            PriceProductEvents::ENTITY_SPY_PRICE_PRODUCT_UPDATE,

            ProductReviewEvents::PRODUCT_ABSTRACT_REVIEW_PUBLISH,
            ProductReviewEvents::ENTITY_SPY_PRODUCT_REVIEW_CREATE,
            ProductReviewEvents::ENTITY_SPY_PRODUCT_REVIEW_UPDATE,

            ProductImageEvents::PRODUCT_IMAGE_PRODUCT_ABSTRACT_PUBLISH,

            ProductImageEvents::ENTITY_SPY_PRODUCT_IMAGE_SET_CREATE,
            ProductImageEvents::ENTITY_SPY_PRODUCT_IMAGE_SET_UPDATE,
        ]);
    }

    /**
     * @return array<string>
     */
    public function getProductUpdateMessageBrokerPublisherSubscribedEvents(): array
    {
        return array_merge(parent::getProductUpdateMessageBrokerPublisherSubscribedEvents(), [
            ProductBundleStorageConfig::PRODUCT_BUNDLE_PUBLISH,
            ProductBundleStorageConfig::ENTITY_SPY_PRODUCT_BUNDLE_CREATE,
            ProductBundleStorageConfig::ENTITY_SPY_PRODUCT_BUNDLE_UPDATE,

            ProductImageEvents::PRODUCT_IMAGE_PRODUCT_CONCRETE_PUBLISH,
            ProductImageEvents::ENTITY_SPY_PRODUCT_IMAGE_SET_CREATE,
            ProductImageEvents::ENTITY_SPY_PRODUCT_IMAGE_SET_UPDATE,
            ProductImageEvents::ENTITY_SPY_PRODUCT_IMAGE_SET_TO_PRODUCT_IMAGE_CREATE,
            ProductImageEvents::ENTITY_SPY_PRODUCT_IMAGE_SET_TO_PRODUCT_IMAGE_UPDATE,

            PriceProductEvents::PRICE_CONCRETE_PUBLISH,
            PriceProductEvents::ENTITY_SPY_PRICE_PRODUCT_CREATE,
            PriceProductEvents::ENTITY_SPY_PRICE_PRODUCT_UPDATE,

            ProductSearchEvents::ENTITY_SPY_PRODUCT_SEARCH_CREATE,
            ProductSearchEvents::ENTITY_SPY_PRODUCT_SEARCH_UPDATE,
        ]);
    }
}
```

{% info_block warningBox "Warning" %}

If your project has custom functionality where abstract or concrete products are created, updated, or deleted, add the necessary events to the lists in the methods above to ensure updated data is sent to Algolia.

Examples of such functionality include:
- Custom features in the Back Office
- Custom data imports
- Integration with middleware that updates product or product-related data in Spryker

To trigger custom events in Spryker, use the `EventFacade::trigger('event-name', $payload)` or `EventFacade::triggerBulk('event-name', $payloads)` methods. You can also use existing events:

- For a single product: `ProductEvents::PRODUCT_CONCRETE_UPDATE`
- For multiple products assigned to one abstract product: `ProductEvents::PRODUCT_ABSTRACT_UPDATE`

{% endinfo_block %}

Add the following code to `src/Pyz/Zed/Product/ProductDependencyProvider.php`:

```php

use Spryker\Zed\MerchantProductOffer\Communication\Plugin\Product\MerchantProductOfferProductConcreteExpanderPlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\Product\PriceProductConcreteMergerPlugin;
use Spryker\Zed\ProductCategory\Communication\Plugin\Product\ProductConcreteCategoriesExpanderPlugin;
use Spryker\Zed\ProductImage\Communication\Plugin\Product\ImageSetProductConcreteMergerPlugin;
use Spryker\Zed\ProductReview\Communication\Plugin\Product\ProductReviewProductConcreteExpanderPlugin;
use Spryker\Zed\ProductApproval\Communication\Plugin\Product\ApprovalStatusProductConcreteMergerPlugin;
use Spryker\Zed\ProductLabel\Communication\Plugin\Product\ProductLabelProductConcreteExpanderPlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface>
     */
    protected function getProductConcreteExpanderPlugins(): array
    {
        return [
            // ...
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
}
```

#### Configure the CmsPageSearch module

To enable another search provider for CMS page search, add the following code to `src/Pyz/Client/CmsPageSearch/CmsPageSearchDependencyProvider.php`:

```php
namespace Pyz\Client\CmsPageSearch;

use Generated\Shared\Transfer\SearchContextTransfer;
use Spryker\Client\CmsPageSearch\CmsPageSearchConfig;
use Spryker\Client\CmsPageSearch\Plugin\Search\SearchHttp\ResultFormatter\CmsPageSearchHttpResultFormatterPlugin;
use Spryker\Client\CmsPageSearch\Plugin\Search\SearchHttp\ResultFormatter\CmsPageSortSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\Query\SearchHttpQueryPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\QueryExpander\BasicSearchHttpQueryExpanderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\QueryExpander\FacetSearchHttpQueryExpanderPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\FacetSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Catalog\ResultFormatter\PaginationSearchHttpResultFormatterPlugin;
use Spryker\Client\SearchHttp\Plugin\Search\SearchHttpSearchResultCountPlugin;
# Elasticsearch related plugins, optional, useful for transition period
use Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\Query\CmsPageSearchQueryPlugin;
use Spryker\Client\CmsPageSearch\Plugin\Elasticsearch\SearchResultCount\SearchElasticSearchResultCountPlugin;

class CmsPageSearchDependencyProvider extends \Spryker\Client\CmsPageSearch\CmsPageSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getCmsPageHttpSearchQueryExpanderPlugins(): array
    {
        return [
            new BasicSearchHttpQueryExpanderPlugin(),
            new FacetSearchHttpQueryExpanderPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>
     */
    protected function getCmsPageHttpSearchResultFormatterPlugins(): array
    {
        return [
            new PaginationSearchHttpResultFormatterPlugin(),
            new CmsPageSortSearchHttpResultFormatterPlugin(),
            new CmsPageSearchHttpResultFormatterPlugin(),
            new FacetSearchHttpResultFormatterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface>
     */
    protected function getCmsPageSearchQueryPlugins(): array
    {
        return [
            new SearchHttpQueryPlugin(
                (new SearchContextTransfer())
                    ->setSourceIdentifier(CmsPageSearchConfig::SOURCE_IDENTIFIER_CMS_PAGE),
            ),
            new CmsPageSearchQueryPlugin(), # Optional, useful for transition period
        ];
    }

    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchResultCountPluginInterface>
     */
    protected function getCmsPageSearchResultCountPlugins(): array
    {
        return [
            CmsPageSearchConfig::SEARCH_STRATEGY_SEARCH_HTTP => new SearchHttpSearchResultCountPlugin(),
            CmsPageSearchConfig::SEARCH_STRATEGY_ELASTICSEARCH => new SearchElasticSearchResultCountPlugin(), # Optional, useful for transition period
        ];
    }
}
```


#### Configure the Publisher module

Add the following code to `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`:

```php
use Spryker\Zed\Cms\Communication\Plugin\Publisher\CmsPageUpdateMessageBrokerPublisherPlugin;
use Spryker\Zed\Cms\Communication\Plugin\Publisher\CmsPageVersionPublishedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductAbstractUpdatedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteCreatedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteDeletedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteExportedMessageBrokerPublisherPlugin;
use Spryker\Zed\Product\Communication\Plugin\Publisher\ProductConcreteUpdatedMessageBrokerPublisherPlugin;
use Spryker\Zed\ProductCategory\Communication\Plugin\Publisher\ProductCategoryProductUpdatedEventTriggerPlugin;
use Spryker\Zed\ProductLabel\Communication\Plugin\Publisher\ProductLabelProductUpdatedEventTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            //...
            $this->getProductMessageBrokerPlugins(),
            $this->getCmsPageMessageBrokerPlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getProductMessageBrokerPlugins(): array
    {
        return [
            new ProductConcreteExportedMessageBrokerPublisherPlugin(),
            new ProductConcreteCreatedMessageBrokerPublisherPlugin(),
            new ProductConcreteUpdatedMessageBrokerPublisherPlugin(),
            new ProductConcreteDeletedMessageBrokerPublisherPlugin(),
            new ProductAbstractUpdatedMessageBrokerPublisherPlugin(),
            new ProductCategoryProductUpdatedEventTriggerPlugin(),
            new ProductLabelProductUpdatedEventTriggerPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getCmsPageMessageBrokerPlugins(): array
    {
        return [
            new CmsPageVersionPublishedMessageBrokerPublisherPlugin(),
            new CmsPageUpdateMessageBrokerPublisherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

After completing the integration, verify the following:
- In the Back Office at `/storage-gui/maintenance/key?key=kv%3Asearch_http_config`, you can see the Spryker ACP URLs and API keys you provided in the Algolia App settings.
- Product and CMS page data is synchronized from your Spryker instance to Algolia.
- When you select products or CMS pages for searching in the Algolia App Settings, the frontend displays results from Algolia:
  - On Yves: `/search?q=`, `/search/cms?q=`
  - Via Glue API: `/catalog-search?q=`, `/catalog-search-suggestions?q=sams`, `/cms-pages?q=`
- Confirm that Algolia is used for search by checking the Algolia Dashboard. Select the index for product or CMS page for the relevant store and locale, and check the number and order of records for the same search term.
- You can also check Algolia API logs for the selected index. You should see a User-Agent similar to `User-Agent: Algolia for PHP (3.4.1); PHP (8.3.13); Guzzle (7); spryker-integration (2.11.0)`.

{% endinfo_block %}


## Additional information on Algolia integration

When integrating Algolia, keep in mind some specifics of the SearchHttp plugin setup and differences in the default facets.

The `SearchHttp` query is built using `QueryExpanderPlugin` classes. Their order is defined in the `CatalogDependencyProvider::createCatalogSearchQueryExpanderPluginVariants()` method.

You can customize the order of these plugins at the project level. By default, all module-specific query builder plugins are executed before parsing `GET` query parameters, so any `GET` query parameters may overwrite previously set search query parameters.

## Next steps

[Configure the Algolia app](/docs/pbc/all/search/latest/base-shop/third-party-integrations/algolia/configure-algolia.html) for your store.
