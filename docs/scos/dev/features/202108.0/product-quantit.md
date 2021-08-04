---
title: Non-splittable Products feature overview
originalLink: https://documentation.spryker.com/2021080/docs/product-quantity-restrictions-overview
redirect_from:
  - /2021080/docs/product-quantity-restrictions-overview
  - /2021080/docs/en/product-quantity-restrictions-overview
---


Sometimes shop owners want their customers to buy less or more of specific products. For example, when selling to bulk buyers at wholesale prices or when running promotional campaigns and creating special offers, you might want not to allow buying less than a certain quantity. Also, for some products, it might be more convenient to sell paritcular quantities that are, for example, multiples of a specific number. For example, you don't sell less than three meters of a cable and don't want customers to buy cables with the length which is not a multiple of three.

Product quantity restriction values define the number of items that customers can put into the cart. You can specify the product quantity restrictions by importing them for your project with the `data:import:product-quantity` command. See [File details: product_quantity.csv](https://documentation.spryker.com/docs/file-details-product-quantitycsv) for details on the import file. 

In the import file, you can set three values for quantity restrictions: minimum, maximum, interval. 
The *minimum* value defines the smallest allowable quantity of a specific item in the cart. The *maximum* quantity restricts the allowable quantity of items in the cart to a specific value. The *interval* value determines an increment value by which the quantity can be changed. For example, if you specify minimum quantity as 5, interval as 3, and maximum quantity as 14, it means that a user can put 5, 8, 11, and 14 items to the cart. If a user puts an unacceptable quantity of items to cart, they will be suggested to buy another, allowable, quantity of items.

## Current constraints
Currently, the feature has the following functional constraints:
* According to the current setup, quantity suggestions in the quantity restrictions do not work with the shopping lists. A buyer can add any quantity of the product to the shopping list. It can lead to a situation where the customer is forced to guess what amount should be added from a shopping list - because they will not see quantity suggestions on the shopping list page. However, when they add this product from a shopping list to a shopping cart, an error message will appear notifying the buyer that a selected amount cannot be added (if any quantity restrictions were set up for this product).
* There is no UI for the product restrictions in the Back Office.




## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
            <li><a href="https://documentation.spryker.com/docs/file-details-product-quantitycsv" class="mr-link">Import product quantity restrictions into your project</a></li>     
                           </ul>
     </div>
</div>


