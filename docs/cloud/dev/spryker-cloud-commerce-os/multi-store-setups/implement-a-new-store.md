---
title: Implement a new store
description: Learn how to implement a new store in a multistore environment
template: howto-guide-template
related:
  - title: Multistore setup options
    link: docs\cloud\dev\spryker-cloud-commerce-os\multi-store-setups\multistore-setup-options.html
---

This document outlines the high-level tasks and responsibilities of Spryker and Customer when setting up a new store depending on the chosen setup for the multistore environment. For detailed description of setups refered to in this document, see [Multistore setup options](/docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/multistore-setup-options.html).

## Setup 1

**Spryker**
1. Adjust deployment structure / CI or define the environment variables in Spryker CI based on the deployment files.
2. Make adjustments for stage and production, that is, adjust configuration in the `config.php` file.
3. Change DNS (Spryker owns DNS in AWS).

**SI / Customer**

1. Set up a local dev environment and adjust configuration in `config.php` including hosts in data YML files, for example, in `/deploy.spryker-b2c-production.yml`.
2. Implement and apply [code buckets](/docs/scos/dev/architecture/code-buckets.html) for different themes.  
3. Adjust the importer and define product, content, data, payment including OMS or stock store relations via importer. See [example for the B2C demo shop](https://github.com/spryker-shop/b2c-demo-shop/tree/master/data/import/common/common).  
4. Change DNS (merchant owns DNS).
5. Check third party integrations (ERP, CRM, CMS, PIM, Payment, Logistik, Search) 
6. Migration of the existing data into the shared instance. Spryker can support you in this on request.
7. Full UAT, end2end tests.
8. Check the provided launch list from Spryker, if you start a new project.
9. Adjust application performance monitoring.

