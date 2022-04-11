---
title: Payone
description: Description
template: howto-guide-template
---

The [Payone](https://www.payone.com/DE-en) app lets your customers make payments with common payment methods such as credit card and PayPal.

{% info_block infoBox "Info" %}

We support only credit card and PayPal for Payone. If you want to use either or both of these payment methods, you must have them in your Payone contract. However, even if your contract with Payone includes other payment methods, you can not use them, as we do not support them yet.

{% endinfo_block %}

You can have multiple accounts with Payone. For example, you can have different Payone credentials per store, which we support as well.

## Payment method modes

For the *Payone Credit Card* payment method, we support the following modes:

- *Preauthorization and Capture*: After a customer entered the credit card details during the checkout, the merchant preauthorizes or reserves the payable amount on the customer’s credit card. As soon as the items have shipped, this amount is captured. Capture kicks off the process of moving money from the customer’s credit card to the seller’s account. The preauthorization and capture mode is the method of choice for physical goods. It ensures that in case the ordered items are not available anymore or the customer cancels the order before it is shipped, the seller does not have to transfer the money back to the customer's account and thereby avoids a chargeback.
- *3DS*: Messaging protocol that enables consumer authentication with their card issuer when making online purchases.
- *PCI DSS Compliance via SAQ A*: A set of security standards designed to ensure that you accept, process, and transmit credit card information in a secure environment.

For the *Payone Paypal* payment method, we support only *Preauthorization and Capture*.

{% info_block infoBox "State machine for Payone" %}

The payment modes like Preauthorization and Capture must be set via the Spryker state machine in the Order Management System (OMS). However, the state machine for Payone app is now in development so you can not customize it for your project yet. 

{% endinfo_block %}

## Payone integration and configuration

To integrate Payone:

1. In your store's Back Office, go to **Apps -> Catalog**.
2. Click **Payone**.
   This takes you to the Payone app details page.
3. In the top right corner of the Payone app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Payone app's status changes to *Connection pending*.   
4. Go to [Payone](https://www.payone.com) and obtain the credentials.
   
   {% info_block infoBox "Info" %}

   It takes some time to obtain details from Payone, as you have to go through a thorough vetting process by Payone such as the "know your customer" (KYC) process before Payone verifies you.

   {% endinfo_block %}

5. Go back to your store's Back Office, to the Payone app details page.
6. On the Payone app details page, enter *Credentials*.
7. Select *Payone Environment Mode*: **TEST** or **LIVE**.
8. Select a payment method⁠—either **CREDIT CARD** or **PAYPAL**, or both.
9. In the top right corner of the Payone app details page, click **Configure**.
10. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.
11. Click **Save**.
   
In case the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. The payment methods you selected in step 8 appears in *Administration -> Payment methods* page:
![payone-credit-card](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-credit-card.png).

### Activating the payment methods

After integrating Payone, you have to activate the added payment methods, so they become available for your customers on the Storefront.

To activate a payment method:

1. Go to **Administration -> Payment methods**.
2. Select the payment method to activate and click **Edit**.
3. In the *Configuration* tab, select **Is the Payment Method active?**.
4. In the *Store relation tab*, select the store where the payment method should be available.
![edit-payment-method](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/edit-payment-method.png)

Now that you have activated the payment method, it should be available for your customers at the checkout.

## Credit card payment flow

When customers pay with the credit card (with optional support of 3DS), the flow is as follows:

1. Customer provides their credit card payment credentials and pays the required amount for the placed order.
2. The customer's credit card data is validated.
3. The customer receives a payment message, whether the payment (authorization) was successful.
   
When paying with a credit card, customers can:

- Repeat payments as often as they want if the payment (preauthorization) has failed, or cancel and close the payment page.
- Cancel the entire order before shipment and receive the money back, that is, void the existing preauthorization, without being charged a fee.
- Cancel the order after it is ready for shipment and receive the money back, that is, trigger a refund.
- Return the order or its items after it has been successfully shipped and is refunded for the returned items or the entire order.

When customers pay with a credit card, a shop owner can:

- Charge customers once the order is ready to be shipped, that is, capture the funds.
- Cancel the entire customer order, that is, void the existing preauthorization. In this case, the customer is not charged anything.
- Cancel one or more items of a customer's order before shipment. The customer is not charged for the canceled items.

## PayPal payment flow

When customers pay with PayPal, the flow is as follows:

1. Customer is redirected to the PayPal website, where they have to authorize.
2. On the PayPal website, the customer either cancels or validates the transaction.
3. Customer is taken to the checkout page with the message of either a successfully placed or canceled order.

When paying with PayPal, customers can:

- Cancel the entire order before shipment and receive the money back, that is, void the existing preauthorization, without being charged a fee.
- Cancel the order after it is ready for shipment and receive the money back, that is, trigger a refund.
- Return the order or its items after it has been successfully shipped and is refunded for the returned items or the entire order.

When customers pay with PayPal, a shop owner can:

- Charge customers once the order is ready to be shipped, that is, capture the funds.
- Cancel the entire customer order, that is, void the existing preauthorization. In this case, the customer is not charged anything.
- Cancel one or more items of a customer's order before shipment. The customer is not charged for the canceled items.

## Disconnecting Payone from your store

Disconnecting Payone from your store removes its payment methods from the store configuration. However, you can disconnect Payone only if there are no open orders that still use the Payone payment methods.

To disconnect the Payone app from your store, on the Payone app details page, next to the **Configure** button, hold the pointer over <span class="inline-img">![disconnect-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/bazzarvoice/disconnect-button.png)</span> and click **Disconnect**.