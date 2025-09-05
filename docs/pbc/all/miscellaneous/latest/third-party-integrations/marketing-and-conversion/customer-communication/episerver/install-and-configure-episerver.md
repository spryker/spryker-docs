---
title: Installing and configuring Episerver
description: Learn how to install and configure Episerver within your Spryker Cloud Commerce OS Projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/episerver-installation-and-configuration
originalArticleId: b958e572-8aa3-48a1-9586-b3614abef99e
redirect_from:
  - /2021080/docs/episerver-installation-and-configuration
  - /2021080/docs/en/episerver-installation-and-configuration
  - /docs/episerver-installation-and-configuration
  - /docs/en/episerver-installation-and-configuration
  - /docs/scos/user/technology-partners/202204.0/marketing-and-conversion/customer-communication/episerver/installing-and-configuring-episerver.html
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/customer-communication/episerver/installing-and-configuring-episerver.html
  - /docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/customer-communication/episerver/installing-and-configuring-episerver.html
  - /docs/pbc/all/miscellaneous/latest/third-party-integrations/marketing-and-conversion/customer-communication/episerver/install-and-configure-episerver.html
related:
  - title: Episerver - Integration into a project
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/integrate-episerver.html
  - title: Episerver - Order referenced commands
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/episerver-order-reference-commands.html
  - title: Episerver - API Requests
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/episerver-api.html
---

## Installation

To install Episerver, install the required module:

```bash
composer require spryker-eco/episerver
```

## Configuration

To set up the Episerver initial configuration, use the credentials received from your Episerver admin page.

The `REQUEST_BASE_URL` parameter should be: `https://api.campaign.episerver.net/`

To get `ORDER_LIST_AUTHORIZATION_CODE` or `CUSTOMER_LIST_AUTHORIZATION_CODE`, go to:

<i>Menu → API overview → SOAP API → Recipient lists → (Click one of your lists here) → Manage authorization codes → Authorization code</i>

To get any `...MAILING_ID`, go to:

<b>Menu → Transactional mails → ID</b>

```php
$config[EpiserverConstants::REQUEST_BASE_URL] = 'https://api.campaign.episerver.net/';
$config[EpiserverConstants::REQUEST_TIMEOUT] = 30;

$config[EpiserverConstants::ORDER_LIST_AUTHORIZATION_CODE] = 'QJd9U0M9xssRGhnJrNr5ztt9FQa2x1wA';
$config[EpiserverConstants::CUSTOMER_LIST_AUTHORIZATION_CODE] = 'QJd9U0M9xssRGhnJrNr5ztt9FQa2x1wA';

$config[EpiserverConstants::ORDER_NEW_MAILING_ID] = '237667360304';
$config[EpiserverConstants::ORDER_CANCELLED_MAILING_ID] = '237667360304';
$config[EpiserverConstants::ORDER_SHIPPING_CONFIRMATION_MAILING_ID] = '237667360304';
$config[EpiserverConstants::ORDER_PAYMENT_IS_NOT_RECEIVED_MAILING_ID] = '237667360304';

$config[EpiserverConstants::EPISERVER_CONFIGURATION_MAILING_ID_LIST] = [
 CustomerRegistrationMailTypePlugin::MAIL_TYPE => '243323625271',
 CustomerRestoredPasswordConfirmationMailTypePlugin::MAIL_TYPE => '243646188958',
 CustomerRestorePasswordMailTypePlugin::MAIL_TYPE => '243646188953',
];
```
