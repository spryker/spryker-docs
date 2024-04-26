---
title: Execution order of data importers
last_updated: Apr 27, 2023
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/execution-order-of-data-importers-in-demo-shop
originalArticleId: 976a9f67-fc56-4fb7-811e-f30a2842e5d0
redirect_from:
  - /docs/scos/dev/data-import/202311.0/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
  - /docs/scos/dev/tutorials/201903.0/howtos/feature-howtos/howto-import-merchants-and-merchant-relations.html
  - /docs/scos/dev/data-import/202204.0/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

When setting up a Spryker Demo Shop, a data content sample is imported while executing a sequence of data importers. The data importer is a PHP class that handles the data import. Each data importer uses a CSV file to load data that will then be imported into the Demo Shop databases. The importing order of the CSV files is dependent on the order in which the data importers are executed.

{% info_block infoBox "Info" %}

The order of data importers is defined in the [YML configuration file](/docs/dg/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html).

{% endinfo_block %}

This operation has some dependencies because data importers' execution follows certain precedences. For example, you can not import Concrete products before importing abstract products because concrete products can not exist without abstracts.

The following list illustrates the order followed to run the data importers and import the commerce shop configuration setup data, product catalog data, and other content.

* Commerce:
  * store: it's not a data importer; it's hardcoded.
  * [currency](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-currency.csv.html)
  * [customer](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/import-file-details-customer.csv.html)
  * [glossary](/docs/pbc/all/miscellaneous/{{page.version}}/import-and-export-data/import-file-details-glossary.csv.html)
  * [tax](/docs/pbc/all/tax-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html)
  * [shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment.csv.html)
  * [shipment-price](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment-price.csv.html)
  * [shipment-method-store](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment-method-store.csv.html)
  * [sales-order-threshold](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/import-and-export-data/import-file-details-sales-order-threshold.csv.html)
  * stock-store
  * [payment-method](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/import-and-export-data/import-file-details-payment-method.csv.html)
  * [payment-method-store](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/import-and-export-data/import-file-details-payment-method-store.csv.html)

* [Catalog](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-product-catalog-data.html):
  * [category-template](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category-template.csv.html)
  * [category](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category.csv.html)
  * [product-attribute-key](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-attribute-key.csv.html)
  * [product-management-attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-management-attribute.csv.html)
  * [product-abstract](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)
  * [product-abstract-store](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract-store.csv.html)
  * [product-concrete](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)
  * [product-image](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-image.csv.html)
  * [product-price](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-price.csv.html)
  * [product-price-schedule](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-price-schedule.csv.html)
  * [product-stock](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-data/file-details-product-stock.csv.html)
* Special Products:
  * [product-option](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html)
  * [product-option-price](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option-price.csv.html)
  * [Gift cards](/docs/pbc/all/gift-cards/{{page.version}}/import-and-export-data/import-gift-cards-data.html)
  * [gift-card-abstract-configuration](/docs/pbc/all/gift-cards/{{page.version}}/import-and-export-data/import-file-details-gift-card-abstract-configuration.csv.html)
  * [gift-card-concrete-configuration](/docs/pbc/all/gift-cards/{{page.version}}/import-and-export-data/import-file-details-gift-card-concrete-configuration.csv.html)
  * product-packaging-unit-type:
    * B2B shop: [product_packaging_unit_type.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/product_packaging_unit_type.csv)
    * B2B Marketplace: [product_packaging_unit_type.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/product_packaging_unit_type.csv)
  * product-packaging-unit:
    * B2B shop: [product_packaging_unit.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/product_packaging_unit.csv)
    * B2B Marketplace: [product_packaging_unit.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/product_packaging_unit.csv)
  * product-measurement-unit:
    * B2B shop: [product_measurement_unit.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/product_measurement_unit.csv)
    * B2B Marketplace: [product_measurement_unit.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/product_measurement_unit.csv)
  * [product-measurement-base-unit](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/product_measurement_base_unit.csv)
  * [product-measurement-sales-unit](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/product_measurement_sales_unit.csv)
  * product-measurement-sales-unit-store
  * configurable-bundle-template:
    * B2C shop: [configurable_bundle_template.csv](https://github.com/spryker-shop/b2c-demo-shop/blob/master/data/import/common/common/configurable_bundle_template.csv)
    * B2B shop: [configurable_bundle_template.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/configurable_bundle_template.csv)
    * B2C Marketplace: [configurable_bundle_template.csv](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/data/import/common/common/configurable_bundle_template.csv)
    * B2B Marketplace: [configurable_bundle_template.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/configurable_bundle_template.csv)
  * configurable-bundle-template-slot:
    * B2C shop: [configurable_bundle_template_slot.csv](https://github.com/spryker-shop/b2c-demo-shop/blob/master/data/import/common/common/configurable_bundle_template_slot.csv)
    * B2B shop: [configurable_bundle_template_slot.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/configurable_bundle_template_slot.csv)
    * B2C Marketplace: [configurable_bundle_template_slot.csv](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/data/import/common/common/configurable_bundle_template_slot.csv)
    * B2B Marketplace: [configurable_bundle_template_slot.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/configurable_bundle_template_slot.csv)
  * configurable-bundle-template-image:
    * B2C shop: [configurable_bundle_template_image.csv](https://github.com/spryker-shop/b2c-demo-shop/blob/master/data/import/common/common/configurable_bundle_template_image.csv)
    * B2B shop: [configurable_bundle_template_image.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/configurable_bundle_template_image)
    * B2C Marketplace: [configurable_bundle_template_image.csv](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/data/import/common/common/configurable_bundle_template_image.csv)
    * B2B Marketplace: [configurable_bundle_template_image.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/configurable_bundle_template_image.csv)
* Merchandising:
  * [discount](/docs/pbc/all/discount-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-discount.csv.html)
  * [discount-store](/docs/pbc/all/discount-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-discount-store.csv.html)
  * [discount-voucher](/docs/pbc/all/discount-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-discount-voucher.csv.html)
  * [product-group](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-group.csv.html)
  * [product-relation](/docs/pbc/all/product-relationship-management/{{page.version}}/import-file-details-product-relation.csv.html)
  * [product-review](/docs/pbc/all/ratings-reviews/{{page.version}}/import-and-export-data/import-file-details-product-review.csv.html)
  * [product-label](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-label.csv.html)
  * [product-set](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-set.csv.html)
  * [product-search-attribute-map](/docs/pbc/all/search/{{page.version}}/base-shop/import-data/file-details-product-search-attribute-map.csv.html)
  * [product-search-attribute](/docs/pbc/all/search/{{page.version}}/base-shop/import-data/file-details-product-search-attribute.csv.html)
  * [discount-amount](/docs/pbc/all/discount-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-discount-amount.csv.html)
  * [product-discontinued](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-discontinued.csv.html)
  * [product-alternative](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-alternative.csv.html)
  * [product-quantity](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-quantity.csv.html)
  * product-list:
    * B2C shop: [prodict_list.csv](https://github.com/spryker-shop/b2c-demo-shop/blob/master/data/import/common/common/product_list.csv)
    * B2B shop: [prodict_list.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/product_list.csv)
    * B2C Marketplace: [prodict_list.csv](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/data/import/common/common/product_list.csv)
    * B2B Marketplace: [product_list_to_concrete_product.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/product_list_to_concrete_product.csv)
  * product-list-category:
    * B2C shop: [product_list_to_category.csv](https://github.com/spryker-shop/b2c-demo-shop/blob/master/data/import/common/common/product_list_to_category.csv)
    * B2B shop: [product_list_to_category.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/product_list_to_category.csv)
    * B2C Marketplace: [product_list_to_category.csv](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/data/import/common/common/product_list_to_category.csv)
    * B2B Marketplace: [product_list_to_category.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/product_list_to_category.csv)
  * product-list-product-concrete:
    * B2C shop: [product_list_to_concrete_product.csv](https://github.com/spryker-shop/b2c-demo-shop/blob/master/data/import/common/common/product_list_to_concrete_product.csv)
    * B2B shop: [product_list_to_concrete_product.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/product_list_to_concrete_product.csv)
    * B2C Marketplace: [product_list_to_concrete_product.csv](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/data/import/common/common/product_list_to_concrete_product.csv)
    * B2B Marketplace: [product_list_to_concrete_product.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/product_list_to_concrete_product.csv)
* Navigation:
  * [navigation](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html)
  * [navigation-node](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation-node.csv.html)
* Content Management:
* [cms-template](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-template.csv.html)
* [cms-block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block.csv.html)
* [cms-block-store](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-store.csv.html)
* [cms-block-category-position](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-category-postion.csv.html)
* [cms-block-category](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-category.csv.html)
* [content-banner](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-banner.csv.html)
* [content-product-abstract-list](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-abstract-list.csv.html)
* [content-product-set](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-set.csv.html)
* [cms-page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-page.csv.html)
* [cms-page-store](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-page-store.csv.html)
* [cms-slot-template](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot-template.csv.html)
* [cms-slot](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot.csv.html)
* [cms-slot-block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot-block.csv.html)
* B2B Company:
  * company:
    * B2B shop: [company.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/company.csv)
    * B2B Marketplace: [company.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/company.csv)
  * company-business-unit
  * company-unit-address
  * company-unit-address-label
  * company-unit-address-label-relation
  * company-user
  * company-role
  * company-role-permission
  * company-user-role
  * company-business-unit-user
  * company-business-unit-address
  * company-user-on-behalf
* B2B Merchant
  * [merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html)
  * [merchant-profile](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-profile.csv.html)
  * [merchant-profile-address](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-profile-address.csv.html)
  * [merchant-product-offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html)
  * [merchant-product-offer-store](/docs/pbc/all/offer-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-offer-store.csv.html)
  * [merchant-open-hours-weekday-schedule](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-open-hours-week-day-schedule.csv.html)
  * [merchant-open-hours-date-schedule](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-open-hours-date-schedule.csv.html)
  * [product-offer-validity](/docs/pbc/all/offer-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-product-offer-validity.csv.html)
  * [price-product-offer](/docs/pbc/all/price-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-price-product-offer.csv.html)
  * [product-offer-stock](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/import-and-export-data/import-file-details-product-offer-stock.csv.html)
  * [merchant-stock](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-stock.csv.html)
  * merchant-relationship
  * merchant-relationship-sales-order-threshold
  * merchant-relationship-product-list
  * product-price-merchant-relationship
* B2B Shopping List:
  * shopping-list:
    * B2B shop: [shopping_list.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/shopping_list.csv)
    * B2B Marketplace: [shopping_list.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/shopping_list.csv)
  * shopping-list-item
    * B2C shop: [shopping_list_item.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/shopping_list_item.csv)
    * B2B Marketplace: [shopping_list_item.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/shopping_list_item.csv)
  * shopping-list-company-user
    * B2C shop: [shopping_list_company_user.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/shopping_list_company_user.csv)
    * B2B Marketplace: [shopping_list_company_user.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/shopping_list_company_user.csv)
  * shopping-list-company-business-unit
    * B2C shop: [shopping_list_company_business_unit.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/shopping_list_company_business_unit.csv)
    * B2B Marketplace: [shopping_list_company_business_unit.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/shopping_list_company_business_unit.csv)
* B2B Miscellaneous
  * multi-cart
  * shared-cart
  * quote-request:
    * B2B shop: [quote_request.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/quote_request.csv)
    * B2B Marketplace: [quote_request.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/quote_request.csv)
  * quote-request-version:
    * B2B shop: [quote_request_version.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/quote_request_version.csv)
    * B2B Marketplace: [quote_request_version.csv](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/data/import/common/common/quote_request_version.csv)
