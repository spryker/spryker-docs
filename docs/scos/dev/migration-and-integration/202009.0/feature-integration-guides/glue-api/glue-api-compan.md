---
title: Glue API- Company account feature integration
originalLink: https://documentation.spryker.com/v6/docs/glue-api-company-account-api-feature-integration
redirect_from:
  - /v6/docs/glue-api-company-account-api-feature-integration
  - /v6/docs/en/glue-api-company-account-api-feature-integration
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place.</br>The current Feature Integration Guide only adds the Company Account REST API functionality.
{% endinfo_block %}

Follow the steps below to install Company Account feature API.

## Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | master | [Glue Application Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio) |
| Company account | master | [Company Account](https://documentation.spryker.com/docs/company-account-integration-201907) |
| Customer Account Management | muster | [Customer API](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/customer-accoun) |
| Uuid generation console | master| UUID Generation Console |

## 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/company-user-auth-rest-api:"^2.0.0" spryker/oauth-company-user:"^2.0.0" spryker/oauth-permission:"^1.2.0" spryker/companies-rest-api:"^1.1.0" spryker/company-business-units-rest-api:"^1.2.0" spryker/company-business-unit-addresses-rest-api:"^1.0.0" spryker/company-roles-rest-api:"^1.1.0" spryker/company-users-rest-api:"^2.1.0" --update-with-dependencies
```

{% info_block warningBox %}

Make sure that the following modules are installed:
| Module | Expected Directory |
| --- | --- |
| `CompanyUserAuthRestApi` | `vendor/spryker/company-user-auth-rest-api` |
| `OauthCompanyUser` | `vendor/spryker/oauth-company-user` |
| `OauthPermission` | `vendor/spryker/oauth-permission` |
| `CompaniesRestApi` | `vendor/spryker/companies-rest-api` |
| `CompanyBusinessUnitsRestApi` | `vendor/spryker/company-business-units-rest-api` |
| `CompanyBusinessUnitAddressesRestApi` | `vendor/spryker/company-business-unit-addresses-rest-api` |
| `CompanyRolesRestApi` | `vendor/spryker/company-roles-rest-api` |
| `CompanyUsersRestApi` | `vendor/spryker/company-users-rest-api` |

{% endinfo_block %}

## 2) Set Up Configuration
Configure resources available only for company users
Add the following resource to the list of resources which are accessible only for company users:
<details open>
<summary>src/Pyz/Glue/CompanyUsersRestApi/CompanyUsersRestApiConfig.php</summary>
   
```
<?php
 
namespace Pyz\Glue\CompanyUsersRestApi;
 
use Spryker\Glue\CompanyUsersRestApi\CompanyUsersRestApiConfig as SprykerCompanyUsersRestApiConfig;
use Spryker\Glue\ShoppingListsRestApi\ShoppingListsRestApiConfig;
 
class CompanyUsersRestApiConfig extends SprykerCompanyUsersRestApiConfig
{
    protected const COMPANY_USER_RESOURCES = [
        ShoppingListsRestApiConfig::RESOURCE_SHOPPING_LISTS,
        ShoppingListsRestApiConfig::RESOURCE_SHOPPING_LIST_ITEMS,
    ];
}
```
 <br>
</details>


### 3) Set Up Database Schema and Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox %}

Make sure that the following changes have occurred:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCompanyAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCompanyAttributesTransfer.php` |
| `RestCompanyBusinessUnitAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCompanyBusinessUnitAttributesTransfer.php` |
| `RestCompanyBusinessUnitAddressesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCompanyBusinessUnitAddressesAttributesTransfer.php` |
| `RestCompanyRoleAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCompanyRoleAttributesTransfer.php` |
| `RestCompanyUserAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCompanyUserAttributesTransfer.php` |
| `CompanyUserAccessTokenRequestTransfer` | class | created | `src/Generated/Shared/Transfer/CompanyUserAccessTokenRequestTransfer.php` |
| `CompanyUserIdentifierTransfer` | class | created | `src/Generated/Shared/Transfer/CompanyUserIdentifierTransfer.php` |
| `RestCompanyUserAccessTokensAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCompanyUserAccessTokensAttributesTransfer.php` |
| `RestCompanyUserAccessTokenResponseAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCompanyUserAccessTokenResponseAttributesTransfer.php` |
| `CustomerIdentifierTransfer.idCompanyUser` | property | added | `src/Generated/Shared/Transfer/CustomerIdentifierTransfer.php` |
| `CustomerIdentifierTransfer.permissions` | property | added | `src/Generated/Shared/Transfer/CustomerIdentifierTransfer.php` |
| `OauthUserTransfer.customerReference` | property | added | `src/Generated/Shared/Transfer/OauthUserTransfer.php` |
| `OauthUserTransfer.idCompanyUser` | property | added | `src/Generated/Shared/Transfer/OauthUserTransfer.php` |
| `OauthRequestTransfer.customerReference` | property | added | `src/Generated/Shared/Transfer/OauthRequestTransfer.php` |
| `OauthRequestTransfer.idCompanyUser` | property | added | `src/Generated/Shared/Transfer/OauthRequestTransfer.php` |
| `RestUserTransfer.idCompany` | property | added | `src/Generated/Shared/Transfer/RestUserTransfer.php` |
| `RestUserTransfer.idCompanyUser` | property | added | `src/Generated/Shared/Transfer/RestUserTransfer.php` |
| `RestUserTransfer.uuidCompanyUser` | property | added | `src/Generated/Shared/Transfer/RestUserTransfer.php` |
| `OauthResponseTransfer.idCompanyUser` | property | added | `src/Generated/Shared/Transfer/OauthResponseTransfer.php` |
| `RestTokenResponseAttributesTransfer.idCompanyUser` | property | added | `src/Generated/Shared/Transfer/RestTokenResponseAttributesTransfer.php` |
| `CompanyUserCriteriaFilterTransfer.companyBusinessUnitUuids` | property | added | `src/Generated/Shared/Transfer/CompanyUserCriteriaFilterTransfer.php` |
| `CompanyUserCriteriaFilterTransfer.companyRolesUuids` | property | added | `src/Generated/Shared/Transfer/CompanyUserCriteriaFilterTransfer.php` |
| `CompanyUserCollectionTransfer.filter` | property | added | `src/Generated/Shared/Transfer/CompanyUserCollectionTransfer.php` |
| `CompanyUserCollectionTransfer.total` | property | added | `src/Generated/Shared/Transfer/CompanyUserCollectionTransfer.php` |
| `CustomerCollectionTransfer.customer` | property | added | `src/Generated/Shared/Transfer/CustomerCollectionTransfer.php` |
| `CompanyTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/CompanyTransfer.php` |
| `CompanyBusinessUnitTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer.php` |
| `CompanyUnitAddressTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/CompanyUnitAddressTransfer.php` |
| `CompanyRoleTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/CompanyRoleTransfer.php` |
| `CompanyUserTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/CompanyUserTransfer.php` |

{% endinfo_block %}

{% info_block warningBox %}

Verify that the following changes have occurred in the database:

| Database entity | Type | Event |
| --- | --- | --- |
| `spy_company_unit_address.uuid` | column | added |
| `spy_company.uuid` | column | added |
| `spy_company_business_unit.uuid` | column | added |
| `spy_company_role.uuid` | column | added |
| `spy_company_user.uuid` | column | added |

{% endinfo_block %}

## 4) Set Up Behavior
### Generate UUIDs for the existing Company records without UUIDs

Run the following command:

```bash
console uuid:generate Company spy_company
```
{% info_block warningBox %}

Make sure that the UUID field is populated for all records in the `spy_company table`. To do so, run the following SQL query and make sure that the result contains **0** records:
```sql
select count(*) from spy_company where uuid is NULL;
```

{% endinfo_block %}

### Generate UUIDs for the existing Company Business Unit records without UUIDs

Run the following command:

```bash
console uuid:generate CompanyBusinessUnit spy_company_business_unit
```
{% info_block warningBox %}

Make sure that the UUID field is populated for all records in the `spy_company_business_unit` table. To do so, run the following SQL query and make sure that the result contains **0** records:

```sql
select count(*) from spy_company_business_unit where uuid is NULL;
```

{% endinfo_block %}

### Generate UUIDs for the existing Company Role records without UUIDs

Run the following command:

```bash
console uuid:generate CompanyRole spy_company_role
```
{% info_block warningBox %}

Make sure that the UUID field is populated for all records in the `spy_company_role` table. To do so, run the following SQL query and make sure that the result contains **0** records:

```sql
select count(*) from spy_company_role where uuid is NULL;
```

{% endinfo_block %}

### Generate UUIDs for the existing Company Business Unit Address records without UUIDs

Run the following command:

```bash
console uuid:generate CompanyUnitAddress spy_company_unit_address
```
{% info_block warningBox %}

Make sure that the UUID field is populated for all records in the `spy_company_unit_address` table. To do so, run the following SQL query and make sure that the result contains **0** records:

```sql
select count(*) from spy_company_unit_address where uuid is NULL;
```

{% endinfo_block %}

### Generate UUIDs for the existing Company User records that do not have UUIDs

Run the following command:

```bash
console uuid:generate CompanyUser spy_company_user
```
{% info_block warningBox %}

Make sure that the UUID field is populated for all records in the `spy_company_user` table. To do so, run the following SQL query and make sure that the result contains **0** records:
```sql
select count(*) from spy_company_user where uuid is NULL;
```

{% endinfo_block %}

### Enable resources and relationships

{% info_block infoBox %}

`CompaniesResourcePlugin` GET, `CompanyBusinessUnitsResourcePlugin` GET, `CompanyBusinessUnitAddressesResourcePlugin` GET, `CompanyRolesResourcePlugin` GET, `CompanyUsersResourceRoutePlugin` GET verbs are protected resources. For details, refer to the Configure section of [Configure documentation](https://documentation.spryker.com/glue_rest_api/glue_api_developer_guides/glue-infrastructure.htm?Highlight=glue#resource-routing).

{% endinfo_block %}

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CompaniesResourcePlugin` | Registers the `companies` resource. | None | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompaniesResourcePlugin` |
| `CompanyBusinessUnitsResourcePlugin` | Registers the `company-business-units` resource. | None | `Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication\CompanyBusinessUnitsResourcePlugin` |
| `CompanyBusinessUnitAddressesResourcePlugin` | Registers the `company-business-unit-address` resource. | None | `Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesResourcePlugin` |
| `CompanyBusinessUnitCustomerExpanderPlugin` | Expands the customer session transfer with the company business unit transfer. | None | `Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\CustomersRestApi` |
| `CompanyRolesResourcePlugin` | Registers the `company-roles` resource. | None | `Spryker\Glue\CompanyRolesRestApi\Plugin\GlueApplication\CompanyRolesResourcePlugin` |
| `CompanyUserCustomerExpanderPlugin` | Expands customer transfer with company user transfer. | None | `Spryker\Glue\CompanyUsersRestApi\Plugin\CustomersRestApi` |
| `CompanyUsersResourceRoutePlugin` | Registers the `company-users` resource. | None | `Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUsersResourceRoutePlugin` |
| `CompanyUserRestUserValidatorPlugin` | Checks that the Rest user is a company user. | None | `Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication` |
| `CompanyByCompanyRoleResourceRelationshipPlugin` | Adds the `companies` resource as a relationship to the resource that will provide `CompanyRoleTransfer` as a payload. | None | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyRoleResourceRelationshipPlugin` |
| `CompanyByCompanyBusinessUnitResourceRelationshipPlugin` | Adds the `companies` resource as a relationship to the resource that will provide `CompanyBusinessUnitTransfer` as a payload. | None | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyBusinessUnitResourceRelationshipPlugin` |
| `CompanyByCompanyUserResourceRelationshipPlugin` | Adds the `companies` resource as a relationship to the resource that will provide `CompanyUserTransfer` as a payload. | None | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyUserResourceRelationshipPlugin` |
| `CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin` | Adds the `company-business-unit-addresses` resource as a relationship to the `company-business-units` resource. | None | `Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin` |
| `CompanyBusinessUnitByCompanyUserResourceRelationshipPlugin` | Adds the `company-business-units` resource as a relationship. Requires `CompanyUserTransfer` to be provided in the resource payload. | None | `Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication` |
| `CompanyRoleByCompanyUserResourceRelationshipPlugin` | Adds the `companies` resource as a relationship. Requires the `CompanyUserTransfer` to be provided in the resource payload. | None | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication` |
| `CustomerByCompanyUserResourceRelationshipPlugin` | Adds the `customers` resource as a relationship when the `CompnayUserTransfer` is provided as a payload. | None | `Spryker\Glue\CustomersRestApi\Plugin\GlueApplication` |
| `CompanyUserOauthCustomerIdentifierExpanderPlugin` | Expands `CustomerIdentifierTransfer` with Company User UUID, if it is set up in `CustomerTransfer`. | None | `Spryker\Zed\CompanyUsersRestApi\Communication\Plugin\OauthCustomerConnector` |
| `CompanyUserRestUserMapperPlugin` | Maps the Company User data to the REST user identifier. | None | `Spryker\Glue\CompanyUserAuthRestApi\Plugin\AuthRestApi` |
| `OauthUserIdentifierFilterPermissionPlugin` | Filters the user identifier array to remove configured keys before persisting. | None | `Spryker\Zed\OauthPermission\Communication\Plugin\Filter` |
| `RefreshTokenPermissionOauthUserIdentifierFilterPlugin` | Filters the user identifier array to remove configured keys before persisting.. | None | `Spryker\Zed\OauthPermission\Communication\Plugin\OauthRevoke` |
| `PermissionOauthCompanyUserIdentifierExpanderPlugin` | If `idCompanyUser` is set in `CompanyUserTransfer`, expands `CompanyUserIdentifierTransfer` with a collection of permissions. | None | `Spryker\Zed\OauthPermission\Communication\Plugin\OauthCompanyUser` |
| `PermissionOauthCustomerIdentifierExpanderPlugin` | If `idCompanyUser` is set in `CustomerIdentifierTransfer`, expands `CustomerIdentifierTransfer` with a collection of permissions. | None | `Spryker\Zed\OauthPermission\Communication\Plugin\OauthCustomerConnector` |
| `CompanyUserAccessTokensResourceRoutePlugin` | Registers the `company-user-access-tokens` resource | None | `Spryker\Glue\CompanyUserAuthRestApi\Plugin\GlueApplication` |

src/Pyz/Zed/OauthCustomerConnector/OauthCustomerConnectorDependencyProvider.php
    
```php
<?php
 
namespace Pyz\Zed\OauthCustomerConnector;
 
use Spryker\Zed\CompanyUsersRestApi\Communication\Plugin\OauthCustomerConnector\CompanyUserOauthCustomerIdentifierExpanderPlugin;
use Spryker\Zed\OauthCustomerConnector\OauthCustomerConnectorDependencyProvider as SprykerOauthCustomerConnectorDependencyProvider;
use Spryker\Zed\OauthPermission\Communication\Plugin\OauthCustomerConnector\PermissionOauthCustomerIdentifierExpanderPlugin;
 
class OauthCustomerConnectorDependencyProvider extends SprykerOauthCustomerConnectorDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthCustomerConnectorExtension\Dependency\Plugin\OauthCustomerIdentifierExpanderPluginInterface[]
     */
    protected function getOauthCustomerIdentifierExpanderPlugins(): array
    {
        return [
            new CompanyUserOauthCustomerIdentifierExpanderPlugin(),
            new PermissionOauthCustomerIdentifierExpanderPlugin(),
        ];
    }
}
```

src/Pyz/Glue/AuthRestApi/AuthRestApiDependencyProvider.php
    
```php
<?php
 
namespace Pyz\Glue\AuthRestApi;
 
use Spryker\Glue\AuthRestApi\AuthRestApiDependencyProvider as SprykerAuthRestApiDependencyProvider;
use Spryker\Glue\OauthCompanyUser\Plugin\AuthRestApi\CompanyUserRestUserMapperPlugin;
 
class AuthRestApiDependencyProvider extends SprykerAuthRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\AuthRestApiExtension\Dependency\Plugin\RestUserMapperPluginInterface[]
     */
    protected function getRestUserExpanderPlugins(): array
    {
        return [
            new CompanyUserRestUserMapperPlugin(),
        ];
    }
}
```

src/Pyz/Zed/OauthCompanyUser/OauthCompanyUserDependencyProvider.php
    
```php
<?php
 
namespace Pyz\Zed\OauthCompanyUser;
 
use Spryker\Zed\OauthCompanyUser\OauthCompanyUserDependencyProvider as SprykerOauthCompanyUserDependencyProvider;
use Spryker\Zed\OauthPermission\Communication\Plugin\OauthCompanyUser\PermissionOauthCompanyUserIdentifierExpanderPlugin;
 
class OauthCompanyUserDependencyProvider extends SprykerOauthCompanyUserDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthCompanyUserExtension\Dependency\Plugin\OauthCompanyUserIdentifierExpanderPluginInterface[]
     */
    protected function getOauthCompanyUserIdentifierExpanderPlugins(): array
    {
        return [
            new PermissionOauthCompanyUserIdentifierExpanderPlugin(),
        ];
    }
}
```

src/Pyz/Zed/Oauth/OauthDependencyProvider.php
    
```php
<?php
 
namespace Pyz\Zed\Oauth;
 
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthPermission\Communication\Plugin\Filter\OauthUserIdentifierFilterPermissionPlugin;
 
class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserIdentifierFilterPluginInterface[]
     */
    protected function getOauthUserIdentifierFilterPlugins(): array
    {
        return [
            new OauthUserIdentifierFilterPermissionPlugin(),
        ];
    }
}
```

src/Pyz/Zed/OauthRevoke/OauthRevokeDependencyProvider.php
    
```php
<?php
 
namespace Pyz\Zed\OauthRevoke;
 
use Spryker\Zed\OauthPermission\Communication\Plugin\OauthRevoke\RefreshTokenPermissionOauthUserIdentifierFilterPlugin;
use Spryker\Zed\OauthRevoke\OauthRevokeDependencyProvider as SprykerRevokeOauthDependencyProvider;
 
class OauthRevokeDependencyProvider extends SprykerRevokeOauthDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthRevokeExtension\Dependency\Plugin\OauthUserIdentifierFilterPluginInterface[]
     */
    protected function getOauthUserIdentifierFilterPlugins(): array
    {
        return [
            new RefreshTokenPermissionOauthUserIdentifierFilterPlugin(),
        ];
    }
}
```

src/Pyz/Zed/OauthPermission/OauthPermissionConfig.php
    
```php
<?php
 
namespace Pyz\Zed\OauthPermission;
 
use Generated\Shared\Transfer\CustomerIdentifierTransfer;
use Spryker\Zed\OauthPermission\OauthPermissionConfig as SprykerOauthPermissionConfig;
 
class OauthPermissionConfig extends SprykerOauthPermissionConfig
{
    /**
     * @return array
     */
    public function getOauthUserIdentifierFilterKeys(): array
    {
        return [
            CustomerIdentifierTransfer::PERMISSIONS,
        ];
    }
}
```

<details open>
<summary>src/Pyz/Glue/CustomersRestApi/CustomersRestApiDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\CustomersRestApi;
 
use Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\CustomersRestApi\CompanyBusinessUnitCustomerExpanderPlugin;
use Spryker\Glue\CompanyUsersRestApi\Plugin\CustomersRestApi\CompanyUserCustomerExpanderPlugin;
use Spryker\Glue\CustomersRestApi\CustomersRestApiDependencyProvider as SprykerCustomersRestApiDependencyProvider;
 
class CustomersRestApiDependencyProvider extends SprykerCustomersRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CustomersRestApiExtension\Dependency\Plugin\CustomerExpanderPluginInterface[]
     */
    protected function getCustomerExpanderPlugins(): array
    {
        return array_merge(parent::getCustomerExpanderPlugins(), [
            new CompanyUserCustomerExpanderPlugin(),
            new CompanyBusinessUnitCustomerExpanderPlugin(),
        ]);
    }
}
```

</br>
</details>

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
   
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompaniesResourcePlugin;
use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyBusinessUnitResourceRelationshipPlugin;
use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyRoleResourceRelationshipPlugin;
use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyUserResourceRelationshipPlugin;
use Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin;
use Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesResourcePlugin;
use Spryker\Glue\CompanyBusinessUnitsRestApi\CompanyBusinessUnitsRestApiConfig;
use Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication\CompanyBusinessUnitByCompanyUserResourceRelationshipPlugin;
use Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication\CompanyBusinessUnitsResourcePlugin;
use Spryker\Glue\CompanyRolesRestApi\CompanyRolesRestApiConfig;
use Spryker\Glue\CompanyRolesRestApi\Plugin\GlueApplication\CompanyRoleByCompanyUserResourceRelationshipPlugin;
use Spryker\Glue\CompanyRolesRestApi\Plugin\GlueApplication\CompanyRolesResourcePlugin;
use Spryker\Glue\CompanyUserAuthRestApi\Plugin\GlueApplication\CompanyUserAccessTokensResourceRoutePlugin;
use Spryker\Glue\CompanyUsersRestApi\CompanyUsersRestApiConfig;
use Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUserRestUserValidatorPlugin;
use Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUsersResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\CustomerByCompanyUserResourceRelationshipPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new CompanyUsersResourceRoutePlugin(),
            new CompaniesResourcePlugin(),
            new CompanyBusinessUnitsResourcePlugin(),
            new CompanyBusinessUnitAddressesResourcePlugin(),
            new CompanyRolesResourcePlugin(),
            new CompanyUserAccessTokensResourceRoutePlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestUserValidatorPluginInterface[]
     */
    protected function getRestUserValidatorPlugins(): array
    {
        return [
            new CompanyUserRestUserValidatorPlugin(),
        ];
    }
 
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            CompanyUsersRestApiConfig::RESOURCE_COMPANY_USERS,
            new CompanyByCompanyUserResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CompanyUsersRestApiConfig::RESOURCE_COMPANY_USERS,
            new CompanyBusinessUnitByCompanyUserResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CompanyUsersRestApiConfig::RESOURCE_COMPANY_USERS,
            new CompanyRoleByCompanyUserResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CompanyRolesRestApiConfig::RESOURCE_COMPANY_ROLES,
            new CompanyByCompanyRoleResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CompanyBusinessUnitsRestApiConfig::RESOURCE_COMPANY_BUSINESS_UNITS,
            new CompanyByCompanyBusinessUnitResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CompanyBusinessUnitsRestApiConfig::RESOURCE_COMPANY_BUSINESS_UNITS,
            new CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CompanyUsersRestApiConfig::RESOURCE_COMPANY_USERS,
            new CustomerByCompanyUserResourceRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```
 <br>
</details>


{% info_block warningBox %}

To verify that everything is set up correctly, first, you need to authenticate as a regular customer. Then, to get the ID of the Company Users you can impersonate as, send a `GET` request to `http://glue.mysprykershop.com/company-users/mine`.

http://mysprykershop.com/company-users/mine response
    
```json
{
    "data": [{
        "type": "company-users",
        "id": "8da78283-e629-5667-9f84-e13207a7aef9",
        "attributes": {
            "isActive": true,
            "isDefault": false
        },
        "links": {
            "self": "http://mysprykershop.com/company-users/8da78283-e629-5667-9f84-e13207a7aef9"
        }
    }]
}
```

To log in as a Company User, send a `POST` request to `http://glue.mysprykershop.com/company-user-access-tokens` passing the ID of the necessary Company User in the request. Make sure that the response contains all the necessary data.

http://mysprykershop.com/company-user-access-tokens request
    
```json
{
    "data": {
        "type": "company-user-access-tokens",
        "attributes": {
            "idCompanyUser": "8da78283-e629-5667-9f84-e13207a7aef9"
        }
    }
}
```

http://mysprykershop.com/company-user-access-tokens response
    
```json
{
    "data": {
        "type": "company-user-access-tokens",
        "id": null,
        "attributes": {
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjYxNDdjO",
            "refreshToken": "def5020063fc3a3eaed61198b1fd77231cf620dcf9b0de9697cc"
        },
        "links": {
            "self": " http://mysprykershop.com/company-user-access-tokens"
        }
    }
}
```

To verify that all the required data is provided in the access token, go to [jwt.io](https://jwt.io/){target="_blank"} to decode the token and check that the required `customer_reference`, `id_customer`, `id_company_user` and permissions are present in the `sub` property of the payload data.

{% endinfo_block %}

{% info_block warningBox %}

Make sure that the permission data is filtered out based on the record in the `spy_oauth_access_token` table. For this purpose, you can run the following SQL query and make sure that the result doesn't have any permissions-related data from the `user_identifier` column.

```sql
SELECT * FROM spy_oauth_access_token WHERE user_identifier LIKE '%{"id_company_user":"8da78283-e629-5667-9f84-e13207a7aef9"%';
```

{% endinfo_block %}

{% info_block warningBox %}

Make sure that the permission data is filtered out based on the record in the `spy_oauth_refresh_token` table. For this purpose, you can run the following SQL query and make sure that the result doesn't have any permissions-related data from the `user_identifier` column.

```sql
SELECT * FROM spy_oauth_refresh_token WHERE user_identifier LIKE '%{"id_company_user":"8da78283-e629-5667-9f84-e13207a7aef9"%';
```

{% endinfo_block %}

{% info_block warningBox %}

To make sure the `CompanyUserRestUserValidatorPlugin` is setup correctly, make sure that the user who is not a company user can't access resources listed in  `CompanyUsersRestApiConfig::COMPANY_USER_RESOURCES` and the following error appears:

```json

{
    "errors": [
        {
            "detail": "Rest user is not a company user.",
            "code": "1401",
            "status": 400
        }
    ]
}
```

{% endinfo_block %}



{% info_block warningBox %}

Send a `GET` request to `http://glue.mysprykershop.com/companies/mine`. Make sure that the response contains a collection of resources with the companies that your current Company User belongs to.

Send a `GET` request to `http://glue.mysprykershop.com/companies/{% raw %}{{{% endraw %}company_uuid{% raw %}}}{% endraw %}`. Make sure that the response contains a single company resource that your current Company User belongs to.

{% endinfo_block %}

{% info_block warningBox %}

Send a `GET` request to `http://glue.mysprykershop.com/company-business-units/mine?include=companies,company-business-unit-addresses`. Make sure that the response contains a collection of resources with the company business units that your current Company User belongs to. Make sure that the `companies` and `addresses` relationships are present.

Send a `GET` request to `http://glue.mysprykershop.com/company-business-units/{% raw %}{{{% endraw %}company_business_unit_uuid{% raw %}}}{% endraw %}?include=companies,company-business-unit-addresses`. Make sure that the response contains a single company business unit resource that your current Company User belongs to. Make sure that the `companies` and `addresses` relationships are present.

{% endinfo_block %}

{% info_block warningBox %}

Send a `GET` request to `http://glue.mysprykershop.com/company-business-unit-addresses/{% raw %}{{{% endraw %}company_business_unit_address_uuid{% raw %}}}{% endraw %}`. Make sure that response contains a single company business unit address resource that your current company has.

{% endinfo_block %}

{% info_block warningBox %}

Send a `GET` request to `http://glue.mysprykershop.com/company-roles/mine?include=companies`. Make sure that the response contains the collection of resources with all company roles that your current Company User has. Make sure that the `companies` relationship is present.

Send a `GET` request to `http://glue.mysprykershop.com/company-roles/{% raw %}{{{% endraw %}company_role_uuid{% raw %}}}{% endraw %}?include=companies`. Make sure that the response contains a single company role resource that your current Company User has. Make sure that the `companies` relationship is present.

{% endinfo_block %}

{% info_block warningBox %}

Send a `GET` request to `http://glue.mysprykershop.com/company-users?include=company-roles,companies,company-business-units,customers`. Make sure that the response contains a collection of resources with all the Company Users in your current company. Make sure that the `company-roles`, `companies`, `company-business-units` and `customers` relationships are present.

Send a `GET` request to `http://glue.mysprykershop.com/company-roles/mine?include=company-roles,companies,company-business-units,customers`. Make sure that the response contains a collection of resources with all the Company Users that the current user can impersonate as. Make sure that the `company-roles`, `companies`, `company-business-units` and `customers` relationships are present.

Send a `GET` request to `http://glue.mysprykershop.com/company-users/{% raw %}{{{% endraw %}company_user_uuid{% raw %}}}{% endraw %}?include=company-roles,companies,company-business-units,customers`. Make sure that the response contains a single Company User. Make sure that the `company-roles`, `companies`, `company-business-units` and `customers` relationships are present.

{% endinfo_block %}

