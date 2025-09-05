---
title: Manage customer groups
description: Learn how to create, edit and manage customer groups in the Spryker Back Office.
last_updated: May 10, 2022
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
  - /docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-groups.html
related:
  - title: Customer Groups overview
    link: docs/scos/user/features/202204.0/customer-account-management-feature-overview/customer-groups-overview.html
---

This article describes how to create customer groups in the Back Office. By default, customer groups are only used when [defining discount conditions](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html#define-on-what-conditions-the-discount-can-be-applied). A developer can configure customer groups to be used in other parts of the Back Office.

## Prerequisites

To start working with customer groups, go to **Customers&nbsp;<span aria-label="and then">></span> Customer Groups**.

Review the [reference information](#reference-information-manage-customer-groups) before you start or look up the necessary information as you go through the process.

## Create a customer group

1. On the **Customer groups** page, click **Add Customer Group**.
2. On the **Add a customer group**, page, enter a **NAME**.
3. Optional: Enter a **DESCRIPTION**.
4. Click the **Customers** tab.
5. On the **Available customers** subtab, select the checkboxes next to the customers you want to add to the group.
6. Click **Save**.
    This opens the **Customer Groups** page with a success message displayed. The group is displayed in the list.


## Edit a customer group

1. On the **Customer groups** page, click **Edit** next to the group you want to edit.
2. On the **Edit customer group** page, enter the **NAME**.
3. Update the **DESCRIPTION**.
4. Click the **Customers** tab.
5. On the **Available customers** subtab, select the checkboxes next to the customers you want to add to the group.
6. On the **Assigned customers** subtab, clear the checkboxes next to the customers you want to remove from the group.
7. Click **Save**.
    This opens the **View customer group** page with a success message displayed.

## Reference information: Manage customer groups

| ATTRIBUTE| DESCRIPTION |
|---|---|
| NAME | Unique identifier of the group. You will use it to identify the group when adding a discount condition. |
| DESCRIPTION | Description. |
