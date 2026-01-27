---
title: Post-Installation Configuration
description: Advanced configuration and customization of your Spryker project after initial setup
last_updated: December 30, 2025
template: concept-topic-template
---

This document provides guidance on advanced configuration and customization of your Spryker project after completing the initial setup. These steps help you optimize and adapt the Demo Shop to your specific project needs.

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

## Clean up store configuration

If you chose to start with one store, clean up the configuration of the unneeded stores in the following files:
- `config/install/*`
- `data/import/*`
- `deploy.dev.yml`
- `config_default.php`
- `src/SprykerConfig/CodeBucketConfig.php`

## Clean up data import

- In `data/import`, remove the files of the unneeded stores.
- Change the default config in `DataImportConfig::getDefaultYamlConfigPath()`.
- Define the needed stores in `CodeBucketConfig::getCodeBuckets()`.