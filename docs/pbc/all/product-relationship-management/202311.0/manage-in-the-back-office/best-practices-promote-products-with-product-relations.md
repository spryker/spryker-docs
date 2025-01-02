---
title: "Best practices: Promote products with product relations"
description: Learn how to promote products using product relations
template: back-office-user-guide-template
last_updated: Nov 21, 2023
related:
  - title: Product Relations feature overview
    link: docs/pbc/all/product-relationship-management/page.version/product-relationship-management.html
redirect_from:
- /docs/scos/user/back-office-user-guides/202204.0/merchandising/product-relations/best-practices-promote-products-with-product-relations.html
---

This best practices guide describes how to promote products by configuring product relations.

Let's assume that you have different Sony smartwatches in your shop. When a customer opens a product details page of a Sony smartwatch, you want them to be able to see all the other similar smartwatches.

To set up the need product relations, follow the steps in the sections below.

## Define general settings of a product relation

1. Go to **Merchandising&nbsp;<span aria-label="and then">></span> Product Relations**.

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

10. Click **Next**.
    This opens the **Products** tab.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/product-relations/best-practices-promote-products-with-product-relations.md/define-general-settings-of-a-product-relation.mp4" type="video/mp4">
  </video>
</figure>


## Define related products by adding condition rules

When the **Products** tab opens, there is a preadded rule on the page. To define related products, do the following:

1. For the parameter, select **brand**.
    This adds a relation operator field with the **equal** operator prerselected. This also adds a value field.
2. In the value field, enter `sony`.
    This means that only Sony products will be displayed as related products for *Sony SmartWatch 3*.
3. Click **Add rule**.
4. For parameter, select **category**.
5. In the value field, enter `smartwatches`.
    This excludes all the other product types from the related products of *Sony SmartWatch 3*. For example, you also have Sony cameras, but the customers browsing smartwatches are unlikely to want to buy cameras.
6. Click **Add group**.
    This adds a subgroup with a rule.
7. For parameter select **color**.
8. In the value field, enter `silver`.
    This means that only silver products will be displayed as related.
9. Click **Add rule**.
10. For parameter select **color**.
11. In the value field, enter `white`.
    This means that only white products will be displayed as related. *Sony SmartWatch 3* is silver. Since white is similar to silver, your customers might be interested in that color too.
12. In the subgroup, click the **OR** combination operator.
    This means that either white or silver products are displayed as related for *Sony SmartWatch 3*.
13. In the main group, click the **AND** combination operator.
    This means that only white or silver Sony products from the Smartwatches category will be displayed for *Sony SmartWatch 3* as related. The products fulfilling these rules are displayed in the table below.

14. Click *Save*.
    This creates the product relation and opens the **Edit Product Relation** page.


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/product-relations/best-practices-promote-products-with-product-relations.md/define-related-products-by-defining-condition-rules.mp4" type="video/mp4">
  </video>
</figure>

The result looks as follows on the Storefront.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/merchandising/product-relations/best-practices-promote-products-with-product-relations.md/related-products-on-the-storefront.mp4" type="video/mp4">
  </video>
</figure>

You've set up related products for just one product: *Sony SmartWatch 3*. All the other Sony smartwatches don't have related products on their pages. To show related products on the pages of all the other smartwatches, repeat the process for each of them.  
