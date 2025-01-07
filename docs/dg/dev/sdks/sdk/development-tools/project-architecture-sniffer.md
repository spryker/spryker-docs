---
title: Project Architecture Sniffer
last_updated: Jan 7, 2024
---

The [Project Architecture Sniffer](https://github.com/spryker/project-architecture-sniffer) is a powerful tool designed specifically for Spryker projects, leveraging the capabilities of the [PHP Mess Detector](https://phpmd.org) to maintain and enforce architectural standards.

The tool includes:

* Adapted PHPMD rules tailored to the needs of Spryker projects.
* [Architecture Sniffer](https://github.com/spryker/architecture-sniffer) rules for enforcing core-specific conventions.
* Newly designed rules created specifically to address challenges unique to Spryker projects.

We recommend using this tool to ensure that your project's architecture aligns with Spryker's best practices and guidelines.

## Priority Levels
- `1`: Сritical
- `2`: Major
- `3`: Medium

We recommend minimum priority `3` by default for local and CI checks.

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
To integrate rules into the project immediately, there recommended to generate a [baseline](https://phpmd.org/documentation/#baseline) and move forward.
It is also permissible to [suppress rules](https://phpmd.org/documentation/suppress-warnings.html) on a case-by-case basis.

{% info_block infoBox %}

Spryker demo shops may contain violations when analyzed with the Architecture Sniffer, as the tool includes more specific rules by default. 
It is recommended to generate a baseline during the initialization phase of your project development. 
This allows you to focus on addressing violations related to project-level integrations.

{% endinfo_block %}