---
title: Managing navigation elements
originalLink: https://documentation.spryker.com/v6/docs/managing-navigation-elements
redirect_from:
  - /v6/docs/managing-navigation-elements
  - /v6/docs/en/managing-navigation-elements
---

This topic describes how to manage [navigation elements](https://documentation.spryker.com/docs/navigation-feature-overview#navigation-element).

To start working with navigation elements, go to **Content** > **Navigation**.
***
## Creating a Navigation Element
To create a navigation element:

1.     On the *Overview of Navigation Elements* page, click **+Create Navigation Element**.
2.     On the *Create Navigation Element* page, enter **Name** and **Key**.
3.     Select the **Active** checkbox if you want to activate the navigation element.
4.     Click **Save**.
This takes you to the *Overview of Navigation Elements* page. You can see the message about successful navigation element creation. The created navigation element is displayed in the *List of navigation elements*. 

## Creating a Navigation Node

To create a child node for a navigation element:

1.     In the *List of navigation elements*, select the navigation element you want to create a child node for.
2.     In the *Create child node* section:
    1. Select the node **Type**. See [Navigation Node Types](https://documentation.spryker.com/docs/navigation-reference-information#navigation-node-types) to learn about the node types.
    2. Enter the required fields per each locale.
    3. Select **Valid from** and **Valid to** dates.
    4. Select the **Active** checkbox if you want to activate the child node.
4.     Click **Save**. 
You can see the message about successful navigation node creation. In the *Navigation tree*, section, the created navigation node is displayed in the navigation tree. 

 
To create a child node for another navigation node:

1.     In the *List of navigation elements*, select the navigation element you want to create a child node for.
2.     In the *Navigation tree* section, select the navigation node you want to create a child node for.
3.     In the *Edit node* section, click **Create child node**.
4.     In the *Create child node* section:
    1. Select the node **Type**. See [Navigation Node Types](https://documentation.spryker.com/docs/navigation-reference-information#navigation-node-types) to learn about the node types.
    2. Enter the required fields per each locale.
    3. Select **Valid from** and **Valid to** dates.
    4. Select the **Active** checkbox if you want to activate the child node.
5.     Click **Save**. 
You can see the message about successful navigation node creation. In the *Navigation tree*, section, the created navigation node is displayed in the navigation tree. 

    



## Editing a Navigation Node 

To edit a navigation node:

1.     In the *List of navigation elements*, select the navigation element owning the navigation node you want to edit.
2.     In the *Navigation tree* section, select the navigation node you want to edit.
3.     In the *Edit node* section: 
    1. Select the node **Type**. See [Navigation Node Types](https://documentation.spryker.com/docs/navigation-reference-information#navigation-node-types) to learn about the node types.
    2. Enter the required fields per each locale.
    3. Select **Valid from** and **Valid to** dates.
    4. Select or clear the **Active** checkbox if you want to activate or deactivate the navigation node.
4.     Click **Save**.
You can see the message about successful navigation node update.

## Deleting a Navigation Node

To delete a navigation node:

1.     In the *List of navigation elements*, select the navigation element owning the navigation node you want to delete.
2.     In the *Navigation tree* section, select the node you want to delete.
3.     In the *Edit node* section, select **Delete selected node**.
You can see the message about successful navigation node deletion. In the *Navigation tree* section, the navigation node is no longer displayed.

## Reordering Nodes

To reorder nodes:

1. In the *Navigation tree* section, drag and drop elements in the tree.
2. Click **Save order**.
You can see the message about successful navigation tree update. 

![Reordering nodes](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Managing+Navigation/reordering-nodes.gif){height="200" width="450"}



## Editing, Deactivating, and Activating a Navigation Element

To edit, activate, or deactivate a navigation element:

1. In the *List of navigation elements*, click **Edit** next to the navigation element you want to edit.
2. On the *Edit Navigation Element: {element number}* page:
    1. Edit the **Name**.
    2. Select or clear the **Active** check box to activate or deactivate the navigation element.
3. Click **Save**. 
This takes you to the *Overview of Navigation Elements* page.  You can see the message about successful navigation element update. The changes are reflected in the *List of navigation elements*.

## Deleting a Navigation Element

To delete a navigation element:

1. In the *List of navigation elements*, click **Delete** next to the navigation element you want to delete.
2. On the *Delete Navigation* page, select **Yes, delete this navigation**. 
This takes you to the *Overview of Navigation Elements* page. You can see the message about successful navigation element deletion. In the *List of navigation elements*, the navigation element is no longer displayed. 

 
## Duplicating a Navigation Element

To duplicate a navigation element:

1.     In the *List of navigation elements*, click **Duplicate** next to the navigation element you want to duplicate.
2.     On the *Duplicate Navigation Element* page, enter **Name** and **Key**. 
3.     Click **Save**.
This takes you to the *Overview of Navigation Elements* page. You can see the message about successful navigation element duplication. The duplicated element is displayed in the *List of navigation elements*.


**Tips & Tricks**

* Filter the navigation elements in the *List of navigation elements* by entering a name or a key in the search bar above the table. 
* In the *Navigation tree* section, filter the navigation nodes by entering a navigation node name in the search.

**What's next?** 
* To know more about the attributes used to manage navigation elements, see [Navigation: Reference Information](https://documentation.spryker.com/docs/navigation-reference-information).
* For visual instructions on Navigation configuration, check the video:
<iframe src="https://spryker.wistia.com/medias/2iepfhl6fu" title="How to configure Navigation" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>
