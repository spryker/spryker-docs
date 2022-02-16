---
title: Upgradability services
description: Overview of upgradability services
last_updated: Nov 25, 2021
template: concept-topic-template
---


Keeping enterprise software up to date is a known hurdle. Especially when it comes to sophisticated transactional business models with individualization and customizations. Upgrades of big systems require a high investment of time, resources, and money that projects would rather spend for innovation. At the same time, little or no upgrades reduce access to security and improvements patches, as well as new features.

Upgradability services are designed to lower the cost of performing regular upgrades, helping your business keep up with Spryker’s latest version.

PaaS+ provides a new CI service for automating upgrades and code quality reviews, while still providing full control and freedom to customers on what to bring to their platform.

## Which customers can use the upgradability services?

## What is the CI system?

### What are the main benefits of the tool?

### How does a customer start working with the tool?

### What access does a customer have? Can multiple customer representatives work with the tool?

### What pipelines are implemented in the tool?

Short description of the implemented pipelines(evaluation and upgrader) and what they do.

### What configuration options are available to customers?


## evaluator tool

The evaluator tool is a utility that performs automated quality checks against our own and industry standards.

The benefits of using the evaluator tool for your code are as follows:

- Reduced upgrade efforts
- Clean and consistent code
- Fewer bugs

### How the evaluator tool works

The evaluator tool checks code against a set of rules and returns an assessment result. If the code didn’t pass a rule, the tool returns the information you can use to improve your code.

The evaluator tool checks the following:

- Compliance with Spryker coding and architecture standards
- Compliance with industry standards, like [Pear](https://pear.php.net/manual/en/standards.php) or [PSR-12](https://www.php-fig.org/psr/psr-12/)
- Code flaws and bugs

To learn more about the evaluator tool, see the following documents:

- [evaluator tool overview](/docs/scos/dev/upgradability-services/evaluator-tool-overview.html)
- [Running the evaluator tool](/docs/scos/dev/upgradability-services/running-the-evaluator-tool.html)



## upgrader tool

The upgrader tool is a utility that keeps a Spryker project up to date with our improvements and bug fixes.  

The benefits of using the upgrader tool for your project are as follows:

- Reduced upgrade efforts
- Minimized security risks



### How the upgrader tool works

The upgrader tool checks your project’s code against our latest released code. If something needs to be updated, the upgrader automatically makes the changes and creates a PR in your repository, which you can review and merge.

To learn more about the evaluator tool, see the following documents:

* [upgrader tool overview](/docs/scos/dev/upgradability-services/upgrader-tool-overview.html)
* [Running the upgrader tool](/docs/scos/dev/upgradability-services/running-the-upgrader-tool.html)



## How are the upgradability services influenced by project customization?

Links to /docs/scos/dev/upgradability-services/customization-tiers.md
