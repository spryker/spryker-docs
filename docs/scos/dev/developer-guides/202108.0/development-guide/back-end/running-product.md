---
title: Running production
originalLink: https://documentation.spryker.com/2021080/docs/running-production
redirect_from:
  - /2021080/docs/running-production
  - /2021080/docs/en/running-production
---

Spryker OS is capable of providing simple and advanced production scenarios: single instance, many instances with all applications enabled, many instances with particular application layers executed. Every project sets different requirements for running production of the system and these decisions should be taken into account during project planning by the development, QA and DevOps teams.

## Applications
Spryker OS provides the following applications:

* Storefront (Yves)
* Backoffice (Zed)
* Storefront API (Glue)

Applications can be run and scaled independently. For more information on the provided Applications and Application Layers see [Conceptual Overview](https://documentation.spryker.com/docs/concept-overview).
A typical use is scaling your Storefront API servers while running a native APP marketing campaign (while it's using Storefront API for data access). Same as independently scaling Storefront during Black Friday targeted at customer web-frontend.

## Back Office security
Back Office Application based on Zed Application Layer, contains business logic of your application and heavy Backend calculations. Also, the Back Office Application provides full control over the data via UI.
Even with a good ACL use, the Back Office contains sensitive data which must be secured by environment infrastructure. 
{% info_block warningBox "System requirement" %}

To protect the application and user data, the Back Office Application (Zed) must be secured in an Intranet (using VPN, Basic Auth, IP Allowlist, DMZ, etc.).

{% endinfo_block %}


![Back Office security](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Running+Production/spryker-applications-in-hosting-env.png){height="" width=""}

