---
title: Managing CMS pages
originalLink: https://documentation.spryker.com/2021080/docs/managing-cms-pages
redirect_from:
  - /2021080/docs/managing-cms-pages
  - /2021080/docs/en/managing-cms-pages
---

This article describes how to manage CMS pages.

---

## Prerequisites

To start managing CMS pages, got to **Content** > **Pages**.

Each section contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

## Previewing CMS pages

If you would like to see how your page will look before you publish it, you can preview it in your browser.
{% info_block warningBox "Note" %}
 To preview a draft of your page, link your Zed account to an Yves account.
{% endinfo_block %}

To link a Zed customer to an Yves customer:

1. Navigate to **Users Control** > **User**.
2. On the *Users list* page, click **Assign Customers to User: Zed account e-mail** in the _Actions_ column. This will take you to the *Assign Customers* page.
3. Select a user you would like to assign to your Zed account.
    {% info_block warningBox "Note" %}
Keep in mind that a customer *cannot* be assigned to multiple users at a time.
{% endinfo_block %}
4. To keep the changes, click **Save**.

After you linked your Yves customer to your Zed user, make sure that you are logged in to Zed with your Zed account and logged in to Yves with the assigned customer account.

Now, you can proceed with the steps to preview a draft of your page.

You can use the Preview mode from either the *Overview of CMS Pages* page or the *Edit Placeholders* editor.

To preview a draft of your CMS page from the *Overview of CMS Pages* page:

1. On the *Overview of CMS Pages* page, click **View** and select **Preview** from the drop-down list next to the page whose draft you want to view.
2. The page in the Preview mode is opened in a new tab of your browser.

To preview a draft of your CMS page from the *Edit Placeholders* editor, see the [Editing placeholders](https://documentation.spryker.com/2021080/docs/editing-cms-pages#selecting-the-edit---placeholders-option) section.


## Publishing a CMS page

To keep changes and display them on the shop website, you need to publish them.

You can publish your page either from the *Overview of CMS Pages* page or from the *Edit Placeholders* editor:

* To publish a CMS page from the *Overview of CMS Pages* page, click **Publish** in the _Actions_ column. The page is successfully published.

* To publish a CMS page from the *Edit Placeholders* editor, see the [Editing placeholders](https://documentation.spryker.com/2021080/docs/editing-cms-pages#selecting-the-edit---placeholders-option) section.

## Viewing a CMS page

To view a CMS page:

1. On the *Overview of CMS Pages* page, click **View** in the _Actions_ column.
2. You can select the following options from the drop-down list:
    *  **Preview**: This option allows you to see the way the page will look like on the Storefront before publishing it.
    *  **In Zed**: This option opens the View CMS Page editor that includes general information about a published page, as well as its URL and metadata.
    *  **In Shop**: This option opens a live page on the Storefront. 
    *  **Version History**: This option opens the *Version History: [Page Name]* page that displays all available versions of the page and general information of the version you are currently using.
 3. To view the page details in Zed, select **View** > **In Zed**.
 4. On the *View CMS Page: [Page Name]* page, the following information is available:
    * General information
    * URLs
    * SEO information
    * Placeholders

**Tips & tricks**
On the *View CMS Page: [Page Name]* page, you can do the following:

* Navigate to the page where you can view all available versions for the page, general information of the version you are currently using, and roll back to the previous page version if needed, as well as compare version. To do this, click **Version History** at the top of the page.

* Make changes to page layout or its SEO information by clicking **Edit page** at the top of the page.

* Add some content to a page by clicking **Edit placeholders**.

* Remove a published page (make it invisible) from the Storefront by clicking **Deactivate**.

* Make the page visible on the website clicking **Activate**.

* Return to the _Overview of CMS pages_ page by clicking **Back to CMS**.

### Reference information: Viewing a CMS page

The following table describes the attributes you see when viewing a CMS page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| General information | Section provides details regarding the locales for which the block is available, its current status, block template and time period during which it is visible on the website. |
| Urls | Addresses of the page on the web. |
| SEO | Meta information that includes a meta title, meta keywords, and a meta description per locale. |
| Placeholders | Section shows the translation of the block title and content per locale. |

## Activating and deactivating CMS pages

You can activate (make visible in the shop application) or deactivate (make invisible in the shop application) CMS pages.

To activate a page, click **Activate** in the _Actions_ column on the _Overview of CMS Pages_ page.

To deactivate a page, click **Deactivate** in the _Actions_ column on the _Overview of CMS Pages_ page. This will change the status to *Inactive* and remove the page from the Storefront.
