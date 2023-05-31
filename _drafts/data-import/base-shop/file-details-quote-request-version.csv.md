---
title: "File details: quote_request_version.csv"
template: data-import-template
last_updated: 
---

This document describes the `quote_request_version.csv` file to configure information about [quote request](https://docs.spryker.com/docs/pbc/all/request-for-quote/202212.0/request-for-quote.html) versions in your Spryker shop.

## Import file dependencies

[quote_request.csv](_drafts/data-import/base-shop/file-details-quote-request.csv.md)
## Import file parameters

| PARAMETER | REQUIRED |  TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| quote_request_reference | &check; | string | Qute request reference.|
| version | &check; | string | Version of the quote request. |
| version_reference | &check; | string | Status of the quote.|
| metadata | &check; | string | Array of quote request metadata.|
| quote | &check; | string | Array of quote request details.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_quote_request_version.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`quote_request_version.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:quote-request-version
```