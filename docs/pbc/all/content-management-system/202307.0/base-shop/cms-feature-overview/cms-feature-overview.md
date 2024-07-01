---
title: CMS feature overview
description: The Spryker Commerce OS offers a feature-rich content management system that allows providing the right content at the right place at the right time.
last_updated: Jul 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/cms
originalArticleId: 31b0fc46-5030-47e2-95fb-b002e42c8e7d
redirect_from:
  - /docs/scos/user/features/202108.0/cms-feature-overview/cms-feature-overview.html
  - /docs/scos/user/features/202200.0/cms-feature-overview/cms-feature-overview.html
  - /docs/scos/user/features/202307.0/cms-feature-overview/cms-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202307.0/cms-feature-walkthrough/cms-feature-walkthrough.html
  - /docs/pbc/all/content-management-system/202307.0/cms-feature-overview/cms-feature-overview.html
  - /docs/pbc/all/content-management-system/202307.0/base-shop/tutorials-and-howtos/tutorial-cms.html
---

The *CMS* feature is lets you create and manage the content of custom pages that are not part of the product catalog.

The main functionalities of the feature are the following:
* Templates and slots
* CMS page
* CMS block
* WYSIWYG editor

The WYSIWYG editor is a powerful tool that is used to create content for content items, and CMS pages and blocks. Templates and slots and CMS pages and blocks are used to manage content.

All the CMS elements are based on templates. They simplify the creation of similar content. CMS block templates in particular define what a block is used for.

### CMS glossary

<div class="width-100">

| CONCEPT | DEFINITION |
| --- | --- |
| Page | Pages defined in CMS refer to web pages that are meant to be displayed in the frontend application (Yves). A page is defined by an URL and a template. |
| Page URL | When accessing the URL assigned to a page defined in CMS, the associated template will be loaded. |
| Template | The CMS uses Twig templates that are placed under src/Pyz/Yves/Cms/Theme/default/template/ folder. |
| Placeholder | Placeholders enable putting context to a template; a placeholder has a glossary key assigned, so at runtime, the placeholders are replaced by the corresponding glossary key value, considering the context. |
| Block | Partial page that can be embedded in other web pages. |
| URL Redirect | Technique for delivering a page under more then one URL address. When a request is made to an URL that was redirected, a page with a different URL is opened. |
| URL Redirect Status | When an URL is being redirected, the response contains a status code that describes the reason the redirect happened. The URL redirect status code plays an important role in search engine ranking. |

</div>

{% wistia lx0amx3m1b 960 720 %}

## Related Business User documents

|OVERVIEWS|
|---|
| [Templates and Slots](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html)  |
| [CMS Pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-pages-overview.html)  |
| [CMS Blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html)  |
| [CMS pages in search results](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-pages-in-search-results-overview.html)  |
| [Email as a CMS block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/email-as-a-cms-block-overview.html)  |



## Related Developer documents

| INSTALLATION GUIDES | UPGRADE GUIDES| GLUE API GUIDES  | DATA IMPORT | TUTORIALS AND HOWTOS | TECHNICAL ENHANCEMENTS | REFERENCES |
|---------|---------|---------|---------|---------|---------|---------|
| [Install the CMS feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cms-feature.html)  | [CMS migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cms-module.html)  |  [Retrieve CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-cms-pages.html) | [File details: cms_page.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-page.csv.html)  | [HowTo: Create CMS templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html)  | [Enabling the category CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-category-cms-blocks.html) | [CMS extension points: Reference information](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/extend-and-customize/cms-extension-points-reference-information.html) |
| [Install the CMS + Product Lists + Catalog feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cms-product-lists-catalog-feature.html)  | [CmsStorage migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsstorage-module.html) |  [Retrieving autocomplete and search suggestions](/docs/pbc/all/search/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-autocomplete-and-search-suggestions.html) | [File details: cms_block.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block.csv.html)  | [HowTo: Define the maximum size of content fields](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/define-the-maximum-size-of-content-fields.html)  | [Install product CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-product-cms-blocks.html) |   |
| [Install the Content Items feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-content-items-feature.html) | [CmsGui migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsgui-module.html) | [Retrieve abstract product list content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-list-content-items.html)  | [File details: cms_block_store.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-store.csv.html)  | [HowTo: Create a visibility condition for CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-a-visibility-condition-for-cms-blocks.html)  | [Enabling CMS block widget](/docs/dg/dev/integrate-and-configure/integrate-cms-block-widgets.html) |   |
| [Install the CMS + Catalog feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cms-catalog-feature.html) | [CmsPageSearch migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmspagesearch-module.html) | [Retrieve banner content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-banner-content-items.html)  | [File details: cms_template.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-template.csv.html)  | [HowTo: Create a custom content item](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-a-custom-content-item.html)  |   |   |
| [Install the Content Items feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-content-items-feature.html)  | [CmsCollector migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmscollector-module.html) |   | [File details: cms_slot.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot.csv.html)  | [Learn about the CoreMedia technology partner integration](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/third-party-integrations/coremedia.html)  |   |   |
| [Glue API: Content items API feature integration](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-content-items-glue-api.html) | [CmsBlock migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblock-module.html) |   |  [File details: cms_slot_template.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot-template.csv.html) |   |   |   |
| [Glue API: CMS feature integration](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cms-glue-api.html)  | [CMS Block Category Connector migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockcategoryconnector-module.html)|   |  [File details: cms_slot_block.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot-block.csv.html) |   |   |   |
|   | [CMS Block Category Connector Migration Console migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockcategoryconnector-migration-console-module.html)|   |  [File details: content_navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-navigation.csv.html) |   |   |   |
|   | [CMS Block Collector migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockcollector-module.html) |   | [File details: content_banner.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-banner.csv.html)   |   |   |   |
|   | [Upgrade the CmsBlockGui module](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockgui-module.html) |   | [File details: content_product_set.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-set.csv.html)   |   |   |   |
|   | [CMSBlockStorage migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockstorage-module.html)  |   | [File details: content_product_abstract_list.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-abstract-list.csv.html)  |   |   |   |
|   | [Upgrade the CmsBlockWidget module](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblockwidget-module.html)  |   |   |   |   |   |
|   | [ContentBannerGui migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentbannergui-module.html)   |   |   |   |   |   |
|   | [ContentBanner migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentbanner-module.html)  |   |   |   |   |   |
|   | [ContentStorage migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-contentstorage-module.html)  |   |   |   |   |   |
|   | [Content migration guide](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-content-module.html)  |   |   |   |   |   |
