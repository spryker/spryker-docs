---
title: CMS Feature Integration Guide
originalLink: https://documentation.spryker.com/v2/docs/cms-feature-integration-guide-201903
redirect_from:
  - /v2/docs/cms-feature-integration-guide-201903
  - /v2/docs/en/cms-feature-integration-guide-201903
---

{% info_block errorBox %}
The current Feature Integration guide only adds the **CMS Multi-store** functionality to your project. Before following the steps described below, make sure that you have the basic feature configured in your project.
{% endinfo_block %}
## Install Feature Core
### Prerequisites
To start feature integration, overview, and install the necessary features:

| Name | Version |
| --- | --- |
| CMS | 201903.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```
composer require spryker-feature/cms:"^201903.0" --update-with-dependencies
```

### 2) Set up Database Schema and Transfer Objects

Adjust the schema definition so that entity changes can trigger events.

| Affected entity | Triggered events |
| --- | --- |
| `spy_cms_page_store` | <ul><li>`Entity.spy_cms_page_store.create`</li><li>`Entity.spy_cms_page_store.update`</li><li>`Entity.spy_cms_page_store.delete`</li></ul> |

<details open>
<summary>src/Pyz/Zed/Cms/Persistence/Propel/Schema/spy_cms.schema.xml</summary>

```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Cms\Persistence" package="src.Orm.Zed.Cms.Persistence">
 
	<table name="spy_cms_page_store">
		<behavior name="event">
			<parameter name="spy_cms_page_store_all" column="*"/>
		</behavior>
	</table>
 
</database>
```
<br>
</details>

Run the following commands to apply database changes and generate entity and transfer changes:
```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes were applied by checking your database:<table><thead><tr><th>Database entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_cms_page_store`</td><td>Table</td><td>Created</td></tr></tbody></table>
{% endinfo_block %}


{% info_block warningBox "Verification" %}
Make sure that the following changes were applied by checking your generated transfers:<table><thead><tr><th>Transfer</th><th>Event</th></tr></thead><tbody><tr><td>`StoreRelationTransfer`</td><td>Created</td></tr><tr><td>`StoreTransfer`</td><td>Created</td></tr><tr><td>`LocaleCmsPageData`</td><td>Created</td></tr></tbody></table>
{% endinfo_block %}

### 3) Import data

Add CMS Page plugins in the correct order.

|Plugin  | Specification | Prerequisite |  Namespace|
| --- | --- | --- | --- |
| `CmsPageStoreDataImportPlugin` |Associates a page with different stores.  |<ul><li>`CmsPageStoreDataImportPlugin` must load after `CmsPageDataImport`</li><li>Navigation Import (if installed) must load after all CMS Page data importers.</li></ul>  | `\Spryker\Zed\CmsPageDataImport\Communication\Plugin` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\CmsPageDataImport\Communication\Plugin\CmsPageStoreDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	/**
	* @return array
	*/
	protected function getDataImporterPlugins(): array
	{
		return [
			new CmsPageStoreDataImportPlugin(),
		];
	}
}
```
<br>
</details>

Load CMS Page Multi-store Settings.

```yaml
page_key,store_name
page_1,DE
page_1,AT
page_1,US
page_2,DE
page_2,AT
```

####CSV Description

| Column |Is Mandatory?  | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| `page_key` | Yes | String | `imprint_page` | CMS Page `page_key`. |
| `store_name` | Yes | String | `DE` | Country Code for the store this page will be displayed for. |

{% info_block warningBox "Verification" %}
Verify installation by using data importers with the pages that are loaded into multiple stores.</br>`console data:import cms-page-store`</br>You should see store settings for pages in Zed are configured as specified in your CSV files.
{% endinfo_block %}

### 4) Set up Behavior

Add the following plugins:

| Plugin | Specification | Prerequisite | Namespace |
| --- | --- | --- | --- |
| `StoreRelationToggleFormTypePlugin` | Enables a list of toggleable stores. | None | `Spryker\Zed\Store\Communication\Plugin\Form` |

<details open>
<summary>src/Pyz/Zed/CmsGui/CmsGuiDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\CmsGui;
 
use Spryker\Zed\CmsGui\CmsGuiDependencyProvider as SprykerCmsGuiDependencyProvider;
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

{% info_block warningBox "Verification" %}
Editing CMS pages in Zed should show a toggle for all available stores.</br>Once you have finished the full integration of the feature, make sure that CMS Pages will only be available in their specific stores in Yves.
{% endinfo_block %}

