---
title: Project Architecture Sniffer
description: Use Project Architecture Sniffer to ensure the architecture quality for project
last_updated: Jan 21, 2025
template: concept-topic-template
---

[Project Architecture Sniffer](https://github.com/spryker/project-architecture-sniffer) leverages the capabilities of [PHP Mess Detector](https://phpmd.org) to maintain and enforce architectural standards in Spryker projects.

Functionality:

- PHPMD rules tailored to Spryker projects
- Architecture Sniffer rules for enforcing core-specific conventions
- Rules that address the challenges unique to Spryker projects

## Architecture violation priority levels

Architecture issues are categorized according to the following levels:
1. Сritical: Immediate attention required because of potential high impact on application stability or business functionality
2. Major: Significant improvements needed to enhance maintainability and prevent future issues
3. Medium: Suggestions for better practices to keep the codebase clean and efficient

For local environments and CI checks, we recommend at least priority 3.

## Install

Include the sniffer as a `require-dev` dependency:

```bash
composer require --dev spryker/project-architecture-sniffer
```

## Run


Run the sniffer from CLI:

```bash
vendor/bin/phpmd src/Pyz/ text vendor/spryker/project-architecture-sniffer/src/ruleset.xml --minimumpriority 3
```

For command options, see [Command line options](https://phpmd.org/documentation/index.html).


## Violation baseline

When integrating the sniffer into existing projects, you may reveal violations introduced in the past.

If the number of violations is small, you can refactor them right away. However, a big number of violations may be hard to refactor at a time. For such cases, we recommend generating a [violation baseline](https://phpmd.org/documentation/#baseline) and move forward writing violation-free code. Review existing violations and plan refactoring the most critical ones. When you fix an existing violation, remove it from the baseline.

You can [suppress rules](https://phpmd.org/documentation/suppress-warnings.html) on a case-by-case basis. However we strongly recommend using the baseline because ignoring violations may hide consequential violations.

{% info_block infoBox %}

Spryker demo shops may contain violations when analyzed with the Architecture Sniffer because the tool includes more project specific rules by default.

We recommend generating a baseline during the initialization phase of your project development. This lets you focus on addressing violations related to project-level integrations.

{% endinfo_block %}


















































