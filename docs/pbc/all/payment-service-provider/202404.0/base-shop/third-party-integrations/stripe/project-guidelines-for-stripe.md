---
title: Project guidelines for Stripe
description: Learn how to implement Stripe using ACP
last_updated: Jul 22, 2024
template: howto-guide-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
redirect_from:
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/integrate-stripe.html

---

This document provides guidelines for projects using the Stripe app.

## OMS configuration

The complete default payment OMS configuration is available at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

The payment flow of the default OMS involves authorizing the initial payment. The amount is temporarily blocked when the payment method permits. Then, the OMS sends requests to capture, that is, transfer of the previously blocked amount from the customer's account to the store account.

The `Payment/Capture` command initiates the capture action. By default, this command is initiated when a Back Office user clicks **Ship** on the **Order Overview** page.

Optionally, you can change and configure your own payment OMS based on `ForeignPaymentStateMachine01.xml` from the core package and change this behavior according to your business flow. See [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) for more information about the OMS feature and its configuration.

To configure your payment OMS based on `ForeignPaymentStateMachine01.xml`, copy `ForeignPaymentStateMachine01.xml` with the `Subprocess` folder to the project root `config/Zed/oms`. Then, change the file's name and the value of `<process name=` in the file.

The following example shows how to configure the order state machine transition from `ready for dispatch` to `payment capture pending`:

<details>
  <summary>State machine example</summary>

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 https://static.spryker.com/oms-01.xsd"
>

   <process name="SomeProjectProcess" main="true">

      <!-- other configurations -->

      <states>

         <!-- other states -->

         <state name="payment capture pending" display="oms.state.in-progress"/>

         <!-- other states -->

      </states>

      <transitions>

         <!-- other transitions -->

         <transition happy="true">
            <source>ready for dispatch</source>
            <target>payment capture pending</target>
            <event>capture payment</event>
         </transition>

         <!-- other transitions -->

      </transitions>

      <events>

         <!-- other events -->

         <event name="capture payment" onEnter="true" command="Payment/Capture"/>

         <!-- other events -->

      </events>

   </process>

</statemachine>
```

</details>

By default, the timeout for the payment authorization action is set to seven days. This means that if the order is in the `payment authorization pending` state, the OMS waits for a day and then changes the order state to `payment authorization failed`. Another day later, the order is automatically transitioned to the `payment authorization canceled` state.

To decrease or increase timeouts or change the states, update `config/Zed/oms/Subprocess/PaymentAuthorization01.xml`.

For more information on the integration of ACP payment methods with OMS configuration, see [Integrate ACP payment apps with Spryker OMS configuration](/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration.html).

## Checkout payment step

There're multiple ways to implement Stripe. Some of the options:

- Add Stripe to a headless frontend application using Glue API.
- Add it as a hosted payment page which redirect the customer after submitting an order.


<!--- You can use the default implementation in the Payment selection page using Yves which shows the Payment Elements then later on the summary page.) -->


### Implement Stripe in a headless application

Use this approach for headless applications with third-party frontends.

#### Install modules

Install or upgrade the modules to the specified or higher versions:
- `spryker/kernel-app:1.2.0`
- `spryker/payment:5.24.0`
- `spryker/payments-rest-api:1.3.0`

#### PreOrder payment flow

1. The customer either selects Stripe as the payment method or Stripe Elements is loaded by default.
2. When Stripe is selected, the `InitializePreOrderPayment` Glue API endpoint (`glue.mysprykershop.com/payments`) is called with the following parameters:
  * Payment provider name: Stripe
  * Payment method name: Stripe
  * Payment amount
  * Quote data
3. Zed makes the API call to the Stripe App, including required authorization.
4. The payment with the given data is persisted On the Stripe App side.
5. An API call to Stripe is made to get `ClientSecret` and `PublishableKey` keys.
5. Stripe returns a JSON response with the following parameters:
  * TransactionId
  * ClientSecret
  * PublishableKey
  * Only for marketplaces: AccountId
6. Stripe Elements is rendered on the order summary page. See [Example](#example) for rendering Stripe Elements.
6. The customer selects a payment method in Stripe Elements and submits the data.
7. The customer is redirected to the provided `return_url`, which makes another Glue API request (`glue.mysprykershop.com/checkout`) to persist the order in the Back Office.
8. The customer is redirected to the success page of your application.
9. Through the `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin` plugin, the PreOrder payment is confirmed on the Stripe App side. The `order_reference` is passed to the StripeApp to be connected with the `transaction_id`.
10. After the payment is processed on the Stripe App side, a `PaymentUpdated` message is sent to Spryker; the message contains additional data, which you can see in the Back Office.

*  When the payment is successful, a `PaymentAuthorized` message is returned through an asynchronous API, which moves the order to the next state in OMS.
*  When the payment is failed, a `PaymentAuthorizationFailed` message is returned through an asynchronous API, which moves the order to the next state in OMS.

All payment related messages are handled by `\Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin`, which is registered in `MessageBrokerDependencyProvider`.

From here on the normal order processing through the OMS will take place.

To check out how the integration works, see this [example application](https://github.com/spryker-projects/spa-checkout-glue-with-stripe).

Before the customer is redirected to the summary page, all required data is collected: customer data, addresses, and selected shipment method. When the customer goes to the summary page, to get the data required for rendering the Stripe Elements, you need to call the `InitializePreOrderPayment` Glue API endpoint.

#### Example

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

To identify the customer, you can use the `Authorization` and `X-Anonymous-Customer-Unique-Id` headers.

After the `PaymentIntent` was created via the Stripe API, a payment is created on the Stripe app side. The response looks as follows:

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

The `preOrderPaymentData` is used to render Stripe Elements on the summary page. Example:

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

This sets up Stripe Elements on the summary page of your application. The customer can now select the Payment Method in Stripe Elements and submit the data. Then, the customer is redirected to the provided `return_url`, which makes another Glue API request to persist the order in the Back Office. After this, the customer should see the success page.

When the customer submits the order, the payment data is sent to Stripe directly. Stripe may redirect them to another page, for example—PayPal, or redirect the customer to the specified `return_url`.

!!! Important

Because an order can be persisted in the Back Office only after a successful payment, at this point, another API call must be sent to Glue.

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

After this, the customer should see the success page.

Some remarks:
- When the customer reloads the summary page, which renders `PaymentElements`, you can either prevent the second request to initiate the `preOrder Payment` on your end already by e.g. checking if relevant data has changed.
  - If you don't prevent this, you will make unnecessary API calls. In any case, the Stripe App can handle this properly.
- When the customer leaves the summary page, the payment is created on the side of Stripe App and Stripe. However, in the Back Office, there is a stale payment without an order.
- To enable the customer to abort the payment process, you can cancel the Payment using the Glue API.



The following request cancels the PaymentIntent on the Stripe side and shows a `canceled` PaymentIntent in the Stripe Dashboard.

<details>
  <summary>Cancel a Payment using Glue API</summary>

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

<!--

[//]: # (### Yves integration into Summary Page)

[//]: # ()
[//]: # (The same as in the headless approach, this integration is using the PreOrder payment flow as described above with some slight differences.)

[//]: # ()
[//]: # (While GLue does not have access to a session Yves does. Because of this, the process flow is slightly different.)

[//]: # ()
[//]: # (Depending on your Yves implementation the flow may be slightly different than explained below.)

[//]: # ()
[//]: # (- On the Payment selection page you will see Stripe as selectable payment option.)

[//]: # (- When the customer selects Stripe as payment option and enters the summary page the `InitializePreOrderPayment` RPC call to Zed is made through the `\SprykerShop\Yves\PaymentPage\Controller\PreOrderPaymentController`.)

[//]: # (- The required data will be collected from the Yves session, and you don't need to take care about this.)

[//]: # (- Zed now makes the API call to the Stripe App including required authorization.)

[//]: # (- On the Stripe App side the Payment with the given data is persisted and an API call to Stripe is made to get the ClientSecret and the PublishableKey.)

[//]: # (- !!! This part requires an update after HEADLESS and Yves frontend is prepared)

[//]: # (- The provided example JavaScript uses the returned data and renders the Stripe Elements on the summary page of your application.)

[//]: # (- !!!)

[//]: # (- Then the customer can select the Payment Method in the Stripe Elements and submits the data.)

[//]: # (- The customer will then be redirected to the provided `return_url` which must make another placeOrder request to persist the order in the backoffice.)

[//]: # (- After this the customer should see the success page of the application.)

[//]: # (- Through the `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin` plugin the PreOrder payment will be confirmed on the Stripe App side.)

[//]: # (- When the payment was processed on the Stripe App side a `PaymentUpdated` message will be sent to your SCOS application which will contain additional data you can see in the Backoffice.)

[//]: # (- When the Payment is successful you will get a `PaymentConfirmed` AsyncAPI message which will move the order inside the OMS to the next state.)

[//]: # (- When the Payment has failed you will get a `PaymentFailed` AsyncAPI message which will move the order inside the OMS to the next state.) -->

### Hosted Payment Page

If you have rewritten `@CheckoutPage/views/payment/payment.twig` on the project level, do the following:

1. Make sure that a form molecule uses the following code for the payment selection choices:

```twig
{% raw %}

{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    {% embed molecule('form') with {
        data: {
            form: data.form[data.form.paymentSelection[key].vars.name],
            ...
        }
    {% endembed %}
{% endfor %}
{% endraw %}       
```

2. If you want to change the default payment provider or method names, do the following:
   1. Make sure the names are translated in your payment step template:

```twig
{% raw %}
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    <h5>{{ name | trans }}</h5>
{% endfor %}
{% endraw %}
```

    2. Add translations to your glossary data import file:

```csv
...
Stripe,Pay Online with Stripe,en_US
```
    3. Run the data import command for the glossary:

```bash
console data:import glossary
```

## Processing refunds

In the default OMS configuration, a refund can be done for an order or an individual item. The refund action is initiated by a Back Office user triggering the `Payment/Refund` command. The selected item enters the `payment refund pending` state, awaiting the response from Stripe.

During this period, Stripe attempts to process the request, which results in success or failure:
* Success: the items transition to the `payment refund succeeded` state, although the payment isn't refunded at this step.
* Failure: the items transition to the `payment refund failed` state.

These states are used to track the refund status and inform the Back Office user. In a few days after an order is refunded in the Back Office, Stripe finalizes the refund, causing the item states to change accordingly. Previously successful refunds may be declined and the other way around.

If a refund fails, the Back Office user can go to the Stripe Dashboard to identify the cause of the failure. After resolving the issue, the item can be refunded again.

In the default OMS configuration, seven days are allocated to Stripe to complete successful payment refunds. This is reflected in the Back Office by transitioning items to the `payment refunded` state.

## Retrieving and using payment details from Stripe

For instructions on using payment details, like the payment reference, from Stripe, see [Retrieve and use payment details from third-party PSPs](https://docs.spryker.com/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/retrieve-and-use-payment-details-from-third-party-psps.html)

## Embed the Stripe payment page using iframe

By default, the Stripe App payment flow assumes that the payment page is on another domain. When users place an order, they're redirected to the Stripe payment page. To improve the user experience, you can embed the Stripe payment page directly into your website as follows:


1. Create or update `src/Pyz/Zed/Payment/PaymentConfig.php` with the following configuration:
```php
namespace Pyz\Zed\Payment;

class PaymentConfig extends \Spryker\Zed\Payment\PaymentConfig
{
    public function getStoreFrontPaymentPage(): string
    {        
        // Please make sure that domain is whitelisted in the config_default.php `$config[KernelConstants::DOMAIN_WHITELIST]`
        return '/payment'; //or any other URL on your storefront domain e.g. https://your-site.com/payment-with-stripe
    }
}
```

In this setup, the redirect URL will be added as a `url` query parameter to the URL you've specified in the `getStoreFrontPaymentPage()` method; the value of the parameter is base64-encoded.


2. Depending on your frontend setup, create a page to render the Stripe payment page in one of the following ways:

* Use the following minimal page regardless of the frontend technology used.
* If your Storefront is based on a third-party frontend, follow the documentation of your framework to create a page to render the Stripe payment page using query parameters from the redirect URL provided in the Glue API `POST /checkout` response.
* If your Storefront is based on Yves, follow [Create an Yves page for rendering the Stripe payment page](#create-an-yves-page-for-rendering-the-stripe-payment-page).

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Order payment page</title>
</head>
<body>
<iframe src="<?php echo base64_decode($_GET['url']) ?>" width="100%" height="700px" style="border:0"></iframe>
</body>
</html>
```


### Create an Yves page for rendering the Stripe payment page


1. Create a controller to render the payment page:

**src/Pyz/Yves/PaymentPage/Controller/PaymentController.php**
```php

namespace Pyz\Yves\PaymentPage\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Spryker\Yves\Kernel\View\View;
use Symfony\Component\HttpFoundation\Request;

class PaymentController extends AbstractController
{
    /**
     * @return \Spryker\Yves\Kernel\View\View
     */
    public function indexAction(Request $request): View
    {
        return $this->view(
            [
                'iframeUrl' => base64_decode($request->query->getString('url', '')),
            ],
            [],
            '@PaymentPage/views/payment.twig',
        );
    }
}

```

2. Create a template for the page:

**src/Pyz/Yves/PaymentPage/Theme/default/views/payment.twig**
```twig
{% raw %}
{% extends template('page-layout-checkout', 'CheckoutPage') %}

{% define data = {
    iframeUrl: _view.iframeUrl,
    title: 'Order Payment' | trans,
} %}

{% block content %}
    <iframe  src="{{ data.iframeUrl }}" class="payment-iframe" style="border:0; display:block; width:100%; height:700px"></iframe>
{% endblock %}
{% endraw %}
```

3. Create a route for the controller:

**src/Pyz/Yves/PaymentPage/Plugin/Router/EmbeddedPaymentPageRouteProviderPlugin.php**
```php
namespace Pyz\Yves\PaymentPage\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class EmbeddedPaymentPageRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    /**
     * @param \Symfony\Component\Routing\RouteCollection $routeCollection
     *
     * @return \Symfony\Component\Routing\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/payment', 'PaymentPage', 'Payment', 'indexAction');
        $routeCollection->add('payment-page', $route);

        return $routeCollection;
    }
}
```

4. In `src/Pyz/Yves/Router/RouterDependencyProvider.php`, add a router plugin to `RouterDependencyProvider::getRouteProvider()`.


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
