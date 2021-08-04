---
title: Discontinued Products API Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/discontinued-products-api-feature-integration-201903
redirect_from:
  - /v2/docs/discontinued-products-api-feature-integration-201903
  - /v2/docs/en/discontinued-products-api-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

|Name  |  Version|
| --- | --- |
| Spryker Core | 201903.0 |
| Discontinued Products | 201903.0 |
| ProductsRestApi | 2.3.0 |

## 1) Install the Required Modules Using Composer

Run the following command to install the required modules:
`composer require spryker/product-discontinued-rest-api:"^1.0.0" --update-with-dependencies`

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following module is installed:)

|Module  |  Expected Directory|
| --- | --- |
|`ProductDiscontinuedRestApi`  |`vendor/spryker/product-discontinued-rest-api`  |
</div></section>

## 2) Set up Transfer Objects

Run the following command to generate transfer changes:
`console transfer:generate`

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following changes are present in the transfer objects:)

|Transfer  |Type  | Event | Path |
| --- | --- | --- | --- |
| `ConcreteProductsRestAttributesTransfer.isDiscontinued` |property  | created | `src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer` |
|`ConcreteProductsRestAttributesTransfer.discontinuedNote`|property|created|`src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer`|
</div></section>

## 3) Set up Behavior
**Implementation**
Activate the following plugins:

|  Plugin| Specification |Prerequisites  |Namespace  |
| --- | --- | --- | --- |
| `ProductDiscontinuedConcreteProductsResourceExpanderPlugin` | Expands the concrete-products resource with discontinued data. | None | `Spryker\Glue\ProductDiscontinuedRestApi\Plugin` |

**`src/Pyz/Glue/ProductsRestApi/ProductsRestApiDependencyProvider.php`**
```php
<?php
 
namespace Pyz\Glue\ProductsRestApi;
 
use Spryker\Glue\ProductDiscontinuedRestApi\Plugin\ProductDiscontinuedConcreteProductsResourceExpanderPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiDependencyProvider as SprykerProductsRestApiDependencyProvider;
 
class ProductsRestApiDependencyProvider extends SprykerProductsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\ConcreteProductsResourceExpanderPluginInterface[]
     */
    protected function getConcreteProductsResourceExpanderPlugins(): array
    {
        return [
            new ProductDiscontinuedConcreteProductsResourceExpanderPlugin(),
        ];
    }
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the `concrete-products` resource is expanded with the discontinued properties, for example:)

    **`JSON response example`**
```js
GET http://example.org/concrete-products/145_29885470
{
    "data": {
        "type": "concrete-products",
        "id": "145_29885470",
        "attributes": {
            "sku": "145_29885470",
            "isDiscontinued": true,
            "discontinuedNote": "Was replaced  by Acer Aspire S7",
            "name": "DELL Chromebook 13",
            "description": "The industry’s finest Sleek. Smooth. Strong: The carbon fiber finish with magnesium alloy is light, durable, cool to the touch and designed to impress. The Google ecosystem at your service: Expect Speed - boots in seconds, Simplicity - easy to use and manage, Secure - with virus protection built-in, encrypted user data and automated updates. A wide range of magnificence: Bring business projects to full light with industry leading brightness and viewing angles on a 13.3\" FHD IPS display with optional scratch-resistant Corning® Gorilla® Glass NBT™ touch display. Business class performance - Browse faster using up to core i5 5th gen intel Core processors and experience the performance of Dell's most powerful chromebook. Professional looks and productivity: Thoughtfully designed to be sleek and useful with a carbon fiber lid, dark gray alloy chassis, backlit keyboard, glass track pad and 1080p display. Work on the go: Securely and easily access servers, mirror desktops and improve lifecycle management with Dell unique IP from KACE, SonicWALL (VPN) and Wyse.",
            "attributes": {
                "form_factor": "clamshell",
                "processor_cores": "2",
                "processor_threads": "2",
                "brand": "DELL",
                "color": "Grey",
                "processor_frequency": "2 GHz"
            },
            "superAttributesDefinition": [
                "form_factor",
                "color",
                "processor_frequency"
            ],
            "metaTitle": "DELL Chromebook 13",
            "metaKeywords": "DELL,Entertainment Electronics",
            "metaDescription": "The industry’s finest Sleek. Smooth. Strong: The carbon fiber finish with magnesium alloy is light, durable, cool to the touch and designed to impress. The",
            "attributeNames": {
                "form_factor": "Form factor",
                "processor_cores": "Processor cores",
                "processor_threads": "Processor Threads",
                "brand": "Brand",
                "color": "Color",
                "processor_frequency": "Processor frequency"
            }
        },
        "links": {
            "self": "http://glue.de.suite.local/concrete-products/145_29885470"
        }
    }
}
```
</div></section>

* * *

<!--See also:**
Retrieving Alternative Products
-->
<!-- Last review date: Mar 14, 2019 -->
