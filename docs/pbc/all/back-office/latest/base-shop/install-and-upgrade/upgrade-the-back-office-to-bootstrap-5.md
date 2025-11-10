---
title: Upgrade the Back Office to Bootstrap 5
description: Learn how to migrate Spryker Back Office to Bootstrap 5 by updating dependencies and assets.
last_updated: Nov 10, 2025
template: howto-guide-template
---

To migrate the Back Office to Bootstrap version 5, follow these steps:

1. Update the required modules:

```bash
composer require --with-dependencies spryker/agent-gui:"^2.0.0" spryker/availability-gui:"^7.0.0" spryker/configurable-bundle-gui:"^2.0.0" spryker/content-gui:"^3.0.0" spryker/customer-user-connector-gui:"^2.0.0" spryker/file-manager-gui:"^3.0.0" spryker/gui:"^4.0.0" spryker/locale-gui:"^2.0.0" spryker/merchant-agent-gui:"^2.0.0" spryker/merchant-commission-gui:"^2.0.0" spryker/merchant-gui:"^4.0.0" spryker/merchant-product-offer-gui:"^2.0.0" spryker/merchant-relation-request-gui:"^2.0.0" spryker/merchant-sales-order-merchant-user-gui:"^2.0.0" spryker/merchant-sales-return-merchant-user-gui:"^2.0.0" spryker/multi-factor-auth:"^2.0.0" spryker/navigation-gui:"^3.0.0" spryker/payment-gui:"^2.0.0" spryker/price-product-offer-gui:"^2.0.0" spryker/price-product-schedule-gui:"^3.0.0" spryker/product-alternative-gui:"^2.0.0" spryker/product-approval-gui:"^2.0.0" spryker/product-attribute-gui:"^2.0.0" spryker/product-category-filter-gui:"^3.0.0" spryker/product-label-gui:"^4.0.0" spryker/product-list-gui:"^3.0.0" spryker/product-management:"^0.20.0" spryker/product-offer-gui:"^2.0.0" spryker/product-offer-service-point-gui:"^2.0.0" spryker/product-offer-shipment-type-gui:"^2.0.0" spryker/product-offer-validity-gui:"^2.0.0" spryker/product-relation-gui:"^2.0.0" spryker/product-set-gui:"^3.0.0" spryker/sales-order-threshold-gui:"^2.0.0" spryker/sales-reclamation-gui:"^2.0.0" spryker/sales-return-gui:"^2.0.0" spryker/search-elasticsearch-gui:"^2.0.0" spryker/security-gui:"^2.0.0" spryker/shipment-gui:"^3.0.0" spryker/spryker-feature.self-service-portal:"^16.0.0" spryker/stock-gui:"^3.0.0" spryker/storage-gui:"^2.0.0" spryker/store-gui:"^2.0.0" spryker/warehouse-user-gui:"^2.0.0"
```

2. Update the `oryx-for-zed` dependency:

```bash
  npm install @spryker/oryx-for-zed@~3.5.0 --save-dev
```

3. Clear the cache:

```bash
  docker/sdk console c:e
```

4. Run the Twig cache warmer:

```bash
  docker/sdk console t:c:w
```

5. Build the JavaScript and CSS assets:

```bash
docker/sdk cli npm run zed
```

{% info_block warningBox "Verification" %}

⚡️ Summary of grid class updates
| Bootstrap 3                        | Bootstrap 5 Replacement   | Notes                     |
| ---------------------------------- | ------------------------- | ------------------------- |
| `.col-xs-*`                        | `.col-*`                  | Replaced, “xs” dropped    |
| `.col-sm-*`                        | `.col-sm-*`               | Same                      |
| `.col-md-*`                        | `.col-md-*`               | Same                      |
| `.col-lg-*`                        | `.col-lg-*`               | Same                      |
| *(none)*                           | `.col-xl-*`, `.col-xxl-*` | New breakpoints           |
| `.col-md-offset-*`                 | `.offset-md-*`            | New syntax                |
| `.col-md-push-*`, `.col-md-pull-*` | `.order-md-*`             | Flexbox ordering          |
| `.row-no-gutters`                  | `.g-0`                    | Simplified gutter control |

⚡️ HTML attribute changes for JavaScript components
| **Bootstrap 3 Attribute**                 | **Bootstrap 5 Equivalent**                      | **Notes / Changes**                                         |
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
