---
title: "HowTo: Delete store when using the dynamic store feature"
description: This document shows how to delete store when the system is running with a dynamic store feature.
past_updated: Jun 26, 2023
template: howto-guide-template
---

This document describes the steps to consider how manually delete store in spryker when using dynamic store.

## When it might be useful

Often, the store that was created earlier becomes unnecessary. It can be a store that has been used for a brand, product, holiday, or marketing promotions or events аnd ending experiments with no production environment. 

On the technical side, removing such a store helps:
1. Increasing the speed of the store and deleting redundant data.
2. Reduction of memory and storage footprint.


## Step-by-step plan

**To check all your actions, it is better to perform all actions in a test environment. And also provide a backup of the database and other storages if necessary.**

### 1. Backup Database.

Before starting the process, you need to back up the database and check the possibility of recovery from it.
If you are using AWS RDS, follow by link [Create and restore database backups](/docs/cloud/dev/spryker-cloud-commerce-os/create-and-restore-database-backups.html). 


### 2. Suspend P&S.

In order to reduce the risks of data synchronization errors, you can suspend data synchronization through P&S.
Make sure there are not too many messages in the RabbitMQ.
Then suspend `queue:worker:start` command.
If you use Jenkins to run, you can stop the following commands by disabling the project. `XXX__queue-worker-start`.  `XXX`  - is the store name.


### 3. Database. 

#### 3.1 Cleaning data in related database tables. 

The number of tables that use relation with the `spy_store` table may depend on the use of the functionality and depends on the installed modules.

The list of available tables that may contain a foreign key relationship:
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

### 3.2 Deleting relations in configuration tables

Store has new configuration tables that were used for dynamic store:
- `spy_locale_store`
- `spy_currency_store`
- `spy_country_store`

Please delete all records related to the store.


### 3.3 Clearing data in other project tables.

Also, you may have other related tables used in the project, don't forget to check them and delete data from them.
 
### 4. Cleaning data in the key-value storage engine.

Data is stored with keys that contain the name store. If you use Redis as a key-value store.
The key name follows this format: `kv:{store}:{locale}:{resource-type}:{key}`.

`XXX` - name of the store will be used as an example.

Data stored in Redis that should be deleted includes the following:
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
- Adjust `kv:store_list:` and delete store name XXX values in stores. `{"stores":["AT","DE","XXX"],"_timestamp":111111111111}` 
- Delete key `kv:store:xxx` with value about store. 


Note: Project custom data stored keyes  may also be present. Please check it in detail.

### 5. Remove data from Search engine

If you using Elasticsearch, each configured store has its index, which is installed automatically. An index name consists of the following parts:
- An optional prefix, which is defined by the SearchElasticsearchConstants::INDEX_PREFIX configuration option (for example, we use by default `spryker`).
- A store name.
- A configuration file name.
Index name components are delimited with an underscore—for example:  `spryker_xxx_page`.

The following indexes are available in the standard configuration (example: `xxx` -  store name): 

- `spryker_xxx_merchant`.
- `spryker_xxx_page`.
- `spryker_xxx_product-review`.
- `spryker_xxx_return_reason`.

### 6. Start P&S 

Please, resume P&S.
If you use Jenkins to run command, you can enable the following commands by enable the project in Jenkins. 
For example: `XXX__queue-worker-start`.  `XXX`  - is the store name.



## Checklists 

1. Make sure the deleted store is not available in the admin panel in the list
2. Make sure that the store is not available through Yves.