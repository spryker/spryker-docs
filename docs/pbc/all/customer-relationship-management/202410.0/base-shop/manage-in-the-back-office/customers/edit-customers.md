---
title: Edit customers
description: Learn how to edit customers information in the Spryker Cloud Commerce OS Back Office.
template: back-office-user-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/customer/customers/edit-customers.html
  - /docs/scos/user/back-office-user-guides/202204.0/customer/customers/edit-customers.html
related:
  - title: Customer Account Management feature overview
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html
---

This document describes how to edit customers in the Back Office.

## Prerequisites

- Optional: To select billing and shipping addresses, [add customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/add-customer-addresses.html).
- Review the [reference information](#reference-information-edit-a-customer) before you start or look up the necessary information as you go through the process.


## Edit a customer

1. Go to **Customers&nbsp;<span aria-label="and then">></span> Customers**.
    This opens the **Customer** page.
2. Next to the customer you want to edit, click **Edit**.
3. On the **Add a customer** page, select a **SALUTATION**.
4. Enter a **FIRST NAME**.
5. Enter a **LAST NAME**.
6. Select a **GENDER**.
7. Select a **DATE OF BIRTH**.
8. Enter a **PHONE**.
9. Enter a **COMPANY**.
10. Select a **LOCALE**.
11. To send a password change link to the customer's **EMAIL**, select the **SEND PASSWORD TOKEN THROUGH EMAIL** checkbox.
12. Select a **BILLING ADDRESS**.
13. Select a **SHIPPING ADDRESS**.
14. Click **Save**.
    This opens the **View** page with a success message displayed.


## Reference information: Edit a customer

|ATTRIBUTE| DESCRIPTION|
|---|---|
| EMAIL | Email address. To change a customer's email address, you have to [create the customer](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/create-customers.html) from scratch. |
| SALUTATION | Formal salutation. |
| FIRST NAME | First name. |
| LAST NAME | Last name. |
| GENDER | Gender.|
| DATE OF BIRTH | Date of birth.|
| PHONE | Phone number.|
|COMPANY| Company. Not to be confused with a [B2B company](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-accounts-overview.html). |
| LOCALE | Locale. |
| SEND PASSWORD TOKEN THROUGH EMAIL | If you select the checkbox, after saving the customer, an email will be sent to the customer containing a link. By accessing the link, the customer will be able to set a password for the account. If you don't select this option, the customer will still be  able to request the password reset email on the Storefront. |
| BILLING ADDRESS | When placing an order, this address will be selected by default for billing. To add an address, see [Add customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/add-customer-addresses.html). |
| SHIPPING ADDRESS | When placing an order, this address will be selected by default for shipping. To add an address, see [Add customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/add-customer-addresses.html).  |
