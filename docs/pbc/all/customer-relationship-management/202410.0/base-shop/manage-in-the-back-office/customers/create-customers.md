---
title: Create customers
description: Learn how to create new customers in the Spryker Cloud Commerce OS Back Office.
last_updated: Jul 6, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customers
originalArticleId: 32a86d51-5bdd-428b-8ae4-5929326f4a26
redirect_from:
  - /2021080/docs/managing-customers
  - /2021080/docs/en/managing-customers
  - /docs/managing-customers
  - /docs/en/managing-customers
  - /docs/scos/user/back-office-user-guides/202311.0/customer/customer-customer-access-customer-groups/managing-customers.html
  - /docs/scos/user/back-office-user-guides/202204.0/customer/customers/create-customers.html
related:
  - title: Customer Account Management feature overview
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html
---

This document describes how to create customers in the Back Office.

## Prerequisites

Review the [reference information](#reference-information-create-a-customer) before you start or look up the necessary information as you go through the process.

## Create a customer

1. Go to **Customers&nbsp;<span aria-label="and then">></span> Customers**.
2. On the **Customers** page, click **Add Customer**.
3. On the **Add a customer** page, enter an **EMAIL**.
4. Select a **SALUTATION**.
5. Enter a **FIRST NAME**.
6. Enter a **LAST NAME**.
7. Optional: Select a **GENDER**.
8. Optional: Select a **DATE OF BIRTH**.
9. Optional: Enter a **PHONE**.
10. Optional: Enter a **COMPANY**.
11. Optional: Select a **LOCALE**.
12. To send a password change link to the customer's **EMAIL**, select the **SEND PASSWORD TOKEN THROUGH EMAIL** checkbox.
13. Click **Save**.

    This opens the **Customers** page with a success message displayed. The customer is displayed in the list.

**Tips and tricks**

Once you create a customer, a verification email is sent to their email address, while their **STATUS** is **Unverified**. After they click the verification link, their status changes to  **Verified**.

## Reference information: Create a customer

|ATTRIBUTE| DESCRIPTION|
|---|---|
| EMAIL | Email address to be used for the account. |
| SALUTATION | Formal salutation. |
| FIRST NAME | First name. |
| LAST NAME | Last name. |
| GENDER | Gender.|
| DATE OF BIRTH | Date of birth.|
| PHONE | Phone number.|
|COMPANY| Company. Not to be confused with a [B2B company](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-accounts-overview.html). |
| LOCALE | Locale.|
| SEND PASSWORD TOKEN THROUGH EMAIL | If you select the checkbox, after saving the customer, an email will be sent to the customer containing a link. By accessing the link, the customer will be able to set a password for the account. If you don't select this option, the customer will still be able request this email on the Storefront. |

## Next steps

- [Add customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/add-customer-addresses.html)
- [Add notes to customers](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/add-notes-to-customers.html)
