---
title: HowTo - Import Merchants and Merchant Relations
originalLink: https://documentation.spryker.com/v3/docs/howto-import-merchants-and-merchant-relations
originalArticleId: 29e8d980-9c4c-4cf3-a70a-9ad07b24a1d4
redirect_from:
  - /v3/docs/howto-import-merchants-and-merchant-relations
  - /v3/docs/en/howto-import-merchants-and-merchant-relations
---

This HowTo describes how to import Merchants and Merchant Relations in bulk from a .csv file.

## Importing Merchants
To import merchants:

1. Upload the .csv file with merchants to  `data/import/` folder with populated `merchant_key` and `merchant_name` fields.
2. Run `console data:import merchant ` command

Or, if you want to import merchants from your file, indicate the path to it by running:

`console data:import merchant -f path_to_file.csv`

## Importing Merchant Relations
To import merchant relatuibs:

1. Upload the .csv file with merchants to  `data/import/` folder with the following fields populated:
* `merchant_relation_key`
* `mechant_key`
* `company_business_unit_owner_key`
* `company_business_unit_asignee_keys`
2. Run `console data:import merchant-relationship ` command

Or, if you want to import merchants from your file, indicate the path to it by running:

`console data:import merchant-relationship -f path_to_file.csv`
