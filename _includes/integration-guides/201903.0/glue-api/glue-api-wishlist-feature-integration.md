---
title: Glue API - Wishlist feature integration
description: This guide will navigate you through the process of installing and configuring the Wishlist API feature in Spryker OS.
last_updated: Jul 31, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v2/docs/wishlist-api-feature-integration-201903
originalArticleId: fbcdf200-a497-45d5-a040-a2745da5782f
redirect_from:
  - /v2/docs/wishlist-api-feature-integration-201903
  - /v2/docs/en/wishlist-api-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

|Name|Version|Integration guide|
|---|---|---|
Spryker Core|201903.0|[Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html)|
|Product|201903.0|[Product API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/product-api-feature-integration.html)|
|Wishlist| 201903.0 |

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require spryker/wishlists-rest-api:"^1.3.0" spryker/wishlist-items-products-resource-relationship:"^1.0.0" --update-with-dependencies
```
<section contenteditable="false" class="warningBox"><div class="content">
Make sure that the following modules are installed:
    
|Module|Expected directory|
|---|---|
|`WishlistsRestApi`|`vendor/spryker/wishlists-rest-apiWishlistItems`|
|`ProductsResourceRelationship`|`vendor/spryker/wishlist-items-products-resource-relationship`|
</div></section>
    
### 2) Set Up Database Schema and Transfer Objects
Run the following commands to apply database changes, and also generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following changes have occurred in the database:

|Database entity|Type|Event|
|---|---|---|
|`spy_wishlist.uuid`|column|added|
</div></section>

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following changes have occurred in transfer objects:

|Transfer|Type|Event|Path|
|---|---|---|---|
|`RestWishlistItemsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer`|
|`RestWishlistsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestWishlistsAttributesTransfer`|
|`WishlistTransfer.uuid`|property|added|`src/Generated/Shared/Transfer/WishlistTransfer`|
</div></section>

### 3) Set Up Behavior
#### Enable console command
Activate the console command provided by the module:

|Class|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`WishlistsUuidWriterConsole`|Provides the `wishlists:uuid:update` console command for generating UUIDs for `existing spy_wishlist` records.|None|`Spryker\Zed\WishlistsRestApi\Communication\Console`|

<details open>
<summary markdown='span'>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>
    
```php    
<?php
 
namespace Pyz\Zed\Console;
 
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\WishlistsRestApi\Communication\Console\WishlistsUuidWriterConsole;
 
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new WishlistsUuidWriterConsole(),
        ];
        return $commands;
    }
}
```
<br>
</details>

{% info_block warningBox “Verification” %}

Run the following console command:<br>`console list`<br>Make sure that `wishlists:uuid:update` appears in the list.
{% endinfo_block %}

#### Migrate data in the database

{% info_block infoBox %}
The following steps generate UUIDs for existing entities in the `spy_wishlist` table.
{% endinfo_block %}

Run the following command:

```bash
console wishlists:uuid:update
```

{% info_block warningBox "(Make sure that the uuid field is filled for all records in the `spy_wishlist` table.<br>For this purpose, run the following SQL query and make sure that the result is 0 records:<br>`SELECT COUNT(*) FROM spy_wishlist WHERE uuid IS NULL;`)

#### Enable resources and relationships

Activate the following plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`WishlistsResourceRoutePlugin`|Registers the wishlists resource.|None|`Spryker\Glue\WishlistsRestApi\Plugin`|
|`WishlistItemsResourceRoutePlugin`|Registers the wishlist-items resource.|None|`Spryker\Glue\WishlistsRestApi\Plugin`|
|`WishlistItemsConcreteProductsResourceRelationshipPlugi`|Adds the concrete-products resource as a relationship to the wishlist-items resource.|None|`Spryker\Glue\WishlistItemsProductsResourceRelationship\Plugin`|
|WishlistRelationshipByResourceIdPlugin|Adds the wishlists resource as a relationship to the customers resource.|None|`Spryker\Glue\WishlistsRestApi\Plugin`|

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CustomersRestApi\CustomersRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\WishlistItemsProductsResourceRelationship\Plugin\WishlistItemsConcreteProductsResourceRelationshipPlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistItemsResourceRoutePlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistRelationshipByResourceIdPlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistsResourceRoutePlugin;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiConfig;
 
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
            WishlistsRestApiConfig::RESOURCE_WISHLIST_ITEMS,
            new WishlistItemsConcreteProductsResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CustomersRestApiConfig::RESOURCE_CUSTOMERS,
            new WishlistRelationshipByResourceIdPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```
<br>
</details>


@(Warning" %}

{% endinfo_block %}(Make sure that the following endpoints are available:<br>http:///glue.mysprykershop.com/wishlists<br>http:///glue.mysprykershop.com/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}/wishlists-items<br>Make a request to http://glue.mysprykershop.com/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}/wishlists-items?include=concrete-products and make sure that the given wishlist has at least one product added.<br>Make sure that the response includes relationships to the concrete-products resources.)

{% info_block warningBox “Verification” %}

Make a request to http://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=wishlists and make sure that the given customer has at least one wishlist.<br>Make sure that the response includes relationships to the wishlists resources.
{% endinfo_block %}

**See also:**

* [Managing Wishlists](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-wishlists.html)

*Last review date: Apr 11, 2019* <!-- by  Karoly Gerner and Volodymyr Volkov-->
