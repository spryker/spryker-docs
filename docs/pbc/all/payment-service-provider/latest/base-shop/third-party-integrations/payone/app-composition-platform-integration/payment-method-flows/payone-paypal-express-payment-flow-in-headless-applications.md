---
title: PayOne PayPal Express payment flow in headless applications
description: Payone offers your customers to pay with PayPal Express.
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/payone-paypal-express-payment-flow-in-headless-applications.html
last_updated: Now 8, 2024
related:
  - title: PayOne Credit Card payment flow
    url: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/payone-credit-card-payment-flow.html
  - title: Payone PayPal payment flow
    url: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/payone-paypal-payment-flow.html    
---

## PayPal Express for checkout in a headless application

Use this approach for headless applications with third-party frontends.

### Install modules

Install or upgrade the modules to the specified or later versions:
- `spryker/kernel-app:1.2.0`
- `spryker/payment:5.27.0`
- `spryker/payments-rest-api:1.4.0`

### Preorder payment flow

When PayOne PayPal Express is integrated into a headless application, orders are processed using a preorder payment flow:

1. Customer selects PayPal Express as the payment method at the Product Details or Cart page.
2. The `InitializePreOrderPayment` Glue API endpoint (`glue.mysprykershop.com/payments`) is called with the following parameters:
   - Payment provider name: Payone
   - Payment method name: PayPal Express
   - Payment amount
   - Quote data
3. Back Office sends the quote data and the payment amount to the PayOne app through an API.
4. The payment with the given data is persisted in the PayOne app.
5. PayOne app makes a request through an API to PayOne to preauthorize the payment.
6. PayOne returns a JSON response with the following parameters:
   - transactionId
   - orderId
   - workorderid
   - token
   - currency
   - clientId
   - merchantId
7. When the customer clicks **Complete Purchase**, the modal closes and the customer data is requested.
8. The customer is redirected to the summary page. On this page, the customer can see their address data that was received from PayPal. If they change the data, an API request is made to persist the order in the Back Office: `glue.mysprykershop.com/checkout`.
9. The customer is redirected to the application's success page.
10. PayOne app confirms the preorder payment using the plugin: `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin`.
    The `order_reference` is passed to the PayOne app to be connected with `transaction_id`.
11. PayOne app processes the payment and sends a `PaymentUpdated` message to Spryker.
12. Depending on payment status, one of the following messages is returned through an asynchronous API:
    - Payment is successful: `PaymentAuthorized` message.
    - Payment is failed: `PaymentAuthorizationFailed` message.
13. Further on, the order is processed through the OMS.

All payment-related messages in the preorder flow are handled by `\Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin`, which is registered in `MessageBrokerDependencyProvider::getMessageHandlerPlugins()`.


### Example of the headless checkout with PayOne

The payment methods returned by the `/checkout-data?include=payment-methods` endpoint are used to render the express checkout buttons, for example–on the Product Details page or Cart page. The customer can select one of the provided payment methods and proceed to the payment page.

When the customer clicks the **Pay with PayPal Express** button, the `InitializePreOrderPayment` Glue API endpoint is called to initialize the payment.


For more details on payment methods in a headless chechout, see [Payment Method Strategies](/docs/pbc/all/payment-service-provider/202410.0/base-shop/payment-method-strategies.html).


#### Preorder payment initialization

This script example makes a Glue API request to the `/payments` API endpoint to initialize a preorder payment. The `transactionId` is empty in the first request but needs to be used in further requests. The quote data and the payment method data also needs to be passed. The response will cantain `preOrderPaymentData`, which will be used in further requests.

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

After the customer clicks **Complete Purchase** in the PayPal Express modal, they're redirected to the summary page.

#### Getting the customer data

Because the express checkout skips some steps, such as address or shipment, another request needs to be made to get the customer data.

```JS
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

This data must be used to fill the quote with the missing customer data.

When the customer submits the order, the payment data is sent to PayOne.

After this, the customer is redirected to the success or error page depending on the result.
