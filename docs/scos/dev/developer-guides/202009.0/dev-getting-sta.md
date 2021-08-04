---
title: Developer getting started guide
originalLink: https://documentation.spryker.com/v6/docs/dev-getting-started
redirect_from:
  - /v6/docs/dev-getting-started
  - /v6/docs/en/dev-getting-started
---

Welcome to the Spryker Commerce OS getting started guide.
 
We structured this page as a step-by-step checklist for you to follow through all the stages of working with Spryker.

## 1. Install Spryker

Typical Spryker installation process includes installing a proper starting point for your project. The best option to start projects is to use *Demo Shops*. A Demo Shop is a set of Spryker Commerce OS components selected for a specific type of business and project. They are fully functional and can be used both for demonstration purposes and as a boilerplate for your project. Even if a shop does not provide all the capabilities you need, you can install the necessary components later.

You can choose from the following options:

* [B2B Demo Shop](https://documentation.spryker.com/docs/b2b-suite) - a boilerplate for B2B commerce projects.
* [B2C Demo Shop](https://documentation.spryker.com/docs/b2c-suite) - a starting point for B2C implementations.
* Separate [Features](https://documentation.spryker.com/docs/features) and modules - you can also expand both Demo Shops with separate features and modules.

### Installing Spryker with Docker
We recommend starting with a Docker SDK environment. This option includes Docker and related tools to build images and run containers that match your requirements. 

It features a lightweight environment that is closer to a production implementation. 

To start developing your Spryker in Docker, see [Installing Spryker with Docker](https://documentation.spryker.com/docs/installing-spryker-with-docker).

### Installing Spryker with Development Virtual Machine

Spryker Commerce OS comes with a Virtual Machine that has all the prerequisites to run Spryker. It provides a full-featured development environment that will help you customize Spryker per your project requirements. The Development Virtual Machine (DevVM) is based on VirtualBox and Vagrant, and can be used to install Spryker on any Operating System. 

Choose an installation guide that suits your needs best:


| Operating system | B2B Shop or B2C Shop |
| --- | --- |
| DevVM on Linux / Mac OS | [B2B or B2C Demo Shop installation: Mac OS or Linux, with Development Virtual Machine](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm) |
| DevVM on Windows | [B2B or B2C Demo Shop installation: Windows, with Development Virtual Machine](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine) |

### Independent Installation
Alternatively, you can install Spryker on an operating system that fulfills Spryker [System requirements](https://documentation.spryker.com/docs/system-requirements) without the virtual machine or Docker images. See [B2B or B2C Demo Shop installation: without Development Virtual Machine](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-without-development-virtual-machine) for details.

{% info_block warningBox %}
After installing, make sure to have a look at [Post-Installation steps and additional info](https://documentation.spryker.com/docs/post-installation-steps-and-additional-info
{% endinfo_block %} for tips on fine-tuning Spryker.)

## 2. Manage your modules

Once you have completed the installation, you can start managing *modules*. A module is a single functional unit, that has well-defined dependencies, and can be used and updated independently. 
{% info_block infoBox %}

To define your strategy of taking Spryker updates, learn about our [module and feature release process](https://documentation.spryker.com/docs/spryker-release-process).

{% endinfo_block %}

We use [Composer](https://documentation.spryker.com/docs/composer) to install and manage module dependencies. 
Run the following Composer commands depending on what you want to do:
* To install the dependencies you listed in the `composer.json` file of the project: `composer install`.
*  To update all the modules for your project: `composer update "spryker/*"`. 
{% info_block infoBox %}

We recommend running this command weekly to assert you have the latest fixes. We also recommend [subscribing to our release notes newsletter](https://now.spryker.com/release-notes) to stay up-to-date with the improvements.

{% endinfo_block %}
*  To update a particular module: `composer update "spryker/module-name"`. You can easily keep track of new module versions using the [composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) addon for your local Composer tool.
*  To add a new module to your project: `composer require "spryker/module-name"`

See [Semantic Versioning: Major vs. Minor vs. Patch Release](https://documentation.spryker.com/docs/major-minor-patch-release) to learn about the module versioning approach in Spryker.


## 3. Configure the environment

To configure and customize your Spryker Commerce OS, do the following:

1. To define how to manage and configure the settings in configuration files, see [Configuration management](https://documentation.spryker.com/docs/configuration-management).
2. Configure your environment: 
    *   [Database](https://documentation.spryker.com/docs/configure-database-server)
    *   [Redis](https://documentation.spryker.com/docs/redis-configruation-201903)
    <!---*   [ElasticSearch](https://documentation.spryker.com/docs/search-configure-elasticsearch)-->
    *   [Queue](https://documentation.spryker.com/docs/queue)
3. [Congiure stores](https://documentation.spryker.com/docs/multiple-stores#configure-stores) to have one or multiple stores in your online shop.
4. [Schedule tasks](https://documentation.spryker.com/docs/cronjob-scheduling-guide-201907) (Cron jobs).
<!---4. Move to the maintenance mode-->

## 4. Debugging

Before you start developing, set up and get to know your debugging environment. To learn how to configure debugging, see one of the following:
* [Configuring debugging in Docker](https://documentation.spryker.com/docs/configuring-debugging-in-docker)
* [Configuring debugging in Vagrant](https://documentation.spryker.com/docs/configuring-debugging-in-vagrant)

{% info_block infoBox %}
In a production setup, Zed must be covered with a VPN, Basic Auth or IP whitelisting.
{% endinfo_block %}

## 5. Familiarize yourself with the Spryker architecture

As a developer, the Spryker structure is the first thing you need to know to extend the core functionality. To familiarize yourself with the Spryker architecture, different parts of the Client, Shared, Zed and Yves folders and their different layers, see the following articles:

* [Conceptual overview](https://documentation.spryker.com/docs/conceptual-overview): to learn about application layers and code structure.
* [Modules and layers](https://documentation.spryker.com/docs/modules-and-layers): to learn about layers and how various functionality is encapsulated in modules.
* [Programming concepts](https://documentation.spryker.com/docs/programming-concepts): to learn about the Spryker building blocks contained in the application layers.
* [Technology stack](https://documentation.spryker.com/docs/technology-stack): to learn about the technologies we use. 

<!---* Introduction to navigating the folder structure, main concepts and namespacing.
* The project directory
* The OS directories-->

<!---## Step 5: The Development Virtual Machine

Get to know the parts of the Spryker Development Virtual Machine with which we ship the Spryker Commerce OS so that you have a pre-configured and ready to go stack.

* What is the Spryker DevVM (Development Virtual Machine) and why do we need it?
* Main Structure
* Technology Stack: Linux distribution, PHP, Postgres, MySQL, ES, Redis, Queue, Jenkins-->



## Next steps

Select one of the topics below depending on what you want to do next:

* [About Spryker](https://documentation.spryker.com/docs/about-spryker): general information about Spryker, news, and release notes.
* [Features](https://documentation.spryker.com/docs/features): general information about the Spryker features.
* [Glue REST API](https://documentation.spryker.com/docs/glue-rest-api): Spryker Glue REST API overview, reference, and guides.
* [User guides](https://documentation.spryker.com/docs/about-user-guides): step-by-step Backoffice and Storefront user guides.
* [Developer guides](https://documentation.spryker.com/docs/about-developer-guides): technical information and guides for developers. 
* [Technology partners](https://documentation.spryker.com/docs/technology-partner-integration): Spryker technology partners information and integration guides.
* [Migration and integration](https://documentation.spryker.com/docs/about-migration-integration): instructions on how to migrate to newer versions of modules and features.
* [Tutorials](https://documentation.spryker.com/docs/about-tutorials): tutorials and HowTos.

