---
title: Back Office glossary CSV import and export feature overview
description: Import and export glossary keys and their translations in bulk through the Back Office using CSV files with one translation column per locale.
last_updated: Nov 19, 2026
template: concept-topic-template
---

The *Back Office Glossary CSV Import and Export* feature lets Back Office users import and export glossary keys and their translations in bulk through CSV files. It is the glossary data type of the [Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html) feature: the engine stores import jobs and runs, processes uploaded files in batches, records per-row errors, and provides the Back Office **Import & Export** pages, while this feature contributes the *glossary-csv-import* job type through the `Glossary` module, provided by `GlossaryCsvImportSchemaPlugin`.

For the import and export workflow, the template download, and the error handling, see [Data Exchange Jobs feature overview](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html). To manage single translations in the Back Office, see [Manage translations in the Back Office](/docs/pbc/all/miscellaneous/latest/manage-in-the-back-office/manage-translations-in-the-back-office.html). To load the glossary during a deployment from `glossary.csv`, see [Import file details: glossary.csv](/docs/pbc/all/miscellaneous/latest/import-and-export-data/import-file-details-glossary.csv.html).

## Supported glossary data

| DATA | IMPORT | EXPORT | SCOPE |
| --- | --- | --- | --- |
| Glossary keys | Yes | Yes | A key is created when it does not exist; keys are created active. |
| Translations | Yes | Yes | One column per locale of the shop. |

## Import file structure

Each CSV row describes one glossary key with its translations. The file has the *Key* column and one *Translation ({locale})* column per locale of the shop, for example *Translation (EN-US)* and *Translation (DE-DE)*. To check the expected structure, download the template of the import job or export the existing keys: the exported file uses the same structure as the import file.

| KEY | TRANSLATION (EN-US) | TRANSLATION (DE-DE) |
| --- | --- | --- |
| cart.empty | Your cart is empty | Dein Warenkorb ist leer |
| cart.total | Total amount including VAT | Gesamtbetrag inkl. MwSt. |
| cart.checkout | Checkout | |

The rows are processed as follows:

| COLUMN | RULE |
| --- | --- |
| *Key* | Required, at most 255 characters. A key that does not exist is created, an existing key is updated. Keys match regardless of case: `Cart.Total` and `cart.total` are the same key. A row whose key differs from the stored key, or from an earlier row of the file, only in case is skipped and the error names the spelling to use. |
| *Translation ({locale})* | A filled cell creates or updates the translation of that locale. An empty cell keeps the current translation and creates none. Spaces only count as empty. |

A key that is new to the shop needs at least one filled translation cell; a row of an existing key may leave every translation cell empty, which keeps its translations, so an exported file imports back unchanged. When the same key appears in several rows of a file, every row is applied in file order and the last filled cell of a locale wins; an empty cell of a later row keeps the value of an earlier row.

## Import steps and publishing

The job type runs three steps per batch of rows:

1. The validation step rejects the rows with an empty or too long key and the rows of new keys without a translation; when the *Key* column is missing or a translation column names a locale the shop does not have, every row of the batch is rejected.
2. The key step creates the keys the shop does not have and rejects the rows whose key spelling conflicts with a stored key or with an earlier row.
3. The translation step writes the translations that changed and collects a publish event for every key whose translations changed; the engine triggers the events after the batch, so the storefront receives the changed keys through Publish and Synchronize while the run is still going. A key whose translations did not change is not published.

A rejected row is reported with its row number and the reason, and nothing is written for it; the other rows of the batch are imported.

## Export

The export writes one row per glossary key of the shop, in the order the keys were created, with the translation columns of the locales the job's schema contains. A key without a translation in a locale gets an empty cell. The exported file can be imported again without errors and without changes.

## Placeholders in the glossary schema

| COLUMN PATTERN | PLACEHOLDER VALUES |
| --- | --- |
| `Translation ({locale})` | `{locale}`: every available locale of the shop, provided by `GlossaryCsvPlaceholderProvider` of the `Glossary` module. |

## Related Developer documents

| INSTALLATION GUIDES | TUTORIALS AND HOWTOS |
| --- | --- |
| [Install the Back Office Glossary CSV Import and Export feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-back-office-glossary-csv-import-and-export-feature.html) | [Add a custom data type to Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/tutorials-and-howtos/add-a-custom-data-type-to-data-exchange-jobs.html) |
| [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html) | |
