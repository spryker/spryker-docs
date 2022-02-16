---
title: Business Units overview
description: Once a company administrator has created a company, and it has been activated and approved, they can start building the organizational structure.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/business-unit-management-feature-overview
originalArticleId: c9394487-49fc-4a5a-ae8d-ff7258c6b596
redirect_from:
  - /v4/docs/business-unit-management-feature-overview
  - /v4/docs/en/business-unit-management-feature-overview
  - /v4/docs/business-unit-management
  - /v4/docs/en/business-unit-management
---

Once a company administrator has created a company which has been activated and approved in the Administrator Interface, they can start building the organizational structure of their company in _My Company_ section of the web-shop.

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
The user can also select a parent business unit of the newly created unit. If it is not selected, the new business unit will be created with "0" level in hierarchy, for example, as a parent.
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

<!-- _Last review date: Feb 11, 2018_ by Helen Kravchenko -->

