---
title: "Best practices: Promote products with product relations"
description: Learn how to promote products using product relations
template: back-office-user-guide-template
---

This best practices guide describes how to promote products by configuring product relations.

Let's assume that you have different Sony smartwatches in your shop. When a customer opens a product details page of a Sony smartwatch, you want them to be able to see all the other similar smartwatches.

1. Go to **Merchandising** > **Product Relations**.
2. On the **Product Relations** page, click **Create Product Relation**.
    The **Create Product Relation** page opens.
3. For **PRODUCT RELATION KEY**, enter `sony-smartwatch-1`.
    This is just for your reference.
4. For **RELATION TYPE**, select **Related products**.
    This relation type displayed related product on the product details page.
5. Select the **UPDATE REGULARLY** checkbox.
    This option lets you keep the list of related products up to date. As your product catalog changes, the related products will be automatically updated based on the criteria you are going to define in a later step.
6. Select the **IS ACTIVE** checkbox.
    This option starts displaying related products on the Storefront after you create the product relation.
7. In the **Product owning the relation** pane, in the search field, enter `090`.
    This filters the products by `090`.
8. Next to the *Sony SmartWatch 3* product, click **Select**. The related products you are going to select in a later step will be displayed on the product details page of this product.
    This displays the *Sony SmartWatch 3* product in the **Selected product** section.

9. In the **Store relation** pane, select **DE** and **AT** checkboxes. The product relation will be displayed in these stores.

10.  Click **Next**.


When the **Products** tab opens, there is a preadded rule on the page. To define related products, do the following:

1. For the parameter, select **brand**.
    This adds a relation operator field with the **equal** operator prerselected. This also adds a value field.
2. In the value field, enter `sony`.
3. Click **Add rule**.
4. For parameter, select **category**.
5. In the value field, enter `smartwatches`.
6. Click **Add group**.
    This adds a subgroup with a rule.
7. For parameter select **color**.
8. In the value field, enter `white`.
9. Click **Add rule**.
10. For parameter select **color**.
11. In the value field, enter `silver`.
12. In the subgroup, click the **OR** combination operator.
    This means that either white or silver products are displayed as related for *Sony SmartWatch 3*.
13. In the main group, click the **AND** combination operator.
    This means that only white or silver Sony products from the smartwatches category will be displayed for *Sony SmartWatch 3* as related. The products fulfilling these rules are displayed in the table below.
