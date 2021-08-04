---
title: Managing navigation elements
originalLink: https://documentation.spryker.com/2021080/docs/managing-navigation-elements
redirect_from:
  - /2021080/docs/managing-navigation-elements
  - /2021080/docs/en/managing-navigation-elements
---

This topic describes how to manage [navigation elements](https://documentation.spryker.com/2021080/docs/navigation-feature-overview#navigation-element).

## Prerequisites

To start working with navigation elements, go to **Content** > **Navigation**.

Each section contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

## Creating a navigation element

To create a navigation element:

1. On the *Overview of Navigation Elements* page, click **+Create Navigation Element**.
2. On the *Create Navigation Element* page, enter **Name** and **Key**.
3. Select the **Active** checkbox if you want to activate the navigation element.
4. Click **Save**.
This takes you to the *Overview of Navigation Elements* page. You can see the message about the successful creation of the navigation element. The created navigation element is displayed in *List of navigation elements*.

### Reference information: Creating a navigation element

On the *Overview of Navigation Elements* page, you see the following:
* Navigation elements: the number, name, key, and status.
* Actions that you can do to a navigation element.
* Navigation tree displaying all the navigation nodes of a selected navigation element.


| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Type | Type of the navigation node. For all the types, see [Navigation node types](#navigation-node-types). |
| Title | Name of the navigation node. It is displayed on the Storefront. |
| Custom CSS class | CSS class defining the design of the navigation node. Usually, a front-end developer creates them. |
| Valid from and Valid to | Navigation node is displayed on the Storefront between the dates defined in these fields, inclusively. |
| Active | Checkbox to define if the navigation node is active. Inactive navigation nodes and their sub-nodes are not displayed on the Storefront.  |

The following table describes attributes on the *Create Navigation Element* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of the navigation element. It will be displayed on the Storefront. |
| Key | Unique identifier that will be used to reference the navigation element on the Storefront. |
| Active | Checkbox to define if the navigation element will be active. Inactive navigation elements and their child nodes are not displayed on Storefront.  |

## Creating a navigation node

To create a child node for a navigation element:

1. In the *List of navigation elements*, select the navigation element you want to create a child node for.
2. In the *Create child node* section:
    1. Select the node **Type**. To learn about the node types, see [Navigation node types](#navigation-node-types). 
    2. Enter the required fields per each locale.
    3. Select **Valid from** and **Valid to** dates.
    4. Select the **Active** checkbox if you want to activate the child node.
4.     Click **Save**. 
You can see the message about the successful navigation node creation. In the *Navigation tree* section, the created navigation node is displayed in the navigation tree. 

 
To create a child node for another navigation node:

1.     In *List of navigation elements*, select the navigation element you want to create a child node for.
2.     In the *Navigation tree* section, select the navigation node you want to create a child node for.
3.     In the *Edit node* section, click **Create child node**.
4.     In the *Create child node* section:
    1. Select the node **Type**.  To learn about the node types, see [Navigation node types](#navigation-node-types).
    2. Enter the required fields per each locale.
    3. Select **Valid from** and **Valid to** dates.
    4. Select the **Active** checkbox if you want to activate the child node.
5.     Click **Save**. 
You can see the message about the successful navigation node creation. In the *Navigation tree* section, the created navigation node is displayed in the navigation tree. 

### Reference information: Creating a navigation node

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Type | Type of the navigation node. For all the types, see [Navigation node types](#navigation-node-types). |
| Title | Name of the navigation node. It will be displayed on the Storefront. |
| Custom CSS class | CSS class defining the design of the navigation node. Usually, a front-end developer creates them. |
| Valid from and Valid to | Navigation node will be displayed on the Storefront between the dates defined in these fields, inclusively. |
| Active | Checkbox to define if the navigation node will be active. Inactive navigation nodes and their sub-nodes are not displayed on the Storefront.  |

#### <a name="navigation-node-types"></a>Navigation node types

You can create the following node types:

| NODE TYPE | DESCRIPTION |
| --- | --- |
|Label</br>![Label](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/label.png)   | Labels do not link to any specific URL; they are used for grouping other items accessed from the menu.|
| Category</br>![Category](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/category.png) | Category is used to link an existing category you have to the navigation node. A category must exist in the Category section. |
|CMS Page</br>![CMS page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/cms-page.png)| CMS page can be assigned to a node. A CMS page must exist in the **Content** > **Pages** section.|
| External URL</br>![External URL](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/external-url.png) |External URL is a link that is typically opened in a new tab. |
|Link</br>![Link](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Navigation+Node+Types/link.png)   | Link to internal pages, i.e., login, registration, etc. |
Depending on the type of the node, there is various node related information that can be managed:
* Localized title (**all types of nodes**): This is the name of the node exactly how it will be displayed in the store (for example, if you link a category to your node, the node name can be even different from the name of the category).
* Localized custom CSS class (**all types of nodes**): If the class is defined in the shop, then a correct class reference will define the look and feel of the node. This is also localized, which means that for different locales, you can have different appearances for the same node.
* Active/not active (**all types of nodes**): If necessary, you can also completely deactivate a node. This will also make the node and the nodes below it invisible in your shop for as long as it’s inactive.
* Localized category URL (**only for “Category” type**): When you are assigning a category to the node, you can search by the category name to select the correct category URL you want to assign. Keep in mind that this also is localized information, so for multiple locales, you will need to make sure that you select the same category for all locales. If your category has multiple parents in the category tree, the same category can have different URLs. In this case, you will need to pick one of those URLs.
* Localized CMS page URL (**only for “CMS” type**): When you are assigning a CMS page to the node, you can search by the CMS page name to select the correct CMS page URL you want to assign. Keep in mind that this is also localized information, so for multiple locales, you will need to make sure that you select the same CMS page for all locales.
* Link (**only for “Link” type**): This is the relative path of your internal link. For example, if you would like to link a login page that is under “/login”, then this is exactly what you will use as an input for the Link field.
* External URL (**only for “External URL” type**): If you would like to link an external URL to your nodes, you will use this field to define the absolute URL. This could be used, for example, to link your corporate website page in your shop. Unlike internal links, the URL of the external link should be absolute, which means it needs to include the protocol as well as domain, e.g., https://mydomain.com/page

## Editing a navigation node 

To edit a navigation node:

1.     In *List of navigation elements*, select the navigation element owning the navigation node you want to edit.
2.     In the *Navigation tree* section, select the navigation node you want to edit.
3.     In the *Edit node* section: 
    1. Select the node **Type**. To learn about the node types, see [Navigation node types](#navigation-node-types). 
    2. Enter the required fields per each locale.
    3. Select **Valid from** and **Valid to** dates.
    4. Select or clear the **Active** checkbox if you want to activate or deactivate the navigation node.
4.     Click **Save**.
You can see the message about the successful navigation node update.

### Reference information: Editing a navigation node 

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| **Type** | Type of the navigation node. For all the types, see [Navigation node types](#navigation-node-types). |
| **Title** | Name of the navigation node. It is displayed on the Storefront. |
| **Custom CSS class** | CSS class defining the design of the navigation node. Usually, a front-end developer creates them. |
| **Valid from** and **Valid to** | Navigation node is displayed on the Storefront between the dates defined in these fields, inclusively. |
| **Active** | Checkbox to define if the navigation node is active. Inactive navigation nodes and their sub-nodes are not displayed on the Storefront.  |

## Deleting a navigation node

To delete a navigation node:

1.     In *List of navigation elements*, select the navigation element owning the navigation node you want to delete.
2.     In the *Navigation tree* section, select the node you want to delete.
3.     In the *Edit node* section, select **Delete selected node**.
You can see the message about the successful navigation node deletion. In the *Navigation tree* section, the navigation node is no longer displayed.

## Reordering nodes

To reorder nodes:

1. In the *Navigation tree* section, drag and drop elements in the tree.
2. Click **Save order**.
You can see the message about the successful navigation tree update. 

![Reordering nodes](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Navigation/Managing+Navigation/reordering-nodes.gif)

## Editing, deactivating, and activating a navigation element

To edit, activate, or deactivate a navigation element:

1. In the *List of navigation elements*, click **Edit** next to the navigation element you want to edit.
2. On the *Edit Navigation Element: [Element Number]* page:
    1. Edit the **Name**.
    2. Select or clear the **Active** checkbox to activate or deactivate the navigation element.
3. Click **Save**. 
This takes you to the *Overview of Navigation Elements* page.  You can see the message about the successful navigation element update. The changes are reflected in the *List of navigation elements*.

### Reference information: Editing, deactivating, and activating a navigation element

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of the navigation element. It is displayed on the Storefront. |
| Key | Unique identifier of the navigation element used to reference it on the Storefront. |
| Active | Checkbox to define if the navigation element is active. Inactive navigation elements and their child nodes are not displayed on Storefront.  |

## Deleting a navigation element

To delete a navigation element:

1. In the *List of navigation elements*, click **Delete** next to the navigation element you want to delete.
2. On the *Delete Navigation* page, select **Yes, delete this navigation**. 
This takes you to the *Overview of Navigation Elements* page. You can see the message about the successful navigation element deletion. In the *List of navigation elements*, the navigation element is no longer displayed. 

## Duplicating a navigation element

To duplicate a navigation element:

1.     In the *List of navigation elements*, click **Duplicate** next to the navigation element you want to duplicate.
2.     On the *Duplicate Navigation Element* page, enter **Name** and **Key**. 
3.     Click **Save**.
This takes you to the *Overview of Navigation Elements* page. You can see the message about the successful navigation element duplication. The duplicated element is displayed in the *List of navigation elements*.

**Tips & tricks**

* Filter the navigation elements in the *List of navigation elements* by entering a name or a key in the search bar above the table. 
* In the *Navigation tree* section, filter the navigation nodes by entering a navigation node name in the search.

---

**What's next?** 

* For visual instructions on Navigation configuration, check the video:
<iframe src="https://spryker.wistia.com/medias/2iepfhl6fu" title="How to configure Navigation" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>
