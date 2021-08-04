---
title: Ratenkauf by Easycredit - Installation and configuration
originalLink: https://documentation.spryker.com/v6/docs/ratenkauf-by-easycredit-installation-and-configuration
redirect_from:
  - /v6/docs/ratenkauf-by-easycredit-installation-and-configuration
  - /v6/docs/en/ratenkauf-by-easycredit-installation-and-configuration
---

## Installation

To install Easycredit, run the following command in  console:
```bash
composer require spryker-eco/easycredit
```

After installation, run the `propel:install` command or check the following migration:

```php
CREATE SEQUENCE "spy_payment_easycredit_api_log_pk_seq";
 
CREATE TABLE "spy_payment_easycredit_api_log"
(
    "id_payment_easycredit_api_log" INTEGER NOT NULL,
    "type" VARCHAR NOT NULL,
    "request" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "status_code" INT2,
    "error_code" VARCHAR,
    "error_message" VARCHAR,
    "error_type" VARCHAR,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("id_payment_easycredit_api_log")
);
 
CREATE SEQUENCE "spy_payment_easycredit_order_identifier_pk_seq";
 
CREATE TABLE "spy_payment_easycredit_order_identifier"
(
    "id_payment_easycredit_order_identifier" INTEGER NOT NULL,
    "fk_sales_order" INTEGER NOT NULL,
    "identifier" VARCHAR NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    PRIMARY KEY ("id_payment_easycredit_order_identifier")
);
```


## Configuration
Perform the initial configuration of Easycredit:

```php
<?php
...
use SprykerEco\Shared\Easycredit\EasycreditConstants;
use Spryker\Shared\Oms\OmsConstants;
use Spryker\Shared\Sales\SalesConstants;
 
...
 
$config[OmsConstants::ACTIVE_PROCESSES] = [
    ...
    'Easycredit01',
];
 
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    ...
    'easycredit' => 'Easycredit01',
];
 
...
$config[EasycreditConstants::SHOP_IDENTIFIER] = 'Your shop identifier';
$config[EasycreditConstants::SHOP_TOKEN] = 'Your shop token';
$config[EasycreditConstants::API_URL] = 'https://ratenkauf.easycredit.de/ratenkauf-ws/rest/v2';
$config[EasycreditConstants::SUCCESS_URL] = $config[ApplicationConstants::BASE_URL_YVES] . '/easycredit/payment/success';
$config[EasycreditConstants::CANCELLED_URL] = $config[ApplicationConstants::BASE_URL_YVES] . '/checkout/payment';
$config[EasycreditConstants::DENIED_URL] = $config[ApplicationConstants::BASE_URL_YVES] . '/checkout/payment';
```

