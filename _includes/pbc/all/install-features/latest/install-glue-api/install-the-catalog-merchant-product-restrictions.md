### Prerequisites

Install the required features:

| NAME                          | VERSION          | INSTALLATION GUIDE                                                                                                                                                                       |
|-------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue API: Spryker Core        | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)                  |
| Merchant Product Restrictions | {{page.version}} | [Install the Merchant Product Restrictions feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-product-restrictions-feature.html)  |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-relationship-product-lists-rest-api:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                  | EXPECTED DIRECTORY                                          |
|-----------------------------------------|-------------------------------------------------------------|
| MerchantRelationshipProductListsRestApi | vendor/spryker/merchant-relationship-product-lists-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in transfer objects:

| TRANSFER                        | TYPE   | EVENT    | PATH                                                                    |
|---------------------------------|--------|----------|-------------------------------------------------------------------------|
| Customer                        | class  | created  | src/Generated/Shared/Transfer/RestCatalogSearchAttributesTransfer       |
| RestUser                        | class  | created  | src/Generated/Shared/Transfer/RestCatalogSearchSortTransfer             |
| CustomerProductListCollection   | class  | created  | src/Generated/Shared/Transfer/RestCatalogSearchPaginationTransfer       |
| CustomerIdentifier              | class  | created  | src/Generated/Shared/Transfer/RestCatalogSearchAbstractProductsTransfer |

{% endinfo_block %}

### 3) Set up behavior

Activate the following plugins:

| PLUGIN                                                   | SPECIFICATION                                                                | PREREQUISITES | NAMESPACE                                                                                        |
|----------------------------------------------------------|------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------|
| CustomerProductListOauthCustomerIdentifierExpanderPlugin | Expands `CustomerIdentifierTransfer` with customers product list collection. | None          | Spryker\Zed\MerchantRelationshipProductListsRestApi\Communication\Plugin\OauthCustomerConnector  |
| CustomerProductListCustomerExpanderPlugin                | Expands `CustomerTransfer` with customer's product list collection.          | None          | Spryker\Glue\MerchantRelationshipProductListsRestApi\Plugin\CustomersRestApi                     |


**src/Pyz/Zed/OauthCustomerConnector/OauthCustomerConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\OauthCustomerConnector;

use Spryker\Zed\MerchantRelationshipProductListsRestApi\Communication\Plugin\OauthCustomerConnector\CustomerProductListOauthCustomerIdentifierExpanderPlugin;
use Spryker\Zed\OauthCustomerConnector\OauthCustomerConnectorDependencyProvider as SprykerOauthCustomerConnectorDependencyProvider;

/**
 * @method \Spryker\Zed\OauthCustomerConnector\OauthCustomerConnectorConfig getConfig()
 */
class OauthCustomerConnectorDependencyProvider extends SprykerOauthCustomerConnectorDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OauthCustomerConnectorExtension\Dependency\Plugin\OauthCustomerIdentifierExpanderPluginInterface>
     */
    protected function getOauthCustomerIdentifierExpanderPlugins(): array
    {
        return [
            new CustomerProductListOauthCustomerIdentifierExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Send request `POST https://glue.mysprykershop.com/access-tokens` and make sure that `sub` property includes related `customer_product_list_collection`.

{% endinfo_block %}

**src/Pyz/Glue/CustomersRestApi/CustomersRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CustomersRestApi;

use Spryker\Glue\CustomersRestApi\CustomersRestApiDependencyProvider as SprykerCustomersRestApiDependencyProvider;
use Spryker\Glue\MerchantRelationshipProductListsRestApi\Plugin\CustomersRestApi\CustomerProductListCustomerExpanderPlugin;

class CustomersRestApiDependencyProvider extends SprykerCustomersRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CustomersRestApiExtension\Dependency\Plugin\CustomerExpanderPluginInterface>
     */
    protected function getCustomerExpanderPlugins(): array
    {
        return array_merge(parent::getCustomerExpanderPlugins(), [
            new CustomerProductListCustomerExpanderPlugin(),
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

Send request `GET https://glue.mysprykershop.com/catalog-search` and make sure that response is considering the customers black- and whitelists.

{% endinfo_block %}
