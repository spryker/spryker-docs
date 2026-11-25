---
title: Back Office category CSV import and export feature overview
description: Import and export the category tree in bulk through the Back Office using CSV files with one row per category, including stores, localized names, meta data, and images.
last_updated: Nov 25, 2026
template: concept-topic-template
---

The *Back Office Category CSV Import and Export* feature lets Back Office users import and export categories in bulk through CSV files. It is the category data type of the [Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html) feature: the engine stores import jobs and runs, processes uploaded files in batches, records per-row errors, and provides the Back Office **Import & Export** pages, while this feature contributes the *category-csv-import* job type through the `ProductExperienceManagement` module, provided by `CategoryCsvImportSchemaPlugin`, next to the product CSV job types of the [Back Office Product CSV Import and Export](/docs/pbc/all/product-experience-management/latest/back-office-product-csv-import-and-export-feature-overview.html) feature. One row describes one category with its parent, additional parents, stores, template, flags, sort order, localized names and meta data, and images, so a single file creates a complete tree after a destructive deployment.

For the import and export workflow, the template download, and the error handling, see [Data Exchange Jobs feature overview](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html). To manage single categories in the Back Office, see [Category Management feature overview](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/category-management-feature-overview.html). To load categories during a deployment from `category.csv` and `category_store.csv`, see [Categories data import](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/categories-data-import/categories-data-import.html).

## Supported category data

| DATA | IMPORT | EXPORT | SCOPE |
| --- | --- | --- | --- |
| Categories | Yes | Yes | Category key, template, the active, in-menu, clickable, and searchable flags, sort order |
| Tree structure | Yes | Yes | Parent category and additional parents by category key |
| Store assignments | Yes | Yes | Semicolon-separated store names |
| Localized names and meta data | Yes | Yes | Name, meta title, meta description, meta keywords per locale |
| Category images | Yes | Yes | The `default` image set per locale, small and large image URLs per sort order |
| URLs | Generated | No | Generated from the name per locale; a changed parent moves the URLs of the subtree. No redirects are created; an existing redirect to a changed URL points to the new URL. |

## Import file structure

To check the expected file structure, download the template of the import job or export the existing categories. The exported file uses the same structure as the import file and lists parents before their children, so it imports back unchanged.

Each CSV row describes one category. A row with a new *Category Key* creates the category, a row with an existing key updates it. Keys match regardless of case. The columns are processed as follows:

<div class="width-100">

| COLUMN | RULE |
| --- | --- |
| *Category Key* | Required. Creates the category or updates it. |
| *Parent Category Key* | The parent must exist in the shop or in an earlier row of the file. Empty means the root category: a shop has one root category, so an empty cell is accepted only when the shop has no root yet, and a root category keeps its place with an empty cell. A changed parent moves the category and its subtree, including their URLs. |
| *Additional Parent Category Keys* | Optional, category keys separated by `;`. Every additional parent creates a second node of the category under that parent. |
| *Stores* | Store names separated by `;`. A store must exist and the parent category must be assigned to it. For a new category, an empty cell inherits the stores of the parent. A filled cell sets the stores of this category only: removing a store from a parent does not remove it from the children, each row names the stores of its own category. |
| *Template* | The name of a category template. Empty means *Catalog (default)* for a new category. |
| *Is Active*, *Is In Menu*, *Is Clickable*, *Is Searchable* | `1` or `0`. Empty means `0` for a new category. |
| *Sort Order* | A whole number: the order of the category under its parent. |
| *Name ({locale})* | Required in every locale of the shop for a new category. Another category on the same level must not have the same name in any locale. |
| *Meta Title ({locale})*, *Meta Description ({locale})*, *Meta Keywords ({locale})* | Optional. |
| *Image Small ({image_locale}-{sort_order})*, *Image Large ({image_locale}-{sort_order})* | Optional, absolute `http` or `https` URLs. Each sort order is one image of the `default` image set of the locale. The images of a locale named in the row replace that locale's `default` set as a whole. The locale `Default` fills the `default` set of every locale the row names no images for. |

</div>

When a category is updated, an empty cell keeps the current value of every column; the import cannot clear a value. When the same key appears in several rows of a file, every row is applied in file order and the last filled cell wins.

The following file creates a small tree under an existing category and assigns `watches` to a second parent:

| CATEGORY KEY | PARENT CATEGORY KEY | ADDITIONAL PARENT CATEGORY KEYS | STORES | IS ACTIVE | IS IN MENU | SORT ORDER | NAME (DE-DE) | NAME (EN-US) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| outdoor | demoshop | | DE;AT | 1 | 1 | 50 | Outdoor | Outdoor |
| tents | outdoor | | | 1 | 1 | 10 | Zelte | Tents |
| campaigns | demoshop | | DE;AT | 1 | 0 | 10 | Aktionen | Campaigns |
| watches | outdoor | campaigns | DE;AT | 1 | 1 | 20 | Outdoor-Uhren | Outdoor watches |

## Row and file errors

A rejected row is reported with its row number and the reason, and nothing is written for it; the other rows of the batch are imported. A row is rejected when:

- the category key is empty or longer than 255 characters;
- the parent or an additional parent does not exist in the shop or above in the file, is the category itself, or is a descendant of the category, which would create a cycle;
- the parent is empty while the shop already has a root category, or a root category gets a parent;
- a store does not exist, or the parent category is not assigned to it;
- the template does not exist;
- a flag is not `1` or `0`, or the sort order is not a whole number;
- a new category has no name in one of the locales;
- another category on the same level, in the shop or earlier in the file, already has the name;
- an image URL is not an absolute `http` or `https` URL.

Every row of a batch is rejected when the *Category Key* column is missing or a column names a locale the shop does not have, for example *Name (EN)*.

## Import steps

The job type runs two steps per batch of rows. The validation step applies the rules above and keeps the rejected rows from the write step. The write step writes every remaining row in one database transaction, directly and without the category facade, like the category data import of a deployment: the category with its localized attributes, the store assignments, the main node and the nodes under the additional parents with the closure table, the URLs of the node and of its subtree in every locale, and the `default` image sets. The Back Office plugins of the category form do not run: the store assignments of the children are not changed with the parent, and no URL redirects are created. The step collects the Publish and Synchronize events of the written categories, their ancestors and descendants, of a new root category, and of the URLs; the engine triggers them after the batch, so the Storefront receives the categories while the run is still going.

## Export

The export writes one row per category of the shop, parents before their children, with the columns of the job's schema: the keys of the parent and of the additional parents, the stores, the template, the flags, the sort order, the localized names and meta data, and the URLs of the `default` image set per locale. The exported file can be imported again without errors and without changes.

## Placeholders in the category schema

The values come from `CategoryCsvPlaceholderProvider` of the `ProductExperienceManagement` module and reflect the data of the shop at the time the template or the export is generated.

<div class="width-100">

| COLUMN PATTERN | PLACEHOLDER VALUES |
| --- | --- |
| `Name ({locale})`, `Meta Title ({locale})`, `Meta Description ({locale})`, `Meta Keywords ({locale})` | `{locale}`: every locale of the shop. |
| `Image Small ({image_locale}-{sort_order})`, `Image Large ({image_locale}-{sort_order})` | `{image_locale}`: every locale of the shop and `Default`; `{sort_order}`: `1` up to the largest number of images a `default` image set has in the shop. |

</div>

## Related Developer documents

| INSTALLATION GUIDES | TUTORIALS AND HOWTOS |
| --- | --- |
| [Install the Back Office Category CSV Import and Export feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-back-office-category-csv-import-and-export-feature.html) | [Add a custom data type to Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/tutorials-and-howtos/add-a-custom-data-type-to-data-exchange-jobs.html) |
| [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html) | |
