---
title: Migration Guide - ManualOrderEntryGui
originalLink: https://documentation.spryker.com/v4/docs/mg-manual-order-entry-gui
redirect_from:
  - /v4/docs/mg-manual-order-entry-gui
  - /v4/docs/en/mg-manual-order-entry-gui
---

## Upgrading from Version 0.8.* to Version 0.9.0

In the version 0.9.0 of the **ManualOrderEntryGui** module, we have added the ability to assign a delivery method to a store in the Back Office. You can find more details about the changes on the [ManualOrderEntryGui module](https://github.com/spryker/manual-order-entry-gui/releases) release page.

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **ManualOrderEntryGui** module to the new version:

```bash
composer require spryker/manual-order-entry-gui: "^0.9.0" --update-with-dependencies
```
2. Generate the transfer objects:

```bash
console transfer:generate
```

*Estimated migration time: 5 min*

## Upgrading from Version 0.7.* to Version 0.8.0

In this new version of the **ManualOrderEntryGui** module, we have added support of split delivery. You can find more details about the changes on the [ManualOrderEntryGui module](https://github.com/spryker/manual-order-entry-gui/releases) release page.

{% info_block errorBox %}
This release is a part of the **Split delivery** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/split-delivery-
{% endinfo_block %}.)

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **ManualOrderEntryGui** module to the new version:

```bash
composer require spryker/manual-order-entry-gui: "^0.8.0" --update-with-dependencies
```
2. Generate the transfer objects:

```bash
console transfer:generate
```

*Estimated migration time: 5 min*

## Upgrading from Version 0.5.* to Version 0.7.0

{% info_block infoBox %}
 In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions. )
