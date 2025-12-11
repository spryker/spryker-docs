---
title: Development getting started guide
description: This is a step-by-step checklist that you can follow through all the stages of working with Spryker.
last_updated: July 11, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/dev-getting-started
originalArticleId: 79b50d48-6f09-45b0-9e4a-f372e274d462
redirect_from:
  - /docs/scos/dev/module-migration-guides/about-migration-guides.html
  - /docs/pbc/all/punchout/202307.0/punchout-catalogs-overview.html
  - /docs/scos/dev/developer-getting-started-guide.html
---

This document helps you get started with the Spryker Cloud Commerce OS. It has been structured as a step-by-step checklist to help get you through all of the stages involved in working with Spryker. If you have any questions after following these instructions, you can connect with the Spryker community at [CommerceQuest](https://commercequest.space/).

## 1. Install Spryker

Spryker Demo Shops are a good starting point for any project. They are shipped with different sets of components, which are specific to respective business models. Demo Shops are fully functional and can be used for both demonstrative purposes as well as as a boilerplate for a new project. Though each shop comes with pre-selected components, Spryker offers hundreds of additional modules which you can add late.
You can choose from the following options:
- [B2C Demo Shop](/docs/about/all/b2c-suite.html)
- [B2B Demo Shop](/docs/about/all/b2b-suite.html)
- [Marketplace B2C Demo Shop](/docs/about/all/spryker-marketplace/marketplace-b2c-suite.html)
- [Marketplace B2B Demo Shop](/docs/about/all/spryker-marketplace/marketplace-b2b-suite.html)

You can run Spryker on MacOS, Linux, and Windows with WSL1 or WSL2. For installation instructions, see [Set up Spryker locally](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

## 2. Configure development tools

Spryker offers a set of [development tools](/docs/dg/dev/development-tools.html) that make it easier to work with the project: DockerSdk, Xdebug, WebProfiler, Code Quality Tools, and more.

## 3. Configure repository and Continuous Integration

To configure the repository and Continuous Integration, see [Configure CI](/docs/dg/dev/ci.html).

## 4. Configure PhpStorm

When you start developing a project, you need to reset it quite often. PhpStorm indexing can slow it down.
To disable cache indexing, in the PhpStorm, right-click the folder and select **Mark Directory As&nbsp;<span aria-label="and then">></span> Excluded**.
It is safe to disable cache indexing for the following files:
- `data/cache`
- `data/tmp`
- `public/(Yves/Zed/Marketlace)/assets`
- `.angular/cache`

A couple of plugins for PhpStorm from community are recommended:
![phpstorm plugins](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/spryker-phpstorm-plugins.png)

## 5. Explore Spryker Documentation

To learn about Spryker architecture, different parts of the Client, Shared, Zed, and Yves folders, and their different layers, see the following documents:
- [Architecture](/docs/dg/dev/architecture/architecture.html).
- [Guidelines](/docs/dg/dev/guidelines/guidelines.html).
- [Backend development](/docs/dg/dev/backend-development/back-end-development.html)
- [Frontend development](/docs/dg/dev/frontend-development/latest/frontend-development.html)

To find relevant documentation for your project, use the [search](/search.html).
![search](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/search.png).

## 6. Configure project

### Configure project namespace

Use your own project namespace
By default, project code is stored in the `src/Pyz` directory. 
You can create your own namespace, such as `src/BestProject`, to keep your code fully separated from the Demo Shop. 
This separation simplifies applying Demo Shop updates.
![Project Namespace](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/project-namespace.png)

More information about [upgradability](/docs/dg/dev/sdks/sdk/customization-strategies-and-upgradability.html)

### Configure the local environment

To configure the local environment, change the following attributes in `deploy.dev.yml`:
- Namespace: this helps to avoid issues when you have two or more projects with the same names.
- Regions.
- Stores.
- Domains for the local environment.
- Domains for the services like RabbitMQ and Jenkins: this helps to keep all project links together.
![Deploy namespace](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/deploy-namespace.png)

For more information about deploy files, see [Deploy file](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html).

### Update the `readme.md` file

- Update the project installation description.
- Update the repository link.
- Remove any unused information, like Vagrant installation instructions if DevVM was not used.
- Consider moving the production information further down to make it easier for new developers to understand how to use the project.

### Manage modules

A Spryker module is a single-function unit that has well-defined dependencies and can be updated independently. [Composer](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html) is used for installing and managing module dependencies.
To define your strategy when implementing updates, learn about our [module and feature release process](/docs/about/all/releases/product-and-code-releases.html).

To learn about the module versioning approach in Spryker, see [Semantic Versioning: Major vs. Minor vs. Patch Release](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html).

### Clean up modules

1. Go through the modules that came with the Demo Shop you've installed.
2. Come up with the list of modules you actually need.
3. Remove unnecessary modules by following module upgrade guides in a backwards fashion.

### Configure services

1. Define how to manage the settings in the configuration files with [Configuration management](/docs/dg/dev/backend-development/data-manipulation/configuration-management.html).
2. [Configure services](/docs/dg/dev/integrate-and-configure/configure-services.html).
3. [Configure Elasticsearch](/docs/pbc/all/search/{{site.version}}/base-shop/tutorials-and-howtos/configure-elasticsearch.html).
4. [Configure queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html).
5. [Configure stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html#configure-stores).
6. [Set up cronjobs](/docs/dg/dev/backend-development/cronjobs/cronjobs.html).

### Clean up store configuration

If you chose to start with one store, clean up the configuration of the unneeded stores in the following files:
- `config/install/*`
- `data/import/*`
- `deploy.dev.yml`
- `config_default.php`
- `src/SprykerConfig/CodeBucketConfig.php`

### Clean up data import

- In `data/import`, remove the files of the unneeded stores.
- Change the default config in `DataImportConfig::getDefaultYamlConfigPath()`.
- Define the needed stores in `CodeBucketConfig::getCodeBuckets()`.
