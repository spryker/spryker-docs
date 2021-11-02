---
title: Navigation Feature Overview
description: Build and manage an intuitive navigation for your Spryker shop.
last_updated: Sep 14, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/navigation-feature-overview
originalArticleId: dabe92b6-d8dc-42b0-8e3c-146d26c851bc
redirect_from:
  - /v5/docs/navigation-feature-overview
  - /v5/docs/en/navigation-feature-overview
  - /v5/docs/navigation-feature-summary
  - /v5/docs/en/navigation-feature-summary
  - /v5/docs/navigation
  - /v5/docs/en/navigation
---

The *Navigation* feature enables product catalog managers to create intuitive navigation elements and display them on the Storefront.

## Navigation Element
A *navigation element* is a page section that contains links to shop resources, as well as external resources. 

![navigation-element](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/navigation+element.png) 

See [Creating a Navigation Element](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/managing-navigation-elements.html#creating-a-navigation-element) to learn how a Back Office user can create a navigation element.


### Navigation Element Duplication
If you have a configured navigation element in a shop and you want to use it as a basis for another navigation element, you can duplicate it. This is especially useful in a multi-shop scenario. 
See [Duplicating a Navigation Element](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/managing-navigation-elements.html#duplicating-a-navigation-element) to learn how a Back Office user can do that. 


## Navigation Tree 


A *navigation tree* is a navigation element consisting of [navigation nodes](#navigation-node) structured hierarchically as an expandable tree.
In the Back Office, navigation elements are displayed as navigation trees. 

![navigation-tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/navigation-tree.png) 



However, when publishing a navigation element as a content item on the Storefront, you can select a different [navigation template](#navigation-content-item-templates)



## Navigation Node

A *navigation node* is a single item in a navigation element. 

The following node types are available by default:
* Label: a piece of text.
* Category: links to category pages.
* CMS Page: links to CMS pages.
* Link: links to internal pages like login, registration, and so on.
* External URL: links to external URLs.  
In the context of a navigation tree, there can be *child nodes* and *parent nodes*. A child node is a navigation node that is added to another navigation node. A parent node is a navigation node that has one or more assigned child nodes.


![parent-child-navigation-node](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/parent-child-navigation-node.png) 


A navigation node can be both of the parent type and the child type. For example, the parent navigation node *Writing Materials* from the previous screenshot can be represented as a child node as follows.





![child-parent-navigation-node](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/child-parent-navigation-node.png) 



See [Creating a Navigation Node](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/managing-navigation-elements.html#creating-a-navigation-node) to learn how a Back Office user can create navigation nodes. 


### Navigation Node Design
You can define the design for each navigation node separately by entering a Custom CSS class in the Back Office.
The only class you can use by default is *label*. This class capitalizes the navigation node name.

![label-navigation-node-design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/label-navigation-node-design.png) 


A front-end developer can create more classes for navigation nodes.

See [Creating a Navigation Node](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/managing-navigation-elements.html#creating-a-navigation-node) to learn how a Back office user can define a navigation node design. 

## Navigation Node Validity Period
You can define the time period a navigation node is valid for:
* When the validity period ends, the navigation node with its child stops being displayed on the Storefront. 
* When the validity period starts, the navigation node with its child starts being displayed on the Storefront. 
See [Creating a Navigation Node](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/managing-navigation-elements.html#creating-a-navigation-node) to learn how a product catalog manager can define a navigation node validity period. 

## Navigation as Content Item
To publish a navigation element on the Storefront, you can add it to [CMS Blocks](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-block.html) and [CMS Pages](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-pages-overview.html) as a [content item](/docs/scos/user/features/{{page.version}}/content-items-feature-overview.html). 
The schema shows how the Navigation feature affects content management in a Spryker shop:

![navigation-as-content-item-schema](https://confluence-connect.gliffy.net/embed/image/a086fe4e-1d09-49ae-a181-ebd8b0f8c051.png?utm_medium=live&utm_source=custom) 

See [Create a Navigation Content Item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html#create-a-navigation-content-item) to learn how a Back Office user can create a Navigation content item. 
See [Adding Content to Storefront Pages Using Templates & Slots](/docs/scos/user/back-office-user-guides/{{page.version}}/content/adding-content-to-storefront-pages-using-templates-and-slots.html#adding-content-to-storefront-pages-using-templates---slots) to learn how a marketing content manager can add content to the Storefront. 

### Navigation Content Item Templates
A content item template defines how a content item is displayed on the Storefront. The following templates are shipped for the Navigation content item by default:

* *Tree structure after the first level* - the first level of navigation nodes is displayed in a horizontal line. Hovering over an element opens a menu showing all the child nodes as a list.
* *Inline navigation* - the first level of navigation nodes is displayed as a list. Child nodes are not displayed.
* *List navigation* - the first level of navigation nodes is displayed as a list. Child nodes are not displayed.
* *Tree structure* - all the levels of navigation nodes are displayed as a list.


<details open>
    <summary markdown='span'>"Tree structure after the first level" template representation - Storefront</summary>
    
![tree-structure-after-the-first-level](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/tree-structure-after-the-first-level.png) 

</details>

<details open>
    <summary markdown='span'>"Inline navigation" template representation - Storefront</summary>

![inline-navigation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/inline-navigation.png) 
    
</details>

<details open>
    <summary markdown='span'>"List navigation" template representation - Storefront</summary>
    
![list-navigation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/list-navigation.png) 
    
</details>

<details open>
    <summary markdown='span'>"Tree structure" template representation - Storefront</summary>
    
![tree-structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/tree-structure.png) 
    
</details>



For more details on navigation, check the video:

{% wistia anlwttuexm 960 720 %}

### Database Schema
The Navigation module provides the `spy_navigation` table that stores navigation menus. They have a `name` field which is only used for backend display and they also have a `key` field used to reference the navigation menus from Yves.

Every navigation entity contains some nodes stored in the `spy_navigation_node` table. The structure of the navigation tree depends on the `fk_parent_navigation_node` and the position fields which define if a node has a parent on its level, in what `position` they are ordered. Each navigation node has attributes that can be different per displayed locale. This information is stored in the `spy_navigation_node_localized_attributes` table.

The `valid_from`, `valid_to`, and `is_active` fields allow to toggle the node's and its descendants visibility.

![Navigation database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation+Module/navigation_db_schema_2_0.png) 

