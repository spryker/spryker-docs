---
title: Creating and Configuring Zed Tables
originalLink: https://documentation.spryker.com/v6/docs/t-working-tables
redirect_from:
  - /v6/docs/t-working-tables
  - /v6/docs/en/t-working-tables
---

Spryker has a dedicated component to help you build tables for the Zed UI.

This article will help you get started on working with tables:

* [Creating a New Table](https://documentation.spryker.com/docs/t-working-tables#creating-a-new-table)
* [Configure the Table](https://documentation.spryker.com/docs/t-working-tables#configure-the-table)
* [Prepare the Data](https://documentation.spryker.com/docs/t-working-tables#prepare-the-data)
* [Render the Table](https://documentation.spryker.com/docs/t-working-tables#render-the-table)
* [Download the Table as CSV](https://documentation.spryker.com/docs/t-working-tables#dwonload-the-table-as-csv)

## Creating a New Table
To get started defining the new table, create a new class in your module, under the `/Communication/Table/` folder that extends the `AbstractTable` class.

**Example:**

```php
<?php
use Spryker\Zed\Gui\Communication\Table\AbstractTable;

class OrdersTable extends AbstractTable
```

The query used for fetching the data must be injected in the constructor.

The table configuration class must implement the following operations:

* `function configure(TableConfiguration $configuration)`: here you set up the captions for the tables header, the searchable and sortable fields and  specify the raw fields
* `function prepareData(TableConfiguration $configuration)`: here you prepare the data retrieved by the query in the manner you want it to be shown in the table

## Configure the Table

```php
<?php
function configure(TableConfiguration $configuration)
```

The configuration of the table must be done here:

* setup captions for the table headers (`setHeader()`)
* setup searchable fields (`setSearchable()`)
* setup sortable fields (`setSortable()`)
* setup raw fields - for fields containing HTML markup that should not be escaped (`addRawColumn`)

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

### Configure the default field for sorting
You can configure the field on which the table is sorted by default when it’s initially rendered or when no sorting is applied by the user from the UI. You just need to specify the index of the field when configuring the table:

```php
<?php
$config->setDefaultSortColumnIndex(5);
```

Additionally, you can configure the default sort direction (for the initial rendering of the table or for the case it’s not set yet), e.g.:

```php
<?php
$config->setDefaultSortDirection(
    \Spryker\Zed\Gui\Communication\Table\TableConfiguration::SORT_DESC);
```

## Prepare the Data

```php
<?php

function prepareData(TableConfiguration $configuration)
```

The query results should be mapped to the table columns and data transformations, such as price formatting, should be done here.

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

## Render the Table
In order to display the query results in the table, in the controller’s action you retrieve an instance of the table configuration class and call the `render()` operation.

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

## Download the Table as CSV
In order to download the data of a table you need to update you table with some addiotional methods, need to create a download controller and you need to add a link to the download controller.

### Addional methods you need to implement

1. `AbstractTable::getCsvHeaders()` - Defines the headers of the CSV file and the order in which order they should appear.
2. `AbstractTable::getDownloadQuery()` - Returns a query that will be used to fetch the data for the CSV file.
3. `AbstractTable::formatCsvRow()` - [Optional] Formats a entity retrieved from the database.

Examples:

#### `AbstractTable::getCsvHeaders()`

This method defines the columns of the data that should be exported as CSV. It is also responsible to define the order in which the data is written to the CSV file.

```php
<?php

/**
 * @return string[]
 */
public function getCsvHeaders(): array
{
    return [
        'database_column_name_1' => 'CSV column header 1',
        'database_column_name_2' => 'CSV column header 2',
        ...
    ];
}
```

#### `AbstractTable::getDownloadQuery()`

This method returns a `ModelCriteria` e.g. SpyCustomerQuery. You should use the same query as you use for displaying the Table GUI but you can also change it to your needs e.g. limit the data retrieved from the dabase.

```php
<?php

/**
 * @return \Orm\Zed\ModuleName\Persistence\SpyTableNameQuery
 */
public function getDownloadQuery(): ModelCriteria
{
    return $this->queryBuilder->buildQuery()[->limit(10000)];
}
```

#### `AbstractTable::formatCsvRow()`

This method is optional but in most cases you will need to format your data for the CSV file.

```php
<?php

public function formatCsvRow(ActiveRecordInterface $entity): array
{
    $rowData = $entity->toArray();
    $rowData['database_column_name_2'] = $this->formatColumn($entity->getColumn());
        
    return $rowData;
}
```

### DownloadController

Add a new controller or update an existing one. The action will return a `StreamedResponse` that does the download.

```php
<?php

namespace Spryker\Zed\ModuleName\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DownloadController extends AbstractController
{
    /**
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function indexAction(): StreamedResponse
    {
        return $this->getFactory()->createTable()->streamDownload();
    }
}
```

###  Link to the download controller

Add this snippet to the Twig file that is displaying your Table GUI.

```twig
...
{% raw %}{%{% endraw %} block action {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} createActionButton('/module-name/download', 'Download as CSV' | trans) {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
...
```




