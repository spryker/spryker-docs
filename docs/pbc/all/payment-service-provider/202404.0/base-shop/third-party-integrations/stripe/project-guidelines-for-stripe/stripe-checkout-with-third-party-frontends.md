---
title: Stripe checkout with third-party frontends
description: Learn how to implement Stripe using ACP
last_updated: Nov 8, 2024
template: howto-guide-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
---

This document describes the approaches to implementing Stripe checkout with third-party frontends.

## Install modules

Install or upgrade the modules to the specified or later versions:
- `spryker/kernel-app:1.2.0`
- `spryker/payment:5.24.0`
- `spryker/payments-rest-api:1.3.0`

## Pre-order payment flow

When Stripe is integrated into a headless application, orders are processed using a pre-order payment flow:

1. The customer either selects Stripe as the payment method or [Stripe Elements](https://docs.stripe.com/payments/elements) is loaded by default.
2. The `InitializePreOrderPayment` Glue API endpoint (`glue.mysprykershop.com/payments`) is called with the following parameters:
  * Payment provider name: Stripe
  * Payment method name: Stripe
  * Payment amount
  * Quote data
3. Back Office sends the quote data and the payment amount to Stripe app through an API.
4. The payment with the given data is persisted in the Stripe app.
5. Stripe app requests `ClientSecret` and `PublishableKey` keys from Stripe through an API.
6. Stripe returns a JSON response with the following parameters:
  * TransactionId
  * ClientSecret
  * PublishableKey
  * Only for marketplaces: AccountId
7. Stripe Elements is rendered on the order summary page. See [Rendering the Stripe Elements on the summary page](#rendering-the-stripe-elements-on-the-summary-page) for rendering Stripe Elements.
8. The customer selects a payment method in Stripe Elements and submits the data.
9. The customer is redirected to the configured `return_url`, which makes an API request to persist the order in the Back Office: `glue.mysprykershop.com/checkout`.
10. The customer is redirected to the application's success page.
11. Stripe app confirms the pre-order payment using the plugin: `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin`.
  The `order_reference` is passed to the Stripe app to be connected with `transaction_id`.
12. Stripe app processes the payment and sends a `PaymentUpdated` message to Spryker.
13. Depending on payment status, one of the following messages is returned through an asynchronous API:
  *  Payment is successful: `PaymentAuthorized` message.
  *  Payment is failed: `PaymentAuthorizationFailed` message.
14. Further on, the order is processed through the OMS.

All payment related messages mentioned above are handled by `\Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin`, which is registered in `MessageBrokerDependencyProvider`.


## Example of the headless checkout with Stripe

The Payment selection in this example will be used on the Summary page. The following examples show how to implement the Stripe Payment App in a headless application.

Before the customer is redirected to the summary page, all required data is collected: customer data, addresses, and selected shipment method. When the customer goes to the summary page, to get the data required for rendering the Stripe Elements, the application needs to call the `InitializePreOrderPayment` Glue API endpoint.

### Pre-order payment initialization

```JS

async initializePreOrderPayment() {
    const requestData = {
      data: {
        type: 'payments',
        attributes: {
          quote: QUOTE_DATA,
          payment: {
            amount: GRAND_TOTAL, // You will get it through the `/checkout-data?include=carts` endpoint
            paymentMethodName: 'stripe', // taken from /checkout-data?include=payment-methods
            paymentProviderName: 'stripe',  // taken from /checkout-data?include=payment-methods
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
        Authorization: `Bearer ACCESS_TOKEN`,
      },
      body: JSON.stringify(requestData),
    });

    const paymentProviderData =
      responseData.data.attributes.preOrderPaymentData;

    this.transactionId = paymentProviderData.transactionId;
    this.accountId = paymentProviderData.accountId; // only be used on the Direct business model. When using a Marketplace business model this will not be present.

    await this.setupStripe();
  }

```

To identify the customer when initiating a request using Glue API, use the `Authorization` header for a logged-in customer and `X-Anonymous-Customer-Unique-Id` for a guest user.

After a `PaymentIntent` is created using the Stripe API, a payment is created in the Stripe app. The response looks as follows:

```JSON
{
  "data": {
    "type": "payments",
    "attributes": {
      "isSuccessful": true,
      "error": null,
      "preOrderPaymentData": {
        "transactionId": "pi_3Q3............",
        "clientSecret": "pi_3Q3............_secret_R3WC2........",
        "publishableKey": "pk_test_51OzEfB..............."
      }
    }
  }
}
```

### Rendering the Stripe Elements on the summary page

The `preOrderPaymentData` from the previous example is used to render Stripe Elements on the summary page:

```JAVASCRIPT
async setupStripe() {
    const paymentElementOptions = {
      layout: 'accordion', // Change this to your needs
    };

    let stripeAccountDetails = {};

    if (this.accountId) { // Only in Direct business model not in the Marketplace business model
      stripeAccountDetails = { stripeAccount: this.accountId }
    }

    const stripe = Stripe(this.publishableKey, stripeAccountDetails);

    const elements = stripe.elements({
      clientSecret: this.clientSecret,
    });

    const paymentElement = elements.create('payment', paymentElementOptions);
    paymentElement.mount('#payment-element'); // Change this to the id of the HTML element you want to render the Stripe Elements to

    SUBMIT_BUTTON.addEventListener('click', async () => {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `APPLICATION_URL/return-url?id=${idCart}`, // You need to pass the id of the cart to this request
        },
      });
      if (error) {
        // Add your error handling to this block.
      }
    });
  }
```

This sets up Stripe Elements on the summary page of your application. The customer can now select the Payment Method in Stripe Elements and submit the data. Then, the customer is redirected to the configured `return_url`, which makes another Glue API request to persist the order in the Back Office. After this, the customer should see the success page.

When the customer submits the order, the payment data is sent to Stripe. Stripe may redirect them to another page, for example — PayPal, or redirect the customer to the specified `return_url`. The `return_url` must make another Glue API request to persist the order in the Back Office.

### Persisting orders in the Back Office through the return URL

Because an order can be persisted in the Back Office only after a successful payment, the application needs to handle the `return_url` and make a request to the Glue API to persist the order.

<details>
  <summary>Request example</summary>

```JAVASCRIPT
app.get('/return-url', async (req, res) => {
  const paymentIntentId = req.query.payment_intent;
  const clientSecret = req.query.payment_intent_client_secret;
  const idCart = req.query.id;

  if (paymentIntentId) {
    try {
      const data = await fetchHandler(`GLUE_APPLICATION_URL/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ACCESS_TOKEN`
        },
        body: JSON.stringify({
          data: {
            type: 'checkout',
            attributes: {
              customer: CUSTOMER_DATA,
              idCart: idCart,
              billingAddress: BILLING_ADDRESS,
              shippingAddress: SHIPPING_ADDRESS,
              payments: [
                {
                  paymentMethodName: 'Stripe',
                  paymentProviderName: 'Stripe',
                },
              ],
              shipment: SHIPMENT_DATA,
              preOrderPaymentData: {
                transactionId: paymentIntentId,
                clientSecret: clientSecret,
              },
            },
          },
        }),
      });

      if (data) {
        res.send('<h2>Order Successful!</h2>');
      } else {
        res.send('<h2>Order Failed!</h2>');
      }
    } catch (error) {
      console.error(error);
      res.send('<h2>Order Failed!</h2>');
    }
  } else {
    res.send('<h2>Invalid Payment Intent!</h2>');
  }
});
```

</details>

After this, the customer should be redirected to the success page or in case of a failure to an error page.


{% info_block infoBox %}
- When the customer reloads the summary page, which renders `PaymentElements`, an extra unnecessary API request is sent to initiate `preOrder Payment`. Stripe can handle these without issues. However, you can also prevent unnecessary API calls from being sent on the application side by, for example, checking if relevant data has changed.
- When the customer leaves the summary page, the payment is created in Stripe app and Stripe. However, in the Back Office, there is a stale payment without an order.
- To enable the customer to abort the payment process, you can implement the cancellation of payments through Glue API.

{% endinfo_block %}



### Cancelling payments through Glue API

The following request cancels a PaymentIntent on the Stripe side and shows a `canceled` PaymentIntent in the Stripe Dashboard. You can implement this in your application to enable the customer to cancel the payment process.

<details>
  <summary>Cancel a payment through Glue API</summary>

```JAVASCRIPT
async cancelPreOrderPayment() {
    const requestData = {
      data: {
        type: 'payment-cancellations',
        attributes: {
          payment: {
            paymentMethodName: 'stripe',
            paymentProviderName: 'stripe',
          },
          preOrderPaymentData: {
            transactionId: this.transactionId,
          },
        },
      },
    };

    const url = `GLUE_APPLICATION_URL/payment-cancellations`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ACCESS_TOKEN`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    if (responseData.data.attributes.isSuccessful === true) {
      // Add your logic here when the payment cancellation was successful
    } else {
        // Add your logic here when the payment cancellation has failed
    }
  }
```

</details>
