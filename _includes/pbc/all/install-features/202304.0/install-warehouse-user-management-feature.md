This document describes how to integrate the Warehouse User Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Warehouse User Management feature core.

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
composer require spryker-feature/warehouse-user-management: "{{site.version}}" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                        |
|-------------------------|-------------------------------------------|
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
| WarehouseUserAssignmentsRestAttributes          | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentsRestAttributes          |
| WarehousesRestAttributes                        | class    | created    | src/Generated/Shared/Transfer/WarehousesRestAttributes                        |
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

### 3) Set up configuration

Adjust the protected paths configuration if you want to make `warehouse-user-assignments` resource protected:

**src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php**

```php
<?php

namespace Pyz\Shared\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig as SprykerGlueBackendApiApplicationAuthorizationConnectorConfig;

class GlueBackendApiApplicationAuthorizationConnectorConfig extends SprykerGlueBackendApiApplicationAuthorizationConnectorConfig
{
    /**
     * @return array<string, mixed>
     */
    public function getProtectedPaths(): array
    {
        return [
            '/\/warehouse-user-assignments(?:\/[^\/]+)?\/?$/' => [
                'isRegularExpression' => true,
            ],
        ];
    }
}

```

### 4) Add translations

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

Go to **Back Office > Users > Users > Assign Warehouses** and make sure that the **Warehouse User Assignment** table is translatable. 
You can switch the language in the **Back Office > Users > Users > Edit > Interface language**. 

{% endinfo_block %}

---

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                               | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                                   |
|------------------------------------------------------|--------------------------------------------------------------|---------------|-------------------------------------------------------------|
| WarehouseUserLoginRestrictionPlugin                  | Restricts access to back office for warehouse users.         |               | Spryker\Zed\WarehouseUser\Communication\Plugin\SecurityGui  |
| WarehouseUserAssignmentUserTableActionExpanderPlugin | Expands the User table with the assign warehouses button.    |               | Spryker\Zed\WarehouseUserGui\Communication\Plugin\User      |
| WarehouseUserAssignmentUserFormExpanderPlugin        | Expands the User form with the `is_warehouse_user` checkbox. |               | Spryker\Zed\WarehouseUserGui\Communication\Plugin\User      |
| WarehouseUserAssignmentsResourcePlugin               | Registers the `warehouse-user-assignments` resource.         |               | Spryker\Glue\WarehouseUserBackendApi\Plugin\GlueApplication |

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

**src/Pyz/Zed/User/UserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;
use Spryker\Zed\WarehouseUserGui\Communication\Plugin\User\WarehouseUserAssignmentUserFormExpanderPlugin;
use Spryker\Zed\WarehouseUserGui\Communication\Plugin\User\WarehouseUserAssignmentUserTableActionExpanderPlugin;

class UserDependencyProvider extends SprykerUserDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\UserExtension\Dependency\Plugin\UserTableActionExpanderPluginInterface>
     */
    protected function getUserTableActionExpanderPlugins(): array
    {
        return [
            new WarehouseUserAssignmentUserTableActionExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface>
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new WarehouseUserAssignmentUserFormExpanderPlugin(),
        ];
    }
}

```

---
{% info_block warningBox "Verification" %}

Ensure that the plugins works correctly:

1. Navigate to **Back Office > Users > Users**, create a new user or edit existing one.
2. Make sure that User form contains checkbox with label "This user is a warehouse user".
3. Check the checkbox and submit the form.
4. Make sure that user have "Assign Warehouses" button in User table.
5. Logout from the Back Office and try to log in as Warehouse User.
6. Make sure that Warehouse User is unable to login to Backoffice.

{% endinfo_block %}

Enable the Backend API by registering the plugin:

| PLUGIN                                               | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                                   |
|------------------------------------------------------|--------------------------------------------------------------|---------------|-------------------------------------------------------------|
| WarehouseUserAssignmentsResourcePlugin               | Registers the `warehouse-user-assignments` resource.         |               | Spryker\Glue\WarehouseUserBackendApi\Plugin\GlueApplication |


**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\WarehouseUserBackendApi\Plugin\GlueApplication\WarehouseUserAssignmentsResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new WarehouseUserAssignmentsResourcePlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

1. Make sure that you can send the following requests:

* `GET https://glue-backend.mysprykershop.com/warehouse-user-assignments`
* `GET https://glue-backend.mysprykershop.com/warehouse-user-assignments/{% raw %}{{{% endraw %}warehouse-user-assignments-uuid{% raw %}}{{% endraw %}`
* `POST https://glue-backend.mysprykershop.com/warehouse-user-assignments`

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "attributes": {
            "userUuid": {% raw %}{{{% endraw %}user-uuid{% raw %}}}{% endraw %},
            "warehouse": {
                "uuid": {% raw %}{{{% endraw %}warehouse-uuid{% raw %}}}{% endraw %}
            },
            "isActive": true
        }
    }
}
```

* `PATCH https://glue-backend.mysprykershop.com/warehouse-user-assignments/{% raw %}{{{% endraw %}warehouse-user-assignments-uuid{% raw %}}{{% endraw %}`

```json
{
    "data" : {
        "type" : "warehouse-user-assignments",
        "attributes" : {
          "isActive": true
        }
    }
}
```

* `DELETE https://glue-backend.mysprykershop.com/warehouse-user-assignments/{% raw %}{{{% endraw %}warehouse-user-assignments-uuid{% raw %}}{{% endraw %}`.

{% endinfo_block %}
