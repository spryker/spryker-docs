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

## Payment details on the View Order page

In the Back Office, PSP data is displayed for each order. The data depends on the PSP used for an order. The following data is displayed for all PSPs by default:
- Transaction ID: Unique transaction identifier on the PSP side.
- Payment App specific payment status: State name, date, and time of when this state was reached. The state is specific to the PSP app.

To view PSP data for an order, do the following:
1. In the Back Office, go to **Sales**>**Orders**.
  This opens the **Overview of Orders** page.
2. Next to the order you want to view PSP data for, click **View**.
On the **View Order** page, PSP data is displayed in the **Payment Metadata** section.
