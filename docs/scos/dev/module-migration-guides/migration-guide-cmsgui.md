---
title: Migration guide - CmsGui
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-cmsgui
originalArticleId: f9f22223-ddf8-42d5-b483-3b1dc18788d6
redirect_from:
  - /2021080/docs/migration-guide-cmsgui
  - /2021080/docs/en/migration-guide-cmsgui
  - /docs/migration-guide-cmsgui
  - /docs/en/migration-guide-cmsgui
  - /v2/docs/mg-cms-gui
  - /v2/docs/en/mg-cms-gui
  - /v3/docs/mg-cms-gui
  - /v3/docs/en/mg-cms-gui
  - /v4/docs/mg-cms-gui
  - /v4/docs/en/mg-cms-gui
  - /v5/docs/mg-cms-gui
  - /v5/docs/en/mg-cms-gui
  - /v6/docs/mg-cms-gui
  - /v6/docs/en/mg-cms-gui
  - /docs/scos/dev/module-migration-guides/migration-guide-cmsgui.html
  - /module_migration_guides/mg-cms-gui.htm
---

## Upgrading from version 4.* to version 5.*

Version 5 of the `CMSGui` module introduces the [multi-store functionality](/docs/scos/user/features/cms-feature-overview/cms-pages-overview.html). The multi-store CMS page feature enables management of CMS page display per store via a store toggle control in the Back Office.

{% info_block errorBox %}

To enable the feature, make sure you have the store relation type plugin. See below for details.

{% endinfo_block %}

_Estimated migration time: 30 minutes._

To upgrade to the new version of the module, do the following:

1. Require the update using Composer: `"spryker/cms-gui": "^5.0.0"`
2. Add the Store Relation Form Type Plugin:

**src/Pyz/Zed/CmsGui/CmsGuiDependencyProvider.php**

```php
use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class CmsGuiDependencyProvider extends SprykerCmsGuiDependencyProvider
{
	/**
	* @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
	*/
	protected function getStoreRelationFormTypePlugin(): FormTypeInterface
	{
		return new StoreRelationToggleFormTypePlugin();
	}
}
```

New transfers must be generated:

`$ console transfer:generate`

3. If project overrides were introduced, please observe the following changes:
* `CmsGuiCommunicationFactory::createCmsVersionForm` was deprecated, please use `CmsGuiCommunicationFactory::getCmsVersionForm`.
* `CmsGuiCommunicationFactory::createCmsGlossaryForm` was deprecated, please use `CmsGuiCommunicationFactory::getCmsGlossaryForm`.
* `CmsVersionMapper::mapToCmsVersionDataTransfer` was given return type `CmsVersionMapper::CmsVersionDataTransfer`
