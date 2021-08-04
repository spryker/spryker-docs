---
title: Migration Guide - CmsStorage
originalLink: https://documentation.spryker.com/v3/docs/mg-cmsstorage
redirect_from:
  - /v3/docs/mg-cmsstorage
  - /v3/docs/en/mg-cmsstorage
---

## Upgrading from Version 1.* to Version 2.*

Version 2.0.0 of the CmsStorage module introduces the [multi-store functionality](https://documentation.spryker.com/v2/docs/multi-store-cms-pages-201903). The multi-store CMS page feature enables management of CMS page display per store via a store toggle control in the Back Office.

**The main BC breaking changes are:**

* Synchronization behavior
* CMS Storage Dependency Provider return annotation

**To upgrade to the new version of the module, do the following:**
1. Update `cms-storage` to `^2.0.0` with the command `composer update spryker/cms-storage": "^2.0.0`
2. Remove `queue_pool=synchronizationPool` behavior from `spy_cms_page_storage` table.

<details open>
<summary>src/Pyz/Zed/CmsStorage/Persistence/Propel/Schema/spy_cms_storage.schema.xml</summary>
    
```php
<behavior name="synchronization">
	<parameter name="queue_pool" value="synchronizationPool">
</behavior>
```
    
</br>
</details>
    
{% info_block infoBox %}
When completed, the above synchronization parameter should not be in the file.
{% endinfo_block %}

3. Make changes to the CMS Storage Dependency Provider:
The return annotation for `getContentWidgetDataExpander()` has been changed. `CmsPageDataExpanderPluginInterface` was moved to `CmsExtension` module and should be referenced as such.

<details open>
<summary>src/Pyz/Zed/CmsStorage/CmsStorageDependencyProvider.php</summary>

```php
class CmsStorageDependencyProvider extends SprykerCmsStorageDependencyProvider
{
/**
	* @return \Spryker\Zed\CmsExtension\Dependency\Plugin\CmsPageDataExpanderPluginInterface[]
	*/
	protected function getContentWidgetDataExpander()
	{
```

</br>
</details>
    
4. Apply the database change:
`$ console propel:install`

5. Generate the new transfers:
`$ console transfer:generate`

_Estimated migration time: 30 minutes_

<!-- Last review date: Mar 12, 2019-- by Alexander Veselov, Yuliia Boiko -->
