---
title: Release Notes - July - 2 2017
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-july-2-2017
originalArticleId: e125a926-7b69-45b1-a378-d569e9c7dfa5
redirect_from:
  - /2021080/docs/release-notes-july-2-2017
  - /2021080/docs/en/release-notes-july-2-2017
  - /docs/release-notes-july-2-2017
  - /docs/en/release-notes-july-2-2017
---

## Features
### Filter by Product Labels
We've changed product label touch logic in order to be able to export label IDs for products when their label relations change. This will allow you to further search and filter by labels.
![Filter by product labels](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+July+-+2+2017/RN_filter_by_product_labels.gif) 

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
|[ProductLabel 2.0.0](https://github.com/spryker/product-label/releases/tag/2.0.0)  | n/a | n/a |

**Documentation**
For module documentation, see [Product Label Module Guide](https://documentation.spryker.com/2021080/docs/product-label)
For detailed migration guides, see [Product Label Migration Guide](/docs/scos/dev/migration-and-integration/{{site.version}}/module-migration-guides/migration-guide-productlabel.html).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major:

```bash
composer require spryker/product-label:"^2.0.0"
```

### Data Importers
With this release, we are introducing a new `DataImport` module. This module is for handling data imports. The new `DataImport` allows you not only to insert, but also to update data. It is now possible to execute only one specific import. Every data importer has its own console command and can be configured from the console. The module uses the `Event` module in certain cases, for example to print debug output to the console or time information if a specific subscriber is added. With this new solution, it is also now possible to execute specific lines of  `DataImport`.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [DataImport 1.0.0](https://github.com/spryker/data-import/releases/tag/1.0.0) | [ErrorHandler 2.1.0](https://github.com/spryker/error-handler/releases/tag/2.1.0) | <ul><li>[Category 3.2.1](https://github.com/spryker/Category/releases/tag/3.2.1)</li><li>[CategoryExporter 3.0.1](https://github.com/spryker/category-exporter/releases/tag/3.0.1)</li><li>[Glossary 3.1.3](https://github.com/spryker/Glossary/releases/tag/3.1.3)</li><li>[Stock 4.0.2](https://github.com/spryker/Stock/releases/tag/4.0.2)</li><li>[Testify 3.2.6](https://github.com/spryker/Testify/releases/tag/3.2.6)</li></ul> |

**Documentation**
For module documentation, see [HowTo - Import Data](/docs/scos/dev/data-import/{{site.version}}/creating-a-data-importer.html).

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major:

```bash
composer require spryker/data-import:"^1.0.0"
```

### New Products and Dynamic Labels
We've added support for dynamic product labels. Labels now can be assigned to products based on custom business logic which can be implemented in the form of plugins. We've also added the `ProductNew` module that extends products with the New from - to date properties. Based on these dates, a "NEW" label can be assigned dynamically to products.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| [ProductNew 1.0.0](https://github.com/spryker/product-new/releases/tag/1.0.0) | <ul><li>[ProductLabel 2.1.0](https://github.com/spryker/product-label/releases/tag/2.1.0)</li><li>[ProductLabelCollector 1.1.0](https://github.com/spryker/product-label-collector/releases/tag/1.1.0)</li><li>[ProductLabelGui 1.1.0](https://github.com/spryker/product-label-gui/releases/tag/1.1.0)</li><li>[Search 6.4.0](https://github.com/spryker/Search/releases/tag/6.4.0)</li></ul> | [ProductManagement 0.7.5](https://github.com/spryker/product-management/releases/tag/0.7.5) |

**Documentation**
For module documentation and integration guides, see [ProductNew Module Guide](https://documentation.spryker.com/2021080/docs/new-products)

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major:

```bash
composer require spryker/product-new:"^1.0.0"
```

### Category Template and CMS Block Position
With this release, we are introducing templating and CMS page block positioning for categories. 

With our out of the box solution, you can manage categories as catalog pages, as a mix of catalog with blocks included or as pure content pages. You can modify the provided templates, as well as you can extend our solution to include your custom templates.

CMS block positioning can be used for placing a block in certain places in your template (like for example include banners in the top position, some SEO text in the bottom position, etc.). Out of the box, category pages have only 1 default position. For a more advanced template take a look at our demoshop. Here we showcase top, middle and bottom positions. You can extend our solution in a way that will help you better manage your content by changing its configuration.
![Category template Yves](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+July+-+2+2017/RN_category_template_and_cms_block_position_1.gif) 

![Category template Zed](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Archive/Release+Notes+-+July+-+2+2017/RN_category_template_and_cms_block_position_2.gif) 

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| <ul><li>[Category 4.0.0](https://github.com/spryker/Category/releases/tag/4.0.0)</li><li>[CmsBlockCategoryConnector 2.0.0](https://github.com/spryker/cms-block-category-connector/releases/tag/2.0.0)</li></ul> | <ul><li>[CmsBlock 1.2.0](https://github.com/spryker/cms-block/releases/tag/1.2.0)</li><li>[Gui 3.6.0](https://github.com/spryker/Gui/releases/tag/3.6.0)</li></ul>  | <ul><li>[CategoryDataFeed 0.2.1](https://github.com/spryker/category-data-feed/releases/tag/0.2.1)</li><li>[CategoryExporter 3.0.2](https://github.com/spryker/category-exporter/releases/tag/3.0.2)</li><li>[Cms 6.1.1](https://github.com/spryker/Cms/releases/tag/6.1.1)</li><li>[CmsBlockProductConnector 1.0.2](https://github.com/spryker/cms-block-product-connector/releases/tag/1.0.2)</li><li>[NavigationGui 1.0.4](https://github.com/spryker/navigation-gui/releases/tag/1.0.4)</li><li>[ProductCategory 4.2.1](https://github.com/spryker/product-category/releases/tag/4.2.1)</li><li>[ProductLabelGui 1.0.3](https://github.com/spryker/product-label-gui/releases/tag/1.0.3)</li><li>[ProductManagement 0.7.4](https://github.com/spryker/product-management/releases/tag/0.7.4)</li><li>[ProductRelation 1.0.5](https://github.com/spryker/product-relation/releases/tag/1.0.5)</li><li>[Transfer 3.3.3](https://github.com/spryker/transfer/releases/tag/3.3.3)</li></ul> |

**Documentation**
For module documentation, see: 

* CMS Block Category Connector Module Guide<!-- link -->
* Content Management Module Guide<!-- link -->

For migration guides, see: 

* [Category Migration Guide](/docs/scos/dev/migration-and-integration/{{site.version}}/module-migration-guides/migration-guide-category.html) 
* [CMS Block Category Connector Migration Guide](/docs/scos/dev/migration-and-integration/{{site.version}}/module-migration-guides/migration-guide-cms-block-category-connector.html)
* Category Template Migration Console <!-- add a link -->
* [CMS Block Category Connector Migration Console](/docs/scos/dev/migration-and-integration/{{site.version}}/module-migration-guides/migration-guide-cms-block-category-connector.html-console)

**Migration Guides**
To upgrade, follow the steps described below:

* Apply every minor and patch:

```bash
composer update "spryker/*"
```

* Once that is done, upgrade to the new module major:

```bash
composer require spryker/category:"^4.0.0" spryker/cms-block-category-connector:"^2.0.0"
```

## Improvements
### Possibility to Add ServiceProvider to ConsoleBootstrap
We have added a possibility to add `ServiceProvider` to `ConsoleBootstrap`. You can now add ServiceProvider-s which are needed for cron based commands.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Console 3.1.0](https://github.com/spryker/Console/releases/tag/3.1.0) | n/a |

### CORS Headers
With this release, we make sure that CORS headers are now fully compliant with the standard.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Api 0.1.2](https://github.com/spryker/Api/releases/tag/0.1.2) |

### Storage Client Cache
The `StorageClient` remembers all GET calls to Redis that happen during one request. On any subsequent call, it makes a single MGET to retrieve all the necessary data, plus one initial GET request to get the cache keys from Redis.

Our former solution, where the request was identified by the URL including the GET parameters, was leading to a conceptual problem. Some URL parameters (e.g. the marketing parameters like mid=123) were spamming the cache.

To solve this issue we added strategy options for storage cache. The options are:

* **Incremental** for using the same key and incrementing the cache inside it. This strategy has a limit for the number of keys for one cache. The default limit is 1000. If the number of keys is over limit, normal GET requests will be used for the uncached keys.
* **Replace** for using the same key and replacing it with the new cache.
* **Inactive** to deactivate the cache.

We also added a method to manage cache strategies where every controller can specify its own strategy. The default value for all controllers is the replace strategy.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [Storage 3.1.0](https://github.com/spryker/Storage/releases/tag/3.1.0) | n/a |

## Bugfixes
### Filter Data Based on Activation Flags
We had an issue with ES, where inactive CMS pages were searchable. To fix this issue, we added two new search expanders, to enable filtering of data based on activation flags. 

`IsActiveInDateRangeQueryExpanderPlugin` is meant for filtering out active records within stored date range. 

`IsActiveQueryExpanderPlugin` is used for filtering records with `is-active` flag.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[CmsCollector 1.1.0](https://github.com/spryker/cms-collector/releases/tag/1.1.0)</li><li>[Search 6.2.0](https://github.com/spryker/Search/releases/tag/6.2.0)</li></ul> | n/a |

### Filter Behavior with Percentage Discount
The filters for discounts are applied after discount calculation. Because of that we had an issue that the percentage portion for a discount was not correctly calculated. This issue is fixed now, filters are applied before the discount calculation.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Discount 4.3.1](https://github.com/spryker/Discount/releases/tag/4.3.1) |

### Save Category
With a recent fix, we had introduced a bug: when trying to save existing category it was not allowing you to save because of key duplication, it was thinking that the key is already taken. This regression is now resolved.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Category 3.2.4](https://github.com/spryker/Category/releases/tag/3.2.4) |

### Path for CodeSniffer Project Run
When providing a custom path for project sniffing, that path wasn't normalized and always required a leading slash. This has been fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Development 3.1.3](https://github.com/spryker/Development/releases/tag/3.1.3) |

### Step Engine: Redirect to Correct Step if a Step is Skipped
The Step Engine selects the current step that needs to be processed based on post conditions. We had an issue when post-conditions of previous steps were failing. If the requested step was not equal to the current step, it was recognising the correct step, but there was no correct redirect. This issue is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [StepEngine 3.0.1](https://github.com/spryker/step-engine/releases/tag/3.0.1) |

### Send an Email Only on Successful Registration
Previously, the `Customer` module was sending a registration email even on failed registration. Now, this issue is fixed and the email will only be sent on successful registration.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Customer 6.1.1](https://github.com/spryker/Customer/releases/tag/6.1.1) |

### Duplicated Index in CMS Block
One of CMS block related indices was duplicated and had the same name as a foreign key. Due to this, some of systems were not able to process this migration. This issue is fixed now.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [CmsBlock 1.2.1](https://github.com/spryker/cms-block/releases/tag/1.2.1) |

### Fix Twig Templates So Standard Symfony Twig Logic Can Be Applied
Previously, it was required to add an `*` (asterisk) into labels when a form field was required. It's now added automatically when the form field's `required` option is set to true.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | <ul><li>[CmsGui 4.2.0](https://github.com/spryker/cms-gui/releases/tag/4.2.0)</li><li>[Discount 4.4.0](https://github.com/spryker/Discount/releases/tag/4.4.0)</li><li>[Gui 3.7.0](https://github.com/spryker/Gui/releases/tag/3.7.0)</li><li>[NavigationGui 1.1.0](https://github.com/spryker/navigation-gui/releases/tag/1.1.0)</li><li>[ProductOption 5.2.0](https://github.com/spryker/product-option/releases/tag/5.2.0)</li><li>[ProductSearch 5.1.0](https://github.com/spryker/product-search/releases/tag/5.1.0)</li><li>[Sales 7.1.0](https://github.com/spryker/Sales/releases/tag/7.1.0)</li><li>[Tax 5.1.0](https://github.com/spryker/tax/releases/tag/5.1.0)</li></ul> | n/a |

### Wrong Order of Paths for Twig Cache Creation
So far the generated `.pathCache` file for the Twig cache used a wrong order of paths. The core paths were overwriting project paths. This has been fixed now to overwrite core files with the ones from the project.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | n/a | [Twig 3.2.1](https://github.com/spryker/Twig/releases/tag/3.2.1) |

### Breadcrumbs in Zed Admin UI
Previously, we were showing the breadcrumbs in Zed UI when the navigation entry was also shown in the left-side navigation. This issue is fixed now, the breadcrumbs are present now even if the entry is not visible in main navigation.

**Affected Modules**

| Major | Minor | Patch |
| --- | --- | --- |
| n/a | [ZedNavigation 1.1.0](https://github.com/spryker/zed-navigation/releases/tag/1.1.0) | n/a |
