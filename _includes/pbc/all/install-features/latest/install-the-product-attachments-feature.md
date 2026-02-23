This document describes how to install the [Product Attachments feature](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attachments-overview.html).

## Install feature core

Follow the steps below to install the Product Attachments feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{page.release_tag}} | [Install the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-attachment:"^1.1.0" spryker/product-attachment-storage:"^1.0.2" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductAttachment | vendor/spryker/product-attachment |
| ProductAttachmentStorage | vendor/spryker/product-attachment-storage |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

**src/Pyz/Zed/ProductAttachmentStorage/ProductAttachmentStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ProductAttachmentStorage;

use Spryker\Zed\ProductAttachmentStorage\ProductAttachmentStorageConfig as SprykerProductAttachmentStorageConfig;
use Spryker\Zed\Synchronization\SynchronizationConfig;

class ProductAttachmentStorageConfig extends SprykerProductAttachmentStorageConfig
{
    public function getProductAttachmentSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

### 3) Set up transfer objects

Generate transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ProductAttachmentTransfer | class | created | src/Generated/Shared/Transfer/ProductAttachmentTransfer |
| ProductAttachmentCollectionTransfer | class | created | src/Generated/Shared/Transfer/ProductAttachmentCollectionTransfer |
| ProductViewTransfer.attachments | column | extended | src/Generated/Shared/Transfer/ProductViewTransfer |

{% endinfo_block %}

### 4) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAttachmentProductAbstractPostCreatePlugin | Saves product attachments after an abstract product is created. | | Spryker\Zed\ProductAttachment\Communication\Plugin\Product |
| ProductAttachmentProductAbstractAfterUpdatePlugin | Updates product attachments after an abstract product is updated. | | Spryker\Zed\ProductAttachment\Communication\Plugin\Product |

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use Spryker\Zed\ProductAttachment\Communication\Plugin\Product\ProductAttachmentProductAbstractAfterUpdatePlugin;
use Spryker\Zed\ProductAttachment\Communication\Plugin\Product\ProductAttachmentProductAbstractPostCreatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPostCreatePluginInterface>
     */
    protected function getProductAbstractPostCreatePlugins(): array
    {
        return [
            new ProductAttachmentProductAbstractPostCreatePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\Product\Dependency\Plugin\ProductAbstractPluginUpdateInterface>
     */
    protected function getProductAbstractAfterUpdatePlugins(): array
    {
        return [
            new ProductAttachmentProductAbstractAfterUpdatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you create or update an abstract product in the Back Office, the attachments are saved and updated correctly.

{% endinfo_block %}

Register the following Back Office plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAttachmentProductAbstractFormExpanderPlugin | Expands the abstract product form with the Attachments tab. | | Spryker\Zed\ProductAttachment\Communication\Plugin\ProductManagement |
| ProductAttachmentProductAbstractTransferMapperPlugin | Maps attachment form data to the abstract product transfer. | | Spryker\Zed\ProductAttachment\Communication\Plugin\ProductManagement |
| ProductAttachmentProductAbstractFormDataProviderExpanderPlugin | Populates the attachment form with existing attachment data. | | Spryker\Zed\ProductAttachment\Communication\Plugin\ProductManagement |
| ProductAttachmentImageTabContentProviderPlugin | Provides attachment content for the Media tab. | | Spryker\Zed\ProductAttachment\Communication\Plugin\ProductManagement |

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductAttachment\Communication\Plugin\ProductManagement\ProductAttachmentImageTabContentProviderPlugin;
use Spryker\Zed\ProductAttachment\Communication\Plugin\ProductManagement\ProductAttachmentProductAbstractFormDataProviderExpanderPlugin;
use Spryker\Zed\ProductAttachment\Communication\Plugin\ProductManagement\ProductAttachmentProductAbstractFormExpanderPlugin;
use Spryker\Zed\ProductAttachment\Communication\Plugin\ProductManagement\ProductAttachmentProductAbstractTransferMapperPlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormExpanderPluginInterface>
     */
    protected function getProductAbstractFormExpanderPlugins(): array
    {
        return [
            new ProductAttachmentProductAbstractFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractTransferMapperExpanderPluginInterface>
     */
    protected function getProductAbstractTransferMapperPlugins(): array
    {
        return [
            new ProductAttachmentProductAbstractTransferMapperPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormDataProviderExpanderPluginInterface>
     */
    protected function getProductAbstractFormDataProviderExpanderPlugins(): array
    {
        return [
            new ProductAttachmentProductAbstractFormDataProviderExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormTabContentProviderPluginInterface>
     */
    protected function getProductAbstractFormTabContentProviderPlugins(): array
    {
        return [
            new ProductAttachmentImageTabContentProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the **Attachments** section is visible in the **Media** tab when editing an abstract product in the Back Office.

{% endinfo_block %}

Register the event subscriber and synchronization plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAttachmentStorageEventSubscriber | Subscribes to product attachment events and triggers storage updates. | | Spryker\Zed\ProductAttachmentStorage\Communication\Plugin\Event\Subscriber |
| ProductAbstractAttachmentSynchronizationDataPlugin | Provides product attachment storage data for synchronization. | | Spryker\Zed\ProductAttachmentStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductAttachmentStorage\Communication\Plugin\Event\Subscriber\ProductAttachmentStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection(): EventCollection
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ProductAttachmentStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductAttachmentStorage\Communication\Plugin\Synchronization\ProductAbstractAttachmentSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataStorePlugins(): array
    {
        return [
            new ProductAbstractAttachmentSynchronizationDataPlugin(),
        ];
    }
}
```

Register the data import plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAttachmentDataImportPlugin | Imports product attachment data from a CSV file. | | Spryker\Zed\ProductAttachment\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductAttachment\Communication\Plugin\DataImport\ProductAttachmentDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductAttachmentDataImportPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\ProductAttachment\ProductAttachmentConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ProductAttachmentConfig::IMPORT_TYPE_PRODUCT_ATTACHMENT),
        ];
    }
}
```

Register the product view expander plugin on the client side:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAttachmentProductViewExpanderPlugin | Expands the product view transfer with attachment data from storage. | | Spryker\Client\ProductAttachmentStorage\Plugin\ProductStorage |

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductStorage;

use Spryker\Client\ProductAttachmentStorage\Plugin\ProductStorage\ProductAttachmentProductViewExpanderPlugin;
use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Client\ProductStorageExtension\Dependency\Plugin\ProductViewExpanderPluginInterface>
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductAttachmentProductViewExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that product attachments are available in the product view transfer after retrieving product data from storage.

{% endinfo_block %}

### 5) Set up Yves templates

Add the Downloads block to the product detail template.

**src/Pyz/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig**

Pass the `attachments` variable to the product detail template:

{% raw %}
```twig
{% include molecule('product-detail', 'ProductDetailPage') with {
    ...
    data: {
        ...
        attachments: data.product.attachments | default([]),
    },
} only %}
```
{% endraw %}

**src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-detail/product-detail.twig**

Add the Downloads section to the product detail template:

{% raw %}
```twig
{% if data.attachments is not empty %}
    <div class="product-detail__attachments">
        <h5>{{ 'product.attachments.downloads' | trans }}</h5>
        <ul>
            {% for attachment in data.attachments %}
                <li>
                    <a href="{{ attachment.attachmentUrl }}" target="_blank" rel="noopener noreferrer">
                        {{ attachment.label }}
                    </a>
                </li>
            {% endfor %}
        </ul>
    </div>
{% endif %}
```
{% endraw %}

{% info_block warningBox "Verification" %}

Make sure that the **Downloads** section is displayed on the PDP for products that have attachments configured, and that it is hidden for products without attachments.

{% endinfo_block %}

### 6) Import glossary

1. Add glossary keys for the Downloads section label:

```csv
product.attachments.downloads,Downloads,en_US
product.attachments.downloads,Downloads,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 7) Import product attachments data

1. Prepare your data according to the following format:

```csv
abstract_sku,label,locale,attachment_url,sort_order
001,Product Manual,en_US,https://example.com/manual-en.pdf,1
001,Produkthandbuch,de_DE,https://example.com/manual-de.pdf,1
001,Safety Data Sheet,,https://example.com/safety.pdf,2
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| abstract_sku | ✓ | string | 001 | SKU of the abstract product. |
| label | ✓ | string | Product Manual | Display name of the attachment shown to customers. |
| locale | | string | en_US | Locale code for locale-specific attachments. Leave empty for default attachments that apply to all locales. |
| attachment_url | ✓ | string | `https://example.com/manual.pdf` | External URL of the attachment resource. |
| sort_order | ✓ | integer | 1 | Display order. Lower values are displayed first. |

2. Import data:

```bash
console data:import product-attachment
```

{% info_block warningBox "Verification" %}

Make sure that the product attachments are stored in the database and that they appear in the **Downloads** section on the PDP for the configured products.

{% endinfo_block %}
