---
title: Retrieve and use payment details from third-party PSPs
description: Learn how to retrieve and use payment details from a third-party payment service providers
last_updated: Jan 8, 2025
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
use Spryker\Zed\SalesPaymentDetail\Communication\Plugin\MessageBroker\SalesPaymentDetailMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...

            # This plugin handles the `PaymentCreated` and `PaymentUpdated` messages sent from the Stripe App.
            new SalesPaymentDetailMessageHandlerPlugin(),
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

## Payment details on the sales order overview page

You can find specific data of a Payment Service Provider on the Sales order overview page. The data is displayed in the `Payment Details` section.

There are specific data for different Payment Service Providers and the data may differ depending on the payment method used.

The default data provided for all Payment Apps are:
- Transaction Id - The unique identifier of the transaction of the Payment Service Provider. Can be used to find payments in the Payment Service Provider's system.
- Payment App specific payment status - It consists of the state name and the date-time this state was reached. The state name of the App does not correlate to the states from the State-machine, they are PSP App specific states.
