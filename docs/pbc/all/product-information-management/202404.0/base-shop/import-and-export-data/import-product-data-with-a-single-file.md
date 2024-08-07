---
title: Import product data with a single file
description: Learn how to import all main product data with a single file
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/importing-product-data-with-a-single-file
originalArticleId: 589f1dde-2516-4dc9-af6a-a9b171b6442e
redirect_from:
  - /docs/scos/dev/data-import/2022012.0/importing-product-data-with-a-single-file.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/import-product-data-with-a-single-file.html
---

Besides importing product-related data with multiple .csv files, like [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html), [product_abstract_store.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract-store.csv.html), [product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html), [product_price.csv](/docs/pbc/all/price-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-price.csv.html), etc., you can use a single product data import file, which allows you to import all main product information that needs to be added or updated, at once. This bulk product data import ability might be especially useful if you:

* Have different environments (production, staging, etc.), and you need to populate them all with the product data.
* Frequently import product data.
* Want to provide more autonomy to employees dealing with the administration of the products.

{% info_block warningBox "Prerequisites" %}

Before you can import all main product data, make sure that *combined_product* [importer is enabled](/docs/dg/dev/data-import/{{page.version}}/data-importers-implementation.html#implementation) in your project.

{% endinfo_block %}

To import combined product data via a single file, you need to:

* Populate a [CSV file for product data import](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-product-data-with-a-single-file.html#single-csv-file-for-combined-product-data-import).
* Prepare a [YML file](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-product-data-with-a-single-file.html#yml-configuration-file-for-product-data-import) with `data_entity` items for import.
* Run a [console command](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-product-data-with-a-single-file.html#console-commands-for-product-data-import) for product data import.

## Single .csv file for combined product data import
<a name="single-csv-file-for-combined-product-data-import"></a>

The CSV file for the main product data import contains product-related data that you can import into your system. Check out the [template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Importing+Product+Data+With+a+Single+File/TEMPLATE+Product+import+with+single+file.csv) of the file for details on the data it contains.

The headers in this file are prefixed with the names of the individual product-related import CSV files where they originally belong and contain field names that match those in the individual product import CSV files. The prefixes are separated from the field names by a dot, for example:

* `product_abstract_store.store_name` - corresponds to the `store_name` field in the `product_abstract_store.csv` file
* `product_abstract.category_key` - corresponds to the `category_key` field in the `product_abstract.csv` file
* `product_concrete.is_quantity_splittable` -  corresponds to the `is_quantity_splittable` field in the `product_concrete.csv` file

The only exceptions are `abstract_sku` and `concrete_sku` headers that are not prefixed.

Thus, the CSV file for the main product data import is a combination of data from separate product-related CSV files (except for a [few fields specific for just this file](#specific-fields)). Due to this, when importing corresponding data, the same [dependencies and mandatory fields](#mandatory-fields) as for the separate files, apply to the combined product data import file. For example, if you want to import product image data via the combined product data file (headers *productimage.imageset_name*, *productimage.externalurl_large*, etc.), you should mind the dependencies and mandatory fields as for [product_image.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-image.csv.html).

By default, the import CSV file resides in data/import/common/{STORE}/. As, for example, the [combined_product_DE.csv](https://github.com/spryker-shop/suite/blob/master/data/import/common/DE/combined_product.csv) file in Spryker Master Suite.

<a name="mandatory-fields"></a>

### Mandatory fields and dependencies

If you import only abstract products, the following fields must be populated in the combined product data import file:

* abstract_sku
* product_abstract.category_key
* product_abstract.url.{LOCALE}

For details on these and other product abstract-related fields, see [File details: product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).

If you import concrete products as well, the following fields are also mandatory:

* concrete_sku
* product.name.{LOCALE}
* product.attribute_key_{NUMBER}
* product.value_{NUMBER}

For details on these and other concrete product-related fields, see [File details: product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html).

All other fields with prefixes `product_abstract` and `product.` are optional.

If you need to import other product data as well, for example, prices, images, etc., see the table below for details on where you can take field descriptions, information about mandatory fields and data dependencies.


| FIELDS IN THE COMBINED PRODUCT DATA FILE | CSV FILE WITH DEPENDENCIES AND DETAILS ABOUT THE FIELD |
| --- | --- |
| <ul><li>product_group.group_key</li><li>product_group.position</li></ul> | [File details: product_group.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-group.csv.html) |
|<ul><li>product_image.image_set_name</li><li>product_image.external_url_large</li><li>product_image.external_url_small</li><li>product_image.locale</li><li>product_image.sort_order</li><li>product_image.product_image_key</li><li>product_image.product_image_set_key</li></ul> | [File details: product_image.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-image.csv.html) |
| <ul><li>product_price.price_type</li><li>product_price.store</li><li>product_price.currency</li><li>product_price.value_net</li><li>product_price.value_gross</li><li>product_price.price_data.volume_prices</li></ul> | [File details: product_price.csv](/docs/pbc/all/price-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-price.csv.html) |
| <ul><li>product_stock.name</li><li>product_stock.quantity</li><li>product_stock.is_never_out_of_stock</li><li>product_stock.is_bundle</li></ul> | [File details: product_stock.csv](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-stock.csv.html) |

<a name="specific-fields"></a>

### Specific fields of the all product data import file

The combined product data import file contains three additional fields that are not available in individual product import files:

* product.assigned_product_type
* product_price.assigned_product_type
* product_image.assigned_product_type

These fields can have the following values: *abstract, concrete*, and *both* that indicate what product types you import the data for. For example, if you have set *both* for the `product.assigned_product_type` field, it means that data from all fields with prefix `product.` (for example, `product.name.{LOCALE}`, `product.attribute_key_{NUMBER}`) will be imported for both abstract and concrete products. Likewise, you can import data for fields with prefix `product., product_price.`, `product_image.` for just *abstract* or *concrete* products.

{% info_block infoBox %}

Depending on the product types you specified for the `product.assigned_product_type`, `product_price.assigned_product_type`, `product_image.assigned_product_type` fields, make sure you have the corresponding `abstract_sku` and `concrete_sku` fields populated. For example, If you specified *both* product types, you must populate the `abstract_sku` and `concrete_sku` fields.

{% endinfo_block %}

## YML configuration file for product data import
<a href="#yml-configuration-file-for-product-data-import"></a>

The YML configuration file for product data import allows sequentially running importers for product data. This file can be used to import all product-related data sets, or just some of them. See [Console Commands for Product Data Import](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-product-data-with-a-single-file.html#console-commands-for-product-data-import) for details.

The `data_entity` names in the YML file match the prefixes (text before `.` ) in the combined product data import CSV file, with `combined-` added before them:

```yml
..
actions:
    - data_entity: combined-product-abstract
      source: data/import/common/DE/combined_product.csv
    - data_entity: combined-product-abstract-store
      source: data/import/common/DE/combined_product.csv
    - data_entity: combined-product-concrete
      source: data/import/common/DE/combined_product.csv
    - data_entity: combined-product-image
      source: data/import/common/DE/combined_product.csv
    - data_entity: combined-product-price
      source: data/import/common/DE/combined_product.csv
    - data_entity: combined-product-stock
      source: data/import/common/DE/combined_product.csv
    - data_entity: combined-product-group
      source: data/import/common/DE/combined_product.csv
...
```

By default, the configuration YML file resides in `data/import/common`.  As, for example, the [combined_product_import_config_EU.yml](https://github.com/spryker-shop/suite/blob/master/data/import/common/combined_product_import_config_EU.yml) file in Spryker Master Suite.

## Console commands for product data import

To import **all** product-related data from the YML configuration command, run the command `console data:import --config=xxx/ccc/file-name.yml -t`, where `xxx/ccc/file-name.yml` is the location of the YML file with the product data.

To import data for a **specific entity** only, specify the `data_entity` name after `data:import` in the command above. For example, if you want to import data for `combined-product-concrete` data entity only, your command should like this: `console data:import combined-product-concrete --config=xxx/ccc/file-name.yml -t`.
