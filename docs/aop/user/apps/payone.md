---
title: Payone
description: Description
template: howto-guide-template
---

The [Payone](https://www.payone.com/DE-en) app lets your customers make payments with the common payment methods such as Credit Card and PayPal.

{% info_block infoBox "Info" %}

For now, we support only Credit Card and PayPal payment methods. If you want to use either or both of these payment methods, you should have them in your Payone contract. However, even if your contract with Payone includes other payment methods, they are not technically supported by Spryker yet.

{% endinfo_block %}

each payment method has its state machine
A shop owner can disconnect their Payone PBC integration, which removes its payment methods from the payment methods from store configuration only if its payment methods are not used anymore and no orders are still ongoing which still use the Payone PBC integration

## Credit Card

For the Credit Card, we support the following modes:

- *Preauthorization and Capture* - After customer entered the credit card details during the checkout, a merchant preauthorizes or reserves the payable amount on the customer’s credit card. As soon as the items have shipped, this amount is captured. Capture kicks off the process of moving money from the customer’s credit card to the merchant’s account. The preauthorization and capture mode is good for physical goods. It ensures that in case if the ordered items are no more available, or customer cancels the order, the merchant does not have to return the money and pay anything for the additional transaction.
- *Authorization* - The payable amount is charged the credit card immediately, without blocking the funds. The authorization mode is good for digital products, as they become available immediately with no wait time for shipping.
- *3DS* - Messaging protocol that enables consumer authentication with their card issuer when making online purchases.
- *PCI DSS Compliance via SAQ A* - A set of security standards designed to ensure that you accept, process, store or transmit credit card information in a secure environment.

{% info_block infoBox "Info" %}

You can have multiple accounts with Payone. For example, you can have different Payone credentials per store. Right now, this behavior is not supported from the Back Office UI, as there is just a global account.

{% endinfo_block %}


If customer chooses the Credit Card payment during the checkout, the payment process is:

1. Customer enters the credit card details.

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
8. Select a payment method - either **CREDIT CARD** or **PAYPAL**, or both.
9. In the top right corner of the Usercentrics app details page, click **Configure**.
10. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.
11. Click **Save**.
   
In case if the app was connected successfully, a corresponding message appears and the app status changes to **Connected**. The payment methods you selected in step 8, appears in *Administration -> Payment methods* page:
![payone-credit-card](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-credit-card.png).

### Activating the payment methods

The added payment methods are not active. 
To activate the added payment methods:

1. Go to **Administration -> Payment methods**.
2. Select the payment method to activate and click **Edit**.
3. In the *Configuration* tab, select **Is the Payment Method active?**.
4. In the *Store relation tab*, select the store where the payment method should be available.
![edit-payment-method](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/edit-payment-method.png)

Now that you have activated the payment method, it should be available for your customers in the checkout.

## State machine for Payone
For the Payone app to function properly, you need to provide a [state machine](https://docs.spryker.com/docs/scos/dev/best-practices/state-machine-cookbook/state-machine-cookbook-part-i-state-machine-fundamentals.html#state-machine-components) for it.



