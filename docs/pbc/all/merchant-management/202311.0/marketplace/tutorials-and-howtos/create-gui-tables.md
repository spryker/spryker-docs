---
title: "Create Gui tables"
description: This articles provides details how to create a new Gui table
template: howto-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/howtos/how-to-create-gui-table.html
related:
  - title: How to extend an existing Gui table
    link: docs/pbc/all/merchant-management/page.version/marketplace/tutorials-and-howtos/extend-gui-tables.html
  - title: How to create a new Gui table column type
    link: docs/marketplace/dev/howtos/how-to-add-new-guitable-column-type.html
  - title: How to create a new Gui table filter type
    link: docs/pbc/all/merchant-management/page.version/marketplace/tutorials-and-howtos/create-gui-table-filter-types.html
---

This document describes how to create a new Gui table in Merchant Portal.
With this step by step instructions you will create a new Gui table with filters, search, sorting and an `http` data source type from scratch.

## Prerequisites

To install the Marketplace Merchant Portal Core feature providing the `GuiTable` module, follow the [Marketplace Merchant Portal Core feature integration guide](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html).

## 1) Add GuiTable services to dependencies

```php
<?php

namespace Spryker\Zed\ProductMerchantPortalGui;

class ProductMerchantPortalGuiDependencyProvider extends AbstractBundleDependencyProvider
{
    public const SERVICE_GUI_TABLE_HTTP_DATA_REQUEST_EXECUTOR = 'gui_table_http_data_request_executor';

    public const SERVICE_GUI_TABLE_FACTORY = 'gui_table_factory';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container): Container
    {
        $container = $this->addGuiTableHttpDataRequestHandler($container);
        $container = $this->addGuiTableFactory($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addGuiTableHttpDataRequestHandler(Container $container): Container
    {
        $container->set(static::SERVICE_GUI_TABLE_HTTP_DATA_REQUEST_EXECUTOR, function (Container $container) {
            return $container->getApplicationService(static::SERVICE_GUI_TABLE_HTTP_DATA_REQUEST_EXECUTOR);
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addGuiTableFactory(Container $container): Container
    {
        $container->set(static::SERVICE_GUI_TABLE_FACTORY, function (Container $container) {
            return $container->getApplicationService(static::SERVICE_GUI_TABLE_FACTORY);
        });

        return $container;
    }
}
```

## 2) Create factory methods for GuiTable services

```php
<?php

namespace Spryker\Zed\ProductMerchantPortalGui\Communication;

use Spryker\Shared\GuiTable\GuiTableFactoryInterface;
use Spryker\Shared\GuiTable\Http\GuiTableDataRequestExecutorInterface;

class ProductMerchantPortalGuiCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Spryker\Shared\GuiTable\Http\GuiTableDataRequestExecutorInterface
     */
    public function getGuiTableHttpDataRequestExecutor(): GuiTableDataRequestExecutorInterface
    {
        return $this->getProvidedDependency(ProductMerchantPortalGuiDependencyProvider::SERVICE_GUI_TABLE_HTTP_DATA_REQUEST_EXECUTOR);
    }

    /**
     * @return \Spryker\Shared\GuiTable\GuiTableFactoryInterface
     */
    public function getGuiTableFactory(): GuiTableFactoryInterface
    {
        return $this->getProvidedDependency(ProductMerchantPortalGuiDependencyProvider::SERVICE_GUI_TABLE_FACTORY);
    }
}
```

## 3) Create a configuration provider

Create `GuiTableConfigurationBuilder` calling `GuiTableFactoryInterface::createConfigurationBuilder()` (`gui_table_factory` service)
and then create `GuiTableConfigurationTransfer` by calling `GuiTableConfigurationBuilder::createConfiguration()`.

```php
class ProductAbstractGuiTableConfigurationProvider
{
    public const COL_KEY_SKU = 'sku';
    public const COL_KEY_IMAGE = 'image';
    public const COL_KEY_NAME = 'name';
    public const COL_KEY_SUPER_ATTRIBUTES = 'superAttributes';
    public const COL_KEY_VARIANTS = 'variants';
    public const COL_KEY_CATEGORIES = 'categories';
    public const COL_KEY_STORES = 'stores';
    public const COL_KEY_VISIBILITY = 'visibility';

    /**
     * @var \Spryker\Shared\GuiTable\GuiTableFactoryInterface
     */
    protected $guiTableFactory;

    /**
     * @param \Spryker\Shared\GuiTable\GuiTableFactoryInterface $guiTableFactory
     */
    public function __construct(GuiTableFactoryInterface $guiTableFactory)
    {
        $this->guiTableFactory = $guiTableFactory;
    }

    /**
     * @return \Generated\Shared\Transfer\GuiTableConfigurationTransfer
     */
    public function getConfiguration(): GuiTableConfigurationTransfer
    {
        $guiTableConfigurationBuilder = $this->guiTableFactory->createConfigurationBuilder();

        $guiTableConfigurationBuilder = $this->addColumns($guiTableConfigurationBuilder);
        $guiTableConfigurationBuilder = $this->addFilters($guiTableConfigurationBuilder);
        $guiTableConfigurationBuilder = $this->addRowActions($guiTableConfigurationBuilder);

        $guiTableConfigurationBuilder
            ->setDataSourceUrl('/product-merchant-portal-gui/products/table-data')
            ->setSearchPlaceholder('Search by SKU, Name')
            ->setDefaultPageSize(25);

        return $guiTableConfigurationBuilder->createConfiguration();
    }

    /**
     * @param \Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilderInterface $guiTableConfigurationBuilder
     *
     * @return \Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilderInterface
     */
    protected function addColumns(GuiTableConfigurationBuilderInterface $guiTableConfigurationBuilder): GuiTableConfigurationBuilderInterface
    {
        $guiTableConfigurationBuilder->addColumnText(static::COL_KEY_SKU, 'SKU', true, false)
            ->addColumnImage(static::COL_KEY_IMAGE, 'Image', false, true)
            ->addColumnText(static::COL_KEY_NAME, 'Name', true, false)
            ->addColumnListChip(static::COL_KEY_SUPER_ATTRIBUTES, 'Super Attributes', false, true, 2, 'gray')
            ->addColumnChip(static::COL_KEY_VARIANTS, 'Variants', true, true, 'gray')
            ->addColumnListChip(static::COL_KEY_CATEGORIES, 'Categories', false, true, 2, 'gray')
            ->addColumnListChip(static::COL_KEY_STORES, 'Stores', false, true, 2, 'gray')
            ->addColumnChip(static::COL_KEY_VISIBILITY, 'Visibility', true, true, 'gray', [
                'Online' => 'green',
            ]);

        return $guiTableConfigurationBuilder;
    }

    /**
     * @param \Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilderInterface $guiTableConfigurationBuilder
     *
     * @return \Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilderInterface
     */
    protected function addFilters(GuiTableConfigurationBuilderInterface $guiTableConfigurationBuilder): GuiTableConfigurationBuilderInterface
    {
        $guiTableConfigurationBuilder->addFilterSelect('isVisible', 'Visibility', false, [
            '1' => 'Online',
            '0' => 'Offline',
        ])

        return $guiTableConfigurationBuilder;
    }

    /**
     * @param \Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilderInterface $guiTableConfigurationBuilder
     *
     * @return \Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilderInterface
     */
    protected function addRowActions(GuiTableConfigurationBuilderInterface $guiTableConfigurationBuilder): GuiTableConfigurationBuilderInterface
    {
        $guiTableConfigurationBuilder->addRowActionDrawerAjaxForm(
            'update-product',
            'Manage Product',
            sprintf(
                '/product-merchant-portal-gui/update-product-abstract?product-abstract-id=${row.%s}',
                ProductAbstractTransfer::ID_PRODUCT_ABSTRACT
            )
        )->setRowClickAction('update-product');

        return $guiTableConfigurationBuilder;
    }
}
```


## 4) Introduce criteria transfer

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="MerchantProductTableCriteria">
        <property name="searchTerm" type="string"/>
        <property name="page" type="int"/>
        <property name="pageSize" type="int"/>
        <property name="orderBy" type="string"/>
        <property name="orderDirection" type="string"/>
        <property name="filterIsVisible" type="bool"/>
    </transfer>

</transfers>
```

## 5) Create a table data provider

Create a table data provider extending `Spryker\Shared\GuiTable\DataProvider\AbstractGuiTableDataProvider`. In the `createCriteria()` method, create and return an instance of `MerchantProductTableCriteriaTransfer`. The properties will be filled and should be used for pagination, search, sorting and filtering. Return `GuiTableDataResponseTransfer` with table data in the `fetchData()` method using the newly introduced transfer properties from $criteriaTransfer
(`MerchantProductTableCriteriaTransfer` introduced in `AbstractGuiTableDataProvider::createCriteria()`).

```php
    /**
     * @param \Generated\Shared\Transfer\MerchantProductTableCriteriaTransfer $criteriaTransfer
     *
     * @return \Generated\Shared\Transfer\GuiTableDataResponseTransfer
     */
    protected function fetchData(AbstractTransfer $criteriaTransfer): GuiTableDataResponseTransfer
    {
        $productAbstractCollectionTransfer = $this->productMerchantPortalGuiRepository
            ->getProductAbstractTableData($criteriaTransfer);
        $guiTableDataResponseTransfer = new GuiTableDataResponseTransfer();

        foreach ($productAbstractCollectionTransfer->getProductAbstracts() as $productAbstractTransfer) {
            $responseData = [
                ProductAbstractGuiTableConfigurationProvider::COL_KEY_SKU => $productAbstractTransfer->getSku(),
                ProductAbstractGuiTableConfigurationProvider::COL_KEY_IMAGE => $this->getImageUrl($productAbstractTransfer),
                ProductAbstractGuiTableConfigurationProvider::COL_KEY_NAME => $productAbstractTransfer->getName(),
                ProductAbstractGuiTableConfigurationProvider::COL_KEY_SUPER_ATTRIBUTES => $this->getSuperAttributesColumnData($productAbstractTransfer, $localeTransfer),
                ProductAbstractGuiTableConfigurationProvider::COL_KEY_VARIANTS => $productAbstractTransfer->getConcreteProductCount(),
                ProductAbstractGuiTableConfigurationProvider::COL_KEY_CATEGORIES => $productAbstractTransfer->getCategoryNames(),
                ProductAbstractGuiTableConfigurationProvider::COL_KEY_STORES => $productAbstractTransfer->getStoreNames(),
                ProductAbstractGuiTableConfigurationProvider::COL_KEY_VISIBILITY => $this->getVisibilityColumnData($productAbstractTransfer),
            ];

            $guiTableDataResponseTransfer->addRow((new GuiTableRowDataResponseTransfer())->setResponseData($responseData));
        }

        $paginationTransfer = $productAbstractCollectionTransfer->getPagination();

        if (!$paginationTransfer) {
            return $guiTableDataResponseTransfer;
        }

        return $guiTableDataResponseTransfer
            ->setPage($paginationTransfer->getPage())
            ->setPageSize($paginationTransfer->getMaxPerPage())
            ->setTotal($paginationTransfer->getNbResults());
    }
```

## 6) Create a page with a table

Create a controller that displays a table and make use of the newly created configuration provider to pass table configuration to the Twig template:

```php
namespace Spryker\Zed\ProductMerchantPortalGui\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductsController extends AbstractController
{
    /**
     * @return mixed[]
     */
    public function indexAction(): array
    {
        return $this->viewResponse([
            'productAbstractTableConfiguration' => $this->getFactory()
                ->createProductAbstractGuiTableConfigurationProvider()
                ->getConfiguration(),
        ]);
    }
}
```

Create a corresponding Twig template, pass configuration to frontend component.

To learn more about table components, see [Table Design](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-design.html).

## 7) Data source

Add a new action for fetching data (based on the URL set in `GuiTableConfigurationBuilder::setDataSourceUrl()`),
pass newly introduced data provider and configuration to `GuiTableHttpDataRequestExecutor::execute()` and request
to create a response with the table data.

```php
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function tableDataAction(Request $request): Response
    {
        return $this->getFactory()->getGuiTableHttpDataRequestExecutor()->execute(
            $request,
            $this->getFactory()->createProductAbstractTableDataProvider(),
            $this->getFactory()->createProductAbstractGuiTableConfigurationProvider()->getConfiguration()
        );
    }
```
