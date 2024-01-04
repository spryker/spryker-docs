---
title: Edit merchants
last_updated: Apr 23, 2021
description: This guide explains how to create and manage merchant records on the Merchants page.
template: back-office-user-guide-template
redirect_from:
  - /docs/marketplace/user/back-office-user-guides/202311.0/marketplace/merchants/managing-merchants.html
related:
  - title: Managing merchant users
    link: docs/marketplace/user/back-office-user-guides/page.version/marketplace/merchants/managing-merchant-users.html
  - title: Marketplace Merchant feature overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html
---

On the **Merchants** page, you can manage the merchants' records and facilitate the merchant registration and approval process, as well as apply any changes to the existing merchants' records. This document describes the procedures of creating and managing merchant records.



## Prerequisites

1. Go **Marketplace&nbsp;<span aria-label="and then">></span> Merchants**.
2. Next to the merchant you want to edit, click **Edit**.
    This opens the **Edit Merchant: {MERCHANT_ID}** page.

## Edit general merchant information

1. On the the **Edit Merchant: {MERCHANT_ID}** page, click the **General** tab.
2. Enter the following information:
  * **NAME**.
  * Optional: **REGISTRATION NUMBER**.
  * **MERCHANT REFERENCE**.
  * **EMAIL**.
3. Optional: To activate the merchant after creating it, select **IS ACTIVE**.
4. Optional: For **STORE RELATION**, select one or more stores to assign the merchant to.
5. For **MERCHANT URL**, enter the URLs of merchant profile per store.
6. Click **Save**.
    This opens the **Overview of Merchants** page with a success message displayed.

| ATTRIBUTE | DESCRIPTION |
|-|-|
| NAME | Name. |
| REGISTRATION NUMBER | The number assigned to the company during registration. |
| MERCHANT REFERENCE | Unique identifier of the merchant. This can be used to reference the merchant in a third-party ERP system. |
| EMAIL | The merchant's main email address. This address is used as a username when logging into the Merchant Portal. Addresses of existing Back Office users are accepted. |
| IS ACTIVE | Active merchants are displayed on the Storefront. |
| STORE RELATION | The stores in which the merchant is present. |
| MERCHANT URL | Merchant's profile URLs per store. |
| Warehouses | Name of the Warehouse assigned to the merchant. For more details about the warehouses, see [Merchant Warehouse](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/marketplace-inventory-management-feature-overview.html#marketplace-warehouse-management). |


## Edit merchant contact person information

1. On the the **Edit Merchant: {MERCHANT_ID}** page, click the **Contact Person Details** tab.
2. Enter a **ROLE**.
3. Optional: Select a **TITLE**.
4. Enter a **FIRST NAME**.
5. Enter a **LAST NAME**.
6. Optional: Enter a **PHONE**.
7. Click **Save**.
    This opens the **Overview of Merchants** page with a success message displayed.


| ATTRIBUTE | DESCRIPTION |
|-|-|
| ROLE | The role of the contact person in your company. |
| TITLE | Formal salutation. |
| FIRST NAME | First name. |
| LAST NAME | Last name. |
| PHONE | Phone number. |


## Edit the merchant profile

In this tab, all the fields are optional.

1. On the the **Edit Merchant: {MERCHANT_ID}** page, click the **Merchant Profile** tab.
2. Enter the following information:
  * **PUBLIC EMAIL**
  * **PUBLIC PHONE**
  * **FAX NUMBER**
  * **LOGO URL**

3. Enter the following information per locale:
  * **DESCRIPTION**
  * **AVERAGE DELIVERY TIME**
  * **BANNER URL**

4. Select a **COUNTRY**.

5. Enter the following information:
  * **STREET**
  * **NUMBER**
  * **ZIP CODE**
  * **CITY**
  * **ADDITION TO ADDRESS**
  * **LATITUDE**
  * **LONGITUDE**

6. Click **Save**.  
    This opens the **Overview of Merchants** page with a success message displayed.

| ATTRIBUTE | DESCRIPTION |
|-|-|
| PUBLIC EMAIL | Business/public email address. |
| PUBLIC PHONE | Business/public phone number. |
| FAX NUMBER | Business/public fax number. |
| LOGO URL | URL of the logo to be displayed on the profile. |
| DESCRIPTION | Description of the merchant. |
| AVERAGE DELIVERY TIME | Time period during which customers can expect to receive orders after placing them.  |
| BANNER URL | URL of the banner to be displayed on the profile.  |
| COUNTRY | Country. |
| STREET | Street. |
| NUMBER | Building number. |
| ZIP CODE | Zip code. |
| CITY | City. |
| ADDITION TO ADDRESS | Additional address information that might be useful for customers. |  
| LATITUDE | Defines the merchant's location. |
| LONGITUDE | Defines the merchant's location. |



## Edit legal information

In this tab, all the fields are optional.

1. On the the **Edit Merchant: {MERCHANT_ID}** page, click the **Legal Information** tab.
2. Enter the following information per locale:
  * **CANCELLATION POLICY**
  * **TERMS AND CONDITIONS**
  * **DATA PRIVACY**
  * **IMPRINT**
3. Click **Save**.  
    This opens the **Overview of Merchants** page with a success message displayed.  

| ATTRIBUTE | DESCRIPTION |
|-|-|
| CANCELLATION POLICY | Cancellation policy. |
| TERMS AND CONDITIONS | Terms and conditions. |  
| DATA PRIVACY | Data privacy statement. |
| IMPRINT | Imprint information. |

## Edit merchant users

This tab contains information about creating and editing [merchant users](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html) for the merchant.

## Add merchant users

1. Click **Add Merchant User**.
2. On the **CREATE MERCHANT USER** page, enter the following details:
  * **E-MAIL**
  * **FIRST NAME**
  * **LAST NAME**  
3. Click **Create**.
    This opens the **Edit Merchant: {MERCHANT_ID}** page with a success message displayed. The merchant user is displayed in the list.

By default, each merchant user obtains the role of Merchant Portal Administrator. To change it, [edit the user](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/edit-users.html).

#### Contact Person Details tab

This tab contains information about the contact person. The contact person information is going to be used to create a **Merchant Admin User** who will be able to log in to Merchant Portal.

| ATTRIBUTE | DESCRIPTION | REQUIRED |
|-|-|-|
| Title | Formal salutation for your contact person (for example, Mr, Ms, Mrs, Dr). There is no default value selected. |  |
| Role | Text field where you can define the role the contact person performs. |  |
| Phone | Text field where you can enter or change the phone number of the contact person. |  |
| First Name | Text field where you can specify the first name of the contact person. | &check; |
| Last Name | Text field where you can specify the last name of the contact person. | &check; |

#### Merchant Profile tab

This tab includes the public information about the merchant that is displayed in the Storefront).

| ATTRIBUTE | DESCRIPTION | REQUIRED |
|-|-|-|
| Public Email | Text field where you specify the business/public email address for the merchant.  |  |
| Public Phone | Text field where you specify the merchant's public phone number. |  |
| Fax Number | Text field where you specify the merchant's fax number. |  |
| Logo URL | Text field where you can specify the logo URL for the merchant profile. |  |
| Description | Text field where you can add a description for the merchant for a locale. |  |
| Average Delivery Time | Text field where you specify the average time during which the order is shipped for a locale. |  |
| Banner URL | Text field where you can add a link to the merchant's banner for a locale. |  |
| Country | Drop-down list where you specify the country of the merchant's business address. There is no value selected by default. |  |
| Street | Text field where you specify the street of the merchant's business address. |  |
| Number | Text field where you can specify the number included in the merchant's business address. |  |
| Zip Code | Text field where you specify the ZIP code of the merchant's business address. |  |
| City | Text field where you specify the city of the merchant's business address. |  |
| Addition to Address | Text field where you can specify any additional information included in the merchant's business address. |  |
| Longitude | Text field that is used to identify the merchant location. |  |
| Latitude | Text field that is used to identify the merchant location. |  |

#### Legal Information tab

This tab contains legal information that is displayed on the **Merchant Profile** page in the Storefront.

| ATTRIBUTE | DESCRIPTION | REQUIRED |
|-|-|-|
| Cancellation Policy | Standard WYSIWYG editor with text formatting options where you specify the cancellation policy for the merchant for a locale. |  |
| Data Privacy | Standard WYSIWYG editor with text formatting options where you specify the data privacy statement for a locale. |  |
| Imprint | Standard WYSIWYG editor with text formatting options where you specify imprint information for a locale. |  |
| Terms and Conditions | Standard WYSIWYG editor with text formatting options where you specify the terms and conditions for the merchant for a locale. |  |


### Creating a password

Once the merchant user is [activated](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchant-users.html#activating-and-deactivating-the-merchant-users), an email with the password reset link is sent. To reset the password:

1. Click the link provided in the email. The **Reset Password** page opens.

   ![Reset password page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Login+and+logout/set-password-for-merchant-portal.png)

2. In the **Password** field, enter the new password.

3. In **Repeat Password**, enter the new password again to confirm it.

4. Click **Reset** to update the password.

The password is reset and you can use it for login.



**What's next?**

Once you have the merchant record available in the system, you can proceed with creating a merchant user to log in to the Merchant Portal.

To know how to create those, see the [Managing merchant users](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchant-users.html).
