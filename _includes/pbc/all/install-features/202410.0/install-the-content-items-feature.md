

This document describes how. to integrate the [Content Items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the Content Items feature core.

### Prerequisites

To start the feature integration, review and install the necessary features:

| NAME         | VERSION |
| ----------- | ------ |
| Spryker Core | {{page.version}}  |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/content-item:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed in `vendor/spryker`:

| MODULE                      | EXPECTED DIRECTORY                             |
| -------------------------- | --------------------------------------------- |
| Content                     | vendor/spryker/content                         |
| ContentStorage              | vendor/spryker/content-storage                 |
| ContentGui                  | vendor/spryker/content-gui                     |
| ContentGuiExtension         | vendor/spryker/content-gui-extension           |
| ContentBanner               | vendor/spryker/content-banner                  |
| ContentBannerGui            | vendor/spryker/content-banner-gui              |
| ContentProduct              | vendor/spryker/content-product                 |
| ContentProductDataImport    | vendor/spryker/content-product-data-import     |
| ContentProductGui           | vendor/spryker/content-product-gui             |
| ContentProductSet           | vendor/spryker/content-product-set             |
| ContentProductSetDataImport | vendor/spryker/content-product-set-data-import |
| ContentProductSetGui        | vendor/spryker/content-product-set-gui         |
| ContentFile                 | vendor/spryker/content-file                    |
| ContentFileGui              | vendor/spryker/content-file-gui                |

{% endinfo_block %}



### 2) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events:

| AFFECTED ENTITY | TRIGGERED EVENTS                                             |
| -------------- | ----------------------------------------------------------- |
| spy_content     | Entity.spy_content.create<br>Entity.spy_content.update<br> Entity.spy_content.delete<br> |


**src/Pyz/Zed/Content/Persistence/Propel/Schema/spy_content.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:noNAMESPACESchemaLocation="http://static.spryker.com/schema-01.xsd"
          NAMESPACE="Orm\Zed\Content\Persistence"
          package="src.Orm.Zed.Content.Persistence">

    <table name="spy_content" phpName="SpyContent">
        <behavior name="event">
            <parameter name="spy_content_all" column="*"/>
        </behavior>
    </table>
</database>
```

**src/Pyz/Zed/ContentStorage/Persistence/Propel/Schema/spy_content_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:noNAMESPACESchemaLocation="http://static.spryker.com/schema-01.xsd"
          NAMESPACE="Orm\Zed\ContentStorage\Persistence"
          package="src.Orm.Zed.ContentStorage.Persistence">

    <table name="spy_content_storage" phpName="SpyContentStorage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool" />
        </behavior>
    </table>
</database>
```

2. Apply database changes and generate changes for entities and transfers:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following changes have been applied to the database:

| DATABASE ENTITY       | TYPE  | EVENT   |
| -------------------- | ---- | ----- |
| spy_content           | table | created |
| spy_content_localized | table | created |
| spy_content_storage   | table | created |

{% endinfo_block %}


{% info_block warningBox "Verification" %}


Make sure that the following changes have been applied in transfer objects by checking `src/Generated/Shared/Transfer/`:

| TRANSFER                               | TYPE  | EVENT   |
| ------------------------------------- | ---- | ----- |
| ContentTransfer                        | class | created |
| ContentStorageTransfer                 | class | created |
| ContentTypeContextTransfer             | class | created |
| ContentValidationResponseTransfer      | class | created |
| ContentWidgetTemplateTransfer          | class | created |
| ContentParameterMessageTransfer        | class | created |
| ContentBannerTypeTransfer              | class | created |
| ContentBannerTermTransfer              | class | created |
| ContentProductAbstractListTermTransfer | class | created |
| ContentProductAbstractListTypeTransfer | class | created |
| ContentProductSetTermTransfer          | class | created |
| ContentProductSetTypeTransfer          | class | created |
| ContentFileListTermTransfer            | class | created |
| ContentFileListTypeTransfer            | class | created |

{% endinfo_block %}

### 3) Configure export to Redis

The following plugins are responsible for publishing the content item to storage.

#### Set up event listeners

Set up the following plugin

| PLUGIN | SPECIFICATION  | PREREQUISITES | NAMESPACE  |
| -------------- | --------------- | ---------- | ------------------- |
| ContentStorageEventSubscriber | Registers the listeners that publish content items to the storage when a related entity changes. |               | Spryker\Zed\ContentStorage\Communication\Plugin\Event\Subscriber |


**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

NAMESPACE Pyz\Zed\Event;

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

NAMESPACE Pyz\Client\RabbitMq;

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

#### Configure message processors

Set up the following plugin:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE   |
| ---------------- | ------------------- | ----------- | ---------------- |
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all content messages to sync to the storage. If an error is returned, marks the messages as failed. |               | Spryker\Zed\Synchronization\Communication\Plugin\Queue |


**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

NAMESPACE Pyz\Zed\Queue;

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

#### Add event plugins

Set up the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| -------------- | -------------- | ----------- | -------- |
| ContentStorageEventResourceRepositoryPlugin | Triggers events for all the content entries from the database to be published to the `spy_content_storage` table. |               | Spryker\Zed\ContentStorage\Communication\Plugin\Event |


**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

NAMESPACE Pyz\Zed\EventBehavior;

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

1. Run `console event:trigger --help`
2. Make sure that `content` is returned as an available resource.

{% endinfo_block %}

#### Add synchronization plugins

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE   |
| ---------------- | ------------------- | ---------- | -------------------- |
| ContentStorageSynchronizationDataPlugin | Syncs all the content entries from the database to Redis. |               | Spryker\Zed\ContentStorage\Communication\Plugin\Synchronization |


**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

NAMESPACE Pyz\Zed\Synchronization;

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


1. Run `console sync:data --help`.
2. Make sure that `content` is returned as an available resource.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Make sure that, when content banners are exported or created, updated, deleted in the Back Office, they are exported or removed from Redis accordingly.

| STORAG TYPE | TARGET ENTITY    | EXAMPLE EXPECTED DATA IDENTIFIER        |
| ---------- | ---------------------------- | ---------------------------------------------- |
| Redis       | Content Banner                | content:en_us:br1                                 |
| Redis       | Content Abstract Product List | content:en_us:apl2                                |
| Redis       | Content Product Set           | content:en_us:ps-1                                |
| Redis       | Content File List             | content:en_us:0d9f4722-d076-5acc-9d8e-e9daff7cd61 |

{% endinfo_block %}

<details><summary>EXAMPLE EXPECTED DATA FRAGMENT: content:en_us:br1</summary>

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

</details>

<details><summary>EXAMPLE EXPECTED DATA FRAGMENT: content:en_us:apl2</summary>

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

</details>

<details><summary>EXAMPLE EXPECTED DATA FRAGMENT: content:en_us:ps-1</summary>

```json
{
  "term": "Product Set",
  "parameters": {
    "id_product_set": 1
  }
}
```

</details>

<details><summary>EXAMPLE EXPECTED DATA FRAGMENT: content:en_us:0d9f4722-d076-5acc-9d8e-e9daff7cd61</summary>

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

</details>


#### Add widget mapper plugins

To be able to get the information on content items in the storage, set up the following plugin:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE  |
| --------------- | ------------------ | ---------- | ------------------- |
| CmsContentItemKeyMapperPlugin | Maps given content item keys to corresponding persistent item keys. |               | Spryker\Zed\CmsContentWidgetContentConnector\Communication\Plugin\Cms |


**src/Pyz/Zed/CmsContentWidget/CmsContentWidgetDependencyProvider.php**

```php
<?php

NAMESPACE Pyz\Zed\CmsContentWidget;

use Spryker\Shared\ContentBanner\ContentBannerConfig;
use Spryker\Shared\ContentProduct\ContentProductConfig;
use Spryker\Zed\CmsContentWidget\CmsContentWidgetDependencyProvider as SprykerCmsContentWidgetDependencyProvider;
use Spryker\Zed\CmsContentWidgetContentConnector\Communication\Plugin\Cms\CmsContentItemKeyMapperPlugin;
use Spryker\Zed\Kernel\Container;

class CmsContentWidgetDependencyProvider extends SprykerCmsContentWidgetDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CmsContentWidget\Dependency\Plugin\CmsContentWidgetParameterMapperPluginInterface[]
     */
    protected function getCmsContentWidgetParameterMapperPlugins(Container $container): Container
    {
        return [
            ContentBannerConfig::TWIG_FUNCTION_NAME => new CmsContentItemKeyMapperPlugin(),
            ContentProductConfig::TWIG_FUNCTION_NAME => new CmsContentItemKeyMapperPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

Make sure the `cms_page` storage record contains the information on the added content banners and content product lists.

{% endinfo_block %}


### 4) Import data

1. Importing content items into Zed:

Prepare your data according to your requirements using our demo data:

**vendor/spryker/content-banner-data-import/data/import/content_banner.csv**

```csv
key,name,description,title.default,title.en_US,title.de_DE,subtitle.default,subtitle.en_US,subtitle.de_DE,image_url.default,image_url.en_US,image_url.de_DE,click_url.default,click_url.en_US,click_url.de_DE,alt_text.default,alt_text.en_US,alt_text.de_DE
br1,Test Banner 1,Lorem Ipsum,banner title 1,,,banner sub-title 1,,,http://example.com/b2c/24699831-1991.jpg,,,http://www.demo-spryker.local/en/asus-transformer-book-t200ta-139,,,banner image 1,,
br2,Test Banner 2,Ipsum Ipsum,banner title 2,us banner title 2,,banner sub-title 2,us banner sub-title 2,,http://example.com/en/asus-zenpad-z170c-157,http://www.demo-spryker.local/en/asus-zenpad-z170c-157,,banner image 2,banner image 2,
br3,Test Banner 3,Lorem Lorem,banner title 3,,de banner title 3,banner sub-title 3,,banner sub-title 3de,http://example.com/en/canon-powershot-n-035,,http://www.demo-spryker.local/en/canon-powershot-n-035,banner image 3,,banner image 3
```

| COLUMN  | REQUIRED  | DATA TYPE   | DATA EXPLANATION   |
| ------------------- | ----------- | ------------- | ---------------- |
| key                                                 | ✓                   | string (unique) | A reference used for banner updates.            |
| name                                                | ✓                   | string          | Content Item name.                              |
| description                                         | ✓                   | string          | Content Item description.                       |
| title.default, title.en_US, title.de_DE             | At least one locale | string          | Localized banner title.                         |
| subtitle.default, subtitle.en_US, subtitle.de_DE    | At least one locale | string          | Localized banner subtitle.                      |
| image_url.default, image_url.en_US, image_url.de_DE | At least one locale | string          | Localized banner image URL.                     |
| click_url.default, click_url.en_US, click_url.de_DE | At least one locale | string          | Localized banner click URL.                     |
| alt_text.default, alt_text.en_US, alt_text.de_DE    | At least one locale | string          | Localized banner alternative text for an image. |


**vendor/spryker/content-product-data-import/data/import/content_product_abstract_list.csv**

```csv
key,name,description,skus.default,skus.en_US,skus.de_DE
apl1,APL Name 1,APL Description 1,"204,205","",""
apl2,APL Name 2,APL Description 2,"191,190","","156,154"
apl3,APL Name 3,APL Description 3,"180,171","152,151",""
```

| COLUMN  | REQUIRED  | DATA TYPE   | DATA EXPLANATION    |
| -------------- | ----------- | ------------- | ----------------------- |
| key                                  | ✓                   | string (unique) | A reference used for banner updates.                         |
| name                                 | ✓                   | string          | Content Item name.                                           |
| description                          | ✓                   | string          | Content Item description.                                    |
| skus.default, skus.en_US, skus.de_DE | At least one locale | string          | Localized abstract product list, one or more comma-separated product SKUs. |


**vendor/spryker/content-product-set-data-import/data/import/content_product_set.csv**

```csv
key,name,description,product_set_key.default,product_set_key.en_US,product_set_key.de_DE
PS-1,PS Name 1,PS Description 1,1_hp_set,,
PS-2,PS Name 2,PS Description 2,2_sony_set,,1_hp_set
PS-3,PS Name 3,PS Description 3,3_tomtom_runner_set,2_sony_set,
```


| COLUMN  | REQUIRED  | DATA TYPE  | DATA EXPLANATION  |
| -------------------------- | -------- | ------- | ----------- |
| key                                                          | ✓                   | string (unique) | A reference used for banner updates. |
| name                                                         | ✓                   | string          | Content Item name.                   |
| description                                                  | ✓                   | string          | Content Item description.            |
| product_set_key.default, product_set_key.en_US, product_set_key.de_DE | At least one locale | string          | Localized product set key            |

2. Register the following plugin to enable the content items data import:

| PLUGIN    | SPECIFICATION   | PREREQUISITES | NAMESPACE   |
| -------------------- | ----------------- | ------------ | ----------------------- |
| ContentBannerDataImportPlugin              | Imports content banners data into the database.              |               | Spryker\Zed\ContentBannerDataImport\Communication\Plugin     |
| ContentProductAbstractListDataImportPlugin | Imports content abstract product lists data into the database. |               | Spryker\Zed\ContentProductDataImport\Communication\Plugin    |
| ContentProductSetDataImportPlugin          | Imports content product sets data into the database.         |               | Spryker\Zed\ContentProductSetDataImport\Communication\Plugin |


**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

NAMESPACE Pyz\Zed\DataImport;

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

3. Import data:

```bash
1console data:import content-banner 2console data:import content-product-abstract-list 3console data:import content-product-set
```


{% info_block warningBox "Verification" %}

Make sure the data has been added to the `spy_content` and `spy_content_localized` tables.

{% endinfo_block %}



### 5) Set up behavior: Set up additional functionality

Enable the following behaviors by registering the plugins:


| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE   |
| ----------------- | ------------------ | ----------- | ------------------- |
| ContentBannerFormPlugin                               | Adds the form for editing the banner content item in the Back Office. |               | Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui |
| ContentBannerContentGuiEditorPlugin                   | Adds a **Banner** item to the **Content Item** drop-down menu in the WYSIWYG editor for CMS pages and blocks. |               | Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui |
| ProductAbstractListFormPlugin                         | Adds the form for editing the abstract product list content item in the Back Office. |               | Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui |
| ContentProductContentGuiEditorPlugin                  | Adds an **Abstract Product List** item to the **Content Item** drop-down menu in the  WYSIWYG editor for CMS pages and CMS blocks. |               | Spryker\Zed\ContentProductGui\Communication\Plugin\ContentGui |
| ProductSetFormPlugin                                  | Adds the form for editing the product set content item in the Back Office. |               | Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui |
| ContentProductSetContentGuiEditorPlugin               | Adds a **Product Set** item to the **Content Item** drop-down menu in WYSIWYG editor for CMS pages and blocks. |               | Spryker\Zed\ContentProductSetGui\Communication\Plugin\ContentGui |
| FileListFormPlugin                                    | Provides the form for editing the file list content item in the Back Office. |               | Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui   |
| ContentFileListContentGuiEditorPlugin                 | Adds a **File List** item to the **Content Item** drop-down menu in WYSIWYG editor for CMS pages and CMS blocks. |               | Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui   |
| HtmlToTwigExpressionsCmsBlockGlossaryBeforeSavePlugin | Converts the HTML code created by `TwigExpressionsToHtmlCmsBlockGlossaryAfterFindPlugin` into a Twig expression. |               | Spryker\Zed\ContentGui\Communication\Plugin\CmsBlockGui      |
| TwigExpressionsToHtmlCmsBlockGlossaryAfterFindPlugin  | Replaces Twig expressions of CMS block content with styled UI elements in the WYSIWYG editor. Replaces all the Twig functions registered by the plugins suffixed with `ContentGuiEditorPlugin`. |               | Spryker\Zed\ContentGui\Communication\Plugin\CmsBlockGui      |
| HtmlToTwigExpressionsCmsGlossaryBeforeSavePlugin      | Converts the HTML code created by `TwigExpressionsToHtmlCmsGlossaryAfterFindPlugin` into a Twig expression. |               | Spryker\Zed\ContentGui\Communication\Plugin\CmsGui           |
| TwigExpressionsToHtmlCmsGlossaryAfterFindPlugin       | Replaces Twig expressions of CMS page content with styled UI elements in the WYSIWYG editor. Replaces all the Twig functions registered by the plugins suffixed with `ContentGuiEditorPlugin`. |               | Spryker\Zed\ContentGui\Communication\Plugin\CmsGui           |


<details><summary>src/Pyz/Zed/ContentGui/ContentGuiDependencyProvider.php</summary>

```php
<?php
NAMESPACE Pyz\Zed\ContentGui;

use Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui\ContentBannerContentGuiEditorPlugin;
use Spryker\Zed\ContentBannerGui\Communication\Plugin\ContentGui\ContentBannerFormPlugin;
use Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui\ContentFileListContentGuiEditorPlugin;
use Spryker\Zed\ContentFileGui\Communication\Plugin\ContentGui\FileListFormPlugin;
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

</details>


{% info_block warningBox "Verification" %}

Make sure that in the Back Office > **Content** > **Content Items**, you can see the following:

- **Add Content Item** drop-down menu button with the following items:
  - **Banner**
  - **Abstract Product List**
  - **Product Set**
  - **File List**
- **Edit** button next to all types of content items in the list.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that, when editing CMS pages and blocks in the WYSIWYG editor, in the toolbar, you can see a **Content Item** drop-down menu button with the following items:

- **Banner**
- **Abstract Product List**
- **Product Set**
- **File List**

{% endinfo_block %}


<details><summary>src/Pyz/Zed/CmsBlockGui/CmsBlockGuiDependencyProvider.php</summary>

```php
<?php

NAMESPACE Pyz\Zed\CmsBlockGui;

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

</details>


<details><summary>src/Pyz/Zed/CmsGui/CmsGuiDependencyProvider.php</summary>

```php
<?php

NAMESPACE Pyz\Zed\CmsGui;

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

</details>



{% info_block warningBox "Verification" %}

Make sure that, when editing CMS pages and blocks in the WYSIWYG editor, you can add any content item using the **Content Item** drop-down menu.

{% endinfo_block %}



## Install feature front end

Follow the steps below to install the Content Item feature front end.

### Prerequisites

To start the feature integration, review and install the necessary features:

| NAME         | VERSION    |
| ---------- | -------- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
1composer require spryker-feature/content-item:"^dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure the following modules have been installed in `vendor/spryker-shop`:

| MODULE                  | EXPECTED DIRECTORY                             |
| --------------------- | ------------------------------------------ |
| ContentBannerWidget     | vendor/spryker-shop/content-banner-widget      |
| ContentProductWidget    | vendor/spryker-shop/content-product-widget     |
| ContentProductSetWidget | vendor/spryker-shop/content-product-set-widget |
| ContentFileWidget       | vendor/spryker-shop/content-file-widget        |

{% endinfo_block %}

### 2) Set up behavior: Set up additional functionality

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE  |
| ------------- | --------------- | ----------- | -------- |
| ContentBannerTwigPlugin              | Adds the `content_banner(id, template)` function to Yves and CMS blocks pages. |               | SprykerShop\Yves\ContentBannerWidget\Plugin\Twig     |
| ContentProductAbstractListTwigPlugin | Adds the `content_product_abstract_list(id, template)` function to Yves and CMS blocks pages. |               | SprykerShop\Yves\ContentProductWidget\Plugin\Twig    |
| ContentProductSetTwigPlugin          | Adds the `content_product_set(id, template)` function to Yves and CMS blocks  pages. |               | SprykerShop\Yves\ContentProductSetWidget\Plugin\Twig |
| ContentFileListTwigPlugin            | Adds the `content_file_list(id, template)` function to Yves and CMS blocks  pages. |               | SprykerShop\Yves\ContentFileWidget\Plugin\Twig       |


**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php

NAMESPACE Pyz\Yves\Twig;

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

Make sure that you've configured the content items:

1. Add a content item to a CMS block or page.

2. Configure the CMS block or page to be displayed on the Storefront.

3. Check that the content item is displayed on the Storefront.

{% endinfo_block %}
