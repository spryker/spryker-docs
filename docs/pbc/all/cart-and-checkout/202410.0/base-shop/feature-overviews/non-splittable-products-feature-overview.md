---
title: Non-splittable Products feature overview
description: The document describes the concept of product quantity restrictions-  its types and how they can be imported
last_updated: Aug 2, 2021
template: concept-topic-template
originalArticleId: 7db585a7-80d6-4584-a662-e00d42f27cf4
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/201907.0/non-splittable-products-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/non-splittable-products-feature-walkthrough.html
  - /docs/scos/user/features/202204.0/non-splittable-products-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/non-splittable-products-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/feature-overviews/non-splittable-products-feature-overview.html

---


Sometimes shop owners want their customers to buy less or more of specific products. For example, when selling to bulk buyers at wholesale prices or when running promotional campaigns and creating special offers, you might want not to allow buying less than a certain quantity. Also, for some products, it might be more convenient to sell particular quantities that are, for example, multiples of a specific number. For example, you don't sell less than three meters of a cable and don't want customers to buy cables with a length that is not a multiple of three.

Product quantity restriction values define the number of items that customers can put into the cart. You can specify the product quantity restrictions by importing them for your project with the `data:import:product-quantity` command. For details about the import file, see [File details: product_quantity.csv](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-quantity.csv.html).

In the import file, you can set three values for quantity restrictions: minimum, maximum, and interval.
The *minimum* value defines the smallest allowable quantity of a specific item in the cart. The *maximum* quantity restricts the allowable quantity of items in the cart to a specific value. The *interval* value determines an increment value by which the quantity can be changed. For example, if you specify minimum quantity as 5, interval as 3, and maximum quantity as 14, a user can add 5, 8, 11, and 14 items to the cart. If a user adds an unacceptable quantity of items to the cart, they are suggested to buy another allowable quantity of items.

## Current constraints

The feature has the following functional constraints:
- According to the current setup, quantity suggestions in the quantity restrictions do not work with the shopping lists. A buyer can add any quantity of the product to the shopping list. It can lead to a situation where the customer is forced to guess what amount to add from a shopping list because they do not see quantity suggestions on the shopping list page. However, when they add this product from a shopping list to a shopping cart, an error message appears notifying the customer that a selected amount cannot be added (if any quantity restrictions were set up for this product).
- There is no UI for the product restrictions in the Back Office.

| DATA IMPORT |
|---------|
|[File details: product_quantity.csv](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-quantity.csv.html) |
