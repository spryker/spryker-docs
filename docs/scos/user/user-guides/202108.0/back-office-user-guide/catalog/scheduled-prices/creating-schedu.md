---
title: Creating scheduled prices
originalLink: https://documentation.spryker.com/2021080/docs/creating-scheduled-prices
redirect_from:
  - /2021080/docs/creating-scheduled-prices
  - /2021080/docs/en/creating-scheduled-prices
---

This topic describes how to create scheduled prices.

For example, you want to set up a promotion for Valentine's Day beforehand so that:

* You do not have to switch prices manually on the day of the promotion.
* Prices switch to the specified ones automatically on the starting date of the promotion.
* Prices switch back automatically on the last day of the promotion.

Instead of changing prices manually on the starting day of the promotion, you can create a price schedule called,  e.g., *Valentine's day prices*. To do that, you need to import a file with predefined dates and prices.

## Prerequisites

To start working with scheduled prices, go to **Catalog** > **Scheduled Prices**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Creating scheduled prices

To create a price schedule:

1.     Create a CSV file with predefined product price schedules.
2.     Enter and select the attributes for your price schedule.
3.     Click **Choose File** and select the file you've prepared in step 1.
4.     Click **Import your CSV file**.
5. Once redirected to the _Import dry run_ page, check whether there are incorrect entries in your file in the *Errors found inside your file* section.

     {% info_block infoBox %}
If needed, you can [edit the imported scheduled prices](https://documentation.spryker.com/docs/managing-scheduled-prices
{% endinfo_block %}.)
    
6. Check if the successfully imported price schedules are correct in the *Row processed with success* section.

7. If you are satisfied with the results, in the *Publish the scheduled prices* section, click **Publish** to apply the price schedules.

**Tips & tricks**
*     If you leave the _Import dry run_ page without publishing the imported price schedules, they do not get deleted. However, you won't be able to return to that page unless you import the file once again.
*     You can check the current price schedules of each product in the *Products* section > the *Edit Product* page > the *Scheduled Prices* tab.

### Reference information: Creating scheduled prices

This section describes the attributes you see, select, and enter when creating scheduled prices.

In the *Import new scheduled prices* section, you see the following:

*     A link to the page where the format of the file with price schedules is described.
*     The Schedule name field.
*     The Choose file button.
*     The button for importing price schedules from the selected file.
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
