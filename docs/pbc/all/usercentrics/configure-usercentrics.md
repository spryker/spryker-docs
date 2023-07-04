---
title: Configure Usercentrics
description: Find out how you can configure Usercentrics in your Spryker shop
last_updated: July 3, 2023
template: howto-guide-template
---

Once you have integrated the Usercentrics app, you can configure it.

Based on the tracking tools used in your Storefronts, you can define different sets of tracking tool configurations, called *Settings* in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/). You can use these different settings for different countries of your Storefronts, depending on their legal requirements for user consent and data privacy. Every setting has its unique setting ID. To comply with the legislation of each country you have in your shop, you can configure which setting ID is to be used in which Spryker store.

{% info_block warningBox "Tracking tools integration" %}

Make sure you have integrated the necessary tracking tools to your stores independently of Spryker's Usercentrics integration and *before* you start configuring them in Usercentrics.

{% endinfo_block %}

{% info_block infoBox "Info" %}

The integration of Usercentrics requires the injection of a JavaScript source file and a few headers into every Spryker store page, together with the setting ID. Each Spryker store can have only one Usercentrics setting ID. Different stores can use the same setting ID. For example, all European stores that need to be GDPR compliant use the same setting ID.

{% endinfo_block %}

To manage your users' consent to the tracking tools or data processing services, you can use Usercentrics support of default tracking tools or integrate the custom ones:

![usercentrics-services](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/usercentrics/usercentrics/usercentrics-services.png)

The tracking tools you defined in Usercentrics are displayed on the Storefront in the Usercentrics cookie consent dialog so users can consent to which tracking tools they agree.

With Usercentrics, you don't need to program the cookie consent dialogs or add their JavaScript code to every single page of your store. Instead, you can configure the dialog in the Usercentrics portal, and it automatically adds the dialog to your store. You can achieve this with the [Smart Data Protector setting](/docs/pbc/all/usercentrics/integrate-usercentrics.html#smart-data-protector) from Usercentrics.

## Prerequisites

To start using Usercentrics for your shop, you need an account with Usercentrics. You can create the account on the [Usercentrics website](https://usercentrics.com/free-trial-web/).

## Configure Usercentrics

To configure Usercentrics, do the following:

1. Log in to the [Usercentrics Admin Interface](https://admin.usercentrics.eu/).
2. In the Usercentrics Admin Interface, copy the setting ID of your app:
   ![usercentrics-setting-id](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-setting-id.png)
3. In your store's Back Office, go to **Apps**.
2. In **Apps**, click **Usercentrics**. This takes you to the Usercentrics app details page.
3. In the top right corner of the Usercentrics app details page, click **Configure**.
8. In the **Configure** pane, in **Configurations**, by default, **[Enable Smart Data Protector](/docs/pbc/all/usercentrics/integrate-usercentrics.html#smart-data-protector)** is selected. You can either leave this setting or select **[Enable Direct Integration (Works only with Google Tag manager)](/docs/pbc/all/usercentrics/integrate-usercentrics.html#google-tag-manager)**.
9. Select the store and insert the setting ID from step 2.
10. To activate Usercentrics for the selected store, select **Is active**.
8. Click **Save**.

![usercentrics-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/usercentrics/usercentrics/configure-usercentrics/usercentrics-configuration.png)

A pop-up saying that the app has been configured successfully, appears. The app changes to *Connected* on the apps catalog page. Now, the cookie consent dialogs should be displayed on every page of the Storefront.

This is how the basic Usercentrics cookie consent dialog may look like in a Spryker store:

![usecentrics-basic-cookie-consent-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-popup.png)

When users click on **More** in the basic cookie consent dialog, they can see the apps and websites that use tracking cookies in your store. Here they can accept or reject tracking cookies of the individual apps and websites:

![usercentrics-cookie-consent-details-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-details-popup.png)

{% info_block warningBox "Important" %}

To be GDPR compliant, you have to inject the Usercentrics cookies consent dialog into *every* page. If you use Spryker with an external CMS whose pages are separated from Spryker, additional effort is needed from your side, as no single root place of injection is usually available.
Having separate CMS pages outside of the Spryker store requires additional configuration in the external CMS and has to be done independently of the Spryker SCCOS.

{% endinfo_block %}