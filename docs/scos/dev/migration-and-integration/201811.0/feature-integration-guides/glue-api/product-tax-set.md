---
title: Product Tax Sets API Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/product-tax-sets-api-feature-integration
redirect_from:
  - /v1/docs/product-tax-sets-api-feature-integration
  - /v1/docs/en/product-tax-sets-api-feature-integration
---

## Install Feature API

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 2018.12.0 |
| Product Management | 2018.12.0 |
| Tax | 2018.12.0 |
| ProductsRestApi | 2.2.3 |

## 1) Install the Required Modules Using Composer

Run the following commands to install the required modules:

```bash
composer require spryker/product-tax-sets-rest-api:"^1.0.6" --update-with-dependencies
composer require spryker/products-product-tax-sets-resource-relationship:"^1.0.0" --update-with-dependencies 
```

{% info_block warningBox %}
Make sure that the following modules have been installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
|  `ProductTaxSetsRestApi` |  `vendor/spryker/product-tax-sets-rest-api` |
|  `ProductsProductTaxSetsResourceRelationship` |  `vendor/spryker/products-product-tax-sets-resource-relationship` |


## 2) Set up Database Schema and Transfer Objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate 
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following changes are present by checking your database:

| Database entity | Type | Event |
| --- | --- | --- |
|  `spy_tax_set.uuid` | column | added |
</div></section>

<section contenteditable="false" class="warningBox"><div class="content">Make sure that the following changes are present in the transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
|  `RestProductTaxRateTransfer` | class | created |  `src/Generated/Shared/Transfer/RestProductTaxRateTransfer` |
|  `RestProductTaxSetsAttributesTransfer` | class | created |  `src/Generated/Shared/Transfer/RestProductTaxSetsAttributesTransfer` |
|  `TaxSetTransfer.uuid` | property | added |  `src/Generated/Shared/Transfer/TaxSetTransfer` |
</div></section>

## 3) Set up Behavior

### Generate UUIDs for the existing `spy_tax_set records` without UUID:

Run the following command:

```bash
console tax-sets:uuid:update 
```

 <section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the UUID field is filled out for all the records in the `spy_tax_set` table. You can run the following SQL query to make sure the result equals to 0 records:

```sql
select count(*) from spy_tax_set where uuid is NULL; 
```
</div></section>

### Enable resource and relationship

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `ProductTaxSetsResourceRoutePlugin` | Registers the product tax resource. | None |  `Spryker\Glue\ProductTaxSetsRestApi\Plugin` |
|  `ProductsProductTaxSetsResourceRelationshipPlugin` | Adds the product tax sets resource as a relationship to an abstract product resource. | None |  `Spryker\Glue\ProductsProductTaxSetsResourceRelationship\Plugin` |

<details open>
  <summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
 ```php
 <?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductTaxSetsRestApi\Plugin\ProductTaxSetsResourceRoutePlugin;
use Spryker\Glue\ProductsProductTaxSetsResourceRelationship\Plugin\ProductsProductTaxSetsResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductTaxSetsResourceRoutePlugin(),
        ];
    }
 
    /**
    * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    *
    * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
    */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new ProductsProductTaxSetsResourceRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

</br>
</details>


 {% info_block warningBox %}
Make sure that the following endpoint is available: `http://example.org//abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/product-tax-sets `
{% endinfo_block %}

{% info_block warningBox %}
Send a request to `http://example.org//abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=product-tax-sets`. Make sure that the response includes relationships to the `product-tax-sets` resources.
{% endinfo_block %}

<!-- Last review date: Feb 21, 2019 -->

<!--by Tihran Voitov and Dmitry Beirak-->
