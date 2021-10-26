---
title: Non-splittable Products feature overview
description: The article describes the concept of product quantity restrictions-  its types and how they can be imported
last_updated: Jan 13, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/product-quantity-restrictions
originalArticleId: 0c0a9f00-bf3b-4667-946e-fcb1f7c6494a
redirect_from:
  - /v3/docs/product-quantity-restrictions
  - /v3/docs/en/product-quantity-restrictions
---


Sometimes shop owners want their customers to buy less or more of specific products. For example, when selling to bulk buyers at wholesale prices or when running promotional campaigns and creating special offers, you might want not to allow buying less than a certain quantity. Also, for some products, it might be more convenient to sell paritcular quantities that are, for example, multiples of a specific number. For example, you don't sell less than three meters of a cable and don't want customers to buy cables with the length which is not a multiple of three.

Product quantity restriction values define the number of items that customers can put into the cart. You can specify the product quantity restrictions by importing them for your project with the `data:import:product-quantity` command. See [File details: product_quantity.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-quantity.csv.html) for details on the import file.

In the import file, you can set three values for quantity restrictions: minimum, maximum, interval.
The *minimum* value defines the smallest allowable quantity of a specific item in the cart. The *maximum* quantity restricts the allowable quantity of items in the cart to a specific value. The *interval* value determines an increment value by which the quantity can be changed. For example, if you specify minimum quantity as 5, interval as 3, and maximum quantity as 14, it means that a user can put 5, 8, 11, and 14 items to the cart. If a user puts an unacceptable quantity of items to cart, they will be suggested to buy another, allowable, quantity of items.

## Current constraints
Currently, the feature has the following functional constraints:
* According to the current setup, quantity suggestions in the quantity restrictions do not work with the shopping lists. A buyer can add any quantity of the product to the shopping list. It can lead to a situation where the customer is forced to guess what amount should be added from a shopping list - because they will not see quantity suggestions on the shopping list page. However, when they add this product from a shopping list to a shopping cart, an error message will appear notifying the buyer that a selected amount cannot be added (if any quantity restrictions were set up for this product).
* There is no UI for the product restrictions in the Back Office.

{% info_block warningBox %}

Are you a developer? See [Non-splittable feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/non-splittable-products-feature-walkthrough.html) for developers.

{% endinfo_block %}
