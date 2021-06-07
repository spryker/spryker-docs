---
title: "File details: merchant_oms_process.csv"
last_updated: Jun 07, 2021
description: This document describes the merchant_oms_process.csv file to configure Merchant state machines in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_oms_process.csv` file to configure [Merchant state machines](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1219657917/Reviewed+Marketplace+and+Merchant+State+Machines+Feature+Overview+MR-52#Merchant-State-Machine) in your Spryker shop.

To import the file, run

```bash
data:import merchant-oms-process
```

## Import file parameters

The file should have the following parameters:

| PARAMETER  | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION   |
| --------------- | ---------- | ------- | ------------ | -------------- | ----------------------- |
| merchant_reference        | ✓             | String   |                   | Unique                       | Identifier of the merchant in the system. |
| merchant_oms_process_name | ✓             | String   |                   |                              | Name of the merchant state machine.       |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/2207154250/File+details+merchant.csv)

## Import template file and content example

Find the template and an example of the file below:

| FILE         | DESCRIPTION       |
| ------------------------ | ------------------------ |
| [template_merchant_oms_process.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_oms_process.csv) | Import file template with headers only.         |
| [merchant_oms_process.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_oms_process.csv) | Example of the import file with Demo Shop data. |