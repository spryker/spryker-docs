---
title: Migration guide - AvailabilityOfferConnector
description: Use the guide to migrate to a new version of the AvailabilityOfferConnector module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-availability-offer-connector
originalArticleId: c60e70ad-a7d9-4bc7-a318-c1b173302b36
redirect_from:
  - /2021080/docs/mg-availability-offer-connector
  - /2021080/docs/en/mg-availability-offer-connector
  - /docs/mg-availability-offer-connector
  - /docs/en/mg-availability-offer-connector
  - /v1/docs/mg-availability-offer-connector
  - /v1/docs/en/mg-availability-offer-connector
  - /v2/docs/mg-availability-offer-connector
  - /v2/docs/en/mg-availability-offer-connector
  - /v3/docs/mg-availability-offer-connector
  - /v3/docs/en/mg-availability-offer-connector
  - /v4/docs/mg-availability-offer-connector
  - /v4/docs/en/mg-availability-offer-connector
  - /v5/docs/mg-availability-offer-connector
  - /v5/docs/en/mg-availability-offer-connector
  - /v6/docs/mg-availability-offer-connector
  - /v6/docs/en/mg-availability-offer-connector
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-availabilityofferconnector.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-availabilityofferconnector.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-availabilityofferconnector.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-availabilityofferconnector.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-availabilityofferconnector.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-availabilityofferconnector.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-availabilityofferconnector.html
---

## Upgrading from version 3.* to version 4.0.0

In this new version of the **AvailabilityOfferConnector** module, we have added support of decimal stock. You can find more details about the changes on the [AvailabilityOfferConnector module](https://github.com/spryker/availability-offer-connector/releases) release page.

{% info_block errorBox %}

This release is a part of the **Decimal Stock** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Decimal Stock Migration Concept](/docs/scos/dev/migration-concepts/decimal-stock-migration-concept.html).

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **AvailabilityOfferConnector** module to the new version:

```bash
composer require spryker/availability-offer-connector: "^4.0.0" --update-with-dependencies
```
3. Update the database entity schema for each store in the system:

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

## Upgrading from version 1.* to version 3.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}
