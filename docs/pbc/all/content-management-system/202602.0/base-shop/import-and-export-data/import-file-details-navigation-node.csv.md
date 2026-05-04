---
title: "Import file details: navigation_node.csv"
description: Learn about the Spryker navigation node csv file used to configure the navigation node information in to your Spryker Shop.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-navigation-nodecsv
originalArticleId: a3ec2a04-ce34-4501-8ce4-da2240bfc583
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/navigation-setup/file-details-navigation-node.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/navigation-setup/file-details-navigation-node.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/navigation-setup/file-details-navigation-node.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/navigation-setup/file-details-navigation-node.csv.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/file-details-navigation-node.csv.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/import-and-export-data/file-details-navigation-node.csv.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-file-details-navigation-node.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `navigation_node.csv` file to configure [Navigation Node](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/create-navigation-nodes.html#reference-information-navigation-node-types) information in your Spryker Demo Shop.


## Import file dependencies



- [navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html)
- [glossary.csv](/docs/pbc/all/miscellaneous/{{page.version}}/import-and-export-data/import-file-details-glossary.csv.html)

## Import file parameters



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



## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [navigation_node.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Navigation+Setup/Template+navigation_node.csv) | Exemplary import file with headers only. |
| [navigation_node.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Navigation+Setup/navigation_node.csv) | Exemplary import file with Demo Shop data. |

## Import file command

```bash
data:import:navigation-node
```
