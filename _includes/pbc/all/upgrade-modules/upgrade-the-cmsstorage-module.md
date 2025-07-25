

## Upgrading from version 1.* to version 2.*

Version 2.0.0 of the `CmsStorage` module introduces the [multi-store functionality](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/cms-feature-overview/cms-pages-overview.html). The multi-store CMS page feature enables management of CMS page display per store via a store toggle control in the Back Office.

The main BC breaking changes are:

- Synchronization behavior
- CMS Storage Dependency Provider return annotation

*Estimated migration time: 30 minutes*

To upgrade to the new version of the module, do the following:

1. Update `cms-storage` to `^2.0.0` with the command:

```bash
composer update spryker/cms-storage": "^2.0.0
```

2. Remove `queue_pool=synchronizationPool` behavior from `spy_cms_page_storage` table.

**src/Pyz/Zed/CmsStorage/Persistence/Propel/Schema/spy_cms_storage.schema.xml**

```xml
<behavior name="synchronization">
	<parameter name="queue_pool" value="synchronizationPool">
</behavior>
```

{% info_block infoBox %}

When completed, the above synchronization parameter should not be in the file.

{% endinfo_block %}

3. Make changes to the CMS Storage Dependency Provider:
The return annotation for `getContentWidgetDataExpander()` has been changed.`CmsPageDataExpanderPluginInterface` was moved to `CmsExtension` module and should be referenced as such.

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

```bash
console propel:install
```

5. Generate the new transfers:

```bash
console transfer:generate
```
