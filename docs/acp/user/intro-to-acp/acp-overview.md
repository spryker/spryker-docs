---
title: App Composition Platform overview
description: Learn about the App Orchestration Platform and how you can use it.
template: concept-topic-template
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-overview.html
---

The App Composition Platform (ACP) lets Spryker Cloud customers connect, configure, and use the available third-party services, or apps, in their application with a click of a button, without development efforts from their side.

![ACP](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop.png)

The following apps are supported:

- [Payone](/docs/pbc/all/payment-service-providers/payone/payone.html), a Payment Service Provider (PSP)
- [Usercentrics](/docs/pbc/all/usercentrics/usercentrics.html), a Consent Management Platform (CMP)
- [Bazaarvoice](/docs/pbc/all/ratings-reviews/third-party-integrations/bazaarvoice.html), a platform for User-Generated Content (UGC)

Spryker builds all integrations of the apps and provides them in a secure and no-code way for the SCCOS.

The ACP has the following advantages:

- Quick, no-code integrations
- Fully functional trials
- Consumption-based billing
- Contains only approved and secure apps
- Always up-to-date apps

## Accessing the ACP catalog

The ACP catalog is a page inside the Back Office that contains the list of applications you can connect to your shop.
You can access the ACP catalog only if you are the SCCOS customer. If you were onboarded after March 31st, 2022, you get the ACP catalog integrated into your Back Office by default. If you were onboarded earlier, [contact us](https://support.spryker.com/). Once you complete the installation, the ACP catalog appears in the Back Office:

![aop-catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop-catalog.png)

## Using an app from the ACP catalog

In most cases, to try an app from the ACP catalog, you do the following:

1. In the ACP catalog, select the necessary app and connect it to your shop by clicking the **Connect app** button on the app details page. This takes you to the configuration page of the newly connected app. There you can find a link to the app provider's website in case you need to register with them.
2. On the app provider's website, you obtain the necessary credentials.
3. In the Spryker ACP catalog, on the selected app details page, you click **Configure** and enter the credentials obtained from the app provider. Here you also make necessary settings for the app.

{% info_block infoBox "Info" %}

Make sure you check the configuration guidelines for the app you need because additional settings in the Back Office might be required for individual apps to run.

{% endinfo_block %}

That's it! You are all set to try the app out.
