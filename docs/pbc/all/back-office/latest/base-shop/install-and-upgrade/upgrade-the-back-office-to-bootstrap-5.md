---
title: Upgrade the Back Office to Bootstrap 5
description: Learn how to migrate Spryker Back Office to Bootstrap 5 by updating dependencies and assets.
last_updated: Feb 19, 2026
template: howto-guide-template
---

To migrate your Back Office to Bootstrap 5, complete the following steps:

1. Update the required modules:

First minor releases:

```bash
composer update --ignore-platform-req=ext-grpc spryker/acl spryker/analytics-gui spryker/category-gui spryker/category-image-gui spryker/product-category spryker/cms spryker/cms-block-gui spryker/cms-content-widget spryker/cms-gui spryker/cms-slot-block-gui spryker/cms-slot-block-product-category-gui spryker/cms-slot-gui spryker/content-file-gui spryker/content-product-gui spryker/content-product-set-gui spryker/comment-gui spryker/comment-sales-connector spryker/company-business-unit-gui spryker/company-gui spryker/company-role-gui spryker/company-unit-address-gui spryker/company-unit-address-label spryker/company-user-gui spryker/customer spryker/customer-group spryker/customer-note-gui spryker/dynamic-entity-gui spryker/development spryker/gift-card-balance spryker/merchant-stock-gui spryker/merchant-profile-gui spryker/merchant-profile-merchant-portal-gui spryker/merchant-registration-request spryker/merchant-user-gui spryker/sales-merchant-commission spryker/sales-merchant-commission-merchant-portal-gui spryker/price-product spryker/price-product-merchant-relationship-merchant-portal-gui spryker/product-merchant-portal-gui spryker/merchant-sales-order-threshold-gui spryker/user-merchant-portal-gui spryker/oms spryker/sales spryker/product-search spryker/product-option spryker/discount spryker/discount-promotion spryker/shipment spryker/product-measurement-unit-gui spryker/merchant-relationship-gui spryker/price-product-merchant-relationship-gui spryker/merchant-relationship-sales-order-threshold-gui spryker/merchant-relationship-product-list-gui spryker/content-navigation-gui spryker/order-custom-reference-gui spryker/currency-gui spryker/price-product-volume-gui spryker/product-barcode-gui spryker/product-review-gui spryker/refund spryker/search spryker/sales-service-point-gui spryker/api-key-gui spryker/country spryker/country-gui spryker/glossary spryker/multi-factor-auth-merchant-portal spryker/setup spryker/storage spryker/store-context-gui spryker/dashboard spryker/user spryker/user-locale-gui spryker/state-machine spryker/tax spryker/cms-block-category-connector spryker/cms-block-product-connector spryker/collector spryker/collector-storage-connector spryker/company-gui-extension spryker/company-supplier-gui spryker/company-unit-address-gui-extension spryker/data-import-merchant-portal-gui spryker/dataset spryker/money-gui spryker/queue spryker/manual-order-entry-gui
```

Then major releases (remove not used features from the list):

```bash
composer require --update-with-dependencies --ignore-platform-req=ext-grpc \
spryker/customer-user-connector-gui:"^2.0.0" \
spryker/storage-gui:"^2.0.0" \
spryker-feature/agent-assist:"{{page.release_tag}}" \
spryker-feature/alternative-products:"{{page.release_tag}}" \
spryker-feature/checkout:"{{page.release_tag}}" \
spryker-feature/cms:"{{page.release_tag}}" \
spryker-feature/configurable-bundle:"{{page.release_tag}}" \
spryker-feature/file-manager:"{{page.release_tag}}" \
spryker-feature/inventory-management:"{{page.release_tag}}" \
spryker-feature/marketplace-agent-assist:"{{page.release_tag}}" \
spryker-feature/marketplace-inventory-management:"{{page.release_tag}}" \
spryker-feature/marketplace-merchant-commission:"{{page.release_tag}}" \
spryker-feature/marketplace-order-management:"{{page.release_tag}}" \
spryker-feature/marketplace-product-offer:"{{page.release_tag}}" \
spryker-feature/marketplace-product-offer-prices:"{{page.release_tag}}" \
spryker-feature/marketplace-return-management:"{{page.release_tag}}" \
spryker-feature/marketplace-shipment:"{{page.release_tag}}" \
spryker-feature/merchant:"{{page.release_tag}}" \
spryker-feature/merchant-contract-requests:"{{page.release_tag}}" \
spryker-feature/navigation:"{{page.release_tag}}" \
spryker-feature/payments:"{{page.release_tag}}" \
spryker-feature/product:"{{page.release_tag}}" \
spryker-feature/product-approval-process:"{{page.release_tag}}" \
spryker-feature/product-labels:"{{page.release_tag}}" \
spryker-feature/product-lists:"{{page.release_tag}}" \
spryker-feature/product-relations:"{{page.release_tag}}" \
spryker-feature/product-sets:"{{page.release_tag}}" \
spryker-feature/reclamations:"{{page.release_tag}}" \
spryker-feature/return-management:"{{page.release_tag}}" \
spryker-feature/scheduled-prices:"{{page.release_tag}}" \
spryker-feature/search:"{{page.release_tag}}" \
spryker-feature/shipment:"{{page.release_tag}}" \
spryker-feature/spryker-core:"{{page.release_tag}}" \
spryker-feature/spryker-core-back-office:"{{page.release_tag}}" \
spryker-feature/product-offer-shipment:"{{page.release_tag}}" \
spryker-feature/product-offer-service-points:"{{page.release_tag}}" \
spryker-feature/warehouse-user-management:"{{page.release_tag}}"
```

{% info_block infoBox "" %}
Bootstrap 5 support was added originally in the release 202507.0
All essential components were released in [spryker/gui:3.59.0](https://github.com/spryker/gui/releases/tag/3.59.0).
{% endinfo_block %}

2. Update the `@spryker/oryx-for-zed` dependency:

```bash
  npm install @spryker/oryx-for-zed@~3.5.0 --save-dev
```

3. Clear the application cache:

```bash
  docker/sdk console c:e
```

4. Run the Twig cache warmer:

```bash
  docker/sdk console t:c:w
```

5. Build the JavaScript and CSS assets to apply the Bootstrap 5 updates:

```bash
docker/sdk cli npm run zed
```

{% info_block warningBox "Verification" %}

⚡️ **Summary of grid class updates**

| **Bootstrap 3**                    |**Bootstrap 5 replacement**| **Notes**                 |
| ---------------------------------- | ------------------------- | ------------------------- |
| `.col-xs-*`                        | `.col-*`                  | Replaced, "xs" dropped    |
| `.col-sm-*`                        | `.col-sm-*`               | Same                      |
| `.col-md-*`                        | `.col-md-*`               | Same                      |
| `.col-lg-*`                        | `.col-lg-*`               | Same                      |
| *(none)*                           | `.col-xl-*`, `.col-xxl-*` | New breakpoints           |
| `.col-md-offset-*`                 | `.offset-md-*`            | New syntax                |
| `.col-md-push-*`, `.col-md-pull-*` | `.order-md-*`             | Flexbox ordering          |
| `.row-no-gutters`                  | `.g-0`                    | Simplified gutter control |

⚡️ **HTML attribute changes for JavaScript components**

| **Bootstrap 3 attribute**                 | **Bootstrap 5 equivalent**                      | **Notes and changes**                                         |
| ----------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| `data-toggle="modal"`                     | `data-bs-toggle="modal"`                        | All JS data attributes now start with `data-bs-*`           |
| `data-target="#myModal"`                  | `data-bs-target="#myModal"`                     | Updated prefix to `data-bs-`                                |
| `data-toggle="dropdown"`                  | `data-bs-toggle="dropdown"`                     | Same behavior, new prefix                                   |
| `data-toggle="collapse"`                  | `data-bs-toggle="collapse"`                     | Required for collapsible elements                           |
| `data-target="#menu"`                     | `data-bs-target="#menu"`                        | Used with dropdowns, collapse, offcanvas, etc.              |
| `data-toggle="tab"`                       | `data-bs-toggle="tab"`                          | For tab navigation                                          |
| `data-toggle="tooltip"`                   | `data-bs-toggle="tooltip"`                      | Still requires JS initialization via `Tooltip` class        |
| `data-toggle="popover"`                   | `data-bs-toggle="popover"`                      | Still requires JS initialization via `Popover` class        |
| `data-dismiss="alert"`                    | `data-bs-dismiss="alert"`                       | For closing alerts                                          |
| `data-dismiss="modal"`                    | `data-bs-dismiss="modal"`                       | For closing modals                                          |
| `data-dismiss="toast"`                    | `data-bs-dismiss="toast"`                       | New in Bootstrap 4+, same pattern                           |
| *(none)*                                  | `data-bs-spy="scroll"`                          | Scrollspy syntax updated from `data-spy` to `data-bs-spy`   |
| `data-offset-top` / `data-offset-bottom`  | *(Removed)*                                     | Scrollspy offset handled via JS or CSS, not data attributes |
| `data-ride="carousel"`                    | `data-bs-ride="carousel"`                       | For auto-sliding carousels                                  |
| `data-slide="next"` / `data-slide="prev"` | `data-bs-slide="next"` / `data-bs-slide="prev"` | For carousel controls                                       |
| `data-slide-to="0"`                       | `data-bs-slide-to="0"`                          | For carousel indicators                                     |
| `data-interval="5000"`                    | `data-bs-interval="5000"`                       | Same meaning, updated prefix                                |
| `data-pause="hover"`                      | `data-bs-pause="hover"`                         | Carousel pause behavior                                     |
| `data-keyboard="true"`                    | `data-bs-keyboard="true"`                       | For modals and carousels                                    |
| `data-backdrop="static"`                  | `data-bs-backdrop="static"`                     | For modal backdrop behavior                                 |
| `data-toggle="button"`                    | `data-bs-toggle="button"`                       | For toggling active button states                           |
| *(none)*                                  | `data-bs-toggle="offcanvas"`                    | New in Bootstrap 5 for offcanvas menus                      |

{% endinfo_block %}
