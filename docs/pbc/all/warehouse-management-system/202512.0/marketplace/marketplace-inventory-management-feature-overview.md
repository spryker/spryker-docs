---
title: Marketplace Inventory Management feature overview
description: Learn all about the Spryker Marketplace Inventory Management feature and how you can use it within your Spryker Marketplace store.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/user/features/202200.0/marketplace-inventory-management-feature-overview.html
---

The *Marketplace Inventory Management* feature enables maintaining stock and availability of merchant products and product offers that are sold in the Marketplace.
In the context of inventory management, the *warehouse* is the physical place where your products are stored, and stock is the number of products available in the warehouse.

## Marketplace warehouse management

When a merchant is created, the corresponding warehouse is created for this merchant. The warehouse name is composed of the following parts: `merchant name` + `merchant reference` + `warehouse` + `index` (starting with 1, 2).

{% info_block infoBox "Example" %}

"Spryker MER000001 Warehouse 1" where `Spryker` is the merchant name, `MER000001` is a merchant reference, and the index is `1` as it's the first warehouse created.

{% endinfo_block %}

A warehouse can be assigned to a single store or shared between several stores. For details about how you can manage warehouses and stores in the Back Office, see [Managing warehouses](/docs/pbc/all/warehouse-management-system/latest/base-shop/manage-in-the-back-office/edit-warehouses.html).

## Marketplace stock management

The stock for product offers is defined in the corresponding merchant warehouse. The stock does not reflect the actual availability of products, as not all the items available in stock are available for sale. For example, when there are pending orders with offers, these order items are *reserved*, so they are not available for ordering, even if they are physically on hand.

Merchants can define product offer stock in the Merchant Portal. For details, see [Managing product offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html).

Also, you can do the following using the data import:

- Manage stock of product offers for a merchant by importing the product offer and stock data separately: [File details: product_offer_stock.csv](/docs/pbc/all/warehouse-management-system/latest/marketplace/import-and-export-data/import-file-details-product-offer-stock.csv.html).
- Define stock when importing the product offer data: [File details: combined_merchant_product_offer.csv](/docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-combined-merchant-product-offer.csv.html).
- Import merchant stock data: [File details: merchant_stock.csv](/docs/pbc/all/warehouse-management-system/latest/marketplace/import-and-export-data/import-file-details-merchant-stock.csv.html).
- Import stock of merchant products: [File details: product_stock.csv](/docs/pbc/all/warehouse-management-system/latest/base-shop/import-and-export-data/import-file-details-product-stock.csv.html).

## Marketplace availability management

The difference between the current quantity of items in stock and the quantity of these items in the pending orders is called the *availability* of products.

Product offer availability calculation differs from the calculation of concrete products availability:

| CONCRETE PRODUCT AVAILABILITY   | PRODUCT OFFER AVAILABILITY   |
| --------------------- | ------------------------ |
| Formula: Concrete product availability = Concrete product quantity - Concrete product reservations | Formula: Offer availability = Offer quantity - Offer reservations |

Offer availability is considered on the Storefront:

- On the product details page: While adding the offer to cart.
- On the cart page: The product stays in the cart if the attached offer is not available anymore, and a hint is shown.
- During the checkout: When clicking **Buy now**, the availability is rechecked.

{% info_block infoBox "Example" %}

Let's assume that a merchant has defined quantity 10 for product offer 1. A customer adds 8 items of the product offer 1 to cart and later updates the quantity to 12. In such a situation, the availability of the product offer 1 is checked, and the customer is notified to update the quantity of the product offer to the available number to proceed with the purchase.

{% endinfo_block %}

## Related Business User documents

| MERCHANT PORTAL USER GUIDES | BACK OFFICE USER GUIDES |
| --------------------------- | ----------------------- |
| [Managing product offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html) | [Managing warehouses](/docs/pbc/all/warehouse-management-system/latest/base-shop/manage-in-the-back-office/edit-warehouses.html) |

## Related Developer documents

|INSTALLATION GUIDES |DATA IMPORT |
|---------|---------|
| [Install the Marketplace Inventory Management feature](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-feature.html) | [File details: merchant_stock.csv](/docs/pbc/all/warehouse-management-system/latest/marketplace/import-and-export-data/import-file-details-merchant-stock.csv.html) |
| [Install the Marketplace Inventory Management Glue API](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-glue-api/install-the-marketplace-inventory-management-glue-api.html)  | [File details: product_offer_stock.csv](/docs/pbc/all/warehouse-management-system/latest/marketplace/import-and-export-data/import-file-details-product-offer-stock.csv.html) |
| [Install the Marketplace Inventory Management + Order Management feature](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-packaging-units-feature.html) | [File details: combined_merchant_product_offer.csv](/docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-combined-merchant-product-offer.csv.html) |
| [Install the Marketplace Product + Inventory Management feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-inventory-management-feature.html) ||
| [Install the Marketplace Inventory Management + Packaging Units feature](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-packaging-units-feature.html) ||
