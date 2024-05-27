---
title: Product Labels feature overview
last_updated: Jul 26, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-labels-feature-overview
originalArticleId: 06d2dfdf-7ad0-41dc-98b7-5521b0c5879f
redirect_from:
  - /2021080/docs/product-labels-feature-overview
  - /2021080/docs/en/product-labels-feature-overview
  - /docs/product-labels-feature-overview
  - /docs/en/product-labels-feature-overview
  - /docs/scos/user/features/202200.0/product-labels-feature-overview.html
  - /docs/scos/user/features/202311.0/product-labels-feature-overview.html
  - /docs/product-label
  - /docs/scos/dev/feature-walkthroughs/202200.0/product-labels-feature-walkthrough.html  
  - /docs/scos/dev/feature-walkthroughs/202311.0/product-labels-feature-walkthrough.html  
  - /docs/pbc/all/product-information-management/202311.0/feature-overviews/product-labels-feature-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/product-labels-feature-overview.html
---

The _Product Label_ feature lets product catalog managers highlight the needed products by adding a special type of information—product labels.

## Product label

A *product label* is a sales-related piece of information conveying a message about the product to a buyer.

The product labels are applied to products to be displayed on their product cards and product details pages.

<details><summary markdown='span'>Product label on a product card—Storefront</summary>

![product label on product card](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/product-label-on-product-card.png)

</details>

<details><summary markdown='span'>Product label on a product details page—Storefront</summary>

![product label on product details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/product-label-on-product-details-page.png)

</details>

A Back Office user can [create product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html) and assign them to products in the Back Office.

A developer can create [dynamic product labels](#dynamic-product-label).


## Dynamic product label

*Dynamic product label* is a product label that follows the condition rules defined on a code level. Unlike the regular product label, the dynamic product label is automatically applied to the product that fulfills the condition rules. A developer can edit the rules or create new dynamic product labels.
The following dynamic product labels are shipped by default:

* *Discontinued*
<br>The *Discontinued* product label is added when you discontinue a product. The label is active until the product becomes inactive. To learn more, see [Discontinuing a product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/discontinue-products.html).
* *Alternatives available*
<br>The *Alternatives available* product label goes along with the *Discontinued* product label. It is added when you discontinue a product that has existing [alternative products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/alternative-products-feature-overview.html). The label is active until the product becomes inactive. To learn more, see [Adding product alternatives](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html).

* *NEW*
<br>The *NEW* label is added when you create a product. It is active for the time period defined inclusively in the **New from** and **New to** fields. To learn more, see [Creating an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html).

* *SALE*
<br>The *SALE* product label is added to a product automatically when the product’s original price is superior to the default price. To learn more, see [Creating an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html).

{% info_block infoBox "Prices" %}

A default price shows the current value of the product on Storefront.

An original price is displayed as a strikethrough to identify that the value of the product has been decreased as if there is a promotion.

{% endinfo_block %}

## Product label design

A Back Office user can select the design and the position of the product label on a product card. The following label designs are shipped by default:

<details>
<summary markdown='span'>Alternative</summary>

![alternative product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/alternatives-available-product-label-design.png)

</details>

<details><summary markdown='span'>Discontinued</summary>

![discontinued product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/discontinued-product-label-design.png)

</details>

<details><summary markdown='span'>Top</summary>

![top product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/top-product-label-design.png)

</details>

<details><summary markdown='span'>New</summary>

![new product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/new-product-label-design.png)

</details>

<details><summary markdown='span'>Sale</summary>

![sale product label design](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/sale-product-label-design.png)

</details>

When creating a product label, a Back Office user selects a design by entering its name as a **Front-end Reference**. To learn more, see [Creating product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html)

If the product label designs shipped by default are not sufficient for your project, a developer can create new HTML classes to use as a Front-end Reference.

## Product label priority

When several product labels are applied to a product, all of them are displayed on its product card and product details page.

![product label priority ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/alternatives-available-product-label-design.png)


A Back Office user can define the order in which product labels are displayed on the product card and product details page by entering a **Priority** value when creating a product label.

The product labels are displayed in ascending order of Priority. So, the label with the smallest priority value always goes first while the product label with the highest Priority value goes last.

In the preceding figure, the priority value of the *Alternatives available* product label is *4*. The Priority value of the *Discontinued* product label is *5*.

To learn how a Back Office user can define the product label priority, see [Creating product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html).

## Product label store relations

A Back Office user can define the stores each product label is displayed in. For example, if a promotion campaign targets Germany, the *Sale* product label can be displayed only in the *DE* store.

To learn how a Back Office user can define store relation for a product label, see [Creating product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html).

A developer can also [import store relations for product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-label-store.csv.html).

## Product label statuses

A product label can have the following statuses:
* Active
* Inactive

If a product label is active, it is displayed on all the product pages it is applied to. If a product label is inactive, it is still applied to the selected product, but it is not displayed on the respective product pages. This might be useful when you want to prepare for an event beforehand. You can create an inactive product label and apply it to the needed products. When the event starts, you just need to activate the label to show it on all the product pages it is applied to.

To learn how a Back Office user can activate and deactivate product labels in the Back Office, see [Edit product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-labels/edit-product-labels.html)

## Product label exclusivity

The *Exclusive* product label is a product label that, when applied to a product, discards all the other product labels applied to it. The other product labels are still applied to the product, but only the exclusive one is displayed on the respective product card and product details page. This might be useful when running several discounts in a store at the same time. By assigning the labels with corresponding discount names to needed products, you can show the shop users to which products each discount is applied.

To learn how a Back Office user can create an exclusive product label, see [Creating product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html).

## Product label filtering on the Storefront

Shop users can view product cards with labels on any Storefront page. Also, they can filter products by labels on category and search results pages.

![Filter product labels](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Label/Product+Label+Feature+Overview/filter-labels-yves.png)

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-labels/create-product-labels.html)  |
| [Edit product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-labels/edit-product-labels.html)  |

## Related Developer documents

| INSTALLATION GUIDES  | UPGRADE GUIDES | GLUE API GUIDES |
|---|---|---|
| [Product Labels feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-labels-feature.html) | [ProductLabel migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabel-module.html) | [Retrieving product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-product-labels.html) |
| [Glue API: Product Labels feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-image-sets-glue-api.html) | [ProductLabelGui migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabelgui-module.html) |  |
|  | [ProductLabelSearch migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabelsearch-module.html) |  |
|  | [ProductLabelStorage migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabelstorage-module.html) |  |
