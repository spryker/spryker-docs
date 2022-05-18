---
title: "File details: merchant_oms_process.csv"
last_updated: Jun 07, 2021
description: This document describes the merchant_oms_process.csv file to configure Merchant state machines in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_oms_process.csv` file to configure [Merchant state machines](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html#merchant-state-machine) in your Spryker shop.

To import the file, run:

```bash
data:import merchant-oms-process
```

## Import file parameters

The file should have the following parameters:

| PARAMETER  | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION   |
| --------------- | ---------- | ------- | ------------ | -------------- | ----------------------- |
| merchant_reference        | &check;             | String   |                   | Unique                       | Identifier of the merchant in the system. |
| merchant_oms_process_name | &check;             | String   |                   |                              | Name of the merchant state machine.       |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE         | DESCRIPTION       |
| ------------------------ | ------------------------ |
| [template_merchant_oms_process.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_oms_process.csv) | Import file template with headers only.         |
| [merchant_oms_process.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_oms_process.csv) | Example of the import file with Demo Shop data. |
