---
title: Exporting data
description: This document shows how to export data from a Spryker shop to an external system
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/exporting-data
originalArticleId: 0a38b991-f10c-4f6c-90db-247a62cda2e7
redirect_from:
  - /2021080/docs/exporting-data
  - /2021080/docs/en/exporting-data
  - /docs/exporting-data
  - /docs/en/exporting-data
related:
  - title: Sales Data Export feature integration
    link: docs/pbc/all/order-management-system/page.version/base-shop/install-and-upgrade/install-features/install-the-sales-data-export-feature.html
---

To quickly populate an external system like ERP or OMS with data from your Spryker shop, you can export it as CSV files from the Spryker shop and then import them into the external system.

You can export any of the following data in the CSV format:

* Orders
* Order items
* Order expenses

Spryker Data Export supports the multi-store functionality, so you can define which stores to export data for.


## Prerequisites

[Install the Sales Data Export feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-sales-data-export-feature.html).

## Defining the data to export

The YML export configuration file lets you define what information to export. The root of data export files is configured globally, and data export does not change it. The following can be exported:
* order
* order-item
* order-expense


By default, the YML export configuration file resides in `./data/export/config/`. The structure of the YML export configuration file is as follows:

```yml
defaults:
  filter_criteria: &default_filter_criteria
        order_created_at:  
            type: between
            from: '<order_created_at_date-time_from_value>'
            to: '<order_created_at_date-time_to_value>'

actions:  
   - data_entity: order
      destination: '{data_entity}s_<store_name_value_1>_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [<store_name_value_1>]
    - data_entity: order
      destination: '{data_entity}s_<store_name_value_2>_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [<store_name_value_2>]
    - data_entity: order
      destination: '{data_entity}s_<store_name_value_n>_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [<store_name_value_n>]

   - data_entity: order-item
      destination: '{data_entity}s_<store_name_value_1>_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [<store_name_value_1>]

   -  data_entity: order-expense             
      destination: '{data_entity}s_<store_name_value_1>_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [<store_name_value_1>]
```

The type of content to export is defined in the `actions` section by `data_entity` and can be any of the following:
* `order`
* `order-item`
* `order-expense`.

For an example, see the default configuration file: [order_export_config.yml](https://github.com/spryker-shop/suite/blob/master/data/export/production/order_export_config.yml).


## Defining the stores to export data from

To define the stores you want to export the order data for, specify them in `destination` for the specific data entities.

You _must_ create individual files for each data entity and each store if your filter criteria include `store_name`.

For example, to export the `order-expenses` data for the DE store and `order-items` data for DE and AT stores, the YML file looks like this:

```yml
defaults:
    filter_criteria: &default_filter_criteria
        order_created_at:
            type: between
            from: '2020-05-01 00:00:00'
            to: '2020-12-31 23:59:59'

actions:
    - data_entity: order-expense
      destination: '{data_entity}s_DE_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [DE]

    - data_entity: order-item
      destination: '{data_entity}s_DE_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [DE]
    - data_entity: order-item
      destination: '{data_entity}s_AT_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [AT]
  ```




## Defining the date and time range to export data for

The following sections of the YML configuration file let you define the date the date and time range to export data for per entity.


| SECTION | DESCRIPTION |
| - | - |
| actions | Inclusively defines the date and time range to export data for per entity. If you use the label `order_updated_at`, the range is relative to the date and time the order was updated at. |
| defaults | Defines the default date and time range to export data for. This range is used in case a data and time range is not provided for an entity. |

In the `actions` section of data export configuration file, you can define

```yml
  defaults:
  filter_criteria: &default_filter_criteria
        order_created_at:  
            type: between
            from: '2020-05-01 00:00:00'
            to: '2020-06-07 23:59:59'

actions:  
   - data_entity: order-expense
      destination: '{data_entity}s_DE.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: DE
    - data_entity: order-expense
      destination: '{data_entity}s_AT.{extension}'
      filter_criteria:
          order_created_at:  
            type: between
            from: '2020-05-15 00:00:00'
            to: '2020-05-15 23:59:59'
          store_name: AT
    ...
```

## Creating the export files


Run `console data:export --config file-name.yml`, where `file-name.yml` is the name of the YML export configuration file. The command creates export CSV files in the `./data/export/` folder for each `data_entity` of the YML file. For each store specified in the YML file, a separate file is created. For an example of how the export works, see [Structure of the YML export configuration file](#structure-of-the-yml-export-configuration-file).


When running the command for data export with this file, `console data:export --config order_export_config.yml`, exported CSV files are created in `data/export`. For each data entity and store, a separate file is generated:

* `order-expenses_AT.csv`
* `order-expenses_DE.csv`
* `order-items_AT.csv`
* `order-items_DE.csv`
* `orders_AT.csv`
* `orders_DE.csv`


## Overwriting existing CSV files upon repeated command run

When exporting data, the newly generated CSV files overwrite the existing ones. Currently, this behavior is not configurable.

If you want to generate new CSV files without overwriting eventual existing ones, you may use a `{timestamp}` tag in the name of the file to be generated. For example, if you use the default structure of the YAML export configuration file, upon repeated launch of the `console data:export --config file-name.yml`, the already existing export CSV files are generated with different file names according to the `{timestamp}` on the moment of its creation, and therefore are not overwritten.

And vice versa: if you want to overwrite the existing files, remove `{timestamp}` from the `destination` parameter of the YML file for the necessary `data_entity` items—for example:

Initial file:
```yml
defaults:
  filter_criteria: &default_filter_criteria
        order_created_at:  
            type: between
            from: '2020-05-01 08:00:00'
            to: '2020-06-07 08:00:00'

actions:  
   - data_entity: order-expense
      destination: '{data_entity}s_DE_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: DE
    - data_entity: order-expense
      destination: '{data_entity}s_AT_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: AT
    ...
```

File with the removed `{timestamp}`:
```yml
defaults:
  filter_criteria: &default_filter_criteria
        order_created_at:  
            type: between
            from: '2020-05-01 08:00:00'
            to: '2020-06-07 08:00:00'

actions:  
   - data_entity: order-expense
      destination: '{data_entity}s_DE.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: DE
    - data_entity: order-expense
      destination: '{data_entity}s_AT.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: AT
    ...
 ```
