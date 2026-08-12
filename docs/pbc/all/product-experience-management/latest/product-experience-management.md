---
title: Product Experience Management
description: Import and export product data through a backoffice UI using CSV files with schema-driven column mapping.
last_updated: Aug 12 2026
template: concept-topic-template
---

The *Product Experience Management* (PEM) capability lets Back Office users import and export product data in bulk through a guided CSV-based workflow. It provides a schema-driven approach to column mapping, batch processing, and per-row error reporting.

## Terminology

The following terms are used throughout the PEM feature:

| TERM | DEFINITION |
| --- | --- |
| Import job | A reusable definition that specifies the product type (for example, *products-csv-import*) and the column schema used to map CSV headers to system properties. An import job is created once and referenced when uploading CSV files. |
| Import job run | A single execution of an import job. Each run is linked to an uploaded CSV file and tracks processing status, row counts, and errors. Runs are processed asynchronously by the `import:job:run` console command. |
| Import step | A unit of work in the import pipeline. Each step handles a specific data domain (for example, abstract product, concrete product, prices, images). Steps validate, transform, and persist rows in batches. |
| Export step | The export counterpart of an import step. Each export step fetches data from the database and populates the corresponding columns in the exported CSV. |
| Schema | A JSON-encoded column mapping definition stored on the import job. It maps human-readable CSV header names (for example, `Name ({locale})`) to system property names (for example, `name.{locale}`). Placeholders like `{locale}`, `{store}`, and `{sort_order}` are expanded at export time based on actual system data. |
| Schema plugin | A plugin that provides the schema definition, import steps, and export steps for a specific product type. The built-in `ProductCsvImportSchemaPlugin` handles the *products-csv-import* type. |

## Feature overview

### Import workflow

1. A Back Office user creates an import job that defines the product type and column schema.
2. The user uploads a CSV file against the import job, which creates an import job run with *pending* status.
3. The `import:job:run` console command picks up the oldest pending run, marks it as *processing*, and reads the CSV file.
4. CSV headers are mapped to system property names using the job's schema. Each batch of rows passes through the configured import steps.
5. Import steps validate, transform, and persist data. Per-row errors are recorded in the database.
6. After processing, the run is marked as *done* or *failed* with final row counts.

### Export workflow

1. A Back Office user selects an import job and triggers an export.
2. The system resolves the job's schema, expands placeholder-based column patterns using actual system values (locales, stores, currencies, warehouses, image sort orders, etc), and generates concrete column headers.
3. Export steps fetch data from the database in batches and populate each column.
4. The resulting CSV file is stored in the configured filesystem and streamed to the user for download.

### Template download

Users can download an empty CSV template for any import job. The template contains only the column headers (with placeholders expanded) and no data rows, so users can see the expected format before preparing their import file.

### Supported product data

For the *products-csv-import* schema, the following data is imported and exported:

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

### Import file structure

Each CSV row describes either an abstract product or a concrete product, never both:

- A row with *Abstract SKU* filled in and *Concrete SKU* empty creates or updates the abstract product.
- A row with both *Abstract SKU* and *Concrete SKU* filled in creates or updates the concrete product and assigns it to the abstract product identified by the abstract SKU.

To import an abstract product together with its concrete products in one file, place them in separate rows: one row for the abstract product, followed by one row per concrete product. The abstract product is imported before the concrete products, so both can be in the same file:

| ABSTRACT SKU | CONCRETE SKU | PRODUCT STATUS |
| --- | --- | --- |
| 001 |  | approved |
| 001 | 001_25904006 | active |
| 001 | 001_25904007 | active |
| 001 | 001_25904008 | active |

{% info_block infoBox "Info" %}

If a row contains a concrete SKU but no abstract SKU, the concrete SKU is also used as the abstract SKU. In this case, the abstract product with that SKU must already exist.

{% endinfo_block %}

Because the row type determines which data is imported, some columns are only processed in one of the two row types:

| COLUMNS | PROCESSED IN |
| --- | --- |
| *Merchant*, *Stores*, *Categories*, *Tax Set Name*, *URL ({locale})* | Abstract product rows |
| *Stock ({warehouse})*, *Shipment Types* | Concrete product rows |
| *Product Status*, *Name ({locale})*, *Description ({locale})*, *Attributes ({locale})*, *Price (…)*, *Image {size} (…)* | Both row types |

### Product statuses

The values accepted in the *Product Status* column depend on the row type. Values are case insensitive.

| ROW TYPE | ACCEPTED VALUES | RESULT |
| --- | --- | --- |
| Abstract product row: *Concrete SKU* is empty | `draft`, `waiting_for_approval`, `approved`, `denied` | Sets the approval status of the abstract product. |
| Concrete product row: *Concrete SKU* is filled in | `active`, `inactive` | `active` activates the concrete product, `inactive` deactivates it. |

*Product Status* is required in every row. If the value is empty or does not belong to the accepted values for the row type, the row is skipped and an error is reported. For example, `active` in an abstract product row and `approved` in a concrete product row both fail validation.

You can override the accepted values on the project level in `ProductExperienceManagementConfig::getProductAbstractStatuses()` and `ProductExperienceManagementConfig::getProductConcreteStatuses()`.

### Error handling

When an import job run encounters invalid data, the row is skipped and an error is recorded with the CSV row number and a descriptive message. After all rows are processed, the run detail page shows:

- Total number of processed, successful, and failed rows.
- For a small number of errors, the errors are displayed inline on the page.
- For a large number of errors, the errors are available as a downloadable summary.

The error display threshold is configurable in the module's `ProductExperienceManagementConfig`.

## Related Developer documents

| INSTALLATION GUIDES |
| --- |
| [Install the Product Experience Management feature](/docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature.html) |
