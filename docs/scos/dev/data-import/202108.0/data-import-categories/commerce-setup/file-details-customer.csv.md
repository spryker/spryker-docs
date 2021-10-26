---
title: File details- customer.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-customercsv
originalArticleId: 08356679-8b76-4d14-b756-fb39a77d3da7
redirect_from:
  - /2021080/docs/file-details-customercsv
  - /2021080/docs/en/file-details-customercsv
  - /docs/file-details-customercsv
  - /docs/en/file-details-customercsv
---

This article contains content of the **customer.csv** file to configure [Customer](/docs/scos/user/features/{{page.version}}/customer-account-management-feature-overview/customer-account-management-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **customer_reference** | Yes (*unique*) | String | Must end with a number. | Reference of the Customer. |
| **locale_name** | No | String | N/A* | Locale name. |
| **phone** | No | String | N/A | Customer’s phone number. |
| **email** | Yes (*unique*) | String | N/A | Customer’s e-mail |
| **salutation** | Yes | String | Values must be:<ul><li>Mr</li><li>Mrs</li><li>Dr, or </li><li>Ms</li></ul> | Used salutation.<br> The value must be within the list of values predefined in the `spyCustomerTableMap.php` file. |
| **first_name** | Yes | String | N/A | Customer’s first name. |
| **last_name** | Yes | String | N/A | Customer’s last name. |
| **company** | No | String | N/A | Customer’s Company |
| **gender** | Yes | String |  Values must be:<ul><li>Male, or </li><li>Female</li></ul> | Customer’s gender.<br>The value must be within the list of values predefined in the `spyCustomerTableMap.php`file. |
| **date_of_birth** | No | Date | N/A | Customer’s date of birth. |
| **password** | No | String | N/A | Customer’s password. |
| **registered** | No | Date | N/A | Customer’s date of registration. |
*N/A: Not applicable.

## Dependencies
This file has no dependencies.

## Template File & Content Example
A template and an example of the *customer.csv* file can be downloaded here:

| File | Description |
| --- | --- |
| [customer.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+customer.csv) | Customer .csv template file (empty content, contains headers only). |
| [customer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/customer.csv) | Customer .csv file containing a Demo Shop data sample. |
