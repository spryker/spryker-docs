---
title: Migration Guide - CMSGui
last_updated: Nov 22, 2019
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v2/docs/mg-cms-gui
originalArticleId: c71d5d32-6fd7-42ed-9970-1fc6513121fb
redirect_from:
  - /v2/docs/mg-cms-gui
  - /v2/docs/en/mg-cms-gui
related:
  - title: Creating CMS Pages
    link: docs/scos/user/back-office-user-guides/page.version/content/pages/creating-cms-pages.html
---

## Upgrading from Version 4.* to Version 5.*

Version 5 of the CMSGui module introduces the [multi-store functionality](https://documentation.spryker.com/v2/docs/cms-pages-overview). The multi-store CMS page feature enables management of CMS page display per store via a store toggle control in the Back Office.

{% info_block errorBox %}
To enable the feature, make sure you have the store relation type plugin. See below for details.
{% endinfo_block %}

**To upgrade to the new version of the module, do the following:**

1. Require the update with composer: `"spryker/cms-gui": "^5.0.0"`
2. Add the Store Relation Form Type Plugin:

<details open>
<summary markdown='span'>src/Pyz/Zed/CmsGui/CmsGuiDependencyProvider.php</summary>

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

<br>
</details>
    
New transfers must be generated:
`$ console transfer:generate`

3. If project overrides were introduced, please observe the following changes:
* `CmsGuiCommunicationFactory::createCmsVersionForm` was deprecated, please use `CmsGuiCommunicationFactory::getCmsVersionForm`.
* `CmsGuiCommunicationFactory::createCmsGlossaryForm` was deprecated, please use `CmsGuiCommunicationFactory::getCmsGlossaryForm`.
* `CmsVersionMapper::mapToCmsVersionDataTransfer` was given return type `CmsVersionMapper::CmsVersionDataTransfer`

_Estimated migration time: 30 minutes._

<!-- Last review date: Mar 11, 2019- by Alexander Veselov, Yuliia Boiko -->
