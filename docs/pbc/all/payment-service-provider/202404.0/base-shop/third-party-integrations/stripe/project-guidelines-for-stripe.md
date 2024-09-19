---
title: Project guidelines for the Stripe app
description: Find out about the SCCOS modules needed for the Stripe App to function and their configuration
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

## OMS configuration for the project

The complete default payment OMS configuration is available at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

The payment flow of the default OMS involves authorizing the initial payment, which means that the amount is temporarily blocked when the payment method permits. Then, the OMS sends requests to capture, that is, transfer of the previously blocked amount from the customer's account to the store account.

The `Payment/Capture` command initiates the capture action. By default, this command is initiated when a Back office user clicks **Ship** on the *Order Overview* page.

Optionally, you can change and configure your own payment OMS based on `ForeignPaymentStateMachine01.xml` from the core package and change this behavior according to your business flow. See [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) for more information about the OMS feature and its configuration.

To configure your payment OMS based on `ForeignPaymentStateMachine01.xml`, copy `ForeignPaymentStateMachine01.xml` with `Subprocess` folder to the project root `config/Zed/oms`. Then, change the file's name and the value of `<process name=` in the file.

This example demonstrates how to configure the order state machine transition from `ready for dispatch` to `payment capture pending`:

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

By default, the timeout for the payment authorization action is set to 7 days. This means that if the order is in the `payment authorization pending` state, the OMS will wait for a day and then change the order state to `payment authorization failed`. Another day later, the order is automatically transitioned to the `payment authorization canceled` state. Therefore,
if you need to decrease or increase timeouts or change the states, modify the `config/Zed/oms/Subprocess/PaymentAuthorization01.xml` file according to your requirements.

For more information about ACP payment methods integration with your project OMS configuration, see [Integrate ACP payment apps with Spryker OMS configuration](/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration.html).

## Checkout payment step

Implementing the Payment Provider Stripe into your project can be done in many different ways.

- You can add it in your own headless frontend application using Glue.
- You can use the default implementation in the Payment selection page using Yves which shows the Payment Elements right in this form.
- You can add it as a hosted Payment page which uses a redirect after your customer submits the order.

### Headless implementation

This approach should be used when your project is a headless project without an Yves application. Make sure you have the following modules installed in the specified or newer versions:

- `spryker/kernel-app:1.2.0`
- `spryker/payment:5.24.0`
- `spryker/payments-rest-api:1.3.0`

#### PreOrder payment flow in a Nutshell

- The customer either selects Stripe as the payment method or he gets only Stripe Elements presented.
- When you have more than one Payment Provider in your project and Stripe gets selected the `InitializePayment` API endpoint is called with the Payment Provider name (Stripe), the Payment Method name (Stripe), CSS-ID of the element to render Stripe Elements to, CSS-ID of the element to render messages to, the Payment Element Options including the `return_url`, and the Quote data. See example below.
- When you only use Stripe in your project then the `InitializePayment` API endpoint is called with the Payment Provider name (Stripe), the Payment Method name (Stripe), CSS-ID of the element to render Stripe Elements to, CSS-ID of the element to render messages to, the Payment Element Options including the `return_url`, and the Quote data. See example below.
- Glue makes an RPC call to Zed which makes an API call to the Stripe App.
- On the Stripe App side the Payment with the given data is persisted and an API call to Stripe is made to get the ClientSecret.
- You will get back a JSON response with the ClientSecret and the PublishableKey.
- Use the example JavaScript to render the Stripe Elements on the summary page of your application.
- Then the customer can select the Payment Method in the Stripe Elements and submits the data.
- The customer will then be redirected to the provided `return_url` which must make another Glue checkout request to persist the order in the backoffice.
- After this the customer should see the success page of your application.
- Through the `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin` plugin the PreOrder payment will be confirmed on the Stripe App side.
- When the payment was processed on the Stripe App side a `PaymentUpdated` message will be sent to your SCOS application which will contain additional data you can see in the Backoffice.
- When the Payment is successful you will get a `PaymentConfirmed` AsyncAPI message which will move the order inside the OMS to the next state.
- When the Payment has failed you will get a `PaymentFailed` AsyncAPI message which will move the order inside the OMS to the next state.


### Yves integration into Payment Selection Page

The same as in the headless approach, this integration is using the PreOrder payment flow as described above with some slight differences.

While GLue does not have access to a session Yves does. Because of this, the process flow is slightly different.

Depending on your Yves implementation the flow may be slightly different than explained below.

- On the Payment selection page you will see Stripe as selectable payment option.
- When the customer selects Stripe as payment option the `InitializePayment` API endpoint is called through the `\SprykerShop\Yves\PaymentPage\Controller\PreOrderPaymentController`.
- The required data will be collected in the background, and you don't need to take care about.
- Glue makes an RPC call to Zed which makes an API call to the Stripe App.
- On the Stripe App side the Payment with the given data is persisted and an API call to Stripe is made to get the ClientSecret.
- The provided example JavaScript uses the returned data and renders the Stripe Elements on the summary page of your application.
- Then the customer can select the Payment Method in the Stripe Elements and submits the data.
- The customer will then be redirected to the provided `return_url` which must make another placeOrder request to persist the order in the backoffice.
- After this the customer should see the success page of the application.
- Through the `\Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentConfirmPreOrderPaymentCheckoutPostSavePlugin` plugin the PreOrder payment will be confirmed on the Stripe App side.
- When the payment was processed on the Stripe App side a `PaymentUpdated` message will be sent to your SCOS application which will contain additional data you can see in the Backoffice.
- When the Payment is successful you will get a `PaymentConfirmed` AsyncAPI message which will move the order inside the OMS to the next state.
- When the Payment has failed you will get a `PaymentFailed` AsyncAPI message which will move the order inside the OMS to the next state.

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
