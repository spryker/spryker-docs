---
title: Developer Getting Started Guide
originalLink: https://documentation.spryker.com/v1/docs/dev-getting-started
redirect_from:
  - /v1/docs/dev-getting-started
  - /v1/docs/en/dev-getting-started
---

Welcome to the Spryker Commerce OS getting started guide.

We structured this page to be a step-by-step checklist that you will be able to follow you through all the stages of working with Spryker.

## Step 1: Install Spryker

Typical Spryker installation include installing a proper starting point for your project. The best option to start projects is to use Demo Shops. A Demo Shop is a set of Spryker Commerce OS components selected for a specific type of business and project. They are fully functional and can be used both for demonstration purposes, and as a boilerplate for your project. Even if a shop does not provide all the capabilities you need, you can install the necessary components later.

You can chose from the following options:

* **B2B Demo Shop** - a boilerplate for B2B commerce projects;
* **B2C Demo Shop** - a starting point for B2C implementations;
* **Separate Modules** - you can also add separate modules/features to the both Demo Shops to expand their functionality.
* **Legacy Demoshop** - an old version of Spryker Demo Shop for legacy projects. Use this option only if your project was started before the [November release](http://documentation.spryker.com/v1/docs/release-notes-2018-11-0), and you did not [take steps to make it compatible](/docs/scos/dev/migration-and-integration/201811.0/updating-the-legacy-demoshop-with-scos/about-updating) with the new Spryker architecture.

{% info_block infoBox %}
For more information, see [Demo Shops](/docs/scos/dev/about-spryker/201811.0/demoshops
{% endinfo_block %}.)

**Using the Development Virtual Machine**

Spryker Commerce OS comes with a Virtual Machine that has all pre-requsites required to run Spryker. Also, it provides a full-featured development environment that will help you in customizing Spryker to your project needs. The Development VM, or DevVM for short, is based on VirtualBox and Vagrant, and can be used to install Spryker on any Operating System. This option is recommended for development scenarios.

Chose an Installation Guide that suites your needs best:

|          Operating system               | B2B Shop                                                     | B2C Shop                                                     |  Legacy Demoshop                                              |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| DevVM on Linux / Mac OS | [B2B Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-b2b#mac-os-or-linux--with-development-virtual-machine) | [B2C Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-b2c#mac-os-or-linux--with-development-virtual-machine) | [Legacy Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-legacy-demoshop#mac-os-or-linux--with-development-virtual-machine) |
| DevVM on Windows        | [B2B Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-b2b#windows--with-development-virtual-machine) | [B2C Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-b2c#windows--with-development-virtual-machine) | [Legacy Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-legacy-demoshop#windows--with-development-virtual-machine) |

**Independent Installation**
Alternatively, you can install Spryker on an operating system that fulfills Spryker [System Requirements](/docs/scos/dev/developer-guides/201811.0/installation/system-requirem) without the use of a virtual machine. This option is recommended for production implementations.

Chose an Installation Guide that suites your needs best:

| B2B Shop | B2C Shop | Legacy Demoshop |
| --- | --- | --- | --- |
| [B2B Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-b2b#without-development-virtual-machine) | [B2C Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-b2c#without-development-virtual-machine) | [Legacy Demoshop Installation Guide](https://documentation.spryker.com/v1/docs/installation-guide-legacy-demoshop#without-development-virtual-machine) |

**Spryker in Docker**
Finally,  you can start with a docker-sdk environment. This option includes Docker and related tools to build images and run containers which match your requirements. 

It is recommended for development purposes. However, unlike the DevVM solution, it features a more lightweight environment which is closer to a production implementation. 

To start developing your Spryker in Docker, proceed to [Getting Started with Docker](https://documentation.spryker.com/v1/docs/getting-started-with-docker-201907).

{% info_block warningBox %}
After installing, make sure to have a look at [Post-Installation Steps and Additional Info](/docs/scos/dev/developer-guides/201811.0/installation/post-installati
{% endinfo_block %} for tips on fine-tuning Spryker.)

## Step 2: Manage your Modules

Once you have completed the installation you should familiarize yourself with the modules.

* Introduction:

  Spryker Commerce OS is developed based on a modular concept. There are currently over 350 modules. A module is a single functional unit, that has well-defined dependencies, and can be used and updated independently. Spryker Commerce OS versioning relies on two main concepts:

  * Atomic Releases

    We gradually introduce changes, and release updates only for modified modules. Therefore, You don’t need to invest time in updating all the modules present in your project every time there is an update. This establishes painless update process that allows to save more time on development and spend less time on checking the whole system just because of a small update. Every module has its own repository and dependencies declared in a `composer.json` file, so you can select a specific module version and update it separately.

  * Semantic Versioning

    We have a clear set of rules and requirements that dictate how version numbers are assigned and incremented. We assign the module versions in the format of X.Y.Z (Major.Minor.Patch). Under this scheme, version numbers and the way they change convey a meaning that represents what in the underlying code has been modified from one version to the next. Additional information and instructions about modules, atomic releases and semantic versioning are described in Atomic Releases.

* How to Manage your Modules:

  We use [Composer](/docs/scos/dev/developer-guides/201811.0/installation/composer) to install and manage module dependencies.

* * Running `composer install` command installs all dependencies that you listed in the `composer.json` file of the project.

  * Execute `composer update "spryker/*"` to update all the modules for your project. We recommend running this command weekly to assert you have the latest fixes.

    We also recommend [subscribing](https://now.spryker.com/release-notes) to our release notes newsletter to stay up-to-date with the improvements.

  * If you want to update a particular module - run `composer update "spryker/module-name"`

    You can easily keep track of new module versions using [composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) as add-on for your local composer tool.

  * In order to add a new module to your project execute `composer require "spryker/module-name"`

    To replace the module dependencies, follow the steps described in the guide.

## Step 3: Configuration Tasks

In this step, we will cover all the different tasks you need to perform to hook up and configure your Spryker Commerce OS installation and customize it for your environment.

* Spryker config: 
  What is Spryker config, where is it located and how do we use it?
* Configuring your environment: 
  Database, Redis, ElasticSearch and Queue.
* Store Configuration
* Scheduling Tasks (Cron Jobs)
* Moving to Maintenance Mode

## Step 4: Familiarizing Yourself with the Directory Structure

As a developer, the Spryker directory structure is the first thing that you need to know in order to extend core functionality. In this step we will help you familiarize yourself with the different parts of the directory the Client, Shared, Zed and Yves folders and their different layers.

* Introduction to navigating the folder structure, main concepts and namespacing.
* The project directory
* The OS directories

## Step 5: The Development Virtual Machine

Get to know the parts of the Spryker Development Virtual Machine with which we ship the Spryker Commerce OS so that you have a pre-configured and ready to go stack.

* What is the Spryker DevVM (Development Virtual Machine) and why do we need it?
* Main Structure
* Technology Stack: Linux distribution, PHP, Postgres, MySQL, ES, Redis, Queue, Jenkins

## Step 6: Debugging

Before taking the next step into working with the code, setup and get to know your debugging environment.

* What is the debugging environment?
* Debugging with PHPStorm
* Setting up XDEBUG

{% info_block infoBox %}
In a production setup, Zed must be covered with VPN, Basic Auth or IP whitelisting.
{% endinfo_block %}

## Where to go from here?

To better understand the Spryker Commerce OS, the next step is to visit our Architecture Overview. If you are familiar with our architecture, try on of these other resources:

* The [development guide](https://documentation.spryker.com/v1/docs/developer-guide) where you will find API documentation and instructions describing how to extend Spryker Capabilities.
* The [module guide](https://documentation.spryker.com/v20/docs) for an overview of each module and previous versions
* [Tooling guide](https://documentation.spryker.com/v1/docs/about-resources), how to test code quality, monitoring, logging, deployment and hosting
* [Ecosystem Guide](https://documentation.spryker.com/v1/docs/partner-integration) for information about our third party technology partners and how to integrate with them.
* [Advanced development concepts](https://documentation.spryker.com/v1/docs/architecture-concepts) - a deeper look into the Spryker Commerce OS architecture, naming and design concepts
* Check out our [how-tos](/docs/scos/dev/tutorials/201811.0/howtos/how-tos) and [tutorials](/docs/scos/dev/tutorials/201811.0/about-tutorials)

## Navigating the Documentation
To navigate through the Documentation content, click on a respective section on top and the opened left-hand table of contents, or use the search.
