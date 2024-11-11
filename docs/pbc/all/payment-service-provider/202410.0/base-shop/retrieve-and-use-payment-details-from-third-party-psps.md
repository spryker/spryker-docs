---
title: Retrieve and use payment details from third-party PSPs
description: Learn how to retrieve and use payment details from a third-party payment service providers
last_updated: Aug 8, 2024
template: howto-guide-template
---

This document describes how to retrieve and use payment details from third-party payment service providers (PSPs).

## Configure payment details to be retrieved

1. Install the required modules using Composer:

```bash
composer require spryker/sales-payment-detail
```

2. In `config/Shared/config_default.php`, add or update the shared configs:

```php
//...

use Generated\Shared\Transfer\PaymentCreatedTransfer;
use Generated\Shared\Transfer\PaymentUpdatedTransfer;

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    PaymentCreatedTransfer::class => 'payment-events',
    PaymentUpdatedTransfer::class => 'payment-events',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'payment-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

```

3. In `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`, add or update the config of the message broker dependency provider:

```php

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\SalesPaymentDetail\Communication\Plugin\MessageBroker\PaymentCreatedMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...

            # This plugin is handling the `PaymentCreated` messages sent from any Payment App that supports this feature.
            new PaymentCreatedMessageHandlerPlugin(),
        ];
    }
}

```

4. In `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`, add or update the config of the message broker channels:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            //...
            'payment-events',
        ];
    }

    //...
}
```

5. In `src/Pyz/Zed/Sales/SalesConfig.php`, extend the view detail external block on the view order page:

```php
namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
    /**
     * @return array<string>
     */
    public function getSalesDetailExternalBlocksUrls(): array
    {
        $projectExternalBlocks = [
            //...
            'sales_payment_details' => '/sales-payment-detail/sales/list',
            //...
        ];

        $externalBlocks = parent::getSalesDetailExternalBlocksUrls();

        return array_merge($externalBlocks, $projectExternalBlocks);
    }

    //...
}
```

## Using payment details from third-party PSPs

When a third-party PSP supports this feature, your shop receives asynchronous messages about each payment when it's created.

To use the data of the `spy_sales_payment_detail` table, you need to combine the data from the table with the entity you are fetching from the database to which this payment detail is related.

When the payment is used in the normal order process, the payment detail can be combined by using `spy_sales_order.order_reference` and `spy_sales_payment_detail.entity_reference`.
