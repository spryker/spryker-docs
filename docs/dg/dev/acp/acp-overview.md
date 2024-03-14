---
title: App Composition Platform overview
description: Learn about the App Orchestration Platform and how to use it.
template: concept-topic-template
last_updated: Dec 15, 2023
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-overview.html
    - /docs/acp/user/intro-to-acp/acp-overview.html
keywords: acp
---

The App Composition Platform (ACP) lets Spryker Cloud Commerce Operating System (SCCOS) customers connect, configure, and use the available third-party services via apps, in their application with the click of a button, with no or low development efforts from their side.

![ACP](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/app-orchestration-platform-overview/aop.png)

<a name="supported-apps"></a>

The following apps are supported:

- [Vertex](https://docs.spryker.com/docs/pbc/all/tax-management/202311.0/base-shop/third-party-integrations/vertex/vertex.html), a Tax Compliance Platform
- [Algolia](/docs/pbc/all/search/202307.0/base-shop/third-party-integrations/algolia/integrate-algolia.html), a Search Engine
- [Payone](/docs/pbc/all/payment-service-providers/payone/integrate-payone.html), a Payment Service Provider (PSP)
- [Usercentrics](/docs/pbc/all/usercentrics/integrate-usercentrics.html), a Consent Management Platform (CMP)
- [Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/integrate-bazaarvoice.html), a platform for User-Generated Content (UGC)
- [Stripe](/docs/pbc/all/payment-service-provider/{{site.version}}/base-shop/third-party-integrations/stripe/stripe.html), a financial infrastructure platform that enables businesses to accept payments

Spryker builds all integrations of the apps and provides them in a secure and no-code way for the SCCOS.

The ACP has the following advantages:

- Quick, no-code integrations
- Fully functional trials
- Consumption-based billing
- Contains only approved and secure apps
- Always up-to-date apps

## Installing the ACP catalog

With the Spryker product release [202212.0](/docs/about/all/releases/release-notes-202212.0/release-notes-202212.0.html) the ACP catalog is integrated into the Back Office by default, but not registered with ACP yet.

You can access the ACP catalog only if you are a SCCOS customer and have additionally been enabled for ACP, which means that your SCCOS is properly set up and registered with the ACP. Check [ACP installation](/docs/acp/user/app-composition-platform-installation.html) for details on how to install and enable the ACP catalog for your version of SCCOS.

{% info_block warningBox "Info" %}

The actions and level of effort required to make your project ACP-ready may vary depending on the update status of your SCCOS module versions.

{% endinfo_block %}


## Using an app from the ACP catalog

In most cases, to try an app from the ACP catalog, you do the following:

1. In the ACP catalog, select the necessary app and connect it to your shop by clicking the **Connect app** button on the app details page. You are redirected to the configuration page of the newly connected app. You can find a link to the app provider's website if you need to register with them.
2. You obtain the necessary credentials on the app provider's website.
3. In the Spryker ACP catalog, on the selected app details page, you click **Configure** and enter the credentials obtained from the app provider. Here you also make necessary settings for the app.

{% info_block infoBox "Info" %}

Make sure you check the configuration guidelines for the app you need because additional settings in the Back Office might be required for individual apps to run.

{% endinfo_block %}

That's it! You are all set to try the app out.

## Next steps
To start integrating and using the ACP apps, first, [make your project ACP-ready and install ACP](/docs/dg/dev/acp/app-composition-platform-installation.html#getting-sccos-acp-ready).
