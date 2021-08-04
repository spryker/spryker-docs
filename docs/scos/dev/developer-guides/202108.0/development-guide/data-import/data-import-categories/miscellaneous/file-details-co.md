---
title: File details- comment.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-commentcsv
redirect_from:
  - /2021080/docs/file-details-commentcsv
  - /2021080/docs/en/file-details-commentcsv
---

This article contains content of the **comment.csv** file to configure [Comment](https://documentation.spryker.com/docs/comments-201907)  information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **message_key** | No | String |N/A* | Identifier of the message with the comment. |
| **owner_type** | No | String |N/A | Owner type that issued the comment. |
| **owner_key** | No | String |N/A | Owner key identifier who issued the comment. |
| **customer_reference** | No | String |N/A |Reference of the customer.  |
| **message** | No | String |N/A |Message with the comment.  |
*N/A: Not applicable.

## Dependencies

This file has the following dependency:
*     [customer.csv](https://documentation.spryker.com/docs/file-details-customercsv)

## Template File & Content Example
A template and an example of the *comment.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [comment.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Miscellaneous/Template+comment.csv) | Comment .csv template file (empty content, contains headers only). |
| [comment.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Miscellaneous/comment.csv) | Comment .csv file containing a Demo Shop data sample. |
