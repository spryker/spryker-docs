---
title: Heidelpay
originalLink: https://documentation.spryker.com/v1/docs/heidelpay
redirect_from:
  - /v1/docs/heidelpay
  - /v1/docs/en/heidelpay
---

## Partner Information

[ABOUT HEIDELPAY](https://www.heidelpay.de/) 
Heidelpay is an internationally operating payment institution, authorized and regulated by the Federal Financial Supervisory Authority. The Full-Service Payment Provider covers the entire range of services connected to international electronic payment processing. For more than 13 years the company has been successfully realizing projects of online and stationary retailers and currently serves more than 16.000 customers in many different industrial sectors worldwide. 

## Integrating Heidelpay

To integrate Hidelpay in your project, follow these steps:

1. [Install](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-insta) Heidelpay
2. [Integrate](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-integ) Heidelpay into your Legacy Demoshop project or [integrate](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/scos-integration/heidelpay-integ)  Heidelpay into your Spryker Commerce OS project
3. Configure selected payment methods:

  - Paypal ([Paypal Authorize](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-autho),[Payal Debit](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-paypa))
  - [Credit Card](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-credi)
  - [iDeal](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-ideal)
  - [Easy Credit](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-easy-)
  - [Sofort](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-sofor)
  - [Direct Debit](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-direc)
  - [Invoice Secured B2C](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-invoi)

4. Build your own workflow (create a new OMS which will use Hidelpay). See the section below for more information.

## Building a State Machine Workflow to Use Heidelpay Payment Methods

We use state machines for handling and managing orders and payments.
To use Heidelpay, [create a new OMS](http://documentation.spryker.com/v4/docs/oms-state-machine) which includes necessary Heildelpay payment methods. You can use the same state machines or build new ones. The state machine commands and conditions trigger Heidelpay facade calls in order to perform the needed requests to Heidelpay API.

Some examples of the basic and fully functional state machines for each payment method were already built: `vendor/spryker-eco/heidelpay/config/Zed/Oms`

* `HeidelpaySofort01.xml`
* `HeidelpayPaypalDebit01.xml`
* `HeidelpayIdeal01.xml`
* `HeidelpaySofort01.xml`
* `HeidelpayCreditCardSecureAuthorize01.xml`
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
