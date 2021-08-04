---
title: Customer API Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/customer-api-feature-integration
redirect_from:
  - /v1/docs/customer-api-feature-integration
  - /v1/docs/en/customer-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:


| Name | Version |
| --- | --- |
| Spryker Core | 2018.12.0 |
| Customer Account Management | 2018.12.0 |

## 1) Install the required modules
Run the following command to install the required modules:

```bash
composer require spryker/customers-rest-api:"^1.6.2" --update-with-dependencies
```

{% info_block infoBox "Verification" %}
Make sure that the following modules are installed:
{% endinfo_block %}

|  Module| Expected Directory |
| --- | --- |
| `CustomersRestApiExtensions` | `vendor/spryker/customers-rest-api-extension` |
| `CustomersRestApi	` | `vendor/spryker/customers-rest-api` |

## 2) Set up Database Schema and Transfer objects
Run the following commands to apply database changes and also generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

**Verification**
{% info_block infoBox %}
Make sure that the following changes have occurred in the database:
{% endinfo_block %}

| Transfer | Type | Event |
| --- | --- | --- |
|`spy_customer_address.uuid`  | column | created |
| `spy_customer_address.spy_customer_address-unique-uuid` |  index| created |

{% info_block infoBox %}
Make sure that the following changes have occurred in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `Address.uuid` |column  |created  | `src/Generated/Shared/Transfer/Address` |
| `RestCustomersAttributes` |class  | created |`src/Generated/Shared/Transfer/RestCustomersAttributes`  |
|`RestCustomersResponseAttributes`  |class  | created | `src/Generated/Shared/Transfer/RestCustomersResponseAttributes` |
| `RestCustomersRegisterAttributes` |  class|created  | `src/Generated/Shared/Transfer/RestCustomersRegisterAttributes` |
| `RestAddressAttributes` | class|  created| `src/Generated/Shared/Transfer/RestAddressAttributes` |
|  `RestCustomerPasswordAttributes`| class|  created|  `src/Generated/Shared/Transfer/RestCustomerPasswordAttributes`|
|`RestCustomerForgottenPasswordAttributes`  | class | created | `src/Generated/Shared/Transfer/RestCustomerForgottenPasswordAttributes` |

## 3) Set up behavior
### Enable console command
Register the following console command in `ConsoleDependencyProvider`:

```php
<?php
 
namespace Pyz\Zed\Console;
 
use Spryker\Zed\CustomersRestApi\Communication\Console\CustomerAddressesUuidWriterConsole;
 
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
            new CustomerAddressesUuidWriterConsole(),
        ];
 
        return $commands;
    }
}
```

{% info_block infoBox "Verification" %}
Run the following console command:<br> ```console list```<br>Make sure that `customer-addresses:uuid:generate appears` in the list.
{% endinfo_block %}

### Migrate data in database
Run the following command to generate the UUIDs for all the existing records in the `spy_customer_address` table:

```bash
console customer-addresses:uuid:generate
```

{% info_block infoBox "Verification" %}
Make sure that the `uuid` field is filled for all the records in the `spy_customer_address` table. You can run the following SQL query and make sure that the result is 0 records.<br>```select count(*
{% endinfo_block %} from spy_customer_address where uuid is NULL;```)

{% info_block infoBox "Verification" %}
Make sure that the `uuid` field is filled with all the records from the `spy_wishlist` table. You can run the following SQL query and make sure that the result is 0 records.<br>```select count(*
{% endinfo_block %} from spy_wishlist where uuid is NULL;```)

### Enable resources and relationships
Activate the following plugins:


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SetCustomerBeforeActionPlugin.uuid` | Sets customer data to session.| It is expected that the `user` field will be set in the REST requests. |`Spryker\Glue\CustomersRestApi\Plugin`  |
| `CustomersResourceRoutePlugin` |Registers the `customers` resource.  | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `AddressesResourceRoutePlugin` | Registers the `addresses` resource. |None  | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomerForgottenPasswordResourceRoutePlugin`| Registers the `customer-forgotten-password`resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomerRestorePasswordResourceRoutePlugin` | Registers the `customer-restore-password`resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
|`CustomerPasswordResourceRoutePlugin` | Registers the `customer-password`resource. | None |`Spryker\Glue\CustomersRestApi\Plugin`  |
| `CustomersToAddressesRelationshipPlugin` | Adds the `addresses` resource as a relationship to the `customers` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |

<details open>
    <summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CustomersRestApi\CustomersRestApiConfig;
use Spryker\Glue\CustomersRestApi\Plugin\AddressesResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerForgottenPasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerPasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerRestorePasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomersResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomersToAddressesRelationshipPlugin;
use Spryker\Glue\CustomersRestApi\Plugin\SetCustomerBeforeActionPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
 
 
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
            new CustomersResourceRoutePlugin(),
            new CustomerForgottenPasswordResourceRoutePlugin(),
            new CustomerRestorePasswordResourceRoutePlugin(),
            new CustomerPasswordResourceRoutePlugin(),
            new AddressesResourceRoutePlugin(),
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
            new SetCustomerBeforeActionPlugin(),
        ];
    }
 
    /**
    * {@inheritdoc}
    *
    * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    *
    * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
    */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection-&gt;addRelationship(
            CustomersRestApiConfig::RESOURCE_CUSTOMERS,
            new CustomersToAddressesRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

<br>
</details>

**Verification**
{% info_block infoBox %}
Make sure that the following endpoints are available:
{% endinfo_block %}

* `http://glue.mysprykershop.com/customers`

* `http://glue.mysprykershop.com/addresses`

* `http://glue.mysprykershop.com/customer-password`

* `http://glue.mysprykershop.com/customer-forgotten-password`

* `http://glue.mysprykershop.com/customer-restore-password`

{% info_block infoBox %}
Send a request to  `http://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=addresses`. Make sure that the response includes relationships to the `addresses` resources.</br> *The Customer with the given ID should have at least one address.*
{% endinfo_block %}

<!-- Last review date: Apr 11, 2019 -->

[//]: # (by Karoly Gerner and Volodymyr Volkov)
