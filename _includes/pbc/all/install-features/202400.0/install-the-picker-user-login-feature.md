


This document describes how to integrate the Picker User Login feature into a Spryker project.

## Install feature core

Follow the steps below to install the Picker User Login feature core.

### Prerequisites

Install the required features:

| NAME                                    | VERSION          | INTEGRATION GUIDE                                                                                                                                                                  |
|-----------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse User Management               | {{page.version}} | [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/fulfillment-app/install-and-upgrade/install-features/install-the-warehouse-user-management-feature.html)                     |
| Order Management + Inventory Management | {{page.version}} | [Order Management + Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/fulfillment-app/install-and-upgrade/install-features/install-the-order-management-inventory-management-feature.html) |

### 1) Set up configuration

To make the `warehouse-tokens` resource protected, adjust the protected paths configuration:

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

### 2) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                                    | SPECIFICATION                                                                                                                                                                                                      | PREREQUISITES | NAMESPACE                                                                                     |
|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------|
| WarehouseAuthorizationRequestExpanderPlugin               | Expands `AuthorizationRequestTransfer.entity` with `GlueRequestWarehouseTransfer`.                                                                                                                                 |               | Spryker\Glue\WarehouseOauthBackendApi\Plugin\GlueBackendApiApplicationAuthorizationConnector  |
| WarehouseUserRequestValidationPreCheckerPlugin            | Checks if `GlueRequestTransfer` has `GlueRequestWarehouseTransfer`, and if true, sets `GlueRequestValidationTransfer` as valid.                                                                                      |               | Spryker\Glue\WarehouseOauthBackendApi\Plugin\OauthBackendApi                                  |
| WarehouseTokenAuthorizationStrategyPlugin                 | Checks if the request identity is a valid user and warehouse.                                                                                                                                                     |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Authorization                                 |
| OauthWarehouseInstallerPlugin                             | Installs warehouse OAuth scope data.                                                                                                                                                                               |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Installer                                     |
| WarehouseOauthUserProviderPlugin                          | Retrieves warehouse user if `OauthUserTransfer.idWarehouse` provided and expands `OauthUserTransfer` if warehouse user exists.                                                                                   |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                         |
| WarehouseOauthScopeProviderPlugin                         | Checks whether the grant type is `\Spryker\Zed\OauthWarehouse\OauthWarehouseConfig::WAREHOUSE_GRANT_TYPE`.                                                                                                           |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                         |
| WarehouseOauthRequestGrantTypeConfigurationProviderPlugin | Checks whether the requested OAuth grant type equals to `\Spryker\Zed\OauthWarehouse\OauthWarehouseConfig::WAREHOUSE_GRANT_TYPE` and whether the requested application context equals to `GlueBackendApiApplication`.  |               | Spryker\Zed\OauthWarehouse\Communication\Plugin\Oauth                                         |


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
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new UserRequestBuilderPlugin(),
            new WarehouseRequestBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            new WarehouseRequestValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
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
     * @return array<\Spryker\Shared\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface>
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
     * @return array<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface|\Spryker\Zed\InstallerExtension\Dependency\Plugin\InstallerPluginInterface>
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
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface>
     */
    protected function getUserProviderPlugins(): array
    {
        return [
            new WarehouseOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface>
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            new WarehouseOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRequestGrantTypeConfigurationProviderPluginInterface>
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

1. In the Back Office, go to **Users&nbsp;<span aria-label="and then">></span> Users**. This opens **USERS LIST**.
2. For a user of your choice, in **Actions**, click **Edit**.
3. On the **Edit User: `{USER_NAME}`** page that opens, select **THIS USER IS A WAREHOUSE USER**. The `{USER_NAME}` placeholder stands for the name of the user selected in the previous step.
4. Click **Update**.
5. Go back to **USERS LIST**.
6. For the user edited in step 2, in **Actions**, click **Assign Warehouses**. This opens the **Assign Warehouse to User: `{USER_NAME}`** page. The `{USER_NAME}` placeholder stands for the name of the user you're assigning a warehouse to.
7. In the **Select warehouses to assign** tab, for a needed warehouse, select **ASSIGN** and click **Save**.
8. Authenticate the user while requesting a token:

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
            "self": "https://glue-backend.mysprykershop.com/access-tokens"
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