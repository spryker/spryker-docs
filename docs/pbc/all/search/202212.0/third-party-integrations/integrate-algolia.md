---
title: Integrate Algolia
description: Find out how you can integrate Algolia into your Spryker shop
template: howto-guide-template
---

## Prerequisites

The Algolia app requires the following Spryker modules:

* `spryker/catalog: "^5.8.0"`
* `spryker/catalog-extension: "^1.0.0"`
* `spryker/catalog-price-product-connector: "^1.4.0"`
* `spryker/category: "^5.11.0"`
* `spryker/category-storage: "^2.5.0"`
* `spryker/merchant-product-offer: "^1.5.0"` (Marketplace only)
* `spryker/merchant-product-offer-data-import: "^1.1.0"` (Marketplace only)
* `spryker/merchant-product-offer-search: "^1.4.0"` (Marketplace only)
* `spryker/message-broker-aws: "^1.3.1"`
* `spryker/price-product: "^4.37.0"`
* `spryker/price-product-offer-data-import: "^0.7.1"` (Marketplace only)
* `spryker/product: "^6.29.0"`
* `spryker/product-approval: "^1.1.0"`
* `spryker/product-category: "^4.19.0"`
* `spryker/product-extension: "^1.4.0"`
* `spryker/product-image: "^3.13.0"`
* `spryker/product-label "^3.5.0"`
* `spryker/product-label-storage "^2.6.0"`
* `spryker/product-offer: "^1.4.0"` (Marketplace only)
* `spryker/product-review: "^2.9.0"`
* `spryker/search: "^8.19.3"`
* `spryker/search-http: "^1.0.0"`
* `spryker/store: "^1.17.0"`

### 1. Add missing plugins

TBD

### 2. Configure Message Broker

Add the following configuration to `config/Shared/common/config_default.php`:

```php
$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...,
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
    'product' => MessageBrokerAwsConfig::SQS_TRANSPORT,
    'search' => MessageBrokerAwsConfig::SQS_TRANSPORT,
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    'product' => 'http',
    'search' => 'http',
];
```

#### Receive messages

To receive messages from the channel, the following command is used:

`console message-broker:consume`

Since this command must be executed periodically, configure Jenkins in `config/Zed/cronjobs/jenkins.php`:

```php
$jobs[] = [
    'name' => 'message-broker-consume-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```


## Next steps

[Configure the Algolia app](/docs/pbc/all/search/{{site.version}}/third-party-integrations/configure-algolia.html) for your store.