---
title: Migration Guide - OrdersRestApi
originalLink: https://documentation.spryker.com/2021080/docs/mg-ordersrestapi
redirect_from:
  - /2021080/docs/mg-ordersrestapi
  - /2021080/docs/en/mg-ordersrestapi
---

## Upgrading from Version 3.0.* to Version 4.0.0

In this new version of the **OrdersRestApi** module, we have added support of split delivery. You can find more details about the changes on the [OrdersRestApi module](https://github.com/spryker/orders-rest-api/releases) release page.

{% info_block errorBox %}
This release is a part of the Split delivery concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/split-delivery-
{% endinfo_block %}.)

**To upgrade to the new version of the module, do the following:**
1. Upgrade the **OrdersRestApi** module to the new version:

```bash
composer require spryker/orders-rest-api: "^4.0.0" --update-with-dependencies
```
2. Generate the transfer objects:

```bash
console transfer:generate
```

*Estimated migration time: 5 min*

## Upgrading from Version 1.* to Version 3.0.0 

{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)
