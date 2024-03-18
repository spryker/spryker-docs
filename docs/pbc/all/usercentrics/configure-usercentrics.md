---
title: Configure Usercentrics
description: Find out how you can configure Usercentrics in your Spryker shop
last_updated: July 3, 2023
template: howto-guide-template
---

Based on the tracking tools used in your Storefronts, you can define different sets of tracking tool configurations, called *Settings* in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/). You can use these different settings for different countries of your Storefronts, depending on their legal requirements for user consent and data privacy. Every setting has its unique setting ID, so you can have comply with the legislation of different countries on a per-store basis.

To be GDPR compliant, you need to inject the Usercentrics cookies consent dialog into *every* page. If an external CMS is connected to your Spryker project, you need to inject the cookies consent dialog into the pages in that system too. as no single root place of injection is usually available.
Having separate CMS pages outside of the Spryker store requires additional configuration in the external CMS and has to be done independently of the Spryker SCCOS.

To manage your users' consent to the tracking tools or data processing services, you can use Usercentrics support of default tracking tools or integrate the custom ones:

![usercentrics-services](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/usercentrics/usercentrics/usercentrics-services.png)

The tracking tools you defined in Usercentrics are displayed on the Storefront in the Usercentrics cookie consent dialog so users can consent to which tracking tools they agree.

With Usercentrics, you don't need to program the cookie consent dialogs or add their JavaScript code to every single page of your store. Instead, you can configure the dialog in the Usercentrics portal, and it automatically adds the dialog to your store. You can achieve this with the [Smart Data Protector setting](#smart-data-protector) from Usercentrics.

{% info_block infoBox "" %}

The integration of Usercentrics requires the injection of a JavaScript source file and a few headers into every Spryker store page, together with the setting ID. Each Spryker store can have only one Usercentrics setting ID. Different stores can use the same setting ID. For example, all European stores that need to be GDPR compliant use the same setting ID.

{% endinfo_block %}

{% info_block infoBox "" %}

Every data processing service not supported by Usercentrics by default requires a custom manual configuration in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/) and corresponding adaption as for the [Direct Integration](#direct-integration) case. For more information about the custom services, see [Usercentrics documentation on custom data processing services](https://usercentrics.atlassian.net/servicedesk/customer/portal/2/article/185794627).

{% endinfo_block %}



## Prerequisites

* Create a Usercentrics account on the [Usercentrics website](https://usercentrics.com/free-trial-web/).
* Integrate the [Usercentrics app](/docs/pbc/all/usercentrics/integrate-usercentrics.html)
* Integrate the necessary tracking tools to your stores independently of Spryker's Usercentrics integration.


## Connect Usercentrics

1. In the Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Usercentrics**.
3. Click **Connect app**.
   This displays a message about the successful integration of the app. The Usercentrics app's status changes to **Connection pending**.

## Integrating Usercentrics

There are three ways to integrate Usecentrics:
* A manual integration
* Usercentrics Smart Data Protector
* Google Tag Manager

In the Back Office, you can select either Smart Data Protector or Google Tag Manager. If you are not using a third-party tracking management tool like [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager) and want a code-free integration, we recommend integrating via Smart Data Protector.

All of the three approaches require you to get the setting ID for your store in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/) and configure the data processing services in **Service Settings&nbsp;<span aria-label="and then">></span> Data Processing Services**.


### Integrating manually

ACP does not support a direct integration, so you won't be able to manage Usercentrics in the Back Office.

To integrate manually, you need to do the following:

* Inject the Usercentrics JavaScrip tag with the setting ID into your frontend. Example script tag for the direct integration:

```
<script id="usercentrics-cmp" data-settings-id="apXtrZ9ec" src="https://app.usercentrics.eu/browser-ui/latest/bundle.js" defer></script>
```

`apXtrZ9ec` is the setting ID that identifies configuration of the data processing services for your store in the Usercentrics Admin Interface.

* Deactivate the JavaScript code of all the tracking tools on the shop pages and give tools the names that match those in the Usercentrics Admin Interface.

For more details about the manual integration, see [Direct integration of Usercentrics into your website](https://docs.usercentrics.com/#/direct-implementation-guide).

### Recommended: Integrating using Smart Data Protector

The [Smart Data Protector](https://docs.usercentrics.com/#/smart-data-protector) blocks the data processing services and activates them only for customers that give their consent to do so.

To integrate Usercentrics using Smart Data Protector, you need to inject the Usercentrics JavaScript tag with the setting ID and Smart Data Protector JavaScript code. Once you set up data processing services, Smart Data Protector automatically manages all the tracking tools, and no manual work is required from your side.

### Integrating using Google Tag Manager

If [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager) is integrated, to use the technology legally, you need the cookie consent dialog to appear in your stores. You can achieve that by using the Google Tag Manager with Usercentrics.

To use Usercentrics with the Google Tag Manager, do the following:

- In the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), go to **Service Settings&nbsp;<span aria-label="and then">></span> Data Processing Services** and define the data processing services you have in Google Tag Manager.

- In the Google Tag Manager UI, configure the variables and triggers to work with Usercentrics. For instructions, see [Google Tag Manager Configuration](https://docs.usercentrics.com/#/browser-sdk-google-tag-manager-configuration).

### Data Processing Services with Usercentrics

If you have integrations like [Google Analytics](https://developers.google.com/analytics) or other data processing services, you can ensure compliance by following these steps:

1. In the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), go to **Service Settings <span aria-label="and then">></span> Data Processing Services**.
2. Under **Data Processing Service**, select the needed service.
3. Apply additional configurations according to your use case.


## Configure Usercentrics

1. In the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), copy the setting ID of your app.

![usercentrics-setting-id](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-setting-id.png)

2. In the Back Office, go to **Apps**.
3. On the **App Composition Platform Catalog** page, click on the **Usercentrics** app.
4. On the Usercentrics app details page, click **Configure**.
  This opens the **Configure Usercentrics** drawer.
5. In the **Configurations** pane, select the needed integration method.
6. Select the store and insert the setting ID you've obtained in step 1.
7. Optional: To activate Usercentrics for the selected store, select **Is active**.
8. Click **Save**.

![usercentrics-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/usercentrics/usercentrics/configure-usercentrics/usercentrics-configuration.png)

The drawer closes with a success message displayed. On the **App Composition Platform Catalog** page, the app's status changes to **Connected**. The cookie consent dialog should be displayed on every Storefront page.

This is how the basic Usercentrics cookie consent dialog may look like in a Spryker store:

![usecentrics-basic-cookie-consent-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-popup.png)

When users click on **More** in the basic cookie consent dialog, they can see the apps and websites that use tracking cookies in your store. Here they can accept or reject tracking cookies of the individual apps and websites:

![usercentrics-cookie-consent-details-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-details-popup.png)
