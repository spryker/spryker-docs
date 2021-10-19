---
title: Migration Guide - CmsGui
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-cmsgui
originalArticleId: f9f22223-ddf8-42d5-b483-3b1dc18788d6
redirect_from:
  - /2021080/docs/migration-guide-cmsgui
  - /2021080/docs/en/migration-guide-cmsgui
  - /docs/migration-guide-cmsgui
  - /docs/en/migration-guide-cmsgui
---

## Upgrading from Version 4.* to Version 5.*

Version 5 of the CMSGui module introduces the [multi-store functionality](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-pages-overview.html). The multi-store CMS page feature enables management of CMS page display per store via a store toggle control in the Back Office.

{% info_block errorBox %}

To enable the feature, make sure you have the store relation type plugin. See below for details.

{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Require the update with composer: `"spryker/cms-gui": "^5.0.0"`
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

_Estimated migration time: 30 minutes._
