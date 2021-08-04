---
title: Creating and configuring Zed tables
originalLink: https://documentation.spryker.com/2021080/docs/creating-and-configuring-zed-tables
redirect_from:
  - /2021080/docs/creating-and-configuring-zed-tables
  - /2021080/docs/en/creating-and-configuring-zed-tables
---

Spryker has a dedicated component to help you build tables for the Zed UI.

This article helps you start working with tables.

## 1. Creating a new table

To start defining a new table, under the `/Communication/Table/` folder that extends the `AbstractTable` class, create a new class in your module. 

**Example:**

```php
<?php

use Spryker\Zed\Gui\Communication\Table\AbstractTable;

class OrdersTable extends AbstractTable
```
{% info_block warningBox "Note" %}

The query used for fetching the data must be injected into the constructor.

{% endinfo_block %}

{% info_block warningBox "Note" %}

The table class must implement the following methods:
* `function configure (TableConfiguration $configuration)`: here, set up the captions for the tables header, the searchable and sortable fields, and specify the raw fields.
* `function prepareData (TableConfiguration $configuration)`: here, prepare the data retrieved by the query in the way you want it to be shown in the table.

{% endinfo_block %}

## 2. Configuring the table

Set up the captions for the tables header, the searchable and sortable fields and specify the raw fields:

```php
<?php

function configure(TableConfiguration $configuration)
```

The configuration of the table must be done with the following methods:

* Set up captions for the table headers (`setHeader()`)
* Set up searchable fields (`setSearchable()`)
* Set up sortable fields (`setSortable()`)
* Set up raw fields—for fields containing HTML markup that should not be escaped (`addRawColumn`)

**Code sample:**
    
```php
<?php

protected function configure(TableConfiguration $config)
{
    $config->setHeader([
        SpySalesOrderTableMap::COL_ID_SALES_ORDER => 'Order Id',
        SpySalesOrderTableMap::COL_CREATED_AT => 'Timestamp',
        SpySalesOrderTableMap::COL_FK_CUSTOMER => 'Customer Id',
        SpySalesOrderTableMap::COL_FIRST_NAME => 'Billing Name',
        SpySalesOrderTableMap::COL_GRAND_TOTAL => 'Value'
    ]);
    $config->setSortable([
        SpySalesOrderTableMap::COL_CREATED_AT,
        SpySalesOrderTableMap::COL_GRAND_TOTAL
    ]);
    $config->setSearchable([
        SpySalesOrderTableMap::COL_FIRST_NAME,
        SpySalesOrderTableMap::COL_GRAND_TOTAL
    ]);

    $config->addRawColumn('URL');

    $this->persistFilters($config);

    return $config;
}
```

### Configuring the default field for sorting

To configure the field on which the table is sorted by default when it’s initially rendered or when no sorting is applied by the user from the UI, specify the index of the field when configuring the table:

```php
<?php

$config->setDefaultSortColumnIndex(5);
```

You can also configure the default sort direction (for the initial rendering of the table or for the case it’s not set yet), for example:

```php
<?php

$config->setDefaultSortDirection(
    \Spryker\Zed\Gui\Communication\Table\TableConfiguration::SORT_DESC);
```

## 3. Preparing the data

Prepare the data retrieved by the query in the way you want it to be shown in the table:

```php
<?php

function prepareData(TableConfiguration $configuration)
```

The query results should be mapped to the table columns, and data transformations such as price formatting should be done here:

```php
<?php

protected function prepareData(TableConfiguration $config)
{
    $query = $this->salesQuery;
    $queryResults = $this->runQuery($query, $config);
    $results = [];
    foreach ($queryResults as $item) {
        $results[] = [
            SpySalesOrderTableMap::COL_ID_SALES_ORDER => $item[SpySalesOrderTableMap::COL_ID_SALES_ORDER],
            SpySalesOrderTableMap::COL_CREATED_AT => $item[SpySalesOrderTableMap::COL_CREATED_AT],
            SpySalesOrderTableMap::COL_FK_CUSTOMER => $item[SpySalesOrderTableMap::COL_FK_CUSTOMER],
            SpySalesOrderTableMap::COL_FIRST_NAME => $item[SpySalesOrderTableMap::COL_FIRST_NAME],
            SpySalesOrderTableMap::COL_GRAND_TOTAL => $this->formatPrice($item[SpySalesOrderTableMap::COL_GRAND_TOTAL])),
        ];
    }
    return $results;
}
```

## 4. Rendering the table

To display the query results in the table, in the controller’s action, retrieve an instance of the table configuration class and call the `render()` operation:

```php
<?php

public function indexAction(Request $request)
{
    $table = $this->getFactory()->createOrdersTable();
    return [
        'orders' => $table->render(),
    ];
}
```

## 5. Downloading the table

To download the data:
1. Add the `DownloadController` class.
2. Add a link to the `DownloadController` action into the table view.
3. Prepare the download of the data.

### Adding DownloadController

`DownloadController` calls the module factory to create the table for downloading and start the download stream.

```php
<?php

namespace Spryker\Zed\Module\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * @method \Spryker\Zed\Module\Business\ModuleFacadeInterface getFacade()
 * @method \Spryker\Zed\Module\Communication\ModuleCommunicationFactory getFactory()
 * @method \Spryker\Zed\Module\Persistence\ModuleQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Module\Persistence\ModuleRepositoryInterface getRepository()
 */
class DownloadController extends AbstractController
{
    /**
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function indexAction(): StreamedResponse
    {
        return $this->getFactory()->createModuleTable()->streamDownload();
    }
}

```

### Adding a link to the DownloadController action into the table view

To start the download, add a link to the `DownloadController` action on the table view:
```twig

...

{% raw %}{%{% endraw %} block action {% raw %}%}{% endraw %}
    ...
    {% raw %}{{{% endraw %} createActionButton('/module/download', 'Download as CSV' | trans) {% raw %}}}{% endraw %}
    ...
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

### Preparing the download of the data

To prepare the CSV file, implement the following methods in the `Table` class:
* `GetCsvHeaders()`
* `GetDownloadQuery()`
* `FormatCsvRow()`

#### Implementing GetCsvHeaders

This method defines the order and displayed header of the columns. 

Return an array that has the column name of the table as the key and the displayed header as value. The values are translated.

```php
<?php

...

/**
 * @return string[]
 */
protected function getCsvHeaders(): array
{
    return [
        static::COL_A => 'Header a',
        static::COL_B => 'Header b',
        static::COL_C => 'Header c',
    ];
}
```

#### Implementing GetDownloadQuery

The `GetDownloadQuery` method returns the query that is used to fetch the data from the database. In the background, `\Propel\Runtime\Formatter\OnDemandFormatter` is set for performance reasons.

```php
<?php

...

/**
 * @return \Orm\Zed\Module\Persistence\SpyModuleQuery
 */
protected function getDownloadQuery(): ModelCriteria
{
    $moduleQuery = $this->prepareQuery();
    $moduleQuery->orderBy(SpyModuleTableMap::COL_A, Criteria::DESC);

    return $moduleQuery;
}
```

#### Implementing GetDownloadQuery

This method receives each `\Propel\Runtime\ActiveRecord\ActiveRecordInterface` and is responsible for returning a formatted array of the required data.

```php
<?php

...

/**
 * @param \Orm\Zed\Module\Persistence\SpyModule $entity
 *
 * @return array
 */
protected function formatCsvRow(ActiveRecordInterface $entity): array
{
    $moduleRow = $entity->toArray();

    $moduleRow[static::COL_A] = $this->utilDateTimeService->formatDateTime($entity->getCreatedAt());
    $moduleRow[static::COL_B] = $entity->getRegistered() ? 'Verified' : 'Unverified';
    
    ...

    return $moduleRow;
}
```
