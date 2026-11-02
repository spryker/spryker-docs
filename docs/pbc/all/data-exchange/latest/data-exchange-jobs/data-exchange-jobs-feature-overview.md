---
title: Data Exchange Jobs feature overview
description: Import and export data in bulk with schema-driven jobs, asynchronous runs, batch processing, and per-row error reporting, independent of the data type.
last_updated: Oct 29, 2026
template: concept-topic-template
---

The *Data Exchange Jobs* feature lets you move data into and out of Spryker in bulk through files. A *job* defines what data is exchanged and which columns the file has, a *run* processes one uploaded file asynchronously, and every rejected row is recorded with its row number and reason. The feature is provided by the `DataExchange` module and is independent of the data it moves: the data types are plugged in by other modules. Products are the first data type, provided by the [Product Experience Management](/docs/pbc/all/product-experience-management/latest/product-experience-management.html) capability.

Back Office users manage jobs, runs, exports, and templates under **Import & Export**. The engine behind the pages exposes the same operations through its facade, so other interfaces can drive it.

## Terminology

| TERM | DEFINITION |
| --- | --- |
| Import job | A reusable definition that specifies the job type (for example, *products-csv-import*) and the column schema used to map file headers to system properties. An import job is created once and referenced when uploading files and when exporting. |
| Import job run | A single execution of an import job. Each run is linked to one uploaded CSV file and tracks the processing status, the row counts, and the errors. Runs are processed asynchronously by the `import:job:run` console command. |
| Job type | The key that links an import job to the schema plugin that handles its data, for example *products-csv-import*. |
| Schema | The list of columns of the file, stored on the import job when the job is created. Each column maps the header in the file (for example, `Name ({locale})`) to a system property name (for example, `name.{locale}`). |
| Placeholder | A variable part of a column header in curly braces, such as `{locale}` or `{store}`. A placeholder provider supplies the values, and the engine expands the column once per value when it builds the template and the export file. |
| Schema plugin | The plugin that provides the schema, the import steps, the placeholder provider, and optionally the export steps for one job type. A data type costs one schema plugin, one import step per concern, and one line in the project's dependency provider. |
| Import step | A unit of work in the import pipeline. Each step handles one concern of the data type (for example, the product itself, its prices, or its images) and receives every batch of rows in order. Steps validate and persist rows and report errors and publish events. |
| Export step | The export counterpart of an import step. Each export step fills the columns of its concern for a batch of rows. |

## Modules

| MODULE | RESPONSIBILITY |
| --- | --- |
| `spryker/data-exchange` | The engine: import jobs, job runs, run errors, the Back Office **Import & Export** pages, the `import:job:run` console command, batch processing, and file storage. |
| `spryker/data-exchange-extension` | The plugin interfaces a data type implements to plug into the engine. |
| `spryker-feature/product-experience-management` | The product data type: `ProductCsvImportSchemaPlugin` with the *products-csv-import* schema and the product import and export steps. See [Back Office product CSV import and export feature overview](/docs/pbc/all/product-experience-management/latest/back-office-product-csv-import-and-export-feature-overview.html). |

## Import workflow

1. A Back Office user creates an import job that defines the job type. The engine copies the schema of the matching schema plugin to the job.
2. The user uploads a CSV file against the import job. The engine stores the file and creates an import job run with the *pending* status.
3. The `import:job:run` console command, scheduled to run every minute, picks up the oldest pending run and marks it as *processing*.
4. The engine reads the file in batches of 1000 rows. The headers are mapped to system property names using the job's schema; columns that are not part of the schema are ignored, and rows whose number of columns differs from the header row are recorded as errors.
5. Each batch passes through the import steps of the schema plugin in order. A step validates and persists its part of the row and reports an error for every row it rejects.
6. After the last row, the engine triggers the publish events reported by the steps, so that Storefront data is updated once per entity. The rows themselves are committed as each step persists them; there is no transaction around the run.
7. The run is marked as *done* with the number of processed, successful, and failed rows. The run is marked as *failed* when no row was processed, when every row failed, or when a step threw an exception; the exception message is recorded as a run error. In that case the rows of the batches processed before the failure stay in the database, and the publish events collected so far are not triggered.

A row is counted as failed when at least one step rejected it. The other steps still process the row, so a data type should validate before it persists.

## Limits and performance

- The `import:job:run` command processes one run per call. With the one-minute schedule, one consumer processes about one run per minute; a pending run waits until the runs queued before it are done.
- The import reads the file in batches; the batch size is `getImportCsvBatchSize()` in `DataExchangeConfig` (default 1000 rows). The maximum upload size is `getImportMaxFileSizeString()` (default 50 MB).
- The export runs synchronously inside the HTTP request of the **Export** page and pages through the data with `getExportCsvBatchSize()` (default 1000 rows). A very large export can hit the web server timeout or the PHP memory limit; split such data sets by job or raise the limits for the Back Office.

## Export workflow

1. A Back Office user selects an import job on the **Export** page and triggers the export.
2. The engine resolves the schema of the job and expands the placeholders in the column headers with the values of the schema plugin's placeholder provider.
3. The export data provider of the schema plugin returns the rows in batches of 1000, and the export steps fill the columns.
4. The resulting CSV file is stored in the export filesystem and streamed to the user.

A job type is exportable only if a plugin implementing `ExportSchemaPluginInterface` is registered for it in `getExportSchemaPlugins()`. The **Export** page lists every import job; exporting a job whose type has no export plugin is rejected with an error.

## Template download

For every import job, users can download a CSV template that contains the header row with placeholders expanded and no data rows. The template shows the expected file format before the import file is prepared.

## Error handling

When a run rejects a row, the row is skipped and an error is recorded with the row number and a message. The run detail page shows the processed, successful, and failed row counts. Up to 10 errors are displayed inline; larger error sets are offered as a downloadable CSV file. The threshold is defined by `getImportErrorDisplayThreshold()` in `DataExchangeConfig`.

## Related Developer documents

| INSTALLATION GUIDES | TUTORIALS AND HOWTOS |
| --- | --- |
| [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html) | [Add a custom data type to Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/tutorials-and-howtos/add-a-custom-data-type-to-data-exchange-jobs.html) |
