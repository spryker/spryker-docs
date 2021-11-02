---
title: Managing companies
description: Use the procedures to create and edit companies, approve and activate/deactivate a company, and/or deny a company in the Back Office.
last_updated: Aug 27, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-companies
originalArticleId: bfda2ba3-34ca-4152-ab39-5a56f2ffc754
redirect_from:
  - /v6/docs/managing-companies
  - /v6/docs/en/managing-companies
---

This topic describes how to manage company records.

To start managing a company record, go to **Company Account** > **Companies** section.
***
## Creating a Company
To create a new company record, do the following:
1. On the **Overview of Companies** page, click **Create Company** in the top right corner.
2. On the **Create Company** page, enter the name of the company you would like to create.
3. Click **Save**. 
    The new created company will appear in the _List of the Companies_ table on the **Companies** page.
{% info_block errorBox "Important" %}
Once the company is created, one business unit for it is created by default. This is considered to be headquarters and can be managed in the same ways as the other business units. See [Managing Company Units](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-units.html
{% endinfo_block %} for more details.)

The companies can be managed by triggering certain actions in the _Actions_ column in the _List of Companies_ table on the **Companies** page. 
Specifically, company roles can be **Edited**, **De(Activated)**, **Approved**, and **Denied**.

## Managing a Company

Right after the Company has been created whether in the shop application or in the Back Office, it appears with **Pending** status in the **List of Companies** table. To become active and available to be used, it needs to be approved and then activated.
![Managing a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Companies/managing-company.png) 

### Approving and Activating a Company
To approve a company and activate a company:
1. Click **Approve** in the _Actions_ column. 
    As a result, the status of the company is changed to **Approved**.
2. Click **Activate** in the _Actions_ column. As a result, the activity state of the company will change from **Inactive** to **Active**.

![Approving a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Companies/activating-company.png) 

### Denying a Company
In case you cannot approve the registration, you can deny it.
To disapprove a company, click **Deny**.
![Denying a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Companies/denying-company.png) 

You can approve and activate the record in a later event. The record itself will continue existing in the system.

### Deactivating a Company
To deactivate a company, click **Deactivate**.

### Editing a Company
To change the name of a company, click **Edit** in the _Actions_ column.
***
**What's next?**
The company record is added and now you can proceed with creating a company unit. See [Managing Company Units](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-units.html) for more details.
