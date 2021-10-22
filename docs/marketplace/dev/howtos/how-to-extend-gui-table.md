---
title: "How-To: Extend an existing Gui table"
description: This articles provides details how to extend an existing Gui table
template: howto-guide-template
---

This article describes how to extend an existing Gui table in the Merchant Portal.
With this step by step instructions you will learn how to extend a Gui table with a new text column and a new select filter.

## Prerequisites

Follow the [Marketplace Merchant Portal Core feature integration guide](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html)
to install the Marketplace Merchant Portal Core feature providing the `GuiTable` module.

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

Add a new column to the data provider ``fetchData()`` method using a newly introduced column key:

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

## See also

- [How to add a new Gui table](/docs/marketplace/dev/howtos/how-to-create-gui-table.html)
- [How to create a new Gui table column type](/docs/marketplace/dev/howtos/how-to-add-new-column-type.html)
- [How to create a new Gui table filter type](/docs/marketplace/dev/howtos/how-to-add-new-filter-type.html)
