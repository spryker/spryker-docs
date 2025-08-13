---
title: CMS Pages overview
description: An overview guide on the Spryker Cloud Commerce OS CMS pages functionality.
last_updated: Jul 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/cms-pages-overview
originalArticleId: 8b0f95c3-e1b8-42e9-8d5c-d05ea8a84e4d
redirect_from:
  - /2021080/docs/cms-pages-overview
  - /2021080/docs/en/cms-pages-overview
  - /docs/cms-pages-overview
  - /docs/en/cms-pages-overview
  - /docs/scos/user/features/202200.0/cms-feature-overview/cms-pages-overview.html
  - /docs/scos/user/features/202311.0/cms-feature-overview/cms-pages-overview.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/cms-feature-overview/cms-pages-overview.html
  - /docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/cms-pages-overview.html

---

A *CMS page* is an HTML page that you can create and edit in the Back Office using the WYSIWYG editor. The **About Us**, **Impressum**, **Terms**, **Contacts**, and **Conditions** pages are examples of CMS pages that you can create.

Each CMS page has a unique URL.

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
- Chart
- Product
- Product set
- Product group
- CMS file
- CMS block

With the CMS Pages feature, you can:

- Localize your CMS pages, including the name and HTML meta header information.
- Adding SEO meta information to CMS pages.
- Specify validity dates for CMS Pages.
- Assign a CMS Page to a specific locale, thus making it visible or hidden for a specific store (the Multi-store CMS feature).

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create a CMS page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/create-cms-pages.html)  |
| [View CMS pages and history](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/view-cms-pages-and-history.html)  |
| [Edit CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/edit-cms-pages.html)  |
| [Preview CMS pages](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/preview-cms-pages.html)  |


## See next

- [CMS block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/cms-blocks-overview.html)
