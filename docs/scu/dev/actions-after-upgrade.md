---
title: Actions after the upgrade
description: The document describes the after-update actions applicable for both the manual and the automatic update process using the Spryker Code Upgrader
template: howto-guide-template
---


This document describes the actions that should be performed after the module update process to make sure nothing was broken.
Those steps are applicable for both manual update process and automatic update by Spryker Code Upgrader.

## Verify module files

Verify all the modules' files on the project level and make sure they are compatible with the files from the vendor. Pay attention to business models, even after minor module updates they might be significantly changed since they are not a part of the module's public API. Functions might be renamed or refactored, constructors might have changed parameters, and even a whole business model might be split into several ones. The last one is a rare case, but it is still possible. So you need to check if project-level customizations are still compatible with the new module's version, and if you have new business models created on the project level and they use existing models from the vendor, they also must be reviewed.


## Finish a major upgrade

If you updated a module to the next major version, you might need to take manual steps to finalize the update. For example, if you updated the Category module from version `4.*` to `5.*`, check if there are manual steps you need to take in [Upgrade the Category module](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-category-module.html).

## Test upgrades

Major updates might require a release plan and a small downtime. We recommend deploying an updated codebase to a production-like environment with similar data and testing functionality related to the update.

Testing will help you figure out if you need to add some additional deployment steps like a one-time data import, republishing data into the storage or search, updating data in the database. Then you can use these findings in your production environment to make the deployment smooth and predictable.

## Update dependencies

Check dependency providers for the updated modules on the project level. It is recommended to replace deprecated plugins with alternatives mentioned in the deprecated plugins.

Also, updates might have new plugins that are supposed to be injected on the project level. It is an optional step, but in case you want to have all the latest OOTB functionality working on the project, you should inject them into appropriate dependency providers.

## Make the CI green

To keep the project healthy, the CI needs to include at least a code style sniffer, an architectural sniffer, and PHPStan. These sniffers can detect a lot of issues in the codebase after upgrading, so check if there are any issues you need to resolve before merging the changes.

## Double-check translations

Updates can introduce new flash messages, titles, or labels. If tests reveal non-translated items in the form of pure glossary keys instead of text, add translations for all the needed languages. Default glossary translations can be found in a public Demo Shop—for example, [B2B Demo Shop glossary](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/glossary.csv).
