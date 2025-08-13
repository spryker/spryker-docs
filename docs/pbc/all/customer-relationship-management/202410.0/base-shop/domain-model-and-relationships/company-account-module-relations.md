---
title: "Company account: module relations"
description: Explore the module relations of the Sprker Cloud Commerce OS Company Account features for your Spryker Projects.
last_updated: Jun 16, 2021
template: feature-walkthrough-template
originalLink: https://documentation.spryker.com/v7/docs/company-account-module-relations
originalArticleId: c01aaea9-5602-4cb9-9d99-04d42aa2aa8a
redirect_from:
  - /v7/docs/company-account-module-relations
  - /v7/docs/en/company-account-module-relations
  - /docs/scos/dev/feature-walkthroughs/202200.0/company-account-feature-walkthrough/company-account-module-relations.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/company-account-feature-walkthrough/company-account-module-relations.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/company-account-feature-walkthrough/company-account-module-relations.html
  - /docs/pbc/all/customer-relationship-management/latest/base-shop/domain-model-and-relationships/company-account-module-relations.html
---

The schema below illustrates relations between company, business unit, company unit address, and company user (customer).

<div class="width-100">

![schema_1.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account:+Module+Relations/schema_1.png)

</div>


The schema below illustrates relations between modules of the business on behalf functionality:

<div class="width-100">

![business-on-behalf-module-relations.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/business-on-behalf-module-relations.png)

</div>

`BusinessOnBehalfGui` module provides plugin `BusinessOnBehalfGuiAttachToCompanyButtonCustomerTableActionExpanderPlugin` for Customer module, and `CompanyUserTableAttachToBusinessUnitActionLinksExpanderPlugin` as well as `ReplaceDeleteButtonCompanyUserTableActionLinksExpanderPlugin` plugins for `CompanyUserG` module. Also, `BusinessOnBehalfGui` takes user information from `CompanyUser` module.



The following schema represents module relations of the [Customer Login by Token](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/customer-login-by-token-overview.html) feature:

<div class="width-100">

![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Workflow+&+Process+Management/Customer+Login+by+Token/Customer+Login+by+Token+Feature+Overview/customer-login-by-token-module-relations.png)

</div>
