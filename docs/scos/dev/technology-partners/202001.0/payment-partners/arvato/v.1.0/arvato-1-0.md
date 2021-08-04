---
title: Arvato - Risk Solution Services Integration 1.0
originalLink: https://documentation.spryker.com/v4/docs/arvato-1-0
redirect_from:
  - /v4/docs/arvato-1-0
  - /v4/docs/en/arvato-1-0
---

The purpose of developing the risk solution services is to provide a complete and comprehensive risk management for the eCommerce/mail-order industry, contributing to a high level of modularization and automation. Besides the use of pre-configured service modules for risk management, risk solution services comprise process support up to the outsourcing of the entire operative risk management. All risk management processes are supported by a business intelligence component.
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Arvato/arvato-rss-overview.png){height="" width=""}

## Prerequisites
For every service call of risk solution services an authorization is required.
The authorization data is transferred in the SOAP header and shows the following structure.
In order to send requests, you are supposed to have the following credentials, provided by Arvato:

| Parameter Name | Description |
| --- | --- |
| ClientID | Unique client number in the risk solution services. Will be communicated to the client before the integration |
| Authorization | Password for the authorization at risk solution services |

The following information (also present in `config.dist.php`) should be specified in configuration:
```php
 $config[ArvatoRssConstants::ARVATORSS] = [
 ArvatoRssConstants::ARVATORSS_URL => '',
 ArvatoRssConstants::ARVATORSS_CLIENTID => '',
 ArvatoRssConstants::ARVATORSS_AUTHORISATION => '',
 ];
 ```

API URLs:

|Name  |URL  |
| --- | --- |
| Production url |`https://customer.risk-solution-services.de/rss-services/risk-solution-services.v2.1`  |
| Sandbox url |`https://integration.risk-solution-services.de/rss-services/risk-solution-services.v2.1`  |

Services:
* [Risk Check](/docs/scos/dev/technology-partners/202001.0/payment-partners/arvato/v.1.0/arvato-risk-che)

To implement Arvato RSS you should be familiar with concept of extending the Spryker Commerce OS. See [Extending Spryker](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-enrichment/extending-spryker/ht-extend-inuse) for more details.

## Installation

### Composer Dependency

To install Arvato RSS module, use [Composer](https://getcomposer.org/):

```
composer require spryker-eco/arvato-rss
```
