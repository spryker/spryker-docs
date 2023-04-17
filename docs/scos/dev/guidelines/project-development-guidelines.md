---
title: Project development guidelines
description: This article describes the strategies a project team can take while building a Spryker-based project.
last_updated: Jan 28, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/project-development-guidelines
originalArticleId: 3608265d-c19f-4415-83c1-4584d50e48b0
redirect_from:
  - /2021080/docs/project-development-guidelines
  - /2021080/docs/en/project-development-guidelines
  - /docs/project-development-guidelines
  - /docs/en/project-development-guidelines
  - /v6/docs/project-development-guidelines
  - /v6/docs/en/project-development-guidelines
  - /v5/docs/project-development-guidelines
  - /v5/docs/en/project-development-guidelines
related:
  - title: Data Processing Guidelines
    link: docs/scos/dev/guidelines/data-processing-guidelines.html
  - title: Making your Spryker shop secure
    link: docs/scos/dev/guidelines/making-your-spryker-shop-secure.html
  - title: Module configuration convention
    link: docs/scos/dev/guidelines/module-configuration-convention.html
---

Spryker OS exposes codebase projects, which enables a high level of customization and can satisfy  complex business requirements.

There are different strategies developers can use to develop projects. Before starting developing, choose a [development strategies](/docs/scos/dev/back-end-development/extend-spryker/development-strategies.html) that meets your requirements. To get maximum from the Spryker OS codebase, atomic releases, leverage minimum efforts for the integration of the new features and keeping system up to date, we recommend the following approaches:
- Configuration
- Plug and play
- Project modules

## Apply coding guidelines

Starting from the first day of development, apply the [coding guidelines](/docs/scos/dev/guidelines/coding-guidelines/coding-guidelines.html).

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

Instead of using, extending, and overriding [Private API](/docs/scos/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html), register the missing extension points in [Spryker ideas](https://spryker.ideas.aha.io/). In future, we will add the registered extension points, and you will be able to extend it via Public API.


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



<!--More on test infrastructure <link>

How to write the very first project test <link>-->
