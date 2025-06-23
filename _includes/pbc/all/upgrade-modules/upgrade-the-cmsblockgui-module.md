

## Upgrading from version 1.* to version 2.*

This version adds support to manage CMS Block-store relation through the dedicated CMS Block Back Office.

1. Install/update `spryker/cms-block` to at least version 2.0.0. For more information, see [Upgrade the CmsBlock module](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblock-module.html).

2. Upgrade `spryker/cms-block-gui` to at least version 2.0.0.

3. The CMS Block Back Office expects the CMS Block-store relation handling partial form to be defined in the dependency provider using the `Spryker\Zed\Kernel\Communication\Form\FormTypeInterface`. You can use the single store and multi-store compatible default implementation `Spryker\Zed\Store\Communication\Form\Type\StoreRelationToggleType` wrapped in `Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin`. Note: `Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin` is introduced in `spryker/store` version 1.2.0.

**Example injection:**

```php
<?php
namespace Pyz\Zed\CmsBlockGui;

use Spryker\Zed\CmsBlockGui\CmsBlockGuiDependencyProvider as CmsBlockGuiCmsBlockGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class CmsBlockGuiDependencyProvider extends CmsBlockGuiCmsBlockGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function createStoreRelationFormTypePlugin()
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}
```

4. The following deprecated methods have been removed:

- `CmsBlockGuiCommunicationFactory::createCmsBlockForm()`
- `CmsBlockGuiCommunicationFactory::createCmsBlockGlossaryForm()`
- `CmsBlockGuiCommunicationFactory::createCmsBlockGlossaryPlaceholderTranslationFormType()`
- `CmsBlockGuiCommunicationFactory::createCmsBlockGlossaryPlaceholderFormType()`
- `CmsBlockForm::getName()`
- `CmsBlockGlossaryForm::getName()`
- `CmsBlockGlossaryPlaceholderForm::getName()`

5. Additionally these internal classes have changed. Take a look if you have customized any of them:

- `CmsBlockForm`
- `CmsBlockTable`
- `ViewBlockController`
- `ViewBlock/index.twig`

You can find more details for these changes on the [CMS Block GUI module release page](https://github.com/spryker/cms-block-gui/releases).

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Content** > **Blocks**.
2. Next to any CMS block, select **Edit Block**. You should see the **Store relation** field with the list of available stores.

{% endinfo_block %}
