---
title: Managing CMS Pages
originalLink: https://documentation.spryker.com/v5/docs/managing-cms-pages
redirect_from:
  - /v5/docs/managing-cms-pages
  - /v5/docs/en/managing-cms-pages
---

This article describes how to manage CMS pages.

To start managing CMS pages, got to **Content Management** > **Pages**.
***
## Previewing CMS Pages
If you would like to see how your page will look like before you publish it, you can preview it in your browser.
{% info_block warningBox "Note" %}
 To be able to preview a draft of your page, you need to link your Zed account to an Yves account.
{% endinfo_block %}

**To link a Zed customer to an Yves customer:**

1. Navigate to **Users Control** > **User**.
2. On the **Users list** page, click **Assign Customers to User: Zed account e-mail** in the _Actions_ column. This will take you to the **Assign Customers** page.
3. Select a user you would like to assign to your Zed account.
    {% info_block warningBox "Note" %}
Keep in mind that a customer **cannot** be assigned to multiple users at a time.
{% endinfo_block %}
4. To keep the changes, click **Save**.

After you linked your Yves customer to your Zed user, make sure that you are logged in to Zed with your Zed account and logged in to Yves with the assigned customer account.

Now, we can proceed with the steps to preview a draft of your page.

You can use the Preview mode from either the **Overview of CMS Pages** page or the **Edit Placeholders** editor.

**To preview a draft of your CMS page from the Overview of CMS Pages page:**
1.On the **Overview of CMS Pages** page, click **View** and select **Preview** from the drop-down list next to the page whose draft you want to view.
2. The page in the Preview mode will be opened in a new tab of your browser.

**To preview a draft of your CMS page from the Edit Placeholders editor**, see the [Editing Placeholders](https://documentation.spryker.com/docs/en/editing-cms-pages#selecting-the-edit---placeholders-option) section.


## Publishing a Page
Until now we have created a draft of the page and added some content. Thus, to keep changes and display them on the shop website, you need to publish them.

You can publish your page either from the **Overview of CMS Pages** page or from the **Edit Placeholders** editor.

**To publish a page from the Overview of CMS Pages page:**
1. On the **Overview of CMS Pages** page, click **Publish** in the _Actions_ column.
2. The page will be successfully published.

**To publish a page from the Edit Placeholders editor**, see the [Editing Placeholders](https://documentation.spryker.com/docs/en/editing-cms-pages#selecting-the-edit---placeholders-option) section.

## Viewing a Page
To view a page:
1. On the **Overview of CMS Pages** page, click **View** in the _Actions_ column.
2. From the drop-down list, you can select the following options:
    *  **Preview**: This option allows you to see the way the page will look like in the online store before publishing it.
    *  **In Zed**: This option opens the View CMS Page editor that includes general information about a published page, as well as its URL and metadata.
    *  **In Shop**: This option opens a live page in the online store. 
    *  **Version History**: This option opens the Version History: Page name page that displays all available versions of the page and general information of the version you are currently using.
 3. To view the page details in Zed, click **View > In Zed**.
 4. On the **View CMS Page: [Page name]** page that opens, the following information is available:
    * General information
    * URLs
    * SEO information
    * Placeholders

{% info_block infoBox %}
See [CMS Page: Reference Information](https://documentation.spryker.com/docs/en/cms-pages-reference-information
{% endinfo_block %} to learn more about attributes on this page.)

**Tips & Tricks**
On the **View CMS Page: [Page name]** page, you can do the following:

* Navigate to the page where you can view all available versions for the page, general information of the version you are currently using, and roll back to the previous page version if needed, as well as compare version. To do this, click **Version History** on the top of the page.

* Make changes to page layout or its SEO information by clicking **Edit page** on the top of the page.

* Add some content to a page by clicking **Edit placeholders**.

* Remove a published page (make it invisible) from the store website by clicking **Deactivate**.

* Make the page visible on the website clicking **Activate**.

* Return to the _Overview of CMS pages_ page by clicking **Back to CMS**.


## Activating and Deactivating Pages
You can activate (make visible in the shop application) or deactivate (make invisible in the shop application) CMS pages.

To activate a page, click **Activate** in the _Actions_ column on the _Overview of CMS Pages_ page.

To deactivate a page, click **Deactivate** in the _Actions_ column on the _Overview of CMS Pages_ page. This will change the status to Inactive and remove the page from the store website.
***
**What's next?**
To know more about the attributes you see, select and enter while managing CMS pages, see [CMS Pages: Reference Information](https://documentation.spryker.com/docs/en/cms-pages-reference-information). 
