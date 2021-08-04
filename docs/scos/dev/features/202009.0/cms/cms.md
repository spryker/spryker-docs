---
title: CMS
originalLink: https://documentation.spryker.com/v6/docs/cms
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
        
<iframe src="https://fast.wistia.net/embed/iframe/lx0amx3m1b" title="CMS Overview" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="700" height="400"></iframe>


## If you are:
<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                                <li><a href="https://documentation.spryker.com/docs/templates-and-slots" class="mr-link">Get a general idea of templates and slots</a></li>
                               <li><a href="https://documentation.spryker.com/docs/cms-page" class="mr-link">Get a general idea of CMS page</a></li>
                               <li><a href="https://documentation.spryker.com/docs/cms-block" class="mr-link">Get a general idea of CMS block</a></li>
                               <li><a href="https://documentation.spryker.com/docs/email-as-a-cms-block" class="mr-link">Get a general idea of email as a CMS block</a></li>
                <li><a href="https://documentation.spryker.com/docs/product-block" class="mr-link">Integrate the CMS feature into your project</a></li>
                <li><a href="https://documentation.spryker.com/docs/reference-information-cms-extension-points" class="mr-link">Learn about CMS extension points</a></li>
    </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                                                                <li><a href="https://documentation.spryker.com/docs/templates-and-slots" class="mr-link">Get a general idea of templates and slots</a></li>
                               <li><a href="https://documentation.spryker.com/docs/cms-page" class="mr-link">Get a general idea of CMS page</a></li>
                               <li><a href="https://documentation.spryker.com/docs/cms-block" class="mr-link">Get a general idea of CMS block</a></li>
                               <li><a href="https://documentation.spryker.com/docs/email-as-a-cms-block" class="mr-link">Get a general idea of email as a CMS block</a></li>
                                <li><a href="https://documentation.spryker.com/docs/creating-a-cms-block" class="mr-link">Create a CMS Block</a></li>
                                <li><a href="https://documentation.spryker.com/docs/managing-cms-blocks" class="mr-link">Manage CMS Blocks</a></li>
