---
title: Managing Navigation Elements
description: Use these procedures to create, edit, activate or deactivate a child node, view and manage a navigation tree and create the new navigation in the Back Office.
last_updated: May 19, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v1/docs/managing-navigation
originalArticleId: 9e8203a1-3383-45e8-b115-33320686bd0f
redirect_from:
  - /v1/docs/managing-navigation
  - /v1/docs/en/managing-navigation
related:
  - title: Navigation Module
    link: docs/scos/dev/feature-walkthroughs/page.version/navigation-feature-walkthrough/navigation-module.html
---

This topic describes the procedures that you need to perform to manage navigation elements and navigation nodes.
***
To start managing navigation elements and nodes, navigate to the **Navigation** section.
***
## Creating a New Navigation Element
To create a navigation element:
1. Click **Create Navigation** in the top right corner of the **Overview of Navigation Elements** page.
2. On the **Create Navigation Elements** page, specify the following:
    * **Name** - give your navigation tree a name.
    * **Key** - specify the navigation key. The key is used to reference the navigation from Yves.
3. Select the **Active** checkbox if you want to make the navigation item active, or leave it unchecked if you want to have it inactive. If a navigation item is inactive, this element and all its nodes will not be visible in the online store.
4. Click **Save**.
***
The Navigation list displays all the elements in your system. Here you can see if they are active or not, modify, activate or deactivate, as well as delete flow for a navigation element.

You can also search for a navigation element by starting to type its name or key in the **Search** field. As you type, the list of found navigation elements with the matching values in the **Name** and **Key** fields will be displayed in the **List of navigation elements** table.
***
## Creating a Child Node

**To create a child node to an existing navigation element:**
1. Click on the navigation element in the **List of navigation elements** table to select the element.
2. Add the relevant information in the **Create child node** section.
3. Click **Save**.
![Creating a child node](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Managing+Navigation/create-child-node.gif)

After saving your node, the view will be updated and instead of the **Create child** node frame you should now be able to see the **Update node** frame. The newly added node now should appear in your navigation tree.
***
**To create a child node to another node:**
1. Click on the navigation element in the **List of navigation elements** table to select the element.
2. Click on the node under the navigation element in the **Navigation tree** section.
3. In the **Create child node** section, click **Create child node**.
4.  Add the relevant information in the **Create child node** section.
5. Click **Save**.
    ![Creating a child node to another node](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Managing+Navigation/create-child-node-to-node.gif)
***
## Editing, Deleting, Deactivating/Activating a Navigation Element

To **edit, delete, deactivate or activate** a navigation element, in the **List of navigation elements** table > _Actions_ column, click one of the following depending on the action you need to perform:
1. **Activate** - to activate an element. The status is changed from _Inactive_ to _Active_.
2. **Edit** - to edit the name of the navigation element (the **Key** field is not available for modifications). Once done, click **Save**.
3. **Deactivate** - to deactivate an element. The status is changed from _Active_ to _Inactive_.
4. **Delete** - to delete a navigation element. Once selected, the element is deleted.
***
## Reordering Nodes

1. To reorder nodes, drag and drop elements in the tree.
2. To keep the changes, click **Save order**.
![Reordering nodes](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Managing+Navigation/reordering-nodes.gif)
***
**Tips and tricks**
To know more about the node types that you select, see [Navigation Node Types](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/references/navigation-reference-information.html) in the References section.
