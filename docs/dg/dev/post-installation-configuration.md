---
title: Post-Installation Configuration
description: Advanced configuration and customization of your Spryker project after initial setup
last_updated: Aug 19, 2026
template: concept-topic-template
---

This document provides guidance on advanced configuration and customization of your Spryker project after completing the initial setup. These steps help you optimize and adapt the Demo Shop to your specific project needs.

## Automate this configuration with the AI Dev SDK

Most of the work on this page — services, stores, and import data — is covered by AI Dev SDK skills. Each skill reads what your project actually contains rather than applying a template, and reports what it plans to change before changing it.

| Skill | What it does | Reference |
|-------|--------------|-----------|
| `configure-services` | Changes what infrastructure the project runs on, or builds a new environment deploy file. Makes surgical edits to the keys it owns, leaving neighboring deploy file blocks untouched | [README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/configure-services/README.md) |
| `define-stores` | Creates or redefines a project's stores and region. Clears the hardcoded store and locale literals that otherwise abort the boot | [README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/define-stores/README.md) |
| `project-data` | Populates, reshapes, reduces, cleans up, or removes the project's import data — one skill for every `data/import` change | [README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/project-data/README.md) |
| `spryker-import-tools` | Reads, filters, edits, and validates data import CSV files and manifests. Reliable where shell tools corrupt multi-line quoted fields, and catches boot-aborting data in seconds | [README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/spryker-import-tools/README.md) |
| `curate-golive-data` | Makes the data the project keeps production-safe before go-live — placeholder tax rates, Spryker CDN imagery, and demo accounts | [README](https://github.com/spryker-sdk/ai-dev/blob/master/plugins/spryker-ai-dev-sdk/skills/curate-golive-data/README.md) |

If you are setting up a new project, the [Project Starter Wizard](/docs/dg/dev/ai/ai-dev/ai-dev-project-starter-wizard.html) runs these skills in order from a single interview. Run them individually when you are configuring a project that already exists.

For the full list of skills and agents, see [Workflows, Skills, and Agents](/docs/dg/dev/ai/ai-dev/ai-dev-workflows-skills-and-agents.html).

The rest of this document describes the same configuration manually.

## Manage modules

A Spryker module is a single-function unit that has well-defined dependencies and can be updated independently. [Composer](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html) is used for installing and managing module dependencies.
To define your strategy when implementing updates, learn about our [module and feature release process](/docs/about/all/releases/product-and-code-releases.html).

To learn about the module versioning approach in Spryker, see [Semantic Versioning: Major vs. Minor vs. Patch Release](/docs/dg/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html).

## Clean up modules

1. Go through the modules that came with the Demo Shop you've installed.
2. Come up with the list of modules you actually need.
3. Remove unnecessary modules by following module upgrade guides in a backwards fashion.

## Configure services

1. Define how to manage the settings in the configuration files with [Configuration management](/docs/dg/dev/backend-development/data-manipulation/configuration-management.html).
2. [Configure services](/docs/dg/dev/integrate-and-configure/configure-services.html).
3. [Configure Elasticsearch](/docs/pbc/all/search/{{site.version}}/base-shop/tutorials-and-howtos/configure-elasticsearch.html).
4. [Configure queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html).
5. [Configure stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html#configure-stores).
6. [Set up cronjobs](/docs/dg/dev/backend-development/cronjobs/cronjobs.html).

The `configure-services` skill applies steps 2 to 4 to your deploy file.

## Clean up store configuration

The `define-stores` skill performs this cleanup, including the hardcoded store and locale literals that are easy to miss and that abort the boot when left behind.

If you chose to start with one store, clean up the configuration of the unneeded stores in the following files:
- `config/install/*`
- `data/import/*`
- `deploy.dev.yml`
- `config_default.php`
- `src/SprykerConfig/CodeBucketConfig.php`

## Clean up data import

The `project-data` skill performs this cleanup, and `spryker-import-tools` edits and validates the CSV files themselves.

- In `data/import`, remove the files of the unneeded stores.
- Change the default config in `DataImportConfig::getDefaultYamlConfigPath()`.
- Define the needed stores in `CodeBucketConfig::getCodeBuckets()`.

## Prepare for go-live

Before go-live, replace the demo values the Demo Shop ships with — placeholder tax rates, Spryker CDN imagery, and demo customer accounts. The `curate-golive-data` skill finds and resolves them.