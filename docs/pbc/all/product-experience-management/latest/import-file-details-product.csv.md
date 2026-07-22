---
title: "Import file details: product.csv"
description: Learn which columns and values the Product Experience Management CSV schema supports for importing and exporting product data.
last_updated: Jul 22 2026
template: data-import-template
related:
  - title: Product Experience Management feature overview
    link: docs/pbc/all/product-experience-management/latest/product-experience-management.html
  - title: Import a simple product and a product family
    link: docs/pbc/all/product-experience-management/latest/tutorials-and-howtos/import-a-simple-product-and-a-product-family.html
---

This document describes the columns supported by the built-in `products-csv-import` [schema](/docs/pbc/all/product-experience-management/latest/product-experience-management.html#terminology) of the [Product Experience Management](/docs/pbc/all/product-experience-management/latest/product-experience-management.html) feature.

## Row types

A product, simple or family, is built from rows that share the same `Abstract SKU` value:

- **Abstract row**—one row where `Concrete SKU` is empty. It carries the abstract-level data: stores, categories, tax set, URL, and, for a simple product, attributes.
- **Concrete row**—one row per concrete product, where `Concrete SKU` is set. It carries the concrete-level data: stock, shipment types, and, for a product family, the attributes that differentiate each concrete product from the others. Attributes set on the concrete row are merged with the attributes set on the abstract row, so shared attributes (for example, `brand`) only need to be set once, on the abstract row.

`Name`, `Description`, `Price`, and `Image` columns are set on the abstract row and, by default, repeated on every concrete row belonging to the same product. Set a different value on a concrete row to override it for that concrete product only, for example to reflect a rating that's specific to that concrete product in its name and description, or to price a concrete product individually.

{% info_block warningBox "Leave the abstract row's Concrete SKU empty" %}

If `Concrete SKU` is set on the row that's meant to carry the abstract-level data, the import step treats it as a concrete row instead, and the product is missing its abstract-level data.

{% endinfo_block %}

{% info_block infoBox "Placeholders" %}

Columns that contain `{locale}`, `{store}`, `{currency}`, `{price_mode}`, `{warehouse}`, or `{sort_order}` are placeholders. When you download a template for an import job, these placeholders are expanded into one concrete column per actual locale, store, currency, price mode, warehouse, or image sort order configured in your project. For example, `Name ({locale})` expands into `Name (en_US)` and `Name (de_DE)` for a project with the `en_US` and `de_DE` locales.

{% endinfo_block %}

## Import file columns

| COLUMN | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| Abstract SKU | Required on every row | String | | Identifier of the abstract product. Use the same value on the abstract row and every concrete row that belongs to it. |
| Concrete SKU | Required on concrete rows | String | Must be left empty on the abstract row. | Identifier of the concrete product represented by the row. |
| Product Status | Required on every row | String | On the abstract row, one of `approved`, `waiting_for_approval`, or `denied`. On a concrete row, one of `Active` or `Inactive`. | On the abstract row, defines the moderation status of the abstract product. On a concrete row, defines whether the concrete product is active in the Storefront. |
| Merchant | Optional, abstract row only | String | | Reference of the merchant the product is assigned to. |
| Stores | Required on the abstract row | String | Semicolon-separated store names, for example `DE;AT`. Leave empty on concrete rows. | Stores the product is assigned to. |
| Name ({locale}) | Required on every row | String | By default, repeat the same value on every row for the same product. Set a different value on a concrete row to override the name for that concrete product. | Localized name of the product. |
| Description ({locale}) | Optional, abstract and concrete rows | String | By default, repeat the same value on every row for the same product. Set a different value on a concrete row to override the description for that concrete product. | Localized description of the product. |
| Categories | Optional, abstract row only | String | Semicolon-separated category keys. Leave empty on concrete rows. | Categories the abstract product is assigned to. |
| Tax Set Name | Required on the abstract row | String | Leave empty on concrete rows. | Name of the tax set applied to the product. |
| URL ({locale}) | Required on the abstract row | String | Leave empty on concrete rows. | Localized URL of the abstract product. |
| Attributes ({locale}) | Optional, abstract or concrete row | String | Semicolon-separated `key=value` pairs, for example `brand=HydraForce;sealmaterial=NBR`. Attributes on the abstract row and on a concrete row are merged for that concrete product. | Product attributes. Set attributes shared by all concrete products on the abstract row. For a product family, set the attributes that differentiate each concrete product, for example `poweroutput`, on the corresponding concrete row. |
| Price ({price_mode}, {store}, {currency}, gross) | Optional, abstract and concrete rows | Decimal | Repeat the same value on every row unless concrete products in the family are priced individually. | Gross price for the given price mode, store, and currency. |
| Price ({price_mode}, {store}, {currency}, net) | Optional, abstract and concrete rows | Decimal | Repeat the same value on every row unless concrete products in the family are priced individually. | Net price for the given price mode, store, and currency. |
| Stock ({warehouse}) | Required on concrete rows | String | Numeric quantity or `NOOS`. Leave empty on the abstract row. | Stock quantity of the concrete product in the given warehouse. Use `NOOS` to mark the concrete product as Never Out Of Stock. |
| Shipment Types | Optional, concrete row only | String | Semicolon-separated shipment type keys. One of `delivery` (physical products) or `in-center-service`. Leave empty on the abstract row. | Shipment types available for the concrete product. |
| Image Small ({locale}, {sort_order}) | Optional, abstract and concrete rows | String | Repeat the same value on every row for the same product. | URL of a small product image for the given locale and sort order. |
| Image Large ({locale}, {sort_order}) | Optional, abstract and concrete rows | String | Repeat the same value on every row for the same product. | URL of a large product image for the given locale and sort order. |

{% info_block warningBox "A product without Shipment Types is not purchasable" %}

The import step doesn't reject a concrete row with an empty `Shipment Types` value. However, without at least one shipment type, the product can't be delivered or serviced, so it's not purchasable in the Storefront. Always set `Shipment Types` for a concrete product you intend to sell.

{% endinfo_block %}

For a full walkthrough of building an import file with these columns, see [Import a simple product and a product family](/docs/pbc/all/product-experience-management/latest/tutorials-and-howtos/import-a-simple-product-and-a-product-family.html).
