---
title: Migrate Glue REST API to API Platform
description: Overview of migrating storefront Glue REST API modules to API Platform, with cross-cutting setup steps and links to per-module migration guides.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: How to integrate API Platform Security
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html
  - title: How to migrate to API Platform
    link: docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html
---

This document guides you through migrating storefront Glue REST API endpoints to API Platform. The migration replaces legacy `*RestApi` Glue modules with API Platform resources defined in core Spryker modules.

## Overview

In this migration, every legacy Glue REST API resource — route plugins, relationship plugins, and resource route builders — is replaced by API Platform resources. The new resources are defined declaratively in YAML schemas inside core Spryker modules and auto-discovered by the framework.

You can migrate module by module. During migration, both the legacy Glue router and the API Platform router run side by side, so unmigrated endpoints continue to work.

## Prerequisites

Before starting, make sure you have completed:

- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html)

## Cross-cutting changes

The following changes apply to every migration and must be done once, before migrating individual modules.

### 1. Update GlueStorefrontApiApplication dependency provider

Remove the legacy resource plugins that have been replaced by API Platform auto-discovery.

`src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php`

Remove from `getResourcePlugins()`:

| Plugin to remove | Namespace |
|---|---|
| `OauthApiTokenResource` | `Spryker\Glue\OauthApi\Plugin\GlueApplication` |
| `StoresResource` | `Spryker\Glue\StoresApi\Plugin\GlueStorefrontApiApplication` |

### 2. Register Authentication dependency provider

Create a new project-level `AuthenticationDependencyProvider` to wire the customer identity expander needed by the API Platform OAuth flow.

`src/Pyz/Glue/Authentication/AuthenticationDependencyProvider.php`

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Authentication;

use Spryker\Glue\Authentication\AuthenticationDependencyProvider as SprykerAuthenticationDependencyProvider;
use Spryker\Glue\CompanyUserStorage\Plugin\Authentication\CompanyUserIdentityExpanderPlugin;

class AuthenticationDependencyProvider extends SprykerAuthenticationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\AuthenticationExtension\Dependency\Plugin\CustomerIdentityExpanderPluginInterface>
     */
    protected function getCustomerIdentityExpanderPlugins(): array
    {
        return [
            new CompanyUserIdentityExpanderPlugin(),
        ];
    }
}
```

### 3. Register guest cart conversion on authentication

Wire the guest-to-customer cart conversion plugin into the OAuth post-authentication flow.

`src/Pyz/Zed/Oauth/OauthDependencyProvider.php`

Add to `getPostAuthenticationPlugins()`:

```php
use Spryker\Zed\Cart\Communication\Plugin\Oauth\ConvertGuestCartOauthPostAuthenticationPlugin;

/**
 * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\PostAuthenticationPluginInterface>
 */
protected function getPostAuthenticationPlugins(): array
{
    return [
        new ConvertGuestCartOauthPostAuthenticationPlugin(),
    ];
}
```

### 4. Remove obsolete project-level configs

Delete the following files if they exist in your project. They contained overrides for legacy Glue behavior that is no longer needed:

| File to delete | Reason |
|---|---|
| `src/Pyz/Glue/OauthApi/OauthApiConfig.php` | The `isConventionalResponseCodeEnabled()` override is no longer needed; API Platform handles response codes natively. |
| `src/Pyz/Glue/CustomerAccessRestApi/CustomerAccessRestApiConfig.php` | The `CUSTOMER_ACCESS_CONTENT_TYPE_TO_RESOURCE_TYPE_MAPPING` override is no longer needed; customer access is handled by API Platform security. |

### 5. Add Navigation config (if using NavigationsRestApi)

If you use the navigations endpoint, create a project-level config for the new API Platform resource.

`src/Pyz/Glue/Navigation/NavigationConfig.php`

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Navigation;

use Spryker\Glue\Navigation\NavigationConfig as SprykerNavigationConfig;

class NavigationConfig extends SprykerNavigationConfig
{
    protected function getNavigationTypeToUrlResourceIdFieldMapping(): array
    {
        return [
            'category' => 'fkResourceCategorynode',
            'cms_page' => 'fkResourcePage',
        ];
    }
}
```

## Per-module migration guides

After completing the cross-cutting changes, migrate individual modules by following the guides below. Each guide lists the modules to update, plugins to add, and legacy plugins to remove.

{% info_block infoBox "Migration order" %}

You can migrate modules in any order. We recommend starting with simpler read-only resources and progressing to more complex ones.

{% endinfo_block %}

| Module to migrate | Replaces legacy module | Guide |
|---|---|---|
| Customer | CustomersRestApi | [Migrate CustomersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customersrestapi.html) |
| Cart | CartsRestApi | Coming soon |
| CartCode | CartCodesRestApi | Coming soon |
| Checkout | CheckoutRestApi | Coming soon |
| Sales | OrdersRestApi | Coming soon |
| Product | ProductsRestApi | Coming soon |
| PriceProduct | ProductPricesRestApi | Coming soon |
| ProductImage | ProductImageSetsRestApi | Coming soon |
| Availability | ProductAvailabilitiesRestApi | Coming soon |
| ProductLabel | ProductLabelsRestApi | Coming soon |
| ProductReview | ProductReviewsRestApi | Coming soon |
| ProductOption | ProductOptionsRestApi | Coming soon |
| ProductBundle | ProductBundlesRestApi | Coming soon |
| ProductAttribute | ProductAttributesRestApi | Coming soon |
| ProductMeasurementUnit | ProductMeasurementUnitsRestApi | Coming soon |
| Catalog | CatalogSearchRestApi | Coming soon |
| Category | CategoriesRestApi | Coming soon |
| Navigation | NavigationsRestApi | Coming soon |
| Merchant | MerchantsRestApi | Coming soon |
| MerchantOpeningHours | MerchantOpeningHoursRestApi | Coming soon |
| MerchantProductOffer | MerchantProductOffersRestApi | Coming soon |
| Authentication | AuthRestApi | Coming soon |
| Agent | AgentAuthRestApi | Coming soon |
| Company | CompaniesRestApi | Coming soon |
| CompanyUser | CompanyUsersRestApi, CompanyUserAuthRestApi | Coming soon |
| CompanyBusinessUnit | CompanyBusinessUnitsRestApi | Coming soon |
| CompanyRole | CompanyRolesRestApi | Coming soon |
| CompanyUnitAddress | CompanyBusinessUnitAddressesRestApi | Coming soon |
| SharedCart | SharedCartsRestApi | Coming soon |
| QuoteRequest | QuoteRequestsRestApi | Coming soon |
| QuoteRequestAgent | QuoteRequestAgentsRestApi | Coming soon |
| CustomerAccess | CustomerAccessRestApi | Coming soon |
| Tax | ProductTaxSetsRestApi | Coming soon |
| Store | StoresRestApi | Coming soon |
| Payment | PaymentsRestApi, OrderPaymentsRestApi | Coming soon |
| ContentProduct | ContentProductAbstractListsRestApi | Coming soon |
| ServicePoint | ServicePointsRestApi | Coming soon |
| DiscountPromotion | DiscountPromotionsRestApi | Coming soon |
| ProductOfferAvailability | ProductOfferAvailabilitiesRestApi | Coming soon |
| PriceProductOffer | ProductOfferPricesRestApi | Coming soon |
| SalesOrderAmendment | OrderAmendmentsRestApi | Coming soon |

## Verification

After migrating a module, verify the migration:

1. Clear the application cache:

   ```bash
   docker/sdk cli console cache:clear
   ```

2. Regenerate API Platform resources:

   ```bash
   docker/sdk cli "GLUE_APPLICATION=storefront console api:generate"
   ```

3. Test the migrated endpoints using the interactive API documentation at the storefront Glue root URL.

4. Verify that unmigrated endpoints still work through the legacy Glue router.

## Final cleanup

Once all modules have been migrated, you can remove the legacy Glue router from the router chain:

`src/Pyz/Glue/Router/RouterDependencyProvider.php`

```php
protected function getRouterPlugins(): array
{
    return [
        // GlueRouterPlugin is no longer needed
        new SymfonyFrameworkRouterPlugin(),
    ];
}
```

After removing the legacy router, you can also remove unused `*RestApi` composer dependencies and clean up empty Glue module directories.
