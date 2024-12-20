---
title: Running production
description: Simple and advanced production scenarios - single instance, many instances with all applications enabled, many instances with particular application layers executed.
last_updated: May 17, 2024
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/running-production
originalArticleId: ac26ae09-3faf-4b6e-a9cd-282c24157ab2
redirect_from:
  - /docs/scos/dev/back-end-development/running-production.html
---

Spryker OS is capable of providing simple and advanced production scenarios: single instance, many instances with all applications enabled, and many instances with particular application layers executed. Every project sets different requirements for running the production of the system and these decisions should be taken into account during project planning by the development, QA, and DevOps teams.

## Applications

Spryker OS provides the following applications:
* Storefront (Yves)
* Back Office (Zed)
* Storefront API (Glue Storefront)
* Backend API (Glue Backend)

Applications can be run and scaled independently. For more information on the provided applications and application layers, see [Conceptual overview](/docs/dg/dev/architecture/conceptual-overview.html).

Typical use is scaling your Storefront API servers while running a native APP marketing campaign (while it's using Storefront API for data access). Same as independently scaling Storefront during Black Friday targeted at customer web-frontend.

## Back Office security

Back Office Application based on the Zed Application layer contains the business logic of your application and heavy backend calculations. Also, the Back Office Application provides full control over the data through UI.
Even with good ACL use, the Back Office contains sensitive data which must be secured in the internet.

{% info_block warningBox "System requirement" %}

To protect the application and user data, the Back Office Application must be secured in the internet. The following options are available by default:
- Basic Auth
- IP allowlisting

{% endinfo_block %}


![Back Office security](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Running+Production/spryker-applications-in-hosting-env.png)
