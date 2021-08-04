---
title: Float Stock for Products
originalLink: https://documentation.spryker.com/v5/docs/float-stock-for-products
redirect_from:
  - /v5/docs/float-stock-for-products
  - /v5/docs/en/float-stock-for-products
---

## Float stock migration

We have changed the type of stock and quantity fields from int to float. With this change, we allow to manage fractions of items in the system.

As stock and quantity are very basic concepts of any commerce system, changing their type is a horizontal barrier for the modules. This means that, if a module is upgraded to a version that uses float stock, all the other modules in the project which are involved in the float stock barrier must be upgraded to avoid accidental type incompatibilities. For example, if ModuleX uses float stock and ModuleY uses int stock and there is no hard dependency between them, it’s technically possible to upgrade only one of them, however, during runtime, both modules may happen to process the same request data and, as a result, the response will either be calculated incorrectly or a fatal error will be thrown due to a data type mismatch.

In case of upgrading one of the modules involved into the float stock concept, we strongly recommend upgrading all the modules in your project from the list below. Mostly, the migrations have very low or even zero effort, because they only break type of a transfer object or an internal function’s signature. Some modules changed database field types to DOUBLE which is automatically upgradable by running the necessary console commands.

{% info_block errorBox %}
If you upgrade to the float stock concept, you should also review your project code and make sure to adapt all stock and quantity related customizations and implementations to use float type accordingly. If you have any partner or ECO integrations, they might have to be adjusted too.
{% endinfo_block %}
Here are some typical occurrences of working with stocks and quantities and tips to make them compatible with the float type:

*    Product stock and availability management - use `UtilQuantityService` to handle arithmetic operations with float quantity values.
 *   Cart item management - use `UtilQuantityService` to handle arithmetic operations with float quantity values.
 *  Price calculations - use `UtilPriceService` to handle rounding of price values in a centralized way and avoid handling money fractions.

## Migration Process

You can try to upgrade all affected modules together by following the steps below.
1. You can try to upgrade all affected modules together by following the steps below.
```shell
composer update "spryker/*" "spryker-shop/*"
composer require spryker/availability:"^7.0.0" spryker/availability-cart-connector:"^5.0.0" spryker/availability-gui:"^4.0.0" spryker/availability-offer-connector:"^2.0.0" spryker/cart:"^6.0.0" spryker/cart-extension:"^3.0.0" spryker/carts-rest-api:"^4.0.0" spryker/checkout:"^5.0.0" spryker/discount:"^8.0.0" spryker/discount-promotion:"^2.0.0" spryker/manual-order-entry-gui:"^0.6.0" spryker/offer:"^0.2.0" spryker/offer-gui:"^0.2.0" spryker/oms:"^9.0.0" spryker/orders-rest-api:"^2.0.0" spryker/persistent-cart:"^2.0.0" spryker/price-cart-connector:"^5.0.0" spryker/price-product:"^3.0.0" spryker/price-product-storage:"^3.0.0" spryker/price-product-volume:"^2.0.0" spryker/price-product-volume-gui:"^2.0.0" spryker/product-availabilities-rest-api:"^2.0.0" spryker/product-bundle:"^5.0.0" spryker/product-discount-connector:"^4.0.0" spryker/product-label-discount-connector:"^2.0.0" spryker/product-management:"^0.17.0" spryker/product-measurement-unit:"^3.0.0" spryker/product-option:"^7.0.0" spryker/product-option-cart-connector:"^6.0.0" spryker/product-packaging-unit:"^2.0.0" spryker/product-packaging-unit-storage:"^3.0.0" spryker/product-quantity:"^2.0.0" spryker/product-quantity-data-import:"^2.0.0" spryker/product-quantity-storage:"^2.0.0" spryker/quick-order:"^2.0.0" spryker/sales:"^9.0.0" spryker/sales-quantity:"^2.0.0" spryker/sales-split:"^4.0.0" spryker/shipment-discount-connector:"^2.0.0" spryker/shopping-list:"^3.0.0" spryker/stock:"^6.0.0" spryker/stock-sales-connector:"^4.0.0" spryker/util-price:"^1.0.0" spryker/util-quantity:"^1.0.0" spryker/wishlist:"^7.0.0" spryker-shop/cart-page:"^2.0.0" spryker-shop/customer-reorder-widget:"^5.0.0" spryker-shop/discount-promotion-widget:"^2.0.0" spryker-shop/product-detail-page:"^2.0.0" spryker-shop/product-measurement-unit-widget:"^0.7.0" spryker-shop/product-packaging-unit-widget:"^0.3.0" spryker-shop/product-search-widget:"^2.0.0" spryker-shop/quick-order-page:"^3.0.0" spryker-shop/shopping-list-page:"^0.7.0" spryker-shop/shopping-list-widget:"^0.5.0" --update-with-dependencies
```
2. Run database migration.
```shell
console propel:install
console transfer:generate
```

3. Manually upgrade the following modules:
* ProductQuantityStorage
* ShoppingListWidget

<details open>
    <summary>Affected modules</summary>
    You can find the affected modules of the float stock update in the following list.

| Operator | Operator for plain query | Migration guide |
| --- | --- | --- |
| spryker/availability | 7.0.0 | [Migration Guide - Availability](../module_migration_guides/mg-availability.htm) |
| spryker/availability-cart-connector | 5.0.0 | [Migration Guide - AvailabilityCartConnector](../module_migration_guides/mg-availability-cart-connector.htm) |
| spryker/availability-gui | 4.0.0 | [Migration Guide - AvailabilityGui](../module_migration_guides/mg-availability-gui.htm) |
| spryker/availability-offer-connector | 2.0.0 | [Migration Guide - AvailabilityOfferConnector](../module_migration_guides/mg-availability-offer-connector.htm) |
| spryker/cart | 6.0.0 | [Migration Guide - Cart](../module_migration_guides/mg-cart.htm) |
| spryker/cart-extension | 3.0.0 | [Migration Guide - CartExtension](../module_migration_guides/mg-cart-extension.htm) |
| spryker/carts-rest-api | 4.0.0 | [Migration Guide - CartsRestApi](../module_migration_guides/glue_api/cartsrestapi-migration-guide.htm) |
| spryker/checkout | 5.0.0 | [Migration Guide - Checkout](../module_migration_guides/mg-checkout.htm) |
| spryker/discount | 8.0.0 | [Migration Guide - Discount](../module_migration_guides/mg-discount.htm) |
| spryker/discount-promotion | 2.0.0 | [Migration Guide - DiscountPromotion](../module_migration_guides/mg-discount-promotion.htm) |
| spryker/manual-order-entry-gui | 0.6.0 | [Migration Guide - ManualOrderEntryGui](../module_migration_guides/mg-manual-order-entry-gui.htm) |
| spryker/offer | 0.2.0 | [Migration Guide - Offer](../module_migration_guides/mg-offer.htm) |
| spryker/offer-gui | 0.2.0 | [Migration Guide - OfferGui](../module_migration_guides/mg-offer-gui.htm) |
| spryker/oms | 9.0.0 | [Migration Guide - Oms](../module_migration_guides/mg-oms.htm) |
| spryker/orders-rest-api | 2.0.0 | [Migration Guide - OrdersRestApi](../module_migration_guides/glue_api/ordersrestapi-migration-guide.htm) |
| spryker/persistent-cart | 2.0.0 | [Migration Guide - PersistentCart](../module_migration_guides/mg-persistent-cart.htm) |
| spryker/price-cart-connector | 5.0.0 | [Migration Guide - PriceCartConnector](../module_migration_guides/mg-price-cart-connector.htm) |
| spryker/price-product | 3.0.0 | [Migration Guide - PriceProduct](../module_migration_guides/mg-priceproduct.htm) |
| spryker/price-product-storage | 3.0.0 | [Migration Guide - PriceProductStorage](../module_migration_guides/mg-price-product-storage.htm) |
| spryker/price-product-volume | 2.0.0 | [Migration Guide - PriceProductVolume](../module_migration_guides/mg-price-product-volume.htm) |
| spryker/price-product-volume-gui | 2.0.0 | [Migration Guide - PriceProductVolumeGui](../module_migration_guides/mg-price-product-volume-gui.htm) |
| spryker/product-availabilities-rest-api | 2.0.0 | [Migration Guide - ProductAvailabilitiesRestApi](../module_migration_guides/glue_api/productavailabilitiesrestapi-migration-guide.htm) |
| spryker/product-bundle | 5.0.0 | [Migration Guide - ProductBundle](../module_migration_guides/mg-product-bundle.htm) |
| spryker/product-discount-connector | 4.0.0 | [Migration Guide - ProductDiscountConnector](../module_migration_guides/mg-product-discount-connector.htm) |
| spryker/product-label-discount-connector | 2.0.0 | [Migration Guide - ProductLabelDiscountConnector](../module_migration_guides/mg-product-label-discount-connector.htm) |
| spryker/product-management | 0.17.0 | [Migration Guide - ProductManagement](../module_migration_guides/mg-product-management.htm) |
| spryker/product-measurement-unit | 3.0.0 | [Migration Guide - ProductMeasurementUnit](../module_migration_guides/mg-product-measurement-unit.htm) |
| spryker/product-option | 7.0.0 | [Migration Guide - ProductOption](../module_migration_guides/mg-product-option.htm) |
| spryker/product-option-cart-connector | 6.0.0 | [Migration Guide - ProductOptionCartConnector](../module_migration_guides/mg-product-option-cart-connector.htm) |
| spryker/product-packaging-unit | 2.0.0 | [Migration Guide - ProductPackagingUnit](../module_migration_guides/mg-product-packaging-unit.htm) |
| spryker/product-packaging-unit-storage | 3.0.0 | [Migration Guide - ProductPackagingUnitStorage](../module_migration_guides/mg-product-packaging-unit-storage.htm) |
| spryker/product-quantity | 2.0.0 | [Migration Guide - ProductQuantity](../module_migration_guides/mg-product-quantity.htm) |
| spryker/product-quantity-data-import | 2.0.0 | [Migration Guide - ProductQuantityDataImport](../module_migration_guides/mg-product-quantity-data-import.htm) |
| spryker/product-quantity-storage | 2.0.0 | [Migration Guide - ProductQuantityStorage](../module_migration_guides/mg-product-quantity-storage.htm) |
| spryker/quick-order | 2.0.0 | [Migration Guide - QuickOrder](../module_migration_guides/mg-quick-order.htm) |
| spryker/sales | 9.0.0 | [Migration Guide - Sales](../module_migration_guides/mg-sales.htm) |
| spryker/sales-quantity | 2.0.0 | [Migration Guide - SalesQuantity](../module_migration_guides/mg-sales-quantity.htm) |
| spryker/sales-split | 4.0.0 | [Migration Guide - SalesSplit](../module_migration_guides/mg-sales-split.htm) |
| spryker/shipment-discount-connector | 2.0.0 | [Migration Guide - ShipmentDiscountConnector](../module_migration_guides/mg-shipment-discount-connector.htm) |
| spryker/shopping-list | 3.0.0 | [Migration Guide - ShoppingList](../module_migration_guides/mg-shopping-list.htm) |
| spryker/stock | 6.0.0 | [Migration Guide - Stock](../module_migration_guides/mg-stock.htm) |
| spryker/stock-sales-connector | 4.0.0 | [Migration Guide - StockSalesConnector](../module_migration_guides/mg-stock-sales-connector.htm) |
| spryker/wishlist | 7.0.0 | [Migration Guide - WishList](../module_migration_guides/mg-wishlist.htm) |
| spryker-shop/cart-page | 2.0.0 | [Migration Guide - CartPage](../module_migration_guides/mg-cart-page.htm) |
| spryker-shop/customer-reorder-widget | 5.0.0 | [Migration Guide - CustomerReorderWidget](../module_migration_guides/mg-customer-reorder-widget.htm) |
| spryker-shop/discount-promotion-widget | 2.0.0 | [Migration Guide - DiscountPromotionWidget](../module_migration_guides/mg-discount-promotion-widget.htm) |
| spryker-shop/product-detail-page | 2.0.0 | [Migration Guide - ProductDetailPage](../module_migration_guides/mg-product-details-page.htm) |
| spryker-shop/product-measurement-unit-widget | 0.7.0 | [Migration Guide - ProductMeasurementUnitWidget](../module_migration_guides/mg-product-measurement-unit-widget.htm) |
| spryker-shop/product-packaging-unit-widget | 0.3.0 | [Migration Guide - ProductPackagingUnitWidget](../module_migration_guides/mg-product-packaging-unit-widget.htm) |
| spryker-shop/product-search-widget | 2.0.0 | [Migration Guide - ProductSearchWidget](../module_migration_guides/mg-product-search-widget.htm) |
| spryker-shop/quick-order-page | 3.0.0 | [Migration Guide - QuickOrderPage](../module_migration_guides/mg-quick-order-page.htm) |
| spryker-shop/shopping-list-page | 0.7.0 | [Migration Guide - ShoppingListPage](../module_migration_guides/mg-shopping-list-page.htm) |
| spryker-shop/shopping-list-widget | 0.5.0 | [Migration Guide - ShoppingListWidget](../module_migration_guides/mg-shopping-list-widget.htm) |
    
 </details>   
