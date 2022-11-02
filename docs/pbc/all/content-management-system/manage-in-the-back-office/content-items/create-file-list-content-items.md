---
title: Create file list content items
description: Learn how to create file list content items in the Back Office.
last_updated: Oct 22, 2022
template: back-office-user-guide-template
---

This topic describes how to create file list content items in the Back Office.

## Prerequisites

Make sure to review [reference information](#create-product-set-content-items) before you start, or look up the necessary information as you go through the process.

## Create a product set content item

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
* Locale-specific values overwrite the default values when the banner is rendered on a Storefront page with the [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html) selected.
* If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

7. Click **Save**.
    This opens the **Overview of Content Items** page with a success message displayed. The content item is displayed in the list.


**Tips and tricks**
To clear product selection on a tab, click **Clear locale**.


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
