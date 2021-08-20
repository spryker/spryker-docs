---
title: Developer Getting Started Guide
description: This is a step-by-step checklist that you can follow  through all the stages of working with Spryker.
originalLink: https://documentation.spryker.com/v5/docs/dev-getting-started
originalArticleId: e74e1446-0ea9-4423-92e2-624551df2b06
redirect_from:
  - /v5/docs/dev-getting-started
  - /v5/docs/en/dev-getting-started
---

Welcome to the Spryker Commerce OS getting started guide.

We structured this page to be a step-by-step checklist that you will be able to follow through all the stages of working with Spryker.

## Step 1: Install Spryker

Typical Spryker installation process includes installing a proper starting point for your project. The best option to start projects is to use Demo Shops. A Demo Shop is a set of Spryker Commerce OS components selected for a specific type of business and project. They are fully functional and can be used both for demonstration purposes and as a boilerplate for your project. Even if a shop does not provide all the capabilities you need, you can install the necessary components later.

You can choose from the following options:

* [B2B Demo Shop](/docs/scos/user/intro-to-spryker/b2b-suite.html) - a boilerplate for B2B commerce projects;
* [B2C Demo Shop](/docs/scos/user/intro-to-spryker/b2c-suite.html) - a starting point for B2C implementations;
* Separate [Features](https://documentation.spryker.com/v5/docs/overview-of-the-feature-guides) and modules - you can also add separate features and modules to the both Demo Shops to expand their functionality.

### Spryker in Docker
We recommend starting with a docker-sdk environment. This option includes Docker and related tools to build images and run containers that match your requirements. 

It features a lightweight environment that is closer to production implementation. 

To start developing your Spryker in Docker, see [Getting Started with Docker](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-docker/getting-started-with-docker.html).

### Using the Development Virtual Machine

Spryker Commerce OS comes with a Virtual Machine that has all pre-requisites required to run Spryker. Also, it provides a full-featured development environment that will help you in customizing Spryker to your project needs. The Development VM, or DevVM, is based on VirtualBox and Vagrant, and can be used to install Spryker on any Operating System. 

Choose an Installation Guide that suits your needs best:


| Operating system | B2B Shop or B2C Shop |
| --- | --- |
| DevVM on Linux / Mac OS | [B2B or B2C Demo Shop installation: Mac OS or Linux, with Development Virtual Machine](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-vagrant/b2b-or-b2c-demo-shop-installation-mac-os-or-linux-with-development-virtual-machine.html) |
| DevVM on Windows | [B2B or B2C Demo Shop installation: Windows, with Development Virtual Machine](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-vagrant/b2b-or-b2c-demo-shop-installation-windows-with-development-virtual-machine.html) |

### Independent Installation, without the Development Virtual Machine
Alternatively, you can install Spryker on an operating system that fulfills Spryker [System Requirements](/docs/scos/dev/developer-guides/202005.0/installation/system-requirements.html) without the use of the virtual machine or docker images. See [B2B or B2C Demo Shop installation: without Development Virtual Machine](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-vagrant/b2b-or-b2c-demo-shop-installation-without-development-virtual-machine.html) for details.

{% info_block warningBox %}
After installing, make sure to have a look at [Post-Installation Steps and Additional Info](/docs/scos/dev/developer-guides/202005.0/installation/post-installation-steps-and-additional-info.html
{% endinfo_block %} for tips on fine-tuning Spryker.)
## Step 2: Manage your modules

Once you have completed the installation, you can start managing the modules. A module is a single functional unit, that has well-defined dependencies, and can be used and updated independently. 
{% info_block infoBox %}

See [Spryker Release Process](/docs/scos/user/intro-to-spryker/{{site.version}}/spryker-release-process.html) to learn about our module and feature release process, and to define your strategy as to taking the Spryker updates. 

{% endinfo_block %}

We use [Composer](/docs/scos/dev/developer-guides/202005.0/installation/composer.html) to install and manage module dependencies. 
Execute the following Composer commands depending on what you want to do:

* To install dependencies that you listed in the `composer.json` file of the project: `composer install`.
*  To update all the modules for your project: `composer update "spryker/*"`. 
{% info_block infoBox %}

We recommend running this command weekly to assert you have the latest fixes. We also recommend [subscribing](https://now.spryker.com/release-notes) to our release notes newsletter to stay up-to-date with the improvements.

{% endinfo_block %}
*  To update a particular module: `composer update "spryker/module-name"`. You can easily keep track of new module versions using [composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) as add-on for your local composer tool.
*  To add a new module to your project: `composer require "spryker/module-name"`

See [Semantic Versioning: Major vs. Minor vs. Patch Release](/docs/scos/dev/developer-guides/202005.0/architecture-guide/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html) to learn about the module versioning approach used in Spryker.


## Step 3: Configure the environment

Your next step will be the configuration of the Spryker Commerce OS installation and its customization for your environment. As part of this process, do the following:

1. Define how to manage and configure the settings in the configuration files. See [Configuration Management](/docs/scos/dev/developer-guides/202005.0/development-guide/back-end/data-manipulation/configuration-management.html) for details on how to do that.
2. Configure your environment: 
    *   [Database](/docs/scos/dev/developer-guides/202005.0/installation/configuring-the-database-server.html)
    *   [Redis](/docs/scos/dev/developer-guides/202005.0/installation/redis-configuration.html)
    <!---*   [ElasticSearch](/docs/scos/dev/developer-guides/202005.0/development-guide/back-end/data-manipulation/data-interaction/search/configuring-elasticsearch.html)-->
    *   [Queue](/docs/scos/dev/developer-guides/202005.0/development-guide/back-end/data-manipulation/queue/queue.html)
3. [Congiure stores](/docs/scos/dev/features/202005.0/internationalization/multiple-stores.html#configure-stores) to have one or multiple stores in your online shop.
4. [Schedule tasks](/docs/scos/dev/developer-guides/202005.0/development-guide/back-end/data-manipulation/data-enrichment/cronjobs/cronjob-scheduling.html) (Cron jobs).
<!---4. Move to the maintenance mode-->

## Step 4: Debugging

Before taking the next step into working with the code, set up and get to know your debugging environment. See [Debugging Setup](/docs/scos/dev/developer-guides/202005.0/installation/spryker-in-vagrant/debugger/debugger-setup-in-vagrant.html) for the step-by-step instructions on how to set up and configure debugging in your development environment.

{% info_block infoBox %}
In a production setup, Zed must be covered with VPN, Basic Auth or IP whitelisting.
{% endinfo_block %}

## Step 5: Familiarize yourself with the Spryker architecture

As a developer, the Spryker structure is the first thing you need to know to extend the core functionality. To familiarize yourself with the Spryker architecture, different parts of the Client, Shared, Zed and Yves folders and their different layers, see the following articles:

* [Conceptual Overview](/docs/scos/dev/developer-guides/202005.0/architecture-guide/conceptual-overview.html): to learn about the Spryker application layers and code structure.
* [Modules and layers](https://documentation.spryker.com/v5/docs/modules-and-layers): to deep dive into the details of the application layers and learn how various functionality is encapsulated in modules.
* [Programming Concepts](/docs/scos/dev/developer-guides/202005.0/architecture-guide/programming-concepts.html): to learn more about the Spryker building blocks contained in the application layers.
* [Technology Stack](/docs/scos/dev/developer-guides/202005.0/architecture-guide/technology-stack.html): to learn about the technologies we use. 

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

* [About Spryker](/docs/scos/user/intro-to-spryker/{{site.version}}/about-spryker.html): general information about Spryker, news, and release notes.
* [Features](https://documentation.spryker.com/v5/docs/overview-of-the-feature-guides): general information about the Spryker features.
* [Glue REST API](/docs/scos/dev/glue-api-guides/202005.0/glue-rest-api.html): Spryker Glue REST API overview, reference, and features.
* [User Guides](/docs/scos/user/user-guides/202005.0/about-user-guides.html): step-by-step Backoffice and Storefront user guides.
* [Developer Guides](/docs/scos/dev/developer-guides/202005.0/about-the-developer-guides.html): technical information and guides for developers. 
* [Technology Partners](/docs/scos/dev/technology-partners/202005.0/technology-partner-integration.html): Spryker technology partners information and integration guides.
* [Migration and Integration Guides](/docs/scos/dev/migration-and-integration/202005.0/about-migration-and-integration-guides.html): instructions on how to migrate to newer versions of modules or features.
* [Tutorials](/docs/scos/dev/tutorials/202005.0/about-tutorials.html): tutorials and HowTos.

