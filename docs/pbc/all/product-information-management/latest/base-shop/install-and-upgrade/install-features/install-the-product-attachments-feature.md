---
title: Install the Product Attachments feature
description: Learn how to integrate the Product Attachments feature into a Spryker project.
template: feature-integration-guide-template
last_updated: Feb 20, 2026
---

This document describes how to install the [Product Attachments feature](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attachments-overview.html).

## Prerequisites

### Install the required features

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{page.release_tag}} | [Install the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |


Minimum required versions of the packages:

| PACKAGE | MINIMUM VERSION |
| --- | --- |
| spryker/product-attachment | 1.1.0 |
| spryker/product-attachment-storage | 1.0.2 |

## 1) Set up Zed configuration

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

## 2) Set up transfer objects

```bash
console transfer:generate
```

## 3) Set up behavior

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

Make sure that when you create or update an abstract product in the Back Office, the attachments are saved and updated correctly:

1. In the Back Office, go to **Catalog > Products**.
2. Click **Edit** next to a product.
3. Go to the **Media** tab.
4. In the **Product Attachments** section, add, edit, or remove attachments.
5. Click **Save**.

Make sure the records in the `spy_product_attachment` and `spy_product_attachment_product_abstract` database tables are created or updated accordingly.

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

## 4) Set up Yves templates

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

1. Add default attachments to data.

{% raw %}

```twig
{% define data = {
    ...
    attachments: [],
} %}
```
{% endraw %}

2. Create attachment column block.

{% raw %}
```twig
{% block attachmentCol %}
    <a href="{{ currentAttachment.url }}" target="_blank" rel="noopener noreferrer" class="link">{{ currentAttachment.label }}</a>
{% endblock %}

```
{% endraw %}

3. Adjust your code in the `{% block body %}`.
   
{% raw %}
```twig
{% if data.description or data.attachments is not empty %} {# Wrap attachments and description in condition #}
        <div class="col col--sm-12 col--lg-6">
            {% if data.description %}
                {# Put your description here #}
            {% endif %}

            {# --- Add attachments block under the description --- #}
            {% if data.attachments is not empty %}
                <h2 class="{{ config.name }}__title title title--h3 title--mobile-toggler-section js-pdp-section__trigger" data-toggle-target='.js-pdp-section__target-attachments'>{{ 'product.attachments.downloads' | trans }}</h2>

                {% set columns = [
                    {
                        id: 'name',
                        title: 'product.attachments.name.col' | trans,
                    },
                    {
                        id: 'actions',
                        type: 'actions',
                        title: 'product.attachments.download.col' | trans,
                        modifiers: ['align-center'],
                    },
                ] %}

                {% set rows = [] %}
                {% for attachment in data.attachments %}
                    {% set currentAttachment = attachment %}
                    {% set rows = rows | merge([{
                        name: block('attachmentCol'),
                        actions: [{
                            iconModifier: 'big',
                            url: attachment.url,
                            title: 'self_service_portal.company_file.table.actions.download',
                            icon: 'download',
                            target: '_blank',
                        }],
                    }]) %}
                {% endfor %}

                {% include molecule('advanced-table', 'SelfServicePortal') with {
                    class: 'js-pdp-section__target-attachments is-hidden-sm-md',
                    data: {
                        columns: columns,
                        rows: rows,
                    },
                    qa: 'attachments-table',
                } only %}
            {% endif %}
            {# --- End of the attachments block --- #}

        </div>
    {% endif %}
```
{% endraw %}

{% info_block warningBox "Verification" %}

Make sure that the **Downloads** section is displayed on the PDP for products that have attachments configured, and that it is hidden for products without attachments:

1. In the Storefront, find a product that has attachments configured.
2. Open the product detail page (PDP).
3. Scroll to the **Downloads** section and verify that the configured attachments are listed there.

{% endinfo_block %}

## 5) Import glossary

1. Add glossary keys for the Downloads section label in `glossary.csv`:

```csv
product.attachments.downloads,Downloads,en_US
product.attachments.downloads,Downloads,de_DE
```

2. Import data:

```bash
console data:import glossary
```

## 7) Import product attachments data

1. Prepare your data according to the following format:
   File: data/import/common/common/product_attachment.csv

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

2. Update `data/import/local/full_EU.yml` and `data/import/local/full_US.yml` with

```yaml
actions:
    - data_entity: product-attachment
      source: data/import/common/common/product_attachment.csv
```

3. Import data:

```bash
console data:import product-attachment
```

{% info_block warningBox "Verification" %}

Make sure that the product attachments are stored in the database and that they appear in the **Downloads** section on the PDP for the configured products:

1. Check that the `spy_product_attachment` and `spy_product_attachment_product_abstract` database tables contain the imported records.
2. Check that the `spy_product_abstract_storage` table contains the attachment data for the imported products.
3. In the Back Office, go to **Catalog > Products**, click **Edit** next to an imported product, and open the **Media** tab. Make sure the attachments are listed in the **Product Attachments** section.
4. In the Storefront, open the PDP for an imported product and verify that the **Downloads** section lists the configured attachments.

{% endinfo_block %}
