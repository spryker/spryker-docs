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

* [B2C Demo Shop](/docs/about/all/b2c-suite.html)
* [B2B Demo Shop](/docs/about/all//b2b-suite.html)
* [Marketplace B2C Demo Shop](/docs/about/all/spryker-marketplace/marketplace-b2c-suite.html)
* [Marketplace B2B Demo Shop](/docs/about/all/spryker-marketplace/marketplace-b2b-suite.html)

You can run Spryker on MacOS, Linux, and Windows with WSL1 or WSL2. For installation instructions, see [Set up Spryker locally](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

### Configure the local environment

To configure the local environment, change the following attributes in `deploy.dev.yml`:

* Namespace: this helps to avoid issues when you have two or more projects with the same names.
* Regions.
* Stores.
* Domains for the local environment.
* Domains for the services like RabbitMQ and Jenkins: this helps to keep all project links together.

For more information about deploy files, see [Deploy file](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html).

### Update the `readme.md` file

* Update the project installation description.
* Update the repository link.
* Remove any unused information, like Vagrant installation instructions if DevVM was not used.
* Consider moving the production information further down to make it easier for new developers to understand how to use the project.

## 2. Manage modules

A Spryker module is a single-function unit that has well-defined dependencies and can be updated independently. [Composer](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html) is used for installing and managing module dependencies.

To define your strategy when implementing updates, learn about our [module and feature release process](/docs/about/all/releases/product-and-code-releases.html).


You will use the following commands to manage modules with Composer:

* Install the dependencies listed in `composer.json`:
```bash
composer install
```

* Update all the installed modules:
```bash
composer update "spryker/*"
```

We recommend updating modules weekly to ensure you have the latest fixes. We also recommend [subscribing to our release notes newsletter](https://now.spryker.com/release-notes) to stay up to date with the improvements.

* Update a specific module:
```bash
composer update "spryker/{MODULE_NAME}"
```

You can keep track of new module versions using the [composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) addon.

* Add a new module:

```bash
composer require "spryker/module-name"`.
```

To learn about the module versioning approach in Spryker, see [Semantic Versioning: Major vs. Minor vs. Patch Release](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html).

## 3. Configure the environment

1. Define how to manage the settings in the configuration files with [Configuration management](/docs/dg/dev/backend-development/data-manipulation/configuration-management.html).
2. [Configure services](/docs/dg/dev/integrate-and-configure/configure-services.html).
3. [Configure ElasticSearch](/docs/pbc/all/search/{{site.version}}/base-shop/tutorials-and-howtos/configure-elasticsearch.html).
4. [Configure queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html).
5. [Configure stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html#configure-stores).
6. [Set up cronjobs](/docs/dg/dev/backend-development/cronjobs/cronjobs.html).

### Clean up store configuration

If you chose to start with one store, clean up the configuration of the unneeded stores in the following files:

* `config/install/*`
* `data/import/*`
* `deploy.dev.yml`
* `config_default.php`
* `src/SprykerConfig/CodeBucketConfig.php`

### Clean up modules

1. Go through the modules that came with the Demo Shop you've installed.
2. Come up with the list of modules you actually need.
3. Remove unnecessary modules by following module upgrade guides in a backwards fashion.

### Clean up data import

* In `data/import`, remove the files of the unneeded stores.

* Change the default config in `DataImportConfig::getDefaultYamlConfigPath()`.

* Define the needed stores in `CodeBucketConfig::getCodeBuckets()`.

## 4. Configure CI

Continuous Integration (CI) is a development practice where each part of the code can be verified by an automated build and automated tests. This allows for good code quality and makes sure new features don't break the existing functionality. For instructions on setting up CI in different repositories, see the following documents:
* [Deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-azure-pipelines.html)
* [Customizing deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-bitbucket-pipelines.html)
* [GitHub Actions](/docs/ca/dev/configure-deployment-pipelines/configure-github-actions.html)
* [Configuring GitLab pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-gitlab-pipelines.html)
* [Azure Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-azure-pipelines.html)
* [Configuring Bitbucket Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-bitbucket-pipelines.html)

## 5. Configure checkers

To keep your code clean, we recommend using code checkers.

### Code sniffer

Before running any code sniffer, we recommend updating it to the latest version. When updating, make sure to update `composer.json`:

```json
composer update spryker/code-sniffer slevomat/coding-standard --with-dependencies
```

On the project level, you add your own rules and exclude the default rules.

* To activate a new rule, check out the full list of rules at [Slevomat Coding Standard](https://github.com/slevomat/coding-standard).
* To disable a rule, update the configuration. The following example excludes the rule that makes annotations for constructors and methods required:

```yaml
<rule ref="vendor/spryker/code-sniffer/Spryker/ruleset.xml">
        <exclude name="Spryker.Commenting.DocBlock"/>
</rule>
```
### PHPStan

When using PHPStan, we recommend version 1.2.* or later. These versions help you avoid memory and other issues.

You can enable PHPStan on project level by enabling rule level 6:

```yaml
vendor/bin/phpstan analyze -l 6 -c phpstan.neon src/
```

## 6. Configure PhpStorm indexation

When you start developing a project, you need to reset it quite often. PhpStorm indexing can slow it down.

To disable cache indexing, in the PhpStorm, right-click the folder and select **Mark Directory As&nbsp;<span aria-label="and then">></span> Excluded**.

It is safe to disable cache indexing for the following files:

* `data/cache `
* `data/tmp`
* `public/(Yves/Zed/Marketlace)/assets`

## 7. Configure debugging


Before you start developing, you need to set up and get to know your debugging environment. To learn how to configure debugging, see [Configuring debugging](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html).


## 8. Explore Spryker architecture

To learn about Spryker architecture, different parts of the Client, Shared, Zed, and Yves folders, and their different layers, see the following documents:

* [Conceptual overview](/docs/dg/dev/architecture/conceptual-overview.html): application layers and code structure.
* [Modules and layers](/docs/dg/dev/architecture/modules-and-application-layers.html): layers and how various functionality is encapsulated in modules.
* [Programming concepts](/docs/dg/dev/architecture/programming-concepts.html): Spryker building blocks contained in the application layers.
* [Technology stack](/docs/dg/dev/architecture/technology-stack.html): technologies used.
