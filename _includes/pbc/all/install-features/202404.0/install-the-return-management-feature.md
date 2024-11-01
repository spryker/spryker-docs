

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Order Management | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/return-management:"{{page.version}}" spryker/barcode:"^1.1.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| SalesReturn | vendor/spryker/sales-return |
| SalesReturnDataImport | vendor/spryker/sales-return-data-import |
| SalesReturnSearch | vendor/spryker/sales-return-search |
| Barcode | vendor/spryker/barcode |

{% endinfo_block %}

### 2) Set up configuration

#### Configure returns display in the Back Office

In order to enable the display of returns data in the order details page in the back-office, adjust the SalesConfig in the following way:

**src/Pyz/Zed/Sales/SalesConfig.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
    /**
     * @return string[]
     */
    public function getSalesDetailExternalBlocksUrls()
    {
        $projectExternalBlocks = [
            'return' => '/sales-return-gui/sales/list',
        ];

        $externalBlocks = parent::getSalesDetailExternalBlocksUrls();

        return array_merge($externalBlocks, $projectExternalBlocks);
    }

     /**
     * @return bool
     */
    public function isHydrateOrderHistoryToItems(): bool
    {
        return false;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the order detail page in the Back Office shows a table with order’s returns in the **Returns** section.

Make sure that when the `StateHistoryOrderItemExpanderPlugin` is not configured and `SalesConfig::isHydrateOrderHistoryToItems()` is false, the order item state history is not shown in the order items table on the order detail page.

{% endinfo_block %}

#### Configure OMS

Consider OMS configuration using `DummyPayment01` process as an example.
First of all, add `DummyReturn01` process.

**config/Zed/oms/DummySubprocess/DummyReturn01.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="DummyReturn">
        <states>
            <state name="waiting for return"/>
            <state name="returned"/>
            <state name="return canceled"/>
            <state name="shipped to customer"/>
        </states>

        <transitions>
            <transition>
                <source>shipped</source>
                <target>waiting for return</target>
                <event>start-return</event>
            </transition>

            <transition>
                <source>delivered</source>
                <target>waiting for return</target>
                <event>start-return</event>
            </transition>

            <transition>
                <source>waiting for return</source>
                <target>returned</target>
                <event>execute-return</event>
            </transition>

            <transition>
                <source>waiting for return</source>
                <target>return canceled</target>
                <event>cancel-return</event>
            </transition>

            <transition>
                <source>return canceled</source>
                <target>shipped to customer</target>
                <event>ship-return</event>
            </transition>

            <transition>
                <source>shipped to customer</source>
                <target>delivered</target>
                <event>delivery-return</event>
            </transition>
        </transitions>

        <events>
            <event name="start-return" command="Return/StartReturn"/>
            <event name="execute-return" manual="true"/>
            <event name="cancel-return" manual="true"/>
            <event name="ship-return" manual="true"/>
            <event name="delivery-return" manual="true"/>
        </events>
    </process>

</statemachine>
```

Include `DummyReturn01` as a subprocess into `DummyPayment01`.

**config/Zed/oms/DummyPayment01.xml**

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="DummyPayment01" main="true">
        <subprocesses>
            <process>DummyReturn</process>
        </subprocesses>
    </process>

    <process name="DummyReturn" file="DummySubprocess/DummyReturn01.xml"/>

</statemachine>
```

{% info_block warningBox "Verification" %}

Make sure the OMS the transition diagram shows a possible transition from `shipped` to `waiting for return`.

{% endinfo_block %}

### 3) Set up database schema and transfer objects

Adjust the schema definition so entity changes will trigger the events:

**src/Pyz/Zed/SalesReturn/Persistence/Propel/Schema/spy_sales_return.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" name="zed"
          namespace="Orm\Zed\SalesReturn\Persistence"
          package="src.Orm.Zed.SalesReturn.Persistence">

    <table name="spy_sales_return_reason">
        <behavior name="event">
            <parameter name="spy_sales_return_reason_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/SalesReturnSearch/Persistence/Propel/Schema/spy_sales_return_search.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" name="zed"
          namespace="Orm\Zed\SalesReturnSearch\Persistence"
          package="src.Orm.Zed.SalesReturnSearch.Persistence">

    <table name="spy_sales_return_reason_search">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
        </behavior>
    </table>

</database>
```

Run the following commands to apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_sales_return | table | created |
| spy_sales_return_item | table | created |
| spy_sales_return_reason | table | created |
| spy_sales_return_reason_search | table | created |
| spy_sales_order_item.remuneration_amount | column | created |
| spy_sales_order_item.uuid | column | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| Return | class | created | src/Generated/Shared/Transfer/ReturnTransfer |
| ReturnItem | class | created | src/Generated/Shared/Transfer/ReturnItemTransfer |
| ReturnTotals | class | created | src/Generated/Shared/Transfer/ReturnTotalsTransfer |
| ReturnCollection | class | created | src/Generated/Shared/Transfer/ReturnCollectionTransfer |
| ReturnCollection | class | created | src/Generated/Shared/Transfer/ReturnCreateRequestTransfer |
| ReturnCreateRequest | class | created | src/Generated/Shared/Transfer/ReturnCreateRequestTransfer |
| ReturnReasonSearch | class | created | src/Generated/Shared/Transfer/ReturnReasonSearchTransfer |
| ReturnReasonSearchRequest | class | created | src/Generated/Shared/Transfer/ReturnReasonSearchRequestTransfer |
| ReturnReasonSearchCollection | class | created | src/Generated/Shared/Transfer/ReturnReasonSearchCollectionTransfer |
| ReturnResponse | class | created | src/Generated/Shared/Transfer/ReturnResponseTransfer |
| ReturnItemFilter | class | created | src/Generated/Shared/Transfer/ReturnItemFilterTransfer |
| ReturnFilter | class | created | src/Generated/Shared/Transfer/ReturnFilterTransfer |
| ReturnReasonFilter | class | created | src/Generated/Shared/Transfer/ReturnReasonFilterTransfer |
| OrderItemFilter| class | created | src/Generated/Shared/Transfer/OrderItemFilterTransfer |
| BarcodeResponse| class | created | src/Generated/Shared/Transfer/BarcodeResponseTransfer|
| Item.isReturnable | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| Item.uuid | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| Item.orderReference | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| Item.createdAt | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| Item.currencyIsoCode | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| Item.salesOrderConfiguredBundle | property | created | src/Generated/Shared/Transfer/ItemTransfer` |
| Item.returnPolicyMessages | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| OrderListRequest.orderReferences | property | created | src/Generated/Shared/Transfer/OrderListRequestTransfer |
| PaginationConfig.maxItemsPerPage | property | created | src/Generated/Shared/Transfer/PaginationConfigTransfer |

{% endinfo_block %}

### 4) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
return.return_reasons.damaged.name,Damaged,en_US
return.return_reasons.damaged.name,Beschädigt,de_DE
return.return_reasons.wrong-item.name,Wrong Item,en_US
return.return_reasons.wrong-item.name,Falscher Artikel,de_DE
return.return_reasons.no_longer_needed.name,No longer needed,en_US
return.return_reasons.no_longer_needed.name,Nicht mehr benötigt,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Configure export to Elasticsearch

Adjust Elasicsearch config at SearchElasticsearchConfig:

**src/Pyz/Shared/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
<?php

namespace Pyz\Shared\SearchElasticsearch;

use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'return_reason',
    ];
}
```

To set up a new source for Return Reasons, execute the following command:

```bash
console search:setup:sources
```


Adjust `RabbitMq` module configuration in `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\SalesReturnSearch\SalesReturnSearchConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            SalesReturnSearchConfig::SYNC_SEARCH_RETURN,
        ];
    }
}
```

Register new queue message processor:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\SalesReturnSearch\SalesReturnSearchConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            SalesReturnSearchConfig::SYNC_SEARCH_RETURN => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

Configure synchronization pool

**src/Pyz/Zed/SalesReturnSearch/SalesReturnSearchConfig.php**

```php
<?php

namespace Pyz\Zed\SalesReturnSearch;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\SalesReturnSearch\SalesReturnSearchConfig as SprykerSalesReturnSearchConfig;

class SalesReturnSearchConfig extends SprykerSalesReturnSearchConfig
{
    /**
     * @return string|null
     */
    public function getReturnReasonSearchSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

#### Set up re-generate and re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ReturnReasonSynchronizationDataBulkRepositoryPlugin | Allows synchronizing the return reason search table content into Elasticsearch. | None | Spryker\Zed\SalesReturnSearch\Communication\Plugin\Synchronization |
| ReturnReasonPublisherTriggerPlugin | Allows to populate return reason search table with data and trigger further export to Elasticsearch. | None | Spryker\Zed\SalesReturnSearch\Communication\Plugin\Publisher |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\SalesReturnSearch\Communication\Plugin\Synchronization\ReturnReasonSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ReturnReasonSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\SalesReturnSearch\Communication\Plugin\Publisher\ReturnReasonPublisherTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ReturnReasonPublisherTriggerPlugin(),
        ];
    }
}
```

#### Register publisher plugins

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ReturnReasonWritePublisherPlugin| Listens for events and publishes respective data. | None | Spryker\Zed\SalesReturnSearch\Communication\Plugin\Publisher\ReturnReason |
| ReturnReasonDeletePublisherPlugin | Listens for events and unpublishes respective data. | None | Spryker\Zed\SalesReturnSearch\Communication\Plugin\Publisher\ReturnReason |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\SalesReturnSearch\Communication\Plugin\Publisher\ReturnReason\ReturnReasonDeletePublisherPlugin;
use Spryker\Zed\SalesReturnSearch\Communication\Plugin\Publisher\ReturnReason\ReturnReasonWritePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new ReturnReasonWritePublisherPlugin(),
            new ReturnReasonDeletePublisherPlugin(),
        ];
    }
}
```

#### Register query expander and result formatter plugins

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ReturnReasonSearchResultFormatterPlugin | Maps raw Elasticsearch results to a transfer. | None | Spryker\Client\SalesReturnSearch\Plugin\Elasticsearch\ResultFormatter |
| PaginatedReturnReasonSearchQueryExpanderPlugin | Adds pagination to a search query. | None | Spryker\Client\SalesReturnSearch\Plugin\Elasticsearch\Query |
| LocalizedQueryExpanderPlugin | Adds filtering by locale to a search query. | None | Spryker\Client\SearchElasticsearch\Plugin\QueryExpander |

**src/Pyz/Client/SalesReturnSearch/SalesReturnSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SalesReturnSearch;

use Spryker\Client\SalesReturnSearch\Plugin\Elasticsearch\Query\PaginatedReturnReasonSearchQueryExpanderPlugin;
use Spryker\Client\SalesReturnSearch\Plugin\Elasticsearch\ResultFormatter\ReturnReasonSearchResultFormatterPlugin;
use Spryker\Client\SalesReturnSearch\SalesReturnSearchDependencyProvider as SprykerSalesReturnSearchDependencyProvider;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\LocalizedQueryExpanderPlugin;

class SalesReturnSearchDependencyProvider extends SprykerSalesReturnSearchDependencyProvider
{
    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function getReturnReasonSearchResultFormatterPlugins(): array
    {
        return [
            new ReturnReasonSearchResultFormatterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function getReturnReasonSearchQueryExpanderPlugins(): array
    {
        return [
            new LocalizedQueryExpanderPlugin(),
            new PaginatedReturnReasonSearchQueryExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Fill the `spy_sales_return_reason` table with some data and run `console publish:trigger-events -r return_reason` command.
Make sure that the `spy_sales_return_search` table is filled with respective data per locale. Check Elasticsearch documents, make sure you are able to see data in the following format:

```yaml
{
   "type":"return_reason",
   "locale":"en_US",
   "search-result-data":{
      "idSalesReturnReason":1,
      "glossaryKeyReason":"return.return_reasons.damaged.name",
      "name":"Damaged"
   },
   "full-text-boosted":[
      "Damaged"
   ],
   "suggestion-terms":[
      "Damaged"
   ],
   "completion-terms":[
      "Damaged"
   ],
   "string-sort":{
      "name":"Damaged"
   }
}
```

2. Change some record at the `spy_sales_return_search` table and run `console sync:data return_reason`. Make sure that your changes were synced to the respective Elasticsearch document.

{% endinfo_block %}

### 6) Import data

Adjust data import configuration:

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;
use Spryker\Zed\SalesReturnDataImport\SalesReturnDataImportConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    /**
     * @return string[]
     */
    public function getFullImportTypes(): array
    {
        return [
            SalesReturnDataImportConfig::IMPORT_TYPE_RETURN_REASON,
        ];
    }
}
```

Add data import plugin to dependency provider:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ReturnReasonDataImportPlugin | Imports return reasons. | None | Spryker\Zed\SalesReturnDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\SalesReturnDataImport\Communication\Plugin\ReturnReasonDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ReturnReasonDataImportPlugin(),
        ];
    }
}
```

Adjust your project’s corresponding .yml configuration file to enable import as a part of full import.

**data/import/config/full_import_config.yml**

```yaml
version: 0

actions:
  - data_entity: return-reason
```

**data/import/config/commerce_setup_import_config.yml**

```yaml
actions:
  - data_entity: return-reason
```

Run the following command to import data:

```bash
console data:import
```

{% info_block warningBox "Verification" %}

Make sure that `spy_sales_return_reason` table is filled with data.

{% endinfo_block %}


### 7) Set up behavior

Set up the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| RemunerationTotalOrderExpanderPlugin | Expands Totals with remuneration amount total. | None | Spryker\Zed\SalesReturn\Communication\Plugin\Sales |
| UpdateOrderItemIsReturnableByGlobalReturnableNumberOfDaysPlugin | Verifies the difference between order item creation date and configured date interval. If the difference is more than config, marks order item as not returnable. Adds return policy message to order item. | None | Spryker\Zed\SalesReturn\Communication\Plugin\Sales |
| UpdateOrderItemIsReturnableByItemStatePlugin | Compares order item state with returnable states. If item state is not applicable for return, marks item as not returnable. | None | Spryker\Zed\SalesReturn\Communication\Plugin\Sales |
| StartReturnCommandPlugin | Sets remuneration amount for Item. | None | Spryker\Zed\SalesReturn\Communication\Plugin\Oms\Command |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesReturn\Communication\Plugin\Sales\RemunerationTotalOrderExpanderPlugin;
use Spryker\Zed\SalesReturn\Communication\Plugin\Sales\UpdateOrderItemIsReturnableByGlobalReturnableNumberOfDaysPlugin;
use Spryker\Zed\SalesReturn\Communication\Plugin\Sales\UpdateOrderItemIsReturnableByItemStatePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface[]
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new RemunerationTotalOrderExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new UpdateOrderItemIsReturnableByItemStatePlugin(),
            new UpdateOrderItemIsReturnableByGlobalReturnableNumberOfDaysPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\SalesReturn\Communication\Plugin\Oms\Command\StartReturnCommandPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(static::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new StartReturnCommandPlugin(), 'Return/StartReturn');

            return $commandCollection;
        });

        return $container;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that results from `SalesFacade::getOrderItems()` method call contain respective `isReturnable` and `returnPolicyMessages` data.
Make sure that results from `SalesFacade::getOrderByIdSalesOrder()` method contain remuneration total data.

Make sure the order items that transit from status `shipped` to `waiting for return` have the remuneration amount set.

{% endinfo_block %}

### Update Back Office navigation

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that the **Sales > Returns** navigation item is displayed.

{% endinfo_block %}



## Install feature frontend

Follow the steps below to install the feature front end.

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/return-management:"{{page.version}}" spryker-shop/barcode-widget:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| SalesReturnPage | vendor/spryker-shop/sales-return-page |
| BarcodeWidget | vendor/spryker-shop/barcode-widget |

{% endinfo_block %}

### 2) Add translations

Add translations as follows:

1. Append glossary according to your configuration:

<details><summary>data/import/common/common/glossary.csv</summary>

```yaml
customer.order.remunerationTotal,Remuneration Total,en_US
customer.order.remunerationTotal,Rückerstattungsbetrag,de_DE
customer.order.refundTotal,Refund Total,en_US
customer.order.refundTotal,Rückerstattung insgesamt,de_DE
sales_configured_bundle_widget.returnable_state,Non-returnable,en_US
sales_configured_bundle_widget.returnable_state,Kann nicht retourniert werden,de_DE
sales_configured_bundle_widget.quantity,Quantity:,en_US
sales_configured_bundle_widget.quantity,Anzahl:,de_DE
return_page.default_title,Returns,en_US
return_page.default_title,Retouren,de_DE
return_page.title,Create Return,en_US
return_page.title,Retoure Anlegen,de_DE
return_page.return_reasons.select_reason.placeholder,Select reason,en_US
return_page.return_reasons.select_reason.placeholder,Grund auswählen,de_DE
return_page.return_reasons.custom_reason.placeholder,Custom reason,en_US
return_page.return_reasons.custom_reason.placeholder,Benutzerdefinierter Grund,de_DE
return.return_policy.returnable_till.message,Returnable till: %date%,en_US
return.return_policy.returnable_till.message,Retournierbar bis: %date%,de_DE
return_page.list.title,Returns,en_US
return_page.list.title,Retouren,de_DE
return_page.account.no_return,No returns at the moment,en_US
return_page.account.no_return,Momentan gibt es keine Retouren,de_DE
return_page.return.return_ref,Return Reference,en_US
return_page.return.return_ref,Retourennummer,de_DE
return_page.return.order_ref,Order Reference,en_US
return_page.return.order_ref,Bestellnummer,de_DE
return_page.return.number_of_items,No. of Items,en_US
return_page.return.number_of_items,Anzahl der Artikel,de_DE
return_page.return.date,Return Date,en_US
return_page.return.date,Retouredatum,de_DE
return_page.return.items_state,Items State,en_US
return_page.return.items_state,Stand der Artikel,de_DE
return_page.return.view_return,View Return,en_US
return_page.return.view_return,Retoure ansehen,de_DE
return_page.return.print_return,Print Slip,en_US
return_page.return.print_return,Beleg ausdrücken,de_DE
return_page.breadcrumb.returns,Returns,en_US
return_page.breadcrumb.returns,Retouren,de_DE
return_page.breadcrumb.create_return,Create Return,en_US
return_page.breadcrumb.create_return,Retoure anlegen,de_DE
return_page.details.page_title,Return Details,en_US
return_page.details.page_title,Retourendetails,de_DE
return_page.details.actions.back_to_list,Back to List,en_US
return_page.details.actions.back_to_list,Zurück zur Liste,de_DE
return_page.details.actions.print_slip,Print Slip,en_US
return_page.details.actions.print_slip,Beleg ausdrücken,de_DE
return_page.details.total.items_to_return,Items to return,en_US
return_page.details.total.items_to_return,Die zu retournierenden Artikel,de_DE
return_page.details.total.items_to_return.count,items,en_US
return_page.details.total.items_to_return.count,Artikel,de_DE
return_page.details.total.remuneration_total,Remuneration Total,en_US
return_page.details.total.remuneration_total,Rückerstattungsbetrag,de_DE
return_page.item.options,Product options:,en_US
return_page.item.options,Produktoptionen:,de_DE
return_page.table.actions,Actions,en_US
return_page.table.actions,Aktionen,de_DE
return_page.button.return_list,Returns,en_US
return_page.button.return_list,Retouren,de_DE
return_page.return_reasons.title,Reason:,en_US
return_page.return_reasons.title,Grund:,de_DE
return_page.return.created,Return created successfully,en_US
return_page.return.created,Retoure wurde erfolgreich angelegt,de_DE
return_page.return.title,Create Return,en_US
return_page.return.title,Retoure Anlegen,de_DE
return_page.order_reference,Order ref:,en_US
return_page.order_reference,Bestellnummer:,de_DE
return_page.order_date,Order date:,en_US
return_page.order_date,Bestellungsdatum:,de_DE
return_page.return_reference,Return ref:,en_US
return_page.return_reference,Retourennummer:,de_DE
return_page.return_date,Return date:,en_US
return_page.return_date,Retouredatum:,de_DE
return_page.button_text,Create Return,en_US
return_page.button_text,Retoure anlegen,de_DE
return_page.item_sku,SKU:,en_US
return_page.item_sku,SKU:,de_DE
return_page.quantity,Quantity:,en_US
return_page.quantity,Anzahl:,de_DE
return_page.returnable_state,Non-returnable,en_US
return_page.returnable_state,Kann nicht retourniert werden,de_DE
return_page.create_return.validation.selected_items,At least one product should be selected.,en_US
return_page.create_return.validation.selected_items,Mindestens ein Produkt sollte ausgewählt werden.,de_DE
return_page.button.create_return,Create Return,en_US
return_page.button.create_return,Retoure anlegen,de_DE
return_page.slip.return_reference,Return Ref,en_US
return_page.slip.return_reference,Retourennummer,de_DE
return_page.slip.return_date,Return Date,en_US
return_page.slip.return_date,Retouredatum,de_DE
return_page.slip.order_reference,Order Ref,en_US
return_page.slip.order_reference,Bestellnummer,de_DE
return_page.slip.barcode,Barcode,en_US
return_page.slip.barcode,Barcode,de_DE
return_page.slip.product_sku,Product SKU,en_US
return_page.slip.product_sku,Produkt-SKU,de_DE
return_page.slip.product_name,Product Name,en_US
return_page.slip.product_name,Produktname,de_DE
return_page.slip.default_price,Default Price,en_US
return_page.slip.default_price,Standardpreis,de_DE
return_page.slip.quantity,Qty,en_US
return_page.slip.quantity,Anzahl,de_DE
return_page.slip.total_price,Total Price,en_US
return_page.slip.total_price,Gesamtpreis,de_DE
return_page.slip.return_reason,Return Reason,en_US
return_page.slip.return_reason,Retourengrund,de_DE
return_page.slip.items_to_return,Items to Return,en_US
return_page.slip.items_to_return,Die zu retournierenden Artikel,de_DE
return_page.slip.remuneration_total,Remuneration Total,en_US
return_page.slip.remuneration_total,Rückerstattungsbetrag,de_DE
sales_product_bundle_widget.returnable_text,Returnable till:,en_US
sales_product_bundle_widget.returnable_text,Man kann retournieren bis:,de_DE
sales_product_bundle_widget.returnable_state,Non-returnable,en_US
sales_product_bundle_widget.returnable_state,Kann nicht retourniert werden,de_DE
sales_product_bundle_widget.item_sku,SKU:,en_US
sales_product_bundle_widget.item_sku,SKU:,de_DE
sales_product_bundle_widget.quantity,Quantity:,en_US
sales_product_bundle_widget.quantity,Anzahl:,de_DE
sales_product_bundle_widget.item.options,Product options:,en_US
sales_product_bundle_widget.item.options,Produktoptionen:,de_DE
oms.state.new,New,en_US
oms.state.new,Neu,de_DE
oms.state.waiting,Waiting,en_US
oms.state.waiting,Warten,de_DE
oms.state.in-progress,In progress,en_US
oms.state.in-progress,In Bearbeitung,de_DE
oms.state.ready,Ready,en_US
oms.state.ready,Bereit,de_DE
oms.state.canceled,Canceled,en_US
oms.state.canceled,Abgebrochen,de_DE
oms.state.closed,Closed,en_US
oms.state.closed,Geschlossen,de_DE
oms.state.draft,Draft,en_US
oms.state.draft,Entwurf,de_DE
oms.state.payment-pending,Payment pending,en_US
oms.state.payment-pending,Ausstehende Zahlung,de_DE
oms.state.paid,Paid,en_US
oms.state.paid,Bezahlt,de_DE
oms.state.confirmed,Confirmed,en_US
oms.state.confirmed,Bestätigt,de_DE
oms.state.exported,Exported,en_US
oms.state.exported,Exportiert,de_DE
oms.state.shipped,Shipped,en_US
oms.state.shipped,Versandt,de_DE
oms.state.delivered,Delivered,en_US
oms.state.delivered,Geliefert,de_DE
oms.state.ready-for-return,Ready for return,en_US
oms.state.ready-for-return,Bereit zum Retournieren,de_DE
oms.state.refunded,Refunded,en_US
oms.state.refunded,Zurückerstattet,de_DE
oms.state.returned,Returned,en_US
oms.state.returned,Retourniert,de_DE
oms.state.waiting-for-return,Waiting for return,en_US
oms.state.waiting-for-return,Wartet auf Retoure,de_DE
oms.state.shipped-to-customer,Shipped to customer,en_US
oms.state.shipped-to-customer,An den Kunden versandt,de_DE
oms.state.sent-to-merchant,Sent to merchant,en_US
oms.state.sent-to-merchant,An den Händler versandt,de_DE
oms.state.shipped-by-merchant,Shipped by merchant,en_US
oms.state.shipped-by-merchant,Von dem Händler versandt,de_DE
oms.state.return-canceled,Return canceled,en_US
oms.state.return-canceled,Retoure wurde abgebrochen,de_DE
return.create_return.validation.returnable_items_error,Return cannot be created as it contains non-returnable items,en_US
return.create_return.validation.returnable_items_error,"Retoure kann nicht angestellt werden, weil sie die Artikel beinhaltet, die nicht retourniert werden können",de_DE
return.create_return.validation.store_error,Return cannot be created - a wrong store has been selected,en_US
return.create_return.validation.store_error,Retoure kann nicht angestellt werden - es wurde ein falscher Store ausgewählt.,de_DE
return.create_return.validation.items_error,Return cannot be cretaed for this set of items,en_US
return.create_return.validation.items_error,Für dieses Set der Artikel kann die Retoure nicht erstellt werden,de_DE
```
</details>

2. Import data:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Ensure that the configured data has been added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 3) Enable controllers

Register the following route provider(s) on the Storefront:

| PROVIDER | NAMESPACE |
| --- | --- |
| SalesReturnPageRouteProviderPlugin | SprykerShop\Yves\SalesReturnPage\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\SalesReturnPage\Plugin\Router\SalesReturnPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new SalesReturnPageRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the `yves.mysprykershop.com/return/list`, `yves.mysprykershop.com/return/create/{orderReference}`, `yves.mysprykershop.com/return/view/{orderReference}` and `yves.mysprykershop.com/return/slip-print/{orderReference}` routes are available.

{% endinfo_block %}


### 4) Set up behavior

Set up the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| BarcodeWidget | A widget that generates Barcode by text. | None | SprykerShop\Yves\BarcodeWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\BarcodeWidget\Widget\BarcodeWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            BarcodeWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that:

* The `BarcodeWidget` widget has been registered.
* The barcode (with return reference encoded) is shown on the return print screen.

{% endinfo_block %}
