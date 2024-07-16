---
title: Configure Payone
description: Find out how you can configure the Payone app in your Spryker shop
last_updated: Feb 21 2023
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-provider/202212.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/configure-payone.html
---
Once you have [integrated the Payone app](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html), you can configure it.

To configure Payone, follow these steps:

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Payone**.
   This takes you to the Payone app details page.
3. In the top right corner of the Payone app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Payone app's status changes to *Connection pending*.   
4. Go to [Payone](https://www.payone.com/DE-en) and obtain the credentials.

   {% info_block infoBox "Info" %}

   It takes some time to obtain credentials from Payone because you have to go through a thorough vetting process by Payone, such as the "know your customer" (KYC) process before Payone verifies you.

   {% endinfo_block %}
5. Also, while in the Payone portal, make sure that you have set the following values correctly:
   - **TransactionStatus URL** - Must be set to `https://os.apps.aop.spryker.com/payone/payment-notification`
   - **Method hash calculation** - Must be set to `md5 oder sha2-384 (during migration)`
   ![payone-payment-portal-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-payment-portal-configuration.png)
6. Go back to your store's Back Office, to the Payone app details page.
7. In the top right corner of the Payone app details page, click **Configure**.
8. On the Payone app details page, fill in fields in the **Credentials** section with values from step 4.
   ![payone-app-detais](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-app-details.png)
9. Select **Payone Environment Mode**.
10. Enter your *Shop Name*. This name will be displayed on **Payment** page as a merchant label for whom to pay:
    ![payone-shop-name](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-shop-name.png)
11. Select one or more payment methods.
   ![payone-payment-methods](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-payment-methods.png)
12. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.
13. Click **Save**.

![configure-payone](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/payone/integrate-payone/configure-payone.png)

If the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. The payment methods you've selected in step 8, appear in **Administration&nbsp;<span aria-label="and then">></span>  Payment methods**:
![payone-credit-card](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-credit-card.png).

14. Activate Payone in the Back Office. See [Activate the added payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html) for details on how to do that.
