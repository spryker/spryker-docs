---
title: What's changed in CMS
last_updated: Jul 29, 2022
description: This document lists all the Content Management System releases
template: concept-topic-template
---

## September 19th, 2022

This release contains the following modules:

* [ContentProductSetGui 1.1.0](https://github.com/spryker/content-product-set-gui/releases/tag/1.1.0)  improvements:
  * Adjusted `ProductSetController::productSetSelectedTableAction()` to display formatted product set IDs and product abstract sets count based on locale.
  * Adjusted `ProductSetController::productSetViewTableAction()` to display formatted product set IDs and product abstract sets count based on locale.
  * Increased Gui dependency version.


* [ContentProductGui 1.1.0](https://github.com/spryker/content-product-gui/releases/tag/1.1.0) improvements:
  * Adjusted `ProductAbstractController::productAbstractSelectedTableAction()` to display formatted product abstract IDs based on locale.
  * Adjusted `ProductAbstractController::productAbstractViewTableAction()` to display formatted product abstract IDs based on locale.
  * Increased Gui dependency version.


* [ContentFileGui 2.1.0](https://github.com/spryker/content-file-gui/releases/tag/2.1.0) improvements:
  * Adjusted `FileListController::fileListSelectedTableAction()` to display formatted file IDs based on locale.
  * Adjusted `FileListController::fileListViewTableAction()` to displayed formatted file IDs based on locale.
  * Increased Gui dependency version.



* [CmsSlotGui 1.2.0](https://github.com/spryker/cms-slot-gui/releases/tag/1.2.0) improvements:
  * Adjusted `TemplateListController::tableAction()` to display formatted CMS slot and CMS slot template IDs based on locale.
  * Increased Gui dependency version.


* [CmsSlotBlockGui 1.2.0](https://github.com/spryker/cms-slot-block-gui/releases/tag/1.2.0) improvements:
  * Adjusted `SlotBlockController::tableAction()` to display formatted CMS block IDs based on locale.
  * Increased Gui dependency version.



* [CmsGui 5.10.0](https://github.com/spryker/cms-gui/releases/tag/5.10.0) improvements:
  * Adjusted `ListPageController::tableAction()` to display formatted CMS page IDs based on locale.
  * Increased Gui dependency version.


* [CmsBlockGui 2.9.0](https://github.com/spryker/cms-block-gui/releases/tag/2.9.0) improvements:
  * Adjusted `ListBlockController::tableAction()` to display formatted CMS block IDs based on locale.
  * Increased Gui dependency version.

* [NavigationGui 2.8.0](https://github.com/spryker/navigation-gui/releases/tag/2.8.0) improvements:  

  * Adjusted IndexController::tableAction() to display formatted navigation IDs based on locale.
  * Increased Gui dependency version.


[Public release details](https://api.release.spryker.com/release-group/3883)


## July 6th, 2022

[Cms 7.11.1](https://github.com/spryker/cms/releases/tag/7.11.1): adjusted `CmsFacade::findPageGlossaryAttributes()` return type so now it is compatible with the implemented interface's signature.

[Public release details](https://api.release.spryker.com/release-group/4252)


## June 8th, 2022

[CmsSlotBlockDataImport 0.2.2](https://github.com/spryker/cms-slot-block-data-import/releases/tag/0.2.2) module fixes:

* Adjusted `CmsPageKeysToIdsConditionsStep::KEY_CMS_PAGE_IDS` constant value to fix importing of CMS block conditions.
* Adjusted `CmsPageKeysToIdsConditionResolver::KEY_CMS_PAGE_IDS` constant value to fix importing of CMS block conditions.

[Public release details](https://api.release.spryker.com/release-group/4042)


## April 18th, 2022

* [CmsStorage 2.6.0](https://github.com/spryker/cms-storage/releases/tag/2.6.0): Removed deprecated usage of `DatabaseTransactionHandlerTrait::preventTransaction()`.

* [CmsPageSearch 2.5.0](https://github.com/spryker/cms-page-search/releases/tag/2.5.0): Removed deprecated usage of `DatabaseTransactionHandlerTrait::preventTransaction()`.

* [CmsBlockProductStorage 1.6.0](https://github.com/spryker/cms-block-product-storage/releases/tag/1.6.0): Removed deprecated usage of `DatabaseTransactionHandlerTrait::preventTransaction()`.

* [CmsBlockCategoryStorage 1.7.0](https://github.com/spryker/cms-block-category-storage/releases/tag/1.7.0): Removed deprecated usage of `DatabaseTransactionHandlerTrait::preventTransaction()`.

* [NavigationStorage 1.9.0](https://github.com/spryker/navigation-storage/releases/tag/1.9.0): Removed deprecated usage of `DatabaseTransactionHandlerTrait::preventTransaction()`.


[Public release details](https://api.release.spryker.com/release-group/2084)

## April 8th, 2022

[ContentGui 2.4.8](https://github.com/spryker/content-gui/releases/tag/2.4.8): Adjusted the `content-item-editor` so that it can use `codemirror` as code view editor.

[Public release details](https://api.release.spryker.com/release-group/3829)


## March 31th, 2022

[CmsContentWidget 1.9.1](https://github.com/spryker/cms-content-widget/releases/tag/1.9.1): Introduced `LocaleCmsPageData` transfer object.

[Public release details](https://api.release.spryker.com/release-group/4037)
