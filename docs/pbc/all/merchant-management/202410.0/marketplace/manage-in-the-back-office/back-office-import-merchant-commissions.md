---
title: "Back Office: Import merchant commissions"
description: Learn how to import merchant commissions in the Spryker Back Office for your Spryker B2B Marketplace projects.
last_updated: Jun 16, 2024
template: back-office-user-guide-template
redirect_from:
  - /docs/pbc/all/merchant-management/202407.0/marketplace/import-and-export-data/merchant-commission/import-file-details-merchant_commission_merchant.csv.html
---

To import [merchant commissions](/docs/pbc/all/merchant-management/202410.0/marketplace/marketplace-merchant-commission-feature-overview.html), follow the steps:

1. In the Back Office, go to **Marketplace&nbsp;<span aria-label="and then">></span>Merchant Commissions**.
2. On the **Merchant Commissions** page, click **Import**.
  This opens the **Import Merchant Commissions** page.

3. Optional: If you don't have a file with merchant commissions, to prepare it, in **1 Download template**, click on **commissions_template.csv**.
  This downloads the file. Fill the file with merchant commission data using the template and the [reference](#reference-information-merchant-commissions-import-file).

4. In **2 Import CSV file**, click **Choose File** and select the file with commissions on your machine.
  This displays the name of the file next to **Choose File**.

5. To import the selected file with commissions, click **Upload**.  
  This opens the **Import Merchant Commissions** page. The imported merchant commissions are displayed in the table.

## Reference information: Merchant commissions import file

{% info_block infoBox "" %}

* Some editors change the symbols based on your location. To make sure you can import commissions, we recommend using Google Sheets to edit import files.
* For an example of a filled out file, you can export the existing default commissions by clicking **Export** on the **Merchant Commissions** page.


{% endinfo_block %}

This section explains how to fill out a merchant commission import file. For more information about the fields in this file, see [Marketplace Merchant Commissions feature overview](/docs/pbc/all/merchant-management/202410.0/marketplace/marketplace-merchant-commission-feature-overview.html).

<table>
<thead>
<tr>
<th>COLUMN</th>
<th>REQUIRED</th>
<th>DATA EXAMPLE</th>
<th>DATA EXPLANATION</th>
</tr>
</thead>
<tbody>
<tr>
<td>key</td>
<td>✓</td>
<td>mc1</td>
<td>Unique identifier of the merchant commission.</td>
</tr>
<tr>
<td>name</td>
<td>✓</td>
<td>Merchant Commission 1</td>
<td>Name of the merchant commission. Accepted length: from 1 to 255 characters. Must be unique.</td>
</tr>
<tr>
<td>description</td>
<td></td>
<td></td>
<td>Description of the merchant commission.</td>
</tr>
<tr>
<td>valid_from</td>
<td>✓</td>
<td>6/30/2029 0:00:00</td>
<td>Start date of the merchant commission validity in UTC.</td>
</tr>
<tr>
<td>valid_to</td>
<td>✓</td>
<td>8/30/2029 0:00:00</td>
<td>End date of the merchant commission validity in UTC.</td>
</tr>
<tr>
<td>is_active</td>
<td>✓</td>
<td>1</td>
<td>Defines if the merchant commission is active(1) or inactive(0).</td>
</tr>
<tr>
<td>amount</td>
<td></td>
<td>5</td>
<td>Commission in percentage. Accepts decimals—for example, <code>10.99</code> would mean 10.99%. If <code>calculator_type_plugin</code> is set to <code>fixed</code>, <code>amount</code> must be <code>0</code>.</td>
</tr>
<tr>
<td>calculator_type_plugin</td>
<td>✓</td>
<td>percentage</td>
<td>Defines how commission is calculated. By default, accepts <code>percentage</code> and <code>fixed</code>.</td>
</tr>
<tr>
<td>group</td>
<td>✓</td>
<td>primary</td>
<td>Can be <code>primary</code> or <code>secondary</code>.</td>
</tr>
<tr>
<td>priority</td>
<td>✓</td>
<td>1</td>
<td>Defines which commission to apply within a group. Priority is defined in an ascending order starting from one.</td>
</tr>
<tr>
<td>item_condition</td>
<td></td>
<td>item-price &gt;= &#39;500&#39; AND category IS IN &#39;computer&#39;</td>
<td>Condition for the item. <code>500</code> refers to 500$ in this case.</td>
</tr>
<tr>
<td>order_condition</td>
<td></td>
<td>price-mode = &quot;&quot;GROSS_MODE&quot;&quot;</td>
<td>Condition for the order.</td>
</tr>
<tr>
<td>stores</td>
<td>✓</td>
<td>AT,DE</td>
<td>Defines the stores to apply the commission in. accepts multiple values.</td>
</tr>
<tr>
<td>merchants_allow_list</td>
<td></td>
<td>MER000002,MER000006</td>
<td>One or more merchants to apply the commission to.</td>
</tr>
<tr>
<td>fixed_amount_configuration</td>
<td></td>
<td> EUR|0.5|0.5,CHF|0.5|0.5</td>
<td>Defines fixed amount commission configuration in case a fixed commission needs to be applied to each item in the order. Format: <code>CURRENCY|GROSS AMOUNT|NET AMOUNT</code>.<code>0.5</code> refers to 50 cents in this example.</td>
</tr>
</tbody>
</table>
