---
title: Discount Calculation- Reference Information
originalLink: https://documentation.spryker.com/v4/docs/discount-calculation-reference-information
redirect_from:
  - /v4/docs/discount-calculation-reference-information
  - /v4/docs/en/discount-calculation-reference-information
---

This topic contains the information that you need to know when working with discount calculations in the **Discount calculation** tab.
***

## Calculator Type
The discount can be calculated in two ways:
* **Percentage Value**: The discount is calculated as a percentage of the discounted items. If selected, you will need to set the percentage value (e.g. 25) 
* **Fixed Value**: A fixed amount is discounted. If you select this type, you will need to specify the amount (Gross, or Net, or Both) for each currency used in your store. 

Example:

| Product Price | Calculator Plugin | Amount | Discount Applied | Price to Pay |
| --- | --- | --- | --- | --- |
| 50 € | Calculator Percentage | 10 |5 € | 45 € |
| 50 €| Calculator Amount | 10 €| 10 €| 40 €|
***
## Discount Application Type
You can select one of the following options:
* Query String
* Promotional Product

### Query String
You can use a query to define discount conditions. Only products that satisfy the query's conditions are discountable. Queries also define if the discount is applied to one or several products. Discount conditions are set by using either **Query Builder** or by specifying a **Plain query**.

Use the Query Builder to construct queries (guided) or the Plain query field to enter them (free text). You can switch between both modes by clicking the corresponding button (note: incomplete queries cannot be transferred between the two modes).
**Query Builder**
![Discount_Calculation_Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/query-string.png){height="" width=""}

**Plain Query**
![Discount_Calculation_Plain Query](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/discount-calculation-plain-query.png){height="" width=""}

The query builder lets you combine different conditions with connectors (**AND** and **OR**). Multiple conditions (rules) can be added and grouped in this way. Each condition (rule) consists of:
* field (e.g. **attribute.color**)
* operator (e.g. equal: **=**)
* value tokens (e.g. **blue**) 
{% info_block infoBox "Info" %}
The fields and values are defined by your shop data.
{% endinfo_block %}

These tokens are used to build plain queries too. The pattern of the plain query is as follows:
![Plain Query Pattern](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/plain-query-pattern.png){height="" width=""}

You can find plain query examples in the following table.
|Plain query|Explanation|
|---|---|
|day-of-week = '1'|Discount applies if the order is placed on Monday.|
|shipment-carrier != '1' AND price-mode = 'GROSS_MODE'|Discount applies if the shipment carrier with the attribute "1" is not chosen and gross pricing is selected.|
|currency != 'EUR' OR price-mode = 'GROSS_MODE'|Discount applies if the selected currency is not Euro or the pricing mode is gross.|
{% info_block infoBox "Info" %}
See [Token Description Tables](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/discount/references/token-descripti
{% endinfo_block %} for more information.)

### Discount promotion to product
Sometimes, it is more profitable to give away free products or provide a discount for the products that are not yet in the cart instead of the ones that are already there. This discount application type enables you to do just that. When a customer fulfills the discount conditions, the promotional product appears below other items. The SKU of the promotional product you wish to be available for adding to cart is entered in the **Abstract product sku** field. Then, you enter the **Quantity** of the chosen promotional product to be available for adding to cart.
![Application type](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Calculation:+Reference+Information/Application+type.png){height="" width=""}
***
You can either give away the promotional product completely for free or provide a discount for this product by specifying the percentage value or a fixed amount to be discounted from the promotional product's price (when giving the product for free, the percentage value should be 100%, while the fixed-price value should be equal to the product's price).
