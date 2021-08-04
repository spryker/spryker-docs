---
title: Configurable Bundle Feature Overview
originalLink: https://documentation.spryker.com/v4/docs/configurable-bundle-feature-overview
redirect_from:
  - /v4/docs/configurable-bundle-feature-overview
  - /v4/docs/en/configurable-bundle-feature-overview
---

A **configurable bundle** is a product bundle, that a customer can configure in the Storefront on the go by choosing the suggested concrete products.

{% info_block infoBox "Example" %}

For example, while buying a kitchen furniture set, a customer can select what furniture to add in their kitchen. The kitchen furniture set is the configurable bundle in this case, for which the customer selects from several options of drawers, cupboards, cabinets, etc. to make their perfect match.

{% endinfo_block %}

A Configurable Bundle contains:

* Configurable Bundle Template
* Configurable Bundle Template ID - a unique identifier of a configurable bundle in the system
* Configurable Bundle Template Name
* Configurable Bundle Template Image. It is displayed on the Templates page for the corresponding Configurator in the Storefront.
* Configurable Bundle Slots
* Configurable Bundle Slots Name

Read on to learn more about these elements.

## Configurable Bundle Template
Every configurable bundle is created per a template. The **template** is a model that contains the configuration details for the bundle, i.e., the number of slots it may provide, product lists assigned to a slot, etc. A Back Office User creates the template in the Back Office, and the Shop User then uses the template to configure the bundle. See [Configurable Bundle Templates](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/configurable-bundle-templates/configurable-bu) on working with templates in the Back Office.
{% info_block infoBox "Example" %}

A shop owner can have various templates: a sport suit, a car, a kitchen set.

{% endinfo_block %}
A Shop User can set up the Configurable Bundle on the **Configurator page**. Configurator is the Storefront representation of the Template that Back Office User creates in the Back Office. See [Configurator](#configurator) to learn more about it.

| Storefront | Back Office |
| --- | --- |
| ![Configurable Bundle Template in the Back Office](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/Configurable+Bundle+Template+-+back+office.png){height="" width=""} | ![Configurable Bundle Template in the Storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/Configurable+Bundle+Template+-+storefront.png){height="" width=""} |
A bundle template can contain an infinite number of the slots.

The example below illustrates how the Configurable Bundle data is saved to the database:
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

## Configurable Bundle Slots
A slot is an entity with a list of assigned products for the configurable bundle. A slot contains:

* Configurable Bundle Slot Name
* Configurable Bundle Slot ID
* Product List ID

A Back Office User can [create an unlimited number of slots](https://documentation.spryker.com/v4/docs/managing-configurable-bundle-templates#creating-a-slot-for-a-configurable-bundle-template) for a template.
{% info_block infoBox "Example" %}

`Kitchen furniture set` configurable bundle contains eight slots:

* Wall cabinet with two doors
* Wall cabinet horizontal
* High cabinet with shelves
* Wall cabinet with drawers
* Corner base cabinet
* Plumbing base cabinet
* Base cabinet
* Drawer base cabinet

![Kitchen Configurable Bundle](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/kitchen+slots.png){height="" width=""}

{% endinfo_block %}
A slot contains a list of products or even categories to choose from. In Spryker Commerce OS, this functionality is represented via **product lists**. Spryker Back Office User adds the necessary products to the product list to allow buyers to choose among several options in the slot. 

{% info_block warningBox "Warning" %}

GUI currently supports only one unique product list for each slot during the creation, however, you can assign the same product list to multiple slots via DataImport.  

{% endinfo_block %}
{% info_block errorBox "Attention!" %}

Do not change the product list to blacklist as, in this case, the slot will not contain products to display.

{% endinfo_block %}
{% info_block infoBox "Example" %}

Slot `Base Cabinet` may contain a list with five assigned products:

* Base cabinet with three drawers SKU 12234
* Base cabinet with two drawers SKU 12235
* Base cabinet with two shelves SKU 12236
* Base cabinet with pull-out SKU 12237
* Base cabinet with wire basket SKU 12238
![Slot Base Cabinet](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/Slot+Base+Cabinet.png){height="" width=""}

{% endinfo_block %}
An **assigned product** is a concrete product that is assigned to the slot. When you select the product for a slot, **the product is picked**.
{% info_block infoBox "Example" %}

You have picked `Base cabinet with 2 shelves SKU 12236` product to fill the slot `Base Cabinet`.

{% endinfo_block %}
When represented schematically, a configurable bundle looks like this:
![Config Bundle Schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/slots+scheme.png){height="" width=""}

## Configurable Bundle & Cart and Cart Notes
When the customer has successfully filled all the slots in the template, they add the configurable bundle to the cart. On the cart page, the items are grouped by the configured bundle.
![Configured Bundle on the Cart page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configured-bundle-on-cart-page.png){height="" width=""}

You can add a note to the whole Configurable bundle on the cart page. The note will further be displayed on the Checkout Summary and Order Details page under the respective Configurable Bundle template.

## Configurable Bundle Quantity, Stock and Price 
The current configuration supports 1:1 product-slot relation in the Configurator. It means, that you can select only one concrete product for a slot with quantity 1. However, using the data import, you may import a bigger quantity for the products in the slots.

On the cart page, a shopper can also change the number of configured bundles to buy. After the number of bundles is increased, the quantity of the items in the configured bundle is multiplied by this number.
{% info_block infoBox "Example" %}

Configured Bundle comes with a quantity 1:
Item A = 2 item total = 80 (item A price per item = 40)
Item B = 1 item total = 20
Total Price for 1 Configured Bundle = 100

Configured Bundle comes with a quantity 2:
Item A = 4 item total = 160 (item A price per item = 40)
Item B = 2 item total = 40
Total Price for 2 Configured Bundles = 200

Configured Bundle comes with a quantity 3:
Item A = 6 item total = 240 (item A price per item = 40)
Item B = 3 item total = 60
Total Price for 3 Configured Bundles = 300

{% endinfo_block %}
The price for a Configurable Bundle is the sum of all the items selected in the slots. The price is calculated dynamically, that is, if you re-select a product from the slot(s), the price is updated accordingly.

{% info_block warningBox "Calculation formula" %}

Σ Configurable Bundle = Σ product in Slot 1 + Σ product in Slot 2 + Σ product in Slot n

{% endinfo_block %}
The Configurable Bundle Stock is updated in the same way as stock for the concrete products.

Product availability is taken into account when calculating the total.

## Configurable Bundle & Reorder
The items from the configurable bundle can be reordered and are added to a new order as separate order items.

## Configurable Bundle & RFQ
A Buyer can include the Configurable Bundle into the RFQ process and change the price per each item in the bundle. The item total of the concrete product and the configurable bundle total is recalculated in this case based on the new prices.

## Configurable Bundle & Splittable Order Items
Configurable Bundle may contain splittable and non-splittable products. If a Configurable Bundle includes splittable products and has quantity more than 1, then the order is split into the separate configured bundle items with its items also split.
{% info_block infoBox "Example" %}

A shopper places an order with a Configured Bundle A x2 containing:
Product A x 6
Product B x 2

In case the products are splittable, the order will look like:

Configured bundle A x 1
Product A x 1
Product A x 1
Product A x 1
Product A x 1
Product A x 1
Product A x 1
Product B x 1
Product B x 1


Configured bundle A x 1
Product A x 1
Product A x 1
Product A x 1
Product A x 1
Product A x 1
Product A x 1
Product B x 1
Product B x1

{% endinfo_block %}
Every concrete product has its own sales order item.
A configurable Bundle containing non-splittable products with quantity more than one is not split:
{% info_block infoBox "Example" %}

A shopper places an order with a Configured Bundle B x2 with the following products:
Product A x 3 - non-splittable
Product B x 2 - splittable

The order with these products will look like:

Configured bundle B x 1
Product A x 3
Product B x 1
Product B x1

Configured bundle B x 1
Product A x 3
Product B x 1
Product B x1

{% endinfo_block %}
The non-splittable product has one sales order item with quantity 3.
{% info_block errorBox "Warning!" %}

Pay attention, that product splitting logic does not support Packaging Units for the Configurable Bundle products.

{% endinfo_block %}
## Configurator
Configurator is a page where a shopper assembles a Configurable Bundle. It allows customers to choose compound and technically feasible product combinations online, making the shopping experience interactive for companies and their customers.

### Configurable Bundle List
This page contains a list of all Configurable Bundle Templates that are active. All the templates are taken from the **Back Office > Configurable Bundle Templates** section. To configure the template, use our [Configurable Bundle Template Back Office guide](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/configurable-bundle-templates/configurable-bu).
![Configurator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/Configurable+Bundle+Template+-+storefront.png){height="" width=""}

### Configurator Page
Configurator is the exemplary page where you can set up your configurable bundle from the template.
![Configurator Slots](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Configurable+Bundle/configurator-slots.png){height="" width=""}

All slots are optional, so you can fill, for example, only two slots from the example image above. However, you can customize this configuration according to project needs.

### Current Constraints

* From the Configurator page, you cannot add the configured bundle to the shopping list or wishlist.
* The shopper cannot return to the Configurator page from the cart, reorder, or shopping list pages.
* The following products cannot be displayed in the Configurator:
    - products with the Measurement or Packaging Units
    - default [product bundles](/docs/scos/dev/features/202001.0/product-information-management/product-bundle)
    - gift cards
* Product options are not displayed for concrete products.
* Product labels are not displayed for concrete products.
* Product quantity restrictions cannot be applied to concrete products.
* The slot page doesn't have any sorting/pagination/search.
* Product bundles cannot be added to the configurable bundle.
