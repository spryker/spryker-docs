---
title: "File details: quote_request_version.csv"
description: The quote_request_version.csv file to configure information about quote request versions in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
---

This document describes the `quote_request_version.csv` file to configure information about [quote request](/docs/pbc/all/request-for-quote/{{page.version}}/request-for-quote.html) versions in your Spryker shop.

## Import file dependencies

[quote_request.csv](/docs/pbc/all/request-for-quote/{{page.version}}/import-and-export-data/file-details-quote-request.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| quote_request_reference | &check; | string |  Quote request reference.|
| version | &check; | string | Version of the quote request. |
| version_reference | &check; | string | Qute request version reference.|
| metadata | &check; | string | Array of quote request metadata.|
| quote | &check; | string | Array of quote request details.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_quote_request_version.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/request-for-quote/import-and-export-data/file-details-quote-request-version.csv.md/template_quote_request_version.csv) | Import file template with headers only. |
| [`quote_request_version.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/request-for-quote/import-and-export-data/file-details-quote-request-version.csv.md/quote_request_version.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:quote-request-version
```
