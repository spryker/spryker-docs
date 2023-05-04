---
title: File details - navigation_node.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-navigation-nodecsv
originalArticleId: a3ec2a04-ce34-4501-8ce4-da2240bfc583
redirect_from:
  - /2021080/docs/file-details-navigation-nodecsv
  - /2021080/docs/en/file-details-navigation-nodecsv
  - /docs/file-details-navigation-nodecsv
  - /docs/en/file-details-navigation-nodecsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `navigation_node.csv` file to configure [Navigation Node](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/managing-navigation-elements.html#navigation-node-types) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:navigation-node
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| navigation_key | &check; | String |  | Navigation entity key identifier. |
| node_key | &check; (*unique*) | String | Must be unique. | Identifies a node. |
| parent_node_key | &check; | String |  | Identifies the parent node. Defines the hierarchy of the nodes. |
| node_type | &check; | String | Possible values are: category, link, cms_page, external_url, label, ….)  | Type of node. |
| title.{ANY_LOCALE_NAME}*<br>Example value: *title.en_US* | &check; | String |  | Tittle of the node (US locale for our example). |
| url.{ANY_LOCALE_NAME}*<br>Example value: *url.en_US* | &check; | String |  | URL of the node (US locale for our example). |
| css_class.{ANY_LOCALE_NAME}*<br>Example value: *css_class.en_US* | &check; | String |  | Class of the node (US locale for our example). |
| valid_from | &check; | Date | |  Date from which the navigation node is valid.|
| valid_to | &check; | Date | |  Date to which the navigation node is valid.|

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.

## Import file dependencies

This file has the following dependencies:

* [navigation.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html)
* [glossary.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-glossary.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [navigation_node.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Navigation+Setup/Template+navigation_node.csv) | Exemplary import file with headers only. |
| [navigation_node.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Navigation+Setup/navigation_node.csv) | Exemplary import file with Demo Shop data. |
