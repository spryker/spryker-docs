---
title: Create scheduled prices
description: This user guide is about scheduling price changes by creating product price schedules. This functionality is shipped with the Scheduled prices feature.
last_updated: Sep 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-scheduled-prices
originalArticleId: 4428f373-b26a-4dcf-bd40-b9fbad5f5704
redirect_from:
  - /2021080/docs/creating-scheduled-prices
  - /2021080/docs/en/creating-scheduled-prices
  - /docs/creating-scheduled-prices
  - /docs/en/creating-scheduled-prices
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/scheduled-prices/creating-scheduled-prices.html
  - /docs/pbc/all/price-management/202204.0/base-shop/manage-in-the-back-office/create-scheduled-prices.html
related:
  - title: Managing Scheduled Prices
    link: docs/pbc/all/price-management/latest/base-shop/manage-in-the-back-office/manage-scheduled-prices.html
  - title: Scheduled Prices feature overview
    link: docs/pbc/all/price-management/latest/base-shop/scheduled-prices-feature-overview.html
---

This topic describes how to create scheduled prices.

For example, you want to set up a promotion for Valentine's Day beforehand so that:

- You do not have to switch prices manually on the day of the promotion.
- Prices switch to the specified ones automatically on the starting date of the promotion.
- Prices switch back automatically on the last day of the promotion.

Instead of changing prices manually on the starting day of the promotion, you can create a price schedule called–for example, *Valentine's day prices*. To do that, you need to import a file with predefined dates and prices.

## Prerequisites

To start working with scheduled prices, go to **Catalog&nbsp;<span aria-label="and then">></span> Scheduled Prices**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Creating scheduled prices

To create a price schedule:

1. Create a CSV file with predefined product price schedules.
2. Enter and select the attributes for your price schedule.
3. Click **Choose File** and select the file you've prepared in step 1.
4. Click **Import your CSV file**.
5. Once redirected to the *Import dry run* page, check whether there are incorrect entries in your file in the *Errors found inside your file* section.

{% info_block infoBox "Info" %}

If needed, you can [edit the imported scheduled prices](/docs/pbc/all/price-management/{{site.version}}/base-shop/manage-in-the-back-office/manage-scheduled-prices.html)

{% endinfo_block %}


6. Check if the successfully imported price schedules are correct in the *Row processed with success* section.

7. If you are satisfied with the results, in the *Publish the scheduled prices* section, click **Publish** to apply the price schedules.

**Tips and tricks**

- If you leave the *Import dry run* page without publishing the imported price schedules, they do not get deleted. However, you won't be able to return to that page unless you import the file once again.
- You can check the current price schedules of each product in the *Products* section&nbsp;<span aria-label="and then">></span> the *Edit Product* page&nbsp;<span aria-label="and then">></span> the *Scheduled Prices* tab.

### Reference information: Creating scheduled prices

This section describes the attributes you see, select, and enter when creating scheduled prices.

In the *Import new scheduled prices* section, you see the following:

- A link to the page where the format of the file with price schedules is described.
- The Schedule name field.
- The Choose file button.
- The button for importing price schedules from the selected file.
In the *Scheduled prices imported* section, you see the following:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Import ID | Numeric identifier of a scheduled price import. |
| Name | Alphabetic identifier of a scheduled price import. |
| Imported by and on the | Back office user who imported the list and the time of the import. |
| Status | Import status: draft (scheduled prices are imported but not applied) or published (scheduled prices are imported and applied). |
| Number of prices | Number of scheduled prices in an imported list. |
| Number of products | Number of products which have scheduled prices assigned to them in an imported list. |
| Actions | Set of actions that you can do with an import. |

#### Scheduled Prices: Import dry run page

The *Scheduled Prices: Import dry run* page is divided into four sections.

- **Dry run of your import**. In this section, you see the following:
  - Link to the page where the format of the file with price schedules is described
  - Schedule name
  - File selection button
  - The button for importing price schedules from the selected file
- **Publish the scheduled price**. In this section you see the following:
  - The button for publishing the price schedules that have been imported successfully.
- **Errors found inside your file**. In this section you see the following:
  - Row number and the error related to that row.
- **Row processed with success**. In this section you see the following:
  - Price schedule ID, SKU's of the abstract and concrete products to which the price schedule belongs.
  - Store to which the product with the price schedule belongs.
  - Currency in which the price schedule is specified.
  - Price type of the price schedule and values for gross and net mode.
  - Starting and ending dates of the price schedule.

#### Scheduled Prices: Import dry run page attributes

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Schedule name |Name of the list of price product schedules which you have just imported.  |
| Select your CSV file |Here, you can select the file with price product schedules which you want to re-import. It is used in case you want to correct or change some of the schedules you have imported. Learn about file format in [File details: product_price_schedule.csv](/docs/pbc/all/price-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-price-schedule.csv.html).  |
| Row n° | Numeric identifier of a price schedule entry in the list of price schedules. |
| Error |  Describes why a particular price schedule has not been imported.|
| ID | Numeric identifier of price schedule. |
| abstract_sku  | Identifier of the abstract product to which price schedule is assigned. |
| concrete_sku | Identifier of the concrete product to which price schedule is assigned. |
| store |Store relation of the product to which price schedule is assigned.  |
| currency |Currency in which price schedule is defined.  |
| price_type |  Price type in which price schedule is defined: DEFAULT or ORIGINAL.|
| value_net | Net value of product defined by the price schedule |
| value_gross |Gross value of product defined by the price schedule.  |
|from_included  | Date on which the price specified by the price schedule gets applied. |
| to_included | Date on which the price specified by the price schedule gets reverted back. |
