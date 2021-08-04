---
title: Unique URL per Cart for Easy Sharing Feature Overview
originalLink: https://documentation.spryker.com/v4/docs/unique-url-per-cart-for-easy-sharing-overview
redirect_from:
  - /v4/docs/unique-url-per-cart-for-easy-sharing-overview
  - /v4/docs/en/unique-url-per-cart-for-easy-sharing-overview
---

Unique URL per cart for easy sharing feature allows company users to generate the URL to share the cart with different levels of access. To be able to generate the link, you need to be logged in to a company account.

URL is generated with the following structure: 
```
your_domain/cart/preview/UIID
```
For example, `http://mysprykershop.com/cart/preview/bea563fe-3f03-594e-8586-c5ae11e253fd`

The cart can be shared with internal users - the users of the business unit, and external users - non-company users (friends, relatives, followers on social media). By accessing the provided URL, a user can perform the actions depending on the permissions level:

* **Preview**. This option is available for external users (the users that do not belong to the company account or are not logged in). 

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/external-users-interface.png)


By accessing the Preview link, they open the HTML page with all the information about the products (with product options, groups, packaging units, items for bundle products, etc.):
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/cart-preview-share.png)
The user can view and print the information from the Preview link.
{% info_block warningBox "Note" %}
Preview link is the only available option for the B2C environment. B2C users will not be able to share the cart with Read-only and Full access permissions.
{% endinfo_block %}
* **Read-Only**. For details on the Read only permissions, refer to the [Permissions Management for Shared Shopping Lists](https://documentation.spryker.com/v4/docs/multiple-shared-shopping-lists-overview-201907#read-only) section in *Multiple and Shared Shopping Lists Overview*.
* **Full Access**. For details on the Full Access permission, check [Permissions Management for Shared Shopping Lists](https://documentation.spryker.com/v4/docs/multiple-shared-shopping-lists-overview-201907#full-access) section in *Multiple and Shared Shopping Lists Overview*.

{% info_block warningBox "Note" %}
Sharing cart with Read-Only or Full Access permissions is available only for internal users (the users within the same business unit
{% endinfo_block %}. To open the link for internal users, a customer needs to be logged in to a company account.)
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/internal-users-interface.png)
The link allows displaying the prices in accordance with the currency selected. That means, that the cart shared via the link will display the prices in the currency that the owner has set up. If for example, the default currency was set to EUR and the owner has changed the currency to CHF, the shopping cart shared through the link will also display the prices in CHF.

In case a shopper accesses the link for the cart, that is not available anymore, they cannot access it and get _This cart is unavailable_ message.

You can check the module relations in the schema below:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/unique-url-module-diagram.png){height="" width=""}
