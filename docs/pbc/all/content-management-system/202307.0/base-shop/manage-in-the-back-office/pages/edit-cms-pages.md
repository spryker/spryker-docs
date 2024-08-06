---
title: Edit CMS pages
description: The guide provides instructions on how to update page layout, SEO data and page content in the Back Office.
last_updated: Jun 18, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/editing-cms-pages
originalArticleId: a0f086e5-f744-4a25-8e3d-fa8d065a34ba
redirect_from:
  - /2021080/docs/editing-cms-pages
  - /2021080/docs/en/editing-cms-pages
  - /docs/editing-cms-pages
  - /docs/en/editing-cms-pages
  - /docs/scos/user/back-office-user-guides/202200.0/content/pages/editing-cms-pages.html
  - docs/pbc/all/content-management-system/202307.0/manage-in-the-back-office/pages/edit-cms-pages.html
related:
  - title: CMS Page overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-pages-overview.html
  - title: Managing CMS Page Versions
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/pages/manage-cms-page-versions.html
---

The topic describes how to edit CMS pages in the Back Office.

## Prerequisites

To start editing CMS pages, go to **Content Management&nbsp;<span aria-label="and then">></span> Pages**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Editing CMS pages
You can edit page layout, modify SEO information or update page content.

To edit a page:
1. On the *Overview of CMS Pages* page, click **Edit** in the _Actions_ column. You can select the following options from the *Edit* drop-down list:
    * **Page**: select this option to proceed to the *Edit CMS Page: [Page Name]* page and edit general information and SEO details.
    * **Placeholders**: select this option to proceed to the *Edit Placeholders: [Page Name]* editor and change the title and content of the page.

### Selecting the Page option

To change general information and SEO details, on the *Edit CMS Page: [Page Name]* page, edit the following:
* In the *General* tab:
    * Store relation
    * Template
    * Valid from and Valid to
    * Name and URL per locale

* In the *SEO* tab (per locale):
    * Meta title
    * Meta keywords
    * Meta description

**Tips and tricks**
<br>On the *Edit CMS Page: [Page Name]* page, you can do the following:

* Publish the current version of the page by clicking **Publish** at the top of the page.
* View general information about the published page, its URL, and metadata by clicking **View** at the top of the page.
* Switch to the page where you can edit the title and content of the page by clicking **Edit Placeholders** at the top of the page.
* Cancel changes since the previous publish by clicking **Discard Draft** at the top of the page.
* Remove the published version of the page from the Storefront by clicking **Deactivate** at the top of the page.
* Make the page visible on the Storefront by clicking **Activate** at the top of the page.
* Switch to the list of pages by clicking **Back to CMS** at the top of the page.

### Selecting the Placeholders option

To change the title and content of the page:
1. On the *Edit Placeholders: [Page Name]* editor, place your cursor into the placeholder where you would like to update the content.
2.  Using options on the editor menu, edit the content of your page.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Pages/Editing+CMS+Pages/placeholders.png)

{% info_block infoBox %}

In the placeholders editor, you can insert a banner, abstract product list, product set, and downloadable files using content item widgets. See [Adding content item widgets to a page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/pages/add-content-items-to-cms-pages.html) for more details.

{% endinfo_block %}

**Tips and tricks**
<br>On the *Edit Placeholders: [Page Name]* editor, you can do the following:

* Publish the current version of the page by clicking **Publish** at the top of the page.
* View general information about a published page, its URL and metadata by clicking **View** at the top of the page.
* See how the current version of the page will be displayed on the website before publishing by clicking **Preview** at the top of the page.
* Switch to the page where you can edit the general information and meta details of the page by clicking **Edit Page** at the top of the page.
* Cancel changes since the previous publish by clicking **Discard Draft** at the top of the page.
* Remove the published version of the page from the store website by clicking **Deactivate** at the top of the page.
* Make the page visible on the store website by clicking **Activate** at the top of the page.
* Switch to the list of pages by clicking **Back to CMS** at the top of the page.

### Reference information: Editing CMS pages

The following table describes the attributes you enter when editing a CMS page.

| SECTION | ATTRIBUTE |  DESCRIPTION |
| --- | --- | --- |
| General |  |  |
| | Store relation |  Store locale for which the page is available. |
| | Is searchable | Select the option to make your page searchable on the web. |
| | Template | Template that defines the page layout.  |
| | Valid from and Valid to | Dates during which a page is visible on the Storefront. |
| | Name | Name of the page. |
| | Url | Address of the page on the web. |
| SEO | | |
|  | Meta Title | Meta title. |
|  | Meta Keywords  | Meta keywords.  |
|  | Meta Description | Meta description. |
