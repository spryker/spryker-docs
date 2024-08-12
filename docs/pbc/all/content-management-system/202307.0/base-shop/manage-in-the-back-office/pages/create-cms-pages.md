---
title: Create CMS pages
description: The guide provides a procedure to create a CMS page, make it searchable per store in the Back Office.
last_updated: Jun 17, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-a-cms-page
originalArticleId: 5746d7b7-637d-4602-898d-a83ab9da0498
redirect_from:
  - /2021080/docs/creating-a-cms-page
  - /2021080/docs/en/creating-a-cms-page
  - /docs/creating-a-cms-page
  - /docs/en/creating-a-cms-page
  - /docs/scos/user/back-office-user-guides/202200.0/content/pages/creating-cms-pages.html
  - /docs/scos/user/back-office-user-guides/202204.0/content/pages/creating-cms-pages.html
  - docs/pbc/all/content-management-system/202307.0/manage-in-the-back-office/pages/create-cms-pages.html
related:
  - title: CMS Page overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-pages-overview.html
  - title: Editing CMS Pages
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/pages/edit-cms-pages.html
  - title: Managing CMS Page Versions
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/pages/manage-cms-page-versions.html
---

A CMS page is an independent page of your shop, such as Terms and Conditions, About Us, or Contact Us.

To create a CMS page, follow the steps:

1. Go to **Content&nbsp;<span aria-label="and then">></span> Pages**.
2. On the **Overview of CMS Pages**, click **Create page**.
3. On the **Create CMS Page** page, click the **General** tab.
4. Optional: To show the page in one or more stores, select the stores for **STORE RELATION**.
5. Optional: To make the page searchable on the web, select **IS SEARCHABLE**.
6. Select a **TEMPLATE**.
7. Optional: Select or enter **VALID FROM** and **VALID TO** dates.
8. Enter **NAME** and **URL** for each locale.
9. Click the **SEO** tab.
10. Optional: enter the following meta information:
  * **META TITLE**
  * **META KEYWORDS**
  * **META DESCRIPTION**

11. To keep the changes, click **Save**.
    This opens the **Edit Placeholders: {PAGE_NAME}** page.
12. Add the needed content to the page.
13. To keep the changes, click **Save**.
  This refreshes the page with a success message displayed. The draft content is saved and you can return to this page later to edit the content or publish it on the Storefront.
14. Optional: To show the page on the Storefront, click **Publish**.
  This opens the **View CMS Page: {PAGE_NAME}** page with a success message displayed.

**Tips and tricks**

* If **IS SEARCHABLE** is selected, and no **STORE RELATION** is selected, the CMS page will not be displayed and will not be searchable.
* If **IS SEARCHABLE** is not selected, and one or more stores are selected for **STORE RELATION**, the CMS page will be shown but will not be searchable.

## Reference information: Create CMS pages

| SECTION | ATTRIBUTE |  DESCRIPTION |
| --- | --- | --- |
| General |  |  |
| | STORE RELATION | The stores in which the page is displayed. |
| | IS SEARCHABLE | Defines if the page can be found on the web. |
| | TEMPLATE | Defines the page layout. Templates are project-specific and created by developers. For instructions on creating CMS templates, see [Create CMS templates](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/tutorials-and-howtos/create-cms-templates.html#cms-page-template).  |
| | VALID FROM and VALID TO | Dates during which the page is displayed on the Storefront. |
| | NAME | Name of the page. |
| | URL | Address of the page on the web. |
| SEO | | |
|  | META TITLE | Meta title. |
|  | META KEYWORDS  | Meta keywords.  |
|  | META DESCRIPTION | Meta description. |
