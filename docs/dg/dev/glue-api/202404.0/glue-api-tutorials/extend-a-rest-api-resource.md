---
title: Extend a REST API resource
description: This tutorial shows how to extend REST API resources
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/extending-a-rest-request-resource
originalArticleId: 765f9daa-fe09-4e7b-9344-17dd4e65a952
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/glue-api-tutorials/extend-a-rest-api-resource.html
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/glue-api/extending-a-rest-api-resource.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-api-tutorials/extend-a-rest-api-resource.html
related:
  - title: Glue API installation and configuration
    link: docs/pbc/all/miscellaneous/page.version/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html
  - title: Glue infrastructure
    link: docs/dg/dev/glue-api/page.version/rest-api/glue-infrastructure.html
---

Spryker Glue REST API comes with a set of predefined APIs out of the box. You can extend and customize them to your own project needs by extending the Glue API modules that provide the relevant functionality on your project level.

{% info_block infoBox %}

The following guide relies on your knowledge of the structure of the Glue REST API resource module and the behavior of its constituents. For more details, see the [Resource modules](/docs/dg/dev/glue-api/{{page.version}}/rest-api/glue-infrastructure.html#resource-modules) section in *Glue Infrastructure*.

{% endinfo_block %}

## Prerequisites

* [Install Spryker Development Machine](/docs/scos/dev/sdk/development-virtual-machine-docker-containers-and-console.html).
* [Enable Glue Rest API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html).
* [Integrate Products API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html).

{% info_block infoBox %}

If you have a development virtual machine with the [B2C Demo Shop](/docs/about/all/about-spryker.html#demo-shops) installed, all the required components are available out of the box.

Assume that you modify the product storage data to match your product requirements—for example, you add the `manufacturerCountry` field to the product data not as an attribute but as another field in the database.

For more details, see [Database schema for product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html#database-schema-for-product-attributes) and [Extend the database schema](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/extend-the-database-schema.html).

{% endinfo_block %}

Now, add this field to responses of the Products API endpoints:

## 1. Extend Glue transfers

Extend the existing Glue Transfers that describe Glue attributes. Attributes of the `products` resources are defined in the transfer file `products_rest_api.transfer.xml`. To extend it, do the following:

1. Create file `src/Pyz/Shared/ProductsRestApi/Transfer/products_rest_api.transfer.xml` that extends the transfer on the project level.

{% info_block warningBox %}

All transfer file names end with `.transfer.xml`.

{% endinfo_block %}

2. In the newly created file, define only fields you want to add—in your case, it's `manufacturerCountry`:

**Code sample**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="AbstractProductsRestAttributes">
        <property name="manufacturerCountry" type="string"/>
    </transfer>

    <transfer name="ConcreteProductsRestAttributes">
        <property name="manufacturerCountry" type="string"/>
    </transfer>

    </transfers>
```

3. Generate transfers:
```bash
vendor/bin/console transfer:generate
```

4. Check that generated transfers contain the attribute you have added:
  * `src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer.php`—for abstract products.
  * `src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer.php`—for concrete products.

## 2. Put data

If automatic transfer-to-transfer conversion can be performed, you do not need to take extra steps to put data in the attribute you have added in step 1.
Automatic conversion occurs when the attribute name defined in the REST transfer matches exactly the name of the respective field in the storage transfer.

In more complicated cases, to pull data from alternative storage or map data differently from what auto-mapping does, you need to override the processor classes.
To add the `manufacturerCountry` attribute data, override the `AbstractProductsResourceMapper` class by extending the `ProductsRestApi` module, which implements the Products API:

1. Create the `src/Pyz/Glue/ProductsRestApi` directory.
2. Implement `\Pyz\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapper` as follows:

**AbstractProductsResourceMapper.php**

```php
<?php

namespace Pyz\Glue\ProductsRestApi\Processor\Mapper;

use Generated\Shared\Transfer\AbstractProductsRestAttributesTransfer;
use Spryker\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapper as SprykerAbstractProductsResourceMapper;

class AbstractProductsResourceMapper extends SprykerAbstractProductsResourceMapper
{
    /**
     * @param array $abstractProductData
     *
     * @return \Generated\Shared\Transfer\AbstractProductsRestAttributesTransfer
     */
    public function mapAbstractProductsDataToAbstractProductsRestAttributes(array $abstractProductData): AbstractProductsRestAttributesTransfer
    {
        $restAbstractProductsAttributesTransfer = parent::mapAbstractProductsDataToAbstractProductsRestAttributes($abstractProductData);

        $restAbstractProductsAttributesTransfer->setManufacturerCountry('Portugal');

        return $restAbstractProductsAttributesTransfer;
    }
}
```

The implemented mapper extends the original core mapper located in `Spryker\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapper` and calls the parent method in the method you override. This lets you avoid redefining the whole class and lets you define only the things you want to override.

## 3. Override mapper initialization

Override the initialization of the mapper created in the previous step by extending the factory of the `ProductsRestApi` module. A factory is used to create objects and processor classes of a module. Thus, by overriding it, you can invoke your new mapper. To do this, follow these steps:

1. Create the Glue factory on the project level: `\Pyz\Glue\ProductsRestApi\ProductsRestApiFactory`.
2. Implement the factory as follows:

**ProductsRestApiFactory.php**

```php
<?php

namespace Pyz\Glue\ProductsRestApi;

use Pyz\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapper;
use Spryker\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapperInterface;
use Spryker\Glue\ProductsRestApi\ProductsRestApiFactory as SprykerProductsRestApiFactory;

class ProductsRestApiFactory extends SprykerProductsRestApiFactory
{
    /**
     * @return \Spryker\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapperInterface
     */
    public function createAbstractProductsResourceMapper(): AbstractProductsResourceMapperInterface
    {
        return new AbstractProductsResourceMapper();
    }
}
```

Like the mapper, `ProductsRestApiFactory` extends the core factory and only overrides the mapper creation.

## 4. Verify implementation

You can query the Products API to check whether the attribute has been added to the API response. For example, you can query information on one of the products with the `manufacturerCountry` field populated. For details, see [Retrieving abstract products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-abstract-products.html) and [Glue API: Retrieving concrete products](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html).
