---
title: Create company users
description: Learn how to create in the Back Office.
last_updated: Jul 6, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-company-users
originalArticleId: ff15efb5-30c1-4b0e-b56d-596d90d40123
redirect_from:
  - /2021080/docs/managing-company-users
  - /2021080/docs/en/managing-company-users
  - /docs/managing-company-users
  - /docs/en/managing-company-users
  - /docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-users.html
related:
  - title: Managing Company Unit Addresses
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-unit-addresses.html
  - title: Managing Company Units
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-units.html
  - title: Managing Company Roles
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-roles.html
  - title: Managing Companies
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-companies.html
---

This topic describes how to manage company users.

## Prerequisites

1. [Create a company](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/manage-companies.html).
2. [Create a company unit](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-units/create-company-units.html).
3. [Create a company role](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-roles/create-company-roles.html).
4. Review the reference information before you start, or look up the necessary information as you go through the process.

To start working with company users, go to the **Customers&nbsp;<span aria-label="and then">></span> Company Users** section.



## Creating company users


1. On the *Overview of Company Users* page, in the top right corner, click **Add User**.
2. On the *Create Company User* page, enter an **EMAIL**.
3. Select a **SALUTATION**.
4. Enter a **FIRST NAME**
5. Enter a **LAST NAME**
6. Select a **GENDER**.
7. To send a password change email to the user, select the **SEND PASSWORD TOKEN THROUGH EMAIL** checkbox.
8. Select a **DATE OF BIRTH**.
9. Enter a **PHONE**.
10. Select a **COMPANY**

3. Click **Save**.


| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| EMAIL | Email of the customer that is used for logging in to the online store. It is not available for modifications on the *Edit* page. |
| SALUTATION | Formal salutation for the customer (_Mr_, _Mrs_, _Ms_, _Dr_). |
| FIRST NAME | Customer first name. |
| LAST NAME |  Customer last name.|
| GENDER | Customer gender. |
| DATE OF BIRTH | Customer date of birth. |
| COMPANY  | Drop-down list with the companies from **Customers&nbsp;<span aria-label="and then">></span> Companies**. This selection defines the list of available business unit. |
| BUSINESS UNIT | Business unit to which the user is going to be assigned. The list of the available values depends on the selected company. |
| ASSIGNED ROLES  | Roles assigned to the customer. |
Unassigned Roles | Roles that you can select to be assigned to the customer.|

## Editing a company user

To edit a company user:
1. On the *Overview of Company Users* page, in the _Actions_ column, click **Edit** for the user you want to update.
2. Update the needed values and click **Save**.

{% info_block infoBox "Info" %}

All values are available for modifications except for the email. The *Email* field is greyed out and is not available for modifications.

{% endinfo_block %}

### Reference information: Creating and editing and  a company user

The following table describes the attributes you see, select, or enter while creating or editing a company user.



## Attaching a company user to a business unit

To attach a company user to a new company business unit within the same company:
1. On the *Overview of Company Users* page, in the _Actions_ column, click **Attach to BU** for a user for which you want to change the assigned business unit.
2. On the *Attach to Business Unit* page:
    1. Select a business unit you would like the company user to be attached to from the drop-down list.
    2. Assign the role under the *Assigned Roles* section.
3. Click **Save**.

## Enabling and disabling a company user

If the company User is currently deactivated, in the *Actions* column, click the **Enable** option to activate the user.

To deactivate an enabled user, click **Disable**.
![Enabling a company user](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Company+Users/enabling-company-user.png)

## Deleting a company user

To delete a company user:
1. On the *Overview of Company Users* page, click **Delete** in the *Actions* column.
2. On the *Company user deletion confirmation* page, confirm the deletion.

{% info_block warningBox "Note" %}

If confirmed, the user is deleted from everywhere and is no longer able to log in to the online store.

{% endinfo_block %}
