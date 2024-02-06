---
title: Actions after the upgrade
description: The document describes the after-update actions applicable for both the manual and the automatic update process using the Spryker Code Upgrader
template: howto-guide-template
---


This document describes the actions that should be performed after the module update process to make sure nothing was broken.
Those steps are applicable for both manual update process and automatic update by Spryker Code Upgrader.

## Verify module files

Verify all the modules' files on the project level and make sure they are compatible with the files from the vendor. Pay attention to business models, even after minor module updates they might be significantly changed since they are not a part of the module's public API. Functions might be renamed or refactored, constructors might have changed parameters, and even a whole business model might be split into several ones. The last one is a rare case, but it is still possible. So you need to check if project-level customizations are still compatible with the new module's version, and if you have new business models created on the project level and they use existing models from the vendor, they also must be reviewed.

2. In case you performed a major update, you need to additionally search for an Upgrade guide for the module in the Spryker public documentation and execute all steps described in the appropriate document.
    As an example, let's imagine the Category module was updated from version `4.*` to `5.*`. In this case, you should search for the `"Migration guide - Category"`,
    find the `"Upgrading from version 4.* to 5.*"` part, and execute all the steps from it. The guide might introduce DB changes,
    require adding changes in the codebase, new data import, etc.

3. Major updates also might require some release plan and small downtime. It is recommended to first try to deploy an updated codebase
    on a Production-like environment with similar data, and test functionality related to major updates.
    During the testing, you may notice if the deployment requires some additional action like one-time data import,
    republishing data into Storage (Redis) and/or Search (Elasticsearch), updating data in the Database, etc.
    All findings must be considered for the Production deployment to make it smooth and predictable.

4. Check dependency providers on the project level for the updated modules.
    It is recommended to replace deprecated plugins with alternatives mentioned in the deprecated plugins.
    Also, updates might have new plugins that are supposed to be injected on the project level.
    It is an optional step, but in case you want to have all the latest OOTB functionality working on the project, you should inject them into appropriate dependency providers.

5. Make sure the CI is green. The CI must have enabled at least code style sniffer, architectural sniffer, and PHPStan.
    Those sniffers can detect a lot of issues in the codebase after the upgrade process.

6. Pay attention to translations. Updates might bring new flash messages, titles, labels, etc.
    If you found non-translated items (pure glossary key instead of text) during testing, collect them together and add translations
    for all languages you have on the project. In case you want to see default translations (EN and DE) for your new glossary,
    you can find them in a public demo shop, e.g. in [Glossary for B2B shop](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/glossary.csv)
