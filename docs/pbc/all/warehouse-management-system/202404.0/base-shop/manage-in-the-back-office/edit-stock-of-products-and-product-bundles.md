---
title: Edit stock of products and product bundles
description: Learn how to edit stock of products and product bundles in the Back Office.
last_updated: June 3, 2022
template: back-office-user-guide-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/availability/edit-stock-of-products-and-product-bundles.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/manage-in-the-back-office/edit-stock-of-products-and-product-bundles.html
---


## Prerequisites

Review the [reference information](#reference-information-edit-stock-of-products-and-product-bundles) before you start, or look up the necessary information as you go through the process.

## Edit stock of a product variant


1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Availability**.
2. Next to the abstract product owning the product variant you want to edit the stock of, click **View**.
    This opens the **Product Availability** page.
3. Next to the product variant you want to edit the stock of, click **Edit Stock**.
4. On the **Edit Stock** page, enter **QUANTITY** per needed **STOCK TYPE**.
5. For **NEVER OUT OF STOCK** per **STOCK TYPE**, do the following:
      * To make the product available regardless of its stock, select the checkbox.
      * To make the product available only if its stock is more than 0, clear the checkbox.
6. Click **Save**.
    This refreshes the page with a success message displayed.

## Edit stock of a product variant in a product bundle

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Availability**.
2. Next to the product bundle owning the product variant you want to edit the stock of, click **View**.
    This opens the **Product Availability** page.
3. In the **VARIANT AVAILABILITY** pane, next to the needed product bundle, click **View bundled products**.
    This opens the **BUNDLED PRODUCTS**.
4. Next to the product variant you want to edit the stock of, click **Edit Stock**.
5. On the **Edit Stock** page, enter **QUANTITY** per needed **STOCK TYPE**.
6. For **NEVER OUT OF STOCK** per **STOCK TYPE**, do the following:
      * To make the product available regardless of its stock, select the checkbox.
      * To make the product available only if its stock is more than 0, clear the checkbox.
7. Click **Save**.
    This refreshes the page with a success message displayed.


## Reference information: Edit stock of products and product bundles

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| STOCK TYPE | Name of the warehouse the stock is located in. |
| QUANTITY | Number of products in stock per warehouse. Accept decimals with up to 10 digits after the decimal separator and 20 digits in total. When you edit stock of a product variant belonging to a product bundle, the bundle's availability is calculated dynamically. For an example, see [Reference information: Availability calculation of product bundles](#reference-information-availability-calculation-of-product-bundles). |
| NEVER OUT OF STOCK | Defines if the product is available regardless of its stock per warehouse. Even if **QUANTITY** is 0, customers can still order the product. This is usually useful for digital items like gift cards. Setting this option for a real product may cause overbooking. |
| Available in stores | Defines the stores which the stock is available in per warehouse. |

### Reference information: Availability calculation of product bundles

Let's say you have two products: a smartphone and three glass screen protectors for it. They are sold both as separate products and as a bundle. This means that a customer can buy each of the products separately or buy a "smartphone+3 glass screen protectors" bundle.

Each product has its own stock and availability value. Also, there is the availability of the bundle which is calculated based on each separate item's availability. The bundle consists of one smartphone and three glasses. This means that the bundle is only available when the following separate products meet the requirements:
* Smartphone: at least one in stock.
* Glass screen protector: at least three in stock.

If only two screen protectors are available, regardless of the smartphone's stock, the bundle is not available.
