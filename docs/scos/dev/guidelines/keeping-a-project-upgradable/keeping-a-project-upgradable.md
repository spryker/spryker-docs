---
title: Keeping a project upgradable
description: Guidelines for keeping a project upgradable
last_updated: Mar 24, 2023
template: concept-topic-template
related:
  - title: Upgrader tool overview
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgrader-tool-overview.html
  - title: Run the Upgrader tool
    link:/docs/scos/dev/guidelines/keeping-a-project-upgradable/running-the-upgrader-tool.html
  - title: Plugins registration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/plugin-registration.html
  - title: Event subscribers registration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
  - title: Modules configuration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html
---

Keeping software up to date is a known concern, especially when it comes to transactional business models with sophisticated requirements.

We established development customization guidelines to make sure that you build and always keep your project upgradable while continuing to benefit from Spryker customization flexibility.

Following these guidelines throughout your development lifecycle is key to an effortless upgrade experience, even when your business requires highly complex customizations.

By keeping your project compliant with our development guidelines, you make sure that you can take minor and patch updates without breaking anything. Additionally, if your project is enrolled into [PaaS+](https://spryker.com/en/paas-plus/), being compatible enables you to take the updates *automatically*.

The following steps will help you understand what development strategies you can implement  how they affect upgradability, and what you need to do to keep your project upgradable.

## 1. Select a development strategy

A development strategy is the approach you follow when customizing a project. When choosing a strategy, take into account how it will affect the upgradability of your project.

To keep your project upgradable, we recommend using the following development strategies:

* Configuration
* Plug and play
* Project modules

For more information about the strategies and how they affect upgradability, see [Development strategies](/docs/scos/dev/back-end-development/extend-spryker/development-strategies.html).

## 2. Follow development guidelines

The best way to resolve compatibility issues is to prevent them. Throughout the development cycle, we recommend following our [Project development guidelines](/docs/scos/dev/guidelines/project-development-guidelines.html).

## 3. Follow the upgradability best practices

The Spryker Code Upgrader implements code changes on the project level.

Code changes on the project level can be delivered to a customer's projects through manifest files.
The manifest files cover a list of the ways code changes can be done.

To ensure the successful delivery of Spryker updates, we recommend using the next extension points:

* [Plugins registration](docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html)
* [Event subscribers registration](docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html)
* [Modules configuration](docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html)

{% info_block infoBox "" %}

In case of a project using a method to change code that is not covered, expected changes will be skipped during the update process.

{% endinfo_block %}


