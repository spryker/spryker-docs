---
title: Finilizing upgrades
description: Ensure a smooth upgrade process in Spryker by verifying module files, testing functionality, updating dependencies, and finalizing major upgrades with essential steps.
template: howto-guide-template
---

This document describes how to make sure everything works correctly after upgrading a module. The instructions are applicable for manual upgrades and automatic upgrades provided by Spryker Code Upgrader.

## Verifying module files

Module updates can introduce significant changes that may break project-level functionality. Because business models are part of the [private API](/docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html), they can be significantly changed even after a minor update. Functions can be renamed or refactored, constructors can have changed parameters, and a business model can be split into several ones. To make sure the extended or overridden functionality works correctly, verify that the files of the updated modules on the project level are compatible with the core files.

## Finishing a major upgrade

If you upgraded a module to the next major version, you might need to take manual steps to finalize the upgrade. For example, if you upgraded the Category module from version `4.*` to `5.*`, check if there are manual steps you need to take in [Upgrade the Category module](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-category-module.html).

## Testing upgrades

Major upgrades might require a release plan and a small downtime. We recommend deploying an updated codebase to a production-like environment with similar data and testing the functionality related to the upgrade.

Testing will help you figure out if you need to add some additional deployment steps like a one-time data import, republishing data into the storage or search, updating data in the database. Then you can use these findings in your production environment to make the deployment smooth and predictable.

## Updating dependencies

If you are using the Upgrader, dependencies are updated automatically, so you can skip this step.

Check the dependency providers for the upgraded modules on the project level. If a plugin was deprecated, we recommend replacing it with the provided alternative.

Updates can be shipped with optional new plugins that need to be injected on the project level. To make sure the default functionality works correctly, inject the optional plugins into appropriate dependency providers.

## Making the CI green

To keep the project healthy, the CI needs to include at least a code style sniffer, an architectural sniffer, and PHPStan. These sniffers can detect a lot of issues in the codebase after updating, so check if there are any issues you need to resolve before merging the changes.

## Adding missing translations

Updates can introduce new flash messages, titles, or labels. If tests reveal non-translated items in the form of pure glossary keys instead of text, add translations for all the needed languages. Default glossary translations can be found in a public Demo Shop—for example, [B2B Demo Shop glossary](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/glossary.csv).

The Upgrader adds translations for EN and DE locales. You have to do this step only if you have other locales or when updating manually.
