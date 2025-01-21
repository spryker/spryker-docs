---
title: Project Architecture Sniffer
description: Use Project Architecture Sniffer to ensure the architecture quality for project
last_updated: Jan 21, 2025
template: concept-topic-template
---

[Project Architecture Sniffer](https://github.com/spryker/project-architecture-sniffer) is a powerful tool designed specifically for Spryker projects. It leverages the capabilities of [PHP Mess Detector](https://phpmd.org) to maintain and enforce architectural standards.

Functionality:

* PHPMD rules tailored to the needs of Spryker projects
* [Architecture Sniffer](https://github.com/spryker/architecture-sniffer) rules for enforcing core-specific conventions
* New rules designed to address challenges unique to Spryker projects

This tool ensures that your project's architecture aligns with Spryker's best practices and guidelines.

## Priority levels
It identifies and categorizes findings into levels:
- 1: Сritical - Immediate attention required due to potential high impact on application stability or business functionality.
- 2: Major - Significant improvements needed to enhance maintainability and prevent future issues.
- 3: Medium - Suggestions for better practices to keep the codebase clean and efficient.

For local environments and CI checks, we recommend at least priority 3.

## Install

Include the sniffer as `require-dev` dependency:

```
composer require --dev spryker/project-architecture-sniffer
```

## Run


Run the sniffer from CLI:
```
vendor/bin/phpmd src/Pyz/ text vendor/spryker/project-architecture-sniffer/src/ruleset.xml --minimumpriority 3
```

For command options, see [Command line options](https://phpmd.org/documentation/index.html).


## Violation baseline

When integrating the sniffer into existing projects, you may reveal violations introduced in the past.

If there're a couple of violations, you can refactor them right away and start using the sniffer moving forward.

With many existing violations, we recommend generating a [violation baseline](https://phpmd.org/documentation/#baseline) and move forward writing violation-free code. Review existing violations and plan refactoring the most critical ones. When you fix a violation from the baseline, make sure to update the baseline.



You can [suppress rules](https://phpmd.org/documentation/suppress-warnings.html) on a case-by-case basis. However we strongly recommend using the baseline because ignoring violations may hide consequential violations.

{% info_block infoBox %}

Spryker demo shops may contain violations when analyzed with the Architecture Sniffer, as the tool includes more project specific rules by default.
It is recommended to generate a baseline during the initialization phase of your project development.
This allows you to focus on addressing violations related to project-level integrations.

{% endinfo_block %}
