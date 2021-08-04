---
title: Discontinued Products API Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/discontinued-products-api-feature-integration-201907
redirect_from:
  - /v3/docs/discontinued-products-api-feature-integration-201907
  - /v3/docs/en/discontinued-products-api-feature-integration-201907
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | Glue Application |
| Discontinued Products | 201907.0 |  |
| Product | 201907.0 | Products API  |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/product-discontinued-rest-api:"^1.0.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following module is installed:)

| Module | Expected Directory |
| --- | --- |
| `ProductDiscontinuedRestApi` | `vendor/spryker/product-discontinued-rest-api` |
</div></section>

### 2) Set up Transfer Objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following changes have been applied in the transfer objects:)

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `ConcreteProductsRestAttributesTransfer.isDiscontinued` | property | created | `src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer ` |
| `ConcreteProductsRestAttributesTransfer.discontinuedNote` | property | created | `src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer` |
</div></section>

### 3) Set up Behavior
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductDiscontinuedConcreteProductsResourceExpanderPlugin` | Expands the `concrete-products` resource with discontinued data. | None | `Spryker\Glue\ProductDiscontinuedRestApi\Plugin` |

<details open><summary>src/Pyz/Glue/ProductsRestApi/ProductsRestApiDependencyProvider.php</summary>
    
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
}
```

</br>
</details>

{% info_block warningBox %}
Make sure that the following endpoint is available:<ul><li>*http://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}*</li></ul>
{% endinfo_block %}

{% info_block warningBox %}
Make sure that the `concrete-products` resource is expanded with the discontinued properties, for example:
{% endinfo_block %}

<details open>
<summary>JSON response example</summary>

*GET http://glue.mysprykershop.com/145_29885470*

```
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
            "self": "http://glue.mysprykershop.com/concrete-products/145_29885470"
        }
    }
}
```

</br>
</details>

<!-- Last review date: Aug 02, 2019 by Eugenia Poidenko, Yuliia Boiko -->
