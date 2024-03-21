---
title: Project development guidelines
description: This article describes the strategies a project team can take while building a Spryker-based project.
last_updated: Jan 28, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/project-development-guidelines
originalArticleId: 3608265d-c19f-4415-83c1-4584d50e48b0
redirect_from:
  - /docs/scos/dev/guidelines/project-development-guidelines.html
related:
  - title: Data Processing Guidelines
    link: docs/scos/dev/guidelines/data-processing-guidelines.html
  - title: Making your Spryker shop secure
    link: docs/scos/dev/guidelines/security-guidelines.html
  - title: Module configuration convention
    link: docs/scos/dev/guidelines/module-configuration-convention.html
---

Spryker OS exposes codebase projects, which enables a high level of customization and can satisfy  complex business requirements.

There are different strategies developers can use to develop projects. Before starting developing, choose a [development strategies](/docs/dg/dev/backend-development/extend-spryker/development-strategies.html) that meets your requirements. To get maximum from the Spryker OS codebase, atomic releases, leverage minimum efforts for the integration of the new features and keeping system up to date, we recommend the following approaches:
- Configuration
- Plug and play
- Project modules

## Updating Spryker
It is essential to ensure that [Spryker is updated](/docs/dg/dev/updating-spryker/updating-spryker.html) to the latest stable version.

## Apply coding guidelines
Starting from the first day of development, apply the [coding guidelines](/docs/dg/dev/guidelines/coding-guidelines/coding-guidelines.html).

## Use custom namespaces
Instead of using the `Pyz` namespace, create your own namespace for project development. For example, use the project name as a namespace.

## Use custom names
Use custom names for everything that is added on the project level, like the following:
- Transfers
- Transfer properties
- DB tables
- DB table fields,
- Modules
- Classes
- Interfaces
- Traits
- Properties
- Contants

For example, customize the names by adding the project name.

## Avoid using, extending, and overriding Private API
Instead of using, extending, and overriding [Private API](/docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html), send a request about the missing endpoints to your Spryker account manager. Spryker offers extension points that allow you to extend via the Public API and helps you to customize the application. We recommend to use the extension points instead of overriding Private API.

## Avoid using unsupported types
Avoid using unsupported types as constructor arguments of a plugin.

The [supported types](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/single-plugin-argument.html#problem-description) are: null, bool, integer, float, string and object.

## Keep modules up to date
During development and after going live, we recommend checking for security updates of external and Spryker dependencies on a regular basis.

Additionally, we recommend keeping modules up to date in general.

## Development and tests
Starting from the first day of development, write tests for all the customizations you implement. We provide infrastructure for unit, functional, and acceptance tests.

## Implement CI/CD
Starting from the first day of development, we recommend establishing an incremental development process based on CI/CD and the tests mentioned in the previous section.

## Establish coding standards
Before you start developing, establish coding standards. Implement code checks based on the standards into your CI/CD. The default code checks shipped with Spryker are located in `/config/install/sniffs.yml`. You might want to add more checks that are based on your project's requirements.

Make sure that code can't be merged until it corresponds to your coding standards.

## Code maintainability
Code maintainability is important because it ensures that your code remains understandable, adaptable, and modifiable throughout its lifecycle. It helps development teams to manage and enhance code efficiently, reducing the likelihood of bugs and costly errors over time.

The following tools can help you make your code maintainable:

- [PHPStan](/docs/dg/dev/sdks/sdk/development-tools/phpstan.html)
- [Architecture Sniffer](/docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html)
- [Code Style Sniffer](/docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html)
- [PHP Mess detector](https://github.com/spryker/architecture-sniffer)


<!--More on test infrastructure <link>

How to write the very first project test <link>-->
