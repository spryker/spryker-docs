---
title: Configure Usercentrics
description: Find out how you can configure Usercentrics in your Spryker shop
last_updated: July 3, 2023
template: howto-guide-template
---

Based on the tracking tools used in each of your Storefronts, you can define different sets of tracking tool configurations, called *settings* in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/). Every configuration is identified by a unique setting ID. The setting ID lets you add a cookie consent dialog with the defined configuration to a store. By adding different setting IDs to different stores, you can comply with the legislation of different countries on a per-store basis. Each store can have only one setting ID, while the same ID can be used in different stores. For example, all European stores that need to be GDPR compliant can use the same setting ID.

To be GDPR compliant, you need to inject the Usercentrics cookies consent dialog into *every* page. Because there usually isn't a single root place of injection available, if an external CMS is connected to your Spryker project, you need to separately inject the dialog into the pages in that system too.

Usercentrics supports some tracking tools and data processing services by default, but you can integrate custom ones too:

![usercentrics-services](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/usercentrics/usercentrics/usercentrics-services.png)

To integrate a custom service, you will need to manually configure it in the Usercentrics Admin Interface. Also, if you manually integrate Usercentrics into your Spryker project, you will need to adjust the integration to enable the custom service. For more information about custom services, see [Usercentrics documentation on custom data processing services](https://usercentrics.atlassian.net/servicedesk/customer/portal/2/article/185794627).


Once Usercentrics is set up, a cookie consent dialog similar to the follow is displayed on every Storefront page:

![usecentrics-basic-cookie-consent-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-popup.png)

When customers click on **More** in the dialog, they can consent to or reject each individual tool and service:

![usercentrics-cookie-consent-details-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-details-popup.png)


## Prerequisites

* [Create a Usercentrics account](https://usercentrics.com/free-trial-web/).
* [Integrate Usercentrics](/docs/pbc/all/usercentrics/integrate-usercentrics.html).
* Integrate and configure the necessary tracking tools in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/).


### Configure data processing services in Usercentrics

1. In the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), go to **Service Settings <span aria-label="and then">></span> Data Processing Services**.
2. Under **Data Processing Service**, select a services used by your store.
3. Apply additional configurations according to your use case.
4. Repeat steps 2-3 until you define all the services used in your store.



## Connect Usercentrics

1. In the Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Usercentrics**.
3. Click **Connect app**.
   This displays a message about the successful integration of the app. The Usercentrics app's status changes to **Connection pending**.

## Integrating Usercentrics into frontend

There are three ways to integrate Usecentrics into frontend:
* Manually
* Using the [Usercentrics Smart Data Protector](https://docs.usercentrics.com/#/smart-data-protector)
* With [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager)

If you are not using a third-party tracking management tool, like Google Tag Manager, and want a code-free integration, we recommend integrating using the Smart Data Protector.


### Integrating Usercentrics manually

ACP does not support a direct integration, so you won't be able to manage Usercentrics in the Back Office.

To integrate manually, you need to do the following:

* Inject the Usercentrics JavaScrip tag with the setting ID into your frontend. Example script tag for the direct integration:

```
<script id="usercentrics-cmp" data-settings-id="apXtrZ9ec" src="https://app.usercentrics.eu/browser-ui/latest/bundle.js" defer></script>
```

`apXtrZ9ec` is the setting ID that identifies configuration of the data processing services for your store in the Usercentrics Admin Interface.

* Deactivate the JavaScript code of all the tracking tools on the shop pages and give tools the names that match those in the Usercentrics Admin Interface.

For more details about the manual integration, see [Direct integration of Usercentrics into your website](https://docs.usercentrics.com/#/direct-implementation-guide).

### Recommended: Integrating Usercentrics using the Smart Data Protector

The [Usercentrics Smart Data Protector](https://docs.usercentrics.com/#/smart-data-protector) blocks the data processing services and activates them only for customers that give their consent to do so.

With the Smart Data Protector, you don't need to program the cookie consent dialogs or JavaScript code to each page. Instead, you can configure the dialog in the Usercentrics Admin Interface, and it's automatically added to your store's pages.

To integrate Usercentrics using Smart Data Protector, you need to inject the Usercentrics JavaScript tag with the setting ID and Smart Data Protector JavaScript code.

### Integrating Usercentrics with Google Tag Manager

If [Google Tag Manager](https://developers.google.com/tag-platform/tag-manager) is integrated, you can use Usercentrics to display a cookie consent dialog with the services and tools configured in Google Tag Manager.

To use Usercentrics with the Google Tag Manager, do the following:

- In the [Usercentrics Admin Interface](https://admin.usercentrics.eu/), go to **Service Settings&nbsp;<span aria-label="and then">></span> Data Processing Services** and define the data processing services you have in Google Tag Manager.

- In the Google Tag Manager UI, configure the variables and triggers to work with Usercentrics. For instructions, see [Google Tag Manager Configuration](https://docs.usercentrics.com/#/browser-sdk-google-tag-manager-configuration).

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
