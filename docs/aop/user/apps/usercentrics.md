---
title: Usercentrics
description: Find out how you can integrate and use Usercentrics in your Spryker shop
template: howto-guide-template
---

[Usercentrics](https://usercentrics.com/) is the Consent Management Platform (CMP) that lets you obtain and manage the consent of your users to use cookies across your store. Usercentrics helps you to get GDPR, CCPA, and LGPD compliant by allowing your customers to decide which tracking cookies they want to accept or reject.

You can define different configurations for sets of tracking tools, called "Settings" in Usercentrcis, to be used in different countries, depending on their legal requirements. Every set of tracking tools has its unique setting ID.
The consent management integration of Usercentrics requires the injection of a JavaScript source file into every Spryker shop page, together with a setting ID. 
You can configure, which setting ID is to be used in which Spryker store, which is usually based on a country, in order to comply with the data protection and privacy legislation of that country.

{% info_block infoBox "Info" %}

Each Spryker store can have only one Usercentrics setting ID config. Different stores can use the same setting ID, if applicable. For example, all European stores that need to be GDPR compliant use the same setting ID.

{% endinfo_block %}

To track you users' behavior in your store, you can use various tracking tools, or data processing services, provided by Usercentrics by default, or integrate the custom ones. The tracking tools you defined in Usercentrics are displayed on the Storefront in the cookie consent popup so users can give their consent to which tracking tools they agree.

With Usercentrics in place, you don't need to program the cookie consent popups or add their JavaScript code to every single page of your store. Instead, you can configure the popup in the Usercentrics portal and it automatically adds the popup to your store. This can be achieved with the [Smart Data Protector setting](#smart-data-protector) from Usercentrics.

This is how the basic cookie consent popup might look if you have Usercentrics integrated into your Spryker store:

![usecentrics-basic-cookie-consent-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-popup.png)

<!---Replace the screenshot with English text when the staging is fixed-->

When users click on **More** in the basic cookie consent popup, they can see the apps and websites that use tracking cookies in your store. Here they can accept or reject tracking cookies of the individual apps and websites:

![usercentrics-cookie-consent-details-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-details-popup.png)

{% info_block warningBox "Important" %}

To be GDPR compliant, you have to inject the Usercentrics cookies consent popup to *every* page. This requires additional effort from your side if you use Spryker with an external CMS which pages are separated from Spryker, as no single root place of injection is possible.
Having separate CMS pages outside of the Spryker store, requires additional configuration in the external CMS, and has to be done independently of the Spryker SCCOS.

{% endinfo_block %}

## Usercentrics integration and configuration

To use Usercentrics, you need an account with Usercentrics. To create it, select the [Usercentrics pricing plan](https://usercentrics.com/pricing/) and then create an account with the [Usercentrics Admin Interface]((https://admin.usercentrics.eu/).

{% info_block infoBox "Info" %}

You can configure the data processing services, as well as the visual representation of the cookie consent popups for your store, in the Usercentrics Admin Interface. See the [Usercentrics knowledge base](https://usercentrics.atlassian.net/servicedesk/customer/portals) for details.

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
8. In the *Configure* pane, in *Global Settings* by default, *[Enable Smart Data Protector]*(#smart-data-protector) is selected. You can either leave this setting, or select *[Enable Direct Integration (Works only with Google Tag manager)]*(#google-tag-manager).
9. Select the store and insert the setting ID from from step 5.
10. To activate Usercentrics for the selected store, select *Is active*.
11. Optional: To add more stores with the same or different Setting IDs, click *Add store configuration*.


That's it. You have integrated the Usercentrics app into your store. The app status should change to *Connected*. Now, the cookie consent popups should be displayed on every page of the Storefront.

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

where `apXtrZ9ec` is the setting ID that identifies you opt-in configuration on the UserCentrics Admin Interface.

For the direct integration, you have to programmatically deactivate the JavaScript code of all the tracking tools on the shop pages and assign the names matching those in the UserCentrics Admin Interface.
   
For more details on the Usercetrics direct integration, see the [Usercentrics documentation](https://docs.usercentrics.com/#/direct-implementation-guide).

#### Smart Data Protector

The [Smart Data Protector](https://docs.usercentrics.com/#/smart-data-protector) blocks the data processing services you added to your store and activates them only for customers that gave their consent to do so. The Smart Data Protector is the preferred and default setting to configure Usercentrics. You can apply it if you don't use a third-party party tracking tool yet and don't want to exert manual developer work.

For this setting, Usercentrics JavaScript tag has to be injected with the setting ID and Smart Data Protector JavaScript code. Once you set up data processing services and got the setting ID for your app from the Usercentrics Admin Interface, the Smart Data Protector automatically manages all the tracking tools and no manual work is required from your side.

{% info_block infoBox "Info" %}

Every data processing service not supported by Usercentrics by default, requires a custom manual configuration in the UserCentrics Admin Interface and corresponding adaption as for the [Direct Integration](#direct-integration) case. For details on the custom services, see [Usercentrics documentaiton on custom data processing services](https://usercentrics.atlassian.net/servicedesk/customer/portal/2/article/185794627).

{% endinfo_block %}

#### Google Tag Manager

If you already have the [Google Tag Manger](https://developers.google.com/tag-platform/tag-manager) in your store, to use the technology legally, you need the cookie consent popup to appear on your Storefront. You can achieve that by using the Google Tag Manager with Usercentrics.

To use Usercentrics with the Google Tag Manager, make sure that:
- The Usersentrics data processing services match the tracking tools you have in the Google Tag Manager. For this, in the Usercentrics Admin Interface, go to **Service Settings -> Data Processing Services** and define the same data processing services that you have in the the Google Tag Manager.

- In the Google Tag Manager UI, configure the variables and triggers to work with UserCentrics. See [Google Tag Manager Configuration](https://docs.usercentrics.com/#/browser-sdk-google-tag-manager-configuration) for details on how to do that.

{% info_block infoBox "Info" %}

You can use the Google Tag Manager with Usercentrics Smart Data Protector or via direct integration of Usercentrics

{% endinfo_block %}

Example script tag for the for the Google Tag Manager with Usercentrics:
```
<script id="usercentrics-cmp" data-settings-id="apXtrZ9ec" src="https://app.usercentrics.eu/browser-ui/latest/bundle.js" defer></script>
```
where `apXtrZ9ec` is the setting ID that identifies you opt-in configuration on the UserCentrics Admin Interface.e   

## Disconnecting Usercentrics from your store

To disconnect the Usercentrics app from your store, on the Usercentrics app details page, next to the **Configure** button, hold the pointer over <div class="inline-img">![disconnect-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/bazzarvoice/disconnect-button.png)</div> and click **Disconnect**.

{% info_block warningBox "Warning" %}

Disconnecting the app permanently deletes all the existing Usercentrics configs.

{% endinfo_block %}
