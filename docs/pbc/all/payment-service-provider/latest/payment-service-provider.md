---
title: Payment Service Provider
description: Learn about the different types of payment methods that you can configure for your store using the Spryker Payment Service Provider module.
last_updated: Mar 20, 2026
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/payment-service-providers/psp.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payment-service-provider-integrations.html
---

The *Payment Service Provider* PBC enables different kinds of payment methods, like credit cards of gift cards, to be used by customers. You can configure multiple payment methods to be available in your shop. The variety of third-party payment solutions let you find the best payment methods for your business requirements.

The capability consists of a base shop and the marketplace addon. The base shop features are needed for running a regular shop in which your company is the only entity fulfilling orders. To run a marketplace, the features from both the base shop and the marketplace addon are required.

Spryker offers the following Payment Service Providers (PSP) integrations:

| NAME                                                                                                                                                       | MARKETPLACE COMPATIBLE | AVAILABLE IN ACP |
|------------------------------------------------------------------------------------------------------------------------------------------------------------| --- | --- |
| Spryker Pay                                                                                                                                                | Yes | No |
| [Adyen](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/adyen/adyen.html)                                                 | No | No |
| [After Pay](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/afterpay/afterpay.html)                                       | No | No |
| [Braintree](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/braintree/braintree.html)                                     | No | No |
| [Crefo Pay](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay.html)                                       | No | No |
| [Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/computop.html)                                        | No | No |
| [Easycredit](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratenkauf-by-easycredit/ratenkauf-by-easycredit.html)        | No | No |
| Optile                                                                                                                                                     | No | No |
| [Payone](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/payone/app-composition-platform-integration/payone-acp-app.html) | No | Yes |
| [Ratepay](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/ratepay.html)                                           | No | No |
| [Unzer](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/unzer/unzer.html)                                                 | Yes | No |

## Custom PSP integrations

If your payment provider does not have an existing Spryker integration, you can use the [PSP Integration Template](/docs/integrations/custom-building-integrations/psp-integration-template.html) to develop a custom PSP connection. The template provides a complete module structure, database schema, Order Management System (OMS) configuration, and integration points required for a PSP module. This allows you to focus on implementing provider-specific API communication and business logic rather than building the module architecture from scratch.
