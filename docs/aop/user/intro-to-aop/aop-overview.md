---
title: App Orchestration Platform overview
description: Learn about the App Orchestration Platform and how you can use it.
template: concept-topic-template
---

The App Orchestration Platform (AOP) lets [Spryker Cloud Commerce OS (SCCOS)](/docs/cloud/dev/spryker-cloud-commerce-os/getting-started-with-the-spryker-cloud-commerce-os.html) customers to connect, configure, and use the available third-party services, or apps, in their application with a click of a button, without development efforts from their side.

![AOP](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop.png)

The following apps are supported:

- PayOne, a Payment Service Provider (PSP)
- UserCentrics, a Consent Management Platform (CMP)
- BazaarVoice, a platform for User-Generated Content (UGC)

<!---Add links to the general apps descriptions, once available-->

All integrations of the apps are built by Spryker and provided in a secure and no-code way for the SCCOS.

The main advantages of the AOP are:

- Quick, no-code integrations
- Fully functional trials
- Consumption-based billing
- Single POC or integration owner

## Accessing the AOP catalog

You can access the AOP catalog only if you are the SCCOS customer. If you were onboarded after March 31st, 2022, you get the AOP catalog integrated into your Back Office by default. If you were onboarded earlier, follow the AOP installation guide <!---LINK once available-->. Once you complete the installation, the AOP catalog appears in the Back Office:

![aop-catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop-catalog.png)

## Using an app from the AOP catalog

In most cases, to try an app from the AOP catalog, you do the following:

1. In the AOP catalog, select the necessary app and connect it to your shop by clicking the **Connect app** button at the app details page. This takes you to the app provider's website of the selected app.
2. On the app provider's website, you obtain the necessary credentials.
3. In the Spryker AOP catalog, at the selected app page, you click **Configure** and enter the credentials obtained from the app provider. Here you also make necessary settings for the app.

{% info_block infoBox "Info" %}

Make sure you check the configuration guidelines<!---LINK--> for the app you need, as additional settings in the Back Office might be required for individual apps to run.

{% endinfo_block %}

That's it! You are all set to try the app out. 

