---
title: Checklist for a new store implementation
description: Follow a checklist for implementing a new store in Spryker's multi-store setup, including environment setup, DNS configuration, and integration tasks.
template: concept-topic-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/checklist-for-a-new-store-implementation.html
related:
  - title: Multistore setup options
    link: docs/ca/dev/multi-store-setups/multistore-setup-options.html
---

This document outlines the high-level tasks and responsibilities of Spryker and Customer when setting up a new store depending on the chosen setup for the multi-store environment. For a description of setups referred to in this document, see [Multistore setup options](/docs/ca/dev/multi-store-setups/multistore-setup-options.html).

For detailed steps about the new store implementation, see [HowTo: Set up multiple stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html).

## Setup 1

**Spryker**
1. Adjust deployment structure / CI: define the environment variables in Spryker CI based on the deployment files.
2. Change DNS (Spryker owns DNS in AWS).

**SI / Customer**
1. Set up a local dev environment and adjust configuration in `config.php`, including hosts in data YML files, for example, in `/deploy.spryker-b2c-production.yml`.
2. Implement and apply [code buckets](/docs/dg/dev/architecture/code-buckets.html) for different themes.  
3. Adjust the importer and define product, content, data, payment, including OMS, or stock store relations via the importer. See [example for the B2C demo shop](https://github.com/spryker-shop/b2c-demo-shop/tree/master/data/import/common/common).  
4. Change DNS (merchant owns DNS).
5. Check third-party integrations (ERP, CRM, CMS, PIM, Payment, Logistics, Search).
6. Migration of the existing data into the shared instance. Spryker can support you in this on request.
7. Full UAT, end2end tests.
8. Check the provided launch list from Spryker, if you start a new project.
9. Adjust application performance monitoring.

{% info_block infoBox "Info" %}

When handling multi Storefronts or Zeds through code buckets or namespaces, you might need to send a request to Spryker for multi-instance enablement depending on the specific instance (Storefront or Zed).

{% endinfo_block %}

## Setup 2

For this setup, send a support request to Spryker and do the following:

- Ask Spryker to set up a multi-database.
- Provide the deploy file.
- Mention which countries you want to enable.

**Spryker**
1. Adjust deployment structure / CI: define the environment variables in Spryker CI based on the deployment files.
2. Add new endpoints for stores and regions (Spryker owns DNS in AWS).
3. Update the RDS configuration to activate multi-database feature.

**SI / Customer**

1. Set up a local dev environment and adjust the configuration in `config.php`, including hosts in data YML files, for example, in `/deploy.spryker-b2c-production.yml`.
2. Implement and apply [code buckets](/docs/dg/dev/architecture/code-buckets.html) for different themes.
3. Adjust the importer and define product, content, data, payment, including OMS or stock store relations via the importer. See [example for the B2C demo shop](https://github.com/spryker-shop/b2c-demo-shop/tree/master/data/import/common/common).  
4. Change DNS (merchant owns DNS).
5. Check third-party integrations (ERP, CRM, CMS, PIM, Payment, Logistics, Search).
6. Migrate the existing data into the shared instance. Spryker can support you in this on request.
7. Conduct the full UAT, end2end tests.
8. If you start a new project, check the provided launch list from Spryker.
9. Adjust application performance monitoring.

{% info_block infoBox "Info" %}

When handling multi Storefronts or Zeds through code buckets or namespaces, you might need to send a request to Spryker for multi-instance enablement depending on the specific instance (Storefront or Zed).

{% endinfo_block %}

## Setup 3

{% info_block warningBox "Subject to change" %}

The following steps are subject to change and should be considered as tentative.

{% endinfo_block %}

For this type of setup, you have to send a new provisioning request via the [Spryker support portal](https://support.spryker.com/s/).

**Spryker**

Provision of a new fully isolated environment per store.

**SI / Customer**

1. Set up a local dev environment and adjust the configuration in `config.php`, including hosts in data YML files, for example, in `/deploy.spryker-b2c-production.yml`.
2. Implement and apply [code buckets](/docs/dg/dev/architecture/code-buckets.html) for different themes.
3. Adjust the importer and define product, content, data, payment, including OMS or stock store relations via the importer. See [example for the B2C demo shop](https://github.com/spryker-shop/b2c-demo-shop/tree/master/data/import/common/common).  
4. Change DNS (merchant owns DNS).
5. Check third-party integrations (ERP, CRM, CMS, PIM, Payment, Logistics, Search).
6. Migrate the existing data into the shared instance. Spryker can support you in this on request.
7. Conduct the full UAT, end2end tests.
8. Check the provided launch list from Spryker, if you start a new project.
9. Adjust application performance monitoring.
10. Manage codebase for all the separate stores taking into account the increased complexity of deployment and store maintenance.

## Main touchpoints
The touchpoints listed here may vary depending on the project. If view of that, here we defined the most standard ones. Keep in mind that these touchpoints have already been listed in the previous sections as part of the SI/Customer tasks for each setup.

### Configuration

| File | Description | To do |
|------|-------------|-------|
| config/Shared/default_store.php     | Specifies the default store.            | Set the desired store code.      |
| config/Shared/stores.php     | Contains store-specific application configuration.            | Add new stores, configure formats, locales, available countries, currencies.      |
| config/install/*.yml     | YAML files, describing application building steps for different environments used by docker/sdk.            | Some of the commands have a context of the store for which they are executed. Make sure the right store is used.      |
| data/import/*.csv     | Demo data, a lot of store-specific content.            | Make sure to add or remove data for respective stores in all the files.      |
| deploy.{environment-name}.yml     | Main docker/sdk configuration file, which is used to build all application images.            | Regions, stores, groups, databases, domains. You can create a dedicated environment file for each store.      |

### Data
1. Generate product data files to add new localized attributes and entries.
2. Create the folder `data/import/common/{NewStore}` and fill it with all the files that reflect the new store.
3. Modify install recipes to add the new folder you created or copied in the previous steps.

### Store domains and certificates
Request the Spryker Cloud team to create domains and certificates.

{% info_block infoBox "Info" %}

Certificates are created for all domains.

{% endinfo_block %}

### Translations
- Re-generate all CSV files consisting of a new locale.
- Import the updated CSV files.

### CMS
- Update the list of the [related CMS stores](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/cms-feature-overview/cms-pages-overview.html#cms-page-store-relation)
- Update store-specific Terms & Conditions

### Add-ons
Configure the project-specific add-ons. The add-ons vary and depend on the project implementation. For example, create country admin roles, configure the outgoing email address, etc.
