---
title: Computop
description: Enable merchants and white label customers to process global multichannel payments by integrating Computop into the Spryker Commerce OS.
originalLink: https://documentation.spryker.com/2021080/docs/computop
originalArticleId: afe86236-29c0-44e5-94ed-8df656c7a9de
redirect_from:
  - /2021080/docs/computop
  - /2021080/docs/en/computop
  - /docs/computop
  - /docs/en/computop
---

## Partner Information

[Computop](https://www.computop.com/de/) is a leading international Payment Service Provider that enables merchants and white label customers to process global multichannel payments. Computop’s state of the art and wholly owned payment platform Computop Paygate offers seamless solutions for mobile, online and in store payment transactions. All transactions processed by Computop Paygate are secure as our platform is PCI certified.

Computop offers a global payment management solution that is connected to over 350 payment methods and acquirer connections worldwide, customizable fraud prevention, tokenization and other value added services like currency conversion and debt management that result in secure transaction processing and higher conversion rates.

Paygate is scalable and favoured by merchants in the travel, gaming, gambling, digital, hospitality, and the retail industry. Prebuilt payment and fraud management integration cartridges or modules are available for leading ERP and shop system solutions including demandware, hybris, intershop, Magento, and IBM Websphere.

Founded in 1997, Computop is a global player for the 21st century. Headquartered in Bamberg, Germany, the company has sales operations in New York, London, and Shanghai. Computop is trusted by the largest global brands worldwide including Samsung, The Otto Group, C&A, Fossil, Metro Cash & Carry, and Swarovski.

## General Information
The [SprykerEco.Computop](https://github.com/spryker-eco/computop) bundle provides integration of the Computop industry partner with Spryker Commerce OS. It requires the [SprykerEco.ComputopApi](https://github.com/spryker-eco/computop-api) bundle that provides the REST Client for making API calls to the Computop Payment Provider.

The `SprykerEco.Computop` module includes the integrations:
* Checkout process - payment forms with all the necessary fields that are required to make payment requests, save order information and so on. 
* OMS (Order Management System) - state machines, all necessary commands for making modification requests and conditions for changing order statuses accordingly.


The `SprykerEco.Computop` module provides the following payment methods:

* [Credit Card](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/computop/computop-payment-methods/computop-credit-card.html)
* [Direct Debit](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/computop/computop-payment-methods/computop-direct-debit.html)
* [EasyCredit](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/computop/computop-payment-methods/computop-easy-credit.html)
* [iDeal](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/computop/computop-payment-methods/computop-ideal.html)
* [Paydirekt](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/computop/computop-payment-methods/computop-paydirekt.html)
* [PayNow](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/computop/computop-payment-methods/computop-paynow.html)
* [PayPal](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/computop/computop-payment-methods/computop-paypal.html)
* [SofortÜberweisung](/docs/scos/dev/technology-partners/{{page.version}}/payment-partners/computop/computop-payment-methods/computop-sofort.html)

### PSD2 compatibility
Computop PSP integration supports PSD2. For CreditCard and PayNow payment methods, customer address and additional information is sent to Computop to prevent fraud actions.

### Notifications
Push notifications speed up order placement process for customers. They allow to place orders regardless of the authorization of cards or money transfer for payment methods such as Sofortüberweisung or IDeal. After a customer places an order, they are redirected to the checkout success page. When authorization or money transfer is complete, Computop notifies the shop via a push notification. Order status is updated according to the push notification and the order moves forward in the state machine.
