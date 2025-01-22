

## Install feature core
Follow the steps below to install the feature core.


### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Discontinued Products | {{page.version}} |
| Product Labels | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Import data

Follow the steps to import product label data:

{% info_block infoBox %}

The following imported entities will be used as a product label in Spryker OS.

{% endinfo_block %}

Prepare data according to your requirements using the following demo data:

**data/import/product_label.csv**

```yaml
name,is_active,is_dynamic,is_exclusive,front_end_reference,valid_from,valid_to,name.en_US,product_abstract_skus,priority
Discontinued,1,1,0,discontinued,,,Discontinued,Abgesetzt,,3
```

2. Run the command to import data:

```bash
console data:import product-label
```

{% info_block warningBox "Verification" %}

Ensure that the configured data has been added to the spy_product_label  table in the database.

{% endinfo_block %}

### 2) Set up behaviour

Set up the following behavior:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductDiscontinuedLabelUpdaterPlugin | Returns the list of relations of product labels to abstract products to assign or deassign product labels for. The results are used to persist product label relation changes into the database. The plugin is called by the `ProductLabelRelationUpdaterConsole` command. | None | Spryker\Zed\ProductDiscontinuedProductLabelConnector\Communication\Plugin |

**src/Pyz/Zed/ProductLabel/ProductLabelDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductLabel;

use Spryker\Zed\ProductLabel\ProductLabelDependencyProvider as SprykerProductLabelDependencyProvider;
use Spryker\Zed\ProductDiscontinuedProductLabelConnector\Communication\Plugin\ProductDiscontinuedLabelUpdaterPlugin;

class ProductLabelDependencyProvider extends SprykerProductLabelDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductLabel\Dependency\Plugin\ProductLabelRelationUpdaterPluginInterface[]
     */
    protected function getProductLabelRelationUpdaterPlugins()
    {
        return [
            new ProductDiscontinuedLabelUpdaterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that, on the Storefront, the Discontinued product label is displayed on the *Catalog* and *Product Details* pages for all the products to which it's assigned.

{% endinfo_block %}
