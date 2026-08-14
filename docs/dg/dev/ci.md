---
title: Continuous Integration
description: Continuous Integration setup for Spryker projects—pipeline structure, validation stages, and the AI Dev SDK skills that generate a project CI pipeline and a Cypress end-to-end baseline.
last_updated: Aug 14, 2026
template: concept-topic-template
keywords: CI, continuous integration, automated testing, code quality, GitHub Actions, project stability, upgradability, validation, static analysis, cypress, end-to-end
---

Continuous Integration (CI) is essential for maintaining code quality, project stability, and upgradability in Spryker projects. This document describes how a Spryker project CI pipeline is structured and how to generate one for your project.

## Importance of CI for Spryker projects

All CI checks are mandatory for:

- **Project stability**: Prevents breaking changes from reaching production
- **Code quality**: Enforces coding standards and architectural patterns
- **Upgradability**: Ensures compatibility with Spryker core updates
- **Early issue detection**: Catches bugs, security vulnerabilities, and violations before deployment

Skipping CI checks leads to technical debt, integration issues, and costly refactoring.

## Reference CI implementation

The Spryker B2B Demo Marketplace includes a GitHub Actions CI workflow you can use as a reference: [.github/workflows/ci.yml](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/.github/workflows/ci.yml).

{% info_block warningBox "Product CI is not project CI" %}

The demo shop workflow is a *product-delivery* pipeline. It carries jobs that exist only to maintain Spryker itself and that a project must not inherit — a multi-version PHP matrix, release-branch checks, and the upstream Robot and Cypress maintenance suites.

The workflow marks each job with `[project applicable]` or `[remove for project]` so you can tell the two apart. Take only the jobs marked `[project applicable]`.

{% endinfo_block %}

## Pipeline structure

A project pipeline built from the reference workflow runs these stages:

| Stage | What it covers |
|-------|----------------|
| Credential scan | Scans the repository for verified secrets before anything else runs |
| Static analysis | Generates transfers and Propel models, then validates schemas and transfer definitions and runs code style, architecture rules, static analysis, and the Evaluator |
| Frontend validation | Lints and formats the Yves storefront and Merchant Portal assets, and runs Merchant Portal unit tests |
| Codeception | Functional, API, and acceptance tests against a built database |
| Cypress quality gate | Lints and format-checks the Cypress suite itself, so a broken spec fails fast before an environment is booted |
| Cypress end-to-end | Boots the application through the Docker SDK, warms queues and search, and runs the end-to-end suite |

Two details of this ordering matter. The Cypress quality gate runs before the end-to-end job so that lint failures surface in seconds rather than after a full boot. The end-to-end job depends on static analysis and frontend validation, so a broken build never reaches the expensive stage.

## Testing

### Functional and unit tests

Functional tests are recommended for all Spryker projects to cover custom business logic in facades, clients, services, and plugins. They can also serve as unit tests to verify that code behaves as expected. For details on building them, see [Testing Guidelines](/docs/dg/dev/guidelines/testing-guidelines/testing-guidelines.html).

### End-to-end tests

Cypress is the approach for end-to-end testing in Spryker projects. It covers the storefront, Back Office, Merchant Portal, and Glue API from the user's perspective, with modern debugging and a strong developer experience.

In CI, Cypress runs as the two jobs described above: a fast lint and format gate, then the end-to-end run against a booted application, which uploads screenshots and reports as artifacts when a run fails.

For setup and authoring instructions, see [Cypress Testing](/docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html).

{% info_block infoBox "Migrating from Codeception E2E suites" %}

Earlier Spryker projects covered end-to-end behavior with Codeception API (`@Glue`, `@EndToEnd`) and acceptance (`@Presentation`) suites. Cypress replaces both. If your project still runs them, see [Generate a Cypress baseline](#generate-a-cypress-baseline).

{% endinfo_block %}

## Generate your project CI with the AI Dev SDK

Adapting the demo shop workflow by hand means deciding, job by job, what is product maintenance and what your project actually needs. Two AI Dev SDK skills do this work for you. Both ship with the [Claude Code](/docs/dg/dev/ai/ai-dev/ai-dev-claude-code.html) plugin, and both are available through `ai-dev:setup` for other supported AI tools.

| Skill | What it does | Reference |
|-------|--------------|-----------|
| `project-ci-generator` | Rebuilds an inherited product-style CI setup into a single, lean project pipeline. Reads the CI that actually exists rather than applying a template, proposes a keep/drop plan for your approval before deleting anything, and ports the same jobs to GitLab or Bitbucket | [README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/project-ci-generator/README.md) |
| `cypress-migration` | Replaces the demoshop test suites with a project-owned Cypress baseline and wires it into CI. A one-time migration that vendors in a proven reference implementation and generates a companion `cypress-tests` skill for your project | [README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/cypress-migration/README.md) |

### Generate a project pipeline

Invoke `project-ci-generator` to turn the inherited workflow into your project pipeline. It reports a keep/drop plan first, and deletes nothing until you approve it.

### Generate a Cypress baseline

Invoke `cypress-migration` to replace the demoshop suites with a Cypress baseline owned by your project, including the CI jobs that run it.

Both skills also run as steps 1 and 7 of the [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html), which sets up a whole project in one pass. Run them individually when you only need the CI or test half.

For the full list of skills and agents, see [Skills and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-skills-and-agents.html).

## Set up CI in your repository

For instructions on configuring pipelines per platform, see:

- [Azure Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-azure-pipelines.html)
- [Bitbucket Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-bitbucket-pipelines.html)
- [GitHub Actions](/docs/ca/dev/configure-deployment-pipelines/configure-github-actions.html)
- [GitLab Pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-gitlab-pipelines.html)

Review all available workflows in the [Spryker workflows directory](https://github.com/spryker-shop/b2b-demo-marketplace/tree/master/.github/workflows) and adapt the relevant ones. Not all workflows apply to every project, so select only those that align with your needs.
