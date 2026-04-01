---
title: Update the INSPINIA theme in the Back Office
description: Learn how to update the INSPINIA theme in the Back Office
last_updated: Apr 1, 2026
template: howto-guide-template
---

The Spryker Back Office uses the INSPINIA admin theme for styling. If your project uses an older INSPINIA version, update to modernize the UI foundation and reduce front-end maintenance overhead.

To update the INSPINIA theme to version 5.0.0 in the Back Office, complete the following steps:

## 1. Update required modules

Update minor versions first:

```bash
composer update --ignore-platform-req=ext-grpc spryker/acl spryker/agent-gui spryker/analytics-gui spryker/api-key-gui spryker/availability-gui spryker/category-gui spryker/category-image-gui spryker/cms spryker/cms-block-category-connector spryker/cms-block-gui spryker/cms-block-product-connector spryker/cms-content-widget spryker/cms-gui spryker/cms-slot-block-gui spryker/cms-slot-block-product-category-gui spryker/cms-slot-gui spryker/collector spryker/comment-gui spryker/comment-sales-connector spryker/company-business-unit-gui spryker/company-gui spryker/company-gui-extension spryker/company-role-gui spryker/company-unit-address-gui spryker/company-unit-address-gui-extension spryker/company-unit-address-label spryker/company-user-gui spryker/configurable-bundle-gui spryker/content-file-gui spryker/content-gui spryker/content-navigation-gui spryker/content-product-gui spryker/content-product-set-gui spryker/country spryker/country-gui spryker/currency-gui spryker/customer spryker/customer-group spryker/customer-note-gui spryker/customer-user-connector-gui spryker/dashboard spryker/data-import-merchant-portal-gui spryker/development spryker/discount spryker/discount-promotion spryker/dynamic-entity-gui spryker/file-manager-gui spryker/glossary spryker/locale-gui spryker/merchant-agent-gui spryker/merchant-commission-gui spryker/merchant-gui spryker/merchant-product-offer-gui spryker/merchant-profile-gui spryker/merchant-profile-merchant-portal-gui spryker/merchant-registration-request spryker/merchant-relation-request-gui spryker/merchant-relationship-gui spryker/merchant-relationship-product-list-gui spryker/merchant-relationship-sales-order-threshold-gui spryker/merchant-sales-order-merchant-user-gui spryker/merchant-sales-return-merchant-user-gui spryker/merchant-stock-gui spryker/merchant-user-gui spryker/money spryker/money-gui spryker/multi-factor-auth spryker/navigation-gui spryker/oms spryker/order-custom-reference-gui spryker/payment-gui spryker/price-product-merchant-relationship-gui spryker/price-product-merchant-relationship-merchant-portal-gui spryker/price-product-offer-gui spryker/price-product-schedule-gui spryker/price-product-volume-gui spryker/product-alternative-gui spryker/product-approval-gui spryker/product-attribute-gui spryker/product-barcode-gui spryker/product-category spryker/product-category-filter-gui spryker/product-label-gui spryker/product-list-gui spryker/product-management spryker/product-measurement-unit-gui spryker/product-merchant-portal-gui spryker/product-offer-gui spryker/product-offer-service-point-gui spryker/product-offer-shipment-type-gui spryker/product-offer-validity-gui spryker/product-option spryker/product-relation-gui spryker/product-review-gui spryker/product-search spryker/product-set-gui spryker/queue spryker/refund spryker/sales spryker/sales-order-threshold-gui spryker/sales-reclamation-gui spryker/sales-return-gui spryker/sales-service-point-gui spryker/search spryker/search-elasticsearch-gui spryker/security-gui spryker/shipment spryker/shipment-gui spryker/state-machine spryker/stock-gui spryker/storage spryker/storage-gui spryker/store-context-gui spryker/store-gui spryker/tax spryker/user spryker/user-locale-gui spryker/user-merchant-portal-gui spryker/zed-navigation spryker-feature/self-service-portal
```

Then update major versions:

```bash
composer require --update-with-dependencies --ignore-platform-req=ext-grpc \
spryker-feature/spryker-core:"dev-master as 202602.0" \
spryker-feature/spryker-core-back-office:"dev-master as 202602.0"
```

## 2. Update npm dependencies

```bash
docker/sdk console frontend:project:install-dependencies
```

## 3. Clear the application cache

```bash
docker/sdk console c:e
```

## 4. Build JavaScript and CSS assets

```bash
docker/sdk console frontend:zed:build
```
