---
title: Expand search data
description: Learn how to expand entity data and create new data types in the search for your Spryker based projects.
template: howto-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/expanding-search-data.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/expand-search-data.html
  - /docs/pbc/all/search/202311.0/tutorials-and-howtos/expand-search-data.html
related:
  - title: Configure Elasticsearch
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-elasticsearch.html
  - title: Configure search for multi-currency
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-search-for-multi-currency.html
  - title: Configure search features
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-search-features.html
  - title: Configure a search query
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-a-search-query.html
  - title: Facet filter overview and configuration
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/facet-filter-overview-and-configuration.html
---

This document describes how to expand entity data and create new data types in the search.

In this document, we expand the search data with a `foo` entity as an example. You can use these instructions to add any other entity.

## Expand search data

To expand search data with a `foo` entity, do the following:

1. Expand `ProductPageLoadTransfer` object with `foo` data:

    1. Add your data to the transfer:

    ```xml
    <transfer name="ProductPayload">
        <property name="foo" type="int"/>
    </transfer>
    ```

    1. Implement `ProductPageDataLoaderPluginInterface` as follows. This plugin expands `ProductPageLoadTransfer` with data and returns the modified object.

    <details><summary>ProductPageDataLoaderPluginInterface implementation example</summary>

    ```php
    class FooPageDataLoaderPlugin implements ProductPageDataLoaderPluginInterface
    {
        ...

        /**
         * @param \Generated\Shared\Transfer\ProductPageLoadTransfer $productPageLoadTransfer
         *
         * @return \Generated\Shared\Transfer\ProductPageLoadTransfer
         */
        public function expandProductPageDataTransfer(
        ProductPageLoadTransfer $productPageLoadTransfer
        ): ProductPageLoadTransfer {

            $payloadTransfers = $this->updatePayloadTransfers(
            $productPageLoadTransfer->getPayloadTransfers()
            );

            $productPageLoadTransfer->setPayloadTransfers($payloadTransfers);

            return $productPageLoadTransfer;
        }

        /**
         * @param \Generated\Shared\Transfer\ProductPayloadTransfer[] $productPageLoadTransfers
         *
         * @return \Generated\Shared\Transfer\ProductPayloadTransfer[] updated payload transfers
         */
        protected function updatePayloadTransfers(array $productPageLoadTransfers): array
        {
            foreach ($productPageLoadTransfers as $productPageLoadTransfer) {
            $productPageLoadTransfer->sefFoo('Some value');
            }

            return $productPageLoadTransfers;
        }
    }    
    ```

    </details>

2. Expand `ProductAbstractPageSearch` object with `foo` data:

    1. Add your data to transfer:

  ```xml
  <transfer name="ProductPageSearch">
      <property name="foo" type="int"/>
  </transfer>
  ```

    2. Implement `ProductPageDataExpanderPluginInterface` as follows. This plugin expands the provided `ProductAbstractPageSearchTransfer` object's data by `foo`.

    <details><summary>ProductPageDataExpanderPluginInterface implementation example</summary>

    ```php
    class ProductFooDataExpanderPlugin implements ProductPageDataExpanderPluginInterface
    {
        /**
         * {@inheritDoc}
         * - Expands the provided ProductAbstractPageSearch transfer object's data by foo.
         *
         * @api
         *
         * @param mixed[] $productData
         * @param \Generated\Shared\Transfer\ProductPageSearchTransfer $productAbstractPageSearchTransfer
         *
         * @return void
         */
        public function expandProductPageData(array $productData, ProductPageSearchTransfer $productAbstractPageSearchTransfer)
        {
            $productPayloadTransfer = $this->getProductPayloadTransfer($productData);

            $productAbstractPageSearchTransfer->setFoo($productPayloadTransfer->getFoo());
        }

        /**
         * @param mixed[] $productData
         *
         * @return \Generated\Shared\Transfer\ProductPayloadTransfer
         */
        protected function getProductPayloadTransfer(array $productData): ProductPayloadTransfer
        {
            return $productData[ProductPageSearchConfig::PRODUCT_ABSTRACT_PAGE_LOAD_DATA];
        }
    }
    ```
    </details>

3. Expand the `PageMapTransfer` object with `foo` data by implementing `ProductAbstractMapExpanderPluginInterface` as follows. This plugin expands `foo`-related data in product abstract search data.


{% info_block infoBox  %}

In the example with `foo`, we use `->addIntegerSort()`, but you can use more options from `PageMapBuilderInterface`.

{% endinfo_block %}

<details><summary>ProductAbstractMapExpanderPluginInterface implementation example</summary>


```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See the LICENSE file.
 */

namespace Spryker\Zed\SalesProductConnector\Communication\Plugin\ProductPageSearch;

use Generated\Shared\Transfer\LocaleTransfer;
use Generated\Shared\Transfer\PageMapTransfer;
use Spryker\Zed\ProductPageSearchExtension\Dependency\PageMapBuilderInterface;
use Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface;

class ProductFooMapExpanderPlugin implements ProductAbstractMapExpanderPluginInterface
{
    protected const KEY_FOO = 'foo';

    /**
     * {@inheritDoc}
     * - Adds product foo related data to product abstract search data.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\PageMapTransfer $pageMapTransfer
     * @param \Spryker\Zed\ProductPageSearchExtension\Dependency\PageMapBuilderInterface $pageMapBuilder
     * @param mixed[] $productData
     * @param \Generated\Shared\Transfer\LocaleTransfer $localeTransfer
     *
     * @return \Generated\Shared\Transfer\PageMapTransfer
     */
    public function expandProductMap(
        PageMapTransfer $pageMapTransfer,
        PageMapBuilderInterface $pageMapBuilder,
        array $productData,
        LocaleTransfer $localeTransfer
    ) {
        $pageMapBuilder->addIntegerSort(
            $pageMapTransfer,
            static::KEY_FOO,
            (int)$productData[static::KEY_FOO]
        );

        return $pageMapTransfer;
    }
}
```

</details>


1. To allow customers to sort products by `foo`, implement `SortConfigTransferBuilderPluginInterface` by building a `SortConfigTransfer` with a `foo` parameter:

<details><summary>SortConfigTransferBuilderPluginInterface implementation example</summary>

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Spryker\Client\SalesProductConnector\Plugin;

use Generated\Shared\Search\PageIndexMap;
use Generated\Shared\Transfer\SortConfigTransfer;
use Spryker\Client\Catalog\Dependency\Plugin\SortConfigTransferBuilderPluginInterface;
use Spryker\Client\Kernel\AbstractPlugin;

class FooSortConfigTransferBuilderPlugin extends AbstractPlugin implements SortConfigTransferBuilderPluginInterface
{
    protected const CONFIG_NAME = 'foo';
    protected const PARAMETER_NAME = 'foo';
    protected const UNMAPPED_TYPE = 'integer';

    /**
     * {@inheritDoc}
     * - Builds a foo sort configuration transfer for the catalog page.
     *
     * @api
     *
     * @return \Generated\Shared\Transfer\SortConfigTransfer
     */
    public function build()
    {
        return (new SortConfigTransfer())
            ->setName(static::CONFIG_NAME)
            ->setParameterName(static::PARAMETER_NAME)
            ->setFieldName(PageIndexMap::INTEGER_SORT)
            ->setIsDescending(true)
            ->setUnmappedType(static::UNMAPPED_TYPE);
    }
}
```

</details>


1. On the project level, wire the implemented plugins to the providers in `Pyz\Zed\ProductPageSearch\ProductPageSearchDependencyProvider` and `Pyz\Client\Catalog\CatalogDependencyProvider`:

- `ProductPageSearchDependencyProvider::getDataExpanderPlugins()`

```php
/**
 * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface[]
 */
protected function getDataExpanderPlugins()
{
    ...

    $dataExpanderPlugins[SalesProductConnectorConfig::PLUGIN_PRODUCT_FOO_DATA] = new ProductFooDataExpanderPlugin();

    return $dataExpanderPlugins;
}
```

- `ProductPageSearchDependencyProvider::getProductAbstractMapExpanderPlugins()`

```php
/**
 * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface[]
 */
protected function getProductAbstractMapExpanderPlugins(): array
{
    return [
        ...
        new ProductFooMapExpanderPlugin(),
    ];
}
```

- `ProductPageSearchDependencyProvider::getDataLoaderPlugins()`

```php
/**
 * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface[]
 */
protected function getDataLoaderPlugins()
{
    return [
        ...
        new ProductFooPageDataLoaderPlugin(),
    ];
}
```

- Optional: `CatalogDependencyProvider::getSortConfigTransferBuilderPlugins()`

```php
/**
 * @return \Spryker\Client\Catalog\Dependency\Plugin\SortConfigTransferBuilderPluginInterface[]
 */
protected function getSortConfigTransferBuilderPlugins()
{
    return [
        ...
        new FooSortConfigTransferBuilderPlugin(),
    ];
}
```



## Run the plugins

You can run the plugins by executing `ProductPageSearchFacade::publish()` in a suitable way. For example, you can set up the `ProductPageProductAbstractRefreshConsole` command as follows:

```php
namespace Spryker\Zed\ProductPageSearch\Communication\Console;

class ProductPageProductAbstractRefreshConsole extends Console
{
    protected const COMMAND_NAME = 'product-page-search:product-abstract-refresh';

    /**
     * @return void
     */
    protected function configure(): void
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription('Product page search index refreshing.');

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->getFacade()->refreshProductAbstractPage();

        return static::CODE_SUCCESS;
    }
}
```
