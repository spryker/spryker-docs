---
title: Reference information- slots
originalLink: https://documentation.spryker.com/v6/docs/slots-reference-information
redirect_from:
  - /v6/docs/slots-reference-information
  - /v6/docs/en/slots-reference-information
---

This topic contains the reference information for working with slots in **Content Management > Slots**.
***
## Overview of Slots
In the **List of Templates** section of the **Overview of Slots** page, you see the following:

| Attribute | Description |
| --- | --- |
| **ID** | Sequence number. |
| **Name** | Alphabetic identifier of the template fetched from database. |
| **Description** | Description of the template fetched from the database. |
| **Number of Slots** | Number of slots in this template. |

In this section, you can:

* Sort templates by ID and Name.
* Filter templates by ID, Name and Description.
* Filter slots displayed in the **List of Slots for [name] Template** section by templates.

In the **List of Slots for [name] Template** section of the **Overview of Slots** page, you see the following:

| Attribute | Description |
| --- | --- |
| **ID** | Sequence number. |
| **Name** | Alphabetic identifier of the slot fetched from database. |
| **Description** | Description of the slot fetched from the database. |
| **Content Provider** | Source from which Slot Widget fetches content for this slot. |
| **Status** | Slot status that can be active (visible in the store page) or inactive (invisible in the store page). |
| **Actions** | Set of actions that can be performed with a Slot. |

{% info_block infoBox "Content Provider" %}

This column is displayed only when a project has more than one content provider.

{% endinfo_block %}

{% info_block infoBox "Status" %}

By default, all the slots have the **Active** status.

{% endinfo_block %}

In this section, you can:

* Sort slots by ID, Name, Content Provider and Status.
* Filter slots by ID, Name, Description and Content Provider.
* Filter CMS blocks displayed in the **List of assigned Blocks for [name] Slot** section by slots.

{% info_block infoBox "Info" %}

The search only applies to the slots displayed for the chosen template from the List of Templates.

{% endinfo_block %}

In the **List of assigned Blocks for [name] Slot** section of the **Overview of Slots** page, you see the following:

{% info_block infoBox "Info" %}

Apart from the **ID** and **Actions**, the attributes described below depend on the CMS block settings defined in **Content Management > Blocks**. See [CMS Block: Reference Information](https://documentation.spryker.com/v4/docs/cms-block-reference-information#create-and-edit-cms-block-page) to learn about them.

{% endinfo_block %}

| Attribute | Description |
| --- | --- |
| **ID** | Sequence number. |
| **Name** | Alphabetic identifier of the CMS block. |
| **Valid From (Included) and Valid To (Excluded)** | Set of dates defining the time period of an active CMS block being visible in the store. |
| **Status** | CMS block status that can be active (visible in the store page) or inactive (invisible on the store page). |
| **Stores** | Store locale for which the block is available. |
| **Actions** | Set of actions that can be performed with a CMS block. |

{% info_block infoBox "Info" %}

The attributes described below depend on the page type to which the template with the selected CMS block is applied - Product, Category or CMS page.
The **Product Pages per Category** is only displayed when you are defining the visibility conditions of a CMS block belonging to a slot of a Product page template.

{% endinfo_block %}

| Attribute | Description |
| --- | --- |
| **All [page type] Pages** | Radio button defining that the CMS block is displayed on all the [page type] pages to which the corresponding template is applied. |
| **Specific [page type] Pages** | Radio button defining that the CMS block is displayed only on the pages selected in the **[page type] Pages** and/or **Product Pages per Category** fields. |
| **[page type] Pages** | Drop-down menu in which you can select specific pages that are to display the selected CMS block. |
| **Product Pages per Category** | Drop-down menu in which you can select categories The CMS block is displayed on the products pages belonging to the selected categories. |

In this section, you can assign CMS blocks to slots and select the pages in which a selected CMS block is to be displayed.
