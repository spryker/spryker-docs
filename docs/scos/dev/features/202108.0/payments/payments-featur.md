---
title: Payments feature overview
originalLink: https://documentation.spryker.com/2021080/docs/payments-feature-overview
redirect_from:
  - /2021080/docs/payments-feature-overview
  - /2021080/docs/en/payments-feature-overview
---

The *Payments* feature allows your customers to pay for orders with none (for example, a [gift card](https://documentation.spryker.com/docs/gift-card-feature-overview), one or multiple payment methods during the checkout process. Most orders are paid with a single payment method but in some cases, it may be useful to allow multiple payment methods. For instance, the customer may want to use two credit cards or a gift card in addition to a traditional payment method.

With different payment gateways, like Amazon Pay, PayPal and BS Payone, you can adapt to your customers' needs and define the availability of payment methods based on customer preferences and country-specific regulations.

To make it possible, your customers to select a payment method during the checkout, you should fulfill the following conditions:

* make it active
* assign to specific stores

This can be configured in the Back Office.

The Spryker Commerce OS offers integrations with several payment providers that can be used in the checkout and order management. Easily define the availability of a provider based on customer preferences and local regulations and specify the order the providers are displayed in during checkout.

## Payment providers

The Spryker Commerce OS supports integration of the following payment providers, which are our official partners:

* [Adyen](https://documentation.spryker.com/docs/adyen)
* [AfterPay](https://documentation.spryker.com/docs/afterpay)
* [Amazon Pay](https://documentation.spryker.com/docs/amazon-pay)
* [Arvato](https://documentation.spryker.com/docs/arvato)
* [Billie](https://documentation.spryker.com/docs/billie)
* [Billpay](https://documentation.spryker.com/docs/billpay)
* [Braintree](https://documentation.spryker.com/docs/braintree)
* [BS Payone](https://documentation.spryker.com/docs/payone-v1-1)
* [Computop](https://documentation.spryker.com/docs/computop)
* [CrefoPay](https://documentation.spryker.com/docs/crefopay)
* [Heidelpay](https://documentation.spryker.com/docs/heidelpay)
* [Klarna](https://documentation.spryker.com/docs/klarna)
* [Payolution](https://documentation.spryker.com/docs/payolution)
* [Powerpay](https://documentation.spryker.com/docs/powerpay)
* [Ratenkauf by Easycredit](https://documentation.spryker.com/docs/ratenkauf-by-easycredit)
* [RatePay](https://documentation.spryker.com/docs/ratepay)

## Dummy payment
By default, Spryker provides the [DummyPayment](https://github.com/spryker/dummy-payment) module, which has Credit Card and Invoice payments implemented. You can use these implemented payment methods, or refer to the DummyPayment modulewhen implementing additional payment methods in your project.
For details on how a new payment method is implemeted, see the articles on [how to implement the Direct Debit payment method](https://documentation.spryker.com/docs/ht-implement-dd). Based on the examples in these articles, you can implement other payment methods for your projects.

## Payment methods in the Back Office
In the Back Office, you can view all payment methods available in the shop application, make a payment method active (visible) or inactive (invisible) in the Payment step of the checkout process. In addition, you can define stores in which a payment method will be displayed. If changed, the payment methods will be updated in the checkout as well. 

{% info_block warningBox "Note" %}
Keep in mind that prior to managing payment methods in the Back Office, first, you need to create them by [importing payment methods data using a .CSV file](https://documentation.spryker.com/docs/en/file-details-payment-methodcsv
{% endinfo_block %}. 

![List of payment methods](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Payment/Payment+Methods+Overview/payment-methods-list.png){height="" width=""}

See [Managing Payment Methods](https://documentation.spryker.com/docs/en/managing-payment-methods) to learn more on how to make a payment method available during the checkout and assign it to different stores.



<!-- Managing Payment Methods in the Back Office

Overview of the reference information when working with payment methods in the Back Office

HowTo - Import Payment Method Store Relation Data

Hydrating payment methods for an order

  -->
  
  
  
  
  


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/updating-payment-data" class="mr-link">Update payment data of an order via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/file-details-payment-methodcsv" class="mr-link">Import payment methods</a></li>
                 <li><a href="https://documentation.spryker.com/docs/ht-implement-dd" class="mr-link">Implement Direct Debit</a></li>
                 <li><a href="https://documentation.spryker.com/docs/ht-hydrate-payment-methods-for-order" class="mr-link">Learn how to hydrate payment methods for an order</a></li> 
                <li><a href="https://documentation.spryker.com/docs/file-details-payment-method-storecsv" class="mr-link">Import store relations for payment methods</a></li>
                <li><a href="https://documentation.spryker.com/docs/t-interacting-with-third-party-payment-providers-via-glue-api" class="mr-link">Interact with third-party payment providers via Glue API</a></li>
                 <li><a href="https://documentation.spryker.com/docs/adyen" class="mr-link">Learn about payment provider partner integrations</a></li>
                 <li>Integrate the Payment feature:</li>
                 <li><a href="https://documentation.spryker.com/docs/payments-feature-integration" class="mr-link">Integrate the Payments feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/mg-payment#upgrading-from-version-4---to-version-5-0-0" class="mr-link">Migrate the Payments module from version 3* to version 5*</a></li>
                            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                           <li><a href="https://documentation.spryker.com/docs/managing-payment-methods" class="mr-link">Mange payment methods</a></li>
            </ul>
        </div>
    </div>
</div>

