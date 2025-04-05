---
title: Company Account feature overview
description: The Company Account page gives a clear overview of business' structure, hierarchy, shipping, billing addresses, and other users in the Business Unit.
last_updated: Jul 30, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/company-account
originalArticleId: 8009f001-a9dd-426b-916a-b3b8a5e4acc7
video: true
redirect_from:
  - /2021080/docs/company-account
  - /2021080/docs/en/company-account
  - /docs/company-account
  - /docs/en/company-account
  - /docs/scos/user/features/202200.0/company-account-feature-overview/company-account-feature-overview.html
  - /docs/scos/user/features/202311.0/company-account-feature-overview/company-account-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202200.0/company-account-feature-walkthrough/company-account-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/company-account-feature-walkthrough/company-account-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/company-account-feature-walkthrough/company-account-feature-walkthrough.html
  - /docs/scos/user/features/202204.0/company-account-feature-overview/company-account-feature-overview.html
---

A B2B business model implies bilateral commercial relations between businesses, so a company is the top figure of every B2B marketplace. Each company has a specific organizational structure with its divisions (units) and employee roles. At some point or another, a B2B business owner would need separate accounts for employees to constrain or extend rights in regards to products, orders, and confidential information.

The *Company Account* feature lets you control user access to the system within an organization by configuring different permissions and roles for the company's entities (units) and users. You can set up your own company structure of business units and users with various levels of permissions and roles.

One of the most important building blocks of the company account is business units, or sub-divisions of the company formed for different locations, entities, or departments of your company. Each business unit can have its own billing and shipping addresses, hierarchy level, and users. Business units let you narrow down responsibilities, establish permissions within them, and gain better control of all processes.

With this feature, you can create your own permission rules and assign them to company users. Also, you can implement any kind of business logic, from simple checks, like single permissions, to complex ones, like purchasing limit, customer allocation, and business unit checks.

Organizations with multiple business units that support their own set of accounts, customers, and vendors often need some of their company users to access (and eventually manage) not one business unit but several business units within the whole company. Business on behalf lets you set up multiple company users for one customer account. You can assign a company user to multiple business units with different roles and permissions to match your organization's policies and procedures.

The feature lets customers log in by token. By dynamically generating a token, a user can log in with a predefined company user to a new ecommerce provider. All this happens without sharing the login information or having to fill out a sign-up form.

Check out the following video about managing company accounts:

Setting up company structure:


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/How+to+Setup+Company+Structure+in+Spryker+B2B-qkdgkeannb.mp4" type="video/mp4">
  </video>
</figure>


## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
|  [Get a general idea of Company Accounts](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-accounts-overview.html)  |
|  [Get a general idea of Business Units](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-units-overview.html)  |
|  [Get a general idea of Business on Behalf](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-on-behalf-overview.html)  |
|  [Get a general idea of company user roles and permissions](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html)  |


## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES| GLUE API GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---------|---------|---------|---------|---------|
| [Install the Company account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html)| [CompanyUser migration guide](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-companyuser-module.html)  | [Retrieving companies](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-companies.html) |[ HowTo - Generate a token for login](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/generate-login-tokens.html)  | [Customer Login by Token reference information](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/domain-model-and-relationships/customer-login-by-token-reference-information.html) |
| [Install the Company account Glue API](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-company-account-glue-api.html) | [BusinessOnBehalfDataImport migration guide](/docs/scos/dev/module-migration-guides/migration-guide-business-on-behalf-data-import.html)  | [Retrieving business units](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-units.html)  |   |   |
|   |   | [Retrieving business unit addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-unit-addresses.html) |   |   |
|   |   | [Retrieving company users](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-users.html)  |   |   |
|   |   | [Retrieving company roles](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-roles.html)  |   |   |
|   |   | [Authenticating as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html)  |   |   |
|   |   | [Managing company user authentication tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html)  |   |   |
