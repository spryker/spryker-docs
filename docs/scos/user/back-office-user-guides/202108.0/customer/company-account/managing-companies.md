---
title: Managing companies
description: Use the procedures to create and edit companies, approve and activate/deactivate a company, and/or deny a company in the Back Office.
last_updated: Aug 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-companies
originalArticleId: 5e075d70-a08b-4995-ad61-25bfc5a2e68b
redirect_from:
  - /2021080/docs/managing-companies
  - /2021080/docs/en/managing-companies
  - /docs/managing-companies
  - /docs/en/managing-companies
---

This topic describes how to manage company records.

## Prerequisites

To start managing companies, go to **Customers&nbsp;<span aria-label="and then">></span> Companies**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Create a company

1. On the **Overview of Companies** page, click **Create Company** in the top right corner.
2. On the **Create Company** page, enter a **NAME**.
3. Click **Save**.
    This opens the **Companies** page. The created company is displayed in the table.

{% info_block warningBox "" %}

Once a company is created, one business unit for it is created automatically. This is considered to be a headquarter. To learn how to manage it, see [Managing company units](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-units.html).

{% endinfo_block %}

## Approving and activating companies

To approve a company and activate a company:
1. Click **Approve** in the _Actions_ column.
    As a result, the status of the company is changed to *Approved*.
2. Click **Activate** in the _Actions_ column. As a result, the activity state of the company will change from **Inactive** to **Active**.

![Approving a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Companies/activating-company.png)

### Denying companies

In case you cannot approve the registration, you can deny it.
To disapprove a company, click **Deny**.
![Denying a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Companies/denying-company.png)

{% info_block infoBox %}

You can approve and activate the record in a later event. The record itself will continue existing in the system.

{% endinfo_block %}

### Deactivating companies

To deactivate a company, click **Deactivate**.

### Editing companies

To change the name of a company:
1. Click **Edit** in the _Actions_ column.
2. On the *Edit Company* page, in the *Name* file, edit the name of the company.
The updated company name is displayed in the _List of the Companies_ table of the *Companies* page.

## Next steps
<br>The company record is added and now you can proceed with creating a company unit. See [Managing company units](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-units.html) for more details.
