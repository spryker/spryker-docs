---
title: CMS
originalLink: https://documentation.spryker.com/v3/docs/cms
redirect_from:
  - /v3/docs/cms
  - /v3/docs/en/cms
---

<div class='feature-text'>
    <div class='feature-images'>
    <img class="light-mode" src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Document+360/Capabilities+icons/light/cms.svg"/>
    <img class="dark-mode" src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Document+360/Capabilities+icons/dark/cms.svg"/>
    </div>
    <div class="feature-text-wrap">
The Spryker Commerce OS offers a feature-rich content management system that allows you to provide the right content at the right place at the right time. The intuitive, user-friendly WYSIWYG editor interface enables you to flexibly create, edit, preview, draft and publish CMS pages, blocks and widgets. Combining dynamic placeholders with CMS content allows you to automatically retrieve and display catalog items to build highly effective and adaptable promotional pages.	

The CMS gives you full control over the content in terms of:

* Searchability
* Drafting
* Versioning
* Ordering (by ID)
* Activation
* Deactivation

All CMS elements can be fully localized to support content creation for multiple stores. Easily create promotional campaigns by setting time restrictions for certain pages and blocks.

To enhance the visibility of your shop, the Spryker Commerce OS comes with several SEO tools that enable you to define customized meta titles, keywords, meta descriptions and create search engine friendly URLs.

### Definitions that are used within the capability

| Concept | Definition |
| --- | --- |
| Page | Pages defined in CMS refer to web pages that are meant to be displayed in the front-end application (Yves). A page is defined by an URL and a template. |
| Page URL | When accessing the URL assigned to a page defined in CMS, the associated template will be loaded. |
| Template | The CMS uses Twig templates that are placed under src/Pyz/Yves/Cms/Theme/default/template/ folder. |
| Placeholder | Placeholders enable putting context to a template; a placeholder has a glossary key assigned, so at runtime, the placeholders are replaced by the corresponding glossary key value, considering the context. |
| Block | Partial page that can be embedded in other web pages. |
| URL Redirect | Technique for delivering a page under more then one URL address. When a request is made to an URL that was redirected, a page with a different URL is opened. |
| URL Redirect Status | When an URL is being redirected, the response contains a status code that describes the reason the redirect happened. The URL redirect status code plays an important role in search engine ranking. |

**Features:**

<div>
<a class="feature-link" href="https://documentation.spryker.com/v4/docs/cms-page">CMS Page</a>     
<a class="feature-link" href="https://documentation.spryker.com/v3/docs/cms-block">CMS Block</a>
   <a class="feature-link" href="https://documentation.spryker.com/v3/docs/content-item-widgets-201907">Content Item Widget</a> 
 <a class="feature-link" href="https://documentation.spryker.com/v3/docs/content-items-201907">Content Items</a> 
