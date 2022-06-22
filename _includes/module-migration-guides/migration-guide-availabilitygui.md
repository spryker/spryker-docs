---
title: Migration guide - AvailabilityGui
description: Use the guide to update versions to the newer ones of the AvailabilityGui module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-availability-gui
originalArticleId: 72ac3792-f41b-4d99-b2de-67366a06a9b0
redirect_from:
  - /2021080/docs/mg-availability-gui
  - /2021080/docs/en/mg-availability-gui
  - /docs/mg-availability-gui
  - /docs/en/mg-availability-gui
  - /v1/docs/mg-availability-gui
  - /v1/docs/en/mg-availability-gui
  - /v2/docs/mg-availability-gui
  - /v2/docs/en/mg-availability-gui
  - /v3/docs/mg-availability-gui
  - /v3/docs/en/mg-availability-gui
  - /v4/docs/mg-availability-gui
  - /v4/docs/en/mg-availability-gui
  - /v5/docs/mg-availability-gui
  - /v5/docs/en/mg-availability-gui
  - /v6/docs/mg-availability-gui
  - /v6/docs/en/mg-availability-gui
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-availabilitygui.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-availabilitygui.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-availabilitygui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-availabilitygui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-availabilitygui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-availabilitygui.html
---

## Upgrading from version 5.* to version 6.0.0

In this new version of the **AvailabilityGui** module, we have added support of decimal stock. You can find more details about the changes on the [AvailabilityGui module](https://github.com/spryker/availability-gui/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **AvailabilityGui** module to the new version:

```bash
composer require spryker/availability-gui: "^6.0.0" --update-with-dependencies
```
2. Update the database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```
3. Run the database migration:

```bash
console propel:install
console transfer:generate
```

*Estimated migration time: 5 min*

## Upgrading from version 3.* to version 5.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}
