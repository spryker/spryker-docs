---
title: Create navigation nodes
description: Learn the different types of navigation nodes and how to create navigation nodes in the Spryker Cloud Commerce OS Back Office.
last_updated: Aug 6, 2026
template: back-office-user-guide-template
redirect_from:
  - /docs/pbc/all/content-management-system/202311.0/manage-in-the-back-office/navigation/create-navigation-nodes.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/navigation/create-navigation-nodes.html
related:
  - title: Navigation feature overview
    link: docs/pbc/all/content-management-system/latest/base-shop/navigation-feature-overview.html
---

This document describes how to create [navigation nodes](/docs/pbc/all/content-management-system/latest/base-shop/navigation-feature-overview.html#navigation-node).

## Prerequisites

To start working with navigation nodes, go to **Content&nbsp;<span aria-label="and then">></span> Navigation**.

Make sure to review the [reference information](#reference-information-create-navigation-nodes) before you start, or look up the necessary information as you go through the process.

## Create a navigation node

1. In the **List of navigation elements**, select the navigation element you want to create a node for.
2. In the **Create child node** pane, select the node **TYPE**.
3. Enter a **TITLE**.
4. Depending on the node **TYPE**, do one of the following:
    - **Category**: enter and select a **CATEGORY URL**.
    - **CMS page**: enter and select a **CMS PAGE URL**.
    - **Link**: enter a **LINK**.
    - **External URL**: enter an **EXTERNAL URL**.
5. Optional: Enter a **CUSTOM CSS CLASS**.
6. Select **VALID FROM** and **VALID TO** dates.
7. To display the node on the Storefront, select the **ACTIVE** checkbox.
8. Click **Save**.

This displays a success message. The **NAVIGATION TREE** refreshes with the created note displayed.

## Create a child navigation node

1. In the **List of navigation elements**, select the navigation element you want to create a child node for.
2. In the **Navigation tree** pane, select the navigation node you want to create a child node for.
3. In the **EDIT NODE** pane, click **Create child node**.
4. In the **Create child node** pane, select the node **TYPE**.
5. Enter a **TITLE**.
6. Depending on the node **TYPE**, do one of the following:
    - **Category**: enter and select a **CATEGORY URL**.
    - **CMS page**: enter and select a **CMS PAGE URL**.
    - **Link**: enter a **LINK**.
    - **External URL**: enter an **EXTERNAL URL**.
7. Optional: Enter a **CUSTOM CSS CLASS**.
8. Select **VALID FROM** and **VALID TO** dates.
9. To display the node on the Storefront, select the **ACTIVE** checkbox.
10. Click **Save**.

This displays a success message. The **NAVIGATION TREE** refreshes with the created note displayed.


## Reference information: Create navigation nodes

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| TYPE | Type of the navigation node. For all the types, see [Navigation node types](#reference-information-navigation-node-types). |
| TITLE | Name of the navigation node. It will be displayed on the Storefront. |
| CUSTOM CSS CLASS | CSS class defining the design of the navigation node. Usually, a front-end developer creates them. |
| VALID FROM and VALID TO | Navigation node will be displayed on the Storefront between the dates defined in these fields, inclusively. |
| ACTIVE | Checkbox to define if the navigation node will be active. Inactive navigation nodes and their sub-nodes are not displayed on the Storefront.  |

## Reference information: Navigation node types

| NODE TYPE | DESCRIPTION |
| --- | --- |
|Label<br>![Label](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/label.png)   | Labels do not link to any specific URL; they are used for grouping other items accessed from the menu.|
| Category<br>![Category](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/category.png) | Category is used to link an existing category you have to the navigation node. A category must exist in the Category section. |
|CMS Page<br>![CMS page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/cms-page.png)| CMS page can be assigned to a node. A CMS page must exist in the **Content&nbsp;<span aria-label="and then">></span> Pages** section.|
| External URL<br>![External URL](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/external-url.png) |External URL is a link that is typically opened in a new tab. |
|Link<br>![Link](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/link.png)   | Link to internal pages, such as login or registration. |

Depending on the type of the node, there is various node related information that can be managed:

- Localized title (all types of nodes): This is the name of the node exactly how it will be displayed in the store (for example, if you link a category to your node, the node name can be even different from the name of the category).
- Localized custom CSS class (all types of nodes): If the class is defined in the shop, then a correct class reference will define the look and feel of the node. This is also localized, which means that for different locales, you can have different appearances for the same node.
- Active/not active (all types of nodes): If necessary, you can also completely deactivate a node. This will also make the node and the nodes below it invisible in your shop for as long as it's inactive.
- Localized category URL (only for **Category** type): When you are assigning a category to the node, you can search by the category name to select the correct category URL you want to assign. Keep in mind that this also is localized information, so for multiple locales, you will need to make sure that you select the same category for all locales. If your category has multiple parents in the category tree, the same category can have different URLs. In this case, you will need to pick one of those URLs.
- Localized CMS page URL (only for **CMS** type): When you are assigning a CMS page to the node, you can search by the CMS page name to select the correct CMS page URL you want to assign. Keep in mind that this is also localized information, so for multiple locales, you will need to make sure that you select the same CMS page for all locales.
- Link (only for **Link** type): This is the relative path of your internal link. For example, if you would like to link a login page that is under **/login**, then this is exactly what you will use as an input for the Link field.
- External URL (only for **External URL** type): If you would like to link an external URL to your nodes, you will use this field to define the absolute URL. This could be used, for example, to link your corporate website page in your shop. Unlike internal links, the URL of the external link should be absolute, which means it needs to include the protocol as well as domain, such as `https://mydomain.com/page`.

{% wistia 2iepfhl6fu 960 720 %}


<figure class="video_container">
    <video width="100%" height="auto" controls>
      <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/content-management-system/base-shop/manage-in-the-back-office/navigation/create-navigation-nodes.md/How+to+Configure+Navigation+in+Spryker+B2C-pvp8jxj85s.mp4" type="video/mp4">
  </video>
</figure>
