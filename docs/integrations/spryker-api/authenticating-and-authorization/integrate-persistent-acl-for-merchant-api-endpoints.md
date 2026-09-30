---
title: Integrate Persistent ACL for merchant API endpoints
description: Learn how to scope the Backend API requests of merchant users to their merchant with Persistent ACL in the API Platform integration.
last_updated: Sep 30, 2026
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
  - title: Persistence ACL configuration
    link: docs/pbc/all/merchant-management/latest/marketplace/marketplace-merchant-portal-core-feature-overview/persistence-acl-configuration.html
---

This document describes how to enable [Persistent ACL](/docs/pbc/all/user-management/latest/marketplace/persistence-acl-feature-overview/persistence-acl-feature-overview.html) for the Backend API so that merchant users see and change only the data of their merchant, the same way they do in the Merchant Portal.

With the API Platform integration, the Backend API resolves the user behind a Back Office or merchant user token and makes it the acting user of the request. Persistent ACL uses the acting user to filter database queries. After the integration described here, the following applies:

- A merchant user reads and writes the data of the merchant it is assigned to only. Merchant-specific resources like the merchant profile return `404` or an empty collection for data of other merchants.
- A Back Office user is scoped by the Persistent ACL rules of their roles. In the demo data, users of the `root_group` group have the `root_role` role, which grants `CRUD` on every entity (`*`) with `global` scope, so they read the data of every merchant.
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
composer require spryker/acl-entity:"^1.19.0" --update-with-dependencies
```

| MODULE | MINIMUM VERSION | PROVIDES |
| --- | --- | --- |
| spryker/acl-entity | ^1.19.0 | The `AclEntityApplicationPlugin` for the Glue layer, which enables Persistent ACL in the Backend API application, and the `NoCurrentUserAclEntityDisablerPlugin`, which keeps requests without an acting user unfiltered. |

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

## 2. Disable Persistent ACL for requests without an acting user

Persistent ACL filters every query of a request once it is enabled for the application. To keep requests without an acting user unfiltered, such as `POST /token`, register a disabler plugin that turns Persistent ACL off when no user is logged in. The plugin reads the current user without querying the database.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| NoCurrentUserAclEntityDisablerPlugin | Disables Persistent ACL when the current request has no acting user. | | Spryker\Zed\AclEntity\Communication\Plugin\AclEntity |

**src/Pyz/Zed/AclEntity/AclEntityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclEntity;

use Spryker\Zed\AclEntity\AclEntityDependencyProvider as SprykerAclEntityDependencyProvider;
use Spryker\Zed\AclEntity\Communication\Plugin\AclEntity\NoCurrentUserAclEntityDisablerPlugin;

class AclEntityDependencyProvider extends SprykerAclEntityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityDisablerPluginInterface>
     */
    protected function getAclEntityDisablerPlugins(): array
    {
        return [
            new NoCurrentUserAclEntityDisablerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Back Office users need Persistent ACL rules" %}

Every logged-in user is scoped, Back Office users included. A Back Office user whose roles have no Persistent ACL rules for an entity gets no access to it, because the default operation mask, `AclEntityConfig::getDefaultGlobalOperationMask()`, is `0`. Before you register the plugin, make sure the roles of your Back Office users contain the rules they need. For example, assign them to the `root_group` group or add rules to their roles.

{% endinfo_block %}

{% info_block infoBox "Replaces NoCurrentMerchantUserAclEntityDisablerPlugin" %}

`NoCurrentUserAclEntityDisablerPlugin` replaces the deprecated `Spryker\Zed\MerchantUser\Communication\Plugin\AclEntity\NoCurrentMerchantUserAclEntityDisablerPlugin`. The deprecated plugin looked up the merchant user in the database on every request and skipped Persistent ACL for Back Office users who aren't merchant users. If your project registers the deprecated plugin, replace it with `NoCurrentUserAclEntityDisablerPlugin` and review the Persistent ACL rules of your Back Office roles.

{% endinfo_block %}

{% info_block infoBox "Disabler plugins apply to every application" %}

Disabler plugins are evaluated wherever Persistent ACL is enabled, including the Merchant Portal. There, every request has an acting merchant user, so the plugin does not change the Merchant Portal behavior. If your project already registers other disabler plugins, keep them in the list.

{% endinfo_block %}

## 3. Clear caches

```bash
docker/sdk cli console cache:empty-all
```

{% info_block warningBox "Verification" %}

1. [Authenticate as a merchant user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html) and request a resource that is scoped by Persistent ACL, for example, `GET /merchant-profile`. Make sure the response contains only the data of the merchant the user is assigned to.
2. Authenticate as a Back Office user of the `root_group` group and request a resource that reads merchant data, for example, `GET /merchant-profiles/{merchantReference}` of several merchants. Make sure every merchant is returned.
3. Send `POST /token` without an `Authorization` header. Make sure a token is issued.

{% endinfo_block %}
