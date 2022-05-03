---
title: Managing customers
description: This guide provides instructions on how shop owners can add and manage personal information, customer billing, and shipping addresses in the Back Office.
last_updated: Jul 6, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customers
originalArticleId: 32a86d51-5bdd-428b-8ae4-5929326f4a26
redirect_from:
  - /2021080/docs/managing-customers
  - /2021080/docs/en/managing-customers
  - /docs/managing-customers
  - /docs/en/managing-customers
  - /docs/scos/user/back-office-user-guides/202108.0/customer/customer-customer-access-customer-groups/managing-customers.html
related:
  - title: Customer Accounts
    link: docs/scos/user/features/page.version/customer-account-management-feature-overview/customer-account-management-feature-overview.html
---

This article describes how to create customers.

## Prerequisites

Review the [reference information](#reference-information-create-a-customer-address) before you start or look up the necessary information as you go through the process.

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
| EMAIL | Email address that will be linked to the new account. The email address is important for completing the registration (by accessing the link that will be sent by email) or for later use of the forgot password functionality.|
| SALUTATION |Formal salutation for your customer (e.g., Mr, Mrs).|
| FIRST NAME |Customer's first name.|
| LAST NAME |Customer's last name.|
| GENDER |Customer's gender. The drop-down list with the following values available for selection:  Male and Female.|
| DATE OF BIRTH |Customer's date of birth in the format mm/dd/yyyy. Once you click on the field, the calendar opens where you can select the date.|
| PHONE |Customer's phone number.|
| COMPANY | Customer's company.|
| LOCALE |Selected from a drop-down list value defines the locale for your customer.|
| SEND PASSWORD TOKEN THROUGH EMAIL | If you select the checkbox, after saving the customer, an email will be sent to the customer containing a link. By accessing the link, the customer will be able to set a password for the account. If you don’t select this option, the customer will still able to set a password by clicking the reset password link on the Storefront. |
