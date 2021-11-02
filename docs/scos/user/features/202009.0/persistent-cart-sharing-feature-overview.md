---
title: Persistent Cart Sharing feature overview
description: With the feature, company users can generate the URL to share the cart with different levels of access.
last_updated: Jul 28, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/unique-url-per-cart-for-easy-sharing-overview
originalArticleId: a80f4aab-aec5-4e7f-ad69-e5112178f27d
redirect_from:
- /v6/docs/unique-url-per-cart-for-easy-sharing-overview
- /v6/docs/en/unique-url-per-cart-for-easy-sharing-overview
- /v6/docs/unique-url-per-cart-for-easy-sharing
- /v6/docs/en/unique-url-per-cart-for-easy-sharing
---

The *Persistent Cart Sharing* feature allows company users to generate the URL to share the cart with different levels of access. To be able to generate the link, you need to be logged in to a company account.

URL is generated with the following structure: `your_domain/cart/preview/UIID`. For example, `http://mysprykershop.com/cart/preview/bea563fe-3f03-594e-8586-c5ae11e253fd`.

The cart can be shared with internal users—the users of the business unit, and external users—non-company users (friends, relatives, followers on social media). By accessing the provided URL, a user can perform the actions depending on the permissions level:

* Preview: this option is available for external users that do not belong to the company account or are not logged in.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/external-users-interface.png)


By accessing the preview link, they open the HTML page with all the information about the products, like product options, groups, packaging units, items for bundle products.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/cart-preview-share.png)

The user can view and print the information from the preview link.


{% info_block warningBox %}

Preview link is the only available option for the B2C environment. B2C users cannot share the cart with read-only and full access permissions.

{% endinfo_block %}

* Read-only: for details see [Read only](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/shopping-lists-feature-overview.html#read-only).
* Full access: for details see [Full access](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/shopping-lists-feature-overview.html#full-access).

{% info_block warningBox %}

Sharing cart with read-Only or full access permissions is available only for internal users: the users within the same business unit.

{% endinfo_block %}

![internal-users-interface.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/internal-users-interface.png)
The link allows displaying prices according to the selected currency. The cart shared via the link displays the prices in the currency that the owner has set up. If for example, the default currency was set to EUR and the owner has changed the currency to CHF, the shopping cart shared through the link also displays the prices in CHF.

If a customer selects a link of the cart that's not available, the _This cart is unavailable_ message is displayed.

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Persistent Cart Sharing feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/persistent-cart-sharing-feature-walkthrough/persistent-cart-sharing-feature-walkthrough.html) for developers.

{% endinfo_block %}
