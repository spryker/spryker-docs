---
title: Customer Account overview
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/customer-account-overview
originalArticleId: 6e3b40dd-e760-4e88-9db8-d5ced7f74753
redirect_from:
  - /v6/docs/customer-account-overview
  - /v6/docs/en/customer-account-overview
  - /v6/docs/addresses-reference-information
  - /v6/docs/en/addresses-reference-information
  - /v6/docs/order-history-reference-information
  - /v6/docs/en/order-history-reference-information
---

A *customer account* contains the following customer information on the Storefront:

* Contact details
* Addresses
* Order history
* Preferences, such as language and shipping options

There are slight differences in customer accounts' information for the B2B and B2C shops. The following table describes such differences and similarities:

| Customer Account sections | B2B Shop | B2C Shop |
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
<details open>
<summary markdown='span'>View the account activity</summary>

![view-account-activity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/view-account-activity.gif)

</details>

<details open>
<summary markdown='span'>Create, edit, and delete a customer address</summary>

![create-edit-delete-a-customer-address](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/create-edit-delete-a-customer-address.gif)

</details>

<details open>
<summary markdown='span'>Filter order history</summary>

![filter-order-history](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/filter-order-history.gif)

</details>

<details open>
<summary markdown='span'>Reorder selected items</summary>

![reorder-selected-items](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/reorder-selected-items.gif)

</details>



