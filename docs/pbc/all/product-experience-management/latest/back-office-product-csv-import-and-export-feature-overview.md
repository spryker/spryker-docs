---
title: Back Office product CSV import and export feature overview
description: Import and export product data in bulk through the Back Office using CSV files with schema-driven column mapping.
last_updated: Nov 17, 2026
template: concept-topic-template
---

The *Back Office Product CSV Import and Export* feature lets Back Office users import and export product data in bulk through CSV files. It is the product data type of the [Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html) feature: the engine stores import jobs and runs, processes uploaded files in batches, records per-row errors, and provides the Back Office **Import & Export** pages, while this feature contributes two job types through the `ProductExperienceManagement` module: *products-csv-import* with one row per abstract or concrete product, provided by `ProductCsvImportSchemaPlugin`, and *simple-product-csv-import* with one row per simple product, provided by `SimpleProductCsvImportSchemaPlugin`. Both types share the column schema, the import steps, and the export steps; see [Simple product CSV](#simple-product-csv) for the differences.

For the import and export workflow, the template download, and the error handling, see [Data Exchange Jobs feature overview](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html). To manage products programmatically instead of through files, see [Products Backend API](/docs/pbc/all/product-experience-management/latest/products-backend-api.html).

## Supported product data

For both schemas, the following data is imported and exported:

| DATA | IMPORT | EXPORT | SCOPE |
| --- | --- | --- | --- |
| Abstract and concrete products | Yes | Yes | Core product data, approval status, active state |
| Localized names and descriptions | Yes | Yes | Per locale |
| Localized attributes | Yes | Yes | Per locale, key=value format separated by semicolons |
| Store assignments | Yes | Yes | Semicolon-separated store names |
| Categories | Yes | Yes | Category keys |
| Tax sets | Yes | Yes | Tax set name |
| URLs | Yes | Yes | Per locale |
| Prices | Yes | Yes | Per price mode, store, currency, and dimension (gross/net) |
| Stock | Yes | Yes | Per warehouse, numeric quantity or NOOS (Never Out Of Stock) |
| Shipment types | Yes | Yes | Shipment type keys |
| Product images | Yes | Yes | Per locale and sort order, for both abstract and concrete products |
| Merchant assignments | Yes | Yes | Merchant reference |

## Import file structure

To check the expected file structure, export the existing products of the import job. The exported file uses the same structure as the import file, so it shows how abstract and concrete products of your shop are represented across rows and which values the columns contain.

Each CSV row describes either an abstract product or a concrete product, never both:

- A row with *Abstract SKU* filled in and *Concrete SKU* empty creates or updates the abstract product.
- A row with both *Abstract SKU* and *Concrete SKU* filled in creates or updates the concrete product and assigns it to the abstract product identified by the abstract SKU.

To import an abstract product together with its concrete products in one file, place them in separate rows: one row for the abstract product, followed by one row per concrete product. The abstract product is imported before the concrete products, so both can be in the same file:

| ABSTRACT SKU | CONCRETE SKU | APPROVAL STATUS | PRODUCT STATUS |
| --- | --- | --- | --- |
| 001 |  | approved |  |
| 001 | 001_25904006 |  | active |
| 001 | 001_25904007 |  | active |
| 001 | 001_25904008 |  | active |

An abstract product row is only needed for abstract products you want to create or update. If the abstract product already exists in the system, you can import concrete products for it without adding an abstract product row: enter the SKU of the existing abstract product in the *Abstract SKU* column of each concrete product row. The following file adds two concrete products to the existing abstract product `001`:

| ABSTRACT SKU | CONCRETE SKU | APPROVAL STATUS | PRODUCT STATUS |
| --- | --- | --- | --- |
| 001 | 001_25904006 |  | active |
| 001 | 001_25904007 |  | active |

{% info_block infoBox "Info" %}

If a row contains a concrete SKU but no abstract SKU, the concrete SKU is also used as the abstract SKU. In this case, the abstract product with that SKU must already exist.

{% endinfo_block %}

Because the row type determines which data is imported, some columns are only processed in one of the two row types:

| COLUMNS | PROCESSED IN |
| --- | --- |
| *Approval Status*, *Merchant*, *Stores*, *Categories*, *Tax Set Name*, *URL ({locale})* | Abstract product rows |
| *Product Status*, *Stock ({warehouse})*, *Shipment Types* | Concrete product rows |
| *Name ({locale})*, *Description ({locale})*, *Attributes ({locale})*, *Price (…)*, *Image {size} (…)* | Both row types |

## Product statuses

The two product levels have their own status column. Values are case insensitive.

| COLUMN | ROW TYPE | ACCEPTED VALUES | RESULT |
| --- | --- | --- | --- |
| *Approval Status* | Abstract product row: *Concrete SKU* is empty | `draft`, `waiting_for_approval`, `approved`, `denied` | Sets the approval status of the abstract product. |
| *Product Status* | Concrete product row: *Concrete SKU* is filled in | `active`, `inactive` | `active` activates the concrete product, `inactive` deactivates it. |

*Approval Status* is required in every abstract product row and *Product Status* in every concrete product row; the other status column of a row is ignored. If the required value is empty or does not belong to the accepted values, the row is skipped and an error is reported. For example, `active` in *Approval Status* and `approved` in *Product Status* both fail validation. The export fills *Approval Status* in abstract product rows and *Product Status* in concrete product rows.

{% info_block infoBox "Info" %}

Up to version 5.* of the `ProductExperienceManagement` module, the product CSV had the *Product Status* column only, and an abstract product row carried its approval status there. See [Upgrade the ProductExperienceManagement module](/docs/pbc/all/product-experience-management/latest/install/upgrade-the-productexperiencemanagement-module.html).

{% endinfo_block %}

The approval statuses of abstract products come from the [Product Approval Process](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-approval-process-feature.html) feature, which the Product Experience Management feature requires. The statuses accepted for concrete products, and the one that activates a concrete product, are defined by `getProductConcreteStatuses()` and `getProductConcreteStatusActive()` in the module's `ProductExperienceManagementConfig`.

## Simple product CSV

A *simple product* is an abstract product with one concrete product. For catalogs that consist of simple products, the *simple-product-csv-import* job type describes each product in one row instead of an abstract product row followed by a concrete product row. The row is imported as both the abstract product and its concrete product, so a value in a column applies to both: the name, the description, the attributes, the prices, and the images are written to the abstract and the concrete product, while the columns processed in one row type only are written to the product they belong to. A new SKU creates the product, an existing SKU updates it. Because a simple product has exactly one concrete product, the job type imports only such products: a row is rejected when its abstract product already has a concrete product with another SKU, when its concrete product belongs to another abstract product, or when an earlier row of the same batch imports the same abstract product with another concrete product. A rejected row is reported with the row number and nothing is written for it. Products with several concrete products are imported with the *products-csv-import* type.

The schema has the same columns as *products-csv-import*. Because the row describes both products, every column is processed, and the SKU columns differ as follows:

| COLUMN | MEANING IN SIMPLE PRODUCT CSV |
| --- | --- |
| *Abstract SKU* | Required. The SKU of the abstract product. |
| *Concrete SKU* | Required. The SKU of the concrete product that the row creates or updates; it is assigned to the abstract product of the row. |
| *Approval Status* | Required. The approval status of the abstract product. |
| *Product Status* | Required. The status of the concrete product. |

The following file creates one simple product and updates the price and the stock of another one:

| ABSTRACT SKU | CONCRETE SKU | APPROVAL STATUS | PRODUCT STATUS | STORES | TAX SET NAME | PRICE (DEFAULT-DE-EUR-GROSS) |
| --- | --- | --- | --- | --- | --- | --- |
| simple-001 | simple-001-1 | approved | active | DE;AT | Standard Taxes | 2490 |
| simple-002 | simple-002-1 | approved | active | DE | Standard Taxes | 1990 |

A row with an empty *Abstract SKU* or an empty *Concrete SKU* is skipped and reported as an error. Every other value is validated by the same rules as in *products-csv-import*.

The export of the *simple-product-csv-import* type contains only the abstract products with exactly one concrete product, one row per product, with *Approval Status* taken from the abstract product and *Product Status* from the concrete product. Abstract products with several concrete products are left out; export them with the *products-csv-import* type.

## Placeholders in the product schema

Both product schemas use placeholders in their column headers. The values come from `ProductCsvExportPlaceholderProvider` of the `ProductExperienceManagement` module and reflect the data of the shop at the time the template or the export is generated.

<div class="width-100">

| COLUMN PATTERN | PLACEHOLDER VALUES |
| --- | --- |
| `Name ({locale})`, `Description ({locale})`, `URL ({locale})`, `Attributes ({locale})` | `{locale}`: every locale of the stores. |
| `Price ({price_mode}-{store}-{currency}-{price_dimension})` | `{price_mode}`: the price modes; `{store}`: every store; `{currency}`: every currency of the stores; `{price_dimension}`: `Gross` and `Net`. |
| `Stock ({warehouse})` | `{warehouse}`: every warehouse. |
| `Image {size} ({locale}-{sort_order})` | `{size}`: `Small` and `Large`; `{locale}`: every locale; `{sort_order}`: the sort orders of the product images in the shop. |

</div>

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES | TUTORIALS AND HOWTOS |
| --- | --- | --- |
| [Install the Back Office Product CSV Import and Export feature](/docs/pbc/all/product-experience-management/latest/install/install-the-back-office-product-csv-import-and-export-feature.html) | [Upgrade the ProductExperienceManagement module](/docs/pbc/all/product-experience-management/latest/install/upgrade-the-productexperiencemanagement-module.html) | [Add a custom data type to Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/tutorials-and-howtos/add-a-custom-data-type-to-data-exchange-jobs.html) |
| [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html) | | |
