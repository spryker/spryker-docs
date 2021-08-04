---
title: Business Units overview
originalLink: https://documentation.spryker.com/2021080/docs/business-units-overview
redirect_from:
  - /2021080/docs/business-units-overview
  - /2021080/docs/en/business-units-overview
---

Once a company administrator has created a company which has been activated and approved in the Back Office, they can start building the organizational structure of their company in _My Company_ section of the web-shop.

The very first step of defining the company structure is setting up business units and creating the business units hierarchy.

The **business units hierarchy** poses a system in which business units are arranged into levels:

* upper level
* lower level
* the same level

The business unit of the upper level is referred to as **parent business unit**, and the business units below it are its **child business units**.

Upon company registration, a default business unit named "Headquarters" is automatically created under Business Units section.

![default-business-unit_1_.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/default-business-unit_1_.png)

The company administrator can create, edit, delete as well as arrange business units in hierarchical order in the Business Units section.

To create a business unit, its name and email address must be specified.

{% info_block infoBox %}
The user can also select a parent business unit of the newly created unit. If it is not selected, the new business unit will be created with "0" level in hierarchy, i.e. as a parent.
{% endinfo_block %}
![new-bu.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/new-bu.png)

The parent and child business units are visually differentiated by means of indents. This differentiation is described in the following table:

| Level | Indents |
| --- | --- |
| 0 level business units (parents) | Have no indents before their lines. |
| 1 level business units | Have a single indent before them. |
| 2 level business units | Have a double indent. |
| And so on |

Example:
![business-units-hierarchy.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/business-units-hierarchy.png)

The following are special characteristics of business units:

* It is not possible to assign a parent business unit to its child.
* Deleting a parent business unit does not delete its children. The hierarchy is kept, and just goes one level up.

{% info_block infoBox %}
A business unit's children that are one level below it, become 0 level parent business units, and their children become 1 level children.
{% endinfo_block %}

* A business unit can be assigned with one or multiple addresses.
* The existing addresses can be assigned to business units right at the stage of their creation, and the new addresses can be added on the _Edit Business Unit_ page.

![business-units-address.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/business-units-address.png)

*  The addresses can also be unassigned by clearing the respective address's check box under the Assign Addresses section and clicking Submit.

![unassign-address.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/unassign-address.png)

This will move the address to Unassigned addresses section.

![unassigned-addresses.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/unassigned-addresses.png)

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                 <li><a href="https://documentation.spryker.com/docs/retrieving-business-units" class="mr-link">Retrieve business unit information via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-business-unit-addresses" class="mr-link">Retrieve business unit addresses via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-company-account-api-feature-integration" class="mr-link">Enable the Business Units Glue API by integrating the Company Account Glue API</a></li>
                <li>Enable Business Units:</li>
                <li><a href="https://documentation.spryker.com/docs/company-account-feature-integration" class="mr-link">Integrate the Company Account feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/mg-companyuser#upgrading-from-version-1-0-0-to-version-2-0-0" class="mr-link">Migrate the CompanyUser module from version 1.* to version 2.*</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-companies" class="mr-link">Manage company units</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-company-unit-addresses" class="mr-link">Manage company unit addresses</a></li>
            </ul>
        </div>
         </div>
</div>




## See next 

[Company user rules and permissions overview](https://documentation.spryker.com/docs/company-user-roles-and-permissions-overview)

