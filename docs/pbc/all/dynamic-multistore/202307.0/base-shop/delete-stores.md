---
title: Delete stores
description: This document shows how to delete a store when the system is running with a dynamic store feature.
past_updated: Jun 26, 2023
template: howto-guide-template
---

{% info_block warningBox %}

Dynamic Multistore is part of an *Early Access Release*. This *Early Access* feature introduces the ability to handle the store entity in the Back Office. Business users can try creating stores without editing the `Stores.php` file and redeploying the system.

{% endinfo_block %}

This document describes how to delete stores.

## When it might be useful

Occasionally, a store created earlier becomes unnecessary. It may be a store that has been used for a brand, product, holiday, marketing promotions, or events, such as ending experiments with no production environment.

On the technical side, removing a store helps with the following:
1. By deleting redundant data, which can take a lot of space, the shop's speed is increased. The load on it for the purposes of indexing and searching is also reduced.
2. Reducing wasted memory and your storage footprint.

{% info_block warningBox "Warning" %}

We recommend taking these steps in a test environment. Make sure to create a backup of the database and other storages.

{% endinfo_block %}


## Back up the database

Back up the store's database up and make sure it's recoverable.
For instructions, see [Create and restore database backups](/docs/cloud/dev/spryker-cloud-commerce-os/create-and-restore-database-backups.html).


## Suspend P&S


1. Enable the maintenance mode:
```bash
vendor/bin/console maintenance:enable
```

For more information about maintenance mode, see [Enable and disable maintenance mode](/docs/cloud/dev/spryker-cloud-commerce-os/manage-maintenance-mode/enable-and-disable-maintenance-mode.html).

2. Make sure there aren't too many messages showing in the RabbitMQ. Wait for the messages to be processed.

3. Suspend P&S and the Cronjob scheduler:

```bash
vendor/bin/console scheduler:suspend
```


## Cleaning data and configuration in related database tables

The number of tables that use the relation with the `spy_store` table depends on the use of the functionality, and on the installed modules.

The list of available tables with data that may contain a foreign key relationship:
- `spy_price_product_store`
- `spy_asset_store`
- `spy_availability_abstract`
- `spy_availability`
- `spy_availability_notification_subscription`
- `spy_category_store`
- `spy_cms_page_store`
- `spy_company_store`
- `spy_discount`
- `spy_discount_store`
- `spy_merchant_store`
- `spy_merchant_relationship_sales_order_threshold`
- `spy_oms_product_reservation`
- `spy_oms_product_offer_reservation`
- `spy_payment_method_store`
- `spy_price_product_schedule`
- `spy_product_abstract_store`
- `spy_product_label_store`
- `spy_product_measurement_sales_unit_store`
- `spy_product_offer_store`
- `spy_product_option_value_price`
- `spy_product_relation_store`
- `spy_quote`
- `spy_sales_order_threshold`
- `spy_shipment_method_price`
- `spy_shipment_method_store`
- `spy_stock_store`
- `spy_touch_search`
- `spy_touch_storage`

Store has new configuration tables that were used for dynamic store:
- `spy_locale_store`
- `spy_currency_store`
- `spy_country_store`

Make sure to delete all records related to the store. You may also have other related tables used in the project, make sure to check them and delete data from them.
After removing all related data from all tables, you can remove the row with the **store** data from the table `spy_store`.

## Cleaning the data in the key-value storage engine

With the Redis key-value storage, data is stored as keys that contain the store name. The key name follows this format: `kv:{resource-type}:{store}:{locale}:{key}`.

{% info_block infoBox %}

When taking the steps in this section, take the following into account:

* The Redis data to modify in this section is relevant to the default configuration. Depending on the features your project has, you may need to modify more data.
* `xxx` is a placeholder of the store name.

{% endinfo_block %}

1. Delete the following data in Redis:

  - Stock information:
     - `kv:availability:xxx:*`
  - Product details:
      - `kv:price_product_abstract:xxx:*`
      - `kv:price_product_abstract_merchant_relationship:xxx:*`
      - `kv:price_product_concrete:xxx:*`
      - `kv:price_product_concrete_merchant_relationship:xxx:*`
      - `kv:product_abstract:xxx:*`
      - `kv:product_abstract_category:xxx:*`
      - `kv:product_abstract_option:xxx:*`
      - `kv:product_abstract_relation:xxx:*`
      - `kv:product_concrete_measurement_unit:xxx:*`
      - `kv:product_concrete_product_offer_price:xxx:*`
      - `kv:product_concrete_product_offers:xxx:*`
      - `kv:product_label_dictionary:xxx:*`
      - `kv:product_offer:xxx:*`
      - `kv:product_offer_availability:xxx:*`
  - Product category details:
      - `kv:category_node:xxx:*`
      - `kv:category_tree:at:*`
  - CMS pages and blocks:
      - `kv:cms_block:xxx:*`
      - `kv:cms_page:xxx:*`
  - Merchant:
      - `kv:merchant:xxx:*`
      - `kv:price_product_abstract_merchant_relationship:xxx:*`


2. Adjust `kv:store_list:` and delete the store name XXX values in stores.
```json
{"stores":["AT","DE","XXX"],"_timestamp":111111111111}
```
3. Delete the `kv:store:xxx` key with the store value.


Note: A project's custom data stored keys may also be present.

### 5. Remove data from Search engine

If you are using Elasticsearch, each configured store has its index, which is installed automatically. An indexed name consists of the following parts:
- An optional prefix, which is defined by the SearchElasticsearchConstants::INDEX_PREFIX configuration option (for example, we use by default `spryker`).
- A store name.
- A configuration file name.
Index name components are delimited with an underscore, for example:  `spryker_xxx_page`.

The following indexes are available in the standard configuration (example: `xxx` -  store name):

- `spryker_xxx_merchant`.
- `spryker_xxx_page`.
- `spryker_xxx_product-review`.
- `spryker_xxx_return_reason`.

### 6. Resume P&S

Follow these steps to resume normal operations:

1. Restart the Cronjob scheduler through these commands:
Run:  
```bash
vendor/bin/console scheduler:resume
```
2. Disable maintenance mode by running the following command:
Run:
```bash
vendor/bin/console maintenance:disable
```


## Checklist

1. Make sure the deleted store is not available in the admin panel in the list.
2. Make sure that the store is not available through Yves.
