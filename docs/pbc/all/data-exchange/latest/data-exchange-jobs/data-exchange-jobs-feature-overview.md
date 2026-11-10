---
title: Data Exchange Jobs feature overview
description: Import and export data in bulk with schema-driven jobs, asynchronous runs, batch processing, and per-row error reporting, independent of the data type.
last_updated: Nov 5, 2026
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
3. The `import:job:run` console command, scheduled to run every minute, claims the oldest claimable run and marks it as *processing*. One invocation processes up to `getImportJobRunsPerInvocation()` runs (default 1) and exits; the next scheduled invocation continues with the runs still claimable. For details, see [Import run processing](#import-run-processing).
4. The engine reads the file in batches of 1000 rows. The headers are mapped to system property names using the job's schema; columns that are not part of the schema are ignored, and rows whose number of columns differs from the header row are recorded as errors.
5. Each batch passes through the import steps of the schema plugin in order. A step validates and persists its part of the row and reports an error for every row it rejects. After the batch has passed through all steps, the engine calls `resetCache()` on every step that implements `CacheResettableImportStepInterface`, so lookup caches live for one batch only.
6. After the last row, the engine triggers the publish events reported by the steps, so that Storefront data is updated once per entity. The rows themselves are committed as each step persists them; there is no transaction around the run.
7. The run is marked as *done* with the number of processed, successful, and failed rows. The run is marked as *failed* when no row was processed, when every row failed, or when a step threw an exception; the exception message is recorded as a run error. In that case the rows of the batches processed before the failure stay in the database, and the publish events collected so far are not triggered.

A row is counted as failed when at least one step rejected it. The other steps still process the row, so a data type should validate before it persists.

The post-processor plugins run after a completed import. An exception thrown by a post-processor is recorded as a run error and keeps the status of the run.

## Import run processing

Before processing a run, `import:job:run` claims it and holds it with a time-limited lease, so several workers can run the command in parallel without processing the same run twice. When an invocation processes several runs, it claims each run separately.

- **Claim:** The worker picks the oldest claimable run: a *pending* run, or a *processing* run whose lease is not set or has expired because its worker stopped. The claim is a conditional update: if another worker claims the same run first, the update affects no row and the worker does nothing. A successful claim sets `claimed_by` to a unique worker token and `lease_expires_at` to now plus `getImportJobRunLeaseDurationInMinutes()` (default 5 minutes), increments `attempt_count`, records `import_started_at`, and resets the counters of a previous attempt.
- **Progress:** After every batch, the worker writes the processed, successful, and failed line counters and `number_of_processed_bytes`, and renews the lease. Each write applies only while `claimed_by` still holds the token of the worker.
- **Progress percentage:** `ImportJobRunTransfer.progressPercentage` is the number of processed bytes divided by the file size, capped at 100. It is `null` when the processed bytes or the file size are unknown, for example, for an empty file.
- **Retries:** A run whose worker stopped is reclaimed by the next worker once the lease expires, and the import of the file starts again from the first row. A run is claimed at most `getImportJobRunMaxAttempts()` times (default 3); a run that reached this number is not claimed again. Runs marked as *failed* are not retried.
- **Lost claim:** When another worker has taken over the run, the progress write of the original worker affects no row. The original worker stops before the next batch without an error. The final *done* or *failed* status is written under the same condition: when the claim is lost, the worker doesn't overwrite the result of the other worker, records no error, and doesn't execute the post-processor plugins. The publish events collected from the batches processed so far are still triggered.

The lease is renewed after every batch, so it must exceed the longest time between two renewals: the pre-processors plus the first batch, or any later batch. Otherwise, a run that is still being processed is reclaimed by another worker. If one batch can take longer than the lease, increase the lease duration or decrease `getImportCsvBatchSize()` (default 1000 rows). Lease timestamps are written and compared in the time zone returned by `getImportJobRunLeaseTimeZone()` (default UTC), regardless of the PHP default time zone of the worker.

## Limits and performance

- The `import:job:run` command processes up to `getImportJobRunsPerInvocation()` claimable runs per invocation, oldest first (default 1 in `DataExchangeConfig`), and exits; the next scheduled invocation continues the queue. With the default and the one-minute schedule, one worker processes about one run per minute; a pending run waits until the runs queued before it are done. To process several runs in parallel, run the command from several workers.
- The engine calls `resetCache()` after each batch, and once more when a run fails with an exception, on every import step that implements `CacheResettableImportStepInterface`, and disables Propel instance pooling for the duration of the run, so the lookup caches of the steps and the ORM instance pool do not grow with the number of rows. The publish events reported by the steps are collected until the end of the run.
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
