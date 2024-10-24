

Follow the steps below to install Wishlist feature API.

### Prerequisites

Install the required features:

|NAME|VERSION|INTEGRATION GUIDE|
|---|---|---|
| Spryker Core| {{page.version}} |[Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)|
|Product| {{page.version}} |[Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)|
|Wishlist| {{page.version}} | |

### 1) Install the required modules

Run the following command to install the required modules:

```bash
composer require spryker/wishlists-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following module has been installed:

|MODULE|EXPECTED DIRECTORY|
|---|---|
|WishlistsRestApi|vendor/spryker/wishlists-rest-apiWishlistItems|

{% endinfo_block %}


### 2) Set up database schema and transfer objects

Run the following commands to apply database changes, and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes have occurred in the database:

|DATABASE ENTITY|TYPE|EVENT|
|---|---|---|
|spy_wishlist.uuid|column|added|

{% endinfo_block %}

{% info_block warningBox “Verification” %}

Make sure that the following changes have occurred in transfer objects:

|TRANSFER|TYPE|EVENT|PATH|
|---|---|---|---|
|RestWishlistItemsAttributesTransfer|class|created|src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer|
|RestWishlistsAttributesTransfer|class|created|src/Generated/Shared/Transfer/RestWishlistsAttributesTransfer|
|WishlistTransfer.uuid|property|added|src/Generated/Shared/Transfer/WishlistTransfer|

{% endinfo_block %}

### 3) Set up behavior

#### Migrate data in the database

{% info_block infoBox %}

The following steps generate UUIDs for existing entities in the `spy_wishlist` table.

{% endinfo_block %}

Run the following command:

```bash
console uuid:update Wishlist spy_wishlist
```

{% info_block warningBox “Verification” %}

Make sure that the `uuid` field is populated for all records in the `spy_wishlist` table.
For this purpose, run the following SQL query and make sure that the result is 0 records:
`SELECT COUNT(*) FROM spy_wishlist WHERE uuid IS NULL;`

{% endinfo_block %}


#### Enable resources and relationships

Activate the following plugins:

|PLUGIN|SPECIFICATION|PREREQUISITES|NAMESPACE|
|---|---|---|---|
|WishlistsResourceRoutePlugin|Registers the `wishlists` resource.|None|Spryker\Glue\WishlistsRestApi\Plugin|
|WishlistItemsResourceRoutePlugin|Registers the `wishlist-items` resource.|None|Spryker\Glue\WishlistsRestApi\Plugin|
|WishlistRelationshipByResourceIdPlugin|Adds the `wishlists` resource as a relationship to the customers resource.|None|Spryker\Glue\WishlistsRestApi\Plugin|
| ConcreteProductBySkuResourceRelationshipPlugin | Adds the `concrete-products` resource as a relationship to the `wishlist-items` resource. | None | Spryker\Glue\ProductsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CustomersRestApi\CustomersRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistItemsResourceRoutePlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistRelationshipByResourceIdPlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistsResourceRoutePlugin

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new WishlistsResourceRoutePlugin(),
            new WishlistItemsResourceRoutePlugin(),
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
            CustomersRestApiConfig::RESOURCE_CUSTOMERS,
            new WishlistRelationshipByResourceIdPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox “Verification” %}

Make sure that the following endpoints are available:
`http:///glue.mysprykershop.com/wishlists`
`http:///glue.mysprykershop.com/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}/wishlists-items`
Send a request to `https://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=wishlists` and make sure that the given customer has at least one wishlist. Make sure that the response includes relationships to the `wishlists` resources.

{% endinfo_block %}
