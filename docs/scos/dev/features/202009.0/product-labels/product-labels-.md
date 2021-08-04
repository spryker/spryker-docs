---
title: Product Labels feature overview
originalLink: https://documentation.spryker.com/v6/docs/product-labels-feature-overview
redirect_from:
  - /v6/docs/product-labels-feature-overview
  - /v6/docs/en/product-labels-feature-overview
---

The Product Label feature enables product catalog managers to highlight the desired products by adding a special type of information - product labels. 


## Product Label
*Product label* is a sales-related piece of information conveying a message about the product to a buyer. 

The product labels are applied to products to be displayed on their product cards and product details pages.

<details open>
<summary>Product label on a product card - Storefront</summary>
    

![product label on product card](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/product-label-on-product-card.png){height="" width=""}
 

</details>

 <details open>
<summary>Product label on a product details page - Storefront</summary>
    

![product label on product details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/product-label-on-product-details-page.png){height="" width=""}
     
     
     
</details>



A Back Office user can [create product labels](https://documentation.spryker.com/docs/creating-product-labels) and assign them to products in the Back Office. 

A developer can create [dynamic product labels](#dynamic-product-label).


## Dynamic Product Label
*Dynamic product label* is a product label that follows the condition rules defined on a code level. Unlike the regular product label, the dynamic product label is automatically applied to the product that fulfils the condition rules. A developer can edit the rules or create new dynamic product lablels. 

The following dynamic product labels are shipped by default:
* *Discontinued* 
The *Discontinued* product label is added when you discontinue a product. The label is active until the product becomes inactive. See [Discontinuing a Product](https://documentation.spryker.com/docs/discontinuing-a-product) to learn more.

* *Alternatives available*
The *Alternatives available* product label goes along with the *Discontinued* product label. It is added when you discontinue a product that has existing [alternative products](https://documentation.spryker.com/docs/alternative-products-overview). The label is active until the product becomes inactive. See [Adding Product Alternatives](https://documentation.spryker.com/docs/adding-product-alternatives) to learn more.

* *NEW*
The *NEW* label is added when you create a product. It is active for the time period defined inclusively in the **New from** and **New to** fields. See [Creating an Abstract Product](https://documentation.spryker.com/docs/creating-an-abstract-product) to learn more. 
* *SALE* 
The *SALE* product label is added to a product automatically when the product’s original price is superior to the default price. See [Creating an Abstract Product](https://documentation.spryker.com/docs/creating-an-abstract-product) to learn more. 

{% info_block infoBox "Prices" %}

A default price shows the current value of the product on Storefront.

An original price is displayed as a strikethrough to identify that the value of the product has been decreased as if there is a promotion.

{% endinfo_block %}


## Product Label Design
A Back Office user can select the design and the position of the product label on a product card. The following label designs are shipped by default:

 <details open>
<summary>alternative</summary>
     
![alternative product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/alternatives-available-product-label-design.png){height="" width=""} 
     
</details>


 <details open>
<summary>discontinued</summary>
     
![discontinued product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/discontinued-product-label-design.png){height="" width=""}
     
</details>


 <details open>
<summary>top</summary>
     
![top product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/top-product-label-design.png){height="" width=""}
     
</details>



 <details open>
<summary>new</summary>
     
![new product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/new-product-label-design.png){height="" width=""}
     
</details>

 <details open>
<summary>sale</summary>
     
![sale product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/sale-product-label-design.png){height="" width=""}
     
</details>


When creating a product label, a Back Office user selects a design by entering its name as a **Front-end Reference**. See [Creating a Product Label](https://documentation.spryker.com/docs/creating-product-labels) to learn more.

If the product label designs shipped by default are not sufficient for your project, a developer can create new HTML classes to use as a Front-end Reference.


## Product Label Priority
When several product labels are applied to a product, all of them are displayed on its product card and product details page. 

![product label priority ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/alternatives-available-product-label-design.png){height="" width=""}


A Back Office user can define the order in which product labels are displayed on product card and product details page by entering a **Priority** value when creating a product label. 

The product labels are displayed in ascending order of Priority. So, the label with the smallest priority value always goes first while the product label with highest Priority value goes last.

In the picture above, the priority value of *Alternatives available* product label is *4*. The Priority value of *Discontinued* product label is *5*.

See [Creating a Product Label](https://documentation.spryker.com/docs/creating-product-labels) to learn how a Back Office user can define the product label priority.

 


## Product Label Store Relation

A Back Office user can define the stores each product label is displayed in. For example, if a promotion campaign targets Germany, the *Sale* product label can be displayed only in the *DE* store.

See [Creating a Product Label](https://documentation.spryker.com/docs/creating-product-labels) to learn how a Back Office user can define store relation for a product label.

A developer can also [import store relations for product labels](https://documentation.spryker.com/docs/file-details-product-label-storecsv).


## Product Label Statuses
A product label can have the following statuses:
 
* Active
* Inactive

If a product label is active, it is displayed on all the product pages it is applied to. If a product label is inactive, it is still applied to the selected product, but it is not displayed on the respective product pages. This might be useful when you want to prepare for an event beforehand. You can create an inactive product label and apply it to the desired products. When the event starts, you just need to activate the label to show it on all the product pages it is applied to.

See [Activating/Deactivating a Product Label](https://documentation.spryker.com/docs/managing-product-labels#activating-deactivating-a-product-label) to learn how a Back Office user can activate and deactivate product labels in the Back Office.


## Product Label Exclusivity
*Exclusive* product label is a product label that, when applied to a product, discards all the other product labels applied to it. The other product labels are still applied to the product, but only the exclusive one is displayed on the respective product card and product details page. This might be useful when running several discounts in a store at the same time. By assigning the labels with corresponding discount names to desired products, you can show the shop users to which products each discount is applied.

See [Creating a Product Label](https://documentation.spryker.com/docs/creating-product-labels) to learn how a Back Office user can create an exclusive product label.

 


## Product Label Filtering on the Storefront
Shop users can view product cards with labels on any Storefront page. Also, they can filter products by labels on category and search results pages.

![Filter product labels](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/filter-labels-yves.png){height="" width=""}

