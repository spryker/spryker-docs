---
title: CMS
originalLink: https://documentation.spryker.com/v5/docs/cms
redirect_from:
  - /v5/docs/cms
  - /v5/docs/en/cms
---

<div class='feature-text'>
    <div class='feature-images'>
    <img class="light-mode" src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Document+360/Capabilities+icons/light/cms.svg"/>
    <img class="dark-mode" src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Document+360/Capabilities+icons/dark/cms.svg"/>
    </div>
    <div class="feature-text-wrap">

***
**Business Value**
* Provide compelling content and stories where your customers need
***

The Spryker Commerce OS offers a feature-rich content management system that allows you to provide the right content at the right place at the right time. Easily define the layout of your pages with templates and Slots and create content with Content Items. This multi-dimensional structure allows maximal personalization and Technology Partner CMS Integrations.
        
The intuitive, user-friendly WYSIWYG editor interface enables you to flexibly create and edit the content. Combining dynamic placeholders with CMS content allows you to automatically retrieve and display catalog items to build highly effective and adaptable promotional pages.	

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
         <a class="feature-link" href="https://documentation.spryker.com/docs/en/
templates-slots">Templates & Slots</a>
<a class="feature-link" href="https://documentation.spryker.com/docs/en/cms-page">CMS Page</a>     
<a class="feature-link" href="https://documentation.spryker.com/docs/en/
cms-block">CMS Block</a>
 <a class="feature-link" href="https://documentation.spryker.com/docs/en/content-items-201907">Content Items</a> 
    <a class="feature-link" href="https://documentation.spryker.com/docs/en/
content-item-widgets-201907">Content Item Widgets</a>
        </div>
