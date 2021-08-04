---
title: Migration Guide - ProductLabel
originalLink: https://documentation.spryker.com/v4/docs/mg-product-label
redirect_from:
  - /v4/docs/mg-product-label
  - /v4/docs/en/mg-product-label
---

## Upgrading from Version 1.* to Version 2.*
The following list describes the Backward Compatibility breaking changes in this version and how to upgrade.

### Product Label Rendering
We've changed `spyProductLabels` twig function to work based on a list of product label IDs. It's original behaviour was moved to a new twig function, called `spyProductAbstractLabels`. The idea behind this change is to directly get all the product label IDs of abstract products on catalog pages from Search documents instead of reading all these information from Storage. This is a better approach performance wise and also gives us the ability to be able to search and filter for labels in Elasticsearch.
If you just want to quickly upgrade and keep the previous behaviour, you only need to find and replace all the usages of `spyProductLabels` function to `spyProductAbstractLabels` in all of your twig templates.
However, we suggest you to invest some time and
However, to get the full benefits of this version upgrade you first need to export product label IDs to your Search documents. To do this, you need to modify your product search collector, by adding a new `search-result-data` entry (i.e. `id_product_labels`) for products. The data of this field can be easily read with `ProductLabelFacade::findLabelIdsByIdProductAbstract()` method.
Once you have the product label IDs in search documents, you can use the `spyProductLabels` twig method in your templates to pass the list of label IDs and display the available labels of a product.

### Database Changes
We've also added a new `is_dynamic` field to `spy_product_label` database table to prepare for the new dynamic labels feature coming in the following minor releases. In the 2.0 release the dynamic labels feature is not yet implemented, it will be provided by one of the following minor versions.
To start database migration run the following commands:
* `vendor/bin/console propel:diff`, manual review is necessary for the generated migration file.
* `vendor/bin/console` propel:migrate
* `vendor/bin/console propel:model:build`
