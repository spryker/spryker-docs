---
title: Create table views
description: Learn to create and configure table views in Zed. This guide covers steps for defining custom table data and optimizing the user interface for efficient data management.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-create-table-view
originalArticleId: 0cecd405-174d-49d0-a321-6b705b22bef2
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-creating-a-table-view.html
---


This tutorial explains how to retrieve data from the database and render it in a table.

## Prerequisites

You have created a new [module](/docs/dg/dev/backend-development/extend-spryker/create-modules.html).

## Create a table

Create the `ProductTable` class under the `src/Pyz/Zed/HelloWorld/Communication/Table` folder:

<details>
  <summary>ProductTable</summary>

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
    protected $spyProductQuery;

    /**
     * ProductTable constructor.
     *
     * @param \Orm\Zed\Product\Persistence\SpyProductQuery $spyProductQuery
     */
    public function __construct(SpyProductQuery $spyProductQuery)
    {
        $this->spyProductQuery = $spyProductQuery;
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
        $queryResult = $this->runQuery($this->spyProductQuery, $config);

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

</details>

## Create a factory

The factory should be placed in the Communication layer and should contain a method that returns an instance of the `ProductTable` class. Add the method that constructs the instance of the `ProductTable` class:

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
        return new ProductTable($this->createProductQuery());
    }

    /**
     * @return \Orm\Zed\Product\Persistence\SpyProductQuery
     */
    public function createProductQuery(): SpyProductQuery
    {
        return SpyProductQuery::create();
    }
}
```

## Add a Controller action that renders the table


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

The `tableAction()` will be called by a jQuery Plugin ([Datatables](https://datatables.net/)) that renders the actual data as a table.

{% endinfo_block %}

## Create the twig template

Add the products variable to `Pyz/Zed/HelloWorld/Presentation/Index/index.twig` to render the table containing the list of products.

```twig
{% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} embed '@Gui/Partials/widget.twig' with { widget_title: 'Orders List' } {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %} block widget_content {% raw %}%}{% endraw %}

            {% raw %}{{{% endraw %} products | raw {% raw %}}}{% endraw %}

        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

Run the command:

```bash
vendor/bin/console router:cache:warm-up:backoffice
```

This is all! To see the table you created, go to `https://zed.mysprykershop.com/hello-world`. You will be able to see the products listed in the table.
