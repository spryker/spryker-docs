---
title: Creating a CMS page
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-cms-page
redirect_from:
  - /2021080/docs/creating-a-cms-page
  - /2021080/docs/en/creating-a-cms-page
---

This topic describes how to create a CMS page in the Back Office.

A CMS page is an additional page of your online shop, such as Terms and Conditions, About Us, Contact Us, etc. Here you can create, publish, edit, and manage CMS pages, as well as add content item widgets coupled with the template and multiple CMS blocks. 

---

## Prerequisites

To start working with CMS pages, navigate to **Content** > **Pages**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Creating a CMS page

To create a page:

1. In the top right corner, click **+Create page**.
2. On the *Create CMS Page* page, you can see two tabs: *General* and *SEO*.
3. In the *General* tab, do the following:
    * Use **Store Relation** to set a store for which your page will be visible on the website. If you want your CMS page not to be displayed per a specific locale, clear a respective checkbox. 
    * **Optional**: Select **Is searchable** to make your page searchable on the web.
    * Select a page template that will determine a page layout. This is a *mandatory* step.
    {% info_block infoBox %}
Templates are project-specific and are usually created by a developer and business person. If you are missing a CMS page template, contact them and refer to the [HowTo - Create CMS templates](https://documentation.spryker.com/2021080/docs/ht-create-cms-templates#cms-page-template
{% endinfo_block %}.)
    * **Optional**: Enter **Valid from** and **Valid to** if you want to define the validity period during which your page will be available on the Storefront.
    * Enter **Name** and **URL** of the page per locale. This is a *mandatory* step.

4. In the *SEO* tab, enter meta-information: title, keywords, and description. The meta details are important for SEO purposes, such as optimizing webpage ranking by search engines and improving website usability.
5. To keep the changes, click **Save**.

**Tips & tricks**

* Keep in mind that by default, **Store Relation** is enabled for all stores. To hide your page per specific locale(s), clear checkboxes per that(those) locale(s).
</br>
* Consider the following cases:
    * If **Is searchable** is selected, and **Store Relation** is turned off for all stores, the CMS page will not be displayed and will not be searchable.
    * If **Is searchable** is not selected, and **Store Relation** is turned on, the CMS page will be shown but will not be searchable.
 </br>
 * If you want to create *different* versions of the page per locale, add the general information to the section in the corresponding language.

### Reference information: Creating a CMS page

On the *Overview of CMS Pages* page, you see the following:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| # | Sequence number. |
| Name | Name of a CMS page. |
| Url | Address of a page displayed in the address bar of the browser. |
| Template | Defines a structure of the CMS page. |
| Status | Page status that can be active (visible on the store website), inactive (invisible on the store website), and unpublished. |
| Stores | Locale(s) for which the page will be visible on the store website. |
| Actions | Set of actions that can be performed on a CMS page. |

On this page, you can also:

* Create a new CMS page.
* Sort pages a sequence number (#), names, and templates.
* Filter content items by a sequence number, name, and template.

The following table describes the attributes you enter when creating a CMS page.

| SECTION | ATTRIBUTE |  DESCRIPTION |
| --- | --- | --- |
| General |  |  |
| | Store relation |  Store locale for which the page will be available. |
| | Is searchable | Select this option make your page searchable on the web. |
| | Template | Template that defines the page layout.  |
| | Valid from and Valid to | Dates during which a page will be visible on the Storefront. |
| | Name | Name of the page. |
| | Url | Address of the page on the web. |
| SEO | | |
|  | Meta Title | Meta title. |
|  | Meta Keywords  | Meta keywords.  |
|  | Meta Description | Meta description. |

---

**What's next?**
Until now, you have created a page draft. The page itself will be available in the online store after you publish it.

To learn how to view or publish the page, see [Managing CMS pages](https://documentation.spryker.com/2021080/docs/managing-cms-pages).

