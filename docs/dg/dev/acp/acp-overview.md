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

The App Composition Platform (ACP) enables Spryker Cloud Commerce Operating System (SCCOS) customers connect, configure, and use the available third-party services available on the platform in their Spryker projects with zero or low development efforts required from their side.

Projects can save development time by using any of the zero to low-code OOTB third-party integrations provided via the App Composition Platform. 

Integrations for the following Apps are currently available on the Platform:

- [Vertex](https://docs.spryker.com/docs/pbc/all/tax-management/202311.0/base-shop/third-party-integrations/vertex/vertex.html), a Tax Compliance Platform
- [Algolia](/docs/pbc/all/search/202307.0/base-shop/third-party-integrations/algolia/integrate-algolia.html), a Search Engine
- [Payone](/docs/pbc/all/payment-service-providers/payone/integrate-payone.html), a Payment Service Provider (PSP)
- [Usercentrics](/docs/pbc/all/usercentrics/integrate-usercentrics.html), a Consent Management Platform (CMP)
- [Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/integrate-bazaarvoice.html), a platform for User-Generated Content (UGC)
- [Stripe](/docs/pbc/all/payment-service-provider/{{site.version}}/base-shop/third-party-integrations/stripe/stripe.html), a financial infrastructure platform that enables businesses to accept payments

Business users who are looking to learn more about the App Composition Platform can read more [here](https://spryker.com/app-composition-platform/#/)

## Getting Started with ACP
The App Composition platform (ACP) comprises of 3 major components:
1. App Catalog: This is an interface where we list all the available Apps available via the ACP. The App Catalog provides details about an integration, enables users connect to the App Composition Platform and add configurations to connect to a 3rd Party Application. It can be accessed via the Spryker Backoffice. A read-only version of the Catalog can be [viewed here](https://product.spryker.com/features/acp/acp-catalog/#/catalog)
2. App Composition Platform & Infrastructure: The underlying platform for ACP facilitates how Spryker projects communicate with 3rd party integrations via the App Composition Platform.
3. ACP Apps: These are integrations provided Out-of-the-Box by Spryker via the App Composition Platform. Spryker offers a range of zero to low-code applications. 

### Accessing the Read-Only ACP Catalog from the Backoffice
In 2022, we introduced the App Composition Platform, which includes the read-only version of the ACP Catalog. This feature is readily available from the Backoffice for SCCOS customers on Spryker version **202212.0**. An updated version of the ACP Catalog was also introduced in 2023. See the [release note](https://docs.spryker.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202311.0/release-notes-202311.0.html#documentation-2)

Customers who are on a previous version of Spryker and would like to access the read-only version of the ACP Catalog can do so by installing the module below:
* `spryker/app-catalog-gui: ^1.4.1` or later


## Becoming Registered for ACP
To use ACP Apps on your Spryker project, the customer project needs to be registered. The registration process helps to prepare your project for seamless communication with 3rd Party Apps provided via the App Composition Platform. The registration process is divided into 2 steps:
1. [Project update to include SCCOS dependencies](/docs/dg/dev/acp/app-composition-platform-installation.html#getting-sccos-acp-ready)
2. Infrastructure configuration: This step is handled by Spryker once the SCCOS dependencies are in place on the project. Do contact us via our [support portal](https://support.spryker.com/s/) once step 1 is completed. 

### Notes
Our team will like to guide you through the registration process if you have any questions. Do send us a message in case you have any [questions](https://support.spryker.com/s/)


## Read Also
1. [SCCOS Dependencies required for ACP](/docs/dg/dev/acp/app-composition-platform-installation.html#getting-sccos-acp-ready).
2. [ACP security assessment](/docs/dg/dev/acp/aop-security-assessment.html#acp-security)
3. [ACP Best Practices & FAQ](/docs/dg/dev/acp/acp-security-tips.html)
