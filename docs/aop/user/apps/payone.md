---
title: Payone
description: Description
template: howto-guide-template
---

The [Payone](https://www.payone.com/DE-en) app lets your customers make payments with the common payment methods such as Credit Card and PayPal.

each payment method has its state machine
A shop owner can disconnect their Payone PBC integration, which removes its payment methods from the payment methods from store configuration only if its payment methods are not used anymore and no orders are still ongoing which still use the Payone PBC integration

## Credit Card

For the Credit Card, we support the following modes:

- *Preauthorization and Capture* - After customer entered the credit card details during the checkout, a merchant preauthorizes or reserves the payable amount of money on the customer’s credit card. As soon as the items have shipped, this amount is captured. Capture kicks off the process of moving money from the customer’s credit card to the merchant’s account. The preauthorization and capture mode is good for physical goods. It ensures that in case if the ordered items are no more available, or customer cancels the order, the merchant does not have to return the money and pay anything for the additional transaction.
- *Authorization* - They payable amount is charged the credit card immediately, without blocking the funds. The authorization mode is good for digital products, as they become available immediately with no wait time for shipping.
- *3DS* - Messaging protocol that enables consumer authentication with their card issuer when making online purchases.
- *PCI DSS Compliance via SAQ A* - A set of security standards designed to ensure that you accept, process, store or transmit credit card information in a secure environment.


If customer chooses the Credit Card payment during the checkout, the payment process is:

1. Customer enters the credit card details.

## Payone integration and configuration

To integrate Payone:

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Payone**.
   This takes you to the Payone app details page.
3. In the top right corner of the Payone app details page, click **Connect app**.
   This displays a message about the successful integration of the app. The Payone app's status changes to *Connection pending*.   
4. Go to [Payone](https://www.payone.com) and obtain the credentials.
   
   {% info_block infoBox "Info" %}

   It takes some time to obtain details from Payone, as you have to pass some checks before Payone verifies you.

   {% endinfo_block %}

5. Go back to your store's Back Office, to the Payone app details page.
6. On the Payone app details page, enter *Credentials*.
7. Select *Payone Environment Mode*.
8. Select a payment method - either **CREDIT CARD** or **PAYPAL**.
9. In the top right corner of the Usercentrics app details page, click **Configure**.
10. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.

