---
title: "Extend Gui tables"
description: This articles provides details how to extend an existing Gui table
template: howto-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/howtos/how-to-extend-gui-table.html
related:
  - title: How to add a new Gui table
    link: docs/pbc/all/merchant-management/page.version/marketplace/tutorials-and-howtos/create-gui-tables.html
  - title: How to create a new Gui table column type
    link: docs/marketplace/dev/howtos/how-to-add-new-guitable-column-type.html
  - title: How to create a new Gui table filter type
    link: docs/pbc/all/merchant-management/page.version/marketplace/tutorials-and-howtos/create-gui-table-filter-types.html
---

This document describes how to extend an existing Gui table in the Merchant Portal.
With this step by step instructions you will learn how to extend a Gui table with a new text column and a new select filter.

## Prerequisites

To install the Marketplace Merchant Portal Core feature providing the `GuiTable` module, follow the [Install the Marketplace Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html).


## 1) Add a new column

Add a new column to the configuration provider:

```php
/**
 * @return \Generated\Shared\Transfer\GuiTableConfigurationTransfer
 */
public function getConfiguration(): GuiTableConfigurationTransfer
{
    //initial configuration

    $guiTableConfigurationBuilder->addColumnText('example_column_key', 'Example Column');

    return $guiTableConfigurationBuilder->createConfiguration();
}

```

Add a new column to the data provider `fetchData()` method using a newly introduced column key:

```php
    /**
     * @param \Generated\Shared\Transfer\MerchantProductTableCriteriaTransfer $criteriaTransfer
     *
     * @return \Generated\Shared\Transfer\GuiTableDataResponseTransfer
     */
    protected function fetchData(AbstractTransfer $criteriaTransfer): GuiTableDataResponseTransfer
    {
        //getting data and GuiTableDataResponseTransfer setup

        foreach ($productAbstractCollectionTransfer->getProductAbstracts() as $productAbstractTransfer) {
            $responseData = [
                //initial columns data
                'example_column_key' => 'test data',
            ];

            $guiTableDataResponseTransfer->addRow((new GuiTableRowDataResponseTransfer())->setResponseData($responseData));
        }

        return $guiTableDataResponseTransfer;
    }
```

## 2) Add a new filter

Extend the table criteria transfer with a new filter property:

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="ProductTableCriteria">
        <!--Initial properties-->
        <property name="filterExampleFilter" type="bool"/>
    </transfer>

</transfers>

```

Generate transfers:

``` bash
console transfer:generate
```

Add a new filter to the configuration provider:

```php
/**
 * @return \Generated\Shared\Transfer\GuiTableConfigurationTransfer
 */
public function getConfiguration(): GuiTableConfigurationTransfer
{
    //initial configuration

    $guiTableConfigurationBuilder->addFilterSelect('exampleFilter', 'Example filter', false, [
        '1' => 'Select title 1',
        '0' => 'Select title 2',
    ]);

    return $guiTableConfigurationBuilder->createConfiguration();
}
```

Adjust the data provider `fetchData()` method to filter the data by `ProductTableCriteria.filterExampleFilter` value.
