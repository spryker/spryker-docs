---
title: Float stock for products migration concept
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/float-stock-for-products
originalArticleId: 741857cb-b4b4-4132-afbf-1aa5171cf35d
redirect_from:
  - /2021080/docs/float-stock-for-products
  - /2021080/docs/en/float-stock-for-products
  - /docs/float-stock-for-products
  - /docs/en/float-stock-for-products
  - /v6/docs/float-stock-for-products
  - /v6/docs/en/float-stock-for-products
  - /v5/docs/float-stock-for-products
  - /v5/docs/en/float-stock-for-products
  - /v4/docs/float-stock-for-products
  - /v4/docs/en/float-stock-for-products
  - /v3/docs/float-stock-for-products
  - /v3/docs/en/float-stock-for-products
  - /v2/docs/float-stock-for-products
  - /v2/docs/en/float-stock-for-products
  - /v1/docs/float-stock-for-products
  - /v1/docs/en/float-stock-for-products
  - /docs/scos/dev/migration-concepts/float-stock-for-products-migration-concept.html
related:
  - title: CRUD Scheduled Prices migration concept
    link: docs/pbc/all/price-management/page.version/base-shop/install-and-upgrade/upgrade-modules/upgrade-to-crud-scheduled-prices.html
  - title: Decimal Stock migration concept
    link: docs/pbc/all/product-information-management/page.version/base-shop/install-and-upgrade/decimal-stock-migration-concept.html
  - title: Migrating from Twig v1 to Twig v3
    link: docs/scos/dev/migration-concepts/migrating-from-twig-v1-to-twig-v3.html
  - title: Split Delivery migration concept
    link: docs/pbc/all/order-management-system/page.version/base-shop/install-and-upgrade/split-delivery-migration-concept.html
  - title: Silex Replacement migration concept
    link: docs/scos/dev/migration-concepts/silex-replacement/silex-replacement.html
---

We have changed the type of stock and quantity fields from int to float. With this change, we allow to manage fractions of items in the system.

As stock and quantity are very basic concepts of any commerce system, changing their type is a horizontal barrier for the modules. This means that, if a module is upgraded to a version that uses float stock, all the other modules in the project which are involved in the float stock barrier must be upgraded to avoid accidental type incompatibilities. For example, if ModuleX uses float stock and ModuleY uses int stock and there is no hard dependency between them, it’s technically possible to upgrade only one of them, however, during runtime, both modules may happen to process the same request data and, as a result, the response will either be calculated incorrectly or a fatal error will be thrown due to a data type mismatch.

In case of upgrading one of the modules involved into the float stock concept, we strongly recommend upgrading all the modules in your project from the list below. Mostly, the migrations have very low or even zero effort, because they only break type of a transfer object or an internal function’s signature. Some modules changed database field types to DOUBLE which is automatically upgradable by running the necessary console commands.

{% info_block errorBox %}

If you upgrade to the float stock concept, you should also review your project code and make sure to adapt all stock and quantity related customizations and implementations to use float type accordingly. If you have any partner or ECO integrations, they might have to be adjusted too.

{% endinfo_block %}

Here are some typical occurrences of working with stocks and quantities and tips to make them compatible with the float type:

* Product stock and availability management - use `UtilQuantityService` to handle arithmetic operations with float quantity values.
* Cart item management - use `UtilQuantityService` to handle arithmetic operations with float quantity values.
* Price calculations - use `UtilPriceService` to handle rounding of price values in a centralized way and avoid handling money fractions.

## Migration Process

You can try to upgrade all affected modules together by following the steps below.

1. Update the modules:

```bash
composer update "spryker/*" "spryker-shop/*"
composer require spryker/availability:"^7.0.0" spryker/availability-cart-connector:"^5.0.0" spryker/availability-gui:"^4.0.0" spryker/availability-offer-connector:"^2.0.0" spryker/cart:"^6.0.0" spryker/cart-extension:"^3.0.0" spryker/carts-rest-api:"^4.0.0" spryker/checkout:"^5.0.0" spryker/discount:"^8.0.0" spryker/discount-promotion:"^2.0.0" spryker/manual-order-entry-gui:"^0.6.0" spryker/offer:"^0.2.0" spryker/offer-gui:"^0.2.0" spryker/oms:"^9.0.0" spryker/orders-rest-api:"^2.0.0" spryker/persistent-cart:"^2.0.0" spryker/price-cart-connector:"^5.0.0" spryker/price-product:"^3.0.0" spryker/price-product-storage:"^3.0.0" spryker/price-product-volume:"^2.0.0" spryker/price-product-volume-gui:"^2.0.0" spryker/product-availabilities-rest-api:"^2.0.0" spryker/product-bundle:"^5.0.0" spryker/product-discount-connector:"^4.0.0" spryker/product-label-discount-connector:"^2.0.0" spryker/product-management:"^0.17.0" spryker/product-measurement-unit:"^3.0.0" spryker/product-option:"^7.0.0" spryker/product-option-cart-connector:"^6.0.0" spryker/product-packaging-unit:"^2.0.0" spryker/product-packaging-unit-storage:"^3.0.0" spryker/product-quantity:"^2.0.0" spryker/product-quantity-data-import:"^2.0.0" spryker/product-quantity-storage:"^2.0.0" spryker/quick-order:"^2.0.0" spryker/sales:"^9.0.0" spryker/sales-quantity:"^2.0.0" spryker/sales-split:"^4.0.0" spryker/shipment-discount-connector:"^2.0.0" spryker/shopping-list:"^3.0.0" spryker/stock:"^6.0.0" spryker/stock-sales-connector:"^4.0.0" spryker/util-price:"^1.0.0" spryker/util-quantity:"^1.0.0" spryker/wishlist:"^7.0.0" spryker-shop/cart-page:"^2.0.0" spryker-shop/customer-reorder-widget:"^5.0.0" spryker-shop/discount-promotion-widget:"^2.0.0" spryker-shop/product-detail-page:"^2.0.0" spryker-shop/product-measurement-unit-widget:"^0.7.0" spryker-shop/product-packaging-unit-widget:"^0.3.0" spryker-shop/product-search-widget:"^2.0.0" spryker-shop/quick-order-page:"^3.0.0" spryker-shop/shopping-list-page:"^0.7.0" spryker-shop/shopping-list-widget:"^0.5.0" --update-with-dependencies
```

2. Run database migration:

```bash
console propel:install
console transfer:generate
```

3. Manually upgrade the following modules:

* `ProductQuantityStorage`
* `ShoppingListWidget`

You can find the affected modules of the float stock update in the following list.

<details open><summary markdown='span'>Affected modules</summary>


| OPERATOR | OPERATOR FOR PLAIN QUERY | MIGRATION GUIDE |
| --- | --- | --- |
| spryker/availability | 7.0.0 | [Upgrade the Availability module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availability-module.html) |
| spryker/availability-cart-connector | 5.0.0 | [Upgrade the AvailabilityCartConnector module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilitycartconnector-module.html) |
| spryker/availability-gui | 4.0.0 | [Upgrade the AvailabilityGui module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilitygui-module.html) |
| spryker/availability-offer-connector | 2.0.0 | [Upgrade the AvailabilityOfferConnector module](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-availabilityofferconnector-module.html) |
| spryker/cart | 6.0.0 | [Upgrade the Cart module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cart-module.html) |
| spryker/cart-extension | 3.0.0 | [Upgrade the CartExtension module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cartextension-module.html) |
| spryker/carts-rest-api | 4.0.0 | [Upgrade the CartsRestApi module](/docs/scos/dev/module-migration-guides/glue-api/cartsrestapi-migration-guide.html) |
| spryker/checkout | 5.0.0 | [Upgrade the Checkout module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-checkout-module.html) |
| spryker/discount | 8.0.0 | [Migration Guide - Discount](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discount-module.html) |
| spryker/discount-promotion | 2.0.0 | [Migration Guide - DiscountPromotion](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discountpromotion-module.html) |
| spryker/manual-order-entry-gui | 0.6.0 | [Migration Guide - ManualOrderEntryGui](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-manualorderentrygui-module.html) |
| spryker/offer | 0.2.0 | [Migration Guide - Offer](/docs/pbc/all/offer-management/{{page.version}}/base-shop/upgrade-modules/upgrade-the-offer-module.html) |
| spryker/offer-gui | 0.2.0 | [Migration Guide - OfferGui](/docs/pbc/all/offer-management/{{page.version}}/base-shop/upgrade-modules/upgrade-the-offergui-module.html) |
| spryker/oms | 9.0.0 | [Migration Guide - Oms](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-oms-module.html) |
| spryker/orders-rest-api | 2.0.0 | [Migration Guide - OrdersRestApi](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-ordersrestapi-module.html) |
| spryker/persistent-cart | 2.0.0 | [Migration Guide - PersistentCart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-persistentcart-module.html) |
| spryker/price-cart-connector | 5.0.0 | [Migration Guide - PriceCartConnector](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-pricecartconnector-module.html) |
| spryker/price-product | 3.0.0 | [Migration Guide - PriceProduct](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproduct-module.html) |
| spryker/price-product-storage | 3.0.0 | [Migration Guide - PriceProductStorage](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductstorage-module.html) |
| spryker/price-product-volume | 2.0.0 | [Migration Guide - PriceProductVolume](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductvolume-module.html) |
| spryker/price-product-volume-gui | 2.0.0 | [Migration Guide - PriceProductVolumeGui](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductvolumegui-module.html) |
| spryker/product-availabilities-rest-api | 2.0.0 | [Migration Guide - ProductAvailabilitiesRestApi](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productavailabilitiesrestapi-module.html) |
| spryker/product-bundle | 5.0.0 | [Migration Guide - ProductBundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productbundle-module.html) |
| spryker/product-discount-connector | 4.0.0 | [Migration Guide - ProductDiscountConnector](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productdiscountconnector-module.html) |
| spryker/product-label-discount-connector | 2.0.0 | [Upgrade the ProductLabelDiscountConnector module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabeldiscountconnector-module.html) |
| spryker/product-management | 0.17.0 | [Upgrade the ProductManagement module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productmanagement-module.html) |
| spryker/product-measurement-unit | 3.0.0 | [Migration Guide - ProductMeasurementUnit](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productmeasurementunit-module.html) |
| spryker/product-option | 7.0.0 | [Migration Guide - ProductOption](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productoption-module.html) |
| spryker/product-option-cart-connector | 6.0.0 | [Upgrade the ProductOptionCartConnector module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productoptioncartconnector-module.html) |
| spryker/product-packaging-unit | 2.0.0 | [Migration Guide - ProductPackagingUnit](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunit-module.html) |
| spryker/product-packaging-unit-storage | 3.0.0 | [Migration Guide - ProductPackagingUnitStorage](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunitstorage-module.html) |
| spryker/product-quantity | 2.0.0 | [Migration Guide - ProductQuantity](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productquantity-module.html) |
| spryker/product-quantity-data-import | 2.0.0 | [Migration Guide - ProductQuantityDataImport](/docs/scos/dev/module-migration-guides/migration-guide-productquantitydataimport.html) |
| spryker/product-quantity-storage | 2.0.0 | [Migration Guide - ProductQuantityStorage](/docs/scos/dev/module-migration-guides/migration-guide-productquantitystorage.html) |
| spryker/quick-order | 2.0.0 | [Migration Guide - QuickOrder](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-quickorderpage-module.html) |
| spryker/sales | 9.0.0 | [Migration Guide - Sales](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-sales-module.html) |
| spryker/sales-quantity | 2.0.0 | [Migration Guide - SalesQuantity](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-salesquantity-module.html) |
| spryker/sales-split | 4.0.0 | [Migration Guide - SalesSplit](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-salessplit-module.html) |
| spryker/shipment-discount-connector | 2.0.0 | [Migration Guide - ShipmentDiscountConnector](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shipmentdiscountconnector-module.html) |
| spryker/shopping-list | 3.0.0 | [Migration Guide - ShoppingList](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shoppinglistwidget-module.html) |
| spryker/stock | 6.0.0 | [Migration Guide - Stock](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-stock-module.html) |
| spryker/stock-sales-connector | 4.0.0 |  |
| spryker/wishlist | 7.0.0 | [Migration Guide - WishList](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-wishlist-module.html) |
| spryker-shop/cart-page | 2.0.0 | [Upgrade the CartPage module](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cartpage-module.html) |
| spryker-shop/customer-reorder-widget | 5.0.0 | [Migration Guide - CustomerReorderWidget](/docs/scos/dev/module-migration-guides/migration-guide-customerreorderwidget.html) |
| spryker-shop/discount-promotion-widget | 2.0.0 | [Migration Guide - DiscountPromotionWidget](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-discountpromotionwidget-module.html) |
| spryker-shop/product-detail-page | 2.0.0 | [Migration Guide - ProductDetailPage](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productdetailpage-module.html) |
| spryker-shop/product-measurement-unit-widget | 0.7.0 | [Migration Guide - ProductMeasurementUnitWidget](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productmeasurementunitwidget-module.html) |
| spryker-shop/product-packaging-unit-widget | 0.3.0 | [Migration Guide - ProductPackagingUnitWidget](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productpackagingunitwidget-module.html) |
| spryker-shop/product-search-widget | 2.0.0 | [Migration Guide - ProductSearchWidget](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productsearchwidget-module.html) |
| spryker-shop/quick-order-page | 3.0.0 | [Upgrade the QuickOrderPage module](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-quickorderpage-module.html) |
| spryker-shop/shopping-list-page | 0.7.0 | [Migration Guide - ShoppingListPage](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shoppinglistpage-module.html) |
| spryker-shop/shopping-list-widget | 0.5.0 | [Migration Guide - ShoppingListWidget](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-shoppinglistwidget-module.html) |

</details>   
