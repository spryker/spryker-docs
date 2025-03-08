

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place. It adds only the Company Account REST API functionality.

{% endinfo_block %}

This document describes how to install the Company Account feature API.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| FEATURE OR GLUE API  | VERSION    | INSTALLATION GUIDE    |
| ----------------- | ---------- | --------------------- |
| Glue API: Spryker Core                | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Company Account                       | {{page.version}}  | [Install the Company account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Glue API: Customer Account Management | {{page.version}} | [Install the Customer Account Management Glue API](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-customer-account-management-glue-api.html) |
| Glue API: Glue Application            | {{page.version}} | [Install the Glue Application Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| UUID Generation Console               | {{page.version}}  |  |
| Glue API: Shipment                    | {{page.version}}  | [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html) |
| Glue API: Checkout                    | {{page.version}} | [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html) |



## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/company-user-auth-rest-api:"^2.0.0" spryker/oauth-company-user:"^2.0.0" spryker/oauth-permission:"^1.2.0" spryker/companies-rest-api:"^1.1.0" spryker/company-business-units-rest-api:"^1.2.0" spryker/company-business-unit-addresses-rest-api:"^1.1.0" spryker/company-roles-rest-api:"^1.1.0" spryker/company-users-rest-api:"^2.2.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                              | EXPECTED DIRECTORY                                      |
| ----------------------------------- | ------------------------------------------------------- |
| CompanyUserAuthRestApi              | vendor/spryker/company-user-auth-rest-api               |
| OauthCompanyUser                    | vendor/spryker/oauth-company-user                       |
| OauthPermission                     | vendor/spryker/oauth-permission                         |
| CompaniesRestApi                    | vendor/spryker/companies-rest-api                       |
| CompanyBusinessUnitsRestApi         | vendor/spryker/company-business-units-rest-api          |
| CompanyBusinessUnitAddressesRestApi | vendor/spryker/company-business-unit-addresses-rest-api |
| CompanyRolesRestApi                 | vendor/spryker/company-roles-rest-api                   |
| CompanyUsersRestApi                 | vendor/spryker/company-users-rest-api                   |

{% endinfo_block %}


## 2) Set up configuration: Configure the resources available for company users

Add the following resource to the list of resources that are accessible only for company users:

**src/Pyz/Glue/CompanyUsersRestApi/CompanyUsersRestApiConfig.php**

```php
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

## 3) Set up database schema and transfer objects

Generate transfer changes:

```bash
console propel:install
console transfer:generate
```


{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred:

| TRANSFER     | TYPE     | EVENT   | PATH             |
| -------------- | -------- | ------- | -------------------- |
| RestCompanyAttributesTransfer                              | class    | created | src/Generated/Shared/Transfer/RestCompanyAttributesTransfer.php |
| RestCompanyBusinessUnitAttributesTransfer                  | class    | created | src/Generated/Shared/Transfer/RestCompanyBusinessUnitAttributesTransfer.php |
| RestCompanyBusinessUnitAddressesAttributesTransfer         | class    | created | src/Generated/Shared/Transfer/RestCompanyBusinessUnitAddressesAttributesTransfer.php |
| RestCompanyRoleAttributesTransfer                          | class    | created | src/Generated/Shared/Transfer/RestCompanyRoleAttributesTransfer.php |
| RestCompanyUserAttributesTransfer                          | class    | created | src/Generated/Shared/Transfer/RestCompanyUserAttributesTransfer.php |
| CompanyUserAccessTokenRequestTransfer                      | class    | created | src/Generated/Shared/Transfer/CompanyUserAccessTokenRequestTransfer.php |
| CompanyUserIdentifierTransfer                              | class    | created | src/Generated/Shared/Transfer/CompanyUserIdentifierTransfer.php |
| RestCompanyUserAccessTokensAttributesTransfer              | class    | created | src/Generated/Shared/Transfer/RestCompanyUserAccessTokensAttributesTransfer.php |
| RestCompanyUserAccessTokenResponseAttributesTransfer       | class    | created | src/Generated/Shared/Transfer/RestCompanyUserAccessTokenResponseAttributesTransfer.php |
| CustomerIdentifierTransfer.idCompanyUser                   | property | added   | src/Generated/Shared/Transfer/CustomerIdentifierTransfer.php |
| CustomerIdentifierTransfer.permissions                     | property | added   | src/Generated/Shared/Transfer/CustomerIdentifierTransfer.php |
| OauthUserTransfer.customerReference                        | property | added   | src/Generated/Shared/Transfer/OauthUserTransfer.php          |
| OauthUserTransfer.idCompanyUser                            | property | added   | src/Generated/Shared/Transfer/OauthUserTransfer.php          |
| OauthRequestTransfer.customerReference                     | property | added   | src/Generated/Shared/Transfer/OauthRequestTransfer.php       |
| OauthRequestTransfer.idCompanyUser                         | property | added   | src/Generated/Shared/Transfer/OauthRequestTransfer.php       |
| RestUserTransfer.idCompany                                 | property | added   | src/Generated/Shared/Transfer/RestUserTransfer.php           |
| RestUserTransfer.idCompanyUser                             | property | added   | src/Generated/Shared/Transfer/RestUserTransfer.php           |
| RestUserTransfer.uuidCompanyUser                           | property | added   | src/Generated/Shared/Transfer/RestUserTransfer.php           |
| OauthResponseTransfer.idCompanyUser                        | property | added   | src/Generated/Shared/Transfer/OauthResponseTransfer.php      |
| RestTokenResponseAttributesTransfer.idCompanyUser          | property | added   | src/Generated/Shared/Transfer/RestTokenResponseAttributesTransfer.php |
| CompanyUserCriteriaFilterTransfer.companyBusinessUnitUuids | property | added   | src/Generated/Shared/Transfer/CompanyUserCriteriaFilterTransfer.php |
| CompanyUserCriteriaFilterTransfer.companyRolesUuids        | property | added   | src/Generated/Shared/Transfer/CompanyUserCriteriaFilterTransfer.php |
| CompanyUserCollectionTransfer.filter                       | property | added   | src/Generated/Shared/Transfer/CompanyUserCollectionTransfer.php |
| CompanyUserCollectionTransfer.total                        | property | added   | src/Generated/Shared/Transfer/CompanyUserCollectionTransfer.php |
| CustomerCollectionTransfer.customer                        | property | added   | src/Generated/Shared/Transfer/CustomerCollectionTransfer.php |
| CompanyTransfer.uuid                                       | property | added   | src/Generated/Shared/Transfer/CompanyTransfer.php            |
| CompanyBusinessUnitTransfer.uuid                           | property | added   | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer.php |
| CompanyUnitAddressTransfer.uuid                            | property | added   | src/Generated/Shared/Transfer/CompanyUnitAddressTransfer.php |
| CompanyRoleTransfer.uuid                                   | property | added   | src/Generated/Shared/Transfer/CompanyRoleTransfer.php        |
| CompanyUserTransfer.uuid                                   | property | added   | src/Generated/Shared/Transfer/CompanyUserTransfer.php        |
| RestCustomerTransfer                                       | class    | added   | src/Generated/Shared/Transfer/RestCustomerTransfer.php       |
| RestCheckoutRequestAttributesTransfer                      | class    | added   | src/Generated/Shared/Transfer/RestCustomerTransfer.php       |
| RestCheckoutDataTransfer                                   | class    | created | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php   |
| RestAddressTransfer                                        | class    | created | src/Generated/Shared/Transfer/RestAddressTransfer.php        |
| QuoteTransfer                                              | class    | created | src/Generated/Shared/Transfer/QuoteTransfer.php              |
| AddressTransfer                                            | class    | created | src/Generated/Shared/Transfer/AddressTransfer.php            |
| ItemTransfer                                               | class    | created | src/Generated/Shared/Transfer/ItemTransfer.php               |
| ShipmentTransfer                                           | class    | created | src/Generated/Shared/Transfer/ShipmentTransfer.php           |
| CustomerTransfer                                           | class    | created | src/Generated/Shared/Transfer/CustomerTransfer.php           |
| CompanyUserTransfer                                        | class    | created | src/Generated/Shared/Transfer/CompanyUserTransfer.php        |
| CheckoutResponseTransfer                                   | class    | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer.php   |
| CheckoutDataTransfer                                       | class    | created | src/Generated/Shared/Transfer/CheckoutDataTransfer.php       |
| CheckoutErrorTransfer                                      | class    | created | src/Generated/Shared/Transfer/CheckoutErrorTransfer.php      |
| RestShipmentsTransfer                                      | class    | created | src/Generated/Shared/Transfer/RestShipmentsTransfer.php      |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify that the following changes have occurred in the database:

| DATABASE ENTITY                | TYPE   | EVENT |
| ------------------------------ | ------ | ----- |
| spy_company_unit_address.uuid  | column | added |
| spy_company.uuid               | column | added |
| spy_company_business_unit.uuid | column | added |
| spy_company_role.uuid          | column | added |
| spy_company_user.uuid          | column | added |

{% endinfo_block %}

## 4) Add translations

1. Append glossary according to your configuration:

```csv
checkout.validation.company_address.not_found,Company address with ID %id% not found.,en_US
checkout.validation.company_address.not_found, Firmenanschrift mit ID %id% wurde nicht gefunden.,de_DE
checkout.validation.company_address.not_applicable,Company addresses are applicable only for company users.,en_US
checkout.validation.company_address.not_applicable,Firmenanschriften sind nur für die Firmennutzer anzuwenden.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

## 5) Set up behavior

Set up the following behaviors.

### Generate UUIDs for the existing company records without UUIDs

Generate the `UUID` column values in the `spy_company` database table:

```bash
console uuid:generate Company spy_company
```


{% info_block warningBox "Verification" %}

Make sure that, in the `spy_company` table, the `UUID` field has populated for all the records. To do so, run the following SQL query and check that the result contains 0 records:

```sql
select count(*) from spy_company where uuid is NULL;
```

{% endinfo_block %}

### Generate UUIDs for the existing company business unit records without UUID

Run the following command:

```bash
console uuid:generate CompanyBusinessUnit spy_company_business_unit
```


{% info_block warningBox "Verification" %}

Make sure that, in the `spy_company_business_unit` table, the `UUID` field has been populated for all the records. To do so, run the following SQL query and check that the result contains `0` records:

```sql
select count(*) from spy_company_business_unit where uuid is NULL;
```

{% endinfo_block %}

### Generate UUIDs for the existing company role records without UUID

Run the following command:

```bash
console uuid:generate CompanyRole spy_company_role
```


{% info_block warningBox "Verification" %}

Make sure that, in the `spy_company_role` table, the `UUID` field has been populated for all the records. To do so, run the following SQL query and check that the result contains `0` records:

```sql
select count(*) from spy_company_role where uuid is NULL;
```

{% endinfo_block %}

### Generate UUIDs for the existing Company Business Unit Address records without UUID

Run the following command:

```bash
console uuid:generate CompanyUnitAddress spy_company_unit_address
```

{% info_block warningBox "Verification" %}

Make sure that, in the `spy_company_unit_address` table, the `UUID` field has been populated for all the records. To do so, run the following SQL query and check that the result contains `0` records:

```sql
select count(*) from spy_company_unit_address where uuid is NULL;
```

{% endinfo_block %}

### Generate UUIDs for the existing company user records without UUID:

Run the following command:

```bash
console uuid:generate CompanyUser spy_company_user
```


{% info_block warningBox "Verification" %}

Make sure that, in the `spy_company_user table`, the `UUID` field has been populated for all the records. To do so, run the following SQL query and check that the result contains `0` records:

```sql
select count(*) from spy_company_user where uuid is NULL;
```

{% endinfo_block %}

### Enable resources and relationships

Activate the following plugins:


| PLUGIN  | SPECIFICATION   | PREREQUISITES | NAMESPACE   |
| ------------------ | -------------------- | ------------- | ------------------ |
| CompaniesResourcePlugin                                      | Registers the `companies` resource.                            |               | Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompaniesResourcePlugin |
| CompanyBusinessUnitsResourcePlugin                           | Registers the `company-business-units` resource.               |               | Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication\CompanyBusinessUnitsResourcePlugin |
| CompanyBusinessUnitAddressesResourcePlugin                   | Registers the `company-business-unit-address` resource.        |               | Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesResourcePlugin |
| CompanyBusinessUnitCustomerExpanderPlugin                    | Expands the customer session transfer with the company business unit transfer. |               | Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\CustomersRestApi |
| CompanyRolesResourcePlugin                                   | Registers the `company-roles` resource.                        |               | Spryker\Glue\CompanyRolesRestApi\Plugin\GlueApplication\CompanyRolesResourcePlugin |
| CompanyUserCustomerExpanderPlugin                            | Expands the customer transfer with the company user transfer. |               | Spryker\Glue\CompanyUsersRestApi\Plugin\CustomersRestApi     |
| CompanyUsersResourceRoutePlugin                              | Registers the `company-users` resource.                        |               | Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUsersResourceRoutePlugin |
| CompanyUserRestUserValidatorPlugin                           | Checks that a REST user is a company user.                   |               | Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication      |
| CompanyByCompanyRoleResourceRelationshipPlugin               | Adds the `companies` resource as a relationship to the resource that provides `CompanyRoleTransfer` as a payload. |               | Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyRoleResourceRelationshipPlugin |
| CompanyByCompanyBusinessUnitResourceRelationshipPlugin       | Adds the `companies` resource as a relationship to the resource that provides `CompanyBusinessUnitTransfer` as a payload. |               | Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyBusinessUnitResourceRelationshipPlugin |
| CompanyByCompanyUserResourceRelationshipPlugin               | Adds the companies resource as a relationship to the resource that provides `CompanyUserTransfer` as a payload. |               | Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyUserResourceRelationshipPlugin |
| CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin | Adds the `company-business-unit-addresses` resource as a relationship to the `company-business-units` resource. |               | Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin |
| CompanyBusinessUnitByCompanyUserResourceRelationshipPlugin   | Adds the `company-business-units` resource as a relationship. Requires `CompanyUserTransfer` to be provided in the resource payload. |               | Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication |
| CompanyRoleByCompanyUserResourceRelationshipPlugin           | Adds the `companies` resource as a relationship. Requires the `CompanyUserTransfer` to be provided in the resource payload. |               | Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication         |
| CustomerByCompanyUserResourceRelationshipPlugin              | Adds the `customers` resource as a relationship when `CompanyUserTransfer` is provided as a payload. |               | Spryker\Glue\CustomersRestApi\Plugin\GlueApplication         |
| CompanyUserOauthCustomerIdentifierExpanderPlugin             | If a company user UUID is set up in `CustomerTransfer`, expands `CustomerIdentifierTransfer` with the UUID. |               | Spryker\Zed\CompanyUsersRestApi\Communication\Plugin\OauthCustomerConnector |
| CompanyUserRestUserMapperPlugin                              | Maps company user data to a REST user identifier.            |               | Spryker\Glue\CompanyUserAuthRestApi\Plugin\AuthRestApi       |
| OauthUserIdentifierFilterPermissionPlugin                    | Filters the user identifier array to remove configured keys before persisting. |               | Spryker\Zed\OauthPermission\Communication\Plugin\Filter      |
| RefreshTokenPermissionOauthUserIdentifierFilterPlugin        | Filters the user identifier array to remove configured keys before persisting. |               | Spryker\Zed\OauthPermission\Communication\Plugin\OauthRevoke |
| PermissionOauthCompanyUserIdentifierExpanderPlugin           | If `idCompanyUser` is set in `CompanyUserTransfer`, expands `CompanyUserIdentifierTransfer` with a collection of permissions. |               | Spryker\Zed\OauthPermission\Communication\Plugin\OauthCompanyUser |
| PermissionOauthCustomerIdentifierExpanderPlugin              | If `idCompanyUser` is set in `CustomerIdentifierTransfer`, expands `CustomerIdentifierTransfer` with a collection of permissions. |               | Spryker\Zed\OauthPermission\Communication\Plugin\OauthCustomerConnector |
| CompanyUserAccessTokensResourceRoutePlugin                   | Registers the `company-user-access-tokens` resource.           |               | Spryker\Glue\CompanyUserAuthRestApi\Plugin\GlueApplication   |
| CustomerCompanyUserQuoteExpanderPlugin                       | Expands `QuoteTransfer.customer.companyUserTransfer` with full information. |               | Spryker\Zed\CompanyUsersRestApi\Communication\Plugin\CartsRestApi |
| CompanyUserCheckoutRequestExpanderPlugin                     | Expands the checkout request transfer with company user information from a REST request. |               | Spryker\Glue\CompanyUsersRestApi\Plugin\CheckoutRestApi      |
| CompanyUserQuoteMapperPlugin                                 | Maps the company account information from `RestCheckoutRequestAttributesTransfer` to `QuoteTransfer`. |               | Spryker\Zed\CompanyUsersRestApi\Communication\Plugin\CheckoutRestApi |
| CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin | Adds `company-business-unit-addresses` resource as relationship. |               | Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication |
| CompanyBusinessUnitAddressSourceCheckerPlugin                | Checks if a company business unit address ID is provided in the address attributes. |               | Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\ShipmentsRestApi |
| CompanyBusinessUnitAddressCheckoutDataExpanderPlugin         | Expands `RestCheckoutDataTransfer` with `CompanyBusinessUnitAddresses`. |               | Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi |
| CompanyBusinessUnitAddressCheckoutDataValidatorPlugin        | Collects shipping address UUIDs from `checkoutDataTransfer.shipments`. If a company address UUID is provided for a non-company user, returns `CheckoutResponseTransfer`. |               | Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi |
| CompanyBusinessUnitAddressQuoteMapperPlugin                  | Maps the REST request billing company business unit address information to quote. |               | Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi |
| CompanyBusinessUnitAddressProviderStrategyPlugin             | Based on the UUID provided in`RestAddressTransfer.idCompanyBusinessUnitAddress`, finds a company business unit address. If it was found,  returns `AddressTransfer` filled with company business unit address information. |               | Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\ShipmentsRestApi |



**src/Pyz/Zed/OauthCustomerConnector/OauthCustomerConnectorDependencyProvider.php**

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


**src/Pyz/Glue/AuthRestApi/AuthRestApiDependencyProvider.php**

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


**src/Pyz/Zed/OauthCompanyUser/OauthCompanyUserDependencyProvider.php**

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


**src/Pyz/Zed/Oauth/OauthDependencyProvider.php**

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


**src/Pyz/Zed/OauthRevoke/OauthRevokeDependencyProvider.php**

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


**src/Pyz/Zed/OauthPermission/OauthPermissionConfig.php**

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

**src/Pyz/Glue/CustomersRestApi/CustomersRestApiDependencyProvider.php**

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


<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompaniesResourcePlugin;
use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyBusinessUnitResourceRelationshipPlugin;
use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyRoleResourceRelationshipPlugin;
use Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyUserResourceRelationshipPlugin;
use Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin;
use Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin;
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
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```
</details>


**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\CompanyUsersRestApi\Communication\Plugin\CartsRestApi\CustomerCompanyUserQuoteExpanderPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteExpanderPluginInterface[]
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            new CustomerCompanyUserQuoteExpanderPlugin(),
        ];
    }
}
```


**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CheckoutRestApi;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Glue\CompanyUsersRestApi\Plugin\CheckoutRestApi\CompanyUserCheckoutRequestExpanderPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutRequestExpanderPluginInterface[]
     */
    protected function getCheckoutRequestExpanderPlugins(): array
    {
        return [
            new CompanyUserCheckoutRequestExpanderPlugin(),
        ];
    }
}
```

<details>
<summary>src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\CompanyUsersRestApi\Communication\Plugin\CheckoutRestApi\CompanyUserQuoteMapperPlugin;
use Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi\CompanyBusinessUnitAddressCheckoutDataExpanderPlugin;
use Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi\CompanyBusinessUnitAddressCheckoutDataValidatorPlugin;
use Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\CheckoutRestApi\CompanyBusinessUnitAddressQuoteMapperPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface[]
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new CompanyUserQuoteMapperPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataExpanderPluginInterface[]
     */
    protected function getCheckoutDataExpanderPlugins(): array
    {
        return [
            new CompanyBusinessUnitAddressCheckoutDataExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface[]
     */
    protected function getCheckoutDataValidatorPlugins(): array
    {
        return [
            new CompanyBusinessUnitAddressCheckoutDataValidatorPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface[]
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new CompanyBusinessUnitAddressQuoteMapperPlugin(),
        ];
    }
}
```
</details>


**src/Pyz/Glue/ShipmentsRestApi/ShipmentsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ShipmentsRestApi;

use Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\ShipmentsRestApi\CompanyBusinessUnitAddressSourceCheckerPlugin;
use Spryker\Glue\ShipmentsRestApi\ShipmentsRestApiDependencyProvider as SprykerShipmentsRestApiDependencyProvider;

class ShipmentsRestApiDependencyProvider extends SprykerShipmentsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\ShipmentsRestApiExtension\Dependency\Plugin\AddressSourceCheckerPluginInterface[]
     */
    protected function getAddressSourceCheckerPlugins(): array
    {
        return [
            new CompanyBusinessUnitAddressSourceCheckerPlugin(),
        ];
    }
}
```


**src/Pyz/Zed/ShipmentsRestApi/ShipmentsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ShipmentsRestApi;

use Spryker\Zed\CompanyBusinessUnitAddressesRestApi\Communication\Plugin\ShipmentsRestApi\CompanyBusinessUnitAddressProviderStrategyPlugin;
use Spryker\Zed\ShipmentsRestApi\ShipmentsRestApiDependencyProvider as SprykerShipmentsRestApiDependencyProvider;

/**
 * @method \Spryker\Zed\ShipmentsRestApi\ShipmentsRestApiConfig getConfig()
 */
class ShipmentsRestApiDependencyProvider extends SprykerShipmentsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ShipmentsRestApiExtension\Dependency\Plugin\AddressProviderStrategyPluginInterface[]
     */
    protected function getAddressProviderStrategyPlugins(): array
    {
        return [
            new CompanyBusinessUnitAddressProviderStrategyPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

To verify that feature is set up correctly go throw the following steps:

1. [Authenticate as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).

2. [Retrieve available company users](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html#retrieve-available-company-users).

3. Using the company user ID you've retrieved in the previous step, [authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user).
Check that the response contains all the necessary data.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

To verify that all the required data is provided in the access token, at [jwt.io](https://jwt.io/), decode the token and check that, in the `sub` property of the payload data, the required `customer_reference`, `id_customer`, `id_company_user`, and permissions are present.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the permission data is filtered out based on the record in the spy_oauth_access_token table. To do so, run the following SQL query and check that the result doesn't have any `permissions-related` data from the `user_identifier` column.

```sql
SELECT * FROM spy_oauth_access_token WHERE user_identifier LIKE '%{"id_company_user":"8da78283-e629-5667-9f84-e13207a7aef9"%';
```

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Make sure that the permission data is filtered out based on the record in the `spy_oauth_refresh_token` table. To do so, run the following SQL query and check that the result doesn't have any permissions-related data from the `user_identifier` column.

```sql
SELECT * FROM spy_oauth_refresh_token WHERE user_identifier LIKE '%{"id_company_user":"8da78283-e629-5667-9f84-e13207a7aef9"%';
```

{% endinfo_block %}



{% info_block warningBox "Verification" %}

To make sure the `CompanyUserRestUserValidatorPlugin` is set up correctly, check that a non-company user can't access the resources listed in the `CompanyUsersRestApiConfig::COMPANY_USER_RESOURCES`, and the following error is returned:

```php
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

{% info_block warningBox "Verification" %}

- Send the `GET https://glue.mysprykershop.com/companies/mine` request. Make sure that the response contains a collection of resources with the companies your current company user belongs to.
- Send the `GET https://glue.mysprykershop.com/companies/{% raw %}{{{% endraw %}company_uuid{% raw %}}}{% endraw %}` request. Make sure that the response contains only the company resource your current company user belongs to.
- Send the `GET https://glue.mysprykershop.com/company-business-units/mine?include=companies,company-business-unit-addresses request`. Make sure that the response contains:
  - The collection of resources with the company business units your current company user belongs to.
  - `companies` and `addresses` relationships.
- Send the `GET https://glue.mysprykershop.com/company-business-units/{% raw %}{{{% endraw %}company_business_unit_uuid{% raw %}}}{% endraw %}?include=companies,company-business-unit-addresses` request. Make sure that the response contains:
  - Only the company business unit resource that your current company user belongs to.
  - `companies` and `addresses` relationships.
- Send the `GET https://glue.mysprykershop.com/company-business-unit-addresses/{% raw %}{{{% endraw %}company_business_unit_address_uuid{% raw %}}}{% endraw %}` request. Make sure that response contains only the company business unit address of the business unit your current company user belongs to has.
- Send the `GET https://glue.mysprykershop.com/company-roles/mine?include=companies` request. Make sure that the response contains:
  - All the company roles assigned to your current company user.
  - The `companies` relationship.
- Send the `GET https://glue.mysprykershop.com/company-roles/{% raw %}{{{% endraw %}company_role_uuid{% raw %}}}{% endraw %}?include=companies` request. Make sure that the response contains:
  - Only the company role resource assigned to your current company user.
  - The `companies` relationship.
- Send the `GET https://glue.mysprykershop.com/company-users?include=company-roles,companies,company-business-units,customers` request. Make sure that the response contains:
  - All the company users of the company your current company user belong to.
  - The `company-roles`, `companies`, `company-business-units`, and `customers`relationships.
- Send the `GET https://glue.mysprykershop.com/company-users/mine?include=company-roles,companies,company-business-units,customers` request. Make sure that the response contains:
    - A collection of resources with all the company users that the current user can impersonate as.
    - The `company-roles`, `companies`, `company-business-units`, and `customers` relationships.
- Send the `GET https://glue.mysprykershop.com/company-users/{% raw %}{{{% endraw %}company_user_uuid{% raw %}}}{% endraw %}?include=company-roles,companies,company-business-units,customers` request. Make sure that the response contains:
    - One company user
    - The `company-roles`, `companies`, `company-business-units`, and `customers` relationships

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify the following using merchant prices and merchant threshold:

- Make sure the company account information is saved during order placement: send the `POST https://glue.mysprykershop.com/checkout` request with a company user access token and check the company-related restrictions are applied to your order.
- Make sure the company account information is used during cart operations: send the `POST https://glue.mysprykershop.com/carts/:uuid/items` request with company user access token and make sure the company-related restrictions are applied to your cart.

{% endinfo_block %}
{% info_block warningBox "Verification" %}


To verify that `CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin` is activated, send the `POST https://glue.mysprykershop.com/checkout-data?include=company-business-unit-addresses` request and check that the response contains the `company-business-unit-addresses` resource.

{% endinfo_block %}
