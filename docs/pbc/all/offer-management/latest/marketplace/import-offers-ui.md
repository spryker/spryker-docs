---
title: "Merchant Portal: Import Product Offers"
description: Learn how to import product offers via the Merchant Portal.
last_updated: Sep 26, 2025
template: back-office-user-guide-template
---

To import product offers in the Merchant Portal, follow these steps:

1. In the Merchant Portal, go to **Data Import**.
2. On the **Data Import** page, click **Start Import**. This opens the **Start Import** drawer.
3. In **File Templates**, click **CSV template Product** to download a file template.
4. In **Import Configuration**, select **Product offer** and choose the import file with product offers from your computer.
5. Click **Import** to start uploading the selected file.

If there are any issues with the file, warning messages will appear. Fix the issues and re-import the file as needed.

The imported file will be listed on the **Data Import** page. If there are no errors, the status will be **Successful**.

## Product offer import file reference

{% info_block infoBox "Editor" %}

Some editors change symbols depending on your location. To ensure successful imports, we recommend using Google Sheets to edit import files.

{% endinfo_block %}

This section explains how to fill out a product offer import file.

| COLUMN                                                                                             | REQUIRED    | DATA TYPE | DATA EXAMPLE        | DATA EXPLANATION                                                                                                         |
|----------------------------------------------------------------------------------------------------|-------------|-----------|---------------------|--------------------------------------------------------------------------------------------------------------------------|
| offer_reference                                                                                    | ✓           | String    | offer418            | Unique identifier of the offer.                                                                                          |
| concrete_sku                                                                                       | ✓           | String    | 112_312526172       | SKU of the existing concrete product.                                                                                    |
| merchant_sku                                                                                       |             | String    | M10001              | Merchant custom SKU value.                                                                                               |
| is_active                                                                                          | Create only | Boolean   | 1                   | Can be active (1) or inactive (0).                                                                                       |
| store_relations                                                                                    | Create only | String    | DE;AT               | Product offer availability in stores. Supports multiple values separated by `;`.                                         |
| stock.%WAREHOUSE_NAME%.quantity                                                                    |             | Integer   | 10                  | Number of product offer items in stock for the specified warehouse.                                                      |
| stock.%WAREHOUSE_NAME%.is_never_out_of_stock                                                       |             | Boolean   | 1                   | Used for non-tangible products (e.g., software, services). Set to 1 (true) if the product offer never runs out of stock. |
| valid_from                                                                                         |             | Date      | 2025-12-01 00:00:00 | Start date of product offer availability in the `YYYY-MM-DD HH:MM:SS` format.                                            |
| valid_to                                                                                           |             | Date      | 2025-12-31 23:59:59 | End date of product offer availability in the `YYYY-MM-DD HH:MM:SS` format.                                              |
| price.%STORE%.%PRICE_TYPE%.%CURRENCY%.value_net <br> Example: `price.DE.default.EUR.value_net`     |             | Integer   | 10077               | NET price in cents, `PRICE_TYPE` can be `default` or `original`. <br> Example: `10077` = **100.77€**.                    |
| price.%STORE%.%PRICE_TYPE%.%CURRENCY%.value_gross <br> Example: `price.DE.default.EUR.value_gross` |             | Integer   | 10077               | Gross price in cents, `PRICE_TYPE` can be `default` or `original`. <br> Example: `10077` = **100.77€**.                  |



## Error Management

If a file contains mistakes, the import status will change to `Failed`. You can download and analyze an error file to identify the issues.

- Only the first error is processed per imported line. If a line contains multiple mistakes, you must re-import the file after fixing the first error to see the next one.
- If a file contains several lines with mistakes, only those lines will not be imported; all other lines will be processed successfully.

## Product Offer Approval Status

By default, product offers are imported with the approval status **Waiting for Approval**. This behavior can be customized at the project level by configuring an alternative status.
