
This document describes how to integrate the CMS + Dynamic store feature into a Spryker project.

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |  
| --- | --- | 
| Spryker Core | {{page.version}} | 

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/cms:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Cms | vendor/spryker/cms |
| CmsBlock | vendor/spryker/cms-block |
| CmsBlockCategoryStorage | vendor/spryker/cms-block-category-storage |
| CmsBlockGui | vendor/spryker/cms-block-gui |
| CmsBlockProductStorage | vendor/spryker/cms-block-product-storage |
| CmsBlockStorage | vendor/spryker/cms-block-storage |
| CmsContentWidget | vendor/spryker/cms-content-widget |
| CmsGui | vendor/spryker/cms-gui |
| CmsPageDataImport | vendor/spryker/cms-page-data-import |
| CmsPageSearch | vendor/spryker/cms-page-search |
| CmsSlot | vendor/spryker/cms-slot |
| CmsSlotBlock | vendor/spryker/cms-slot-block |
| CmsSlotBlockDataImport | vendor/spryker/cms-slot-block-data-import |
| CmsSlotBlockExtension | vendor/spryker/cms-slot-block-extension |
| CmsSlotBlockGui | vendor/spryker/cms-slot-block-gui |
| CmsSlotBlockGuiExtension | vendor/spryker/cms-slot-block-gui-extension |
| CmsSlotDataImport | vendor/spryker/cms-slot-data-import |
| CmsSlotGui | vendor/spryker/cms-slot-gui |
| CmsSlotStorage | vendor/spryker/cms-slot-storage |
| CmsStorage | vendor/spryker/cms-storage |

{% endinfo_block %}


### Note: 

If using twig function `renderCmsBlockAsTwig` in twig templates, make sure to provide `storeName` name as a parameter. Otherwise, the function will throw an exception.

Ex  ample:
```twig

{{ renderCmsBlockAsTwig(
    'template-name',
    mail.storeName,
    mail.locale.localeName,
    {mail: mail}
) }}
```