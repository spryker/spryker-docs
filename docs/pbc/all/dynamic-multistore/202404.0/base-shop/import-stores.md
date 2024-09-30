---
title: Add stores by importing data
description: This document shows how to import a store and related entities.
past_updated: Sep 25, 2024
template: howto-guide-template
last_updated: Oct 1, 2024
---

This document describes how to import a store with related entities.

{% info_block warningBox %}

Dynamic Multistore is currently running under an *Early Access Release*. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

This document outlines the minimum data set required for a new store, enabling customers to place orders.

To add a new store DE for region {REGION} perform data import for the following entities:
# Store configuration
- store

**data/import/common/{REGION}/store.csv**

```csv
name
DE
AT
```
- country-store
  
**data/import/common/DE/country_store.csv**

```csv
store_name,country
DE,DE
```
  
- currency-store
  
**data/import/common/DE/currency_store.csv**
  
```csv
currency_code,store_name,is_default
EUR,DE,1
```
  
- locale-store
  
**data/import/common/DE/locale_store.csv**
  
```csv
locale_name,store_name
en_US,DE
```
  
- default-locale-store
  
**data/import/common/DE/default_locale_store.csv**
  
```csv
locale_name,store_name
en_US,DE
```
# CMS entities

- cms-block-store

**data/import/common/DE/cms_block_store.csv**

```csv
block_key,store_name
blck-1,DE
blck-2,DE
blck-3,DE
```

- cms-page-store

**data/import/common/DE/cms_page_store.csv**

```csv
page_key,store_name
cms-page--1,DE
cms-page--2,DE
cms-page--3,DE
```

# Catalog entities

- data/import/common/DE/category_store.csv

Adding a store to a category adds it to child categories as well.

```csv
category_key,included_store_names,excluded_store_names
demoshop,DE,
```
- product-abstract-store

**data/import/common/DE/product_abstract_store.csv**

```csv
abstract_sku,store_name
001,DE
002,DE
003,DE
```
- merchant-product-offer-store

**data/import/common/DE/merchant_product_offer_store.csv**

```csv
product_offer_reference,store_name
offer1,DE
offer2,DE
offer3,DE
```
- merchant-store

**data/import/common/DE/merchant_store.csv**

```csv
merchant_reference,store_name
MER000001,DE
MER000002,DE
```
- product-price

**data/import/common/DE/product_price.csv**

```csv
abstract_sku,concrete_sku,price_type,store,currency,value_net,value_gross,price_data.volume_prices
001,,DEFAULT,DE,EUR,8999,9999,
002,,DEFAULT,DE,EUR,8999,9999,
003,,DEFAULT,DE,EUR,5850,6500,
```
# Shipment

- shipment-type-store

**data/import/common/DE/shipment_type_store.csv**

```csv
shipment_type_key,store_name
pickup,DE
delivery,DE
```
- shipment-method-store

**data/import/common/DE/shipment_method_store.csv**

```csv
shipment_method_key,store
spryker_dummy_shipment-standard,DE
spryker_dummy_shipment-express,DE
```
- shipment-price

**data/import/common/DE/shipment_price.csv**

```csv
shipment_method_key,store,currency,value_net,value_gross
spryker_dummy_shipment-standard,DE,EUR,390,490
spryker_dummy_shipment-express,DE,EUR,490,590
```
# Payment

- payment-method-store

**data/import/common/DE/payment_method_store.csv**

```csv
payment_method_key,store
dummyPaymentInvoice,DE
dummyPaymentCreditCard,DE
dummyMarketplacePaymentInvoice,DE
```


Add entities to the following import action files:
- `data/import/common/commerce_setup_import_config_{REGION\STORE}.yml`
- `data/import/local/full\_{REGION\STORE}.yml`
- `data/import/production/full\_{SPRYKER\STORE}.yml`

```yaml
data_import:
    - data_entity: store
      source: data/import/common/DE/store.csv
    - data_entity: country-store
      source: data/import/common/DE/country_store.csv
    - data_entity: locale-store
      source: data/import/common/DE/locale_store.csv
    - data_entity: default-locale-store
      source: data/import/common/DE/default_locale_store.csv
    - data_entity: currency-store
      source: data/import/common/DE/currency_store.csv
    - data_entity: cms-block-store
      source: data/import/common/DE/cms_block_store.csv
    - data_entity: cms-page-store
      source: data/import/common/DE/cms_page_store.csv
    - data_entity: category-store
      source: data/import/common/DE/category_store.csv
    - data_entity: product-abstract-store
      source: data/import/common/DE/product_abstract_store.csv
    - data_entity: merchant-product-offer-store
      source: data/import/common/DE/merchant_product_offer_store.csv
    - data_entity: merchant-store
      source: data/import/common/DE/merchant_store.csv
    - data_entity: product-price
      source: data/import/common/DE/product_price.csv
    - data_entity: shipment-type-store
      source: data/import/common/DE/shipment_type_store.csv
    - data_entity: shipment-method-store
      source: data/import/common/DE/shipment_method_store.csv
    - data_entity: shipment-price
      source: data/import/common/DE/shipment_price.csv
    - data_entity: payment-method-store
      source: data/import/common/DE/payment_method_store.csv
