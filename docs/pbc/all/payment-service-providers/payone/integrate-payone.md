---
title: Integrate Payone
description: Learn how you can integrate the Payone app into your Spryker shop
template: howto-guide-template
---

To integrate Payone, follow these steps:

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Payone**.
   This takes you to the Payone app details page.
3. In the top right corner of the Payone app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Payone app's status changes to *Connection pending*.   
4. Go to [Payone](https://www.payone.com?ref=spryker-documentation) and obtain the credentials.
   
   {% info_block infoBox "Info" %}

   It takes some time to obtain credentials from Payone because you have to go through a thorough vetting process by Payone, such as the "know your customer" (KYC) process before Payone verifies you.

   {% endinfo_block %}

5. Go back to your store's Back Office, to the Payone app details page.
6. In the top right corner of the Payone app details page, click **Configure**.
7. On the Payone app details page, fill in fields in the **Credentials** section.
   ![payone-app-detais](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-app-details.png)
8. Select *Payone Environment Mode*: **TEST** or **LIVE**.
9. Enter your *Shop Name*. This name will be displayed on **Payment Page** as a merchant label for whom to pay:
   ![payone-shop-name](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-shop-name.png)
10. Select a payment method⁠—either **CREDIT CARD** or **PAYPAL**, or both.
   ![payone-payment-methods](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-payment-methods.png)
11. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.
12. Click **Save**.
   
In case the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. The payment methods, which you selected in step 8, appear in **Administration&nbsp;<span aria-label="and then">></span>  Payment methods**:
![payone-credit-card](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-credit-card.png).