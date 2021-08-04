---
title: Content Items Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/content-items-feature-integration
redirect_from:
  - /v5/docs/content-items-feature-integration
  - /v5/docs/en/content-items-feature-integration
---

## Install Feature Core
### Prerequisites
To start the feature integration, review and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/content-item:"^master" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Ensure that the following modules have been installed in `vendor/spryker`:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`Content`</td><td>`vendor/spryker/content`</td></tr><tr><td>`ContentStorage`</td><td>`vendor/spryker/content-storage`</td></tr><tr><td>`ContentGui`</td><td>`vendor/spryker/content-gui`</td></tr><tr><td>`ContentGuiExtension`</td><td>`vendor/spryker/content-gui-extension`</td></tr><tr><td>`ContentBanner`</td><td>`vendor/spryker/content-banner`</td></tr><tr><td>`ContentBannerGui`</td><td>`vendor/spryker/content-banner-gui`</td></tr><tr><td>`ContentProduct`</td><td>`vendor/spryker/content-product`</td></tr><tr><td>`ContentProductDataImport`</td><td>`vendor/spryker/content-product-data-import`</td></tr><tr><td>`ContentProductGui`</td><td>`vendor/spryker/content-product-gui`</td></tr><tr><td>`ContentProductSet`</td><td>`vendor/spryker/content-product-set`</td></tr><tr><td>`ContentProductSetDataImport`</td><td>`vendor/spryker/content-product-set-data-import`</td></tr><tr><td>`ContentProductSetGui`</td><td>`vendor/spryker/content-product-set-gui`</td></tr><tr><td>`ContentFile`</td><td>`vendor/spryker/content-file`</td></tr><tr><td>`ContentFileGui`</td><td>`vendor/spryker/content-file-gui`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Adjust the schema definition so entity changes will trigger events:

| Affected entity | Triggered Events |
| --- | --- |
| `spy_content` | `Entity.spy_content.create`</br>`Entity.spy_content.update`</br>`Entity.spy_content.delete` |

**src/Pyz/Zed/Content/Persistence/Propel/Schema/spy_content.schema.xml**
    
```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
				xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
				namespace="Orm\Zed\Content\Persistence"
				package="src.Orm.Zed.Content.Persistence">
 
		<table name="spy_content" phpName="SpyContent">
			<behavior name="event">
				<parameter name="spy_content_all" column="*"/>
            </behavior>
    </table>
    </database>
```  

**src/Pyz/Zed/ContentStorage/Persistence/Propel/Schema/spy_content_storage.schema.xml**
    
```html
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
			xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
			namespace="Orm\Zed\ContentStorage\Persistence"
			package="src.Orm.Zed.ContentStorage.Persistence">
 
		<table name="spy_content_storage" phpName="SpyContentStorage">
			<behavior name="synchronization">
				<parameter name="queue_pool" value="synchronizationPool" />
            </behavior>
    </table>
    </database>
```  

Run the following commands to apply database changes and generate changes for entities and transfers:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Ensure the following changes were applied to the database:<table><thead><tr><th>Database entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_content`</td><td>table</td><td>created</td></tr><tr><td>`spy_content_localized`</td><td>table</td><td>created</td></tr><tr><td>`spy_content_storage`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied in transfer objects, see the `src/Generated/Shared/Transfer/` folder:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`ContentTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentStorageTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentTypeContextTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentValidationResponseTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentWidgetTemplateTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentParameterMessageTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentBannerTypeTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentBannerTermTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentProductAbstractListTermTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentProductAbstractListTypeTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentProductSetTermTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentProductSetTypeTransfer`</td> <td>class</td><td>created</td></tr><tr><td>`ContentFileListTermTransfer`</td><td>class</td><td>created</td></tr><tr><td>`ContentFileListTypeTransfer`</td><td>class</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

### 3) Configure Export to Redis
Publish Content Items on Create, Edit or Delete to storage.

#### Set up Event Listeners

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ContentStorageEventSubscriber` | Registers listeners that are responsible to publish content items to storage when a related entity changes. | None | `Spryker\Zed\ContentStorage\Communication\Plugin\Event\Subscriber` |

**src/Pyz/Zed/Event/EventDependencyProvider.php**
    
```php
<?php
   
namespace Pyz\Zed\Event;
   
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ContentStorage\Communication\Plugin\Event\Subscriber\ContentStorageEventSubscriber;
   
class EventDependencyProvider extends SprykerEventDependencyProvider
{
	public function getEventSubscriberCollection()
	{
	$eventSubscriberCollection = parent::getEventSubscriberCollection();
	$eventSubscriberCollection->add(new ContentStorageEventSubscriber());
   
		return $eventSubscriberCollection;
	}
}
```

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php
 
namespace Pyz\Client\RabbitMq;
 
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
 
class RabbitMqConfig extends SprykerRabbitMqConfig
{
	/**
	* @return \ArrayObject
	*/
	protected function getQueueOptions()
	{
		$queueOptionCollection = new ArrayObject();
		$queueOptionCollection->append($this->createQueueOption(ContentStorageConfig::CONTENT_SYNC_STORAGE_QUEUE, ContentStorageConfig::CONTENT_SYNC_STORAGE_ERROR_QUEUE));
	
		return $queueOptionCollection;
	}
}
```

#### Configure Message Processors

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SynchronizationStorageQueueMessageProcessorPlugin` | Configures all Content messages to sync to storage, and mark messages as failed in the event of an error. | None | `Spryker\Zed\Synchronization\Communication\Plugin\Queue` |

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Queue;
 
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;
 
class QueueDependencyProvider extends SprykerDependencyProvider
{
	/**
	* @param \Spryker\Zed\Kernel\Container $container
	*
	* @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
	*/
	protected function getProcessorMessagePlugins(Container $container)
	{
		return [
			ContentStorageConfig::CONTENT_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
		];
	}
}
```

#### Add Event Plugins

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ContentStorageEventResourceRepositoryPlugin` | Can be executed to trigger events for all content entries from the database to publish them to the `spy_content_storage` table. | None | `Spryker\Zed\ContentStorage\Communication\Plugin\Event` |

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\EventBehavior;
 
use Spryker\Zed\ContentStorage\Communication\Plugin\Event\ContentStorageEventResourceRepositoryPlugin;
use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
 
class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
	/**
	* @return \Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface[]
	*/
	protected function getEventTriggerResourcePlugins()
	{
		return [
			new ContentStorageEventResourceRepositoryPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}
Verify if "console event:trigger --help" has content as an available resource in the list.
{% endinfo_block %}

#### Add Synchronization Plugins

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ContentStorageSynchronizationDataPlugin` | Can be executed to synchronize all content entries from the database to Redis. | None | `Spryker\Zed\ContentStorage\Communication\Plugin\Synchronization` |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Synchronization;
 
use Spryker\Zed\ContentStorage\Communication\Plugin\Synchronization\ContentStorageSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;
 
class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
	/**
	* @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
	*/
	protected function getSynchronizationDataPlugins(): array
	{
		return [
			new ContentStorageSynchronizationDataPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}
Verify if `console sync:data --help` has content as an available resource in the list.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure when content banners are exported or created, updated, deleted manually in Zed UI, they are exported (or removed
{% endinfo_block %} to Redis accordingly.<table><thead><tr><th>Storage Type</th><th>Target Entity</th><th>Example Expected Data Identifier</th></tr></thead><tbody><tr><td>Redis</td><td>Content Banner</td><td><code>content:en_us:br1</code></td></tr><tr><td>Redis</td><td>Content Abstract Product List</td><td><code>content:en_us:apl2</code></td></tr><tr class="TableStyle-PatternedRows2-Body-LightRows"><td class="TableStyle-PatternedRows2-BodyE-Regular-LightRows">Redis</td><td class="TableStyle-PatternedRows2-BodyE-Regular-LightRows">Content Product Set</td><td class="TableStyle-PatternedRows2-BodyE-Regular-LightRows"><code>content:en_us:ps-1</code></td></tr><tr class="TableStyle-PatternedRows2-Body-DarkerRows"><td class="TableStyle-PatternedRows2-BodyB-Regular-DarkerRows">Redis</td><td class="TableStyle-PatternedRows2-BodyB-Regular-DarkerRows">Content File List</td><td class="TableStyle-PatternedRows2-BodyB-Regular-DarkerRows"><code>content:en_us:0d9f4722-d076-5acc-9d8e-e9daff7cd61</code></td></tr></tbody></table>)

**Content Banner: Example Expected Data Fragment**

```json
{
	"term": "Banner",
	"parameters": {
		"title": "banner title 1",
		"subtitle": "banner sub-title 1",
		"image_url": "http:\/\/example.com\/b2c\/24699831-1991.jpg",
		"click_url": "http:\/\/www.demo-spryker.local\/en\/asus-transformer-book-t200ta-139",
		"alt_text": "banner image 1"
	}
}
```

**Content Abstract Product List: Example Expected Data Fragment**

```json
{
	"term": "Abstract Product List",
	"parameters": {
		"id_product_abstracts": [
			204,
			205
		]
	}
}
```

**Content Product Set: Example Expected Data Fragment**

```json
{
	"term": "Product Set",
	"parameters": {
		"id_product_set": 1
	}
}
```

**Content File List: Example Expected Data Fragment**

```json
{
	"term": "File List",
	"parameters": {
		"file_ids": [
			1,
			2
		]
	}
}
```

### 4) Import Data
#### Import Content Items into Zed
Prepare your data according to your requirements using our demo data:

**vendor/spryker/content-banner-data-import/data/import/content_banner.csv**

```yaml
key,name,description,title.default,title.en_US,title.de_DE,subtitle.default,subtitle.en_US,subtitle.de_DE,image_url.default,image_url.en_US,image_url.de_DE,click_url.default,click_url.en_US,click_url.de_DE,alt_text.default,alt_text.en_US,alt_text.de_DE
br1,Test Banner 1,Lorem Ipsum,banner title 1,,,banner sub-title 1,,,http://example.com/b2c/24699831-1991.jpg,,,http://www.demo-spryker.local/en/asus-transformer-book-t200ta-139,,,banner image 1,,
br2,Test Banner 2,Ipsum Ipsum,banner title 2,us banner title 2,,banner sub-title 2,us banner sub-title 2,,http://example.com/en/asus-zenpad-z170c-157,http://www.demo-spryker.local/en/asus-zenpad-z170c-157,,banner image 2,banner image 2,
br3,Test Banner 3,Lorem Lorem,banner title 3,,de banner title 3,banner sub-title 3,,banner sub-title 3de,http://example.com/en/canon-powershot-n-035,,http://www.demo-spryker.local/en/canon-powershot-n-035,banner image 3,,banner image 3
```

| Column | Is Obligatory? | Data Type | Data Explanation |
| --- | --- | --- | --- |
| key | mandatory | string (unique) | Reference used for banner updates. |
| name | mandatory | string | Content Item name. |
| description | mandatory | string | Content Item description. |
| title.default, title.en_US, title.de_DE | mandatory (at least one locale) | string | Localized banner title. |
| subtitle.default, subtitle.en_US, subtitle.de_DE | mandatory (at least one locale) | string | Localized banner subtitle. |
| image_url.default, image_url.en_US, image_url.de_DE | mandatory (at least one locale) | string | Localized banner image URL. |
| click_url.default, click_url.en_US, click_url.de_DE | mandatory (at least one locale) | string | Localized banner click URL. |
| alt_text.default, alt_text.en_US, alt_text.de_DE | mandatory (at least one locale) | string | Localized banner alternative text for an image. |

**vendor/spryker/content-product-data-import/data/import/content_product_abstract_list.csv**

```yaml
key,name,description,skus.default,skus.en_US,skus.de_DE
apl1,APL Name 1,APL Description 1,"204,205","",""
apl2,APL Name 2,APL Description 2,"191,190","","156,154"
apl3,APL Name 3,APL Description 3,"180,171","152,151",""
```

| Column | Is Obligatory? | Data Type | Data Explanation |
| --- | --- | --- | --- |
| key | mandatory | string (unique) | Reference used for banner updates. |
| name | mandatory | string | Content Item name. |
| description | mandatory | string | Content Item description. |
| skus.default, skus.en_US, skus.de_DE | mandatory (at least one locale) | string | Localized abstract product list, one or more comma separated product SKUs. |

**vendor/spryker/content-product-set-data-import/data/import/content_product_set.csv**

```yaml
key,name,description,product_set_key.default,product_set_key.en_US,product_set_key.de_DE
PS-1,PS Name 1,PS Description 1,1_hp_set,,
PS-2,PS Name 2,PS Description 2,2_sony_set,,1_hp_set
PS-3,PS Name 3,PS Description 3,3_tomtom_runner_set,2_sony_set,
```

| Column | Is Obligatory? | Data Type | Data Explanation |
| --- | --- | --- | --- |
| key | mandatory | string (unique) | Reference used for banner updates. |
| name | mandatory | string | Content Item name. |
| description | mandatory | string | Content Item description. |
| product_set_key.default,</br>product_set_key.en_US,</br> product_set_key.de_DE | mandatory (at least one locale) | string | Localized product set key. |

Register the following plugin to enable Content Items data import:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ContentBannerDataImportPlugin` | Imports content banners data into the database. | None | `Spryker\Zed\ContentBannerDataImport\Communication\Plugin` |
| `ContentProductAbstractListDataImportPlugin` | Imports content abstract product lists data into the database. | None | `Spryker\Zed\ContentProductDataImport\Communication\Plugin` |
| `ContentProductSetDataImportPlugin` | Imports content product sets data into the database. | None | `Spryker\Zed\ContentProductSetDataImport\Communication\Plugin` |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\DataImport;
 
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ContentBannerDataImport\Communication\Plugin\ContentBannerDataImportPlugin;
use Spryker\Zed\ContentProductDataImport\Communication\Plugin\ContentProductAbstractListDataImportPlugin;
use Spryker\Zed\ContentProductSetDataImport\Communication\Plugin\ContentProductSetDataImportPlugin;
 
class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	/**
	* @return array
	*/
	protected function getDataImporterPlugins(): array
	{
		return [
			new ContentBannerDataImportPlugin(),
			new ContentProductAbstractListDataImportPlugin(),
			new ContentProductSetDataImportPlugin(),
		];
	}
}
```

Run the following console command to import data:

```bash
console data:import content-banner
console data:import content-product-abstract-list
console data:import content-product-set
```

{% info_block warningBox "Verification" %}
The data imported should be added to the `spy_content` and `spy_content_localized` tables.
{% endinfo_block %}

### 5) Set up Behavior
#### Set up Additional Functionality
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ContentBannerFormPlugin` | Provides the form for editing Content Banner data in Zed UI. | None | `Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui` |
| `ContentBannerContentGuiEditorPlugin` | Adds a Banner content item to the **Content Item** button in WYSIWYG for CMS pages and CMS blocks. | None | `Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui` |
| `ProductAbstractListFormPlugin` | Provides the form for editing Content Abstract Product List data in Zed UI. | None | `Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui` |
| `ContentProductContentGuiEditorPlugin` | Adds an Abstract Product List content item to the **Content Item** button in WYSIWYG for CMS pages and CMS blocks. | None | `Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui` |
| `ProductSetFormPlugin` | Provides the form for editing Content Product Set data in Zed UI. | None | `Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui` |
| `ContentProductSetContentGuiEditorPlugin` | Adds a Product Set content item to the **Content Item** button in WYSIWYG for CMS pages and CMS blocks. | None | `Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui` |
| `FileListFormPlugin` | Provides the form for editing Content File List data in Zed UI. | None | `Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui` |
| `ContentFileListContentGuiEditorPlugin` | Adds a File List content item to the **Content Item** button in WYSIWYG for CMS pages and CMS blocks. | None | `Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui` |
| `HtmlToTwigExpressionsCmsBlockGlossaryBeforeSavePlugin` | Replaces HTML created by `TwigExpressionsToHtmlCmsBlockGlossaryAfterFindPlugin` back to twig expression. | None | `Spryker\Zed\ContentGui\Communication\Plugin\CmsBlockGui` |
| `TwigExpressionsToHtmlCmsBlockGlossaryAfterFindPlugin` | Replaces twig expressions of CMS block content with a styled UI element in the WYSIWYG editor. | All twig functions registered by `ContentGuiEditorPlugins` will be replaced. | `Spryker\Zed\ContentGui\Communication\Plugin\CmsBlockGui` |
| `HtmlToTwigExpressionsCmsGlossaryBeforeSavePlugin` | Replaces HTML created by `TwigExpressionsToHtmlCmsGlossaryAfterFindPlugin` back to twig expression. | None | `Spryker\Zed\ContentGui\Communication\Plugin\CmsGui` |
| `TwigExpressionsToHtmlCmsGlossaryAfterFindPlugin` | Replaces twig expressions of CMS page content with a styled UI element in the WYSIWYG editor. | All twig functions registered by `ContentGuiEditorPlugins` will be replaced. | `Spryker\Zed\ContentGui\Communication\Plugin\CmsGui` |

**src/Pyz/Zed/ContentGui/ContentGuiDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\ContentGui;
 
use Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui\ContentBannerContentGuiEditorPlugin;
use Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui\ContentBannerFormPlugin;
use Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui\ContentFileListContentGuiEditorPlugin;
use Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui\ContentFileListFormPlugin;
use Spryker\Zed\ContentGui\ContentGuiDependencyProvider as SprykerContentGuiDependencyProvider;
use Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui\ContentProductContentGuiEditorPlugin;
use Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui\ProductAbstractListFormPlugin;
use Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui\ContentProductSetContentGuiEditorPlugin;
use Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui\ProductSetFormPlugin;
 
class ContentGuiDependencyProvider extends SprykerContentGuiDependencyProvider
{
	/**
	* @return \Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentPluginInterface[]
	*/
	protected function getContentPlugins(): array
	{
		return [
			new ContentBannerFormPlugin(),
			new ProductAbstractListFormPlugin(),
			new ProductSetFormPlugin(),
			new FileListFormPlugin(),
		];
	}
 
	/**
	* @return \Spryker\Zed\ContentGuiExtension\Dependency\Plugin\ContentGuiEditorPluginInterface[]
	*/
	protected function getContentEditorPlugins(): array
	{
		return [
			new ContentBannerContentGuiEditorPlugin(),
			new ContentProductContentGuiEditorPlugin(),
			new ContentProductSetContentGuiEditorPlugin(),
			new ContentFileListContentGuiEditorPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}
Make sure that you can see the **Create/Edit Banner**, **Abstract Product List**, **Product Set**, and **File List** buttons in the *Content Items* section.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that on the CMS Page and CMS Block edit pages you can see a **Content Item** button with the following drop-down items **Banner**, **Abstract Product List**, **Product Set**, and **File List** in the WYSIWYG editor toolbar.
{% endinfo_block %}

**src/Pyz/Zed/CmsBlockGui/CmsBlockGuiDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\CmsBlockGui;
 
use Spryker\Zed\CmsBlockGui\CmsBlockGuiDependencyProvider as SprykerCmsBlockGuiDependencyProvider;
use Spryker\Zed\ContentGui\Communication\Plugin\CmsBlockGui\HtmlToTwigExpressionsCmsBlockGlossaryBeforeSavePlugin;
use Spryker\Zed\ContentGui\Communication\Plugin\CmsBlockGui\TwigExpressionsToHtmlCmsBlockGlossaryAfterFindPlugin;
 
class CmsBlockGuiDependencyProvider extends SprykerCmsBlockGuiDependencyProvider
{
	/**
	* @return \Spryker\Zed\CmsBlockGuiExtension\Dependency\Plugin\CmsBlockGlossaryAfterFindPluginInterface[]
	*/
	protected function getCmsBlockGlossaryAfterFindPlugins(): array
	{
		return [
			new TwigExpressionsToHtmlCmsBlockGlossaryAfterFindPlugin(),
		];
	}
 
	/**
	* @return \Spryker\Zed\CmsBlockGuiExtension\Dependency\Plugin\CmsBlockGlossaryBeforeSavePluginInterface[]
	*/
	protected function getCmsBlockGlossaryBeforeSavePlugins(): array
	{
		return [
			new HtmlToTwigExpressionsCmsBlockGlossaryBeforeSavePlugin(),
		];
	}
}
```

**src/Pyz/Zed/CmsGui/CmsGuiDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\CmsGui;
 
use Spryker\Zed\CmsGui\CmsGuiDependencyProvider as SprykerCmsGuiDependencyProvider;
use Spryker\Zed\ContentGui\Communication\Plugin\CmsGui\HtmlToTwigExpressionsCmsGlossaryBeforeSavePlugin;
use Spryker\Zed\ContentGui\Communication\Plugin\CmsGui\TwigExpressionsToHtmlCmsGlossaryAfterFindPlugin;
 
class CmsGuiDependencyProvider extends SprykerCmsGuiDependencyProvider
{
	/**
	* @return \Spryker\Zed\CmsGuiExtension\Dependency\Plugin\CmsGlossaryAfterFindPluginInterface[]
	*/
	protected function getCmsGlossaryAfterFindPlugins(): array
	{
		return [
			new TwigExpressionsToHtmlCmsGlossaryAfterFindPlugin(),
		];
	}
 
	/**
	* @return \Spryker\Zed\CmsGuiExtension\Dependency\Plugin\CmsGlossaryBeforeSavePluginInterface[]
	*/
	protected function getCmsGlossaryBeforeSavePlugins(): array
	{
		return [
			new HtmlToTwigExpressionsCmsGlossaryBeforeSavePlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}
Make sure that on the CMS Page and CMS Block edit pages you can see a new widget representing a block in the WYSIWYG editor toolbar when you add any Content Item using a **Content Item** button.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
To start the feature integration, review and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/content-item:"^master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Ensure the following modules have been installed in `vendor/spryker-shop`:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`ContentBannerWidget`</td><td>`vendor/spryker-shop/content-banner-widget`</td></tr><tr><td>`ContentProductWidget`</td><td>`vendor/spryker-shop/content-product-widget`</td></tr><tr><td>`ContentProductSetWidget`</td><td>`vendor/spryker-shop/content-product-set-widget`</td></tr><tr><td>`ContentFileWidget`</td><td>`vendor/spryker-shop/content-file-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Behavior
#### Set up Additional Functionality
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ContentBannerTwigPlugin` | Adds the `content_banner(id, template)` function to Yves and CMS blocks/page. | None | `SprykerShop\Yves\ContentBannerWidget\Plugin\Twig` |
| `ContentProductAbstractListTwigPlugin` | Adds the `content_product_abstract_list(id, template)` function to Yves and CMS blocks/page. | None | `SprykerShop\Yves\ContentProductWidget\Plugin\Twig` |
| `ContentProductSetTwigPlugin` | Adds the `content_product_set(id, template)` function to Yves and CMS blocks/page. | None | `SprykerShop\Yves\ContentProductSetWidget\Plugin\Twig` |
| `ContentFileListTwigPlugin` | Adds the `content_file_list(id, template)` function to Yves and CMS blocks/page. | None | `SprykerShop\Yves\ContentFileWidget\Plugin\Twig` |

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php
 
namespace Pyz\Yves\Twig;
 
use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\ContentBannerWidget\Plugin\Twig\ContentBannerTwigPlugin;
use SprykerShop\Yves\ContentFileWidget\Plugin\Twig\ContentFileListTwigPlugin;
use SprykerShop\Yves\ContentProductSetWidget\Plugin\Twig\ContentProductSetTwigPlugin;
use SprykerShop\Yves\ContentProductWidget\Plugin\Twig\ContentProductAbstractListTwigPlugin;
 
class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
	/**
	* @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
	*/
	protected function getTwigPlugins(): array
	{
		return [
			new ContentBannerTwigPlugin(),
			new ContentProductAbstractListTwigPlugin(),
			new ContentProductSetTwigPlugin(),
			new ContentFileListTwigPlugin()
		];
	}
}
```

{% info_block warningBox "Verification" %}
Make sure that Content Items inserted in CMS blocks or pages are displayed on Yves.
{% endinfo_block %}
