---
title: Configure Usercentrics
description: Find out how you can configure Usercentrics in your Spryker shop
last_updated: July 3, 2023
template: howto-guide-template
---

Once you have [integrated the Usercentrics app](/docs/pbc/all/usercentrics/integrate-usercentrics.html), you can configure it.

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

## Connect Usercentrics

To connect Usercentics to your store, follow these steps:

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Usercentrics**.
   This takes you to the Usercentrics app details page.
3. In the top right corner of the Usercentrics app details page, click **Connect app**.
   This displays a message about the successful integration of the app. The Usercentrics app's status changes to *Connection pending*.

That's it. You have connected the Usercentrics app to your store. Now, you need to configure it.

## Configuration settings

There are three ways to integrate Usecentrics: by direct integration, by the Usercentrics Smart Data Protector, and integration with Google Tag Manager. In the Spryker Back Office, you can select either Smart Data Protector or Google Tag Manager. At the same time, the Smart Data Protector is the preferred and default setting. If you are not using a third-party tracking management tool like [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager) and want a code-free integration, we recommend integrating Usercentrics via Smart Data Protector.

{% info_block infoBox "Info" %}

All of the three approaches require you to get the setting ID for your store in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/) and configure the data processing services on page **Service Settings&nbsp;<span aria-label="and then">></span> Data Processing Services**.

{% endinfo_block %}

### Direct integration

The direct integration requires quite a bit of manual work by developers.

{% info_block infoBox "Info" %}

The direct integration is the most basic and, at the same time, the most cumbersome way of integrating Usercentrics. We do not support the direct integration approach in the ACP, so if you choose it, you should not use the Spryker Usercentrics integration.

{% endinfo_block %}

The direct integration presupposes that you inject the Usercentrics JavaScrip tag into your site with the setting ID.

Example script tag for the direct integration:

```
<script id="usercentrics-cmp" data-settings-id="apXtrZ9ec" src="https://app.usercentrics.eu/browser-ui/latest/bundle.js" defer></script>
```

where `apXtrZ9ec` is the setting ID that identifies configuration of the data processing services for your store in the Usercentrics Admin Interface.

For the direct integration, you have to programmatically deactivate the JavaScript code of all the tracking tools on the shop pages and give tools the names that match those in the Usercentrics Admin Interface.

For more details about the Usercetrics direct integration, see the [Usercentrics documentation](https://docs.usercentrics.com/#/direct-implementation-guide).

### Smart Data Protector

The [Smart Data Protector](https://docs.usercentrics.com/#/smart-data-protector) blocks the data processing services you added to your store and activates them only for customers that gave their consent to do so. The Smart Data Protector is the preferred and default setting to configure Usercentrics using Spryker.

For this setting, the Usercentrics JavaScript tag has to be injected with the setting ID and Smart Data Protector JavaScript code. Once you set up data processing services and got the setting ID for your app from the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), the [Smart Data Protector](https://docs.usercentrics.com/#/smart-data-protector) automatically manages all the tracking tools, and no manual work is required from your side.

{% info_block infoBox "Info" %}

Every data processing service not supported by Usercentrics by default requires a custom manual configuration in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/) and corresponding adaption as for the [Direct Integration](#direct-integration) case. For more information about the custom services, see [Usercentrics documentation on custom data processing services](https://usercentrics.atlassian.net/servicedesk/customer/portal/2/article/185794627).

{% endinfo_block %}

### Google Tag Manager

If you already have the [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager) integrated into your store, to use the technology legally, you need the cookie consent dialog to appear in your stores. You can achieve that by using the Google Tag Manager with Usercentrics.

To use Usercentrics with the Google Tag Manager, make sure the following applies:

- The Usersentrics data processing services match the tracking tools in the [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager). To do that, in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), go to **Service Settings&nbsp;<span aria-label="and then">></span> Data Processing Services** and define the same data processing services that you have in the Google Tag Manager.

- In the Google Tag Manager UI, configure the variables and triggers to work with Usercentrics. For details about how to do that, see [Google Tag Manager Configuration](https://docs.usercentrics.com/#/browser-sdk-google-tag-manager-configuration).

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