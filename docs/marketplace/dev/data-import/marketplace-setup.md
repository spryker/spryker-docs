---
title: "Marketplace setup"
last_updated: May 28, 2021
description: The Marketplace setup category holds data required to set up the Marketplace environment.
template: import-file-template
---

The Marketplace setup category contains data required to set up the Marketplace environment.

The table below provides details on Marketplace setup data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILE(S) | DEPENDENCIES |
|-|-|-|-|-|
| Merchants | Imports basic merchant information. | `data:import merchant` | [merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html) | [merchant_profile.csv](/docs/marketplace/dev/data-import/file-details-merchant-profilecsv.html)  |
| Merchant profile | Imports merchant profile information. | `data:import merchant_profile`  | [merchant_profile.csv](/docs/marketplace/dev/data-import/file-details-merchant-profilecsv.html) | [merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html) |
| Merchant profile addresses | Imports merchant addresses. | `data:import merchant_profile_address` | merchant_profile_address.csv | [merchant_profile.csv](/docs/marketplace/dev/data-import/file-details-merchant-profilecsv.html) |
| Merchant opening hours | Imports default opening hours schedule. | `data:import merchant-opening-hours-weekday-schedule -f merchant_open_hours_week_day_schedule` | merchant_open_hours_week_day_schedule.csv | [merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html) |
|  | Imports special opening hours schedule including holidays. | `data:import merchant-opening-hours-date-schedule -f merchant_open_hours_date_schedule` | merchant_open_hours_date_schedule.csv | [merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html) |
| Merchant category | Imports merchant categories. | `data:import merchant_category` | merchant_category.csv | [merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html) |
| Merchant users | Imports merchant users of the merchant. | `data:import merchant_user` | merchant_user.csv | [merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html) |
| Merchant stores | Imports merchant stores. | `data:import merchant_store` | merchant_store.csv | <ul><li>[merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html)</li><li>`stores.php` configuration file of Demo Shop</li></ul> |
| Merchant stock | Imports merchant stock details. | `data:import merchant_stock`  | merchant_stock.csv  | <ul><li>[merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html)</li><li>[File details: warehouse.csv](https://documentation.spryker.com/docs/file-details-warehousecsv)</li></ul>  |
| Merchant OMS processes | Imports Merchant OMS processes. | `data:import merchant_oms_process` | merchant_oms_process.csv | <ul><li>[merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html)</li><li>OMS configuration that can be found at:<ul><li>project/config/Zed/oms project/config/Zed/StateMachine</li><li>project/config/Zed/StateMachin</li></ul></li>|
| Merchant product offer | Imports basic merchant product offer information. | `data:import merchant_product_offer` | merchant_product_offer.csv | <ul><li>[merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html)</li><li>[File details: product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv)</ul></li>  |
| Merchant product offer price | Imports product offer prices. | `data:import price-product-offer` |  price-product-offer.csv | <ul><li>File details: merchant_product_offer.csv</li><li>  product_price.csv</li></ul> |
| Merchant product offer stock | Imports merchant product stock. | `data:import product_offer_stock` | product_offer_stock.csv | <ul><li> File details: merchant_product_offer.csv</li><li>[File details: warehouse.csv](https://documentation.spryker.com/docs/file-details-warehousecsv)</li></ul>  |
| Merchant product offer stores | Imports merchant product offer stores. | `data:import merchant_product_offer_store` | merchant_product_offer_store.csv | <ul><li>File details: merchant_product_offer.csv</li><li>`stores.php` configuration file of Demo Shop</li></ul> |
| Validity of the merchant product offers | Imports the validity of the merchant   product offers. | `data:import product_offer_validity` |  product_offer_validity.csv | File details: merchant_product_offer.csv  |
| Merchant product offers | Imports full product offer information via a single file. | `data:import --config data/import/common/combined_merchant_product_offer_import_config_{store}.yml` | combined_merchant_product_offer.csv | <ul><li>[merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html)</li><li>`stores.php` configuration file of Demo Shop</li></ul> |
| Merchant products | Imports merchant products. | `data:import merchant_product` | merchant_product.csv | <ul><li>[merchant.csv](/docs/marketplace/dev/data-import/file-details-merchantcsv.html)</li><li>[File details: product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv)</li></ul> |
| Merchant order  | Updates the status of the merchant order item.  | `order-oms:status-import merchant-order-status` |[merchant-order-status.csv](/docs/marketplace/dev/data-import/file-details-merchant-order-statuscsv.html)|   |
