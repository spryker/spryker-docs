---
title: Installing and configuring Inxmail
description: Install and configure Inxmail
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
    - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/customer-communication/inxmail/installing-and-configuring-inxmail.html
---

This document describes how to install and configure Inxmail.

## Installation

To install Inxmail run the command in the console:
```php
 composer require spryker-eco/inxmail:1.1.0
 ```

## Configuration

{% info_block infoBox %}

The module supports only a subset of Inxmail REST API—transactional emails (events).

{% endinfo_block %}

To set up the Inxmail initial configuration, use the credentials you received from your Inxmail server. Key ID and secret you can get from Settings → API keys panel on Inxmail server:
```php
 $config[InxmailConstants::API_EVENT_URL] = '';
 $config[InxmailConstants::KEY_ID] = '';
 $config[InxmailConstants::SECRET] = '';
 ```

Event names depend on your events names on Inxmail server:
```php
 $config[InxmailConstants::EVENT_CUSTOMER_REGISTRATION] = '';
 $config[InxmailConstants::EVENT_CUSTOMER_RESET_PASSWORD] = '';
 $config[InxmailConstants::EVENT_ORDER_NEW] = '';
 $config[InxmailConstants::EVENT_ORDER_SHIPPING_CONFIRMATION] = '';
 $config[InxmailConstants::EVENT_ORDER_CANCELLED] = '';
 $config[InxmailConstants::EVENT_ORDER_PAYMENT_IS_NOT_RECEIVED] = '';
 ```
