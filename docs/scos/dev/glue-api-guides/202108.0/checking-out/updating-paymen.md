---
title: Updating payment data
originalLink: https://documentation.spryker.com/2021080/docs/updating-payment-data
redirect_from:
  - /2021080/docs/updating-payment-data
  - /2021080/docs/en/updating-payment-data
---

This endpoint allows completing payment with payment verification of a third-party resource.

When [checking out purchases](https://documentation.spryker.com/docs/checking-out-purchases), a payment method may require verification with a third-party resource. The checkout endpoint retruns the URL of the resource in the `redirectURL` attribute. If the value is `null` or empty, no additional steps are required. After completing the verification, use the endpoint in this document to complete the checkout with verification data.

It is the responsibility of the API Client to redirect the customer to the page and capture the response. For information on how to process it, see the payment service provider's API reference.

The formats of the payloads used in the request and response to the third-party page are defined by the Eco layer module that implements the interaction with the payment provider. See [3. Implement Payload Processor Plugin](https://documentation.spryker.com/docs/t-interacting-with-third-party-payment-providers-via-glue-api#3-implement-payload-processor-plugin) to learn more.


**Interaction Diagram**
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Checking+Out+Purchases+and+Getting+Checkout+Data/multi-step-checkout-glue-storefront.png){height="" width=""}



## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Checkout API Feature Integration](https://documentation.spryker.com/docs/glue-api-checkout-feature-integration).

## Update payment data
To update payment with a payload from a third-party payment provider, send the request:

***
`POST` **/order-payments**
***



### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | String | Required when checking out a [guest cart](https://documentation.spryker.com/docs/managing-guest-carts). | A guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |
| Authorization | String | Required when checking out a [cart of registered user](https://documentation.spryker.com/docs/managing-carts-of-registered-users). | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |

<details open>
    <summary>Request sample</summary>
    
`POST https://glue.mysprykershop.com/order-payments`

```json
{
  "data": {
    "type": "order-payments",
    "attributes": {
      "paymentIdentifier": "1ce91011-8d60-59ef-9fe0-4493ef36bbfe",
      "dataPayload": [
         {
            "type": "payment-confirmation",
            "hash": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1Ni"
         }
      ]
    }
  }
}
```
    
</details> 
    





| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| paymentIdentifier | String |  | Unique payment identifier. To get it, [place. an order](https://documentation.spryker.com/docs/checking-out-purchases#place-an-order). The value depends on the payment services provider plugin used to process the payment. For details, see [3. Implement Payload Processor Plugin](https://documentation.spryker.com/docs/t-interacting-with-third-party-payment-providers-via-glue-api#3-implement-payload-processor-plugin). |
| dataPayload | Array | v | Payload from the payment service provider. The attributes of the payload depend on the selected payment service provider. |
			
	

### Response

```json
{
  "data": {
    "type": "order-payments",
    "id": "86791011-8d60-59ef-9fe0-4493ef36bbfe",
    "attributes": {
      "paymentIdentifier": "1ce91011-8d60-59ef-9fe0-4493ef36bbfe",
      "dataPayload": [
         {
            "type": "payment-confirmation",
            "hash": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1Ni"
         }
      ]
    },
    "links": {
      "self": "https://glue.mysprykershop.com/order-payments/1ce91011-8d60-59ef-9fe0-4493ef36bbfe"
    }
  },
  "links": {
    "self": "https://glue.mysprykershop.com/order-payments/86791011-8d60-59ef-9fe0-4493ef36bbfe"
  }
}
```


| ATTRIBUTE | TYPE |	DESCRIPTION |
|---|---|---|
| paymentIdentifier |	String | Unique payment identifier.|
| dataPayload | Array |	The payload you need to pass to the third-party provider. If the value is `null`, you don't need to do it. |


## Possible errors

| STATUS | REASON |
| --- | --- |
| 400	Bad request.  | <ul><li>POST data is incorrect</li><li>Neither Authorization nor X-Anonymous-Customer-Unique-Id headers were provided in the request.</li></ul> |
|<ul><li>404	Order not found.</li><li>422	Order payment is not updated.</li></ul>|  Checkout data is incorrect. |




