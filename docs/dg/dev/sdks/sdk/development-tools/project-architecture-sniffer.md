---
title: Project Architecture Sniffer
last_updated: Jan 7, 2024
---

[Project Architecture Sniffer](https://github.com/spryker/project-architecture-sniffer) is a powerful tool designed specifically for Spryker projects. It leverages the capabilities of [PHP Mess Detector](https://phpmd.org) to maintain and enforce architectural standards.

Functionality:

* PHPMD rules tailored to the needs of Spryker projects
* [Architecture Sniffer](https://github.com/spryker/architecture-sniffer) rules for enforcing core-specific conventions
* New rules designed to address challenges unique to Spryker projects

This tool ensures that your project's architecture aligns with Spryker's best practices and guidelines.

## Priority levels
- 1: Сritical
- 2: Major
- 3: Medium

For local environments and CI checks, we recommend at least priority `3`.

## Usage

Make sure you include the sniffer as `require-dev` dependency:
```
composer require --dev spryker/project-architecture-sniffer
```

### Running

Find [command line option](https://phpmd.org/documentation/index.html).

You can run the Project Architecture Sniffer from CLI by using:
```
vendor/bin/phpmd src/Pyz/ text vendor/spryker/project-architecture-sniffer/src/ruleset.xml --minimumpriority 3
```

### Baseline

Existing projects and demo-shops may contain rule violations.
The decision to refactor existing violations may be at the discretion of each project individually.
It is recommended to approach this in a differentiated manner.
To integrate rules into the project immediately, generate a [baseline](https://phpmd.org/documentation/#baseline) and move forward, developing only violations free code.
We still recommend to review violations and plan refactoring for the most important ones.
Also make sure to explain developers how to fix violations from the baseline:
1. Fix violation in the code.
2. Remove fixed error from the baseline.
It is also permissible to [suppress rules](https://phpmd.org/documentation/suppress-warnings.html) on a case-by-case basis. Although we strongly recommend to use baseline, since ignoring violations may hide consequential violations as well.

{% info_block infoBox %}

Spryker demo shops may contain violations when analyzed with the Architecture Sniffer, as the tool includes more project specific rules by default.
It is recommended to generate a baseline during the initialization phase of your project development.
This allows you to focus on addressing violations related to project-level integrations.

{% endinfo_block %}
