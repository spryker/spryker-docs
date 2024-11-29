---
title: API and overview diagram the Headless express-checkout payment flow for payment service providers
description: Overview of the Headless payment flow with express-checkout payment methods
last_updated: Now 08, 2024
template: concept-topic-template
related:
   - title: APIs and overview diagrams for payment service providers
     link: docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.html
---

The following diagram explains the flow of a headless payment page with an express-checkout payment method based on Glue API.

![headless-express-checkout-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/headless-express-checkout-flow.png)

The main difference here is that the customer skips most of the default checkout steps such as enter addresses and goes directly to the payment step. The payment is created before the order is persisted. The data a customer usually enters during the checkout steps will be retrieved via the Glue `/payment-customer` API call. The returned data can then be used on SCOS side to update e.g. addresses.
Here is an example request for the PayOne PayPal Express payment method, used by a guest or authorized customer to retrieve user data such as addresses and other information from the PSP: https://glue.mysprykershop.com/payment-customers.
```json
{
  "data": {
    "type": "payment-customers",
    "attributes": {
      "payment": {
        "paymentMethodName": "paypal-express",
        "paymentProviderName": "payone"
      },
      "customerPaymentServiceProviderData": {
        "orderId": "order-id",
        "workorderid": "workorder-id",
        "transactionId": "transaction-id",
        "token": "token",
        "currency": "EUR",
        "idCart": "d79a9c31-ed3d-57f5-958b-498e6b862ab3"
      }
    }
  }
}
```

An example of the response:

```json
{
  "type": "payment-customers",
  "id": null,
  "attributes": {
    "customer": {
      "salutation": "n/a",
      "firstName": "Spryker",
      "lastName": "Systems",
      "email": "eco-test+1@spryker.com",
      "phone": "7886914965",
      "company": null,
      "billingAddress": {
        "salutation": "n/a",
        "firstName": "Eco",
        "lastName": "Test",
        "address1": "Julie-Wolfthorn-Strasse",
        "address2": "1",
        "address3": null,
        "zipCode": "10115",
        "city": "Berlin",
        "country": "DE",
        "iso2Code": "DE",
        "company": null,
        "phone": "7886914965",
        "isDefaultShipping": null,
        "isDefaultBilling": null
      },
      "shippingAddress": {
        "salutation": "n/a",
        "firstName": "Eco",
        "lastName": "Test",
        "address1": "Julie-Wolfthorn-Strasse",
        "address2": "1",
        "address3": null,
        "zipCode": "10115",
        "city": "Berlin",
        "country": "DE",
        "iso2Code": "DE",
        "company": null,
        "phone": "7886914965",
        "isDefaultShipping": null,
        "isDefaultBilling": null
      }
    }
  },
  "links": {
    "self": "https://glue.de.aop-suite-testing.demo-spryker.com/payment-customers"
  }
}
```

### Further reading

* `Configure and disconnect` - [Learn about the configure and disconnect flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-configure-and-disconnect.html)
* `Hosted payment page` - [Learn about the Hosted payment page flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-hosted-payment-page.html)
* `Headless payment implementation` - [Learn about the Headless payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless.html)
* `OMS payment flow` - [Learn about the OMS payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-oms-payment-flow.html)
* `Asynchronous API - ACP Messages` - [Learn about the asynchronous messages used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-asynchronous-api.html)
* `Synchronous API - API Endpoints` - [Learn about the synchronous API endpoints used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-synchronous-api.html)
