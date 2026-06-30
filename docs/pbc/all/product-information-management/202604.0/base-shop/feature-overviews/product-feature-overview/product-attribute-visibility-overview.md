---
title: Product Attribute Display Types Overview
description: Use Product Attribute Display Types to control where product attributes are displayed across storefront pages—PDP, PLP, Cart, or internal only.
last_updated: Mar 31, 2026
template: concept-topic-template
---

The Product Attribute Display Types feature lets you control where product attributes are displayed across the Storefront. For each attribute, you can configure visibility for the following page types:

- **PDP (Product Detail Page)**: Displays the full attribute, including structured data markup.
- **PLP (Product Listing Page)**: Shows a condensed version of the attribute as badges.
- **Cart**: Displays the attribute within the shopping cart.
- **None/Internal**: Keeps the attribute hidden from customers for internal use only.

This feature is useful in B2B and B2C scenarios where different product attributes are relevant in different shopping contexts. For example, technical specifications are important on the PDP, while key differentiators like color and size are useful on the PLP and in the Cart.

## Back Office management

In the Back Office, the product attribute management form includes a **Display At** field. This field lets you select one or more visibility types for each attribute.

### Configuring visibility

When creating or editing a product attribute, you can configure the following visibility options:

| VISIBILITY TYPE | DESCRIPTION |
| --- | --- |
| **PDP** | The attribute is displayed on the product detail page. |
| **PLP** | The attribute is displayed on the product listing page as a badge. |
| **Cart** | The attribute is displayed in the shopping cart as a badge. |
| **None** | The attribute is not displayed to customers. Use this for internal attributes. |

You can assign multiple visibility types to a single attribute. For example, the `color` attribute can be visible on PDP, PLP, and Cart pages simultaneously.

### Filtering attributes by visibility

The attribute management table in the Back Office includes a **Display At** column and a filter. You can filter the attribute list by visibility type to quickly find attributes configured for a specific page type.

### Default visibility

When a new attribute is created, the default visibility type is **PDP**. You can change this in the attribute form.

## Display on the Storefront

Product attributes are displayed differently depending on the page type and the configured visibility.

### Product Detail Page (PDP)

On the PDP, visible attributes are displayed in a grid layout with attribute names and values.

### Product Listing Page (PLP)

On the PLP, visible attributes are displayed as compact badges next to each product. This helps customers quickly compare key attributes without opening individual product pages.

![PLP product attribute visibility](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/feature-overviews/product-attribute-visibility-overview.md/plp.jpeg)

### Cart

In the shopping cart, visible attributes are displayed as badges for each cart item. This helps customers verify product details before completing the purchase.

![Cart product attribute visibility](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/feature-overviews/product-attribute-visibility-overview.md/cart.jpeg)

## Data import

You can configure attribute visibility through data import by adding a `visibility` column to the `product_management_attribute.csv` file.

Example:

```csv
key,input_type,allow_input,is_multiple,values,...,visibility
storage_capacity,text,no,no,"16 GB,32 GB,64 GB,128 GB",...,PDP
color,text,no,yes,"white,black,grey",...,"PDP,PLP,Cart"
internal_sku,text,yes,no,"",...,
```

The `visibility` column accepts a comma-separated list of visibility types: `PDP`, `PLP`, `Cart`. Leave the column empty for internal-only attributes.

| DEVELOPER GUIDES |
| --- |
| [Install the Product Attribute Visibility feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-attribute-visibility-feature.html) |
