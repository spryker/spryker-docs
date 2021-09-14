---
title: Customer Account overview
originalLink: https://documentation.spryker.com/v6/docs/customer-account-overview
originalArticleId: 6e3b40dd-e760-4e88-9db8-d5ced7f74753
redirect_from:
  - /v6/docs/customer-account-overview
  - /v6/docs/en/customer-account-overview
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

See [Customer Registration overview](/docs/scos/user/features/{{page.version}}/customer-account-management/customer-account-management-feature-overview/customer-registration-overview.html) for details on how customer accounts can be created.


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

See [Managing customers](/docs/scos/user/user-guides/202009.0/back-office-user-guide/customer/customer-customer-access-customer-groups/managing-customers.html) for details.

## Customer account on the Storefront
Customer can perform the following actions the Storefront:
<details open>
<summary>View the account activity</summary>

![view-account-activity](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/view-account-activity.gif)

</details>

<details open>
<summary>Create, edit, and delete a customer address</summary>

![create-edit-delete-a-customer-address](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/create-edit-delete-a-customer-address.gif)

</details>

<details open>
<summary>Filter order history</summary>

![filter-order-history](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/filter-order-history.gif)

</details>

<details open>
<summary>Reorder selected items</summary>

![reorder-selected-items](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Account/Customer+Account+Feature+Overview/reorder-selected-items.gif)

</details>



## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                 <li><a href="docs\scos\user\features\202009.0\customer-account-management\customer-account-management-feature-overview\reference-information-customer-module-overview.md" class="mr-link">Reference information: Customer module overview 7.0</a></li>
                <li><a href="docs\scos\dev\glue-api-guides\202009.0\managing-customers\authenticating-as-a-customer.md" class="mr-link">Authenticate as a customer via Glue API</a></li>
                <li><a href="docs\scos\dev\glue-api-guides\202009.0\managing-customers\managing-customers.md" class="mr-link">Manage customer accounts via Glue API</a></li>
                <li><a href="docs\scos\dev\glue-api-guides\202009.0\managing-customers\manage-customer-password.md" class="mr-link">Manage customer passwords via Glue API</a></li>
                <li><a href="docs\scos\dev\glue-api-guides\202009.0\managing-customers\managing-customer-addresses.md" class="mr-link">Manage customer addresses via Glue API</a></li>
                <li><a href="docs\scos\dev\glue-api-guides\202009.0\managing-customers\managing-customer-authentication-tokens.md" class="mr-link">Manage customer authentication tokens via Glue API</a></li>
                <li>Enable Customer Account in your project:</li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\customer-account-management-feature-integration.md" class="mr-link">Integrate the Customer Account Management feature into your project</a></li>
                <li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\glue-api\glue-api-customer-account-management-feature-integration.md" class="mr-link">Integrate the Customer Account Management Glue API into your project</a></li>
                 <li><a href="docs\scos\dev\module-migration-guides\202009.0\migration-guide-customer.md" class="mr-link">Migrate the Customer module from version 6.* to version 7.0</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/customer-account-management-feature-overview" class="mr-link">Get a general idea of customer account</a></li>
                <li><a href="docs\scos\user\features\202009.0\customer-account-management\customer-account-management-feature-overview\customer-registration-overview.md" class="mr-link">Get a general idea of customer registration</a></li>
                <li><a href="docs\scos\user\features\202009.0\customer-account-management\customer-account-management-feature-overview\customer-groups-overview.md" class="mr-link">Get a general idea of customer groups</a></li>
                <li><a href="docs\scos\user\features\202009.0\customer-account-management\customer-account-management-feature-overview\password-management-overview.md" class="mr-link">Get a general idea of password management</a></li>
                <li><a href="docs\scos\dev\glue-api-guides\202009.0\managing-customers\managing-customers.md" class="mr-link">Create and manage customers in the Back Office</a></li>
            </ul>
        </div>
        </div>
</div>
