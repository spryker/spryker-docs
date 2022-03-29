---
title: CMS pages overview
description: Summary of the CMS page functionality.
last_updated: May 26, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/cms-page
originalArticleId: 06a6ddcb-d70d-4c16-a341-db0c9cbcae81
redirect_from:
  - /v6/docs/cms-page
  - /v6/docs/en/cms-page
  - /v6/docs/wysiwyg-editor
  - /v6/docs/en/wysiwyg-editor
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
