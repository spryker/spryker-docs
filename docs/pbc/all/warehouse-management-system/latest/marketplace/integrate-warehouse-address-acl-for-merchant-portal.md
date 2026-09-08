---
title: Integrate warehouse address ACL for the Merchant Portal
description: Learn how to grant merchant users ACL access to warehouse addresses so that Merchant Portal operations that read stock addresses work correctly.
last_updated: Sep 3, 2026
template: howto-guide-template
related:
  - title: "Marketplace Inventory Management feature: Domain model"
    link: docs/pbc/all/warehouse-management-system/latest/marketplace/marketplace-inventory-management-feature-domain-model.html
  - title: Integrate Vertex for Marketplace
    link: docs/pbc/all/tax-management/latest/marketplace/integrate-vertex-for-marketplace.html
---

In the Merchant Portal, Propel queries are scoped by ACL entity rules, and an entity that is absent from the composed ACL entity metadata configuration is not readable for merchant users. `Orm\Zed\StockAddress\Persistence\SpyStockAddress` is such an entity unless you register it explicitly.

When the entity is missing from the configuration, warehouse addresses are silently omitted for merchant users: `StockTransfer.address` stays empty even though the `spy_stock_address` record exists. Features that depend on the warehouse address then fail further downstream, far from the actual cause.

`StockAddressAclEntityConfigurationExpanderPlugin` registers `SpyStockAddress` as a sub-entity of `SpyStock`. The address then inherits the ACL scope of its stock, so a merchant user who can read a warehouse can also read that warehouse's address.

## Prerequisites

Before you start, make sure that the following prerequisites are met:

- Your project uses the Merchant Portal with ACL entity restrictions enabled.
- Your project has the minimum required version of the package installed. `StockAddressAclEntityConfigurationExpanderPlugin` was introduced in `spryker/stock-address` 1.5.0.

Minimum required versions of the packages:

| PACKAGE | MINIMUM VERSION |
| --- | --- |
| spryker/stock-address | 1.5.0 |

If your project uses an earlier version, upgrade the package:

```bash
composer require spryker/stock-address:"^1.5.0" --update-with-dependencies
```

## Register the ACL entity configuration plugin

Add `StockAddressAclEntityConfigurationExpanderPlugin` to the `getAclEntityConfigurationExpanderPlugins()` method:

<details>
  <summary>src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\StockAddress\Communication\Plugin\AclMerchantPortal\StockAddressAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            // ... other ACL entity configuration expander plugins
            new StockAddressAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

</details>

The plugin registers the following entity:

| Entity | Relationship | Reason |
|---|---|---|
| `Orm\Zed\StockAddress\Persistence\SpyStockAddress` | Sub-entity of `Orm\Zed\Stock\Persistence\SpyStock` | The address belongs to a single warehouse, so it inherits the ACL scope of that warehouse instead of defining its own permissions. |

Because you changed a dependency provider, clear the application cache:

```bash
vendor/bin/console cache:empty-all
```

## Verify the integration

Validate the ACL entity metadata configuration:

```bash
vendor/bin/console acl-entity:metadata:validate
```

When the warehouse address metadata is registered correctly, the output is `ACL entity metadata configuration is valid.`

{% info_block warningBox "Verification" %}

To verify that merchant users can read warehouse addresses:

1. Make sure that the warehouse assigned to one of the merchant's product offers has an address. In the database, the `spy_stock_address` table must contain a record with `fk_stock` pointing to that warehouse.
2. Log in to the Merchant Portal as a user of that merchant.
3. Open an order that contains a product offer from that warehouse and trigger an operation that reads the warehouse address, such as a refund.
4. Verify that the operation completes and that the order moves to the expected state.
5. Verify that no `NullValueException` for a missing address is logged for the request.

{% endinfo_block %}
