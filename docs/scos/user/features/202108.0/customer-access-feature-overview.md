---
title: Customer Access feature overview
description: The Customer Access feature allows deciding whether certain information is visible to logged out users or not
last_updated: Aug 13, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/customer-access-feature-overview
originalArticleId: 06776bb5-8993-4d13-af9b-d1a1e9d317fe
redirect_from:
  - /2021080/docs/customer-access-feature-overview
  - /2021080/docs/en/customer-access-feature-overview
  - /docs/customer-access-feature-overview
  - /docs/en/customer-access-feature-overview
---

_Customer Access_ allows store administrators to define if a certain information is visible to logged out users.

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

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage customer access](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customer-access.html) |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Customer Access feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/customer-access-feature-walkthrough.html) for developers.

{% endinfo_block %}
