---
title: Payment details of third party integrations
description: Find out about how to use payment details from a third-party payment service provider in your Spryker shop.
draft: true
last_updated: Mar 20, 2024
template: howto-guide-template

---
This document gives an overview of how to use payment details from a third-party payment service provider in your Spryker Shop.

{% info_block infoBox "Info" %}

The steps listed is this document are only necessary if your Spryker shop doesn't contain the packages (or their versions are outdated) and configurations below.

{% endinfo_block %}


## 1. Required packages

> composer require spryker/sales-payment-detail

## 2. Configure shared configs

Your project probably already contains the following code in `config/Shared/config_default.php` already. If not, add it:

```php
//...

use Generated\Shared\Transfer\PaymentCreatedTransfer;

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    PaymentCreatedTransfer::class => 'payment-events',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'payment-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

```

## 3. Configure the Message Broker dependency provider

Your project probably already contains the following code in `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php` already. If not, add it:

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

## 4. Configure channels in Message Broker configuration

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`:

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

## 5. Usage

When you use a third-party payment service provider which supports this feature you will receive asynchronous messages about the payment when it is created. When you want to use this data of the `spy_sales_payment_detail` table you need to join the data from this table with the entity you are fetching from the database where this payment detail is related to.

When the payment is used in the normal order process, the payment detail can be joined by using the `spy_sales_order.order_reference` and the `spy_sales_payment_detail.entity_reference`.