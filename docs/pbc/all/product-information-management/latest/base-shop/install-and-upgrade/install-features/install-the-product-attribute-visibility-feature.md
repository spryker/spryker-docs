---
title: Install the Product Attribute Visibility feature
description: Learn how to integrate the Product Attribute Visibility feature into a Spryker project.
template: feature-integration-guide-template
last_updated: Apr 7, 2026
---

This document describes how to install the [Product Attribute Visibility feature](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attribute-visibility-overview.html).

## Prerequisites

### Install the required features

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{page.release_tag}} | [Install the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### Install the required packages

| PACKAGE | VERSION |
| --- | --- |
| spryker-feature/product-experience-management | ^1.0.0 |
| spryker/product-attribute | ^1.19.0 |
| spryker/product-attribute-extension | ^1.1.0 |
| spryker/product-attribute-gui | ^2.2.0 |
| spryker/product-attribute-gui-extension | ^1.0.0 |
| spryker/product-management | ^0.20.8 |
| spryker-shop/cart-page | ^3.58.0 |
| spryker-shop/catalog-page | ^1.36.0 |
| spryker-shop/product-detail-page | ^3.31.0 |
| spryker-shop/product-widget | ^1.6.0 |
| spryker-shop/shop-ui | ^1.106.0 |

```bash
composer require spryker/product-attribute-gui-extension:"^1.0.0" spryker-feature/product-experience-management:"^1.0.0" spryker/product-attribute:"^1.19.0" spryker/product-attribute-extension:"^1.1.0" spryker/product-attribute-gui:"^2.2.0" spryker/product-management:"^0.20.8" spryker-shop/cart-page:"^3.58.0" spryker-shop/catalog-page:"^1.36.0" spryker-shop/product-detail-page:"^3.31.0" spryker-shop/product-widget:"^1.6.0" spryker-shop/shop-ui:"^1.106.0" --update-with-dependencies
```

## 1) Set up configuration

Set up RabbitMQ and Symfony Messenger configuration for the publish and sync queues.

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use SprykerFeature\Shared\ProductExperienceManagement\ProductExperienceManagementConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return list<mixed>
     */
    protected function getPublishQueueConfiguration(): array
    {
        return [
            ProductExperienceManagementConfig::PUBLISH_PRODUCT_ATTRIBUTE,
        ];
    }

    /**
     * @return list<string>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ProductExperienceManagementConfig::PRODUCT_ATTRIBUTE_SYNC_STORAGE_QUEUE,
        ];
    }
}
```

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use SprykerFeature\Shared\ProductExperienceManagement\ProductExperienceManagementConfig;
use Spryker\Zed\Event\Communication\Plugin\Queue\EventQueueMessageProcessorPlugin;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerQueueDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerQueueDependencyProvider
{
    /**
     * @return array<string, \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(): array
    {
        return [
            ProductExperienceManagementConfig::PUBLISH_PRODUCT_ATTRIBUTE => new EventQueueMessageProcessorPlugin(),
            ProductExperienceManagementConfig::PRODUCT_ATTRIBUTE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

**src/Pyz/Client/SymfonyMessenger/SymfonyMessengerConfig.php**

```php
<?php

namespace Pyz\Client\SymfonyMessenger;

use SprykerFeature\Shared\ProductExperienceManagement\ProductExperienceManagementConfig;

class SymfonyMessengerConfig extends SprykerSymfonyMessengerConfig
{
    /**
     * @return list<mixed>
     */
    protected function getPublishQueueConfiguration(): array
    {
        return [
            ProductExperienceManagementConfig::PUBLISH_PRODUCT_ATTRIBUTE,
        ];
    }

    /**
     * @return list<string>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ProductExperienceManagementConfig::PRODUCT_ATTRIBUTE_SYNC_STORAGE_QUEUE,
        ];
    }
}
```

## 2) Set up the database schema and transfer objects

1. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_product_management_attribute.visibility | column | created |
| spy_product_attribute_storage | table | created |

Make sure the following transfer objects have been generated:

| TRANSFER | TYPE | EVENT |
| --- | --- | --- |
| ProductAttributeStorage | class | created |
| ProductAttributeStorage.key | property | created |
| ProductAttributeStorage.inputType | property | created |
| ProductAttributeStorage.isSuper | property | created |
| ProductAttributeStorage.visibilityTypes | property | created |
| ProductManagementAttribute.visibility | property | created |
| ProductManagementAttribute.visibilityTypes | property | created |
| ProductManagementAttributeCollection | class | created |
| ProductManagementAttributeCriteria | class | created |
| ProductManagementAttributeConditions.productManagementAttributeIds | property | created |
| ProductAttributeTableCriteria | class | created |
| ProductAttributeTableCriteria.visibilityTypes | property | created |
| ProductAttributeTableCriteria.withColumns | property | created |
| ProductAttributeTableCriteria.queryConditions | property | created |
| ProductAttributeTableCriteria.conditionCombineOperator | property | created |
| ProductAttributeTableQueryCondition | class | created |
| ProductAttributeQueryCriteria | class | created |
| ProductAttributeQueryCriteria.withColumns | property | created |

{% endinfo_block %}

## 3) Set up behavior

### Set up publisher and synchronization plugins

Register the publisher and synchronization plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAttributePublisherTriggerPlugin | Triggers a full publish of product attribute data. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\Publisher |
| ProductAttributeWritePublisherPlugin | Handles create and update events for product attributes and writes data to storage. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\Publisher |
| ProductAttributeSynchronizationDataBulkRepositoryPlugin | Provides product attribute storage data for the synchronization process. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use SprykerFeature\Shared\ProductExperienceManagement\ProductExperienceManagementConfig;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\Publisher\ProductAttributePublisherTriggerPlugin;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\Publisher\ProductAttributeWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<string, list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            parent::getPublisherPlugins(),
            $this->getProductAttributeStoragePlugins(),
        );
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ProductAttributePublisherTriggerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getProductAttributeStoragePlugins(): array
    {
        return [
            ProductExperienceManagementConfig::PUBLISH_PRODUCT_ATTRIBUTE => [
                new ProductAttributeWritePublisherPlugin(),
            ],
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\Synchronization\ProductAttributeSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataStorePlugins(): array
    {
        return [
            new ProductAttributeSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you create or update a product attribute in the Back Office, the attribute data is published and synchronized to the `spy_product_attribute_storage` table:

1. In the Back Office, go to **Catalog > Attributes**.
2. Edit an attribute and change its **Display At** value.
3. Click **Save**.
4. Check that the `spy_product_attribute_storage` table contains the updated attribute data.

{% endinfo_block %}

### Set up product attribute query expander

Register the query expander plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| VisibilityProductAttributeQueryExpanderPlugin | Expands the product attribute query with the visibility column. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttribute |

**src/Pyz/Zed/ProductAttribute/ProductAttributeDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductAttribute;

use Spryker\Zed\ProductAttribute\ProductAttributeDependencyProvider as SprykerProductAttributeDependencyProvider;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttribute\VisibilityProductAttributeQueryExpanderPlugin;

class ProductAttributeDependencyProvider extends SprykerProductAttributeDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ProductAttributeExtension\Dependency\Plugin\ProductAttributeQueryExpanderPluginInterface>
     */
    protected function getProductAttributeQueryExpanderPlugins(): array
    {
        return [
            new VisibilityProductAttributeQueryExpanderPlugin(),
        ];
    }
}
```

### Set up Back Office attribute form and table plugins

Register the Back Office plugins for the attribute management UI:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| VisibilityAttributeTableConfigExpanderPlugin | Expands the attribute table configuration with the visibility column. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui |
| VisibilityAttributeTableHeaderExpanderPlugin | Adds the Display At header to the attribute table. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui |
| VisibilityAttributeTableDataExpanderPlugin | Renders visibility badges in attribute table rows. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui |
| VisibilityAttributeTableCriteriaExpanderPlugin | Adds visibility filter conditions to the attribute table query. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui |
| VisibilityAttributeFormExpanderPlugin | Adds the visibility types select field to the attribute form. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui |
| VisibilityAttributeFormDataProviderExpanderPlugin | Populates the attribute form with existing visibility data. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui |
| VisibilityAttributeFormTransferMapperExpanderPlugin | Maps visibility types from the form to the attribute transfer object. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui |
| VisibilityAttributeTableFilterFormExpanderPlugin | Adds a visibility type filter to the attribute table. | | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui |

**src/Pyz/Zed/ProductAttributeGui/ProductAttributeGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductAttributeGui;

use Spryker\Zed\ProductAttributeGui\ProductAttributeGuiDependencyProvider as SprykerProductAttributeGuiDependencyProvider;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui\VisibilityAttributeFormDataProviderExpanderPlugin;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui\VisibilityAttributeFormExpanderPlugin;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui\VisibilityAttributeFormTransferMapperExpanderPlugin;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui\VisibilityAttributeTableCriteriaExpanderPlugin;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui\VisibilityAttributeTableConfigExpanderPlugin;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui\VisibilityAttributeTableDataExpanderPlugin;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui\VisibilityAttributeTableFilterFormExpanderPlugin;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductAttributeGui\VisibilityAttributeTableHeaderExpanderPlugin;

class ProductAttributeGuiDependencyProvider extends SprykerProductAttributeGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductAttributeGuiExtension\Dependency\Plugin\AttributeTableConfigExpanderPluginInterface>
     */
    protected function getAttributeTableConfigExpanderPlugins(): array
    {
        return [
            new VisibilityAttributeTableConfigExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductAttributeGuiExtension\Dependency\Plugin\AttributeTableHeaderExpanderPluginInterface>
     */
    protected function getAttributeTableHeaderExpanderPlugins(): array
    {
        return [
            new VisibilityAttributeTableHeaderExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductAttributeGuiExtension\Dependency\Plugin\AttributeTableDataExpanderPluginInterface>
     */
    protected function getAttributeTableDataExpanderPlugins(): array
    {
        return [
            new VisibilityAttributeTableDataExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductAttributeGuiExtension\Dependency\Plugin\AttributeTableCriteriaExpanderPluginInterface>
     */
    protected function getAttributeTableCriteriaExpanderPlugins(): array
    {
        return [
            new VisibilityAttributeTableCriteriaExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductAttributeGuiExtension\Dependency\Plugin\AttributeFormExpanderPluginInterface>
     */
    protected function getAttributeFormExpanderPlugins(): array
    {
        return [
            new VisibilityAttributeFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductAttributeGuiExtension\Dependency\Plugin\AttributeFormDataProviderExpanderPluginInterface>
     */
    protected function getAttributeFormDataProviderExpanderPlugins(): array
    {
        return [
            new VisibilityAttributeFormDataProviderExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductAttributeGuiExtension\Dependency\Plugin\AttributeFormTransferMapperExpanderPluginInterface>
     */
    protected function getAttributeFormTransferMapperExpanderPlugins(): array
    {
        return [
            new VisibilityAttributeFormTransferMapperExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductAttributeGuiExtension\Dependency\Plugin\AttributeTableFilterFormExpanderPluginInterface>
     */
    protected function getAttributeTableFilterFormExpanderPlugins(): array
    {
        return [
            new VisibilityAttributeTableFilterFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the attribute management UI in the Back Office includes the visibility features:

1. In the Back Office, go to **Catalog > Attributes**.
2. Verify that the attribute table has a **Display At** column with visibility badges.
3. Verify that you can filter the table by visibility type using the filter dropdown.
4. Click **Edit** next to an attribute.
5. Verify that the attribute form includes a **Display At** field where you can select one or more visibility types.

{% endinfo_block %}

## 4) Set up widgets

Register the following global widgets:

| WIDGET | DESCRIPTION | NAMESPACE |
| --- | --- | --- |
| ProductAttributeVisibilityPdpWidget | Displays product attributes configured for PDP visibility with schema.org structured data. | SprykerFeature\Yves\ProductExperienceManagement\Widget |
| ProductAttributeVisibilityPlpWidget | Displays product attributes configured for PLP visibility as badges. | SprykerFeature\Yves\ProductExperienceManagement\Widget |
| ProductAttributeVisibilityCartWidget | Displays product attributes configured for Cart visibility as badges. | SprykerFeature\Yves\ProductExperienceManagement\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\ProductExperienceManagement\Widget\ProductAttributeVisibilityCartWidget;
use SprykerFeature\Yves\ProductExperienceManagement\Widget\ProductAttributeVisibilityPdpWidget;
use SprykerFeature\Yves\ProductExperienceManagement\Widget\ProductAttributeVisibilityPlpWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductAttributeVisibilityPdpWidget::class,
            ProductAttributeVisibilityPlpWidget::class,
            ProductAttributeVisibilityCartWidget::class,
        ];
    }
}
```

## 5) Set up Yves templates

If you have overridden the default Twig templates at the project level, add the following widget calls to display product attributes on the Storefront.

### Product Detail Page (PDP)

**src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-detail/product-detail.twig**

{% raw %}

```twig
{% widget 'ProductAttributeVisibilityPdpWidget' args [data.product.idProductAbstract, data.product.idProductConcrete] only %}
{% nowidget %}
{% endwidget %}
```

{% endraw %}

### Product Listing Page (PLP)

**src/Pyz/Yves/ProductWidget/Theme/default/components/molecules/catalog-product/catalog-product.twig**

{% raw %}

```twig
{% widget 'ProductAttributeVisibilityPlpWidget' args [data.products, data.product.idProductAbstract] only %}
{% nowidget %}
{% endwidget %}
```

{% endraw %}

### Cart

**src/Pyz/Yves/CartPage/Theme/default/components/molecules/product-cart-item/product-cart-item.twig**

{% raw %}

```twig
{% widget 'ProductAttributeVisibilityCartWidget' args [data.cart is iterable ? null : data.cart, data.product.idProductAbstract, data.product.idProductConcrete] only %}
{% nowidget %}
{% endwidget %}
```

{% endraw %}

{% info_block warningBox "Verification" %}

Make sure the product attributes are displayed on the Storefront based on their visibility configuration:

1. In the Back Office, configure an attribute with **PDP** visibility.
2. On the Storefront, open the product detail page and verify the attribute is displayed.
3. Configure an attribute with **PLP** visibility and verify it appears as a badge on the product listing page.
4. Configure an attribute with **Cart** visibility and add the product to the cart. Verify the attribute badge is displayed in the cart.

{% endinfo_block %}

## 6) Set up data import

### Add facade dependencies

Register the required facade dependencies in the data import module.

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\Kernel\Container;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @var string
     */
    public const FACADE_PRODUCT_EXPERIENCE_MANAGEMENT = 'FACADE_PRODUCT_EXPERIENCE_MANAGEMENT';

    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->addProductExperienceManagementFacade($container);

        return $container;
    }

    protected function addProductExperienceManagementFacade(Container $container): Container
    {
        $container->set(static::FACADE_PRODUCT_EXPERIENCE_MANAGEMENT, function (Container $container) {
            return $container->getLocator()->productExperienceManagement()->facade();
        });

        return $container;
    }
}
```

### Update the product management attribute writer

Extend `ProductManagementAttributeWriter` to handle the `visibility` column during import. The writer saves the visibility value to the `spy_product_management_attribute` table, triggers a publish event, and validates visibility types against the allowed values.

**src/Pyz/Zed/DataImport/Business/Model/ProductManagementAttribute/ProductManagementAttributeWriter.php**

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\ProductManagementAttribute;

use Spryker\Zed\DataImport\Business\Exception\DataImportException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use SprykerFeature\Shared\ProductExperienceManagement\ProductExperienceManagementConfig;
use SprykerFeature\Zed\ProductExperienceManagement\Business\ProductExperienceManagementFacadeInterface;

class ProductManagementAttributeWriter extends PublishAwareStep implements DataImportStepInterface
{
    protected const string KEY_VISIBILITY = 'visibility';

    public function __construct(
        protected readonly ProductExperienceManagementFacadeInterface $productExperienceManagementFacade,
    ) {
    }

    public function execute(DataSetInterface $dataSet): void
    {
        // ... existing logic for finding or creating entity ...

        $visibility = (string)$dataSet[static::KEY_VISIBILITY] ?? '';

        if ($visibility !== '') {
            $visibility = $this->normalizeVisibility($visibility, $dataSet['key']);
        }

        $productManagementAttributeEntity
            ->setAllowInput($dataSet['allow_input'])
            ->setInputType($dataSet['input_type'])
            ->setVisibility($visibility);

        $productManagementAttributeEntity->save();

        $this->addPublishEvents(
            ProductExperienceManagementConfig::PRODUCT_ATTRIBUTE_PUBLISH,
            $productManagementAttributeEntity->getIdProductManagementAttribute(),
        );

        // ... existing logic for attribute values ...
    }

    protected function normalizeVisibility(string $visibility, string $attributeKey): string
    {
        $visibilityTypes = array_map('trim', explode(',', $visibility));
        $allowedVisibilityTypes = $this->productExperienceManagementFacade->getAvailableVisibilityTypes();
        $allowedVisibilityTypesMap = array_combine(
            array_map('strtolower', $allowedVisibilityTypes),
            $allowedVisibilityTypes,
        );

        $normalized = [];

        foreach ($visibilityTypes as $visibilityType) {
            $canonical = $allowedVisibilityTypesMap[strtolower($visibilityType)] ?? null;
            if ($canonical === null) {
                throw new DataImportException(
                    sprintf(
                        'Invalid visibility type "%s" for attribute "%s". Allowed: %s (or empty).',
                        $visibilityType,
                        $attributeKey,
                        implode(', ', $allowedVisibilityTypes),
                    ),
                );
            }

            $normalized[] = $canonical;
        }

        return implode(',', $normalized);
    }
}
```

Wire the facade into the writer via the business factory.

**src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php**

```php
<?php

namespace Pyz\Zed\DataImport\Business;

use Pyz\Zed\DataImport\Business\Model\ProductManagementAttribute\ProductManagementAttributeWriter;
use Pyz\Zed\DataImport\DataImportDependencyProvider;
use Spryker\Zed\DataImport\Business\DataImportBusinessFactory as SprykerDataImportBusinessFactory;
use SprykerFeature\Zed\ProductExperienceManagement\Business\ProductExperienceManagementFacadeInterface;

class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    // In createProductManagementAttributeImporter(), replace:
    //     ->addStep(new ProductManagementAttributeWriter());
    // with:
    //     ->addStep(new ProductManagementAttributeWriter(
    //         $this->getProductExperienceManagementFacade(),
    //     ));

    protected function getProductExperienceManagementFacade(): ProductExperienceManagementFacadeInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_PRODUCT_EXPERIENCE_MANAGEMENT);
    }
}
```

### Prepare and import data

1. Add the `visibility` column to the existing `product_management_attribute.csv` file.

   File: **data/import/common/common/product_management_attribute.csv**

```csv
key,input_type,allow_input,is_multiple,values,key_translation.en_US,key_translation.de_DE,value_translations.en_US,value_translations.de_DE,visibility
storage_capacity,text,no,no,"16 GB, 32 GB, 64 GB, 128 GB",Storage Capacity,Speichergröße,,,PDP
color,text,no,yes,"white, black, grey",Color,Farbe,"white, black, grey","weiß, schwarz, grau","PDP,PLP,Cart"
brand,text,yes,no,,Brand,Marke,,,PDP
internal_sku,text,yes,no,,Internal SKU,Interne SKU,,,,
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
| key | ✓ | string | color | Unique attribute key. |
| input_type | ✓ | string | text | Input type for the attribute. |
| allow_input | ✓ | string | no | Whether custom input is allowed. |
| is_multiple | ✓ | string | no | Whether multiple values are supported. |
| values | | string | "white, black, grey" | Predefined attribute values. |
| visibility | | string | "PDP,PLP,Cart" | Comma-separated list of visibility types. Valid values: `PDP`, `PLP`, `Cart`. Leave empty for internal-only attributes. |

2. Import data:

```bash
console data:import product-management-attribute
```

{% info_block warningBox "Verification" %}

Make sure that the product attribute visibility data is imported correctly:

1. In the Back Office, go to **Catalog > Attributes**.
2. Verify that each attribute displays the correct visibility types in the **Display At** column.
3. Check that the `spy_product_management_attribute` table contains the correct `visibility` values.

{% endinfo_block %}
