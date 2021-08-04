---
title: Tutorial - Creating a Table View
originalLink: https://documentation.spryker.com/v6/docs/t-create-table-view
redirect_from:
  - /v6/docs/t-create-table-view
  - /v6/docs/en/t-create-table-view
---

<!--used to be: http://spryker.github.io/tutorials/zed/create-table-view/-->

This tutorial explains how to retrieve data from the database and render it in a table.

**Prerequisites:**

* You have created a new [module](https://documentation.spryker.com/docs/t-add-new-bundle).

## Creating a Table
Create the `ProductTable` class under the `src/Pyz/Zed/HelloWorld/Communication/Table` folder:

**Code sample:**
    
```php
<?php

namespace Pyz\Zed\HelloWorld\Communication\Table;

use Orm\Zed\Product\Persistence\Map\SpyProductTableMap;
use Orm\Zed\Product\Persistence\SpyProductQuery;
use Spryker\Zed\Gui\Communication\Table\AbstractTable;
use Spryker\Zed\Gui\Communication\Table\TableConfiguration;

class ProductTable extends AbstractTable
{
    /**
     * @var \Orm\Zed\Product\Persistence\SpyProductQuery
     */
    protected $spyProductPropelQuery;

    /**
     * ProductTable constructor.
     *
     * @param \Orm\Zed\Product\Persistence\SpyProductQuery $spyProductPropelQuery
     */
    public function __construct(SpyProductQuery $spyProductPropelQuery)
    {
        $this->spyProductPropelQuery = $spyProductPropelQuery;
    }

    /**
     * @param TableConfiguration $config
     *
     * @return TableConfiguration
     */
    protected function configure(TableConfiguration $config): TableConfiguration
    {
        $config->setHeader([
            SpyProductTableMap::COL_ID_PRODUCT => 'Product ID',
            SpyProductTableMap::COL_SKU => 'Product Sku',
        ]);

        return $config;
    }

    /**
     * @param TableConfiguration $config
     *
     * @return array
     */
    protected function prepareData(TableConfiguration $config): array
    {
        $queryResult = $this->runQuery($this->spyProductPropelQuery, $config);

        $results = [];
        foreach ($queryResult as $resultItem) {
            $results[] = [
                SpyProductTableMap::COL_ID_PRODUCT => $resultItem[SpyProductTableMap::COL_ID_PRODUCT],
                SpyProductTableMap::COL_SKU => $resultItem[SpyProductTableMap::COL_SKU],
            ];
        }

        return $results;
    }
}
```

## Creating a Factory
The factory should be placed in the communication layer and should contain a method that returns an instance of the `ProductTable` class. Add the method that constructs the instance of the `ProductTable` class:

```php
<?php

namespace Pyz\Zed\HelloWorld\Communication;

use Orm\Zed\Product\Persistence\SpyProductQuery;
use Pyz\Zed\HelloWorld\Communication\Table\ProductTable;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

class HelloWorldCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return ProductTable
     */
    public function createProductTable(): ProductTable
    {
        return new ProductTable($this->createProductPropelQuery());
    }

    /**
     * @return \Orm\Zed\Product\Persistence\SpyProductQuery
     */
    public function createProductPropelQuery(): SpyProductQuery
    {
        return SpyProductQuery::create();
    }
}
```

## Adding a Controller Action that Renders the Table

**Code sample:**

```php
<?php

namespace Pyz\Zed\HelloWorld\Communication\Controller;

use Pyz\Zed\HelloWorld\Communication\HelloWorldCommunicationFactory;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @method HelloWorldCommunicationFactory getFactory()
 */
class IndexController extends AbstractController
{
    /**
     * @return array
     */
    public function indexAction(): array
    {
        $table = $this->getFactory()->createProductTable();

        return [
            'products' => $table->render()
        ];
    }

    /**
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function tableAction(): JsonResponse
    {
        $table = $this->getFactory()->createProductTable();

        return $this->jsonResponse(
            $table->fetchData()
        );
    }
}
```

{% info_block warningBox %}
The `tableAction(
{% endinfo_block %}` will be called by a jQuery Plugin ([Datatables](https://datatables.net/)) that renders the actual data as a table.)

## Creating the Twig Template
Add the products variable to `Pyz/Zed/HelloWorld/Presentation/Index/index.twig` to render the table containing the list of products.

```php
{% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} embed '@Gui/Partials/widget.twig' with { widget_title: 'Orders List' } {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %} block widget_content {% raw %}%}{% endraw %}

            {% raw %}{{{% endraw %} products | raw {% raw %}}}{% endraw %}

        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
Run the `vendor/bin/console router:cache:warm-up` command.

This is all! To see the table you created, go to `http://zed.de.demoshop.local/hello-world`. You will be able to see the products listed in the table.
