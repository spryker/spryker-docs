---
title: Customer Access feature overview
originalLink: https://documentation.spryker.com/2021080/docs/customer-access-feature-overview
redirect_from:
  - /2021080/docs/customer-access-feature-overview
  - /2021080/docs/en/customer-access-feature-overview
---

Customer Access allows store administrators to define if a certain information is visible to logged out users.

The feature allows you to give your customers the ability to hide content from customers that are not logged-in to their shop. You can restrict access to prices, products, product availability, carts, and shopping lists.

![Content Restrictions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Hide+Content+from+Logged+out+Users/Hide+Content+from+Logged+out+Users/Content+restrictions.png)


A Back Office user can manage customer access in **Customer** > **Customer Access**. They can hide the following content types:

![content-types.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Hide+Content+from+Logged+out+Users/Hide+Content+from+Logged+out+Users+Overview/content-types.png)

* price: a customer does not see the price if they are not logged in:


Settings in Admin UI (on the left)
Shop application (on the right)

![price_not_shown_for_non_logged_in_user.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Hide+Content+from+Logged+out+Users/Hide+Content+from+Logged+out+Users+Overview/price_not_shown_for_non_logged_in_user.png)

* order-place-submit: after selecting **Checkout**, the customer is taken to the login page.

* add-to-cart: to be able to add an item to cart, a customer needs to log in.

* wishlist: **Add to wishlist** button is not available for a logged out user.

* shopping-list: Add to shopping list button is not available for a logged out user.

By default, all content types are hidden for a logged out user.

A developer can add more content types on a project level. 

{% info_block errorBox %}
Even if the **Add to Cart** button is available, an unauthenticated customer is redirected to the login page after clicking it.
{% endinfo_block %}

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/customer-access-feature-integration" class="mr-link">Integrate the Customer Access feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/customer-access-feature-integration" class="mr-link">Integrate the Customer Access Glue API</a></li>
               <li><a href="https://documentation.spryker.com/docs/retrieving-protected-resources" class="mr-link">Retrieve protected resources via Glue API</a></li>
               <li><a href="https://documentation.spryker.com/docs/managing-customer-access-to-glue-api-resources" class="mr-link">Learn how to manage customer access to Glue API resources</a></li>
            </ul>
        </div>
<!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-customer-access" class="mr-link">Manage customer access</a></li>
            </ul>
        </div>
        </div>
</div>
