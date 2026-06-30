---
title: Navigation feature overview
description: Build and manage an intuitive navigation for your customers to find products within your Spryker shop.
last_updated: Jul 23, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/navigation-feature-overview
originalArticleId: 6d0a1210-9c3e-44b2-b6c9-aa0cf7780cba
redirect_from:
  - /docs/scos/user/features/202005.0/navigation-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/201907.0/navigation-feature-walkthrough/navigation-module.html
  - /docs/scos/user/features/202200.0/navigation-feature-overview.html
  - /docs/scos/user/features/202311.0/navigation-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202200.0/navigation-feature-walkthrough/navigation-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/navigation-feature-walkthrough/navigation-feature-walkthrough.html
  - /docs/pbc/all/content-management-system/202311.0/navigation-feature-overview.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/navigation-feature-overview.html

---

The *Navigation* feature lets product catalog managers create intuitive navigation elements and display them on the Storefront. Product catalog managers can create different types of navigation for different places of the shop. For example, they can add a fully-fledged navigation tree for main website navigation, several simple navigation lists for the footer, and any number of custom navigation elements for CMS pages.

## Navigation element

A *navigation element* is a page section that contains links to shop resources, as well as external resources.

![navigation-element](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/navigation+element.png)

To learn how a Back Office user can create a navigation element, see [Creating a navigation element](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/create-navigation-elements.html).

### Navigation element duplication

If you have a configured navigation element in a shop and want to use it as a basis for another navigation element, you can duplicate it. This is especially useful in a multi-shop scenario.
To learn how a Back Office user can do that, see [Duplicating a navigation element](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/duplicate-navigation-elements.html).

## Navigation tree

A *navigation tree* is a navigation element consisting of [navigation nodes](#navigation-node) structured hierarchically as an expandable tree.
In the Back Office, navigation elements are displayed as navigation trees.

![navigation-tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/navigation-tree.png)

However, when publishing a navigation element as a content item on the Storefront, you can select a different [navigation template](#navigation-content-item-templates).

## Navigation node

A *navigation node* is a single item in a navigation element.

The following node types are available by default:
- Label: a piece of text.
- Category: links to category pages.
- CMS Page: links to CMS pages.
- Link: links to internal pages like login or registration.
- External URL: links to external URLs.
In the context of a navigation tree, there can be *child nodes* and *parent nodes*. A child node is a navigation node that is added to another navigation node. A parent node is a navigation node with one or more assigned child nodes.


![parent-child-navigation-node](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/parent-child-navigation-node.png)


A navigation node can be both the parent and child type. For example, the parent navigation node *Writing Materials* from the previous screenshot can be represented as a child node as follows.

![child-parent-navigation-node](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/child-parent-navigation-node.png)

To learn how a Back Office user can create navigation node, see [Creating a Navigation Node](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/create-navigation-nodes.html).

### Navigation node design

You can define the design for each navigation node separately by entering a Custom CSS class in the Back Office.
The only class you can use by default is *label*. This class capitalizes the navigation node name.

![label-navigation-node-design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/label-navigation-node-design.png)


A frontend developer can create more classes for navigation nodes.

To learn how a Back office user can define a navigation node design, see [Creating a navigation node](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/create-navigation-nodes.html).

## Navigation node validity period

You can define the time period a navigation node is valid for:
- When the validity period ends, the navigation node with its child stops being displayed on the Storefront.
- When the validity period starts, the navigation node with its child is displayed on the Storefront.

To learn how a product catalog manager can define a navigation node validity period, see [Creating a Navigation Node](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/create-navigation-nodes.html).

## Navigation as content item

To publish a navigation element on the Storefront, you can add it to [CMS Blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html) and [CMS Pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-pages-overview.html) as a [content item](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html).
The schema shows how the Navigation feature affects content management in a Spryker shop:

![navigation-as-content-item-schema](https://confluence-connect.gliffy.net/embed/image/a086fe4e-1d09-49ae-a181-ebd8b0f8c051.png?utm_medium=live&utm_source=custom)

To learn how a Back Office user can create a Navigation content item, see [Create a Navigation Content Item](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/create-navigation-content-items.html).
To learn how a marketing content manager can add content to the Storefront, see [Adding Content to Storefront Pages Using Templates & Slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-add-content-to-the-storefront-pages-using-templates-and-slots.html).

### Navigation content item templates

A content item template defines how a content item is displayed on the Storefront. The following templates are shipped for the Navigation content item by default:

- *Tree structure after the first level*—the first level of navigation nodes is displayed in a horizontal line. Holding the pointer over an element opens a menu, showing all the child nodes as a list.
- *Inline navigation*—the first level of navigation nodes is displayed as a list. Child nodes are not displayed.
- *List navigation*—the first level of navigation nodes is displayed as a list. Child nodes are not displayed.
- *Tree structure*—all the levels of navigation nodes are displayed as a list.


<details><summary>"Tree structure after the first level" template representation*—Storefront</summary>

![tree-structure-after-the-first-level](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/tree-structure-after-the-first-level.png)

</details>

<details><summary>"Inline navigation" template representation*—Storefront</summary>

![inline-navigation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/inline-navigation.png)

</details>

<details><summary>"List navigation" template representation*—Storefront</summary>

![list-navigation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/list-navigation.png)

</details>

<details><summary>"Tree structure" template representation*—Storefront</summary>

![tree-structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/tree-structure.png)

</details>

For more details about navigation, check the video:

{% wistia anlwttuexm 720 480 %}

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create navigation elements](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/create-navigation-elements.html) |
| [Create navigation nodes](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/create-navigation-nodes.html) |
| [Duplicate navigation elements](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/duplicate-navigation-elements.html) |
| [Edit navigation elements](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/edit-navigation-elements.html) |
| [Edit navigation nodes](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/edit-navigation-nodes.html) |
| [Delete navigation nodes](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/delete-navigation-nodes.html) |

## Related Developer documents

| INSTALLATION GUIDES | GLUE API GUIDES | DATA IMPORT | REFERENCES |
|---|---|---|---|
| [Install the Navigation feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-navigation-feature.html) | [Retrieve navigation trees](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-navigation-trees.html) | [File details: navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html) | [Navigation module: Reference information](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/extend-and-customize/navigation-module-reference-information.html) |
| [Glue API: Navigation feature integration](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-navigation-feature.html) |  | [File details: navigation_node.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation-node.csv.html) | |
| [Install the CMS feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cms-feature.html) |  |  |  |
