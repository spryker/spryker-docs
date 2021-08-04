---
title: Developer Getting Started Guide
originalLink: https://documentation.spryker.com/v5/docs/dev-getting-started
redirect_from:
  - /v5/docs/dev-getting-started
  - /v5/docs/en/dev-getting-started
---

Welcome to the Spryker Commerce OS getting started guide.

We structured this page to be a step-by-step checklist that you will be able to follow through all the stages of working with Spryker.

## Step 1: Install Spryker

Typical Spryker installation process includes installing a proper starting point for your project. The best option to start projects is to use Demo Shops. A Demo Shop is a set of Spryker Commerce OS components selected for a specific type of business and project. They are fully functional and can be used both for demonstration purposes and as a boilerplate for your project. Even if a shop does not provide all the capabilities you need, you can install the necessary components later.

You can choose from the following options:

* [B2B Demo Shop](https://documentation.spryker.com/docs/b2b-suite) - a boilerplate for B2B commerce projects;
* [B2C Demo Shop](https://documentation.spryker.com/docs/b2c-suite) - a starting point for B2C implementations;
* Separate [Features](https://documentation.spryker.com/docs/features) and modules - you can also add separate features and modules to the both Demo Shops to expand their functionality.

### Spryker in Docker
We recommend starting with a docker-sdk environment. This option includes Docker and related tools to build images and run containers that match your requirements. 

It features a lightweight environment that is closer to production implementation. 

To start developing your Spryker in Docker, see [Getting Started with Docker](https://documentation.spryker.com/docs/getting-started-with-docker).

### Using the Development Virtual Machine

Spryker Commerce OS comes with a Virtual Machine that has all pre-requisites required to run Spryker. Also, it provides a full-featured development environment that will help you in customizing Spryker to your project needs. The Development VM, or DevVM, is based on VirtualBox and Vagrant, and can be used to install Spryker on any Operating System. 

Choose an Installation Guide that suits your needs best:


| Operating system | B2B Shop or B2C Shop |
| --- | --- |
| DevVM on Linux / Mac OS | [B2B or B2C Demo Shop installation: Mac OS or Linux, with Development Virtual Machine](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm) |
| DevVM on Windows | [B2B or B2C Demo Shop installation: Windows, with Development Virtual Machine](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine) |

### Independent Installation, without the Development Virtual Machine
Alternatively, you can install Spryker on an operating system that fulfills Spryker [System Requirements](https://documentation.spryker.com/docs/system-requirements) without the use of the virtual machine or docker images. See [B2B or B2C Demo Shop installation: without Development Virtual Machine](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-without-development-virtual-machine) for details.

{% info_block warningBox %}
After installing, make sure to have a look at [Post-Installation Steps and Additional Info](https://documentation.spryker.com/docs/post-installation-steps-and-additional-info
{% endinfo_block %} for tips on fine-tuning Spryker.)
## Step 2: Manage your modules

Once you have completed the installation, you can start managing the modules. A module is a single functional unit, that has well-defined dependencies, and can be used and updated independently. 
{% info_block infoBox %}

See [Spryker Release Process](https://documentation.spryker.com/docs/spryker-release-process) to learn about our module and feature release process, and to define your strategy as to taking the Spryker updates. 

{% endinfo_block %}

We use [Composer](https://documentation.spryker.com/docs/composer) to install and manage module dependencies. 
Execute the following Composer commands depending on what you want to do:

* To install dependencies that you listed in the `composer.json` file of the project: `composer install`.
*  To update all the modules for your project: `composer update "spryker/*"`. 
{% info_block infoBox %}

We recommend running this command weekly to assert you have the latest fixes. We also recommend [subscribing](https://now.spryker.com/release-notes) to our release notes newsletter to stay up-to-date with the improvements.

{% endinfo_block %}
*  To update a particular module: `composer update "spryker/module-name"`. You can easily keep track of new module versions using [composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) as add-on for your local composer tool.
*  To add a new module to your project: `composer require "spryker/module-name"`

See [Semantic Versioning: Major vs. Minor vs. Patch Release](https://documentation.spryker.com/docs/major-minor-patch-release) to learn about the module versioning approach used in Spryker.


## Step 3: Configure the environment

Your next step will be the configuration of the Spryker Commerce OS installation and its customization for your environment. As part of this process, do the following:

1. Define how to manage and configure the settings in the configuration files. See [Configuration Management](https://documentation.spryker.com/docs/configuration-management) for details on how to do that.
2. Configure your environment: 
    *   [Database](https://documentation.spryker.com/docs/configure-database-server)
    *   [Redis](https://documentation.spryker.com/docs/redis-configruation-201903)
    <!---*   [ElasticSearch](https://documentation.spryker.com/docs/search-configure-elasticsearch)-->
    *   [Queue](https://documentation.spryker.com/docs/queue)
3. [Congiure stores](https://documentation.spryker.com/docs/multiple-stores#configure-stores) to have one or multiple stores in your online shop.
4. [Schedule tasks](https://documentation.spryker.com/docs/cronjob-scheduling-guide-201907) (Cron jobs).
<!---4. Move to the maintenance mode-->

## Step 4: Debugging

Before taking the next step into working with the code, set up and get to know your debugging environment. See [Debugging Setup](https://documentation.spryker.com/docs/debugging-setup) for the step-by-step instructions on how to set up and configure debugging in your development environment.

{% info_block infoBox %}
In a production setup, Zed must be covered with VPN, Basic Auth or IP whitelisting.
{% endinfo_block %}

## Step 5: Familiarize yourself with the Spryker architecture

As a developer, the Spryker structure is the first thing you need to know to extend the core functionality. To familiarize yourself with the Spryker architecture, different parts of the Client, Shared, Zed and Yves folders and their different layers, see the following articles:

* [Conceptual Overview](https://documentation.spryker.com/docs/concept-overview): to learn about the Spryker application layers and code structure.
* [Modules and layers](https://documentation.spryker.com/docs/modules-and-layers): to deep dive into the details of the application layers and learn how various functionality is encapsulated in modules.
* [Programming Concepts](https://documentation.spryker.com/docs/programming-concepts): to learn more about the Spryker building blocks contained in the application layers.
* [Technology Stack](https://documentation.spryker.com/docs/technology-stack): to learn about the technologies we use. 

<!---* Introduction to navigating the folder structure, main concepts and namespacing.
* The project directory
* The OS directories-->

<!---## Step 5: The Development Virtual Machine

Get to know the parts of the Spryker Development Virtual Machine with which we ship the Spryker Commerce OS so that you have a pre-configured and ready to go stack.

* What is the Spryker DevVM (Development Virtual Machine) and why do we need it?
* Main Structure
* Technology Stack: Linux distribution, PHP, Postgres, MySQL, ES, Redis, Queue, Jenkins-->



## Where to go from here?

Select one of the topics below depending on what you want to do next:

* [About Spryker](https://documentation.spryker.com/docs/about-spryker): general information about Spryker, news, and release notes.
* [Features](https://documentation.spryker.com/docs/features): general information about the Spryker features.
* [Glue REST API](https://documentation.spryker.com/docs/glue-rest-api): Spryker Glue REST API overview, reference, and features.
* [User Guides](https://documentation.spryker.com/docs/about-user-guides): step-by-step Backoffice and Storefront user guides.
* [Developer Guides](https://documentation.spryker.com/docs/about-developer-guides): technical information and guides for developers. 
* [Technology Partners](https://documentation.spryker.com/docs/partner-integration): Spryker technology partners information and integration guides.
* [Migration and Integration Guides](https://documentation.spryker.com/docs/about-migration-integration): instructions on how to migrate to newer versions of modules or features.
* [Tutorials](https://documentation.spryker.com/docs/about-tutorials): tutorials and HowTos.

