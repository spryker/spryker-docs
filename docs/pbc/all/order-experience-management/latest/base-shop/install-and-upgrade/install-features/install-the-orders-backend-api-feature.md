---
title: Install the Orders Backend API feature
description: Learn how to install the Orders Backend API into your Spryker project.
last_updated: Sep 15, 2026
template: feature-integration-guide-template
related:
  - title: "Backend API: Retrieve orders"
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html
  - title: "Backend API: Create an order"
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-create-an-order.html
---

This document describes how to install the Orders Backend API, which exposes placed sales orders over the Spryker Backend API: read them, create them, fire order-management (OMS) events on their line items, and read or add order comments.

The Orders Backend API is part of the same `spryker-feature/order-experience-management` package as the [Recurring Orders feature](/docs/pbc/all/order-experience-management/latest/base-shop/install-and-upgrade/install-features/install-the-recurring-orders-feature.html). If you already installed Recurring Orders, skip to [2) Install the API Platform module](#2-install-the-api-platform-module).

The write side (order intake) does not reimplement checkout: it assembles a quote from the request payload and hands it to the existing checkout flow, so an API-placed order goes through the same pre-condition plugins, calculation, OMS bootstrapping, and mail as one placed on the Storefront.

## Install feature core

Follow the steps below to install the Orders Backend API feature core.

### Prerequisites

To start feature integration, review and install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Checkout | {{page.release_tag}} | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Company Account | {{page.release_tag}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Purchasing Control | {{page.release_tag}} | [Install the Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html) |

{% info_block infoBox "Optional feature" %}

Purchasing Control is optional. Install it if you want `POST /orders` to accept a `budgetUuid` and charge the order against a budget. Without it, budget charging is unavailable and the `budget` attribute is not reported on reads.

{% endinfo_block %}

### 1) Install the required modules

{% info_block infoBox "Required modules" %}

```bash
composer require spryker-feature/order-experience-management:"^1.0.0" --update-with-dependencies
```

{% endinfo_block %}

The package requires `spryker/checkout`, `spryker/sales`, `spryker/oms`, `spryker/calculation`, `spryker/price-cart-connector`, `spryker/price-product`, `spryker/product-option`, `spryker/product-measurement-unit`, `spryker/product-packaging-unit`, `spryker/shipment`, `spryker/payment`, `spryker/cart-code`, `spryker/company-user`, `spryker/company-business-unit`, and `spryker/glue-application`, among others, so Composer installs them automatically with the command above.

### 2) Install the API Platform module

The Backend API endpoints run on API Platform, which `spryker-feature/order-experience-management` does not require unconditionally—install it explicitly:

{% info_block infoBox "Required modules" %}

```bash
composer require spryker/api-platform:"^1.0.0" --with-dependencies
```

{% endinfo_block %}

### 3) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following change has been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_sales_order.created_at | index | created |

Without this index, the `createdAtFrom` and `createdAtTo` filters and the `createdAt` sort on `GET /orders` scan the whole sales order table—typically the largest table in the system.

{% endinfo_block %}

### 4) Generate the API resources

The resource contracts live in the module at `src/SprykerFeature/OrderExperienceManagement/resources/api/backend/`. Regenerate the API Platform resource classes and drop the cached OpenAPI document:

```bash
GLUE_APPLICATION=GLUE_BACKEND vendor/bin/glue api:generate
GLUE_APPLICATION=GLUE_BACKEND vendor/bin/glue cache:clear
GLUE_APPLICATION=GLUE_BACKEND vendor/bin/glue cache:warmup
```

{% info_block warningBox "Verification" %}

Make sure `src/Generated/Api/Backend/` contains `OrdersResource.php`, `OrderTransitionsResource.php`, and `OrderCommentsResource.php`.

`api:generate` alone regenerates these classes but leaves the Swagger UI at `/docs` on the pre-edit OpenAPI document cache—`cache:clear` is the step that drops it.

{% endinfo_block %}

### 5) Set up behavior

Both plugin stacks below are optional and default to empty. Register them only if you installed Purchasing Control and want budget charging on API-placed orders.

#### Set up the order resource expander plugin

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| BudgetOrderResourceExpanderPlugin | Adds `budgetUuid` as a writable attribute on `POST /orders` and reports the resolved `budget` on reads. | Purchasing Control feature | SprykerFeature\Glue\PurchasingControl\Plugin\OrderExperienceManagement |

**src/Pyz/Glue/OrderExperienceManagement/OrderExperienceManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\OrderExperienceManagement;

use SprykerFeature\Glue\OrderExperienceManagement\OrderExperienceManagementDependencyProvider as SprykerOrderExperienceManagementDependencyProvider;
use SprykerFeature\Glue\PurchasingControl\Plugin\OrderExperienceManagement\BudgetOrderResourceExpanderPlugin;

class OrderExperienceManagementDependencyProvider extends SprykerOrderExperienceManagementDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Glue\OrderExperienceManagement\Dependency\Plugin\OrderResourceExpanderPluginInterface>
     */
    protected function getOrderResourceExpanderPlugins(): array
    {
        return [
            new BudgetOrderResourceExpanderPlugin(), #PurchasingControlFeature
        ];
    }
}
```

#### Set up the order intake quote expander plugin

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| BudgetOrderIntakeQuoteExpanderPlugin | Resolves `budgetUuid` from the intake payload onto the quote during order creation, and appends a validation issue when the budget cannot be charged. | Purchasing Control feature | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\OrderExperienceManagement |

**src/Pyz/Zed/OrderExperienceManagement/OrderExperienceManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\OrderExperienceManagement;

use SprykerFeature\Zed\OrderExperienceManagement\OrderExperienceManagementDependencyProvider as SprykerOrderExperienceManagementDependencyProvider;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\OrderExperienceManagement\BudgetOrderIntakeQuoteExpanderPlugin;

class OrderExperienceManagementDependencyProvider extends SprykerOrderExperienceManagementDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Zed\OrderExperienceManagement\Dependency\Plugin\OrderIntakeQuoteExpanderPluginInterface>
     */
    protected function getOrderIntakeQuoteExpanderPlugins(): array
    {
        return [
            new BudgetOrderIntakeQuoteExpanderPlugin(), #PurchasingControlFeature
        ];
    }
}
```

The DI container caches the plugin chain, so clear it after wiring either stack:

```bash
console cache:empty-all
```

{% info_block infoBox "Extending the resource further" %}

Add a field to the order response through `OrderResourceExpanderPluginInterface` rather than building a new Backend API module. Pure mapping over `OrderTransfer`—no I/O—keeps the response fast for every caller, not only the one that needs the new field.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Install Purchasing Control, register both plugins, and assign a budget to a company business unit. Send `POST /orders` with `budgetUuid` set to that budget. Make sure the response reports the charged `budget`, and that the budget's spent amount increases by the order total.

{% endinfo_block %}

### 6) Exempt API-placed orders from the duplicate-checkout lock

The Storefront guards against double submission by locking a quote for the duration of checkout, keyed on the quote UUID. An intake quote has no UUID, so without an exemption the lock falls back to a guest name and email hash that collides across unrelated API orders.

**src/Pyz/Zed/QuoteCheckoutConnector/QuoteCheckoutConnectorConfig.php**

```php
<?php

namespace Pyz\Zed\QuoteCheckoutConnector;

use Spryker\Zed\QuoteCheckoutConnector\QuoteCheckoutConnectorConfig as SprykerQuoteCheckoutConnectorConfig;
use SprykerFeature\Zed\OrderExperienceManagement\OrderExperienceManagementConfig;

class QuoteCheckoutConnectorConfig extends SprykerQuoteCheckoutConnectorConfig
{
    /**
     * @return array<string>
     */
    public function getQuoteCheckoutLockExemptSources(): array
    {
        return [
            OrderExperienceManagementConfig::SOURCE_API,
        ];
    }
}
```

{% info_block infoBox "orderCustomReference and retries" %}

With the exemption in place, an intake order is locked on `orderCustomReference` when the caller supplies one—so a retried request is rejected as a duplicate—and is not locked at all when they do not. If your integration retries on timeout, send a stable `orderCustomReference`.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Send the same `POST /orders` request twice with the same `orderCustomReference`. Make sure the second request is rejected rather than placing a duplicate order.

{% endinfo_block %}

### 7) Configure the fallback locale

{% info_block infoBox "Optional" %}

This step is only required if your project does not ship an `en_US` locale.

{% endinfo_block %}

Checkout errors are translated into the locale the request resolved. When none resolves, the module falls back to `en_US`.

**src/Pyz/Zed/OrderExperienceManagement/OrderExperienceManagementConfig.php**

```php
<?php

namespace Pyz\Zed\OrderExperienceManagement;

use SprykerFeature\Zed\OrderExperienceManagement\OrderExperienceManagementConfig as SprykerOrderExperienceManagementConfig;

class OrderExperienceManagementConfig extends SprykerOrderExperienceManagementConfig
{
    public function getFallbackLocaleName(): string
    {
        return 'de_DE';
    }
}
```

{% info_block warningBox "Verification" %}

Send `POST /orders` with a checkout validation error and no resolvable locale. Make sure the error message is translated into the configured fallback locale.

{% endinfo_block %}

### Verify

```bash
TOKEN=$(curl -s -X POST http://glue-backend.mysprykershop.com/token \
  -d 'grant_type=password&username=admin@spryker.com&password=change123' \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["access_token"])')

curl -s "http://glue-backend.mysprykershop.com/orders?page[limit]=1" \
  -H "Authorization: Bearer $TOKEN" -H 'Accept: application/vnd.api+json'
```

A `200` response with a `data` array and `meta.pagination` confirms the resource is wired. The generated OpenAPI document is at `http://glue-backend.mysprykershop.com/docs`.

To learn how to use the endpoints, see [Retrieve orders](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html).
