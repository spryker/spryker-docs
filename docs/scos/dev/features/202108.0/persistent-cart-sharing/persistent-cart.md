---
title: Persistent Cart Sharing feature overview
originalLink: https://documentation.spryker.com/2021080/docs/persistent-cart-sharing-feature-overview
redirect_from:
  - /2021080/docs/persistent-cart-sharing-feature-overview
  - /2021080/docs/en/persistent-cart-sharing-feature-overview
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

* Read-only: for details see [Read only](https://documentation.spryker.com/docs/multiple-shared-shopping-lists-overview#read-only).
* Full access: for details see [Full access](https://documentation.spryker.com/docs/multiple-shared-shopping-lists-overview#full-access).

{% info_block warningBox %}
Sharing cart with read-Only or full access permissions is available only for internal users: the users within the same business unit.
{% endinfo_block %}

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Unique+URL+per+Cart+for+Easy+Sharing/internal-users-interface.png)
The link allows displaying prices according to the selected currency. The cart shared via the link displays the prices in the currency that the owner has set up. If for example, the default currency was set to EUR and the owner has changed the currency to CHF, the shopping cart shared through the link also displays the prices in CHF.

If a customer selects a link of the cart that's not available, the _This cart is unavailable_ message is returned.


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li>Integrate Persistent Cart Sharing:</li>
                <li><a href="https://documentation.spryker.com/docs/en/customer-account-management-feature-integration" class="mr-link">Integrate the Customer Account Management feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/persisitent-cart-sharing-shared-carts-integration" class="mr-link">Integrate the Persistent Cart Sharing + Shared Carts feature</a></li>
                 <li><a href="https://documentation.spryker.com/docs/persistent-cart-sharing-feature-integration" class="mr-link">Integrate the Persistent Cart Sharing feature</a></li>
                 <li><a href="https://documentation.spryker.com/docs/resource-sharing-feature-integration" class="mr-link">Integrate the Resource Sharing feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/shared-carts-feature-integration" class="mr-link">Integrate the Shared Carts feature</a></li>
            </ul>
        </div>
    </div>
</div>
