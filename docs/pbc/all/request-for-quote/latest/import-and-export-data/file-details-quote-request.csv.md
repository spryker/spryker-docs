---
title: "File details: quote_request.csv"
description: The quote_request.csv file to configure information about quote request versions in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
---

This document describes the `quote_request.csv` file to configure information about [quote requests](/docs/pbc/all/request-for-quote/latest/request-for-quote.html) in your Spryker shop.

## Import file dependencies

[File details: company_user.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-company-user.csv.html)

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| quote_request_reference |&check;| string |  Qute request ID.|
| company_user_key |&check;| string |  Key that identified the company user that that the quote is shared with. |
| quote_request_status | &check; | string | Status of the quote.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_quote_request.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/request-for-quote/import-and-export-data/file-details-quote-request.csv.md/template_quote_request.csv)| Import file template with headers only. |
| [`quote_request.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/request-for-quote/import-and-export-data/file-details-quote-request.csv.md/quote_request.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:quote-request
```
