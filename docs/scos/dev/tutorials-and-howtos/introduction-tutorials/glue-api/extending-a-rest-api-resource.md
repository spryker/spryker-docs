---
title: Extending a REST API Resource
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/extending-a-rest-request-resource
originalArticleId: 765f9daa-fe09-4e7b-9344-17dd4e65a952
redirect_from:
  - /2021080/docs/extending-a-rest-request-resource
  - /2021080/docs/en/extending-a-rest-request-resource
  - /docs/extending-a-rest-request-resource
  - /docs/en/extending-a-rest-request-resource
  - /v6/docs/extending-a-rest-request-resource
  - /v6/docs/en/extending-a-rest-request-resource
  - /v5/docs/extending-a-rest-request-resource
  - /v5/docs/en/extending-a-rest-request-resource
  - /v4/docs/extending-a-rest-request-resource
  - /v4/docs/en/extending-a-rest-request-resource
  - /v2/docs/extending-a-rest-request-resource
  - /v2/docs/en/extending-a-rest-request-resource
  - /v1/docs/extending-a-rest-request-resource
  - /v1/docs/en/extending-a-rest-request-resource
related:
  - title: Glue API Installation and Configuration
    link: docs/scos/dev/feature-integration-guides/page.version/glue-api/glue-api-installation-and-configuration.html
  - title: Glue Infrastructure
    link: docs/scos/dev/glue-api-guides/page.version/glue-infrastructure.html
---

Spryker Glue REST API comes with a set of predefined APIs out of the box. You have the possibility to extend and customize them to your own project needs. For this purpose, you need to extend the Glue API modules that provide the relevant functionality on your project level.

{% info_block infoBox %}

The following guide relies on your knowledge of the structure of a Glue REST API resource module and the behavior of its constituents. For more details, see the [Resource Modules](/docs/scos/dev/glue-api-guides/{{site.version}}/glue-infrastructure.html#resource-modules) section in **Glue Infrastructure**.

{% endinfo_block %}

## Prerequisites:
To complete this tutorial, you need to comply with the following prerequisites:

* [Install Spryker Development Machine](/docs/scos/dev/sdk/development-virtual-machine-docker-containers-and-console.html);
* [Enable Glue Rest API](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-installation-and-configuration.html);
* [Integrate Products API](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-product-feature-integration.html).

{% info_block infoBox %}

If you have a development virtual machine with the [B2C Demo Shop](/docs/scos/user/intro-to-spryker/about-spryker.html#spryker-b2bb2c-demo-shops) installed, all the required components will be available out of the box.

{% endinfo_block %}

Also, let us assume that you modified the product storage data to match your product requirements. For example, let's assume that you added the `manufacturerCountry` field to the product data not as an attribute, but as another field in the database.

{% info_block warningBox %}

For more details, see [Database schema for product attributes](/docs/scos/user/features/{{site.version}}/product-feature-overview/product-attributes-overview.html) and [Extending the Database Schema](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/extending-the-database-schema.html).

{% endinfo_block %}

Now, let us add this field to responses of the _Products API_ endpoints:

## 1. Extend Glue Transfers
First of all, we need to extend the existing Glue Transfers that describe Glue attributes. Attributes of _Products_ resources are defined in a transfer file named `products_rest_api.transfer.xml`. To extend it, do the following:

* Create file `src/Pyz/Shared/ProductsRestApi/Transfer/products_rest_api.transfer.xml` that will extend the transfer on the project level

{% info_block warningBox %}

All transfer file names end with `.transfer.xml`.

{% endinfo_block %}

* In the newly created file, define only the field(s) you want to add, in our case, `manufacturerCountry`:

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

* Run `vendor/bin/console transfer:generate` to generate the transfers.
* Check that the generated transfers contain the attribute you added:
    * `src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer.php - for abstract products`;
    * `src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer.php` - for concrete products;

{% info_block infoBox %}

You can also use a [Spryk](/docs/scos/dev/glue-api-guides/{{site.version}}/glue-spryks.html) to extend Glue transfers. Run the following command:  
```bash
console spryk:run AddSharedRestAttributesTransfer --mode=project --module=ResourcesRestApi --organization=Pyz --name=RestResourcesAttributes
```

{% endinfo_block %}

## 2. Put data
If automatic transfer-to-transfer conversion can be performed, you do not need to take extra steps to put data in the attribute you added on step 1. Automatic conversion occurs when the attribute name defined in the REST transfer matches exactly the name of the respective field in the storage transfer.

In more complicated cases, when, for example, you need to pull data from alternative storage or map data differently from what automapping does, you need to override the processor classes. Let us override the `AbstractProductsResourceMapper` class in order to add the `manufacturerCountry` attribute data. For this purpose, we need to extend, on the project level, the `ProductsRestApi` module that implements the Products API. To do this:

* Create the `src/Pyz/Glue/ProductsRestApi` directory.
* Implement `\Pyz\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapper` as follows:

AbstractProductsResourceMapper.php

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

As you can see from the code, the mapper that you implemented extends the original core mapper (located in `Spryker\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapper`) and calls the parent method in the method we override. This way, we can avoid re-defining the whole class and define only the things we want to override.

{% info_block infoBox %}

You can also use a [Spryk](/docs/scos/dev/glue-api-guides/{{site.version}}/glue-spryks.html) to put data. Run the following command:  
```bash
console spryk:run AddGlueResourceMapper --mode=project --module=ResourcesRestApi --organization=Pyz  --subDirectory=Mapper --className=Resource
```
This will create a mapper and add it to the factory on the project level. You will need to extend the mapper from the original feature.

{% endinfo_block %}

## 3. Override mapper initialization
Now, we need to override the initialization of the mapper we created on the previous step. For this purpose, we need to extend the factory of the `ProductsRestApi` module. A factory is used to create objects and processor classes of a module, thus, by overriding it, we can invoke our new mapper. To do this:

* Create the Glue factory on the project level: `\Pyz\Glue\ProductsRestApi\ProductsRestApiFactory`.
* Implement the factory as follows:

ProductsRestApiFactory.php

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

The same as the mapper, `ProductsRestApiFactory` extends the core factory and only overrides the mapper creation.

{% info_block infoBox %}

You can also use a [Spryk](/docs/scos/dev/glue-api-guides/{{site.version}}/glue-spryks.html) to override mapper initialization. Run the following command:  
```bash
console spryk:run AddGlueMapperFactoryMethod --mode=project --module=ResourcesRestApi --organization=Pyz --subDirectory=Mapper --className=Resource
```
This will add mapper initialization to the project level factory.

{% endinfo_block %}

## 4. Verify implementation
No, you can query the Products API to check whether the attribute has been added to the API response. For example, you can query information on one of the products with the `manufacturerCountry` field populated. For details, see [Retrieving abstract products](/docs/marketplace/dev/glue-api-guides/{{site.version}}/abstract-products/retrieving-abstract-products.html) and [Retrieving concrete products](/docs/marketplace/dev/glue-api-guides/{{site.version}}/concrete-products/retrieving-concrete-products.html).
