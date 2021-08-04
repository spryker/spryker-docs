---
title: CMS + Category Management feature integration
originalLink: https://documentation.spryker.com/2021080/docs/cms-category-management-feature-integration
redirect_from:
  - /2021080/docs/cms-category-management-feature-integration
  - /2021080/docs/en/cms-category-management-feature-integration
---

This document describes how to integrate the CMS + Category Management feature into a Spryker project.

## Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION | CMS | 
| --- | --- | ---  | 
| 202001.0 | Category Management | 202001.0| 

## 1) Install the required modules using Composer

Install the required modules:
```bash
composer require spryker/cms-slot-block-category-connector:"^1.0.0" spryker/cms-slot-block-category-gui:"^1.0.0" --update-with-dependencies
```
  
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

|MODULE | EXPECTED DIRECTORY | 
|--- | --- | 
|CmsSlotBlock | vendor/spryker/cms-slot-block | 
|CmsSlotBlockCategoryConnector | vendor/spryker/cms-slot-block-category-connector | 
|CmsSlotBlockCategoryGui | vendor/spryker/cms-slot-block-category-gui|

{% endinfo_block %}

## 2) Set up configuration

1.  Add a CMS slot template to the condition key relation:
    

**Pyz\Zed\CmsSlotBlock\CmsSlotBlockConfig**
```php
<?php

namespace Pyz\Zed\CmsSlotBlock;

use Spryker\Shared\CmsSlotBlockCategoryConnector\CmsSlotBlockCategoryConnectorConfig;
use Spryker\Zed\CmsSlotBlock\CmsSlotBlockConfig as SprykerCmsSlotBlockConfig;

class CmsSlotBlockConfig extends SprykerCmsSlotBlockConfig
{
    /**
     * @return string[][]
     */
    public function getTemplateConditionsAssignment(): array
    {
        return [
            '@CatalogPage/views/catalog-with-cms-slot/catalog-with-cms-slot.twig' => [
                CmsSlotBlockCategoryConnectorConfig::CONDITION_KEY,
            ],
        ];
    }
}
```
2. Expand the category template list in the project-level configuration:

**\Pyz\Zed\Category\CategoryConfig**
```php
<?php

namespace Pyz\Zed\Category;

use Spryker\Zed\Category\CategoryConfig as CategoryCategoryConfig;
use Spryker\Zed\CmsBlockCategoryConnector\CmsBlockCategoryConnectorConfig;

class CategoryConfig extends CategoryCategoryConfig
{
    /**
     * @return string[]
     */
    public function getTemplateList()
    {
        $templateList = [
            CmsBlockCategoryConnectorConfig::CATEGORY_TEMPLATE_ONLY_CMS_BLOCK => '@CatalogPage/views/simple-cms-block/simple-cms-block.twig',
            CmsBlockCategoryConnectorConfig::CATEGORY_TEMPLATE_WITH_CMS_BLOCK => '@CatalogPage/views/catalog-with-cms-block/catalog-with-cms-block.twig',
        ];
        $templateList += parent::getTemplateList();

        return $templateList;
    }
}
```

## 3) Set up behavior

1. Prepare the Zed UI form plugins:

|PLUGIN |SPECIFICATION |NAMESPACE |
|--- | --- | --- | 
|CategorySlotBlockConditionFormPlugin |Extends the CMS slot block form with a category condition form. |Spryker\Zed\CmsSlotBlockCategoryGui\Communication\Plugin|

  

**Pyz\Zed\CmsSlotBlockGui\CmsSlotBlockGuiDependencyProvider**
```php
<?php

namespace Pyz\Zed\CmsSlotBlockGui;

use Spryker\Zed\CmsSlotBlockGui\CmsSlotBlockGuiDependencyProvider as SprykerCmsSlotBlockGuiDependencyProvider;
use Spryker\Zed\CmsSlotBlockCategoryGui\Communication\Plugin\CategorySlotBlockConditionFormPlugin;

class CmsSlotBlockGuiDependencyProvider extends SprykerCmsSlotBlockGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CmsSlotBlockGuiExtension\Communication\Plugin\CmsSlotBlockGuiConditionFormPluginInterface[]
     */
    protected function getCmsSlotBlockFormPlugins(): array
    {
        return [
            new CategorySlotBlockConditionFormPlugin(),
        ];
    }
}
```
  
{% info_block warningBox "Verification" %}


1. In the Back Office, go to **Content** > **Slots**.

2. In the *List of Templates* pane, select the template you've configured in [2) Set up configuration](#2-set-up-configuration).

3. Make sure that you can see a *List of Blocks for "{selected slot name}" Slot* pane.


{% endinfo_block %}

2. Add the visibility resolver plugin to the `CmsSlotBlock` client:

|PLUGIN | SPECIFICATION | NAMESPACE | 
|--- | --- | --- | 
|CategoryCmsSlotBlockConditionResolverPlugin | Provides a visibility resolver for the `CmsSlotBlock` client. | Spryker\Client\CmsSlotBlockCategoryConnector\Plugin\CmsSlotBlock |

  

**Pyz\Zed\CmsSlotBlockGui\CmsSlotBlockGuiDependencyProvider**
```php
<?php

namespace Pyz\Zed\CmsSlotBlockGui;

use Spryker\Zed\CmsSlotBlockGui\CmsSlotBlockGuiDependencyProvider as SprykerCmsSlotBlockGuiDependencyProvider;
use Spryker\Zed\CmsSlotBlockCategoryGui\Communication\Plugin\CategorySlotBlockConditionFormPlugin;

class CmsSlotBlockGuiDependencyProvider extends SprykerCmsSlotBlockGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CmsSlotBlockGuiExtension\Communication\Plugin\CmsSlotBlockGuiConditionFormPluginInterface[]
     */
    protected function getCmsSlotBlockFormPlugins(): array
    {
        return [
            new CategorySlotBlockConditionFormPlugin(),
        ];
    }
}
```
  
{% info_block warningBox "Verification" %}

Make sure that you can add visibility conditions to a CMS block and display it on the Storefront.

{% endinfo_block %}
  


