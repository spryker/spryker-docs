---
title: Migration guide - CmsStorage
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-cmsstorage
originalArticleId: abc4e5f2-4f3c-488d-a713-aa722bea4358
redirect_from:
  - /2021080/docs/mg-cmsstorage
  - /2021080/docs/en/mg-cmsstorage
  - /docs/mg-cmsstorage
  - /docs/en/mg-cmsstorage
  - /v2/docs/mg-cmsstorage
  - /v2/docs/en/mg-cmsstorage
  - /v3/docs/mg-cmsstorage
  - /v3/docs/en/mg-cmsstorage
  - /v4/docs/mg-cmsstorage
  - /v4/docs/en/mg-cmsstorage
  - /v5/docs/mg-cmsstorage
  - /v5/docs/en/mg-cmsstorage
  - /v6/docs/mg-cmsstorage
  - /v6/docs/en/mg-cmsstorage
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-cmsstorage.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-cmsstorage.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-cmsstorage.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-cmsstorage.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-cmsstorage.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-cmsstorage.html
---

## Upgrading from Version 1.* to Version 2.*

Version 2.0.0 of the CmsStorage module introduces the [multi-store functionality](/docs/scos/user/features/{{site.version}}/cms-feature-overview/cms-pages-overview.html). The multi-store CMS page feature enables management of CMS page display per store via a store toggle control in the Back Office.

**The main BC breaking changes are:**
* Synchronization behavior
* CMS Storage Dependency Provider return annotation

**To upgrade to the new version of the module, do the following:**
1. Update `cms-storage` to `^2.0.0` with the command `composer update spryker/cms-storage": "^2.0.0`
2. Remove `queue_pool=synchronizationPool` behavior from `spy_cms_page_storage` table.

**src/Pyz/Zed/CmsStorage/Persistence/Propel/Schema/spy_cms_storage.schema.xml**

```php
<behavior name="synchronization">
	<parameter name="queue_pool" value="synchronizationPool">
</behavior>
```

{% info_block infoBox %}

When completed, the above synchronization parameter should not be in the file.

{% endinfo_block %}

3. Make changes to the CMS Storage Dependency Provider:
The return annotation for `getContentWidgetDataExpander()` has been changed. `CmsPageDataExpanderPluginInterface` was moved to `CmsExtension` module and should be referenced as such.

**src/Pyz/Zed/CmsStorage/CmsStorageDependencyProvider.php**

```php
class CmsStorageDependencyProvider extends SprykerCmsStorageDependencyProvider
{
/**
	* @return \Spryker\Zed\CmsExtension\Dependency\Plugin\CmsPageDataExpanderPluginInterface[]
	*/
	protected function getContentWidgetDataExpander()
	{
```

4. Apply the database change:
`$ console propel:install`

5. Generate the new transfers:
`$ console transfer:generate`

_Estimated migration time: 30 minutes_
