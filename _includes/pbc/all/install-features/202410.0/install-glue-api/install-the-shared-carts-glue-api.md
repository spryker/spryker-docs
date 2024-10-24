

This document describes how to install the Shared Carts Glue API.


## Prerequisites

To start feature integration, overview and install the following features and Glue APIs:

| NAME |  VERSION |  INTEGRATION GUIDE |
| - |  - |  -  |
| Glue API: Spryker Core | {{page.version}}  | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Cart |  {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |
| Uuid generation console | {{page.version}} | [Install the Uuid Generation Console feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-uuid-generation-console-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/shared-carts-rest-api:"^1.2.0" spryker/cart-permission-groups-rest-api:"^1.2.0" --update-with-dependencies
```


{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| - | - |
| SharedCartsRestApi | vendor/spryker/shared-carts-rest-api |
| CartPermissionGroupsRestApi | vendor/spryker/cart-permission-groups-rest-api |

{% endinfo_block %}


## 2) Set up database schema and transfer objects

Generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```


{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER  | TYPE | EVENT | PATH |
| -  | - | - | - |
| ShareDetailCriteriaFilterTransfer | class | added | src/Generated/Shared/Transfer/ShareDetailCriteriaFilterTransfer.php |
| QuoteCompanyUserTransfer | class | added | src/Generated/Shared/Transfer/QuoteCompanyUserTransfer.php |
| QuotePermissionGroupResponseTransfer | class | added | src/Generated/Shared/Transfer/QuotePermissionGroupResponseTransfer.php |
| ShareCartResponseTransfer | class | added | src/Generated/Shared/Transfer/ShareCartResponseTransfer.php |
| RestCartPermissionGroupsAttributesTransfer | class | added | src/Generated/Shared/Transfer/RestCartPermissionGroupsAttributesTransfer.php |
| RestSharedCartsAttributesTransfer | class | added | src/Generated/Shared/Transfer/RestSharedCartsAttributesTransfer.php |
| ShareDetailTransfer.uuid | property | added | src/Generated/Shared/Transfer/ShareDetailTransfer.php |
| ShareCartRequestTransfer.quoteUuid | property | added | src/Generated/Shared/Transfer/ShareCartRequestTransfer.php |
| ShareCartRequestTransfer.customerReference | property | added | src/Generated/Shared/Transfer/ShareCartRequestTransfer.php
| QuoteTransfer.quotePermissionGroup | property | added | src/Generated/Shared/Transfer/QuoteTransfer.php |

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
|  - | - | - |
| spy_quote_company_user.uuid | column | added |

{% endinfo_block %}


## 3) Set up behavior

Set up the following behaviors.

### Generate UUIDs for the existing company records without them

Run the following command:

```bash
console uuid:generate SharedCart spy_quote_company_user
```

{% info_block warningBox "Verification" %}

To make sure that, in the `spy_quote_company_user` table, the `uuid` field is populated for all the records, run the following command:

```bash
select count(*) from spy_quote_company_user where uuid is NULL;
```


The result should be 0 records.

{% endinfo_block %}

### Enable resources and relationships

{% info_block infoBox "" %}

* `SharedCartsResourceRoutePlugin` is a protected resource for the following requests: `POST`, `PATCH`, `DELETE`.

* `CartPermissionGroupsResourceRoutePlugin` is a protected resource for the `GET` request.

For more details, see the `configure` function in [Resource Routing](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/glue-infrastructure.html).

{% endinfo_block %}


Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| - | - | - | - |
| SharedCartsResourceRoutePlugin | Registers the `/shared-carts` resource route. |  | Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartsResourceRoutePlugin |
| CartPermissionGroupsResourceRoutePlugin | Registers the `/cart-permission-groups` resource route. |  | Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupsResourceRoutePlugin |
| CartPermissionGroupByQuoteResourceRelationshipPlugin | Adds the `cart-permission-groups` resource as a relationship to the `cart` resource. |  | Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByQuoteResourceRelationshipPlugin |
| SharedCartByCartIdResourceRelationshipPlugin | Adds the `shared-carts` resource as a relationship to the `cart` resource. |  | Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartByCartIdResourceRelationshipPlugin |
| CartPermissionGroupByShareDetailResourceRelationshipPlugin | Adds the `cart-permission-group` resource as a relationship to the `shared cart` resource. |  | Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByShareDetailResourceRelationshipPlugin |
| CompanyUserByShareDetailResourceRelationshipPlugin | Adds the `company-users` resource as a relationship to the `shared cart` resource. |  | Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUserByShareDetailResourceRelationshipPlugin |
| SharedCartQuoteCollectionExpanderPlugin | Expands the quote collection with the carts shared with a user. |  | Spryker\Zed\SharedCart\Communication\Plugin\CartsRestApi\SharedCartQuoteCollectionExpanderPlugin |
| CompanyUserStorageProviderPlugin | Retrieves information about a company user from the key-value storage. |  | Spryker\Glue\CompanyUserStorage\Communication\Plugin\SharedCartsRestApi\CompanyUserStorageProviderPlugin
| CompanyUserCustomerExpanderPlugin | Expands the `customer` transfer with the company user transfer. |  | Spryker\Glue\CompanyUsersRestApi\Plugin\CartsRestApi\CompanyUserCustomerExpanderPlugin |
| QuotePermissionGroupQuoteExpanderPlugin | Expands the `quote` transfer with a quote permission group. |  | Spryker\Zed\SharedCartsRestApi\Communication\Plugin\CartsRestApi\QuotePermissionGroupQuoteExpanderPlugin |



<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByQuoteResourceRelationshipPlugin;
use Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByShareDetailResourceRelationshipPlugin;
use Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupsResourceRoutePlugin;
use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUserByShareDetailResourceRelationshipPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartByCartIdResourceRelationshipPlugin;
use Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartsResourceRoutePlugin;
use Spryker\Glue\SharedCartsRestApi\SharedCartsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new CartPermissionGroupsResourceRoutePlugin(),
            new SharedCartsResourceRoutePlugin(),
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
            CartsRestApiConfig::RESOURCE_CARTS,
            new CartPermissionGroupByQuoteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_CARTS,
            new SharedCartByCartIdResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            SharedCartsRestApiConfig::RESOURCE_SHARED_CARTS,
            new CartPermissionGroupByShareDetailResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            SharedCartsRestApiConfig::RESOURCE_SHARED_CARTS,
            new CompanyUserByShareDetailResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>

<details>
  <summary>src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\SharedCart\Communication\Plugin\CartsRestApi\SharedCartQuoteCollectionExpanderPlugin;
use Spryker\Zed\SharedCartsRestApi\Communication\Plugin\CartsRestApi\QuotePermissionGroupQuoteExpanderPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteCollectionExpanderPluginInterface[]
     */
    protected function getQuoteCollectionExpanderPlugins(): array
    {
        return [
            new SharedCartQuoteCollectionExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteExpanderPluginInterface[]
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            new QuotePermissionGroupQuoteExpanderPlugin(),
        ];
    }
}
```

</details>






**src/Pyz/Glue/SharedCartsRestApi/SharedCartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\SharedCartsRestApi;

use Spryker\Glue\CompanyUserStorage\Communication\Plugin\SharedCartsRestApi\CompanyUserStorageProviderPlugin;
use Spryker\Glue\SharedCartsRestApi\SharedCartsRestApiDependencyProvider as SprykerSharedCartsRestApiDependencyProvider;
use Spryker\Glue\SharedCartsRestApiExtension\Dependency\Plugin\CompanyUserProviderPluginInterface;

class SharedCartsRestApiDependencyProvider extends SprykerSharedCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\SharedCartsRestApiExtension\Dependency\Plugin\CompanyUserProviderPluginInterface
     */
    protected function getCompanyUserProviderPlugin(): CompanyUserProviderPluginInterface
    {
        return new CompanyUserStorageProviderPlugin();
    }
}
```


**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\CompanyUsersRestApi\Plugin\CartsRestApi\CompanyUserCustomerExpanderPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CustomerExpanderPluginInterface[]
     */
    protected function getCustomerExpanderPlugins(): array
    {
        return [
            new CompanyUserCustomerExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that the carts shared with a user are returned by sending the `GET https://glue.mysprykershop.com/carts` request.

Send the `GET https://glue.mysprykershop.com/carts/?include=cart-permission-groups` request and make sure that the cart-permission-groups resource is returned as a relationship of the `shared-carts` resource.

Send the `GET https://glue.mysprykershop.com/carts/{{cart_uuid}}/?include=cart-permission-groups` request and make sure that a single cart item (no matter owned by customers or shared with them) is returned.

{% endinfo_block %}


{% info_block warningBox "Verification" %}
Send the `GET https://glue.mysprykershop.com/carts/?include=shared-carts,cart-permission-groups,company-users` request and make sure that the carts shared with the other users are returned with the `shared-carts` resource as a relationship. Also, make sure that `cart-permission-groups` and `company-user` resources are returned as relationships of the `shared-carts` resource.

Send the `GET https://glue.mysprykershop.com/carts/{{cart_uuid}}/?include=shared-carts,cart-permission-groups,company-users` request and make sure that a single cart with `cart-permission-groups` and `company-user` resources is returned.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

To make sure that `CartPermissionGroupsResourceRoutePlugin` is installed correctly, check that the `https://glue.mysprykershop.com/cart-permission-groups` resource is available.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Make sure that the `GET https://glue.mysprykershop.com/cart-permission-groups/{{permission_group_id}}` request returns a single `cart-permission-groups` resource.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

To make sure that `SharedCartsResourceRoutePlugin` is installed correctly, check
that you can send the following requests:

<details>
  <summary>POST http://glue.mysprykershop.com/carts/{{cart_uuid}}/shared-carts</summary>

```json
{
    "data": {
        "type": "shared-carts",
        "attributes": {
            "idCompanyUser": "88ac19e3-ca9c-539e-b1f1-9c3b7fd48718",
            "idCartPermissionGroup": 1
        }
    }
}
```

</details>

<details>
  <summary>PATCH http://glue.mysprykershop.com/shared-carts/{{shared_cart_uuid}}</summary>

```json
{
    "data": {
        "type": "shared-carts",
        "attributes": {
            "idCartPermissionGroup": 2
        }
    }
}
```

</details>

{% endinfo_block %}


{% info_block warningBox "Verification" %}

To make sure that `SharedCartsResourceRoutePlugin` is installed correctly, check that you get a valid response from the following requests:  

<details>
  <summary>POST http://glue.mysprykershop.com/carts/{{cart_uuid}}/shared-carts</summary>

```json
{
    "data": {
        "type": "shared-carts",
        "attributes": {
            "idCompanyUser": "88ac19e3-ca9c-539e-b1f1-9c3b7fd48718",
            "idCartPermissionGroup": 1
        }
    }
}
```

</details>

<details>
  <summary>PATCH http://glue.mysprykershop.com/shared-carts/{{shared_cart_uuid}}</summary>

```json
{
    "data": {
        "type": "shared-carts",
        "attributes": {
            "idCartPermissionGroup": 2
        }
    }
}
```

</details>   

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Make sure that you can remove cart sharing:

1. Send the request: `DELETE https://glue.mysprykershop.com/shared-carts/{{shared_cart_uuid}}`.

2. You should get the 204 status.

{% endinfo_block %}
