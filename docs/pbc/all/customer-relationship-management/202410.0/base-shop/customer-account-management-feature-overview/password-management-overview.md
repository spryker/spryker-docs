---
title: Password Management overview
description: Learn how to manage passwords within the Spryker Back office with this overview guide.
last_updated: Jul 15, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/password-management-overview
originalArticleId: 5319cfcb-db06-4238-9f68-c473289b1297
redirect_from:
  - /2021080/docs/password-management-overview
  - /2021080/docs/en/password-management-overview
  - /docs/password-management-overview
  - /docs/en/password-management-overview
  - /docs/scos/user/features/202200.0/customer-account-management-feature-overview/password-management-overview.html
  - /docs/scos/user/features/202311.0/customer-account-management-feature-overview/password-management-overview.html
  - /docs/scos/user/features/202204.0/customer-account-management-feature-overview/password-management-overview.html
---

*Password Management* lets Spryker admins manage customer account passwords. It also lets B2B and B2C Shoppers manage their own account passwords.

When you create a customer account in the Back Office, you do not enter the password. Instead, you can select to send a password reset email to the customer account’s email address. This way, the customer knows that the account has been created, and they need to reset the password to access it. To learn how Spryker admin sends password reset emails when creating customer accounts, see [Create a customer](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/create-customers.html).

You can create customer accounts by [importing](/docs/dg/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html#console-commands-to-run-import) a [`customerCSV file`](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/import-file-details-customer.csv.html). In this case, you can specify the passwords of the customer accounts to import, but it’s not mandatory. If you do not specify the passwords, you can send password reset emails to the customers without passwords by running `console customer:password:set`. Also, you can send password reset emails to all customers by running console `customer:password:reset`. To learn how a developer can import customer data, see [Importing Data with a Configuration File](/docs/dg/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html).

With the help of [Glue API](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/glue-rest-api.html), you can change and reset customer account passwords. This can be useful when you want to use a single authentication in all the apps connected to your shop. To learn how a developer can do it, see [Change a customer’s password](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-passwords.html#change-a-customers-password) and [Reset a customer’s password](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-passwords.html#reset-a-customers-password).

On the Storefront, it is mandatory to enter a password when creating a customer account. After the account is created, you can update the password in the customer account or request a password reset using email.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Customer Account](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-accounts-overview.html)  |
| [Get a general idea of Customer Registration](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-registration-overview.html)   |
| [Get a general idea of Customer Login](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-login-overview.html)  |
| [Get a general idea of Customer Groups](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-groups-overview.html)   |
| [Get a general idea of Password Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/password-management-overview.html)  |
