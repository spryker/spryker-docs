---
title: Developer Getting Started Guide
originalLink: https://documentation.spryker.com/v4/docs/dev-getting-started
redirect_from:
  - /v4/docs/dev-getting-started
  - /v4/docs/en/dev-getting-started
---

Welcome to the Spryker Commerce OS getting started guide.

We structured this page to be a step-by-step checklist that you will be able to follow through all the stages of working with Spryker.

## Step 1: Install Spryker

Typical Spryker installation process includes installing a proper starting point for your project. The best option to start projects is to use either a [B2B Demo Shop](https://documentation.spryker.com/v4/docs/b2b-suite#b2b-demo-shop) or a [B2C Demo Shop](https://documentation.spryker.com/v4/docs/b2c-suite#b2c-demo-shop). Thr Demo Shop is a set of Spryker Commerce OS components selected for a specific type of business and project. They are fully functional and can be used both for demonstration purposes and as a boilerplate for your project. Even if a shop does not provide all the capabilities you need, you can install the necessary components later.

You can choose from the following options:

* [B2B Demo Shop](https://documentation.spryker.com/v4/docs/b2b-suite#b2b-demo-shop) - a boilerplate for B2B commerce projects;
* [B2C Demo Shop](https://documentation.spryker.com/v4/docs/b2c-suite#b2c-demo-shop) - a starting point for B2C implementations;
* Separate [Features](https://documentation.spryker.com/v4/docs/features) and [Modules](https://documentation.spryker.com/v20/docs) - you can also add separate features and modules to the both Demo Shops to expand their functionality.

### Spryker in Docker
We recommend starting with a docker-sdk environment. This option includes Docker and related tools to build images and run containers that match your requirements. 

It features a lightweight environment that is closer to production implementation. 

To start developing your Spryker in Docker, see [Getting Started with Docker](/docs/scos/dev/developer-guides/202001.0/installation/spryker-in-docker/getting-started).

### Using the Development Virtual Machine

Spryker Commerce OS comes with a Virtual Machine that has all pre-requisites required to run Spryker. Also, it provides a full-featured development environment that will help you in customizing Spryker to your project needs. The Development VM, or DevVM, is based on VirtualBox and Vagrant, and can be used to install Spryker on any Operating System. 

Choose an Installation Guide that suits your needs best:

|          Operating system               | B2B Shop                                                     | B2C Shop                                                     
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ 
| DevVM on Linux / Mac OS | [B2B Demo Shop Installation: Mac OS or Linux, with Development Virtual Machine](/docs/scos/dev/developer-guides/202001.0/installation/b2b-demo-shop-installation-guides/installation-gu) | [B2C Demo Shop Installation: Mac OS or Linux, with Development Virtual Machine](https://documentation.spryker.com/v4/docs/installation-guide-b2c) 
| DevVM on Windows        | [B2B Demo Shop Installation: Windows, with Development Virtual Machine](/docs/scos/dev/developer-guides/202001.0/installation/b2b-demo-shop-installation-guides/b2b-demo-shop-i) | [B2C Demo Shop Installation: Windows, with Development Virtual Machine](/docs/scos/dev/developer-guides/202001.0/installation/b2c-demo-shop-installation-guides/b2c-demo-shop-i) 

### Independent Installation, Without the Development Virtual Machine
Alternatively, you can install Spryker on an operating system that fulfills Spryker [System Requirements](/docs/scos/dev/developer-guides/202001.0/installation/system-requirem) without the use of the virtual machine or docker images. 

Chose an Installation Guide that suites your needs best:

| B2B Shop | B2C Shop
| --- | --- | 
| [B2B Demo Shop Installation: Without Development Virtual Machine](/docs/scos/dev/developer-guides/202001.0/installation/b2b-demo-shop-installation-guides/b2b-demo-shop-i) | [B2C Demo Shop Installation: Without Development Virtual Machine](/docs/scos/dev/developer-guides/202001.0/installation/b2c-demo-shop-installation-guides/b2c-demo-shop-i)

{% info_block warningBox %}
After installing, make sure to have a look at [Post-Installation Steps and Additional Info](/docs/scos/dev/developer-guides/202001.0/installation/post-installati
{% endinfo_block %} for tips on fine-tuning Spryker.)
## Step 2: Manage your Modules

Once you have completed the installation, you can start managing the modules. A module is a single functional unit, that has well-defined dependencies, and can be used and updated independently. 
{% info_block infoBox %}

See [Spryker Release Process](/docs/scos/dev/about-spryker/202001.0/spryker-release) to learn about our module and feature release process, and to define your strategy as to taking the Spryker updates. 

{% endinfo_block %}

We use [Composer](/docs/scos/dev/developer-guides/202001.0/installation/composer) to install and manage module dependencies. 
Execute the following Composer commands depending on what you want to do:

* To install dependencies that you listed in the `composer.json` file of the project: `composer install`.
*  To update all the modules for your project: `composer update "spryker/*"`. 
{% info_block infoBox %}

We recommend running this command weekly to assert you have the latest fixes. We also recommend [subscribing](https://now.spryker.com/release-notes) to our release notes newsletter to stay up-to-date with the improvements.

{% endinfo_block %}
*  To update a particular module: `composer update "spryker/module-name"`. You can easily keep track of new module versions using [composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) as add-on for your local composer tool.
*  To add a new module to your project: `composer require "spryker/module-name"`

See [Semantic Versioning: Major vs. Minor vs. Patch Release](/docs/scos/dev/developer-guides/202001.0/architecture-guide/module-api/major-minor-pat) to learn about the module versioning approach used in Spryker.


## Step 3: Configure the Environment

Your next step will be the configuration of the Spryker Commerce OS installation and its customization for your environment. As part of this process, do the following:

1. Define how to manage and configure the settings in the configuration files. See [Configuration Management](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/configuration-m) for details on how to do that.
2. Configure your environment: 
    *   [Database](/docs/scos/dev/developer-guides/202001.0/installation/configure-datab)
    *   [Redis](https://documentation.spryker.com/v4/docs/redis-configruation-201903)
    *   [ElasticSearch](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-interaction/search/search-configur)
    *   [Queue](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/queue/queue)
3. [Congiure stores](https://documentation.spryker.com/v4/docs/multiple-stores#configure-stores) to have one or multiple stores in your online shop.
4. [Schedule tasks](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-enrichment/cronjobs/cronjob-schedul) (Cron jobs).
<!---4. Move to the maintenance mode-->

## Step 4: Debugging

Before taking the next step into working with the code, set up and get to know your debugging environment. See [Debugging Setup](/docs/scos/dev/developer-guides/202001.0/installation/debugging/debugging-setup) for the step-by-step instructions on how to set up and configure debugging in your development environment.

{% info_block infoBox %}
In a production setup, Zed must be covered with VPN, Basic Auth or IP whitelisting.
{% endinfo_block %}

## Step 5: Familiarize Yourself with the Spryker Architecture

As a developer, the Spryker structure is the first thing you need to know to extend the core functionality. To familiarize yourself with the Spryker architecture, different parts of the Client, Shared, Zed and Yves folders and their different layers, see the following articles:

* [Commerce OS and Frontend Apps](/docs/scos/dev/developer-guides/202001.0/architecture-guide/commerce-os-and): to find out how data flows are separated in Spryker Commerce OS.
* [Conceptual Overview](/docs/scos/dev/developer-guides/202001.0/architecture-guide/concept-overvie): to learn about the Spryker application layers and code structure.
* [Modularity and Shop Suite](/docs/scos/dev/developer-guides/202001.0/architecture-guide/modularity-and-): to deep dive into the details of the application layers and learn how various functionality is encapsulated in modules.
* [Programming Concepts](/docs/scos/dev/developer-guides/202001.0/architecture-guide/programming-con): to learn more about the Spryker building blocks contained in the application layers.
* [Technology Stack](/docs/scos/dev/developer-guides/202001.0/architecture-guide/technology-stac): to learn about the technologies we use. 

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

* [About Spryker](https://documentation.spryker.com/v4/docs/demoshops): general information about Spryker, news, and release notes.
* [Features](https://documentation.spryker.com/v4/docs/features): general information about the Spryker features.
* [Glue REST API](/docs/scos/dev/glue-api/202001.0/glue-rest-api): Spryker Glue REST API overview, reference, and features.
* [User Guides](/docs/scos/dev/user-guides/202001.0/about-user-guid): step-by-step Backoffice and Storefront user guides.
* [Developer Guides](/docs/scos/dev/developer-guides/202001.0/about-developer): technical information and guides for developers. 
* [Technology Partners](https://documentation.spryker.com/v4/docs/partner-integration): Spryker technology partners information and integration guides.
* [Migration and Integration Guides](/docs/scos/dev/migration-and-integration/202001.0/about-migration): instructions on how to migrate to newer versions of modules or features.
* [Tutorials](/docs/scos/dev/tutorials/202001.0/about-tutorials): tutorials and HowTos.

