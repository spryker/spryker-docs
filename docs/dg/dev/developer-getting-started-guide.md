---
title: Developer getting started guide
description: This is a step-by-step checklist that you can follow through all the stages of working with Spryker.
last_updated: July 11, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/dev-getting-started
originalArticleId: 79b50d48-6f09-45b0-9e4a-f372e274d462
redirect_from:
  - /docs/scos/dev/module-migration-guides/about-migration-guides.html
  - /docs/pbc/all/punchout/202307.0/punchout-catalogs-overview.html
---

This document helps you get started with the Spryker Cloud Commerce OS. It has been structured as a step-by-step checklist to help get you through all of the stages involved in working with Spryker. If you have any questions after following these instructions, you can connect with the Spryker community at [CommerceQuest](https://commercequest.space/).

## 1. Install Spryker

Spryker Demo Shops are a good starting point for any project. They are shipped with different sets of components, which are specific to respective business models. Demo Shops are fully functional and can be used for both demonstrative purposes as well as as a boilerplate for a new project. Though each shop comes with pre-selected components, Spryker offers hundreds of additional modules which you can add late.

You can choose from the following options:

* [B2C Demo Shop](/docs/scos/user/intro-to-spryker/b2c-suite.html)
* [B2B Demo Shop](/docs/scos/user/intro-to-spryker//b2b-suite.html)
* [Marketplace B2C Demo Shop](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2c-suite.html)
* [Marketplace B2B Demo Shop](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2b-suite.html)

You can run Spryker on MacOS, Linux, and Windows with WSL1 or WSL2. For installation instructions, see [Set up Spryker locally](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

### Configure the local environment

To configure the local environment, change the following attributes in `deploy.dev.yml`:

* Namespace: this helps to avoid issues when you have two or more projects with the same names.
* Regions.
* Stores.
* Domains for the local environment.
* Domains for the services like RabbitMQ and Jenkins: this helps to keep all project links together.

For more information about deploy files, see [Deploy file](/docs/scos/dev/the-docker-sdk/{{site.version}}/deploy-file/deploy-file.html).

### Update the `readme.md` file

* Update the project installation description.
* Update the repository link.
* Remove any unused information, like Vagrant installation instructions if DevVM was not used.
* Consider moving the production information further down to make it easier for new developers to understand how to use the project.

## 2. Manage modules

A Spryker module is a single-function unit that has well-defined dependencies and can be updated independently.

{% info_block infoBox %}

To better define your strategy when implementing updates, learn about our [module and feature release process](/docs/scos/user/intro-to-spryker/spryker-release-process.html).

{% endinfo_block %}

[Composer](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html) is used for installing and managing module dependencies:

* Install the dependencies listed in `composer.json`:
```bash
composer install
```
* Update all the installed modules:
```bash
composer update "spryker/*"
```

{% info_block infoBox %}

We recommend running this command weekly to ensure you have the latest fixes. We also recommend [subscribing to our release notes newsletter](https://now.spryker.com/release-notes) to stay up to date with the improvements.

{% endinfo_block %}

* Update a specific module:
```bash
composer update "spryker/{MODULE_NAME}"
```

{% info_block infoBox %}

You can easily keep track of new module versions using the [composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) addon for your local Composer tool.

{% endinfo_block %}

* Add a new module:

```bash
composer require "spryker/module-name"`.
```

To learn about the module versioning approach in Spryker, see [Semantic Versioning: Major vs. Minor vs. Patch Release](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html).

## 3. Configure the environment

1. Define how to manage the settings in the configuration files with [Configuration management](/docs/dg/dev/backend-development/data-manipulation/configuration-management.html).
2. [Configure services](/docs/scos/dev/the-docker-sdk/{{site.version}}/configure-services.html).
3. [Configure ElasticSearch](/docs/pbc/all/search/{{site.version}}/tutorials-and-howtos/configure-elasticsearch.html).
4. [Queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html)
3. [Configure stores](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html#configure-stores) depending on your need for one or multiple stores in your online shop.
4. [Set up cronjobs](/docs/dg/dev/backend-development/cronjobs/cronjobs.html).
<!---4. Move to the maintenance mode-->

### Store clean-up

This step depends on the store setup you came up with during your configuring. For example, if you choose to start with just one store, you should clean up the remaining stores in the following files:

* `config/install/*`
* `data/import/*`
* `deploy.dev.yml`
* `config_default.php`
* `src/SprykerConfig/CodeBucketConfig.php`

### Modules clean-up

* Analyze modules that you have in the desired Demoshop.
* Analyze modules that you need to have.
* Remove unnecessary modules (to do that, you can use the migration guide backward).

### Data import clean-up

Located in the `data/import` folder, you may find additional files related to these other stores. As with cleaning up stores, you must define the stores you intend to use and remove unused files of the rest.

{% info_block infoBox "Info" %}

Keep in mind that you must also change the default config in `DataImportConfig::getDefaultYamlConfigPath()`.

{% endinfo_block %}

For those stores that you wish to allow, don’t forget to edit `CodeBucketConfig::getCodeBuckets()`.

## 4. Configure CI

Continuous Integration (CI) is a development practice where each part of the code can be verified by an automated build and automated tests. This allows for good code quality and that each new feature does not break the existing functionality. The following documents will help you to enable CI in different repositories:
* [Deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-azure-pipelines.html)
* [Customizing deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-bitbucket-pipelines.html)
* [GitHub Actions](/docs/ca/dev/configure-deployment-pipelines/configure-github-actions.html)
* [Configuring GitLab pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-gitlab-pipelines.html)
* [Azure Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-azure-pipelines.html)
* [Configuring Bitbucket Pipelines ](/docs/ca/dev/configure-deployment-pipelines/configure-bitbucket-pipelines.html)

## 5. Configure checkers

To keep your code clean, we recommend using code checkers. To keep your code clean, we recommend using the code checkers.

### Code Sniffer

Before running any code sniffer, we recommend that you update it to its latest version. There are often changes that introduce new checks which help to increase the quality of code. When updating, be sure to keep in mind that you will also need to make changes to the `composer.json` file.

```bash
composer update spryker/code-sniffer slevomat/coding-standard --with-dependencies
```

At the project level, you may choose to use your own rules or to exclude rules enabled in Spryker by default.

* To activate a new rule, check out the full list of rules at [Slevomat Coding Standard](https://github.com/slevomat/coding-standard).
* To disable a rule, you can use configuration. The following example excludes a rule that makes annotation for constructor and method required:

```yaml
<rule ref="vendor/spryker/code-sniffer/Spryker/ruleset.xml">
        <exclude name="Spryker.Commenting.DocBlock"/>
</rule>
```
### PHPStan

When using PHPStan, we recommend version 1.2.* or later. These versions help you avoid memory and other issues.

This can be toggled at the project level by enabling rule level 6:

```yaml
vendor/bin/phpstan analyze -l 6 -c phpstan.neon src/
```

## 6. Configure PhpStorm

If you wish to speed up your work, we recommend configuring PhpStorm.

### Plugins

Make sure to configure the following plugins:

### Speed up indexation
At the beginning of the project, you need to reset your project quite often. PhpStorm indexing is annoying and takes too much of the resources. To avoid this, you can disable cache indexing.

To disable cache indexing, in the PhpStorm, right-click the folder and select **Mark Directory As&nbsp;<span aria-label="and then">></span> Excluded**.

It is safe to disable cache indexing for the following files:

* `data/cache `
* `data/tmp`
* `public/(Yves/Zed/Marketlace)/assets`

## 7. Configure debugging

Before you start developing, you should set up and get to know your debugging environment. To learn how to configure debugging, see one of the following:

* [Configuring debugging in Docker](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-debugging-in-docker.html)

{% info_block infoBox %}

When in a production environment, Zed must be configured to use a VPN, basic access authentication, or an IP allowlist.

{% endinfo_block %}

## 8. Familiarize yourself with the Spryker architecture

As a developer, the Spryker structure is the first thing you need to know to extend the core functionality. To familiarize yourself with the Spryker architecture, different parts of the Client, Shared, Zed, and Yves folders, and their different layers, see the following documents:

* [Conceptual overview](/docs/dg/dev/architecture/conceptual-overview.html): to learn about application layers and code structure.
* [Modules and layers](/docs/dg/dev/architecture/modules-and-application-layers.html): to learn about layers and how various functionality is encapsulated in modules.
* [Programming concepts](/docs/dg/dev/architecture/programming-concepts.html): to learn about the Spryker building blocks contained in the application layers.
* [Technology stack](/docs/dg/dev/architecture/technology-stack.html): to learn about the technologies we use.

<!---* Introduction to navigating the folder structure, main concepts and namespacing.
* The project directory
* The OS directories-->
