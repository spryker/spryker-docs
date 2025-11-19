---
title: Create file list content items
description: Learn how to create and manage file list content items in the Spryker Cloud Commerce OS Back Office.
last_updated: Oct 22, 2022
template: back-office-user-guide-template
redirect_from:
- /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/content-items/create-file-list-content-items.html
---

This topic describes how to create file list content items in the Back Office.

## Prerequisites

Make sure to review [reference information](#reference-information-create-file-list-content-items) before you start, or look up the necessary information as you go through the process.

## Create a navigation content item

1. Go to **Content&nbsp;<span aria-label="and then">></span> Content Items**.
2. On the **Overview of Content Items** page, click **Add Content Item&nbsp;<span aria-label="and then">></span> File list**.
3. On the **Create Content Item: Product Set** page, enter a **NAME**
4. Optional: Enter a **DESCRIPTION**.
5. On the **Default** tab, add files to the list:
1. In the **Available Files** table, click **+Add to list** next to the needed files.
2. In the **Selected Files** table, arrange the files by clicking **Move Down** or **Move Up** next to the files you want to move.
6. Optional: Repeat the previous step on the needed locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
- Locale-specific values overwrite the default values when the banner is rendered on a Storefront page with the [locale](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/multi-language-setup.html) selected.
- If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

7. Click **Save**.
    This opens the **Overview of Content Items** page with a success message displayed. The content item is displayed in the list.


**Tips and tricks**
To clear product selection on a tab, click **Clear locale**.


## Reference information: Create file list content items

The following table describes the attributes on the *Create Content Item: File List* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Name for a file list content item. |
| DESCRIPTION | Descriptive information on what a file list content item is used for. |
| Selected Files | Top table that displays the selected files. |
| Available Files | Bottom table that displays a list of files uploaded to the file manager. |
| ID | Sequence number. |
| File Name | File name.  |


## Reference information: File list content item widget

The widget allows you to insert a File List content item that will be displayed as a link or icon to download the file, such as video, image, zip, pdf, etc on a page or block.

{% info_block infoBox %}

You can add only files uploaded to **File Manager**. Thus, if you make any changes to files in the File Manager section, for example, remove the file, these changes will be applied in the Content Items section as well. <br>See the *File Uploader Feature Overview* article to learn more about file types that can be uploaded to File Manager.

{% endinfo_block %}

**Use case example:** This widget can be used, for example, to submit some additional information or attach a pdf promotion presentation of your products to a page.

You can view how it looks like on the store website:

- **B2C**
    <br>Template used: File icon and size

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/content-management-system/base-shop/manage-in-the-back-office/content-items/create-file-list-content-items.md/file-list-yves-b2c.mp4" type="video/mp4">
  </video>
</figure>


- **B2B**
    <br>Template used: Text Link

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/content-management-system/base-shop/manage-in-the-back-office/content-items/create-file-list-content-items.md/file-list-yves-b2b.mp4" type="video/mp4">
  </video>
</figure>
