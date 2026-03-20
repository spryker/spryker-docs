To quickly populate an external system like ERP or OMS with data from your Spryker shop, you can export it as CSV files from the Spryker shop and then import them into the external system.

You can export any of the following data in the CSV format:

* Orders
* Order items
* Order expenses

Spryker Data Export supports the multi-store functionality, so you can define which stores to export data for.


## Prerequisites

[Install the Sales Data Export feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-sales-data-export-feature.html).

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

## Defining the file names

Defining the file names to export data to is important when you are running the export multiple times. Existing data export files are overwritten by running a new export. So, if you want to keep several versions of the export files, you can use the `{timestamp}` tag in the file name. The timestamp tag adds a timestamp to the files names based on the time you run the export.


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

The other way around, if you want to overwrite the previous version of the export files, don't add the `{timestamp}` tag or change the `destination` in any other way.


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

To generate data export files, run the following command:

```bash
console data:export --config {{CONFIG_FILE_NAME}}
```

Example:

```bash
console data:export --config order_export_config.yml
```

This creates export CSV files in `./data/export/` per the defined configuration.