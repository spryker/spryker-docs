---
title: Continuous Integration
description: Continuous Integration configuration and validation commands for Spryker projects to ensure code quality, stability, and upgradability.
last_updated: February 24, 2026
template: concept-topic-template
keywords: CI, continuous integration, automated testing, code quality, GitHub Actions, project stability, upgradability, validation, static analysis, architecture sniffer, codeception, phpstan
---

Continuous Integration (CI) is essential for maintaining code quality, project stability, and upgradability in Spryker projects. This document lists all validation commands from the Spryker demo shop CI pipeline that you can run locally before committing code.

## Importance of CI for Spryker projects

All CI checks are mandatory for:
- **Project stability**: Prevents breaking changes from reaching production
- **Code quality**: Enforces coding standards and architectural patterns
- **Upgradability**: Ensures compatibility with Spryker core updates
- **Early issue detection**: Catches bugs, security vulnerabilities, and violations before deployment

Skipping CI checks leads to technical debt, integration issues, and costly refactoring.

## Reference CI implementation

{% info_block warningBox "Warning" %}
The Spryker B2B Demo Marketplace includes a comprehensive GitHub Actions CI workflow: [.github/workflows/ci.yml](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/.github/workflows/ci.yml).
This CI configuration is specific to the demo shop only and may not be applicable to the project. 
However, you can use it as an example and adapt it to the project using the recommendations described below.
{% endinfo_block %}

It is recommended to review all available CI workflows in the [Spryker workflows directory](https://github.com/spryker-shop/b2b-demo-marketplace/tree/master/.github/workflows) and adapt the relevant ones for the project. 
Not all workflows may be applicable to the specific requirements, so select and configure only those that align with the project needs.

For instructions on setting up CI in different repositories, see the following documents:
- [Azure Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-azure-pipelines.html)
- [Bitbucket Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-bitbucket-pipelines.html)
- [GitHub Actions](/docs/ca/dev/configure-deployment-pipelines/configure-github-actions.html)
- [GitLab Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-gitlab-pipelines.html)

## Validation commands

Use these commands to validate the code before merging it to the main branch.

### Security scanning

**Credential leak detection**

```bash
# Using TruffleHog (install separately)
trufflehog filesystem . --log-level=2 --results=verified
```

### Code validation

**Schema and transfer validation**

```bash
# Validate Propel schemas
vendor/bin/console propel:schema:validate
vendor/bin/console propel:schema:validate-xml-names

# Validate transfer objects
vendor/bin/console transfer:validate
```

### Static code analysis

**Code style checks**

```bash
# PHP code style (PHPMD)
vendor/bin/console code:sniff:style

# Architecture sniffer (Spryker conventions)
vendor/bin/phpmd src/ text vendor/spryker/architecture-sniffer/src/ruleset.xml
```

**Static analysis**

```bash
# PHPStan (type checking and analysis at level 6)
vendor/bin/phpstan analyze -l 6 -c phpstan.neon src/

# Spryker Evaluator (upgradability and compatibility checks)
vendor/bin/evaluator evaluate --format=compact
```

### Frontend validation

**JavaScript and CSS checks**

```bash

# Yves (storefront) validation
npm run yves:stylelint
npm run yves:lint

# Code formatting
npm run formatter

# Marketplace frontend validation
npm run mp:lint
npm run mp:stylelint
npm run mp:test
```

### Extending CI with Project Architecture Sniffer

The [Project Architecture Sniffer](/docs/dg/dev/sdks/sdk/development-tools/project-architecture-sniffer.html) enforces Spryker architectural standards and detects violations:

```yaml
- name: Architecture Sniffer
  run: vendor/bin/phpmd src/Pyz/ text vendor/spryker/project-architecture-sniffer/src/ruleset.xml --minimumpriority 3
```

Comprehensive CI validation is essential for maintaining a stable, upgradable, and high-quality Spryker project.

## Automated testing

### Functional and Unit tests

```bash
# Run functional tests in the CI environment
docker/sdk testing codecept run -c codeception.ci.functional.yml
```

Functional tests are recommended for all Spryker projects to cover custom business logic in facades, clients, services, plugins, and others. 
They can also be used as a form of unit testing to ensure the code behaves as expected. 
For detailed information on how to build functional tests, see [Testing Guidelines](/docs/dg/dev/guidelines/testing-guidelines/testing-guidelines).

### End-to-end tests

**Cypress (Recommended)**

Cypress is the **recommended and preferred approach** for end-to-end (E2E) testing in Spryker projects.
The Spryker Cypress boilerplate provides a modern, comprehensive testing framework for UI testing with superior debugging capabilities and developer experience.
For detailed information on setting up and running Cypress tests, see [Cypress Testing](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing).

**API tests (Glue RestApi) with Codecept**

```bash
# Run API tests in the CI environment
docker/sdk testing codecept run -c codeception.api.yml
```

API tests are based on the PHP Codecept framework and test endpoints with groups `@Glue` and `@EndToEnd`.
These tests validate the REST API responses, data integrity, and endpoint behavior.
This approach can still be used as is, since it is based on PHP and does not require adding new frameworks or stacks to the project.

**Acceptance tests (Presentation) with Codecept**

```bash
# Run acceptance tests in the CI environment
docker/sdk testing codecept run -c codeception.acceptance.yml
```

Acceptance tests are based on the PHP Codecept framework and test the presentation layer of the application with groups `@Presentation`.
These tests validate user interactions, page rendering, and business logic flows from the user's perspective.

