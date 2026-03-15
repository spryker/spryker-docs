---
title: Create navigation nodes
description: Learn the different types of navigation nodes and how to create navigation nodes in the Spryker Cloud Commerce OS Back Office.
last_updated: Nov 22, 2022
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

{% include pbc/all/content-management-system/manage-in-the-back-office/navigation/reference-information-navigation-node-types.md %} <!-- To edit, see /_includes/pbc/all/content-management-system/manage-in-the-back-office/navigation/reference-information-navigation-node-types.md -->
