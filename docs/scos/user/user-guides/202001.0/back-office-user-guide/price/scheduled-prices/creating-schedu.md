---
title: Creating Scheduled Prices
originalLink: https://documentation.spryker.com/v4/docs/creating-scheduled-prices-201907
redirect_from:
  - /v4/docs/creating-scheduled-prices-201907
  - /v4/docs/en/creating-scheduled-prices-201907
---

This topic describes how you create scheduled prices.
To start working with scheduled prices, navigate to **Prices > Scheduled Prices**.

For example, you want to set up a promotion for Valentine's Day beforehand so that:

* you do not have to switch prices manually on the day of the promotion
* prices switch to the specified ones automatically on the starting date of the promotion
* prices switch back automatically on the last day of the promotion

Instead of changing prices manually on the starting day of the promotion, you can create a price schedule called,  e.g. **Valentine's day prices**. To do that you need to import a file with predefined dates and prices.
***

**To create a price schedule:**

1.     Create a CSV file with predefined product price schedules. See [Scheduled Prices: Reference information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/price/scheduled-prices/references/scheduled-price).
2.     Enter and select the attributes for your price schedule. See [Scheduled Prices: Reference information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/price/scheduled-prices/references/scheduled-price).
3.     Click **Browse** and select the file you've prepared in step 1.
4.     Click **Import your CSV file**.
5. Once redirected to the _Import dry run_ page, check whether there are incorrect entries in your file in the **Errors found inside your file** section.

     {% info_block infoBox %}
If needed, you can [edit the imported scheduled prices](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/price/scheduled-prices/managing-schedu
{% endinfo_block %}.)
    
6. Check if the successfully imported price schedules are correct in the **Row processed with success** section.

7. If you are satisfied with the results, in the **Publish the scheduled prices** section, click **Publish** to apply the price schedules.
***
**Tips & Tricks**
*     If you leave the _Import dry run_ page without publishing the imported price schedules, they do not get deleted. However, you won't be able to return to that page unless you import the file once again.
*     You can check current price schedules of each product in **Products** section >**Edit Product** page > **Scheduled Prices** tab.
