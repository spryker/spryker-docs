---
title: Creating a voucher
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-voucher
redirect_from:
  - /2021080/docs/creating-a-voucher
  - /2021080/docs/en/creating-a-voucher
---

This guide describes how to create a voucher.

Vouchers are codes that customers can redeem during checkout. Voucher codes are grouped into pools to apply logic to multiple vouchers at once. You can generate a single voucher to be used by multiple customers or a pool of dedicated one-time per-customer voucher codes. 

## Prerequisites

To start working with discounts, navigate to **Merchandising** > **Discount**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Creating a voucher

To create a discount voucher:
1. On the *Discount* page,  in the top-right corner, click **Create new discount**.
2. On the *Create new discount* page, in the *General* tab, do the following:
    1. In *Store relation*, check the stores you wish the discount to be active in.
    2. In the *Discount Type* drop-down, select **Voucher codes**.
   3. In the **Name** field, specify the name for the voucher.
    4. _Optional_: Enter the description for the voucher in the **Description** field.
    5. Specify if the voucher is exclusive. 
    6. Specify the validity interval (lifetime) of the voucher.
 3. Click **Next** or select the **Discount calculation** tab to proceed.
 4. On the *Create Discount* page, in the *Discount calculation* tab, do the following:
    1.  Select either **Calculator percentage** or **Calculator fixed** in the **Calculator type** drop-down. 
    {% info_block warningBox "Note" %}
The next step varies based on the selected calculator type.
{% endinfo_block %}
    a. **Calculator fixed**: Enter the prices to be discounted
    b.  **Calculator percentage**: Enter the values (percentage) to be discounted
    2. Select the **Discount application type** and define what products the voucher will be applied to. See reference information of the [Discount calculation](#discount-calculation-tab) tab for more details.
 5. Click **Next**, or select the *Conditions* tab to proceed.
 6. On the *Create new discount* page, in the *Conditions* tab, do the following:
    1. Select the **Apply when** conditions or click **Plain query** and enter the  query manually. See reference information of the [Conditions](#conditions) tab for more details.
    2. Enter the value for the **The discount can be applied if the query applies for at least X item(s).** field.
7. Click **Save** to create the new voucher. 

When you click **Save**, an additional tab named *Voucher Codes* appears. Here, you can generate, view, and export voucher codes (if they were already created). 
The list is empty until codes are generated.

In the *Voucher code* tab, do the following:
1. Enter the **Quantity** for voucher codes you want to generate.
2. _Optional_: Enter a **Custom code**.
3. Set the **Add Random Generated Code Length** by selecting the value from a drop-down list.
4. Set the **Maximum number** of uses.
5. Click **Generate** to complete the process.
    The voucher codes will be generated according to your specifications. The codes will be displayed in the table at the bottom of the page.
5. Click **Activate** in the top right corner to activate the voucher.
Even if a voucher is valid and the decision rules are satisfied, a voucher can only be redeemed if it’s currently active.
{% info_block infoBox %}
See [Voucher code](#voucher-code
{% endinfo_block %} for more information.

**Tips & tricks**
Once you generated voucher codes, you can export them as a .csv file.
To do that, click **Export** below *Generate*.

## Reference information: Creating a voucher

This section describes attributes you enter and select when creating or editing a voucher.

### <a id="discount-overview-page"></a>Discount Overview page

In the *Discount* section, you see the following:

* The discount ID and name.
* The amount that is discounted.
* The type of discount, its validity period, and status.
* The identifier for Exclusive.
* The actions that you can do on each specific discount.

By default, the last created discount goes on top of the table. However, you can sort and search the list of discounts.

All columns with headers having arrows in the List of Orders table are sortable. 

**Actions column**
All the discount management options that you can invoke from the _Actions_ column are described in the following table.

| ACTION |DESCRIPTION  |
| --- | --- |
|Edit  | Takes you to the *Edit Discount* page. Here, you can modify discount settings or generate voucher codes if it is a voucher discount. |
|  View| Takes you to the *View Discount* page. Here, you can find all the information about the chosen discount. |
|  Add code| You can see this action only if the chosen discount is of a voucher type. It takes you directly to the *Voucher codes* tab of the *Edit Discount* page. Here, you can generate new voucher codes, export or delete the ones that are already created. |
| Activate/Deactivate | Activates or deactivates a specific discount. If a voucher discount is deactivated, its codes are invalid when entered in a cart. If a cart rule is deactivated, it won't be automatically applied even if the discount rules are fulfilled. |

### Create Discount page

This section describes attributes you select and enter on the *Create Discount* and *Edit Discount* pages when creating and editing a discount.

#### General information tab

The following table describes the attributes you enter and select in the *General information* tab:

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
|Store relation  |Stores you wish the discount to be active in. Multiple stores can be selected.|
| Discount Type | Drop-down list where you select either *Voucher code* or *Cart rule* discount type. |
| Name(A unique name that will be displayed to your customers) | Unique name that will be displayed to your customers. |
| Description | Unique description of the discount. |
| Non-Exclusive | Defines the discount exclusivity. Non-exclusive discounts can be redeemed in conjunction with other non-exclusive discounts.|
| Exclusive | Defines the discount exclusivity. An exclusive discount can only be used on its own. You cannot apply other discounts with an exclusive one unless a higher exclusive discount is used. Then, the higher discount is redeemed.  |
| Valid from and Valid to| Vouchers are redeemable/the cart rule is active between Valid From and Valid To dates, inclusive. E.g., a voucher can be redeemed/discount applies to the cart starting from 1/1/2018 until 31/12/2019.|

{% info_block infoBox "Info" %}
The name and the description should be meaningful to help other Back Office users understand what the discount does. Besides, the given name is displayed in the customer's cart when redeeming the voucher. Therefore, it must be unique.
{% endinfo_block %}

#### <a id="discount-calculation-tab"></a>Discount calculation tab

This section contains information you need to know when working with discount calculations in the *Discount calculation* tab.

**Calculator type**
The discount can be calculated in two ways:
* **Percentage Value**: The discount is calculated as a percentage of the discounted items. If selected, you will need to set the percentage value (e.g., 25) 
* **Fixed Value**: A fixed amount is discounted. If you select this type, you will need to specify the amount (Gross, or Net, or Both) for each currency used in your store. 

Example:

| PRODUCT PRICE | CALCULATOR PLUGIN | AMOUNT | DISCOUNT APPLIED | PRICE TO PAY |
| --- | --- | --- | --- | --- |
| 50 € | Calculator Percentage | 10 |5 € | 45 € |
| 50 €| Calculator Amount | 10 €| 10 €| 40 €|

**Discount application type**
You can select one of the following options:
* Query String
* Promotional Product

**Query String**
You can use a query to define discount conditions. Only products that satisfy the query's conditions are discountable. Queries also define if the discount is applied to one or several products. Discount conditions are set by using either the *query builder* or by specifying a *Plain query*.

Use the query builder to construct queries (guided) or the **Plain query** field to enter them (free text). You can switch between both modes by clicking the corresponding button (note that incomplete queries cannot be transferred between the two modes).
**Query builder**
![Discount_Calculation_Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/query-string.png)

**Plain Query**
![Discount_Calculation_Plain Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/discount-calculation-plain-query.png)

The query builder lets you combine different conditions with connectors (**AND** and **OR**). Multiple conditions (rules) can be added and grouped in this way. Each condition (rule) consists of:
* field (e.g., attribute.color)
* operator (e.g., equal(=))
* value tokens (e.g., blue) 
{% info_block infoBox "Info" %}
The fields and values are defined by your shop data.
{% endinfo_block %}

These tokens are used to build plain queries too. The pattern of the plain query is as follows:
![Plain Query Pattern](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/plain-query-pattern.png)

You can find plain query examples in the following table.
|PLAIN QUERY|EXPLANATION|
|---|---|
|day-of-week = '1'|Discount applies if the order is placed on Monday.|
|shipment-carrier != '1' AND price-mode = 'GROSS_MODE'|Discount applies if the shipment carrier with the attribute "1" is not chosen and gross pricing is selected.|
|currency != 'EUR' OR price-mode = 'GROSS_MODE'|Discount applies if the selected currency is not Euro or the pricing mode is gross.|
{% info_block infoBox "Info" %}
See [Token description tables](#token-descroption-tables
{% endinfo_block %} for more information.)

**Discount promotion to product**
Sometimes, it is more profitable to give away free products or provide a discount for the products that are not yet in the cart instead of the ones that are already there. This discount application type enables you to do just that. When a customer fulfills the discount conditions, the promotional product appears below other items. The SKU of the promotional product you wish to be available for adding to cart is entered in the **Abstract product sku** field. Then, you enter the **Quantity** of the chosen promotional product to be available for adding to cart.
![Application type](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/Application+type.png)

You can either give away the promotional product completely for free or provide a discount for this product by specifying the percentage value or a fixed amount to be discounted from the promotional product's price (when giving the product for free, the percentage value should be 100%, while the fixed-price value should be equal to the product's price).

#### <a id="conditions"></a>Conditions

This section provides information that you need to know when working with discount conditions in the *Conditions* tab.

Conditions are also called decision rules.

* A cart rule can have one or more conditions linked to it. The cart rule is redeemed only if every condition linked to it is satisfied. 
* Vouchers can be linked to one or more conditions. Vouchers are only redeemed if all linked conditions are satisfied.

The conditions are created in the form of a query and may be entered as a plain query or via the query builder. (See the [Discount calculation tab](#discount-calculation-tab) section for more details.)

{% info_block infoBox "Info" %}
If you do not need to add a condition, you can leave the query builder empty.
{% endinfo_block %}

Example: Discount is applied if five or more items are in the cart and it is Tuesday or Wednesday.
![Discount Condition](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/discount-condition.png)

The minimum order amount value specifies the threshold which should be reached for the products in a cart with a certain attribute to be discounted. When added to cart, products with the attribute specified by a query are measured against the threshold. By default, the minimum order amount value is 1. It means that any discount is applied if the number of items (that meet the rules) inside the cart is superior or equal to 1.

Example: Discount is applied if 4 or more items with the Intel Core processor are in the cart.
![Threshold](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/threshold.png)

**More Advanced Example**

To create a discount that will have an extensive number of conditions, you use the condition **groups**. Meaning you collect different rules under different groups and split them into separate chunks.
Let's say you have received a task to create a discount with the following conditions:

**B2B Scenario**
The discount is going to be applied if one of the following is fulfilled:
1. The price mode is **Gross**, and:
    * the subtotal amount is greater or equal: 100 € (Euro) **OR** 115 CHF (Swiss Franc)

**OR**

2. The price mode is **Net**, and:
    * the subtotal amount is greater or equal: 80 € (Euro) **OR** 95 CHF (Swiss Franc)

The setup will look like the following:
![B2B scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2b-scenario.png)

**B2C Scenario**
The discount is going to be applied if one of the following is fulfilled:
1. On **Tuesday**, and:
    * the item color is red, this item does not have the label **New**, and the customer adds at least two items (or more) to a cart 

**OR**

2. On **Thursday**, and:
    * the item color is white, this item does not have the label **New**, and the customer adds at least two items (or more) to a cart

The setup will look like the following:
![B2C scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2c-scenario.png)






#### <a id="voucher-code"></a>Voucher code tab

This section describes the information that you need to know when working with voucher codes in the *Voucher code* tab.

You enter and select the following attributes in **Edit Discount** > **Voucher code**:

| ATTRIBUTE | DESCRIPTION |  
| --- | --- |
| Quantity | Number of vouchers you need to generate. |  
| Custom code | When generating a single voucher code, you can enter it manually. If you want to create multiple codes at once, add a "Random Generated Code Length" to the custom code.|  
| Add Random Generated Code Length | This value defines the number of random characters to be added to the custom code. If you do not add any custom value, you can just select this value. The system will generate the codes with the length you select. |  
| Max number of uses (0 = Infinite usage) | Defines the maximum number of times a voucher code can be redeemed in a cart. |  

Use the placeholder **[code]** to indicate the position you want random characters to be added to. 
</br>**For example:**
   * **123[code]** (the randomly generated code will be added right after the custom code);
   *  **[code]123** (the randomly generated code will be added in front of the custom code).

**Maximum number of uses**
| VALUE | BEHAVIOR |  
| --- | --- | 
| 0 | Infinitely redeemable. |  
| 1 | Voucher can be redeemed once. |  
| n > 1 | Voucher can be redeemed _n_ times. |  

![Voucher code](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Voucher+Codes:+Reference+Information/voucher-code.png)


**Voucher Code Pool**
The voucher codes of a discount are all contained in the same voucher code pool. One customer may only redeem one voucher code per pool per cart.

#### <a id="token-descroption-tables"></a>Token description tables

This section contains a set of tables that describe fields, value types, and operators you use when building a plain query.

**Tokens**

![Token](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Token+Description+Tables/tokens.png)

| VALUE | DESCRIPTION |
| --- | --- |
| Fields | The available fields may include SKU, item-price, item-quantity, or a variety of attributes (e.g., **currency** on the image above). |
| Operator | Operator compares the value of a field on the left with the value(s) on the right (e.g., equals (=), greater than (>)). If the expression evaluates to true, the discount can be applied. (operator is **equal** on the image above) |
| Value | Value types must match the selected field. The asterisk (*) matches all possible values. (on the image above, the value is **Swiss Franc**)|
| Combine Conditions | ‘AND’ and ‘OR’ operators are used to combine conditions. (**AND** on the image above) |
|Grouping|When building more complex queries, conditions may be grouped inside parentheses ‘( )’.|

**Fields and value types (Plain Query)**

|FIELD|PLAIN QUERY|VALUE TYPE|DESCRIPTION|
|-|-|-|-|
|Calendar week|calender-week|Number|Week number in a year (1-52)|
|Day of week|day-of-week|Number|Day of week (1-7)|
|Grand total|grand-total|Number (Decimal)|Sum of all totals|
|Subtotal|sub-total|Number (Decimal)|Sum of item prices w/o shipment expenses and discounts|
|Item price|item-price|Number (Decimal)|Price of one item|
|Item quantity|item-quantity|Number|Number of items|
|Month|month|Number|Month of the year (1-12)|
|SKU|sku|String|Any value depends on how SKUs are stored|
|Time|time|hour:minute|Time of the day|
|Total quantity|total-quantity|Number|Total cart quantity|
|Attribute|attribute.*|String, number|Any value|
|Customer Group|customer-group|String|Any value, use a customer group name for an exact match|

**Operators (Plain Query)**

|OPERATOR|OPERATOR FOR PLAIN QUERY|VALUE TYPE|DESCRIPTION|
|-|-|-|-|
|Contains|CONTAINS|String, Number|Checks if the value is contained in the field|
|Doesn’t contain|DOES NOT CONTAIN|String, Number|Checks if the value is not contained in the field
|Equal|=|String, Number|Checks if the value is equal to the value of the right operand|
|Not Equal|!=|String, Number|Checks if the value is not equal to the value of the right operand|
|In|IS IN|List|Values need to be semicolon-separated|
|Not In|IS NOT IN|List|Values need to be semicolon-separated|
|Less|<|Number|Checks if the value is less than the value of the right operand|
|Less or equal|<=|Number|Checks if the value is less than or equal to the value of the right operand|
|Greater|>|Number|Checks if the value is greater than the value of the right operand|
|Greater or equal|>=|Number|Checks if the value is greater than or equal to the value of the right operand|

**What's next?**
See [Managing Discounts](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/discount/managing-discou) to know more about the actions you can do once the discount is created. 

