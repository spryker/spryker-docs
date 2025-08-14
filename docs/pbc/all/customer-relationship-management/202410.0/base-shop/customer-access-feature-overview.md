---
title: Customer Access feature overview
description: The Customer Access feature lets you decide whether certain information is visible to logged out users or not
last_updated: Aug 13, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/customer-access-feature-overview
originalArticleId: 06776bb5-8993-4d13-af9b-d1a1e9d317fe
redirect_from:
  - /2021080/docs/customer-access-feature-overview
  - /2021080/docs/en/customer-access-feature-overview
  - /docs/customer-access-feature-overview
  - /docs/en/customer-access-feature-overview
  - /docs/scos/user/features/202200.0/customer-access-feature-overview.html
  - /docs/scos/user/features/202311.0/customer-access-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/customer-access-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/customer-access-feature-walkthrough.html
  - /docs/scos/user/features/202204.0/customer-access-feature-overview.html
  - /docs/pbc/all/customer-relationship-management/latest/base-shop/customer-access-feature-overview.html
---

*Customer Access* lets store administrators define whether certain information is visible to logged-out users.

The feature lets you give your customers the ability to hide content from customers that are not logged in to their shop. You can restrict access to prices, products, product availability, carts, and shopping lists.

![Content Restrictions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Hide+Content+from+Logged+out+Users/Hide+Content+from+Logged+out+Users/Content+restrictions.png)


A Back Office user can manage customer access in **Customer&nbsp;<span aria-label="and then">></span> Customer Access**. They can hide the following content types:

![content-types.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Hide+Content+from+Logged+out+Users/Hide+Content+from+Logged+out+Users+Overview/content-types.png)

- price: a customer does not see the price if they are not logged in:

Settings in Admin UI (on the left)
<br>Shop application (on the right)

![price_not_shown_for_non_logged_in_user.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Hide+Content+from+Logged+out+Users/Hide+Content+from+Logged+out+Users+Overview/price_not_shown_for_non_logged_in_user.png)

- order-place-submit: after selecting **Checkout**, the customer is taken to the login page.

- add-to-cart: to add an item to the cart, a customer needs to log in.

- wishlist: **Add to wishlist** button is not available for a logged-out user.

- shopping-list: Add to shopping list button is not available for a logged-out user.

By default, all content types are hidden for a logged-out user.

A developer can add more content types on a project level.

{% info_block errorBox %}

Even if the **Add to Cart** button is available, an unauthenticated customer is redirected to the login page after clicking it.

{% endinfo_block %}

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Manage customer access](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-customer-access.html) |

## Related Developer documents

|INSTALLATION GUIDES | GLUE API GUIDES | TUTORIALS AND HOWTOS |
|---------|---------|---------|
| [Customer access feature integration](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-access-feature.html) | [Retrieving protected resources](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-retrieve-protected-resources.html)  | [Managing customer access to Glue API resources](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/manage-customer-access-to-glue-api-resources.html) |
| [Glue API Customer access feature integration](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-customer-access-glue-api.html) | | |
