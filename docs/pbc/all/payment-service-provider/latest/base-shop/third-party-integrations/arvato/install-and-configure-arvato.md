---
title: Installing and configuring Arvato
description: Provide complete and comprehensive risk management for the eCommerce/mail-order industry, contributing to a high level of modularization and automation.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/arvato-installation-configuration
originalArticleId: 01e4a638-f2ea-4974-8f55-ee85d8745298
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/arvato/installing-and-configuring-arvato.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/arvato/install-and-configure-arvato.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/arvato/installing-and-configuring-arvato.html
  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/arvato/install-and-configure-arvato.html
related:
  - title: Arvato - Store Order 2.0
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/arvato/arvato-store-order.html
  - title: Arvato
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/arvato/arvato.html
---

{% info_block errorBox %}

There is currently an issue when using giftcards with Arvato. Our team is developing a fix for it.

{% endinfo_block %}

The purpose of developing the risk solution services is to provide a complete and comprehensive risk management for the eCommerce/mail-order industry, contributing to a high level of modularization and automation. Besides the use of pre-configured service modules for risk management, risk solution services comprise process support up to the  outsourcing of the entire operative risk management. All risk management processes are supported by a business intelligence component.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Arvato/arvato-rss-overview.png)

## Prerequisites

For every service call of risk solution services an authorization is required.
The authorization data is transferred in the SOAP header and shows the following structure.

In order to send requests, you are supposed to have the following credentials, provided by Arvato:

| PARAMETER NAME | DESCRIPTION |
| --- | --- |
| `ARVATORSS_URL` | Arvato RSS gateway. |
| `ClientID` | Unique client number in the risk solution services. Will be communicated to the client before the integration |
| `Authorization` | Password for the authorization at risk solution services |
| `ARVATORSS_PAYMENT_TYPE_MAPPING` | A map of payment names to ArvatoRss specific payment type codes. |

The following information (also present in `config.dist.php`) should be specified in configuration:

```php
 ArvatoRssConstants::ARVATORSS_URL =& '';
 ArvatoRssConstants::ARVATORSS_CLIENTID = '';
 ArvatoRssConstants::ARVATORSS_AUTHORISATION ='';
 // Mapping of your payment methods to payment types, that are known by Arvato Rss.
 ArvatoRssConstants::ARVATORSS_PAYMENT_TYPE_MAPPING => [
 'invoice' => ArvatoRssPaymentTypeConstants::INVOICE
 ];
 ```

API URLs:

| NAME | URL |
| --- | --- |
| Production URL | `https://customer.risk-solution-services.de/rss-services/risk-solution-services.v2.1` |
| Sandbox URL | `https://integration.risk-solution-services.de/rss-services/risk-solution-services.v2.1` |

Services:
- [Risk Check](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/arvato/arvato-risk-check.html)
- [Store Order](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/arvato/arvato-store-order.html)

To implement Arvato RSS you should be familiar with concept of extending the Spryker Commerce OS. See [Extending Spryker](/docs/dg/dev/backend-development/extend-spryker/spryker-os-module-customisation/extend-a-core-module-that-is-used-by-another-module.html) for more details.

## Installation

### Composer Dependency

To install Arvato RSS module, use [Composer](https://getcomposer.org/):

```bash
composer require spryker-eco/arvato-rss
```
