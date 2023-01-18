---
title: Keeping a project upgradable
description: Tools and guidelines for keeping a project upgradable
template: concept-topic-template
related:
  - title: Upgradability guidelines
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html
  - title: Upgrader tool overview
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgrader-tool-overview.html
  - title: Run the evaluator tool
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html
  - title: Running the upgrader tool
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-upgrader-tool.html
  - title: Define custom prefixes for core entity names
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/define-customs-prefixes-for-core-entity-names.html
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

For more information about the strategies and how they affect upgradability, see [Development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html).


## 2. Follow development guidelines

The best way to resolve compatibility issues is to prevent them. Throughout the development cycle, we recommend following our [Project development guidelines](/docs/scos/dev/guidelines/project-development-guidelines.html).

## 3. Check if project is upgradable using the Evaluator tool

The Evaluator tool is part of Spryker SDK that performs a number of checks based on the static code analysis of our tools.

Evaluator provides informative output about your code. If all the checks are successful, the tool returns zero messages.

Evaluation example without compliance errors:

```bash
Total messages: 0
```

If one or more checks fail, Evaluator returns errors per check.

```bash
...
PrivateApi:MethodIsOverridden Please avoid usage of core method Spryker\Client\Kernel\AbstractFactory::getConfig() in the class Pyz\Client\ExampleProductSalePage\ExampleProductSalePageFactory
------------------------------ ----------------------------------------------------------------------------------------------------
...
Total messages: 1

```    


### Using the evaluator tool

You can use the evaluator tool as follows:

* Analyze project code compliance:

```bash
analyze:php:code-compliance
```

* Generate a report about code compliance issues:

```bash
analyze:php:code-compliance-report
```

For detailed instructions, see [Run the evaluator tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).

## 4. Resolve the evaluation issues

If Evaluator detects compliance issues, resolve them by using the instructions in [Upgradability guidelines](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html).

## 5. Update your project

After passing an evaluation successfully, you can safely take minor and patch updates. If the project is enrolled into PaaS+, the updates will be provided automatically.
