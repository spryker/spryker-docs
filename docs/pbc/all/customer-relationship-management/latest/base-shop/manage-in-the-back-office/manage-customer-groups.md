---
title: Manage customer groups
description: Learn how to create, edit and manage customer groups in the Spryker Back Office.
last_updated: Oct 19, 2026
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customer-groups
originalArticleId: 3540b410-11bf-4d1f-a9f6-306009db8740
redirect_from:
  - /2021080/docs/managing-customer-groups
  - /2021080/docs/en/managing-customer-groups
  - /docs/managing-customer-groups
  - /docs/en/managing-customer-groups
  - /docs/scos/user/back-office-user-guides/202200.0/customer/customer-customer-access-customer-groups/managing-customer-groups.html
  - /docs/scos/user/back-office-user-guides/202204.0/customer/customer-customer-access-customer-groups/managing-customer-groups.html
  - /docs/scos/user/back-office-user-guides/202311.0/customer/customer-customer-access-customer-groups/managing-customer-groups.html
  - /docs/scos/user/back-office-user-guides/202204.0/customer/manage-customer-groups.html
related:
  - title: Customer Groups overview
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html
---

This article describes how to create customer groups in the Back Office. By default, customer groups are only used when [defining discount conditions](/docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html#3-define-on-what-conditions-the-discount-can-be-applied). A developer can configure customer groups to be used in other parts of the Back Office.

With the [B2B Customer Groups feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-b2b-customer-groups-feature.html), a customer group can also hold companies and business units. Discount conditions evaluate only the customers of a group, so company and business unit memberships do not affect discounts. For how these memberships behave, see [Customer Groups overview](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html#company-and-business-unit-memberships).

## Prerequisites

To start working with customer groups, go to **Customers&nbsp;<span aria-label="and then">></span> Customer Groups**.

Review the [reference information](#reference-information-manage-customer-groups) before you start or look up the necessary information as you go through the process.

## Create a customer group

1. On the **Customer groups** page, click **Add Customer Group**.
2. On the **Add a customer group**, page, enter a **NAME**.
3. Optional: Enter a **DESCRIPTION**.
4. Click the **Customers** tab.
5. On the **Available customers** subtab, select the checkboxes next to the customers you want to add to the group.
6. Optional: To add companies to the group, click the **Companies** tab. On the **Available companies** subtab, select the checkboxes next to the companies you want to add.
    The selected companies are listed on the **Companies to be assigned** subtab.
7. Optional: To add business units to the group, click the **Business Units** tab. On the **Available business units** subtab, select the checkboxes next to the business units you want to add.
    The selected business units are listed on the **Business units to be assigned** subtab.
8. Click **Save**.
    This opens the **Customer Groups** page with a success message displayed. The group is displayed in the list.

The **Companies** and **Business Units** tabs are displayed only if the B2B Customer Groups feature is installed.

## Edit a customer group

1. On the **Customer groups** page, click **Edit** next to the group you want to edit.
2. On the **Edit customer group** page, enter the **NAME**.
3. Update the **DESCRIPTION**.
4. Click the **Customers** tab.
5. On the **Available customers** subtab, select the checkboxes next to the customers you want to add to the group.
    The selected customers are listed on the **Selected customers to assign** subtab.
6. On the **Assigned customers** subtab, select the checkboxes next to the customers you want to remove from the group. To select all the customers on the page, click **Select all**.
    The selected customers are listed on the **Selected customers to de-assign** subtab.
7. Optional: Click the **Companies** tab and do any of the following:
    - To add companies, on the **Available companies** subtab, select the checkboxes next to the companies you want to add. The selected companies are listed on the **Companies to be assigned** subtab.
    - To remove companies, on the **Assigned companies** subtab, select the checkboxes next to the companies you want to remove. The selected companies are listed on the **Companies to be de-assigned** subtab.
8. Optional: Click the **Business Units** tab and do any of the following:
    - To add business units, on the **Available business units** subtab, select the checkboxes next to the business units you want to add. The selected business units are listed on the **Business units to be assigned** subtab.
    - To remove business units, on the **Assigned business units** subtab, select the checkboxes next to the business units you want to remove. The selected business units are listed on the **Business units to be de-assigned** subtab.
9. Click **Save**.
    This opens the **View customer group** page with a success message displayed.

Adding or removing a company does not add or remove its business units, and the other way around. To change both, select them on both tabs.

If the save fails validation, for example, because another customer group already has the name, the page shows the error. The **Companies** and **Business Units** tabs keep your selections, so you can fix the error and save again. The **Customers** tab does not keep its selection, so select the customers again.

## View a customer group

On the **Customer groups** page, click **View** next to the group you want to view.

The **View customer group** page shows the **General Information** panel with the name and description of the group, and the **Customers** panel with its customers. With the B2B Customer Groups feature, the page also shows the **Companies** and **Business Units** panels. To open the edit page of a company or business unit, click **Edit** next to it.

## Reference information: Manage customer groups

| ATTRIBUTE| DESCRIPTION |
|---|---|
| NAME | Unique identifier of the group. You will use it to identify the group when adding a discount condition. |
| DESCRIPTION | Description. |

The tables on the **Companies** and **Business Units** tabs and panels have the following columns:

| TABLE | COLUMNS | SEARCH BY |
|---|---|---|
| Companies | **ID**, **Company**, **Customers** | Company name. |
| Business units | **ID**, **Business unit**, **Company**, **Customers** | Business unit name and company name. |

You can sort the tables by every column except **Customers**. The **Customers** column counts the company users of a company, or the company users directly in a business unit, including inactive ones. It does not count the users of child business units.

You select companies and business units one at a time. A single save accepts up to 1,000 companies to be assigned and up to 1,000 companies to be de-assigned. The same limits apply to business units.
