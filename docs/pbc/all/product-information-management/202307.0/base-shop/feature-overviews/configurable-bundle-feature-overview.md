---
title: Configurable Bundle feature overview
description: A configurable bundle is a product bundle, that a customer can configure in the Storefront on the go by choosing the suggested concrete products.
last_updated: Jul 21, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/configurable-bundle-feature-overview
originalArticleId: 292959d4-d71c-4c5d-846f-9685bcf04834
redirect_from:
  - /2021080/docs/configurable-bundle-feature-overview
  - /2021080/docs/en/configurable-bundle-feature-overview
  - /docs/configurable-bundle-feature-overview
  - /docs/en/configurable-bundle-feature-overview
  - /docs/configurable-bundle
  - /docs/pbc/all/product-information-management/202307.0/feature-overviews/configurable-bundle-feature-overview.html
---

A *configurable bundle* is a [product bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-bundles-feature-overview.html) for which a Storefront User selects products on the Storefront.
For example, when buying a kitchen set, a customer selects pieces of furniture, like drawers, cupboards, or cabinets, from suggested options.

## Configurable bundle template
Every configurable bundle is created per a template. A *configurable bundle template* is a model with configuration details for a bundle, like a number of [slots](#configurable-bundle-slot) or product lists assigned to a slot. There can be multiple templates in a shop, like a sports suit, a car, or a kitchen set.

A Back Office User creates the templates in the Back Office. See [Сreate configurable bundle templates](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/configurable-bundle-templates/create-configurable-bundle-templates.html) to learn how they do it.

![Configurable Bundle Template in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/Configurable+Bundle+Template+-+back+office.png)

To create a configurable bundle on the Storefront, a Shop User selects a configurable bundle template.

![Configurable Bundle Template in the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configurable-bundle-template-selection.png)


The following example illustrates how the configurable bundle data is saved to the database:
```php
{
     "id_configurable_bundle_template": 2,
     "uuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
     "name": "configurable_bundle_templates.my-bundle.name",
     "slots": [
        [
            "id_configurable_bundle_template_slot": 6,
            "uuid": 9626de80-6caa-57a9-a683-2846ec5b6914,
            "name": "configurable_bundle.template_slots.slot-6.name",
            "id_product_list": 13
        ],
        [
            "id_configurable_bundle_template_slot": 7,
            "uuid": 2a5e55b1-993a-5510-864c-a4a18558aa75,
            "name": "configurable_bundle.template_slots.slot-7.name",
            "id_product_list": 14
        ]
    ]
}
```

## Configurable bundle slot

A *configurable bundle slot* is a placeholder in a configurable bundle template for which a customer selects a product.

For example, a *Kitchen furniture set* configurable bundle template can have the following slots:

* Wall cabinet with two doors
* Wall cabinet horizontal
* High cabinet with shelves
* Wall cabinet with drawers
* Corner base cabinet
* Plumbing base cabinet
* Base cabinet
* Drawer base cabinet

![Kitchen Configurable Bundle](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/kitchen+slots.png)

When a Back Office user creates a configurable bundle template, they create the slots, and a [product list](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-lists-feature-overview.html) is automatically assigned to each of them. They can edit the product list in **Catalog Management&nbsp;<span aria-label="and then">></span> Product Lists** section or by editing the slot in the configurable bundle template.

{% info_block warningBox "Slots" %}

* A configurable bundle template can have an unlimited number of slots.

* You can assign the same product list to multiple slots in a configurable bundle template only by data import.

{% endinfo_block %}

To learn how a Back Office User edits product lists, see [Edit product lists](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/product-lists/edit-product-lists.html).
To learn how a Back Office User creates slots, see [Creating slots in configurable bundle templates](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/configurable-bundle-templates/edit-configurable-bundle-templates.html#create-slots-in-a-configurable-bundle-template).

When a Storefront user configures a bundle, for each slot, they select a product from the provided product list.
![Slot Base Cabinet](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/Slot+Base+Cabinet.png)

By default, it is not obligatory to select products for all the slots to order a configurable bundle.

Schematically, a configurable bundle looks as follows:
![Config Bundle Schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/slots+scheme.png)

When a Storefront User selects a product for a slot, the product is picked. For example, if they select **Base cabinet with 2 shelves SKU12236** for the slot **Base Cabinet**, they see the following message: "You have picked `Base cabinet with 2 shelves SKU 12236` product to fill the slot `Base Cabinet`.".



## Configurable bundle notes in cart

On the **Сart** page, items are grouped by configured bundles.
![Configured bundle on the Cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configurable-bundle-in-cart.png)

A Storefront User can add a note to a configurable bundle. The note is displayed with the bundle on the **Checkout Summary** and **Order Details** pages.

![Configurable bundle note](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configurable-bundle-note.png)

## Product bundle configurator
**Product bundle configurator** is a page where a Storefront User selects products for a configurable bundle.

## Configurable bundle quantity, stock, and price

The feature supports a 1:1 product-slot relation in the configurator. You can select only one concrete product with quantity 1 for a slot. However, using the data import, you may import a larger quantity for the products in the slots.

On the **Cart** page, a Storefront User can change the quantity of a configured bundle. After the quantity is increased, the quantity of all the items in the configured bundle is multiplied by this number.

For example, a Storefront User adds a configurable bundle with the following products:
* Item A:
    * Item price: 40 EUR
    * Item total: 2
    * Price: 80 EUR
* Item B:
    * Item price: 20 EUR
    * Item total: 1
    * Price: 20 EUR
Total price is 100 EUR

If you change the quantity to 2, the following is changed:

* Item A:
    * Item price: 40 EUR
    * Item total: 4
    * Price: 160 EUR
* Item B:
    * Item price: 20 EUR
    * Item total: 2
    * Price: 40 EUR
Total price is 200 EUR

If you change the quantity to 3, the following is changed:

* Item A:
    * Item price: 40 EUR
    * Item total: 6
    * Price: 240 EUR
* Item B:
    * Item price: 20 EUR
    * Item total: 3
    * Price: 60 EUR
Total price is 300 EUR


The price of a Configurable Bundle is the sum of all the items selected for its slots. The price is calculated dynamically. If you re-select a product in a slot, the price is updated accordingly.

Configurable bundle price is calculated by the following formula:
*Σ Configurable bundle = Σ product in slot 1 + Σ product in slot 2 + Σ product in slot n*

Configurable bundle stock is updated in the same way as stock for concrete products.

Product availability is taken into account when calculating the total.

## Configurable bundle reorder
A Storefront User can reorder items from a configurable bundle as separate order items.

## Configurable bundle and quotation process
A Storefront User can include a configurable bundle into the [quotation process](/docs/pbc/all/request-for-quote/{{page.version}}/request-for-quote.html) and change the price of one or more items in a bundle. The price of the configurable bundle is re-calculated based on the new prices.

## Configurable bundle and splittable order items
A Storefront User can add splittable and non-splittable products to a configurable bundle.

If a configurable bundle contains splittable products and its quantity is above 1, the order is split into separate configured bundle items with its items also split. For example:

For example, a Storefront User places the order with the following item:

* Configured Bundle A x2:
    * Product A x 6
    * Product B x 2

The order looks as follows:

* Configured bundle A x 1
    * Product A x 1
    * Product A x 1
    * Product A x 1
    * Product A x 1
    * Product A x 1
    * Product A x 1
    * Product B x 1
    * Product B x 1
* Configured bundle A x 1
    * Product A x 1
    * Product A x 1
    * Product A x 1
    * Product A x 1
    * Product A x 1
    * Product A x 1
    * Product B x 1
    * Product B x1


If a configurable bundle contains non-splittable products and its quantity is above 1, it is not split.

For example, a Storefront User places the order with the following item:

* Configured bundle B x2:
    * Product A x 3: non-splittable
    * Product B x 2: splittable

The order looks as follows:

* Configured bundle B x 1
    * Product A x 3
    * Product B x 1
    * Product B x1

* Configured bundle B x 1
    * Product A x 3
    * Product B x 1
    * Product B x1

{% info_block errorBox "Packaging units are not supported" %}

The product splitting logic does not support [packaging units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/packaging-units-feature-overview.html) with configurable bundle products.

{% endinfo_block %}


## Configurable Bundle on the Storefront

The Configurable Bundle feature looks as follows on the Storefront:
![Configuring a bundle](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configuring-a-bundle.gif)

### Current constraints

The feature has the following functional constraints which are going to be resolved in the future:
* On the Configurator page, you cannot add the configured bundle to a [shopping list](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/shopping-lists-feature-overview/shopping-lists-feature-overview.html) or [wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/wishlist-feature-overview.html).
* A Storefront User cannot return to the **Configurator** page from the **Cart**, **Reorder**, or **Shopping List** pages.
* The following products cannot be displayed in the configurator:
    - Products with [measurement](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html) or [packaging units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/packaging-units-feature-overview.html)
    - [Product bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-bundles-feature-overview.html)
    - [Gift cards](/docs/pbc/all/gift-cards/{{site.version}}/gift-cards.html)
* The following functionalities are not displayed and cannot be applied to concrete products in configurable bundles:
    * [Product options](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-options-feature-overview.html)
    * [Product labels](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-labels-feature-overview.html)
    * [Product quantity restrictions](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/non-splittable-products-feature-overview.html)
* The **Slot** page doesn't have any sorting, pagination, or search.
* Product bundles cannot be added to configurable bundles.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
|  [Create configurable bundle templates](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/configurable-bundle-templates/create-configurable-bundle-templates.html)  |
|  [Edit configurable bundle templates](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/configurable-bundle-templates/edit-configurable-bundle-templates.html)  |
|  [Edit slots in configurable bundle templates](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/configurable-bundle-templates/edit-slots-in-configurable-bundle-templates.html)  |

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES| GLUE API GUIDES | TUTORIALS AND HOWTOS |
|---------|---------|---------|---------|
| [Install the Configurable Bundle feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-configurable-bundle-feature.html) | [ConfigurableBundle migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-configurablebundle-module.html) | [Retrieving configurable bundle templates](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-configurable-bundle-templates.html) | [HowTo: Render configurable bundle templates in the Storefront](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/tutorials-and-howtos/howto-render-configurable-bundle-templates-in-the-storefront.html)  |
| [Install the Merchant Product Restrictions feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-product-restrictions-feature.html) | [ConfigurableBundleStorage migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-configurablebundlestorage-module.html) |   |   |
| [Product Lists + Catalog feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-lists-catalog-feature.html)  | [ProductListGui migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlistgui-module.html) |   |   |
| [Install the Prices feature](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html)  | [MerchantRelationshipProductListGui migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-merchantrelationshipproductlistgui-module.html)  |   |   |
| [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |   |   |   |
| [Install the Product Images + Configurable Bundle feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-images-configurable-bundle-feature.html)  |   |   |   |
| [Install the Configurable Bundle Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-glue-api.html) |   |   |   |
| [Install the Configurable Bundle Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-glue-api.html) |   |   |   |
| [Install the Configurable Bundle + Cart Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html) |   |   |   |
| [Install the Configurable Bundle + Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-product-glue-api.html) |   |   |   |
