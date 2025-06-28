---
title: Computop
description: Enable merchants and white label customers to process global multichannel payments by integrate Computop into the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop
originalArticleId: afe86236-29c0-44e5-94ed-8df656c7a9de
redirect_from:
  - /docs/scos/user/technology-partners/202311.0/payment-partners/computop.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/computop/computop.html
related:
  - title: Integrating the Sofort payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayPal payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paypal-payment-method-for-computop.html
  - title: Computop API calls
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/computop-api-calls.html
  - title: Integrating the PayNow payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paynow-payment-method-for-computop.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-direct-debit-payment-method-for-computop.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-ideal-payment-method-for-computop.html
  - title: Integrating the Сredit Сard payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-credit-card-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-easy-credit-payment-method-for-computop.html
  - title: Integrating the Paydirekt payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paydirekt-payment-method-for-computop.html
  - title: Integrating the CRIF payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-crif-payment-method-for-computop.html
---

## Partner Information

[Computop](https://www.computop.com/de/) is a leading international Payment Service Provider that enables merchants and white label customers to process global multichannel payments. Computop's state of the art and wholly owned payment platform Computop Paygate offers seamless solutions for mobile, online and in store payment transactions. All transactions processed by Computop Paygate are secure as our platform is PCI certified.

Computop offers a global payment management solution that is connected to over 350 payment methods and acquirer connections worldwide, customizable fraud prevention, tokenization and other value added services like currency conversion and debt management that result in secure transaction processing and higher conversion rates.

Paygate is scalable and favoured by merchants in the travel, gaming, gambling, digital, hospitality, and the retail industry. Prebuilt payment and fraud management integration cartridges or modules are available for leading ERP and shop system solutions including demandware, hybris, intershop, Magento, and IBM Websphere.

Founded in 1997, Computop is a global player for the twenty first century. Headquartered in Bamberg, Germany, the company has sales operations in New York, London, and Shanghai. Computop is trusted by the largest global brands worldwide including Samsung, The Otto Group, C&A, Fossil, Metro Cash & Carry, and Swarovski.

The Computop payment partner is shipped with the following payment methods:

- Credit Card
- Direct Debit
- EasyCredit
- iDeal
- Paydirekt
- PayNow
- PayPal
- SofortÜberweisung
- PayU CEE Single
- PayPal Express

### PSD2 compatibility

Computop PSP integration supports PSD2. For CreditCard and PayNow payment methods, customer address and additional information is sent to Computop to prevent fraud actions.

### Notifications

Push notifications speed up order placement process for customers. They allow to place orders regardless of the authorization of cards or money transfer for payment methods such as Sofortüberweisung or IDeal. After a customer places an order, they are redirected to the checkout success page. When authorization or money transfer is complete, Computop notifies the shop via a push notification. Order status is updated according to the push notification and the order moves forward in the state machine.

## Related Developer guides

- [Installing and configuring Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/install-and-configure-computop.html)
- [Integrating Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-computop.html)
- [Computop API calls](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/computop-api-calls.html)
- [Computop - OMS plugins](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/computop-oms-plugins.html)
- [Integrating the Сredit Сard payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-credit-card-payment-method-for-computop.html)
- [Integrating the CRIF payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-crif-payment-method-for-computop.html)
- [Integrating the Direct Debit payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-direct-debit-payment-method-for-computop.html)
- [Integrating the Easy Credit payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-easy-credit-payment-method-for-computop.html)
- [Integrating the iDeal payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-ideal-payment-method-for-computop.html)
- [Integrating the Paydirekt payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paydirekt-payment-method-for-computop.html)
- [Integrating the PayNow payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paynow-payment-method-for-computop.html)
- [Integrating the PayPal payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paypal-payment-method-for-computop.html)
- [Integrating the Sofort payment method for Computop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-sofort-payment-method-for-computop.html)
