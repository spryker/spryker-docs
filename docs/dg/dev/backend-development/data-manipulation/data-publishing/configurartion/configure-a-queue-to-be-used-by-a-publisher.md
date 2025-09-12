---
title: Configure a queue to be used by a publisher
description: Configure Spryker to publish data to specific queues for better prioritization. Use RabbitMQ for queue setup and assign publisher plugins to default or custom queues.
last_updated: Jun 16, 2025
template: howto-guide-template
---

You can decide to which queue you want to push data to for each individual entity. This is usefull to separate data into dedicated queues and being able to have “high priority“ data such as products separated from “low priority“ data such as translations.

Usually, you should put “low priority” data into the “global“ publish queue and have specialized queues for “high priority“ data.

## Configuring the RabbitMQ module

All queues used are configured in the RabbitMQ module. Inside of the `\Pyz\Client\RabbitMq\RabbitMqConfig::getPublishQueueConfiguration()` you will find all queue names used.


```php
protected function getPublishQueueConfiguration(): array
{
    return [
        AvailabilityStorageConfig::PUBLISH_AVAILABILITY,
        CustomerStorageConfig::PUBLISH_CUSTOMER_INVALIDATED,
        MerchantStorageConfig::PUBLISH_MERCHANT,
        PriceProductStorageConfig::PUBLISH_PRICE_PRODUCT_ABSTRACT,
        PriceProductStorageConfig::PUBLISH_PRICE_PRODUCT_CONCRETE,
        ProductImageStorageConfig::PUBLISH_PRODUCT_ABSTRACT_IMAGE,
        ProductImageStorageConfig::PUBLISH_PRODUCT_CONCRETE_IMAGE,
        ProductPageSearchConfig::PUBLISH_PRODUCT_ABSTRACT_PAGE,
        ProductPageSearchConfig::PUBLISH_PRODUCT_CONCRETE_PAGE,
        ProductStorageConfig::PUBLISH_PRODUCT_ABSTRACT,
        ProductStorageConfig::PUBLISH_PRODUCT_CONCRETE,
        ...
    ];
}
```

## Configuring the Publisher Module


To be able to publish entities data into queues you need to configure the publisher plugins. Here you have two options.

Without defining a queue name.

With a queue name.

In the first case the “default“ queue which is configured in `\Spryker\Shared\Publisher\PublisherConfig::PUBLISH_QUEUE` will be used. See the following example:


```php
protected function getGlossaryStoragePlugins(): array
{
    return [
        new GlossaryKeyDeletePublisherPlugin(),
        new GlossaryKeyWriterPublisherPlugin(),
        new GlossaryTranslationWritePublisherPlugin(),
    ];
}
```

This method returns an array without specifying a queue name those belong to. Compare this with the example for the second case:


```php
protected function getMerchantStoragePlugins(): array
{
    return [
        MerchantStorageConfig::PUBLISH_MERCHANT => [
            new MerchantStoragePublisherPlugin(),
            new MerchantCategoryStoragePublisherPlugin(),
        ],
    ];
}
```


This method uses a multi-dimensional array where the key is the queue name to be used for the attached publisher plugins.