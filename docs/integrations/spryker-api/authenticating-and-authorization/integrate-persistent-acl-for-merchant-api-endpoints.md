---
title: Integrate Persistent ACL for merchant API endpoints
description: Learn how to scope the Backend API requests of merchant users to their merchant with Persistent ACL in the API Platform integration.
last_updated: Sep 16, 2026
template: howto-guide-template
related:
  - title: Integrate API Platform security
    link: docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html
  - title: API Platform security
    link: docs/integrations/spryker-api/authenticating-and-authorization/security.html
  - title: Authenticate as a merchant user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html
  - title: Persistence ACL feature overview
    link: docs/pbc/all/user-management/latest/marketplace/persistence-acl-feature-overview/persistence-acl-feature-overview.html
---

This document describes how to enable [Persistent ACL](/docs/pbc/all/user-management/latest/marketplace/persistence-acl-feature-overview/persistence-acl-feature-overview.html) for the Backend API so that merchant users see and change only the data of their merchant, the same way they do in the Merchant Portal.

With the API Platform integration, the Backend API resolves the user behind a Back Office or merchant user token and makes it the acting user of the request. Persistent ACL uses the acting user to filter database queries. After the integration described here, the following applies:

- A merchant user reads and writes the data of the merchant it is assigned to only. Merchant-specific resources like the merchant profile return `404` or an empty collection for data of other merchants.
- A Back Office user without a merchant is not scoped and reads the data of every merchant, as in the Back Office.
- Requests without an acting user, such as `POST /token` and public endpoints, are not filtered.

{% info_block warningBox "API Platform only" %}

The acting user of a request exists only in the [API Platform](/docs/integrations/spryker-api/api-platform/api-platform.html) integration of the Backend API. The legacy Glue infrastructure does not resolve the user behind a token, so Persistent ACL cannot scope legacy Glue resources; they stay unfiltered even after the plugins on this page are registered. Legacy Glue resources are protected by scopes and route rules instead. For details, see [Use Backend API authorization scopes](/docs/integrations/spryker-api/authenticating-and-authorization/backend-api/use-backend-api-authorization-scopes.html) and [Create protected Backend API endpoints](/docs/integrations/spryker-api/authenticating-and-authorization/backend-api/create-protected-backend-api-endpoints.html).

{% endinfo_block %}

## Prerequisites

- API Platform and its security are integrated for the Backend API as described in [Integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html) and [Integrate API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html).
- Merchant users can authenticate against the Backend API as described in [Authenticate as a merchant user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html).
- The Persistent ACL rules for merchants are configured. Merchant Portal projects come with them out of the box; see [Persistence ACL configuration](/docs/pbc/all/merchant-management/latest/marketplace/marketplace-merchant-portal-core-feature-overview/persistence-acl-configuration.html).

Install the required modules using Composer:

```bash
composer require spryker/acl-entity:"^1.18.0" spryker/merchant-user:"^1.10.0" --update-with-dependencies
```

| MODULE | MINIMUM VERSION | PROVIDES |
| --- | --- | --- |
| spryker/acl-entity | ^1.18.0 | The `AclEntityApplicationPlugin` for the Glue layer, which enables Persistent ACL in the Backend API application. |
| spryker/merchant-user | ^1.10.0 | The `NoCurrentMerchantUserAclEntityDisablerPlugin`, which limits the scoping to merchant users. |

## 1. Enable Persistent ACL in the Backend API application

Persistent ACL is enabled per application. Register the Glue `AclEntityApplicationPlugin` in the Backend API application:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AclEntityApplicationPlugin | Enables Persistent ACL for the Backend API application. | | Spryker\Glue\AclEntity\Plugin\Application |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\AclEntity\Plugin\Application\AclEntityApplicationPlugin;
use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new AclEntityApplicationPlugin(),
        ];
    }
}
```

{% info_block infoBox "Zed plugin" %}

The Zed layer ships its own `Spryker\Zed\AclEntity\Communication\Plugin\Application\AclEntityApplicationPlugin`, which the Back Office and the Merchant Portal register. The Backend API is a Glue application and needs the Glue plugin from the table above.

{% endinfo_block %}

## 2. Limit the scoping to merchant users

Persistent ACL filters every query of a request once it is enabled for the application. To keep Back Office users and requests without an acting user unfiltered, register a disabler plugin that turns Persistent ACL off unless the acting user is a merchant user:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| NoCurrentMerchantUserAclEntityDisablerPlugin | Disables Persistent ACL when the current request has no acting user or the acting user is not assigned to a merchant. | | Spryker\Zed\MerchantUser\Communication\Plugin\AclEntity |

**src/Pyz/Zed/AclEntity/AclEntityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclEntity;

use Spryker\Zed\AclEntity\AclEntityDependencyProvider as SprykerAclEntityDependencyProvider;
use Spryker\Zed\MerchantUser\Communication\Plugin\AclEntity\NoCurrentMerchantUserAclEntityDisablerPlugin;

class AclEntityDependencyProvider extends SprykerAclEntityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityDisablerPluginInterface>
     */
    protected function getAclEntityDisablerPlugins(): array
    {
        return [
            new NoCurrentMerchantUserAclEntityDisablerPlugin(),
        ];
    }
}
```

{% info_block infoBox "Disabler plugins apply to every application" %}

Disabler plugins are evaluated wherever Persistent ACL is enabled, including the Merchant Portal. There, the acting user is always a merchant user, so the plugin does not change the Merchant Portal behavior. If your project already registers other disabler plugins, keep them in the list.

{% endinfo_block %}

## 3. Clear caches

```bash
docker/sdk cli console cache:empty-all
```

{% info_block warningBox "Verification" %}

1. [Authenticate as a merchant user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html) and request a resource that is scoped by Persistent ACL, for example, `GET /merchant-profile`. Make sure the response contains only the data of the merchant the user is assigned to.
2. Authenticate as a Back Office user without a merchant and request a resource that reads merchant data, for example, `GET /merchant-profiles/{merchantReference}` of several merchants. Make sure every merchant is returned.
3. Send `POST /token` without an `Authorization` header. Make sure a token is issued.

{% endinfo_block %}

## Next steps

- [API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/security.html): roles, security expressions, and how the acting user is resolved.
- [Persistence ACL configuration](/docs/pbc/all/merchant-management/latest/marketplace/marketplace-merchant-portal-core-feature-overview/persistence-acl-configuration.html): extend the rules that decide which entities a merchant user can access.
