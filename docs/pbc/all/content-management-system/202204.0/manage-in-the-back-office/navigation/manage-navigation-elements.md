---
title: Managing navigation elements
description: Use these procedures to create, edit, activate or deactivate a child node, view and manage a navigation tree and create the new navigation in the Back Office.
last_updated: Jun 18, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-navigation-elements
originalArticleId: c580f175-685f-47d3-a899-2716f450152b
redirect_from:
  - /2021080/docs/managing-navigation-elements
  - /2021080/docs/en/managing-navigation-elements
  - /docs/managing-navigation-elements
  - /docs/en/managing-navigation-elements
  - /docs/scos/user/back-office-user-guides/202200.0/content/navigation/managing-navigation-elements.html
related:
  - title: Navigation feature overview
    link: docs/scos/user/features/page.version/navigation-feature-overview.html
---

This topic describes how to manage [navigation elements](/docs/pbc/all/content-management-system/{{page.version}}/navigation-feature-overvieweature-overview.html#navigation-element).

## Prerequisites

To start working with navigation elements,

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.



## Editing a navigation node

To edit a navigation node:

1. In *List of navigation elements*, select the navigation element owning the navigation node you want to edit.
2. In the *Navigation tree* section, select the navigation node you want to edit.
3. In the *Edit node* section:
    1. Select the node **Type**. To learn about the node types, see [Navigation node types](#navigation-node-types).
    2. Enter the required fields per each locale.
    3. Select **Valid from** and **Valid to** dates.
    4. Select or clear the **Active** checkbox if you want to activate or deactivate the navigation node.
4. Click **Save**.
You can see the message about the successful navigation node update.

### Reference information: Editing a navigation node

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| **Type** | Type of the navigation node. For all the types, see [Navigation node types](#navigation-node-types). |
| **Title** | Name of the navigation node. It is displayed on the Storefront. |
| **Custom CSS class** | CSS class defining the design of the navigation node. Usually, a front-end developer creates them. |
| **Valid from** and **Valid to** | Navigation node is displayed on the Storefront between the dates defined in these fields, inclusively. |
| **Active** | Checkbox to define if the navigation node is active. Inactive navigation nodes and their sub-nodes are not displayed on the Storefront.  |
