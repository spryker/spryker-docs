---
title: Multiple Payment Methods per Order
originalLink: https://documentation.spryker.com/v4/docs/multiple-payment-methods-per-order
redirect_from:
  - /v4/docs/multiple-payment-methods-per-order
  - /v4/docs/en/multiple-payment-methods-per-order
---

The **Payment Methods** feature allows your customers to pay for orders with none (for example, a gift card), one or multiple payment methods during the checkout process. Most orders are paid with a single payment method but in some cases, it may be useful to allow multiple payment methods. For instance, the customer may want to use two credit cards or a gift card in addition to a traditional payment method.

To make it possible, your customers to select a payment method during the checkout, you should fulfill the following conditions:

* make it active
* assign to specific stores

This can be configured in the Back Office.

## Payment Methods in the Back Office
In the Back Office, you can view all payment methods available in the shop application, make a payment method active (visible) or inactive (invisible) in the Payment step of the checkout process. In addition, you can define stores in which a payment method will be displayed. If changed, the payment methods will be updated in the checkout as well. 

{% info_block warningBox "Note" %}
Keep in mind that prior to managing payment methods in the Back Office, first, you need to create them by importing payment methods data using a .CSV file. <!-- link -->
{% endinfo_block %}

![List of payment methods](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Payment/Payment+Methods+Overview/payment-methods-list.png){height="" width=""}

See Managing Payment Methods <!-- link --> to learn more on how to make a payment method available during the checkout and assign it to different stores.

The following scheme shows relations between **Payment**, **PaymentGui**, and **PaymentDataImport** modules:

![Scheme of modules](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Payment/Payment+Methods+Overview/payment-methods-modules-scheme.png){height="" width=""}


<!-- Managing Payment Methods in the Back Office

Overview of the reference information when working with payment methods in the Back Office

HowTo - Import Payment Method Store Relation Data

Hydrating payment methods for an order

  -->
