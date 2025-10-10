---
title: Product feature overview
description: Detailed overview of the Spryker Product feature allowing you to create products and characteristics of producs in Spryker Cloud Commerce OS
last_updated: Jul 9, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/products-overview
originalArticleId: d12e5fdb-b74a-4d9b-91d9-866f330b46df
redirect_from:
  - /docs/scos/user/features/202108.0/product-feature-overview/product-feature-overview.html
  - /docs/scos/user/features/202200.0/product-feature-overview/product-feature-overview.html
  - /docs/product-quantity-restrictions
  - /docs/product-ttl
  - /docs/scos/user/features/202311.0/product-feature-overview/product-feature-overview.html  
  - /docs/pbc/all/product-information-management/202311.0/feature-overviews/product-feature-overview/product-feature-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html
  - /docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/concrete-sku-product-filter-feature-overview.html
---

The *Product* feature lets you create products, and manage their characteristics and settings.

In Spryker Commerce OS, you create and manage products in the [Back Office](/docs/pbc/all/back-office/{{page.version}}/base-shop/spryker-core-back-office-feature-overview.html). The product information you specify serves multiple purposes:

- Defines product characteristics.
- Affects shop behavior. For example, filtering and search on the Storefront are based on product attributes.
- It's used for internal calculations, like delivery costs based on the product weight.


## Abstract products and product variants

A product can have multiple variants, such as size or color. Such product variations are called *product variants*, or *concrete products*. To distinguish product versions, track their stock, and provide a better shopping experience, product variants are grouped under *abstract products*.

The abstract product is the highest level of the product hierarchy. It does not have its own stock but defines the properties shared by its product variants. A product variant always belongs to one abstract product, has a distinctive stock, and is always different from another product variant with at least one [super product attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html).

The following table shows the differences between abstract products and product variants:

| PRODUCT DATA | ABSTRACT PRODUCT | PRODUCT VARIANT |
| --- | --- | --- |
| SKU |&check;|&check;|
| Name |&check;|&check;|
| Description |&check;|&check;|
| Product attributes |&check;|&check;|
| Super attributes |  |&check;|
| Media assets |&check;|&check;|
| Stock |  |&check;|

### Abstract products and product variants on the Storefront

On the Storefront, only abstract products are displayed in the product catalog and can be searched for.

Product variants are always a part of an abstract product. Abstract product and all its product variants share the same URL.

In this example, a T-shirt, which is an abstract product, is available in sizes S, M, and L, which are three different product variants, each having its own stock. When you search *T-shirt* on the Storefront, it's the abstract product that appears as the search result. A Storefront user can only buy one of the product variants. On the **Product Details** page of the abstract product, they select and add to the cart one of the product variants: S, M, L.


### Product information inheritance

Information about a concrete product on the Storefront is a combination of the information of the concrete product and its abstract product.  

The information of a concrete product always overwrites the information of its abstract product. For example, if the abstract product name is *VGA cable*, and the concrete product name is *VGA cable(1.5m)*, the latter is displayed.
If some information is not specified for a concrete product, it inherits the information from its abstract product. For example, if no price is specified for a concrete product, the price of its abstract product is displayed.

To better understand how abstract and concrete products are processed in a shop, see the following use cases.

#### Case 1: Selling books

Most of the time, books do not have variations. In this case, you create an abstract product and a concrete product per book. The abstract product holds all the information about the product. The concrete product holds the stock information.

#### Case 2: Selling blue and green products

To sell a product in blue and green colors, you create an abstract product and two concrete products. To let your customers select the product variant of which color they want to buy, you create a `color` super attribute.

Suppose the green variant is more expensive than the blue one. In this case, you add the price to the green product variant. The blue variant inherits the price from the abstract product.

The product information is structured as follows:
- The abstract product contains all the information about the product.
- The concrete products contain the following information:
  - The blue variant holds the stock information and the super attribute: `color = blue`.
  - The green variant holds:
    - The stock information.
    - The super attribute: `color = green`.
    - The price, which is different from the abstract product's price.

#### Case 3: Selling a product in five colors, four sizes, and three materials

To a product in five colors, four sizes, and three materials, you can structure product information in one of the following ways. You can create an abstract product and up to 60 variants to support all the combinations. Or, you can use the [Product Groups](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-groups-feature-overview.html) feature.

Using the Product Group feature, you create a group of five abstract products, one for each color. Each abstract product  contains up to 12 concrete products of different combinations of the sizes and the materials.

The abstract products contain all the information about the product. The product variants hold the stock information and the super attribute of color, size, and material.


## Managing product information in a third-party product information management system

Besides the Back Office, you can maintain product information in an external Product Information Management (PIM) system. The data from the PIM systems can be exported to Spryker. An import interface transforms the incoming product data into a Spryker specific data structure and persists it. After that, the data is exported to the key-value store (Redis or Valkey) and Elasticsearch. This way, the Storefront can access the relevant product data very fast. After the import was finished, you can access the products in the Spryker Back Office.

![Product information management](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product/product_information_management.png)

The Spryker Commerce OS supports integration of the following PIM systems:

- [Akeneo](/docs/dg/dev/backend-development/extend-spryker/spryker-os-module-customisation/extend-the-core.html)
- [Censhare PIM](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/third-party-integrations/censhare-pim.html)
- [Xentral](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/third-party-integrations/xentral.html)

## Concrete product filter

The Concrete SKU product filter lets a Back Office user filter abstract products by SKUs of concrete products.

For example, an abstract product with the `ABCD` SKU has two concrete products with the `ABCD-1` and `ABCD-2` SKUs. Without this feature, you can find this abstract product only by the `ABCD` SKU. With this feature, you can find this product by the `ABCD`, `ABCD-1`, and `ABCD-2` SKUs.



## Related Business User documents

| OVERVIEWS |BACK OFFICE USER GUIDES|
| - |---|
| [Product Attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html)  | [Create an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) |
| [Discontinued Products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/discontinued-products-overview.html)  | [Edit abstract products and product bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/edit-abstract-products-and-product-bundles.html) |
| [Product Images](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-images-overview.html)  | [Create a product variant](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html) |
| [Timed Product Availability](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/timed-product-availability-overview.html)  | [Edit a product variant](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/edit-product-variants.html) |
|  |  [Manage products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-products.html) |

## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES | GLUE API GUIDES | DATA IMPORT |
|---|---|---|---|
| [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) | [ProductValidity migration guide](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productvalidity-module.html) | [Retrieve abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-abstract-products.html) | [File details: product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html) |
| [Install the Quick Add to Cart + Discontinued Products feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-quick-add-to-cart-discontinued-products-feature.html) |  | [Glue API: Retrieving concrete products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html) | [File details: product_abstract_store.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract-store.csv.html) |
| [Alternative Products + Discontinued Products feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-alternative-products-discontinued-products-feature.html) |  | [Retrieving product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-product-attributes.html) | [File details: product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html) |
| [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html) |  | [Retrieving image sets of abstract products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-image-sets-of-abstract-products.html) | [File details: product_attribute_key.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-attribute-key.csv.html) |
| [Glue API: Product Image Sets feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-image-sets-glue-api.html) |  | [Retrieving image sets of concrete products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html) | [File details: product_management_attribute.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-management-attribute.csv.html) |
| [Category Image feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-image-feature.html) |  |  | [File details: product_discontinued.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-discontinued.csv.html) |
| [Install the Product + Cart feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-cart-feature.html) |  |  |  |
