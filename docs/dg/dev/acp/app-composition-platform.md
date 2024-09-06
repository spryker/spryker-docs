---
title: App Composition Platform
description: Learn about the App Orchestration Platform and how to use it.
template: concept-topic-template
last_updated: Dec 15, 2023
redirect_from:
    - /docs/aop/user/intro-to-acp/acp-overview.html
    - /docs/acp/user/intro-to-acp/acp-overview.html
    - /docs/dg/dev/acp/acp-overview.html
keywords: acp
related:
    - title: SCCOS Dependencies required for ACP
      link: docs/dg/dev/acp/app-composition-platform-installation.html
    - title: ACP security assessment
      link: docs/dg/dev/acp/aop-security-assessment.html
    - title: ACP security tips
      link: docs/dg/dev/acp/acp-security-tips.html
---

App Composition Platform (ACP) enables you to connect, configure, and use the available third-party services with zero or low development effort. For business information about ACP, see [Spryker App Composition Platform](https://spryker.com/app-composition-platform/#/).

ACP supports the following integrations:

| INTEGRATION | DESCRIPTION |
| - | - |
| [Vertex](/docs/pbc/all/tax-management/{{site.version}}/base-shop/third-party-integrations/vertex/vertex.html) | Tax compliance. |
| [Algolia](/docs/pbc/all/search/{{site.version}}/base-shop/third-party-integrations/algolia/integrate-algolia.html) | Search engine. |
| [Payone](/docs/pbc/all/payment-service-providers/payone/integrate-payone.html) | Payment service provider. |
| [Usercentrics](/docs/pbc/all/usercentrics/integrate-usercentrics.html) | Consent management platform. |
| [Bazaarvoice](/docs/pbc/all/ratings-reviews/{{site.version}}/third-party-integrations/integrate-bazaarvoice.html) | Platform for user-generated content. |
| [Stripe](/docs/pbc/all/payment-service-provider/{{site.version}}/base-shop/third-party-integrations/stripe/stripe.html) |  Financial infrastructure platform. |

## ACP components

ACP consists of the following components:
* App Catalog: Interface where all the apps available via ACP are listed. The App Catalog provides details about an integration, enables users connect to the ACP and add configurations to connect to a third-party app. It can be accessed via the Spryker Back Office. You can view the read-only version of the ACP Catalog in the [Spryker Product Portal](https://product.spryker.com/features/acp/acp-catalog/#/catalog).
*  App Composition Platform & Infrastructure: The underlying platform for the ACP facilitates defining how Spryker projects communicate with third-party integrations via the ACP.
*  ACP apps: Third-party integrations available through ACP.

## Installing the ACP Catalog

The ACP Catalog in the Back Office is available since version **202212.0**.

If you're running an older version and want to access the ACP Catalog, install the `spryker/app-catalog-gui` module version `1.4.1` or higher.


## Becoming registered for ACP

To use ACP apps on your Spryker project, your project needs to be registered. The registration process helps to prepare your project for seamless communication with the third-party apps provided via the ACP. The registration process includes 2 steps:
1. [Project update to include SCCOS dependencies](/docs/dg/dev/acp/sccos-dependencies-required-for-the-acp.html).
2. Infrastructure configuration: This step is handled by Spryker once the SCCOS dependencies are in place on the project. Once step 1 is completed, contact us via the [support portal](https://support.spryker.com/s/).

{% info_block infoBox "" %}

Our team will guide you through the registration process if needed. If you have any questions, [send us a message](https://support.spryker.com/s/).

{% endinfo_block %}
