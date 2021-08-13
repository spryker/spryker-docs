---
title: Running Production
description: Spryker OS is capable of providing simple and advanced production scenarios- single instance, many instances with all applications enabled, many instances with particular application layers executed.
originalLink: https://documentation.spryker.com/v5/docs/running-production
originalArticleId: c4f0a880-e536-4830-8f68-d46ce9e19863
redirect_from:
  - /v5/docs/running-production
  - /v5/docs/en/running-production
---

Spryker OS is capable of providing simple and advanced production scenarios: single instance, many instances with all applications enabled, many instances with particular application layers executed. Every project sets different requirements for running production of the system and these decisions should be taken into account during project planning by the development, QA and DevOps teams.

## Applications
Spryker OS provides the following applications:

* Storefront (Yves)
* Backoffice (Zed)
* Storefront API (Glue)

Applications can be run and scaled independently. For more information on the provided Applications and Application Layers see [Conceptual Overview](/docs/scos/dev/developer-guides/202005.0/architecture-guide/conceptual-overview.html).
A typical use is scaling your Storefront API servers while running a native APP marketing campaign (while it's using Storefront API for data access). Same as independently scaling Storefront during Black Friday targeted at customer web-frontend.

## Backoffice Security
Backoffice Application based on Zed Application Layer, contains business logic of your application and heavy Backend calculations. Also, Backoffice Application provides full control over the data via UI.
Even with a good ACL use, Backoffice contains sensitive data which must be secured by environment infrastructure. To protect your data, we highly recommend to run Backoffice Application in an Intranet, behind VPN or Basic Auth.
![Back Office security](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Running+Production/spryker-applications-in-hosting-env.png){height="" width=""}
