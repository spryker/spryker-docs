---
title: Payment method strategies
description: This doc describes the different payment method strategies available in Spryker Commerce OS.
last_updated: Nov 5, 2024
template: howto-guide-template
---

Spryker and Payment Service Provider (PSP) apps support various payment methods. On the app side, payment methods are configured to use different strategies. A payment method strategy defines where and how payment method or PSP elements, usually the payment form, are displayed in the shop.

The following strategies are available:

- hosted-payment-page: After an order is submitted to complete the payment, the customer is redirected to a hosted payment page of the PSP.
- express-checkout: One or more buttons are displayed e.g. on the Cart Page or the PDP Page.

<!-- **embedded**: The payment form is embedded in the shops summary page. -->

The strategy is defined in the `PaymentMethodTransfer` object. The object is used to transfer the payment method data between the shop and the PSP.

When an app is configured in the ACP app Catalog, the `PaymentMethod` data is sent to Spryker using an async API and is persisted in the database. The configuration is a JSON string which is mapped to the `PaymentMethodTransfer` object.

`PaymentMethodTransfer` contains a `PaymentMethodappConfigurationTransfer` object. The `PaymentMethodappConfigurationTransfer` object contains the `CheckoutStrategyTransfer` object. `CheckoutStrategyTransfer` contains the strategy name. The strategy name is used to determine where and how the payment method or PSP elements are displayed in the shop.

The `hosted-payment-page` strategy is used by default.

## Express checkout

When the `express-checkout` strategy is used for a payment method, the buttons for this payment method are displayed in the shop, for example– on the Cart or Product Details pages. The buttons are created by `PaymentMethodViewExpander`. `PaymentMethodViewExpander` is a part of the Payment module and is responsible for expanding the payment method data with view data. `PaymentMethodViewExpander` is used by `PaymentMethodViewPlugin`. `PaymentMethodViewPlugin` is a part of the Checkout module and is responsible for rendering the payment method data in the shop.

`CheckoutConfigurationTransfer` contains the information to display the buttons. An example configuration looks as follows:

```json
{
   "base_url": "https://app-xyz.spryker.com",
   "endpoints": [
      ...
   ],
   "checkout_configuration": {
      "strategy": "express-checkout",
      "scripts": [
         {
            "url": "https://sandbox.paypal.com/sdk/js?client-id=AUn5n-...&merchant-id=3QK...&intent=authorize&commit=true&vault=false&disable-funding=card,sepa,bancontact&enable-funding=paylater",
            "query_params": {
               "currency": "currencyName",
               "locale": "localeName"
            }
         }
      ],
      "payment_service_provider_data": {
         "clientId": "AUn5n-...",
         "merchantId": "3QK...",
         "isLive": false
      }
   }
}
```

The main elements of this JSON configuration are the strategy and the scripts.

The `strategy` is set to `express-checkout` to define that the payment method should be displayed as a button in the shop.

The `scripts` array contains the URLs to the scripts that are needed to display the button. The URL is used to load the script in the shop. `query_params` are used to add key-value pairs to the URL with actual values. The actual values are taken from `\Sprykershop\Yves\PaymentappWidget\Reader\PaymentMethodScriptReaderInterface`, which is used in the Storefront to expand the script. The `key` is the name that has to be used as query param key in the URL and the value defines which value should be used. The `currency` and `locale` are the most common values that are used in the scripts.

The `payment_service_provider_data` contains the data that can be used by projects to configure the payment method. Those value may different per payment method.

### Query parameters for scripts

The app knows only which query parameters (keys) are needed. The shop knows which values are needed and where to get them from.  

For example the script must be like `https://example.com/js?currency=EUR`. The app knows that the `currency` is needed but can't know which one is used in the shop. The shop knows that the used `currency` is `EUR`.

The app defines a script as follows:

```json
{
   "scripts": [
      {
         "url": "https://example.com/js",
         "query_params": {
            "currency": "currencyName"
         }
      }
   ]
}
```

The shop loads this information and parses the `currencyName` to `EUR` and the final URL is `https://example.com/js?currency=EUR`.

Spryker supports the following query parameters:
- `currencyName`
- `localeName`


## Hosted payment page flow

The default checkout consists of different steps such as the address or shipment steps. After a customer submits an order, and it's successfully placed in the Back Office, the customer is redirected to a hosted payment page to complete the payment.


## Express checkout payment flow

The express checkout payment flow belongs to so-called preorder payments. Preorder payments are payments that are done before an order is placed. The express checkout payment flow consists of the steps:
1. Authorize payment: after a customer clicks on the button.
2. Capture payment: after the order is placed.


In this flow, a button to pay with a payment method is displayed on, for example–Product Details or Cart page. When the customer clicks on the button, the payment is initialized and a modal window is opened where the customer completes the payment. After that, the customer is redirected to the summary page where they can submit the order. The order is placed in the Back Office and captured.

Also, express checkout payment methods provide customer data, such as addresses, that can be used to prefill the checkout form.
