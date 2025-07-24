---
title: Manage file tree
description: Use the procedures to create or delete a file directory, upload media files, change the order for file directories in the Back Office.
last_updated: Jul 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-file-tree
originalArticleId: b9ec164d-4687-4d68-ab77-5e98b284dd1b
redirect_from:
  - /2021080/docs/managing-file-tree
  - /2021080/docs/en/managing-file-tree
  - /docs/managing-file-tree
  - /docs/en/managing-file-tree
  - /docs/scos/user/back-office-user-guides/202200.0/content/file-manager/managing-file-tree.html
  - /docs/scos/user/back-office-user-guides/202204.0/content/file-manager/managing-file-tree.html  
  - /docs/pbc/all/content-management-system/202311.0/manage-in-the-back-office/manage-file-tree.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/manage-file-tree.html  
related:
  - title: Managing File List
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/manage-file-list.html
  - title: Add and edit MIME types
    link: docs/pbc/all/content-management-system/page.version/base-shop/manage-in-the-back-office/add-and-edit-mime-types.html
  - title: File Manager feature overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/file-manager-feature-overview.html
---
---

This article describes how to manage the file tree. The file tree lets a Back Office user create folders (directories) under *File Directories Tree* and organize them in a hierarchical system by dragging and dropping.

To preserve a logical structure of the files uploaded to the system for use in marketing campaigns, you should define the structure in which your files are stored. Structured marketing campaign materials also help other Marketing Team members to manage files.

The *File Tree* section is used to upload the files, create or delete the directories and manage the order of files and directories.

To start working with file tree elements, navigate to **Content>File Tree** section.


## Prerequisites

If there are no MIME types defined in the *MIME Type Settings* section, you can upload any type of file. If you have at least one MIME type defined as *Is Allowed*, you can upload only allowed file types, until you add more allowed types. See [Add and edit MIME types](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/add-and-edit-mime-types.html) for more details.


## Creating file directories

To create a file directory:

1. On the *Overview of File Tree* page, click **Create File Directory** in the top right corner.
2. On the *Create Directory Element* page, enter the name of your directory in the *Name* field and populate the *Title* field for all locales.
3. Once done, click **Save**.

The created folder will be displayed on the left of the *Overview of File Tree* page.
You can create multilevel structures by changing the directory order.

## Reordering directories

To reorder directories, drag and drop them to the desired place.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/content-management-system/base-shop/manage-in-the-back-office/manage-file-tree.md/reordering-directories.mp4" type="video/mp4">
  </video>
</figure>


Once you are satisfied with the order, click **Save Order**.

## Deleting directories

To delete a directory:

1. Click on the directory in the *File Tree* section.
2. Click **Delete Directory** in the top right corner of the page.
3. On the system message pop-up, click **Confirm** to confirm the action.
![Deleting directories](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/digital-asset-management/deleting-directories.png)

## Uploading files

Once you have set up the directory structure, you can proceed with uploading files into those folders.

To upload a file:

1. Click on the directory into which you will upload the file.
2. In the top right corner of the *Files List* section, click **Add File**.
3. On the *Add a file* page, do the following:
    - Enter the file name. Alternately, leave this field blank and select the *use file name* checkbox if you do not want to change the file's existing name.
    - Browse and select the file to upload.
    - Make sure the *use file name* checkbox is selected if you do not want to change the file's existing name.
    - Optionally, populate the *Alt* and *Title* fields for each locale.
4. Once done, click **Save**.
The file is uploaded to the selected folder.



## Managing files

Once the file is uploaded, you can manage it from two locations:

- File List (for more details, see [Manage file List](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/manage-file-list.html))
- File Tree

To manage a file in File Tree:

1. Click on the folder where the file is located.
2. In the *Files List* section, select one of the following in the *Actions* column for the file:
    - **View** to view the file. You are redirected to the *View file* page. You can download the file by clicking **Download** in the *Actions* column.

    - **Edit** to edit the file and manage multiple versions of the file. You are redirected to the *Edit file* page.

        - *File tab*: Here you can update the file name information. Click **Save** to apply your updates.

        You can also upload another version of a file.

        {% info_block infoBox "Info" %}

         *Edit File* lets you maintain multiple versions of any file. For example, the Content Manager may upload Instruction1.txt file (v.1), then decide that an image is more useful in this case and upload Instruction.png (v.2) to the file.

        {% endinfo_block %}

        To upload another version of a file, click **Choose File**, optionally change the file name and the *Alt* and *Title* fields for each locale, then click **Save**.

        - *File versions tab*: Here you can manage multiple version of the file. You can view each version's information. in the *Actions* column, you can download the file version by clicking **Download** and also delete a version.

    - **Delete** to immediately delete a file.

{% info_block warningBox "Warning" %}

Selecting **Delete** in the *Actions* column immediately deletes the file. There is no confirmation message before the delete occurs. The delete action cannot be undone.

{% endinfo_block %}
