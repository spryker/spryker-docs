---
title: Amazon Pay - Obtaining an Amazon Order Reference and Information About Shipping Addresses
originalLink: https://documentation.spryker.com/v6/docs/amazon-order-reference-information
redirect_from:
  - /v6/docs/amazon-order-reference-information
  - /v6/docs/en/amazon-order-reference-information
---

After successful authorization, a buyer will be redirected to an order detils page to enter all the information necessary for placing an order: address of shipment, payment method, delivery method and some calculations about taxes, possible discounts, delivery cost, etc.

Amazon Pay provides solutions for choosing shipping addresses and payment methods based on what the buyer previously used on Amazon.

As addresses differ by country, the delivery method selection must be implemented by the shop and aligned with shipping address information.

Amazon provides two widgets for choosing shipment and payment information, they can be placed together on the same page or separately.

The code for both widgets is:
```html
<!-- Place this code in your HTML where you would like the address widget to appear. -->
<div id="addressBookWidgetDiv"> </div> 

<!-- Place this code in your HTML where you would like the wallet widget to appear. -->
<div id="walletWidgetDiv"> </div>

<script>
window.onAmazonLoginReady = function() {amazon.Login.setClientId('YOUR-CLIENT-ID'); };
window.onAmazonPaymentsReady = function() {
	new OffAmazonPayments.Widgets.AddressBook({
		sellerId: 'YOUR_SELLER_ID_HERE',
		scope: 'SCOPE',
		onOrderReferenceCreate: function(orderReference) {
		  // Here is where you can grab the Order Reference ID.
		  orderReference.getAmazonOrderReferenceId();
		},
		onAddressSelect: function(orderReference) {
		  // Replace the following code with the action that you want
		  // to perform after the address is selected. The 
		  // amazonOrderReferenceId can be used to retrieve the address 
		  // details by calling the GetOrderReferenceDetails operation. 

		  // If rendering the AddressBook and Wallet widgets
		  // on the same page, you do not have to provide any additional
		  // logic to load the Wallet widget after the AddressBook widget.
		  // The Wallet widget will re-render itself on all subsequent 
		  // onAddressSelect events, without any action from you. 
		  // It is not recommended that you explicitly refresh it.
		},
		design: {
		  designMode: 'responsive'
		},
		onReady: function(orderReference) {
		  // Enter code here you want to be executed 
		  // when the address widget has been rendered. 
		},
		onError: function(error) {
		  // Your error handling code.
		  // During development you can use the following
		  // code to view error messages:
		  // console.log(error.getErrorCode() + ': ' + error.getErrorMessage());
		  // See "Handling Errors" for more information.
		}
	}).bind("addressBookWidgetDiv");

	new OffAmazonPayments.Widgets.Wallet({
		sellerId: 'YOUR_SELLER_ID_HERE',
		onPaymentSelect: function(orderReference) {
		  // Replace this code with the action that you want to perform
		  // after the payment method is selected.

		  // Ideally this would enable the next action for the buyer
		  // including either a "Continue" or "Place Order" button.
		},
		design: {
			designMode: 'responsive'
		},
		onError: function(error) {
		  // Your error handling code.
		  // During development you can use the following
		  // code to view error messages:
		  // console.log(error.getErrorCode() + ': ' + error.getErrorMessage());
		  // See "Handling Errors" for more information.
		}
	}).bind("walletWidgetDiv");
};
</script>

<script async="async" 
	src='https://static-eu.payments-amazon.com/OffAmazonPayments/gbp/sandbox/lpa/js/Widgets.js'>
</script>
```
Both widgets are similar to the pay button widget that we described earlier.

All necessary credentials have to be specified the same way and in order to retrieve the selected information, Amazon provides JavaScript callbacks.

The first of them to use is `onOrderReferenceCreate` which provides an Amazon order reference id.

This ID is a unique identifier of the order, created on Amazon's side and is required Amazon Pay API calls.

Other important callbacks are `onAddressSelect` and `onPaymentSelect`. These callbacks are triggered after selecting shipment address information and payment method respectively. Callbacks are client-side notifications that an event has happened.

Use the Amazon Pay API to retrieve data and run order operations.
