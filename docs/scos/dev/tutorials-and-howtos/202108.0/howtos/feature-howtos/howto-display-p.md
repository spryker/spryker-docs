---
title: HowTo - Display Product Groups by Color on the Storefront
originalLink: https://documentation.spryker.com/2021080/docs/howto-display-product-groups-by-color-on-the-storefront
redirect_from:
  - /2021080/docs/howto-display-product-groups-by-color-on-the-storefront
  - /2021080/docs/en/howto-display-product-groups-by-color-on-the-storefront
---

 

To enhance the visual shopping experience of your customers, you can use [product groups](https://documentation.spryker.com/docs/en/product-group). A product group is a group of products logically united by an attribute. You can create product groups, but there is no way to display them on the Storefront by default. This guide shows how to display a product group on the Storefront using the color attribute as an example. The behavior to be configured is described in [Product Groups Feature Overview](https://documentation.spryker.com/docs/en/product-group-feature-overview).

 
## Prerequisites

Before you start configuration, make sure that the [Product Groups feature is integrated](https://documentation.spryker.com/docs/product-group-feature-integration) into your project.

## Schema Extension

Add the `color_code` field to the `spy_product_abstract` table in the database:

1. Create or extend the schema file as follows.

**src/Pyz/Zed/ProductGroup/Persistence/Propel/Schema/spy_product.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://xsd.propelorm.org/1.6/database.xsd" namespace="Orm\Zed\Product\Persistence" package="src.Orm.Zed.Product.Persistence">

    <table name="spy_product_abstract" idMethod="native" allowPkInsert="true" phpName="SpyProductAbstract">
        <column name="color_code" required="false" type="VARCHAR" default="NULL" size="8"/>
    </table>

</database>
```


2. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

The `color_code` field has been added to the `spy_product_abstract` table.

{% endinfo_block %}


## Transfer Object Extension


Extend the existing transfer objects to support the newly introduced `colorCode` field:

1. Create or extend the transfer object definition file as follows.

**src/Pyz/Shared/ProductGroup/Transfer/product.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01 https://static.spryker.com/transfer-01.xsd">

    <transfer name="ProductAbstractStorage">
        <property name="colorCode" type="string"/>
    </transfer>

    <transfer name="ProductConcreteStorage">
        <property name="colorCode" type="string"/>
    </transfer>

    <transfer name="ProductView">
        <property name="colorCode" type="string"/>
    </transfer>
</transfers>
```

2. Generate transfer objects:

```bash
console transfer:generate
```




{% info_block warningBox "Verification" %}

Transfer objects have been prepared for the `colorCode` field.

{% endinfo_block %}

## Extension of Product Abstract Data Import 

Extend the product abstract writer with the color code data in the data import module. In `src/Pyz/Zed/DataImport/Business/Model/ProductAbstract/ProductAbstractWriterStep.php`, edit `ProductAbstractWriterStep` as follows:

1. Introduce the KEY_COLOR_CODE constant.

2. Extend the `importProductAbstract()` method with the color code for the product abstract entity.

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductAbstract;

use Orm\Zed\Product\Persistence\SpyProductAbstract;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductAbstractWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const KEY_COLOR_CODE = 'color_code';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return \Orm\Zed\Product\Persistence\SpyProductAbstract
     */
    protected function importProductAbstract(DataSetInterface $dataSet)
    {
        $productAbstractEntity = SpyProductAbstractQuery::create()
            ->filterBySku($dataSet[static::KEY_ABSTRACT_SKU])
            ->findOneOrCreate();

        $productAbstractEntity
            ->setColorCode($dataSet[static::KEY_COLOR_CODE])
            ->setFkTaxSet($dataSet[static::KEY_ID_TAX_SET])
            ->setAttributes(json_encode($dataSet[static::KEY_ATTRIBUTES]))
            ->setNewFrom($dataSet[static::KEY_NEW_FROM])
            ->setNewTo($dataSet[static::KEY_NEW_TO]);

        if ($productAbstractEntity->isNew() || $productAbstractEntity->isModified()) {
            $productAbstractEntity->save();
        }

        return $productAbstractEntity;
    }
}
```
 
## Demo Data Preparation

Prepare the demo data for the color code field:

1. Add the `color_code` field to the product abstract data import. The provided data below can be used as an example.

**data/import/icecat_biz_data/product_abstract.csv**

```csv
category_key,category_product_order,abstract_sku,name.en_US,name.de_DE,url.en_US,url.de_DE,is_featured,attribute_key_1,value_1,attribute_key_1.en_US,value_1.en_US,attribute_key_1.de_DE,value_1.de_DE,attribute_key_2,value_2,attribute_key_2.en_US,value_2.en_US,attribute_key_2.de_DE,value_2.de_DE,attribute_key_3,value_3,attribute_key_3.en_US,value_3.en_US,attribute_key_3.de_DE,value_3.de_DE,attribute_key_4,value_4,attribute_key_4.en_US,value_4.en_US,attribute_key_4.de_DE,value_4.de_DE,attribute_key_5,value_5,attribute_key_6,value_6,attribute_key_6.en_US,value_6.en_US,attribute_key_6.de_DE,value_6.de_DE,color_code,description.en_US,description.de_DE,icecat_pdp_url,tax_set_name,meta_title.en_US,meta_title.de_DE,meta_keywords.en_US,meta_keywords.de_DE,meta_description.en_US,meta_description.de_DE,icecat_license,new_from,new_to
digital-cameras,16,001,Canon IXUS 160,Canon IXUS 160,/en/canon-ixus-160-1,/de/canon-ixus-160-1,0,megapixel,20 MP,,,,,flash_range_tele,1.3-1.5 m,flash_range_tele,4.2-4.9 ft,,,memory_slots,1,,,,,usb_version,2,,,,,brand,Canon,,,color,Red,color,Weinrot,#DC2E09,"Lorem ipslum",2019-06-01 00:00:00,2019-06-30 00:00:00
digital-cameras,22,002,Canon IXUS 160,Canon IXUS 160,/en/canon-ixus-160-2,/de/canon-ixus-160-2,0,megapixel,20 MP,,,,,flash_range_tele,1.3-1.5 m,flash_range_tele,4.2-4.9 ft,,,memory_slots,1,,,,,usb_version,2,,,,,brand,Canon,,,color,Black,color,Schwarz,#000000,"Lorem ipslum",2019-06-01 00:00:00,2019-06-30 00:00:00
digital-cameras,34,003,Canon IXUS 160,Canon IXUS 160,/en/canon-ixus-160-3,/de/canon-ixus-160-3,0,megapixel,20 MP,,,,,flash_range_tele,1.3-1.5 m,flash_range_tele,4.2-4.9 ft,,,memory_slots,1,,,,,usb_version,2,,,,,brand,Canon,,,color,Silver,color,Silber,#D3D3D3,"Lorem ipslum",2019-06-01 00:00:00,2019-06-30 00:00:00
```

2. Import abstract products with the newly introduced `color_code` field.

```bash
console data:import:product-abstract
```
{% info_block warningBox "Verification" %}

Make sure that:

* The data is in the database.
* The data is synchronized to the storage.
* You can see the color selector on the product card of the product in the group.

{% endinfo_block %}

## Front-end Configuration 

If you want to change the product attribute used for grouping, re-define `colorAttributeName` in the `src/Pyz/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector/color-selector.twig` Twig template.

