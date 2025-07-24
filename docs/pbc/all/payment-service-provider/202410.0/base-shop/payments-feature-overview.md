---
title: Payments feature overview
description: Orders can be paid with none, one or multiple payment methods that can be selected during checkout. Offer multiple payment methods for a single order.
last_updated: Jul 23, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payments-feature-overview
originalArticleId: db728134-17d6-4023-8d7a-55177ee5af44
redirect_from:
  - /docs/scos/user/features/202108.0/payments-feature-overview.html
  - /docs/scos/user/features/202200.0/payments-feature-overview.html
  - /docs/scos/user/features/202311.0/payments-feature-overview.html
  - /docs/pbc/all/payment-service-provider/202311.0/payments-feature-overview.html
  - /docs/pbc/all/payment-service-provider/202311.0/payments-feature-overview.html
  - /docs/scos/user/features/202204.0/payments-feature-overview.html
---

The *Payments* feature lets your customers pay for orders with none (for example, a [gift card](/docs/pbc/all/gift-cards/{{page.version}}/gift-cards.html)), one, or multiple payment methods during the checkout process. Most orders are paid with a single payment method, but in some cases, it may be useful to allow multiple payment methods. For example, the customer may want to use two credit cards or a gift card in addition to a traditional payment method.

With different payment gateways, like Amazon Pay, PayPal, and BS Payone, you can adapt to your customers' needs and define the availability of payment methods based on customer preferences and country-specific regulations.

So that your customers can select a payment method during the checkout, you must fulfill the following conditions:
- Make the payment method active.
- Assign the payment method to specific stores.

These settings can be configured in the Back Office.

The Spryker Commerce OS offers integrations with several payment providers that can be used in checkout and order management. You can easily define the availability of a provider based on customer preferences and local regulations and specify the order in which the providers are displayed during checkout.

## Payment providers

The Spryker Commerce OS supports the integration of the following payment providers, which are our official partners:

- [Adyen](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/adyen/adyen.html)
- [AfterPay](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/afterpay/afterpay.html)
- [Amazon Pay](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/amazon-pay/amazon-pay.html)
- [Arvato](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/arvato/arvato.html)
- [Billie](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/billie.html)
- [Billpay](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/billpay/billpay.html)
- [Braintree](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/braintree/braintree.html)
- [BS Payone](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/payone.html)
- [Computop](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/computop/computop.html)
- [CrefoPay](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/crefopay/crefopay.html)
- [Heidelpay](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/heidelpay/heidelpay.html)
- [Klarna](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/klarna/klarna.html)
- [Payolution](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payolution/payolution.html)
- [Powerpay](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/powerpay.html)
- [ratenkauf by easyCredit](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/ratenkauf-by-easycredit/ratenkauf-by-easycredit.html)
- [RatePay](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/ratepay/ratepay.html)

## Dummy payment

By default, Spryker provides the [DummyPayment](https://github.com/spryker/dummy-payment) module, which has credit card and invoice payments implemented. You can use these implemented payment methods or refer to the DummyPayment module when implementing additional payment methods in your project.
For details about implementing a new payment method, see [how to implement the Direct Debit payment method](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-payment.html). Based on the examples in these documents, you can implement other payment methods for your projects.

## Payment methods in the Back Office

In the Back Office, you can view all payment methods available in the shop application and make a payment method active (visible) or inactive (invisible) in the **Payment** step of the checkout process. In addition, you can define stores in which a payment method is displayed. If changed, the payment methods are updated in the checkout as well.

{% info_block warningBox "Note" %}

Before managing payment methods in the Back Office, you need to create them by [importing payment methods data using a .CSV file](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/import-and-export-data/import-file-details-payment-method.csv.html).

{% endinfo_block %}

![List of payment methods](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Payment/Payment+Methods+Overview/payment-methods-list.png)

To learn more on how to make a payment method available during the checkout and assign it to a different store, see [Edit payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html).

<!-- Managing Payment Methods in the Back Office

Overview of the reference information when working with payment methods in the Back Office

HowTo - Import Payment Method Store Relation Data

Hydrating payment methods for an order

  -->

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [View payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/view-payment-methods.html)   |
| [Edit payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html)   |

## Related Developer articles

| INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|---|---|
| [Install the Payments feature](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/install-and-upgrade/install-the-payments-feature.html) | [Payment migration guide](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/install-and-upgrade/upgrade-the-payment-module.html) | [Update payment data](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-update-payment-data.html) | [File details: payment_method.csv](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/import-and-export-data/import-file-details-payment-method-store.csv.html) | [HowTo: Hydrate payment methods for an order](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/hydrate-payment-methods-for-an-order.html) | |
|  |  |  | [File details: payment_method_store.csv](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/import-and-export-data/import-file-details-payment-method-store.csv.html) | [Implementing Direct Debit Payment](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-payment.html) |  |
|  |  |  |  | [Interact with third party payment providers using Glue API](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/interact-with-third-party-payment-providers-using-glue-api.html) |  |
