---
title: Persistent Cart Sharing feature overview
description: With the feature, company users can generate the URL to share the cart with different levels of access.
last_updated: Jul 28, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/persistent-cart-sharing-feature-overview
originalArticleId: a80f4aab-aec5-4e7f-ad69-e5112178f27d
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202307.0/persistent-cart-sharing-feature-walkthrough/persistent-cart-sharing-feature-walkthrough.html
  - /docs/scos/user/features/202307.0/persistent-cart-sharing-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/persistent-cart-sharing-feature-overview.html
  - /docs/pbc/all/cart-and-checkout/202307.0/base-shop/persistent-cart-sharing-feature-overview.html
---

The *Persistent Cart Sharing* feature lets company users generate the URL to share the cart with different access levels. To generate the link, you need to be logged in to a company account.

The URL is generated with the following structure: `your_domain/cart/preview/UIID`—for example, `http://mysprykershop.com/cart/preview/bea563fe-3f03-594e-8586-c5ae11e253fd`.

The cart can be shared with internal users, the users of the business unit, and external users, and non-company users (friends, relatives, followers on social media). By accessing the provided URL, a user can perform the actions depending on the permissions level:

* *Preview*: this option is available for external users that do not belong to the company account, or are not logged in.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/external-users-interface.png)

By accessing the preview link, they open the HTML page with all product information, like product options, groups, packaging units, and items for bundle products.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/cart-preview-share.png)

The user can view and print the information from the preview link.

{% info_block warningBox %}

The preview link is the only available option for the B2C environment. B2C users cannot share the cart with read-only and full access permissions.

{% endinfo_block %}

* *Read-only*: for details, see [Read only](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html#read-only).
* *Full access*: for details, see [Full access](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html#full-access).

{% info_block warningBox %}

Sharing cart with read-Only or full access permissions is available only for internal users: the users within the same business unit.

{% endinfo_block %}

![internal-users-interface.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/internal-users-interface.png)
The link allows displaying prices according to the selected currency. The cart shared by the link displays the prices in the currency that the owner has set up. For example, if the default currency is set to EUR and the owner changes the currency to CHF, the shopping cart shared through the link also displays the prices in CHF.

If a customer selects a link of the cart that's not available, the _This cart is unavailable_ message is displayed.

## Related Developer documents

| INSTALLATION GUIDES  |
|---|
| [Install the Persistent Cart Sharing feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-persistent-cart-sharing-feature.html) |
| [Install the Persistent Cart Sharing + Shared Carts feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-persistent-cart-sharing-shared-carts-feature.html) |
| [Install the Customer Account Management feature](/docs/pbc/all/identity-access-management/{{site.version}}/install-and-upgrade/install-the-customer-account-management-glue-api.html) |
| [Install the Resource Sharing feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-resource-sharing-feature.html) |
| [Install the Shared Carts feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html) |
