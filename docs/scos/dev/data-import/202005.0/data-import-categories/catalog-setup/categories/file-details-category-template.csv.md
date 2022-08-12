---
title: File details- category_template.csv
last_updated: May 13, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-category-templatecsv
originalArticleId: 87edad35-fe53-4fad-9c78-1f6c5ea358d1
redirect_from:
  - /v5/docs/file-details-category-templatecsv
  - /v5/docs/en/file-details-category-templatecsv
---

This article contains content of the **category_template.csv** file to configure Category Template information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **template_name** | Yes | String |N/A | Name of the category template. |
| **template_path** | Yes (*unique*) | String |Must be a valid path to a twig file and it is a unique field, for example, the file cannot have more than one line with the same template path. | Path of the category template. |
*N/A: Not applicable.

## Dependencies

This file has no dependencies.

## Template File & Content Example
A template and an example of the *category_template.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [category_template.csv template]() | Category Template .csv template file (empty content, contains headers only). |
| [category_template.csv]() | Category Template .csv file containing a Demo Shop data sample. |
