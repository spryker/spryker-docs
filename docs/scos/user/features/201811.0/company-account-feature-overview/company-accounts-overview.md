---
title: Company Accounts overview
description: In the context of permissions management, the top level of a B2B business model hierarchy is a Company. Each company has its organizational structure.
last_updated: Oct 10, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/company-account-general-organizational-structure
originalArticleId: c8979fd3-8ea1-4d66-a853-8490a9d7ae6e
redirect_from:
  - /v1/docs/company-account-general-organizational-structure
  - /v1/docs/en/company-account-general-organizational-structure
  - /v1/docs/company-account-overview
  - /v1/docs/en/company-account-overview
---

In the context of permissions management, the top level of a B2B business model hierarchy is a Company. The Company represents a legal organization, which is related to stores and has specific metadata (e.g. a tax-number). A Company can have a name, activity state and status attributes represented by _name, is-active_ and _status_ fields respectively.

Upon initial registration of a Company, it appears in the B2B shop with the Pending status in the Administrator Interface. After the Company has been checked, it gets the “Approved” status.


![companies_overview.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/companies_overview.png) 

Each company consists of several **Business Units**, that can be viewed as physical divisions of a Company. The Business Units in their turn can have a hierarchical structure as well, which means that they can have own departments, teams etc. Business units also have metadata (e.g. tax-number).

![company-account-overview.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/company-account-overview.png) 

The level below the Business Unit is the **Company Address**.

{% info_block infoBox %}

The Company Address is the physical representation of a Company.

{% endinfo_block %}

One Company Address can be assigned to several Business Units.

{% info_block infoBox %}

If, for example, IT and Sales departments are physically located in the same office, one and the same address will be assigned to them.

{% endinfo_block %}

However, it might also be so that a department is distributed between several locations (for example if company is a building firm and each unit is a construction site) and therefore has several addresses. In this case, for each order made for this department, one should select which address of the department the order should be delivered to. Additionally, it is possible to assign default billing and shipping addresses to Business Units.

The process of a new Company registration begins with the registration of a **Customer (Company User)**. A user, or employee, of a Company is referred to as a **Company User**. A Company User always belongs to one business unit.

The Company User contains all the information about the Customer and has a one-to-one relation to the Customer. Actually, when a new Company User is created, a new Customer is created at the same time. Therefore, Customer and Company User always go together. The only difference between them is that Company User can contain meta information which is related only to Company, whereas customer has just B2C information, which is not related to a company.

The scheme below illustrates relations between Company, Business Unit, Company (Unit) Address and Company User (Customer).

![schema_1.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account%3A+Module+Relations/schema_1.png) 

<!-- _Last review date: Aug 15, 2018_ by Denis Turkov -->
