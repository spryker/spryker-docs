---
title: Sending additional data to Stripe
description: Learn how to implement Stripe using ACP
last_updated: Nov 8, 2024
template: howto-guide-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
   - title: Embed the Stripe payment page as an iframe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/embed-the-stripe-payment-page-as-an-iframe.html
   - title: Implement Stripe checkout as a hosted payment page
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/project-prerequisites-for-implementing-Stripe-checkout-as-a-hosted-payment-page.html
   - title: OMS configuration for Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/oms-configuration-for-stripe.html
   - title: Processing refunds with Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/processing-refunds-with-stripe.html
   - title: Stripe checkout with third-party frontends
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/stripe-checkout-with-third-party-frontends.html
---

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
