---
title: Scheduled Prices- Reference Information
originalLink: https://documentation.spryker.com/v3/docs/scheduled-prices-reference-information
redirect_from:
  - /v3/docs/scheduled-prices-reference-information
  - /v3/docs/en/scheduled-prices-reference-information
---

This topic contains the reference information that you need to know when working in the **Scheduled Prices** section.
***
## Import New Scheduled Prices Page

In the **Scheduled Prices** section you see the following:

*     Link to the page where the format of the file with price schedules is described.
*     Schedule name field
*     File selection button
*     The button for importing price schedules from the selected file

## Import New Scheduled Prices Page Attributes


| Attribute | Description |
| --- | --- |
| **Schedule name** | The name of the list of price product schedules which will be saved in the database. |
| **Select your CSV file** | Here, you can select the file with price product schedules which you want to import. Learn about file format here. |

## Scheduled Prices: Import Dry Run Page

The **Scheduled Prices: Import dry run** page is divided into four sections.

* **Dry run of your import**. In this section you see the following:
    * Link to the page where the format of the file with price schedules is described.
    * Schedule name
    * File selection button
    * The button for importing price schedules from the selected file
*  **Publish the scheduled price**. In this section you see the following:
    * The button for publishing the price schedules that have been imported successfully.
* **Errors found inside your file**. In this section you see the following:
    * Row number and the error related to that row.
* **Row processed with success**. In this section you see the following:
    * Price schedule ID, SKU's of the abstract and concrete products to which the price schedule belongs.
    * Store to which the product with the price schedule belongs.
    * Currency in which the price schedule is specified.
    * Price type of the price schedule and values for gross and net mode.
    * Starting and ending dates of the price schedule.

## Scheduled Prices: Import Dry Run Page Attributes

| Attribute | Description |
| --- | --- |
| **Schedule name** |The name of the list of price product schedules which you have just imported.  |
| **Select your CSV file** |Here, you can select the file with price product schedules which you want to re-import. It is used in case you want to correct or change some of the schedules you have imported. Learn about file format in [HowTo - Import Scheduled Prices](/docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/ht-import-sched).  |
| **Row n°** | A numeric identifier of a price schedule entry in the list of price schedules. |
| **Error** |  Describes why a particular price schedule has not been imported.|
| **ID** | A numeric identifier of price schedule. |
|**abstract_sku**  | An identifier of the abstract product to which price schedule is assigned. |
| **concrete_sku** | An identifier of the concrete product to which price schedule is assigned. |
| **store** |Store relation of the product to which price schedule is assigned.  |
| **currency** |Currency in which price schedule is defined.  |
| **price_type** |  Price type in which price schedule is defined: DEFAULT or ORIGINAL.|
| **value_net** | Net value of product defined by the price schedule |
| **value_gross** |Gross value of product defined by the price schedule.  |
|**from_included**  | The date on which the price specified by the price schedule gets applied. |
| **to_included** | The date on which the price specified by the price schedule gets reverted back. |
