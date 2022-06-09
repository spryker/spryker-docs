---
title: Developer getting started guide
description: This is a step-by-step checklist that you can follow  through all the stages of working with Spryker.
last_updated: May 12, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/dev-getting-started
originalArticleId: 79b50d48-6f09-45b0-9e4a-f372e274d462
redirect_from:
  - /2021080/docs/dev-getting-started
  - /2021080/docs/en/dev-getting-started
  - /docs/dev-getting-started
  - /docs/en/dev-getting-started
  - /v6/docs/dev-getting-started
  - /v6/docs/en/dev-getting-started
  - /v5/docs/dev-getting-started
  - /v5/docs/en/dev-getting-started
  - /v4/docs/dev-getting-started
  - /v4/docs/en/dev-getting-started
  - /v3/docs/dev-getting-started
  - /v3/docs/en/dev-getting-started
  - /v2/docs/dev-getting-started
  - /v2/docs/en/dev-getting-started
  - /v1/docs/dev-getting-started
  - /v1/docs/en/dev-getting-started
  - /2021080/docs/about-the-development-guide
  - /2021080/docs/en/about-the-development-guide
  - /docs/about-the-development-guide
  - /docs/en/about-the-development-guide
  - /v6/docs/about-the-development-guide
  - /v6/docs/en/about-the-development-guide
  - /v5/docs/about-the-development-guide
  - /v5/docs/en/about-the-development-guide
  - /v4/docs/about-the-development-guide
  - /v4/docs/en/about-the-development-guide
  - /v3/docs/about-the-development-guide
  - /v3/docs/en/about-the-development-guide
  - /v2/docs/about-the-development-guide
  - /v2/docs/en/about-the-development-guide
  - /v1/docs/about-the-development-guide
  - /v1/docs/en/about-the-development-guide
  - /v4/docs/installation-guide-b2c
  - /v4/docs/en/installation-guide-b2c
  - /v4/docs/installation-guide-b2b
  - /v4/docs/en/installation-guide-b2b  -
  - /2021080/docs/installation-guide-b2c
  - /2021080/docs/en/installation-guide-b2c
  - /docs/installation-guide-b2c
  - /docs/en/installation-guide-b2c
---

Welcome to the Spryker Commerce OS getting started guide.

We structured this page as a step-by-step checklist for you to follow through all the stages of working with Spryker.

## 1. Install Spryker

The typical Spryker installation process includes installing a proper starting point for your project. The best option to start projects is to use *Demo Shops*. A Demo Shop is a set of Spryker Commerce OS components selected for a specific type of business and project. They are fully functional and can be used both for demonstration purposes and as a boilerplate for your project. Even if a shop does not provide all the capabilities you need, you can install the necessary components later.

You can choose from the following options:

* [B2B Demo Shop](/docs/scos/user/intro-to-spryker//b2b-suite.html) - a boilerplate for B2B commerce projects.
* [B2C Demo Shop](/docs/scos/user/intro-to-spryker/b2c-suite.html) - a starting point for B2C implementations.
* Separate [Features](/docs/scos/user/features/{{site.version}}/features.html) and modules - you can also expand both Demo Shops with separate features and modules.

### Installing Spryker with Docker

We recommend starting with a Docker SDK environment. This option includes Docker and related tools to build images and run containers that match your requirements.

It features a lightweight environment that is closer to production implementation.

To start developing your Spryker in Docker, see [Installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html).

#### Deploy file

For the local environment, use the [deploy.dev.yml](/docs/scos/dev/the-docker-sdk/202108.0/deploy-file/deploy-file.html) file.

In the default deploy file, change the following attributes:

 - Namespace: We recommend specifying the name for your project, as this helps to avoid issues when you have two or more projects with the same names
 - Regions
 - Stores
 - Domains for the local environment
 - Domains for the services (RabbitMQ, Jenkins): Optional, but this can help to keep all project links together

#### Vagrant clean up

If you use Docker and not the Development Virtual Machine (DevVM), you don't need the DevVM's configs. Therefore, remove the following files:
- `config/install/development.yml`
- `config_default-development_*.php`

### Installing Spryker with the Development Virtual Machine

Spryker Commerce OS comes with a Virtual Machine that has all the prerequisites to run Spryker. It provides a full-featured development environment that will help you customize Spryker per your project requirements. The Development Virtual Machine (DevVM) is based on VirtualBox and Vagrant, and can be used to install Spryker on any Operating System.

Choose an installation guide that suits your needs best:


| OPERATION SYSTEMS | B2B SHOP OR B2C SHOP |
| --- | --- |
| DevVM on Linux / Mac OS | [B2B or B2C Demo Shop installation: Mac OS or Linux, with Development Virtual Machine](/docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/installing-spryker-with-devvm-on-macos-and-linux.html) |
| DevVM on Windows | [B2B or B2C Demo Shop installation: Windows, with Development Virtual Machine](/docs/scos/dev/setup/installing-spryker-without-development-virtual-machine-or-docker.html) |

### Independent installation
Alternatively, you can install Spryker on an operating system that fulfills Spryker [DevVM system requirements](/docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/devvm-system-requirements.html) without the virtual machine or Docker images. See [B2B or B2C Demo Shop installation: without Development Virtual Machine](/docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/installing-spryker-with-devvm-on-windows.html) for details.

{% info_block warningBox %}

After installing, make sure to have a look at [Post-Installation steps and additional info](/docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/configuring-spryker-after-installing-with-devvm.html) for tips on fine-tuning Spryker.

{% endinfo_block %}

### Adjusting the readme file

After you install the project, adjust the readme.md file as follows:

 - Update the project installation description.
 - Update the repository link.
 - Remove the unused information, for example, Vagrant installation instructions if you don't use the DevVM.
 - Consider moving the production information down, as this can help new developers easily understand how to use the project.

## 2. Manage your modules

Once you have completed the installation, you can start managing *modules*. A module is a single functional unit that has well-defined dependencies, and can be used and updated independently.
{% info_block infoBox %}

To define your strategy of taking Spryker updates, learn about our [module and feature release process](/docs/scos/user/intro-to-spryker/spryker-release-process.html).

{% endinfo_block %}

We use [Composer](/docs/scos/dev/setup/managing-scos-dependencies-with-composer.html) to install and manage module dependencies.
Run the following Composer commands depending on what you want to do:
* To install the dependencies you listed in the `composer.json` file of the project: `composer install`.
* To update all the modules for your project: `composer update "spryker/*"`.

{% info_block infoBox %}

We recommend running this command weekly to assert you have the latest fixes. We also recommend [subscribing to our release notes newsletter](https://now.spryker.com/release-notes) to stay up-to-date with the improvements.

{% endinfo_block %}

*  To update a particular module: `composer update "spryker/module-name"`. You can easily keep track of new module versions using the [composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) addon for your local Composer tool.
*  To add a new module to your project: `composer require "spryker/module-name"`.

See [Semantic Versioning: Major vs. Minor vs. Patch Release](/docs/scos/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html) to learn about the module versioning approach in Spryker.


## 3. Configure the environment

To configure and customize your Spryker Commerce OS, do the following:

1. To define how to manage and configure the settings in configuration files, see [Configuration management](/docs/scos/dev/back-end-development/data-manipulation/configuration-management.html).
2. Configure your environment:
    *   [Database](/docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/configuring-database-servers.html)
    *   [Redis](/docs/scos/dev/setup/redis-configuration.html)
    <!---*   [ElasticSearch](/docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/configuring-elasticsearch.html)-->
    *   [Queue](/docs/scos/dev/back-end-development/data-manipulation/queue/queue.html)
3. [Configure stores](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html#configure-stores) to have one or multiple stores in your online shop.
4. [Schedule tasks](/docs/scos/dev/back-end-development/cronjobs/cronjobs.html) (Cron jobs).
<!---4. Move to the maintenance mode-->

### Store clean up
This step depends on the store setup which you plan to have. If you start with one store, consider cleaning up the remaining stores right away in the following files:

 - `config/install/*`
 - `data/import/*`
 - `deploy.dev.yml`
 - `config_default.php`
 - `src/SprykerConfig/CodeBucketConfig.php`

### Data import clean up

In the `data/import` folder, there are many files related to each store. Define the stores you need and remove all the unused files.

{% info_block infoBox "Info" %}

Keep in mind that you must also change the default config in `DataImportConfig::getDefaultYamlConfigPath()`.

{% endinfo_block %}

To allow stores, edit `CodeBucketConfig::getCodeBuckets()`.

## 4. Configure CI
Continuous integration (CI) is a development practice where each part of the code can be verified by an automated build and automated tests. This allows to have a good code quality and be sure that each new feature does not break the existing functionality. The following documents will help you to enable CI in different repositories:
 - [Deployment pipelines](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/deployment-pipelines.html)
 - [Customizing deployment pipelines](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/customizing-deployment-pipelines.html)
 - [GitHub Actions](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/configuring-github-actions.html)
 - [Configuring GitLab pipelines](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/configuring-gitlab-pipelines.html)
 - [Azure Pipelines](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/configuring-azure-pipelines.html)
 - [Configuring Bitbucket Pipelines ](/docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/configuring-bitbucket-pipelines.html)

## 5. Configure checkers
To keep your code clean, we recommend using the code checkers.

### Code sniffer
Before running the code sniffer, we recommend updating it to the latest version, as it introduces new checks that increase the code quality even more. When updating, keep in mind that you also need to change the `composer.json` file.

```bash
composer update spryker/code-sniffer slevomat/coding-standard --with-dependencies
```

On the project level, you may decide to use your own rules or exclude some that are enabled in Spryker by default.

To enable a new rule, check out the full list of rules at [Slevomat Coding Standard](https://github.com/slevomat/coding-standard).

To disable a rule, you can use configuration. The following example excludes a rule that makes annotation for constructor and method required:

```yaml
<rule ref="vendor/spryker/code-sniffer/Spryker/ruleset.xml">
        <exclude name="Spryker.Commenting.DocBlock"/>
</rule>
```
### PhpStan

For PHPStan, we recommend using version 1.2.* or later. These versions help you avoid memory and other issues.

On a project level, you can enable rule level 6:

```yaml
vendor/bin/phpstan analyze -l 6 -c phpstan.neon src/
```

## 6. PhpStorm configuration
We recommend configuring your PhpStorm properly to speed up your work.

### Plugins
Configure the following plugins:

 - PYZ
 - Symfony Support

### Speed up indexation
In the beginning of the project, you need to reset your project quite often. PhpStorm indexing is annoying and takes too much of the resources. To avoid this, you can disable cache indexing.

To disable cache indexing, in the PhpStorm, right click on the folder and select **Mark Directory As**->**Excluded**.

It is safe to disable cache indexing in the following files:
 - `data/cache `
 - `data/tmp`
 - `public/(Yves/Zed/Marketlace)/assets`

## 7. Debugging

Before you start developing, set up and get to know your debugging environment. To learn how to configure debugging, see one of the following:
* [Configuring debugging in Docker](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-debugging-in-docker.html)
* [Configuring debugging in DevVM](/docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/configuring-debugging-in-devvm/configuring-debugging-in-devvm.html)

{% info_block infoBox %}

In a production setup, Zed must be covered with a VPN, Basic Auth or IP whitelisting.

{% endinfo_block %}

## 8. Familiarize yourself with the Spryker architecture

As a developer, the Spryker structure is the first thing you need to know to extend the core functionality. To familiarize yourself with the Spryker architecture, different parts of the Client, Shared, Zed and Yves folders and their different layers, see the following articles:

* [Conceptual overview](/docs/scos/dev/architecture/conceptual-overview.html): to learn about application layers and code structure.
* [Modules and layers](/docs/scos/dev/architecture/modules-and-layers.html): to learn about layers and how various functionality is encapsulated in modules.
* [Programming concepts](/docs/scos/dev/architecture/programming-concepts.html): to learn about the Spryker building blocks contained in the application layers.
* [Technology stack](/docs/scos/dev/architecture/technology-stack.html): to learn about the technologies we use.

<!---* Introduction to navigating the folder structure, main concepts and namespacing.
* The project directory
* The OS directories-->

<!---## Step 5: The Development Virtual Machine

Get to know the parts of the Spryker Development Virtual Machine with which we ship the Spryker Commerce OS so that you have a pre-configured and ready to go stack.

* What is the Spryker DevVM (Development Virtual Machine) and why do we need it?
* Main Structure
* Technology Stack: Linux distribution, PHP, Postgres, MySQL, ES, Redis, Queue, Jenkins-->
