---
title: Keeping a project upgradable
description: Guidelines for keeping a project upgradable
last_updated: Mar 24, 2023
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html
related:
  - title: Plugins registration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/plugins-registration.html
  - title: Event subscribers registration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
  - title: Modules configuration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html
---

Keeping software up to date is often a potential issue, especially when it comes to transactional business models with sophisticated requirements.

We established development customization guidelines to make sure that you build and always keep your project upgradable while continuing to benefit from Spryker's customization flexibility.

Following these guidelines throughout your development lifecycle is key to an effortless upgrade experience, especially when your business requires highly complex customizations.

By keeping your project compliant with our development guidelines, you make sure that you can take both minor and patch updates without breaking anything. Additionally, if your project is enrolled into [PaaS+](https://spryker.com/en/paas-plus/), being compatible enables you to take updates *automatically*.

The following steps will help you understand what development strategies you can implement, how they affect upgradability, and what you need to do to keep your project upgradable.

## Select a development strategy

A development strategy is the approach you follow when customizing a project. When choosing a strategy, take into account how it will affect the upgradability of your project.

To keep your project upgradable, we recommend using the following development strategies:

* Configuration
* Plug and play
* Project modules

For more information about these strategies and how they affect upgradability, see [Development strategies](/docs/dg/dev/backend-development/extend-spryker/development-strategies.html).

## Follow development guidelines

The best way to resolve compatibility issues is to prevent them from popping up in the first place. Throughout the development cycle, we recommend following our [Project development guidelines](/docs/dg/dev/guidelines/project-development-guidelines.html).

## Follow the upgradability best practices

The Spryker Code Upgrader implements code changes on the project level.

Code changes on the project level can be delivered to a customer's projects through manifest files.
The manifest files cover a list of the ways code changes can be done.

To ensure the successful delivery of Spryker updates, we recommend using the following extension points:

* [Plugins registration](/docs/dg/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/event-subscribers-registration.html)
* [Event subscribers registration](/docs/dg/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/event-subscribers-registration.html)
* [Modules configuration](/docs/dg/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/modules-configuration.html)

{% info_block infoBox "" %}

In case of a project that uses a method to change code that is not covered, any expected changes will be skipped during the update process.

{% endinfo_block %}

## Bypass project upgradability issues

Learn how you can avoid and fix the project [upgradability issues](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).
