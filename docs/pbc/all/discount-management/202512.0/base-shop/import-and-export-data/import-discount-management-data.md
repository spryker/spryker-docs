---
title: Import Discount Management data
description: Learn which files are used to import data realted to Discount Management module within your Spryker Cloud Commerce OS project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/discounts
originalArticleId: 02e8504e-1e84-4049-8c94-4f3be874ad16
redirect_from:
  - /2021080/docs/discounts
  - /2021080/docs/en/discounts
  - /docs/discounts
  - /docs/en/discounts
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/discounts/discounts.html
  - /docs/pbc/all/discount-management/202311.0/import-and-export-data/discount-import.html
  - /docs/pbc/all/discount-management/202311.0/base-shop/import-and-export-data/discount-import.html
  - /docs/pbc/all/discount-management/202204.0/base-shop/import-and-export-data/import-discount-management-data.html
---

To learn how data import works and about different ways of importing data, see [Data import](/docs/dg/dev/data-import/latest/data-import.html). This section describes the data import files that are used to import data related to the Discount Management PBC:

- [discount.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount.csv.html): allows you to import general information about the discounts and their attributes.
- [discount_amount.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount-amount.csv.html):  allows you to import data used to set the values of the discounts imported with *discount.csv*.
- [discount_store.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount-store.csv.html): allows you to link the discounts with the stores.
- [discount_voucher.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount-voucher.csv.html) allows you to import information about vouchers.

The following table provides details about Discount Management data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILES | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| Discount   | Imports information about the discounts and their attributes. |`data:import:discount`| [discount.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount.csv.html) | None|
| Discount Amount  | Imports information used to set the values of the discounts imported with *discount.csv*. |`data:import:discount-amount`| [discount_amount.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount-amount.csv.html) |<ul><li>discount.csv</li><li>discount_store.csv</li></ul> |
| Discount Store   | Imports information about this file links the discounts with the stores. |`data:import:discount-store`| [discount_store.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount-store.csv.html) | <ul><li>[discount.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount.csv.html)</li><li>*stores.php* configuration file of demo shop PHP project.</li></ul> |
| Discount Voucher   | Imports information used to create the discount voucher.|`data:import:discount-voucher`| [discount_voucher.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount-voucher.csv.html) | [discount.csv](/docs/pbc/all/discount-management/latest/base-shop/import-and-export-data/import-file-details-discount.csv.html) |
