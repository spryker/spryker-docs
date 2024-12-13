---
title: Payone PayPal Express in a headless application
description: Payone offers your customers to pay with PayPal Express.
template: howto-guide-template
last_updated: Now 8, 2024
redirect_from:
   - /docs/aop/user/apps/payone.html
   - /docs/acp/user/apps/payone.html
   - /docs/pbc/all/payment-service-providers/payone/payone.html
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html
   - /docs/pbc/all/payment-service-provider/202404.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html
---

## PayPal Express for checkout in a headless application

Use this approach for headless applications with third-party frontends.

### Install modules

Install or upgrade the modules to the specified or later versions:
- `spryker/kernel-app:1.2.0`
- `spryker/payment:5.27.0`
- `spryker/payments-rest-api:1.4.0`

### Pre-order payment flow

When PayOne PayPal Express is integrated into a headless application, orders are processed using a pre-order payment flow:

1. The customer either selects PayPal Express as the payment method at the Product Detail page or the Cart Page.
2. The `InitializePreOrderPayment` Glue API endpoint (`glue.mysprykershop.com/payments`) is called with the following parameters:
   * Payment provider name: Payone
   * Payment method name: PayPal Express
   * Payment amount
   * Quote data
3. Back Office sends the quote data and the payment amount to the PayOne app through an API.
4. The payment with the given data is persisted in the PayOne app.
5. PayOne app makes a request through an API to PayOne to `preauthorize` the payment.
6. PayOne returns a JSON response with the following parameters:
   * transactionId
   * orderId 
   * workorderid
   * token
   * currency
   * clientId
   * merchantId
7. When the customer clicks "Complete Purchase" the modal closes and the customer data is requested.
8. After this the customer should be redirected to the summary page.
9. Here he should see his address data that was received from PayPal, and he can change the data or submit it which makes an API request to persist the order in the Back Office: `glue.mysprykershop.com/checkout`.
10. The customer is redirected to the application's success page.
11. PayOne app confirms the pre-order payment using the plugin: `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin`.
    The `order_reference` is passed to the PayOne app to be connected with `transaction_id`.
12. PayOne app processes the payment and sends a `PaymentUpdated` message to Spryker.
13. Depending on payment status, one of the following messages is returned through an asynchronous API:
    * Payment is successful: `PaymentAuthorized` message.
    * Payment is failed: `PaymentAuthorizationFailed` message.
14. Further on, the order is processed through the OMS.

All payment related messages mentioned above are handled by `\Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin`, which is registered in `MessageBrokerDependencyProvider::getMessageHandlerPlugins()`.


### Example of the headless checkout with PayOne

The PaymentMethods which are returned by the `/checkout-data?include=payment-methods` endpoint are used to render the express-checkout buttons e.g. on the Product Detail Page or the Cart Page. The customer can select the payment method and proceed to the payment page.

You can read more details about this in the [Payment Method Strategies](https://documentation.spryker.com/docs/pbc/all/payment-service-provider/202410.0/base-shop/payment-method-strategies.html) document.

When the custome clicks on "Pay with PayPal Express" button, the `InitializePreOrderPayment` Glue API endpoint is called to initialize the payment.

#### Pre-order payment initialization

This script example makes a GLUE request to the `/payments` API endpoint to initialize the pre-order payment. It is important to note that the `transactionId` is empty in the first request but has to be used in further requests. The quote data and the payment method data also needs to be passed. The response of this request has `preOrderPaymentData` that will be used in further requests. 

```JS

async initializePreOrderPayment() {
    const requestData = {
      data: {
        type: 'payments',
        attributes: {
          quote: QUOTE_DATA,
          payment: {
            amount: GRAND_TOTAL, // You will get it through the `/checkout-data?include=carts` endpoint
            paymentMethodName: 'PayPal Express', // taken from /checkout-data?include=payment-methods
            paymentProviderName: 'PayOne',  // taken from /checkout-data?include=payment-methods
          },
          preOrderPaymentData: {
            "transactionId": this.transactionId, // This is empty in the first request but has to be used in further requests
          },
        },
      },
    };

    const responseData = await this.fetchHandler(`GLUE_APPLICATION_URL/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ACCESS_TOKEN`, // taken from /access-tokens
      },
      body: JSON.stringify(requestData),
    });

    // This gets passed back from the App server and is different for each PSP
    this.preOrderPaymentData = responseData.data.attributes.preOrderPaymentData;
  
    return this.preOrderPaymentData; // This has to be forwarded in any upcoming request
  }

```

To identify the customer when initiating a request using Glue API, use the `Authorization` header for a logged-in customer and `X-Anonymous-Customer-Unique-Id` for a guest user.

After making a request to the PayOne API, the payment is created in the PayOne app. The response looks as follows:

```JSON
{
  "data": {
    "type": "payments",
    "attributes": {
      "isSuccessful": true,
      "error": null,
      "preOrderPaymentData": {
        "transactionId": "...",
        "orderId": "...",
        "workorderid": "...",
        "token": "...",
        "currency": "USD",
        "merchantId": "..."
      }
    }
  }
}
```

After the customer clicks "Complete Purchase" in the PayPal Express modal he will be redirected to the summary page. 

Since we skipped some important checkout steps here (addresses, shipment method, etc) another request needs to be made to get the customer data.

#### Getting the customer data

```JAVASCRIPT
async getCustomerData() {
  const url = `${this.GLUE_BASE_URL}/payment-customer`;

  const requestData = {
    data: {
      type: 'payment-customer',
      attributes: {
        "payment": {
          paymentMethodName: 'paypal-express',
          paymentProviderName: 'payone',
        },
        "customerPaymentServiceProviderData": this.preOrderPaymentData
      },
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    },
    body: JSON.stringify(requestData),
  });

  const responseData = await response.json();

  console.log(responseData);

  return responseData.data.attributes.customer;
}
```

This data must be used to fill the quote with the missing data of the custer.

When the customer submits the order, the payment data is sent to PayOne.

After this, the customer should be redirected to the success page or in case of a failure to an error page.


## Other Payment method flows

* `Credit Card` - [Learn more about the Credit Card payment flow.](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/credit-card.html)
* `PayPal` - [Learn more about the PayPal payment flow.](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/pay-pal.html)
