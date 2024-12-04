---
title: Payment method strategies
description: This doc describes the different payment method strategies available in Spryker Commerce OS.
last_updated: Nov 5, 2024
template: howto-guide-template
originalLink: ...
originalArticleId: ...
redirect_from:
  - ...
---


## Payment Method Strategies

Spryker and the provided Payment Service Provide Apps (PSP) support various payment methods. Each of them is configured on the App side to use a different strategy. The strategy defines where and how the Payment Method or the Payment Service Provider elements (mostly the payment form) are displayed in the shop.

The following strategies are available:

- **hosted-payment-page**: The customer is redirected to the PSP page (Hosted Payment Page) after the order is submitted to complete the payment.
- **express-checkout**: One or more buttons are displayed e.g. on the Cart Page or the PDP Page.

[//]: # (- **embedded**: The payment form is embedded in the shops summary page.)

The strategy is defined in the PaymentMethodTransfer object. The PaymentMethodTransfer object is used to transfer the payment method data between the shop and the PSP. When the App is configured in the ACP App Catalog, the PaymentMethod data is sent via an AsyncAPI to SCOS and is persisted in the database. The configuration is a JSON string which will be mapped to the PaymentMethodTransfer object. 

The PaymentMethodTransfer contains a PaymentMethodAppConfigurationTransfer object. The PaymentMethodAppConfigurationTransfer object contains the CheckoutStrategyTransfer. The CheckoutStrategyTransfer contains the strategy name. The strategy name is used to determine where and how the Payment Method or the Payment Service Provider elements are displayed in the shop. 

When no strategy is used the `hosted-payment-page` strategy is used by default.

## Express Checkout

When the PaymentMethod is using the `express-checkout` strategy, specific buttons for this Payment Method are displayed in the shop. The buttons are displayed e.g. on the Cart Page or the PDP Page. The buttons are created by the PaymentMethodViewExpander. The PaymentMethodViewExpander is a part of the Payment module and is responsible for expanding the payment method data with the view data. The PaymentMethodViewExpander is used by the PaymentMethodViewPlugin. The PaymentMethodViewPlugin is a part of the Checkout module and is responsible for rendering the payment method data in the shop.

To be able to display the buttons in the Shop, the CheckoutConfigurationTransfer contains all information needed to display the buttons. An example configuration looks as following:

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

The `strategy` is set to `express-checkout` to define that the Payment Method should be displayed as a button in the shop.

The `scripts` array contains the URLs to the scripts that are needed to display the button. The URL is used to load the script in the shop. The query_params are used to add key=value pairs to the URL with the actual values. The actual values are taken from the `\SprykerShop\Yves\PaymentAppWidget\Reader\PaymentMethodScriptReaderInterface` which is used in the Storefront to expand the script as needed. The `key` is the name that has to be used as query param key in the URL and the value defines which value should be used. The `currency` and `locale` are the most common values that are used in the scripts.

The `payment_service_provider_data` contains the data that can be used by projects to configure the Payment Method. Those value may differ for each different Payment Method.

### Query Params for Scripts

It is important to understand who is responsible for what. The App itself knows only which query params (keys) are needed. The Shop knows which values are needed and where to get them from.  

For example the script must be like `https://example.com/js?currency=EUR`. The App knows that the `currency` is needed but can't know which one is used in the Shop. The Shop knows that the used `currency` is `EUR`.

The App defines a Scrtipt like this

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

The Shop loads this information and parses the `currencyName` to `EUR` and the final URL is `https://example.com/js?currency=EUR`.

Why not simpler and only using a key? The answer is easy aURL could look like `https://example.com/js?c=EUR` where the key can't be used anymore to determine what the value should be.

In this example the App would define the script like this

```json
{
   "scripts": [
      {
         "url": "https://example.com/js",
         "query_params": {
            "c": "currencyName"
         }
      }
   ]
}
```

So that the Shop can understand that `c` has to be used as param key in the URL and the value is the name of the currency `currencyName`.

Current on SCOS side supported query params:

- `currencyName`
- `localeName`

This list may extend over time when new query params are needed.

## Hosted Payment Page Flow

The default checkout guides a customer through various steps such as the cart, the address, the shipment, and the payment step. After that the customer is shown the Summary Page where he submits the Order. After the order is successfully placed in the Back Office, the Customer is redirected to a Hosted Payment Page where he completes the Payment.


## Express Checkout Payment Flow

The Express Checkout Payment Flow belongs to so called PreOrderPayments. PreOrderPayments are payments that are done before the actual order is placed. The Express Checkout Payment Flow is a two-step process. The first step is to authorize the payment and the second step is to capture the payment. The authorization is done when the customer clicks on the button in the shop. The capture is done when the order is placed.

Here the flow is different from the Hosted Payment Page flow. The customer will see e.g. on the Product Detail Page or the Cart Page a button to pay with the Payment Method. When the customer clicks on the button, the payment is initialized and a modal window is opened where the customer completes the payment. After that, the customer is redirected to the Summary Page where he can submit the order. The order is placed in the Back Office and the payment will be captured.

Additionally, those Express Checkout Payment Methods provide customer data that can be used to prefill the checkout form. This data can contain e.g. customer data, address data or alike.  

