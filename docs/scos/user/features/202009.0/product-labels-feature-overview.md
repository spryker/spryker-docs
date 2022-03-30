---
title: Product Labels feature overview
last_updated: Oct 26, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/product-labels-feature-overview
originalArticleId: c1a49155-d94a-4fd4-8678-51faf9929cfe
redirect_from:
- /v6/docs/product-labels-feature-overview
- /v6/docs/en/product-labels-feature-overview
- /v6/docs/product-label
- /v6/docs/en/product-label
---

The Product Label feature enables product catalog managers to highlight the desired products by adding a special type of information - product labels.


## Product label

A *product label* is a sales-related piece of information conveying a message about the product to a buyer.

The product labels are applied to products to be displayed on their product cards and product details pages.

<details open>

<summary markdown='span'>Product label on a product card—Storefront</summary>

![product label on product card](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/product-label-on-product-card.png)

</details>

 <details open>
<summary markdown='span'>Product label on a product details page - Storefront</summary>

![product label on product details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/product-label-on-product-details-page.png)

</details>

A Back Office user can [create product labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/creating-product-labels.html) and assign them to products in the Back Office.

A developer can create [dynamic product labels](#dynamic-product-label).


## Dynamic product label
*Dynamic product label* is a product label that follows the condition rules defined on a code level. Unlike the regular product label, the dynamic product label is automatically applied to the product that fulfils the condition rules. A developer can edit the rules or create new dynamic product lablels.

The following dynamic product labels are shipped by default:
* *Discontinued*
The *Discontinued* product label is added when you discontinue a product. The label is active until the product becomes inactive. See [Discontinuing a product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/discontinuing-products.html) to learn more.

* *Alternatives available*
The *Alternatives available* product label goes along with the *Discontinued* product label. It is added when you discontinue a product that has existing [alternative products](/docs/scos/user/features/{{page.version}}/alternative-products-feature-overview.html). The label is active until the product becomes inactive. See [Adding product alternatives](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/adding-product-alternatives.html) to learn more.

* *NEW*
The *NEW* label is added when you create a product. It is active for the time period defined inclusively in the **New from** and **New to** fields. See [Creating an Abstract Product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) to learn more.
* *SALE*
The *SALE* product label is added to a product automatically when the product’s original price is superior to the default price. See [Creating an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) to learn more.

{% info_block infoBox "Prices" %}

A default price shows the current value of the product on Storefront.

An original price is displayed as a strikethrough to identify that the value of the product has been decreased as if there is a promotion.

{% endinfo_block %}


## Product label design
A Back Office user can select the design and the position of the product label on a product card. The following label designs are shipped by default:

 <details open>
<summary markdown='span'>alternative</summary>

![alternative product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/alternatives-available-product-label-design.png)

</details>


 <details open>
<summary markdown='span'>discontinued</summary>

![discontinued product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/discontinued-product-label-design.png)

</details>


 <details open>
<summary markdown='span'>top</summary>

![top product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/top-product-label-design.png)

</details>



 <details open>
<summary markdown='span'>new</summary>

![new product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/new-product-label-design.png)

</details>

 <details open>
<summary markdown='span'>sale</summary>

![sale product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/sale-product-label-design.png)

</details>

When creating a product label, a Back Office user selects a design by entering its name as a **Front-end Reference**. See [Creating product labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/creating-product-labels.html) to learn more.

If the product label designs shipped by default are not sufficient for your project, a developer can create new HTML classes to use as a Front-end Reference.


## Product label priority

When several product labels are applied to a product, all of them are displayed on its product card and product details page.

![product label priority ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/alternatives-available-product-label-design.png)


A Back Office user can define the order in which product labels are displayed on product card and product details page by entering a **Priority** value when creating a product label.

The product labels are displayed in ascending order of Priority. So, the label with the smallest priority value always goes first while the product label with highest Priority value goes last.

In the picture above, the priority value of *Alternatives available* product label is *4*. The Priority value of *Discontinued* product label is *5*.

See [Creating product labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/creating-product-labels.html) to learn how a Back Office user can define the product label priority.

## Product label store relations

A Back Office user can define the stores each product label is displayed in. For example, if a promotion campaign targets Germany, the *Sale* product label can be displayed only in the *DE* store.

See [Creating product labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/creating-product-labels.html) to learn how a Back Office user can define store relation for a product label.

A developer can also [import store relations for product labels](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-label-store.csv.html).

## Product label statuses

A product label can have the following statuses:

* Active
* Inactive

If a product label is active, it is displayed on all the product pages it is applied to. If a product label is inactive, it is still applied to the selected product, but it is not displayed on the respective product pages. This might be useful when you want to prepare for an event beforehand. You can create an inactive product label and apply it to the desired products. When the event starts, you just need to activate the label to show it on all the product pages it is applied to.

See [Activating/deactivating a product label](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/managing-product-labels.html#editing-product-labels) to learn how a Back Office user can activate and deactivate product labels in the Back Office.

## Product label exclusivity

*Exclusive* product label is a product label that, when applied to a product, discards all the other product labels applied to it. The other product labels are still applied to the product, but only the exclusive one is displayed on the respective product card and product details page. This might be useful when running several discounts in a store at the same time. By assigning the labels with corresponding discount names to desired products, you can show the shop users to which products each discount is applied.

See [Creating product labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/creating-product-labels.html) to learn how a Back Office user can create an exclusive product label.

## Product label filtering on the Storefront

Shop users can view product cards with labels on any Storefront page. Also, they can filter products by labels on category and search results pages.

![Filter product labels](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/filter-labels-yves.png)

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Create product labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/creating-product-labels.html)  |
| [Manage product labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/managing-product-labels.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Product Labels feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-labels-feature-walkthrough.html) for developers.

{% endinfo_block %}
