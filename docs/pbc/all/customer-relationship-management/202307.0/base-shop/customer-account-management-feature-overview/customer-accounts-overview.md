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
  - /docs/scos/user/features/202307.0/customer-account-management-feature-overview/customer-accounts-overview.html
---

A *customer account* contains the following customer information about the Storefront:

* Contact details
* Addresses
* Order history
* Preferences, such as language and shipping options

There are slight differences in customer accounts' information for the B2B and B2C shops. The following table describes such differences and similarities:

| CUSTOMER ACCOUNT SECTION | B2B SHOP | B2C SHOP |
| --- | --- | --- |
| Overview | &check; | &check;|
| Profile | &check; | &check; |
| Addresses | &check; | &check; |
| Order History | &check; | &check; |
| Newsletter | &check; | &check; |
| Shopping Lists | &check; |  |
| Shopping Carts | &check; |  |
| Wishlist |  | &check; |

For details about how customer accounts can be created, see [Customer Registration overview](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-registration-overview.html).


Customers manage their accounts directly on the Storefront. If a customer updates an account, the data is synchronized, and the Back Office user sees the updated information in the Back Office&nbsp;<span aria-label="and then">></span> **Customers&nbsp;<span aria-label="and then">></span> Customers** section. The exceptions are newsletter subscriptions and password changes: this information is not stored in the Back Office.


To comply with international regulations, a Back Office user can delete a customer account on a customer request.

{% info_block warningBox %}

Deleting a customer account does not affect billing and order-related information. Deleting an account anonymizes customer information and address data. By default, customer email addresses are anonymized, letting customers return and re-register with a completely new account.

{% endinfo_block %}

A Back Office user can do the following:

* Add notes attached for customers.
* Set a preferred locale per customer.
* Deleting customer data using an anonymization mechanism.
* Configure a non-linear customer reference for external communication.
* Set address books with default addresses for billing and shipping.
* Send a password token by email.
* Check the last orders of a customer in the shop.

For details, see the following:
* [Create customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/create-customers.html)
* [Add notes to customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/add-notes-to-customers.html)

## Customer account on the Storefront
A customer can perform the following actions on the Storefront:

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

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/create-customers.html)  |
| [Edit customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/edit-customers.html)  |
| [View customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/view-customers.html)  |
| [Add notes to customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/add-notes-to-customers.html)  |
| [Add customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/add-customer-addresses.html)  |
| [Edit customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/edit-customer-addresses.html)  |
