---
title: Installing the Product CMS Block
originalLink: https://documentation.spryker.com/v4/docs/product-block
redirect_from:
  - /v4/docs/product-block
  - /v4/docs/en/product-block
---

Product blocks are blocks that can be embedded in the product template, for which we can specify on which specific product we want them to be rendered.
		
To install the Product CMS Block in your project, follow the steps described in this procedure:

1. Install the CMS Block Product Connector module with composer: 

```bash
"spryker/cms-block-product-connector": "^1.0.0"
```

2. Register the form plugin by adding `CmsBlockProductFormPlugin` to the CMS Block GUI dependency provider `\Pyz\Zed\CmsBlockGui\CmsBlockGuiDependencyProvider`.

```php
<?php
namespace Pyz\Zed\CmsBlockGui;

use Spryker\Zed\CmsBlockProductConnector\Communication\Plugin\CmsBlockProductFormPlugin;

class CmsBlockGuiDependencyProvider extends CmsBlockGuiCmsBlockGuiDependencyProvider
{
    /**
    * @return array
    */
    protected function getCmsBlockFormPlugins()
    {
        return = array_merge(parent::getCmsBlockFormPlugins(), [
            new CmsBlockProductFormPlugin(),
        ]);
    }
}
```

3. Register the form handler plugin by adding  `CmsBlockProductConnectorUpdatePlugin` to the CMS Block dependency provider `Pyz\Zed\CmsBlock\CmsBlockDependencyProvider`.

```php
<?php
namespace Pyz\Zed\CmsBlock;

use Spryker\Zed\CmsBlockProductConnector\Communication\Plugin\CmsBlockProductConnectorUpdatePlugin;


class CmsBlockDependencyProvider extends CmsBlockCmsBlockDependencyProvider
{
    protected function getCmsBlockUpdatePlugins()
    {
        return array_merge(parent::getCmsBlockUpdatePlugins(), [
            new CmsBlockProductConnectorUpdatePlugin()
        ]);
    }
}
```

4. Register the collector plugin by adding  `CmsBlockProductConnectorCollectorPlugin` to the Collector dependency provider `\Pyz\Zed\Collector\CollectorDependencyProvider`.

```php
<?php
namespace Pyz\Zed\Collector;

...

class CollectorDependencyProvider extends SprykerCollectorDependencyProvider
{
    public function provideBusinessLayerDependencies(Container $container)
    {
        ...
        $container[self::STORAGE_PLUGINS] = function (Container $container) {
            return [
                ...
                CmsBlockProductConnectorConstants::RESOURCE_TYPE_CMS_BLOCK_PRODUCT_CONNECTOR => new CmsBlockProductConnectorCollectorPlugin(),
            ];
        };
    }
}
```

5. Register the product list plugin (optional). 
To show which product abstracts are assigned to a block on a block view page, add `CmsBlockProductAbstractListViewPlugin` to the CMS Block GUI dependency provider.

```php
<?php
namespace Pyz\Zed\CmsBlockGui;

...

class CmsBlockGuiDependencyProvider extends CmsBlockGuiCmsBlockGuiDependencyProvider
{
    ...

    /**
    * @return array
    */
    protected function getCmsBlockViewPlugins()
    {
       return array_merge(parent::getCmsBlockViewPlugins(), [
           new CmsBlockProductAbstractListViewPlugin(),
       ]);
    }
}
```

6. Register the block list to the product abstract view (optional).
To show which blocks are assigned to a product abstract on a product abstract view page, add `CmsBlockProductAbstractBlockListViewPlugin` to the Product Management dependency provider.

```php
<?php
namespace Pyz\Zed\ProductManagement;

...

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    protected function getProductAbstractViewPlugins()
    {
        return array_merge(parent::getProductAbstractViewPlugins(), [
            new CmsBlockProductAbstractBlockListViewPlugin()
        ]);
    }
}
```

<!--
### Usage for Demoshop

Adding a template for a new block is done in the same way as for static blocks, see [CMS Block](https://documentation.spryker.com/capabilities/cms/cms_block/cms-block.htm).

Create a new Twig template under the `src/Pyz/Yves/CmsBlock/Theme/default/template/` folder. Call it `productSale.twig` and it will contain the following structure:

```php
<!-- CMS_BLOCK_PLACEHOLDER : "saleMessage" -->
<!-- CMS_BLOCK_PLACEHOLDER : "saleInterval" -->
<!-- <blockquote>
    {% raw %}{{{% endraw %} spyCmsBlockPlaceholder('saleMessage') | raw {% raw %}}}{% endraw %}
    <footer>
        {% raw %}{{{% endraw %} spyCmsBlockPlaceholder('saleInterval') | raw {% raw %}}}{% endraw %}
    </footer>
</blockquote>
```

#### To configure the block:

1. In Zed, go to the CMS section and navigate to the blocks section.
2. Click **Create CMS Block**, to create a new block. 
3. From the template drop-down, select the new added template and name the new block.
4. Set a product or a list of products in the `ProductField` field. While typing, the product search will offer suggestions from the product list.
5. Set the block active if you need to use it straight away.
6. After clicking **Save**, similar to static blocks and pages, you'll be asked to provide the glossary keys for the placeholders that are included in the Twig template. For this part, follow the steps described for creating a static page here.
7. Embed the block in the product page by adding the following code to a product page template (e.g "detail.twig" in Spryker Demoshop):

```php
{% raw %}{%{% endraw %} if product is defined {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} spyCmsBlock({product: product.id}) {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

8. To see the page in Yves, the client data storage (Redis) must be up-to-date. This is handled through `cronjobs`.
9. To manually execute this step,  run the collectors to update the frontend data storage:

```bash
vendor/bin/console collector:storage:export
```

**Results:**
After running the collectors, you should be able to see the block only on the page to which you configured it to be shown.
-->

<!--**See also:**

* [Learn what CMS blocks are and what they are needed for](https://documentation.spryker.com/capabilities/cms/cms_block/cms-block.htm)
* [Learn how to create and use a CMS Block](https://documentation.spryker.com/administration_interface_guide/content_management/blocks.htm)
* [Learn how to migrate to a newer version of a CMS Block](https://documentation.spryker.com/module_migration_guides/mg-cms-block.htm)
* [Learn how to migrate to a newer version of a CMS Block GUI](http://documentation.spryker.com/module_migration_guides/mg-cms-block-gui.htm)-->
