This document describes how to integrate the Picking App feature into a Spryker project.

## Install feature core

Follow the steps below to install the Picking App feature core.

### Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME                     | VERSION          |
|--------------------------|------------------|
| Spryker Core             | {{site.version}} |
| Spryker Core Back Office | {{site.version}} |
| Inventory Management     | {{site.version}} |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/picking-app: "{{site.version}}" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                        |
|-------------------------|-------------------------------------------|
| UserBackendApi          | vendor/spryker/user-backend-api           |
| WarehouseUser           | vendor/spryker/warehouse-user             |
| WarehouseUserBackendApi | vendor/spryker/warehouse-user-backend-api |
| WarehouseUserGui        | vendor/spryker/warehouse-user-gui         |

---

### 2) Set up database schema and transfer objects

Run the following commands to apply the database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY               | TYPE   | EVENT   |
|-------------------------------|--------|---------|
| spy_warehouse_user_assignment | table  | created |
| spy_stock.uuid                | column | created |
| spy_user.uuid                 | column | created |

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                                        | TYPE     | EVENT      | PATH                                                                          |
|-------------------------------------------------|----------|------------|-------------------------------------------------------------------------------|
| WarehouseUserAssignment                         | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignment                         |
| WarehouseUserAssignmentCriteria                 | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCriteria                 |
| WarehouseUserAssignmentConditions               | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentConditions               |
| WarehouseUserAssignmentCollection               | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCollection               |
| WarehouseUserAssignmentCollectionRequest        | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCollectionRequest        |
| WarehouseUserAssignmentCollectionResponse       | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCollectionResponse       |
| WarehouseUserAssignmentCollectionDeleteCriteria | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCollectionDeleteCriteria |
| UserCollection                                  | class    | created    | src/Generated/Shared/Transfer/UserCollection                                  |
| UserConditions                                  | class    | created    | src/Generated/Shared/Transfer/UserConditions                                  |
| User.uuid                                       | property | created    | src/Generated/Shared/Transfer/User                                            |
| User.isWarehouseUser                            | property | created    | src/Generated/Shared/Transfer/User                                            |
| UserCriteria.userConditions                     | property | created    | src/Generated/Shared/Transfer/UserCriteria                                    |
| StockCriteriaFilter.uuids                       | property | created    | src/Generated/Shared/Transfer/StockCriteriaFilter                             |
| StockCriteriaFilter.stockIds                    | property | created    | src/Generated/Shared/Transfer/StockCriteriaFilter                             |
| Collection                                      | class    | deprecated | src/Generated/Shared/Transfer/Collection                                      |
| UserCriteria.idUser                             | property | deprecated | src/Generated/Shared/Transfer/UserCriteria                                    |
| UserCriteria.email                              | property | deprecated | src/Generated/Shared/Transfer/UserCriteria                                    |
| UserCriteria.userReference                      | property | deprecated | src/Generated/Shared/Transfer/UserCriteria                                    |
| UserCriteria.withExpanders                      | property | deprecated | src/Generated/Shared/Transfer/UserCriteria                                    |
| StockCriteriaFilter.idStock                     | property | deprecated | src/Generated/Shared/Transfer/StockCriteriaFilter                             |

---

### 3) Add translations

Add translations as follows:

1. Append glossary according to your configuration:

```csv
warehouse_user_assignment.validation.user_not_found,User not found.,en_US
warehouse_user_assignment.validation.user_not_found,Benutzer nicht gefunden.,de_DE
warehouse_user_assignment.validation.warehouse_not_found,Warehouse not found.,en_US
warehouse_user_assignment.validation.warehouse_not_found,Lager nicht gefunden.,de_DE
warehouse_user_assignment.validation.warehouse_user_assignment_not_found,Warehouse user assignment not found.,en_US
warehouse_user_assignment.validation.warehouse_user_assignment_not_found,Lagerbenutzerzuweisung nicht gefunden.,de_DE
warehouse_user_assignment.validation.too_many_active_warehouse_assignments,User has too many active warehouse assignments.,en_US
warehouse_user_assignment.validation.too_many_active_warehouse_assignments,Dem Benutzer sind zu viele aktive Läger zugewiesen.,de_DE
warehouse_user_assignment.validation.warehouse_user_assignment_already_exists,Warehouse user assignment already exists.,en_US
warehouse_user_assignment.validation.warehouse_user_assignment_already_exists,Lagerbenutzerzuweisung existiert bereits.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

3. Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

---
{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

Go to **Back Office > Users > Users > Assign Warehouses ** and make sure that the **Warehouse User Assignment** table is translatable. 
You can switch the language in the **Back Office > Users > Users > Edit > Interface language**. 

{% endinfo_block %}

---

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                               | SPECIFICATION                                        | PREREQUISITES | NAMESPACE                                                   |
|--------------------------------------|------------------------------------------------------|---------------|-------------------------------------------------------------|
| WarehouseUserLoginRestrictionPlugin  | Restricts access to back office for warehouse users. |               | Spryker\Zed\WarehouseUser\Communication\Plugin\SecurityGui  |

**src/Pyz/Zed/SecurityGui/SecurityGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiDependencyProvider as SprykerSecurityGuiDependencyProvider;
use Spryker\Zed\WarehouseUser\Communication\Plugin\SecurityGui\WarehouseUserLoginRestrictionPlugin;

class SecurityGuiDependencyProvider extends SprykerSecurityGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SecurityGuiExtension\Dependency\Plugin\UserLoginRestrictionPluginInterface>
     */
    protected function getUserLoginRestrictionPlugins(): array
    {
        return [
            new WarehouseUserLoginRestrictionPlugin(),
        ];
    }
}

```

---
{% info_block warningBox "Verification" %}

Ensure that the plugin works correctly:

1. Mark any user as a Warehouse User.
2. Try to log in with that user to Backoffice.
3. Check that user is not logged in.

{% endinfo_block %}
