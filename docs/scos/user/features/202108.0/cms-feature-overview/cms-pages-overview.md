---
title: CMS Pages overview
description: Summary of the CMS page functionality.
last_updated: Jul 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/cms-pages-overview
originalArticleId: 8b0f95c3-e1b8-42e9-8d5c-d05ea8a84e4d
redirect_from:
  - /2021080/docs/cms-pages-overview
  - /2021080/docs/en/cms-pages-overview
  - /docs/cms-pages-overview
  - /docs/en/cms-pages-overview
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

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Create a CMS page](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/creating-cms-pages.html)  |
| [Manage CMS pages](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/creating-cms-pages.html)  |
| [Edit CMS pages](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/editing-cms-pages.html)  |
| [Manage versions of a CMS page](/docs/scos/user/back-office-user-guides/{{page.version}}/content/pages/managing-cms-pages.html)  |


{% info_block warningBox "Developer guides" %}

Are you a developer? See [CMS feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cms-feature-walkthrough/cms-feature-walkthrough.html) for developers.

{% endinfo_block %}

## See next

* [CMS block](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-blocks-overview.html)
