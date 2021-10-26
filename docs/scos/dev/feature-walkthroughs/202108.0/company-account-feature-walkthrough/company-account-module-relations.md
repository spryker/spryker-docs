---
title: Company account- module relations
description: Explore the module relations of the Company Account features
last_updated: Jun 16, 2021
template: feature-walkthrough-template
originalLink: https://documentation.spryker.com/v7/docs/company-account-module-relations
originalArticleId: c01aaea9-5602-4cb9-9d99-04d42aa2aa8a
redirect_from:
  - /v7/docs/company-account-module-relations
  - /v7/docs/en/company-account-module-relations
---

The schema below illustrates relations between company, business unit, company unit address and company user (customer).

![schema_1.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account:+Module+Relations/schema_1.png) 


The schema below illustrates relations between modules in of the business on behalf functionality:

![business-on-behalf-module-relations.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/business-on-behalf-module-relations.png) 

`BusinessOnBehalfGui` module provides plugin `BusinessOnBehalfGuiAttachToCompanyButtonCustomerTableActionExpanderPlugin` for Customer module, and `CompanyUserTableAttachToBusinessUnitActionLinksExpanderPlugin` as well as `ReplaceDeleteButtonCompanyUserTableActionLinksExpanderPlugin` plugins for `CompanyUserG` module. Also, `BusinessOnBehalfGui` takes user information from `CompanyUser` module.
