---
title: Delete stores
description: This document shows how to delete a store
past_updated: Jun 26, 2023
template: howto-guide-template
---

{% info_block warningBox %}

Dynamic Multistore is currently running under an *Early Access Release*. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

{% info_block infoBox %}

* When taking the following steps, consider `xxx` and `XXX` as the name of the store you are deleting.
* We recommend taking these steps in a test environment. Make sure to create a backup of the database and other storages.

{% endinfo_block %}

This document describes how to delete stores.

## When to delete a store

Occasionally, a store created earlier becomes unnecessary. It may be a store that was used for a brand, product, holiday, marketing promotions, or events.

On the technical side, removing a store helps with the following:
1. By deleting redundant data, which can take a lot of space, the shop's speed is increased. The load on it for the purposes of indexing and searching is also reduced.
2. Reducing wasted memory and your storage footprint.

## Prerequisites

[Install Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html)


## Back up the database

Back up the store's database and make sure it's recoverable. For instructions, see [Create and restore database backups](/docs/cloud/dev/spryker-cloud-commerce-os/create-and-restore-database-backups.html).

## Suspend Publish and Sync

1. Enable the maintenance mode:
```bash
vendor/bin/console maintenance:enable
```

For more information about maintenance mode, see [Enable and disable maintenance mode](/docs/cloud/dev/spryker-cloud-commerce-os/manage-maintenance-mode/enable-and-disable-maintenance-mode.html).

2. Check the number of messaged in RabbitMQ. If there are too many, wait for them to be processed.

3. Suspend Publish and Sync and the cronjob scheduler:

```bash
vendor/bin/console scheduler:suspend
```


## Cleaning data and configuration in related database tables

{% info_block infoBox %}

The database data to modify in this section is relevant to the default configuration. Depending on the features your project has, you may need to modify more data.

{% endinfo_block %}


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

The Redis data to modify in this section is relevant to the default configuration. Depending on the features your project has, you may need to modify more data.

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

## Remove data from the search engine

With Elasticsearch, each configured store has its index, which is installed automatically. An indexed name consists of the following parts:
- An optional prefix, which is defined by the `SearchElasticsearchConstants::INDEX_PREFIX` configuration option. For example, we use `spryker` by default.
- A store name.
- A configuration file name.

Index name components are delimited with an underscore—for example, `spryker_xxx_page`.

The following indexes are available in the standard configuration:

- `spryker_xxx_merchant`.
- `spryker_xxx_page`.
- `spryker_xxx_product-review`.
- `spryker_xxx_return_reason`.

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
