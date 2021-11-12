---
title: Discounts
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/discounts
originalArticleId: e6947e32-768b-4ea9-942a-21595f0ea812
redirect_from:
  - /v6/docs/discounts
  - /v6/docs/en/discounts
---

The **Discounts** category contains all data you need to manage product discount information in the online store.
We have structured this section according to the following .csv files that you will have to use to import the data:

* [discount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html): allows you to import general information about the discounts and their attributes.
* [discount_amount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-amount.csv.html):  allows you to import data used to set the values of the discounts imported with *discount.csv*.
* [discount_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-store.csv.html): allows you to link the discounts with the stores.
* [discount_voucher.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-voucher.csv.html) allows you to import information about vouchers.

The table below provides details on Product Merchandising data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

<div>
| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Discount**   |Imports information about the discounts and their attributes. |`data:import:discount`| [discount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html) | None|
| **Discount Amount**  | Imports information used to set the values of the discounts imported with *discount.csv*. |`data:import:discount-amount`| [discount_amount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-amount.csv.html) |<ul><li>discount.csv</li><li>discount_store.csv</li></ul> |
| **Discount Store**   |Imports information about this file links the discounts with the stores. |`data:import:discount-store`| [discount_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-store.csv.html) | <ul><li>[discount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html)</li><li>**stores.php** configuration file of demo shop PHP project.</li></ul> |
| **Discount Voucher**   | Imports information used to create the discount voucher.|`data:import:discount-voucher`| [discount_voucher.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount-voucher.csv.html) | [discount.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html) |
</div>
