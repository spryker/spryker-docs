---
title: Customer Account Management feature overview
description: Let your customers create an account to save their contact details, addresses, order history and preferences, such as language and shipping options.
last_updated: Jul 15, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/customer-account-management
originalArticleId: 88f6dffa-517a-4a00-ac9f-4041ba9b9841
redirect_from:
  - /2021080/docs/customer-account-management
  - /2021080/docs/en/customer-account-management
  - /docs/customer-account-management
  - /docs/en/customer-account-management
  - /docs/scos/user/features/202200.0/customer-account-management-feature-overview/customer-account-management-feature-overview.html
  - /docs/scos/user/features/202311.0/customer-account-management-feature-overview/customer-account-management-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/customer-account-management-feature-walkthrough/customer-account-management-feature-walkthrough.html
  - /docs/scos/user/features/202204.0/customer-account-management-feature-overview/customer-account-management-feature-overview.html
---

The *Customer Account Management* feature enables a wide range of management options for customer accounts, as well as additional functionalities.

Customers create accounts to save their personal details. Back Office users manage the customer accounts: they can view and edit customer details, check orders, and add notes.  Customer accounts can have the following details:

* Contact details
* Addresses
* Order history
* Language and shipping preferences

Password management enables basic password security for customer accounts. It lets customers do the following:

* Specify the account password when registering.
* Change the password in their customer account.
* Request a password reset email.

Also, it lets you manage customer access, request a password change, or change it on your side. You can restrict the possibility for the customers to register with simple passwords and lock out accounts after several unsuccessful logins for a certain period of time.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Customer Account](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-accounts-overview.html)  |
| [Get a general idea of Customer Registration](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-registration-overview.html)   |
| [Get a general idea of Customer Login](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-login-overview.html)  |
| [Get a general idea of Customer Groups](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-groups-overview.html)   |
| [Get a general idea of Password Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/password-management-overview.html)  |

## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT | REFERENCES |
|---|---|---|---|---|
| [Install the Agent Assist feature](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-agent-assist-feature.html) | [CompanyUser migration guide](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-companyuser-module.html) | [Authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html) | [File details: customer.csv](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/import-file-details-customer.csv.html) | [Reference information: Customer module overview](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/domain-model-and-relationships/customer-module-overview-reference-information.html)|
| [Install the Company account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |  | [Confirming customer registration](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-confirm-customer-registration.html) |  | |
| [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |  | [Managing customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html) |  |  |
| [Install the Customer Account Management Glue API](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-customer-account-management-glue-api.html) |  | [Managing customer authentication tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html) |  |  |
| [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |  | [Managing customer authentication tokens via OAuth 2.0](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html) |  |  |
| [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |  | [Managing customer passwords](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-passwords.html) |  |  |
|  |  | [Managing customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html) |  |  |
