---
title: Usercentrics
description: Find out how you can integrate and use Usercentrics in your Spryker shop
template: howto-guide-template
---

[Usercentrics](https://usercentrics.com/) is the Consent Management Platform (CMP) that lets you obtain and manage the consent of your users to use cookies across your store. This helps you to get GDPR, CCPA, and LGPD compliant for websites and apps.

With Usercentrics in place, you don't need to program the cookie consent popups or add their Javascript code to every single page of your store. Instead, you can configure the popup in the Usercentrics portal and it automatically adds the popup to your store.

This is how the basic cookie consent popup might look if you have Usercentrics integrated into your Spryker store:

![usecentrics-basic-cookie-consent-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-popup.png)

<!---Replace the screenshot with English text when the staging is fixed-->

When users click on **More** in the basic cookie consent popup, they can see the apps and websites that use tracking cookies in your store. Here they can accept or reject tracking cookies of the individual apps and websites:

![usercentrics-cookie-consent-details-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-details-popup.png)

{% info_block warningBox "Important" %}

To be GDPR compliant, you have to inject the Usercentrics cookies consent popup to *every* page. This requires additional effort from your side if you use Spryker with an external CMS which pages are separated from Spryker, as no single root place of injection is possible.
Having separate CMS pages outside of the Spryker store, requires additional configuration in the external CMS, but has to be done independently of the Spryker SCCOS.

{% endinfo_block %}

## Usercentrics integration and configuration

To use Usercentrics, you need an account with the [Usercentrics Admin Interface](https://admin.usercentrics.eu/). Before you create it, select the [Usercentrics pricing plan](https://usercentrics.com/pricing/) and then create an account with the Usercentrics Admin Interface.

{% info_block infoBox "Info" %}

You can configure all the tracking tools and services, as well as the visual representation of the cookie consent popups for your store, in the Usercentrics Admin Interface. See the [Usercentrics knowledge base](https://usercentrics.atlassian.net/servicedesk/customer/portals) for details.

{% endinfo_block %}

To integrate Usercentics:

1. In your store's Back Office, go to **Apps->Catalog**.
2. Click **Usercentrics**.
   This takes you to the Usercentrics app details page.
3. In the top right corner of the Usercentrics app details page, click **Connect app**.
   This displays a message about successful integration of the app. The Usercentrics app's status changes to *Connection pending*.   
4. Log in to the [Usercentrics Admin Interface](https://admin.usercentrics.eu/).
5. In the Usercentrics Admin Interface, copy the setting ID of your app:
   ![usercentrics-setting-id](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-setting-id.png)
6. Go back to your store's Back Office, to the Usercentrics app details page.
7. In the top right corner of the Usercentrics app details page, click **Configure**.
8. In the *Configure* pane, in *Global Settings* by default, *Enable Smart Data Protector* is selected. You can either leave this setting, or select *Enable Direct Integration (Works only with Google Tag manager)*. See [Global settings configuration](#global-settings-configuration) for details on these settings.
9. Select the Store and insert the Setting ID from from step 5.
10. To activate Usercentrics for the selected store, select *Is active*.
11. Optional: To add more stores with the same or different Setting IDs, click *Add store configuration*.


That's it. You have integrated the Usercentrics app into your store. The app status should change to *Connected*. Now, the cookie consent popups should be displayed on every page.

### Global settings configuration

There are three ways to integrate Usecentrics: via a direct integration, via Usercentrics Smart Data Protector, and an integration for customers already using the Google Tag Manager. In the Spryker Back Office, you can select either Smart Data Protector or Google Tag Manager. Whereas the Smart Data Protector is the preferred and default setting.

{% info_block infoBox "Info" %}

 All of the three approaches require you to configure the tracking tools and services for your store in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/) and get the setting ID.

{% endinfo_block %}

#### Direct integration

The direct integration requires the most manual developer work. You can do the direct integration if you don't use a third-party tracking tool yet.

The direct integration presupposes that you inject the Usercentrics JavaScrip tag into your site with the setting ID.
	
Example script tag for the direct integration:
	
```
<script id="usercentrics-cmp" data-settings-id="apXtrZ9ec" src="https://app.usercentrics.eu/browser-ui/latest/bundle.js" defer></script>
```

where `apXtrZ9ec` is the setting ID that identifies the opt-in configuration of a shop owner on the UserCentrics Admin Interface.

For the direct integration, you have to programmatically deactivate the JavaScript code of all the tracking tools on the shop pages and assign the names matching those in the UserCentrics Admin Interface.
   
For more details on the Usercetrics direct integration, see the [Usercentrics documentation](https://docs.usercentrics.com/#/browser-ui?id=implementation).

#### Smart Data Protector

This is the preferred and default setting to configure Usercentrics. You can use it if you don't use a third-party party tracking tool yet and don't want to exert manual developer work.

For this setting, Usercentrics JavaScript tag has to be injected with the setting ID and Smart Data Protector JavaScript code. Once you set up data processing services and got the setting ID for your app from the Usercentrics Admin Interface, the Smart Data Protector can automatically manage all the tracking tools.

{% info_block infoBox "Info" %}

Every data processing service not supported by Usercentrics by default, requires a custom manual configuration in the UserCentrics Admin Interface and corresponding adaption as for the [Direct Integration](#direct-integration) case. For details on the custom services, see [Usercentrics documentaiton on custom data processing services](https://usercentrics.atlassian.net/servicedesk/customer/portal/2/article/185794627).

{% endinfo_block %}

For the Google Tag Manager

This can be used if a customer already uses Google Tag Manager and requires mostly a UI reconfiguration of the GTM

    UserCentrics JS has to be injected with setting ID

    Tracking tools used on the shop and managed by the Google Tag Manager have to be configured in the UserCentrics Admin Web interface

    Google Tag Manager variables and triggers must be configured via GTM UI to work with UserCentrics

    Google Tag Manager can be used with UserCentrics Smart Data Protector or the simple direct integration of User Centrics

Example Script Tag for UserCentrics CMP

    <script id="usercentrics-cmp" data-settings-id="apXtrZ9ec" src="https://app.usercentrics.eu/browser-ui/latest/bundle.js" defer></script>

    apXtrZ9ec is the Setting-ID that identifies the opt-in configuration of a shop owner on the UserCentrics Admin Web interface   