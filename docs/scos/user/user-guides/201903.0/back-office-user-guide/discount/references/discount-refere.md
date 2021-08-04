---
title: Discount- Reference Information
originalLink: https://documentation.spryker.com/v2/docs/discount-reference-information
redirect_from:
  - /v2/docs/discount-reference-information
  - /v2/docs/en/discount-reference-information
---

This topic provides you with the information that you need to know when working with discounts.
{% info_block warningBox "Note" %}
You can find the information related to discount calculation, conditions and voucher codes in separate articles. See the **Related Articles** section.
{% endinfo_block %}

## Discount Overview Page
In the **Discount** section, you see the following:

* The discount ID and name
* The amount that is discounted
* The type of discount, its validity period, and status
* The identifier for Exclusive
* The actions that you can do on each specific discount

By default, the last created discount goes on top of the table. However, you can sort and search the list of discount.

All columns with headers having arrows in the List of Orders table are sortable. 
***
## Actions Column
All the discount management options that you can invoke from the _Actions_ column on the **Discount Overview** page are described in the following table.

| Action |Description  |
| --- | --- |
|**Edit**  | Takes you to the **Edit Discount** page. Here, you can modify discount settings or generate voucher codes if it is a voucher discount. |
|  **View**| Takes you to the **View Discount** page. Here, you can find all the information about the chosen discount. |
|  **Add code**| You can see this action only if the chosen discount is of a voucher type. It takes you directly to the **Voucher codes** tab of the **Edit Discount** page. Here, you can generate new voucher codes, export or delete the ones that are already created. |
| **Activate/Deactivate** | Activates or deactivates a specific discount. If a voucher discount is deactivated, its codes are invalid when entered in a cart. If a cart rule is deactivated, it won't be automatically applied even if the discount rules are fulfilled. |

## Edit Discount > General tab

The following table describes the attributes you enter and select on the **Edit Discount** page, the **General** tab:

| Attribute |Description  |
| --- | --- |
|**Store relation**  |The stores you wish the discount to be active in. Multiple stores can be selected.|
| **Discount Type** | A drop-down list where you select either **Voucher code** or **Cart rule** discount type. |
| **Name** | A unique name that will be displayed to your customers. |
| **Description** | A unique description of the discount. |
| **Non-Exclusive** | Defines the discount exclusivity. Non-exclusive discounts can be redeemed in conjunction with other non-exclusive discounts.|
| **Exclusive** | Defines the discount exclusivity. An exclusive discount can only be used on its own. You **cannot apply** other discounts with an exclusive one unless a higher exclusive discount is used. Then, the higher discount is redeemed.  |
| **Valid from** and **Valid to**| Vouchers are redeemable/the cart rule is active between Valid From and Valid To dates, inclusive. E.g.:  voucher can be redeemed/discount applies to the cart starting from 1/1/2018 until 31/12/2019.|

{% info_block infoBox "Info" %}
The name and the description should be meaningful to help other Back Office users understand what the discount does. Besides, the given name is displayed in the customer's cart when redeeming the voucher. Therefore, it must be unique.
{% endinfo_block %}
