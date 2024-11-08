---
title: Project guidelines for Stripe
description: Learn how to implement Stripe using ACP
last_updated: Nov 8, 2024
template: howto-guide-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
redirect_from:
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/integrate-stripe.html

---

## Sending additional data to Stripe

Stripe accepts metadata passed using API calls. To send additional data to Stripe, the `QuoteTransfer::PAYMENT::ADDITIONAL_PAYMENT_DATA` field is used; the field is a key-value array. When sending requests using Glue API, pass the `additionalPaymentData` field in the `POST /checkout` request.

```text
POST https://api.your-site.com/checkout
Content-Type: application/json
Accept-Language: en-US
Authorization: Bearer {{access_token}}

{
    "data": {
        "type": "checkout",
        "attributes": {
            "customer": {
                ...
            },
            "idCart": "{{idCart}}",
            "billingAddress": {  
                ...
            },
            "shippingAddress": {
                ...
            },
            "payments": [
                {
                    "paymentMethodName": "Stripe",
                    "paymentProviderName": "Stripe",
                    "additionalPaymentData": {
                         "custom-field-1": "my custom value 1",
                         "custom-field-2": "my custom value 2"
                    }
                }
            ],
            "shipment": {
                "idShipmentMethod": {{idMethod}}
            }
        }    
    }
}
```

The metadata sent using the field must meet the following criteria:

| ATTRIBUTE | MAXIMUM VALUE |
| - | - |
| Key length | 40 characters |
| Value length | 500 characters |
| Key-value pairs | 50 pairs |

When you pass metadata to Stripe, it's stored in the payment object and can be retrieved later. For example, this way you can pass an external ID to Stripe.

When a `PaymentIntent` is created on the Stripe side, you can see your passed `additionalPaymentData` in the Stripe Dashboard.

### Further reading

* [OMS configuration](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/oms.html)
* [Implementing Stripe for checkout in a headless application](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/headless.html)
* [Implementing Stripe checkout as a hosted payment page](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/hosted-payment-page.html)
* [Implementing Stripe payment page using an iframe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/iframe.html)
* [Refund handling with Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/refund.html)
* [Retrieving and using payment details from Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/payment-details.html)
* [Sending additional data to Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/send-additional-data-to-stripe.html)
* [Retrieve and use payment details from third-party PSPs](https://docs.spryker.com/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/retrieve-and-use-payment-details-from-third-party-psps.html)