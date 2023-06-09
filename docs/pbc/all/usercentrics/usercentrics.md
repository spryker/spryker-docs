---
title: Usercentrics
description: Usercentrics lets you manage the consent of your users to use cookies across your Spryker store
template: howto-guide-template
redirect_from:
   - docs/aop/user/apps/usercentrics.html
   - docs/acp/user/apps/usercentrics.html
---

[Usercentrics](https://usercentrics.com/) is the Consent Management Platform (CMP) that lets you obtain and manage the consent of your users to use cookies across your store. Usercentrics helps you get GDPR, CCPA, and LGPD compliant by letting your customers decide which tracking cookies they want to accept or reject.

{% info_block warningBox "Tracking tools integration" %}

Make sure you have integrated the necessary tracking tools to your stores independently of Spryker's Usercentrics integration and *before* you start configuring them in Usercentrics.

{% endinfo_block %}

Based on the tracking tools used in your Storefronts, you can define different sets of tracking tool configurations, called *Settings* in the [Usercentrics Admin Interface](https://admin.usercentrics.eu/). You can use these different settings for different countries of your Storefronts, depending on their legal requirements for user consent and data privacy. Every setting has its unique setting ID. To comply with the legislation of each country you have in your shop, you can configure which setting ID is to be used in which Spryker store.

{% info_block infoBox "Info" %}

The integration of Usercentrics requires the injection of a JavaScript source file and a few headers into every Spryker store page, together with the setting ID. Each Spryker store can have only one Usercentrics setting ID. Different stores can use the same setting ID. For example, all European stores that need to be GDPR compliant use the same setting ID.

{% endinfo_block %}

To manage your users' consent to the tracking tools or data processing services, you can use Usercentrics support of default tracking tools or integrate the custom ones:

![usercentrics-services](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/usercentrics/usercentrics/usercentrics-services.png)

The tracking tools you defined in Usercentrics are displayed on the Storefront in the Usercentrics cookie consent dialog so users can consent to which tracking tools they agree.

With Usercentrics, you don't need to program the cookie consent dialogs or add their JavaScript code to every single page of your store. Instead, you can configure the dialog in the Usercentrics portal, and it automatically adds the dialog to your store. You can achieve this with the [Smart Data Protector setting](/docs/pbc/all/usercentrics/integrate-usercentrics.html#smart-data-protector) from Usercentrics.

This is how the basic Usercentrics cookie consent dialog may look like in a Spryker store:

![usecentrics-basic-cookie-consent-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-popup.png)

<!---Replace the screenshot with English text when the staging is fixed-->

When users click on **More** in the basic cookie consent dialog, they can see the apps and websites that use tracking cookies in your store. Here they can accept or reject tracking cookies of the individual apps and websites:

![usercentrics-cookie-consent-details-popup](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/usercentrics/usercentrics-details-popup.png)

{% info_block warningBox "Important" %}

To be GDPR compliant, you have to inject the Usercentrics cookies consent dialog into *every* page. If you use Spryker with an external CMS whose pages are separated from Spryker, additional effort is needed from your side, as no single root place of injection is usually available.
Having separate CMS pages outside of the Spryker store requires additional configuration in the external CMS and has to be done independently of the Spryker SCCOS.

{% endinfo_block %}

## Next step
[Integrate Usercentrics](/docs/pbc/all/usercentrics/integrate-usercentrics.html)

