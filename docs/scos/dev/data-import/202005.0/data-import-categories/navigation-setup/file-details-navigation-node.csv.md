---
title: File details- navigation_node.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-navigation-nodecsv
originalArticleId: 4788d7e2-b52a-492b-b0eb-8d1460c725fd
redirect_from:
  - /v5/docs/file-details-navigation-nodecsv
  - /v5/docs/en/file-details-navigation-nodecsv
---

This article contains content of the **navigation_node.csv** file to configure [Navigation Node](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/references/navigation-reference-information.html#navigation-node-types) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **navigation_key** | Yes | String |N/A* | Navigation entity key identifier. |
| **node_key** | Yes (*unique*) | String |N/A | Identifies a node. |
| **parent_node_key** | Yes | String |N/A | Identifies the parent node. Defines the hierarchy of the nodes. |
| **node_type** | Yes | String |Possible values are: category, link, cms_page, external_url, label, ….)  | Type of node. |
| **title.{ANY_LOCALE_NAME}** **<br>Example value: *title.en_US* | Yes | String |N/A | Tittle of the node (US locale for our example). |
| **url.{ANY_LOCALE_NAME}** **<br>Example value: *url.en_US* | Yes | String |N/A | URL of the node (US locale for our example). |
| **css_class.{ANY_LOCALE_NAME}** **<br>Example value: *css_class.en_US* | Yes | String |N/A | Class of the node (US locale for our example). |
| **valid_from** | Yes | Date |N/A |  Date from which the navigation node is valid.|
| **valid_to** | Yes | Date |N/A |  Date to which the navigation node is valid.|
*N/A: Not applicable.
** ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.

## Dependencies

This file has the following dependencies:

* [navigation.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html)
* [glossary.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-glossary.csv.html)

## Template File & Content Example
A template and an example of the *navigation_node.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [navigation_node.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Navigation+Setup/Template+navigation_node.csv) | Navigation Node .csv template file (empty content, contains headers only). |
| [navigation_node.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Navigation+Setup/navigation_node.csv) | Navigation Node .csv file containing a Demo Shop data sample. |
