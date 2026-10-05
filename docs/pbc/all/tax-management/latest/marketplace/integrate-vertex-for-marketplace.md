---
title: Integrate Vertex for Marketplace
description: Learn how to let merchant users trigger Vertex tax calculation from the Merchant Portal.
last_updated: Aug 31, 2026
template: howto-guide-template
related:
  - title: Vertex
    link: docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/vertex.html
  - title: Integrate Vertex
    link: docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex.html
---

This document describes the marketplace-specific additions to the base shop Vertex integration. Before you follow the steps below, complete [Integrate Vertex](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex.html).

In a marketplace, tax calculation also runs for merchant users in the Merchant Portal, for example, when a merchant refunds an order. To allow Vertex to persist its API access token and tax ID validation history for merchant users, register the ACL entity configuration expander plugin described below.

## Prerequisites

Before you start, make sure that the following prerequisites are met:

- You have completed [Integrate Vertex](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex.html).
- Your project uses the Merchant Portal with ACL entity restrictions enabled.
- The installed version of `spryker-eco/vertex` provides `VertexAclEntityConfigurationExpanderPlugin`. If necessary, update the module with Composer:

```bash
composer update spryker-eco/vertex
```

## Register the ACL entity configuration plugin

Add `VertexAclEntityConfigurationExpanderPlugin` to the `getAclEntityConfigurationExpanderPlugins()` method:

<details>
  <summary>src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use SprykerEco\Zed\Vertex\Communication\Plugin\AclMerchantPortal\VertexAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            // ... other ACL entity configuration expander plugins
            new VertexAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

</details>

The plugin grants the following permissions:

| Entity | Permissions | Reason |
|---|---|---|
| `Orm\Zed\Vertex\Persistence\SpyVertexApiAccessToken` | Read, create, update | The token is created during the first tax calculation and refreshed in place when it expires. |
| `Orm\Zed\Vertex\Persistence\SpyVertexTaxIdValidationHistory` | Read, create | The tax ID validation history is append-only. |

## Verify the integration

To verify that the integration works correctly:

1. In the Merchant Portal, open an order that allows refunds.
2. Refund the order.
3. Verify that the order moves to the expected state and that the refund is created.
4. Verify that the `spy_vertex_api_access_token` table contains a token record.

Validate the ACL entity metadata configuration:

```bash
vendor/bin/console acl-entity:metadata:validate
```

When the Vertex metadata is registered correctly, the output is `ACL entity metadata configuration is valid.`

## Next steps

- [Configure Vertex-specific metadata](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/configure-vertex-specific-metadata.html)
- [Verify Vertex connection](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/verify-vertex-connection.html)
