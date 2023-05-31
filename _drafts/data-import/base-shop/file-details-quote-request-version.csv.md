---
title: "File details: quote_request.csv"
template: data-import-template
last_updated: 
---

This document describes the `quote_request.csv` file to configure information about [Quotation Process](https://docs.spryker.com/docs/pbc/all/request-for-quote/202212.0/request-for-quote.html) in your Spryker shop.

## Import file dependencies

## Import file parameters
<!--| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |-->

| PARAMETER | REQUIRED |  TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| quote_request_reference |&check;| string |  | Qute request ID.|
| company_user_key |&check;| string | | Key that identified the company user that that the quote is shared with. |
| quote_request_status | &check; | string | <ul><li>`1`: active</li><li>`0`: inactive</li></ul> | Status of the quote.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_quote_request.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`quote_request.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:quote-request
```