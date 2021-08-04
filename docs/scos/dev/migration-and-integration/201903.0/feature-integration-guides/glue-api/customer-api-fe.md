---
title: Customer API Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/customer-api-feature-integration-201903
redirect_from:
  - /v2/docs/customer-api-feature-integration-201903
  - /v2/docs/en/customer-api-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201903.0 | Glue Application Feature Integration |
| Customer Account Management | 201903.0 |  |

### 1)Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/customers-rest-api:"^1.6.2" --update-with-dependencies
```

{% info_block warningBox %}
Make sure that the following modules are installed:
{% endinfo_block %}


| Module | Expected Directory |
| --- | --- |
| `CustomersRestApiExtensions` | `vendor/spryker/customers-rest-api-extension` |
| `CustomersRestApi	` | `vendor/spryker/customers-rest-api` |

### 2) Set Up Database Schema and Transfer Objects
Run the following commands to apply database changes, and also generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox %}
Make sure that the following changes have occurred in the database:
{% endinfo_block %}

| Transfer | Type | Event |
| --- | --- | --- |
| `spy_customer_address.uuid` | column | created |
| `spy_customer_address.spy_customer_address-unique-uuid	` | index | created |

{% info_block warningBox %}
Make sure that the following changes have occurred in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `Address.uuid` | column | created | `src/Generated/Shared/Transfer/Address` |
| `RestCustomersAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomersAttributes` |
| `RestCustomersResponseAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomersResponseAttributes` |
| `RestCustomersRegisterAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomersRegisterAttributes` |
| `RestAddressAttributes` | class | created | `src/Generated/Shared/Transfer/RestAddressAttributes` |
| `RestCustomerPasswordAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomerPasswordAttributes` |
| `RestCustomerForgottenPasswordAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomerForgottenPasswordAttributes` |

### 3) Set Up Behavior
#### Enable console command
Activate the console command provided by the module:

| Class | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CustomerAddressesUuidWriterConsole` | Provides the `customer-addresses:uuid:generate console` command for generating UUIDs for existing `spy_customer_address` records. | None | `Spryker\Zed\WishlistsRestApi\Communication\Console` |

<details open><summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>
    
```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\CustomersRestApi\Communication\Console\CustomerAddressesUuidWriterConsole;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;

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

</br>
</details>

{% info_block warningBox %}
Run the following console command:</br> `console list`</br>Make sure that `customer-addresses:uuid:generate` appears in the list.
{% endinfo_block %}

#### Migrate data in the database

{% info_block infoBox %}
The following steps generate UUIDs for existing entities in the `spy_customer_address` table.
{% endinfo_block %}

Run the following command:

```bash
console customer-addresses:uuid:generate
```

{% info_block warningBox %}
Make sure that the `uuid` field is filled for all records in the `spy_customer_address` table. For this purpose, run the following SQL query and make sure that the result is 0 records:</br>`SELECT COUNT(*
{% endinfo_block %} FROM spy_customer_address WHERE uuid IS NULL;`)

#### Enable resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SetCustomerBeforeActionPlugin.uuid` | Sets customer data to the session.
 | It is expected that the `user` field will be set in the REST requests. | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomersResourceRoutePlugin` | Registers the `customers` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `AddressesResourceRoutePlugin` | Registers the `addresses` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomerForgottenPasswordResourceRoutePlugin` | Registers the `customer-forgotten-password` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomerRestorePasswordResourceRoutePlugin` | Registers the `customer-restore-password` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomerPasswordResourceRoutePlugin` | Registers the `customer-password` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
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
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;


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
        $resourceRelationshipCollection->addRelationship(
            CustomersRestApiConfig::RESOURCE_CUSTOMERS,
            new CustomersToAddressesRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</br>
</details>

{% info_block warningBox %}
Make sure that the following endpoints are available:<ul><li>http://glue.mysprykershop.com/customers</li><li>http://glue.mysprykershop.com/addresses</li><li>http://glue.mysprykershop.com/customer-password</li><li>http://glue.mysprykershop.com/customer-forgotten-password</li><li>http://glue.mysprykershop.com/customer-restore-password</li></ul>Send a request to *http://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=addresses*. Make sure that the response includes relationships to the `addresses` resources.</br>*The Customer with the given ID should have at least one address*. 
{% endinfo_block %}

*Last review date: Apr 11, 2019*

<!--by Karoly Gerner and Volodymyr Volkov-->
