---
title: Managing MIME type settings
description: Use the procedures to create, edit, delete or activate a MIME type in the Back Office.
last_updated: Aug 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-mime-type-settings
originalArticleId: 21caa74e-d4c1-4ba6-9cf7-1cd60f7368e8
redirect_from:
  - /2021080/docs/managing-mime-type-settings
  - /2021080/docs/en/managing-mime-type-settings
  - /docs/managing-mime-type-settings
  - /docs/en/managing-mime-type-settings
related:
  - title: Managing File Tree
    link: docs/scos/user/back-office-user-guides/page.version/content/file-manager/managing-file-tree.html
  - title: Managing File List
    link: docs/scos/user/back-office-user-guides/page.version/content/file-manager/managing-file-list.html
---

This article describes everything you need to know to create and manage the MIME type settings.
A media type (also known as a Multipurpose Internet Mail Extensions or MIME type) is a standard that indicates the nature and format of a document or file. These settings are added to either allow or restrict the ability to upload files of defined types to the system.

If no MIME type settings are defines, files of any type can be uploaded.

## Prerequisites

To start managing MIME type settings, navigate to **Administration** > **MIME Type Settings**.

## Adding MIME Type Settings

To add a MIME type setting:
1. On the *MIME Type Setting* page,  in the top right corner, click **+Add MIME type**.
2. On the *Add MIME type* page, populate the following fields:
    * **MIME Type**. The MIME type should consist of a type and a subtype; these are all strings which, when concatenated with a slash (/) between them, comprise a MIME type. No whitespace is allowed: **type/subtype**. The type represents the general category into which the data type falls, such as video or text. The subtype identifies the exact kind of data of the specified type the MIME type represents, i.e., **image/png**.
    * Optionally leave a comment in the **Comment** field. This information is viewable by only the Back Office users.
3. Select the **Is allowed** checkbox if you want to allow this file extension to be uploaded to the system.
4. Click **Save**.

## Editing and deleting MIME types

In the _Actions_ column, click one of the following depending on what you need:
* **Edit** to edit a setting. Update the attributes and click **Save**.
* **Delete** to delete a setting.

## Allowing MIME types

There are two ways to allow a MIME type:

* Select the **Is allowed** checkbox while creating/editing a MIME type.
    ![Select is allowed](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+MIME+Type+Settings/allowing-mime-type.gif)
* On the *MIME Type Settings* page, in the _Is Allowed_ column, select the checkbox  and click **Save**.
    ![MIME type settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+MIME+Type+Settings/mime-type-settings.gif)

**Tips and tricks**
<br>If you create a MIME type but do not allow it, no constraints are going to be applied. 
If you create the MIME types as follows:
![Tips](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+MIME+Type+Settings/tips-one.png)

Then you will be able to download only the following file types:
* text/csv
* application/pdf

The following will be displayed on the *File Tree* page once you select to upload a not allowed file type:
![File tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+MIME+Type+Settings/file-tree.png)
