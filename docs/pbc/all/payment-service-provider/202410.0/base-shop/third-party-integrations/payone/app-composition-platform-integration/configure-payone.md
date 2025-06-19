---
title: Configure Payone
description: Find out how you can configure the Payone app in your Spryker shop using the Spryker App Composition Platform.
last_updated: Jul 20, 2023
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-provider/202212.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/configure-payone.html
  - /docs/pbc/all/payment-service-provider/202404.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/configure-payone.html
---
Once you have [integrated the Payone app](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/integrate-payone.html), you can configure it.


## Configure Payone in the Payone portal


1. Create an account with [Payone](https://www.payone.com/DE-en).
2. In the Payone portal, go to **CONFIGURATION&nbsp;<span aria-label="and then">></span> PAYMENT PORTALS**.
  This opens the **Payment portals** page.
3. Next to the portal you are configuring, click **Edit**.
4. On the page of the portal, go to the **Extended** tab.
5. For **TransactionStatus URL**, enter `https://os.apps.aop.spryker.com/payone/payment-notification`.
6. For **Method hash calculation**, select **md5 oder sha2-384 (during migration)**.

![payone-payment-portal-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/payone/configure-payone.md/payone-portal-config.png)


## Configure Payone in the Back Office

1. In the Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Payone**.
   This opens the Payone app details page.
3. In the top right corner, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Payone app's status changes to **Connection pending**.
4. Go to [Payone](https://www.payone.com/DE-en) and obtain the credentials.
5. Go back to your store's Back Office, to the Payone app details page.
6. In the top right corner of the Payone app details page, click **Configure**.
7. On the Payone app details page, fill in fields in the **Credentials** section with values from step 4.
   ![payone-app-detais](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-app-details.png)
8. Select **Payone Environment Mode**.
9. Enter a **Shop Name**. This name will be displayed on **Payment** page as a merchant label for whom to pay:
    ![payone-shop-name](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-shop-name.png)
10. Select one or more payment methods.
   ![payone-payment-methods](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-payment-methods.png)
11. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.
12. Click **Save**.

![configure-payone](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/payone/integrate-payone/configure-payone.png)

If the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. The payment methods you've selected in step 8, appear in **Administration&nbsp;<span aria-label="and then">></span>  Payment methods**:
![payone-credit-card](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-credit-card.png).

13. Activate Payone in the Back Office. For instructions, see [Activate the added payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html).
