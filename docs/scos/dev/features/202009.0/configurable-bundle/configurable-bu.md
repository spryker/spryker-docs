---
title: Configurable Bundle feature overview
originalLink: https://documentation.spryker.com/v6/docs/configurable-bundle-feature-overview
redirect_from:
  - /v6/docs/configurable-bundle-feature-overview
  - /v6/docs/en/configurable-bundle-feature-overview
---

A *configurable bundle*  is a [product bundle](https://documentation.spryker.com/docs/product-bundle) for which a Storefront User selectes products on the Storefront. 
For example, when buying a kitchen set, a customer selects pieces of furniture, like drawers, cupboards, or cabinets, from suggested options.

## Configurable bundle template
Every configurable bundle is created per a template. A *configurable bundle template* is a model with configuration details for a bundle, like a number of [slots](#configurable-bundle-slot) or product lists assigned to a slot. There can be multiple templates in a shop, like a sport suit, a car, or a kitchen set.

A Back Office User creates the templates in the Back Office. See [Сreating configurable bundle templates](https://documentation.spryker.com/docs/managing-configurable-bundle-templates) to learn how they do it.

![Configurable Bundle Template in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/Configurable+Bundle+Template+-+back+office.png)

To create a configurable bundle on the Storefront, a Shop User selects a configurable bundle template.

![Configurable Bundle Template in the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configurable-bundle-template-selection.png)


The example below illustrates how the сonfigurable bundle data is saved to the database:
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

When a Back Office user creates a configurable bundle template, they create the slots, and a [product list](https://documentation.spryker.com/docs/product-lists) is automatically assigned to each of them. They can edit the product list in **Catalog Management** > **Product Lists** section or by editing the slot in the configurable bundle template.

{% info_block warningBox "Slots" %}

* A configurable bundle template can have an unlimited number of slots.

* You can assign the same product list to multiple slots in a configurable bundle template only via data import.

{% endinfo_block %}

To learn how a Back Office User edits product lists, see [Managing product lists](https://documentation.spryker.com/docs/managing-product-lists).
To learn how a Back Office User creates slots, see [Creating slots in configurable bundle templates](https://documentation.spryker.com/docs/managing-configurable-bundle-templates#creating-slots-in-configurable-bundle-templates).

When a Storefront user configures a bundle, for each slot, they select a product from the provided product list. 
![Slot Base Cabinet](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/Slot+Base+Cabinet.png)

By default, it is not obligatory to select products for all the slots to order a configurable bundle. 

Schematically, a configurable bundle looks as follows:
![Config Bundle Schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/slots+scheme.png)

When a Storefront User selects a product for a slot, the product is picked. For example, if they select *Base cabinet with 2 shelves SKU12236* for the slot *Base Cabinet*, they see the following message: "You have picked `Base cabinet with 2 shelves SKU 12236` product to fill the slot `Base Cabinet`.".



## Configurable bundle notes in cart

On the *Сart* page, items are grouped by configured bundles.
![Configured bundle on the Cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configurable-bundle-in-cart.png)

A Storefront User can add a note to a configurable bundle. The note is displayed with the bundle on the *Checkout Summary* and *Order Details* page.

![Configurable bundle note](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configurable-bundle-note.png)

## Product bundle configurator
*Product bundle configurator* is a page where a Storefront User selects products for a configurable bundle.

## Configurable bundle quantity, stock, and price

Currently, the feature supports 1:1 product-slot relation in the configurator. You can select only one concrete product with quantity 1 for a slot. However, using the data import, you may import a bigger quantity for the products in the slots.

On the *Cart* page, a Storefront User can change the qunatity of a configured bundle. After the quantity is increased, the quantity of all the items in the configured bundle is multiplied by this number.

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

Configurabe bundle price is calculated by the following formula:
Σ Configurable bundle = Σ product in slot 1 + Σ product in slot 2 + Σ product in slot n

Configurable bundle stock is updated in the same way as stock for the concrete products.

Product availability is taken into account when calculating the total.

## Configurable bundle reorder
A Storefront User can reorder items from a configurable bundle as separate order items.

## Configurable bundle and quotation process
A Storefront User can include a configurable bundle into the [quotation process](https://documentation.spryker.com/docs/quotation-process-rfq-feature-overview) and change the price of one or more items in a bundle. The price of the configurable bundle is re-calculated based on the new prices.

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


If a configurable bundle contains non-splittable products, and it its quantity is above 1, it is not split.

For example, a Storefront User places the order with the following item:

* Configured bundle B x2:
    * Product A x 3 - non-splittable
    * Product B x 2 - splittable

The order looks as follows:

* Configured bundle B x 1
    * Product A x 3
    * Product B x 1
    * Product B x1

* Configured bundle B x 1
    * Product A x 3
    * Product B x 1
    * Product B x1

{% info_block errorBox "packaging units are not supported" %}

The product splitting logic does not support [packaging units](https://documentation.spryker.com/docs/packaging-units-overview) with configurable bundle products.

{% endinfo_block %}


## Configurable Bundle on the Storefront

The Configurable Bundle feature looks as follows on the Storefront:
![Configuring a bundle](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configuring-a-bundle.gif){height="" width=""}

### Current constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future.


* On the Configurator page, you cannot add the configured bundle to a [shopping list](https://documentation.spryker.com/docs/multiple-shared-shopping-lists-overview) or [wishlist](https://documentation.spryker.com/docs/multiple-wishlists).
* A Storefront User cannot return to the *Configurator* page from the *Cart*, *Reorder*, or *Shopping list* pages.
* The following products cannot be displayed in the configurator:
    - Products with [measurement](https://documentation.spryker.com/docs/measurement-units-feature-overview) or [packaging units](https://documentation.spryker.com/docs/packaging-units-overview)
    - [Product bundles](https://documentation.spryker.com/docs/product-bundles)
    - [Gift cards](https://documentation.spryker.com/docs/gift-card-feature-overview)
* The following functionalities are not displayed and cannot be applied to concrete products in configurable bundles:
    * [Product options](https://documentation.spryker.com/docs/product-options-overview)
    * [Product labels](https://documentation.spryker.com/docs/product-label-feature-overview) 
    * [Product quantity restrictions](https://documentation.spryker.com/docs/product-quantity-restrictions-overview)
* The *Slot* page doesn't have any sorting, pagination, or search.
* Product bundles cannot be added to configurable bundles.

