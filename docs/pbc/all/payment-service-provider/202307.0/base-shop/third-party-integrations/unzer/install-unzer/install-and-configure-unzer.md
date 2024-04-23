---
title: Install and configure Unzer
description: Install and configure Unzer to work in the Spryker Commerce OS.
last_updated: Jun 22, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-providers/unzer/install-unzer/install-and-configure-unzer.html
  - /docs/pbc/all/payment-service-provider/202307.0/third-party-integrations/unzer/install-unzer/install-and-configure-unzer.html
related:
- title: Integrate Unzer
  link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/unzer/install-unzer/integrate-unzer.html
---

This document describes how to install and configure the Unzer module to [integrate the Unzer module](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/unzer/install-unzer/integrate-unzer.html) into your project.

## Overview

The `spryker-eco/unzer` module provides integration of the Spryker e-commerce system with the Unzer technology partner.
It requires the `SprykerEco.UnzerApi` `spryker-eco/unzer-api` module, which provides the REST Client for making API calls to the Unzer payment provider.
It also requires the `SprykerEco.UnzerGui` `spryker-eco/unzer-gui` module, which provides Back Office functionality to configure Unzer credentials.

The `SprykerEco.Unzer` module includes integration with the following:
* Checkout process—payment forms with all necessary fields that are required to make payment request and save order information.
* Order Management System (OMS)—state machines with all necessary commands for making modification requests and conditions for changing orders status accordingly.

The `SprykerEco.Unzer` module provides the following payment methods:
* Credit Card
* Sofort
* Bank Transfer
* Marketplace Credit Card
* Marketplace Sofort
* Marketplace Bank Transfer

## Install and configure Unzer

To install and configure the Unzer module, follow the steps below.

### Install Unzer modules

```
composer require spryker-eco/unzer spryker-eco/unzer-gui
```

### Check general configuration

You can find all necessary configurations in `vendor/spryker-eco/unzer/config/config.dist.php` and `vendor/spryker-eco/unzer-api/config/config.dist.php`.

The following table describes all general configuration keys and their values.

| CONFIGURATION KEY | TYPE | DESCRIPTION |
|---|---|---|
| `UnzerConstants::UNZER_AUTHORIZE_RETURN_URL`   | String | Return back URL after payment authorization.                                 |
| `UnzerConstants::UNZER_CHARGE_RETURN_URL`      | String | Return back URL after payment direct charge.                                 |
| `UnzerConstants::WEBHOOK_RETRIEVE_URL`         | String | Webhook retrieve URL for Unzer payment notifications.                        |
| `UnzerConstants::VAULT_DATA_TYPE`              | String | Abstract data type for Unzer data saved in `Spryker.Vault`.                  |
| `VaultConstants::ENCRYPTION_KEY`               | String | Key for encrypting Unzer private keys in `Spryker.Vault`. |
| `UnzerConstants::EXPENSES_REFUND_STRATEGY_KEY` | Integer | Expense (shipment) refund strategy key. for details, see the [Select expense refund strategies](#select-expense-refund-strategy) section. |
| `UnzerApiConstants::LOG_API_CALLS`             | Boolean | Flag indicating if API calls log must be saved.                       |

#### Configuration example

**config/Shared/config_default.php**

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


**config/Shared/config_default_DE.php**

```php
<?php

use SprykerEco\Shared\Unzer\UnzerConstants;

$config[UnzerConstants::UNZER_AUTHORIZE_RETURN_URL] = 'https://mysprykershop/unzer/payment-result';
$config[UnzerConstants::UNZER_CHARGE_RETURN_URL] = 'https://mysprykershop/unzer/payment-result';
```

### Add payment methods to State Machine and Domain Whitelist configuration

Add payment methods to the State Machine (OMS), Domain Whitelist, and Session Frontend configuration:

```php

$config[KernelConstants::DOMAIN_WHITELIST] = array_merge($trustedHosts, [
    'payment.unzer.com',
]);

 // >>> SESSION FRONTEND
...
$config[SessionConstants::YVES_SESSION_COOKIE_SAMESITE] = Cookie::SAMESITE_LAX; // Allows to redirect customers from Unzer back to the shop via a `GET` request.
...

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

### Configure notifications

To complete the payment modification requests (authorize succeeded, payment completed), you must provide a correct URL of your Yves with the `/unzer/notification` path to the config file.

Example:

```php
    $config[UnzerConstants::WEBHOOK_RETRIEVE_URL] = 'https://mysprykershop/unzer/notification';

```

### Select expense refund strategy

You can choose one of the provided refund strategies for your payment flow (the configuration key: `UnzerConstants::EXPENSES_REFUND_STRATEGY_KEY`):
* `UnzerConstants::LAST_SHIPMENT_ITEM_EXPENSES_REFUND_STRATEGY`—expense costs are refunded with the last item in corresponding shipment.
* `UnzerConstants::LAST_ORDER_ITEM_EXPENSES_REFUND_STRATEGY`—expense costs are refunded with the last item in the whole order.
* `UnzerConstants::NO_EXPENSES_REFUND_STRATEGY`—expense costs are not refunded.

### Check payment after return request

To check whether authorization has been successful or failed, for `UnzerConstants::UNZER_AUTHORIZE_RETURN_URL`, use the following Yves path —`https://mysprykershop/unzer/payment-result`. After the check is complete, this endpoint redirects a customer to a default success or fail page.
