---
title: Continuous Integration
description: Continuous Integration configuration and validation commands for Spryker projects to ensure code quality, stability, and upgradability.
last_updated: December 15, 2025
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

The Spryker B2B Demo Marketplace includes a comprehensive GitHub Actions CI workflow: [.github/workflows/ci.yml](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/.github/workflows/ci.yml).

For instructions on setting up CI in different repositories, see the following documents:
- [Deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-azure-pipelines.html)
- [Customizing deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-bitbucket-pipelines.html)
- [GitHub Actions](/docs/ca/dev/configure-deployment-pipelines/configure-github-actions.html)
- [Configuring GitLab pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-gitlab-pipelines.html)
- [Azure Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-azure-pipelines.html)
- [Configuring Bitbucket Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-bitbucket-pipelines.html)

## Validation commands

Use these commands to validate your code before merging it to the main branch.

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

### API documentation validation

**REST API and Glue specification**

```bash
# Generate REST API documentation
vendor/bin/console rest-api:generate:documentation

# Validate OpenAPI specification
speccy lint src/Generated/Glue/Specification/spryker_rest_api.schema.yml
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

### Automated testing

**Acceptance and API tests**

```bash
# Run acceptance tests
docker/sdk testing codecept run -c codeception.acceptance.yml

# Run API tests
docker/sdk testing codecept run -c codeception.api.yml
```

**Functional tests**

```bash
# Run functional tests
docker/sdk testing codecept run -c codeception.ci.functional.yml
```

## Extending CI with Project Architecture Sniffer

The [Project Architecture Sniffer](/docs/dg/dev/sdks/sdk/development-tools/project-architecture-sniffer) enforces Spryker architectural standards and detects violations:

```yaml
- name: Architecture Sniffer
  run: vendor/bin/phpmd src/Pyz/ text vendor/spryker/project-architecture-sniffer/src/ruleset.xml --minimumpriority 3
```

Comprehensive CI validation is essential for maintaining a stable, upgradable, and high-quality Spryker project.
