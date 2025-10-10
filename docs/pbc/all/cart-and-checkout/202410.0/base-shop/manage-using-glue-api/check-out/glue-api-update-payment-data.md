---
title: "Glue API: Update payment data"
description: Learn how to update payment data with the payload from a third-party payment provider via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/updating-payment-data
originalArticleId: d2870fab-7811-4b18-9bfa-dafd43791d00
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/checking-out/updating-payment-data.html
  - /docs/scos/dev/glue-api-guides/201903.0/checking-out/updating-payment-data.html
  - /docs/scos/dev/glue-api-guides/201907.0/checking-out/updating-payment-data.html
  - /docs/scos/dev/glue-api-guides/202005.0/checking-out/updating-payment-data.html
  - /docs/scos/dev/glue-api-guides/202200.0/checking-out/updating-payment-data.html
  - /docs/scos/dev/glue-api-guides/202311.0/checking-out/updating-payment-data.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/manage-using-glue-api/check-out/update-payment-data.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/manage-using-glue-api/check-out/glue-api-update-payment-data.html
  - /docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/check-out/glue-api-update-payment-data.html

related:
  - title: Check out purchases
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html
  - title: Submit checkout data
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/check-out/glue-api-submit-checkout-data.html
---

This endpoint allows completing payment with payment verification of a third-party resource.

When [checking out purchases](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html), a payment method may require verification with a third-party resource. The checkout endpoint returns the URL of the resource in the `redirectURL` attribute. If the value is `null` or empty, no additional steps are required. After completing the verification, use the endpoint in this document to complete the checkout with verification data.

It is the responsibility of the API Client to redirect the customer to the page and capture the response. For information on how to process it, see the payment service provider's API reference.

The formats of the payloads used in the request and response to the third-party page are defined by the Eco layer module that implements the interaction with the payment provider. See [3. Implement Payload Processor Plugin](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/interact-with-third-party-payment-providers-using-glue-api.html#implement-payload-processor-plugin) to learn more.


**Interaction Diagram**

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Checking+Out+Purchases+and+Getting+Checkout+Data/multi-step-checkout-glue-storefront.png)



## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Checkout API Feature Integration](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html).

## Update payment data

To update payment with a payload from a third-party payment provider, send the request:

***
`POST` **/order-payments**
***



### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | String | Required when checking out a [guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html). | A guest user's unique ID. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |
| Authorization | String | Required when checking out a [cart of a registered user](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html). | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

<details>
<summary>Request sample: update payment data</summary>

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
| paymentIdentifier | String |  | The Unique payment ID. To get it, [place. an order](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html#place-an-order). The value depends on the payment services provider plugin used to process the payment. For details, see [3. Implement Payload Processor Plugin](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/interact-with-third-party-payment-providers-using-glue-api.html#implement-payload-processor-plugin). |
| dataPayload | Array | v | Payload from the payment service provider. The attributes of the payload depend on the selected payment service provider. |



### Response

Response sample: update payment data

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
| paymentIdentifier |	String | The unique payment ID.|
| dataPayload | Array |	The payload you need to pass to the third-party provider. If the value is `null`, you don't need to do it. |


## Possible errors

| CODE | REASON |
| --- | --- |
| 400	Bad request.  | <ul><li>POST data is incorrect</li><li>Neither Authorization nor X-Anonymous-Customer-Unique-Id headers were provided in the request.</li></ul> |
|<ul><li>404	Order not found.</li><li>422	Order payment is not updated.</li></ul>|  Checkout data is incorrect. |
