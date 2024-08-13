---
title: "Back Office: Import merchant commissions"
description: Learn how to import merchant commissions in the Back Office
last_updated: Jun 16, 2024
template: back-office-user-guide-template
---

To import [merchant commissions](/docs/pbc/all/merchant-management/202407.0/marketplace/marketplace-merchant-commission-feature-overview.html), follow the steps:

1. In the Back Office, go to **Marketplace&nbsp;<span aria-label="and then">></span>Merchant Commissions**.
2. On the **Merchant Commissions** page, click **Import**.
  This opens the **Import Merchant Commissions** page.
3. Optional: If you don't have a file with merchant commissions, to prepare it, in **1 Download template**, click on **commissions_template.csv**.
  This downloads the file. Fill the file with merchant commission data using the template and the [reference](#reference-information-Merchant-commissions-import-file).

4. In **2 Import CSV file**, click **Choose File** and select the file with commissions on your machine.
  This displays the name of the file next to **Choose File**.

5. To import the selected file with commissions, click **Upload**.  
  This opens the **Import Merchant Commissions** page. The imported merchant commissions are displayed in the table.

## Reference information: Merchant commissions import file

{% info_block infoBox "" %}

* Some editors change the symbols based on your location. To make sure you can import commissions, we recommend using Google Sheets to edit import files.
* For an example of a filled out file, you can export the existing default commissions by clicking **Export** on the **Merchant Commissions** page.


{% endinfo_block %}

This section explains how to fill out a merchant commission import file. For more information about the fields in this file, see [Marketplace Merchant Commissions feature overview](/docs/pbc/all/merchant-management/202407.0/marketplace/marketplace-merchant-commission-feature-overview.html).

| COLUMN                        | REQUIRED | DATA EXAMPLE                                      | DATA EXPLANATION                                |
|-------------------------------|----------|---------------------------------------------------|-------------------------------------------------|
| key                           | ✓        | mc1                                               | Unique identifier of the merchant commission.          |
| name                          | ✓        | Merchant Commission 1                             | Name of the merchant commission. Accepted length: from 1 to 255 characters. Must be unique.               |
| description                   |          |                                                   | Description of the merchant commission.         |
| valid_from                    |     ✓     | 6/30/2029 0:00:00                                       | Start date of the merchant commission validity in UTC. |
| valid_to                      |    ✓      | 8/30/2029 0:00:00                                     | End date of the merchant commission validity in UTC.   |
| is_active                     | ✓          | 1                                                 | Defines if the merchant commission is active(1) or inactive(0).   |
| amount                        |             | 5                                                 | Commission in percentage. Accepts decimals—for example, `10.99` would mean 10.99%. If `calculator_type_plugin` is set to `fixed`, `amount` must be `0`.               |
| calculator_type_plugin        | ✓         | percentage                                        | Defines how commission is calculated. By default, accepts `percentage` and `fixed`.             |
| group | ✓         | primary                                           |  Can be `primary` or `secondary`.         |
| priority                      | ✓            | 1                                                 |  Defines which commission to apply within a group. Priority is defined in an ascending order starting from one.            |
| item_condition                |          | item-price >= '500' AND category IS IN 'computer' | Condition for the item. `500` refers to 500$ in this case.                       |
| order_condition               |           | price-mode = ""GROSS_MODE""                     | Condition for the order.                        |
| stores | ✓ |  | AT,DE  | Defines the stores to apply the commission in. accepts multipe values. |
| merchants_allow_list   |   |  MER000002,MER000006  |  One or more merchants to apply the commission to. |
| fixed_amount_configuration |  |  {% raw %} `EUR|0.5|0.5,CHF|0.5|0.5` {% endraw %} |   Defines fixed amount commission configuration in case a fixed commission needs to be applied to each item in the order. Format: {% raw %} `CURRENCY|GROSS AMOUNT|NET AMOUNT` {% endraw %}. `0.5` refers to 50 cents in this example. |
