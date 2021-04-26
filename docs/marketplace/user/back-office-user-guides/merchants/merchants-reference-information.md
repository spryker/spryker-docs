---
title: Merchants - reference information
last_updated: Apr 23, 2021
description: This document contains the reference information that you need to know when working in the Marketplace > Merchants section in the Back Office.
---

This topic contains the reference information that you need to know when working in the *Marketplace* > *Merchants* section in the Back Office.

## Merchants page

On the *Merchants* page, you see a table with all the merchants. The following information is included in the table:

* Merchant ID
* Merchant Name
* Approval status. For more details on the statuses, the Merchant Profile may have, check the [Merchant statuses](/docs/marketplace/user/features/merchants/merchants-feature-overview.html#merchant-statuses) section
* Status (active/inactive). For more details on the statuses, the Merchant Profile may have, check the [Merchant statuses](/docs/marketplace/user/features/merchants/merchants-feature-overview.html#merchant-statuses) section
* Stores
* Actions

![approving-and-denying-merchants](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Marketplace/Merchants/merchants-page.png)


By default, the table is sorted by the Merchant Id value.

You can sort the table by other values (Name and Status) using  the respective sort icon in the needed column.

## Add/Edit Merchant page

The following table describes the attributes you enter and select when creating or editing Merchants.

### General tab

This tab contains the main information about the Merchant.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Name | A text field where you specify the name of the Merchant that you create or edit. | &check; |
| Registration number | A text field where you specify the number assigned to the company at the point of registration. |  |
| Merchant Reference | A text field where you specify a unique identifier between Administrator's ERP and Spryker. | &check; |
| Email | A field where you specify the email address associated with the Merchant. **NOTE**: The email address is unique, meaning one value cannot be used for several Merchants. If the Merchant with the same email already exists, the following message is displayed for the *Email* field when trying to save the record: <br><br>"Email is already used." <br><br>However, the email can be the same as the email of a Marketplace Administrator that operates in the Administration Interface (Back Office). <br><br>**NOTE**: This email will be used by a Merchant to log in to the Merchant Portal. | &check; |
| Is Active | A checkbox that, once checked, gets the merchant profile page in the Storefront online. |  |
| Store Relation | A list of stores where the merchant is present. |  |
| Merchant URL | A text field where, during editing, you can update the URL that is used to access the Merchant profile. The profile URL is specified per locale. | &check; |
| Warehouses | Name of the Warehouse assigned to the Merchant. For more details on the warehouses, see [Merchant Warehouse](/docs/marketplace/user/features/merchants/merchants-feature-overview.html#merchant-warehouse.html#merchant-warehouse). |  |

### Contact Person Details tab

This tab contains information about the contact person. The contact person information is going to be used to create a **Merchant Admin User** who will be able to log in into **Merchant Portal**.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Title | A formal salutation for your contact person (e.g. Mr, Ms, Mrs, Dr). There is no default value selected. |  |
| Role | A text field where you can define the role the contact person performs. |  |
| Phone | A text field where you can enter the phone number of the contact person. |  |
| First Name | A text field where you can specify the first name of the contact person. | &check; |
| Last Name | A text field where you can specify the last name of the contact person. | &check; |

### Merchant Profile tab

This tab includes the public information about the merchant that is displayed in the Storefront).

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Public Email | A text field where you specify the business/public email address for the Merchant.  |  |
| Public Phone | A text field where you specify the Merchant's public phone number. |  |
| Fax Number | A text field where you specify the Merchant's fax number. |  |
| Logo URL | A text field where you can specify the logo URL for the Merchant profile. |  |
| Description | A text field where you can add a description for the Merchant for a locale. |  |
| Average Delivery Time | A text field where you specify the average time during which the order is shipped for a locale. |  |
| Banner URL | A text field where you can add a link to the Merchant's banner for a locale. |  |
| Country | A drop-down list where you specify the country of the Merchant's business address. There is no value selected by default. |  |
| Street | A text field where you specify the street of the Merchant's business address. |  |
| Number | A text field where you can specify the number included to the Merchant's business address. |  |
| Zip Code | A text field where you specify the ZIP code of the Merchant's business address. |  |
| City | A text field where you specify the city of the merchant's business address. |  |
| Addition to Address | A text field where you can specify any additional information included in the Merchant's business address. |  |
| Longitude | A text field that is used to identify the Merchant location. |  |
| Latitude | A text field that is used to identify the Merchant location. |  |

## Legal Information tab

This tab contains legal information that is displayed on the Merchant Profile page in the Storefront.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Cancellation Policy | Standard WYSIWYG editor with text formatting options where you specify the cancellation policy for the Merchant for a locale. |  |
| Data Privacy | Standard WYSIWYG editor with text formatting options where you specify the data privacy statement for a locale. |  |
| Imprint | Standard WYSIWYG editor with text formatting options where you specify imprint information for a locale. |  |
| Terms and Conditions | Standard WYSIWYG editor with text formatting options where you specify the terms and conditions for the Merchant for a locale. |  |

## Users tab

This tab contains information about creating and editing [Merchant Users](/docs/marketplace/user/features/merchants/merchant-users-feature-overview.html) for Merchant.

{% include note.html content="You can create the merchant users only after the merchant is created. During the merchant creation process, this tab exists but all the actions are disabled." %}


**Merchant users page**

On the *Users* page, you see a table with all the merchant users available for the merchant. The following information is included in the table:
* Merchant user ID
* Email
* First Name
* Last Name
* Merchant user status
* Actions

![merchant-users-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Marketplace/Merchants/merchant-users-page.png)

**Create or edit merchant user page**

The following table describes the attributes you enter and select when creating or editing Merchant users.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Email | A text field where you specify the email address of the Merchant User. The email with the reset password instructions will be sent to this email address.  | &check; |
| First name | A text field where you specify the first name of the Merchant User. | &check; |
| Last name | A text field where you specify the last name of the Merchant user. | &check; |
| Status | A drop-down menu where you can update the Status of the Merchant User. Can be: Active, Blocked, Deleted. This field appears when you [edit the Merchant User](/docs/marketplace/user/back-office-user-guides/merchants/managing-merchant-users.html#editing-the-merchant-user). | &check; |

## Related articles

* [Managing merchants](/docs/marketplace/user/back-office-user-guides/merchants/managing-merchants.html)
* [Manging merchant users](/docs/marketplace/user/back-office-user-guides/merchants/managing-merchant-users.html)
