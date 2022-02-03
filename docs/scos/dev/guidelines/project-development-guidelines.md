---
title: Project Development Guidelines
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
---

## Development Strategies

Spryker OS exposes codebase Projects, which enables a high level of customization and can satisfy even the most complex Project business requirements.

The project development, the team is free to decide what approach to use. Spryker recommends considering **Configuration**, **Plug and Play**, and **Project modules** first to get maximum from the Spryker OS codebase, atomic releases, leverage minimum efforts for the integration of the new features and keeping system up to date.

Before starting the project, we recommend you check available development strategies and define one for your implementation. See [Development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html) for details.

## Development & Tests

From the very first day of project development, it’s recommended to establish an incremental development process based on CI/CD supported by tests.

Spryker provides an infrastructure for Unit, Functional, and Acceptance tests.

General test coverage depends on project business requirements and the complexity of a project. But defining critical e-commerce functionalities and covering them with tests is necessary for every project (even if they are only big 5: Home page, Catalog Page, PDP, Add to cart, and Place order).

<!--More on test infrastructure <link>

How to write the very first project test <link>-->
