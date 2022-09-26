---
title: CMS feature overview
description: The Spryker Commerce OS offers a feature-rich content management system that allows providing the right content at the right place at the right time.
last_updated: Jul 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/cms
originalArticleId: 31b0fc46-5030-47e2-95fb-b002e42c8e7d
redirect_from:
  - /2021080/docs/cms
  - /2021080/docs/en/cms
  - /docs/cms
  - /docs/en/cms
  - /docs/scos/user/features/202200.0/cms-feature-overview/cms-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/cms-feature-walkthrough/cms-feature-walkthrough.html
---

The *CMS* feature is a content management system that lets you create and manage the content of custom pages that are not part of the product catalog.

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

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Templates and Slots](/docs/scos/user/features/{{page.version}}/cms-feature-overview/templates-and-slots-overview.html)  |
| [Get a general idea of CMS Pages](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-pages-overview.html)  |
| [Get a general idea of CMS Blocks](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-blocks-overview.html)  |
| [Get a general idea of CMS pages in search results](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-pages-in-search-results-overview.html)  |
| [Get a general idea of email as a CMS block](/docs/scos/user/features/{{page.version}}/cms-feature-overview/email-as-a-cms-block-overview.html)  |



## Related Developer articles

| INSTALLATION GUIDES | UPGRADE GUIDES| GLUE API GUIDES  | DATA IMPORT | TUTORIALS AND HOWTOS | TECHNICAL ENHANCEMENTS | REFERENCES |
|---------|---------|---------|---------|---------|---------|---------|
| [CMS feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cms-feature-integration.html)  | [CMS migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cms.html)  |  [Retrieving CMS pages](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-cms-pages.html) | [File details: cms_page.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-page.csv.html)  | [HowTo: Create CMS templates](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html)  | [Enabling the category CMS blocks](/docs/scos/dev/technical-enhancement-integration-guides/integrate-category-cms-blocks.html) | [CMS extension points: Reference information](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cms-feature-walkthrough/cms-extension-points-reference-information.html) |
| [CMS + product lists + catalog feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cms-product-lists-catalog-feature-integration.html)  | [CmsStorage migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cmsstorage.html) |  [Retrieving autocomplete and search suggestions](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-autocomplete-and-search-suggestions.html) | [File details: cms_block.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block.csv.html)  | [HowTo: Define the maximum size of content fields](/docs/scos/dev/tutorials-and-howtos/howtos/howto-define-the-maximum-size-of-content-fields.html)  | [Integrate product CMS blocks](/docs/scos/dev/technical-enhancement-integration-guides/integrate-product-cms-blocks.html) |   |
| [Content Items feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/content-items-feature-integration.html) | [CmsGui migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cmsgui.html) | [Retrieving abstract product list content items](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-content-items/retrieving-abstract-product-list-content-items.html)  | [File details: cms_block_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-store.csv.html)  | [HowTo: Create a visibility condition for CMS blocks](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-a-visibility-condition-for-cms-blocks.html)  | [Enabling CMS block widget](/docs/scos/dev/technical-enhancement-integration-guides/integrating-cms-block-widgets.html) |   |
| [CMS + Catalog feature integration](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cms-feature-walkthrough/cms-feature-walkthrough.html) | [CmsPageSearch migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cmspagesearch.html) | [Retrieving banner content items](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-content-items/retrieving-banner-content-items.html)  | [File details: cms_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-template.csv.html)  | [HowTo: Create a custom content item](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-a-custom-content-item.html)  |   |   |
| [Content Items feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/content-items-feature-integration.html)  | [CmsCollector migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cmscollector.html) |   | [File details: cms_slot.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot.csv.html)  | [Learn about the CoreMedia technology partner integration](/docs/scos/user/technology-partners/{{page.version}}/content-management/coremedia.html)  |   |   |
| [Glue API: Content items API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-content-items-feature-integration.html) | [CmsBlock migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html) |   |  [File details: cms_slot_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot-template.csv.html) |   |   |   |
| [Glue API: CMS feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cms-feature-integration.html)  | [CMS Block Category Connector migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cms-block-category-connector.html)|   |  [File details: cms_slot_block.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot-block.csv.html) |   |   |   |
|   | [CMS Block Category Connector Migration Console migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cms-block-category-connector-migration-console.html)|   |  [File details: content_navigation.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-navigation.csv.html) |   |   |   |
|   | [CMS Block Collector migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cms-block-collector.html) |   | [File details: content_banner.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-banner.csv.html)   |   |   |   |
|   | [CmsBlockGui migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cmsblockgui.html) |   | [File details: content_product_set.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-product-set.csv.html)   |   |   |   |
|   | [CMSBlockStorage migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cmsblockstorage.html)  |   | [File details: content_product_abstract_list.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-product-abstract-list.csv.html)  |   |   |   |
|   | [CmsBlockWidget migration guide](/docs/scos/dev/module-migration-guides/migration-guide-cmsblockwidget.html)  |   |   |   |   |   |
|   | [ContentBannerGui migration guide](/docs/scos/dev/module-migration-guides/migration-guide-contentbannergui.html)   |   |   |   |   |   |
|   | [ContentBanner migration guide](/docs/scos/dev/module-migration-guides/migration-guide-contentbanner.html)  |   |   |   |   |   |
|   | [ContentStorage migration guide](/docs/scos/dev/module-migration-guides/migration-guide-contentstorage.html)  |   |   |   |   |   |
|   | [Content migration guide](/docs/scos/dev/module-migration-guides/migration-guide-content.html)  |   |   |   |   |   |
