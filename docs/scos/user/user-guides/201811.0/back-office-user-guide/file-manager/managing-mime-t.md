---
title: Managing MIME Type Settings
originalLink: https://documentation.spryker.com/v1/docs/managing-mime-type-settings
redirect_from:
  - /v1/docs/managing-mime-type-settings
  - /v1/docs/en/managing-mime-type-settings
---

This article describes everything you need to know to create and manage the MIME type settings.
A media type (also known as a Multipurpose Internet Mail Extensions or MIME type) is a standard that indicates the nature and format of a document or file. These settings are added to either allow or restrict the ability to upload files of defines types to the system.

If no MIME type settings are defines, files of any type can be uploaded.
***
To start managing MIME type settings, navigate to the **File Manager > MIME Type Settings** section.
***
## Adding MIME Type Settings
To add a MIME Type setting:
1. On the **MIME Type Setting** page, click **Add MIME type** in the top right corner. 
2. On the **Add MIME type** page, populate the following fields:
    * **MIME Type**. The MIME type should consist of a type and a subtype; these are all strings which, when concatenated with a slash (/) between them, comprise a MIME type. No whitespace is allowed: **type/subtype**. The type represents the general category into which the data type falls, such as video or text. The subtype identifies the exact kind of data of the specified type the MIME type represents. E.g.: **image/png**
    * Optionally leave a comment in the **Comment** field. This information is viewable by only the Back Office users.
3. Select the **Is allowed** checkbox if you want to allow this file extension to be uploaded to the system.
4. Once done, click **Save**.
***
## Editing and Deleting MIME Types
In the _Actions_ column, click one of the following depending on what you need:
* **Edit** to edit a setting. Update the attributes and click **Save**.
* **Delete** to delete a setting.
***
## Allowing a MIME Type
There are two ways to allow a MIME type:

* Select the **Is allowed** checkbox while creating/editing a MIME type.
    ![Select is allowed](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+MIME+Type+Settings/allowing-mime-type.gif)
* Select the checkbox in the _Is Allowed_ column on the **MIME Type Settings** page and click **Save**.
    ![MIME type settings](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+MIME+Type+Settings/mime-type-settings.gif)
***
**Tips & Tricks**
If you create a MIME type but do not allow it, no constraints are going to be applied. 
If you create the MIME types as follows:
![Tips](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+MIME+Type+Settings/tips-one.png){height="" width=""}

Then you will be able to download only the following file types:
* text/csv 
* application/pdf

The following will be displayed on the **File Tree** page once you select to upload a not allowed file type: 
![File tree](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/File+Manager/Managing+MIME+Type+Settings/file-tree.png)
