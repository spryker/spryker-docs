---
title: Integrate post-login redirect
description: Learn how to redirect users back to their last visited page after re-authentication in Back Office, Merchant Portal, and Storefront.
last_updated: Mar 9, 2026
template: feature-integration-guide-template
---

When a user's session times out, they are redirected to the login page. Without post-login redirect, after re-authentication, users land on the homepage and lose their context. With post-login redirect enabled, users are automatically sent back to the exact page they were on before the session expired — preserving their workflow across Back Office, Merchant Portal, and Storefront.

## Limitations

- If the user was on a create or edit page before the session expired, they are redirected back to that page after re-authentication, but any unsaved data is lost.
- Post-login redirect does not apply to agent users in Storefront and Merchant Portal.
- Redirect across multiple browsers or devices is not supported. The redirect applies only to the browser in which the original session was active.

## How it works

The last visited page URL is tracked on every eligible response and stored using a configurable storage strategy. By default, the URL is stored in a browser cookie named `last-visited-page` with the following properties: HttpOnly, SameSite=Lax, and Secure when the request is HTTPS.

A page is eligible for tracking if the request meets all of the following conditions:

- The HTTP method is GET.
- The request is not an AJAX request.
- The `Accept` header includes `text/html` or is not set.
- The path does not start with `/_` (internal framework paths).
- The path is not a login or logout path.

## Prerequisites

Install the following required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core Back Office | {{page.release_tag}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-spryker-core-back-office-feature.html) |

## Set up behavior

### Back Office

1. Register the event dispatcher plugin in `src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| LastVisitedPageEventDispatcherPlugin | Stores the last visited Back Office page URL in a cookie on each eligible GET response. | None | Spryker\Zed\SecurityGui\Communication\Plugin\EventDispatcher |

**src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\SecurityGui\Communication\Plugin\EventDispatcher\LastVisitedPageEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getBackofficeEventDispatcherPlugins(): array
    {
        return [
            // ...
            new LastVisitedPageEventDispatcherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Log in to the Back Office and navigate to any page. Log out, then log back in. Make sure you are redirected to the page you visited before logging out.

{% endinfo_block %}

2. Register the redirect strategy plugin in `src/Pyz/Zed/SecurityGui/SecurityGuiDependencyProvider.php`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| LastVisitedPageBackOfficeUserRedirectStrategyPlugin | Redirects a Back Office user to their last visited page after successful re-authentication. | None | Spryker\Zed\SecurityGui\Communication\Plugin\Security\Handler |

**src/Pyz/Zed/SecurityGui/SecurityGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\Communication\Plugin\Security\Handler\LastVisitedPageBackOfficeUserRedirectStrategyPlugin;
use Spryker\Zed\SecurityGui\SecurityGuiDependencyProvider as SprykerSecurityGuiDependencyProvider;

class SecurityGuiDependencyProvider extends SprykerSecurityGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SecurityGuiExtension\Dependency\Plugin\BackOfficeUserRedirectStrategyPluginInterface>
     */
    protected function getBackOfficeUserRedirectStrategyPlugins(): array
    {
        return [
            new LastVisitedPageBackOfficeUserRedirectStrategyPlugin(),
        ];
    }
}
```

### Merchant Portal

1. Register the event dispatcher plugin in `src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| LastVisitedPageEventDispatcherPlugin | Stores the last visited Merchant Portal page URL in a cookie on each eligible GET response. | None | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\EventDispatcher |

**src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\EventDispatcher\LastVisitedPageEventDispatcherPlugin as MerchantPortalLastVisitedPageEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getMerchantPortalEventDispatcherPlugins(): array
    {
        return [
            // ...
            new MerchantPortalLastVisitedPageEventDispatcherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Log in to the Merchant Portal and navigate to any page. Log out, then log back in. Make sure you are redirected to the page you visited before logging out.

{% endinfo_block %}

2. Register the redirect strategy plugin in `src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiDependencyProvider.php`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| LastVisitedPageMerchantPortalUserRedirectStrategyPlugin | Redirects a Merchant Portal user to their last visited page after successful re-authentication. | None | Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\Security\Handler |

**src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\Communication\Plugin\Security\Handler\LastVisitedPageMerchantPortalUserRedirectStrategyPlugin;
use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiDependencyProvider as SprykerSecurityMerchantPortalGuiDependencyProvider;

class SecurityMerchantPortalGuiDependencyProvider extends SprykerSecurityMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SecurityMerchantPortalGuiExtension\Dependency\Plugin\MerchantPortalUserRedirectStrategyPluginInterface>
     */
    protected function getMerchantPortalUserRedirectStrategyPlugins(): array
    {
        return [
            new LastVisitedPageMerchantPortalUserRedirectStrategyPlugin(),
        ];
    }
}
```

### Storefront

1. Register the event dispatcher plugin in `src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| LastVisitedPageEventDispatcherPlugin | Stores the last visited Storefront page URL in a cookie on each eligible GET response. | None | SprykerShop\Yves\CustomerPage\Plugin\EventDispatcher |

**src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use SprykerShop\Yves\CustomerPage\Plugin\EventDispatcher\LastVisitedPageEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            // ...
            new LastVisitedPageEventDispatcherPlugin(),
        ];
    }
}
```

2. Register the redirect strategy plugin in `src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| LastVisitedPageCustomerRedirectStrategyPlugin | Redirects a customer to their last visited Storefront page after successful re-authentication. | None | SprykerShop\Yves\CustomerPage\Plugin\CustomerPage |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\CustomerPage\Plugin\CustomerPage\LastVisitedPageCustomerRedirectStrategyPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CustomerRedirectStrategyPluginInterface>
     */
    protected function getAfterLoginCustomerRedirectPlugins(): array
    {
        return [
            // ...
            new LastVisitedPageCustomerRedirectStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Log in to the Storefront and navigate to any page. Log out, then log back in. Make sure you are redirected to the page you visited before logging out.

{% endinfo_block %}

## Configure a custom storage strategy

The storage strategy is selected by the `getLastVisitedPageStorageType()` method in each module's config class. By default, Back Office, Merchant Portal, and Storefront use the `cookie` strategy.

To replace the cookie storage with a custom implementation, do the following for each application where you want to apply the change.

### 1. Implement the storage interface

Create a class implementing the storage interface of the relevant module:

| APPLICATION | INTERFACE |
| --- | --- |
| Back Office | `Spryker\Zed\SecurityGui\Communication\Storage\LastVisitedPageStorageInterface` |
| Merchant Portal | `Spryker\Zed\SecurityMerchantPortalGui\Communication\Storage\LastVisitedPageStorageInterface` |
| Storefront | `SprykerShop\Yves\CustomerPage\Storage\LastVisitedPageStorageInterface` |

Each interface requires three methods:

```php
public function save(Response $response, Request $request): void;
public function get(Request $request): string;
public function clear(Response $response): void;
```

### 2. Register a custom storage type in config

Override `getLastVisitedPageStorageType()` in your project-level config class. The returned string must match the key you register in the factory.

**Back Office example — `src/Pyz/Zed/SecurityGui/SecurityGuiConfig.php`:**

```php
<?php

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiConfig as SprykerSecurityGuiConfig;

class SecurityGuiConfig extends SprykerSecurityGuiConfig
{
    public const string STORAGE_TYPE_CUSTOM = 'custom';

    /**
     * @return string
     */
    public function getLastVisitedPageStorageType(): string
    {
        return static::STORAGE_TYPE_CUSTOM;
    }
}
```

### 3. Register the custom storage in the factory

Override `createLastVisitedPageStorageResolver()` in your project-level factory to add the custom storage under the same key.

**Back Office example — `src/Pyz/Zed/SecurityGui/Communication/SecurityGuiCommunicationFactory.php`:**

```php
<?php

namespace Pyz\Zed\SecurityGui\Communication;

use Pyz\Zed\SecurityGui\Communication\Storage\CustomLastVisitedPageStorage;
use Pyz\Zed\SecurityGui\SecurityGuiConfig;
use Spryker\Shared\Kernel\StrategyResolver;
use Spryker\Shared\Kernel\StrategyResolverInterface;
use Spryker\Zed\SecurityGui\Communication\SecurityGuiCommunicationFactory as SprykerSecurityGuiCommunicationFactory;

class SecurityGuiCommunicationFactory extends SprykerSecurityGuiCommunicationFactory
{
    /**
     * @return \Spryker\Shared\Kernel\StrategyResolverInterface<\Spryker\Zed\SecurityGui\Communication\Storage\LastVisitedPageStorageInterface>
     */
    public function createLastVisitedPageStorageResolver(): StrategyResolverInterface
    {
        return new StrategyResolver(
            [SecurityGuiConfig::STORAGE_TYPE_CUSTOM => new CustomLastVisitedPageStorage()],
            SecurityGuiConfig::STORAGE_TYPE_CUSTOM,
        );
    }
}
```

Apply the same pattern in `SecurityMerchantPortalGuiCommunicationFactory` for Merchant Portal and in `CustomerPageFactory` for Storefront.
