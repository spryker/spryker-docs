---
title: Company Account feature walkthrough
last_updated: Sep 2, 2021
description: The Company Account feature lets you control user access to the system within an organization by configuring different permissions and roles for the company's entities (units) and users.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202200.0/company-account-feature-walkthrough/company-account-feature-walkthrough.html
---

The _Company Account_ feature lets you control user access to the system within an organization by configuring different permissions and roles for the company's entities (units) and users.


To learn more about the feature and to find out how end users use it, see [Company Account](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-account-feature-overview.html) for business users.


## Entity diagram

The following schema illustrates relations between a company, business unit, company unit address, and customer.

<div class="width-100">

![schema_1.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account:+Module+Relations/schema_1.png)

</div>

The following schema illustrates relations between modules of the business on behalf functionality:

<div class="width-100">

![business-on-behalf-module-relations.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/business-on-behalf-module-relations.png)

</div>

The `BusinessOnBehalfGui` module provides the `BusinessOnBehalfGuiAttachToCompanyButtonCustomerTableActionExpanderPlugin` plugin for the `Customer` module and `CompanyUserTableAttachToBusinessUnitActionLinksExpanderPlugin`. It also provides the `ReplaceDeleteButtonCompanyUserTableActionLinksExpanderPlugin` plugins for the `CompanyUserG` module. `BusinessOnBehalfGui` also takes user information from the `CompanyUser` module.

The following schema represents module relations of the [Customer Login by Token](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/customer-login-by-token-overview.html) feature:

<div class="width-100">

![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Customer+Login+by+Token/Customer+Login+by+Token+Feature+Overview/customer-login-by-token-module-relations.png)

</div>

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES| GLUE API GUIDES | TUTORIALS AND HOWTOS | REFERENCES |
|---------|---------|---------|---------|---------|
| [Install the Company account feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/company-account-feature-integration.html)| [CompanyUser migration guide](/docs/scos/dev/module-migration-guides/migration-guide-companyuser.html)  | [Retrieving companies](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-companies.html) |[ HowTo - Generate a token for login](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/generate-login-tokens.html)  | [Customer Login by Token reference information](/docs/scos/dev/feature-walkthroughs/{{page.version}}/company-account-feature-walkthrough/customer-login-by-token-reference-information.html) |
| [Glue API: Company Account feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html) | [BusinessOnBehalfDataImport migration guide](/docs/scos/dev/module-migration-guides/migration-guide-business-on-behalf-data-import.html)  | [Retrieving business units](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-units.html)  |   |   |
|   |   | [Retrieving business unit addresses](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-unit-addresses.html) |   |   |
|   |   | [Retrieving company users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-company-users.html)  |   |   |
|   |   | [Retrieving company roles](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-company-roles.html)  |   |   |
|   |   | [Authenticating as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html)  |   |   |
|   |   | [Managing company user authentication tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html)  |   |   |
