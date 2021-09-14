---
title: CMS page
description: Summary of the CMS page functionality.
originalLink: https://documentation.spryker.com/v6/docs/cms-page
originalArticleId: 06a6ddcb-d70d-4c16-a341-db0c9cbcae81
redirect_from:
  - /v6/docs/cms-page
  - /v6/docs/en/cms-page
---

A CMS page is an HTML page you can create and edit in the Back Office using the WYSIWYG editor. The *About Us*, *Impressum*, *Terms*, *Contacts*, and *Conditions* pages are the examples of CMS pages that you can create.

Each CMS page has a unique URLs.

## CMS page template

A *CMS page template* is a Twig file that, when applied to a block, defines its design and layout.

You can create templates to effectively create similar content. The CMS feature is shipped with several page templates by default. A developer can create more templates.

## CMS page validity period

When creating a page, you can select validity dates. The dates define when the page starts and stops being displayed on the Storefront. For example, if you are planning to run a promotion campaign, you can create a banner beforehand and define when it starts and stops being displayed based on the promotion period.


## CMS page store relation

If you have an international store, you can define which stores each page is displayed in.

Each placeholder in a page has locale-specific content (for as many locales as you have).

## CMS content widgets

When you edit a CMS page, you can add CMS content widgets. A CMS content widget is a dynamic piece of reusable content. The following CMS content widgets are shipped with the CMS feature:
* chart
* product
* product set
* product group
* cms file
* cms block

With the CMS Pages feature, you can:

* Localize your CMS pages, including the name and HTML meta header information.
* Adding SEO meta information to CMS pages.
* Specify validity dates for CMS Pages.
* Assign a CMS Page to a specific locale, thus making it visible or hidden for a specific store (the Multi-store CMS feature).


**If you are:**

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                 <li><a href="docs\scos\dev\tutorials-and-howtos\howtos\feature-howtos\cms\howto-create-cms-templates.md#cms-page-template" class="mr-link"> Create a template for a CMS page</a></li>
  <li><a href="docs\scos\dev\tutorials-and-howtos\howtos\howto-define-the-maximum-size-of-content-fields.md" class="mr-link">Define maximum length of content fields</a></li>
<li><a href="https://documentation.spryker.com/docs/reference-information-cms-extension-points" class="mr-link">Enable an extension point for post activation and deactivation of CMS pages</a></li>
<li><a href="docs\scos\dev\module-migration-guides\202108.0\migration-guide-cms.html#upgrading-from-version-6---to-version-7--" class="mr-link">Migrate the CMS module from version 6.* to version 7.*</a></li>
 <li><a href="docs\scos\dev\module-migration-guides\202009.0\migration-guide-cmsstorage.html#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the CmsStorage module from version 1.* to version 2.*</a></li>
                <li><a href="docs\scos\dev\module-migration-guides\202009.0\migration-guide-cmsgui.md#upgrading-from-version-4---to-version-5--" class="mr-link">Migrate the CmsGui module from version 4.* to version 5.*</a></li>
 </li><li><a href="docs\scos\dev\module-migration-guides\202009.0\migration-guide-cmspagesearch.html#upgrading-from-version-1---to-version-2--" class="mr-link">Migrate the CmsPageSearch module from version 1.* to version 2.*</a></li>
 </li><li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\cms-feature-integration.md" class="mr-link">Enable CMS pages in your project by integrating the CMS feature</a></li>
  </li><li><a href="docs\scos\dev\migration-and-integration\202009.0\feature-integration-guides\cms-product-lists-catalog-feature-integration.md" class="mr-link">Integrate the CMS Page Search + Product Lists + Catalog Feature into your project </a></li>
  </ul>
        </div>
        <!-- col3 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-red">
                <li class="mr-title">Back Office User</li>
                  <li><a href="docs\scos\user\user-guides\202009.0\back-office-user-guide\content\pages\creating-a-cms-page.md" class="mr-link">Create a CMS page</a></li>
     </li><li><a href="docs\scos\user\user-guides\202009.0\back-office-user-guide\content\pages\managing-cms-pages.md" class="mr-link">Manage a CMS page</a></li>
  </li><li><a href="docs\scos\user\user-guides\202009.0\back-office-user-guide\content\pages\editing-cms-pages.md" class="mr-link">Edit a CMS page</a></li>
    </li><li><a href="docs\scos\user\user-guides\202009.0\back-office-user-guide\content\pages\managing-cms-page-versions.md" class="mr-link">Manage versions of a CMS page</a></li>
            </ul>
        </div>  
</div>
</div>

## See next

* [CMS block](/docs/scos/user/features/{{page.version}}/cms/cms-feature-overview/cms-block.html)
