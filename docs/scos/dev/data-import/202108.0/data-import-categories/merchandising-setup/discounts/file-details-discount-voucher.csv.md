---
title: File details- discount_voucher.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-discount-vouchercsv
originalArticleId: 741ea0dd-d3ad-40d0-98b3-6e16889b6794
redirect_from:
  - /2021080/docs/file-details-discount-vouchercsv
  - /2021080/docs/en/file-details-discount-vouchercsv
  - /docs/file-details-discount-vouchercsv
  - /docs/en/file-details-discount-vouchercsv
---

This article contains content of the **discount_voucher.csv** file to configure Discount Voucher information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **discount_key** | Yes | String |`discount_key` must exist in the *discounts.csv* file | Key identifier of the discount. |
| **quantity** | Yes | Number |N/A* | Number of vouchers that will be generated. |
| **custom_code** | Yes | String |N/A | Customised code of the voucher, composed by two parts:<ul><li>a prefix of the voucher code that can be set directly in this field,</li><li>a random part with the amount of random symbols equals to the value of random_generated_code_length field.</li></ul> |
| **random_generated_code_length** | Yes | String |If quantity >= 1 then `random_generated_code_length`	cannot be empty. | Random part of the voucher code with the amount of random symbols equals to the value of `random_generated_code_length` field. |
| **max_number_of_uses** | No | Number |If empty it will be set to 0. | Maximum number of this voucher usage. |
| **voucher_batch** | Yes | Number |`voucher_batch` must be previously created during *discount.csv* import, then the batch value must be a different number for each row in the file. | Voucher batch groups vouchers into batches. It identifies a voucher belonging to the same voucher pool. |
| **is_active** | No | Boolean | If empty, will be set to False = 0.<ul><li>True = 1</li><li>False = 0</li></ul>  | Indicates if discount voucher is active or not. |
*N/A: Not applicable.

## Dependencies

This file has the following dependency:
*   [ discount.csv ](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/discounts/file-details-discount.csv.html)

## Recommendations & other information
The generated voucher code consists of two parts: 

* `custom_code` which is a prefix of the voucher code that can be set directly at `custom_code`, and
* a random part with the amount of random symbols equals to the value of `random_generated_code_length` field. 

If a quantity is equal to or greater than 1, then` random_generated_code_length` should be non-empty as the generated code is unique. 

Field `voucher_batch` is necessary when different vouchers belong to the same voucher pool. It must have been previously created during *discount.csv* import, then the batch value must be a different number for each row in the file.
  
 ## Template File & Content Example
A template and an example of the *discount_voucher.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [discount_voucher.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/Template+discount_voucher.csv) | Discount Voucher .csv template file (empty content, contains headers only). |
| [discount_voucher.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/discount_voucher.csv) | Discount Voucher .csv file containing a Demo Shop data sample. |

