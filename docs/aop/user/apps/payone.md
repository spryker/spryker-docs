---
title: Payone
description: Description
template: howto-guide-template
---

The [Payone](https://www.payone.com/DE-en) app lets your customers make payments with the common payment methods such as Credit Card and PayPal.

{% info_block infoBox "Info" %}

We support only Credit Card and PayPal for Payone. If you want to use either or both of these payment methods, you should have them in your Payone contract. However, even if your contract with Payone includes other payment methods, you can not use them, as they are not technically supported by Spryker yet.

{% endinfo_block %}

You can have multiple accounts with Payone. For example, you can have different Payone credentials per store. However, in the Back Office UI, there is just a global account, so you can not have separate accounts for separate stores.

## Payment method modes

<!-- Can you set the modes somehow? For example, if merchant sells digital goods, can he set the authorization mode somewhere? -->

For the *Payone Credit Card* payment method, we support the following modes:

- *Preauthorization and Capture*: After a customer entered the credit card details during the checkout, the merchant preauthorizes or reserves the payable amount on the customer’s credit card. As soon as the items have shipped, this amount is captured. Capture kicks off the process of moving money from the customer’s credit card to the merchant’s account. The preauthorization and capture mode is good for physical goods. It ensures that in case if the ordered items are no more available, or customer cancels the order, the merchant does not have to return the money and pay anything for the additional transaction.
- *Authorization*: The payable amount is charged the credit card immediately, without blocking the funds. The authorization mode is good for digital products, as they become available immediately with no wait time for shipping.
- *3DS*: Messaging protocol that enables consumer authentication with their card issuer when making online purchases.
- *PCI DSS Compliance via SAQ A*: A set of security standards designed to ensure that you accept, process, store or transmit credit card information in a secure environment.

For the *Payone Paypal* payment method, we support just *Preauthorization and Capture*.

## Payone integration and configuration

To integrate Payone:

1. In your store's Back Office, go to **Apps -> Catalog**.
2. Click **Payone**.
   This takes you to the Payone app details page.
3. In the top right corner of the Payone app details page, click **Connect app**.
   This displays a message about the successful integration of the app. The Payone app's status changes to *Connection pending*.   
4. Go to [Payone](https://www.payone.com) and obtain the credentials.
   
   {% info_block infoBox "Info" %}

   It takes some time to obtain details from Payone, as you have to go through the "know your customer" (KYC) process before Payone verifies you.

   {% endinfo_block %}

5. Go back to your store's Back Office, to the Payone app details page.
6. On the Payone app details page, enter *Credentials*.
7. Select *Payone Environment Mode*: **TEST** or **LIVE**.
8. Select a payment method⁠—either **CREDIT CARD** or **PAYPAL**, or both.
9. In the top right corner of the Payone app details page, click **Configure**.
10. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.
11. Click **Save**.
   
In case if the app was connected successfully, a corresponding message appears and the app status changes to **Connected**. The payment methods you selected in step 8, appears in *Administration -> Payment methods* page:
![payone-credit-card](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-credit-card.png).

### Activating the payment methods

You need to activate the added payment methods so they become available for your customers on the Storefront.
To activate a payment method:

1. Go to **Administration -> Payment methods**.
2. Select the payment method to activate and click **Edit**.
3. In the *Configuration* tab, select **Is the Payment Method active?**.
4. In the *Store relation tab*, select the store where the payment method should be available.
![edit-payment-method](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/edit-payment-method.png)

Now that you have activated the payment method, it should be available for your customers in the checkout.

## Credit card payment flow

When customers pay with the credit card (with optional support of 3DS), the flow is as follows:

1. Customer provides their credit card payment credentials and pay the required amount for the placed order.
2. The customer's credit card data is validated.
3. The customer receives a payment message, whether the payment (authorization) was successful or not.
   
When paying with a credit card, customers can:

1. Repeat payments as often as they want if the payment (authorization) has failed, or cancel and close the payment page.
2. Cancel an entire order before shipment and receive the money back, that is, void the existing pre-authorization, without being charged a fee.
3. Cancel an order after it is ready for shipment and receive the money back, that is, trigger a refund.

When customers pay with a credit card, a shop owner can:

1. Charge customers once the order is ready to be shipped, that is, capture the funds.
2. Cancel the entire customer order, that is, void the existing pre-authorization. In this case, the customer is not charged anything.
3. Cancel one or more items of a customer's order before shipment. The customer is not charged for the canceled items 
 

## State machine for Payone

For the Payone app to function properly, you need to provide a [state machine](https://docs.spryker.com/docs/scos/dev/best-practices/state-machine-cookbook/state-machine-cookbook-part-i-state-machine-fundamentals.html#state-machine-components) for it.

## Disconnecting Payone from your store

Disconnecting Payone from your store removes its payment methods from the store configuration. However, you can disconnect Payone only if there are no open orders that still use the Payone payment methods.

To disconnect the Payone app from your store, on the Payone app details page, next to the **Configure** button, hold the pointer over <span class="inline-img">![disconnect-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/bazzarvoice/disconnect-button.png)</span> and click **Disconnect**.



