---
title: Amazon Pay - Sandbox Simulations
description: In this article, you can get information about sandbox simulations for the Amazon Pay module in Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/amazon-sandbox-simulations
originalArticleId: c664cbf9-33b1-409f-be65-5785f7299e35
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/amazon-pay/amazon-pay-sandbox-simulations.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/amazon-pay/amazon-pay-sandbox-simulations.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/amazon-pay/amazon-pay-sandbox-simulations.html
related:
  - title: Handling orders with Amazon Pay API
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/amazon-pay/handling-orders-with-amazon-pay-api.html
  - title: Configuring Amazon Pay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/amazon-pay/configure-amazon-pay.html
  - title: Amazon Pay - State Machine
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/amazon-pay/amazon-pay-state-machine.html
  - title: Obtaining an Amazon Order Reference and information about shipping addresses
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/amazon-pay/obtain-an-amazon-order-reference-and-information-about-shipping-addresses.html
---

 In order to reproduce some edge cases like declined payment or pending capture Amazon provides two solutions. First is special methods marked with red star on payment widget.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/00000005.png)

It allows reproducing different cases of decline payment workflow. But there are more edge cases like expired authorisation or pending capture there is only one way to reproduce - pass simulation string as 'SellerNote' parameter of API request. <!-- More information is available here-->

## Configuration

In order to use Amazon Pay system as well as related Spryker module, Amazon merchant account has to be created. After that all related credentials must be specified in spryker configuration file.

```php
$config[AmazonpayConstants::CLIENT_ID] must be taken as value of Client Id of Amazon merchant
$config[AmazonpayConstants::CLIENT_SECRET] must be taken as value of Client Secret of Amazon merchant
$config[AmazonpayConstants::SELLER_ID] must be taken as value of Merchant ID of Amazon merchant
$config[AmazonpayConstants::ACCESS_KEY_ID] must be taken as value of Access Key ID of Amazon merchant
$config[AmazonpayConstants::SECRET_ACCESS_KEY] must be taken as value of Secret Access Key of Amazon merchant
$config[AmazonpayConstants::REGION] must be specified in ISO2 format. For example "DE" or "US".
$config[AmazonpayConstants::SANDBOX] must be set to false in production environment
$config[AmazonpayConstants::SUCCESS_PAYMENT_URL] must be specified as an URL where customer will be redirected after successful resulf of MFA challenge.
$config[AmazonpayConstants::FAILURE_PAYMENT_URL] must be specified as an URL where customer will be redirected after unsuccessful resulf of MFA challenge.
```

Next, two settings are about behaviour of authorization process and were described above:

```php
$config[AmazonpayConstants::AUTH_TRANSACTION_TIMEOUT] according to info from Amazon this value is 1440.
$config[AmazonpayConstants::CAPTURE_NOW]
State Machine must be set according to the values of these two settings.

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING][AmazonpayConstants::PAYMENT_METHOD] =
 $config[AmazonpayConstants::CAPTURE_NOW] ? 'AmazonpayPaymentSync01' : 'AmazonpayPaymentAsync01';
And one setting is spryker related only. It is a level of logging of Handling orders with Amazon Pay API calls
$config[AmazonpayConstants::ERROR_REPORT_LEVEL]
```

The value `ERRORS_ONLY` is recommended for production so that all errors can be investigated and fixed then.  

## Localization

There's only one related key in glossary: `amazonpay.payment.failed`. It defines the message to display on cart page in case of failed payment.

## Modifications of the Project Code

The module provides not only Facade with all functionality behind but also controllers, templates, javascripts for rendering amazonpay widgets. It is usually very different from one shop to another but on early stage it could be useful to use what bundle provides.

First of all, AmazonpayControllerProvider must be added to YvesBootstrap. Modify `src/Pyz/Yves/Application/YvesBootstrap.php` as follows:

```php
/**
 * @param bool|null $isSsl
 *
 * @return \Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider[]
 */
protected function getControllerProviderStack($isSsl)
{
 return [
 new AmazonpayControllerProvider($isSsl),
// other controllers of a shop
```

Next step is rendering Pay with Amazon button. Just insert this line in a proper place of twig template which is normally template of cart page:

```php
{% raw %}{{{% endraw %} render(path('amazonpay_paybutton')) {% raw %}}}{% endraw %}
```

Make sure that the button is rendered and works properly. In the sandbox mode it is necessary to have Amazon Pay test account. Once buyer is signed in with his credentials, he must be redirected to the checkout page and Amazon Order Reference Id has to be passed. On the checkout page two widgets must be displayed as well as button for confirming purchase. Delivery method selection has to be build on merchant side and Amazon provides nothing for it. Nevertheless, it always depends on the country and therefore it has to be refreshed after the delivery address is selected from the widget. For this Amazon provides JavaScript callback `onAddressSelect`. In the bundle it triggers internal controller `getShipmentMethodsAction()` which triggers Facade's method `addSelectedAddressToQuote()`. This method retrieves selected location via Handling orders with Amazon Pay API and writes it to Quote. After that, it is possible to retrieve available shipment methods.

For that purpose Spryker provides Shipment Bundle and its client with method `getAvailableMethods()`.

After all the necessary data is selected, "place order" button should be available to click. After clicking the button Ajax call is sent to Yves, and `SetOrderReference`, `ConfirmOrderReference` API requests are sent to Amazon. In case of successful API calls, the customer is redirected to  Amazon page for passing MFA challenge. In the case of passing the MFA challenge, the customer is redirected to the link defined in config as `AmazonpayConstants::SUCCESS_PAYMENT_URL`. In another case, the customer is redirected to the link defined in `AmazonpayConstants::FAILURE_PAYMENT_URL`.

The rest of integration includes State machine which is different for synchronous and asynchronous modes. For the asynchronous mode endpoint URL for receiving IPN messages has to be specified. Bundle provides default one with controller looks as follows:

```php
 public function endpointAction()

{
 $headers = getallheaders();
 $body = file_get_contents('php://input');

 $ipnRequestTransfer = $this->getFacade()->convertAmazonpayIpnRequest($headers, $body);
 $this->getFacade()->handleAmazonpayIpnRequest($ipnRequestTransfer);

 return new Response('Request has been processed');
}
```

It receives HTTP header and body as array and string respectively and passes it to the Facade method `convertAmazonpayIpnRequest()` which returns transfer object. Exact type of it depends on the type of IPN request and may be one of those:

`AmazonpayIpnPaymentAuthorizeRequest`, `AmazonpayIpnPaymentCaptureRequest`, `AmazonpayIpnPaymentRefundRequest`, `AmazonpayIpnOrderReferenceNotification`. Another Facade's method called `handleAmazonpayIpnRequest` is responsible for handling all these messages. Normally it changes the status of a payment in the database and triggers some State Machine event. Then state machine command and conditions take action. In case of any problems with receiving IPN messages it is possible to do the same manually using state machine buttons in Zed.
