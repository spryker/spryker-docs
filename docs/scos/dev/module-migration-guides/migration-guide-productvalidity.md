---
title: Migration guide - ProductValidity
description: Use the guide to learn how to update the ProductValidity module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-validity
originalArticleId: a904c5cc-ebe1-4dcf-9f6b-d3988b5262c9
redirect_from:
  - /2021080/docs/mg-product-validity
  - /2021080/docs/en/mg-product-validity
  - /docs/mg-product-validity
  - /docs/en/mg-product-validity
  - /v1/docs/mg-product-validity
  - /v1/docs/en/mg-product-validity
  - /v2/docs/mg-product-validity
  - /v2/docs/en/mg-product-validity
  - /v3/docs/mg-product-validity
  - /v3/docs/en/mg-product-validity
  - /v4/docs/mg-product-validity
  - /v4/docs/en/mg-product-validity
  - /v5/docs/mg-product-validity
  - /v5/docs/en/mg-product-validity
  - /v6/docs/mg-product-validity
  - /v6/docs/en/mg-product-validity
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productvalidity.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productvalidity.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productvalidity.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productvalidity.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productvalidity.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productvalidity.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productvalidity.html
---

## Installing Version 1.*

The ProductValidity module is responsible for (de)activation of products for (or starting from) a certain period of time. Follow the instructions below to have the module up and running in your shop.

### Database Changes

We have added a new [spy_product_validity](https://github.com/spryker/demoshop/commit/4fff838#diff-dbd7f860d235b1eaf9516e5127e656db) database table (the query can be checked [by following this link](https://github.com/spryker/demoshop/commit/4fff838#diff-99a822ed42bf42d4e81be47bc8e9829c)).
To start the database migration, run the following commands:
* `vendor/bin/console propel:diff` - manual review is necessary for the generated migration file.
* `vendor/bin/console propel:migrate`
* `vendor/bin/console propel:model:build`


After that, add table files to `src/Orm/Zed/ProductValidity/Persistence` folder.

### Auto-check Enabling

To have the scheduler running to auto update products in accordance with the time settings for the product validity, you need to add cronjob and console command.
The instructions below demonstrate how to do that.

#### 1. Enable the console command

We have added a new console command `product:check-validity`.
The command checks validity by date ranges and active status for products. Then it updates (for demoshop it will be `touch`) the ones for which the activity state changes.
To enable it, add `ProductValidityConsole` to `ConsoleDependencyProvider`.

{% info_block infoBox "Info" %}

Check out our [Demoshop implementation](https://github.com/spryker/demoshop/commit/4fff838#diff-e854f9b396bdaa07ca6276f168aaa76a) for implementation example and idea.

{% endinfo_block %}

#### 2. Enable the cronjob

Add the following job to `config/Zed/cronjobs/jobs.php` file:
```php
$jobs[] = [
    'name' => 'check-product-validity',
     'command' => '$PHP_BIN vendor/bin/console product:check-validity',
    'schedule' => '* * * * *',
    'enable' => true,
    'run_on_non_production' => true,
    'stores' => $allStores,
];
```

{% info_block infoBox "Info" %}

Check out our [Demoshop implementation](https://github.com/spryker/demoshop/commit/4fff838#diff-c1676e93a12b1edc23bd32cc28cababc) for implementation example.

{% endinfo_block %}

### Product Plugins

For correct work of the Time to Live feature, you need to sync validity data with products concrete. Add the following plugins for that:

* `ProductValidityReadPlugin` to `ProductDependencyProvider::getProductConcreteReadPlugins()`
* `ProductValidityUpdatePlugin` to `ProductDependencyProvider::getProductConcreteAfterUpdatePlugins()`

{% info_block infoBox "Info" %}

Check out our [Demoshop implementation](https://github.com/spryker/demoshop/commit/4fff838#diff-c1676e93a12b1edc23bd32cc28cababc) for implementation example and idea.

{% endinfo_block %}

* * *
<!-- add links
**See also:**
* Get a general idea of the TTL feature
* Familiarize yourself with the feature details and its usage scenarios
 -->
