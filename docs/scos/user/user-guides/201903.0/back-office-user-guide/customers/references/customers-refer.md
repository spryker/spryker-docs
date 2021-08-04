---
title: Customers- Reference Information
originalLink: https://documentation.spryker.com/v2/docs/customers-reference-information
redirect_from:
  - /v2/docs/customers-reference-information
  - /v2/docs/en/customers-reference-information
---

This article contains the information you need to know when working with the **Customers** section in Back Office.
***
## Customers page
On the **Customers** page in the **Customers** > **Customers** section, you see a table with all the registered customers. The following information is included in the table:

* Date of the customer registration
* Customer email
* Customer last name and first name
* Zip code, city, and country
* The actions that you can perform on a customer record (**View**, **Edit**, and for _B2B only_: **Attach to company**)
***
## Add Customer/Edit Customer pages
The following table describes the attributes you enter and select when creating or editing customers.
|Attribute| Description|
|---|---|
| **Email**|An email address that will be linked to the new account. The email address is important for completing the registration (by accessing the link that will be sent by email) or for later use of the forgot password functionality. On the Edit customer page, this field is greyed out and not available for modifications.|
|**Salutation**|A formal salutation for your customer (e.g. **Mr**, **Mrs**).|
|**First Name**|Customer's first name.|
|**Last Name**|Customer's last name.|
|**Gender**|Customer's gender. The drop-down list with the following values available for selection: **Male** and **Femail**.|
|**Date of birth**|Customer's date of birth in format **mm/dd/yyyy**. Once you click on the field, the calendar opens where you can select the date.|
|**Phone**|Customer's phone number.|
|**Company**| Customer's company.|
|**Locale**|The selected from a drop-down list value defines the locale for your customer.|
|**Send password token through email**|If the checkbox is selected, after saving the customer data, an email will be sent to the customer containing a link. By accessing the link, the customer will be able to set a password for the account. If you don’t select this option, the customer is still able to set a password for their account, by clicking the reset password link from the shop interface. |
|Edit page only: **Billing Address**|A drop-down list with the addresses set up for the customer. The selected address defines the billing address for your customer.|
|Edit page only: **Shipping Address**|A drop-down list with the addresses set up for the customer. The selected address defines the shipping address for your customer.|
![Add or edit customers page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Customers/Customers%3A+Reference+Information/customers-reference-information.png){height="" width=""}

***
## Add New Address page
The following table describes the attributes you enter and select when adding a new customer address.
|Attribute|Description|
|---|---|
|**Salutation**</br>**First Name**</br>**Last Name**|Customer's salutation. If the other person is the point of contact for this new address, you need to populate the fields with the respective data. If the customer is the same, populate the fields with the same values.|
|**Address line 1**</br>**Address line 2**</br>**Address line 3**|The fields where you enter the address information except for the city, zip code, and country.|
|**City**</br>**Zip Code**</br>**Country**|City, zip code, and country of the customer.|
|**Phone**|Customer's phone number.|
|**Company**|Customer's company.|
|**Comment**|Any specific comment regarding the customer or customer address (e.g. _"This address is going to be used only if the order costs less than 900 euros."_).|
![Add new address page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Customers/Customers%3A+Reference+Information/Add+new+address+page.png){height="" width=""}

***
## B2B: Attach Customer to Company page
The following table describes the attributes that you select while attaching the customer to a company.
{% info_block infoBox "Info" %}
Once you click **Save**, you are redirected to the **Company Account > Company Users** page where your customer's data will be stored.
{% endinfo_block %}
|Attribute|Description|
|---|---|
|**Company**|A drop-down list with the companies from the **Company Account > Companies** section. Your selection defines the values available in the **Business Unit** drop-down list, as only the business units of the selected company are going to be displayed.|
|**Business Unit**|A drop-down list with the values from **Company Account > Company Units** section assigned to the Company that you selected in the **Company** drop-down list.|
|**Assigned Roles**|Displays the assigned roles if any.|
|**Unassigned Roles**|The roles that you can assign to the customer. The available roles are defined once they are assigned to the company in the **Company Account > Company Roles** section.|
