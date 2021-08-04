---
title: Navigation feature overview
originalLink: https://documentation.spryker.com/2021080/docs/navigation-feature-overview
redirect_from:
  - /2021080/docs/navigation-feature-overview
  - /2021080/docs/en/navigation-feature-overview
---

The *Navigation* feature enables product catalog managers to create intuitive navigation elements and display them on the Storefront.

They can create different types of navigation for different places of the shop. For example, create a fully-fledged navigation tree for main website navigation, several simple navigation lists for the footer, and any number of custom navigation elements for CMS pages.

## Navigation element
A *navigation element* is a page section that contains links to shop resources, as well as external resources. 

![navigation-element](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/navigation+element.png){height="" width=""}

See [Creating a Navigation Element](https://documentation.spryker.com/docs/managing-navigation-elements#creating-a-navigation-element) to learn how a Back Office user can create a navigation element.


### Navigation element duplication
If you have a configured navigation element in a shop and you want to use it as a basis for another navigation element, you can duplicate it. This is especially useful in a multi-shop scenario. 
See [Duplicating a Navigation Element](https://documentation.spryker.com/docs/managing-navigation-elements#duplicating-a-navigation-element) to learn how a Back Office user can do that. 


## Navigation tree 


A *navigation tree* is a navigation element consisting of [navigation nodes](#navigation-node) structured hierarchically as an expandable tree.
In the Back Office, navigation elements are displayed as navigation trees. 

![navigation-tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/navigation-tree.png){height="" width=""}



However, when publishing a navigation element as a content item on the Storefront, you can select a different [navigation template](#navigation-content-item-templates)



## Navigation node

A *navigation node* is a single item in a navigation element. 

The following node types are available by default:
* Label: a piece of text.
* Category: links to category pages.
* CMS Page: links to CMS pages.
* Link: links to internal pages like login, registration, and so on.
* External URL: links to external URLs.  
In the context of a navigation tree, there can be *child nodes* and *parent nodes*. A child node is a navigation node that is added to another navigation node. A parent node is a navigation node that has one or more assigned child nodes.


![parent-child-navigation-node](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/parent-child-navigation-node.png){height="" width=""}


A navigation node can be both of the parent type and the child type. For example, the parent navigation node *Writing Materials* from the previous screenshot can be represented as a child node as follows.





![child-parent-navigation-node](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/child-parent-navigation-node.png){height="" width=""}



See [Creating a Navigation Node](https://documentation.spryker.com/docs/managing-navigation-elements#creating-a-navigation-node) to learn how a Back Office user can create navigation nodes. 


### Navigation node design
You can define the design for each navigation node separately by entering a Custom CSS class in the Back Office.
The only class you can use by default is *label*. This class capitalizes the navigation node name.

![label-navigation-node-design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/label-navigation-node-design.png){height="" width=""}


A front-end developer can create more classes for navigation nodes.

See [Creating a Navigation Node](https://documentation.spryker.com/docs/managing-navigation-elements#creating-a-navigation-node) to learn how a Back office user can define a navigation node design. 

## Navigation node validity period
You can define the time period a navigation node is valid for:
* When the validity period ends, the navigation node with its child stops being displayed on the Storefront. 
* When the validity period starts, the navigation node with its child starts being displayed on the Storefront. 
See [Creating a Navigation Node](https://documentation.spryker.com/docs/managing-navigation-elements#creating-a-navigation-node) to learn how a product catalog manager can define a navigation node validity period. 

## Navigation as content item
To publish a navigation element on the Storefront, you can add it to [CMS Blocks](https://documentation.spryker.com/docs/cms-block) and [CMS Pages](https://documentation.spryker.com/docs/cms-page) as a [content item](https://documentation.spryker.com/docs/content-items-feature-overview). 
The schema shows how the Navigation feature affects content management in a Spryker shop:

![navigation-as-content-item-schema](https://confluence-connect.gliffy.net/embed/image/a086fe4e-1d09-49ae-a181-ebd8b0f8c051.png?utm_medium=live&utm_source=custom){height="" width=""}

See [Create a Navigation Content Item](https://documentation.spryker.com/docs/creating-content-items#create-a-navigation-content-item) to learn how a Back Office user can create a Navigation content item. 
See [Adding Content to Storefront Pages Using Templates & Slots](https://documentation.spryker.com/docs/adding-content-to-storefront-pages-using-templates-slots#adding-content-to-storefront-pages-using-templates---slots) to learn how a marketing content manager can add content to the Storefront. 

### Navigation content item templates
A content item template defines how a content item is displayed on the Storefront. The following templates are shipped for the Navigation content item by default:

* *Tree structure after the first level* - the first level of navigation nodes is displayed in a horizontal line. Hovering over an element opens a menu showing all the child nodes as a list.
* *Inline navigation* - the first level of navigation nodes is displayed as a list. Child nodes are not displayed.
* *List navigation* - the first level of navigation nodes is displayed as a list. Child nodes are not displayed.
* *Tree structure* - all the levels of navigation nodes are displayed as a list.


<details open>
    <summary>"Tree structure after the first level" template representation - Storefront</summary>
    
![tree-structure-after-the-first-level](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/tree-structure-after-the-first-level.png){height="" width=""}

</details>

<details open>
    <summary>"Inline navigation" template representation - Storefront</summary>

![inline-navigation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/inline-navigation.png){height="" width=""}
    
</details>

<details open>
    <summary>"List navigation" template representation - Storefront</summary>
    
![list-navigation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/list-navigation.png){height="" width=""}
    
</details>

<details open>
    <summary>"Tree structure" template representation - Storefront</summary>
    
![tree-structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation/Navigation+Feature+Overview/tree-structure.png){height="" width=""}
    
</details>



For more details on navigation, check the video:
<iframe src="https://spryker.wistia.com/medias/anlwttuexm" title="Navigation" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="720" height="480"></iframe>





## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
          <li><a href="https://documentation.spryker.com/docs/file-details-navigationcsv" class="mr-link">Import navigation elements</a></li>
          <li><a href="https://documentation.spryker.com/docs/file-details-navigation-nodecsv" class="mr-link">Import navigation nodes</a></li>
          <li><a href="https://documentation.spryker.com/docs/retrieving-navigation-trees" class="mr-link">Retrieve navigation trees via Glue API</a></li>
          <li><a href="https://documentation.spryker.com/docs/glue-api-navigation-feature-integration" class="mr-link">Integrate the Navigation Glue API</a></li>
               <li>Integrate the Navigation feature:</li>
                <li><a href="https://documentation.spryker.com/docs/navigation-feature-integration" class="mr-link">Integrate the Navigation feature</a></li>
                    <li><a href="https://documentation.spryker.com/docs/cms-feature-integration-guide" class="mr-link">Integrate the CMS feature</a></li>
                 </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-navigation-elements" class="mr-link">Manage navigation elements</a></li>
            </ul>
       
</div>



