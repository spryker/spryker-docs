---
title: Delete stores
description: With this guide learn how you can delete stores that are configured within your Spryker Cloud Commerce OS project.
past_updated: Jun 26, 2023
template: howto-guide-template
last_updated: Nov 12, 2024
---

This document describes how to delete stores.

{% info_block warningBox %}

- When taking the following steps, consider `xxx` and `XXX` as the name of the store you are deleting.
- We recommend taking these steps in a test environment. Make sure to create a backup of the database and other storages.

{% endinfo_block %}

## When to delete a store

Occasionally, a store created earlier becomes unnecessary. It may be a store that was used for a brand, product, holiday, marketing promotions, or events.

On the technical side, removing a store helps with the following:
1. By deleting redundant data, which can take a lot of space, the shop's speed is increased. The load on it for the purposes of indexing and searching is also reduced.
2. Reducing wasted memory and your storage footprint.

## Prerequisites

[Install Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html)


## Back up the database

Back up the store's database and make sure it's recoverable. For instructions, see [Create and restore database backups](/docs/ca/dev/create-and-restore-database-backups.html).

## Suspend Publish and Sync

1. Enable the maintenance mode:

```bash
vendor/bin/console maintenance:enable
```

For more information about maintenance mode, see [Enable and disable maintenance mode](/docs/ca/dev/manage-maintenance-mode/enable-and-disable-maintenance-mode.html).

2. Check the number of messaged in RabbitMQ. If there are too many, wait for them to be processed.

3. Suspend Publish and Sync and the cronjob scheduler:

```bash
vendor/bin/console scheduler:suspend
```


## Clean data and configuration in related database tables


1. Because of the foreign key relationship with the store entity, delete the data from the following tables:
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

2. The store has new configuration tables that are used for the dynamic store configuration. Delete the configuration data from the following tables by the store's ID:
- `spy_locale_store`
- `spy_currency_store`
- `spy_country_store`

3. Delete the store's data in any other tables related to the project's features and custom functionality.
4. Remove the row with the store's data from the `spy_store` table.

## Clean the data in the key-value storage engine

With the Redis key-value storage, data is stored as keys that contain the store name. The key name follows this format: `kv:{resource-type}:{store}:{locale}:{key}`.

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


2. Adjust `kv:store_list` by removing the store's name from it's value.

For example, you have AT, DE, and XXX stores.

```json
{"stores":["AT","DE","XXX"],"_timestamp":111111111111}
```

To remove the XXX store, update `kv:store_list` as follows:

```json
{"stores":["AT","DE"],"_timestamp":111111111111}
```

3. Delete the `kv:store:xxx` key with the store data.

For example, you have `kv:store:xxx` in storage with some data. You need to delete it by the key.

```json
{"id_store":3,"name":"XXX","default_locale_iso_code":"en_US","default_currency_iso_code":"EUR","available_currency_iso_codes":["EUR"],"available_locale_iso_codes":["de_DE","en_US"],"stores_with_shared_persistence":[],"countries":["DE"],"country_names":["Germany"],"_timestamp":11111111111}
```

4. Delete any other store's keys related to the project's features and custom functionality.


## Remove data from the search engine

With Elasticsearch, each configured store has its index, which is installed automatically. An indexed name consists of the following parts:
- An optional prefix, which is defined by the `SearchElasticsearchConstants::INDEX_PREFIX` configuration option. For example, we use `spryker` by default.
- A store name.
- A configuration file name.

Index name components are delimited with an underscore—for example, `spryker_xxx_page`.

1. Delete the following standard indexes in the search engine:

- `spryker_xxx_merchant`.
- `spryker_xxx_page`.
- `spryker_xxx_product-review`.
- `spryker_xxx_return_reason`.

2. Delete the any other store's indexes related to the project's features and custom functionality.


## Resume P&S

1. Restart the Cronjob scheduler:

```bash
vendor/bin/console scheduler:resume
```

2. Disable the maintenance mode:

```bash
vendor/bin/console maintenance:disable
```


## Verify that the store is deleted

1. In the Back Office, go to **Administration** > **Stores**.
    Make sure the deleted store is not in the list.
3. Make sure that the store is not available on the Storefront.
