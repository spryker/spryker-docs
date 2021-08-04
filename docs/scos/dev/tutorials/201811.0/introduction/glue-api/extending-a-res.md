---
title: Extending a REST API Resource
originalLink: https://documentation.spryker.com/v1/docs/extending-a-rest-request-resource
redirect_from:
  - /v1/docs/extending-a-rest-request-resource
  - /v1/docs/en/extending-a-rest-request-resource
---

Spryker Glue REST API comes with a set of predefined APIs out of the box. You have the possibility to extend and customize them to your own project needs. For this purpose, you need to extend the Glue API modules that provide the relevant functionality on your project level.

{% info_block infoBox "Before You Begin" %}
The following guide relies on your knowledge of the structure of a Glue REST API resource module and the behavior of its constituents. For more details, see the [Resource Modules](https://documentation.spryker.com/v1/docs/glue-infrastructure#resource-modules
{% endinfo_block %} section in **Glue Infrastructure**.)

## Prerequisites:
To complete this tutorial, you need to comply with the following prerequisites:

* [Install Spryker Development Machine](/docs/scos/dev/features/201811.0/sdk/devvm); 
* [Enable Glue Rest API](/docs/scos/dev/migration-and-integration/201811.0/feature-integration-guides/glue-api/glue-api-instal); 
* [Integrate Products API](https://documentation.spryker.com/v1/docs/product-api-feature-integration).

{% info_block infoBox %}
If you have a development virtual machine with the [B2C Demo Shop](/docs/scos/dev/about-spryker/201811.0/demoshops
{% endinfo_block %} installed, all the required components will be available out of the box.)

Also, let us assume that you modified the product storage data to match your product requirements. For example, let's assume that you added the `manufacturerCountry` field to the product data not as an attribute, but as another field in the database.

{% info_block warningBox %}
For more details, see [Product Attributes](https://documentation.spryker.com/v1/docs/db-schema-catalog#product-attributes
{% endinfo_block %} and [Extending the Database Schema](/docs/scos/dev/developer-guides/201811.0/development-guide/back-end/data-manipulation/data-ingestion/structural-preparations/t-extend-db-sch).)

Now, let us add this field to responses of the _Products API_ endpoints:

## 1. Extend Glue Transfers
First of all, we need to extend the existing Glue Transfers that describe Glue attributes. Attributes of _Products_ resources are defined in a transfer file named `products_rest_api.transfer.xml`. To extend it, do the following:

* Create file `src/Pyz/Shared/ProductsRestApi/Transfer/products_rest_api.transfer.xml` that will extend the transfer on the project level

{% info_block warningBox %}
All transfer file names end with `.transfer.xml`.
{% endinfo_block %}

* In the newly created file, define only the field(s) you want to add, in our case, `manufacturerCountry`:

<details open>
<summary>Code sample</summary>
    
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
    
</br>
</details>

* Run `vendor/bin/console transfer:generate` to generate the transfers.
* Check that the generated transfers contain the attribute you added:
    * `src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer.php - for abstract products`;
    * `src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer.php` - for concrete products;

## 2. Put data
If automatic transfer-to-transfer conversion can be performed, you do not need to take extra steps to put data in the attribute you added on step 1. Automatic conversion occurs when the attribute name defined in the REST transfer matches exactly the name of the respective field in the storage transfer.

In more complicated cases, when, for example, you need to pull data from alternative storage or map data differently from what automapping does, you need to override the processor classes. Let us override the `AbstractProductsResourceMapper` class in order to add the `manufacturerCountry` attribute data. For this purpose, we need to extend, on the project level, the `ProductsRestApi` module that implements the Products API. To do this:

* Create the `src/Pyz/Glue/ProductsRestApi` directory.
* Implement `\Pyz\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapper` as follows:

<details open>
<summary>AbstractProductsResourceMapper.php</summary>
    
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

</br>
</details>

As you can see from the code, the mapper that you implemented extends the original core mapper (located in `Spryker\Glue\ProductsRestApi\Processor\Mapper\AbstractProductsResourceMapper`) and calls the parent method in the method we override. This way, we can avoid re-defining the whole class and define only the things we want to override.

## 3. Override mapper initialization
Now, we need to override the initialization of the mapper we created on the previous step. For this purpose, we need to extend the factory of the `ProductsRestApi`module. A factory is used to create objects and processor classes of a module, thus, by overriding it, we can invoke our new mapper. To do this:

* Create the Glue factory on the project level: `\Pyz\Glue\ProductsRestApi\ProductsRestApiFactory`.
* Implement the factory as follows:

<details open>
<summary>ProductsRestApiFactory.php</summary>

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

</br>
</details>

The same as the mapper, `ProductsRestApiFactory` extends the core factory and only overrides the mapper creation.

## 4. Verify implementation
No, you can query the Products API to check whether the attribute has been added to the API response. For example, you can query information on one of the products with the `manufacturerCountry` field populated. For details, see [Retrieving Product Information](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/managing-products/retrieving-prod).
