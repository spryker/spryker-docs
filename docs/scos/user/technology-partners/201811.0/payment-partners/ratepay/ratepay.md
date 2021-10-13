---
title: RatePay
description: Offer intelligent payment solutions for handling most popular paylater models like invoice and installments on the internet for the DACH region by integrating RatePay into the Spryker-based shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/ratepay
originalArticleId: 27243cb3-7264-41b1-89d9-c26626183a33
redirect_from:
  - /v1/docs/ratepay
  - /v1/docs/en/ratepay
related:
  - title: RatePay - Payment Workflow
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
  - title: RatePay - Facade
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: RatePay - How to Disable Address Updates from the Backend Application
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-how-to-disable-address-updates-from-the-backend-application.html
  - title: RatePay - Direct Debit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-payment-methods/ratepay-direct-debit.html
  - title: RatePay - Invoice
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-payment-methods/ratepay-invoice.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: RatePay - Installment
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-payment-methods/ratepay-installment.html
  - title: RatePay - Prepayment
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-payment-methods/ratepay-prepayment.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
---

## Partner Information

[ABOUT RatePAY](https://www.ratepay.com/)
RatePAY is a German Fintech company that offers intelligent payment solutions with 100% loss protection for the handling of the most popular paylater models like invoice and instalments on the internet for the DACH region. Our easy payment methods are among the most popular payment solutions in Germany. One of the reasons lies in the flexibility of our products, since the customer pays only for the goods he decides to keep. As one of only a few payment service companies, RatePAY has been granted a license under the German Payment Services Oversight Act (ZAG) by the Federal Financial Supervisory Authority (BaFin) and is now able to offer customers an even more comprehensive service. Founded in December 2009, the start-up from Berlin has developed itself into a profitable company with more than 140 employees. In April 2017, RatePAY was acquired by the investors Advent International and Bain Capital. 

YOUR ADVANTAGES:

* Complete solutions for unsecured methods of payment as invoice, instalments, direct debit and prepayment
* White label solution
* B2B and B2C customers
* Risk and customer management, customer service
* Individual service packages for large online retailers
* No hidden charges for buyers and traders
* Continuous development of innovative features
* Seamless integration 

RatePAY is an online service provider that allows merchants to provide their customers secure, customized payment methods.

RatePAY bears the full risk and takes over the complete processing.

<b>RatePAY provides four methods of payment</b>:

* [Invoice](/docs/scos/dev/technology-partners/201811.0/payment-partners/ratepay/ratepay-invoice.html)
* [Prepayment](/docs/scos/dev/technology-partners/201811.0/payment-partners/ratepay/ratepay-prepayment.html)
* [Direct Debit (ELV)](/docs/scos/dev/technology-partners/201811.0/payment-partners/ratepay/ratepay-direct-debit.html)
* [Installment](/docs/scos/dev/technology-partners/201811.0/payment-partners/ratepay/ratepay-installment.html)

We use state machines for handling and managing orders and payments. To integrate RatePAY payments, a state machine for RatePAY should be created.

A basic and fully functional state machine for each payment method is already built:

* `RatepayInvoice01.xml`
* `RatepayPrepayment01.xml`
* `RatepayElv01.xml`
* `RatepayInstallment01.xml`

You can use the same state machines or build new ones. The state machine commands and conditions trigger RatePAY facade calls in order to perform the needed requests to RatePAY.

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-forms hubspot-forms--docs">
<div class="hubspot-form" id="hubspot-partners-1">
            <div class="script-embed" data-code="
                                            hbspt.forms.create({
				                                portalId: '2770802',
				                                formId: '163e11fb-e833-4638-86ae-a2ca4b929a41',
              	                                onFormReady: function() {
              		                                const hbsptInit = new CustomEvent('hbsptInit', {bubbles: true});
              		                                document.querySelector('#hubspot-partners-1').dispatchEvent(hbsptInit);
              	                                }
				                            });
            "></div>
</div>
</div>
