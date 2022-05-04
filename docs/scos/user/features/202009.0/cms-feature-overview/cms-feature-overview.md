---
title: CMS feature overview
description: The Spryker Commerce OS offers a feature-rich content management system that allows providing the right content at the right place at the right time.
last_updated: May 25, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/cms
originalArticleId: 38883393-0841-4ad7-86bc-92505c8e5ffc
redirect_from:
  - /v6/docs/cms
  - /v6/docs/en/cms
---

The *CMS* feature is a content management system that allows you to create and manage the content of custom pages that are not part of the product catalog.

The main functionalities of the feature are:
* Templates and slots
* CMS page
* CMS block
* WYSIWYG editor

WYSIWYG editor is a powerful tool used to create content for content items, CMS pages and blocks. Templates and slots, CMS pages and blocks are used to manage content.

All the CMS elements are based on templates. They simplify the creation of similar content. CMS block templates in particular define what a block is used for.


### CMS glossary

| Concept | Definition |
| --- | --- |
| Page | Pages defined in CMS refer to web pages that are meant to be displayed in the front-end application (Yves). A page is defined by an URL and a template. |
| Page URL | When accessing the URL assigned to a page defined in CMS, the associated template will be loaded. |
| Template | The CMS uses Twig templates that are placed under src/Pyz/Yves/Cms/Theme/default/template/ folder. |
| Placeholder | Placeholders enable putting context to a template; a placeholder has a glossary key assigned, so at runtime, the placeholders are replaced by the corresponding glossary key value, considering the context. |
| Block | Partial page that can be embedded in other web pages. |
| URL Redirect | Technique for delivering a page under more then one URL address. When a request is made to an URL that was redirected, a page with a different URL is opened. |
| URL Redirect Status | When an URL is being redirected, the response contains a status code that describes the reason the redirect happened. The URL redirect status code plays an important role in search engine ranking. |

{% wistia lx0amx3m1b 960 720 %}