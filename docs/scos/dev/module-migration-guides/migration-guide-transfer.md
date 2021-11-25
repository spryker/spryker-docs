---
title: Migration guide - Transfer
description: Use the guide to learn how to update the Transfer module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-transfer
originalArticleId: 49dc6ee6-a3da-465f-96e7-281db0d4575a
redirect_from:
  - /2021080/docs/mg-transfer
  - /2021080/docs/en/mg-transfer
  - /docs/mg-transfer
  - /docs/en/mg-transfer
  - /v1/docs/mg-transfer
  - /v1/docs/en/mg-transfer
  - /v2/docs/mg-transfer
  - /v2/docs/en/mg-transfer
  - /v3/docs/mg-transfer
  - /v3/docs/en/mg-transfer
  - /v4/docs/mg-transfer
  - /v4/docs/en/mg-transfer
  - /v5/docs/mg-transfer
  - /v5/docs/en/mg-transfer
  - /v6/docs/mg-transfer
  - /v6/docs/en/mg-transfer
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-transfer.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-transfer.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-transfer.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-transfer.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-transfer.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-transfer.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-transfer.html
---

## Upgrading from version 2.* to version 3.*

When upgrading to the new major version of the `Transfer` module, it is necessary to make sure that everywhere the `$foo->fromArray($bar->toArray())` statement is used and the types are matching.

From now on we are no longer silently ignoring when you try to set a string to an array field and an exception is getting thrown instead.

A concrete example is product attributes; they are stored as a `json` string and are expected to be an array in transfer objects. In this case, we need to make sure that the value of the attributes in the source array are converted to an array which is expected by the target transfer.
