



Let's say that today is January 19, 2017. Soon your shop is going to receive Asus laptops with a new Intel processor. You want to quickly sell the laptops with the old processor. You are going to give a 20% discount for the old laptops.

## 1. Define general settings of the discount

1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Discount**.
2. On the **Discount** page, click **Create new discount**.
3. On the **Create Discount** page, for **STORE RELATION**, select **DE** and **AT**. The discount will be applicable in both shops.
4. Select a **Cart rule**. The discount will be applied automatically once a customer adds an Intel-based Asus laptop to cart.
6. For **NAME**, enter **20% discount for Intel-based Asus laptops**. This name will be displayed in cart when the discount is applied.

7. Optional: Enter a **DESCRIPTION**.

8. Select the **EXCLUSIVE** checkmark.
    When this discount is applied to a cart, all the other discounts will be discarded.
9. For **VALID FROM**, select January 19, 2017.
    The discount will be active right after you create it.
10. For **VALID TO**. select January 26, 2017.
    After a week, you can reevaluate the discount based on sale results.
11. Click **Next**.

## 2. Define discount calculation and the products to apply the discount to

1. Click the **Discount calculation** tab.
2. For **CALCULATOR TYPE**, select **Percentage**.
    The discount will be calculated as a percentage of the products' price.
3. For **Percentage**, enter 20.
    20% of the products' price will be discounted.
4. For **DISCOUNT APPLICATION TYPE**, select **QUERY STRING**.
5. 
    * **QUERY STRING**: Add a query using the query builder or by entering a plain query.
    * **PROMOTIONAL PRODUCT**:
        1. Enter **ABSTRACT PRODUCT SKU**.
        2. Enter a **QUANTITY**.
6. Click **Next**.

## 3. Define on what conditions the discount can be applied


1. Click the **Conditions** tab.
2. For **APPLY WHEN**, add a query using the query builder or by entering a plain query.
3. For **THE DISCOUNT CAN BE APPLIED IF THE QUERY APPLIES FOR AT LEAST X ITEM(S).**, enter a number.
4. Click **Save**.

This refreshes the page with a success message displayed.

## 4. Generate voucher codes

If you are creating a cart rule, proceed to step [5. Activate the discount](#activate-the-discount)

1. Click the **Voucher codes** tab.
2. Enter a **QUANTITY**.
2. Optional: Enter a **CUSTOM CODE**.
3. Optional: For **ADD RANDOM GENERATED CODE LENGTH**, select a number.
4. Enter a **MAX NUMBER OF USES**.
5. Click **Generate**.
    This refreshes the page with a success message displayed. The created voucher codes are displayed in the **Generated Discount Codes** section.

## 5. Activate the discount

Optional: To make the discount voucher redeemable on the Storefront, click **Activate** in the top-right corner.

This refreshes the page with a success message displayed.



**More advanced example**

To create a discount that will have an extensive number of conditions, you use the condition **groups**. Meaning you collect different rules under different groups and split them into separate chunks.
Let's say you have received a task to create a discount with the following conditions:

**B2B Scenario**
The discount is going to be applied if one of the following is fulfilled:
* The price mode is **Gross**, and the subtotal amount is greater or equal: 100 € (Euro) **OR** 115 CHF (Swiss Franc)

**OR**

* The price mode is **Net**, and the subtotal amount is greater or equal: 80 € (Euro) **OR** 95 CHF (Swiss Franc)

The setup will look like the following:
![B2B scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2b-scenario.png)

**B2C Scenario**
The discount is going to be applied if one of the following is fulfilled:
* On **Tuesday**, and the item color is red, this item does not have the label **New**, and the customer adds at least two items (or more) to a cart

**OR**

* On **Thursday**, and the item color is white, this item does not have the label **New**, and the customer adds at least two items (or more) to a cart

The setup will look like the following:
![B2C scenario](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Discount/Discount+Conditions:+Reference+Information/b2c-scenario.png)
