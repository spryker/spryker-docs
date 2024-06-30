
This document describes how to install the Warehouse User Management feature.


## Prerequisites

Install the required features:

| NAME                     | VERSION          | INSTALLATION GUIDE                                                                                                                                                                         |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core             | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                      |  |
| Spryker Core Back Office | {{page.version}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                              |
| Inventory Management     | {{page.version}} | [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html) |

## 1) Install the required modules

```bash
composer require spryker-feature/warehouse-user-management: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY                         |
|---------------------------|--------------------------------------------|
| OauthWarehouse            | vendor/spryker/oauth-warehouse             |
| WarehouseOauthBackendApi  | vendor/spryker/warehouse-oauth-backend-api |
| WarehouseUser             | vendor/spryker/warehouse-user              |
| WarehouseUserGui          | vendor/spryker/warehouse-user-gui          |
| WarehouseUsersBackendApi  | vendor/spryker/warehouse-user-backend-api  |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

Apply the database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied by checking your database:

| DATABASE ENTITY               | TYPE   | EVENT   |
|-------------------------------|--------|---------|
| spy_warehouse_user_assignment | table  | created |
| spy_stock.uuid                | column | created |
| spy_user.is_warehouse_user    | column | created |
| spy_user.uuid                 | column | created |

Make sure the following changes have been triggered in transfer objects:

| TRANSFER                                        | TYPE     | EVENT      | PATH                                                                                  |
|-------------------------------------------------|----------|------------|---------------------------------------------------------------------------------------|
| WarehouseUserAssignment                         | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentTransfer                         |
| WarehouseUserAssignmentCriteria                 | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCriteriaTransfer                 |
| WarehouseUserAssignmentConditions               | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentConditionsTransfer               |
| WarehouseUserAssignmentCollection               | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCollectionTransfer               |
| WarehouseUserAssignmentCollectionRequest        | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCollectionRequestTransfer        |
| WarehouseUserAssignmentCollectionResponse       | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCollectionResponseTransfer       |
| WarehouseUserAssignmentCollectionDeleteCriteria | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentCollectionDeleteCriteriaTransfer |
| WarehouseIdentifier                             | class    | created    | src/Generated/Shared/Transfer/WarehouseIdentifierTransfer                             |
| GlueRequestWarehouse                            | class    | created    | src/Generated/Shared/Transfer/GlueRequestWarehouseTransfer                            |
| WarehouseUserAssignmentsBackendApiAttributes    | class    | created    | src/Generated/Shared/Transfer/WarehouseUserAssignmentsBackendApiAttributesTransfer    |
| WarehousesBackendApiAttributes                  | class    | created    | src/Generated/Shared/Transfer/WarehousesBackendApiAttributesTransfer                  |
| UserCollection                                  | class    | created    | src/Generated/Shared/Transfer/UserCollectionTransfer                                  |
| UserConditions                                  | class    | created    | src/Generated/Shared/Transfer/UserConditionsTransfer                                  |
| User.uuid                                       | property | created    | src/Generated/Shared/Transfer/UserTransfer                                            |
| User.isWarehouseUser                            | property | created    | src/Generated/Shared/Transfer/UserTransfer                                            |
| UserCriteria.userConditions                     | property | created    | src/Generated/Shared/Transfer/UserCriteriaTransfer                                    |
| StockCriteriaFilter.uuids                       | property | created    | src/Generated/Shared/Transfer/StockCriteriaFilterTransfer                             |
| StockCriteriaFilter.stockIds                    | property | created    | src/Generated/Shared/Transfer/StockCriteriaFilterTransfer                             |
| Collection                                      | class    | deprecated | src/Generated/Shared/Transfer/CollectionTransfer                                      |
| UserCriteria.idUser                             | property | deprecated | src/Generated/Shared/Transfer/UserCriteriaTransfer                                    |
| UserCriteria.email                              | property | deprecated | src/Generated/Shared/Transfer/UserCriteriaTransfer                                    |
| UserCriteria.userReference                      | property | deprecated | src/Generated/Shared/Transfer/UserCriteriaTransfer                                    |
| UserCriteria.withExpanders                      | property | deprecated | src/Generated/Shared/Transfer/UserCriteriaTransfer                                    |
| StockCriteriaFilter.idStock                     | property | deprecated | src/Generated/Shared/Transfer/StockCriteriaFilterTransfer                             |

{% endinfo_block %}

## 3) Set up configuration

Optional: To make `warehouse-user-assignments` and `warehouse-tokens` resources protected, adjust the protected paths configuration:

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
             '/warehouse-tokens' => [
                'isRegularExpression' => false,
                'methods' => [
                    'post',
                ],
            ],
        ];
    }
}
```

## 4) Add translations

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

3. To add Zed translations, generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

* Make sure the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.
* Make sure the translation cache has been built:
   1. In the Back Office, go to **Users&nbsp;<span aria-label="and then">></span> Users**.
   2. For a user of your choice, click **Assign Warehouses**.
   Make sure that the **Warehouse User Assignment** table is translatable.

* Make sure you can switch the language in the Back Office:
1. Go to **Users&nbsp;<span aria-label="and then">></span> Users**.
2. For a user of your choice, click **Edit**.
  The **Edit User: `USER_NAME`** page opens. `USER_NAME` stands for the name of the user whose profile you edit.
3. From **INTERFACE LANGUAGE**, select another language.

{% endinfo_block %}

## 5) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                                    | SPECIFICATION                                                                                                                                                                                                         | PREREQUISITES | NAMESPACE                                                                                    |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------|
| WarehouseUserLoginRestrictionPlugin                       | Restricts access to the Back office for warehouse users.  |               | Spryker\Zed\WarehouseUser\Communication\Plugin\SecurityGui                                   |
| WarehouseUserAssignmentUserTableActionExpanderPlugin      | Expands the **User** table with the **Assign Warehouses** button.                                                                                                                                          |               | Spryker\Zed\WarehouseUserGui\Communication\Plugin\User                                       |
| WarehouseUserAssignmentUserFormExpanderPlugin             | Expands the User form with the **is_warehouse_user** checkbox.                                                                                                                                                          |               | Spryker\Zed\WarehouseUserGui\Communication\Plugin\User                                       |
| WarehouseTokenAuthorizationStrategyPlugin                 | Checks if the request identity is a valid user and warehouse.                                                                                                                                                         |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Authorization                                |
| OauthWarehouseInstallerPlugin                             | Installs the warehouse OAuth scope data.                                                                                                                                                                                  |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Installer                                    |
| WarehouseOauthUserProviderPlugin                          | If `OauthUserTransfer.idWarehouse` is provided, retrieves the warehouse user. If the warehouse user exists, expands `OauthUserTransfer`.                                                                                   |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                        |
| WarehouseOauthScopeProviderPlugin                         | Checks if the grant type is `\Spryker\Zed\OauthWarehouse\OauthWarehouseConfig::WAREHOUSE_GRANT_TYPE`.                     |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                        |
| WarehouseOauthRequestGrantTypeConfigurationProviderPlugin | Checks if the requested OAuth grant type equals to `\Spryker\Zed\OauthWarehouse\OauthWarehouseConfig::WAREHOUSE_GRANT_TYPE` and if the requested application context equals to `GlueBackendApiApplication`. |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                        |

**src/Pyz/Zed/SecurityGui/SecurityGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiDependencyProvider as SprykerSecurityGuiDependencyProvider;
use Spryker\Zed\WarehouseUser\Communication\Plugin\SecurityGui\WarehouseUserLoginRestrictionPlugin;

class SecurityGuiDependencyProvider extends SprykerSecurityGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SecurityGuiExtension\Dependency\Plugin\UserLoginRestrictionPluginInterface>
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
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserTableActionExpanderPluginInterface>
     */
    protected function getUserTableActionExpanderPlugins(): array
    {
        return [
            new WarehouseUserAssignmentUserTableActionExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserFormExpanderPluginInterface>
     */
    protected function getUserFormExpanderPlugins(): array
    {
        return [
            new WarehouseUserAssignmentUserFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the plugins work correctly:

1. In the Back Office, go to **Users&nbsp;<span aria-label="and then">></span> Users**.
2. Initiate creating a user or editing an existing user.
3. Make sure that the user form has the **This user is a warehouse user** checkbox.
4. Select the checkbox and submit the form.
5. On the **Users** page, make sure that the **Assign Warehouses** button is displayed for the user.
6. Log out from the Back Office.
7. Try to log into the Back Office with the warehouse user's login details.
    Make sure you can't log in.

{% endinfo_block %}

2. Enable the Backend API authorization for warehouse users by registering the plugins:

| PLUGIN                                                    | SPECIFICATION                                                                                                                                                                                                         | PREREQUISITES | NAMESPACE                                                                                    |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------|
| WarehouseTokenAuthorizationStrategyPlugin                 | Checks if the request identity is a valid user and warehouse.                                                                                                                                                         |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Authorization                                |
| OauthWarehouseInstallerPlugin                             | Installs the warehouse OAuth scope data.                                                                                                                                                                                  |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Installer                                    |
| WarehouseOauthUserProviderPlugin                          | If `OauthUserTransfer.idWarehouse` is provided, retrieves the warehouse user. If the warehouse user exists, expands `OauthUserTransfer`.                                                                                        |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                        |
| WarehouseOauthScopeProviderPlugin                         | Checks if the grant type is `\Spryker\Zed\OauthWarehouse\OauthWarehouseConfig::WAREHOUSE_GRANT_TYPE`.                                                                                                            |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                        |
| WarehouseOauthRequestGrantTypeConfigurationProviderPlugin | Checks if the requested OAuth grant type equals to `\Spryker\Zed\OauthWarehouse\OauthWarehouseConfig::WAREHOUSE_GRANT_TYPE` and if the requested application context equals to `GlueBackendApiApplication`. |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                        |
| WarehouseTokensBackendResourcePlugin                      | Registers the `warehouse-tokens` resource.                                                                                                                                                                            |               | Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplication                       |
| WarehouseRequestBuilderPlugin                             | If the warehouse credentials are valid, sets `GlueRequestTransfer.requestWarehouse`. |               | Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplication                       |
| WarehouseRequestValidatorPlugin                           | if a request has the Authorization header, validates if `GlueRequestTransfer.requestWarehouse` is set. |               | Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplication                       |
| WarehouseAuthorizationRequestExpanderPlugin               | Expands `AuthorizationRequestTransfer.entity` with `GlueRequestWarehouseTransfer`.                                                                                                                                    |               | Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplicationAuthorizationConnector |
| WarehouseUserRequestValidationPreCheckerPlugin            | Checks if `GlueRequestTransfer` has `GlueRequestWarehouseTransfer`. If true, sets `GlueRequestValidationTransfer` as valid.                                                                                       |               | Spryker\Glue\WarehouseOauthBackendApi\Plugin\OauthBackendApi                                 |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\OauthBackendApi\Plugin\GlueBackendApiApplication\UserRequestBuilderPlugin;
use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplication\WarehouseRequestBuilderPlugin;
use Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplication\WarehouseRequestValidatorPlugin;
use Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplication\WarehouseTokensBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new UserRequestBuilderPlugin(),
            new WarehouseRequestBuilderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            new WarehouseRequestValidatorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new WarehouseTokensBackendResourcePlugin(),
        ];
    }
}
```
</details>

**src/Pyz/Glue/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorDependencyProvider as SprykerGlueBackendApiApplicationAuthorizationConnectorDependencyProvider;
use Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplicationAuthorizationConnector\WarehouseAuthorizationRequestExpanderPlugin;

/**
 * @method \Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig getConfig()
 */
class GlueBackendApiApplicationAuthorizationConnectorDependencyProvider extends SprykerGlueBackendApiApplicationAuthorizationConnectorDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueBackendApiApplicationAuthorizationConnectorExtension\Dependency\Plugin\AuthorizationRequestExpanderPluginInterface>
     */
    protected function getAuthorizationRequestExpanderPlugins(): array
    {
        return [
            new WarehouseAuthorizationRequestExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/OauthBackendApi/OauthBackendApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\OauthBackendApi;

use Spryker\Glue\OauthBackendApi\OauthBackendApiDependencyProvider as SprykerOauthBackendApiDependencyProvider;
use Spryker\Glue\WarehouseOauthBackendApi\Plugin\OauthBackendApi\WarehouseUserRequestValidationPreCheckerPlugin;

/**
 * @method \Spryker\Glue\OauthBackendApi\OauthBackendApiConfig getConfig()
 */
class OauthBackendApiDependencyProvider extends SprykerOauthBackendApiDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\OauthBackendApiExtension\Dependency\Plugin\UserRequestValidationPreCheckerPluginInterface>
     */
    protected function getUserRequestValidationPreCheckerPlugins(): array
    {
        return [
            new WarehouseUserRequestValidationPreCheckerPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Authorization/AuthorizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Authorization;

use Spryker\Zed\Authorization\AuthorizationDependencyProvider as SprykerAuthorizationDependencyProvider;
use Spryker\Zed\OauthWarehouse\Communication\Plugin\Authorization\WarehouseTokenAuthorizationStrategyPlugin;

class AuthorizationDependencyProvider extends SprykerAuthorizationDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface>
     */
    protected function getAuthorizationStrategyPlugins(): array
    {
        return [
            new WarehouseTokenAuthorizationStrategyPlugin(),
        ];
    }
}
```
**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\OauthWarehouse\Communication\Plugin\Installer\OauthWarehouseInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface|\Spryker\Zed\InstallerExtension\Dependency\Plugin\InstallerPluginInterface>
     */
    public function getInstallerPlugins(): array
    {
        return [
            new OauthWarehouseInstallerPlugin(),
        ];
    }
}
```

<details open>
<summary markdown='span'>src/Pyz/Zed/Oauth/OauthDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth\WarehouseOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth\WarehouseOauthScopeProviderPlugin;
use Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth\WarehouseOauthUserProviderPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface>
     */
    protected function getUserProviderPlugins(): array
    {
        return [
            new WarehouseOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface>
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            new WarehouseOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRequestGrantTypeConfigurationProviderPluginInterface>
     */
    protected function getOauthRequestGrantTypeConfigurationProviderPlugins(): array
    {
        return [
            new WarehouseOauthRequestGrantTypeConfigurationProviderPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Users&nbsp;<span aria-label="and then">></span> Users**.
2. On the **Users** page, for the user of your choice, click **Edit**.
3. On the **Edit User: `{USER}`** page that opens, select **THIS USER IS A WAREHOUSE USER**.
4. Click **Update**.
5. On the **Users** page, for the user you've edited, click **Assign Warehouses**.
    This opens the **Assign Warehouse to User: `{USER_NAME}`** page.
6. In the **Select warehouses to assign** tab, for a warehouse of your choice, select **ASSIGN** and click **Save**.
7. Authenticate as the warehouse user:

```json
POST /access-tokens HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/vnd.api+json
Content-Length: 167
{
  "data": {
     "type": "access-tokens",
     "attributes": {
        "username": "{USERNAME}",
        "password": "{PASSWORD}"
     },
     "links": {
        "self": "https://glue-backend.mysprykershop.com/token"
     }
  }
}
```

9. Generate a warehouse token with the generated token from the previous step:

```json
POST /warehouse-tokens HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/vnd.api+json
Content-Length: 165
{
  "data": {
     "type": "warehouse-tokens",
     "links": {
        "self": "https://glue-backend.mysprykershop.com/warehouse-tokens"
     }
  }
}
```

{% endinfo_block %}

3. Enable the Backend API resource by registering the plugin:

| PLUGIN                                        | SPECIFICATION                                         | PREREQUISITES | NAMESPACE                                                              |
|-----------------------------------------------|-------------------------------------------------------|---------------|------------------------------------------------------------------------|
| WarehouseUserAssignmentsBackendResourcePlugin | Registers the `warehouse-user-assignments` resource.  |               | Spryker\Glue\WarehouseUsersBackendApi\Plugin\GlueBackendApiApplication |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\WarehouseUsersBackendApi\Plugin\GlueBackendApiApplication\WarehouseUserAssignmentsBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new WarehouseUserAssignmentsBackendResourcePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure you can send the following requests:

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
                "uuid": {% raw %}{{{% endraw %}warehouse-uuid{% raw %}}}{% end%}
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
