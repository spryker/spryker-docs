---
title: Installing and configuring ratenkauf by easyCredit
description: This article contains installation and configuration information for the ratenkauf by easyCredit module into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/ratenkauf-by-easycredit/installing-and-configuring-ratenkauf-by-easycredit.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/ratenkauf-by-easycredit/install-and-configure-ratenkauf-by-easycredit.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/ratenkauf-by-easycredit/installing-and-configuring-ratenkauf-by-easycredit.html
related:
  - title: ratenkauf by easyCredit
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratenkauf-by-easycredit/ratenkauf-by-easycredit.html
  - title: Integrating ratenkauf by easyCredit
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratenkauf-by-easycredit/integrate-ratenkauf-by-easycredit.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Installation

Install Easycredit:

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
