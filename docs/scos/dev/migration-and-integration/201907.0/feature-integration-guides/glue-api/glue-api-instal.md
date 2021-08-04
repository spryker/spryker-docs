---
title: Glue API Installation and Configuration
originalLink: https://documentation.spryker.com/v3/docs/glue-api-installation-and-configuration
redirect_from:
  - /v3/docs/glue-api-installation-and-configuration
  - /v3/docs/en/glue-api-installation-and-configuration
---

Functionally, Spryker API can be split into 2 parts: API infrastructure (GLUE) and feature modules. The infrastructure provides the general functionality of the API layer, while each feature module implements a specific resource or resource relation.

To integrate GLUE API in your project, you need to:
* <a href="#install">Install GLUE</a>
*  <a href="#enable">Enable GLUE</a>


## <a name="install"></a> 1. Installing GLUE 

GLUE infrastructure is shipped with the following modules: 

| Module |Description  |
| --- | --- |
| [GlueApplication](https://github.com/spryker/glue-application) | Provides API infrastructure for Spryker features.|
| [GlueApplicationExtension](https://github.com/spryker/glue-application-extension) |Provides extension point/plugin interfaces for the Glue Application module.  |
|  [AuthRestApi](https://github.com/spryker/auth-rest-api) (optional)| Provides API endpoints to obtain an authentication token to use for subsequent requests. |

To install it, you need to do the following:
{% info_block warningBox "Note" %}
Spryker Shop Suite contains GLUE out of the box. If your project has the latest Shop Suite master merged, you can proceed directly to step <a href="#enable">2. Enable GLUE</a>.
{% endinfo_block %}

1. Install the necessary modules using composer:
    
    ```yaml
    composer update "spryker/*" "spryker-shop/*" --update-with-dependencies
    composer require spryker/glue-application --update-with-dependencies
    ```
    
 2. Add a Front Controller for GLUE:
    * In the directory where your code is installed, locate directory public and create subdirectory Glue in it.
    * Create file index.php in the Glue directory with the following content:
    
```php
<?php
use Pyz\Glue\GlueApplication\Bootstrap\GlueBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;
 
define('APPLICATION', 'GLUE');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', realpath(__DIR__ . '/../..'));
 
require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';
 
Environment::initialize();
 
$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();
 
$bootstrap = new GlueBootstrap();
$bootstrap
    ->boot()
    ->run();
```

3. Create GLUE application bootstrap:
    * In the `src/Pyz` directory of your Spryker code installation, create folder Glue, then create subfolder `GlueApplication/Bootstrap` in it.
    * In the GlueApplication/Bootstrap folder, create file GlueBootstrap.php with the following content:
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication\Bootstrap;
 
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Spryker\Glue\GlueApplication\Bootstrap\AbstractGlueBootstrap;
use Spryker\Glue\GlueApplication\Plugin\Rest\GlueServiceProviderPlugin;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueApplicationServiceProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueResourceBuilderService;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueRoutingServiceProvider;
 
class GlueBootstrap extends AbstractGlueBootstrap
{
    /**
     * @return void
     */
    protected function registerServiceProviders(): void
    {
        $this->application
            ->register(new GlueResourceBuilderService())
            ->register(new GlueApplicationServiceProvider())
            ->register(new SessionServiceProvider())
            ->register(new ServiceControllerServiceProvider())
            ->register(new GlueServiceProviderPlugin())
            ->register(new GlueRoutingServiceProvider());
    }
}
```
4. Create GLUE dependency provider:

    In the `src/Pyz/GlueApplication` directory of your Spryker code installation, create file `GlueApplicationDependencyProvider.php` and add the following code:
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
        ];
    }
 
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ValidateRestRequestPluginInterface[]
     */
    protected function getValidateRestRequestPlugins(): array
    {
        return [
        ];
    }
 
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\FormatResponseHeadersPluginInterface[]
     */
    protected function getFormatResponseHeadersPlugins(): array
    {
        return [
        ];
    }
 
    /**
     * {@inheritdoc}
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface[]
     */
    protected function getControllerBeforeActionPlugins(): array
    {
        return [
        ];
    }
}
```
5. Add GLUE application constants to your environment

 Finally, you need to add GLUE application constants to your environment configuration file. The following is an example of the development environment:
    
```php
use Spryker\Shared\GlueApplication\GlueApplicationConstants;
...
// ----------- Glue Application
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = '<your_glue_domain>';
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = false;
```
where  **<your_glue_domain>**  is the URL domain you want to use for GLUE. If you want to use the default domain of the Spryker shop, you can leave it empty.
{% info_block infoBox "Tip" %}
If you want to enable GLUE application debugging, set the `GLUE_APPLICATION_REST_DEBUG` variable to true.
{% endinfo_block %}
6. Enable customer authentication via OAuth tokens (optional)

GLUE provides the possibility to authenticate customer users with the help of OAuth tokens. If you are going to use customer authentication, you will also need to perform the following additional steps:

* Install the `AuthRestApi` and `OauthCustomerConnector` modules:
```yaml
composer require spryker/auth-rest-api spryker/oauth-customer-connector --update-with-dependencies
```

* Add OAuth plugins to the GLUE dependency provider. To do this, open file `src/Pyz/GlueApplication/GlueApplicationDependencyProvider.php` and make the following changes:
Add use closes for the required OAuth plugins:
```php
...
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\AuthRestApi\Plugin\AccessTokensResourceRoutePlugin;
use Spryker\Glue\AuthRestApi\Plugin\AccessTokenValidatorPlugin;
use Spryker\Glue\AuthRestApi\Plugin\FormatAuthenticationErrorResponseHeadersPlugin;
use Spryker\Glue\AuthRestApi\Plugin\RefreshTokensResourceRoutePlugin;...
```
Add OAuth resource plugins:
```php
protected function getResourceRoutePlugins(): array
{
    return [
        new AccessTokensResourceRoutePlugin(),
        new RefreshTokensResourceRoutePlugin(),
    ];
}
```
Add token validation plugin:
```php
protected function getValidateRestRequestPlugins(): array
{
    return [
        new AccessTokenValidatorPlugin(),
    ];
}
```
Add error response plugin:
```php
protected function getFormatResponseHeadersPlugins(): array
{
    return [
        new FormatAuthenticationErrorResponseHeadersPlugin(),
    ];
}
```

* Add OAuth dependency provider. To do this, create file `Pyz/Zed/Oauth/OauthDependencyProvider.php` as follows:
```php
<?php

namespace Pyz\Zed\Oauth;
 
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthScopeProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthUserProviderPlugin;
 
class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface[]
     */
    protected function getUserProviderPlugins(): array
    {
        return [
            new CustomerOauthUserProviderPlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface[]
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            new CustomerOauthScopeProviderPlugin(),
        ];
    }
}
```

* Add OAuth public and private keys. For development purposes, you can use the keys supplied with Spryker Shop Suite. In production, you will need your own keys generated per the following instructions: [Generating public and private keys](https://oauth2.thephpleague.com/installation/#generating-public-and-private-keys). The keys need to be placed in the `config/Zed` directory of your code installation (in the Shop Suite, `dev_only_private.key` and `dev_only_public.key` are used).
* Add OAuth constants to your environment configuration file. In the development environment, you can use the following:
```php
use Spryker\Shared\Oauth\OauthConstants;
...
// ----------- OAUTH
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://' . APPLICATION_ROOT_DIR . '/config/Zed/dev_only_private.key';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://' . APPLICATION_ROOT_DIR . '/config/Zed/dev_only_public.key';
$config[OauthConstants::ENCRYPTION_KEY] = 'lxZFUEsBCJ2Yb14IF2ygAHI5N4+ZAUXXaSeeJm6+twsUmIen';
 
// ----------- AuthRestApi
$config[OauthCustomerConnectorConstants::OAUTH_CLIENT_IDENTIFIER] = 'frontend';
$config[OauthCustomerConnectorConstants::OAUTH_CLIENT_SECRET] = 'abc123';
```
## <a name="enable"></a> 2. Enabling GLUE
To be able to use GLUE in your project, you need to configure a Nginx host to serve REST API requests:

**1. Create Nginx VHOST configuration**

```yaml
sudo nano /etc/nginx/sites-enabled/DE_development_glue
```
In the _nano_ console that opens, paste the following:
```php
server {
    # Listener for production/staging - requires external LoadBalancer directing traffic to this port
    listen 10001;
  
    # Listener for testing/development - one host only, doesn't require external LoadBalancer
    listen 80;
  
    server_name ~^glue\\.de\\..+\\.local$;
  
    keepalive_timeout 0;
    access_log  /data/logs/development/glue-access.log extended;
  
    root /data/shop/development/current/public/Glue;
  
    set $application_env development;
    set $application_store DE;
    include "spryker/zed.conf";
}
```
Restart nginx
```yaml
sudo /etc/init.d/nginx restart
```
**2. Change the machine hosts configuration**
```yaml
sudo nano /etc/hosts
```
add the following line to the end of the file:
```
ip glue.de.project-name.local
```
After performing this change, you should be able to access [http://glue.de.project-name.local/ URL](http://glue.de.project-name.local/) with a 404 error and JSON response indicating that resource is not found.

If you are running your project in the Spryker VM, you also need to make changes to the Vagrant file of the virtual machine. To do so:

1. Open file `~/.vagrant.d/boxes/devvm[version]/0/virtualbox/include/_Vagrantfile`, where _[version]_ is the VM version. On Windows, you can find the `.vagrant.d` folder in your user profile folder.
2. Find the following line:
```yaml
HOSTS.push [ "www#{host_suffix}.#{store}.#{domain}", "zed#{host_suffix}.#{store}.#{domain}",]
```
3. Change it as follows:
```bash
HOSTS.push [ "www#{host_suffix}.#{store}.#{domain}", "glue#{host_suffix}.#{store}.#{domain}", "zed#{host_suffix}.#{store}.#{domain}",]
```
**3. Set correct OAuth key permissions**

If you are using the OAuth module for user authentication, change permissions for the OAuth keys:
```yaml
chmod 660 config/Zed/dev_only_public.key
chmod 660 config/Zed/dev_only_private.key
```
## Integrate REST API resources

After installing and enabling GLUE, you can integrate various REST API resources with it. It is not required to integrate all modules for REST API to work. You can integrate only the modules you need.

### Login API
Provides the possibility to authenticate customer users.
The API is provided by the following module:
|Module|Description|
|---|---|
|[AuthRestApi](https://github.com/spryker/auth-rest-api)|Provides API endpoints to obtain an authentication token to use for subsequent requests.|
Installation steps: see **1.6. Enable customer authentication via OAuth tokens**.

### Registration API
Provides the possibility to register new customers.
The API is provided by the following module:
|Module|Description|
|---|---|
|[CustomersRestApi](https://github.com/spryker/customers-rest-api)|Provides API endpoints to manage customers.|

Installation steps:
1. Install the module using Composer:
```yaml
composer require spryker/customers-rest-api --update-with-dependencies
```
2. Add a resource route plugin to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new CustomersResourceRoutePlugin(),
        ];
    }
```
3. Run the following command:
```yaml
console transfer:generate
```

### Products API
Provides endpoints to retrieve information about products.
The API is provided by the following modules:

 |Module |DescriptionEndpoints Provided|
 |---|---|---|
|[ProductsRestApi](https://github.com/spryker/products-rest-api)|Provides REST access to products.|/`abstract-products`</br>/`concrete-products`|
|[ProductAvailabilitiesRestApi](https://github.com/spryker/product-availabilities-rest-api)|Provides API endpoints to get abstract and concrete product availability.|`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-product-availabilities`</br>/`concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/concrete-product-availabilities`|
|[ProductsProductAvailabilitiesResourceRelationship](https://github.com/spryker/products-product-availabilities-resource-relationship)|Provides relationship between products (abstract and concrete) and product availabilities resources.|-|
|[ProductPricesRestApi](https://github.com/spryker/product-prices-rest-api)|Provides API endpoints to retrieve abstract and concrete product prices.|`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-product-prices`</br>/`concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/concrete-product-prices`|
|[ProductsProductPricesResourceRelationship](https://github.com/spryker/products-product-prices-resource-relationship)|Provides relationship between products (abstract and concrete) and product prices resources.|-|
|[ProductTaxSetsRestApi](https://github.com/spryker/product-tax-sets-rest-api)|Provides API endpoints to retrieve product tax sets.|`/abstract-products/{% raw %}{{{% endraw %}SKU{% raw %}}}{% endraw %}/product-tax-sets`|
|[ProductsProductTaxSetsResourceRelationship](https://github.com/spryker/products-product-tax-sets-resource-relationship)|Provides relationship between abstract products and tax sets resources.|-|
|[ProductImageSetsRestApi](https://github.com/spryker/product-prices-rest-api)|Provides API endpoints to retrieve product image sets.|`/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/abstract-product-image-sets`</br>`/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}/concrete-product-image-sets`|

You can chose whether to install all modules of the API to retrieve full Products API functionality, or install any of the modules individually to get only the endpoints you need.
{% info_block infoBox "Relationship Modules" %}
Relationship modules provide relationship between products and related entities (e.g. between products and the tax sets available for them
{% endinfo_block %}. This means that, when a module is installed, a request for information on a certain product will also return information on the related resource by default. If the module is not installed, you need to query the related resource explicitly. In other words, if the `ProductsProductTaxSetsResourceRelationship` module is installed, a query for an abstract product will also return full data of the tax sets related to them. If it is not installed, you will need to query the `/abstract-products/{% raw %}{{{% endraw %}SKU{% raw %}}}{% endraw %}/product-tax-sets` explicitly.)

Installation steps:
**`ProductsRestApi`**:
1. Install the module using Composer:
```yaml
composer require spryker/products-rest-api --update-with-dependencies
```

2. Add resource route plugins to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new AbstractProductsResourceRoutePlugin(),
            new ConcreteProductsResourceRoutePlugin(),
        ];
    }
 ```
3. Run the following command:
 ```bash
console transfer:generate
 ```
**`ProductAvailabilitiesRestApi`**:
1. Install the module using Composer:
 ```bash
composer require spryker/product-availabilities-rest-api --update-with-dependencies
 ```
2. Add resource route plugins to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new AbstractProductAvailabilitiesRoutePlugin(), // Abstract product avaialbilities
            new ConcreteProductAvailabilitiesRoutePlugin(), // Concrete product avaialbilities
        ];
    }
 ```
3. Run the following command:
```bash
console transfer:generate
```
**`ProductsProductAvailabilitiesResourceRelationship`**:
1. Install the module using Composer:
```bash
composer require spryker/products-product-availabilities-resource-relationship --update-with-dependencies
```
2. Add resource route plugins to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRelationshipPlugins()`:
```php
protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface
    {
        ...
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new ProductsProductAvailabilitiesResourceRelationshipPlugin()
        );
   
        return $resourceRelationshipCollection;
    }
 ```
 
### Stores API
Provides API endpoints to retrieve current store configuration.
The API is provided by the following module:
|Modules|Description|
|---|---|
|[StoresRestApi](https://github.com/spryker/stores-rest-api)|Provides REST API endpoints to stores.|
Installation steps:
1. Install the module using Composer:
```bash
composer require spryker/stores-rest-api --update-with-dependencies
```
2. Add resource route plugin to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new StoresResourceRoutePlugin(),
        ];
    }
```
3. Run the following command:
```bash
console transfer:generate
```

### Search API
Provides the possibility to perform searches and retrieve search suggestions via the REST API.
The API is provided by the following module:
|Modules|Description|
|---|---|
|[CatalogSearchRestApi](https://github.com/spryker/catalog-search-rest-api)|Provides REST API endpoints to search products and search suggestions.|

Installation steps:
1. Install the module using Composer:
```yaml
composer require spryker/catalog-search-rest-api --update-with-dependencies
```
2. Add plugins for catalog search and search suggestions to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new SearchResourceRoutePlugin(),
            new SuggestionsResourceRoutePlugin(),
        ];
    }
```
3. Run the following command:
```yaml
console transfer:generate
```
4. If your store also provides the Products API, you need to add relationship between the Search and Products APIs:
```yaml
composer require spryker/catalog-search-products-resource-relationship --update-with-dependencies
```
After this, add the products resource relation plugins to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRelationshipPlugins()`:
```php
protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            CatalogSearchRestApiConfig::RESOURCE_CATALOG_SEARCH,
            new CatalogSearchAbstractProductsResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CatalogSearchRestApiConfig::RESOURCE_CATALOG_SEARCH_SUGGESTIONS,
            new CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin()
        );
  
        return $resourceRelationshipCollection;
    }
```

### Category API
Provides the possibility to retrieve the category tree and category nodes.
The API is provided by the following module:
|Modules|Description|
|---|---|
|[CategoriesRestApi](https://github.com/spryker/categories-rest-api)|Provides REST API endpoints to fetch category tree and category nodes by node ID.|
Installation steps:
1. Install the module using Composer:
```yaml
composer require spryker/categories-rest-api --update-with-dependencies
```
2. Add plugins for category-trees and category-nodes resources to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new CategoriesResourceRoutePlugin(),
            new CategoryResourceRoutePlugin(),
        ];
    }
 ```
3. Run the following command:
```yaml
console transfer:generate
```

### Carts API
Provides the possibility to manage customer carts and cart items.
The API is provided by the following module:
|Modules|Description|
|---|---|
|[CartsRestApi](https://github.com/spryker/carts-rest-api)|Provides REST API endpoints to create, get, delete carts for registered customers (using persistent storage), as well as manage cart items.|
Installation steps:
1. Install the module using Composer:
```yaml
composer require spryker/cart-items-products-relationship:"^1.0.0" spryker/carts-rest-api:"^1.0.0" --update-with-dependencies
```
2. Add carts and cart items resource route plugin to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new CartsResourceRoutePlugin(),
            new CartItemsResourceRoutePlugin(),
        ];
    }
 ```
3. Run Propel install to add the UUID functionality:
```yaml
console propel:install
```
4. Generate Propel transfer objects:
```yaml
console transfer:generate
```
5. Run the following command to update all existing customers carts with a UUID value.
```yaml
console quote:uuid:generate
```

### Product Labels API
Provides the possibility to retrieve product labels.
The API is provided by the following module:
|Modules|Description|Endpoints Provided|
|---|---|---|
|[ProductLabelsRestApi](https://github.com/spryker/product-labels-rest-api)|Provides REST API endpoints for product labels.|`/product-labels/{% raw %}{{{% endraw %}label-id{% raw %}}}{% endraw %}`|
						
Installation steps:
1. Install the module using Composer:
```yaml
composer require spryker/product-labels-rest-api --update-with-dependencies
```
2. Add plugin declaration to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php:getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...,
            new ProductLabelsResourceRoutePlugin(),
            ...,
 ```
3. Run the following command:
```yaml
console transfer:generate
```

**Retrieving Labels for Products**
Out of the box, the API provides the possibility to access labels by their ID. If you also want to retrieve labels assigned to a product together with product information, you need to install an additional relationship module:
1. Install the module using Composer:
```yaml
composer require spryker/product-labels-rest-api --update-with-dependencies
```
2. Add the products resource relation plugin to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRelationshipPlugins()`:
```php
protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new ProductLabelsRelationshipByResourceIdPlugin()
        );
  
        return $resourceRelationshipCollection;
    }
```
3. Run the following command:
```yaml
console transfer:generate
```

### Checkout API
Provides the possibility to place orders and retrieve checkout information.
The API is provided by the following module:
|Modules|Description|Endpoints Provided|
|---|---|---|
|CheckoutRestApi||| 
Installation steps:
**Placing an Order**
1. Install the module using Composer:
```php
composer require spryker/product-labels-rest-api --update-with-dependencies
```
2. Add plugin declaration to `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php:getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...,
            new CheckoutResourcePlugin(),
            ...,
```
3. Add relationship to the order to `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php:getResourceRelationshipPlugins()`:
```php
protected function getResourceRelationshipPlugins(
         ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     ): ResourceRelationshipCollectionInterface {
        ...
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT,
            new OrderRelationshipByOrderReferencePlugin()
        );
        ...
```
**Retrieving Checkout Data**
1. Install the module using Composer:
```yaml
composer require spryker/product-labels-rest-api --update-with-dependencies
```
2. Add plugin declaration to `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php:getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
    {
        return [
            ...,
            new CheckoutDataResourcePlugin(),
            ...,
```

### Customers API
Provides the possibility to retrieve product labels.
The API is provided by the following module:
|Modules|Description|Endpoints Provided|
|---|---|---|
|CustomersRestApi|Provides endpoints that allow you to manage customers.|/customers</br>/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}</br>/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses</br>/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses/{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}|
Installation steps:
1. Install the module using Composer:
```yaml
composer require spryker/customers-rest-api --update-with-dependencies
composer require spryker/wishlists-rest-api --update-with-dependencies
```
2. Add plugin declaration to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRoutePlugins()`:
```php
protected function getResourceRoutePlugins(): array
{
    return [
        ...
        new CustomersResourceRoutePlugin(),
        new AddressesResourceRoutePlugin(),
    ];
}
```
3. Add `CustomersToAddressesRelationshipPlugin` and `WishlistRelationshipByResourceIdPlugin` to `/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php::getResourceRelationshipPlugins()`:
```php
protected function getResourceRelationshipPlugins(
    ResourceRelationshipCollectionInterface $resourceRelationshipCollection
): ResourceRelationshipCollectionInterface {
    $resourceRelationshipCollection->addRelationship(
        CustomersRestApiConfig::RESOURCE_CUSTOMERS,
        new CustomersToAddressesRelationshipPlugin()
    );
    $resourceRelationshipCollection->addRelationship(
        CustomersRestApiConfig::RESOURCE_CUSTOMERS,
        new WishlistRelationshipByResourceIdPlugin()
    );
    return $resourceRelationshipCollection;
}
```
4. Run the following command:
```yaml
console transfer:generate
console propel:install
console customer-addresses:uuid:generate
```

