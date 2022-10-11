---
title: Creating content items
description: The guide provides a procedure on how to create a content item such as banner, abstract product list, product set, and file list in the Back Office.
last_updated: Jul 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-content-items
originalArticleId: 2b74257a-bed2-4e83-a271-59e1beb84262
redirect_from:
  - /2021080/docs/creating-content-items
  - /2021080/docs/en/creating-content-items
  - /docs/creating-content-items
  - /docs/en/creating-content-items
  - /docs/scos/user/back-office-user-guides/201811.0/content/content-items/creating-content-items.html
  - /docs/scos/user/back-office-user-guides/201903.0/content/content-items/creating-content-items.html
related:
  - title: Content Items feature overview
    link: docs/pbc/all/content-management-system/content-items-feature-overview.html
  - title: Editing Content Items
    link: docs/scos/user/back-office-user-guides/page.version/content/content-items/editing-content-items.html
---

## Create a file list content item

{% info_block infoBox %}

For the use cases and examples of the file list content item, see [File List Content Item Widget](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/references/reference-information-content-item-widgets-types.html#product-set-content-item-widget) and [File List](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/references/reference-information-content-item-widgets-templates.html#file-list).

{% endinfo_block %}

Follow the steps to create a file list:
1. On the *Create Content Item: File List* page, enter **Name** and **Description**. The fields are mandatory.
2. In the *Default* tab, add files to the file list as follows:
    1.  In the *Available Files* table, click **+Add to list** next to the desired files.

    {% info_block warningBox "Verification" %}

    The added files should appear in the *Selected Files* table.

    {% endinfo_block %}

    2.  In the *Selected Files* table, sort the added files by clicking **Move Down** or **Move Up**.

See [Content items: reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/references/reference-information-content-items.html#create-and-edit-abstract-product-list-content-item-page) to learn about the attributes on this page.

3. If needed, repeat the previous step in one or more locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific files overwrite the default files when the file list is rendered on a Storefront page with the [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html) selected.
* If no files are selected for a locale, the default files are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

4. Click **Save**. This takes you to the *Overview of Content Items* page.

{% info_block warningBox "Verification" %}

Make sure the file list has been created:
* Above *List of Content Items*, you can see the message: _Content item has been successfully created_.
* In *List of Content Items*, you can see the created file list.

{% endinfo_block %}

**Tips and tricks**
<br>On the *Create Content Item: File List* page, you can do the following:

* Filter the files in the *Available Files* table by entering a file name in the *Search* field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.

{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

### Reference information: Create a file list content item

The following table describes the attributes on the *Create Content Item: File List* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name for a file list content item. |
| Description | Descriptive information on what a file list content item is used for. |
| Selected Files | Top table that displays the selected files. |
| Actions | Set of actions you can perform on a File List content item:<ul><li>**Move Down** or **Move Up** allows you to change the order of files in the list. </li><li>**Delete** allows removing the selected file.</li></ul> |
| Available Files | Bottom table that displays a list of files uploaded to the file manager. |
| ID | Sequence number. |
| File Name | File name.  |
| Selected| Column that contains **+ Add to list** you can click to add a file to the top table so that it can be added to the file list content item. |

## Create a navigation content item

To create a navigation content item:
1. On the *Create Content Item: Navigation* page, enter **Name** and **Description**.
2. In the *Default* tab, select a navigation from the *Navigation* drop-down list. See [Creating navigation elements](/docs/scos/user/back-office-user-guides/{{page.version}}/content/navigation/managing-navigation-elements.html#creating-a-navigation-element) to learn about creating navigation elements.

3. If needed, repeat the previous step in one or more locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific navigation element overwrites the default navigation element when rendered on a Storefront page with the [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html) selected.
* If no navigation element is selected for a locale, the default navigation element is displayed on a Storefront page with the locale selected.

{% endinfo_block %}

4. Click **Save**.
This takes you to the *Overview of Content Items* page. You can see the message about successful content item creation. The created content item is displayed in the *List of Content Items*.

### Reference information: Create a navigation content item

The following table describes the attributes on the *Create Content Item: Navigation* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of the content item. |
| Description | Description of the content item. |
| Navigation | Field to select an existing navigation element. |

**What's next?**
<br>The content item is created. Now, you can add it to a CMS block.

* To learn about adding content item to CMS blocks or a pages, see [Adding content items to CMS pages and blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/adding-content-items-to-cms-pages-and-blocks.html).
* To learn about editing content items, see [Editing content items](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/editing-content-items.html).
