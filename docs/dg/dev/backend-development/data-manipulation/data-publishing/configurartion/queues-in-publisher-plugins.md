---
title: Queues in publisher plugins
description: Configure Spryker to publish data to specific queues for better prioritization. Use RabbitMQ for queue setup and assign publisher plugins to default or custom queues.
last_updated: Sep 18, 2025
template: howto-guide-template
---

You can decide to which queue you want to push data for each individual entity. This is useful to separate data into dedicated queues and being able to separate "high-priority" data, such as products, from "low-priority" data, such as translations.

We recommend putting "low priority" data into the "global" publish queue and using specialized queues for "high-priority" data.

## RabbitMQ module configuration

All queues are configured in the RabbitMQ module:

**\Pyz\Client\RabbitMq\RabbitMqConfig::getPublishQueueConfiguration()**

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

## Publisher module configuration


To publish entities data into queues, you need to configure publisher plugins.

You can configure plugins with queue names or without them. If you don't specify a queue name, the default queue configured in `\Spryker\Shared\Publisher\PublisherConfig::PUBLISH_QUEUE` will be used:


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

This method returns an array without specifying a queue name those belong to. 

The following example shows how to configure a plugin with a specific queue:


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






























































