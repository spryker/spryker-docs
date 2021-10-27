---
title: Customer Accounts overview
last_updated: Aug 13, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/customer-accounts-overview
originalArticleId: 94150bcb-e1c5-4290-b661-71af9fc3cbb3
redirect_from:
  - /2021080/docs/customer-accounts-overview
  - /2021080/docs/en/customer-accounts-overview
  - /docs/customer-accounts-overview
  - /docs/en/customer-accounts-overview
  - /2021080/docs/addresses-reference-information
  - /2021080/docs/en/addresses-reference-information
  - /docs/addresses-reference-information
  - /docs/en/addresses-reference-information
  - /2021080/docs/order-history-reference-information
  - /2021080/docs/en/order-history-reference-information
  - /docs/order-history-reference-information
  - /docs/en/order-history-reference-information
---

A *customer account* contains the following customer information on the Storefront:

* Contact details
* Addresses
* Order history
* Preferences, such as language and shipping options

There are slight differences in customer accounts' information for the B2B and B2C shops. The following table describes such differences and similarities:

| CUSTOMER ACCOUNT SECTION | B2B SHOP | B2C SHOP |
| --- | --- | --- |
| Overview | ✓ | ✓|
| Profile | ✓ | ✓ |
| Addresses | ✓ | ✓ |
| Order History | ✓ | ✓ |
| Newsletter | ✓ | ✓ |
| Shopping Lists | ✓ |  |
| Shopping Carts | ✓ |  |
| Wishlist |  | ✓ |

See [Customer Registration overview](/docs/scos/user/features/{{page.version}}/customer-account-management-feature-overview/customer-registration-overview.html) for details on how customer accounts can be created.


Customers manage their accounts directly on the Storefront. If a customer updates an account, the data is synchronized, and the Back Office user sees the updated information in the Back Office > **Customers** > **Customers** section. The exceptions are newsletter subscriptions and password changes: this information is not stored in the Back Office.


To comply with international regulations, a Back Office user can delete a customer account on a customer request.

{% info_block warningBox %}

Deleting a customer account does not affect billing and order-related information. Deleting an account anonymizes customer information and address data. By default, customer email addresses are anonymized, making it possible for customers to return and re-register with a completely new account.

{% endinfo_block %}

A Back Office user can do the following:

* Add notes attached for customers.
* Set a preferred locale per customer.
* Deleting a customer data via an anonymization mechanism.
* Configure a non-linear customer reference for external communication.
* Set address books with default addresses for billing and shipping.
* Send a password token via email.
* Check last orders of a customer in the shop.

See [Managing customers](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customers.html) for details.

## Customer account on the Storefront
Customer can perform the following actions the Storefront:
<details>
<summary markdown='span'>View the account activity</summary>

![view-account-activity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/view-account-activity.gif)

</details>

<details>
<summary markdown='span'>Create, edit, and delete a customer address</summary>

![create-edit-delete-a-customer-address](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/create-edit-delete-a-customer-address.gif)

</details>

<details>
<summary markdown='span'>Filter order history</summary>

![filter-order-history](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/filter-order-history.gif)

</details>

<details>
<summary markdown='span'>Reorder selected items</summary>

![reorder-selected-items](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/reorder-selected-items.gif)

</details>

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage customer accounts](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customers.html)  |
| [Manage customer addresses](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customer-addresses.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Customer Account Management feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/customer-account-management-feature-walkthrough/customer-account-management-feature-walkthrough.html) for developers.

{% endinfo_block %}
