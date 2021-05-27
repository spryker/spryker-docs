---
title: Merchants - reference information
last_updated: Apr 23, 2021
description: This document contains the reference information that you need to know when working in the Marketplace > Merchants section in the Back Office.
template: back-office-user-guide-template
---

This topic contains the reference information that you need to know when working in the *Marketplace* > *Merchants* section in the Back Office.

## Merchants page

On the *Merchants* page, you see a table with all the merchants. The following information is included in the table:

* Merchant ID
* Merchant Name
* Approval status. For more details on the statuses a merchant profile may have, check the [merchant statuses](/docs/marketplace/user/features/{{ page.version }}/merchants/merchants-feature-overview.html#merchant-statuses) section
* Status (active/inactive). For more details on the statuses a merchant profile may have, check the [merchant statuses](/docs/marketplace/user/features/{{ page.version }}/merchants/merchants-feature-overview.html#merchant-statuses) section
* Stores
* Actions

![approving-and-denying-merchants](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Marketplace/Merchants/merchants-page.png)


By default, the table is sorted by the merchant Id value.

You can sort the table by other values (Name and Status) using  the respective sort icon in the needed column.

## Add/Edit Merchant page

The following table describes the attributes you enter and select when creating or editing merchants.

### General tab

This tab contains the main merchant information.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Name | Text field where you specify the name of the merchant that you create or edit. | &check; |
| Registration number | Text field where you specify the number assigned to the company at the point of registration. |  |
| Merchant Reference | Text field where you specify a unique identifier between Administrator's ERP and Spryker. | &check; |
| Email | Field where you specify the email address associated with the merchant. <br>{% info_block warningBox "Note" %}The email address is unique, meaning one value cannot be used for several merchants. If the merchant with the same email already exists, the following message is displayed for the *Email* field when trying to save the record: <br>"Email is already used."{% endinfo_block %}<br>However, the email can be the same as the email of a Marketplace Administrator that operates in the Administration Interface (Back Office). <br>{% info_block warningBox "Note" %}This email will be used by a merchant to log in to the Merchant Portal"{% endinfo_block %}. | &check; |
| Is Active | Checkbox that gets the merchant profile page in the Storefront online once checked. |  |
| Store Relation | List of stores where the merchant is present. |  |
| Merchant URL | Text field where, during editing, you can update the URL that is used to access the merchant profile. The profile URL is specified per locale. | &check; |
| Warehouses | Name of the Warehouse assigned to the merchant. For more details on the warehouses, see [Merchant Warehouse](/docs/marketplace/user/features/{{ page.version }}/merchants/merchants-feature-overview.html#merchant-warehouse.html#merchant-warehouse). |  |

### Contact Person Details tab

This tab contains information about the contact person. The contact person information is going to be used to create a **Merchant Admin User** who will be able to log in to **Merchant Portal**.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Title | Formal salutation for your contact person (e.g., Mr, Ms, Mrs, Dr). There is no default value selected. |  |
| Role | Text field where you can define the role the contact person performs. |  |
| Phone | Text field where you can enter the phone number of the contact person. |  |
| First Name | Text field where you can specify the first name of the contact person. | &check; |
| Last Name | Text field where you can specify the last name of the contact person. | &check; |

### Merchant Profile tab

This tab includes the public information about the merchant that is displayed in the Storefront).

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
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

## Legal Information tab

This tab contains legal information that is displayed on the *Merchant Profile* page in the Storefront.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Cancellation Policy | Standard WYSIWYG editor with text formatting options where you specify the cancellation policy for the merchant for a locale. |  |
| Data Privacy | Standard WYSIWYG editor with text formatting options where you specify the data privacy statement for a locale. |  |
| Imprint | Standard WYSIWYG editor with text formatting options where you specify imprint information for a locale. |  |
| Terms and Conditions | Standard WYSIWYG editor with text formatting options where you specify the terms and conditions for the merchant for a locale. |  |

## Users tab

This tab contains information about creating and editing [merchant users](/docs/marketplace/user/features/{{ page.version }}/merchants/merchant-users-feature-overview.html) for the merchant.

{% info_block infoBox "Info" %}
To restrict access to the Merchant Portal, on the *Merchants* page, in *Actions*, you can create merchant users only after the merchant is created. During the merchant creation process, this tab exists, but all the actions are disabled."
{% endinfo_block %}


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

The following table describes the attributes you enter and select when creating or editing merchant users.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Email | Text field where you specify the email address of the merchant mser. The email with the reset password instructions will be sent to this email address.  | &check; |
| First name | Text field where you specify the first name of the merchant user. | &check; |
| Last name | Text field where you specify the last name of the merchant user. | &check; |
| Status | Drop-down menu where you can update the Status of the merchant user. Can be: Active, Blocked, Deleted. This field appears when you [edit the merchant user](/docs/marketplace/user/back-office-user-guides/{{ page.version }}/marketplace/merchants/managing-merchant-users.html#editing-the-merchant-user). | &check; |

## Related articles

* [Managing merchants](/docs/marketplace/user/back-office-user-guides/{{ page.version }}/marketplace/merchants/managing-merchants.html)
* [Manging merchant users](/docs/marketplace/user/back-office-user-guides/{{ page.version }}/marketplace/merchants/managing-merchant-users.html)
