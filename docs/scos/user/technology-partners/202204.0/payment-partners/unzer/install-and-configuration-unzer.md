---
title: Installing and configuring Unzer.
description: Install and configure Unzer module to work in the Spryker Commerce OS.
last_updated: Jun 07, 2022
template: concept-topic-template
originalLink: 
originalArticleId:
related:
- title: Unzer integration guide
  link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/unzer/project-integration-unzer.html
---

This topic describes how to install and configure the Unzer module to integrate Unzer into your project.

## Integration overview

The `spryker-eco/unzer` module provides integration of Spryker e-commerce system with Unzer technology partner. It requires the `spryker-eco/unzer-api` module that provides the REST Client for making API calls to the Unzer Payment Provider.
It also requires `spryker-eco/unzer-gui` module that provides Backoffice functionality to configure Unzer credentials.

The `SprykerEco.Unzer` module includes integration with:

* Checkout process - payment forms with all necessary fields that are required to make payment request, save order information and so on.
* OMS (Order Management System) - state machines, all necessary commands for making modification requests and conditions for changing orders status accordingly.

The `SprykerEco.Unzer` module provides the following payment methods:
* Credit Card
* Sofort
* Bank Transfer
* Marketplace Credit Card
* Marketplace Sofort
* Marketplace Bank Transfer

## Installation

To install the Unzer modules, run the command:
```
composer require spryker-eco/unzer spryker-eco/unzer-gui
```

## General Configuration

You can find all necessary configurations in `vendor/spryker-eco/unzer/config/config.dist.php` and `vendor/spryker-eco/unzer-api/config/config.dist.php`.
The table below describes all general configuration keys and their values.

| CONFIGURATION KEY                              | TYPE   | DESCRIPTION                                                                  |
|------------------------------------------------|--------|------------------------------------------------------------------------------|
| `UnzerConstants::UNZER_AUTHORIZE_RETURN_URL`   | string | Return back URL after payment authorization.                                 |
| `UnzerConstants::UNZER_CHARGE_RETURN_URL`      | string | Return back URL after payment direct charge.                                 |
| `UnzerConstants::WEBHOOK_RETRIEVE_URL`         | string | Webhook retrieve URL for Unzer payment notifications.                        |
| `UnzerConstants::VAULT_DATA_TYPE`              | string | Abstract data type for Unzer data saved in `Spryker.Vault`.                  |
| `VaultConstants::ENCRYPTION_KEY`               | string | Key which will be used for encrypting Unzer private keys in `Spryker.Vault`. |
| `UnzerConstants::EXPENSES_REFUND_STRATEGY_KEY` | int    | Expense(shipment) refund strategy key. Please find description below.        |
| `UnzerApiConstants::LOG_API_CALLS`             | bool   | Flag which indicates if API calls log should be saved.                       |

## Configuration Example

<details>
<summary>config/Shared/config_default.php</summary>

```php
<?php

use Spryker\Shared\Vault\VaultConstants;
use SprykerEco\Shared\Unzer\UnzerConstants;
use SprykerEco\Shared\UnzerApi\UnzerApiConstants;

// UNZER
$config[VaultConstants::ENCRYPTION_KEY] = 'nzb9y7rNpyn5W5dd';
$config[UnzerConstants::WEBHOOK_RETRIEVE_URL] = 'https://random-uuid.ngrok.io/unzer/notification';
$config[UnzerConstants::VAULT_DATA_TYPE] = 'unzer-private-key';
$config[UnzerConstants::EXPENSES_REFUND_STRATEGY_KEY] = UnzerConstants::LAST_SHIPMENT_ITEM_EXPENSES_REFUND_STRATEGY;

// UNZER API
$config[UnzerApiConstants::WEBHOOK_RESOURCE_URL] = 'https://api.unzer.com/v1/webhooks';
$config[UnzerApiConstants::CUSTOMER_RESOURCE_URL] = 'https://api.unzer.com/v1/customers/%s';
$config[UnzerApiConstants::BASKET_RESOURCE_URL] = 'https://api.unzer.com/v2/baskets';
$config[UnzerApiConstants::MARKETPLACE_BASKET_RESOURCE_URL] = 'https://api.unzer.com/v2/marketplace/baskets';
$config[UnzerApiConstants::MARKETPLACE_AUTHORIZE_URL] = 'https://api.unzer.com/v1/marketplace/payments/authorize';
$config[UnzerApiConstants::AUTHORIZE_URL] = 'https://api.unzer.com/v1/payments/authorize';
$config[UnzerApiConstants::METADATA_RESOURCE_URL] = 'https://api.unzer.com/v1/metadata';
$config[UnzerApiConstants::MARKETPLACE_GET_PAYMENT_URL] = 'https://api.unzer.com/v1/marketplace/payments/%s';
$config[UnzerApiConstants::GET_PAYMENT_URL] = 'https://api.unzer.com/v1/payments/%s';
$config[UnzerApiConstants::CHARGE_URL] = 'https://api.unzer.com/v1/payments/charges';
$config[UnzerApiConstants::MARKETPLACE_CHARGE_URL] = 'https://api.unzer.com/v1/marketplace/payments/charges';
$config[UnzerApiConstants::MARKETPLACE_CREDIT_CARD_CHARGE_URL] = 'https://api.unzer.com/v1/marketplace/payments/%s/authorize/%s/charges';
$config[UnzerApiConstants::CREDIT_CARD_CHARGE_URL] = 'https://api.unzer.com/v1/payments/%s/charges';
$config[UnzerApiConstants::CREATE_PAYMENT_RESOURCE_URL] = 'https://api.unzer.com/v1/types/%s';
$config[UnzerApiConstants::MARKETPLACE_REFUND_URL] = 'https://api.unzer.com/v1/marketplace/payments/%s/charges/%s/cancels';
$config[UnzerApiConstants::REFUND_URL] = 'https://api.unzer.com/v1/payments/%s/charges/%s/cancels';
$config[UnzerApiConstants::GET_PAYMENT_METHODS_URL] = 'https://api.unzer.com/v1/keypair';
```
</details>

<details>
<summary>config/Shared/config_default_DE.php</summary>

```php
<?php

use SprykerEco\Shared\Unzer\UnzerConstants;

$config[UnzerConstants::UNZER_AUTHORIZE_RETURN_URL] = 'https://yves.de.spryker.local/unzer/payment-result';
$config[UnzerConstants::UNZER_CHARGE_RETURN_URL] = 'https://yves.de.spryker.local/unzer/payment-result';
```

## Specific Configuration

Also, you have to add payment methods to the State Machine (OMS) and Domain Whitelist configuration:

```php

$config[KernelConstants::DOMAIN_WHITELIST] = array_merge($trustedHosts, [
    'payment.unzer.com',
]);

$config[OmsConstants::PROCESS_LOCATION] = [
    ...
    APPLICATION_ROOT_DIR . '/vendor/spryker-eco/unzer/config/Zed/Oms',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
    ...
    'UnzerMarketplaceBankTransfer01',
    'UnzerMarketplaceSofort01',
    'UnzerMarketplaceCreditCard01',
    'UnzerCreditCard01',
    'UnzerBankTransfer01',
    'UnzerSofort01',
];

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    ...
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_BANK_TRANSFER => 'UnzerMarketplaceBankTransfer01',
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_CREDIT_CARD => 'UnzerMarketplaceCreditCard01',
    UnzerConfig::PAYMENT_METHOD_KEY_CREDIT_CARD => 'UnzerCreditCard01',
    UnzerConfig::PAYMENT_METHOD_KEY_MARKETPLACE_SOFORT => 'UnzerMarketplaceSofort01',
    UnzerConfig::PAYMENT_METHOD_KEY_BANK_TRANSFER => 'UnzerBankTransfer01',
    UnzerConfig::PAYMENT_METHOD_KEY_SOFORT => 'UnzerSofort01',
];

 ```

## Notifications
To complete the payment modification requests (authorize succeeded, payment completed), it's necessary to provide correct URL of your Yves with `/unzer/notification` path to the config file.
Example:
```php
    $config[UnzerConstants::WEBHOOK_RETRIEVE_URL] = 'https://yves.spryker.com/unzer/notification';

```

## Expense refund strategies
You can choose one of provided refund strategies for your payment flow (configuration key - `UnzerConstants::EXPENSES_REFUND_STRATEGY_KEY`):
* `UnzerConstants::LAST_SHIPMENT_ITEM_EXPENSES_REFUND_STRATEGY` - Expense costs will be refunded with the last item in corresponding shipment.
* `UnzerConstants::LAST_ORDER_ITEM_EXPENSES_REFUND_STRATEGY` - Expense costs will be refunded with the last item in whole order.
* `UnzerConstants::NO_EXPENSES_REFUND_STRATEGY` - Expense costs will not be refunded.

## Check payment after return request

In order to check if authorization has been successful or failed - please use next Yves path for `UnzerConstants::UNZER_AUTHORIZE_RETURN_URL` - `https://yves.spryker.com/unzer/payment-result`. After check this endpoint will redirect customer to default success or fail page.
